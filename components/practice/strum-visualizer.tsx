'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { THEME } from '@/types';

interface StrumPattern {
    id: string;
    name: string;
    pattern: ('D' | 'U' | '-')[]; // Down, Up, Rest
    timeSignature: string;
}

const STRUM_PATTERNS: StrumPattern[] = [
    { id: 'basic-4', name: 'Basic 4/4', pattern: ['D', '-', 'D', '-', 'D', '-', 'D', '-'], timeSignature: '4/4' },
    { id: 'folk', name: 'Folk Pattern', pattern: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'], timeSignature: '4/4' },
    { id: 'pop', name: 'Pop Pattern', pattern: ['D', 'D', 'U', '-', 'U', 'D', 'U', '-'], timeSignature: '4/4' },
    { id: 'reggae', name: 'Reggae Off-beat', pattern: ['-', 'U', '-', 'U', '-', 'U', '-', 'U'], timeSignature: '4/4' },
    { id: 'waltz', name: 'Waltz 3/4', pattern: ['D', '-', '-', 'U', '-', '-'], timeSignature: '3/4' },
];

interface StrumVisualizerProps {
    bpm: number;
    isPlaying: boolean;
    patternId?: string;
}

export function StrumVisualizer({ bpm, isPlaying, patternId = 'basic-4' }: StrumVisualizerProps) {
    const [currentBeat, setCurrentBeat] = useState(0);
    const pattern = STRUM_PATTERNS.find(p => p.id === patternId) || STRUM_PATTERNS[0];

    useEffect(() => {
        if (!isPlaying) {
            setCurrentBeat(0);
            return;
        }

        const msPerBeat = 60000 / bpm / 2; // Eighth notes for strumming
        const interval = setInterval(() => {
            setCurrentBeat(prev => (prev + 1) % pattern.pattern.length);
        }, msPerBeat);

        return () => clearInterval(interval);
    }, [isPlaying, bpm, pattern.pattern.length]);

    return (
        <div
            className="bg-white p-6 rounded-2xl border shadow-sm"
            style={{ borderColor: THEME.border }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{pattern.name}</h3>
                <span className="text-sm font-mono" style={{ color: THEME.textLight }}>
                    {pattern.timeSignature}
                </span>
            </div>

            {/* Visual pattern display */}
            <div className="flex justify-center gap-2 mb-6">
                {pattern.pattern.map((stroke, i) => {
                    const isActive = isPlaying && currentBeat === i;
                    const isDownbeat = i % 2 === 0;

                    return (
                        <div
                            key={i}
                            className={`flex flex-col items-center transition-all duration-100 ${isActive ? 'scale-125' : ''
                                }`}
                        >
                            {/* Stroke indicator */}
                            <div
                                className={`w-10 h-16 rounded-lg flex items-center justify-center mb-2 transition-all ${isActive ? 'ring-2 ring-offset-2' : ''
                                    }`}
                                style={{
                                    backgroundColor: stroke === '-' ? THEME.surface :
                                        stroke === 'D' ? THEME.accent : THEME.accentSec,
                                    ringColor: THEME.accent,
                                }}
                            >
                                {stroke === 'D' && (
                                    <ArrowDown size={24} color="white" className={isActive ? 'animate-strum-down' : ''} />
                                )}
                                {stroke === 'U' && (
                                    <ArrowUp size={24} color="white" className={isActive ? 'animate-strum-up' : ''} />
                                )}
                                {stroke === '-' && (
                                    <span className="text-2xl" style={{ color: THEME.textLight }}>—</span>
                                )}
                            </div>

                            {/* Beat number */}
                            <span
                                className={`text-xs font-mono ${isDownbeat ? 'font-bold' : ''}`}
                                style={{ color: isActive ? THEME.accent : THEME.textLight }}
                            >
                                {isDownbeat ? (i / 2) + 1 : '&'}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-xs" style={{ color: THEME.textLight }}>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: THEME.accent }}
                    />
                    <span>Down</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: THEME.accentSec }}
                    />
                    <span>Up</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: THEME.surface }}
                    />
                    <span>Rest</span>
                </div>
            </div>
        </div>
    );
}

interface PatternSelectorProps {
    selectedPattern: string;
    onPatternSelect: (patternId: string) => void;
}

export function PatternSelector({ selectedPattern, onPatternSelect }: PatternSelectorProps) {
    return (
        <div
            className="bg-white p-6 rounded-2xl border shadow-sm"
            style={{ borderColor: THEME.border }}
        >
            <h3 className="font-bold text-lg mb-4">Strumming Patterns</h3>

            <div className="space-y-2">
                {STRUM_PATTERNS.map(pattern => (
                    <button
                        key={pattern.id}
                        onClick={() => onPatternSelect(pattern.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${selectedPattern === pattern.id ? 'border-l-4' : ''
                            }`}
                        style={{
                            borderColor: selectedPattern === pattern.id ? THEME.accent : THEME.border,
                            backgroundColor: selectedPattern === pattern.id ? `${THEME.accent}10` : 'transparent',
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{pattern.name}</span>
                            <span className="text-sm font-mono" style={{ color: THEME.textLight }}>
                                {pattern.timeSignature}
                            </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                            {pattern.pattern.map((s, i) => (
                                <span
                                    key={i}
                                    className="text-xs font-mono"
                                    style={{
                                        color: s === 'D' ? THEME.accent :
                                            s === 'U' ? THEME.accentSec : THEME.textLight
                                    }}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export { STRUM_PATTERNS };
