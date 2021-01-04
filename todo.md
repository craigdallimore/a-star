## TODO

https://www.geeksforgeeks.org/a-search-algorithm/
http://theory.stanford.edu/~amitp/GameProgramming/MovingObstacles.html#recalculating-paths

- [x] get babel-jest working
- [x] get flow happy
- [x] test grid rendering
- [ ] test cursor position
- [ ] test path rendering

- [ ] Mission 1: Get A\* pathing happening on a static colourless board.
- [ ] Mission 2: Show costs at each cell (make this a view option)
- [ ] Mission 3: Have the board animate a unit moving from the start to the goal

Good:

- looping over an array of points, rendering each one

Bad:

- doing an `.includes()` check to see if a point is on the path
- doing a rockIndexes[pointIndex] check to see if a rock is at the point
  (might be nicer to do `hasRock(point)`/`isRock(point)` or something
- doing a `cursorAtPoint` check

- [ ] Add helper - `distanceBetween(point, point);`

- [ ] find a path from top left to bottom right using a\*
- [ ] measure performance

---

https://www.npmjs.com/package/sharp
