/**
 * Deck Loadout UI Controller
 * Mengatur pilihan maksimal 5 Tower dari koleksi untuk dibawa ke dalam pertempuran.
 */

import { TOWERS_DATA, RARITIES } from '../config/towers.js';
import { saveSystem } from '../engine/saveSystem.js';
import { soundEngine } from '../engine/audio.js';

export class DeckUI {
  constructor(game) {
    this.game = game;
    this.deckModal = document.getElementById('deck-modal');
    this.deckSlotsContainer = document.getElementById('deck-slots-container');
    this.unlockedPoolContainer = document.getElementById('deck-unlocked-pool');

    this.bindEvents();
  }

  bindEvents() {
    const btnClose = document.getElementById('btn-close-deck');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.hideModal());
    }
  }

  showModal() {
    this.deckModal.classList.remove('hidden');
    this.render();
  }

  hideModal() {
    this.deckModal.classList.add('hidden');
    this.game.updateBattleDeckHUD();
  }

  render() {
    this.renderEquippedSlots();
    this.renderAvailablePool();
  }

  renderEquippedSlots() {
    if (!this.deckSlotsContainer) return;
    this.deckSlotsContainer.innerHTML = '';

    const equipped = saveSystem.getEquippedDeck();

    for (let i = 0; i < 5; i++) {
      const towerId = equipped[i];
      const slotEl = document.createElement('div');
      slotEl.className = 'deck-slot';

      if (towerId && TOWERS_DATA[towerId]) {
        const tower = TOWERS_DATA[towerId];
        const rarity = RARITIES[tower.rarity];
        slotEl.className += ` rarity-${tower.rarity}`;
        slotEl.innerHTML = `
          <div class="slot-badge" style="background: ${rarity.border};">${rarity.name.toUpperCase()}</div>
          <div class="slot-icon">${tower.icon}</div>
          <div class="slot-name" style="color: ${rarity.textColor};">${tower.name}</div>
          <div class="slot-cost">${tower.cost} Gold</div>
          <button class="btn-remove-deck" title="Hapus dari deck">×</button>
        `;

        const btnRemove = slotEl.querySelector('.btn-remove-deck');
        btnRemove.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeTowerFromDeck(towerId);
        });
      } else {
        slotEl.className += ' empty-slot';
        slotEl.innerHTML = `
          <div class="empty-slot-icon">+</div>
          <div class="empty-slot-text">Slot Kosong (${i + 1}/5)</div>
        `;
      }

      this.deckSlotsContainer.appendChild(slotEl);
    }
  }

  renderAvailablePool() {
    if (!this.unlockedPoolContainer) return;
    this.unlockedPoolContainer.innerHTML = '';

    const unlockedIds = saveSystem.getUnlockedTowers();
    const equipped = saveSystem.getEquippedDeck();

    unlockedIds.forEach((towerId) => {
      const tower = TOWERS_DATA[towerId];
      if (!tower) return;

      const isEquipped = equipped.includes(towerId);
      const rarity = RARITIES[tower.rarity];

      const itemEl = document.createElement('div');
      itemEl.className = `pool-card rarity-${tower.rarity} ${isEquipped ? 'is-equipped' : ''}`;

      itemEl.innerHTML = `
        <div class="pool-header">
          <span class="rarity-badge" style="background: ${rarity.border};">${rarity.name.toUpperCase()}</span>
          ${isEquipped ? '<span class="equipped-tag">TERPASANG</span>' : ''}
        </div>
        <div class="pool-icon">${tower.icon}</div>
        <div class="pool-name" style="color: ${rarity.textColor};">${tower.name}</div>
        <div class="pool-stats">
          <span>ATK: <b>${tower.damage}</b></span>
          <span>RNG: <b>${tower.range}</b></span>
        </div>
        <button class="btn-equip-action ${isEquipped ? 'btn-unequip' : 'btn-equip'}">
          ${isEquipped ? 'Lepas' : 'Pasang'}
        </button>
      `;

      const btnAction = itemEl.querySelector('.btn-equip-action');
      btnAction.addEventListener('click', () => {
        if (isEquipped) {
          this.removeTowerFromDeck(towerId);
        } else {
          this.addTowerToDeck(towerId);
        }
      });

      this.unlockedPoolContainer.appendChild(itemEl);
    });
  }

  addTowerToDeck(towerId) {
    const currentDeck = saveSystem.getEquippedDeck();
    if (currentDeck.length >= 5) {
      alert('Deck sudah penuh! Maksimal membawa 5 Tower ke pertempuran.');
      return;
    }
    if (!currentDeck.includes(towerId)) {
      currentDeck.push(towerId);
      saveSystem.setEquippedDeck(currentDeck);
      soundEngine.playCoin();
      this.render();
    }
  }

  removeTowerFromDeck(towerId) {
    const currentDeck = saveSystem.getEquippedDeck();
    if (currentDeck.length <= 1) {
      alert('Minimal harus ada 1 Tower di dalam Deck pertempuran!');
      return;
    }
    const newDeck = currentDeck.filter((id) => id !== towerId);
    saveSystem.setEquippedDeck(newDeck);
    soundEngine.playShoot('single');
    this.render();
  }
}
