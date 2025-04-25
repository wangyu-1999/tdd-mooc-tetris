export class Board {
  width;
  height;
  isFalling;
  fallingBlock;

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
    this.board[0][middle] = block;
  }

  hasFalling() {
    return this.isFalling;
  }

  tick() {
    if (this.board[this.height - 1].includes(this.fallingBlock)) {
      this.isFalling = false;
      this.fallingBlock = null;
      return;
    }
    const board = [...this.board];
    for (let i = this.height - 1; i >= 0; i--) {
      for (let j = 0; j < this.width; j++) {
        if (board[i][j] === this.fallingBlock) {
          board[i][j] = ".";
          board[i + 1][j] = this.fallingBlock;
        }
      }
    }
    this.board = board;
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
