import { Tetromino } from "./Tetromino.mjs";
import { PointSet } from "./PointSet.mjs";

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
    const fallingBlockPoints = this.getFallingBlockPoints(this.fallingBlock);
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
    const pointsAfterMove = this.getFallingBlockPoints(this.fallingBlock).map((p) => ({
      x: p.x - 1,
      y: p.y,
    }));
    if (!this.isFalling || this.isBeyondBoard(pointsAfterMove) || this.isBlockOverlapping(pointsAfterMove)) {
      return;
    }
    this.removeBlockFromBoard();
    this.fallingBlockTopLeftPosition.column -= 1;
    this.fillBlockToBoard();
  }

  moveRight() {
    const pointsAfterMove = this.getFallingBlockPoints(this.fallingBlock).map((p) => ({
      x: p.x + 1,
      y: p.y,
    }));
    if (!this.isFalling || this.isBeyondBoard(pointsAfterMove) || this.isBlockOverlapping(pointsAfterMove)) {
      return;
    }
    this.removeBlockFromBoard();
    this.fallingBlockTopLeftPosition.column += 1;
    this.fillBlockToBoard();
  }

  kickMove(points) {
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

  rotateLeft() {
    const pointsAfterRotate = this.getFallingBlockPoints(this.fallingBlock.rotateLeft());
    if (!this.isFalling || this.isBeyondBoard(pointsAfterRotate) || this.isBlockOverlapping(pointsAfterRotate)) {
      // TODO
    } else {
      this.removeBlockFromBoard();
      this.fallingBlock = this.fallingBlock.rotateLeft();
      this.fillBlockToBoard();
    }
  }

  rotateRight() {
    const pointsAfterRotate = this.getFallingBlockPoints(this.fallingBlock.rotateRight());
    if (!this.isFalling || this.isBeyondBoard(pointsAfterRotate) || this.isBlockOverlapping(pointsAfterRotate)) {
      // TODO
    } else {
      this.removeBlockFromBoard();
      this.fallingBlock = this.fallingBlock.rotateRight();
      this.fillBlockToBoard();
    }
  }

  moveDown() {
    const pointsAfterMove = this.getFallingBlockPoints(this.fallingBlock).map((p) => ({
      x: p.x,
      y: p.y + 1,
    }));
    if (!this.isFalling || this.isBeyondBoard(pointsAfterMove) || this.isBlockOverlapping(pointsAfterMove)) {
      return;
    }
    this.removeBlockFromBoard();
    this.fallingBlockTopLeftPosition.row += 1;
    this.fillBlockToBoard();
  }

  drop(block) {
    if (this.isFalling) {
      throw new Error("already falling");
    }
    this.isFalling = true;
    if (typeof block === "string") {
      this.fallingBlock = new Tetromino([[block]]);
    } else {
      this.fallingBlock = block;
    }
    const middle = Math.floor((this.width - this.fallingBlock.width) / 2);
    this.fallingBlockTopLeftPosition = { column: middle, row: 0 };
    this.fillBlockToBoard();
  }

  fillBlockToBoard() {
    for (let i = 0; i < this.fallingBlock.height; i++) {
      for (let j = 0; j < this.fallingBlock.width; j++) {
        if (this.fallingBlock.shape[i][j] !== ".") {
          this.board[this.fallingBlockTopLeftPosition.row + i][this.fallingBlockTopLeftPosition.column + j] =
            this.fallingBlock.shape[i][j];
        }
      }
    }
  }

  removeBlockFromBoard() {
    for (let i = 0; i < this.fallingBlock.height; i++) {
      for (let j = 0; j < this.fallingBlock.width; j++) {
        if (this.fallingBlock.shape[i][j] !== ".") {
          this.board[this.fallingBlockTopLeftPosition.row + i][this.fallingBlockTopLeftPosition.column + j] = ".";
        }
      }
    }
  }

  hasFalling() {
    return this.isFalling;
  }

  tick() {
    if (!this.isFalling) {
      return;
    }
    const pointsAfterMove = this.getFallingBlockPoints(this.fallingBlock).map((p) => ({
      x: p.x,
      y: p.y + 1,
    }));
    if (this.isBeyondBoard(pointsAfterMove) || this.isBlockOverlapping(pointsAfterMove)) {
      this.stopFalling();
      return;
    }
    this.removeBlockFromBoard();
    this.fallingBlockTopLeftPosition.row += 1;
    this.fillBlockToBoard();
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
