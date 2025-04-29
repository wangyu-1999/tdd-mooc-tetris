export class PointSet {
  constructor() {
    this.points = new Set();
  }

  add(x, y) {
    this.points.add(`${x},${y}`);
  }

  has(x, y) {
    return this.points.has(`${x},${y}`);
  }

  delete(x, y) {
    this.points.delete(`${x},${y}`);
  }
}
