# WARFRONT - Teknik Spec (Technical Specification)

**Versiyon:** 1.0  
**Tarih:** 2026-03-14  
**Durum:** Draft  
**Hedef:** Phase 2 - MVP Development

---

## 1. Teknoloji Stack'i

### 1.1 Core Framework & Tools

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| **Phaser** | 3.80.1 | HTML5 game framework |
| **TypeScript** | 5.4.5 | Type-safe JavaScript |
| **Vite** | 5.4.0 | Build tool & dev server |
| **Node.js** | 18+ | Runtime environment |

### 1.2 Build Tools

| Araç | Amaç |
|------|------|
| **esbuild** | Minification (Vite built-in) |
| **terser** | Alternatif minification |
| **Rollup** | Bundling (Vite built-in) |

### 1.3 Dev Dependencies

```json
{
  "phaser": "^3.80.1",
  "typescript": "^5.4.5",
  "vite": "^5.4.0",
  "@types/node": "^20.14.0"
}
```

### 1.4 TypeScript Konfigürasyonu

```json
{
  "target": "ES2020",
  "module": "ESNext",
  "lib": ["ES2020", "DOM", "DOM.Iterable"],
  "moduleResolution": "bundler",
  "strict": true,
  "sourceMap": true,
  "declaration": true
}
```

**Path Aliases:**
```typescript
@/*         → src/*
@scenes/*   → src/scenes/*
@objects/*  → src/objects/*
@utils/*    → src/utils/*
@config/*   → src/config/*
```

---

## 2. Scene Mimarisi

### 2.1 Scene Akış Diyagramı

```
┌─────────────┐
│  BootScene  │  → Game registry setup, early config
└──────┬──────┘
       │
       ▼
┌──────────────┐
│ PreloadScene │  → Asset loading, progress bar
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  MenuScene   │  → Main menu, settings
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  GameScene   │  → Main gameplay
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  UIScene     │  → Overlay UI (parallel)
└──────────────┘
```

### 2.2 Scene Detayları

#### BootScene
**Sorumluluk:**
- Game registry initialization
- Early configuration
- Platform detection (mobile/desktop)
- Feature detection (WebGL/Canvas)

**Süre:** < 100ms

```typescript
// Registry keys
this.game.registry.set('gameVersion', '0.1.0');
this.game.registry.set('platform', 'desktop');
this.game.registry.set('audioEnabled', true);
```

#### PreloadScene
**Sorumluluk:**
- Asset loading (sprites, audio, fonts, data)
- Progress bar UI
- Asset validation
- Error handling

**Loading Bar:**
- Background: `#222222`
- Progress fill: `#00ff88`
- Text: "Loading WARFRONT..."

**Placeholder Asset Generation:**
```typescript
// Runtime texture generation for placeholders
graphics.fillStyle(0x00ff88);
graphics.fillRect(0, 0, 32, 32);
graphics.generateTexture('player', 32, 32);
```

#### MenuScene (Planlanan)
**Sorumluluk:**
- Main menu UI
- Settings panel
- Save slot selection
- Credits

#### GameScene
**Sorumluluk:**
- Main gameplay loop
- World management
- Entity spawning
- Camera control
- Input handling
- Debug UI

**World Bounds:**
- Width: 2560px
- Height: 1440px
- Grid: 64px

#### UIScene (Planlanan)
**Sorumluluk:**
- HUD elements (health, ammo, resources)
- Minimap
- Notification system
- Pause menu

**Özellik:** Parallel scene (GameScene ile aynı anda çalışır)

### 2.3 Scene Lifecycle

```typescript
// Her scene için lifecycle
preload() → create() → update(time, delta)
```

