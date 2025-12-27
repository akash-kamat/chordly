'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Target, TrendingUp, X } from 'lucide-react';
import { THEME } from '@/types';
import { useAppStore } from '@/store/app-store';

interface PracticeStats {
    totalTime: number; // in seconds
    chordsPlayed: number;
    correctStrums: number;
    totalStrums: number;
    avgTiming: number; // percentage, e.g., 85 = 85% on time
    streakBest: number;
}

interface PracticeSummaryProps {
    stats: PracticeStats;
    onClose: () => void;
    onRestart: () => void;
}

export function PracticeSummary({ stats, onClose, onRestart }: PracticeSummaryProps) {
    const accuracy = stats.totalStrums > 0
        ? Math.round((stats.correctStrums / stats.totalStrums) * 100)
        : 0;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getGrade = () => {
        if (accuracy >= 95 && stats.avgTiming >= 90) return { grade: 'A+', color: '#2E7D32', message: 'Perfect! You\'re a natural!' };
        if (accuracy >= 85 && stats.avgTiming >= 80) return { grade: 'A', color: '#388E3C', message: 'Excellent work!' };
        if (accuracy >= 75 && stats.avgTiming >= 70) return { grade: 'B', color: '#1976D2', message: 'Great progress!' };
        if (accuracy >= 60 && stats.avgTiming >= 60) return { grade: 'C', color: '#F57C00', message: 'Keep practicing!' };
        return { grade: 'D', color: '#D32F2F', message: 'More practice needed' };
    };

    const { grade, color, message } = getGrade();

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="p-8 text-center relative"
                    style={{ background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentSec})` }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <X size={20} color="white" />
                    </button>

                    <h2 className="text-white text-xl font-bold mb-4">Practice Complete!</h2>

                    {/* Grade circle */}
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'white' }}
                    >
                        <span
                            className="text-4xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color }}
                        >
                            {grade}
                        </span>
                    </div>

                    <p className="text-white/90 font-medium">{message}</p>
                </div>

                {/* Stats grid */}
                <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: THEME.surface }}>
                        <Clock size={24} className="mx-auto mb-2" style={{ color: THEME.accent }} />
                        <div className="text-2xl font-bold">{formatTime(stats.totalTime)}</div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Practice Time</div>
                    </div>

                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: THEME.surface }}>
                        <Target size={24} className="mx-auto mb-2" style={{ color: THEME.accent }} />
                        <div className="text-2xl font-bold">{accuracy}%</div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Accuracy</div>
                    </div>

                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: THEME.surface }}>
                        <TrendingUp size={24} className="mx-auto mb-2" style={{ color: THEME.accentSec }} />
                        <div className="text-2xl font-bold">{stats.avgTiming}%</div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Timing</div>
                    </div>

                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: THEME.surface }}>
                        <CheckCircle size={24} className="mx-auto mb-2" style={{ color: THEME.accentSec }} />
                        <div className="text-2xl font-bold">{stats.chordsPlayed}</div>
                        <div className="text-xs" style={{ color: THEME.textLight }}>Chords Played</div>
                    </div>
                </div>

                {/* Detailed breakdown */}
                <div className="px-6 pb-4">
                    <div className="flex justify-between items-center text-sm py-2 border-t" style={{ borderColor: THEME.border }}>
                        <span style={{ color: THEME.textLight }}>Correct Strums</span>
                        <span className="font-bold">{stats.correctStrums} / {stats.totalStrums}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-2 border-t" style={{ borderColor: THEME.border }}>
                        <span style={{ color: THEME.textLight }}>Best Streak</span>
                        <span className="font-bold">{stats.streakBest}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="py-3 rounded-xl font-bold border transition-colors hover:bg-warm-surface"
                        style={{ borderColor: THEME.border }}
                    >
                        Done
                    </button>
                    <button
                        onClick={onRestart}
                        className="py-3 rounded-xl font-bold text-white"
                        style={{ backgroundColor: THEME.accent }}
                    >
                        Practice Again
                    </button>
                </div>
            </div>
        </div>
    );
}

interface FeedbackOverlayProps {
    type: 'correct' | 'incorrect' | 'early' | 'late';
    visible: boolean;
}

export function FeedbackOverlay({ type, visible }: FeedbackOverlayProps) {
    if (!visible) return null;

    const config = {
        correct: {
            bg: 'rgba(46, 125, 50, 0.9)',
            icon: CheckCircle,
            text: 'Perfect!',
            color: '#E8F5E9'
        },
        incorrect: {
            bg: 'rgba(211, 47, 47, 0.9)',
            icon: XCircle,
            text: 'Try Again',
            color: '#FFEBEE'
        },
        early: {
            bg: 'rgba(245, 124, 0, 0.9)',
            icon: Clock,
            text: 'Too Early',
            color: '#FFF3E0'
        },
        late: {
            bg: 'rgba(245, 124, 0, 0.9)',
            icon: Clock,
            text: 'Too Late',
            color: '#FFF3E0'
        },
    };

    const { bg, icon: Icon, text, color } = config[type];

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 px-8 py-6 rounded-2xl flex items-center gap-4 z-50 
                 animate-fade-in shadow-2xl"
            style={{ backgroundColor: bg }}
        >
            <Icon size={32} color={color} />
            <span
                className="text-2xl font-bold"
                style={{ color, fontFamily: 'var(--font-serif)' }}
            >
                {text}
            </span>
        </div>
    );
}

// Hook to manage practice session
export function usePracticeSession() {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [stats, setStats] = useState<PracticeStats>({
        totalTime: 0,
        chordsPlayed: 0,
        correctStrums: 0,
        totalStrums: 0,
        avgTiming: 100,
        streakBest: 0,
    });
    const [currentStreak, setCurrentStreak] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const startSession = () => {
        setStartTime(Date.now());
        setIsActive(true);
        setStats({
            totalTime: 0,
            chordsPlayed: 0,
            correctStrums: 0,
            totalStrums: 0,
            avgTiming: 100,
            streakBest: 0,
        });
        setCurrentStreak(0);
    };

    const endSession = (): PracticeStats => {
        const endTime = Date.now();
        const totalTime = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
        setIsActive(false);
        return { ...stats, totalTime };
    };

    const recordStrum = (correct: boolean, timingOffset: number) => {
        setStats(prev => {
            const newCorrectStrums = prev.correctStrums + (correct ? 1 : 0);
            const newTotalStrums = prev.totalStrums + 1;

            // Update timing average
            const timingScore = Math.max(0, 100 - Math.abs(timingOffset) * 10);
            const newAvgTiming = Math.round(
                (prev.avgTiming * prev.totalStrums + timingScore) / newTotalStrums
            );

            return {
                ...prev,
                correctStrums: newCorrectStrums,
                totalStrums: newTotalStrums,
                avgTiming: newAvgTiming,
            };
        });

        if (correct) {
            setCurrentStreak(prev => {
                const newStreak = prev + 1;
                if (newStreak > stats.streakBest) {
                    setStats(s => ({ ...s, streakBest: newStreak }));
                }
                return newStreak;
            });
        } else {
            setCurrentStreak(0);
        }
    };

    const recordChordChange = () => {
        setStats(prev => ({ ...prev, chordsPlayed: prev.chordsPlayed + 1 }));
    };

    return {
        isActive,
        stats,
        currentStreak,
        startSession,
        endSession,
        recordStrum,
        recordChordChange,
    };
}
