/**
 * WARFRONT - Game Scene
 * Main gameplay scene
 */

import Phaser from 'phaser';
import { Player } from '../objects/Player';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private debugText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    console.log('[GameScene] Game started!');
    
    // Fade in
    this.cameras.main.fadeIn(500);
    
    // Create game world
    this.createWorld();
    
    // Create player
    this.createPlayer();
    
    // Setup input
    this.setupInput();
    
    // Create UI
    this.createUI();
    
    // Log game ready
    console.log('🎮 WARFRONT initialized - Game ready!');
  }

  private createWorld(): void {
    // Set world bounds
    this.physics.world.setBounds(0, 0, 2560, 1440);
    
    // Create background grid (placeholder)
    this.createGrid();
  }

  private createGrid(): void {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x1a1a1a, 1);
    
    // Vertical lines
    for (let x = 0; x <= 2560; x += 64) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, 1440);
    }
    
    // Horizontal lines
    for (let y = 0; y <= 1440; y += 64) {
      graphics.moveTo(0, y);
      graphics.lineTo(2560, y);
    }
    
    graphics.strokePath();
  }

  private createPlayer(): void {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    
    this.player = new Player(this, centerX, centerY);
    
    // Camera follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 2560, 1440);
  }

  private setupInput(): void {
    // Setup cursor keys
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      
      // Add WASD keys
      this.input.keyboard.addKeys('W,A,S,D');
    }
  }

  private createUI(): void {
    // Debug text
    this.debugText = this.add.text(16, 16, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#00ff88',
    });
    this.debugText.setScrollFactor(0);
    this.debugText.setDepth(1000);
  }

  update(time: number, delta: number): void {
    // Update player
    if (this.player) {
      this.player.update(this.cursors, time, delta);
    }
    
    // Update debug text
    if (this.debugText) {
      this.debugText.setText([
        `WARFRONT v${this.game.registry.get('gameVersion')}`,
        `FPS: ${Math.round(this.game.loop.actualFps)}`,
        `Player: ${Math.round(this.player?.x || 0)}, ${Math.round(this.player?.y || 0)}`,
        `Time: ${Math.floor(time / 1000)}s`,
      ]);
    }
  }
}