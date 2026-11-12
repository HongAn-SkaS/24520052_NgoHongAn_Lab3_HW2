
import assert from "node:assert/strict";

import { shallowEqual } from "./shallowEqual.js";

assert.equal(
  shallowEqual({ midi: 60, isPressed: false }, {
    midi: 60,
    isPressed: false,
  }),
  true,
  "Equal primitive props should return true",
);

assert.equal(
  shallowEqual({ midi: 60 }, { midi: 61 }),
  false,
  "Different props should return false",
);

assert.equal(
  shallowEqual({ isPressed: false }, { isPressed: true }),
  false,
  "Changed pressed state should return false",
);

assert.equal(
  shallowEqual({ callback: () => {} }, { callback: () => {} }),
  false,
  "Different function references should return false",
);

assert.equal(
  shallowEqual(null, {}),
  false,
  "Null and object should return false",
);

console.log("All shallowEqual tests passed.");
