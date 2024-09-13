// utils.js

export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.y + ball.radius;
  let topOfBall = ball.y - ball.radius;

  let topOfObject = gameObject.y;
  let leftSideOfObject = gameObject.x;
  let rightSideOfObject = gameObject.x + gameObject.width;
  let bottomOfObject = gameObject.y + gameObject.height;

  return (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.x >= leftSideOfObject &&
    ball.x <= rightSideOfObject
  );
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
