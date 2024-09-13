// main.js

import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';
import { buildLevel } from './level.js';
import { level1, level2 } from '../config/levels.js';
import PowerUp from './powerUp.js';

class Game {
  constructor(gameWidth, gameHeight, config) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.config = config;
    this.lives = config.lives || 3;
    this.score = 0;
    this.level = 1;
    this.bricks = [];
    this.powerUps = [];
    this.gameObjects = [];
    this.paused = false;
    this.gameOver = false;
    this.paddle = new Paddle(this.gameWidth, this.gameHeight, config);
    this.ball = new Ball(this, config);
    new InputHandler(this.paddle, this);
  }

  start() {
    this.bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle];
  }

  update(deltaTime) {
    if (this.paused || this.gameOver) return;

    [...this.gameObjects, ...this.bricks, ...this.powerUps].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    this.powerUps = this.powerUps.filter(pu => !pu.markedForDeletion);

    // Check for level completion
    if (this.bricks.length === 0) {
      this.levelUp();
    }

    // Update UI
    document.getElementById('score').innerText = `Score: ${this.score}`;
    document.getElementById('lives').innerText = `Lives: ${this.lives}`;
    document.getElementById('level').innerText = `Level: ${this.level}`;

    // Check for game over
    if (this.lives <= 0) {
      this.gameOver = true;
      document.getElementById('gameOverScreen').classList.remove('hidden');
      document.getElementById('finalScore').innerText = this.score;
      this.updateHighScore();
    }
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks, ...this.powerUps].forEach(object =>
      object.draw(ctx)
    );
  }

  togglePause() {
    this.paused = !this.paused;
    document.getElementById('pauseMenu').classList.toggle('hidden');
  }

  levelUp() {
    this.level++;
    this.ball.reset();
    // Load next level or loop back to level 1
    let nextLevel = this.level % 2 === 0 ? level2 : level1;
    this.bricks = buildLevel(this, nextLevel);
  }

  addBall() {
    let newBall = new Ball(this, this.config);
    this.gameObjects.push(newBall);
  }

  updateHighScore() {
    let highScore = localStorage.getItem('highScore') || 0;
    if (this.score > highScore) {
      localStorage.setItem('highScore', this.score);
    }
    document.getElementById('highScore').innerText = localStorage.getItem('highScore');
  }
}

async function initGame() {
  const response = await fetch('config/config.json');
  const config = await response.json();

  let canvas = document.getElementById('gameCanvas');
  let ctx = canvas.getContext('2d');

  let GAME_WIDTH = window.innerWidth;
  let GAME_HEIGHT = window.innerHeight;

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  let game = new Game(GAME_WIDTH, GAME_HEIGHT, config);
  game.start();

  let lastTime = 0;

  function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);

  // UI Event Listeners
  document.getElementById('pauseBtn').addEventListener('click', () => {
    game.togglePause();
  });

  document.getElementById('resumeBtn').addEventListener('click', () => {
    game.togglePause();
  });

  document.getElementById('restartBtn').addEventListener('click', () => {
    location.reload();
  });

  document.getElementById('exitBtn').addEventListener('click', () => {
    // Implement exit functionality
  });

  document.getElementById('restartGameBtn').addEventListener('click', () => {
    location.reload();
  });

  document.getElementById('quitGameBtn').addEventListener('click', () => {
    // Implement quit functionality
  });

  // Background Music Toggle
  document.getElementById('bgMusicToggle').addEventListener('change', (e) => {
    let bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
      bgMusic.muted = !e.target.checked;
    }
  });
}

initGame();
