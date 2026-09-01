/**
 * Player Active Spells / Ultimates System
 */

import { soundEngine } from '../engine/audio.js';

export const SPELLS_CONFIG = [
  {
    id: 'meteor',
    name: 'Meteor Strike',
    icon: '☄️',
    cooldown: 25, // detik
    cost: 0,
    desc: 'Menjatuhkan meteor besar ke area target yang memberikan 450 damage AOE.',
    color: '#ef4444'
  },
  {
    id: 'blizzard',
    name: 'Absolute Blizzard',
    icon: '❄️',
    cooldown: 35,
    cost: 0,
    desc: 'Membekukan semua monster di peta selama 4 detik penuh.',
    color: '#38bdf8'
  },
  {
    id: 'gold_rush',
    name: 'Gold Harvest',
    icon: '💰',
    cooldown: 40,
    cost: 0,
    desc: 'Mendapatkan instan +200 Gold tambahan untuk upgrade.',
    color: '#fbbf24'
  }
];

export class SpellSystem {
  constructor(game) {
    this.game = game;
    this.cooldowns = {
      meteor: 0,
      blizzard: 0,
      gold_rush: 0
    };
    this.selectedSpell = null;
  }

  update(dt) {
    for (const key of Object.keys(this.cooldowns)) {
      if (this.cooldowns[key] > 0) {
        this.cooldowns[key] -= dt;
      }
    }
  }

  canCast(spellId) {
    return (this.cooldowns[spellId] || 0) <= 0;
  }

  getCooldownRatio(spellId) {
    const spell = SPELLS_CONFIG.find((s) => s.id === spellId);
    if (!spell) return 0;
    const remaining = Math.max(0, this.cooldowns[spellId] || 0);
    return remaining / spell.cooldown;
  }

  castSpell(spellId, targetX = null, targetY = null) {
    if (!this.canCast(spellId)) return false;

    const spell = SPELLS_CONFIG.find((s) => s.id === spellId);
    if (!spell) return false;

    if (spellId === 'meteor') {
      const tx = targetX !== null ? targetX : this.game.canvas.width / 2;
      const ty = targetY !== null ? targetY : this.game.canvas.height / 2;

      this.game.particles.createExplosion(tx, ty, '#ef4444', 32, 6, 6);
      this.game.particles.addShockwave(tx, ty, 90, '#f97316', 0.5);
      this.game.particles.addScreenShake(12);
      soundEngine.playExplosion();

      // Damage enemies
      for (const e of this.game.enemies) {
        const dist = Math.hypot(e.x - tx, e.y - ty);
        if (dist <= 90) {
          e.takeDamage(450, true, 'meteor', this.game.particles);
          e.applyStatus('burn', 4, 30);
        }
      }
    } else if (spellId === 'blizzard') {
      soundEngine.playShoot('slow');
      this.game.particles.addShockwave(this.game.canvas.width / 2, this.game.canvas.height / 2, 280, '#38bdf8', 0.8);
      for (const e of this.game.enemies) {
        e.applyStatus('freeze', 4.0);
        this.game.particles.createMagicSpark(e.x, e.y, '#bae6fd', 6);
      }
    } else if (spellId === 'gold_rush') {
      soundEngine.playCoin();
      this.game.addGold(200);
      this.game.particles.addFloatingText('+200 GOLD!', this.game.canvas.width / 2, 100, '#fbbf24', true, 16);
    }

    this.cooldowns[spellId] = spell.cooldown;
    return true;
  }
}
