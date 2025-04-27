import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;
  numberOfOrientations;
  isRotated;
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
  constructor(shape, numberOfOrientations = 4, isRotated = false) {
    this.shape = new RotatingShape(shape);
    this.numberOfOrientations = numberOfOrientations;
    this.isRotated = isRotated;
  }

  rotateRight() {
    switch (this.numberOfOrientations) {
      case 2:
        if (!this.isRotated) {
          this.isRotated = true;
          return this.shape.rotateRight();
        }
      default:
        return this.shape.rotateRight();
    }
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }

  toString() {
    return this.shape.toString();
  }
}