**Transition Pattern:**
```typescript
// Fade out + start next scene
this.cameras.main.fadeOut(500, 0, 0, 0);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

---

## 3. Asset Organization

### 3.1 Folder Structure

```
public/
├── assets/
│   ├── images/
│   │   ├── sprites/
│   │   │   ├── player/
│   │   │   │   ├── player-idle.png
│   │   │   │   ├── player-walk.png
│   │   │   │   └── player-attack.png
│   │   │   ├── enemies/
│   │   │   ├── vehicles/
│   │   │   └── projectiles/
│   │   ├── tiles/
│   │   │   ├── terrain.png
│   │   │   └── buildings.png
│   │   ├── ui/
│   │   │   ├── buttons/
│   │   │   ├── panels/
│   │   │   └── icons/
│   │   └── backgrounds/
│   ├── audio/
│   │   ├── sfx/
│   │   │   ├── shoot.wav
│   │   │   ├── explosion.wav
│   │   │   └── ui-click.wav
│   │   ├── music/
│   │   │   ├── menu-theme.ogg
│   │   │   └── battle-theme.ogg
│   │   └── voice/
│   ├── fonts/
│   │   ├── Orbitron-Bold.ttf
│   │   └── RobotoMono-Regular.ttf
│   └── data/
│       ├── levels/
│       ├── units.json
│       └── weapons.json
└── index.html
```

### 3.2 Asset Naming Convention

**Format:** `{category}-{name}-{variant}.png`

**Örnekler:**
```
player-idle-01.png
player-walk-01.png
tank-basic-destroyed.png
ui-button-primary-hover.png
sfx-shoot-rifle.wav
```

### 3.3 Sprite Sheet Format

**Kullanım:** Phaser 3'ün built-in sprite sheet loader

```typescript
// Sprite sheet loading
this.load.spritesheet('player-walk', 'assets/images/sprites/player/player-walk.png', {
  frameWidth: 32,
  frameHeight: 32,
  startFrame: 0,
  endFrame: 7
});
```

**Texture Atlas önerisi:** TexturePacker veya benzeri tool ile

```typescript
this.load.atlas('game-atlas', 'assets/images/game-atlas.png', 'assets/images/game-atlas.json');
```

### 3.4 Audio Format Stratejisi

| Format | Kullanım |
|--------|----------|
| **.ogg** | Primary (smaller, better quality) |
| **.mp3** | Fallback for older browsers |
| **.wav** | Short SFX (< 1s) |

**Audio Loading:**
```typescript
this.load.audio('bgm-menu', ['assets/audio/music/menu-theme.ogg', 'assets/audio/music/menu-theme.mp3']);
```

### 3.5 Font Loading

**Web Fonts:**
```typescript
// Google Fonts veya local
this.load.font('Orbitron', 'assets/fonts/Orbitron-Bold.ttf');
```

**CSS Alternative:**
```css
@font-face {
  font-family: 'Orbitron';
  src: url('/assets/fonts/Orbitron-Bold.ttf') format('truetype');
  font-weight: bold;
}
```

---

## 4. State Management

### 4.1 Phaser Registry (Global State)

**Kullanım:** Game-wide ayarlar ve persistent data

```typescript
// Set
this.game.registry.set('difficulty', 'normal');
this.game.registry.set('soundVolume', 0.8);
this.game.registry.set('musicVolume', 0.5);

// Get
const difficulty = this.game.registry.get('difficulty');

// Events
this.registry.events.on('changedata', (key: string, value: unknown) => {
  console.log(`Registry changed: ${key} = ${value}`);
});
```

**Registry Keys:**
```typescript
const REGISTRY_KEYS = {
  GAME_VERSION: 'gameVersion',
  PLATFORM: 'platform',
  DIFFICULTY: 'difficulty',
  SOUND_VOLUME: 'soundVolume',
  MUSIC_VOLUME: 'musicVolume',
  AUDIO_ENABLED: 'audioEnabled',
  LANGUAGE: 'language',
  FULLSCREEN: 'fullscreen',
};
```

### 4.2 Scene Data (Local State)

**Scene başlatma ile data transfer:**
```typescript
// Scene başlatırken data gönder
this.scene.start('GameScene', { 
  level: 1, 
  mode: 'campaign',
  saveSlot: 0 
});

// GameScene içinde data alma
init(data: { level: number; mode: string; saveSlot: number }) {
  this.currentLevel = data.level;
  this.gameMode = data.mode;
}
```

### 4.3 Custom State Manager (Planlanan)

**Singleton Pattern:**
```typescript
// src/managers/StateManager.ts
export class StateManager {
  private static instance: StateManager;
  private state: Map<string, unknown> = new Map();
  private listeners: Map<string, Set<(value: unknown) => void>> = new Map();

  static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  set<T>(key: string, value: T): void {
    this.state.set(key, value);
    this.notify(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.state.get(key) as T;
  }

  subscribe<T>(key: string, callback: (value: T) => void): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(callback as (value: unknown) => void);
    
    // Unsubscribe function
    return () => {
      this.listeners.get(key)?.delete(callback as (value: unknown) => void);
    };
  }

