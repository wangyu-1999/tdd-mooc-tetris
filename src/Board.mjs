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

  drop(block) {
    const middle = Math.floor(this.width / 2);
    if (this.isFalling) {
      throw new Error("already falling");
    }
    this.isFalling = true;
    this.fallingBlock = block;
    this.fallingBlockTopLeftPosition = { column: middle, row: 0 };
    this.board[0][middle] = block;
  }

  hasFalling() {
    return this.isFalling;
  }

  tick() {
    const { row, column } = this.fallingBlockTopLeftPosition;

    if (row === this.height - 1) {
      this.isFalling = false;
      this.fallingBlock = null;
      this.fallingBlockTopLeftPosition = null;
      return;
    }

    if (row + 1 < this.height && this.board[row + 1][column] === ".") {
      this.board[row][column] = ".";
      this.fallingBlockTopLeftPosition.row += 1;
      this.board[this.fallingBlockTopLeftPosition.row][column] = this.fallingBlock;
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
