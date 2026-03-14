/**
 * WARFRONT - EventBus
 * Global event system for cross-scene communication
 * Uses Phaser's event emitter under the hood
 */

import Phaser from 'phaser';

type EventCallback = (...args: unknown[]) => void;

class EventBusClass {
  private emitter: Phaser.Events.EventEmitter;

  constructor() {
    this.emitter = new Phaser.Events.EventEmitter();
  }

  /**
   * Subscribe to an event
   */
  on(event: string, callback: EventCallback, context?: unknown): this {
    this.emitter.on(event, callback, context);
    return this;
  }

  /**
   * Subscribe to an event (one-time)
   */
  once(event: string, callback: EventCallback, context?: unknown): this {
    this.emitter.once(event, callback, context);
    return this;
  }

  /**
   * Unsubscribe from an event
   */
  off(event: string, callback?: EventCallback, context?: unknown): this {
    this.emitter.off(event, callback, context);
    return this;
  }

  /**
   * Emit an event
   */
  emit(event: string, ...args: unknown[]): this {
    this.emitter.emit(event, ...args);
    return this;
  }

  /**
   * Remove all listeners for an event (or all events)
   */
  removeAllListeners(event?: string): this {
    this.emitter.removeAllListeners(event);
    return this;
  }

  /**
   * Get listener count for an event
   */
  listenerCount(event: string): number {
    return this.emitter.listenerCount(event);
  }
}

// Singleton instance
export const EventBus = new EventBusClass();

// Event constants
export const GameEvents = {
  // Menu events
  MENU_NEW_GAME: 'menu:new-game',
  MENU_CONTINUE: 'menu:continue',
  MENU_SETTINGS: 'menu:settings',
  MENU_EXIT: 'menu:exit',
  
  // Game events
  GAME_START: 'game:start',
  GAME_PAUSE: 'game:pause',
  GAME_RESUME: 'game:resume',
  GAME_OVER: 'game:over',
  
  // Scene events
  SCENE_READY: 'scene:ready',
  SCENE_CHANGE: 'scene:change',
  
  // Save/Load events
  SAVE_START: 'save:start',
  SAVE_COMPLETE: 'save:complete',
  LOAD_START: 'load:start',
  LOAD_COMPLETE: 'load:complete',
  
  // UI events
  UI_BUTTON_CLICK: 'ui:button-click',
  UI_BUTTON_HOVER: 'ui:button-hover',
} as const;

export default EventBus;