/**
 * WARFRONT - Main Entry Point
 * Phaser 3 + TypeScript Game
 */

import { Game } from 'phaser';
import { gameConfig } from './config/game.config';

// Initialize game
const game = new Game(gameConfig);

// Log initialization
console.log('🎮 WARFRONT initialized');
console.log('Version: 0.1.0');
console.log('Engine: Phaser 3 + TypeScript + Vite');

// Export for debugging
if (import.meta.env.DEV) {
  (window as unknown as { game: Game }).game = game;
}

export default game;