  private notify(key: string, value: unknown): void {
    this.listeners.get(key)?.forEach(callback => callback(value));
  }
}
```

### 4.4 Save/Load System (Planlanan)

**LocalStorage Wrapper:**
```typescript
// src/managers/SaveManager.ts
export class SaveManager {
  private static SAVE_KEY = 'warfront_save';
  private static MAX_SLOTS = 3;

  static save(slot: number, data: SaveData): boolean {
    try {
      const saves = this.getAllSaves();
      saves[slot] = {
        ...data,
        timestamp: Date.now(),
        version: VERSION,
      };
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(saves));
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  }

  static load(slot: number): SaveData | null {
    const saves = this.getAllSaves();
    return saves[slot] || null;
  }

  static delete(slot: number): void {
    const saves = this.getAllSaves();
    delete saves[slot];
    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saves));
  }

  private static getAllSaves(): Record<number, SaveData> {
    const data = localStorage.getItem(this.SAVE_KEY);
    return data ? JSON.parse(data) : {};
  }
}

interface SaveData {
  level: number;
  score: number;
  resources: Record<string, number>;
  timestamp: number;
  version: string;
}
```

---

## 5. Event System

### 5.1 Phaser Events (Built-in)

**Scene Events:**
```typescript
// Lifecycle events
this.events.on('create', () => { });
this.events.on('update', (time: number, delta: number) => { });
this.events.on('shutdown', () => { });
this.events.on('destroy', () => { });
```

**Game Events:**
```typescript
this.game.events.on('ready', () => { });
this.game.events.on('hidden', () => { }); // Tab change
this.game.events.on('visible', () => { });
this.game.events.on('blur', () => { });
this.game.events.on('focus', () => { });
```

**Input Events:**
```typescript
this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => { });
this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => { });
this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => { });
this.input.keyboard?.on('keydown-SPACE', () => { });
```

### 5.2 Custom Event Emitter

**Game-wide Event Bus:**
```typescript
// src/utils/EventBus.ts
import Phaser from 'phaser';

export const EventBus = new Phaser.Events.EventEmitter();

// Usage
EventBus.emit('player:damage', { amount: 10 });
EventBus.emit('enemy:spawn', { type: 'tank', x: 100, y: 200 });
EventBus.emit('game:over', { score: 5000 });
```

**Event Naming Convention:**
```
{entity}:{action}
{system}:{event}

Örnekler:
player:move
player:die
enemy:spawn
enemy:destroy
ui:show
ui:hide
audio:play
game:pause
game:resume
game:over
```

### 5.3 Event Subscription Pattern

```typescript
// Scene içinde subscription
export class GameScene extends Phaser.Scene {
  private eventListeners: Array<{ event: string; callback: (...args: unknown[]) => void }> = [];

  create(): void {
    this.subscribe('player:damage', this.onPlayerDamage.bind(this));
    this.subscribe('game:pause', this.onGamePause.bind(this));
  }

  private subscribe(event: string, callback: (...args: unknown[]) => void): void {
    EventBus.on(event, callback);
    this.eventListeners.push({ event, callback });
  }

  shutdown(): void {
    // Clean up all listeners
    this.eventListeners.forEach(({ event, callback }) => {
      EventBus.off(event, callback);
    });
    this.eventListeners = [];
  }
}
```

---

## 6. Debug Tools

### 6.1 Debug Mode Toggle

**Environment Variable:**
```typescript
// vite.config.ts
define: {
  __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
}

// Usage
if (__DEV__) {
  console.log('Debug mode active');
}
```

**Runtime Toggle:**
```typescript
// F2 tuşu ile debug mode
this.input.keyboard?.on('keydown-F2', () => {
  this.game.registry.set('debugMode', !this.game.registry.get('debugMode'));
});
```

### 6.2 Debug UI (Mevcut)

**GameScene içinde mevcut:**
```typescript
// Debug text (sol üst köşe)
this.debugText = this.add.text(16, 16, '', {
  fontFamily: 'monospace',
  fontSize: '14px',
  color: '#00ff88',
});
this.debugText.setScrollFactor(0); // UI sabit kalır
this.debugText.setDepth(1000);     // En üstte

