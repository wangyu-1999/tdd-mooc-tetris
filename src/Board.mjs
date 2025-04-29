import { Tetromino } from "./Tetromino.mjs";

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

  moveLeft() {
    if (!this.isFalling) {
      return;
    }
    const { row, column } = this.fallingBlockTopLeftPosition;
    const lastNonEmptyRow = this.fallingBlockLastNonEmptyRow;
    for (let i = row; i <= lastNonEmptyRow; i++) {
      if (this.board[i][column - 1] !== ".") {
        return;
      }
    }
    this.removeBlockFromBoard();
    this.fallingBlockTopLeftPosition.column -= 1;
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
