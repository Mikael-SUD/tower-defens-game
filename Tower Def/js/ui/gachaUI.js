/**
 * Gacha System & UI Controller (1x = 50 Gems, 10x = 500 Gems)
 * Dilengkapi animasi portal summon, kartu berputar, efek cahaya rarity, dan konversi duplikat.
 */

import { TOWERS_DATA, RARITIES } from '../config/towers.js';
import { saveSystem } from '../engine/saveSystem.js';
import { soundEngine } from '../engine/audio.js';

export class GachaUI {
  constructor(game) {
    this.game = game;
    this.gachaModal = document.getElementById('gacha-modal');
    this.resultContainer = document.getElementById('gacha-result-cards');
    this.isPulling = false;

    this.bindEvents();
  }

  bindEvents() {
    const btn1x = document.getElementById('btn-gacha-1x');
    const btn10x = document.getElementById('btn-gacha-10x');
    const btnClose = document.getElementById('btn-close-gacha');
    const btnCheatGems = document.getElementById('btn-cheat-gems');

    if (btn1x) {
      btn1x.addEventListener('click', () => this.pullGacha(1));
    }
    if (btn10x) {
      btn10x.addEventListener('click', () => this.pullGacha(10));
    }
    if (btnClose) {
      btnClose.addEventListener('click', () => this.hideModal());
    }
    if (btnCheatGems) {
      btnCheatGems.addEventListener('click', () => {
        saveSystem.giveCheatGems(500);
        this.game.updateHeaderUI();
        soundEngine.playCoin();
      });
    }
  }

  showModal() {
    this.gachaModal.classList.remove('hidden');
    this.clearResults();
    this.game.updateHeaderUI();
  }

  hideModal() {
    if (this.isPulling) return;
    this.gachaModal.classList.add('hidden');
    this.clearResults();
  }

  clearResults() {
    if (this.resultContainer) {
      this.resultContainer.innerHTML = `
        <div class="gacha-pedestal-empty">
          <div class="rune-circle"></div>
          <p>Pilih 1x Gacha (50 Gems) atau 10x Gacha (500 Gems) untuk memanggil Tower pahlawan!</p>
        </div>
      `;
    }
  }

  /**
   * Mengundi 1 tower berdasarkan probabilitas rarity
   */
  rollSingleTower(guaranteeEpicOrHigher = false) {
    const rarities = Object.keys(RARITIES);
    let chosenRarity = 'common';

    if (guaranteeEpicOrHigher) {
      // Bobot khusus hanya untuk Epic, Legendary, Mythic, Secret
      const highPool = ['epic', 'legendary', 'mythic', 'secret'];
      const totalWeight = highPool.reduce((acc, r) => acc + RARITIES[r].weight, 0);
      let rand = Math.random() * totalWeight;

      for (const r of highPool) {
        if (rand < RARITIES[r].weight) {
          chosenRarity = r;
          break;
        }
        rand -= RARITIES[r].weight;
      }
    } else {
      // Normal roll
      const totalWeight = Object.values(RARITIES).reduce((acc, r) => acc + r.weight, 0);
      let rand = Math.random() * totalWeight;

      for (const r of rarities) {
        if (rand < RARITIES[r].weight) {
          chosenRarity = r;
          break;
        }
        rand -= RARITIES[r].weight;
      }
    }

    // Ambil semua tower dengan rarity terpilih
    const matchingTowers = Object.values(TOWERS_DATA).filter((t) => t.rarity === chosenRarity);
    if (matchingTowers.length === 0) return TOWERS_DATA.archer;

    const randomIndex = Math.floor(Math.random() * matchingTowers.length);
    return matchingTowers[randomIndex];
  }

  /**
   * Eksekusi Tarikan Gacha
   */
  pullGacha(count = 1) {
    if (this.isPulling) return;

    const cost = count === 1 ? 50 : 500;
    if (saveSystem.getGems() < cost) {
      alert(`Gems tidak cukup! Butuh ${cost} Gems untuk ${count}x Gacha.`);
      return;
    }

    // Potong Gems
    saveSystem.spendGems(cost);
    this.game.updateHeaderUI();
    this.isPulling = true;
    soundEngine.playGachaSpin();

    // Animasi memanggil
    this.resultContainer.innerHTML = `
      <div class="gacha-summoning-anim">
        <div class="summon-portal spinning"></div>
        <h3 class="summon-text">MEMANGGIL KEKUATAN DIMENSI...</h3>
      </div>
    `;

    setTimeout(() => {
      this.displayGachaResults(count);
    }, 1200);
  }

  displayGachaResults(count) {
    const pulledResults = [];

    for (let i = 0; i < count; i++) {
      // Pada tarikan ke-10 di 10x gacha, beri garansi Epic atau lebih tinggi jika belum dapat
      const isGuarantee = count === 10 && i === 9 && !pulledResults.some((p) => ['epic', 'legendary', 'mythic', 'secret'].includes(p.tower.rarity));
      const tower = this.rollSingleTower(isGuarantee);
      const unlockResult = saveSystem.unlockTower(tower.id);

      pulledResults.push({
        tower,
        isNew: unlockResult.isNew,
        count: unlockResult.count
      });
    }

    this.resultContainer.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = count === 1 ? 'gacha-cards-single' : 'gacha-cards-grid';

    pulledResults.forEach((res, index) => {
      const card = this.createCardElement(res, index);
      grid.appendChild(card);
    });

    this.resultContainer.appendChild(grid);
    this.isPulling = false;
    this.game.updateHeaderUI();

    // Sound fanfare kartu tertinggi
    const highestRarity = pulledResults.reduce((highest, item) => {
      const order = ['common', 'rare', 'epic', 'legendary', 'mythic', 'secret'];
      return order.indexOf(item.tower.rarity) > order.indexOf(highest) ? item.tower.rarity : highest;
    }, 'common');

    soundEngine.playGachaReveal(highestRarity);
  }

  createCardElement(res, index) {
    const { tower, isNew, count } = res;
    const rarityInfo = RARITIES[tower.rarity];

    const card = document.createElement('div');
    card.className = `gacha-card rarity-${tower.rarity}`;
    card.style.animationDelay = `${index * 0.12}s`;

    card.innerHTML = `
      <div class="card-glow" style="background: radial-gradient(circle, ${rarityInfo.glow} 0%, transparent 70%);"></div>
      <div class="card-header">
        <span class="rarity-badge" style="background: ${rarityInfo.border}; color: #ffffff;">${rarityInfo.name.toUpperCase()}</span>
        ${isNew ? '<span class="new-tag">BARU!</span>' : `<span class="duplicate-tag">x${count}</span>`}
      </div>
      <div class="card-sprite-frame">
        <div class="sprite-preview" data-sprite="${tower.spriteKey}">${tower.icon}</div>
      </div>
      <div class="card-body">
        <h4 class="tower-card-name" style="color: ${rarityInfo.textColor};">${tower.name}</h4>
        <div class="tower-stats-mini">
          <span>ATK: <b>${tower.damage}</b></span>
          <span>RNG: <b>${tower.range}</b></span>
          <span>SPD: <b>${tower.attackSpeed}/s</b></span>
        </div>
        <p class="tower-card-desc">${tower.description}</p>
      </div>
    `;

    return card;
  }
}
