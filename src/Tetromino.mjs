import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;
  numberOfOrientations;
  static T_SHAPE = new Tetromino(
    [
      [".", "T", "."],
      ["T", "T", "T"],
      [".", ".", "."],
    ],
    4
  );
  static I_SHAPE = new Tetromino(
    [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      ["I", "I", "I", "I", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ],
    2
  );
  constructor(shape, numberOfOrientations = 4) {
    this.shape = new RotatingShape(shape);
    this.numberOfOrientations = numberOfOrientations;
  }

  rotateRight() {
    return this.shape.rotateRight();
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }

  toString() {
    return this.shape.toString();
  }
}
