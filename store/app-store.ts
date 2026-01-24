
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AudioSettings, AppSettings, UserProgress, UserProfile } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface AppState {
    // Auth State
    user: User | null;
    profile: UserProfile | null;
    isLoadingAuth: boolean;
    setIsLoadingAuth: (loading: boolean) => void;
    setUser: (user: User | null) => void;
    setProfile: (profile: UserProfile | null) => void;
    signInWithOAuth: (provider: 'google' | 'github') => Promise<void>;
    signOut: () => Promise<void>;

    // Current selections
    currentChord: string;
    setCurrentChord: (chord: string) => void;

    // Audio settings
    audioSettings: AudioSettings;
    setAudioSettings: (settings: Partial<AudioSettings>) => void;

    // App settings
    appSettings: AppSettings;
    setAppSettings: (settings: Partial<AppSettings>) => void;

    // User progress (persisted)
    progress: UserProgress;
    updateProgress: (updates: Partial<UserProgress>) => void;
    completeLesson: (lessonId: string) => void;
    addChordLearned: (chordName: string) => void;
    addSongLearned: (songId: string) => void;
    updateStreak: () => void;

    // Sync State
    isSyncing: boolean;
    syncWithCloud: () => Promise<void>;

    // Practice state
    isPracticing: boolean;
    setIsPracticing: (value: boolean) => void;
    practiceAccuracy: number;
    setPracticeAccuracy: (value: number) => void;

    // Metronome
    isMetronomeOn: boolean;
    setIsMetronomeOn: (value: boolean) => void;
    bpm: number;
    setBpm: (value: number) => void;

    // UI state
    activeSection: string;
    setActiveSection: (section: string) => void;
    theoryModule: string;
    setTheoryModule: (module: string) => void;
}

const defaultAudioSettings: AudioSettings = {
    volume: 0.5,
    tone: 0.2,
    sustain: 1.5,
    strumSpeed: 0.06,
    instrument: 'acoustic_guitar_nylon',
};

const defaultAppSettings: AppSettings = {
    leftHanded: false,
    fretCount: 5,
    showFingerNumbers: true,
    showNoteNames: false,
    metronomeEnabled: true,
    bpm: 80,
};

