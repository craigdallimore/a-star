// @flow
import random from "random";
import seedrandom from "seedrandom";
import type { State, Board } from "../types";
import makeBoard from "./makeBoard";

random.use(seedrandom("dent"));

const GRID = 10;

// Data -----------------------------------------------------------------------

const board: Board = makeBoard(GRID, GRID);

export const initialState: State = {
  board,
};
