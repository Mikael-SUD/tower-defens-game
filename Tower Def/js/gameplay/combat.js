/**
 * Combat Engine: Tower Mechanics, Projectiles, Enemy Physics & Boss Abilities
 */

import { calculateTowerStats } from '../config/towers.js';
import { soundEngine } from '../engine/audio.js';

export class Tower {
  constructor(data, gridX, gridY, tileSize = 32) {
    this.rawConfig = data;
    this.id = data.id;
    this.name = data.name;
    this.rarity = data.rarity;
    this.gridX = gridX;
    this.gridY = gridY;
    this.x = gridX * tileSize + tileSize / 2;
    this.y = gridY * tileSize + tileSize / 2;
    this.level = 1;

    this.cooldown = 0;
    this.targetStrategy = 'first'; // 'first' | 'last' | 'strongest' | 'closest'
    this.totalDamageDealt = 0;
    this.kills = 0;
    this.stunTimer = 0;
    this.buffDamageBonus = 0; // dari Paladin / Relic

    this.applyStats();
  }

  applyStats() {
    const stats = calculateTowerStats(this.rawConfig, this.level);
    this.damage = stats.damage;
    this.range = stats.range;
    this.attackSpeed = stats.attackSpeed;
    this.upgradeCost = stats.upgradeCost;
    this.attackType = stats.attackType;
    this.bulletColor = stats.bulletColor || '#ffffff';
    this.spriteKey = stats.spriteKey;
  }

  canUpgrade() {
    return this.level < 5;
  }

  upgrade() {
    if (this.canUpgrade()) {
      this.level++;
      this.applyStats();
      return true;
    }
    return false;
  }

  getSellRefund() {
    // Kembalikan 70% dari modal penempatan + upgrade
    let totalInvested = this.rawConfig.cost;
    for (let l = 1; l < this.level; l++) {
      totalInvested += Math.round(this.rawConfig.upgradeBaseCost * Math.pow(1.65, l - 1));
    }
    return Math.round(totalInvested * 0.7);
  }

  update(dt, enemies, projectiles, particles, allTowers) {
    if (this.stunTimer > 0) {
      this.stunTimer -= dt;
      return;
    }

    if (this.cooldown > 0) {
      this.cooldown -= dt;
    }

    // Hitung Buff Aura jika dekat dengan Holy Paladin
    this.buffDamageBonus = 0;
    if (this.id !== 'holy_paladin') {
      for (const t of allTowers) {
        if (t.id === 'holy_paladin' && t !== this) {
          const dist = Math.hypot(t.x - this.x, t.y - this.y);
          if (dist <= t.rawConfig.buffRange) {
            this.buffDamageBonus += t.rawConfig.buffDamageBonus;
          }
        }
      }
    }

    if (this.cooldown <= 0) {
      const target = this.findTarget(enemies);
      if (target) {
        this.shoot(target, enemies, projectiles, particles);
        this.cooldown = 1.0 / this.attackSpeed;
      }
    }
  }

  findTarget(enemies) {
    const inRange = enemies.filter((e) => {
      if (e.isDead || e.reachedEnd) return false;
      const dist = Math.hypot(e.x - this.x, e.y - this.y);
      return dist <= this.range;
    });

    if (inRange.length === 0) return null;

    if (this.targetStrategy === 'strongest') {
      return inRange.reduce((max, e) => (e.hp > max.hp ? e : max), inRange[0]);
    } else if (this.targetStrategy === 'last') {
      return inRange.reduce((min, e) => (e.distance < min.distance ? e : min), inRange[0]);
    } else if (this.targetStrategy === 'closest') {
      return inRange.reduce((closest, e) => {
        const d1 = Math.hypot(e.x - this.x, e.y - this.y);
        const d2 = Math.hypot(closest.x - this.x, closest.y - this.y);
        return d1 < d2 ? e : closest;
      }, inRange[0]);
    } else {
      // Default: 'first' (paling jauh menempuh lintasan)
      return inRange.reduce((max, e) => (e.distance > max.distance ? e : max), inRange[0]);
    }
  }

