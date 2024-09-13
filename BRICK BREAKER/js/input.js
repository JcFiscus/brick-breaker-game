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
          // Start the game or launch the ball
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
      paddle.x += deltaX;

      // Boundary checks
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > game.gameWidth)
        paddle.x = game.gameWidth - paddle.width;
    });
  }
}
