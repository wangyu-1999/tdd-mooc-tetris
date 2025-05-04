export class Scoring {
  constructor() {
    this.score = 0;
  }

  calculateScore(linesCleared) {
    const points = {
      0: 0,
      1: 40,
      2: 100,
      3: 300,
      4: 1200,
    };
    if (linesCleared in points) {
      this.score += points[linesCleared];
    } else {
      throw new Error(`Invalid number of lines cleared: ${linesCleared}`);
    }
  }

  update(event) {
    if (event.type === "linesCleared") {
      this.calculateScore(event.linesCleared);
    }
  }

  getScore() {
    return this.score;
  }
}
