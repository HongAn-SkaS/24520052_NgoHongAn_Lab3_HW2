
import assert from "node:assert/strict";

import { AudioTaskQueue } from "./AudioTaskQueue.js";

let nextVoiceId = 1;
const stoppedVoices = [];

const mockAudioEngine = {
  startNote(midi) {
    return {
      id: nextVoiceId++,
      midi,
    };
  },

  stopNote(voice, options = {}) {
    stoppedVoices.push({
      voice,
      options,
    });
  },
};

const queue = new AudioTaskQueue(mockAudioEngine, 8);

// Test 1: Add 8 voices.
for (let midi = 21; midi <= 28; midi += 1) {
  queue.noteOn(midi);
}

assert.equal(queue.activeVoiceCount, 8);
assert.deepEqual(
  queue.getActiveMidis(),
  [21, 22, 23, 24, 25, 26, 27, 28],
);

console.log("PASS: Maximum 8 voices");

// Test 2: Ninth voice steals the oldest.
queue.noteOn(29);

assert.equal(queue.activeVoiceCount, 8);
assert.deepEqual(
  queue.getActiveMidis(),
  [22, 23, 24, 25, 26, 27, 28, 29],
);

assert.equal(stoppedVoices[0].voice.midi, 21);
assert.equal(stoppedVoices[0].options.immediate, true);

console.log("PASS: Ninth voice steals oldest voice");

// Test 3: Release a specific voice.
queue.noteOff(25);

assert.equal(queue.activeVoiceCount, 7);
assert.deepEqual(
  queue.getActiveMidis(),
  [22, 23, 24, 26, 27, 28, 29],
);

assert.equal(stoppedVoices.at(-1).voice.midi, 25);
assert.equal(stoppedVoices.at(-1).options.immediate, undefined);

console.log("PASS: Correct voice released");

// Test 4: Duplicate note does not create another voice.
const previousCount = nextVoiceId;

queue.noteOn(22);

assert.equal(nextVoiceId, previousCount);
assert.equal(queue.activeVoiceCount, 7);

console.log("PASS: Duplicate note prevented");

// Test 5: Release unknown note.
queue.noteOff(100);

assert.equal(queue.activeVoiceCount, 7);

console.log("PASS: Unknown note ignored");

// Test 6: Dispose all voices.
queue.dispose();

assert.equal(queue.activeVoiceCount, 0);
assert.equal(queue.disposed, true);

console.log("PASS: Queue disposal");

// Test 7: Reject new notes after disposal.
assert.throws(
  () => queue.noteOn(60),
  /disposed/,
);

console.log("PASS: Disposed queue rejects new notes");

console.log("All AudioTaskQueue tests passed.");
