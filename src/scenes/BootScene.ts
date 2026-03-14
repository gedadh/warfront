/**
 * WARFRONT - Boot Scene
 * Initial scene that handles early game setup
 */

import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Boot scene - minimal loading for transition
    console.log('[BootScene] Starting...');
  }

  create(): void {
    console.log('[BootScene] Boot complete, transitioning to PreloadScene');
    
    // Set any game-wide settings here
    this.game.registry.set('gameVersion', '0.1.0');
    
    // Transition to preload scene
    this.scene.start('PreloadScene');
  }
}