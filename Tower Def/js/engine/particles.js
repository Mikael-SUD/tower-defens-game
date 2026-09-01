/**
 * Particle & Visual VFX System (Floating Damage, Explosions, Shockwaves, Projectile Trails)
 */

export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
    this.shockwaves = [];
    this.shakeIntensity = 0;
    this.shakeDecay = 0.9;
  }

  /**
   * Memicu screen shake
   */
  addScreenShake(amount = 8) {
    this.shakeIntensity = Math.max(this.shakeIntensity, amount);
  }

  /**
   * Menambahkan floating combat text
   */
  addFloatingText(text, x, y, color = '#ffffff', isCrit = false, size = 12) {
    this.floatingTexts.push({
      text,
      x: x + (Math.random() * 8 - 4),
      y: y - 5,
      vy: -1.2,
      life: 1.0,
      maxLife: 1.0,
      color,
      isCrit,
      size: isCrit ? size * 1.35 : size
    });
  }

  /**
   * Menambahkan ledakan partikel
   */
  createExplosion(x, y, color = '#f97316', count = 16, maxSpeed = 3.5, size = 4) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
      const speed = Math.random() * maxSpeed + 1.0;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * size + 2,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02
      });
    }
  }

  /**
   * Partikel percikan sihir / elemen
   */
  createMagicSpark(x, y, color = '#38bdf8', count = 6) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.0;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 2.5 + 1.5,
        life: 1.0,
        decay: 0.04
      });
    }
  }

  /**
   * Menambahkan gelombang kejut cincin (Shockwave)
   */
  addShockwave(x, y, maxRadius = 45, color = '#ffffff', duration = 0.4) {
    this.shockwaves.push({
      x,
      y,
      radius: 4,
      maxRadius,
      color,
      life: 1.0,
      decay: 1.0 / (duration * 60)
    });
  }

  /**
   * Update semua partikel dan efek per frame (dt dalam detik)
   */
  update(dt) {
    // Screen shake update
    if (this.shakeIntensity > 0.1) {
      this.shakeIntensity *= this.shakeDecay;
    } else {
      this.shakeIntensity = 0;
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.life -= p.decay * dt * 60;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update Floating Text
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy * dt * 60;
      ft.life -= (1 / 60) * dt * 60;
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.15 * dt * 60;
      sw.life -= sw.decay * dt * 60;
      if (sw.life <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }
  }

  /**
   * Render semua partikel, shockwaves, dan text
   */
  draw(ctx) {
    // 1. Shockwaves
    for (const sw of this.shockwaves) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = Math.max(1, 4 * sw.life);
      ctx.globalAlpha = sw.life;
      ctx.stroke();
      ctx.restore();
    }

    // 2. Particles
    for (const p of this.particles) {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillRect(
        Math.floor(p.x - p.size / 2),
        Math.floor(p.y - p.size / 2),
        Math.floor(p.size),
        Math.floor(p.size)
      );
      ctx.restore();
    }

    // 3. Floating Combat Text
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.font = `bold ${Math.round(ft.size)}px 'Courier New', monospace`;
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = Math.max(0, ft.life);
      ctx.textAlign = 'center';

      // Outline hitam tebal pixelated
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }
}