const defaultProgress: UserProgress = {
    lessonsCompleted: [],
    chordsLearned: [],
    songsLearned: [],
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: '',
    totalPracticeMinutes: 0,
    accuracy: 0,
    skillLevel: 1,
};

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Auth
            user: null,
            profile: null,
            isLoadingAuth: true,
            setIsLoadingAuth: (loading) => set({ isLoadingAuth: loading }),
            setUser: (user) => set({ user }),
            setProfile: (profile) => set({ profile }),

            signInWithOAuth: async (provider) => {
                const supabase = createClient();
                await supabase.auth.signInWithOAuth({
                    provider,
                    options: {
                        redirectTo: `${window.location.origin}/auth/callback`,
                    },
                });
            },

            signOut: async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                set({ user: null, profile: null });
            },

            // Current chord
            currentChord: 'C Major',
            setCurrentChord: (chord) => set({ currentChord: chord }),

            // Audio settings
            audioSettings: defaultAudioSettings,
            setAudioSettings: (settings) => {
                set((state) => ({
                    audioSettings: { ...state.audioSettings, ...settings },
                }));
                get().syncWithCloud();
            },

            // App settings
            appSettings: defaultAppSettings,
            setAppSettings: (settings) => {
                set((state) => ({
                    appSettings: { ...state.appSettings, ...settings },
                }));
                get().syncWithCloud();
            },

            // Progress
            progress: defaultProgress,
            updateProgress: (updates) => {
                set((state) => ({
                    progress: { ...state.progress, ...updates },
                }));
                get().syncWithCloud();
            },
            completeLesson: (lessonId) => {
                set((state) => {
                    if (state.progress.lessonsCompleted.includes(lessonId)) {
                        return state;
                    }
                    const newState = {
                        progress: {
                            ...state.progress,
                            lessonsCompleted: [...state.progress.lessonsCompleted, lessonId],
                        },
                    };
                    return newState;
                });
                get().syncWithCloud();
            },
            addChordLearned: (chordName) => {
                set((state) => {
                    if (state.progress.chordsLearned.includes(chordName)) {
                        return state;
                    }
                    return {
                        progress: {
                            ...state.progress,
                            chordsLearned: [...state.progress.chordsLearned, chordName],
                        },
                    };
                });
                get().syncWithCloud();
            },
            addSongLearned: (songId) => {
                set((state) => {
                    if (state.progress.songsLearned.includes(songId)) {
                        return state;
                    }
                    return {
                        progress: {
                            ...state.progress,
                            songsLearned: [...state.progress.songsLearned, songId],
                        },
                    };
                });
                get().syncWithCloud();
            },
            updateStreak: () => {
                set((state) => {
                    const today = new Date().toISOString().split('T')[0];
                    const lastPractice = state.progress.lastPracticeDate;

                    if (lastPractice === today) return state;

                    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                    let newStreak = state.progress.currentStreak;

                    if (lastPractice === yesterday) {
                        newStreak += 1;
                    } else if (lastPractice !== today) {
                        newStreak = 1;
                    }

                    return {
                        progress: {
                            ...state.progress,
                            currentStreak: newStreak,
                            longestStreak: Math.max(newStreak, state.progress.longestStreak),
                            lastPracticeDate: today,
                        },
                    };
                });
                get().syncWithCloud();
            },

            // Sync Logic
            isSyncing: false,
            syncWithCloud: async () => {
                const state = get();
                if (!state.user || state.isSyncing) return;

                set({ isSyncing: true });
                const supabase = createClient();

                try {
                    // Push local state to cloud
                    // In a real app, you might want more complex merge logic (last-write-wins by timestamp)
                    await supabase.from('user_settings').upsert({
                        user_id: state.user.id,
                        updated_at: new Date().toISOString(),
                        audio_settings: state.audioSettings,
                        app_settings: state.appSettings,
                    });

                    await supabase.from('user_progress').upsert({
                        user_id: state.user.id,
                        updated_at: new Date().toISOString(),
                        ...state.progress // Spread flat properties
                        // Note: lessons_completed etc. need to be mapped if SQL arrays differ from JSON
                    });

                } catch (error) {
                    console.error('Sync failed:', error);
                } finally {
                    set({ isSyncing: false });
                }
            },

            // Practice
            isPracticing: false,
            setIsPracticing: (value) => set({ isPracticing: value }),
            practiceAccuracy: 0,
            setPracticeAccuracy: (value) => set({ practiceAccuracy: value }),

            // Metronome
            isMetronomeOn: false,
            setIsMetronomeOn: (value) => set({ isMetronomeOn: value }),
            bpm: 80,
            setBpm: (value) => set({ bpm: value }),

            // UI
            activeSection: 'fundamentals',
            setActiveSection: (section) => set({ activeSection: section }),
            theoryModule: 'strings',
            setTheoryModule: (module) => set({ theoryModule: module }),
        }),
        {
            name: 'chordly-storage',
            partialize: (state) => ({
                progress: state.progress,
                appSettings: state.appSettings,
                audioSettings: state.audioSettings,
                // Do NOT persist user object, let Supabase auth listener handle re-hydration
            }),
            onRehydrateStorage: () => (state) => {
                // Initialize auth listener
                if (typeof window !== 'undefined') {
                    // This runs after hydration
                    const supabase = createClient();
                    supabase.auth.getSession().then(({ data: { session } }) => {
                        if (session?.user) {
                            state?.setUser(session.user);
                            // Fetch profile + latest data

                        }
                        state?.setIsLoadingAuth(false);
                    });

                    supabase.auth.onAuthStateChange((_event, session) => {
                        state?.setUser(session?.user ?? null);
                        if (session?.user) {
                            // Trigger a pull from cloud? 
                            // For now, let's keep it simple: if you log in, we might want to merge
                        }
                    });
                }
            }
        }
    )
);
