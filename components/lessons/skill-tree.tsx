'use client';

import { Lock, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Lesson } from '@/types';
import { THEME } from '@/types';

interface LessonCardProps {
    lesson: Lesson;
    isCompleted: boolean;
    onClick: () => void;
}

export function LessonCard({ lesson, isCompleted, onClick }: LessonCardProps) {
    const isLocked = lesson.isLocked && !isCompleted;

    return (
        <div
            className={`p-6 rounded-xl border transition-all ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                }`}
            style={{
                backgroundColor: isCompleted ? `${THEME.accentSec}10` : THEME.white,
                borderColor: isCompleted ? THEME.accentSec : THEME.border
            }}
            onClick={() => !isLocked && onClick()}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        {isCompleted && (
                            <CheckCircle size={18} style={{ color: THEME.accentSec }} />
                        )}
                        {isLocked && (
                            <Lock size={18} style={{ color: THEME.textLight }} />
                        )}
                        <span
                            className="text-xs font-bold uppercase"
                            style={{ color: THEME.textLight }}
                        >
                            {lesson.track}
                        </span>
                    </div>

                    <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
                    <p className="text-sm" style={{ color: THEME.textLight }}>
                        {lesson.description}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-xs" style={{ color: THEME.textLight }}>
                            <Clock size={14} />
                            <span>{lesson.duration} min</span>
                        </div>
                        <span
                            className={`text-xs font-bold uppercase px-2 py-1 rounded
                ${lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : ''}
                ${lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
                ${lesson.difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''}
              `}
                        >
                            {lesson.difficulty}
                        </span>
                    </div>
                </div>

                {!isLocked && (
                    <ChevronRight size={20} style={{ color: THEME.textLight }} />
                )}
            </div>
        </div>
    );
}

interface SkillTreeProps {
    lessons: Lesson[];
    completedLessons: string[];
    onLessonClick: (lesson: Lesson) => void;
}

export function SkillTree({ lessons, completedLessons, onLessonClick }: SkillTreeProps) {
    // Group lessons by track
    const tracks = ['basics', 'chords', 'rhythm', 'songs'] as const;

    return (
        <div className="space-y-8">
            {tracks.map(track => {
                const trackLessons = lessons.filter(l => l.track === track);
                if (trackLessons.length === 0) return null;

                return (
                    <div key={track}>
                        <h3
                            className="text-lg font-bold mb-4 capitalize"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            {track}
                        </h3>
                        <div className="space-y-4">
                            {trackLessons.map(lesson => (
                                <LessonCard
                                    key={lesson.id}
                                    lesson={lesson}
                                    isCompleted={completedLessons.includes(lesson.id)}
                                    onClick={() => onLessonClick(lesson)}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
