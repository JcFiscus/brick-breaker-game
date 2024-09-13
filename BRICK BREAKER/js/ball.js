// ball.js

import { detectCollision } from './utils.js';

export default class Ball {
  constructor(game, config) {
    this.image = document.getElementById('img_ball');
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.config = config;

    this.radius = 10;
    this.reset();
  }

  reset() {
    this.speed = this.config.ballSpeed || 5;
    this.position = { x: this.gameWidth / 2, y: this.gameHeight - 30 };
    this.velocity = { x: this.speed, y: -this.speed };
  }

  draw(ctx) {
    ctx.fillStyle = '#FFDD00';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update(deltaTime) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Wall collision (left/right)
    if (this.position.x + this.radius > this.gameWidth || this.position.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }

    // Wall collision (top)
    if (this.position.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    // Bottom collision
    if (this.position.y + this.radius > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // Paddle collision
    if (detectCollision(this, this.game.paddle)) {
      this.velocity.y = -this.velocity.y;

      // Adjust angle based on where it hits the paddle
      let collidePoint = this.position.x - (this.game.paddle.x + this.game.paddle.width / 2);
      collidePoint = collidePoint / (this.game.paddle.width / 2);
      let angle = (Math.PI / 3) * collidePoint; // Max 60 degrees
      this.velocity.x = this.speed * Math.sin(angle);
      this.velocity.y = -this.speed * Math.cos(angle);
    }
  }
}
