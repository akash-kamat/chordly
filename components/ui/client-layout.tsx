
'use client';

import { useState, useEffect } from 'react';
import { AuthModal } from '@/components/auth/auth-modal';
import { SettingsModal } from '@/components/settings/settings-modal';
import { useAppStore } from '@/store/app-store';

import { createClient } from '@/utils/supabase/client';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { user, setUser, setProfile, syncWithCloud } = useAppStore();

    useEffect(() => {
        const openAuth = () => setIsAuthOpen(true);
        const openSettings = () => setIsSettingsOpen(true);

        window.addEventListener('open-auth', openAuth);
        window.addEventListener('open-settings', openSettings);

        // Supabase Auth Listener
        const supabase = createClient();

        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user && !user) {
                console.log('Restoring session user:', session.user.email);
                setUser(session.user);
                // Also fetch profile here if needed, or rely on store to do it?
                // For now, let's keep it simple.
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state change:', event, session?.user?.email);

            if (session?.user) {
                if (user?.id !== session.user.id) {
                    setUser(session.user);

                    // Fetch Profile
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (profile) setProfile(profile);

                    // Trigger sync
                    syncWithCloud();
                }
            } else {
                setUser(null);
                setProfile(null);
            }

            if (event === 'SIGNED_IN') {
                setIsAuthOpen(false); // Close auth modal on success
            }
        });

        return () => {
            window.removeEventListener('open-auth', openAuth);
            window.removeEventListener('open-settings', openSettings);
            subscription.unsubscribe();
        };
    }, []);

    // Auto-open settings if user clicks profile but not logged in? 
    // No, Settings modal handles the "Not logged in" state gracefully.

    return (
        <>
            {children}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
}
