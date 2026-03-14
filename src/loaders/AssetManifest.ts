/**
 * Asset Manifest System for WARFRONT
 * Defines all game assets in a centralized manifest for organized loading
 */

export interface SpriteAsset {
  type: 'sprite';
  key: string;
  path: string;
}

export interface SpritesheetAsset {
  type: 'spritesheet';
  key: string;
  path: string;
  frameConfig: {
    frameWidth: number;
    frameHeight: number;
    startFrame?: number;
    endFrame?: number;
    margin?: number;
    spacing?: number;
  };
}

export interface AtlasAsset {
  type: 'atlas';
  key: string;
  texturePath: string;
  atlasPath: string;
}

export interface ImageAsset {
  type: 'image';
  key: string;
  path: string;
}

export interface AudioAsset {
  type: 'audio';
  key: string;
  paths: string[]; // Multiple formats for fallback
  config?: {
    loop?: boolean;
    volume?: number;
  };
}

export interface FontAsset {
  type: 'font';
  key: string;
  path: string;
}

export interface DataAsset {
  type: 'data';
  key: string;
  path: string;
}

export type Asset = 
  | SpriteAsset 
  | SpritesheetAsset 
  | AtlasAsset 
  | ImageAsset 
  | AudioAsset 
  | FontAsset 
  | DataAsset;

export interface AssetManifest {
  sprites: SpriteAsset[];
  spritesheets: SpritesheetAsset[];
  atlases: AtlasAsset[];
  images: ImageAsset[];
  audio: AudioAsset[];
  fonts: FontAsset[];
  data: DataAsset[];
}

/**
 * Get total asset count for progress tracking
 */
export function getAssetCount(manifest: AssetManifest): number {
  return (
    manifest.sprites.length +
    manifest.spritesheets.length +
    manifest.atlases.length +
    manifest.images.length +
    manifest.audio.length +
    manifest.fonts.length +
    manifest.data.length
  );
}

/**
 * Base path for assets (can be configured for different environments)
 */
export const ASSET_BASE_PATH = '/assets/';

/**
 * Asset path helpers
 */
export const AssetPaths = {
  sprites: {
    player: `${ASSET_BASE_PATH}images/sprites/player/`,
    enemies: `${ASSET_BASE_PATH}images/sprites/enemies/`,
    vehicles: `${ASSET_BASE_PATH}images/sprites/vehicles/`,
    projectiles: `${ASSET_BASE_PATH}images/sprites/projectiles/`,
  },
  tiles: `${ASSET_BASE_PATH}images/tiles/`,
  ui: {
    buttons: `${ASSET_BASE_PATH}images/ui/buttons/`,
    panels: `${ASSET_BASE_PATH}images/ui/panels/`,
    icons: `${ASSET_BASE_PATH}images/ui/icons/`,
  },
  backgrounds: `${ASSET_BASE_PATH}images/backgrounds/`,
  audio: {
    sfx: `${ASSET_BASE_PATH}audio/sfx/`,
    music: `${ASSET_BASE_PATH}audio/music/`,
    voice: `${ASSET_BASE_PATH}audio/voice/`,
  },
  fonts: `${ASSET_BASE_PATH}fonts/`,
  data: `${ASSET_BASE_PATH}data/`,
} as const;