// Update loop'da
this.debugText.setText([
  `WARFRONT v${this.game.registry.get('gameVersion')}`,
  `FPS: ${Math.round(this.game.loop.actualFps)}`,
  `Player: ${Math.round(this.player?.x || 0)}, ${Math.round(this.player?.y || 0)}`,
  `Time: ${Math.floor(time / 1000)}s`,
]);
```

### 6.3 Physics Debug

```typescript
// game.config.ts
physics: {
  default: 'arcade',
  arcade: {
    gravity: { x: 0, y: 0 },
    debug: true, // Debug mode'da true yap
    debugShowBody: true,
    debugShowVelocity: true,
    debugVelocityColor: 0xffff00,
    debugBodyColor: 0x00ff00,
  },
},
```

### 6.4 Performance Monitor

**Custom FPS Counter:**
```typescript
// src/utils/PerformanceMonitor.ts
export class PerformanceMonitor {
  private fpsHistory: number[] = [];
  private maxHistory = 60;
  private lastTime = 0;
  
  update(time: number): void {
    const fps = 1000 / (time - this.lastTime);
    this.lastTime = time;
    
    this.fpsHistory.push(fps);
    if (this.fpsHistory.length > this.maxHistory) {
      this.fpsHistory.shift();
    }
  }
  
  getAverageFPS(): number {
    return this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
  }
  
  getMinFPS(): number {
    return Math.min(...this.fpsHistory);
  }
  
  getMaxFPS(): number {
    return Math.max(...this.fpsHistory);
  }
}
```

### 6.5 Console Commands (Planlanan)

```typescript
// Development console
// window.game console'da erişilebilir
if (__DEV__) {
  (window as unknown as { game: Game }).game = game;
  (window as unknown as { debug: typeof DebugAPI }).debug = {
    teleport: (x: number, y: number) => { /* ... */ },
    godMode: (enabled: boolean) => { /* ... */ },
    spawnEnemy: (type: string) => { /* ... */ },
    skipLevel: () => { /* ... */ },
  };
}
```

### 6.6 Visual Debugging

**Grid Overlay:**
```typescript
// Mevcut GameScene'de var
private createGrid(): void {
  const graphics = this.add.graphics();
  graphics.lineStyle(1, 0x1a1a1a, 1);
  
  for (let x = 0; x <= 2560; x += 64) {
    graphics.moveTo(x, 0);
    graphics.lineTo(x, 1440);
  }
  
  for (let y = 0; y <= 1440; y += 64) {
    graphics.moveTo(0, y);
    graphics.lineTo(2560, y);
  }
  
  graphics.strokePath();
}
```

**Collision Debug:**
```typescript
// Collision group visualization
this.debugGraphics = this.add.graphics();
this.physics.world.drawDebug(this.debugGraphics);
```

---

## 7. Build Pipeline

### 7.1 NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts",
    "clean": "rimraf dist node_modules/.vite"
  }
}
```

### 7.2 Development Build

**Komut:** `npm run dev`

**Özellikler:**
- Hot Module Replacement (HMR)
- Source maps enabled
- Dev server on port 3000
- CORS enabled
- LAN access for mobile testing

**Vite Dev Config:**
```typescript
server: {
  port: 3000,
  open: true,
  host: true, // LAN access
  cors: true,
},
```

### 7.3 Production Build

**Komut:** `npm run build`

**Process:**
1. TypeScript type check (`tsc --noEmit`)
2. Vite build (Rollup bundling)
3. esbuild minification
4. Chunk splitting (Phaser separate)

**Vite Build Config:**
```typescript
build: {
  target: 'es2020',
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: false, // Production'da kapalı
  minify: 'esbuild',
  rollupOptions: {
    output: {
      manualChunks: {
        phaser: ['phaser'], // Phaser'ı ayrı chunk'a al
      },
    },
  },
},
```

**Build Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js       (Main bundle)
│   ├── phaser-[hash].js      (Phaser vendor)
│   └── [other-assets]/
└── (copied from public/)
```

### 7.4 Preview Build

**Komut:** `npm run preview`

**Özellikler:**
- Serves production build on port 3001
- Tests production bundle locally
- Validates build output

### 7.5 Environment Variables

```typescript
// .env.development
VITE_GAME_VERSION=0.1.0-dev
VITE_DEBUG=true

// .env.production
VITE_GAME_VERSION=0.1.0
VITE_DEBUG=false

