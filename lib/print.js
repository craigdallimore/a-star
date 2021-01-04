// @flow

import * as ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import type { Point, Board } from "../types";
import { getGridChar } from "./show";

function getChar(point: Point, board: Board) {
  switch (point.tile) {
    case "CURSOR":
      return chalk.green("☺");
    case "START":
      return chalk.yellow("S");
    case "GOAL":
      return chalk.yellow("S");
    case "OBSTACLE":
      return chalk.blue("●");
    default:
      return getGridChar(point, board);
  }
}

export function print(board: Board): void {
  process.stdout.write(ansiEscapes.eraseScreen);
  board.forEach(row => {
    row.forEach(point => {
      process.stdout.write(ansiEscapes.cursorTo(point.x, point.y));
      const char = getChar(point, board);
      process.stdout.write(char);
    });
  });
}
