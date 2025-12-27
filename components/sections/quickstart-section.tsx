'use client';

import Link from 'next/link';
import { Play, BookOpen, Music, Target, ArrowRight, Flame, Trophy } from 'lucide-react';
import { THEME } from '@/types';
import { useAppStore } from '@/store/app-store';
import { LESSONS } from '@/data/lessons';
import { CHORDS, BEGINNER_CHORDS } from '@/data/chords';

export function QuickStartSection() {
    const progress = useAppStore((state) => state.progress);

    // Calculate next recommended action
    const nextLesson = LESSONS.find(l => !progress.lessonsCompleted.includes(l.id));
    const chordsToLearn = BEGINNER_CHORDS.filter(c => !progress.chordsLearned.includes(c));

    // Calculate overall progress
    const lessonsPercent = (progress.lessonsCompleted.length / LESSONS.length) * 100;
    const chordsPercent = (progress.chordsLearned.length / Object.keys(CHORDS).length) * 100;

    const quickActions = [
        {
            icon: BookOpen,
            title: 'Continue Learning',
            description: nextLesson ? `Next: ${nextLesson.title}` : 'All lessons complete!',
            href: nextLesson ? `/lessons/${nextLesson.id}` : '/lessons',
            color: THEME.accent,
            cta: 'Start Lesson'
        },
        {
            icon: Music,
            title: 'Practice Chords',
            description: chordsToLearn.length > 0 ? `${chordsToLearn.length} chords to master` : 'Explore all chords',
            href: '/practice',
            color: THEME.accentSec,
            cta: 'Practice Now'
        },
        {
            icon: Target,
            title: 'Song Library',
            description: 'Learn real songs with guided play-along',
            href: '/songs',
            color: THEME.accent,
            cta: 'Browse Songs'
        }
    ];

    return (
        <section id="quickstart" className="scroll-mt-20">
            <div className="text-center mb-12">
                <h2
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-serif)' }}
                >
                    Your Guitar Journey
                </h2>
                <p style={{ color: THEME.textLight }}>
                    Pick up where you left off or start something new
                </p>
            </div>

            {/* Progress Overview */}
            <div
                className="grid md:grid-cols-4 gap-4 mb-10 p-6 rounded-2xl"
                style={{ backgroundColor: THEME.surface }}
            >
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Flame size={20} style={{ color: THEME.accent }} />
                        <span className="text-2xl font-bold">{progress.currentStreak}</span>
                    </div>
                    <span className="text-xs" style={{ color: THEME.textLight }}>Day Streak</span>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{progress.lessonsCompleted.length}</div>
                    <span className="text-xs" style={{ color: THEME.textLight }}>Lessons Done</span>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{progress.chordsLearned.length}</div>
                    <span className="text-xs" style={{ color: THEME.textLight }}>Chords Learned</span>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Trophy size={20} style={{ color: THEME.accentSec }} />
                        <span className="text-2xl font-bold">{progress.skillLevel}</span>
                    </div>
                    <span className="text-xs" style={{ color: THEME.textLight }}>Skill Level</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={i}
                            href={action.href}
                            className="group p-6 rounded-2xl border bg-white hover:shadow-lg transition-all"
                            style={{ borderColor: THEME.border }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: `${action.color}20` }}
                            >
                                <Icon size={24} style={{ color: action.color }} />
                            </div>

                            <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                            <p className="text-sm mb-4" style={{ color: THEME.textLight }}>
                                {action.description}
                            </p>

                            <div
                                className="flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all"
                                style={{ color: action.color }}
                            >
                                {action.cta}
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Progress Bars */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Lessons Progress</span>
                        <span style={{ color: THEME.textLight }}>{Math.round(lessonsPercent)}%</span>
                    </div>
                    <div className="h-3 bg-warm-surface rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-500"
                            style={{ width: `${lessonsPercent}%`, backgroundColor: THEME.accent }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Chord Mastery</span>
                        <span style={{ color: THEME.textLight }}>{Math.round(chordsPercent)}%</span>
                    </div>
                    <div className="h-3 bg-warm-surface rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-500"
                            style={{ width: `${chordsPercent}%`, backgroundColor: THEME.accentSec }}
                        />
                    </div>
                </div>
            </div>

            {/* Daily Goal Reminder */}
            {progress.currentStreak === 0 && (
                <div
                    className="mt-8 p-4 rounded-xl border-l-4 flex items-center gap-4"
                    style={{ backgroundColor: `${THEME.accent}10`, borderColor: THEME.accent }}
                >
                    <Play size={24} style={{ color: THEME.accent }} />
                    <div>
                        <p className="font-bold">Start your streak today!</p>
                        <p className="text-sm" style={{ color: THEME.textLight }}>
                            Practice for just 5 minutes to begin building your daily habit.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
