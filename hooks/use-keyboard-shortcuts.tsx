'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/store/app-store';

interface KeyboardShortcuts {
    [key: string]: () => void;
}

export function useKeyboardShortcuts(customShortcuts?: KeyboardShortcuts) {
    const router = useRouter();
    const pathname = usePathname();
    const { isMetronomeOn, setIsMetronomeOn, bpm, setBpm } = useAppStore();

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Ignore if user is typing in an input
        if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        // Combine key with modifiers for unique identification
        const key = event.key.toLowerCase();
        const ctrl = event.ctrlKey || event.metaKey;
        const shift = event.shiftKey;
        const alt = event.altKey;

        // Custom shortcuts take priority
        if (customShortcuts) {
            const shortcutKey = `${ctrl ? 'ctrl+' : ''}${shift ? 'shift+' : ''}${alt ? 'alt+' : ''}${key}`;
            if (customShortcuts[shortcutKey]) {
                event.preventDefault();
                customShortcuts[shortcutKey]();
                return;
            }
        }

        // Global navigation shortcuts
        switch (key) {
            // Navigation
            case 'h':
                if (!ctrl && !shift && !alt) {
                    router.push('/');
                }
                break;
            case 'l':
                if (!ctrl && !shift && !alt) {
                    router.push('/lessons');
                }
                break;
            case 'p':
                if (!ctrl && !shift && !alt) {
                    router.push('/practice');
                }
                break;
            case 's':
                if (!ctrl && !shift && !alt) {
                    router.push('/songs');
                }
                break;

            // Metronome controls
            case ' ': // Space bar
                if (pathname === '/practice') {
                    event.preventDefault();
                    setIsMetronomeOn(!isMetronomeOn);
                }
                break;
            case 'arrowup':
                if (pathname === '/practice' && !ctrl) {
                    event.preventDefault();
                    setBpm(Math.min(200, bpm + 5));
                }
                break;
            case 'arrowdown':
                if (pathname === '/practice' && !ctrl) {
                    event.preventDefault();
                    setBpm(Math.max(40, bpm - 5));
                }
                break;

            // Escape to go back
            case 'escape':
                if (pathname !== '/') {
                    router.back();
                }
                break;

            // Help (? key)
            case '?':
                if (shift) {
                    // Could open a help modal
                    console.log('Keyboard shortcuts:\nH - Home\nL - Lessons\nP - Practice\nS - Songs\nSpace - Toggle metronome\n↑/↓ - Adjust BPM\nEsc - Go back');
                }
                break;
        }
    }, [router, pathname, customShortcuts, isMetronomeOn, setIsMetronomeOn, bpm, setBpm]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

// Component that can be added to layout
export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
    useKeyboardShortcuts();
    return <>{ children } </>;
}
