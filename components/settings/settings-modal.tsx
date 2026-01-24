
'use client';

import { useAppStore } from '@/store/app-store';
import { X, Volume2, Settings as SettingsIcon, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { THEME } from '@/types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = 'audio' | 'app' | 'account';

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const {
        audioSettings, setAudioSettings,
        appSettings, setAppSettings,
        user, profile, signOut
    } = useAppStore();
    const [activeTab, setActiveTab] = useState<Tab>('audio');

    if (!isOpen) return null;

    const TabButton = ({ id, label, icon: Icon }: { id: Tab, label: string, icon: any }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === id
                ? 'border-current'
                : 'border-transparent opacity-60 hover:opacity-100'
                }`}
            style={{
                color: activeTab === id ? THEME.accent : THEME.text,
                borderColor: activeTab === id ? THEME.accent : 'transparent'
            }}
        >
            <Icon size={16} />
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
                style={{ backgroundColor: THEME.bg, color: THEME.text }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: THEME.border }}>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <SettingsIcon size={20} /> Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-6 border-b" style={{ borderColor: THEME.border }}>
                    <TabButton id="audio" label="Audio" icon={Volume2} />
                    <TabButton id="app" label="Preferences" icon={SettingsIcon} />
                    <TabButton id="account" label="Account" icon={UserIcon} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'audio' && (
                        <div className="space-y-8">
                            {/* Volume */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="font-medium">Master Volume</label>
                                    <span className="text-sm opacity-70">{Math.round(audioSettings.volume * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={audioSettings.volume}
                                    onChange={(e) => setAudioSettings({ volume: parseFloat(e.target.value) })}
                                    className="w-full"
                                    style={{ accentColor: THEME.accent }}
                                />
                            </div>

                            {/* Instrument Selector */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="font-medium">Instrument Sound</label>
                                </div>
                                <select
                                    value={audioSettings.instrument}
                                    onChange={(e) => setAudioSettings({ instrument: e.target.value as any })}
                                    className="w-full p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-shadow"
                                    style={{
                                        borderColor: THEME.border,
                                        // @ts-ignore
                                        '--tw-ring-color': THEME.accent
                                    }}
                                >
                                    <option value="acoustic_guitar_nylon">Acoustic (Nylon)</option>
                                    <option value="acoustic_guitar_steel">Acoustic (Steel)</option>
                                    <option value="electric_guitar_clean">Electric (Clean)</option>
                                    <option value="electric_guitar_jazz">Electric (Jazz)</option>
                                </select>
                            </div>

                            {/* Tone */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="font-medium">Tone (Warm vs Bright)</label>
                                    <span className="text-sm opacity-70">{Math.round(audioSettings.tone * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={audioSettings.tone}
                                    onChange={(e) => setAudioSettings({ tone: parseFloat(e.target.value) })}
                                    className="w-full"
                                    style={{ accentColor: THEME.accent }}
                                />
                            </div>

                            {/* Sustain */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="font-medium">Note Sustain</label>
                                    <span className="text-sm opacity-70">{audioSettings.sustain}s</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="4"
                                    step="0.1"
                                    value={audioSettings.sustain}
                                    onChange={(e) => setAudioSettings({ sustain: parseFloat(e.target.value) })}
                                    className="w-full"
                                    style={{ accentColor: THEME.accent }}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'app' && (
                        <div className="space-y-6">
                            {/* Handedness */}
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <h3 className="font-medium">Left-Handed Mode</h3>
                                    <p className="text-sm opacity-70">Flip fretboard visualizations</p>
                                </div>
                                <button
                                    onClick={() => setAppSettings({ leftHanded: !appSettings.leftHanded })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${appSettings.leftHanded ? 'bg-[#C47F64]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${appSettings.leftHanded ? 'left-7' : 'left-1'
                                        }`} />
                                </button>
                            </div>

                            {/* Show Finger Numbers */}
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <h3 className="font-medium">Show Finger Numbers</h3>
                                    <p className="text-sm opacity-70">Display 1-4 on chord diagrams</p>
                                </div>
                                <button
                                    onClick={() => setAppSettings({ showFingerNumbers: !appSettings.showFingerNumbers })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${appSettings.showFingerNumbers ? 'bg-[#C47F64]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${appSettings.showFingerNumbers ? 'left-7' : 'left-1'
                                        }`} />
                                </button>
                            </div>

                            {/* Show Note Names */}
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <h3 className="font-medium">Show Note Names</h3>
                                    <p className="text-sm opacity-70">Show notes (C, D, E) on fretboard</p>
                                </div>
                                <button
                                    onClick={() => setAppSettings({ showNoteNames: !appSettings.showNoteNames })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${appSettings.showNoteNames ? 'bg-[#C47F64]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${appSettings.showNoteNames ? 'left-7' : 'left-1'
                                        }`} />
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            {!user ? (
                                <div className="text-center py-8">
                                    <p className="mb-4">Sign in to sync your progress across devices.</p>
                                    <button
                                        onClick={() => { onClose(); /* Trigger auth modal externally via store/navbar or callback */ }}
                                        className="px-6 py-2 rounded-lg text-white font-medium"
                                        style={{ backgroundColor: THEME.accent }}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-black/5">
                                        {profile?.avatar_url ? (
                                            <img src={profile.avatar_url} alt="Profile" className="w-12 h-12 rounded-full" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                                <UserIcon size={24} className="text-gray-600" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold">{profile?.full_name || 'Guitarist'}</h3>
                                            <p className="text-sm opacity-70">{user.email}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={signOut}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
