import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;
  static T_SHAPE = new Tetromino([
    [".", "T", "."],
    ["T", "T", "T"],
    [".", ".", "."],
  ]);
  constructor(shape) {
    this.shape = new RotatingShape(shape);
  }

  rotateRight() {
    this.shape = this.shape.rotateRight();
    return this;
  }

  rotateLeft() {
    this.shape = this.shape.rotateLeft();
    return this;
  }

  toString() {
    return this.shape.toString();
  }
}
