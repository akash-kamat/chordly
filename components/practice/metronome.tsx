'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { THEME } from '@/types';
import { useAppStore } from '@/store/app-store';

export function Metronome() {
    const { bpm, setBpm, isMetronomeOn, setIsMetronomeOn } = useAppStore();
    const [currentBeat, setCurrentBeat] = useState(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const intervalRef = useRef<number | null>(null);

    const playClick = useCallback((isAccent: boolean) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = isAccent ? 1000 : 800;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    }, []);

    useEffect(() => {
        if (isMetronomeOn) {
            const msPerBeat = 60000 / bpm;

            // Start immediately
            playClick(currentBeat === 0);

            intervalRef.current = window.setInterval(() => {
                setCurrentBeat(prev => {
                    const next = (prev + 1) % 4;
                    playClick(next === 0);
                    return next;
                });
            }, msPerBeat);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setCurrentBeat(0);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isMetronomeOn, bpm, playClick, currentBeat]);

    const handleBpmChange = (delta: number) => {
        const newBpm = Math.max(40, Math.min(200, bpm + delta));
        setBpm(newBpm);
    };

    return (
        <div
            className="bg-white p-6 rounded-2xl border shadow-sm"
            style={{ borderColor: THEME.border }}
        >
            <h3 className="font-bold text-lg mb-4">Metronome</h3>

            {/* BPM Display and Control */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={() => handleBpmChange(-5)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-warm-surface transition-colors"
                    style={{ borderColor: THEME.border }}
                >
                    -
                </button>

                <div className="text-center">
                    <span
                        className="text-4xl font-bold"
                        style={{ fontFamily: 'var(--font-serif)', color: THEME.accent }}
                    >
                        {bpm}
                    </span>
                    <p className="text-xs" style={{ color: THEME.textLight }}>BPM</p>
                </div>

                <button
                    onClick={() => handleBpmChange(5)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-warm-surface transition-colors"
                    style={{ borderColor: THEME.border }}
                >
                    +
                </button>
            </div>

            {/* Beat Indicators */}
            <div className="flex justify-center gap-3 mb-6">
                {[0, 1, 2, 3].map(beat => (
                    <div
                        key={beat}
                        className={`metronome-beat ${currentBeat === beat && isMetronomeOn ? 'active' : ''} ${beat === 0 ? 'downbeat' : ''}`}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setIsMetronomeOn(!isMetronomeOn)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all"
                    style={{ backgroundColor: isMetronomeOn ? THEME.accent : THEME.text }}
                >
                    {isMetronomeOn ? (
                        <>
                            <Pause size={18} /> Stop
                        </>
                    ) : (
                        <>
                            <Play size={18} /> Start
                        </>
                    )}
                </button>

                <button
                    onClick={() => {
                        setIsMetronomeOn(false);
                        setCurrentBeat(0);
                    }}
                    className="p-3 rounded-xl border hover:bg-warm-surface transition-colors"
                    style={{ borderColor: THEME.border }}
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* BPM Slider */}
            <div className="mt-6">
                <input
                    type="range"
                    min="40"
                    max="200"
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value))}
                    className="w-full accent-accent"
                    style={{ accentColor: THEME.accent }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: THEME.textLight }}>
                    <span>40</span>
                    <span>120</span>
                    <span>200</span>
                </div>
            </div>
        </div>
    );
}
