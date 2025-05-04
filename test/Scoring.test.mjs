import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Scoring } from "../src/Scoring.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Scoring", () => {
  let scoring;
  let board;
  beforeEach(() => {
    scoring = new Scoring();
    board = new Board(10, 6);
    board.addObserver(scoring);
  });

  test("initial score is zero", () => {
    expect(scoring.getScore()).to.equal(0);
  });

  test("score increases when lines are cleared", () => {
    board.clearLines([5]);
    expect(scoring.getScore()).to.equal(40);
    board.clearLines([4, 5]);
    expect(scoring.getScore()).to.equal(140);
    board.clearLines([3, 4, 5]);
    expect(scoring.getScore()).to.equal(440);
    board.clearLines([2, 3, 4, 5]);
    expect(scoring.getScore()).to.equal(1640);
  });

  test("clean multiple lines", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        OO........
        OO........`
    );
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        OOOO......
        OOOO......`
    );
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        OOOOOO....
        OOOOOO....`
    );
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        OOOOOOOO..
        OOOOOOOO..`
    );
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        ..........
        ..........`
    );
    expect(scoring.getScore()).to.equal(100);
  });
});
