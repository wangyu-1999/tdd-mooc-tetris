export class Tetromino {
  type;
  currentRotation;
  shapes;

  constructor(type, currentRotation = 0) {
    this.type = type;
    if (!Tetromino.SHAPES[type]) {
      this.shapes = [[[0, 0]]];
    } else {
      this.shapes = Tetromino.SHAPES[type];
    }
    this.currentRotation = currentRotation;
  }

  get blocks() {
    return this.shapes[this.currentRotation];
  }

  get width() {
    return Math.max(...this.blocks.map(([x]) => x)) + 1;
  }

  rotateRight() {
    const newRotation = (this.currentRotation + 1) % this.shapes.length;
    return new Tetromino(this.type, newRotation);
  }

  rotateLeft() {
    const newRotation = (this.currentRotation - 1 + this.shapes.length) % this.shapes.length;
    return new Tetromino(this.type, newRotation);
  }

  toString() {
    let minX = Infinity,
      minY = Infinity;
    let maxX = -Infinity,
      maxY = -Infinity;

    this.blocks.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    const grid = Array(height)
      .fill()
      .map(() => Array(width).fill("."));

    this.blocks.forEach(([x, y]) => {
      grid[y - minY][x - minX] = this.type;
    });

    return grid.map((row) => row.join("")).join("\n") + "\n";
  }

  static SHAPES = {
    T: [
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
    I: [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
    ],
    O: [
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
    ],
    L: [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [0, 2],
      ],
    ],
    J: [
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
      ],
    ],
    S: [
      [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
    Z: [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
      ],
    ],
  };

  static T_SHAPE = new Tetromino("T");
  static I_SHAPE = new Tetromino("I");
  static O_SHAPE = new Tetromino("O");
  static L_SHAPE = new Tetromino("L");
  static J_SHAPE = new Tetromino("J");
  static S_SHAPE = new Tetromino("S");
  static Z_SHAPE = new Tetromino("Z");
}
