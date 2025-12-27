'use client';

import { BookOpen } from 'lucide-react';
import { CHORDS } from '@/data/chords';
import { THEME } from '@/types';

interface ChordLibraryProps {
    currentChord: string;
    onChordSelect: (chordName: string) => void;
}

export function ChordLibrary({ currentChord, onChordSelect }: ChordLibraryProps) {
    const chordNames = Object.keys(CHORDS);

    // Format chord name for display (e.g., "A Major" -> "A", "A Minor" -> "Am")
    const formatChordName = (name: string): string => {
        return name
            .replace(' Major', '')
            .replace(' Minor', 'm')
            .replace(' 7', '7');
    };

    return (
        <div className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: THEME.border }}>
            <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} style={{ color: THEME.accent }} />
                <h3 className="font-bold text-lg">Chord Library</h3>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {chordNames.map(chordName => {
                    const isActive = currentChord === chordName;
                    return (
                        <button
                            key={chordName}
                            onClick={() => onChordSelect(chordName)}
                            className={`text-xs font-bold py-2 px-1 rounded-lg transition-all
                ${isActive ? 'text-white shadow-md transform scale-105' : 'hover:bg-warm-border'}`}
                            style={{
                                backgroundColor: isActive ? THEME.accent : THEME.surface,
                                color: isActive ? 'white' : THEME.text,
                            }}
                        >
                            {formatChordName(chordName)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

interface ChordDetailProps {
    chordName: string;
    mood: string;
    onStrum: () => void;
}

export function ChordDetail({ chordName, mood, onStrum }: ChordDetailProps) {
    return (
        <div className="space-y-4">
            {/* Mood/Characteristic Display */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: THEME.border }}>
                <h4
                    className="font-bold text-sm uppercase mb-2"
                    style={{ color: THEME.textLight }}
                >
                    Tonal Characteristic
                </h4>
                <div className="flex items-center gap-3">
                    <div
                        className="h-10 w-1 rounded-full"
                        style={{ backgroundColor: THEME.accentSec }}
                    />
                    <div>
                        <p
                            className="text-xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.text }}
                        >
                            {mood}
                        </p>
                        <p className="text-xs" style={{ color: THEME.textLight }}>
                            Based on harmonic intervals
                        </p>
                    </div>
                </div>
            </div>

            {/* Strum Button */}
            <button
                onClick={onStrum}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 btn-primary"
                style={{ backgroundColor: THEME.text }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                Strum {chordName}
            </button>
        </div>
    );
}
