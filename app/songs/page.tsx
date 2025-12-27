'use client';

import Link from 'next/link';
import { ArrowLeft, Search, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { THEME, Song } from '@/types';
import { SONGS, getSongsByDifficulty } from '@/data/songs';
import { SongCard } from '@/components/songs/song-card';
import { SongPlayer } from '@/components/songs/song-player';

export default function SongsPage() {
    const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const filteredSongs = SONGS.filter(song => {
        const matchesFilter = filter === 'All' || song.difficulty === filter;
        const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleSongClick = (song: Song) => {
        setSelectedSong(song);
    };

    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;

    return (
        <div
            className="min-h-screen py-12 px-6"
            style={{ backgroundColor: THEME.bg }}
        >
            <div className="max-w-5xl mx-auto">
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
                        Song Library
                    </h1>
                    <p style={{ color: THEME.textLight }}>
                        Browse our collection of songs organized by difficulty. Click a song to start the play-along mode.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                            style={{ color: THEME.textLight }}
                        />
                        <input
                            type="text"
                            placeholder="Search songs or artists..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2"
                            style={{ borderColor: THEME.border, '--tw-ring-color': THEME.accent } as React.CSSProperties}
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={18} style={{ color: THEME.textLight }} />
                        {difficulties.map(diff => (
                            <button
                                key={diff}
                                onClick={() => setFilter(diff)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${filter === diff ? 'text-white' : 'hover:bg-warm-surface'}`}
                                style={{
                                    backgroundColor: filter === diff ? THEME.accent : THEME.surface,
                                    color: filter === diff ? 'white' : THEME.text,
                                }}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div
                    className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-xl"
                    style={{ backgroundColor: THEME.surface }}
                >
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: THEME.accent }}>
                            {getSongsByDifficulty('Beginner').length}
                        </div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Beginner</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: THEME.accent }}>
                            {getSongsByDifficulty('Intermediate').length}
                        </div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Intermediate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: THEME.accent }}>
                            {getSongsByDifficulty('Advanced').length}
                        </div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Advanced</div>
                    </div>
                </div>

                {/* Song Grid */}
                {filteredSongs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {filteredSongs.map(song => (
                            <SongCard
                                key={song.id}
                                song={song}
                                onClick={() => handleSongClick(song)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p style={{ color: THEME.textLight }}>
                            No songs found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Song Player Modal */}
            {selectedSong && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedSong(null)}
                >
                    <div
                        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <button
                                onClick={() => setSelectedSong(null)}
                                className="absolute -top-2 -right-2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-warm-surface transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <SongPlayer song={selectedSong} onClose={() => setSelectedSong(null)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

