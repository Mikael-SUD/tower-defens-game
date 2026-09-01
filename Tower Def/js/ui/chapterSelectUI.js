/**
 * Chapter & Act Selector UI
 * Menavigasi Chapter 1-4, menampilkan status Act 1-6, bintang perolehan, dan memulai pertempuran.
 */

import { CHAPTERS_DATA } from '../config/chapters.js';
import { getBossData } from '../config/enemies.js';
import { saveSystem } from '../engine/saveSystem.js';
import { soundEngine } from '../engine/audio.js';

export class ChapterSelectUI {
  constructor(game) {
    this.game = game;
    this.modal = document.getElementById('chapter-modal');
    this.chapterTabsContainer = document.getElementById('chapter-tabs');
    this.actsGridContainer = document.getElementById('acts-grid');
    this.selectedChapterId = 1;

    this.bindEvents();
  }

  bindEvents() {
    const btnClose = document.getElementById('btn-close-chapter');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.hideModal());
    }
  }

  showModal() {
    this.modal.classList.remove('hidden');
    this.renderTabs();
    this.renderActs();
  }

  hideModal() {
    this.modal.classList.add('hidden');
  }

  renderTabs() {
    if (!this.chapterTabsContainer) return;
    this.chapterTabsContainer.innerHTML = '';

    CHAPTERS_DATA.forEach((ch) => {
      const isUnlocked = ch.id <= saveSystem.data.progress.unlockedChapter;
      const tab = document.createElement('button');
      tab.className = `chapter-tab-btn ${this.selectedChapterId === ch.id ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`;

      tab.innerHTML = `
        <div class="tab-badge">${isUnlocked ? `BAB ${ch.id}` : '🔒'}</div>
        <div class="tab-title">${ch.name}</div>
      `;

      if (isUnlocked) {
        tab.addEventListener('click', () => {
          this.selectedChapterId = ch.id;
          soundEngine.playShoot('single');
          this.renderTabs();
          this.renderActs();
        });
      }

      this.chapterTabsContainer.appendChild(tab);
    });
  }

  renderActs() {
    if (!this.actsGridContainer) return;
    this.actsGridContainer.innerHTML = '';

    const chapter = CHAPTERS_DATA.find((c) => c.id === this.selectedChapterId);
    if (!chapter) return;

    chapter.acts.forEach((actData) => {
      const isUnlocked = saveSystem.isActUnlocked(chapter.id, actData.act);
      const progress = saveSystem.getActProgress(chapter.id, actData.act);
      const boss = getBossData(chapter.id, actData.act);

      const card = document.createElement('div');
      card.className = `act-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      const starStr = '★'.repeat(progress.stars) + '☆'.repeat(3 - progress.stars);

      if (isUnlocked) {
        card.innerHTML = `
          <div class="act-card-header">
            <span class="act-number-badge">ACT ${actData.act}</span>
            <span class="act-stars ${progress.stars > 0 ? 'earned' : ''}">${starStr}</span>
          </div>
          <h3 class="act-title">${actData.name}</h3>
          <p class="act-desc">${actData.desc}</p>
          <div class="act-boss-info">
            <span class="boss-icon">${boss.icon}</span>
            <span class="boss-name">Boss W15: <b>${boss.name}</b></span>
          </div>
          <div class="act-rewards-info">
            <span>Modal: <b class="gold-text">${actData.startGold} Gold</b></span>
            <span>Hadiah: <b class="gem-text">+${progress.cleared ? actData.repeatGems : actData.firstClearGems} Gems</b></span>
          </div>
          <button class="btn-play-act">Mulai Pertempuran</button>
        `;

        const btnPlay = card.querySelector('.btn-play-act');
        btnPlay.addEventListener('click', () => {
          this.hideModal();
          this.game.loadMatch(chapter.id, actData.act);
        });
      } else {
        card.innerHTML = `
          <div class="act-card-header">
            <span class="act-number-badge">ACT ${actData.act}</span>
            <span class="act-lock-icon">🔒</span>
          </div>
          <h3 class="act-title locked-text">Terkunci</h3>
          <p class="act-desc">Selesaikan Act sebelumnya untuk membuka peta ini.</p>
          <div class="act-boss-info">
            <span class="boss-icon">❓</span>
            <span class="boss-name locked-text">Boss Misterius</span>
          </div>
          <button class="btn-play-act disabled" disabled>Terkunci</button>
        `;
      }

      this.actsGridContainer.appendChild(card);
    });
  }
}
