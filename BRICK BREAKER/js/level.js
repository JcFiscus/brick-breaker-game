// level.js

import Brick from './brick.js';

export function buildLevel(game, levelData) {
  let bricks = [];

  levelData.forEach((row, rowIndex) => {
    row.forEach((brickType, brickIndex) => {
      if (brickType !== 0) {
        let position = {
          x: 80 * brickIndex,
          y: 75 + 24 * rowIndex
        };
        let durability = brickType.durability;
        let type = brickType;
        bricks.push(new Brick(game, position, durability, type));
      }
    });
  });

  return bricks;
}
