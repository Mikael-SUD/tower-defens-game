/**
 * Web Audio API Retro Sound & Chiptune BGM Synthesizer
 * Menggunakan synthesizer audio tanpa perlu mendownload file eksternal (100% andal & responsif)
 */

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.5;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  /**
   * Inisialisasi AudioContext setelah interaksi user
   */
  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Memainkan nada oscillator murni
   */
  playTone(freq, type = 'square', duration = 0.1, gainVal = 0.15, freqEnd = null) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (freqEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(10, freqEnd),
          this.ctx.currentTime + duration
        );
      }

      gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // ================= SFX PRESETS =================
  playShoot(type = 'single') {
    if (type === 'aoe') {
      this.playTone(180, 'triangle', 0.25, 0.25, 50);
    } else if (type === 'laser') {
      this.playTone(880, 'sawtooth', 0.12, 0.18, 220);
    } else if (type === 'slow' || type === 'time_warp') {
      this.playTone(600, 'sine', 0.18, 0.2, 900);
    } else if (type === 'glitch') {
      this.playTone(400 + Math.random() * 600, 'sawtooth', 0.08, 0.2, 100);
    } else {
      // Arrow / Bullet
      this.playTone(440, 'square', 0.08, 0.15, 200);
    }
  }

  playHit() {
    this.playTone(220, 'triangle', 0.06, 0.12, 110);
  }

  playCrit() {
    this.playTone(550, 'square', 0.12, 0.25, 880);
  }

  playExplosion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Noise buffer for explosion
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}
  }

  playEnemyDeath() {
    this.playTone(320, 'sine', 0.09, 0.1, 120);
  }

  playCoin() {
    this.playTone(987.77, 'square', 0.08, 0.15); // B5
    setTimeout(() => this.playTone(1318.51, 'square', 0.12, 0.15), 60); // E6
  }

  playUpgrade() {
    this.playTone(523.25, 'triangle', 0.1, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.2), 80); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.15, 0.2), 160); // G5
  }

  playBossAlert() {
    this.playTone(110, 'sawtooth', 0.6, 0.35, 70);
    setTimeout(() => this.playTone(90, 'sawtooth', 0.8, 0.4, 55), 400);
  }

  playGachaSpin() {
    this.playTone(500 + Math.random() * 400, 'square', 0.05, 0.1);
  }

  playGachaReveal(rarity) {
    if (rarity === 'secret' || rarity === 'mythic') {
      // Epic Fanfare
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      notes.forEach((note, idx) => {
        setTimeout(() => this.playTone(note, 'sawtooth', 0.35, 0.3), idx * 120);
      });
    } else if (rarity === 'legendary') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((note, idx) => {
        setTimeout(() => this.playTone(note, 'triangle', 0.25, 0.25), idx * 110);
      });
    } else if (rarity === 'epic') {
      const notes = [392, 493.88, 587.33];
      notes.forEach((note, idx) => {
        setTimeout(() => this.playTone(note, 'triangle', 0.2, 0.2), idx * 100);
      });
    } else {
      this.playTone(440, 'sine', 0.15, 0.18, 660);
    }
  }

  playVictory() {
    const notes = [523, 659, 783, 1046];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, 'square', 0.25, 0.2), i * 150);
    });
  }

  playDefeat() {
    const notes = [400, 360, 320, 280];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, 'sawtooth', 0.3, 0.25), i * 180);
    });
  }

  // ================= PROCEDURAL BGM =================
  startBGM() {
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.initContext();

    const melody = [
      261.63, 329.63, 392.0, 523.25,
      392.0, 329.63, 261.63, 220.0,
      293.66, 349.23, 440.0, 587.33,
      440.0, 349.23, 293.66, 246.94
    ];
    let step = 0;

    const loop = () => {
      if (!this.bgmPlaying) return;
      if (!this.isMuted) {
        const freq = melody[step % melody.length];
        this.playTone(freq, 'sine', 0.22, 0.05);

        // Sub bass note every 4 steps
        if (step % 4 === 0) {
          this.playTone(freq / 2, 'triangle', 0.45, 0.07);
        }
      }
      step++;
      this.bgmTimer = setTimeout(loop, 240);
    };

    loop();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