  shoot(target, enemies, projectiles, particles) {
    soundEngine.playShoot(this.attackType);

    const finalDamage = Math.round(this.damage * (1 + this.buffDamageBonus));
    let isCrit = false;

    // Check Critical Strike
    if (this.rawConfig.critChance && Math.random() < this.rawConfig.critChance) {
      isCrit = true;
    }

    const damageToDeal = isCrit ? Math.round(finalDamage * (this.rawConfig.critMultiplier || 2.0)) : finalDamage;

    if (this.attackType === 'laser') {
      // Instantly deals damage with beam visual
      target.takeDamage(damageToDeal, isCrit, 'laser', particles, this);
      particles.createMagicSpark(target.x, target.y, '#fbbf24', 8);
      particles.addShockwave(target.x, target.y, 25, '#fbbf24', 0.2);
      return;
    }

    if (this.attackType === 'supernova') {
      // Screen wide explosion
      for (const e of enemies) {
        if (!e.isDead && !e.reachedEnd) {
          const dist = Math.hypot(e.x - this.x, e.y - this.y);
          if (dist <= this.range * 1.5) {
            e.takeDamage(damageToDeal, isCrit, 'fire', particles, this);
            e.applyStatus('burn', this.rawConfig.burnDuration || 4, this.rawConfig.burnDamage || 40);
          }
        }
      }
      particles.createExplosion(this.x, this.y, '#ff0055', 24, 6, 6);
      particles.addShockwave(this.x, this.y, this.range, '#ff0055', 0.5);
      particles.addScreenShake(6);
      soundEngine.playExplosion();
      return;
    }

    // Spawn regular / special projectile
    projectiles.push(
      new Projectile({
        startX: this.x,
        startY: this.y,
        target,
        tower: this,
        damage: damageToDeal,
        isCrit,
        attackType: this.attackType,
        speed: (this.rawConfig.bulletSpeed || 8) * 45,
        color: this.bulletColor,
        config: this.rawConfig
      })
    );
  }
}

export class Projectile {
  constructor(opts) {
    this.x = opts.startX;
    this.y = opts.startY;
    this.target = opts.target;
    this.tower = opts.tower;
    this.damage = opts.damage;
    this.isCrit = opts.isCrit;
    this.attackType = opts.attackType;
    this.speed = opts.speed;
    this.color = opts.color;
    this.config = opts.config;
    this.isDead = false;

    this.targetX = opts.target.x;
    this.targetY = opts.target.y;
  }

