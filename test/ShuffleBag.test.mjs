import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {
  let bag;

  beforeEach(() => {
    bag = new ShuffleBag([
      Tetromino.T_SHAPE,
      Tetromino.J_SHAPE,
      Tetromino.L_SHAPE,
      Tetromino.O_SHAPE,
      Tetromino.S_SHAPE,
      Tetromino.Z_SHAPE,
      Tetromino.I_SHAPE,
    ]);
  });

  test("number of different tetrominoes should be equal", () => {
    const counts = {};
    const expectedCount = 3;
    for (let i = 0; i < 21; i++) {
      const tetromino = bag.next();
      counts[tetromino.type] = (counts[tetromino.type] || 0) + 1;
    }
    for (const type in counts) {
      expect(counts[type]).to.equal(expectedCount);
    }
  });
});
