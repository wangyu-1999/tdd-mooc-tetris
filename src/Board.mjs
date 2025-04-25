export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill(new Array(width).fill("."));
  }

  toString() {
    return this.board.map((r) => r.join("")).join("\n") + "\n";
  }
}
