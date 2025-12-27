'use client';

import { useState } from 'react';
import { Music, ChevronLeft, ChevronRight, Type } from 'lucide-react';
import { THEME, Song } from '@/types';

interface LyricsLine {
    text: string;
    chord?: string;
}

interface ChordLyricsOverlayProps {
    song: Song;
    currentChordIndex: number;
    isPlaying: boolean;
}

// Placeholder lyrics - in a real app these would come from a licensed lyrics API
const SONG_LYRICS: { [songId: string]: LyricsLine[] } = {
    'wonderwall': [
        { text: "[Verse 1 - Line 1]", chord: "E Minor" },
        { text: "[Verse 1 - Line 2]", chord: "G Major" },
        { text: "[Verse 1 - Line 3]", chord: "D Major" },
        { text: "[Verse 1 - Line 4]", chord: "A Major" },
        { text: "[Chorus - Line 1]", chord: "E Minor" },
        { text: "[Chorus - Line 2]", chord: "G Major" },
    ],
    'knockin': [
        { text: "[Verse - Line 1]", chord: "G Major" },
        { text: "[Verse - Line 2]", chord: "D Major" },
        { text: "[Verse - Line 3]", chord: "A Minor" },
        { text: "[Chorus - Line 1]", chord: "G Major" },
    ],
    'horse': [
        { text: "[Verse 1 - Line 1]", chord: "E Minor" },
        { text: "[Verse 1 - Line 2]", chord: "D Major" },
        { text: "[Verse 1 - Line 3]", chord: "E Minor" },
        { text: "[Verse 1 - Line 4]", chord: "D Major" },
    ],
};

export function ChordLyricsOverlay({ song, currentChordIndex, isPlaying }: ChordLyricsOverlayProps) {
    const [showLyrics, setShowLyrics] = useState(true);
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

    const lyrics = SONG_LYRICS[song.id] || [];
    const currentLine = lyrics[currentChordIndex % lyrics.length] || null;
    const nextLine = lyrics[(currentChordIndex + 1) % lyrics.length] || null;

    const fontSizeClass = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl'
    };

    const formatChord = (chord: string) =>
        chord.replace(' Major', '').replace(' Minor', 'm').replace(' 7', '7');

    // If no lyrics available for this song
    if (lyrics.length === 0) {
        return (
            <div
                className="bg-white rounded-2xl border p-4 text-center"
                style={{ borderColor: THEME.border }}
            >
                <Type size={24} className="mx-auto mb-2" style={{ color: THEME.textLight }} />
                <p className="text-sm" style={{ color: THEME.textLight }}>
                    No lyrics available for this song.
                </p>
                <p className="text-xs mt-1" style={{ color: THEME.textLight }}>
                    Follow the chord progression above!
                </p>
            </div>
        );
    }

    if (!showLyrics) {
        return (
            <button
                onClick={() => setShowLyrics(true)}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                title="Show lyrics"
            >
                <Type size={20} style={{ color: THEME.accent }} />
            </button>
        );
    }

    return (
        <div
            className="bg-white rounded-2xl border shadow-md overflow-hidden"
            style={{ borderColor: THEME.border }}
        >
            {/* Header */}
            <div
                className="px-4 py-3 flex items-center justify-between border-b"
                style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
            >
                <div className="flex items-center gap-2">
                    <Music size={16} style={{ color: THEME.accent }} />
                    <span className="font-medium text-sm">Lyrics Guide</span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Font size controls */}
                    <button
                        onClick={() => setFontSize(fontSize === 'lg' ? 'md' : fontSize === 'md' ? 'sm' : 'sm')}
                        className="p-1 rounded hover:bg-white transition-colors"
                        title="Smaller"
                    >
                        <span className="text-xs">A</span>
                    </button>
                    <button
                        onClick={() => setFontSize(fontSize === 'sm' ? 'md' : fontSize === 'md' ? 'lg' : 'lg')}
                        className="p-1 rounded hover:bg-white transition-colors"
                        title="Larger"
                    >
                        <span className="text-lg font-bold">A</span>
                    </button>

                    <button
                        onClick={() => setShowLyrics(false)}
                        className="p-1 rounded hover:bg-white transition-colors ml-2"
                        title="Hide lyrics"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Current lyric line */}
            <div className="p-6 text-center">
                {currentLine && (
                    <div className="mb-4">
                        {/* Chord above lyrics */}
                        {currentLine.chord && (
                            <div
                                className="font-bold mb-2"
                                style={{ color: THEME.accent }}
                            >
                                {formatChord(currentLine.chord)}
                            </div>
                        )}

                        {/* Lyric placeholder text */}
                        <p
                            className={`font-medium ${fontSizeClass[fontSize]} transition-all ${isPlaying ? 'animate-pulse-glow' : ''
                                }`}
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.text }}
                        >
                            {currentLine.text}
                        </p>
                    </div>
                )}

                {/* Next line preview */}
                {nextLine && (
                    <div className="pt-4 border-t" style={{ borderColor: THEME.border }}>
                        <p
                            className="text-sm opacity-60"
                            style={{ color: THEME.textLight }}
                        >
                            <span className="mr-2 font-bold">{nextLine.chord && formatChord(nextLine.chord)}</span>
                            {nextLine.text}
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation hint */}
            <div
                className="px-4 py-2 text-center text-xs border-t flex items-center justify-center gap-4"
                style={{ backgroundColor: THEME.surface, borderColor: THEME.border, color: THEME.textLight }}
            >
                <span className="flex items-center gap-1">
                    <ChevronLeft size={12} /> Previous
                </span>
                <span>Line {(currentChordIndex % lyrics.length) + 1} of {lyrics.length}</span>
                <span className="flex items-center gap-1">
                    Next <ChevronRight size={12} />
                </span>
            </div>
        </div>
    );
}
