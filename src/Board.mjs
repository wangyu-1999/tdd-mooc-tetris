export class Board {
  width;
  height;
  isFalling;
  fallingBlock;
  fallingBlockPosition;

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
    this.fallingBlockPosition = { column: middle, row: 0 };
    this.board[0][middle] = block;
  }

  hasFalling() {
    return this.isFalling;
  }

  tick() {
    if (this.board[this.height - 1].includes(this.fallingBlock)) {
      this.isFalling = false;
      this.fallingBlock = null;
      this.fallingBlockPosition = null;
      return;
    }
    const { row, column } = this.fallingBlockPosition;

    if (row + 1 < this.height && this.board[row + 1][column] === ".") {
      this.board[row][column] = ".";
      this.fallingBlockPosition.row += 1;
      this.board[this.fallingBlockPosition.row][column] = this.fallingBlock;
    } else {
      this.isFalling = false;
      this.fallingBlock = null;
      this.fallingBlockPosition = null;
    }
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
