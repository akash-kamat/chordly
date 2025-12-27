'use client';

import { CheckCircle2, Flame } from 'lucide-react';
import { THEME } from '@/types';
import { useAppStore } from '@/store/app-store';

export function ProgressTracker() {
    const progress = useAppStore((state) => state.progress);

    const totalLessons = 10; // Total available lessons
    const completedCount = progress.lessonsCompleted.length;
    const progressPercent = (completedCount / totalLessons) * 100;

    return (
        <div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
        >
            <h4 className="font-bold text-sm mb-3">Progress Tracker</h4>

            {/* Lessons completed */}
            <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={20} style={{ color: THEME.accentSec }} />
                <span className="text-sm font-medium">
                    {completedCount} Lessons Completed
                </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar h-2 mt-2">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Streak display */}
            {progress.currentStreak > 0 && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: THEME.border }}>
                    <Flame size={18} style={{ color: '#FF6B35' }} />
                    <span className="text-sm font-medium">
                        {progress.currentStreak} Day Streak
                    </span>
                </div>
            )}
        </div>
    );
}

export function StreakDisplay() {
    const progress = useAppStore((state) => state.progress);

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50">
            <Flame size={16} style={{ color: '#FF6B35' }} />
            <span className="text-sm font-bold text-orange-600">
                {progress.currentStreak}
            </span>
        </div>
    );
}

interface SkillProgressProps {
    chordsLearned: number;
    totalChords: number;
}

export function SkillProgress({ chordsLearned, totalChords }: SkillProgressProps) {
    const percent = (chordsLearned / totalChords) * 100;

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span style={{ color: THEME.textLight }}>Chords Mastered</span>
                <span className="font-bold">{chordsLearned}/{totalChords}</span>
            </div>
            <div className="progress-bar h-2">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
