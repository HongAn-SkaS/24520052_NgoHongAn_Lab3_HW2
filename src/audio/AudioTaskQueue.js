
const DEFAULT_MAX_VOICES = 8;

export class AudioTaskQueue {
  constructor(audioEngine, maxVoices = DEFAULT_MAX_VOICES) {
    if (!audioEngine) {
      throw new Error("Audio engine is required.");
    }

    if (!Number.isInteger(maxVoices) || maxVoices < 1) {
      throw new RangeError("maxVoices must be a positive integer.");
    }

    this.audioEngine = audioEngine;
    this.maxVoices = maxVoices;
    this.voices = [];
    this.disposed = false;
  }

  noteOn(midi) {
    if (this.disposed) {
      throw new Error("Audio task queue has been disposed.");
    }

    if (!Number.isInteger(midi) || midi < 21 || midi > 108) {
      throw new RangeError(`Invalid MIDI note: ${midi}`);
    }

    // Prevent duplicate activation of an already-held key.
    const existingVoice = this.voices.find(
      (entry) => entry.midi === midi,
    );

    if (existingVoice) {
      return existingVoice.voice;
    }

    // Steal the oldest voice before starting a new oscillator.
    if (this.voices.length >= this.maxVoices) {
      const oldestVoice = this.voices.shift();

      this.audioEngine.stopNote(oldestVoice.voice, {
        immediate: true,
      });
    }

    const voice = this.audioEngine.startNote(midi);

    this.voices.push({
      midi,
      voice,
    });

    return voice;
  }

  noteOff(midi) {
    if (this.disposed) {
      return;
    }

    const voiceIndex = this.voices.findIndex(
      (entry) => entry.midi === midi,
    );

    if (voiceIndex === -1) {
      return;
    }

    const [entry] = this.voices.splice(voiceIndex, 1);

    this.audioEngine.stopNote(entry.voice);
  }

  get activeVoiceCount() {
    return this.voices.length;
  }

  getActiveMidis() {
    return this.voices.map((entry) => entry.midi);
  }

  dispose() {
    if (this.disposed) {
      return;
    }

    for (const entry of this.voices) {
      this.audioEngine.stopNote(entry.voice, {
        immediate: true,
      });
    }

    this.voices = [];
    this.disposed = true;
  }
}
