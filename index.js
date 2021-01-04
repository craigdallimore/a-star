// @flow
import type { State } from "./types";
import { initialState } from "./lib/state";
import { print } from "./lib/print";

// Application ----------------------------------------------------------------

function loop(state: State): void {
  print(state.board);
  setTimeout(() => {
    const nextState = { ...state };
    loop(nextState);
  }, 100);
}

loop(initialState);

// KAIZEN ---------------------------------------------------------------------
