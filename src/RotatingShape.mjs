export class RotatingShape {
  shape;
  constructor(shape) {
    this.shape = shape;
  }
  rotate() {
    const size = this.shape.length;
    const rotatedShape = Array.from({ length: size }, () => Array(size).fill(null));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        rotatedShape[j][size - 1 - i] = this.shape[i][j];
      }
    }

    return new RotatingShape(rotatedShape);
  }
}
