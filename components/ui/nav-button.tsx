'use client';

import { THEME } from '@/types';

interface NavButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export function NavButton({ label, active, onClick }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
        ${active
                    ? 'text-white shadow-sm'
                    : 'text-warm-text hover:bg-warm-surface'
                }`}
            style={{
                backgroundColor: active ? THEME.accent : 'transparent',
            }}
        >
            {label}
        </button>
    );
}
