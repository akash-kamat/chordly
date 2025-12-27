'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, Keyboard, Moon, Sun } from 'lucide-react';
import { THEME } from '@/types';
import { useAppStore } from '@/store/app-store';

// Skip to main content link for keyboard users
export function SkipToContent() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:rounded-lg focus:shadow-lg focus:font-bold"
            style={{ color: THEME.accent }}
        >
            Skip to main content
        </a>
    );
}

// Focus trap for modals
export function useFocusTrap(isOpen: boolean, containerRef: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!isOpen || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        container.addEventListener('keydown', handleKeyDown);
        firstElement?.focus();

        return () => container.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, containerRef]);
}

// Announce messages to screen readers
export function useLiveRegion() {
    const [message, setMessage] = useState('');

    const announce = (text: string, priority: 'polite' | 'assertive' = 'polite') => {
        setMessage(text);
        setTimeout(() => setMessage(''), 1000);
    };

    const LiveRegion = () => (
        <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
        >
            {message}
        </div>
    );

    return { announce, LiveRegion };
}

// Accessibility settings panel
export function AccessibilityPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const { audioSettings, setAudioSettings } = useAppStore();

    useEffect(() => {
        // Check user's system preferences
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(motionQuery.matches);

        const contrastQuery = window.matchMedia('(prefers-contrast: more)');
        setHighContrast(contrastQuery.matches);
    }, []);

    useEffect(() => {
        // Apply reduced motion
        if (reducedMotion) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        } else {
            document.documentElement.style.removeProperty('--animation-duration');
        }
    }, [reducedMotion]);

    const toggleSound = () => {
        const newEnabled = !soundEnabled;
        setSoundEnabled(newEnabled);
        setAudioSettings({ volume: newEnabled ? 0.5 : 0 });
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all z-50"
                style={{ border: `1px solid ${THEME.border}` }}
                aria-label="Accessibility settings"
            >
                <Eye size={20} style={{ color: THEME.accent }} />
            </button>
        );
    }

    return (
        <div
            className="fixed bottom-4 right-4 w-72 bg-white rounded-2xl shadow-xl p-4 z-50"
            style={{ border: `1px solid ${THEME.border}` }}
            role="dialog"
            aria-label="Accessibility Settings"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Accessibility</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-warm-surface"
                    aria-label="Close accessibility panel"
                >
                    ×
                </button>
            </div>

            <div className="space-y-4">
                {/* Sound toggle */}
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2">
                        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        <span>Sound</span>
                    </span>
                    <input
                        type="checkbox"
                        checked={soundEnabled}
                        onChange={toggleSound}
                        className="sr-only"
                    />
                    <div
                        className={`w-10 h-6 rounded-full p-1 transition-colors ${soundEnabled ? 'bg-accent' : 'bg-warm-border'
                            }`}
                        style={{ backgroundColor: soundEnabled ? THEME.accent : THEME.border }}
                    >
                        <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-4' : ''
                                }`}
                        />
                    </div>
                </label>

                {/* Reduced motion */}
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2">
                        <Eye size={18} />
                        <span>Reduce motion</span>
                    </span>
                    <input
                        type="checkbox"
                        checked={reducedMotion}
                        onChange={(e) => setReducedMotion(e.target.checked)}
                        className="sr-only"
                    />
                    <div
                        className={`w-10 h-6 rounded-full p-1 transition-colors`}
                        style={{ backgroundColor: reducedMotion ? THEME.accent : THEME.border }}
                    >
                        <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${reducedMotion ? 'translate-x-4' : ''
                                }`}
                        />
                    </div>
                </label>

                {/* Keyboard shortcuts hint */}
                <div
                    className="p-3 rounded-lg text-sm"
                    style={{ backgroundColor: THEME.surface }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Keyboard size={16} />
                        <span className="font-medium">Keyboard Shortcuts</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs" style={{ color: THEME.textLight }}>
                        <span>H - Home</span>
                        <span>L - Lessons</span>
                        <span>P - Practice</span>
                        <span>S - Songs</span>
                        <span>Space - Metronome</span>
                        <span>↑/↓ - BPM</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Screen reader only text
export function SrOnly({ children }: { children: React.ReactNode }) {
    return <span className="sr-only">{children}</span>;
}
