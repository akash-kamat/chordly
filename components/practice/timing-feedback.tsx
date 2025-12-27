'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { THEME } from '@/types';

interface TimingResult {
    expected: number; // expected ms
    actual: number; // actual ms
    difference: number; // ms difference (+ = late, - = early)
    rating: 'perfect' | 'good' | 'early' | 'late';
}

interface TimingFeedbackProps {
    isActive: boolean;
    bpm: number;
    onStrum: (timingResult: TimingResult) => void;
}

export function TimingFeedback({ isActive, bpm, onStrum }: TimingFeedbackProps) {
    const [results, setResults] = useState<TimingResult[]>([]);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [showFeedback, setShowFeedback] = useState<TimingResult | null>(null);

    const beatIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const beatTimeRef = useRef<number>(0);

    const msPerBeat = 60000 / bpm;

    // Track beat timing
    useEffect(() => {
        if (!isActive) {
            if (beatIntervalRef.current) {
                clearInterval(beatIntervalRef.current);
            }
            return;
        }

        beatTimeRef.current = Date.now();

        beatIntervalRef.current = setInterval(() => {
            beatTimeRef.current = Date.now();
            setCurrentBeat(prev => (prev + 1) % 4);
        }, msPerBeat);

        return () => {
            if (beatIntervalRef.current) {
                clearInterval(beatIntervalRef.current);
            }
        };
    }, [isActive, msPerBeat]);

    // Handle user strum/tap
    const handleStrum = useCallback(() => {
        const now = Date.now();
        const timeSinceBeat = now - beatTimeRef.current;
        const timeToNextBeat = msPerBeat - timeSinceBeat;

        // Determine if closer to current beat or next beat
        const difference = timeSinceBeat < timeToNextBeat ? timeSinceBeat : -timeToNextBeat;

        let rating: TimingResult['rating'];
        if (Math.abs(difference) < 50) {
            rating = 'perfect';
        } else if (Math.abs(difference) < 100) {
            rating = 'good';
        } else if (difference < 0) {
            rating = 'early';
        } else {
            rating = 'late';
        }

        const result: TimingResult = {
            expected: beatTimeRef.current,
            actual: now,
            difference,
            rating
        };

        setResults(prev => [...prev.slice(-9), result]);
        setShowFeedback(result);
        onStrum(result);

        // Hide feedback after 500ms
        setTimeout(() => setShowFeedback(null), 500);
    }, [msPerBeat, onStrum]);

    // Calculate stats
    const perfectCount = results.filter(r => r.rating === 'perfect').length;
    const goodCount = results.filter(r => r.rating === 'good').length;
    const accuracy = results.length > 0
        ? Math.round(((perfectCount + goodCount) / results.length) * 100)
        : 0;
    const avgOffset = results.length > 0
        ? Math.round(results.reduce((sum, r) => sum + r.difference, 0) / results.length)
        : 0;

    const getFeedbackColor = (rating: TimingResult['rating']) => {
        switch (rating) {
            case 'perfect': return THEME.success;
            case 'good': return THEME.accentSec;
            case 'early': return THEME.warning;
            case 'late': return THEME.error;
        }
    };

    const getFeedbackIcon = (rating: TimingResult['rating']) => {
        switch (rating) {
            case 'perfect': return CheckCircle;
            case 'good': return CheckCircle;
            case 'early': return Clock;
            case 'late': return AlertTriangle;
        }
    };

    return (
        <div
            className="bg-white p-6 rounded-2xl border shadow-sm"
            style={{ borderColor: THEME.border }}
        >
            <h3 className="font-bold text-lg mb-4">Timing Trainer</h3>

            {/* Beat indicator */}
            <div className="flex justify-center gap-3 mb-6">
                {[0, 1, 2, 3].map(beat => (
                    <div
                        key={beat}
                        className={`w-6 h-6 rounded-full transition-all duration-100 ${isActive && currentBeat === beat ? 'scale-125 animate-beat' : ''
                            }`}
                        style={{
                            backgroundColor: isActive && currentBeat === beat ? THEME.accent : THEME.border,
                        }}
                    />
                ))}
            </div>

            {/* Tap button */}
            <button
                onClick={handleStrum}
                disabled={!isActive}
                className="w-full py-6 rounded-xl font-bold text-white text-xl mb-6 transition-all active:scale-95 disabled:opacity-50"
                style={{ backgroundColor: THEME.accent }}
            >
                TAP ON THE BEAT
            </button>

            {/* Visual feedback */}
            {showFeedback && (
                <div
                    className="flex items-center justify-center gap-2 mb-4 p-3 rounded-xl animate-fade-in"
                    style={{ backgroundColor: `${getFeedbackColor(showFeedback.rating)}20` }}
                >
                    {(() => {
                        const Icon = getFeedbackIcon(showFeedback.rating);
                        return <Icon size={24} style={{ color: getFeedbackColor(showFeedback.rating) }} />;
                    })()}
                    <span
                        className="font-bold text-lg capitalize"
                        style={{ color: getFeedbackColor(showFeedback.rating) }}
                    >
                        {showFeedback.rating}!
                    </span>
                    <span className="text-sm ml-2" style={{ color: THEME.textLight }}>
                        {showFeedback.difference > 0 ? '+' : ''}{showFeedback.difference}ms
                    </span>
                </div>
            )}

            {/* Stats */}
            <div
                className="grid grid-cols-3 gap-4 p-4 rounded-xl"
                style={{ backgroundColor: THEME.surface }}
            >
                <div className="text-center">
                    <div className="text-xl font-bold">{accuracy}%</div>
                    <div className="text-xs" style={{ color: THEME.textLight }}>Accuracy</div>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold">{perfectCount}</div>
                    <div className="text-xs" style={{ color: THEME.textLight }}>Perfect</div>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold">
                        {avgOffset > 0 ? '+' : ''}{avgOffset}ms
                    </div>
                    <div className="text-xs" style={{ color: THEME.textLight }}>
                        {avgOffset > 20 ? 'Playing late' : avgOffset < -20 ? 'Playing early' : 'On time'}
                    </div>
                </div>
            </div>

            {/* Recent hits visualization */}
            <div className="mt-4">
                <div className="text-xs mb-2" style={{ color: THEME.textLight }}>Last 10 taps:</div>
                <div className="flex gap-1">
                    {results.map((result, i) => (
                        <div
                            key={i}
                            className="flex-1 h-2 rounded-full"
                            style={{ backgroundColor: getFeedbackColor(result.rating) }}
                        />
                    ))}
                    {Array.from({ length: 10 - results.length }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="flex-1 h-2 rounded-full"
                            style={{ backgroundColor: THEME.border }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
