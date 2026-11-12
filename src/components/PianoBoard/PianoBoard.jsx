
import { useCallback, useEffect, useRef, useState } from "react";

import { PIANO_NOTES } from "../../data/pianoNotes.js";
import { createAudioEngine } from "../../audio/audioEngine.js";
import { AudioTaskQueue } from "../../audio/AudioTaskQueue.js";
import { PianoKey } from "../PianoKey/PianoKey.jsx";

import "./PianoBoard.css";

const WHITE_KEYS = PIANO_NOTES.filter((note) => !note.isBlack);
const BLACK_KEYS = PIANO_NOTES.filter((note) => note.isBlack);

export function PianoBoard() {
  const [pressedNotes, setPressedNotes] = useState(() => new Set());

  const audioQueueRef = useRef(null);

  useEffect(() => {
    const audioEngine = createAudioEngine();
    const audioQueue = new AudioTaskQueue(audioEngine, 8);

    audioQueueRef.current = audioQueue;

    return () => {
      audioQueue.dispose();
      audioEngine.dispose();
      audioQueueRef.current = null;
    };
  }, []);

  const handleNoteOn = useCallback((midi) => {
    audioQueueRef.current?.noteOn(midi);

    setPressedNotes((previousNotes) => {
      if (previousNotes.has(midi)) {
        return previousNotes;
      }

      const nextNotes = new Set(previousNotes);
      nextNotes.add(midi);

      return nextNotes;
    });
  }, []);

  const handleNoteOff = useCallback((midi) => {
    audioQueueRef.current?.noteOff(midi);

    setPressedNotes((previousNotes) => {
      if (!previousNotes.has(midi)) {
        return previousNotes;
      }

      const nextNotes = new Set(previousNotes);
      nextNotes.delete(midi);

      return nextNotes;
    });
  }, []);

  return (
    <section className="piano-board" aria-label="88-key piano">
      <ol className="piano-board__white-keys">
        {WHITE_KEYS.map((note) => (
          <li key={note.midi}>
            <PianoKey
              midi={note.midi}
              noteName={note.noteName}
              isBlack={false}
              isPressed={pressedNotes.has(note.midi)}
              onNoteOn={handleNoteOn}
              onNoteOff={handleNoteOff}
            />
          </li>
        ))}
      </ol>

      <ol className="piano-board__black-keys">
        {BLACK_KEYS.map((note) => (
          <li
            key={note.midi}
            style={{
              gridColumnStart: note.leftWhiteKeyIndex + 1,
            }}
          >
            <PianoKey
              midi={note.midi}
              noteName={note.noteName}
              isBlack
              isPressed={pressedNotes.has(note.midi)}
              onNoteOn={handleNoteOn}
              onNoteOff={handleNoteOff}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
