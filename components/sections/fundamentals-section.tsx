'use client';

import { HelpCircle } from 'lucide-react';
import { THEME } from '@/types';
import { TuningDisplay } from '@/components/tuning/tuning-display';

export function FundamentalsSection() {
    return (
        <section id="fundamentals" className="scroll-mt-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Text content */}
                <div>
                    <span
                        className="font-bold tracking-wider text-xs uppercase mb-3 block"
                        style={{ color: THEME.accent }}
                    >
                        Start Here
                    </span>
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        More than just strumming.
                    </h2>
                    <p
                        className="text-lg mb-8 leading-relaxed"
                        style={{ color: THEME.textLight }}
                    >
                        Learning guitar isn&apos;t just about memorizing shapes. It&apos;s about understanding
                        the geometry of the fretboard and the physics of sound.
                    </p>

                    {/* Concept cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className="p-5 rounded-xl border cursor-help group relative transition-all hover:translate-y-[-2px] hover:shadow-md"
                            style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
                        >
                            <h4 className="font-bold text-sm mb-1">Tablature</h4>
                            <p className="text-xs" style={{ color: THEME.textLight }}>
                                A map of the strings. Lines represent strings, numbers represent frets.
                            </p>
                            <div
                                className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity"
                                style={{ color: THEME.accentSec }}
                            >
                                <HelpCircle size={16} />
                            </div>
                        </div>

                        <div
                            className="p-5 rounded-xl border cursor-help group relative transition-all hover:translate-y-[-2px] hover:shadow-md"
                            style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
                        >
                            <h4 className="font-bold text-sm mb-1">Chord Diagrams</h4>
                            <p className="text-xs" style={{ color: THEME.textLight }}>
                                A vertical snapshot of the fretboard. Circles show where to place fingers.
                            </p>
                            <div
                                className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity"
                                style={{ color: THEME.accentSec }}
                            >
                                <HelpCircle size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Interactive tuning display */}
                <TuningDisplay />
            </div>
        </section>
    );
}
