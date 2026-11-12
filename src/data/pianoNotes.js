
const FIRST_MIDI_NOTE = 21;
const LAST_MIDI_NOTE = 108;

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const BLACK_KEY_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);

export function getNoteName(midi) {
  const pitchClass = midi % 12;
  const octave = Math.floor(midi / 12) - 1;

  return `${NOTE_NAMES[pitchClass]}${octave}`;
}

export function getFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function generatePianoNotes() {
  const notes = [];
  let whiteKeyIndex = 0;

  for (let midi = FIRST_MIDI_NOTE; midi <= LAST_MIDI_NOTE; midi += 1) {
    const pitchClass = midi % 12;
    const isBlack = BLACK_KEY_PITCH_CLASSES.has(pitchClass);

    notes.push({
      midi,
      noteName: getNoteName(midi),
      frequency: getFrequency(midi),
      isBlack,
      whiteKeyIndex: isBlack ? null : whiteKeyIndex,
    });

    if (!isBlack) {
      whiteKeyIndex += 1;
    }
  }

  return notes;
}

export const PIANO_NOTES = generatePianoNotes();
