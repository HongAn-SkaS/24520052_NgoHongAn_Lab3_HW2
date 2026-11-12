# TASK DECOMPOSITION – HW 2: 88-Key Polyphonic Piano

## 1. Project Objective

Build an 88-key polyphonic piano using React 19, Vite, and ES2024. Integrate algorithmic piano generation, React.memo render isolation, shallow equality, Web Audio API, and an 8-voice concurrent FIFO audio queue.

## 2. Work Breakdown Structure (WBS)

| ID | Task | Key Requirements | Deliverable |
|---|---|---|---|
| 1 | Project Setup | React 19, Vite, ES2024, project rules | Working Vite project |
| 2 | Piano Data Generation | Generate MIDI 21–108 (A0–C8), 52 white keys, 36 black keys | pianoNotes.js |
| 3 | Frequency Engine | Calculate frequency using the equal-tempered MIDI formula | frequencyUtils.js |
| 4 | Piano Key Component | Implement accessible white and black keys | PianoKey.jsx |
| 5 | Memoization | React.memo with shallowEqual comparison | Memoized PianoKey |
| 6 | Render Isolation | Stable callbacks and isolated pressed states | PianoBoard.jsx |
| 7 | Audio Engine | Initialize AudioContext and create oscillators | audioEngine.js |
| 8 | FIFO Voice Queue | Manage a maximum of 8 concurrent voices | AudioTaskQueue.js |
| 9 | Voice Stealing | Stop the oldest voice when the ninth note starts | FIFO voice management |
| 10 | Interaction Handling | Pointer down/up, pointer cancellation, keyboard-independent interaction | Functional piano |
| 11 | Integration & Testing | Test chords, 9th-note stealing, all 88 keys, and render isolation | Verified application |
| 12 | Documentation & Audit | Complete AI_AUDIT.md and verify project requirements | Final documentation |

## 3. Technical Constraints

- React 19 + Vite + ES2024 only.
- Generate all 88 keys algorithmically. Do not hardcode individual key elements.
- MIDI range: 21–108 inclusive.
- White keys: 52. Black keys: 36.
- Frequency formula: `440 * 2 ** ((midi - 69) / 12)`.
- Maximum polyphony: 8 simultaneous voices.
- Voice stealing must follow FIFO order.
- Use React.memo and shallowEqual to prevent unnecessary key re-renders.
- Keep callbacks and props stable between renders.
- Follow all project `.cursorrules` and accessibility requirements.
- Clean up AudioContext, oscillators, listeners, and other external resources appropriately.

## 4. Verification Checklist

- [ ] Exactly 88 generated keys.
- [ ] Exactly 52 white keys and 36 black keys.
- [ ] Correct MIDI range: 21–108.
- [ ] Correct frequency calculations.
- [ ] Up to 8 simultaneous notes work.
- [ ] The ninth note steals the oldest active voice.
- [ ] Releasing a note stops the correct oscillator.
- [ ] Pressing one key does not re-render unrelated keys.
- [ ] Verify render behavior using React DevTools Profiler.
- [ ] No prohibited legacy APIs or div-soup.
- [ ] No resource leaks.
- [ ] Build and lint pass.
- [ ] AI_AUDIT.md completed.

## 5. Commit Strategy

Use small, meaningful commits throughout development. Target at least 12 commits:

1. `docs(hw2): add task decomposition and WBS`
2. `chore(hw2): initialize React 19 and Vite project`
3. `feat(hw2): generate 88 piano keys algorithmically`
4. `feat(hw2): implement MIDI frequency utilities`
5. `feat(hw2): create accessible PianoKey component`
6. `feat(hw2): add shallowEqual memoization`
7. `feat(hw2): implement isolated piano board state`
8. `feat(hw2): initialize Web Audio engine`
9. `feat(hw2): implement concurrent FIFO audio queue`
10. `feat(hw2): add eight-voice FIFO stealing`
11. `feat(hw2): integrate piano interactions and audio`
12. `test(hw2): verify piano generation and polyphony`
13. `docs(hw2): complete AI audit and final verification`

## 6. Definition of Done

The assignment is complete when all functional requirements, render isolation requirements, accessibility constraints, and verification checks pass, with both required documentation files committed and at least 11 commits in the repository.