// Usage in code
const version = import.meta.env.VITE_GAME_VERSION;
const isDebug = import.meta.env.VITE_DEBUG === 'true';
```

### 7.6 Build Optimization

**Bundle Analysis:**
```bash
# Rollup Visualizer eklentisi
npm install -D rollup-plugin-visualizer
```

**Asset Optimization:**
- **Images:** PNG → WebP (opsiyonel)
- **Audio:** WAV → OGG/MP3
- **Fonts:** WOFF2 format

**Tree Shaking:**
```typescript
// Phaser'ı sadece kullanılan modüllerle import et
import { Game, Scene } from 'phaser';
// Değil:
// import * as Phaser from 'phaser';
```

---

## 8. Performance Hedefleri

### 8.1 Frame Rate

| Hedef | Değer |
|-------|-------|
| **Target FPS** | 60 FPS |
| **Minimum FPS** | 30 FPS |
| **Frame Time** | ≤ 16.67ms |

**Monitoring:**
```typescript
// GameScene update loop
update(time: number, delta: number): void {
  const frameTime = delta; // ms
  if (frameTime > 33) {
    console.warn(`Frame drop: ${frameTime.toFixed(2)}ms`);
  }
}
```

### 8.2 Load Time Hedefleri

| Asset Type | Target | Max |
|------------|--------|-----|
| **Initial Load** | < 3s | < 5s |
| **Scene Load** | < 1s | < 2s |
| **Total Assets** | < 10MB | < 20MB |

**Load Optimization:**
```typescript
// Lazy loading scenes
this.load.scene('MenuScene', 'scenes/MenuScene.js');

// Asset preloading strategy
// Phase 1: Critical (boot, preload scenes)
// Phase 2: Menu assets
// Phase 3: Game assets (per level)
```

### 8.3 Memory Kullanımı

| Hedef | Değer |
|-------|-------|
| **Initial Memory** | < 100MB |
| **Peak Memory** | < 500MB |
| **Asset Cleanup** | Scene shutdown |

**Memory Management:**
```typescript
// Scene shutdown'da cleanup
shutdown(): void {
  // Destroy textures
  this.textures.remove('temporary-asset');
  
  // Clear timers
  this.time.removeAllEvents();
  
  // Remove listeners
  this.events.removeAllListeners();
}
```

### 8.4 Entity Pooling

**Object Pool Pattern:**
```typescript
// src/objects/Pool.ts
export class Pool<T extends Phaser.GameObjects.GameObject> {
  private pool: T[] = [];
  private active: Set<T> = new Set();

  constructor(
    private scene: Phaser.Scene,
    private createFn: () => T,
    private initialSize: number = 10
  ) {
    this.expand(initialSize);
  }

  get(): T {
    if (this.pool.length === 0) {
      this.expand(5);
    }
    const obj = this.pool.pop()!;
    this.active.add(obj);
    return obj;
  }

  release(obj: T): void {
    if (this.active.has(obj)) {
      this.active.delete(obj);
      this.pool.push(obj);
      // Reset object state
      obj.setActive(false);
      obj.setVisible(false);
    }
  }

  private expand(count: number): void {
    for (let i = 0; i < count; i++) {
      const obj = this.createFn();
      obj.setActive(false);
      obj.setVisible(false);
      this.pool.push(obj);
    }
  }
}

// Usage: Projectile pooling
const bulletPool = new Pool(scene, () => new Bullet(scene, 0, 0), 50);
```

### 8.5 Rendering Optimization

**Sprite Batching:**
```typescript
// Aynı texture'ları kullan
// Batch break'lerden kaçın
this.load.atlas('game-atlas', 'atlas.png', 'atlas.json');

// Sprite sheet kullan
this.load.spritesheet('player', 'player.png', { frameWidth: 32, frameHeight: 32 });
```

**Culling:**
```typescript
// Phaser otomatik culling yapar ama kontrol et
sprite.setCullCallback((obj: Phaser.GameObjects.Sprite, camera: Phaser.Cameras.Scene2D.Camera) => {
  return Phaser.Geom.Rectangle.Overlaps(
    camera.worldView,
    obj.getBounds()
  );
});
```

**Render Resolution:**
```typescript
// Mobilde düşük resolution
const isMobile = /Android|iPhone/i.test(navigator.userAgent);
const scale = isMobile ? 0.5 : 1;

