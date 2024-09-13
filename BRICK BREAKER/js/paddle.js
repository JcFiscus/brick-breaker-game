// paddle.js

export default class Paddle {
  constructor(gameWidth, gameHeight, config) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = config.paddleWidth || 100;
    this.height = 20;
    this.maxSpeed = 7;
    this.speed = 0;
    this.position = {
      x: (gameWidth - this.width) / 2,
      y: gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(deltaTime) {
    this.position.x += this.speed;

    // Wall collision detection
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }

  draw(ctx) {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  expand() {
    this.width *= 1.5;
    setTimeout(() => {
      this.width /= 1.5;
    }, 10000); // 10 seconds
  }

  shrink() {
    this.width /= 1.5;
    setTimeout(() => {
      this.width *= 1.5;
    }, 10000); // 10 seconds
  }
}
