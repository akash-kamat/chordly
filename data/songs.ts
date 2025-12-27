import { Song } from '@/types';

export const SONGS: Song[] = [
    {
        id: 'stand-by-me',
        title: 'Stand By Me',
        artist: 'Ben E. King',
        progression: ['A Major', 'F# Minor', 'D Major', 'E Major'],
        difficulty: 'Beginner',
        bpm: 120,
        strumPattern: 'D DU UD U',
    },
    {
        id: 'knockin-on-heavens-door',
        title: "Knockin' on Heaven's Door",
        artist: 'Bob Dylan',
        progression: ['G Major', 'D Major', 'A Minor', 'A Minor'],
        difficulty: 'Beginner',
        bpm: 68,
        strumPattern: 'D DU UDU',
    },
    {
        id: 'wonderwall',
        title: 'Wonderwall',
        artist: 'Oasis',
        progression: ['E Minor', 'G Major', 'D Major', 'A7'],
        difficulty: 'Intermediate',
        bpm: 87,
        strumPattern: 'DD UDU',
    },
    {
        id: 'let-it-be',
        title: 'Let It Be',
        artist: 'The Beatles',
        progression: ['C Major', 'G Major', 'A Minor', 'F Major'],
        difficulty: 'Beginner',
        bpm: 75,
        strumPattern: 'D DU UDU',
    },
    {
        id: 'house-of-the-rising-sun',
        title: 'House of the Rising Sun',
        artist: 'The Animals',
        progression: ['A Minor', 'C Major', 'D Major', 'F Major', 'A Minor', 'E Major', 'A Minor', 'E Major'],
        difficulty: 'Intermediate',
        bpm: 84,
        strumPattern: 'Arpeggiated',
    },
    {
        id: 'horse-with-no-name',
        title: 'A Horse with No Name',
        artist: 'America',
        progression: ['E Minor', 'D Major'],
        difficulty: 'Beginner',
        bpm: 120,
        strumPattern: 'D DU UDU',
    },
    {
        id: 'zombie',
        title: 'Zombie',
        artist: 'The Cranberries',
        progression: ['E Minor', 'C Major', 'G Major', 'D Major'],
        difficulty: 'Beginner',
        bpm: 83,
        strumPattern: 'D DU UDU',
    },
    {
        id: 'wish-you-were-here',
        title: 'Wish You Were Here',
        artist: 'Pink Floyd',
        progression: ['E Minor', 'G Major', 'A Minor', 'G Major'],
        difficulty: 'Intermediate',
        bpm: 60,
        strumPattern: 'Fingerpick',
    },
    {
        id: 'hey-there-delilah',
        title: 'Hey There Delilah',
        artist: 'Plain White T\'s',
        progression: ['D Major', 'F# Minor', 'B Minor', 'G Major', 'A Major'],
        difficulty: 'Intermediate',
        bpm: 108,
        strumPattern: 'Fingerpick',
    },
    {
        id: 'riptide',
        title: 'Riptide',
        artist: 'Vance Joy',
        progression: ['A Minor', 'G Major', 'C Major'],
        difficulty: 'Beginner',
        bpm: 102,
        strumPattern: 'D DU UDU',
    },
];

export const getSongById = (id: string): Song | undefined => {
    return SONGS.find(song => song.id === id);
};

export const getSongsByDifficulty = (difficulty: Song['difficulty']): Song[] => {
    return SONGS.filter(song => song.difficulty === difficulty);
};

export const getSongsWithChord = (chordName: string): Song[] => {
    return SONGS.filter(song => song.progression.includes(chordName));
};
