/**
 * WARFRONT - Preload Scene
 * Handles loading of all game assets with progress bar and loading screen
 */

import Phaser from 'phaser';
import { AssetLoader, GameAssets, CoreAssets, getAssetCount } from '../loaders';

export class PreloadScene extends Phaser.Scene {
  // Graphics elements
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBg!: Phaser.GameObjects.Graphics;
  private progressBorder!: Phaser.GameObjects.Graphics;
  
  // Text elements
  private titleText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private percentText!: Phaser.GameObjects.Text;
  private assetText!: Phaser.GameObjects.Text;
  
  // Loading state
  private assetLoader!: AssetLoader;
  private currentAssetKey: string = '';
  private loadStartTime: number = 0;
  
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.loadStartTime = Date.now();
    console.log('[PreloadScene] Starting asset loading...');
    
    // Create loading screen UI first
    this.createLoadingScreen();
    
    // Initialize asset loader with game manifest
    this.assetLoader = new AssetLoader(this, GameAssets);
    
    console.log(`[PreloadScene] Total assets to load: ${this.assetLoader.getTotalAssets()}`);
    
    // Load all assets with progress tracking
    this.assetLoader.loadAll(
      this.onProgress.bind(this),
      this.onError.bind(this)
    ).then(() => {
      this.onLoadComplete();
    }).catch((error) => {
      console.error('[PreloadScene] Loading failed:', error);
      this.onLoadError(error);
    });
  }

  /**
   * Create the loading screen UI
   */
  private createLoadingScreen(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Background
    this.add.rectangle(centerX, centerY, width, height, 0x0a0a0f);
    
    // Background grid pattern (subtle)
    this.createBackgroundPattern();
    
    // Title
    this.titleText = this.add.text(centerX, centerY - 100, 'WARFRONT', {
      fontFamily: 'Arial Black, Arial',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#00ff88',
      strokeThickness: 4,
    }).setOrigin(0.5);
    
    // Subtitle
    this.add.text(centerX, centerY - 50, 'Loading game assets...', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#888888',
    }).setOrigin(0.5);
    
    // Progress bar container
    const barWidth = 400;
    const barHeight = 30;
    const barX = centerX - barWidth / 2;
    const barY = centerY + 20;
    
    // Progress bar border
    this.progressBorder = this.add.graphics();
    this.progressBorder.lineStyle(2, 0x00ff88, 1);
    this.progressBorder.strokeRoundedRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4, 6);
    
    // Progress bar background
    this.progressBg = this.add.graphics();
    this.progressBg.fillStyle(0x1a1a2e, 1);
    this.progressBg.fillRoundedRect(barX, barY, barWidth, barHeight, 4);
    
    // Progress bar fill (starts empty)
    this.progressBar = this.add.graphics();
    
    // Percent text
    this.percentText = this.add.text(centerX, barY + barHeight / 2, '0%', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    
    // Current asset text
    this.assetText = this.add.text(centerX, barY + barHeight + 20, 'Initializing...', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#666666',
    }).setOrigin(0.5);
    this.assetText.setMaxWidth(400);
    
    // Status text
    this.statusText = this.add.text(centerX, height - 50, 'Press any key to skip', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#444444',
    }).setOrigin(0.5);
    
    // Version info
    this.add.text(10, height - 25, 'v0.1.0-alpha', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#333333',
    });
    
    // Add some visual flair - animated loading dots
    this.createLoadingAnimation(centerX, centerY + 80);
  }
  
  /**
   * Create subtle background pattern
   */
  private createBackgroundPattern(): void {
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();
    
    // Draw a subtle grid
    graphics.lineStyle(1, 0x1a1a2e, 0.3);
    
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      graphics.lineBetween(x, 0, x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      graphics.lineBetween(0, y, width, y);
    }
  }
  
  /**
   * Create animated loading indicator
   */
  private createLoadingAnimation(x: number, y: number): void {
    const dots: Phaser.GameObjects.Arc[] = [];
    const numDots = 3;
    const dotRadius = 4;
    const spacing = 20;
    
    for (let i = 0; i < numDots; i++) {
      const dot = this.add.circle(
        x + (i - 1) * spacing,
        y,
        dotRadius,
        0x00ff88
      );
      dots.push(dot);
      
      // Animate dots with delay
      this.tweens.add({
        targets: dot,
        y: y - 10,
        alpha: { from: 1, to: 0.5 },
        duration: 400,
        delay: i * 150,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
  }

  /**
   * Handle progress updates
   */
  private onProgress(
    loaded: number,
    total: number,
    currentAsset: string,
    percent: number
  ): void {
    this.currentAssetKey = currentAsset;
    
    // Update progress bar
    const { width, height } = this.cameras.main;
    const barWidth = 400;
    const barHeight = 30;
    const centerX = width / 2;
    const centerY = height / 2;
    const barX = centerX - barWidth / 2;
    const barY = centerY + 20;
    
    const progress = loaded / total;
    const fillWidth = barWidth * progress;
    
    this.progressBar.clear();
    
    // Gradient effect for progress bar
    const gradientSteps = 20;
    const stepWidth = fillWidth / gradientSteps;
    
    for (let i = 0; i < gradientSteps; i++) {
      const stepX = barX + (i * stepWidth);
      const alpha = 0.5 + (i / gradientSteps) * 0.5;
      
      // Main color: green gradient
      const color = Phaser.Display.Color.Interpolate.ColorWithColor(
        Phaser.Display.Color.IntegerToColor(0x00aa55),
        Phaser.Display.Color.IntegerToColor(0x00ff88),
        gradientSteps,
        i
      );
      
      this.progressBar.fillStyle(Phaser.Display.Color.GetColor(color.r, color.g, color.b), alpha);
      this.progressBar.fillRect(stepX, barY, stepWidth + 1, barHeight);
    }
    
    // Update text displays
    this.percentText.setText(`${percent}%`);
    this.assetText.setText(this.formatAssetName(currentAsset));
    
    // Debug log every 10%
    if (percent % 10 === 0 && percent > 0) {
      console.log(`[PreloadScene] Loading: ${percent}% (${loaded}/${total})`);
    }
  }

  /**
   * Handle individual asset load errors
   */
  private onError(key: string, type: string, error: unknown): void {
    console.warn(`[PreloadScene] Failed to load asset: ${key} (${type})`, error);
    
    // Update status to show error briefly
    this.assetText.setText(`Error loading: ${key}`);
    this.assetText.setColor('#ff4444');
    
    // Reset color after a moment
    this.time.delayedCall(1000, () => {
      this.assetText.setColor('#666666');
    });
  }

  /**
   * Handle successful loading completion
   */
  private onLoadComplete(): void {
    const loadTime = Date.now() - this.loadStartTime;
    console.log(`[PreloadScene] All assets loaded in ${loadTime}ms`);
    
    // Check for failures
    if (this.assetLoader.hasFailures()) {
      const failures = this.assetLoader.getFailedAssets();
      console.warn(`[PreloadScene] ${failures.length} assets failed to load`);
    }
    
    // Update UI to show completion
    this.percentText.setText('100%');
    this.assetText.setText('Ready!');
    this.statusText.setText('Click or press any key to continue');
    this.statusText.setColor('#00ff88');
    
    // Create placeholder assets for any missing ones
    this.createPlaceholderAssets();
    
    // Wait briefly then transition
    this.time.delayedCall(500, () => {
      this.transitionToGame();
    });
  }

  /**
   * Handle fatal loading errors
   */
  private onLoadError(error: unknown): void {
    console.error('[PreloadScene] Fatal loading error:', error);
    
    this.assetText.setText('Loading failed. Please refresh.');
    this.assetText.setColor('#ff4444');
    
    // Show retry button (in a real game)
    // For now, just proceed anyway with placeholders
    this.time.delayedCall(2000, () => {
      this.createPlaceholderAssets();
      this.transitionToGame();
    });
  }

  /**
   * Create placeholder assets for missing textures
   */
  private createPlaceholderAssets(): void {
    console.log('[PreloadScene] Creating placeholder assets...');
    
    const graphics = this.make.graphics({ x: 0, y: 0 });
    
    // Player placeholder (32x48 green rectangle)
    graphics.fillStyle(0x00ff88);
    graphics.fillRect(0, 0, 32, 48);
    // Add a simple "head"
    graphics.fillStyle(0x00aa55);
    graphics.fillRect(8, 4, 16, 16);
    graphics.generateTexture('player-idle', 32, 48);
    
    // Player walking placeholder
    graphics.clear();
    graphics.fillStyle(0x00ff88);
    graphics.fillRect(0, 0, 32, 48);
    graphics.fillStyle(0x00aa55);
    graphics.fillRect(8, 4, 16, 16);
    graphics.generateTexture('player-walk', 32, 48);
    
    // Enemy soldier placeholder (32x48 red rectangle)
    graphics.clear();
    graphics.fillStyle(0xff4444);
    graphics.fillRect(0, 0, 32, 48);
    graphics.fillStyle(0xaa2222);
    graphics.fillRect(8, 4, 16, 16);
    graphics.generateTexture('enemy-soldier', 32, 48);
    
    // Vehicle/tank placeholder (64x64 dark rectangle)
    graphics.clear();
    graphics.fillStyle(0x555555);
    graphics.fillRect(0, 0, 64, 64);
    graphics.fillStyle(0x333333);
    graphics.fillRect(20, 0, 24, 20); // Turret
    graphics.generateTexture('vehicle-tank', 64, 64);
    
    // Tile placeholders
    graphics.clear();
    graphics.fillStyle(0x4a3728);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('tile-ground', 32, 32);
    
    graphics.clear();
    graphics.fillStyle(0x228822);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('tile-grass', 32, 32);
    
    // UI button placeholders
    graphics.clear();
    graphics.fillStyle(0x00aa55);
    graphics.fillRoundedRect(0, 0, 200, 50, 8);
    graphics.lineStyle(2, 0x00ff88);
    graphics.strokeRoundedRect(0, 0, 200, 50, 8);
    graphics.generateTexture('btn-primary', 200, 50);
    
    graphics.clear();
    graphics.fillStyle(0x333344);
    graphics.fillRoundedRect(0, 0, 200, 50, 8);
    graphics.lineStyle(2, 0x555566);
    graphics.strokeRoundedRect(0, 0, 200, 50, 8);
    graphics.generateTexture('btn-secondary', 200, 50);
    
    // Panel placeholder
    graphics.clear();
    graphics.fillStyle(0x1a1a2e);
    graphics.fillRoundedRect(0, 0, 300, 200, 12);
    graphics.lineStyle(2, 0x00ff88);
    graphics.strokeRoundedRect(0, 0, 300, 200, 12);
    graphics.generateTexture('panel-main', 300, 200);
    
    // Icon placeholders
    graphics.clear();
    graphics.fillStyle(0x00ff88);
    graphics.fillCircle(16, 16, 14);
    graphics.generateTexture('icon-settings', 32, 32);
    graphics.generateTexture('icon-sound', 32, 32);
    
    // Background placeholders
    graphics.clear();
    graphics.fillStyle(0x0f0f1a);
    graphics.fillRect(0, 0, 800, 600);
    graphics.generateTexture('bg-menu', 800, 600);
    
    graphics.clear();
    graphics.fillStyle(0x1a1a2e);
    graphics.fillRect(0, 0, 800, 600);
    graphics.generateTexture('bg-game', 800, 600);
    
    graphics.destroy();
    
    console.log('[PreloadScene] Placeholder assets created');
  }

  /**
   * Format asset name for display
   */
  private formatAssetName(name: string): string {
    if (!name || name === 'complete') return 'Finalizing...';
    
    // Convert camelCase/kebab-case to readable text
    return name
      .replace(/-/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  /**
   * Transition to the main menu
   */
  private transitionToGame(): void {
    // Add input listener for skip
    this.input.keyboard!.once('keydown', () => {
      this.startGame();
    });
    
    this.input.once('pointerdown', () => {
      this.startGame();
    });
    
    // Auto-start after a brief delay
    this.time.delayedCall(1500, () => {
      this.startGame();
    });
  }

  /**
   * Start the main menu scene
   */
  private startGame(): void {
    // Remove all input listeners
    this.input.keyboard!.removeAllListeners();
    this.input.removeAllListeners();
    
    // Fade out and transition
    this.cameras.main.fadeOut(500, 0, 0, 0);
    
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MainMenuScene');
    });
  }
}