'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { THEME, TUNING } from '@/types';

// Simple pitch detection using autocorrelation
function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;

    // Calculate RMS (volume)
    for (let i = 0; i < SIZE; i++) {
        rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / SIZE);

    // Not enough signal
    if (rms < 0.01) return -1;

    let lastCorrelation = 1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;

        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += Math.abs(buffer[i] - buffer[i + offset]);
        }

        correlation = 1 - correlation / MAX_SAMPLES;

        if (correlation > 0.9 && correlation > lastCorrelation) {
            foundGoodCorrelation = true;
            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        } else if (foundGoodCorrelation) {
            break;
        }

        lastCorrelation = correlation;
    }

    if (bestCorrelation > 0.01 && bestOffset !== -1) {
        return sampleRate / bestOffset;
    }

    return -1;
}

// Convert frequency to note name
function frequencyToNote(freq: number): { note: string; octave: number; cents: number } {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);

    const halfSteps = 12 * Math.log2(freq / c0);
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = Math.round(halfSteps) % 12;
    const cents = Math.round((halfSteps - Math.round(halfSteps)) * 100);

    return {
        note: noteNames[noteIndex < 0 ? noteIndex + 12 : noteIndex],
        octave,
        cents
    };
}

// Find closest guitar string
function findClosestString(freq: number): { string: { note: string; freq: number; name: string; octave: number }; diff: number } | null {
    if (freq < 60 || freq > 400) return null;

    let closestIdx = 0;
    let minDiff = Math.abs(freq - TUNING[0].freq);

    for (let i = 0; i < TUNING.length; i++) {
        const diff = Math.abs(freq - TUNING[i].freq);
        if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
        }
    }

    const closest = TUNING[closestIdx];
    return { string: { note: closest.note, freq: closest.freq, name: closest.name, octave: closest.octave }, diff: minDiff };
}

export function PitchDetector() {
    const [isListening, setIsListening] = useState(false);
    const [detectedFreq, setDetectedFreq] = useState<number | null>(null);
    const [detectedNote, setDetectedNote] = useState<string | null>(null);
    const [closestString, setClosestString] = useState<{ note: string; freq: number; name: string; octave: number } | null>(null);
    const [tuningDiff, setTuningDiff] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            setIsListening(true);
            detectPitch();
        } catch (err) {
            console.error('Microphone access denied:', err);
        }
    };

    const stopListening = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        setIsListening(false);
        setDetectedFreq(null);
        setDetectedNote(null);
        setClosestString(null);
    };

    const detectPitch = () => {
        if (!analyserRef.current || !audioContextRef.current) return;

        const buffer = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(buffer);

        // Calculate volume
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i] * buffer[i];
        }
        const rms = Math.sqrt(sum / buffer.length);
        setVolume(Math.min(1, rms * 10));

        const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

        if (freq > 0) {
            setDetectedFreq(freq);
            const noteInfo = frequencyToNote(freq);
            setDetectedNote(`${noteInfo.note}${noteInfo.octave}`);

            const closest = findClosestString(freq);
            if (closest) {
                setClosestString(closest.string);
                // Calculate cents difference for tuning indicator
                const cents = 1200 * Math.log2(freq / closest.string.freq);
                setTuningDiff(cents);
            }
        }

        animationFrameRef.current = requestAnimationFrame(detectPitch);
    };

    useEffect(() => {
        return () => stopListening();
    }, []);

    // Tuning accuracy indicator
    const getTuningColor = () => {
        if (Math.abs(tuningDiff) < 5) return THEME.success;
        if (Math.abs(tuningDiff) < 15) return THEME.warning;
        return THEME.error;
    };

    return (
        <div
            className="bg-white p-6 rounded-2xl border shadow-sm"
            style={{ borderColor: THEME.border }}
        >
            <h3 className="font-bold text-lg mb-4">Tuner / Pitch Detector</h3>

            {/* Microphone Button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening ? 'animate-pulse-glow' : ''
                        }`}
                    style={{
                        backgroundColor: isListening ? THEME.accent : THEME.surface,
                        color: isListening ? 'white' : THEME.text
                    }}
                >
                    {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
            </div>

            {/* Detected Note Display */}
            {isListening && (
                <div className="text-center space-y-4">
                    {/* Main note display */}
                    <div>
                        <span
                            className="text-6xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.accent }}
                        >
                            {detectedNote || '--'}
                        </span>
                        {detectedFreq && (
                            <p className="text-sm mt-1" style={{ color: THEME.textLight }}>
                                {detectedFreq.toFixed(1)} Hz
                            </p>
                        )}
                    </div>

                    {/* Tuning indicator */}
                    {closestString && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                Closest string: <span style={{ color: THEME.accent }}>{closestString.name}</span>
                            </p>

                            {/* Visual tuning meter */}
                            <div className="relative h-4 bg-warm-surface rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 h-full w-1 bg-black transition-all duration-100"
                                    style={{
                                        left: `${50 + Math.max(-50, Math.min(50, tuningDiff))}%`,
                                        transform: 'translateX(-50%)'
                                    }}
                                />
                                {/* Center marker */}
                                <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-300" />
                            </div>

                            {/* Tuning status */}
                            <p
                                className="text-sm font-bold"
                                style={{ color: getTuningColor() }}
                            >
                                {Math.abs(tuningDiff) < 5 ? 'In Tune! ✓' :
                                    tuningDiff > 0 ? 'Too High ↑' : 'Too Low ↓'}
                            </p>
                        </div>
                    )}

                    {/* Volume indicator */}
                    <div className="flex items-center justify-center gap-2">
                        <Volume2 size={16} style={{ color: THEME.textLight }} />
                        <div className="w-24 h-2 bg-warm-surface rounded-full overflow-hidden">
                            <div
                                className="h-full transition-all duration-75"
                                style={{
                                    width: `${volume * 100}%`,
                                    backgroundColor: THEME.accentSec
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {!isListening && (
                <p className="text-center text-sm" style={{ color: THEME.textLight }}>
                    Click the microphone to start tuning
                </p>
            )}
        </div>
    );
}
