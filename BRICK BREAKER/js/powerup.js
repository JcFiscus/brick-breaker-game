// powerUp.js

export default class PowerUp {
  constructor(game, position, type) {
    this.game = game;
    this.position = { ...position };
    this.width = 20;
    this.height = 20;
    this.speed = 2;
    this.type = type; // e.g., 'expandPaddle', 'extraBall', 'slowDown'
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    this.position.y += this.speed;

    // Collision with paddle
    if (
      this.position.x < this.game.paddle.position.x + this.game.paddle.width &&
      this.position.x + this.width > this.game.paddle.position.x &&
      this.position.y < this.game.paddle.position.y + this.game.paddle.height &&
      this.position.y + this.height > this.game.paddle.position.y
    ) {
      this.activatePowerUp();
      this.markedForDeletion = true;
    }

    // Out of bounds
    if (this.position.y > this.game.gameHeight) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.type.color || '#FFD700';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  activatePowerUp() {
    switch (this.type.name) {
      case 'expandPaddle':
        this.game.paddle.expand();
        break;
      case 'shrinkPaddle':
        this.game.paddle.shrink();
        break;
      case 'extraBall':
        this.game.addBall();
        break;
      case 'slowDown':
        this.game.ball.speed *= 0.8;
        break;
      case 'fasterBall':
        this.game.ball.speed *= 1.2;
        break;
      default:
        break;
    }
  }
}
