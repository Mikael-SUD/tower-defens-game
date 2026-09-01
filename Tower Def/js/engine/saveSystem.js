/**
 * Save & Load System (LocalStorage)
 * Menyimpan progres player: Gems, Unlocked Towers, Shards, Deck, Clear Stars, & Audio
 */

const SAVE_KEY = 'PIXEL_TOWER_DEFENSE_SAVE_V1';

export class SaveSystem {
  constructor() {
    this.data = this.getDefaultData();
    this.load();
  }

  getDefaultData() {
    return {
      gems: 250, // Bonus awal untuk 5x Gacha perdana!
      unlockedTowers: ['archer', 'rock_slinger'],
      towerDuplicates: {
        archer: 1,
        rock_slinger: 1
      },
      equippedDeck: ['archer', 'rock_slinger'],
      progress: {
        // Format: 'ch1_act1': { cleared: true, stars: 3 }
        unlockedChapter: 1,
        unlockedAct: 1,
        clearedActs: {}
      },
      stats: {
        totalGachaPulls: 0,
        totalEnemiesKilled: 0,
        totalBossesDefeated: 0,
        totalGoldSpent: 0
      },
      settings: {
        muted: false,
        volume: 0.7,
        gameSpeed: 1,
        autoWave: false
      }
    };
  }

  load() {
    try {
      const json = localStorage.getItem(SAVE_KEY);
      if (json) {
        const parsed = JSON.parse(json);
        this.data = {
          ...this.getDefaultData(),
          ...parsed,
          progress: {
            ...this.getDefaultData().progress,
            ...(parsed.progress || {})
          },
          stats: {
            ...this.getDefaultData().stats,
            ...(parsed.stats || {})
          },
          settings: {
            ...this.getDefaultData().settings,
            ...(parsed.settings || {})
          }
        };
      }
    } catch (e) {
      console.warn('Gagal memuat save data, menggunakan default.', e);
      this.data = this.getDefaultData();
    }
  }

  save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Gagal menyimpan save data:', e);
    }
  }

  // ================= GEMS =================
  getGems() {
    return this.data.gems;
  }

  addGems(amount) {
    this.data.gems = Math.max(0, this.data.gems + amount);
    this.save();
    return this.data.gems;
  }

  spendGems(amount) {
    if (this.data.gems >= amount) {
      this.data.gems -= amount;
      this.save();
      return true;
    }
    return false;
  }

  // ================= TOWERS & DECK =================
  isTowerUnlocked(towerId) {
    return this.data.unlockedTowers.includes(towerId);
  }

  unlockTower(towerId) {
    let isNew = false;
    if (!this.data.unlockedTowers.includes(towerId)) {
      this.data.unlockedTowers.push(towerId);
      this.data.towerDuplicates[towerId] = 1;
      isNew = true;

      // Auto tambahkan ke deck jika deck masih < 5
      if (this.data.equippedDeck.length < 5 && !this.data.equippedDeck.includes(towerId)) {
        this.data.equippedDeck.push(towerId);
      }
    } else {
      this.data.towerDuplicates[towerId] = (this.data.towerDuplicates[towerId] || 1) + 1;
    }

    this.data.stats.totalGachaPulls++;
    this.save();
    return { isNew, count: this.data.towerDuplicates[towerId] };
  }

  getUnlockedTowers() {
    return this.data.unlockedTowers;
  }

  getTowerCount(towerId) {
    return this.data.towerDuplicates[towerId] || 0;
  }

  getEquippedDeck() {
    return this.data.equippedDeck;
  }

  setEquippedDeck(deck) {
    // Validasi maksimal 5 tower dan semua harus sudah di-unlock
    const validDeck = deck.filter((id) => this.isTowerUnlocked(id)).slice(0, 5);
    if (validDeck.length > 0) {
      this.data.equippedDeck = validDeck;
      this.save();
      return true;
    }
    return false;
  }

  // ================= CHAPTER & ACT PROGRESS =================
  isActUnlocked(chapterId, actIndex) {
    if (chapterId === 1 && actIndex === 1) return true;
    if (chapterId < this.data.progress.unlockedChapter) return true;
    if (chapterId === this.data.progress.unlockedChapter && actIndex <= this.data.progress.unlockedAct) {
      return true;
    }
    return false;
  }

  getActProgress(chapterId, actIndex) {
    const key = `ch${chapterId}_act${actIndex}`;
    return this.data.progress.clearedActs[key] || { cleared: false, stars: 0 };
  }

  completeAct(chapterId, actIndex, stars = 3, gemsReward = 50) {
    const key = `ch${chapterId}_act${actIndex}`;
    const prev = this.data.progress.clearedActs[key] || { cleared: false, stars: 0 };

    this.data.progress.clearedActs[key] = {
      cleared: true,
      stars: Math.max(prev.stars, stars)
    };

    // Unlock Act berikutnya
    if (chapterId === this.data.progress.unlockedChapter && actIndex === this.data.progress.unlockedAct) {
      if (actIndex < 6) {
        this.data.progress.unlockedAct = actIndex + 1;
      } else if (chapterId < 4) {
        // Unlock Chapter berikutnya!
        this.data.progress.unlockedChapter = chapterId + 1;
        this.data.progress.unlockedAct = 1;
      }
    }

    this.data.gems += gemsReward;
    this.data.stats.totalBossesDefeated++;
    this.save();
  }

  // Reset / Cheat
  resetProgress() {
    this.data = this.getDefaultData();
    this.save();
  }

  giveCheatGems(amount = 1000) {
    this.data.gems += amount;
    this.save();
  }
}

export const saveSystem = new SaveSystem();
