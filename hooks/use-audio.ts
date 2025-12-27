'use client';

import { useRef, useCallback } from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player';
import { TUNING, AudioSettings } from '@/types';

// Note names for MIDI conversion
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Convert frequency to note name
function frequencyToNote(freq: number): string {
    const midi = Math.round(12 * Math.log2(freq / 440) + 69);
    const octave = Math.floor(midi / 12) - 1;
    const noteIndex = midi % 12;
    return `${NOTE_NAMES[noteIndex]}${octave}`;
}

// Get MIDI note for a string at a fret
function getStringNote(stringIndex: number, fret: number): string {
    // stringIndex: 0 = high e (top in standard notation), 5 = low E
    // TUNING is ordered from high E (index 0) to low E (index 5)
    const baseFreq = TUNING[stringIndex].freq;
    const freq = baseFreq * Math.pow(2, fret / 12);
    return frequencyToNote(freq);
}

export function useAudio() {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const instrumentRef = useRef<Player | null>(null);
    const isLoadingRef = useRef<boolean>(false);

    // Initialize audio context and load soundfont
    const initAudio = useCallback(async () => {
        if (audioCtxRef.current && instrumentRef.current) {
            if (audioCtxRef.current.state === 'suspended') {
                await audioCtxRef.current.resume();
            }
            return;
        }

        if (isLoadingRef.current) return;
        isLoadingRef.current = true;

        try {
            const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
            audioCtxRef.current = new AudioContext();

            // Load acoustic guitar soundfont
            instrumentRef.current = await Soundfont.instrument(
                audioCtxRef.current,
                'acoustic_guitar_nylon' as InstrumentName,
                {
                    soundfont: 'MusyngKite',
                    gain: 2,
                }
            );
        } catch (error) {
            console.error('Failed to load soundfont:', error);
        } finally {
            isLoadingRef.current = false;
        }
    }, []);

    // Play a single string at a specific fret
    const playString = useCallback(async (
        stringIndex: number, // 0 = high e, 5 = low E (matches positions array)
        fret: number,
        settings: Partial<AudioSettings> = {}
    ) => {
        if (fret === -1) return; // Muted string

        await initAudio();

        if (!instrumentRef.current || !audioCtxRef.current) {
            console.warn('Audio not initialized');
            return;
        }

        const note = getStringNote(stringIndex, fret);
        const volume = settings.volume ?? 0.5;
        const sustain = settings.sustain ?? 1.5;

        try {
            instrumentRef.current.play(note, audioCtxRef.current.currentTime, {
                gain: volume * 2,
                duration: sustain,
            });
        } catch (error) {
            console.error('Error playing note:', error);
        }
    }, [initAudio]);

    // Strum a chord (array of fret positions for each string)
    const strumChord = useCallback(async (
        positions: number[], // [E, A, D, G, B, e] fret positions
        settings: Partial<AudioSettings> = {}
    ) => {
        await initAudio();

        if (!instrumentRef.current || !audioCtxRef.current) {
            console.warn('Audio not initialized');
            return;
        }

        const strumSpeed = settings.strumSpeed ?? 0.06;
        const volume = settings.volume ?? 0.5;
        const sustain = settings.sustain ?? 2;

        // Strum from low E (index 5) to high e (index 0) for downstroke
        // positions array is [low E, A, D, G, B, high e] matching the chord data
        // But our TUNING is reversed, so we need to adjust

        positions.forEach((fret, i) => {
            if (fret === -1) return; // Skip muted strings

            // Convert positions index to TUNING index
            // positions[0] = low E, but in our visual/audio, index 0 = high e
            const stringIndex = 5 - i; // Reverse to match TUNING

            setTimeout(() => {
                const note = getStringNote(stringIndex, fret);
                try {
                    instrumentRef.current?.play(note, audioCtxRef.current!.currentTime, {
                        gain: volume * 2 * (0.9 + Math.random() * 0.2), // Slight volume variation
                        duration: sustain,
                    });
                } catch (error) {
                    console.error('Error playing note:', error);
                }
            }, i * strumSpeed * 1000 + Math.random() * 10); // Natural timing variation
        });
    }, [initAudio]);

    // Play a reference note for tuning
    const playTuningNote = useCallback(async (stringIndex: number, duration: number = 2) => {
        await initAudio();

        if (!instrumentRef.current || !audioCtxRef.current) {
            return;
        }

        const note = getStringNote(stringIndex, 0); // Open string

        try {
            instrumentRef.current.play(note, audioCtxRef.current.currentTime, {
                gain: 1,
                duration: duration,
            });
        } catch (error) {
            console.error('Error playing tuning note:', error);
        }
    }, [initAudio]);

    return {
        playString,
        strumChord,
        playTuningNote,
        initAudio,
    };
}
