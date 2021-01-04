// @flow
import type { State } from "./types";
import { initialState } from "./lib/state";

// Application ----------------------------------------------------------------

function loop(state: State): void {
  setTimeout(() => {
    const nextState = { ...state };
    loop(nextState);
  }, 100);
}

loop(initialState);

// KAIZEN ---------------------------------------------------------------------
