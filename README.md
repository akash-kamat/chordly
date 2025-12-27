<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/guitar.svg" width="80" height="80" alt="Chordly Logo" />
</p>

<h1 align="center">🎸 Chordly</h1>

<p align="center">
  <strong>The open-source, interactive guitar learning platform</strong>
</p>

<p align="center">
  Learn guitar with realistic audio, visual fretboard, structured lessons, and play-along songs.
  <br />
  No subscriptions. No ads. Just pure learning.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#roadmap">Roadmap</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
</p>

---

## ✨ Why Chordly?

Most guitar learning apps are either **too expensive** (monthly subscriptions) or **too basic** (just chord diagrams). Chordly is different:

| Feature | Chordly | Typical Apps |
|---------|---------|--------------|
| 💰 Price | **Free forever** | $10-20/month |
| 🎵 Real Audio | ✅ Acoustic guitar soundfont | ❌ Basic beeps |
| 🎯 Interactive Fretboard | ✅ Click to play strings | ❌ Static images |
| 📚 Structured Lessons | ✅ Skill tree progression | ❌ Random videos |
| 🎤 Pitch Detection | ✅ Built-in tuner | ❌ Separate app needed |
| 🎼 Play-along Songs | ✅ With tempo control | ❌ Fixed speed only |
| ♿ Accessibility | ✅ Keyboard shortcuts, screen reader support | ❌ Often overlooked |

---

## 🎯 Features

### 🎸 Interactive Fretboard
- **SVG-based** visualization with smooth animations
- **Clickable strings** - hear each note as you tap
- **Finger position** indicators with numbered dots
- **Barre chord** visualization
- **Left-handed mode** support

### 🎵 Realistic Audio Engine
- **Acoustic guitar soundfont** via MIDI.js
- **Chord strumming** with natural timing
- **Single note playback** for studying
- **Tuning reference tones** for all 6 strings

### 📖 Structured Learning Path
- **10+ lessons** across 4 learning tracks
- **Step-by-step flow**: Explanation → Demo → Exercise → Validation
- **Skill tree** showing progress
- **Progress tracking** saved locally

### 🥁 Practice Tools
- **Visual metronome** (40-200 BPM)
- **Strumming pattern visualizer** with 5 presets
- **Timing trainer** - tap on the beat
- **Practice session summaries** with grades

### 🎤 Built-in Tuner
- **Real-time pitch detection**
- **Visual tuning meter**
- **All 6 strings** supported

### 🎼 Song Play-Along
- **10+ songs** with chord progressions
- **Tempo scaling** - slow down to practice
- **Chord readiness indicator**
- **Lyrics guide** synced with chords

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `H` | Home |
| `L` | Lessons |
| `P` | Practice |
| `S` | Songs |
| `Space` | Toggle metronome |
| `↑`/`↓` | Adjust BPM |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/chordly.git
cd chordly

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [soundfont-player](https://github.com/danigb/soundfont-player) | Audio |
| [Lucide React](https://lucide.dev/) | Icons |

---

## 📁 Project Structure

```
chordly/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home
│   ├── lessons/           # Lessons
│   ├── practice/          # Practice tools
│   └── songs/             # Song library
├── components/            # React components
├── data/                  # Chords, songs, lessons
├── hooks/                 # Custom hooks
├── store/                 # Zustand store
└── types/                 # TypeScript types
```

---

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to help:**
- 🐛 Report bugs
- 💡 Suggest features
- 🎵 Add songs/chords/lessons
- 🌍 Translate

---

## 🗺️ Roadmap

### ✅ v1.0 (Current)
- Interactive fretboard, audio engine, lessons, practice tools, songs

### 🔜 v1.1
- Chord detection, cloud sync, user accounts

### 🔮 v2.0
- AI recommendations, tab viewer, mobile app

---

## 📄 License

[MIT License](LICENSE) - free to use, modify, and distribute.

---

<p align="center">
  <strong>Made with ❤️ for guitar learners everywhere</strong>
  <br />
  <a href="https://github.com/yourusername/chordly">⭐ Star us on GitHub</a>
</p>
