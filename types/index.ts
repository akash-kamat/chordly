// TypeScript types for Guitar Workshop

export interface Chord {
    name: string;
    positions: number[]; // -1 = muted, 0 = open, 1+ = fret number (6 strings: E A D G B e)
    fingers: (number | null)[]; // 1-4 = finger number, null = no finger
    barre?: {
        fret: number;
        start: number; // starting string (0 = low E)
        end: number;   // ending string
    };
    mood: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    progression: string[]; // chord names
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    bpm: number;
    strumPattern?: string;
    lyrics?: string;
}

export interface TheoryModule {
    id: string;
    title: string;
    desc: string;
    tip?: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    track: 'basics' | 'chords' | 'rhythm' | 'scales' | 'songs' | 'theory' | 'techniques';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // minutes
    prerequisites: string[]; // lesson IDs
    steps: LessonStep[];
    isLocked: boolean;
}

export interface LessonStep {
    type: 'explanation' | 'demonstration' | 'exercise' | 'validation' | 'checkpoint';
    title: string;
    content: string;
    chords?: string[]; // for demonstration/exercise
    duration?: number; // seconds
}

export interface UserProgress {
    lessonsCompleted: string[];
    chordsLearned: string[];
    songsLearned: string[];
    currentStreak: number;
    longestStreak: number;
    lastPracticeDate: string;
    totalPracticeMinutes: number;
    accuracy: number; // 0-100
    skillLevel: number; // 1-10 experience level
}

export interface PracticeSession {
    id: string;
    date: string;
    duration: number; // minutes
    type: 'warmup' | 'technique' | 'song' | 'review';
    chordsPlayed: string[];
    accuracy: number;
    timingScore: number;
    mistakes: PracticeMistake[];
}

export interface PracticeMistake {
    chord: string;
    type: 'wrong_note' | 'timing' | 'missed';
    count: number;
}

export interface AudioSettings {
    volume: number; // 0-1
    tone: number; // 0-1 (warm to bright)
    sustain: number; // seconds
    strumSpeed: number; // seconds between strings
}

export interface AppSettings {
    leftHanded: boolean;
    fretCount: number; // 5-22
    showFingerNumbers: boolean;
    showNoteNames: boolean;
    metronomeEnabled: boolean;
    bpm: number;
}

export const TUNING = [
    { note: 'E', freq: 329.63, name: 'High E', octave: 4 },
    { note: 'B', freq: 246.94, name: 'B', octave: 3 },
    { note: 'G', freq: 196.00, name: 'G', octave: 3 },
    { note: 'D', freq: 146.83, name: 'D', octave: 3 },
    { note: 'A', freq: 110.00, name: 'A', octave: 2 },
    { note: 'E', freq: 82.41, name: 'Low E', octave: 2 },
] as const;

export const THEME = {
    bg: '#FDFCF8',           // warm-bg
    surface: '#F5F2EA',      // warm-surface
    border: '#E6E2D8',       // warm-border
    text: '#4A4741',         // warm-text
    textLight: '#78756E',    // warm-text-light
    accent: '#C47F64',       // accent-primary (Terracotta)
    accentSec: '#8DA399',    // accent-secondary (Sage)
    highlight: '#D6CFC2',    // accent-highlight
    white: '#FFFFFF',
    success: '#4CAF50',
    error: '#E57373',
    warning: '#FFB74D',
} as const;
