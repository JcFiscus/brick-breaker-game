// input.js

export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          paddle.moveLeft();
          break;
        case 'ArrowRight':
          paddle.moveRight();
          break;
        case 'Escape':
          game.togglePause();
          break;
        case ' ':
          // Start the game or release the ball
          break;
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (paddle.speed < 0) paddle.stop();
          break;
        case 'ArrowRight':
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });

    // Touch controls for mobile
    let touchX = null;
    document.addEventListener('touchstart', (event) => {
      touchX = event.touches[0].clientX;
    });

    document.addEventListener('touchmove', (event) => {
      let deltaX = event.touches[0].clientX - touchX;
      touchX = event.touches[0].clientX;
      paddle.position.x += deltaX;

      // Boundary checks
      if (paddle.position.x < 0) paddle.position.x = 0;
      if (paddle.position.x + paddle.width > game.gameWidth)
        paddle.position.x = game.gameWidth - paddle.width;
    });
  }
}
