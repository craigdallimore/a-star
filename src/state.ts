import random, { RNG } from "random";
import seedrandom from "seedrandom";
import type { State, Board } from "./types";
import makeBoard from "./makeBoard";

const prng = seedrandom("dent");

random.use(rng);

const GRID = 10;

// Data -----------------------------------------------------------------------

const board: Board = makeBoard(GRID, GRID);

export const initialState: State = {
  board,
};
