'use client';

import React from 'react';
import { TUNING, THEME } from '@/types';
import { useAudio } from '@/hooks/use-audio';
import { GuitarString } from '@/components/ui/guitar-string';

export function TuningDisplay() {
    const { playTuningNote } = useAudio();

    const [isDragging, setIsDragging] = React.useState(false);

    // Reverse for display (Low E on left, high e on right)
    const displayTuning = [...TUNING].reverse();

    const width = 460;
    const height = 180;
    const spacing = width / 7;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border select-none" style={{ borderColor: THEME.border }}>
            <div className="text-center mb-6">
                <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                    Standard Tuning
                </h3>
                <p className="text-sm italic" style={{ color: THEME.textLight }}>
                    Tap or strum strings to tune your ear
                </p>
            </div>

            <div
                className="flex justify-center"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
            >
                <svg width={width} height={height} className="overflow-visible">
                    {displayTuning.map((t, i) => {
                        // Fixed string height for uniform look
                        const y1 = 20;
                        const y2 = 160;
                        const x = (i + 1) * spacing;

                        return (
                            <g key={i}>
                                {/* Note Label Top */}
                                <text
                                    x={x}
                                    y={y1 - 10}
                                    textAnchor="middle"
                                    fontWeight="bold"
                                    fontSize="14"
                                    fill={THEME.text}
                                >
                                    {t.note}
                                </text>

                                {/* The String */}
                                <GuitarString
                                    index={i}
                                    x={x}
                                    y1={y1}
                                    y2={y2}
                                    strokeWidth={4.5 - i * 0.5} // i=0(LowE): 4.5, i=5(HighE): 2.0
                                    color={THEME.text}
                                    isDragging={isDragging}
                                    onStrum={() => playTuningNote(5 - i)}
                                />

                                {/* Freq Label Bottom */}
                                <text
                                    x={x}
                                    y={y2 + 25}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill={THEME.textLight}
                                >
                                    {t.freq.toFixed(0)}Hz
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
