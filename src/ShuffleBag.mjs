export class ShuffleBag {
  constructor(elements) {
    this.elements = elements;
    this.bag = [];
    this.shuffle();
  }

  shuffle() {
    const arr = [...this.elements, ...this.elements, ...this.elements];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.bag = arr;
  }

  next() {
    if (this.bag.length === 0) {
      this.shuffle();
    }
    return this.bag.pop();
  }
}
