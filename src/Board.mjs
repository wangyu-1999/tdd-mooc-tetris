import { Tetromino } from "./Tetromino.mjs";
import { PointSet } from "./PointSet.mjs";

export class Board {
  width;
  height;
  isFalling;
  fallingBlock;
  fallingBlockTopLeftPosition;

  get fallingBlockLastNonEmptyRow() {
    for (
      let i = Math.min(this.fallingBlockTopLeftPosition.row + this.fallingBlock.height - 1, this.height - 1);
      i >= this.fallingBlockTopLeftPosition.row;
      i--
    ) {
      for (
        let j = this.fallingBlockTopLeftPosition.column;
        j < this.fallingBlockTopLeftPosition.column + this.fallingBlock.width;
        j++
      ) {
        if (this.board[i][j] !== ".") {
          return i;
        }
      }
    }
  }

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.isFalling = false;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
  }

  getFallingBlockPoints() {
    return this.fallingBlock.points.map((p) => ({
      x: p.x + this.fallingBlockTopLeftPosition.column,
      y: p.y + this.fallingBlockTopLeftPosition.row,
    }));
  }

  isBeyondBoard(points) {
    return points.some((p) => p.x < 0 || p.x >= this.width || p.y < 0 || p.y >= this.height);
  }

  isBlockOverlapping(points) {
    const fallingBlockPoints = this.getFallingBlockPoints();
    const pointSet = new PointSet();
    fallingBlockPoints.forEach((p) => {
      pointSet.add(p.x, p.y);
    });
    return points.some((p) => this.board[p.y][p.x] !== "." && !pointSet.has(p.x, p.y));
  }

  moveLeft() {
    const pointsAfterMove = this.getFallingBlockPoints().map((p) => ({
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
    if (!this.isFalling) {
      return;
    }
    const { row, column } = this.fallingBlockTopLeftPosition;
    const lastNonEmptyRow = this.fallingBlockLastNonEmptyRow;
    const width = this.fallingBlock.width;
    for (let i = row; i <= lastNonEmptyRow; i++) {
      if (this.board[i][column + width + 1] !== ".") {
        return;
      }
    }
    this.removeBlockFromBoard();
    this.fallingBlockTopLeftPosition.column += 1;
    this.fillBlockToBoard();
  }

  moveDown() {
    if (!this.isFalling) {
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

  canFall() {
    if (!this.isFalling) {
      return false;
    }
    const lastNonEmptyRow = this.fallingBlockLastNonEmptyRow;
    if (lastNonEmptyRow === this.height - 1) {
      return false;
    }
    if (this.board[lastNonEmptyRow + 1][this.fallingBlockTopLeftPosition.column] === ".") {
      return true;
    }
    return false;
  }

  tick() {
    if (!this.isFalling) {
      return;
    }
    const { row, column } = this.fallingBlockTopLeftPosition;

    if (row === this.height - 1) {
      this.isFalling = false;
      this.fallingBlock = null;
      this.fallingBlockTopLeftPosition = null;
      return;
    }

    if (row + 1 < this.height && this.canFall()) {
      this.removeBlockFromBoard();
      this.fallingBlockTopLeftPosition.row += 1;
      this.fillBlockToBoard();
    } else {
      this.isFalling = false;
      this.fallingBlock = null;
      this.fallingBlockTopLeftPosition = null;
    }
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
