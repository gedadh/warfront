/**
 * WARFRONT - Player Object
 * Player entity class
 */

import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 200;
  private wasdKeys!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Setup physics body
    this.setCollideWorldBounds(true);
    this.setScale(1.5);
    
    // Setup WASD keys
    if (scene.input.keyboard) {
      this.wasdKeys = {
        W: scene.input.keyboard.addKey('W'),
        A: scene.input.keyboard.addKey('A'),
        S: scene.input.keyboard.addKey('S'),
        D: scene.input.keyboard.addKey('D'),
      };
    }
    
    console.log('[Player] Created at', x, y);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, _time: number, _delta: number): void {
    // Reset velocity
    this.setVelocity(0);
    
    // Horizontal movement
    if (cursors.left.isDown || this.wasdKeys?.A.isDown) {
      this.setVelocityX(-this.speed);
    } else if (cursors.right.isDown || this.wasdKeys?.D.isDown) {
      this.setVelocityX(this.speed);
    }
    
    // Vertical movement
    if (cursors.up.isDown || this.wasdKeys?.W.isDown) {
      this.setVelocityY(-this.speed);
    } else if (cursors.down.isDown || this.wasdKeys?.S.isDown) {
      this.setVelocityY(this.speed);
    }
    
    // Normalize diagonal movement
    const velocity = this.body?.velocity;
    if (velocity && velocity.x !== 0 && velocity.y !== 0) {
      const factor = 1 / Math.sqrt(2);
      this.setVelocity(
        velocity.x * factor,
        velocity.y * factor
      );
    }
  }
}