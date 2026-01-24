'use client';

import React from 'react';
import { THEME } from '@/types';

interface FretboardProps {
    positions: number[]; // [low E, A, D, G, B, high e] - fret numbers
    fingers: (number | null)[]; // finger numbers for each position
    barre?: {
        fret: number;
        start: number;
        end: number;
    };
    onStrumString?: (stringIndex: number, fret: number) => void;
    showHints?: boolean;
    leftHanded?: boolean;
    fretCount?: number;
}

export function Fretboard({
    positions,
    fingers,
    barre,
    onStrumString,
    showHints = true,
    leftHanded = false,
    fretCount = 5,
}: FretboardProps) {
    const strings = 6;
    const width = 280;
    const height = 60 + fretCount * 56; // Dynamic height based on fret count

    // Centering Logic
    const contentWidth = 200; // Width occupied by strings (outermost string to outermost string)
    const stringSpacing = contentWidth / (strings - 1);
    const xOffset = (width - contentWidth) / 2;
    const fretSpacing = (height - 40) / fretCount;

    // String names (from low E to high e, displayed left to right)
    const stringNames = leftHanded
        ? ['e', 'B', 'G', 'D', 'A', 'E']
        : ['E', 'A', 'D', 'G', 'B', 'e'];

    // Adjust positions for display (reverse if right-handed for visual display)
    const displayPositions = leftHanded ? [...positions].reverse() : positions;
    const displayFingers = leftHanded ? [...fingers].reverse() : fingers;

    const [isDragging, setIsDragging] = React.useState(false);

    const handleStringInteraction = (displayIndex: number) => {
        const posIndex = leftHanded ? strings - 1 - displayIndex : displayIndex;
        const fret = positions[posIndex];
        if (onStrumString && fret !== -1) {
            const audioStringIndex = 5 - posIndex;
            onStrumString(audioStringIndex, fret);
        }
    };

    return (
        <div
            className="relative select-none touch-none mt-6"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            <svg width={width} height={height} className="overflow-visible">
                {/* String Labels (Now inside SVG for perfect alignment) */}
                {stringNames.map((n, i) => (
                    <text
                        key={`label-${i}`}
                        x={xOffset + i * stringSpacing}
                        y={-10}
                        textAnchor="middle"
                        fill={THEME.textLight}
                        fontSize="10"
                        fontWeight="bold"
                        className="pointer-events-none"
                    >
                        {n}
                    </text>
                ))}

                {/* Nut (top bar) */}
                <rect
                    x={xOffset - 8}
                    y={20}
                    width={contentWidth + 16}
                    height={8}
                    fill={THEME.text}
                    rx={2}
                />

                {/* Fret numbers and lines */}
                {Array.from({ length: fretCount }).map((_, i) => (
                    <g key={`fret-${i}`}>
                        {/* Fret number */}
                        <text
                            x={10}
                            y={45 + (i + 1) * fretSpacing - fretSpacing / 2}
                            textAnchor="middle"
                            fill={THEME.textLight}
                            fontSize="11"
                            fontFamily="serif"
                            fontWeight="bold"
                        >
                            {i + 1}
                        </text>
                        {/* Fret line */}
                        <line
                            x1={xOffset - 10}
                            y1={28 + (i + 1) * fretSpacing}
                            x2={xOffset + contentWidth + 10}
                            y2={28 + (i + 1) * fretSpacing}
                            stroke={THEME.border}
                            strokeWidth={2}
                        />
                    </g>
                ))}

                {/* Fret markers (dots at 3, 5, 7, 9, 12) */}
                {[3, 5, 7, 9].filter(f => f <= fretCount).map(fret => (
                    <circle
                        key={`marker-${fret}`}
                        cx={width / 2}
                        cy={28 + fret * fretSpacing - fretSpacing / 2}
                        r={4}
                        fill="#E5E7EB"
                        className="pointer-events-none"
                    />
                ))}
                {fretCount >= 12 && (
                    <>
                        <circle
                            cx={width / 2 - 25}
                            cy={28 + 12 * fretSpacing - fretSpacing / 2}
                            r={4}
                            fill="#E5E7EB"
                            className="pointer-events-none"
                        />
                        <circle
                            cx={width / 2 + 25}
                            cy={28 + 12 * fretSpacing - fretSpacing / 2}
                            r={4}
                            fill="#E5E7EB"
                            className="pointer-events-none"
                        />
                    </>
                )}

                {/* Strings and Hit Targets */}
                {Array.from({ length: strings }).map((_, i) => (
                    <g key={`str-${i}`}>
                        {/* Visible String */}
                        <line
                            x1={xOffset + i * stringSpacing}
                            y1={28}
                            x2={xOffset + i * stringSpacing}
                            y2={height - 10}
                            stroke={THEME.text}
                            strokeWidth={1 + (leftHanded ? i : 5 - i) * 0.5}
                            opacity={0.8}
                            className="transition-opacity pointer-events-none"
                        />

                        {/* Invisible Hit Target for Interaction */}
                        <rect
                            x={(xOffset + i * stringSpacing) - 10}
                            y={28}
                            width={20}
                            height={height - 38}
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseDown={() => handleStringInteraction(i)}
                            onMouseEnter={() => matchMedia('(hover: hover)').matches && isDragging && handleStringInteraction(i)}
                        />
                    </g>
                ))}

                {/* Barre chord indicator */}
                {barre && (
                    <rect
                        x={(xOffset + (leftHanded ? strings - 1 - barre.end : barre.start) * stringSpacing) - 10}
                        y={28 + (barre.fret * fretSpacing) - (fretSpacing / 2) - 8}
                        width={Math.abs(barre.end - barre.start) * stringSpacing + 20}
                        height={16}
                        rx={8}
                        fill={THEME.accent}
                        opacity={0.9}
                        className="pointer-events-none"
                    />
                )}

                {/* Finger positions */}
                {displayPositions.map((fret, i) => {
                    const cx = xOffset + i * stringSpacing;

                    // Muted string (X)
                    if (fret === -1) {
                        return (
                            <text
                                key={`m-${i}`}
                                x={cx}
                                y={18}
                                textAnchor="middle"
                                fill={THEME.textLight}
                                fontSize="14"
                                fontWeight="bold"
                                className="pointer-events-none"
                            >
                                ×
                            </text>
                        );
                    }

                    // Open string (O)
                    if (fret === 0) {
                        return (
                            <circle
                                key={`o-${i}`}
                                cx={cx}
                                cy={12}
                                r={5}
                                stroke={THEME.accentSec}
                                strokeWidth={2}
                                fill="white"
                                className="pointer-events-none"
                            />
                        );
                    }

                    // Fretted note
                    const cy = 28 + (fret * fretSpacing) - (fretSpacing / 2);
                    const finger = displayFingers[i];

                    return (
                        <g key={`n-${i}`} className="pointer-events-none">
                            <circle
                                cx={cx}
                                cy={cy}
                                r={12}
                                fill={THEME.accent}
                            />
                            {showHints && finger && (
                                <text
                                    x={cx}
                                    y={cy + 4}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                >
                                    {finger}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
