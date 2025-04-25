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
    this.board = [new Array(this.width).fill("."), ...this.board.slice(0, this.height - 1)];
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
