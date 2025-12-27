'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Play, RotateCcw } from 'lucide-react';
import { THEME, Lesson, LessonStep } from '@/types';
import { LESSONS, getLessonById } from '@/data/lessons';
import { CHORDS } from '@/data/chords';
import { Fretboard } from '@/components/fretboard/fretboard';
import { useAudio } from '@/hooks/use-audio';
import { useAppStore } from '@/store/app-store';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params.id as string;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepCompleted, setStepCompleted] = useState<boolean[]>([]);

    const { strumChord, playString } = useAudio();
    const { audioSettings, progress, completeLesson, addChordLearned } = useAppStore();

    const lesson = getLessonById(lessonId);

    useEffect(() => {
        if (lesson) {
            setStepCompleted(new Array(lesson.steps.length).fill(false));
        }
    }, [lesson]);

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: THEME.bg }}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
                    <Link href="/lessons" className="text-accent underline">Back to Lessons</Link>
                </div>
            </div>
        );
    }

    const currentStep = lesson.steps[currentStepIndex];
    const isLastStep = currentStepIndex === lesson.steps.length - 1;
    const allStepsCompleted = stepCompleted.every(s => s);

    const handleStepComplete = () => {
        const newCompleted = [...stepCompleted];
        newCompleted[currentStepIndex] = true;
        setStepCompleted(newCompleted);

        // Add chords to learned if this is a chord lesson
        if (currentStep.chords) {
            currentStep.chords.forEach(chord => {
                if (!progress.chordsLearned.includes(chord)) {
                    addChordLearned(chord);
                }
            });
        }
    };

    const handleNextStep = () => {
        if (!isLastStep) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const handleCompleteLesson = () => {
        completeLesson(lessonId);
        router.push('/lessons');
    };

    const handlePlayDemo = () => {
        const firstChord = currentStep.chords?.[0];
        if (firstChord) {
            const chord = CHORDS[firstChord];
            if (chord) {
                strumChord(chord.positions, audioSettings);
            }
        }
    };

    const handleStringClick = (stringIndex: number, fret: number) => {
        playString(stringIndex, fret, audioSettings);
    };

    // Get step type icon/color
    const getStepTypeStyle = (type: LessonStep['type']) => {
        switch (type) {
            case 'explanation': return { bg: '#E3F2FD', color: '#1565C0', label: 'Learn' };
            case 'demonstration': return { bg: '#FFF3E0', color: '#E65100', label: 'Watch' };
            case 'exercise': return { bg: '#E8F5E9', color: '#2E7D32', label: 'Practice' };
            case 'validation': return { bg: '#FCE4EC', color: '#C2185B', label: 'Check' };
            case 'checkpoint': return { bg: '#F3E5F5', color: '#7B1FA2', label: 'Test' };
            default: return { bg: THEME.surface, color: THEME.text, label: 'Step' };
        }
    };

    const stepStyle = getStepTypeStyle(currentStep.type);
    const firstChord = currentStep.chords?.[0];
    const chordData = firstChord ? CHORDS[firstChord] : null;

    return (
        <div className="min-h-screen py-8 px-6" style={{ backgroundColor: THEME.bg }}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/lessons"
                        className="inline-flex items-center gap-2 text-sm font-medium mb-4 hover:opacity-70 transition-opacity"
                        style={{ color: THEME.textLight }}
                    >
                        <ArrowLeft size={16} />
                        Back to Lessons
                    </Link>

                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        {lesson.title}
                    </h1>
                    <p style={{ color: THEME.textLight }}>{lesson.description}</p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Step {currentStepIndex + 1} of {lesson.steps.length}</span>
                        <span>{Math.round(((currentStepIndex + 1) / lesson.steps.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-warm-surface rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-300"
                            style={{
                                width: `${((currentStepIndex + 1) / lesson.steps.length) * 100}%`,
                                backgroundColor: THEME.accent
                            }}
                        />
                    </div>

                    {/* Step indicators */}
                    <div className="flex gap-1 mt-3">
                        {lesson.steps.map((step, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentStepIndex(i)}
                                className={`h-2 flex-1 rounded-full transition-all ${i === currentStepIndex ? 'ring-2 ring-offset-2 ring-[#C47F64]' : ''
                                    }`}
                                style={{
                                    backgroundColor: stepCompleted[i] ? THEME.accentSec :
                                        i === currentStepIndex ? THEME.accent : THEME.border,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div
                    className="bg-white rounded-2xl border shadow-sm p-8 mb-8"
                    style={{ borderColor: THEME.border }}
                >
                    {/* Step type badge */}
                    <div className="flex items-center gap-3 mb-6">
                        <span
                            className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                            style={{ backgroundColor: stepStyle.bg, color: stepStyle.color }}
                        >
                            {stepStyle.label}
                        </span>
                        <h2 className="text-xl font-bold">{currentStep.title}</h2>
                    </div>

                    {/* Step content */}
                    <p
                        className="text-lg mb-6 leading-relaxed"
                        style={{ color: THEME.text }}
                    >
                        {currentStep.content}
                    </p>

                    {/* Chord visualization if applicable */}
                    {chordData && (
                        <div className="grid md:grid-cols-2 gap-8 mb-6">
                            <div
                                className="bg-warm-surface p-6 rounded-xl flex justify-center"
                            >
                                <Fretboard
                                    positions={chordData.positions}
                                    fingers={chordData.fingers}
                                    barre={chordData.barre}
                                    onStrumString={handleStringClick}
                                    showHints={true}
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold mb-2">Chord: {firstChord}</h3>
                                    <p className="text-sm" style={{ color: THEME.textLight }}>
                                        {chordData.mood}
                                    </p>
                                </div>

                                <button
                                    onClick={handlePlayDemo}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                                    style={{ backgroundColor: THEME.accent }}
                                >
                                    <Play size={18} />
                                    Play Demo
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mark as complete button */}
                    {!stepCompleted[currentStepIndex] && (
                        <button
                            onClick={handleStepComplete}
                            className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                            style={{ backgroundColor: THEME.accentSec }}
                        >
                            <CheckCircle size={20} />
                            Mark Step as Complete
                        </button>
                    )}

                    {stepCompleted[currentStepIndex] && (
                        <div
                            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: `${THEME.accentSec}20`, color: THEME.accentSec }}
                        >
                            <CheckCircle size={20} />
                            Step Completed!
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevStep}
                        disabled={currentStepIndex === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium border transition-colors disabled:opacity-40"
                        style={{ borderColor: THEME.border }}
                    >
                        <ArrowLeft size={18} />
                        Previous
                    </button>

                    {!isLastStep ? (
                        <button
                            onClick={handleNextStep}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                            style={{ backgroundColor: THEME.text }}
                        >
                            Next Step
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleCompleteLesson}
                            disabled={!allStepsCompleted}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white disabled:opacity-50"
                            style={{ backgroundColor: THEME.accent }}
                        >
                            <CheckCircle size={18} />
                            Complete Lesson
                        </button>
                    )}
                </div>

                {/* Restart option */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => {
                            setCurrentStepIndex(0);
                            setStepCompleted(new Array(lesson.steps.length).fill(false));
                        }}
                        className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                        style={{ color: THEME.textLight }}
                    >
                        <RotateCcw size={14} />
                        Restart Lesson
                    </button>
                </div>
            </div>
        </div>
    );
}
