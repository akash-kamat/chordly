'use client';

import { PlayCircle } from 'lucide-react';
import { Song } from '@/types';
import { THEME } from '@/types';

interface SongCardProps {
    song: Song;
    onClick: () => void;
}

export function SongCard({ song, onClick }: SongCardProps) {
    // Format chord name for display
    const formatChord = (name: string): string => {
        return name
            .replace(' Major', '')
            .replace(' Minor', 'm')
            .replace(' 7', '7');
    };

    return (
        <div
            className="bg-white p-6 rounded-xl border transition-all hover:shadow-md group cursor-pointer flex justify-between items-center"
            style={{ borderColor: THEME.border }}
            onClick={onClick}
        >
            <div>
                <h3
                    className="font-bold text-lg group-hover:text-accent transition-colors"
                    style={{ color: THEME.text }}
                >
                    {song.title}
                </h3>
                <p className="text-sm" style={{ color: THEME.textLight }}>
                    {song.artist}
                </p>

                {/* Chord progression chips */}
                <div className="mt-2 flex gap-2 flex-wrap">
                    {song.progression.slice(0, 4).map((chord, i) => (
                        <span key={`${chord}-${i}`} className="chord-chip">
                            {formatChord(chord)}
                        </span>
                    ))}
                    {song.progression.length > 4 && (
                        <span className="chord-chip">+{song.progression.length - 4}</span>
                    )}
                </div>

                {/* Difficulty badge */}
                <div className="mt-2">
                    <span
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded
              ${song.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : ''}
              ${song.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${song.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' : ''}
            `}
                    >
                        {song.difficulty}
                    </span>
                </div>
            </div>

            {/* Play button */}
            <div
                className="h-10 w-10 rounded-full flex items-center justify-center group-hover:text-white transition-colors"
                style={{
                    backgroundColor: THEME.surface,
                }}
            >
                <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
            </div>
        </div>
    );
}

interface SongListProps {
    songs: Song[];
    onSongClick: (song: Song) => void;
}

export function SongList({ songs, onSongClick }: SongListProps) {
    return (
        <div className="grid gap-4">
            {songs.map((song) => (
                <SongCard
                    key={song.id}
                    song={song}
                    onClick={() => onSongClick(song)}
                />
            ))}
        </div>
    );
}
