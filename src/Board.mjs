import { Tetromino } from "./Tetromino.mjs";
import { PointSet } from "./PointSet.mjs";
import { NewTetromino } from "./NewTetromino.mjs";

export class Board {
  width;
  height;
  isFalling;
  fallingBlock;
  fallingBlockTopLeftPosition;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.isFalling = false;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
  }

  get isClassTetromino() {
    return this.fallingBlock instanceof Tetromino;
  }

  getFallingBlockPoints(block) {
    return block.points.map((p) => ({
      x: p.x + this.fallingBlockTopLeftPosition.column,
      y: p.y + this.fallingBlockTopLeftPosition.row,
    }));
  }

  isBeyondBoard(points) {
    return points.some((p) => p.x < 0 || p.x >= this.width || p.y < 0 || p.y >= this.height);
  }

  isBlockOverlapping(points) {
    const fallingBlockPoints = this.fallingBlock.blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x,
      y: block[1] + this.fallingBlockTopLeftPosition.y,
    }));
    const pointSet = new PointSet();
    fallingBlockPoints.forEach((p) => {
      pointSet.add(p.x, p.y);
    });
    return points.some((p) => this.board[p.y][p.x] !== "." && !pointSet.has(p.x, p.y));
  }

  stopFalling() {
    if (!this.isFalling) {
      return;
    }
    this.isFalling = false;
    this.fallingBlock = null;
    this.fallingBlockTopLeftPosition = null;
  }

  moveLeft() {
    const pointsAfterMove = this.fallingBlock.blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x - 1,
      y: block[1] + this.fallingBlockTopLeftPosition.y,
    }));
    this.checkAndAction(pointsAfterMove, () => {
      this.fallingBlockTopLeftPosition.x -= 1;
    });
  }

  moveRight() {
    const pointsAfterMove = this.fallingBlock.blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x + 1,
      y: block[1] + this.fallingBlockTopLeftPosition.y,
    }));
    this.checkAndAction(pointsAfterMove, () => {
      this.fallingBlockTopLeftPosition.x += 1;
    });
  }

  moveDown() {
    const pointsAfterMove = this.fallingBlock.blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x,
      y: block[1] + this.fallingBlockTopLeftPosition.y + 1,
    }));
    this.checkAndAction(pointsAfterMove, () => {
      this.fallingBlockTopLeftPosition.y += 1;
    });
  }

  kickMoveFlag(points) {
    let moveFlag = "none";
    points.forEach((p) => {
      if (p.x === 0) {
        moveFlag = "right";
        return;
      }
      if (p.x === this.width - 1) {
        moveFlag = "left";
        return;
      }
    });
    return moveFlag;
  }

  checkAndAction(pointsAfterAction, action) {
    if (!this.isFalling || this.isBeyondBoard(pointsAfterAction) || this.isBlockOverlapping(pointsAfterAction)) {
      return false;
    }
    this.newRemoveBlockFromBoard();
    action();
    this.newFillBlockToBoard();
    return true;
  }

  rotateLeft() {
    const pointsAfterRotate = this.fallingBlock.rotateLeft().blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x,
      y: block[1] + this.fallingBlockTopLeftPosition.y,
    }));
    const res = this.checkAndAction(pointsAfterRotate, () => {
      this.fallingBlock = this.fallingBlock.rotateLeft();
    });
    if (!res) {
      const kickMoveFlag = this.kickMoveFlag(this.fallingBlock.blocks);
      switch (kickMoveFlag) {
        case "left":
          pointsAfterRotate = pointsAfterRotate.map((p) => ({ x: p.x - 1, y: p.y }));
          this.checkAndAction(pointsAfterRotate, () => {
            this.fallingBlockTopLeftPosition.x -= 1;
            this.fallingBlock = this.fallingBlock.rotateLeft();
          });
          break;
        case "right":
          pointsAfterRotate = pointsAfterRotate.map((p) => ({ x: p.x + 1, y: p.y }));
          this.checkAndAction(pointsAfterRotate, () => {
            this.fallingBlockTopLeftPosition.x += 1;
            this.fallingBlock = this.fallingBlock.rotateLeft();
          });
          break;
        default:
          break;
      }
    }
  }

  rotateRight() {
    const pointsAfterRotate = this.fallingBlock.rotateRight().blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x,
      y: block[1] + this.fallingBlockTopLeftPosition.y,
    }));
    const res = this.checkAndAction(pointsAfterRotate, () => {
      this.fallingBlock = this.fallingBlock.rotateRight();
    });
    if (!res) {
      const kickMoveFlag = this.kickMoveFlag(this.fallingBlock.blocks);
      switch (kickMoveFlag) {
        case "left":
          pointsAfterRotate = pointsAfterRotate.map((p) => ({ x: p.x - 1, y: p.y }));
          this.checkAndAction(pointsAfterRotate, () => {
            this.fallingBlock = this.fallingBlock.rotateRight();
            this.fallingBlockTopLeftPosition.x -= 1;
          });
          break;
        case "right":
          pointsAfterRotate = pointsAfterRotate.map((p) => ({ x: p.x + 1, y: p.y }));
          this.checkAndAction(pointsAfterRotate, () => {
            this.fallingBlock = this.fallingBlock.rotateRight();
            this.fallingBlockTopLeftPosition.x += 1;
          });
          break;
        default:
          break;
      }
    }
  }

  drop(block) {
    if (this.isFalling) {
      throw new Error("already falling");
    }
    this.isFalling = true;
    if (typeof block === "string") {
      this.fallingBlock = new NewTetromino(block);
    } else {
      this.fallingBlock = block;
    }
    const middle = Math.floor((this.width - this.fallingBlock.width) / 2);
    this.fallingBlockTopLeftPosition = { x: middle, y: 0 };
    this.newFillBlockToBoard();
  }

  newFillBlockToBoard() {
    this.fallingBlock.blocks.forEach((block) => {
      const x = block[0] + this.fallingBlockTopLeftPosition.x;
      const y = block[1] + this.fallingBlockTopLeftPosition.y;
      this.board[y][x] = this.fallingBlock.type;
    });
  }

  newRemoveBlockFromBoard() {
    this.fallingBlock.blocks.forEach((block) => {
      const x = block[0] + this.fallingBlockTopLeftPosition.x;
      const y = block[1] + this.fallingBlockTopLeftPosition.y;
      this.board[y][x] = ".";
    });
  }

  hasFalling() {
    return this.isFalling;
  }

  tick() {
    if (!this.isFalling) {
      return;
    }
    const pointsAfterMove = this.fallingBlock.blocks.map((block) => ({
      x: block[0] + this.fallingBlockTopLeftPosition.x,
      y: block[1] + this.fallingBlockTopLeftPosition.y + 1,
    }));
    if (this.isBeyondBoard(pointsAfterMove) || this.isBlockOverlapping(pointsAfterMove)) {
      this.stopFalling();
      return;
    }
    this.newRemoveBlockFromBoard();
    this.fallingBlockTopLeftPosition.y += 1;
    this.newFillBlockToBoard();
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
