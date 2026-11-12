
import {
  PIANO_NOTES,
  getFrequency,
} from "./pianoNotes.js";

const whiteKeys = PIANO_NOTES.filter((note) => !note.isBlack);
const blackKeys = PIANO_NOTES.filter((note) => note.isBlack);

const checks = [
  ["Total keys", PIANO_NOTES.length === 88],
  ["White keys", whiteKeys.length === 52],
  ["Black keys", blackKeys.length === 36],
  ["First MIDI", PIANO_NOTES[0].midi === 21],
  ["Last MIDI", PIANO_NOTES.at(-1).midi === 108],
  ["First note", PIANO_NOTES[0].noteName === "A0"],
  ["Last note", PIANO_NOTES.at(-1).noteName === "C8"],
  ["A4 frequency", Math.abs(getFrequency(69) - 440) < 0.001],
];

let failed = false;

for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}: ${name}`);

  if (!passed) {
    failed = true;
  }
}

if (failed) {
  throw new Error("Piano generation verification failed.");
}

console.log("All piano generation checks passed.");
