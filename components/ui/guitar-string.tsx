
'use client';

'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';

export interface GuitarStringProps {
    x: number;
    y1: number;
    y2: number;
    strokeWidth: number;
    color: string;
    index: number;
    isDragging?: boolean;
    onStrum: () => void;
    lastStrummedAt?: number;
}

export const GuitarString = ({ x, y1, y2, strokeWidth, color, isDragging, onStrum, lastStrummedAt }: GuitarStringProps) => {
    const controls = useAnimation();

    // Trigger animation when external prop changes
    React.useEffect(() => {
        if (lastStrummedAt) {
            triggerPluck();
        }
    }, [lastStrummedAt]);

    const triggerPluck = async () => {
        // Random direction for variety
        const direction = Math.random() > 0.5 ? 1 : -1;
        const amplitude = 6;

        const centerY = (y1 + y2) / 2;

        // Sequence: Snap to displaced state, then spring back to center
        // We set the "displaced" shape first
        await controls.start({
            d: `M ${x} ${y1} Q ${x + (amplitude * direction)} ${centerY} ${x} ${y2}`,
            transition: { duration: 0.05 }
        });

        // Then spring back to straight
        controls.start({
            d: `M ${x} ${y1} Q ${x} ${centerY} ${x} ${y2}`,
            transition: {
                type: "spring",
                stiffness: 800,
                damping: 15,
                mass: 0.5
            }
        });

        onStrum();
    };

    return (
        <g>
            {/* The Vibrating String */}
            <motion.path
                d={`M ${x} ${y1} Q ${x} ${(y1 + y2) / 2} ${x} ${y2}`}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="transparent"
                animate={controls}
            />

            {/* Invisible Hit Target */}
            <rect
                x={x - 7}
                y={y1}
                width={14}
                height={y2 - y1}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseDown={() => {
                    triggerPluck();
                }}
                onMouseEnter={() => {
                    if (isDragging) triggerPluck();
                }}
            />
        </g>
    );
};
