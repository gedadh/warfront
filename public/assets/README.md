# WARFRONT Assets

This directory contains all game assets organized by type.

## Directory Structure

```
assets/
├── images/
│   ├── sprites/
│   │   ├── player/       # Player character sprites
│   │   ├── enemies/      # Enemy sprites
│   │   ├── vehicles/     # Vehicle sprites (tanks, etc.)
│   │   └── projectiles/  # Bullets, explosions, etc.
│   ├── tiles/            # Tile map assets
│   ├── ui/
│   │   ├── buttons/      # UI buttons
│   │   ├── panels/       # UI panels and backgrounds
│   │   └── icons/        # UI icons
│   └── backgrounds/      # Game backgrounds
├── audio/
│   ├── sfx/              # Sound effects
│   ├── music/            # Background music
│   └── voice/            # Voice clips
├── fonts/                # Custom fonts (.ttf, .otf, .woff)
└── data/
    └── levels/           # Level data (JSON)
```

## Asset Formats

### Images
- **Preferred:** PNG (lossless, supports transparency)
- **Alternatives:** WebP, JPG (for backgrounds only)

### Audio
- **Primary:** MP3 (wide compatibility)
- **Fallback:** OGG (better compression, not fully supported everywhere)
- Provide both formats when possible for maximum browser support

### Fonts
- **Preferred:** WOFF2 (best compression)
- **Fallbacks:** WOFF, TTF, OTF

### Data
- JSON format for game data (levels, configs, etc.)

## Adding New Assets

1. Place asset in appropriate directory
2. Add entry to `src/loaders/GameAssets.ts` manifest
3. Asset will be automatically loaded in PreloadScene

## Placeholder Assets

The game currently uses placeholder assets generated programmatically in PreloadScene. Replace these with real assets:

- `player-idle.png` - 32x48 green sprite
- `player-walk.png` - 32x48 green sprite
- `enemy-soldier.png` - 32x48 red sprite
- `vehicle-tank.png` - 64x64 dark sprite
- `tile-ground.png` - 32x32 brown tile
- `tile-grass.png` - 32x32 green tile
- `btn-primary.png` - 200x50 green button
- `btn-secondary.png` - 200x50 gray button
- `panel-main.png` - 300x200 dark panel
- `icon-settings.png` - 32x32 icon
- `icon-sound.png` - 32x32 icon
- `bg-menu.png` - 800x600 dark background
- `bg-game.png` - 800x600 dark background

## Audio Placeholders

Add these audio files (currently silent placeholders):

### Sound Effects (sfx/)
- `ui-click.mp3` - Button click sound
- `ui-hover.mp3` - Button hover sound
- `shoot.mp3` - Weapon fire sound
- `explosion.mp3` - Explosion sound
- `footstep.mp3` - Footstep sound

### Music (music/)
- `menu-theme.mp3` - Main menu music
- `game-theme.mp3` - In-game music

## Asset Loading

Assets are loaded in `PreloadScene` using the `AssetLoader` class:

```typescript
import { AssetLoader, GameAssets } from '../loaders';

const loader = new AssetLoader(this, GameAssets);
await loader.loadAll(
  (loaded, total, asset, percent) => {
    console.log(`Loading: ${percent}%`);
  },
  (key, type, error) => {
    console.warn(`Failed: ${key}`);
  }
);
```

## Optimization Tips

1. **Sprite Sheets:** Use texture atlases for multiple small sprites
2. **Audio:** Compress audio files, use lower quality for SFX
3. **Images:** Use appropriate sizes, avoid oversized assets
4. **Lazy Loading:** Load menu assets first, game assets on demand