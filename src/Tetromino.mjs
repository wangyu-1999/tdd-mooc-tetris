import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  rotatingShapeObj;
  numberOfOrientations;
  isRotated;

  get shape() {
    return this.rotatingShapeObj.shape;
  }

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
  static O_SHAPE = new Tetromino(
    [
      [".", "O", "O"],
      [".", "O", "O"],
      [".", ".", "."],
    ],
    1
  );
  constructor(shape, numberOfOrientations = 4, isRotated = false) {
    this.rotatingShapeObj = new RotatingShape(shape);
    this.numberOfOrientations = numberOfOrientations;
    this.isRotated = isRotated;
  }

  rotateRight() {
    switch (this.numberOfOrientations) {
      case 1:
        return this;
      case 2:
        if (!this.isRotated) {
          return new Tetromino(this.rotatingShapeObj.rotateRight().shape, this.numberOfOrientations, true);
        } else {
          return new Tetromino(this.rotatingShapeObj.rotateLeft().shape, this.numberOfOrientations, false);
        }
      default:
        return new Tetromino(this.rotatingShapeObj.rotateRight().shape, this.numberOfOrientations, true);
    }
  }

  rotateLeft() {
    switch (this.numberOfOrientations) {
      case 1:
        return this;
      case 2:
        if (!this.isRotated) {
          return new Tetromino(this.rotatingShapeObj.rotateRight().shape, this.numberOfOrientations, true);
        } else {
          return new Tetromino(this.rotatingShapeObj.rotateLeft().shape, this.numberOfOrientations, false);
        }
      default:
        return new Tetromino(this.rotatingShapeObj.rotateLeft().shape, this.numberOfOrientations, true);
    }
  }
  toString() {
    return this.rotatingShapeObj.toString();
  }
}
