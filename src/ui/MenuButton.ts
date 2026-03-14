/**
 * WARFRONT - MenuButton Component
 * Reusable interactive button with hover effects
 * PLACEHOLDER: Uses generated textures, replace with actual sprites later
 */

import Phaser from 'phaser';
import { EventBus, GameEvents } from '../utils/EventBus';

export interface MenuButtonConfig {
  text: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  textColorHover?: string;
  backgroundColor?: number;
  backgroundColorHover?: number;
  borderColor?: number;
  borderColorHover?: number;
  cornerRadius?: number;
  enabled?: boolean;
  visible?: boolean;
  soundKey?: string; // PLACEHOLDER: Click sound key
}

export class MenuButton extends Phaser.GameObjects.Container {
  private config: Required<MenuButtonConfig>;
  private background: Phaser.GameObjects.Graphics;
  private buttonText: Phaser.GameObjects.Text;
  private isHovered: boolean = false;
  private isEnabled: boolean = true;
  private hitArea: Phaser.Geom.Rectangle;

  constructor(scene: Phaser.Scene, config: MenuButtonConfig) {
    super(scene, config.x, config.y);

    // Apply defaults
    this.config = {
      width: 240,
      height: 56,
      fontSize: 20,
      fontFamily: 'Arial, sans-serif',
      textColor: '#ffffff',
      textColorHover: '#00ff88',
      backgroundColor: 0x1a1a2e,
      backgroundColorHover: 0x2a2a4e,
      borderColor: 0x00ff88,
      borderColorHover: 0x00ffaa,
      cornerRadius: 8,
      enabled: true,
      visible: true,
      soundKey: 'sound-click', // PLACEHOLDER
      ...config,
    };

    this.hitArea = new Phaser.Geom.Rectangle(
      -this.config.width / 2,
      -this.config.height / 2,
      this.config.width,
      this.config.height
    );

    // Create background
    this.background = this.createBackground();
    this.add(this.background);

    // Create text
    this.buttonText = this.createText();
    this.add(this.buttonText);

    // Setup interactivity
    this.setupInteractivity();

    // Apply initial state
    this.setEnabled(this.config.enabled);
    this.setVisible(this.config.visible);

    // Add to scene
    scene.add.existing(this);

    console.log(`[MenuButton] Created: "${this.config.text}"`);
  }

  /**
   * Create the background graphics
   */
  private createBackground(): Phaser.GameObjects.Graphics {
    const graphics = this.scene.add.graphics();
    this.drawBackground(graphics, false);
    return graphics;
  }

  /**
   * Draw the background with current state
   */
  private drawBackground(graphics: Phaser.GameObjects.Graphics, isHover: boolean): void {
    const { width, height, cornerRadius, backgroundColor, backgroundColorHover, borderColor, borderColorHover } = this.config;
    
    graphics.clear();
    
    // Background fill
    const bgColor = isHover ? backgroundColorHover : backgroundColor;
    graphics.fillStyle(bgColor, 1);
    graphics.fillRoundedRect(-width / 2, -height / 2, width, height, cornerRadius);
    
    // Border
    const bColor = isHover ? borderColorHover : borderColor;
    const borderAlpha = isHover ? 1 : 0.8;
    graphics.lineStyle(2, bColor, borderAlpha);
    graphics.strokeRoundedRect(-width / 2, -height / 2, width, height, cornerRadius);
  }

  /**
   * Create the button text
   */
  private createText(): Phaser.GameObjects.Text {
    return this.scene.add.text(0, 0, this.config.text, {
      fontFamily: this.config.fontFamily,
      fontSize: `${this.config.fontSize}px`,
      color: this.config.textColor,
      fontStyle: 'bold',
    }).setOrigin(0.5);
  }

  /**
   * Setup interactive behaviors
   */
  private setupInteractivity(): void {
    // Set interactive hit area
    this.setInteractive(this.hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Hover effects
    this.on('pointerover', () => {
      if (!this.isEnabled) return;
      this.onHoverEnter();
    });
    
    this.on('pointerout', () => {
      if (!this.isEnabled) return;
      this.onHoverExit();
    });
    
    // Click handler
    this.on('pointerdown', () => {
      if (!this.isEnabled) return;
      this.onPress();
    });
    
    this.on('pointerup', () => {
      if (!this.isEnabled) return;
      this.onRelease();
    });
  }

  /**
   * Handle hover enter
   */
  private onHoverEnter(): void {
    this.isHovered = true;
    
    // Visual feedback
    this.drawBackground(this.background, true);
    this.buttonText.setColor(this.config.textColorHover);
    
    // Scale animation
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 100,
      ease: 'Sine.easeOut',
    });
    
    // Emit event
    EventBus.emit(GameEvents.UI_BUTTON_HOVER, this.config.text);
    
    // PLACEHOLDER: Play hover sound
    // this.scene.sound.play(this.config.soundKey, { volume: 0.3 });
  }

  /**
   * Handle hover exit
   */
  private onHoverExit(): void {
    this.isHovered = false;
    
    // Visual feedback
    this.drawBackground(this.background, false);
    this.buttonText.setColor(this.config.textColor);
    
    // Scale animation
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 100,
      ease: 'Sine.easeOut',
    });
  }

  /**
   * Handle button press
   */
  private onPress(): void {
    // Scale down animation
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 50,
      ease: 'Sine.easeIn',
    });
  }

  /**
   * Handle button release
   */
  private onRelease(): void {
    // Scale back up
    this.scene.tweens.add({
      targets: this,
      scaleX: this.isHovered ? 1.05 : 1,
      scaleY: this.isHovered ? 1.05 : 1,
      duration: 50,
      ease: 'Sine.easeOut',
    });
    
    // PLACEHOLDER: Play click sound
    // this.scene.sound.play(this.config.soundKey, { volume: 0.5 });
    
    // Emit click event
    EventBus.emit(GameEvents.UI_BUTTON_CLICK, this.config.text);
    
    // Trigger callback if set
    if (this.onClickCallback) {
      this.onClickCallback();
    }
  }

  // Click callback
  private onClickCallback?: () => void;

  /**
   * Set click callback
   */
  onClick(callback: () => void): this {
    this.onClickCallback = callback;
    return this;
  }

  /**
   * Set button enabled state
   */
  setEnabled(enabled: boolean): this {
    this.isEnabled = enabled;
    this.setAlpha(enabled ? 1 : 0.5);
    return this;
  }

  /**
   * Get enabled state
   */
  getEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Update button text
   */
  setText(text: string): this {
    this.config.text = text;
    this.buttonText.setText(text);
    return this;
  }

  /**
   * Get button text
   */
  getText(): string {
    return this.config.text;
  }

  /**
   * Show/hide with animation
   */
  setVisibleAnimated(visible: boolean, delay: number = 0): this {
    if (visible) {
      this.setVisible(true);
      this.setAlpha(0);
      this.scene.tweens.add({
        targets: this,
        alpha: 1,
        duration: 200,
        delay,
        ease: 'Sine.easeOut',
      });
    } else {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 200,
        delay,
        ease: 'Sine.easeIn',
        onComplete: () => this.setVisible(false),
      });
    }
    return this;
  }
}