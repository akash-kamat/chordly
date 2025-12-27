'use client';

import { useState } from 'react';
import { THEME } from '@/types';
import { TheorySelector, TheoryContent } from '@/components/theory/theory-selector';

export function TheorySection() {
    const [currentModule, setCurrentModule] = useState('strings');

    return (
        <section id="theory" className="scroll-mt-32">
            <div className="text-center mb-12">
                <span
                    className="font-bold tracking-wider text-xs uppercase mb-2 block"
                    style={{ color: THEME.accent }}
                >
                    The Physics
                </span>
                <h2
                    className="text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-serif)' }}
                >
                    Anatomy of an Instrument
                </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left: Interactive module list */}
                <div className="lg:col-span-4">
                    <TheorySelector
                        currentModule={currentModule}
                        onModuleSelect={setCurrentModule}
                    />
                </div>

                {/* Right: Dynamic content */}
                <div className="lg:col-span-8">
                    <TheoryContent moduleId={currentModule} />
                </div>
            </div>
        </section>
    );
}
