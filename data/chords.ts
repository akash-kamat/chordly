import { Chord } from '@/types';

export const CHORDS: Record<string, Chord> = {
    // --- A ROOTS ---
    'A Major': {
        name: 'A Major',
        positions: [-1, 0, 2, 2, 2, 0],
        fingers: [null, null, 1, 2, 3, null],
        mood: 'Happy, energetic',
        difficulty: 'beginner',
    },
    'A Minor': {
        name: 'A Minor',
        positions: [-1, 0, 2, 2, 1, 0],
        fingers: [null, null, 2, 3, 1, null],
        mood: 'Sad, contemplative',
        difficulty: 'beginner',
    },
    'A7': {
        name: 'A7',
        positions: [-1, 0, 2, 0, 2, 0],
        fingers: [null, null, 2, null, 3, null],
        mood: 'Bluesy, unresolved',
        difficulty: 'beginner',
    },

    // --- B ROOTS ---
    'B Minor': {
        name: 'B Minor',
        positions: [-1, 2, 4, 4, 3, 2],
        fingers: [null, 1, 3, 4, 2, 1],
        barre: { fret: 2, start: 1, end: 5 },
        mood: 'Dark, introspective',
        difficulty: 'intermediate',
    },
    'B7': {
        name: 'B7',
        positions: [-1, 2, 1, 2, 0, 2],
        fingers: [null, 2, 1, 3, null, 4],
        mood: 'Tense, jazzy',
        difficulty: 'intermediate',
    },

    // --- C ROOTS ---
    'C Major': {
        name: 'C Major',
        positions: [-1, 3, 2, 0, 1, 0],
        fingers: [null, 3, 2, null, 1, null],
        mood: 'Bright, stable',
        difficulty: 'beginner',
    },
    'C Minor': {
        name: 'C Minor',
        positions: [-1, 3, 5, 5, 4, 3],
        fingers: [null, 1, 3, 4, 2, 1],
        barre: { fret: 3, start: 1, end: 5 },
        mood: 'Melancholic, dark',
        difficulty: 'intermediate',
    },

    // --- D ROOTS ---
    'D Major': {
        name: 'D Major',
        positions: [-1, -1, 0, 2, 3, 2],
        fingers: [null, null, null, 1, 3, 2],
        mood: 'Triumphant, bright',
        difficulty: 'beginner',
    },
    'D Minor': {
        name: 'D Minor',
        positions: [-1, -1, 0, 2, 3, 1],
        fingers: [null, null, null, 2, 3, 1],
        mood: 'Serious, sad',
        difficulty: 'beginner',
    },
    'D7': {
        name: 'D7',
        positions: [-1, -1, 0, 2, 1, 2],
        fingers: [null, null, null, 2, 1, 3],
        mood: 'Bluesy, expectant',
        difficulty: 'beginner',
    },

    // --- E ROOTS ---
    'E Major': {
        name: 'E Major',
        positions: [0, 2, 2, 1, 0, 0],
        fingers: [null, 2, 3, 1, null, null],
        mood: 'Powerful, full',
        difficulty: 'beginner',
    },
    'E Minor': {
        name: 'E Minor',
        positions: [0, 2, 2, 0, 0, 0],
        fingers: [null, 2, 3, null, null, null],
        mood: 'Mysterious, dark',
        difficulty: 'beginner',
    },
    'E7': {
        name: 'E7',
        positions: [0, 2, 0, 1, 0, 0],
        fingers: [null, 2, null, 1, null, null],
        mood: 'Bluesy, dominant',
        difficulty: 'beginner',
    },

    // --- F ROOTS ---
    'F Major': {
        name: 'F Major',
        positions: [1, 3, 3, 2, 1, 1],
        fingers: [1, 3, 4, 2, 1, 1],
        barre: { fret: 1, start: 0, end: 5 },
        mood: 'Hopeful, warm',
        difficulty: 'intermediate',
    },
    'F Minor': {
        name: 'F Minor',
        positions: [1, 3, 3, 1, 1, 1],
        fingers: [1, 3, 4, 1, 1, 1],
        barre: { fret: 1, start: 0, end: 5 },
        mood: 'Dramatic, tense',
        difficulty: 'advanced',
    },

    // --- G ROOTS ---
    'G Major': {
        name: 'G Major',
        positions: [3, 2, 0, 0, 0, 3],
        fingers: [2, 1, null, null, null, 3],
        mood: 'Solid, joyful',
        difficulty: 'beginner',
    },
    'G Minor': {
        name: 'G Minor',
        positions: [3, 5, 5, 3, 3, 3],
        fingers: [1, 3, 4, 1, 1, 1],
        barre: { fret: 3, start: 0, end: 5 },
        mood: 'Somber, reflective',
        difficulty: 'intermediate',
    },
    'G7': {
        name: 'G7',
        positions: [3, 2, 0, 0, 0, 1],
        fingers: [3, 2, null, null, null, 1],
        mood: 'Bluesy, transitional',
        difficulty: 'beginner',
    },

    // --- Additional Common Chords ---
    'F# Minor': {
        name: 'F# Minor',
        positions: [2, 4, 4, 2, 2, 2],
        fingers: [1, 3, 4, 1, 1, 1],
        barre: { fret: 2, start: 0, end: 5 },
        mood: 'Dramatic, emotional',
        difficulty: 'intermediate',
    },
};

export const CHORD_LIST = Object.keys(CHORDS);

export const BEGINNER_CHORDS = [
    'A Major', 'A Minor', 'C Major', 'D Major', 'D Minor',
    'E Major', 'E Minor', 'G Major'
];

export const INTERMEDIATE_CHORDS = [
    'F Major', 'B Minor', 'C Minor', 'G Minor', 'F# Minor'
];
