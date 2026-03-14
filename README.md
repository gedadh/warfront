# WARFRONT

Modern Armed MMORTS built with Phaser 3 + TypeScript + Vite.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
warfront/
├── src/
│   ├── main.ts              # Entry point
│   ├── config/
│   │   └── game.config.ts   # Phaser configuration
│   ├── scenes/
│   │   ├── BootScene.ts     # Initial boot scene
│   │   ├── PreloadScene.ts  # Asset loading scene
│   │   └── GameScene.ts     # Main gameplay scene
│   ├── objects/
│   │   └── Player.ts        # Player entity
│   └── utils/
│       └── helpers.ts       # Utility functions
├── public/
│   └── assets/
│       ├── images/
│       ├── audio/
│       └── fonts/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Game Loop

1. **BootScene** - Initial setup and configuration
2. **PreloadScene** - Load all game assets with progress bar
3. **GameScene** - Main gameplay

## Development

### Controls
- **Arrow Keys** or **WASD** - Move player
- **Camera** follows player with smooth interpolation

### Debug Info
- FPS counter
- Player position
- Game timer

## Technologies

- **Phaser 3.80+** - Game framework
- **TypeScript 5.x** - Type-safe development
- **Vite 5.x** - Fast build tool

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build (port 3001) |
| `npm run typecheck` | Type checking |

---

**Version:** 0.1.0
**Status:** Initial Setup Complete ✅