/**
 * WARFRONT - MainMenuScene
 * Main menu with logo, buttons, and parallax background
 * PLACEHOLDER: Uses generated graphics, replace with actual assets later
 */

import Phaser from 'phaser';
import { MenuButton } from '../ui/MenuButton';
import { EventBus, GameEvents } from '../utils/EventBus';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/game.config';

export class MainMenuScene extends Phaser.Scene {
  // Parallax layers
  private parallaxLayers: Phaser.GameObjects.TileSprite[] = [];
  
  // UI elements
  private logoContainer!: Phaser.GameObjects.Container;
  private buttonContainer!: Phaser.GameObjects.Container;
  private buttons: MenuButton[] = [];
  
  // State
  private hasSaveData: boolean = false;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  /**
   * Initialize scene data
   */
  init(): void {
    console.log('[MainMenuScene] Init');
    
    // Check for save data
    this.hasSaveData = this.checkForSaveData();
  }

  /**
   * Check if save data exists
   * PLACEHOLDER: Implement actual save check later
   */
  private checkForSaveData(): boolean {
    // TODO: Check localStorage or IndexedDB for save data
    // For now, return false as placeholder
    const saveData = this.registry.get('saveData');
    return saveData !== undefined && saveData !== null;
  }

  /**
   * Create the scene
   */
  create(): void {
    console.log('[MainMenuScene] Create');
    
    // Create background
    this.createBackground();
    
    // Create parallax layers
    this.createParallaxLayers();
    
    // Create logo
    this.createLogo();
    
    // Create buttons
    this.createButtons();
    
    // Create version text
    this.createVersionText();
    
    // Start background music
    this.startBackgroundMusic();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Animate entrance
    this.animateEntrance();
    
    // Emit scene ready event
    EventBus.emit(GameEvents.SCENE_READY, 'MainMenuScene');
  }

  /**
   * Create solid color background
   * PLACEHOLDER: Replace with actual background image
   */
  private createBackground(): void {
    // Dark gradient background
    const graphics = this.add.graphics();
    
    // Create gradient from top to bottom
    const colorTop = 0x0a0a1a;
    const colorBottom = 0x1a1a2e;
    
    // Fill with solid color first
    graphics.fillGradientStyle(colorTop, colorTop, colorBottom, colorBottom, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Add some atmospheric elements (placeholder stars/particles)
    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(0, GAME_WIDTH);
      const y = Phaser.Math.Between(0, GAME_HEIGHT / 2);
      const alpha = Phaser.Math.FloatBetween(0.1, 0.5);
      const size = Phaser.Math.Between(1, 3);
      
      graphics.fillStyle(0xffffff, alpha);
      graphics.fillCircle(x, y, size);
    }
  }

  /**
   * Create parallax background layers
   * PLACEHOLDER: Replace with actual parallax sprites
   */
  private createParallaxLayers(): void {
    // Layer 1: Far background (slow movement)
    // PLACEHOLDER: Create a generated texture for now
    const layer1Texture = this.createParallaxTexture('parallax-far', 0x1a1a3e, 512, 512);
    const layer1 = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, layer1Texture);
    layer1.setOrigin(0, 0);
    layer1.setAlpha(0.3);
    this.parallaxLayers.push(layer1);
    
