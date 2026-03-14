/// <reference types="vite/client" />

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global constants defined by Vite
declare const __DEV__: boolean;

// Phaser global
declare module 'phaser' {
  interface Game {
    registry: Phaser.Data.DataManager;
  }
}