  update(dt, enemies, particles) {
    if (this.isDead) return;

    if (!this.target.isDead && !this.target.reachedEnd) {
      this.targetX = this.target.x;
      this.targetY = this.target.y;
    }

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 10 || dist <= this.speed * dt) {
      this.hit(enemies, particles);
      this.isDead = true;
    } else {
      this.x += (dx / dist) * this.speed * dt;
      this.y += (dy / dist) * this.speed * dt;

      // Projectile particle trail
      if (Math.random() < 0.4) {
        particles.createMagicSpark(this.x, this.y, this.color, 1);
      }
    }
  }

  hit(enemies, particles) {
    if (this.attackType === 'aoe' || this.attackType === 'cosmic_meteor') {
      const radius = this.config.splashRadius || 55;
      soundEngine.playExplosion();
      particles.createExplosion(this.x, this.y, this.color, 18, 4.5, 4);
      particles.addShockwave(this.x, this.y, radius, this.color, 0.3);

      for (const e of enemies) {
        if (!e.isDead && !e.reachedEnd) {
          const dist = Math.hypot(e.x - this.x, e.y - this.y);
          if (dist <= radius) {
            e.takeDamage(this.damage, this.isCrit, this.attackType, particles, this.tower);
          }
        }
      }
    } else if (this.attackType === 'chain') {
      // Chain Lightning jump
      let currentTarget = this.target;
      let jumps = this.config.chainTargets || 4;
      const hitTargets = new Set();

      while (currentTarget && jumps > 0) {
        hitTargets.add(currentTarget);
        currentTarget.takeDamage(this.damage, this.isCrit, 'lightning', particles, this.tower);
        particles.createMagicSpark(currentTarget.x, currentTarget.y, '#c084fc', 8);

        // Find nearest next enemy
        let nextTarget = null;
        let nearestDist = 120;
        for (const e of enemies) {
          if (!e.isDead && !e.reachedEnd && !hitTargets.has(e)) {
            const d = Math.hypot(e.x - currentTarget.x, e.y - currentTarget.y);
            if (d < nearestDist) {
              nearestDist = d;
              nextTarget = e;
            }
          }
        }
        currentTarget = nextTarget;
        jumps--;
      }
    } else {
      // Single hit with status effects
      if (!this.target.isDead && !this.target.reachedEnd) {
        this.target.takeDamage(this.damage, this.isCrit, this.attackType, particles, this.tower);

        if (this.attackType === 'slow') {
          this.target.applyStatus('slow', this.config.slowDuration || 2.5, this.config.slowAmount || 0.45);
        } else if (this.attackType === 'dot') {
          this.target.applyStatus('poison', this.config.dotDuration || 3.5, this.config.dotDamage || 15);
        } else if (this.attackType === 'time_warp') {
          if (Math.random() < (this.config.freezeChance || 0.35)) {
            this.target.applyStatus('freeze', this.config.freezeDuration || 1.5);
          }
        } else if (this.attackType === 'glitch') {
          // Execute check
          if (this.target.hp / this.target.maxHp <= (this.config.executeHpThreshold || 0.15)) {
            this.target.takeDamage(999999, true, 'glitch_execute', particles, this.tower);
            particles.addFloatingText('DELETED!', this.target.x, this.target.y - 15, '#00f5d4', true, 16);
          }
        }

        particles.createMagicSpark(this.x, this.y, this.color, 4);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(Math.round(this.x), Math.round(this.y), 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class Enemy {
  constructor(data, pathManager, hpMultiplier = 1.0, speedMultiplier = 1.0, isBoss = false) {
    this.rawConfig = data;
    this.id = data.id;
    this.name = data.name;
    this.isBoss = isBoss;
    this.maxHp = Math.round((data.hp || 100) * hpMultiplier);
    this.hp = this.maxHp;
    this.baseSpeed = (data.speed || 1.0) * speedMultiplier * 36; // px per second
    this.speed = this.baseSpeed;
    this.armor = data.armor || 0;
    this.rewardGold = data.rewardGold || 15;
    this.rewardGems = data.rewardGems || 1;
    this.flying = !!data.flying;
    this.spriteKey = data.spriteKey;
    this.size = data.size || 20;

    this.distance = 0;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.isDead = false;
    this.reachedEnd = false;

    // Status effects
    this.status = {
      slowTimer: 0,
      slowAmount: 0,
      freezeTimer: 0,
      poisonTimer: 0,
      poisonDps: 0,
      burnTimer: 0,
      burnDps: 0
    };

    // Boss Ability
    this.bossAbility = data.ability || null;
    this.bossAbilityTimer = data.abilityCooldown || 6.0;
    this.shieldHp = 0;

    const pos = pathManager.getPositionAtDistance(0);
    this.x = pos.x;
    this.y = pos.y;
  }

  applyStatus(type, duration, value = 0) {
    if (type === 'slow') {
      this.status.slowTimer = Math.max(this.status.slowTimer, duration);
      this.status.slowAmount = Math.max(this.status.slowAmount, value);
    } else if (type === 'freeze') {
      this.status.freezeTimer = Math.max(this.status.freezeTimer, duration);
    } else if (type === 'poison') {
      this.status.poisonTimer = Math.max(this.status.poisonTimer, duration);
      this.status.poisonDps = value;
    } else if (type === 'burn') {
      this.status.burnTimer = Math.max(this.status.burnTimer, duration);
      this.status.burnDps = value;
    }
  }

  takeDamage(amount, isCrit = false, damageType = 'physical', particles = null, sourceTower = null) {
    if (this.isDead) return;

    // Shield absorption
    let effectiveDamage = amount;
    if (damageType !== 'laser' && damageType !== 'glitch_execute') {
      effectiveDamage = Math.max(1, amount - this.armor);
    }

    if (this.shieldHp > 0) {
      if (this.shieldHp >= effectiveDamage) {
        this.shieldHp -= effectiveDamage;
        if (particles) particles.addFloatingText('SHIELD', this.x, this.y, '#38bdf8', false, 11);
        return;
      } else {
        effectiveDamage -= this.shieldHp;
        this.shieldHp = 0;
      }
    }

    this.hp -= effectiveDamage;
    if (sourceTower) {
      sourceTower.totalDamageDealt += effectiveDamage;
    }

    if (particles) {
      const color = isCrit ? '#facc15' : damageType === 'fire' ? '#f97316' : '#ffffff';
      const prefix = isCrit ? 'CRIT! ' : '';
      particles.addFloatingText(`${prefix}-${effectiveDamage}`, this.x, this.y, color, isCrit);
    }

    if (this.hp <= 0) {
      this.hp = 0;
      this.isDead = true;
      if (sourceTower) sourceTower.kills++;
      soundEngine.playEnemyDeath();
    } else {
      if (isCrit) soundEngine.playCrit();
      else soundEngine.playHit();
    }
  }

  update(dt, pathManager, game) {
    if (this.isDead || this.reachedEnd) return;

    // Status effect ticks
    let currentSpeed = this.baseSpeed;

    if (this.status.freezeTimer > 0) {
      this.status.freezeTimer -= dt;
      currentSpeed = 0; // Frozen!
    } else if (this.status.slowTimer > 0) {
      this.status.slowTimer -= dt;
      currentSpeed *= 1.0 - this.status.slowAmount;
    }

    if (this.status.poisonTimer > 0) {
      this.status.poisonTimer -= dt;
      this.hp -= this.status.poisonDps * dt;
      if (this.hp <= 0) this.isDead = true;
    }

    if (this.status.burnTimer > 0) {
      this.status.burnTimer -= dt;
      this.hp -= this.status.burnDps * dt;
      if (this.hp <= 0) this.isDead = true;
    }

    // Pergerakan
    this.distance += currentSpeed * dt;
    const pos = pathManager.getPositionAtDistance(this.distance);
    this.x = pos.x;
    this.y = pos.y;
    this.angle = pos.angle;

    if (pos.reachedEnd) {
      this.reachedEnd = true;
    }

    // Boss Abilities
    if (this.isBoss && this.bossAbility) {
      this.updateBossAbilities(dt, game);
    }
  }

  updateBossAbilities(dt, game) {
    this.bossAbilityTimer -= dt;

    if (this.bossAbility === 'regeneration') {
      this.hp = Math.min(this.maxHp, this.hp + (this.rawConfig.healRate || 40) * dt);
    }

    if (this.bossAbilityTimer <= 0) {
      this.bossAbilityTimer = this.rawConfig.abilityCooldown || 6.5;

      if (this.bossAbility === 'summon_minions') {
        game.spawnMinions(this.x, this.y, 2, 'goblin');
        game.particles.addFloatingText('SUMMON!', this.x, this.y - 20, '#22c55e', true, 14);
      } else if (this.bossAbility === 'magic_shield' || this.bossAbility === 'avalanche') {
        this.shieldHp = Math.round(this.maxHp * 0.25);
        game.particles.addFloatingText('BARRIER!', this.x, this.y - 20, '#38bdf8', true, 14);
        game.particles.addShockwave(this.x, this.y, 40, '#38bdf8', 0.4);
      } else if (this.bossAbility === 'speed_dash') {
        this.distance += 45;
        game.particles.addFloatingText('DASH!', this.x, this.y - 20, '#f97316', true, 14);
      } else if (this.bossAbility === 'stun_towers') {
        game.stunNearbyTowers(this.x, this.y, 110, 2.5);
        game.particles.addFloatingText('EARTHQUAKE!', this.x, this.y - 20, '#fbbf24', true, 14);
        game.particles.addScreenShake(7);
      }
    }
  }

  draw(ctx, pixelRenderer) {
    if (this.isDead || this.reachedEnd) return;

    // Gambar Bayangan di Bawah Sprite
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + this.size / 2 - 2, this.size / 2, this.size / 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Gambar Sprite Monster
    pixelRenderer.drawSprite(ctx, this.spriteKey, this.x, this.y, this.size * 1.5, this.size * 1.5);

    // Status effect visual glow
    if (this.status.freezeTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      ctx.restore();
    } else if (this.status.poisonTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
      ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      ctx.restore();
    }

    // Health Bar
    const barWidth = Math.max(24, this.size * 1.4);
    const barHeight = this.isBoss ? 6 : 4;
    const barX = this.x - barWidth / 2;
    const barY = this.y - this.size / 2 - (this.isBoss ? 12 : 8);

    ctx.save();
    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(Math.floor(barX - 1), Math.floor(barY - 1), Math.floor(barWidth + 2), Math.floor(barHeight + 2));

    // Fill
    const hpRatio = Math.max(0, this.hp / this.maxHp);
    ctx.fillStyle = this.isBoss ? '#ef4444' : hpRatio > 0.5 ? '#22c55e' : hpRatio > 0.25 ? '#eab308' : '#dc2626';
    ctx.fillRect(Math.floor(barX), Math.floor(barY), Math.floor(barWidth * hpRatio), Math.floor(barHeight));

    // Shield Bar jika ada
    if (this.shieldHp > 0) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(Math.floor(barX), Math.floor(barY - 3), Math.floor(barWidth), 2);
    }

    ctx.restore();
  }
}
