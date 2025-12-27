import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AudioSettings, AppSettings, UserProgress } from '@/types';

interface AppState {
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
            // Current chord
            currentChord: 'C Major',
            setCurrentChord: (chord) => set({ currentChord: chord }),

            // Audio settings
            audioSettings: defaultAudioSettings,
            setAudioSettings: (settings) =>
                set((state) => ({
                    audioSettings: { ...state.audioSettings, ...settings },
                })),

            // App settings
            appSettings: defaultAppSettings,
            setAppSettings: (settings) =>
                set((state) => ({
                    appSettings: { ...state.appSettings, ...settings },
                })),

            // Progress
            progress: defaultProgress,
            updateProgress: (updates) =>
                set((state) => ({
                    progress: { ...state.progress, ...updates },
                })),
            completeLesson: (lessonId) =>
                set((state) => {
                    if (state.progress.lessonsCompleted.includes(lessonId)) {
                        return state;
                    }
                    return {
                        progress: {
                            ...state.progress,
                            lessonsCompleted: [...state.progress.lessonsCompleted, lessonId],
                        },
                    };
                }),
            addChordLearned: (chordName) =>
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
                }),
            addSongLearned: (songId) =>
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
                }),
            updateStreak: () =>
                set((state) => {
                    const today = new Date().toISOString().split('T')[0];
                    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                    const lastPractice = state.progress.lastPracticeDate;

                    let newStreak = state.progress.currentStreak;

                    if (lastPractice === today) {
                        // Already practiced today
                        return state;
                    } else if (lastPractice === yesterday) {
                        // Streak continues
                        newStreak += 1;
                    } else {
                        // Streak broken
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
                }),

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
            }),
        }
    )
);
