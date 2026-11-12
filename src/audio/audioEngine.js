
import { getFrequency } from "../data/pianoNotes.js";

const MAX_VOICE_GAIN = 0.12;
const RELEASE_DURATION = 0.03;

export function createAudioEngine() {
  let audioContext = null;
  let disposed = false;

  const activeVoices = new Set();

  function getAudioContext() {
    if (disposed) {
      throw new Error("Audio engine has been disposed.");
    }

    if (!audioContext) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        throw new Error("Web Audio API is not supported.");
      }

      audioContext = new AudioContextClass();
    }

    return audioContext;
  }

  function startNote(midi) {
    if (!Number.isInteger(midi) || midi < 21 || midi > 108) {
      throw new RangeError(`Invalid piano MIDI note: ${midi}`);
    }

    const context = getAudioContext();

    if (context.state === "suspended") {
      void context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      getFrequency(midi),
      context.currentTime,
    );

    gainNode.gain.setValueAtTime(
      MAX_VOICE_GAIN,
      context.currentTime,
    );

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    const voice = {
      midi,
      oscillator,
      gainNode,
      stopped: false,
    };

    activeVoices.add(voice);

    oscillator.addEventListener(
      "ended",
      () => {
        oscillator.disconnect();
        gainNode.disconnect();
        activeVoices.delete(voice);
      },
      { once: true },
    );

    oscillator.start();

    return voice;
  }

  function stopNote(voice) {
    if (!voice || voice.stopped || !activeVoices.has(voice)) {
      return;
    }

    voice.stopped = true;

    const context = audioContext;
    const now = context.currentTime;

    voice.gainNode.gain.cancelScheduledValues(now);
    voice.gainNode.gain.setValueAtTime(
      voice.gainNode.gain.value,
      now,
    );
    voice.gainNode.gain.linearRampToValueAtTime(
      0,
      now + RELEASE_DURATION,
    );

    voice.oscillator.stop(now + RELEASE_DURATION);
  }

  function dispose() {
    if (disposed) {
      return;
    }

    for (const voice of activeVoices) {
      stopNote(voice);
    }

    disposed = true;

    if (audioContext && audioContext.state !== "closed") {
      void audioContext.close();
    }

    audioContext = null;
  }

  return {
    startNote,
    stopNote,
    dispose,
  };
}
