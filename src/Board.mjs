export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
  }

  drop(block) {
    const middle = Math.floor(this.width / 2);
    this.board[0][middle] = block;
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
