import ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import type { Point, Board } from "./types";
import { getGridChar } from "./show";

function getChar(point: Point, board: Board) {
  switch (point.tile) {
    case "CURSOR":
      return chalk.green("☺");
    case "START":
      return chalk.yellow("S");
    case "GOAL":
      return chalk.yellow("G");
    case "OBSTACLE":
      return chalk.blue("●");
    default:
      return getGridChar(point, board);
  }
}

export function print(board: Board): void {
  process.stdout.write(ansiEscapes.eraseScreen);
  board.forEach((row, index) => {
    const rowChars = row.map((point) => getChar(point, board)).join("");
    process.stdout.write(ansiEscapes.cursorTo(0, index) + rowChars);
  });
  process.stdout.write(ansiEscapes.cursorTo(0, board.length + 1));
}
