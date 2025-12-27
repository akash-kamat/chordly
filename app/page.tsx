'use client';

import { Navbar } from '@/components/navigation/navbar';
import { FundamentalsSection } from '@/components/sections/fundamentals-section';
import { TheorySection } from '@/components/sections/theory-section';
import { WorkshopSection } from '@/components/sections/workshop-section';
import { QuickStartSection } from '@/components/sections/quickstart-section';
import { THEME } from '@/types';

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: THEME.bg, color: THEME.text }}
    >
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* Section 1: Fundamentals / Hero */}
        <FundamentalsSection />

        <hr style={{ borderColor: THEME.border }} />

        {/* Section 2: Quick Start - Personalized Journey */}
        <QuickStartSection />

        <hr style={{ borderColor: THEME.border }} />

        {/* Section 3: Theory */}
        <TheorySection />

        {/* Section 4: Workshop (Interactive Chord Practice) */}
        <WorkshopSection />

        {/* Footer */}
        <footer
          className="border-t pt-12 text-center pb-8"
          style={{ borderColor: THEME.border }}
        >
          <p
            className="text-sm italic"
            style={{ fontFamily: 'var(--font-serif)', color: THEME.textLight }}
          >
            Chordly &copy; {new Date().getFullYear()} — Open Source Guitar Learning
          </p>
        </footer>
      </main>
    </div>
  );
}
