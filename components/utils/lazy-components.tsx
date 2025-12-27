'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { THEME } from '@/types';

// Loading skeleton for heavy components
export function ComponentSkeleton({ height = '200px' }: { height?: string }) {
    return (
        <div
            className="animate-pulse rounded-2xl"
            style={{
                height,
                backgroundColor: THEME.surface,
                border: `1px solid ${THEME.border}`
            }}
        />
    );
}

// Lazy load heavy practice components
export const LazyMetronome = dynamic(
    () => import('@/components/practice/metronome').then(mod => mod.Metronome),
    {
        loading: () => <ComponentSkeleton height="300px" />,
        ssr: false
    }
);

export const LazyPitchDetector = dynamic(
    () => import('@/components/practice/pitch-detector').then(mod => mod.PitchDetector),
    {
        loading: () => <ComponentSkeleton height="400px" />,
        ssr: false
    }
);

export const LazyStrumVisualizer = dynamic(
    () => import('@/components/practice/strum-visualizer').then(mod => mod.StrumVisualizer),
    {
        loading: () => <ComponentSkeleton height="200px" />,
        ssr: false
    }
);

export const LazyTimingFeedback = dynamic(
    () => import('@/components/practice/timing-feedback').then(mod => mod.TimingFeedback),
    {
        loading: () => <ComponentSkeleton height="350px" />,
        ssr: false
    }
);

export const LazyFretboard = dynamic(
    () => import('@/components/fretboard/fretboard').then(mod => mod.Fretboard),
    {
        loading: () => <ComponentSkeleton height="250px" />,
        ssr: false
    }
);

export const LazySongPlayer = dynamic(
    () => import('@/components/songs/song-player').then(mod => mod.SongPlayer),
    {
        loading: () => <ComponentSkeleton height="500px" />,
        ssr: false
    }
);

// Suspense wrapper for code-split components
export function LazyLoad({
    children,
    fallback
}: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}) {
    return (
        <Suspense fallback={fallback || <ComponentSkeleton />}>
            {children}
        </Suspense>
    );
}
