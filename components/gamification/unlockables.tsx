'use client';

import { Lock, Check, Star } from 'lucide-react';
import { THEME } from '@/types';
import { useAppStore } from '@/store/app-store';

interface UnlockableItemProps {
    id: string;
    name: string;
    type: 'chord' | 'song' | 'lesson' | 'feature';
    requiredLevel?: number;
    requiredChords?: string[];
    requiredLessons?: string[];
}

export function UnlockableItem({
    id,
    name,
    type,
    requiredLevel = 0,
    requiredChords = [],
    requiredLessons = [],
}: UnlockableItemProps) {
    const progress = useAppStore((state) => state.progress);

    // Calculate if item is unlocked
    const levelMet = progress.skillLevel >= requiredLevel;
    const chordsMet = requiredChords.every(c => progress.chordsLearned.includes(c));
    const lessonsMet = requiredLessons.every(l => progress.lessonsCompleted.includes(l));
    const isUnlocked = levelMet && chordsMet && lessonsMet;

    // Calculate progress toward unlock
    const totalRequirements = requiredChords.length + requiredLessons.length + (requiredLevel > 0 ? 1 : 0);
    const metRequirements =
        requiredChords.filter(c => progress.chordsLearned.includes(c)).length +
        requiredLessons.filter(l => progress.lessonsCompleted.includes(l)).length +
        (levelMet ? 1 : 0);
    const unlockProgress = totalRequirements > 0 ? (metRequirements / totalRequirements) * 100 : 100;

    return (
        <div
            className={`relative p-4 rounded-xl border transition-all ${isUnlocked ? 'hover:shadow-md cursor-pointer' : 'opacity-70'
                }`}
            style={{
                borderColor: isUnlocked ? THEME.accentSec : THEME.border,
                backgroundColor: isUnlocked ? 'white' : THEME.surface,
            }}
        >
            {/* Lock overlay */}
            {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl z-10">
                    <Lock size={24} style={{ color: THEME.textLight }} />
                    <span className="text-xs mt-2" style={{ color: THEME.textLight }}>
                        {unlockProgress.toFixed(0)}% complete
                    </span>

                    {/* Progress ring */}
                    <svg className="absolute w-12 h-12" viewBox="0 0 36 36">
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke={THEME.border}
                            strokeWidth="2"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke={THEME.accent}
                            strokeWidth="2"
                            strokeDasharray={`${unlockProgress} ${100 - unlockProgress}`}
                            strokeDashoffset="25"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            )}

            {/* Content */}
            <div className="flex items-center justify-between">
                <div>
                    <span
                        className="text-xs uppercase font-bold"
                        style={{ color: THEME.textLight }}
                    >
                        {type}
                    </span>
                    <h4 className="font-bold">{name}</h4>
                </div>

                {isUnlocked && (
                    <Check size={20} style={{ color: THEME.accentSec }} />
                )}
            </div>

            {/* Requirements list */}
            {!isUnlocked && (
                <div className="mt-3 pt-3 border-t space-y-1" style={{ borderColor: THEME.border }}>
                    {requiredLevel > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                            <Star size={12} style={{ color: levelMet ? THEME.accentSec : THEME.textLight }} />
                            <span style={{ color: levelMet ? THEME.accentSec : THEME.textLight }}>
                                Level {requiredLevel} {levelMet && '✓'}
                            </span>
                        </div>
                    )}
                    {requiredChords.slice(0, 3).map(chord => (
                        <div key={chord} className="flex items-center gap-2 text-xs">
                            <span style={{ color: progress.chordsLearned.includes(chord) ? THEME.accentSec : THEME.textLight }}>
                                {chord.replace(' Major', '').replace(' Minor', 'm')} {progress.chordsLearned.includes(chord) && '✓'}
                            </span>
                        </div>
                    ))}
                    {requiredChords.length > 3 && (
                        <span className="text-xs" style={{ color: THEME.textLight }}>
                            +{requiredChords.length - 3} more chords
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

interface AchievementBadgeProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
    progress?: number; // 0-100
}

export function AchievementBadge({
    title,
    description,
    icon,
    unlocked,
    progress = 0,
}: AchievementBadgeProps) {
    return (
        <div
            className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${unlocked ? '' : 'opacity-50 grayscale'
                }`}
            style={{
                borderColor: unlocked ? THEME.accent : THEME.border,
                backgroundColor: unlocked ? `${THEME.accent}10` : THEME.surface,
            }}
        >
            {/* Icon container */}
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: unlocked ? THEME.accent : THEME.border,
                    color: unlocked ? 'white' : THEME.textLight,
                }}
            >
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h4 className="font-bold">{title}</h4>
                <p className="text-xs" style={{ color: THEME.textLight }}>
                    {description}
                </p>

                {!unlocked && progress > 0 && (
                    <div className="mt-2">
                        <div className="h-1 bg-warm-surface rounded-full overflow-hidden">
                            <div
                                className="h-full"
                                style={{ width: `${progress}%`, backgroundColor: THEME.accent }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Unlocked indicator */}
            {unlocked && (
                <Check size={20} style={{ color: THEME.accentSec }} />
            )}
        </div>
    );
}
