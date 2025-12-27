import { TheoryModule } from '@/types';

export const THEORY_MODULES: TheoryModule[] = [
    {
        id: 'strings',
        title: 'The Strings',
        desc: 'Standard tuning (EADGBe) spans two octaves from low E (82.41 Hz) to high E (329.63 Hz). The thickest string is Low E on top, and the thinnest is high e on the bottom.',
        tip: 'Did you know? The tension on a steel string guitar is about 150-200 lbs total across all six strings.',
    },
    {
        id: 'frets',
        title: 'The Frets',
        desc: 'Each fret represents one semitone (half-step). Moving up 12 frets equals one full octave - the note doubles in frequency. As you move up the neck towards the body, the frets get narrower.',
        tip: 'The 12th fret is exactly halfway between the nut and bridge, producing the same note as the open string but one octave higher.',
    },
    {
        id: 'intervals',
        title: 'Intervals',
        desc: 'The distance between notes defines the character of chords. Major chords use a Major 3rd (4 semitones); Minor chords use a Minor 3rd (3 semitones). This tiny difference creates happy vs. sad emotions.',
        tip: 'Rock music relies heavily on "Power Chords" which use only the root and the 5th - no 3rd means neither major nor minor!',
    },
    {
        id: 'scales',
        title: 'Scales',
        desc: 'Scales are the building blocks of melodies and solos. The major scale follows a pattern of whole and half steps: W-W-H-W-W-W-H. The pentatonic scale (5 notes) is the most common for guitar solos.',
        tip: 'The minor pentatonic scale is used in 90% of rock and blues guitar solos. Learn one pattern and you can play over thousands of songs.',
    },
    {
        id: 'chord-construction',
        title: 'Chord Construction',
        desc: 'Chords are built by stacking intervals on top of a root note. A major chord = Root + Major 3rd + Perfect 5th. A minor chord = Root + Minor 3rd + Perfect 5th. 7th chords add another note on top.',
        tip: 'Once you understand how chords are built, you can figure out any chord shape on any part of the neck!',
    },
    {
        id: 'rhythm',
        title: 'Rhythm & Timing',
        desc: 'Music is organized into measures with time signatures. 4/4 (four beats per measure) is most common. Downstrokes hit on the beat (1-2-3-4), upstrokes fill the gaps (the "and" between beats).',
        tip: 'Practice with a metronome! Start slow (60 BPM) and only speed up when you can play perfectly.',
    },
];

export const getTheoryModuleById = (id: string): TheoryModule | undefined => {
    return THEORY_MODULES.find(module => module.id === id);
};
