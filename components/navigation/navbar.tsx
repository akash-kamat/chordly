'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Guitar, BookOpen, Music, Mic, Rocket } from 'lucide-react';
import { NavButton } from '@/components/ui/nav-button';
import { THEME } from '@/types';

const SECTIONS = ['fundamentals', 'quickstart', 'theory', 'workshop'];

export function Navbar() {
    const [activeSection, setActiveSection] = useState('fundamentals');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = windowHeight > 0 ? totalScroll / windowHeight : 0;
            setScrollProgress(progress);

            // Update active section based on scroll position
            const sections = SECTIONS.map(id => {
                const el = document.getElementById(id);
                if (!el) return { id, top: Infinity };
                return { id, top: el.getBoundingClientRect().top };
            });

            const current = sections.find(s => s.top > -100 && s.top < 300);
            if (current) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 z-50 transition-all duration-100"
                style={{
                    width: `${scrollProgress * 100}%`,
                    backgroundColor: THEME.accent
                }}
            />

            {/* Navigation */}
            <nav
                className="sticky top-0 z-40 border-b backdrop-blur-md py-4 px-6 shadow-sm"
                style={{
                    borderColor: THEME.border,
                    backgroundColor: `${THEME.bg}E6` // With opacity
                }}
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <span
                            className="p-2 rounded-lg text-white"
                            style={{ backgroundColor: THEME.accent }}
                        >
                            <Guitar size={20} />
                        </span>
                        <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                            Chord<span style={{ color: THEME.accent }}>ly</span>
                        </h1>
                    </Link>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar">
                        {SECTIONS.map((sec) => (
                            <NavButton
                                key={sec}
                                label={sec.charAt(0).toUpperCase() + sec.slice(1)}
                                active={activeSection === sec}
                                onClick={() => scrollTo(sec)}
                            />
                        ))}

                        {/* Additional Page Links */}
                        <div className="flex gap-2 ml-2 pl-2 border-l" style={{ borderColor: THEME.border }}>
                            <Link
                                href="/lessons"
                                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium hover:bg-warm-surface transition-colors"
                                style={{ color: THEME.text }}
                            >
                                <BookOpen size={16} />
                                <span className="hidden sm:inline">Lessons</span>
                            </Link>
                            <Link
                                href="/practice"
                                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium hover:bg-warm-surface transition-colors"
                                style={{ color: THEME.text }}
                            >
                                <Mic size={16} />
                                <span className="hidden sm:inline">Practice</span>
                            </Link>
                            <Link
                                href="/songs"
                                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium hover:bg-warm-surface transition-colors"
                                style={{ color: THEME.text }}
                            >
                                <Music size={16} />
                                <span className="hidden sm:inline">Songs</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
