'use client';

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
    const xOffset = 30;
    const stringSpacing = (width - xOffset) / (strings + 1);
    const fretSpacing = (height - 40) / fretCount;

    // String names (from low E to high e, displayed left to right)
    const stringNames = leftHanded
        ? ['e', 'B', 'G', 'D', 'A', 'E']
        : ['E', 'A', 'D', 'G', 'B', 'e'];

    // Adjust positions for display (reverse if right-handed for visual display)
    const displayPositions = leftHanded ? [...positions].reverse() : positions;
    const displayFingers = leftHanded ? [...fingers].reverse() : fingers;

    const handleStringClick = (displayIndex: number) => {
        // Convert display index back to chord positions index
        const posIndex = leftHanded ? strings - 1 - displayIndex : displayIndex;
        const fret = positions[posIndex];
        if (onStrumString && fret !== -1) {
            // Convert to audio string index (0 = high e for audio engine)
            // positions[0] = low E, positions[5] = high e
            // audio stringIndex: 0 = high e, 5 = low E
            const audioStringIndex = 5 - posIndex;
            onStrumString(audioStringIndex, fret);
        }
    };

    return (
        <div className="relative select-none">
            {/* String Labels */}
            <div className="absolute -top-3 left-0 w-full text-center">
                <div
                    className="flex justify-between px-8 pl-12 text-[10px] font-bold tracking-widest"
                    style={{ color: THEME.textLight }}
                >
                    {stringNames.map((n, i) => (
                        <span key={`label-${i}`}>{n}</span>
                    ))}
                </div>
            </div>

            <svg width={width} height={height} className="overflow-visible">
                {/* Nut (top bar) */}
                <rect
                    x={xOffset + stringSpacing - 8}
                    y={20}
                    width={width - xOffset - (stringSpacing * 2) + 16}
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
                            x1={xOffset + stringSpacing - 10}
                            y1={28 + (i + 1) * fretSpacing}
                            x2={width - stringSpacing + 10}
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
                        className="fret-marker"
                    />
                ))}
                {fretCount >= 12 && (
                    <>
                        <circle
                            cx={width / 2 - 25}
                            cy={28 + 12 * fretSpacing - fretSpacing / 2}
                            r={4}
                            className="fret-marker"
                        />
                        <circle
                            cx={width / 2 + 25}
                            cy={28 + 12 * fretSpacing - fretSpacing / 2}
                            r={4}
                            className="fret-marker"
                        />
                    </>
                )}

                {/* Strings */}
                {Array.from({ length: strings }).map((_, i) => (
                    <line
                        key={`str-${i}`}
                        x1={(i + 1) * stringSpacing + xOffset}
                        y1={28}
                        x2={(i + 1) * stringSpacing + xOffset}
                        y2={height - 10}
                        stroke={THEME.text}
                        strokeWidth={1 + (leftHanded ? i : 5 - i) * 0.5}
                        opacity={0.8}
                        className="string-line cursor-pointer hover:opacity-100 transition-opacity"
                        onClick={() => handleStringClick(i)}
                    />
                ))}

                {/* Barre chord indicator */}
                {barre && (
                    <rect
                        x={(leftHanded ? strings - 1 - barre.end : barre.start + 1) * stringSpacing + xOffset - 10}
                        y={28 + (barre.fret * fretSpacing) - (fretSpacing / 2) - 8}
                        width={Math.abs(barre.end - barre.start) * stringSpacing + 20}
                        height={16}
                        rx={8}
                        fill={THEME.accent}
                        opacity={0.9}
                    />
                )}

                {/* Finger positions */}
                {displayPositions.map((fret, i) => {
                    const cx = (i + 1) * stringSpacing + xOffset;

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
                            />
                        );
                    }

                    // Fretted note
                    const cy = 28 + (fret * fretSpacing) - (fretSpacing / 2);
                    const finger = displayFingers[i];

                    return (
                        <g key={`n-${i}`}>
                            <circle
                                cx={cx}
                                cy={cy}
                                r={12}
                                className="finger-dot"
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
