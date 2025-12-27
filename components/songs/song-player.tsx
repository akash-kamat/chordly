'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, SkipBack, Settings, Type } from 'lucide-react';
import { THEME, Song } from '@/types';
import { CHORDS } from '@/data/chords';
import { Fretboard } from '@/components/fretboard/fretboard';
import { useAudio } from '@/hooks/use-audio';
import { useAppStore } from '@/store/app-store';
import { ChordLyricsOverlay } from '@/components/songs/chord-lyrics-overlay';

interface SongPlayerProps {
    song: Song;
    onClose?: () => void;
}

export function SongPlayer({ song, onClose }: SongPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentChordIndex, setCurrentChordIndex] = useState(0);
    const [tempo, setTempo] = useState(song.bpm || 100);
    const [beatsPerChord, setBeatsPerChord] = useState(4);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [showSettings, setShowSettings] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const { strumChord, playString } = useAudio();
    const audioSettings = useAppStore((state) => state.audioSettings);

    const currentChordName = song.progression[currentChordIndex];
    const currentChord = CHORDS[currentChordName];

    const stopPlayback = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsPlaying(false);
    }, []);

    const startPlayback = useCallback(() => {
        setIsPlaying(true);
        const msPerBeat = 60000 / tempo;

        // Play first chord immediately
        if (currentChord) {
            strumChord(currentChord.positions, audioSettings);
        }

        intervalRef.current = window.setInterval(() => {
            setCurrentBeat(prev => {
                const nextBeat = prev + 1;

                if (nextBeat >= beatsPerChord) {
                    // Move to next chord
                    setCurrentChordIndex(prevIdx => {
                        const nextIdx = (prevIdx + 1) % song.progression.length;
                        const nextChordName = song.progression[nextIdx];
                        const nextChord = CHORDS[nextChordName];
                        if (nextChord) {
                            strumChord(nextChord.positions, audioSettings);
                        }
                        return nextIdx;
                    });
                    return 0;
                }

                return nextBeat;
            });
        }, msPerBeat);
    }, [tempo, beatsPerChord, currentChord, strumChord, audioSettings, song.progression]);

    useEffect(() => {
        return () => stopPlayback();
    }, [stopPlayback]);

    const handlePrevChord = () => {
        stopPlayback();
        setCurrentChordIndex(prev => prev > 0 ? prev - 1 : song.progression.length - 1);
        setCurrentBeat(0);
    };

    const handleNextChord = () => {
        stopPlayback();
        setCurrentChordIndex(prev => (prev + 1) % song.progression.length);
        setCurrentBeat(0);
    };

    const handleRestart = () => {
        stopPlayback();
        setCurrentChordIndex(0);
        setCurrentBeat(0);
    };

    const handleStringClick = (stringIndex: number, fret: number) => {
        playString(stringIndex, fret, audioSettings);
    };

    const formatChordName = (name: string) =>
        name.replace(' Major', '').replace(' Minor', 'm').replace(' 7', '7');

    // Calculate song readiness based on chords learned
    const chordsLearned = useAppStore((state) => state.progress.chordsLearned);
    const uniqueChords = [...new Set(song.progression)];
    const knownChords = uniqueChords.filter(c => chordsLearned.includes(c));
    const readinessPercent = (knownChords.length / uniqueChords.length) * 100;

    return (
        <div
            className="bg-white rounded-2xl border shadow-lg overflow-hidden"
            style={{ borderColor: THEME.border }}
        >
            {/* Header */}
            <div
                className="p-6 border-b"
                style={{ borderColor: THEME.border, background: `linear-gradient(135deg, ${THEME.surface}, white)` }}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h2
                            className="text-2xl font-bold mb-1"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            {song.title}
                        </h2>
                        <p style={{ color: THEME.textLight }}>{song.artist}</p>
                    </div>

                    {/* Readiness indicator */}
                    <div className="text-right">
                        <div className="text-sm font-medium mb-1">Song Readiness</div>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-warm-surface rounded-full overflow-hidden">
                                <div
                                    className="h-full"
                                    style={{
                                        width: `${readinessPercent}%`,
                                        backgroundColor: readinessPercent === 100 ? THEME.accentSec : THEME.accent
                                    }}
                                />
                            </div>
                            <span className="text-sm font-bold" style={{ color: THEME.accent }}>
                                {Math.round(readinessPercent)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chord progression display */}
            <div className="p-4 overflow-x-auto hide-scrollbar">
                <div className="flex gap-2">
                    {song.progression.map((chord, i) => (
                        <button
                            key={`${chord}-${i}`}
                            onClick={() => {
                                stopPlayback();
                                setCurrentChordIndex(i);
                                setCurrentBeat(0);
                            }}
                            className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${i === currentChordIndex ? 'text-white scale-110 shadow-md' : 'hover:bg-warm-surface'
                                }`}
                            style={{
                                backgroundColor: i === currentChordIndex ? THEME.accent : THEME.surface,
                                color: i === currentChordIndex ? 'white' : THEME.text,
                            }}
                        >
                            {formatChordName(chord)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left column: Fretboard + Lyrics */}
                <div className="space-y-4">
                    {/* Fretboard */}
                    <div className="bg-warm-surface p-6 rounded-xl flex justify-center">
                        {currentChord ? (
                            <Fretboard
                                positions={currentChord.positions}
                                fingers={currentChord.fingers}
                                barre={currentChord.barre}
                                onStrumString={handleStringClick}
                                showHints={true}
                            />
                        ) : (
                            <div className="text-center py-12" style={{ color: THEME.textLight }}>
                                Chord not found in library
                            </div>
                        )}
                    </div>

                    {/* Lyrics overlay */}
                    <ChordLyricsOverlay
                        song={song}
                        currentChordIndex={currentChordIndex}
                        isPlaying={isPlaying}
                    />
                </div>
                <div className="space-y-6">
                    {/* Current chord display */}
                    <div className="text-center">
                        <span className="text-sm uppercase font-bold" style={{ color: THEME.textLight }}>
                            Now Playing
                        </span>
                        <h3
                            className="text-4xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.accent }}
                        >
                            {formatChordName(currentChordName)}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: THEME.textLight }}>
                            {currentChord?.mood}
                        </p>
                    </div>

                    {/* Beat indicator */}
                    <div className="flex justify-center gap-3">
                        {Array.from({ length: beatsPerChord }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-4 h-4 rounded-full transition-all ${i === currentBeat && isPlaying ? 'animate-beat' : ''
                                    }`}
                                style={{
                                    backgroundColor: i === currentBeat && isPlaying ? THEME.accent : THEME.border,
                                    transform: i === currentBeat && isPlaying ? 'scale(1.3)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>

                    {/* Playback controls */}
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={handleRestart}
                            className="p-3 rounded-full border hover:bg-warm-surface transition-colors"
                            style={{ borderColor: THEME.border }}
                        >
                            <SkipBack size={20} />
                        </button>

                        <button
                            onClick={handlePrevChord}
                            className="p-3 rounded-full border hover:bg-warm-surface transition-colors"
                            style={{ borderColor: THEME.border }}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={isPlaying ? stopPlayback : startPlayback}
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
                            style={{ backgroundColor: THEME.accent }}
                        >
                            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                        </button>

                        <button
                            onClick={handleNextChord}
                            className="p-3 rounded-full border hover:bg-warm-surface transition-colors"
                            style={{ borderColor: THEME.border }}
                        >
                            <ChevronRight size={20} />
                        </button>

                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`p-3 rounded-full border transition-colors ${showSettings ? 'bg-warm-surface' : ''}`}
                            style={{ borderColor: THEME.border }}
                        >
                            <Settings size={20} />
                        </button>
                    </div>

                    {/* Settings panel */}
                    {showSettings && (
                        <div
                            className="p-4 rounded-xl space-y-4"
                            style={{ backgroundColor: THEME.surface }}
                        >
                            {/* Tempo slider */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Tempo</span>
                                    <span className="font-bold">{tempo} BPM</span>
                                </div>
                                <input
                                    type="range"
                                    min="40"
                                    max="180"
                                    value={tempo}
                                    onChange={(e) => setTempo(parseInt(e.target.value))}
                                    className="w-full"
                                    style={{ accentColor: THEME.accent }}
                                />
                            </div>

                            {/* Beats per chord */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Beats per Chord</span>
                                    <span className="font-bold">{beatsPerChord}</span>
                                </div>
                                <div className="flex gap-2">
                                    {[2, 4, 8].map(beats => (
                                        <button
                                            key={beats}
                                            onClick={() => setBeatsPerChord(beats)}
                                            className={`flex-1 py-2 rounded-lg font-medium transition-all ${beatsPerChord === beats ? 'text-white' : ''
                                                }`}
                                            style={{
                                                backgroundColor: beatsPerChord === beats ? THEME.accent : 'white',
                                            }}
                                        >
                                            {beats}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
