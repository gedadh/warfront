/**
 * Asset Loader for WARFRONT
 * Handles loading of all asset types with progress tracking
 */

import Phaser from 'phaser';
import {
  AssetManifest,
  Asset,
  SpriteAsset,
  SpritesheetAsset,
  AtlasAsset,
  ImageAsset,
  AudioAsset,
  FontAsset,
  DataAsset,
  getAssetCount,
} from './AssetManifest';

/**
 * Progress callback type
 */
export type ProgressCallback = (
  loaded: number,
  total: number,
  currentAsset: string,
  percent: number
) => void;

/**
 * Error callback type
 */
export type ErrorCallback = (
  key: string,
  type: string,
  error: unknown
) => void;

/**
 * AssetLoader class
 * Provides centralized asset loading with progress tracking
 */
export class AssetLoader {
  private scene: Phaser.Scene;
  private manifest: AssetManifest;
  private totalAssets: number;
  private loadedCount: number = 0;
  private failedAssets: Array<{ key: string; type: string; error: unknown }> = [];

  constructor(scene: Phaser.Scene, manifest: AssetManifest) {
    this.scene = scene;
    this.manifest = manifest;
    this.totalAssets = getAssetCount(manifest);
  }

  /**
   * Get total number of assets to load
   */
  getTotalAssets(): number {
    return this.totalAssets;
  }

  /**
   * Get number of loaded assets
   */
  getLoadedCount(): number {
    return this.loadedCount;
  }

  /**
   * Get failed assets
   */
  getFailedAssets(): Array<{ key: string; type: string; error: unknown }> {
    return [...this.failedAssets];
  }

  /**
   * Check if any assets failed to load
   */
  hasFailures(): boolean {
    return this.failedAssets.length > 0;
  }

  /**
   * Load all assets from manifest with progress tracking
   */
  loadAll(
    onProgress?: ProgressCallback,
    onError?: ErrorCallback
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set up progress tracking
      this.scene.load.on('progress', (value: number) => {
        if (onProgress) {
          const loaded = Math.floor(value * this.totalAssets);
          const percent = Math.round(value * 100);
          const currentAsset = this.getCurrentLoadingKey();
          onProgress(loaded, this.totalAssets, currentAsset, percent);
        }
      });

      // Track file completion for detailed progress
      this.scene.load.on('filecomplete', (key: string) => {
        this.loadedCount++;
        if (onProgress) {
          const percent = Math.round((this.loadedCount / this.totalAssets) * 100);
          onProgress(this.loadedCount, this.totalAssets, key, percent);
        }
      });

      // Handle load errors
      this.scene.load.on('loaderror', (file: Phaser.Loader.File) => {
        const error = new Error(`Failed to load: ${file.key}`);
        this.failedAssets.push({ key: file.key, type: file.type, error });
        if (onError) {
          onError(file.key, file.type, error);
        }
      });

      // Handle completion
      this.scene.load.on('complete', () => {
        if (this.failedAssets.length > 0) {
          console.warn(`AssetLoader: ${this.failedAssets.length} assets failed to load`);
        }
        resolve();
      });

      // Queue all assets for loading
      this.queueAssets();

      // Start loading
      this.scene.load.start();
    });
  }

  /**
   * Queue all assets from manifest for loading
   */
  private queueAssets(): void {
    // Load images
    this.manifest.images.forEach((asset) => this.loadImage(asset));

    // Load sprites
    this.manifest.sprites.forEach((asset) => this.loadSprite(asset));

    // Load spritesheets
    this.manifest.spritesheets.forEach((asset) => this.loadSpritesheet(asset));

    // Load atlases
    this.manifest.atlases.forEach((asset) => this.loadAtlas(asset));

    // Load audio
    this.manifest.audio.forEach((asset) => this.loadAudio(asset));

    // Load fonts
    this.manifest.fonts.forEach((asset) => this.loadFont(asset));

    // Load data
    this.manifest.data.forEach((asset) => this.loadData(asset));
  }

  /**
   * Load a single image
   */
  private loadImage(asset: ImageAsset): void {
    this.scene.load.image(asset.key, asset.path);
  }

  /**
   * Load a sprite (same as image, but semantically different)
   */
  private loadSprite(asset: SpriteAsset): void {
    this.scene.load.image(asset.key, asset.path);
  }

  /**
   * Load a spritesheet
   */
  private loadSpritesheet(asset: SpritesheetAsset): void {
    this.scene.load.spritesheet(asset.key, asset.path, asset.frameConfig);
  }

  /**
   * Load a texture atlas
   */
  private loadAtlas(asset: AtlasAsset): void {
    this.scene.load.atlas(asset.key, asset.texturePath, asset.atlasPath);
  }

  /**
   * Load audio with fallback formats
   */
  private loadAudio(asset: AudioAsset): void {
    this.scene.load.audio(asset.key, asset.paths);
  }

  /**
   * Load a font
   */
  private loadFont(asset: FontAsset): void {
    this.scene.load.font(asset.key, asset.path);
  }

  /**
   * Load JSON data
   */
  private loadData(asset: DataAsset): void {
    this.scene.load.json(asset.key, asset.path);
  }

  /**
   * Get the currently loading asset key (approximate)
   */
  private getCurrentLoadingKey(): string {
    const assets = [
      ...this.manifest.images,
      ...this.manifest.sprites,
      ...this.manifest.spritesheets,
      ...this.manifest.atlases,
      ...this.manifest.audio,
      ...this.manifest.fonts,
      ...this.manifest.data,
    ];
    if (this.loadedCount < assets.length) {
      return assets[this.loadedCount]?.key || 'unknown';
    }
    return 'complete';
  }

  /**
   * Static helper to load a single asset
   */
  static loadSingle(
    scene: Phaser.Scene,
    asset: Asset
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      scene.load.once('complete', () => resolve());
      scene.load.once('loaderror', (file: Phaser.Loader.File) => {
        reject(new Error(`Failed to load: ${file.key}`));
      });

      switch (asset.type) {
        case 'image':
          scene.load.image(asset.key, asset.path);
          break;
        case 'sprite':
          scene.load.image(asset.key, asset.path);
          break;
        case 'spritesheet':
          scene.load.spritesheet(asset.key, asset.path, asset.frameConfig);
          break;
        case 'atlas':
          scene.load.atlas(asset.key, asset.texturePath, asset.atlasPath);
          break;
        case 'audio':
          scene.load.audio(asset.key, asset.paths);
          break;
        case 'font':
          scene.load.font(asset.key, asset.path);
          break;
        case 'data':
          scene.load.json(asset.key, asset.path);
          break;
      }

      scene.load.start();
    });
  }
}