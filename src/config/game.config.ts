/**
 * WARFRONT - Phaser Game Configuration
 */

import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { GameScene } from '../scenes/GameScene';

// Game dimensions
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

// Phaser game configuration
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#0a0a0a',
  
  // Scale configuration
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  
  // Physics configuration
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  
  // Render configuration
  render: {
    pixelArt: false,
    antialias: true,
    antialiasGL: true,
  },
  
  // Scenes (flow: Boot → Preload → Menu → Game)
  scene: [BootScene, PreloadScene, MainMenuScene, GameScene],
  
  // Input configuration
  input: {
    mouse: {
      preventDefaultWheel: true,
    },
  },
  
  // Audio configuration
  audio: {
    disableWebAudio: false,
  },
};

export default gameConfig;