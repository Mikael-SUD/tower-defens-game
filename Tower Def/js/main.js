/**
 * Main Game Controller & Canvas Orchestrator
 * Mengintegrasikan Renderer Pixel, Audio, Combat, Waves, Gacha, Index, dan Deck
 */

import { TILE_SIZE, MAP_COLS, MAP_ROWS, CHAPTERS_DATA } from './config/chapters.js';
import { TOWERS_DATA, getTowerData } from './config/towers.js';
import { PixelRenderer } from './engine/pixelRenderer.js';
import { soundEngine } from './engine/audio.js';
import { ParticleSystem } from './engine/particles.js';
import { saveSystem } from './engine/saveSystem.js';
import { PathManager } from './gameplay/pathfinding.js';
import { Tower, Enemy } from './gameplay/combat.js';
import { WaveManager } from './gameplay/waveManager.js';
import { SpellSystem, SPELLS_CONFIG } from './gameplay/spellSystem.js';
import { GachaUI } from './ui/gachaUI.js';
import { TowerIndexUI } from './ui/towerIndexUI.js';
import { DeckUI } from './ui/deckUI.js';
import { ChapterSelectUI } from './ui/chapterSelectUI.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    // Engine instances
    this.pixelRenderer = new PixelRenderer();
    this.particles = new ParticleSystem();
    this.spellSystem = new SpellSystem(this);

    // Gameplay states
    this.currentChapterId = 1;
    this.currentActIndex = 1;
    this.gold = 500;
    this.baseHp = 20;
    this.maxBaseHp = 20;
    this.isPaused = false;
    this.gameSpeed = 1; // 1, 2, 4
    this.isGameOver = false;
    this.isVictory = false;

    // Entities
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
    this.pathManager = null;
    this.waveManager = null;

    // Selection & Placement
    this.selectedTowerToPlace = null;
    this.hoverGridX = -1;
    this.hoverGridY = -1;
    this.selectedPlacedTower = null;
    this.activeSpellId = null;

    // UI Modules
    this.gachaUI = new GachaUI(this);
    this.towerIndexUI = new TowerIndexUI(this);
    this.deckUI = new DeckUI(this);
    this.chapterSelectUI = new ChapterSelectUI(this);

    this.lastTime = performance.now();

    this.initDOM();
    this.bindEvents();
    this.loadMatch(1, 1);
    this.updateHeaderUI();
    this.updateBattleDeckHUD();

    // Start loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  initDOM() {
    this.goldEl = document.getElementById('hud-gold');
    this.gemsEl = document.getElementById('hud-gems');
    this.hpEl = document.getElementById('hud-hp');
    this.waveEl = document.getElementById('hud-wave');
    this.chapterTitleEl = document.getElementById('hud-chapter-act');
    this.btnStartWave = document.getElementById('btn-start-wave');
    this.towerInspector = document.getElementById('tower-inspector');
    this.bossBanner = document.getElementById('boss-banner');
  }

  bindEvents() {
    // Top bar modals
    document.getElementById('btn-nav-gacha')?.addEventListener('click', () => this.gachaUI.showModal());
    document.getElementById('btn-nav-index')?.addEventListener('click', () => this.towerIndexUI.showModal());
    document.getElementById('btn-nav-deck')?.addEventListener('click', () => this.deckUI.showModal());
    document.getElementById('btn-nav-chapters')?.addEventListener('click', () => this.chapterSelectUI.showModal());

    // Audio & Speed
    document.getElementById('btn-toggle-sound')?.addEventListener('click', (e) => {
      const isMuted = soundEngine.toggleMute();
      e.target.textContent = isMuted ? '🔇 Mute' : '🔊 Audio';
    });

    document.getElementById('btn-toggle-bgm')?.addEventListener('click', (e) => {
      if (soundEngine.bgmPlaying) {
        soundEngine.stopBGM();
        e.target.textContent = '🎵 BGM: OFF';
      } else {
        soundEngine.startBGM();
        e.target.textContent = '🎵 BGM: ON';
      }
    });

    const speedButtons = document.querySelectorAll('.btn-speed');
    speedButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        speedButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.gameSpeed = parseFloat(btn.dataset.speed || '1');
      });
    });

    // Wave start button
    this.btnStartWave?.addEventListener('click', () => {
      if (this.waveManager && !this.waveManager.isWaveInProgress) {
        this.waveManager.startNextWave();
      }
    });

    // Canvas interactions
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => {
      this.hoverGridX = -1;
      this.hoverGridY = -1;
    });
    this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.cancelSelection();
    });

    // Spells HUD buttons
    const spellButtons = document.querySelectorAll('.spell-btn');
    spellButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const spellId = btn.dataset.spell;
        if (spellId === 'gold_rush') {
          this.spellSystem.castSpell('gold_rush');
        } else if (this.spellSystem.canCast(spellId)) {
          if (spellId === 'blizzard') {
            this.spellSystem.castSpell('blizzard');
          } else {
            this.activeSpellId = spellId;
            this.selectedTowerToPlace = null;
          }
        }
      });
    });

    // Inspector buttons
    document.getElementById('btn-upgrade-tower')?.addEventListener('click', () => this.upgradeSelectedTower());
    document.getElementById('btn-sell-tower')?.addEventListener('click', () => this.sellSelectedTower());
    document.getElementById('btn-target-strategy')?.addEventListener('click', () => this.toggleTargetStrategy());
    document.getElementById('btn-close-inspector')?.addEventListener('click', () => this.deselectTower());

    // Victory / Defeat modals
    document.getElementById('btn-victory-next')?.addEventListener('click', () => {
      document.getElementById('victory-modal').classList.add('hidden');
      if (this.currentActIndex < 6) {
        this.loadMatch(this.currentChapterId, this.currentActIndex + 1);
      } else if (this.currentChapterId < 4) {
        this.loadMatch(this.currentChapterId + 1, 1);
      } else {
        this.chapterSelectUI.showModal();
      }
    });

    document.getElementById('btn-victory-map')?.addEventListener('click', () => {
      document.getElementById('victory-modal').classList.add('hidden');
      this.chapterSelectUI.showModal();
    });

    document.getElementById('btn-defeat-retry')?.addEventListener('click', () => {
      document.getElementById('defeat-modal').classList.add('hidden');
      this.loadMatch(this.currentChapterId, this.currentActIndex);
    });

    document.getElementById('btn-defeat-gacha')?.addEventListener('click', () => {
      document.getElementById('defeat-modal').classList.add('hidden');
      this.gachaUI.showModal();
    });
  }

  loadMatch(chapterId, actIndex) {
    this.currentChapterId = chapterId;
    this.currentActIndex = actIndex;

    const chapter = CHAPTERS_DATA.find((c) => c.id === chapterId);
    const act = chapter.acts.find((a) => a.act === actIndex);

    this.gold = act.startGold || 450;
    this.baseHp = act.baseHp || 20;
    this.maxBaseHp = this.baseHp;
    this.isGameOver = false;
    this.isVictory = false;

    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
    this.deselectTower();
    this.cancelSelection();

    this.pathManager = new PathManager(act.path);
    this.waveManager = new WaveManager(this, chapterId, actIndex);

    if (this.chapterTitleEl) {
      this.chapterTitleEl.textContent = `BAB ${chapterId} • ACT ${actIndex} (${act.name})`;
    }

    this.updateHeaderUI();
    this.updateWaveUI(1, false);
  }

  // ================= CONTROLS & HUD =================
  updateHeaderUI() {
    if (this.goldEl) this.goldEl.textContent = this.gold;
    if (this.gemsEl) this.gemsEl.textContent = saveSystem.getGems();
    if (this.hpEl) this.hpEl.textContent = `${this.baseHp} / ${this.maxBaseHp}`;
  }

  updateWaveUI(waveNumber, isBossWave = false) {
    if (this.waveEl) {
      this.waveEl.innerHTML = isBossWave
        ? `<span style="color:#ef4444; font-weight:bold;">WAVE 15 (BOSS)</span>`
        : `Wave ${waveNumber} / 15`;
    }

    if (this.btnStartWave) {
      if (this.waveManager && this.waveManager.isWaveInProgress) {
        this.btnStartWave.textContent = '⚔️ Bertempur...';
        this.btnStartWave.classList.add('in-progress');
      } else {
        this.btnStartWave.textContent = '▶ Mulai Wave';
        this.btnStartWave.classList.remove('in-progress');
      }
    }
  }

  updateBattleDeckHUD() {
    const deckContainer = document.getElementById('battle-deck-buttons');
    if (!deckContainer) return;
    deckContainer.innerHTML = '';

    const equippedIds = saveSystem.getEquippedDeck();

    equippedIds.forEach((towerId) => {
      const towerData = TOWERS_DATA[towerId];
      if (!towerData) return;

      const btn = document.createElement('button');
      btn.className = `battle-tower-btn rarity-${towerData.rarity}`;
      btn.dataset.id = towerId;

      btn.innerHTML = `
        <div class="tower-btn-icon">${towerData.icon}</div>
        <div class="tower-btn-info">
          <div class="tower-btn-name">${towerData.name}</div>
          <div class="tower-btn-cost">${towerData.cost} G</div>
        </div>
      `;

      btn.addEventListener('click', () => {
        if (this.gold >= towerData.cost) {
          this.selectTowerToPlace(towerData);
        } else {
          this.particles.addFloatingText('GOLD KURANG!', this.canvas.width / 2, 80, '#ef4444', true, 14);
          soundEngine.playTone(200, 'sawtooth', 0.1, 0.2);
        }
      });

      deckContainer.appendChild(btn);
    });
  }

  selectTowerToPlace(towerData) {
    this.selectedTowerToPlace = towerData;
    this.activeSpellId = null;
    this.deselectTower();
  }

  cancelSelection() {
    this.selectedTowerToPlace = null;
    this.activeSpellId = null;
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    this.hoverGridX = Math.floor(mouseX / TILE_SIZE);
    this.hoverGridY = Math.floor(mouseY / TILE_SIZE);
  }

  onCanvasClick(e) {
    if (this.hoverGridX < 0 || this.hoverGridX >= MAP_COLS || this.hoverGridY < 0 || this.hoverGridY >= MAP_ROWS) {
      return;
    }

    const clickX = this.hoverGridX * TILE_SIZE + TILE_SIZE / 2;
    const clickY = this.hoverGridY * TILE_SIZE + TILE_SIZE / 2;

    // Active Spell casting
    if (this.activeSpellId) {
      this.spellSystem.castSpell(this.activeSpellId, clickX, clickY);
      this.activeSpellId = null;
      return;
    }

    // Placing tower
    if (this.selectedTowerToPlace) {
      if (this.canPlaceTowerAt(this.hoverGridX, this.hoverGridY)) {
        this.placeTower(this.selectedTowerToPlace, this.hoverGridX, this.hoverGridY);
      } else {
        this.particles.addFloatingText('LOKASI TIDAK VALID!', clickX, clickY, '#ef4444', true, 12);
        soundEngine.playTone(180, 'sawtooth', 0.08, 0.2);
      }
      return;
    }

    // Selecting already placed tower
    const clickedTower = this.towers.find((t) => t.gridX === this.hoverGridX && t.gridY === this.hoverGridY);
    if (clickedTower) {
      this.selectPlacedTower(clickedTower);
    } else {
      this.deselectTower();
    }
  }

  canPlaceTowerAt(gx, gy) {
    // Tidak boleh di atas jalur
    if (this.pathManager.isPathTile(gx, gy)) return false;
    // Tidak boleh menimpa tower lain
    if (this.towers.some((t) => t.gridX === gx && t.gridY === gy)) return false;
    return true;
  }

  placeTower(towerData, gx, gy) {
    if (this.gold < towerData.cost) return;

    this.gold -= towerData.cost;
    const newTower = new Tower(towerData, gx, gy, TILE_SIZE);
    this.towers.push(newTower);

    this.particles.createMagicSpark(newTower.x, newTower.y, '#22c55e', 10);
    this.particles.addShockwave(newTower.x, newTower.y, 35, '#22c55e', 0.25);
    soundEngine.playUpgrade();

    this.selectedTowerToPlace = null;
    this.updateHeaderUI();
  }

  selectPlacedTower(tower) {
    this.selectedPlacedTower = tower;
    if (!this.towerInspector) return;

    this.towerInspector.classList.remove('hidden');
    document.getElementById('inspector-tower-name').textContent = `${tower.name} (Lv. ${tower.level})`;
    document.getElementById('inspector-atk').textContent = tower.damage;
    document.getElementById('inspector-spd').textContent = `${tower.attackSpeed}/s`;
    document.getElementById('inspector-rng').textContent = `${tower.range}px`;
    document.getElementById('inspector-kills').textContent = tower.kills;

    const btnUpgrade = document.getElementById('btn-upgrade-tower');
    const btnSell = document.getElementById('btn-sell-tower');
    const btnStrat = document.getElementById('btn-target-strategy');

    if (btnUpgrade) {
      btnUpgrade.textContent = tower.canUpgrade() ? `Upgrade (${tower.upgradeCost} G)` : 'Max Level';
      btnUpgrade.disabled = !tower.canUpgrade() || this.gold < tower.upgradeCost;
    }
    if (btnSell) {
      btnSell.textContent = `Jual (+${tower.getSellRefund()} G)`;
    }
    if (btnStrat) {
      btnStrat.textContent = `Target: ${tower.targetStrategy.toUpperCase()}`;
    }
  }

  deselectTower() {
    this.selectedPlacedTower = null;
    if (this.towerInspector) {
      this.towerInspector.classList.add('hidden');
    }
  }

  upgradeSelectedTower() {
    if (!this.selectedPlacedTower || !this.selectedPlacedTower.canUpgrade()) return;

    const cost = this.selectedPlacedTower.upgradeCost;
    if (this.gold >= cost) {
      this.gold -= cost;
      this.selectedPlacedTower.upgrade();
      this.particles.createExplosion(this.selectedPlacedTower.x, this.selectedPlacedTower.y, '#fbbf24', 16, 4, 3);
      this.particles.addFloatingText('LEVEL UP!', this.selectedPlacedTower.x, this.selectedPlacedTower.y - 15, '#fbbf24', true, 14);
      soundEngine.playUpgrade();
      this.selectPlacedTower(this.selectedPlacedTower);
      this.updateHeaderUI();
    }
  }

  sellSelectedTower() {
    if (!this.selectedPlacedTower) return;
    const refund = this.selectedPlacedTower.getSellRefund();
    this.gold += refund;

    this.towers = this.towers.filter((t) => t !== this.selectedPlacedTower);
    this.particles.createMagicSpark(this.selectedPlacedTower.x, this.selectedPlacedTower.y, '#fbbf24', 8);
    soundEngine.playCoin();

    this.deselectTower();
    this.updateHeaderUI();
  }

  toggleTargetStrategy() {
    if (!this.selectedPlacedTower) return;
    const strategies = ['first', 'last', 'strongest', 'closest'];
    const currentIdx = strategies.indexOf(this.selectedPlacedTower.targetStrategy);
    const nextIdx = (currentIdx + 1) % strategies.length;
    this.selectedPlacedTower.targetStrategy = strategies[nextIdx];
    this.selectPlacedTower(this.selectedPlacedTower);
  }

  // ================= GAMEPLAY EVENTS =================
  addGold(amount) {
    this.gold += amount;
    this.updateHeaderUI();
  }

  addGems(amount) {
    saveSystem.addGems(amount);
    this.updateHeaderUI();
  }

  spawnMinions(x, y, count, type = 'goblin') {
    const enemyData = getTowerData(type) || { id: 'goblin', name: 'Goblin', hp: 50, speed: 1.5, rewardGold: 10, spriteKey: 'enemy_goblin' };
    for (let i = 0; i < count; i++) {
      const minion = new Enemy(enemyData, this.pathManager, 1.0, 1.2, false);
      minion.distance = Math.max(0, this.enemies[0]?.distance || 0);
      this.enemies.push(minion);
    }
  }

  stunNearbyTowers(x, y, radius, duration) {
    for (const t of this.towers) {
      if (Math.hypot(t.x - x, t.y - y) <= radius) {
        t.stunTimer = duration;
        this.particles.addFloatingText('STUNNED!', t.x, t.y - 15, '#fbbf24', true, 11);
      }
    }
  }

  showBossAnnouncement(bossData) {
    if (!this.bossBanner) return;
    this.bossBanner.innerHTML = `
      <div class="boss-banner-content">
        <h2 class="boss-warning-text">⚠️ PERINGATAN: BOSS MUNCUL! ⚠️</h2>
        <h1 class="boss-banner-name">${bossData.icon} ${bossData.name}</h1>
        <p class="boss-banner-title">${bossData.title}</p>
        <p class="boss-banner-desc">${bossData.description}</p>
      </div>
    `;
    this.bossBanner.classList.remove('hidden');
    setTimeout(() => {
      this.bossBanner.classList.add('hidden');
    }, 4000);
  }

  onWaveStart(waveNumber, isBossWave) {
    this.updateWaveUI(waveNumber, isBossWave);
  }

  onWaveComplete(nextWaveNumber) {
    this.updateWaveUI(nextWaveNumber, false);
    this.particles.addFloatingText(`WAVE SELESAI! +GOLD`, this.canvas.width / 2, 70, '#22c55e', true, 14);
  }

  onActVictory() {
    this.isVictory = true;
    soundEngine.playVictory();

    // Hitung Bintang
    const hpRatio = this.baseHp / this.maxBaseHp;
    const stars = hpRatio === 1.0 ? 3 : hpRatio >= 0.5 ? 2 : 1;

    const chapter = CHAPTERS_DATA.find((c) => c.id === this.currentChapterId);
    const act = chapter.acts.find((a) => a.act === this.currentActIndex);
    const gemsReward = act.firstClearGems || 150;

    saveSystem.completeAct(this.currentChapterId, this.currentActIndex, stars, gemsReward);

    const vicModal = document.getElementById('victory-modal');
    if (vicModal) {
      document.getElementById('victory-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
      document.getElementById('victory-act-title').textContent = `BAB ${this.currentChapterId} • ACT ${this.currentActIndex}: ${act.name}`;
      document.getElementById('victory-gems-earned').textContent = `+${gemsReward} Gems`;
      vicModal.classList.remove('hidden');
    }
  }

  onGameOver() {
    this.isGameOver = true;
    soundEngine.playDefeat();

    const defModal = document.getElementById('defeat-modal');
    if (defModal) {
      document.getElementById('defeat-act-title').textContent = `BAB ${this.currentChapterId} • ACT ${this.currentActIndex}`;
      defModal.classList.remove('hidden');
    }
  }

  // ================= MAIN LOOP & RENDER =================
  gameLoop(timestamp) {
    const dt = Math.min(0.1, (timestamp - this.lastTime) / 1000) * (this.isPaused ? 0 : this.gameSpeed);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(dt) {
    if (this.isGameOver || this.isVictory || dt === 0) return;

    // 1. Spells & Particles
    this.spellSystem.update(dt);
    this.particles.update(dt);

    // 2. Wave Manager
    if (this.waveManager) {
      this.waveManager.update(dt);
    }

    // 3. Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.update(dt, this.pathManager, this);

      if (e.isDead) {
        this.addGold(e.rewardGold);
        this.addGems(e.rewardGems);
        this.particles.createExplosion(e.x, e.y, e.rawConfig.color || '#22c55e', 14, 3, 3);
        this.enemies.splice(i, 1);
      } else if (e.reachedEnd) {
        // Monster menembus base!
        this.baseHp = Math.max(0, this.baseHp - (e.isBoss ? 5 : 1));
        this.particles.addScreenShake(8);
        soundEngine.playTone(150, 'sawtooth', 0.2, 0.3);
        this.updateHeaderUI();
        this.enemies.splice(i, 1);

        if (this.baseHp <= 0) {
          this.onGameOver();
          break;
        }
      }
    }

    // 4. Towers
    for (const t of this.towers) {
      t.update(dt, this.enemies, this.projectiles, this.particles, this.towers);
    }

    // 5. Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, this.enemies, this.particles);
      if (p.isDead) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  render() {
    this.ctx.save();

    // Screen shake transform
    if (this.particles.shakeIntensity > 0) {
      const sx = (Math.random() * 2 - 1) * this.particles.shakeIntensity;
      const sy = (Math.random() * 2 - 1) * this.particles.shakeIntensity;
      this.ctx.translate(sx, sy);
    }

    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw Map Tiles
    this.renderMapTiles();

    // 2. Draw Towers
    for (const t of this.towers) {
      // Holy Paladin Aura
      if (t.id === 'holy_paladin') {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(t.x, t.y, t.rawConfig.buffRange, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.restore();
      }

      // Draw Tower Sprite
      this.pixelRenderer.drawSprite(this.ctx, t.spriteKey, t.x, t.y, 32, 32);

      // Level badge
      this.ctx.save();
      this.ctx.font = 'bold 9px monospace';
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`Lv.${t.level}`, t.x, t.y + 14);
      this.ctx.restore();
    }

    // 3. Draw Enemies
    for (const e of this.enemies) {
      e.draw(this.ctx, this.pixelRenderer);
    }

    // 4. Draw Projectiles
    for (const p of this.projectiles) {
      p.draw(this.ctx);
    }

    // 5. Draw Particles & FX
    this.particles.draw(this.ctx);

    // 6. Draw Tower Range indicator for selected placed tower
    if (this.selectedPlacedTower) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.selectedPlacedTower.x, this.selectedPlacedTower.y, this.selectedPlacedTower.range, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      this.ctx.fill();
      this.ctx.strokeStyle = '#38bdf8';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 7. Draw Placement Preview when placing a new tower
    if (this.selectedTowerToPlace && this.hoverGridX >= 0 && this.hoverGridY >= 0) {
      const px = this.hoverGridX * TILE_SIZE + TILE_SIZE / 2;
      const py = this.hoverGridY * TILE_SIZE + TILE_SIZE / 2;
      const isValid = this.canPlaceTowerAt(this.hoverGridX, this.hoverGridY);

      this.ctx.save();
      // Range circle
      this.ctx.beginPath();
      this.ctx.arc(px, py, this.selectedTowerToPlace.range, 0, Math.PI * 2);
      this.ctx.fillStyle = isValid ? 'rgba(34, 197, 94, 0.18)' : 'rgba(239, 68, 68, 0.18)';
      this.ctx.fill();
      this.ctx.strokeStyle = isValid ? '#22c55e' : '#ef4444';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Tile box
      this.ctx.fillStyle = isValid ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';
      this.ctx.fillRect(this.hoverGridX * TILE_SIZE, this.hoverGridY * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      // Sprite preview
      this.pixelRenderer.drawSprite(this.ctx, this.selectedTowerToPlace.spriteKey, px, py, 32, 32, 0, 0.7);
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  renderMapTiles() {
    const chapter = CHAPTERS_DATA.find((c) => c.id === this.currentChapterId);
    const tileTheme = chapter?.theme || 'forest';
    const tileKey = tileTheme === 'volcano' ? 'tile_lava' : tileTheme === 'snow' ? 'tile_ice' : tileTheme === 'abyss' ? 'tile_void' : 'tile_grass_forest';
    const pathKey = 'tile_path_forest';

    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        const x = c * TILE_SIZE + TILE_SIZE / 2;
        const y = r * TILE_SIZE + TILE_SIZE / 2;

        if (this.pathManager.isPathTile(c, r)) {
          this.pixelRenderer.drawSprite(this.ctx, pathKey, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          this.pixelRenderer.drawSprite(this.ctx, tileKey, x, y, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    // Portal Spawner at start of path
    if (this.pathManager && this.pathManager.waypoints.length > 0) {
      const startPt = this.pathManager.waypoints[0];
      const endPt = this.pathManager.waypoints[this.pathManager.waypoints.length - 1];

      this.pixelRenderer.drawSprite(this.ctx, 'tile_portal', startPt.x, startPt.y, TILE_SIZE, TILE_SIZE);
      this.pixelRenderer.drawSprite(this.ctx, 'tile_castle', endPt.x, endPt.y, TILE_SIZE, TILE_SIZE);
    }
  }
}

// Inisialisasi Game saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new Game();
});
