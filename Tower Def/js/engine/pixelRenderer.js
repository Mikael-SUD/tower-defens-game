/**
 * Pixel Renderer Engine (32x32 Native Sprite Generator & Canvas Painter)
 * Menghasilkan sprite pixel-art resolusi 32x32 tajam (crisp integer pixelated rendering)
 */

export class PixelRenderer {
  constructor() {
    this.spriteCache = new Map();
    this.initSprites();
  }

  /**
   * Helper untuk membuat canvas kecil 32x32 pixel
   */
  createCanvas32(width = 32, height = 32) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return { canvas, ctx };
  }

  /**
   * Menggambar pixel rectangle dengan grid koordinat
   */
  drawRect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  }

  /**
   * Inisialisasi dan cache seluruh sprite game
   */
  initSprites() {
    this.generateTileSprites();
    this.generateTowerSprites();
    this.generateEnemySprites();
    this.generateBossSprites();
    this.generateProjectileSprites();
  }

  // ================= TILE SPRITES =================
  generateTileSprites() {
    // Grass Tile
    const { canvas: grass, ctx: gCtx } = this.createCanvas32();
    this.drawRect(gCtx, 0, 0, 32, 32, '#2d6a4f');
    this.drawRect(gCtx, 2, 2, 4, 3, '#40916c');
    this.drawRect(gCtx, 16, 6, 3, 4, '#52b788');
    this.drawRect(gCtx, 22, 20, 4, 3, '#1b4332');
    this.drawRect(gCtx, 6, 22, 3, 3, '#40916c');
    this.spriteCache.set('tile_grass_forest', grass);

    // Path Tile
    const { canvas: path, ctx: pCtx } = this.createCanvas32();
    this.drawRect(pCtx, 0, 0, 32, 32, '#997b66');
    this.drawRect(pCtx, 0, 0, 32, 2, '#6c584c');
    this.drawRect(pCtx, 0, 30, 32, 2, '#6c584c');
    this.drawRect(pCtx, 4, 8, 3, 2, '#b08968');
    this.drawRect(pCtx, 18, 14, 4, 2, '#b08968');
    this.drawRect(pCtx, 10, 22, 3, 2, '#7f5539');
    this.spriteCache.set('tile_path_forest', path);

    // Lava Tile
    const { canvas: lava, ctx: lCtx } = this.createCanvas32();
    this.drawRect(lCtx, 0, 0, 32, 32, '#dc2626');
    this.drawRect(lCtx, 4, 6, 8, 6, '#f97316');
    this.drawRect(lCtx, 16, 14, 10, 8, '#f59e0b');
    this.drawRect(lCtx, 8, 22, 6, 4, '#fde047');
    this.spriteCache.set('tile_lava', lava);

    // Ice Tile
    const { canvas: ice, ctx: iCtx } = this.createCanvas32();
    this.drawRect(iCtx, 0, 0, 32, 32, '#bae6fd');
    this.drawRect(iCtx, 4, 4, 10, 4, '#e0f2fe');
    this.drawRect(iCtx, 18, 16, 8, 5, '#7dd3fc');
    this.drawRect(iCtx, 6, 20, 6, 6, '#38bdf8');
    this.spriteCache.set('tile_ice', ice);

    // Void Tile
    const { canvas: voidTile, ctx: vCtx } = this.createCanvas32();
    this.drawRect(vCtx, 0, 0, 32, 32, '#1e1035');
    this.drawRect(vCtx, 6, 8, 3, 3, '#a855f7');
    this.drawRect(vCtx, 20, 18, 4, 4, '#00f5d4');
    this.drawRect(vCtx, 14, 24, 2, 2, '#e0aaff');
    this.spriteCache.set('tile_void', voidTile);

    // Base Castle Tile
    const { canvas: castle, ctx: cCtx } = this.createCanvas32();
    this.drawRect(cCtx, 2, 8, 28, 22, '#475569');
    this.drawRect(cCtx, 4, 2, 6, 6, '#334155');
    this.drawRect(cCtx, 13, 2, 6, 6, '#334155');
    this.drawRect(cCtx, 22, 2, 6, 6, '#334155');
    this.drawRect(cCtx, 11, 18, 10, 14, '#0f172a');
    this.drawRect(cCtx, 14, 8, 4, 4, '#38bdf8'); // Gem crystal
    this.spriteCache.set('tile_castle', castle);

    // Spawner Portal Tile
    const { canvas: portal, ctx: poCtx } = this.createCanvas32();
    this.drawRect(poCtx, 2, 2, 28, 28, '#1e1b4b');
    this.drawRect(poCtx, 6, 6, 20, 20, '#6366f1');
    this.drawRect(poCtx, 10, 10, 12, 12, '#a855f7');
    this.drawRect(poCtx, 13, 13, 6, 6, '#f43f5e');
    this.spriteCache.set('tile_portal', portal);
  }

  // ================= TOWER SPRITES =================
  generateTowerSprites() {
    // 1. Archer Guard (Common)
    const { canvas: tArch, ctx: aCtx } = this.createCanvas32();
    this.drawRect(aCtx, 8, 22, 16, 8, '#718096'); // Stone pedestal
    this.drawRect(aCtx, 12, 12, 8, 10, '#38a169'); // Green tunic
    this.drawRect(aCtx, 12, 6, 8, 6, '#fbd38d'); // Head
    this.drawRect(aCtx, 10, 4, 12, 4, '#276749'); // Hat
    this.drawRect(aCtx, 20, 10, 4, 14, '#b7791f'); // Wooden Bow
    this.drawRect(aCtx, 22, 8, 2, 2, '#e2e8f0'); // Arrow tip
    this.spriteCache.set('tower_archer', tArch);

    // 2. Stone Slinger (Common)
    const { canvas: tStone, ctx: stCtx } = this.createCanvas32();
    this.drawRect(stCtx, 6, 20, 20, 10, '#4a5568');
    this.drawRect(stCtx, 10, 10, 12, 10, '#975a16');
    this.drawRect(stCtx, 12, 4, 8, 6, '#e2e8f0');
    this.drawRect(stCtx, 20, 8, 8, 8, '#718096'); // Big rock
    this.spriteCache.set('tower_stone', tStone);

    // 3. Javelin Scout (Common)
    const { canvas: tFoot, ctx: fCtx } = this.createCanvas32();
    this.drawRect(fCtx, 8, 22, 16, 8, '#475569');
    this.drawRect(fCtx, 11, 10, 10, 12, '#3182ce');
    this.drawRect(fCtx, 12, 4, 8, 6, '#fed7aa');
    this.drawRect(fCtx, 22, 2, 3, 26, '#a0aec0'); // Javelin
    this.spriteCache.set('tower_footman', fFoot);

    // 4. Frost Mage (Rare)
    const { canvas: tFrost, ctx: frCtx } = this.createCanvas32();
    this.drawRect(frCtx, 6, 22, 20, 8, '#1e3a8a');
    this.drawRect(frCtx, 10, 10, 12, 12, '#2563eb');
    this.drawRect(frCtx, 8, 4, 16, 6, '#60a5fa'); // Frost hood
    this.drawRect(frCtx, 12, 7, 8, 5, '#e0f2fe');
    this.drawRect(frCtx, 22, 6, 6, 6, '#38bdf8'); // Ice orb
    this.spriteCache.set('tower_frost', tFrost);

    // 5. Poison Alchemist (Rare)
    const { canvas: tPois, ctx: pCtx } = this.createCanvas32();
    this.drawRect(pCtx, 6, 22, 20, 8, '#14532d');
    this.drawRect(pCtx, 10, 10, 12, 12, '#16a34a');
    this.drawRect(pCtx, 11, 4, 10, 6, '#fef08a'); // Mask
    this.drawRect(pCtx, 20, 8, 8, 10, '#22c55e'); // Poison vial
    this.drawRect(pCtx, 22, 6, 4, 3, '#bbf7d0');
    this.spriteCache.set('tower_poison', tPois);

    // 6. Crossbow Sniper (Rare)
    const { canvas: tSnip, ctx: snCtx } = this.createCanvas32();
    this.drawRect(snCtx, 6, 22, 20, 8, '#334155');
    this.drawRect(snCtx, 10, 12, 12, 10, '#78350f');
    this.drawRect(snCtx, 12, 5, 8, 7, '#d97706');
    this.drawRect(snCtx, 16, 8, 14, 6, '#fbbf24'); // Crossbow
    this.drawRect(snCtx, 26, 6, 4, 10, '#475569');
    this.spriteCache.set('tower_sniper', tSnip);

    // 7. Thunder Shaman (Epic)
    const { canvas: tThund, ctx: thCtx } = this.createCanvas32();
    this.drawRect(thCtx, 6, 20, 20, 10, '#4c1d95');
    this.drawRect(thCtx, 10, 10, 12, 10, '#6d28d9');
    this.drawRect(thCtx, 11, 4, 10, 6, '#a78bfa');
    this.drawRect(thCtx, 22, 4, 5, 20, '#c084fc'); // Lightning staff
    this.drawRect(thCtx, 20, 2, 9, 6, '#facc15'); // Thunder tip
    this.spriteCache.set('tower_thunder', tThund);

    // 8. Flame Cannon (Epic)
    const { canvas: tCann, ctx: caCtx } = this.createCanvas32();
    this.drawRect(caCtx, 4, 20, 24, 10, '#1c1917');
    this.drawRect(caCtx, 8, 12, 16, 10, '#7c2d12');
    this.drawRect(caCtx, 12, 4, 14, 10, '#ea580c'); // Cannon barrel
    this.drawRect(caCtx, 22, 6, 6, 6, '#f97316');
    this.spriteCache.set('tower_cannon', tCann);

    // 9. Shadow Blade (Epic)
    const { canvas: tShad, ctx: shCtx } = this.createCanvas32();
    this.drawRect(shCtx, 6, 22, 20, 8, '#09090b');
    this.drawRect(shCtx, 10, 10, 12, 12, '#27272a');
    this.drawRect(shCtx, 11, 4, 10, 6, '#52525b');
    this.drawRect(shCtx, 12, 6, 8, 2, '#a855f7'); // Glowing eyes
    this.drawRect(shCtx, 22, 6, 8, 12, '#c084fc'); // Shadow blade
    this.spriteCache.set('tower_shadow', tShad);

    // 10. Holy Paladin (Legendary)
    const { canvas: tPal, ctx: paCtx } = this.createCanvas32();
    this.drawRect(paCtx, 4, 20, 24, 10, '#854d0e');
    this.drawRect(paCtx, 8, 8, 16, 12, '#ca8a04');
    this.drawRect(paCtx, 10, 2, 12, 8, '#fef08a'); // Golden helm
    this.drawRect(paCtx, 22, 4, 8, 16, '#fde047'); // Holy Hammer
    this.drawRect(paCtx, 4, 10, 6, 10, '#ffffff'); // Holy shield
    this.spriteCache.set('tower_paladin', tPal);

    // 11. Void Sorcerer (Legendary)
    const { canvas: tVoid, ctx: voCtx } = this.createCanvas32();
    this.drawRect(voCtx, 4, 20, 24, 10, '#2e1065');
    this.drawRect(voCtx, 8, 8, 16, 12, '#581c87');
    this.drawRect(voCtx, 10, 3, 12, 8, '#7e22ce');
    this.drawRect(voCtx, 20, 4, 10, 10, '#a855f7'); // Void vortex
    this.drawRect(voCtx, 23, 7, 4, 4, '#00f5d4');
    this.spriteCache.set('tower_void', tVoid);

    // 12. Dragon Knight (Legendary)
    const { canvas: tDrag, ctx: drCtx } = this.createCanvas32();
    this.drawRect(drCtx, 4, 20, 24, 10, '#7f1d1d');
    this.drawRect(drCtx, 8, 8, 16, 12, '#b91c1c');
    this.drawRect(drCtx, 10, 2, 12, 8, '#dc2626');
    this.drawRect(drCtx, 20, 6, 10, 14, '#f87171'); // Dragon lance
    this.drawRect(drCtx, 24, 2, 4, 6, '#fbbf24'); // Flame tip
    this.spriteCache.set('tower_dragon', tDrag);

    // 13. Phoenix Sovereign (Mythic)
    const { canvas: tPhoen, ctx: phCtx } = this.createCanvas32();
    this.drawRect(phCtx, 2, 18, 28, 12, '#450a0a');
    this.drawRect(phCtx, 6, 6, 20, 14, '#ef4444');
    this.drawRect(phCtx, 2, 4, 8, 12, '#f97316'); // Fire wing left
    this.drawRect(phCtx, 22, 4, 8, 12, '#f97316'); // Fire wing right
    this.drawRect(phCtx, 12, 2, 8, 8, '#fbbf24'); // Phoenix crown
    this.drawRect(phCtx, 14, 10, 4, 6, '#ffffff'); // Core light
    this.spriteCache.set('tower_phoenix', tPhoen);

    // 14. Chronomancer (Mythic)
    const { canvas: tChron, ctx: chCtx } = this.createCanvas32();
    this.drawRect(chCtx, 2, 18, 28, 12, '#082f49');
    this.drawRect(chCtx, 6, 8, 20, 12, '#0284c7');
    this.drawRect(chCtx, 10, 2, 12, 8, '#38bdf8');
    this.drawRect(chCtx, 20, 4, 10, 12, '#facc15'); // Hourglass
    this.drawRect(chCtx, 22, 6, 6, 8, '#0ea5e9'); // Time sand
    this.spriteCache.set('tower_chrono', tChron);

    // 15. Celestial Arbiter (Mythic)
    const { canvas: tCel, ctx: ceCtx } = this.createCanvas32();
    this.drawRect(ceCtx, 2, 18, 28, 12, '#713f12');
    this.drawRect(ceCtx, 6, 6, 20, 14, '#eab308');
    this.drawRect(ceCtx, 10, 2, 12, 6, '#fef08a');
    this.drawRect(ceCtx, 2, 2, 8, 8, '#67e8f9'); // Cosmic wing
    this.drawRect(ceCtx, 22, 2, 8, 8, '#67e8f9'); // Cosmic wing
    this.drawRect(ceCtx, 14, 8, 4, 8, '#ffffff'); // Core prism
    this.spriteCache.set('tower_celestial', tCel);

    // 16. Glitch Overlord (Secret)
    const { canvas: tGlit, ctx: glCtx } = this.createCanvas32();
    this.drawRect(glCtx, 2, 18, 28, 12, '#042f2e');
    this.drawRect(glCtx, 6, 6, 20, 14, '#0f766e');
    this.drawRect(glCtx, 4, 4, 10, 6, '#00f5d4');
    this.drawRect(glCtx, 18, 2, 10, 8, '#ff0055');
    this.drawRect(glCtx, 10, 10, 12, 4, '#70e000');
    this.drawRect(glCtx, 8, 16, 16, 2, '#ffffff');
    this.spriteCache.set('tower_glitch', tGlit);

    // 17. Cosmic Titan (Secret)
    const { canvas: tTit, ctx: tiCtx } = this.createCanvas32();
    this.drawRect(tiCtx, 0, 16, 32, 14, '#1e1035');
    this.drawRect(tiCtx, 4, 4, 24, 16, '#581c87');
    this.drawRect(tiCtx, 8, 2, 16, 8, '#c084fc');
    this.drawRect(tiCtx, 12, 6, 8, 4, '#00f5d4'); // Cosmic visor
    this.drawRect(tiCtx, 0, 6, 6, 8, '#e0aaff'); // Left shoulder
    this.drawRect(tiCtx, 26, 6, 6, 8, '#e0aaff'); // Right shoulder
    this.spriteCache.set('tower_titan', tTit);
  }

  // ================= ENEMY SPRITES =================
  generateEnemySprites() {
    // Goblin
    const { canvas: eGob, ctx: gCtx } = this.createCanvas32();
    this.drawRect(gCtx, 8, 10, 16, 14, '#22c55e');
    this.drawRect(gCtx, 6, 6, 20, 8, '#16a34a'); // Head & ears
    this.drawRect(gCtx, 10, 8, 4, 4, '#ef4444'); // Red eye
    this.drawRect(gCtx, 18, 8, 4, 4, '#ef4444');
    this.drawRect(gCtx, 10, 24, 4, 6, '#15803d'); // Legs
    this.drawRect(gCtx, 18, 24, 4, 6, '#15803d');
    this.spriteCache.set('enemy_goblin', eGob);

    // Orc
    const { canvas: eOrc, ctx: oCtx } = this.createCanvas32();
    this.drawRect(oCtx, 6, 8, 20, 16, '#15803d');
    this.drawRect(oCtx, 8, 4, 16, 8, '#166534');
    this.drawRect(oCtx, 4, 12, 6, 6, '#718096'); // Armor plate
    this.drawRect(oCtx, 10, 24, 5, 6, '#14532d');
    this.drawRect(oCtx, 17, 24, 5, 6, '#14532d');
    this.spriteCache.set('enemy_orc', eOrc);

    // Skeleton
    const { canvas: eSkel, ctx: skCtx } = this.createCanvas32();
    this.drawRect(skCtx, 8, 4, 16, 12, '#e2e8f0');
    this.drawRect(skCtx, 10, 8, 4, 4, '#0f172a'); // Eye sockets
    this.drawRect(skCtx, 18, 8, 4, 4, '#0f172a');
    this.drawRect(skCtx, 11, 16, 10, 8, '#cbd5e0'); // Ribs
    this.drawRect(skCtx, 11, 24, 3, 6, '#94a3b8');
    this.drawRect(skCtx, 18, 24, 3, 6, '#94a3b8');
    this.spriteCache.set('enemy_skeleton', eSkel);

    // Wolf
    const { canvas: eWolf, ctx: wCtx } = this.createCanvas32();
    this.drawRect(wCtx, 6, 10, 20, 12, '#64748b');
    this.drawRect(wCtx, 22, 6, 8, 8, '#475569'); // Snout
    this.drawRect(wCtx, 24, 6, 3, 3, '#dc2626'); // Red eye
    this.drawRect(wCtx, 2, 8, 6, 6, '#334155'); // Tail
    this.drawRect(wCtx, 8, 22, 4, 6, '#334155');
    this.drawRect(wCtx, 18, 22, 4, 6, '#334155');
    this.spriteCache.set('enemy_wolf', eWolf);

    // Bat
    const { canvas: eBat, ctx: bCtx } = this.createCanvas32();
    this.drawRect(bCtx, 12, 10, 8, 10, '#581c87');
    this.drawRect(bCtx, 2, 8, 10, 8, '#7e22ce'); // Left wing
    this.drawRect(bCtx, 20, 8, 10, 8, '#7e22ce'); // Right wing
    this.drawRect(bCtx, 14, 12, 2, 2, '#f43f5e');
    this.drawRect(bCtx, 17, 12, 2, 2, '#f43f5e');
    this.spriteCache.set('enemy_bat', eBat);

    // Golem
    const { canvas: eGol, ctx: goCtx } = this.createCanvas32();
    this.drawRect(goCtx, 4, 6, 24, 20, '#475569');
    this.drawRect(goCtx, 8, 2, 16, 8, '#64748b');
    this.drawRect(goCtx, 10, 6, 4, 4, '#38bdf8'); // Glowing eye
    this.drawRect(goCtx, 18, 6, 4, 4, '#38bdf8');
    this.drawRect(goCtx, 8, 24, 6, 6, '#334155');
    this.drawRect(goCtx, 18, 24, 6, 6, '#334155');
    this.spriteCache.set('enemy_golem', eGol);

    // Fire Sprite
    const { canvas: eFire, ctx: fiCtx } = this.createCanvas32();
    this.drawRect(fiCtx, 8, 6, 16, 18, '#dc2626');
    this.drawRect(fiCtx, 10, 4, 12, 14, '#ea580c');
    this.drawRect(fiCtx, 12, 6, 8, 8, '#f59e0b');
    this.drawRect(fiCtx, 14, 8, 4, 4, '#fef08a');
    this.spriteCache.set('enemy_fire', eFire);

    // Ice Wraith
    const { canvas: eIce, ctx: icCtx } = this.createCanvas32();
    this.drawRect(icCtx, 8, 4, 16, 20, '#0284c7');
    this.drawRect(icCtx, 10, 6, 12, 14, '#38bdf8');
    this.drawRect(icCtx, 12, 8, 8, 8, '#bae6fd');
    this.drawRect(icCtx, 10, 22, 12, 6, '#e0f2fe');
    this.spriteCache.set('enemy_ice', eIce);

    // Void Crawler
    const { canvas: eVo, ctx: vcCtx } = this.createCanvas32();
    this.drawRect(vcCtx, 6, 8, 20, 16, '#3b0764');
    this.drawRect(vcCtx, 10, 4, 12, 8, '#6b21a8');
    this.drawRect(vcCtx, 12, 6, 8, 4, '#00f5d4'); // Alien eye
    this.drawRect(vcCtx, 4, 18, 6, 8, '#a855f7');
    this.drawRect(vcCtx, 22, 18, 6, 8, '#a855f7');
    this.spriteCache.set('enemy_void', eVo);
  }

  // ================= BOSS SPRITES =================
  generateBossSprites() {
    // 1. Goblin King
    const { canvas: b1, ctx: c1 } = this.createCanvas32(48, 48);
    this.drawRect(c1, 10, 12, 28, 26, '#15803d');
    this.drawRect(c1, 12, 4, 24, 12, '#facc15'); // Gold Crown
    this.drawRect(c1, 16, 8, 4, 4, '#dc2626'); // Crown gem
    this.drawRect(c1, 14, 18, 6, 6, '#ef4444'); // Eyes
    this.drawRect(c1, 28, 18, 6, 6, '#ef4444');
    this.drawRect(c1, 4, 16, 8, 12, '#166534'); // Big Ears
    this.drawRect(c1, 36, 16, 8, 12, '#166534');
    this.spriteCache.set('boss_goblin_king', b1);

    // 2. Treant Ancient
    const { canvas: b2, ctx: c2 } = this.createCanvas32(48, 48);
    this.drawRect(c2, 8, 10, 32, 32, '#3f2e18');
    this.drawRect(c2, 4, 2, 40, 14, '#15803d'); // Foliage
    this.drawRect(c2, 14, 20, 6, 6, '#22c55e'); // Green eyes
    this.drawRect(c2, 28, 20, 6, 6, '#22c55e');
    this.spriteCache.set('boss_treant', b2);

    // 3. Dire Alpha
    const { canvas: b3, ctx: c3 } = this.createCanvas32(48, 48);
    this.drawRect(c3, 8, 14, 32, 22, '#334155');
    this.drawRect(c3, 32, 8, 14, 14, '#1e293b'); // Wolf head
    this.drawRect(c3, 36, 10, 4, 4, '#ef4444'); // Glowing eye
    this.drawRect(c3, 2, 12, 10, 10, '#0f172a'); // Bushy tail
    this.spriteCache.set('boss_wolf', b3);

    // 4. Forest Witch
    const { canvas: b4, ctx: c4 } = this.createCanvas32(48, 48);
    this.drawRect(c4, 14, 16, 20, 26, '#581c87');
    this.drawRect(c4, 10, 4, 28, 14, '#3b0764'); // Witch hat
    this.drawRect(c4, 18, 18, 4, 4, '#c084fc');
    this.drawRect(c4, 26, 18, 4, 4, '#c084fc');
    this.spriteCache.set('boss_witch', b4);

    // 5. Earth Golem
    const { canvas: b5, ctx: c5 } = this.createCanvas32(48, 48);
    this.drawRect(c5, 6, 8, 36, 34, '#57534e');
    this.drawRect(c5, 12, 2, 24, 10, '#78716c');
    this.drawRect(c5, 14, 14, 6, 6, '#f59e0b');
    this.drawRect(c5, 28, 14, 6, 6, '#f59e0b');
    this.spriteCache.set('boss_earth_golem', b5);

    // 6. Forest Dragon (Ch1 Finale Boss)
    const { canvas: b6, ctx: c6 } = this.createCanvas32(56, 56);
    this.drawRect(c6, 12, 14, 32, 28, '#047857');
    this.drawRect(c6, 2, 10, 12, 20, '#059669'); // Wings
    this.drawRect(c6, 42, 10, 12, 20, '#059669');
    this.drawRect(c6, 20, 4, 16, 14, '#10b981'); // Dragon Head
    this.drawRect(c6, 24, 8, 4, 4, '#fbbf24');
    this.drawRect(c6, 22, 40, 12, 12, '#065f46'); // Tail
    this.spriteCache.set('boss_sylvan', b6);

    // Volcanic Hydra (Ch2 Finale Boss)
    const { canvas: bHydra, ctx: cHydra } = this.createCanvas32(56, 56);
    this.drawRect(cHydra, 12, 18, 32, 26, '#991b1b');
    this.drawRect(cHydra, 4, 6, 12, 14, '#dc2626'); // Head 1
    this.drawRect(cHydra, 22, 2, 12, 16, '#ef4444'); // Head 2
    this.drawRect(cHydra, 40, 6, 12, 14, '#dc2626'); // Head 3
    this.spriteCache.set('boss_hydra', bHydra);

    // Frost Sovereign (Ch3 Finale Boss)
    const { canvas: bFrost, ctx: cFrost } = this.createCanvas32(56, 56);
    this.drawRect(cFrost, 10, 12, 36, 32, '#0284c7');
    this.drawRect(cFrost, 16, 2, 24, 14, '#bae6fd'); // Ice Crown
    this.drawRect(cFrost, 2, 14, 10, 24, '#7dd3fc'); // Frozen Wings
    this.drawRect(cFrost, 44, 14, 10, 24, '#7dd3fc');
    this.drawRect(cFrost, 24, 20, 8, 8, '#ffffff'); // Heart of Winter
    this.spriteCache.set('boss_frost_sovereign', bFrost);

    // Omega Cosmic Primordial (Ch4 Final Ultimate Boss)
    const { canvas: bOmega, ctx: cOmega } = this.createCanvas32(64, 64);
    this.drawRect(cOmega, 12, 14, 40, 36, '#1e1035');
    this.drawRect(cOmega, 18, 4, 28, 14, '#581c87');
    this.drawRect(cOmega, 2, 10, 12, 34, '#7e22ce'); // Left Rift Ring
    this.drawRect(cOmega, 50, 10, 12, 34, '#7e22ce'); // Right Rift Ring
    this.drawRect(cOmega, 22, 20, 20, 12, '#00f5d4'); // Cosmic Eye of Truth
    this.drawRect(cOmega, 28, 24, 8, 4, '#ffffff');
    this.spriteCache.set('boss_omega', bOmega);
  }

  // ================= PROJECTILE SPRITES =================
  generateProjectileSprites() {
    // Arrow
    const { canvas: pArr, ctx: paCtx } = this.createCanvas32(16, 16);
    this.drawRect(paCtx, 0, 7, 12, 2, '#92400e');
    this.drawRect(paCtx, 12, 6, 4, 4, '#cbd5e0');
    this.spriteCache.set('proj_arrow', pArr);

    // Cannonball
    const { canvas: pBall, ctx: pbCtx } = this.createCanvas32(16, 16);
    this.drawRect(pbCtx, 4, 4, 8, 8, '#1e293b');
    this.drawRect(pbCtx, 6, 6, 4, 4, '#ea580c');
    this.spriteCache.set('proj_cannon', pBall);

    // Frost Shard
    const { canvas: pIce, ctx: piCtx } = this.createCanvas32(16, 16);
    this.drawRect(piCtx, 4, 2, 8, 12, '#38bdf8');
    this.drawRect(piCtx, 6, 4, 4, 8, '#e0f2fe');
    this.spriteCache.set('proj_frost', pIce);

    // Poison Drop
    const { canvas: pPois, ctx: ppCtx } = this.createCanvas32(16, 16);
    this.drawRect(ppCtx, 4, 4, 8, 8, '#22c55e');
    this.drawRect(ppCtx, 6, 6, 4, 4, '#86efac');
    this.spriteCache.set('proj_poison', pPois);

    // Laser / Cosmic Ray
    const { canvas: pCos, ctx: pcCtx } = this.createCanvas32(24, 8);
    this.drawRect(pcCtx, 0, 1, 24, 6, '#00f5d4');
    this.drawRect(pcCtx, 4, 2, 16, 4, '#ffffff');
    this.spriteCache.set('proj_cosmic', pCos);
  }

  /**
   * Mengambil gambar sprite dari cache
   */
  getSprite(key) {
    return this.spriteCache.get(key) || null;
  }

  /**
   * Menggambar Sprite di Canvas utama dengan efek pixelated
   */
  drawSprite(ctx, key, x, y, width = 32, height = 32, rotation = 0, opacity = 1.0) {
    const sprite = this.spriteCache.get(key);
    if (!sprite) return;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(Math.round(x), Math.round(y));

    if (rotation !== 0) {
      ctx.rotate(rotation);
    }

    ctx.drawImage(
      sprite,
      Math.round(-width / 2),
      Math.round(-height / 2),
      Math.round(width),
      Math.round(height)
    );
    ctx.restore();
  }
}
