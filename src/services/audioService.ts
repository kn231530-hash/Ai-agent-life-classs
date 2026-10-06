// Web Audio & Speech synthesis service for Synthetix Voice & Academy

class AudioService {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private isListening = false;
  private recognition: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Futuristic synth chime sounds using pure Web Audio oscillator nodes
  playTone(type: 'activate' | 'deactivate' | 'success' | 'ping' | 'metric') {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'activate') {
        // Cyan rising neural chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'deactivate') {
        // Soft descending tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.18);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'success') {
        // Dual harmonic chord
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc2.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc2.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35); // C6
        osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.35); // E6

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        gain2.gain.setValueAtTime(0.06, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.start(now);
        osc2.start(now);
        osc.stop(now + 0.4);
        osc2.stop(now + 0.4);
      } else if (type === 'metric') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch {
      // Audio not supported or blocked
    }
  }

  // Real microphone stream connection
  async startMicrophone(): Promise<boolean> {
    this.initContext();
    if (!this.ctx || !this.analyser) return false;

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.micSource = this.ctx.createMediaStreamSource(this.micStream);
        this.micSource.connect(this.analyser);
        this.isListening = true;
        this.playTone('activate');
        return true;
      }
    } catch {
      // Fallback to simulated audio mode
      this.isListening = true;
      this.playTone('activate');
      return true;
    }
    return false;
  }

  stopMicrophone() {
    this.playTone('deactivate');
    this.isListening = false;
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
    if (this.micSource) {
      try {
        this.micSource.disconnect();
      } catch {}
      this.micSource = null;
    }
  }

  getFrequencyData(): Uint8Array {
    if (this.analyser && this.isListening && this.micSource) {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      return dataArray;
    }
    // Return empty array if not active
    return new Uint8Array(32);
  }

  // Speak mentor responses with Web Speech API
  speak(text: string, voiceParams: { pitch?: number; rate?: number; onStart?: () => void; onEnd?: () => void }) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (voiceParams.onStart) voiceParams.onStart();
      setTimeout(() => {
        if (voiceParams.onEnd) voiceParams.onEnd();
      }, 2500);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = voiceParams.pitch || 1.0;
      utterance.rate = voiceParams.rate || 1.0;

      // Select matching natural voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      if (voiceParams.onStart) {
        utterance.onstart = voiceParams.onStart;
      }
      if (voiceParams.onEnd) {
        utterance.onend = voiceParams.onEnd;
        utterance.onerror = voiceParams.onEnd;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      if (voiceParams.onStart) voiceParams.onStart();
      setTimeout(() => {
        if (voiceParams.onEnd) voiceParams.onEnd();
      }, 2500);
    }
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Start speech recognition
  startSpeechRecognition(
    onResult: (text: string, isFinal: boolean) => void,
    onError?: (err: any) => void
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return null;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          onResult(finalTranscript.trim(), true);
        } else if (interimTranscript.trim()) {
          onResult(interimTranscript.trim(), false);
        }
      };

      this.recognition.onerror = (err: any) => {
        if (onError) onError(err);
      };

      this.recognition.start();
      return this.recognition;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  }

  stopSpeechRecognition() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
      this.recognition = null;
    }
  }
}

export const audioService = new AudioService();
