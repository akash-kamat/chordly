'use client';

import { THEME } from '@/types';
import { SONGS } from '@/data/songs';
import { CHORDS } from '@/data/chords';
import { SongList } from '@/components/songs/song-card';
import { ProgressTracker } from '@/components/progress/progress-tracker';
import { useAudio } from '@/hooks/use-audio';
import { useAppStore } from '@/store/app-store';

export function SongsSection() {
    const audioSettings = useAppStore((state) => state.audioSettings);
    const { strumChord } = useAudio();

    const handleSongClick = (song: typeof SONGS[0]) => {
        // Play the first chord of the progression and scroll to workshop
        const firstChord = song.progression[0];
        const chordData = CHORDS[firstChord];

        if (chordData) {
            strumChord(chordData.positions, audioSettings);
        }

        // Scroll to workshop section
        const workshopEl = document.getElementById('workshop');
        if (workshopEl) {
            window.scrollTo({
                top: workshopEl.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="songs" className="scroll-mt-32">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left: Title and Progress */}
                <div className="lg:col-span-1">
                    <h2
                        className="text-3xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        Repertoire
                    </h2>
                    <p
                        className="leading-relaxed mb-6"
                        style={{ color: THEME.textLight }}
                    >
                        Applying theory to practice. These songs use common progressions
                        (I-IV-V) found in western music.
                    </p>

                    <ProgressTracker />
                </div>

                {/* Right: Song list */}
                <div className="lg:col-span-2">
                    <SongList
                        songs={SONGS}
                        onSongClick={handleSongClick}
                    />
                </div>
            </div>
        </section>
    );
}
