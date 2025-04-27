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
        
          return new Tetromino(this.shape.rotateRight().shape, this.numberOfOrientations, true);
        }
      default:
        return new Tetromino(this.shape.rotateRight().shape, this.numberOfOrientations, this.isRotated);
    }
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft().shape, this.numberOfOrientations, this.isRotated);
  }

  toString() {
    return this.shape.toString();
  }
}
