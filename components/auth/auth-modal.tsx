
'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { X, Mail, Github, Chrome } from 'lucide-react'; // Simulating Google icon with Chrome if needed, or text
import { createClient } from '@/utils/supabase/client';
import { THEME } from '@/types';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { signInWithOAuth } = useAppStore();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage('Error: ' + error.message);
        } else {
            setMessage('Check your email for the magic link!');
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative"
                style={{ backgroundColor: THEME.bg, color: THEME.text }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                    <p className="mb-8" style={{ color: THEME.textLight }}>
                        Save your progress and sync across devices.
                    </p>

                    {/* Social Login */}
                    <div className="space-y-3 mb-8">
                        <button
                            onClick={() => signInWithOAuth('google')}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-xl hover:bg-black/5 transition-colors font-medium"
                            style={{ borderColor: THEME.border }}
                        >
                            {/* Simple Google Icon SVG representation or text */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.02 10c5.83 0 8.9-4.15 8.9-8.65c0-.86-.05-1.48-.05-1.48z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                        <button
                            onClick={() => signInWithOAuth('github')}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-xl hover:bg-black/5 transition-colors font-medium"
                            style={{ borderColor: THEME.border }}
                        >
                            <Github size={20} />
                            Continue with GitHub
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" style={{ borderColor: THEME.border }}></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white" style={{ backgroundColor: THEME.bg, color: THEME.textLight }}>
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleMagicLink} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                    style={{
                                        borderColor: THEME.border,
                                        // @ts-ignore
                                        '--tw-ring-color': THEME.accent
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: THEME.accent }}
                        >
                            {isLoading ? 'Sending Link...' : 'Send Magic Link'}
                        </button>
                    </form>

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-sm text-center ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
