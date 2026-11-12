
# AI Audit — HW2: 88-Key Polyphonic Piano

## 1. Project Overview

This project implements an 88-key polyphonic piano using React 19, Vite, and the Web Audio API.

The implementation combines:
- Algorithmic MIDI note generation.
- React.memo with a custom shallowEqual comparator.
- Isolated piano-key rendering.
- Web Audio oscillator-based sound generation.
- An eight-voice concurrent FIFO audio queue.

## 2. AI Assistance

AI assistance was used for:
- Breaking down the assignment into an implementation plan.
- Explaining MIDI note numbering and frequency calculation.
- Designing the piano-key data model and component structure.
- Implementing and reviewing shallowEqual memoization.
- Designing the audio engine and FIFO voice queue.
- Preparing test cases and reviewing accessibility and cleanup behavior.
- Reviewing project structure and documentation.

AI-generated code was reviewed, integrated, and tested during development.

## 3. Technical Decisions

### 3.1. Algorithmic Piano Generation

The piano is generated using MIDI values 21 through 108 inclusive.

Frequency calculation:

`frequency = 440 * 2 ** ((midi - 69) / 12)`

The generated piano contains:
- 88 total keys.
- 52 white keys.
- 36 black keys.

No individual key elements are hardcoded.

### 3.2. Render Isolation

Each piano key is wrapped with React.memo and uses a custom shallowEqual comparator.

The PianoBoard maintains pressed-note state using immutable Set updates.

The note-on and note-off callbacks are stabilized with useCallback so unchanged keys can skip unnecessary renders.

### 3.3. Audio Engine

The audio engine uses the Web Audio API:
- OscillatorNode generates each note.
- GainNode controls the note volume and release.
- AudioContext manages audio processing.
- Voices are stopped and disconnected when released.

### 3.4. FIFO Voice Management

AudioTaskQueue limits concurrent voices to eight.

When a ninth distinct note is started:
1. The oldest voice is removed from the queue.
2. The oldest voice is stopped immediately.
3. The new voice is started and appended to the queue.

Released notes are removed from the active queue.

## 4. Testing and Verification

The following checks were performed:

| Test | Expected result |
|---|---|
| Piano generation | 88 keys |
| White-key count | 52 |
| Black-key count | 36 |
| First MIDI note | 21 (A0) |
| Last MIDI note | 108 (C8) |
| A4 frequency | 440 Hz |
| shallowEqual tests | Pass |
| AudioTaskQueue tests | Pass |
| Eight-voice limit | Pass |
| Ninth-note FIFO stealing | Pass |
| Duplicate-note handling | Pass |
| Audio queue disposal | Pass |
| Production build | Pass |
| Lint | Pass |
| React Profiler verification | One affected PianoKey re-renders when a single key is pressed |

Manual interaction checks included pressing and releasing individual notes, playing chords, and testing rapid note interactions.

## 5. Accessibility and Code Quality

- Piano keys use native button elements.
- Each key has an accessible aria-label.
- Pressed state is exposed through aria-pressed.
- Keyboard focus has a visible style.
- Semantic HTML is used for the application structure.
- State updates are immutable.
- Audio resources are cleaned up when the piano component is unmounted.
- No window.alert or legacy React class components are used.

## 6. Known Limitations

- The current sound generator uses a sine waveform rather than sampled acoustic piano recordings.
- The application requires a browser with Web Audio API support.
- Voice stealing stops the oldest audio voice while the corresponding physical key can remain visually pressed until the user releases it.
- The application is a learning implementation and does not yet include MIDI hardware input or sustain-pedal support.

## 7. Final Review

The implementation was reviewed against the assignment requirements:
- Algorithmic 88-key generation.
- MIDI-based frequency calculation.
- Eight-voice polyphony.
- FIFO voice stealing.
- React.memo render isolation.
- Audio resource cleanup.
- Automated tests and production build.
- Required project documentation.

All listed checks were reported as passing during development.