    // Layer 2: Mid background (medium movement)
    const layer2Texture = this.createParallaxTexture('parallax-mid', 0x2a2a5e, 256, 256);
    const layer2 = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, layer2Texture);
    layer2.setOrigin(0, 0);
    layer2.setAlpha(0.2);
    this.parallaxLayers.push(layer2);
    
    // Layer 3: Near foreground (fast movement)
    const layer3Texture = this.createParallaxTexture('parallax-near', 0x3a3a7e, 128, 128);
    const layer3 = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, layer3Texture);
    layer3.setOrigin(0, 0);
    layer3.setAlpha(0.1);
    this.parallaxLayers.push(layer3);
  }

  /**
   * Create a generated texture for parallax
   * PLACEHOLDER: Remove when actual assets are available
   */
  private createParallaxTexture(key: string, color: number, width: number, height: number): string {
    const textureKey = `__placeholder_${key}`;
    
    // Check if texture already exists
    if (this.textures.exists(textureKey)) {
      return textureKey;
    }
    
    // Create texture
    const graphics = this.make.graphics({ x: 0, y: 0 });
    
    // Draw a subtle pattern
    graphics.fillStyle(color, 0.1);
    graphics.fillRect(0, 0, width, height);
    
    // Add some noise-like dots
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const alpha = Phaser.Math.FloatBetween(0.05, 0.15);
      graphics.fillStyle(color, alpha);
      graphics.fillCircle(x, y, Phaser.Math.Between(2, 8));
    }
    
    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();
    
    return textureKey;
  }

  /**
   * Create the game logo
   * PLACEHOLDER: Replace with actual logo sprite
   */
  private createLogo(): void {
    this.logoContainer = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT * 0.25);
    
    // Logo background glow
    const glowGraphics = this.add.graphics();
    glowGraphics.fillStyle(0x00ff88, 0.1);
    glowGraphics.fillCircle(0, 0, 100);
    glowGraphics.setAlpha(0.5);
    this.logoContainer.add(glowGraphics);
    
    // Main logo text
    const logoText = this.add.text(0, 0, 'WARFRONT', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '72px',
      color: '#ffffff',
      stroke: '#00ff88',
      strokeThickness: 4,
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#00ff88',
        blur: 20,
        fill: true,
      },
    });
    logoText.setOrigin(0.5);
    this.logoContainer.add(logoText);
    
    // Subtitle
    const subtitle = this.add.text(0, 50, 'A TACTICAL WARFARE GAME', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#888888',
      letterSpacing: 4,
    });
    subtitle.setOrigin(0.5);
    this.logoContainer.add(subtitle);
    
    // Animate logo glow
    this.tweens.add({
      targets: glowGraphics,
      alpha: { from: 0.3, to: 0.7 },
      scaleX: { from: 1, to: 1.1 },
      scaleY: { from: 1, to: 1.1 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /**
   * Create menu buttons
   */
  private createButtons(): void {
    this.buttonContainer = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT * 0.6);
    
    const buttonSpacing = 70;
    let buttonIndex = 0;
    
    // New Game button
    const newGameButton = new MenuButton(this, {
      text: 'New Game',
      x: 0,
      y: buttonIndex * buttonSpacing,
    });
    newGameButton.onClick(() => this.onNewGameClick());
    this.buttonContainer.add(newGameButton);
    this.buttons.push(newGameButton);
    buttonIndex++;
    
    // Continue button (only if save exists)
    if (this.hasSaveData) {
      const continueButton = new MenuButton(this, {
        text: 'Continue',
        x: 0,
        y: buttonIndex * buttonSpacing,
      });
      continueButton.onClick(() => this.onContinueClick());
      this.buttonContainer.add(continueButton);
      this.buttons.push(continueButton);
      buttonIndex++;
    }
    
    // Settings button
    const settingsButton = new MenuButton(this, {
      text: 'Settings',
      x: 0,
      y: buttonIndex * buttonSpacing,
    });
    settingsButton.onClick(() => this.onSettingsClick());
    this.buttonContainer.add(settingsButton);
    this.buttons.push(settingsButton);
    buttonIndex++;
    
    // Exit button
    const exitButton = new MenuButton(this, {
      text: 'Exit',
      x: 0,
      y: buttonIndex * buttonSpacing,
      backgroundColor: 0x2a1a1a,
      backgroundColorHover: 0x3a2a2a,
      borderColor: 0xff4444,
      borderColorHover: 0xff6666,
    });
    exitButton.onClick(() => this.onExitClick());
    this.buttonContainer.add(exitButton);
    this.buttons.push(exitButton);
  }

  /**
   * Create version text
   */
  private createVersionText(): void {
    const version = 'v0.1.0-alpha'; // TODO: Get from package.json or config
    const versionText = this.add.text(
      GAME_WIDTH - 10,
      GAME_HEIGHT - 10,
      `WARFRONT ${version}`,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#444444',
      }
    );
    versionText.setOrigin(1, 1);
  }

  /**
   * Start background music
   * PLACEHOLDER: Implement when audio assets are available
   */
  private startBackgroundMusic(): void {
    // TODO: Play background music
    // this.sound.play('music-menu', { loop: true, volume: 0.3 });
    console.log('[MainMenuScene] Background music placeholder - implement when audio assets available');
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Listen for save data changes
    EventBus.on(GameEvents.SAVE_COMPLETE, this.onSaveComplete, this);
    EventBus.on(GameEvents.LOAD_COMPLETE, this.onLoadComplete, this);
  }

  /**
   * Animate entrance
   */
  private animateEntrance(): void {
    // Logo fade in and slide down
    this.logoContainer.setAlpha(0);
    this.logoContainer.setY(GAME_HEIGHT * 0.2);
    this.tweens.add({
      targets: this.logoContainer,
      alpha: 1,
      y: GAME_HEIGHT * 0.25,
      duration: 800,
      ease: 'Sine.easeOut',
    });
    
    // Buttons fade in sequentially
    this.buttons.forEach((button, index) => {
      button.setAlpha(0);
      this.tweens.add({
        targets: button,
        alpha: 1,
        duration: 400,
        delay: 500 + index * 100,
        ease: 'Sine.easeOut',
      });
    });
  }

  /**
   * Handle New Game click
   */
  private onNewGameClick(): void {
    console.log('[MainMenuScene] New Game clicked');
    
    // Emit event
    EventBus.emit(GameEvents.MENU_NEW_GAME);
    
    // Transition to game scene
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }

  /**
   * Handle Continue click
   */
  private onContinueClick(): void {
    console.log('[MainMenuScene] Continue clicked');
    
    // Emit event
    EventBus.emit(GameEvents.MENU_CONTINUE);
    
    // TODO: Load save data and transition to game
    // For now, just start the game scene
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }

  /**
   * Handle Settings click
   * PLACEHOLDER: Implement settings scene
   */
  private onSettingsClick(): void {
    console.log('[MainMenuScene] Settings clicked - PLACEHOLDER');
    
    // Emit event
    EventBus.emit(GameEvents.MENU_SETTINGS);
    
    // TODO: Open settings scene/modal
    // this.scene.pause();
    // this.scene.launch('SettingsScene');
  }

  /**
   * Handle Exit click
   */
  private onExitClick(): void {
    console.log('[MainMenuScene] Exit clicked');
    
    // Emit event
    EventBus.emit(GameEvents.MENU_EXIT);
    
    // Close the game (works in browser context)
    // Note: In a real desktop app, this would close the window
    alert('Thanks for playing WARFRONT! Close this window to exit.');
  }

  /**
   * Handle save complete event
   */
  private onSaveComplete(): void {
    this.hasSaveData = true;
    // Could refresh buttons here if needed
  }

  /**
   * Handle load complete event
   */
  private onLoadComplete(): void {
    // Data loaded, could update UI
  }

  /**
   * Update loop
   */
  update(time: number, delta: number): void {
    // Animate parallax layers
    const speed = 0.02;
    
    if (this.parallaxLayers[0]) {
      this.parallaxLayers[0].tilePositionX += speed * delta * 0.3;
    }
    if (this.parallaxLayers[1]) {
      this.parallaxLayers[1].tilePositionX += speed * delta * 0.5;
    }
    if (this.parallaxLayers[2]) {
      this.parallaxLayers[2].tilePositionX += speed * delta * 0.7;
    }
  }

  /**
   * Cleanup on shutdown
   */
  shutdown(): void {
    // Remove event listeners
    EventBus.off(GameEvents.SAVE_COMPLETE, this.onSaveComplete, this);
    EventBus.off(GameEvents.LOAD_COMPLETE, this.onLoadComplete, this);
    
    // Clear arrays
    this.buttons = [];
    this.parallaxLayers = [];
    
    console.log('[MainMenuScene] Shutdown');
  }
}