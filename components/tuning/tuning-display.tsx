'use client';

import { TUNING, THEME } from '@/types';
import { useAudio } from '@/hooks/use-audio';

export function TuningDisplay() {
    const { playTuningNote } = useAudio();

    // Reverse for display (Low E on left, high e on right)
    const displayTuning = [...TUNING].reverse();

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border" style={{ borderColor: THEME.border }}>
            <div className="text-center mb-6">
                <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                    Standard Tuning
                </h3>
                <p className="text-sm italic" style={{ color: THEME.textLight }}>
                    Tap a string to tune your ear
                </p>
            </div>

            <div className="flex justify-between items-end h-40 px-4">
                {displayTuning.map((t, i) => (
                    <button
                        key={i}
                        onClick={() => playTuningNote(5 - i)} // Convert to audio index
                        className="group flex flex-col items-center gap-3 hover:-translate-y-2 transition-transform duration-300 w-8"
                    >
                        {/* String visualization */}
                        <div
                            className="bg-warm-text rounded-full group-hover:bg-accent transition-colors"
                            style={{
                                height: `${40 + i * 10}%`,
                                width: `${2 + i * 0.5}px`,
                                backgroundColor: THEME.text,
                            }}
                        />
                        {/* Note name */}
                        <span className="font-mono font-bold text-sm">{t.note}</span>
                    </button>
                ))}
            </div>

            {/* Frequency reference */}
            <div className="mt-6 pt-4 border-t flex justify-between text-xs" style={{ borderColor: THEME.surface }}>
                {displayTuning.map((t, i) => (
                    <span key={`freq-${i}`} style={{ color: THEME.textLight }}>
                        {t.freq.toFixed(0)}Hz
                    </span>
                ))}
            </div>
        </div>
    );
}
