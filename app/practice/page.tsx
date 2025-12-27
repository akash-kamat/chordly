'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Settings } from 'lucide-react';
import { THEME } from '@/types';
import { Metronome } from '@/components/practice/metronome';
import { PitchDetector } from '@/components/practice/pitch-detector';
import { StrumVisualizer, PatternSelector } from '@/components/practice/strum-visualizer';
import { useAppStore } from '@/store/app-store';
import { Fretboard } from '@/components/fretboard/fretboard';
import { CHORDS } from '@/data/chords';
import { useAudio } from '@/hooks/use-audio';

export default function PracticePage() {
    const { currentChord, setCurrentChord, audioSettings, appSettings, setAppSettings, isMetronomeOn, bpm } = useAppStore();
    const { strumChord, playString } = useAudio();
    const [selectedPattern, setSelectedPattern] = useState('basic-4');

    const chordData = CHORDS[currentChord] || CHORDS['C Major'];

    const handleStringClick = (stringIndex: number, fret: number) => {
        playString(stringIndex, fret, audioSettings);
    };

    const handleStrum = () => {
        strumChord(chordData.positions, audioSettings);
    };

    const quickChords = ['E Minor', 'A Major', 'D Major', 'G Major', 'C Major'];

    return (
        <div
            className="min-h-screen py-12 px-6"
            style={{ backgroundColor: THEME.bg }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:text-accent transition-colors"
                        style={{ color: THEME.textLight }}
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        Practice Session
                    </h1>
                    <p style={{ color: THEME.textLight }}>
                        Tune your guitar, practice with the metronome, and develop your timing skills.
                        <span className="hidden md:inline text-xs ml-2">(Press Space to toggle metronome, ↑/↓ for BPM)</span>
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Metronome & Strum Pattern */}
                    <div className="space-y-6">
                        <Metronome />

                        {/* Strum Pattern Selector */}
                        <PatternSelector
                            selectedPattern={selectedPattern}
                            onPatternSelect={setSelectedPattern}
                        />

                        {/* Quick Settings */}
                        <div
                            className="p-6 rounded-2xl border bg-white"
                            style={{ borderColor: THEME.border }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Settings size={20} style={{ color: THEME.accent }} />
                                <h3 className="font-bold">Settings</h3>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center justify-between">
                                    <span className="text-sm">Left-handed Mode</span>
                                    <input
                                        type="checkbox"
                                        checked={appSettings.leftHanded}
                                        onChange={(e) => setAppSettings({ leftHanded: e.target.checked })}
                                        className="accent-accent"
                                        style={{ accentColor: THEME.accent }}
                                    />
                                </label>

                                <label className="flex items-center justify-between">
                                    <span className="text-sm">Show Finger Numbers</span>
                                    <input
                                        type="checkbox"
                                        checked={appSettings.showFingerNumbers}
                                        onChange={(e) => setAppSettings({ showFingerNumbers: e.target.checked })}
                                        className="accent-accent"
                                        style={{ accentColor: THEME.accent }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Strum Visualizer & Fretboard */}
                    <div className="space-y-6">
                        {/* Strum Visualizer */}
                        <StrumVisualizer
                            bpm={bpm}
                            isPlaying={isMetronomeOn}
                            patternId={selectedPattern}
                        />

                        {/* Quick Chord Selection */}
                        <div
                            className="p-6 rounded-2xl border bg-white"
                            style={{ borderColor: THEME.border }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Music size={20} style={{ color: THEME.accent }} />
                                <h3 className="font-bold">Quick Chords</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {quickChords.map(chord => (
                                    <button
                                        key={chord}
                                        onClick={() => setCurrentChord(chord)}
                                        className={`px-3 py-2 rounded-lg text-sm font-bold transition-all
                      ${currentChord === chord ? 'text-white' : 'hover:bg-warm-surface'}`}
                                        style={{
                                            backgroundColor: currentChord === chord ? THEME.accent : THEME.surface,
                                            color: currentChord === chord ? 'white' : THEME.text,
                                        }}
                                    >
                                        {chord.replace(' Major', '').replace(' Minor', 'm')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fretboard Display */}
                        <div
                            className="p-8 rounded-2xl border bg-white flex justify-center"
                            style={{ borderColor: THEME.border }}
                        >
                            <Fretboard
                                positions={chordData.positions}
                                fingers={chordData.fingers}
                                barre={chordData.barre}
                                onStrumString={handleStringClick}
                                showHints={appSettings.showFingerNumbers}
                                leftHanded={appSettings.leftHanded}
                            />
                        </div>

                        {/* Strum Button */}
                        <button
                            onClick={handleStrum}
                            className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
                            style={{ backgroundColor: THEME.text }}
                        >
                            Strum {currentChord}
                        </button>
                    </div>

                    {/* Right Column: Pitch Detector */}
                    <div>
                        <PitchDetector />
                    </div>
                </div>
            </div>
        </div>
    );
}

