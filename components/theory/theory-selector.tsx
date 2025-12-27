'use client';

import { ChevronRight, Info } from 'lucide-react';
import { THEORY_MODULES } from '@/data/theory';
import { THEME } from '@/types';

interface TheorySelectorProps {
    currentModule: string;
    onModuleSelect: (moduleId: string) => void;
}

export function TheorySelector({ currentModule, onModuleSelect }: TheorySelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            {THEORY_MODULES.map((mod) => {
                const isActive = currentModule === mod.id;
                return (
                    <button
                        key={mod.id}
                        onClick={() => onModuleSelect(mod.id)}
                        className="w-full text-left px-5 py-4 rounded-xl border mb-2 transition-all flex justify-between items-center group"
                        style={{
                            borderColor: isActive ? THEME.accent : THEME.border,
                            borderLeftColor: isActive ? THEME.accent : THEME.border,
                            borderLeftWidth: isActive ? '4px' : '1px',
                            backgroundColor: isActive ? THEME.surface : 'transparent',
                        }}
                    >
                        <span
                            className="font-medium"
                            style={{ color: isActive ? THEME.accent : THEME.text }}
                        >
                            {mod.title}
                        </span>
                        {isActive && <ChevronRight size={16} style={{ color: THEME.accent }} />}
                    </button>
                );
            })}
        </div>
    );
}

interface TheoryContentProps {
    moduleId: string;
}

export function TheoryContent({ moduleId }: TheoryContentProps) {
    const module = THEORY_MODULES.find(m => m.id === moduleId);

    if (!module) {
        return null;
    }

    return (
        <div
            className="bg-white p-10 rounded-3xl border shadow-lg relative overflow-hidden min-h-[300px]"
            style={{ borderColor: THEME.border }}
        >
            {/* Background decoration */}
            <div
                className="absolute top-[-20px] right-[-20px] text-[180px] opacity-5 select-none pointer-events-none"
                style={{ fontFamily: 'var(--font-serif)' }}
            >
                ?
            </div>

            <div className="relative z-10 flex flex-col justify-center h-full">
                <h3
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-serif)', color: THEME.accent }}
                >
                    {module.title}
                </h3>
                <p
                    className="text-lg leading-relaxed max-w-xl"
                    style={{ color: THEME.text }}
                >
                    {module.desc}
                </p>

                {/* Tip/Fun fact */}
                {module.tip && (
                    <div
                        className="mt-8 pt-8 border-t flex items-center gap-4"
                        style={{ borderColor: THEME.surface }}
                    >
                        <Info size={20} style={{ color: THEME.accentSec }} />
                        <span
                            className="text-sm font-medium italic"
                            style={{ color: THEME.textLight }}
                        >
                            {module.tip}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
