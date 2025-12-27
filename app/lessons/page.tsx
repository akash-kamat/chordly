'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Music, Zap, Grid } from 'lucide-react';
import { LESSONS, LEARNING_TRACKS } from '@/data/lessons';
import { SkillTree } from '@/components/lessons/skill-tree';
import { useAppStore } from '@/store/app-store';
import { THEME, Lesson } from '@/types';
import { useRouter } from 'next/navigation';

export default function LessonsPage() {
    const router = useRouter();
    const progress = useAppStore((state) => state.progress);

    const handleLessonClick = (lesson: Lesson) => {
        // Navigate to the individual lesson page
        router.push(`/lessons/${lesson.id}`);
    };

    // Stats
    const totalLessons = LESSONS.length;
    const completedLessons = progress.lessonsCompleted.length;
    const progressPercent = (completedLessons / totalLessons) * 100;

    return (
        <div
            className="min-h-screen py-12 px-6"
            style={{ backgroundColor: THEME.bg }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:text-accent transition-colors"
                        style={{ color: THEME.textLight }}
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        Lessons & Skill Tree
                    </h1>
                    <p style={{ color: THEME.textLight }}>
                        Follow a structured path from beginner to intermediate. Complete lessons to unlock new content.
                    </p>
                </div>

                {/* Progress Overview */}
                <div
                    className="grid md:grid-cols-4 gap-6 mb-12 p-6 rounded-2xl border"
                    style={{ backgroundColor: THEME.white, borderColor: THEME.border }}
                >
                    <div className="text-center">
                        <div
                            className="text-3xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.accent }}
                        >
                            {completedLessons}
                        </div>
                        <div className="text-sm" style={{ color: THEME.textLight }}>Lessons Completed</div>
                    </div>

                    <div className="text-center">
                        <div
                            className="text-3xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.accentSec }}
                        >
                            {progress.chordsLearned.length}
                        </div>
                        <div className="text-sm" style={{ color: THEME.textLight }}>Chords Learned</div>
                    </div>

                    <div className="text-center">
                        <div
                            className="text-3xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.accent }}
                        >
                            {progress.currentStreak}
                        </div>
                        <div className="text-sm" style={{ color: THEME.textLight }}>Day Streak</div>
                    </div>

                    <div className="text-center">
                        <div
                            className="text-3xl font-bold"
                            style={{ fontFamily: 'var(--font-serif)', color: THEME.accentSec }}
                        >
                            {Math.round(progressPercent)}%
                        </div>
                        <div className="text-sm" style={{ color: THEME.textLight }}>Complete</div>
                    </div>
                </div>

                {/* Learning Tracks Quick Nav */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {LEARNING_TRACKS.slice(0, 4).map(track => {
                        const Icon = track.id === 'basics' ? BookOpen :
                            track.id === 'chords' ? Grid :
                                track.id === 'rhythm' ? Music : Zap;
                        return (
                            <div
                                key={track.id}
                                className="p-4 rounded-xl border text-center cursor-pointer hover:shadow-md transition-all"
                                style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
                                onClick={() => document.getElementById(`track-${track.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <Icon size={24} className="mx-auto mb-2" style={{ color: THEME.accent }} />
                                <div className="font-bold text-sm">{track.name}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Skill Tree */}
                <SkillTree
                    lessons={LESSONS}
                    completedLessons={progress.lessonsCompleted}
                    onLessonClick={handleLessonClick}
                />
            </div>
        </div>
    );
}
