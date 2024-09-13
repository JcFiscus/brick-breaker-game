// brick.js

import { detectCollision } from './utils.js';

export default class Brick {
  constructor(game, position, durability, type) {
    this.image = document.getElementById('img_brick');
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.durability = durability;
    this.type = type; // Affects score and appearance
    this.markedForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.velocity.y = -this.game.ball.velocity.y;
      this.durability--;
      if (this.durability <= 0) {
        this.markedForDeletion = true;
        this.game.score += this.type.score;
        // Random chance to drop power-up
        if (Math.random() < this.game.config.powerUpChance) {
          this.game.powerUps.push(this.createPowerUp());
        }
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.type.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  createPowerUp() {
    // Implement power-up creation logic
    return null; // Placeholder
  }
}
