// @flow

// - [ ] Improve grid presentation
// - [ ] find a path from top left to bottom right using a*
// - [ ] measure performance

// ----------------------------------------------------------------------------
// https://www.npmjs.com/package/sharp

import R from "ramda";
import { initialState, type State } from "./state";
import { show } from "./show";

// Application ----------------------------------------------------------------

function loop(state: State): void {
  show(state);

  const nextIndex =
    R.inc(state.index) >= state.points.length ? 0 : R.inc(state.index);

  setTimeout(() => {
    loop({
      ...state,
      index: nextIndex,
    });
  }, 100);
}

loop(initialState);

// KAIZEN ---------------------------------------------------------------------
