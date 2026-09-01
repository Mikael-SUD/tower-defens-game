/**
 * Wave Manager: Mengatur siklus 15 wave per Act, timing spawn, kemunculan Boss, dan evaluasi kemenangan
 */

import { generateWavesForAct } from '../config/chapters.js';
import { ENEMY_TYPES, getBossData } from '../config/enemies.js';
import { Enemy } from './combat.js';
import { soundEngine } from '../engine/audio.js';

export class WaveManager {
  constructor(game, chapterId, actIndex) {
    this.game = game;
    this.chapterId = chapterId;
    this.actIndex = actIndex;

    this.waves = generateWavesForAct(chapterId, actIndex);
    this.currentWaveIndex = 0; // 0 to 14 (representing Waves 1 to 15)
    this.isWaveInProgress = false;
    this.spawnQueue = [];
    this.waveTimer = 0;
    this.autoStart = false;
    this.timeBetweenWaves = 4.0;
    this.intermissionTimer = 0;
  }

  getCurrentWaveNumber() {
    return this.currentWaveIndex + 1;
  }

  isLastWave() {
    return this.currentWaveIndex === 14;
  }

  startNextWave() {
    if (this.isWaveInProgress || this.currentWaveIndex >= 15) return;

    this.isWaveInProgress = true;
    this.waveTimer = 0;
    const waveData = this.waves[this.currentWaveIndex];

    if (waveData.isBossWave) {
      soundEngine.playBossAlert();
      this.game.particles.addScreenShake(12);
      this.game.showBossAnnouncement(getBossData(this.chapterId, this.actIndex));
    }

    // Siapkan antrean spawn
    this.spawnQueue = waveData.enemies.map((e) => ({ ...e, spawned: false }));
    this.game.onWaveStart(this.getCurrentWaveNumber(), waveData.isBossWave);
  }

  update(dt) {
    if (!this.isWaveInProgress) {
      if (this.autoStart && this.currentWaveIndex < 15) {
        this.intermissionTimer -= dt;
        if (this.intermissionTimer <= 0) {
          this.startNextWave();
        }
      }
      return;
    }

    this.waveTimer += dt;

    // Spawn enemies dari queue
    for (const item of this.spawnQueue) {
      if (!item.spawned && this.waveTimer >= item.spawnDelay) {
        item.spawned = true;
        this.spawnEnemy(item);
      }
    }

    // Cek apakah seluruh musuh di antrean sudah di-spawn dan semua musuh di map sudah mati / lewat
    const allSpawned = this.spawnQueue.every((item) => item.spawned);
    const mapCleared = this.game.enemies.length === 0;

    if (allSpawned && mapCleared) {
      this.completeWave();
    }
  }

  spawnEnemy(item) {
    if (item.isBoss) {
      const bossData = getBossData(this.chapterId, this.actIndex);
      const boss = new Enemy(
        bossData,
        this.game.pathManager,
        item.hpMultiplier || 1.0,
        item.speedMultiplier || 1.0,
        true
      );
      this.game.enemies.push(boss);
    } else {
      const enemyData = ENEMY_TYPES[item.type] || ENEMY_TYPES.goblin;
      const enemy = new Enemy(
        enemyData,
        this.game.pathManager,
        item.hpMultiplier || 1.0,
        item.speedMultiplier || 1.0,
        false
      );
      this.game.enemies.push(enemy);
    }
  }

  completeWave() {
    this.isWaveInProgress = false;
    const waveData = this.waves[this.currentWaveIndex];

    // Hadiah menyelesaikan wave
    this.game.addGold(waveData.rewardGold);
    this.game.addGems(waveData.rewardGems);

    if (this.isLastWave()) {
      // Menang Act (Wave 15 selesai)
      this.game.onActVictory();
    } else {
      this.currentWaveIndex++;
      this.intermissionTimer = this.timeBetweenWaves;
      this.game.onWaveComplete(this.currentWaveIndex);
    }
  }
}
