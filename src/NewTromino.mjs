export class NewTromino {
  type;
  currentRotation;

  constructor(type, currentRotation = 0) {
    this.type = type;
    this.currentRotation = currentRotation;
  }

  get blocks() {
    return NewTromino.SHAPES[this.type][this.currentRotation];
  }

  rotateRight() {
    const shapes = NewTromino.SHAPES[this.type];
    const newRotation = (this.currentRotation + 1) % shapes.length;
    return new NewTromino(this.type, newRotation);
  }

  rotateLeft() {
    const shapes = NewTromino.SHAPES[this.type];
    const newRotation = (this.currentRotation - 1 + shapes.length) % shapes.length;
    return new NewTromino(this.type, newRotation);
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

  static T_SHAPE = new NewTromino("T");
  static I_SHAPE = new NewTromino("I");
  static O_SHAPE = new NewTromino("O");
  static L_SHAPE = new NewTromino("L");
  static J_SHAPE = new NewTromino("J");
  static S_SHAPE = new NewTromino("S");
  static Z_SHAPE = new NewTromino("Z");
}
