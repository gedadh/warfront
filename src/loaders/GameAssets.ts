/**
 * Game Assets Manifest for WARFRONT
 * Central definition of all game assets
 */

import { AssetManifest, AssetPaths } from './AssetManifest';

/**
 * Main game asset manifest
 * Add all game assets here for centralized management
 */
export const GameAssets: AssetManifest = {
  // Sprite sheets (individual sprite images)
  sprites: [
    // Player sprites
    {
      type: 'sprite',
      key: 'player-idle',
      path: `${AssetPaths.sprites.player}player-idle.png`,
    },
    {
      type: 'sprite',
      key: 'player-walk',
      path: `${AssetPaths.sprites.player}player-walk.png`,
    },
    // Enemy sprites (placeholders)
    {
      type: 'sprite',
      key: 'enemy-soldier',
      path: `${AssetPaths.sprites.enemies}enemy-soldier.png`,
    },
    // Vehicle sprites (placeholders)
    {
      type: 'sprite',
      key: 'vehicle-tank',
      path: `${AssetPaths.sprites.vehicles}tank.png`,
    },
  ],

  // Sprite sheets with frame animations
  spritesheets: [
    {
      type: 'spritesheet',
      key: 'player-anim',
      path: `${AssetPaths.sprites.player}player-spritesheet.png`,
      frameConfig: {
        frameWidth: 32,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 11,
      },
    },
    {
      type: 'spritesheet',
      key: 'explosion',
      path: `${AssetPaths.sprites.projectiles}explosion.png`,
      frameConfig: {
        frameWidth: 64,
        frameHeight: 64,
        startFrame: 0,
        endFrame: 15,
      },
    },
  ],

  // Texture atlases (packed sprite sheets with JSON)
  atlases: [
    // UI atlas will be added when UI assets are ready
  ],

  // Static images (UI, backgrounds, etc.)
  images: [
    // UI backgrounds
    {
      type: 'image',
      key: 'bg-menu',
      path: `${AssetPaths.backgrounds}menu-bg.png`,
    },
    {
      type: 'image',
      key: 'bg-game',
      path: `${AssetPaths.backgrounds}game-bg.png`,
    },
    // UI panels
    {
      type: 'image',
      key: 'panel-main',
      path: `${AssetPaths.ui.panels}main-panel.png`,
    },
    {
      type: 'image',
      key: 'panel-dialog',
      path: `${AssetPaths.ui.panels}dialog-panel.png`,
    },
    // UI buttons
    {
      type: 'image',
      key: 'btn-primary',
      path: `${AssetPaths.ui.buttons}btn-primary.png`,
    },
    {
      type: 'image',
      key: 'btn-secondary',
      path: `${AssetPaths.ui.buttons}btn-secondary.png`,
    },
    // UI icons
    {
      type: 'image',
      key: 'icon-settings',
      path: `${AssetPaths.ui.icons}settings.png`,
    },
    {
      type: 'image',
      key: 'icon-sound',
      path: `${AssetPaths.ui.icons}sound.png`,
    },
    // Tiles
    {
      type: 'image',
      key: 'tile-ground',
      path: `${AssetPaths.tiles}ground-tile.png`,
    },
    {
      type: 'image',
      key: 'tile-grass',
      path: `${AssetPaths.tiles}grass-tile.png`,
    },
  ],

  // Audio assets
  audio: [
    // Music
    {
      type: 'audio',
      key: 'music-menu',
      paths: [
        `${AssetPaths.audio.music}menu-theme.mp3`,
        `${AssetPaths.audio.music}menu-theme.ogg`,
      ],
      config: {
        loop: true,
        volume: 0.5,
      },
    },
    {
      type: 'audio',
      key: 'music-game',
      paths: [
        `${AssetPaths.audio.music}game-theme.mp3`,
        `${AssetPaths.audio.music}game-theme.ogg`,
      ],
      config: {
        loop: true,
        volume: 0.3,
      },
    },
    // Sound effects
    {
      type: 'audio',
      key: 'sfx-click',
      paths: [
        `${AssetPaths.audio.sfx}ui-click.mp3`,
        `${AssetPaths.audio.sfx}ui-click.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-hover',
      paths: [
        `${AssetPaths.audio.sfx}ui-hover.mp3`,
        `${AssetPaths.audio.sfx}ui-hover.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-shoot',
      paths: [
        `${AssetPaths.audio.sfx}shoot.mp3`,
        `${AssetPaths.audio.sfx}shoot.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-explosion',
      paths: [
        `${AssetPaths.audio.sfx}explosion.mp3`,
        `${AssetPaths.audio.sfx}explosion.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-footstep',
      paths: [
        `${AssetPaths.audio.sfx}footstep.mp3`,
        `${AssetPaths.audio.sfx}footstep.ogg`,
      ],
    },
  ],

  // Font assets
  fonts: [
    {
      type: 'font',
      key: 'font-main',
      path: `${AssetPaths.fonts}warfront-main.ttf`,
    },
    {
      type: 'font',
      key: 'font-title',
      path: `${AssetPaths.fonts}warfront-title.ttf`,
    },
  ],

  // Data/JSON assets
  data: [
    {
      type: 'data',
      key: 'level-1',
      path: `${AssetPaths.data}levels/level-01.json`,
    },
    {
      type: 'data',
      key: 'level-2',
      path: `${AssetPaths.data}levels/level-02.json`,
    },
    {
      type: 'data',
      key: 'game-config',
      path: `${AssetPaths.data}game-config.json`,
    },
  ],
};

/**
 * Minimal assets required for boot/menu (load these first)
 */
export const CoreAssets: AssetManifest = {
  sprites: [],
  spritesheets: [],
  atlases: [],
  images: [
    {
      type: 'image',
      key: 'loading-bg',
      path: `${AssetPaths.backgrounds}loading-bg.png`,
    },
    {
      type: 'image',
      key: 'bg-menu',
      path: `${AssetPaths.backgrounds}menu-bg.png`,
    },
    {
      type: 'image',
      key: 'btn-primary',
      path: `${AssetPaths.ui.buttons}btn-primary.png`,
    },
    {
      type: 'image',
      key: 'btn-secondary',
      path: `${AssetPaths.ui.buttons}btn-secondary.png`,
    },
    {
      type: 'image',
      key: 'panel-main',
      path: `${AssetPaths.ui.panels}main-panel.png`,
    },
  ],
  audio: [
    {
      type: 'audio',
      key: 'sfx-click',
      paths: [
        `${AssetPaths.audio.sfx}ui-click.mp3`,
        `${AssetPaths.audio.sfx}ui-click.ogg`,
      ],
    },
  ],
  fonts: [],
  data: [],
};

/**
 * Game-specific assets (loaded when entering game scene)
 */
export const GamePlayAssets: AssetManifest = {
  sprites: [
    {
      type: 'sprite',
      key: 'player-idle',
      path: `${AssetPaths.sprites.player}player-idle.png`,
    },
    {
      type: 'sprite',
      key: 'player-walk',
      path: `${AssetPaths.sprites.player}player-walk.png`,
    },
    {
      type: 'sprite',
      key: 'enemy-soldier',
      path: `${AssetPaths.sprites.enemies}enemy-soldier.png`,
    },
    {
      type: 'sprite',
      key: 'vehicle-tank',
      path: `${AssetPaths.sprites.vehicles}tank.png`,
    },
  ],
  spritesheets: [
    {
      type: 'spritesheet',
      key: 'player-anim',
      path: `${AssetPaths.sprites.player}player-spritesheet.png`,
      frameConfig: {
        frameWidth: 32,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 11,
      },
    },
    {
      type: 'spritesheet',
      key: 'explosion',
      path: `${AssetPaths.sprites.projectiles}explosion.png`,
      frameConfig: {
        frameWidth: 64,
        frameHeight: 64,
        startFrame: 0,
        endFrame: 15,
      },
    },
  ],
  atlases: [],
  images: [
    {
      type: 'image',
      key: 'bg-game',
      path: `${AssetPaths.backgrounds}game-bg.png`,
    },
    {
      type: 'image',
      key: 'tile-ground',
      path: `${AssetPaths.tiles}ground-tile.png`,
    },
    {
      type: 'image',
      key: 'tile-grass',
      path: `${AssetPaths.tiles}grass-tile.png`,
    },
  ],
  audio: [
    {
      type: 'audio',
      key: 'music-game',
      paths: [
        `${AssetPaths.audio.music}game-theme.mp3`,
        `${AssetPaths.audio.music}game-theme.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-shoot',
      paths: [
        `${AssetPaths.audio.sfx}shoot.mp3`,
        `${AssetPaths.audio.sfx}shoot.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-explosion',
      paths: [
        `${AssetPaths.audio.sfx}explosion.mp3`,
        `${AssetPaths.audio.sfx}explosion.ogg`,
      ],
    },
    {
      type: 'audio',
      key: 'sfx-footstep',
      paths: [
        `${AssetPaths.audio.sfx}footstep.mp3`,
        `${AssetPaths.audio.sfx}footstep.ogg`,
      ],
    },
  ],
  fonts: [],
  data: [
    {
      type: 'data',
      key: 'level-1',
      path: `${AssetPaths.data}levels/level-01.json`,
    },
    {
      type: 'data',
      key: 'level-2',
      path: `${AssetPaths.data}levels/level-02.json`,
    },
    {
      type: 'data',
      key: 'game-config',
      path: `${AssetPaths.data}game-config.json`,
    },
  ],
};