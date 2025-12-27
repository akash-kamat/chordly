'use client';

import { useState } from 'react';
import { THEME } from '@/types';
import { CHORDS } from '@/data/chords';
import { ChordLibrary, ChordDetail } from '@/components/chords/chord-library';
import { Fretboard } from '@/components/fretboard/fretboard';
import { useAudio } from '@/hooks/use-audio';
import { useAppStore } from '@/store/app-store';

export function WorkshopSection() {
    const [currentChord, setCurrentChord] = useState('C Major');
    const audioSettings = useAppStore((state) => state.audioSettings);
    const { strumChord, playString } = useAudio();

    const chordData = CHORDS[currentChord] || CHORDS['C Major'];

    const handleChordSelect = (chordName: string) => {
        setCurrentChord(chordName);
        // Auto-strum for feedback
        const chord = CHORDS[chordName];
        if (chord) {
            strumChord(chord.positions, audioSettings);
        }
    };

    const handleStrum = () => {
        strumChord(chordData.positions, audioSettings);
    };

    const handleStringClick = (stringIndex: number, fret: number) => {
        playString(stringIndex, fret, audioSettings);
    };

    return (
        <section
            id="workshop"
            className="scroll-mt-32 p-8 md:p-12 rounded-[2rem] border shadow-sm"
            style={{
                background: `linear-gradient(to bottom right, ${THEME.surface}, white)`,
                borderColor: THEME.border
            }}
        >
            <div className="text-center mb-10">
                <span
                    className="font-bold tracking-wider text-xs uppercase mb-2 block"
                    style={{ color: THEME.accent }}
                >
                    Interactive Tools
                </span>
                <h2
                    className="text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-serif)' }}
                >
                    The Chord Workshop
                </h2>
                <p className="mt-2 text-sm" style={{ color: THEME.textLight }}>
                    Select a chord to visualize its geometry and hear its timbre.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Controls & Library */}
                <div className="space-y-8">
                    <ChordLibrary
                        currentChord={currentChord}
                        onChordSelect={handleChordSelect}
                    />

                    <ChordDetail
                        chordName={currentChord}
                        mood={chordData.mood}
                        onStrum={handleStrum}
                    />
                </div>

                {/* Right: Fretboard Visualization */}
                <div
                    className="flex justify-center bg-white p-8 rounded-3xl border shadow-lg"
                    style={{ borderColor: THEME.border }}
                >
                    <Fretboard
                        positions={chordData.positions}
                        fingers={chordData.fingers}
                        barre={chordData.barre}
                        onStrumString={handleStringClick}
                        showHints={true}
                    />
                </div>
            </div>
        </section>
    );
}
