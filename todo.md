- [ ] get babel-jest working
- [ ] test grid rendering
- [ ] test cursor position
- [ ] test path rendering

- [ ] change state structure

Good:

- looping over an array of points, rendering each one

Bad:

- doing an `.includes()` check to see if a point is on the path
- doing a rockIndexes[pointIndex] check to see if a rock is at the point
  (might be nicer to do `hasRock(point)`/`isRock(point)` or something
- doing a cursorAtPoint check

- [ ] Add helper - `distanceBetween(point, point);`

- [ ] find a path from top left to bottom right using a\*
- [ ] measure performance

---

https://www.npmjs.com/package/sharp