this.scale.setGameSize(GAME_WIDTH * scale, GAME_HEIGHT * scale);
```

### 8.6 Update Loop Optimization

**Object Updates:**
```typescript
// Sadece active ve visible objeleri update et
this.children.each((child: Phaser.GameObjects.GameObject) => {
  if (child.active && child.visible) {
    child.update(time, delta);
  }
  return false; // Continue iteration
});
```

**Throttled Updates:**
```typescript
// Her frame değil, her N frame'de bir update
private updateCounter = 0;

update(time: number, delta: number): void {
  this.updateCounter++;
  
  // Her 3 frame'de bir
  if (this.updateCounter % 3 === 0) {
    this.updateExpensiveOperations();
  }
}
```

---

## 9. MVP Scope (Phase 2)

### 9.1 Hedef Özellikler

**Sahne Sistemi:**
- [x] BootScene (mevcut)
- [x] PreloadScene (mevcut)
- [x] GameScene (mevcut)
- [ ] MenuScene (yeni)
- [ ] UIScene (yeni)

**Player Sistemi:**
- [x] Movement (WASD/Arrow)
- [ ] Animation system
- [ ] Health system
- [ ] Inventory system

**World Sistemi:**
- [x] World bounds (2560x1440)
- [x] Grid background
- [ ] Tilemap system
- [ ] Camera zones

**Input Sistemi:**
- [x] Keyboard input
- [ ] Mouse input
- [ ] Touch input (mobile)

**UI Sistemi:**
- [x] Debug UI (FPS, position)
- [ ] HUD (health, ammo, resources)
- [ ] Menu system
- [ ] Dialog system

**Save/Load:**
- [ ] LocalStorage save
- [ ] Multiple save slots
- [ ] Auto-save

### 9.2 Timeline (14 Hafta)

| Hafta | Görev |
|-------|-------|
| 1-2 | MenuScene + UIScene |
| 3-4 | Player animation + health system |
| 5-6 | Tilemap integration |
| 7-8 | Enemy AI basics |
| 9-10 | Weapon system |
| 11-12 | Save/Load + UI polish |
| 13-14 | Testing + optimization |

### 9.3 MVP'de YOK (Phase 3+)

- Multiplayer
- Procedural generation
- Complex AI
- Voice acting
- Achievements
- Social features
- IAP/Monetization

---

## 10. Best Practices

### 10.1 Kod Standartları

**TypeScript:**
- Strict mode enabled
- Interface kullanımı
- Type annotations
- No `any` (mümkün olduğunca)

**Naming:**
```typescript
// Classes: PascalCase
class PlayerManager { }

// Functions/Variables: camelCase
function updatePlayer() { }
const playerSpeed = 200;

// Constants: SCREAMING_SNAKE_CASE
const MAX_ENEMIES = 100;
const GAME_WIDTH = 1280;

// Private members: underscore prefix
private _health: number = 100;
```

**File Organization:**
```
src/
├── config/        # Configuration files
├── scenes/        # Phaser scenes
├── objects/       # Game objects
├── managers/      # Game managers
├── utils/         # Utility functions
├── types/         # TypeScript types
└── constants/     # Game constants
```

### 10.2 Performance Checklist

**Her Scene İçin:**
- [ ] Asset'ler preload'da yüklenmiş mi?
- [ ] Unnecessary updates minimized?
- [ ] Event listeners cleanup on shutdown?
- [ ] Textures destroy on scene change?
- [ ] Timers cleared?

**Development'da:**
- [ ] Physics debug kapalı (prod'da)
- [ ] Console logs removed (prod'da)
- [ ] Source maps disabled (prod'da)
- [ ] Minification enabled (prod'da)

### 10.3 Testing Strategy

**Unit Tests (Planlanan):**
- Utility functions
- State management
- Save/Load system

**Integration Tests (Planlanan):**
- Scene transitions
- Asset loading
- Input handling

**Manual Testing:**
- Frame rate monitoring
- Memory profiling (Chrome DevTools)
- Load time testing (throttled network)

---

## 11. Gelecek Planları

### Phase 3: Multiplayer Foundation
- WebSocket server
- Client prediction
- Server reconciliation

### Phase 4: Content Expansion
- Multiple levels
- Enemy types
- Weapon variety

### Phase 5: Polish & Release
- Audio implementation
- UI/UX refinement
- Mobile optimization

---

**Doküman Sahibi:** Game Team  
**Son Güncelleme:** 2026-03-14  
**Versiyon:** 1.0

---

*Bu doküman WARFRONT projesinin teknik detaylarını içerir. Değişiklikler game-lead onayı ile yapılmalıdır.*