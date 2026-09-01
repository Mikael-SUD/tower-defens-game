/**
 * Tower Index (Almanac / Codex) UI
 * Menampilkan katalog seluruh tower (Common -> Secret), status Unlocked vs Locked (Siluet),
 * filter rarity, info detail stats, dan lore.
 */

import { TOWERS_DATA, RARITIES } from '../config/towers.js';
import { saveSystem } from '../engine/saveSystem.js';

export class TowerIndexUI {
  constructor(game) {
    this.game = game;
    this.indexModal = document.getElementById('index-modal');
    this.indexGrid = document.getElementById('index-grid');
    this.detailModal = document.getElementById('tower-detail-modal');
    this.currentFilter = 'all';

    this.bindEvents();
  }

  bindEvents() {
    const btnClose = document.getElementById('btn-close-index');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.hideModal());
    }

    const btnCloseDetail = document.getElementById('btn-close-detail');
    if (btnCloseDetail) {
      btnCloseDetail.addEventListener('click', () => this.hideDetailModal());
    }

    // Filter rarity buttons
    const filterButtons = document.querySelectorAll('.index-filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderGrid();
      });
    });
  }

  showModal() {
    this.indexModal.classList.remove('hidden');
    this.renderGrid();
    this.updateProgressHeader();
  }

  hideModal() {
    this.indexModal.classList.add('hidden');
  }

  hideDetailModal() {
    if (this.detailModal) {
      this.detailModal.classList.add('hidden');
    }
  }

  updateProgressHeader() {
    const totalTowers = Object.keys(TOWERS_DATA).length;
    const unlockedTowers = saveSystem.getUnlockedTowers().length;
    const percent = Math.round((unlockedTowers / totalTowers) * 100);

    const progressEl = document.getElementById('index-progress-text');
    const barEl = document.getElementById('index-progress-bar');

    if (progressEl) {
      progressEl.textContent = `Koleksi Terbuka: ${unlockedTowers} / ${totalTowers} (${percent}%)`;
    }
    if (barEl) {
      barEl.style.width = `${percent}%`;
    }
  }

  renderGrid() {
    if (!this.indexGrid) return;
    this.indexGrid.innerHTML = '';

    const allTowers = Object.values(TOWERS_DATA);
    const filteredTowers =
      this.currentFilter === 'all'
        ? allTowers
        : allTowers.filter((t) => t.rarity === this.currentFilter);

    filteredTowers.forEach((tower) => {
      const isUnlocked = saveSystem.isTowerUnlocked(tower.id);
      const card = this.createIndexCard(tower, isUnlocked);
      this.indexGrid.appendChild(card);
    });
  }

  createIndexCard(tower, isUnlocked) {
    const rarity = RARITIES[tower.rarity];
    const card = document.createElement('div');
    card.className = `index-card ${isUnlocked ? 'unlocked' : 'locked'} rarity-${tower.rarity}`;

    if (isUnlocked) {
      const count = saveSystem.getTowerCount(tower.id);
      card.innerHTML = `
        <div class="index-card-header">
          <span class="rarity-badge" style="background: ${rarity.border};">${rarity.name.toUpperCase()}</span>
          <span class="shard-count">x${count}</span>
        </div>
        <div class="index-card-icon">${tower.icon}</div>
        <div class="index-card-name" style="color: ${rarity.textColor};">${tower.name}</div>
        <div class="index-card-type">${tower.attackType.toUpperCase()}</div>
        <div class="index-quick-stats">
          <span>ATK: <b>${tower.damage}</b></span>
          <span>SPD: <b>${tower.attackSpeed}/s</b></span>
        </div>
      `;
      card.addEventListener('click', () => this.showTowerDetail(tower));
    } else {
      card.innerHTML = `
        <div class="index-card-header">
          <span class="rarity-badge" style="background: ${rarity.border};">${rarity.name.toUpperCase()}</span>
          <span class="locked-icon">🔒</span>
        </div>
        <div class="index-card-icon silhouette">❓</div>
        <div class="index-card-name locked-text">???</div>
        <div class="index-card-type locked-text">TERKUNCI</div>
        <div class="index-quick-stats locked-hint">
          <span>Dapatkan dari Gacha</span>
        </div>
      `;
    }

    return card;
  }

  showTowerDetail(tower) {
    if (!this.detailModal) return;

    const rarity = RARITIES[tower.rarity];
    const count = saveSystem.getTowerCount(tower.id);

    const detailContent = document.getElementById('tower-detail-content');
    if (detailContent) {
      detailContent.innerHTML = `
        <div class="detail-header" style="border-bottom: 2px solid ${rarity.border};">
          <div class="detail-icon">${tower.icon}</div>
          <div>
            <h3 style="color: ${rarity.textColor};">${tower.name}</h3>
            <span class="rarity-badge" style="background: ${rarity.border};">${rarity.name.toUpperCase()} (${rarity.stars}★)</span>
            <span class="duplicate-badge">Koleksi: x${count}</span>
          </div>
        </div>
        
        <div class="detail-stats-grid">
          <div class="stat-box">
            <span class="stat-label">Damage Dasar</span>
            <span class="stat-value">${tower.damage}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Kecepatan Serang</span>
            <span class="stat-value">${tower.attackSpeed} / detik</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Jangkauan Tembak</span>
            <span class="stat-value">${tower.range} px</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Biaya Penempatan</span>
            <span class="stat-value gold-text">${tower.cost} Gold</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Tipe Serangan</span>
            <span class="stat-value">${tower.attackType.toUpperCase()}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Kecepatan Proyektil</span>
            <span class="stat-value">${tower.bulletSpeed || 8}</span>
          </div>
        </div>

        <div class="detail-skill-section">
          <h4>Kemampuan Khusus</h4>
          <p>${tower.description}</p>
        </div>

        <div class="detail-lore-section">
          <h4>Kisah Karakter</h4>
          <p class="lore-text">"${tower.lore}"</p>
        </div>
      `;
    }

    this.detailModal.classList.remove('hidden');
  }
}
