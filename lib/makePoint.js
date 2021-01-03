// @flow

import type { Point } from "../types";

export default (x: number, y: number): Point => Object.freeze({ x, y });
