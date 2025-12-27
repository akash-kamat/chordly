import { Lesson } from '@/types';

export const LESSONS: Lesson[] = [
    // === BASICS TRACK ===
    {
        id: 'holding-guitar',
        title: 'Holding Your Guitar',
        description: 'Learn the proper posture and how to hold your guitar comfortably.',
        track: 'basics',
        difficulty: 'beginner',
        duration: 5,
        prerequisites: [],
        isLocked: false,
        steps: [
            { type: 'explanation', title: 'Posture Basics', content: 'Sit up straight with the guitar body resting on your right leg (if right-handed). The neck should angle slightly upward.' },
            { type: 'explanation', title: 'Left Hand Position', content: 'Your thumb should rest on the back of the neck, not wrap around. Keep your wrist straight and fingers curved.' },
            { type: 'demonstration', title: 'Watch the Position', content: 'Notice how the fingers approach the fretboard from above, not from the side.' },
            { type: 'checkpoint', title: 'Ready to Continue', content: 'Are you comfortable with your posture? Take a moment to adjust if needed.' },
        ],
    },
    {
        id: 'reading-diagrams',
        title: 'Reading Chord Diagrams',
        description: 'Understand how to read chord diagrams and tablature.',
        track: 'basics',
        difficulty: 'beginner',
        duration: 10,
        prerequisites: ['holding-guitar'],
        isLocked: false,
        steps: [
            { type: 'explanation', title: 'What is a Chord Diagram?', content: 'A chord diagram is a vertical snapshot of the fretboard. The left edge is the low E string, right edge is high e. Vertical lines are strings, horizontal lines are frets.' },
            { type: 'explanation', title: 'Reading the Symbols', content: 'Circles show where to place your fingers. Numbers inside indicate which finger to use (1=index, 2=middle, 3=ring, 4=pinky). X means mute the string, O means play it open.' },
            { type: 'demonstration', title: 'C Major Example', content: 'Let\'s look at a C Major chord diagram.', chords: ['C Major'] },
            { type: 'checkpoint', title: 'Knowledge Check', content: 'Can you identify which strings to play and which to mute?' },
        ],
    },
    {
        id: 'tuning',
        title: 'Tuning Your Guitar',
        description: 'Learn standard tuning and how to tune your guitar by ear.',
        track: 'basics',
        difficulty: 'beginner',
        duration: 10,
        prerequisites: ['holding-guitar'],
        isLocked: false,
        steps: [
            { type: 'explanation', title: 'Standard Tuning', content: 'From thickest to thinnest: E-A-D-G-B-e. Remember: Eddie Ate Dynamite Good Bye Eddie!' },
            { type: 'explanation', title: 'Tuning by Reference', content: 'Each string when fretted at the 5th fret should match the open string above it (except B string - use 4th fret on G).' },
            { type: 'demonstration', title: 'Hear the Notes', content: 'Click each string to hear the correct pitch.' },
            { type: 'exercise', title: 'Match the Pitch', content: 'Play your guitar and match each string to the reference pitch.' },
            { type: 'checkpoint', title: 'Tuning Complete', content: 'Your guitar should now be in tune!' },
        ],
    },

    // === CHORDS TRACK ===
    {
        id: 'first-chord-e-minor',
        title: 'Your First Chord: E Minor',
        description: 'Learn E Minor - one of the easiest chords to play.',
        track: 'chords',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['reading-diagrams'],
        isLocked: false,
        steps: [
            { type: 'explanation', title: 'Why E Minor First?', content: 'E Minor only requires two fingers and all six strings ring out. It\'s the perfect starter chord!' },
            { type: 'demonstration', title: 'E Minor Shape', content: 'Place your 2nd and 3rd fingers on the A and D strings at the 2nd fret.', chords: ['E Minor'] },
            { type: 'exercise', title: 'Play E Minor', content: 'Strum all six strings from top to bottom. Each note should ring clearly.', chords: ['E Minor'], duration: 60 },
            { type: 'validation', title: 'Check Your Sound', content: 'Strum the chord and we\'ll check if all notes are ringing clearly.' },
            { type: 'checkpoint', title: 'E Minor Mastered!', content: 'Congratulations on your first chord!' },
        ],
    },
    {
        id: 'chord-a-major',
        title: 'A Major Chord',
        description: 'Learn the bright and happy A Major chord.',
        track: 'chords',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['first-chord-e-minor'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'About A Major', content: 'A Major is a happy, energetic chord used in countless songs. All three fingers line up on the 2nd fret.' },
            { type: 'demonstration', title: 'A Major Shape', content: 'Place fingers 1, 2, 3 on strings D, G, B at the 2nd fret.', chords: ['A Major'] },
            { type: 'exercise', title: 'Practice A Major', content: 'Strum from the A string down (skip the low E).', chords: ['A Major'], duration: 60 },
            { type: 'validation', title: 'Check Your Chord', content: 'Play the chord and we\'ll verify it sounds correct.' },
            { type: 'checkpoint', title: 'A Major Complete', content: 'Great job! You now know two chords!' },
        ],
    },
    {
        id: 'chord-d-major',
        title: 'D Major Chord',
        description: 'Learn the triumphant D Major chord.',
        track: 'chords',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['chord-a-major'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'About D Major', content: 'D Major has a bright, triumphant sound. This chord uses the top 4 strings only.' },
            { type: 'demonstration', title: 'D Major Shape', content: 'Create a small triangle shape with fingers 1, 2, 3.', chords: ['D Major'] },
            { type: 'exercise', title: 'Practice D Major', content: 'Start your strum from the D string.', chords: ['D Major'], duration: 60 },
            { type: 'validation', title: 'Validation', content: 'Play D Major for validation.' },
            { type: 'checkpoint', title: 'D Major Complete', content: 'Three chords! You can already play many songs!' },
        ],
    },
    {
        id: 'chord-g-major',
        title: 'G Major Chord',
        description: 'Learn the full and solid G Major chord.',
        track: 'chords',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['chord-d-major'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'About G Major', content: 'G Major uses all six strings and has a full, solid sound. It takes a bit more finger stretching!' },
            { type: 'demonstration', title: 'G Major Shape', content: 'Fingers span from the low E to the high e string.', chords: ['G Major'] },
            { type: 'exercise', title: 'Practice G Major', content: 'Strum all six strings.', chords: ['G Major'], duration: 60 },
            { type: 'validation', title: 'Validation', content: 'Play G Major for validation.' },
            { type: 'checkpoint', title: 'G Major Complete', content: 'Four chords! You\'re building a solid foundation.' },
        ],
    },
    {
        id: 'chord-c-major',
        title: 'C Major Chord',
        description: 'Learn the bright and stable C Major chord.',
        track: 'chords',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['chord-g-major'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'About C Major', content: 'C Major is one of the most used chords in music. It spans three frets and requires finger independence.' },
            { type: 'demonstration', title: 'C Major Shape', content: 'Place fingers across three different frets in an ascending pattern.', chords: ['C Major'] },
            { type: 'exercise', title: 'Practice C Major', content: 'Strum from the A string down.', chords: ['C Major'], duration: 60 },
            { type: 'validation', title: 'Validation', content: 'Play C Major for validation.' },
            { type: 'checkpoint', title: 'C Major Complete', content: 'Five essential chords mastered!' },
        ],
    },

    // === RHYTHM TRACK ===
    {
        id: 'basic-strumming',
        title: 'Basic Strumming',
        description: 'Learn downstroke strumming patterns.',
        track: 'rhythm',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['first-chord-e-minor'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'The Downstroke', content: 'Hold your pick at a slight angle and strum downward across the strings in one smooth motion.' },
            { type: 'demonstration', title: 'Basic Pattern', content: 'Practice: Down-Down-Down-Down on E Minor.', chords: ['E Minor'] },
            { type: 'exercise', title: 'With the Metronome', content: 'Play one downstroke per beat at 60 BPM.', chords: ['E Minor'], duration: 60 },
            { type: 'validation', title: 'Timing Check', content: 'Play along with the metronome and we\'ll check your timing.' },
            { type: 'checkpoint', title: 'Strumming Basics Complete', content: 'You\'ve learned fundamental strumming!' },
        ],
    },
    {
        id: 'upstroke-strumming',
        title: 'Adding Upstrokes',
        description: 'Learn to combine downstrokes and upstrokes.',
        track: 'rhythm',
        difficulty: 'beginner',
        duration: 15,
        prerequisites: ['basic-strumming'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'The Upstroke', content: 'After a downstroke, bring your pick back up through the strings. Upstrokes typically hit fewer strings.' },
            { type: 'demonstration', title: 'Down-Up Pattern', content: 'Practice the pattern: Down-Up-Down-Up.' },
            { type: 'exercise', title: 'Eighth Note Strumming', content: 'Play Down-Up for each beat: D U D U D U D U', duration: 60 },
            { type: 'checkpoint', title: 'Upstrokes Complete', content: 'You can now play eighth note patterns!' },
        ],
    },

    // === SONGS TRACK ===
    {
        id: 'first-song-horse-no-name',
        title: 'Your First Song: A Horse with No Name',
        description: 'Learn to play a complete song with just two chords!',
        track: 'songs',
        difficulty: 'beginner',
        duration: 20,
        prerequisites: ['first-chord-e-minor', 'chord-d-major'],
        isLocked: true,
        steps: [
            { type: 'explanation', title: 'About This Song', content: 'This 1972 classic by America uses just Em and D - perfect for beginners!' },
            { type: 'demonstration', title: 'The Progression', content: 'The whole song alternates between E Minor and D Major.', chords: ['E Minor', 'D Major'] },
            { type: 'exercise', title: 'Chord Changes', content: 'Practice switching between Em and D every 4 beats.', chords: ['E Minor', 'D Major'], duration: 120 },
            { type: 'exercise', title: 'Full Song', content: 'Now play along with the song at full speed!' },
            { type: 'checkpoint', title: 'Song Complete!', content: 'Congratulations on learning your first song!' },
        ],
    },
];

export const getLessonById = (id: string): Lesson | undefined => {
    return LESSONS.find(lesson => lesson.id === id);
};

export const getLessonsByTrack = (track: Lesson['track']): Lesson[] => {
    return LESSONS.filter(lesson => lesson.track === track);
};

export const getUnlockedLessons = (): Lesson[] => {
    return LESSONS.filter(lesson => !lesson.isLocked);
};

export const LEARNING_TRACKS = [
    { id: 'basics', name: 'Basics', icon: 'BookOpen', description: 'Fundamentals of guitar playing' },
    { id: 'chords', name: 'Chords', icon: 'Grid', description: 'Learn essential chord shapes' },
    { id: 'rhythm', name: 'Rhythm', icon: 'Music', description: 'Strumming patterns and timing' },
    { id: 'scales', name: 'Scales', icon: 'TrendingUp', description: 'Scale patterns for solos' },
    { id: 'songs', name: 'Songs', icon: 'Disc', description: 'Learn complete songs' },
    { id: 'theory', name: 'Theory', icon: 'Lightbulb', description: 'Understand the why' },
    { id: 'techniques', name: 'Techniques', icon: 'Zap', description: 'Advanced playing techniques' },
] as const;
