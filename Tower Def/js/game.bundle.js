/**
 * PIXEL TOWER DEFENSE 2D - UNIVERSAL STANDALONE BUNDLE
 * Berfungsi 100% baik via file:/// (Direct Double-Click) maupun HTTP Server (No CORS issues)
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CONFIG: TOWERS & RARITIES
  // ==========================================
  const RARITIES = {
    common: {
      name: 'Common',
      color: '#a0aec0',
      border: '#718096',
      glow: 'rgba(160, 174, 192, 0.4)',
      weight: 50.0,
      textColor: '#cbd5e0',
      stars: 1
    },
    rare: {
      name: 'Rare',
      color: '#4299e1',
      border: '#2b6cb0',
      glow: 'rgba(66, 153, 225, 0.5)',
      weight: 30.0,
      textColor: '#63b3ed',
      stars: 2
    },
    epic: {
      name: 'Epic',
      color: '#9f7aea',
      border: '#6b46c1',
      glow: 'rgba(159, 122, 234, 0.6)',
      weight: 14.0,
      textColor: '#b794f4',
      stars: 3
    },
    legendary: {
      name: 'Legendary',
      color: '#ecc94b',
      border: '#b7791f',
      glow: 'rgba(236, 201, 75, 0.7)',
      weight: 4.8,
      textColor: '#f6e05e',
      stars: 4
    },
    mythic: {
      name: 'Mythic',
      color: '#f56565',
      border: '#c53030',
      glow: 'rgba(245, 101, 101, 0.85)',
      weight: 1.0,
      textColor: '#fc8181',
      stars: 5
    },
    secret: {
      name: 'Secret',
      color: '#00f5d4',
      border: '#00bbf9',
      glow: 'rgba(0, 245, 212, 0.95)',
      weight: 0.2,
      textColor: '#70e000',
      stars: 6
    }
  };

  const TOWERS_DATA = {
    // COMMON
    archer: {
      id: 'archer',
      name: 'Archer Guard',
      rarity: 'common',
      cost: 100,
      upgradeBaseCost: 75,
      damage: 18,
      range: 120,
      attackSpeed: 1.2,
      attackType: 'single',
      bulletSpeed: 7,
      bulletColor: '#e2e8f0',
      spriteKey: 'tower_archer',
      icon: '🏹',
      description: 'Menembakkan panah tajam dengan kecepatan stabil ke satu target.',
      lore: 'Penjaga garis depan kerajaan dengan bidikan busur teruji di berbagai pertempuran.'
    },
    rock_slinger: {
      id: 'rock_slinger',
      name: 'Stone Slinger',
      rarity: 'common',
      cost: 120,
      upgradeBaseCost: 90,
      damage: 32,
      range: 105,
      attackSpeed: 0.7,
      attackType: 'single',
      bulletSpeed: 5,
      bulletColor: '#a0aec0',
      spriteKey: 'tower_stone',
      icon: '🪨',
      knockback: 6,
      description: 'Melemparkan batu besar yang menghasilkan damage pukulan berat dan knockback kecil.',
      lore: 'Petarung suku gunung yang lihai mengayunkan tali ketapel batu granit raksasa.'
    },
    footman: {
      id: 'footman',
      name: 'Javelin Scout',
      rarity: 'common',
      cost: 110,
      upgradeBaseCost: 80,
      damage: 22,
      range: 110,
      attackSpeed: 1.0,
      attackType: 'pierce',
      pierceCount: 2,
      bulletSpeed: 6.5,
      bulletColor: '#cbd5e0',
      spriteKey: 'tower_footman',
      icon: '🗡️',
      description: 'Melemparkan tombak javelin yang dapat menembus hingga 2 monster sekaligus.',
      lore: 'Prajurit tombak ringan yang ahli menyerang formasi musuh yang berbaris rapat.'
    },

    // RARE
    frost_mage: {
      id: 'frost_mage',
      name: 'Frost Mage',
      rarity: 'rare',
      cost: 180,
      upgradeBaseCost: 130,
      damage: 28,
      range: 130,
      attackSpeed: 0.9,
      attackType: 'slow',
      slowAmount: 0.45,
      slowDuration: 2.5,
      bulletSpeed: 6,
      bulletColor: '#63b3ed',
      spriteKey: 'tower_frost',
      icon: '❄️',
      description: 'Menembakkan es pecahan kristal yang memperlambat laju musuh sebesar 45%.',
      lore: 'Penyihir dari kutub utara yang menguasai seni manipulasi kristal es beku abadi.'
    },
    poison_rogue: {
      id: 'poison_rogue',
      name: 'Poison Alchemist',
      rarity: 'rare',
      cost: 195,
      upgradeBaseCost: 140,
      damage: 15,
      range: 125,
      attackSpeed: 1.1,
      attackType: 'dot',
      dotDamage: 12,
      dotDuration: 3.5,
      bulletSpeed: 6.5,
      bulletColor: '#48bb78',
      spriteKey: 'tower_poison',
      icon: '🧪',
      description: 'Melempar botol racun korosif yang meracuni musuh dengan Damage over Time.',
      lore: 'Pakar racun gelap yang meramu getah tanaman rawa beracun paling mematikan.'
    },
    crossbow_sniper: {
      id: 'crossbow_sniper',
      name: 'Crossbow Sniper',
      rarity: 'rare',
      cost: 220,
      upgradeBaseCost: 160,
      damage: 65,
      range: 190,
      attackSpeed: 0.55,
      attackType: 'single',
      bulletSpeed: 11,
      bulletColor: '#fbbf24',
      spriteKey: 'tower_sniper',
      icon: '🎯',
      description: 'Penembak jitu jarak sangat jauh dengan bolt baja berdaya hancur tinggi.',
      lore: 'Mata elang dengan busur mekanis berbobot pegas baja tempaan dwarven.'
    },

    // EPIC
    thunder_shaman: {
      id: 'thunder_shaman',
      name: 'Thunder Shaman',
      rarity: 'epic',
      cost: 320,
      upgradeBaseCost: 240,
      damage: 55,
      range: 140,
      attackSpeed: 1.0,
      attackType: 'chain',
      chainTargets: 4,
      bulletSpeed: 14,
      bulletColor: '#b794f4',
      spriteKey: 'tower_thunder',
      icon: '⚡',
      description: 'Menyambar petir berantai yang memantul mengenai hingga 4 target berdekatan.',
      lore: 'Dukun petir berkekuatan badai yang memanggil kilat purba langsung dari langit kelam.'
    },
    flame_cannon: {
      id: 'flame_cannon',
      name: 'Flame Cannon',
      rarity: 'epic',
      cost: 350,
      upgradeBaseCost: 260,
      damage: 80,
      range: 135,
      attackSpeed: 0.65,
      attackType: 'aoe',
      splashRadius: 55,
      bulletSpeed: 5.5,
      bulletColor: '#f97316',
      spriteKey: 'tower_cannon',
      icon: '💣',
      description: 'Meluncurkan peluru meriam lava meledak dengan radius ledakan AOE yang besar.',
      lore: 'Artileri mekanik tempaan pandai besi kerajaan dengan amunisi minyak naga terkompresi.'
    },
    shadow_assassin: {
      id: 'shadow_assassin',
      name: 'Shadow Blade',
      rarity: 'epic',
      cost: 330,
      upgradeBaseCost: 250,
      damage: 42,
      range: 120,
      attackSpeed: 2.2,
      critChance: 0.35,
      critMultiplier: 2.5,
      attackType: 'single',
      bulletSpeed: 9,
      bulletColor: '#9333ea',
      spriteKey: 'tower_shadow',
      icon: '🗡️',
      description: 'Menyerang secepat kilat dengan belati bayangan ber-critical strike 250%.',
      lore: 'Pembunuh bayaran dari klan bayangan malam yang tidak meninggalkan jejak selain tebasan maut.'
    },

    // LEGENDARY
    holy_paladin: {
      id: 'holy_paladin',
      name: 'Holy Paladin',
      rarity: 'legendary',
      cost: 550,
      upgradeBaseCost: 400,
      damage: 120,
      range: 150,
      attackSpeed: 0.9,
      attackType: 'aura_damage',
      buffRange: 80,
      buffDamageBonus: 0.25,
      bulletSpeed: 8,
      bulletColor: '#fef08a',
      spriteKey: 'tower_paladin',
      icon: '🛡️',
      description: 'Memancarkan aura suci pemberi buff +25% ATK ke tower sekitar & palu penghukum dosa.',
      lore: 'Ksatria suci yang diberkahi cahaya dewa pelindung, membawa benteng kokoh ke medan laga.'
    },
    void_sorcerer: {
      id: 'void_sorcerer',
      name: 'Void Sorcerer',
      rarity: 'legendary',
      cost: 580,
      upgradeBaseCost: 420,
      damage: 105,
      range: 160,
      attackSpeed: 0.8,
      attackType: 'vortex',
      splashRadius: 65,
      bulletSpeed: 6.5,
      bulletColor: '#7c3aed',
      spriteKey: 'tower_void',
      icon: '🌀',
      description: 'Menciptakan singularity lubang hitam yang menyedot monster ke titik tengah ledakan.',
      lore: 'Penyihir pembangkang yang membuka portal ke kehampaan antariksa untuk menyedot materi musuh.'
    },
    dragon_knight: {
      id: 'dragon_knight',
      name: 'Dragon Knight',
      rarity: 'legendary',
      cost: 620,
      upgradeBaseCost: 450,
      damage: 140,
      range: 145,
      attackSpeed: 1.4,
      attackType: 'beam_fire',
      burnDuration: 4.0,
      burnDamage: 30,
      bulletSpeed: 10,
      bulletColor: '#ef4444',
      spriteKey: 'tower_dragon',
      icon: '🐉',
      description: 'Menyemburkan nafas naga terus-menerus yang melelehkan armor dan membakar musuh.',
      lore: 'Penunggang naga legendaris yang bersumpah membakar segala kejahatan dengan kobaran api purba.'
    },

    // MYTHIC
    phoenix_sovereign: {
      id: 'phoenix_sovereign',
      name: 'Phoenix Sovereign',
      rarity: 'mythic',
      cost: 950,
      upgradeBaseCost: 700,
      damage: 260,
      range: 175,
      attackSpeed: 1.1,
      attackType: 'supernova',
      burnDamage: 60,
      burnDuration: 5.0,
      bulletSpeed: 8,
      bulletColor: '#ff0055',
      spriteKey: 'tower_phoenix',
      icon: '🔥',
      description: 'Memanggil bulu api abadi yang memicu ledakan supernova memusnahkan gerombolan musuh.',
      lore: 'Ratu burung api abadi yang terlahir dari inti bintang terdalam, tak pernah terkalahkan.'
    },
    chronomancer: {
      id: 'chronomancer',
      name: 'Chronomancer',
      rarity: 'mythic',
      cost: 990,
      upgradeBaseCost: 750,
      damage: 210,
      range: 180,
      attackSpeed: 1.3,
      attackType: 'time_warp',
      freezeDuration: 1.5,
      freezeChance: 0.35,
      bulletSpeed: 12,
      bulletColor: '#38bdf8',
      spriteKey: 'tower_chrono',
      icon: '⏳',
      description: 'Memanipulasi aliran waktu; membekukan gerakan waktu musuh dalam sekejap.',
      lore: 'Penjaga garis waktu realitas yang mampu membalikkan nasib dan memperlambat detak waktu musuh.'
    },
    celestial_arbiter: {
      id: 'celestial_arbiter',
      name: 'Celestial Arbiter',
      rarity: 'mythic',
      cost: 1050,
      upgradeBaseCost: 800,
      damage: 320,
      range: 200,
      attackSpeed: 1.5,
      attackType: 'laser',
      bulletSpeed: 20,
      bulletColor: '#fbbf24',
      spriteKey: 'tower_celestial',
      icon: '✨',
      description: 'Pancaran sinar laser suci tanpa henti yang menghancurkan pertahanan monster terkuat.',
      lore: 'Wujud manifestasi cahaya keadilan tertinggi para dewa pelindung kosmos.'
    },

    // SECRET
    glitch_overlord: {
      id: 'glitch_overlord',
      name: 'Glitch Overlord',
      rarity: 'secret',
      cost: 1600,
      upgradeBaseCost: 1200,
      damage: 666,
      range: 210,
      attackSpeed: 2.0,
      attackType: 'glitch',
      executeHpThreshold: 0.15,
      bulletSpeed: 15,
      bulletColor: '#00f5d4',
      spriteKey: 'tower_glitch',
      icon: '👾',
      description: 'Entitas rusak tak terduga. Menghapus seketika musuh di bawah 15% HP & merusak data lawan.',
      lore: 'Entitas terlarang dari baris kode yang rusak di luar batasan matriks dunia game.'
    },
    cosmic_titan: {
      id: 'cosmic_titan',
      name: 'Cosmic Titan',
      rarity: 'secret',
      cost: 1800,
      upgradeBaseCost: 1350,
      damage: 888,
      range: 230,
      attackSpeed: 1.0,
      attackType: 'cosmic_meteor',
      splashRadius: 110,
      bulletSpeed: 10,
      bulletColor: '#e0aaff',
      spriteKey: 'tower_titan',
      icon: '🌌',
      description: 'Raksasa kosmik pemanggil hujan meteor antariksa dengan daya hancur luar biasa.',
      lore: 'Penempa galaksi purba yang langkah kakinya menggetarkan dimensi semesta.'
    }
  };

  function calculateTowerStats(baseData, level = 1) {
    const levelMult = 1 + (level - 1) * 0.45;
    const rangeBonus = (level - 1) * 12;
    return {
      ...baseData,
      level,
      damage: Math.round(baseData.damage * levelMult),
      range: baseData.range + rangeBonus,
      attackSpeed: Number((baseData.attackSpeed * (1 + (level - 1) * 0.12)).toFixed(2)),
      upgradeCost: Math.round(baseData.upgradeBaseCost * Math.pow(1.65, level - 1))
    };
  }

  // ==========================================
  // 2. CONFIG: ENEMIES & 24 BOSSES
  // ==========================================
  const ENEMY_TYPES = {
    goblin: { id: 'goblin', name: 'Goblin Runner', hp: 45, speed: 1.4, rewardGold: 12, rewardGems: 1, armor: 0, color: '#48bb78', size: 14, spriteKey: 'enemy_goblin', icon: '👺' },
    orc: { id: 'orc', name: 'Orc Warrior', hp: 110, speed: 0.9, rewardGold: 22, rewardGems: 1, armor: 4, color: '#38a169', size: 18, spriteKey: 'enemy_orc', icon: '👹' },
    skeleton: { id: 'skeleton', name: 'Skeleton Archer', hp: 75, speed: 1.1, rewardGold: 16, rewardGems: 1, armor: 1, color: '#e2e8f0', size: 15, spriteKey: 'enemy_skeleton', icon: '💀' },
    wolf: { id: 'wolf', name: 'Dire Wolf', hp: 60, speed: 1.9, rewardGold: 18, rewardGems: 1, armor: 0, color: '#a0aec0', size: 14, spriteKey: 'enemy_wolf', icon: '🐺' },
    bat: { id: 'bat', name: 'Shadow Bat', hp: 40, speed: 1.7, flying: true, rewardGold: 15, rewardGems: 1, armor: 0, color: '#9f7aea', size: 12, spriteKey: 'enemy_bat', icon: '🦇' },
    golem: { id: 'golem', name: 'Stone Golem', hp: 240, speed: 0.65, rewardGold: 40, rewardGems: 2, armor: 10, color: '#718096', size: 22, spriteKey: 'enemy_golem', icon: '🗿' },
    fire_elemental: { id: 'fire_elemental', name: 'Fire Sprite', hp: 140, speed: 1.2, rewardGold: 28, rewardGems: 2, armor: 2, color: '#f97316', size: 16, spriteKey: 'enemy_fire', icon: '🔥' },
    ice_wraith: { id: 'ice_wraith', name: 'Ice Wraith', hp: 170, speed: 1.0, rewardGold: 32, rewardGems: 2, armor: 5, color: '#38bdf8', size: 17, spriteKey: 'enemy_ice', icon: '👻' },
    void_crawler: { id: 'void_crawler', name: 'Void Crawler', hp: 280, speed: 1.15, rewardGold: 50, rewardGems: 3, armor: 8, color: '#a855f7', size: 20, spriteKey: 'enemy_void', icon: '👾' }
  };

  const BOSS_DATABASE = {
    'ch1_act1': { id: 'goblin_king', name: 'Goblin King Grom', title: 'Penguasa Sarang Hutan', hp: 2200, speed: 0.7, rewardGold: 350, rewardGems: 75, armor: 5, color: '#22c55e', size: 28, spriteKey: 'boss_goblin_king', icon: '👑', ability: 'summon_minions', abilityCooldown: 6.0, description: 'Memanggil 3 Goblin Runner setiap 6 detik.' },
    'ch1_act2': { id: 'treant_ancient', name: 'Treant Barkhorn', title: 'Penjaga Pohon Terlarang', hp: 3400, speed: 0.5, rewardGold: 400, rewardGems: 85, armor: 12, color: '#15803d', size: 32, spriteKey: 'boss_treant', icon: '🌲', ability: 'regeneration', healRate: 45, description: 'Regenerasi 45 HP/detik.' },
    'ch1_act3': { id: 'dire_alpha', name: 'Fenrir Pack Leader', title: 'Raja Serigala Purnama', hp: 2800, speed: 1.3, rewardGold: 450, rewardGems: 95, armor: 4, color: '#475569', size: 28, spriteKey: 'boss_wolf', icon: '🐺', ability: 'speed_dash', dashCooldown: 5.0, description: 'Melesat dengan kecepatan tinggi berkala.' },
    'ch1_act4': { id: 'forest_witch', name: 'Morgana Toxic Witch', title: 'Penyihir Rawa Racun', hp: 3800, speed: 0.65, rewardGold: 500, rewardGems: 105, armor: 6, color: '#9333ea', size: 26, spriteKey: 'boss_witch', icon: '🧙‍♀️', ability: 'magic_shield', shieldCooldown: 8.0, description: 'Menciptakan perisai pelindung sihir.' },
    'ch1_act5': { id: 'earth_golem', name: 'Terra Boulder Titan', title: 'Raksasa Batu Lembah Kuno', hp: 5200, speed: 0.45, rewardGold: 550, rewardGems: 120, armor: 18, color: '#78716c', size: 34, spriteKey: 'boss_earth_golem', icon: '🗿', ability: 'stun_towers', stunCooldown: 9.0, description: 'Gempa bumi melumpuhkan tower sekitar.' },
    'ch1_act6': { id: 'forest_dragon', name: 'Verdant Drake Sylvan', title: 'Penguasa Puncak Bab 1', hp: 7500, speed: 0.7, rewardGold: 700, rewardGems: 200, armor: 10, color: '#059669', size: 36, spriteKey: 'boss_sylvan', icon: '🐉', ability: 'dragon_roar', abilityCooldown: 7.0, description: 'Mengaum dan membakar jalur pertempuran.' },

    'ch2_act1': { id: 'molten_berserker', name: 'Ignis Rage Berserker', title: 'Prajurit Lahar', hp: 5500, speed: 0.8, rewardGold: 600, rewardGems: 110, armor: 8, color: '#dc2626', size: 28, spriteKey: 'boss_goblin_king', icon: '🪓', ability: 'speed_dash', description: 'Kecepatan tinggi saat marah.' },
    'ch2_act2': { id: 'ash_phantom', name: 'Cinder Shadow', title: 'Hantu Abu Vulkanik', hp: 6200, speed: 0.95, rewardGold: 650, rewardGems: 125, armor: 6, color: '#ea580c', size: 27, spriteKey: 'boss_witch', icon: '🌫️', ability: 'magic_shield', description: 'Kabut asap penghindar serangan.' },
    'ch2_act3': { id: 'magma_wurm', name: 'Gorgoroth Magma Wurm', title: 'Cacing Lahar Inti', hp: 7800, speed: 0.6, rewardGold: 700, rewardGems: 140, armor: 14, color: '#b91c1c', size: 32, spriteKey: 'boss_treant', icon: '🐛', ability: 'regeneration', description: 'Sisik magma menahan luka.' },
    'ch2_act4': { id: 'fire_djinn', name: 'Ifrit Sunbringer', title: 'Penghulu Jin Api Gurun', hp: 8800, speed: 0.85, rewardGold: 780, rewardGems: 155, armor: 8, color: '#f59e0b', size: 30, spriteKey: 'boss_witch', icon: '🧞', ability: 'summon_minions', description: 'Memanggil sprite api pembantu.' },
    'ch2_act5': { id: 'obsidian_colossus', name: 'Obsidian Juggernaut', title: 'Benteng Kaca Hitam', hp: 11000, speed: 0.45, rewardGold: 850, rewardGems: 175, armor: 22, color: '#1c1917', size: 36, spriteKey: 'boss_earth_golem', icon: '⬛', ability: 'stun_towers', description: 'Pertahanan obsidian super kokoh.' },
    'ch2_act6': { id: 'volcanic_hydra', name: 'Pyroclast Hydra', title: 'Penguasa Puncak Bab 2', hp: 14000, speed: 0.65, rewardGold: 1000, rewardGems: 300, armor: 12, color: '#ef4444', size: 38, spriteKey: 'boss_hydra', icon: '🐲', ability: 'magic_shield', description: 'Hydra raksasa sembilan kepala lahar.' },

    'ch3_act1': { id: 'frost_yeti', name: 'Ymir Avalanche Yeti', title: 'Monster Gletser', hp: 10500, speed: 0.6, rewardGold: 850, rewardGems: 150, armor: 12, color: '#0284c7', size: 30, spriteKey: 'boss_earth_golem', icon: '❄️', ability: 'stun_towers', description: 'Aura beku melumpuhkan tower.' },
    'ch3_act2': { id: 'ice_queen', name: 'Glacia Ice Empress', title: 'Ratu Kristal Es', hp: 12500, speed: 0.75, rewardGold: 920, rewardGems: 170, armor: 10, color: '#38bdf8', size: 28, spriteKey: 'boss_witch', icon: '👑', ability: 'magic_shield', description: 'Perisai badai salju penangkal peluru.' },
    'ch3_act3': { id: 'frostwyrm', name: 'Sindragosa Rime Drake', title: 'Naga Badai Kutub', hp: 15000, speed: 0.8, rewardGold: 1000, rewardGems: 190, armor: 14, color: '#bae6fd', size: 35, spriteKey: 'boss_sylvan', icon: '🐉', ability: 'speed_dash', description: 'Naga es melesat kencang.' },
    'ch3_act4': { id: 'abominable_drake', name: 'Boreas Dreadnought', title: 'Panglima Gletser', hp: 17500, speed: 0.55, rewardGold: 1100, rewardGems: 210, armor: 18, color: '#0369a1', size: 34, spriteKey: 'boss_treant', icon: '🧊', ability: 'regeneration', description: 'Menembakkan paku es pembeku.' },
    'ch3_act5': { id: 'glacial_titan', name: 'Thrym Frost Monarch', title: 'Raja Titan Es Abadi', hp: 21000, speed: 0.45, rewardGold: 1250, rewardGems: 240, armor: 24, color: '#0c4a6e', size: 38, spriteKey: 'boss_earth_golem', icon: '🏔️', ability: 'stun_towers', description: 'Longsoran salju raksasa.' },
    'ch3_act6': { id: 'frost_sovereign', name: 'Kaelith Absolute Zero', title: 'Penguasa Puncak Bab 3', hp: 26000, speed: 0.65, rewardGold: 1500, rewardGems: 400, armor: 16, color: '#e0f2fe', size: 40, spriteKey: 'boss_frost_sovereign', icon: '⭐', ability: 'magic_shield', description: 'Stasis beku mutlak pemulih luka.' },

    'ch4_act1': { id: 'void_stalker', name: 'Malzahar Void Shifter', title: 'Pemburu Kehampaan', hp: 22000, speed: 1.1, rewardGold: 1300, rewardGems: 250, armor: 10, color: '#7c3aed', size: 28, spriteKey: 'boss_wolf', icon: '👁️', ability: 'speed_dash', description: 'Teleport warp secara tiba-tiba.' },
    'ch4_act2': { id: 'chaos_harbinger', name: 'Nihilus Entropy Lord', title: 'Kutukan Kekacauan', hp: 27000, speed: 0.75, rewardGold: 1450, rewardGems: 280, armor: 14, color: '#6b21a8', size: 32, spriteKey: 'boss_witch', icon: '🔮', ability: 'stun_towers', description: 'Mengutuk tower dengan DPS tinggi.' },
    'ch4_act3': { id: 'shadow_leviathan', name: 'Ouroboros Leviathan', title: 'Ular Pemakan Cahaya', hp: 33000, speed: 0.7, rewardGold: 1600, rewardGems: 310, armor: 16, color: '#581c87', size: 36, spriteKey: 'boss_treant', icon: '🐍', ability: 'regeneration', description: 'Menghisap energi penyerang.' },
    'ch4_act4': { id: 'eclipse_devourer', name: 'Umbra Dark Eclipse', title: 'Gerhana Abadi', hp: 40000, speed: 0.65, rewardGold: 1800, rewardGems: 350, armor: 20, color: '#3b0764', size: 36, spriteKey: 'boss_witch', icon: '🌑', ability: 'magic_shield', description: 'Kabut hitam antimateri.' },
    'ch4_act5': { id: 'singularity_master', name: 'Aethelgard Rift Maker', title: 'Gravitasi Supermasif', hp: 48000, speed: 0.55, rewardGold: 2100, rewardGems: 400, armor: 22, color: '#4c1d95', size: 38, spriteKey: 'boss_earth_golem', icon: '🌌', ability: 'stun_towers', description: 'Lubang gravitasi penyedot peluru.' },
    'ch4_act6': { id: 'nexus_sovereign', name: 'Omega Primordial', title: 'Penguasa Puncak Akhir Game', hp: 65000, speed: 0.6, rewardGold: 3000, rewardGems: 1000, armor: 25, color: '#00f5d4', size: 42, spriteKey: 'boss_omega', icon: '👑👾', ability: 'summon_minions', description: 'Final Boss Tertinggi dengan kekuatan dimensi mutlak!' }
  };

  function getBossData(chId, actIdx) {
    return BOSS_DATABASE[`ch${chId}_act${actIdx}`] || BOSS_DATABASE['ch1_act1'];
  }

  // ==========================================
  // 3. CONFIG: CHAPTERS & MAPS
  // ==========================================
  const MAP_COLS = 24;
  const MAP_ROWS = 16;
  const TILE_SIZE = 32;

  const CHAPTERS_DATA = [
    {
      id: 1,
      name: 'Whispering Woods',
      theme: 'forest',
      acts: [
        { act: 1, name: 'Garis Batas Hutan', startGold: 450, baseHp: 20, firstClearGems: 150, repeatGems: 45, desc: 'Gerbang masuk hutan, jalur pemula yang bagus.', path: [{ x: 0, y: 8 }, { x: 7, y: 8 }, { x: 7, y: 4 }, { x: 16, y: 4 }, { x: 16, y: 11 }, { x: 23, y: 11 }] },
        { act: 2, name: 'Rawa Purba Kelam', startGold: 480, baseHp: 20, firstClearGems: 175, repeatGems: 50, desc: 'Jalur berlumpur berkelok di rawa kuno.', path: [{ x: 0, y: 3 }, { x: 6, y: 3 }, { x: 6, y: 12 }, { x: 13, y: 12 }, { x: 13, y: 4 }, { x: 19, y: 4 }, { x: 19, y: 10 }, { x: 23, y: 10 }] },
        { act: 3, name: 'Lembah Serigala Liar', startGold: 500, baseHp: 20, firstClearGems: 200, repeatGems: 55, desc: 'Kawasan perburuan kawanan serigala buas.', path: [{ x: 3, y: 0 }, { x: 3, y: 7 }, { x: 11, y: 7 }, { x: 11, y: 2 }, { x: 18, y: 2 }, { x: 18, y: 13 }, { x: 8, y: 13 }, { x: 8, y: 15 }] },
        { act: 4, name: 'Kuil Sihir Terlupakan', startGold: 520, baseHp: 20, firstClearGems: 220, repeatGems: 60, desc: 'Reruntuhan candi dengan energi sihir kuat.', path: [{ x: 0, y: 13 }, { x: 5, y: 13 }, { x: 5, y: 4 }, { x: 12, y: 4 }, { x: 12, y: 11 }, { x: 19, y: 11 }, { x: 19, y: 2 }, { x: 23, y: 2 }] },
        { act: 5, name: 'Ngarai Batu Terbelah', startGold: 550, baseHp: 20, firstClearGems: 250, repeatGems: 65, desc: 'Celah tebing terjal berbatu sempit.', path: [{ x: 12, y: 0 }, { x: 12, y: 5 }, { x: 4, y: 5 }, { x: 4, y: 11 }, { x: 20, y: 11 }, { x: 20, y: 5 }, { x: 17, y: 5 }, { x: 17, y: 15 }] },
        { act: 6, name: 'Sarang Naga Sylvan', startGold: 600, baseHp: 25, firstClearGems: 350, repeatGems: 80, desc: 'Puncak tertinggi hutan tempat naga bersarang.', path: [{ x: 0, y: 2 }, { x: 8, y: 2 }, { x: 8, y: 13 }, { x: 15, y: 13 }, { x: 15, y: 3 }, { x: 21, y: 3 }, { x: 21, y: 14 }, { x: 23, y: 14 }] }
      ]
    },
    {
      id: 2,
      name: 'Scorched Badlands',
      theme: 'volcano',
      acts: [
        { act: 1, name: 'Gerbang Cadas Api', startGold: 500, baseHp: 20, firstClearGems: 200, repeatGems: 60, desc: 'Tanah membara bertabur kawah api.', path: [{ x: 0, y: 6 }, { x: 10, y: 6 }, { x: 10, y: 12 }, { x: 18, y: 12 }, { x: 18, y: 4 }, { x: 23, y: 4 }] },
        { act: 2, name: 'Lembah Abu Panas', startGold: 530, baseHp: 20, firstClearGems: 220, repeatGems: 65, desc: 'Kabut belerang menyelimuti lahar.', path: [{ x: 0, y: 14 }, { x: 6, y: 14 }, { x: 6, y: 7 }, { x: 14, y: 7 }, { x: 14, y: 13 }, { x: 20, y: 13 }, { x: 20, y: 3 }, { x: 23, y: 3 }] },
        { act: 3, name: 'Sungai Magma Berpijar', startGold: 560, baseHp: 20, firstClearGems: 240, repeatGems: 70, desc: 'Jembatan cadas melintasi danau lahar.', path: [{ x: 0, y: 3 }, { x: 8, y: 3 }, { x: 8, y: 11 }, { x: 16, y: 11 }, { x: 16, y: 3 }, { x: 23, y: 3 }] },
        { act: 4, name: 'Oasis Terbakar', startGold: 600, baseHp: 20, firstClearGems: 270, repeatGems: 75, desc: 'Puing mata air kering digantikan kobaran api.', path: [{ x: 5, y: 0 }, { x: 5, y: 8 }, { x: 12, y: 8 }, { x: 12, y: 2 }, { x: 19, y: 2 }, { x: 19, y: 12 }, { x: 10, y: 12 }, { x: 10, y: 15 }] },
        { act: 5, name: 'Benteng Obsidian', startGold: 650, baseHp: 20, firstClearGems: 300, repeatGems: 85, desc: 'Dinding tebing obsidian hitam memantulkan panas.', path: [{ x: 0, y: 11 }, { x: 7, y: 11 }, { x: 7, y: 4 }, { x: 17, y: 4 }, { x: 17, y: 13 }, { x: 21, y: 13 }, { x: 21, y: 1 }, { x: 23, y: 1 }] },
        { act: 6, name: 'Kawah Inti Pyroclast', startGold: 700, baseHp: 25, firstClearGems: 450, repeatGems: 100, desc: 'Dapur magma tempat Hydra sembilan kepala bersemayam.', path: [{ x: 0, y: 8 }, { x: 5, y: 8 }, { x: 5, y: 2 }, { x: 12, y: 2 }, { x: 12, y: 14 }, { x: 18, y: 14 }, { x: 18, y: 6 }, { x: 23, y: 6 }] }
      ]
    },
    {
      id: 3,
      name: 'Frostbite Peaks',
      theme: 'snow',
      acts: [
        { act: 1, name: 'Gua Kristal Es', startGold: 600, baseHp: 20, firstClearGems: 250, repeatGems: 75, desc: 'Gua stalaktit kristal es bersuhu dingin.', path: [{ x: 0, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 11 }, { x: 17, y: 11 }, { x: 17, y: 5 }, { x: 23, y: 5 }] },
        { act: 2, name: 'Jurang Gletser', startGold: 640, baseHp: 20, firstClearGems: 280, repeatGems: 80, desc: 'Jembatan gantung es melintasi jurang salju.', path: [{ x: 0, y: 12 }, { x: 6, y: 12 }, { x: 6, y: 4 }, { x: 13, y: 4 }, { x: 13, y: 12 }, { x: 19, y: 12 }, { x: 19, y: 2 }, { x: 23, y: 2 }] },
        { act: 3, name: 'Pekuburan Naga Beku', startGold: 680, baseHp: 20, firstClearGems: 310, repeatGems: 85, desc: 'Kerangka naga purba diawetkan es ratusan tahun.', path: [{ x: 4, y: 0 }, { x: 4, y: 9 }, { x: 11, y: 9 }, { x: 11, y: 3 }, { x: 18, y: 3 }, { x: 18, y: 14 }, { x: 23, y: 14 }] },
        { act: 4, name: 'Jalan Badai Blizzard', startGold: 720, baseHp: 20, firstClearGems: 340, repeatGems: 90, desc: 'Angin kencang badai es menghantam benteng.', path: [{ x: 0, y: 2 }, { x: 7, y: 2 }, { x: 7, y: 13 }, { x: 14, y: 13 }, { x: 14, y: 3 }, { x: 20, y: 3 }, { x: 20, y: 11 }, { x: 23, y: 11 }] },
        { act: 5, name: 'Benteng Takhta Es', startGold: 780, baseHp: 20, firstClearGems: 380, repeatGems: 95, desc: 'Dinding es tebal bangsa raksasa titan.', path: [{ x: 0, y: 14 }, { x: 8, y: 14 }, { x: 8, y: 6 }, { x: 16, y: 6 }, { x: 16, y: 13 }, { x: 22, y: 13 }, { x: 22, y: 0 }] },
        { act: 6, name: 'Domain Nol Mutlak', startGold: 850, baseHp: 25, firstClearGems: 550, repeatGems: 120, desc: 'Sanctuary Kaelith Absolute Zero.', path: [{ x: 0, y: 7 }, { x: 5, y: 7 }, { x: 5, y: 2 }, { x: 12, y: 2 }, { x: 12, y: 13 }, { x: 19, y: 13 }, { x: 19, y: 4 }, { x: 23, y: 4 }] }
      ]
    },
    {
      id: 4,
      name: 'Abyssal Realm',
      theme: 'abyss',
      acts: [
        { act: 1, name: 'Retakan Ruang Waktu', startGold: 750, baseHp: 20, firstClearGems: 350, repeatGems: 100, desc: 'Celah portal ke antariksa kehampaan gelap.', path: [{ x: 0, y: 5 }, { x: 8, y: 5 }, { x: 8, y: 12 }, { x: 16, y: 12 }, { x: 16, y: 4 }, { x: 23, y: 4 }] },
        { act: 2, name: 'Puing Bintang Runtuh', startGold: 800, baseHp: 20, firstClearGems: 400, repeatGems: 110, desc: 'Asteroid melayang di dekat bintang mati.', path: [{ x: 0, y: 13 }, { x: 6, y: 13 }, { x: 6, y: 3 }, { x: 13, y: 3 }, { x: 13, y: 12 }, { x: 20, y: 12 }, { x: 20, y: 2 }, { x: 23, y: 2 }] },
        { act: 3, name: 'Cakrawala Peristiwa', startGold: 850, baseHp: 20, firstClearGems: 450, repeatGems: 120, desc: 'Gravitasi masif mendistorsi jalannya waktu.', path: [{ x: 3, y: 0 }, { x: 3, y: 8 }, { x: 10, y: 8 }, { x: 10, y: 2 }, { x: 17, y: 2 }, { x: 17, y: 13 }, { x: 23, y: 13 }] },
        { act: 4, name: 'Gerhana Kegelapan', startGold: 900, baseHp: 20, firstClearGems: 500, repeatGems: 130, desc: 'Kabut antimateri menelan seluruh cahaya.', path: [{ x: 0, y: 2 }, { x: 8, y: 2 }, { x: 8, y: 13 }, { x: 15, y: 13 }, { x: 15, y: 4 }, { x: 21, y: 4 }, { x: 21, y: 14 }, { x: 23, y: 14 }] },
        { act: 5, name: 'Singularity Nexus', startGold: 980, baseHp: 20, firstClearGems: 600, repeatGems: 150, desc: 'Jantung titik gravitasi tanpa dasar.', path: [{ x: 0, y: 14 }, { x: 7, y: 14 }, { x: 7, y: 5 }, { x: 15, y: 5 }, { x: 15, y: 12 }, { x: 21, y: 12 }, { x: 21, y: 1 }, { x: 23, y: 1 }] },
        { act: 6, name: 'Tahta Omega Primordial', startGold: 1100, baseHp: 30, firstClearGems: 1000, repeatGems: 250, desc: 'Pertempuran akhir penentu keselamatan semesta!', path: [{ x: 0, y: 8 }, { x: 6, y: 8 }, { x: 6, y: 2 }, { x: 13, y: 2 }, { x: 13, y: 14 }, { x: 19, y: 14 }, { x: 19, y: 6 }, { x: 23, y: 6 }] }
      ]
    }
  ];

  function generateWavesForAct(chapterId, actIndex) {
    const waves = [];
    const totalMult = (1 + (chapterId - 1) * 0.75) * (1 + (actIndex - 1) * 0.25);
    const pools = [
      ['goblin'], ['goblin', 'wolf'], ['goblin', 'orc'], ['wolf', 'orc'],
      ['skeleton', 'orc'], ['bat', 'skeleton'], ['orc', 'golem'], ['bat', 'wolf', 'golem'],
      ['fire_elemental', 'golem'], ['ice_wraith', 'fire_elemental'], ['bat', 'void_crawler'],
      ['void_crawler', 'golem'], ['void_crawler', 'fire_elemental', 'ice_wraith'], ['orc', 'golem', 'void_crawler']
    ];

    for (let w = 1; w <= 14; w++) {
      const waveEnemies = [];
      const pool = pools[w - 1] || ['goblin', 'orc'];
      const count = Math.floor(6 + w * 2.2 * (1 + chapterId * 0.15));

      for (let i = 0; i < count; i++) {
        waveEnemies.push({
          type: pool[i % pool.length],
          spawnDelay: i * (1.2 - Math.min(0.7, w * 0.04)),
          hpMultiplier: Number((1 + (w - 1) * 0.18 * totalMult).toFixed(2)),
          speedMultiplier: Number((1 + Math.min(0.4, w * 0.02)).toFixed(2))
        });
      }

      waves.push({
        waveNumber: w,
        isBossWave: false,
        enemies: waveEnemies,
        rewardGold: Math.round(45 + w * 18 * totalMult),
        rewardGems: Math.round(2 + Math.floor(w / 3))
      });
    }

    // Wave 15: Boss Wave
    waves.push({
      waveNumber: 15,
      isBossWave: true,
      bossKey: `ch${chapterId}_act${actIndex}`,
      enemies: [{ isBoss: true, bossKey: `ch${chapterId}_act${actIndex}`, spawnDelay: 0.5, hpMultiplier: Number(totalMult.toFixed(2)), speedMultiplier: 1.0 }],
      rewardGold: Math.round(200 * totalMult),
      rewardGems: 15
    });

    return waves;
  }

  // ==========================================
  // 4. ENGINE: PIXEL RENDERER 32x32
  // ==========================================
  class PixelRenderer {
    constructor() {
      this.spriteCache = new Map();
      this.initSprites();
    }

    createCanvas32(w = 32, h = 32) {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      return { canvas, ctx };
    }

    drawRect(ctx, x, y, w, h, col) {
      ctx.fillStyle = col;
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
    }

    initSprites() {
      // Tiles
      const { canvas: g, ctx: gc } = this.createCanvas32();
      this.drawRect(gc, 0, 0, 32, 32, '#2d6a4f');
      this.drawRect(gc, 2, 2, 4, 3, '#40916c');
      this.drawRect(gc, 16, 6, 3, 4, '#52b788');
      this.drawRect(gc, 22, 20, 4, 3, '#1b4332');
      this.spriteCache.set('tile_grass_forest', g);

      const { canvas: p, ctx: pc } = this.createCanvas32();
      this.drawRect(pc, 0, 0, 32, 32, '#997b66');
      this.drawRect(pc, 0, 0, 32, 2, '#6c584c');
      this.drawRect(pc, 0, 30, 32, 2, '#6c584c');
      this.drawRect(pc, 4, 8, 3, 2, '#b08968');
      this.drawRect(pc, 18, 14, 4, 2, '#b08968');
      this.spriteCache.set('tile_path_forest', p);

      const { canvas: lv, ctx: lvc } = this.createCanvas32();
      this.drawRect(lvc, 0, 0, 32, 32, '#dc2626');
      this.drawRect(lvc, 4, 6, 8, 6, '#f97316');
      this.drawRect(lvc, 16, 14, 10, 8, '#f59e0b');
      this.spriteCache.set('tile_lava', lv);

      const { canvas: ic, ctx: icc } = this.createCanvas32();
      this.drawRect(icc, 0, 0, 32, 32, '#bae6fd');
      this.drawRect(icc, 4, 4, 10, 4, '#e0f2fe');
      this.drawRect(icc, 18, 16, 8, 5, '#7dd3fc');
      this.spriteCache.set('tile_ice', ic);

      const { canvas: vd, ctx: vdc } = this.createCanvas32();
      this.drawRect(vdc, 0, 0, 32, 32, '#1e1035');
      this.drawRect(vdc, 6, 8, 3, 3, '#a855f7');
      this.drawRect(vdc, 20, 18, 4, 4, '#00f5d4');
      this.spriteCache.set('tile_void', vd);

      const { canvas: cst, ctx: cstc } = this.createCanvas32();
      this.drawRect(cstc, 2, 8, 28, 22, '#475569');
      this.drawRect(cstc, 4, 2, 6, 6, '#334155');
      this.drawRect(cstc, 13, 2, 6, 6, '#334155');
      this.drawRect(cstc, 22, 2, 6, 6, '#334155');
      this.drawRect(cstc, 14, 8, 4, 4, '#38bdf8');
      this.spriteCache.set('tile_castle', cst);

      const { canvas: por, ctx: porc } = this.createCanvas32();
      this.drawRect(porc, 2, 2, 28, 28, '#1e1b4b');
      this.drawRect(porc, 6, 6, 20, 20, '#6366f1');
      this.drawRect(porc, 10, 10, 12, 12, '#a855f7');
      this.drawRect(porc, 13, 13, 6, 6, '#f43f5e');
      this.spriteCache.set('tile_portal', por);

      // Towers
      this.buildSimpleTowerSprite('tower_archer', '#718096', '#38a169', '#fbd38d', '#b7791f');
      this.buildSimpleTowerSprite('tower_stone', '#4a5568', '#975a16', '#e2e8f0', '#718096');
      this.buildSimpleTowerSprite('tower_footman', '#475569', '#3182ce', '#fed7aa', '#a0aec0');
      this.buildSimpleTowerSprite('tower_frost', '#1e3a8a', '#2563eb', '#60a5fa', '#38bdf8');
      this.buildSimpleTowerSprite('tower_poison', '#14532d', '#16a34a', '#fef08a', '#22c55e');
      this.buildSimpleTowerSprite('tower_sniper', '#334155', '#78350f', '#d97706', '#fbbf24');
      this.buildSimpleTowerSprite('tower_thunder', '#4c1d95', '#6d28d9', '#a78bfa', '#facc15');
      this.buildSimpleTowerSprite('tower_cannon', '#1c1917', '#7c2d12', '#ea580c', '#f97316');
      this.buildSimpleTowerSprite('tower_shadow', '#09090b', '#27272a', '#52525b', '#c084fc');
      this.buildSimpleTowerSprite('tower_paladin', '#854d0e', '#ca8a04', '#fef08a', '#fde047');
      this.buildSimpleTowerSprite('tower_void', '#2e1065', '#581c87', '#7e22ce', '#00f5d4');
      this.buildSimpleTowerSprite('tower_dragon', '#7f1d1d', '#b91c1c', '#dc2626', '#fbbf24');
      this.buildSimpleTowerSprite('tower_phoenix', '#450a0a', '#ef4444', '#f97316', '#ffffff');
      this.buildSimpleTowerSprite('tower_chrono', '#082f49', '#0284c7', '#38bdf8', '#facc15');
      this.buildSimpleTowerSprite('tower_celestial', '#713f12', '#eab308', '#fef08a', '#67e8f9');
      this.buildSimpleTowerSprite('tower_glitch', '#042f2e', '#0f766e', '#00f5d4', '#ff0055');
      this.buildSimpleTowerSprite('tower_titan', '#1e1035', '#581c87', '#c084fc', '#00f5d4');

      // Enemies
      this.buildSimpleEnemySprite('enemy_goblin', '#22c55e', '#ef4444');
      this.buildSimpleEnemySprite('enemy_orc', '#15803d', '#dc2626');
      this.buildSimpleEnemySprite('enemy_skeleton', '#e2e8f0', '#0f172a');
      this.buildSimpleEnemySprite('enemy_wolf', '#64748b', '#dc2626');
      this.buildSimpleEnemySprite('enemy_bat', '#581c87', '#f43f5e');
      this.buildSimpleEnemySprite('enemy_golem', '#475569', '#38bdf8');
      this.buildSimpleEnemySprite('enemy_fire', '#dc2626', '#fef08a');
      this.buildSimpleEnemySprite('enemy_ice', '#0284c7', '#e0f2fe');
      this.buildSimpleEnemySprite('enemy_void', '#3b0764', '#00f5d4');

      // Bosses
      this.buildBossSprite('boss_goblin_king', '#15803d', '#facc15');
      this.buildBossSprite('boss_treant', '#3f2e18', '#22c55e');
      this.buildBossSprite('boss_wolf', '#334155', '#ef4444');
      this.buildBossSprite('boss_witch', '#581c87', '#c084fc');
      this.buildBossSprite('boss_earth_golem', '#57534e', '#f59e0b');
      this.buildBossSprite('boss_sylvan', '#047857', '#fbbf24');
      this.buildBossSprite('boss_hydra', '#991b1b', '#f97316');
      this.buildBossSprite('boss_frost_sovereign', '#0284c7', '#bae6fd');
      this.buildBossSprite('boss_omega', '#1e1035', '#00f5d4');
    }

    buildSimpleTowerSprite(key, cBase, cBody, cHead, cWeapon) {
      const { canvas, ctx } = this.createCanvas32();
      this.drawRect(ctx, 6, 20, 20, 10, cBase);
      this.drawRect(ctx, 10, 10, 12, 11, cBody);
      this.drawRect(ctx, 11, 4, 10, 6, cHead);
      this.drawRect(ctx, 20, 6, 6, 12, cWeapon);
      this.spriteCache.set(key, canvas);
    }

    buildSimpleEnemySprite(key, bodyColor, eyeColor) {
      const { canvas, ctx } = this.createCanvas32();
      this.drawRect(ctx, 6, 8, 20, 16, bodyColor);
      this.drawRect(ctx, 8, 4, 16, 6, bodyColor);
      this.drawRect(ctx, 10, 8, 3, 3, eyeColor);
      this.drawRect(ctx, 19, 8, 3, 3, eyeColor);
      this.drawRect(ctx, 8, 24, 4, 6, '#0f172a');
      this.drawRect(ctx, 20, 24, 4, 6, '#0f172a');
      this.spriteCache.set(key, canvas);
    }

    buildBossSprite(key, bodyColor, crownColor) {
      const { canvas, ctx } = this.createCanvas32(48, 48);
      this.drawRect(ctx, 8, 12, 32, 28, bodyColor);
      this.drawRect(ctx, 12, 4, 24, 10, crownColor);
      this.drawRect(ctx, 14, 18, 6, 6, '#ef4444');
      this.drawRect(ctx, 28, 18, 6, 6, '#ef4444');
      this.spriteCache.set(key, canvas);
    }

    drawSprite(ctx, key, x, y, w = 32, h = 32, rotation = 0, opacity = 1.0) {
      const sprite = this.spriteCache.get(key);
      if (!sprite) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(Math.round(x), Math.round(y));
      if (rotation !== 0) ctx.rotate(rotation);
      ctx.drawImage(sprite, Math.round(-w / 2), Math.round(-h / 2), Math.round(w), Math.round(h));
      ctx.restore();
    }
  }

  // ==========================================
  // 5. ENGINE: SOUND SYNTHESIZER
  // ==========================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.volume = 0.45;
      this.bgmPlaying = false;
      this.bgmTimer = null;
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'square', duration = 0.1, gainVal = 0.15, freqEnd = null) {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        if (freqEnd !== null) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqEnd), this.ctx.currentTime + duration);
        }
        gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    playShoot(type) {
      if (type === 'aoe') this.playTone(180, 'triangle', 0.25, 0.25, 50);
      else if (type === 'laser') this.playTone(880, 'sawtooth', 0.12, 0.18, 220);
      else if (type === 'slow') this.playTone(600, 'sine', 0.18, 0.2, 900);
      else this.playTone(440, 'square', 0.08, 0.15, 200);
    }

    playHit() { this.playTone(220, 'triangle', 0.06, 0.12, 110); }
    playCrit() { this.playTone(550, 'square', 0.12, 0.25, 880); }
    playExplosion() { this.playTone(140, 'sawtooth', 0.35, 0.3, 40); }
    playEnemyDeath() { this.playTone(320, 'sine', 0.09, 0.1, 120); }
    playCoin() {
      this.playTone(987.77, 'square', 0.08, 0.15);
      setTimeout(() => this.playTone(1318.51, 'square', 0.12, 0.15), 60);
    }
    playUpgrade() {
      this.playTone(523, 'triangle', 0.1, 0.2);
      setTimeout(() => this.playTone(659, 'triangle', 0.1, 0.2), 80);
      setTimeout(() => this.playTone(783, 'triangle', 0.15, 0.2), 160);
    }
    playBossAlert() {
      this.playTone(110, 'sawtooth', 0.6, 0.35, 70);
      setTimeout(() => this.playTone(90, 'sawtooth', 0.8, 0.4, 55), 400);
    }
    playGachaSpin() { this.playTone(500 + Math.random() * 400, 'square', 0.05, 0.1); }
    playGachaReveal(rarity) {
      if (rarity === 'secret' || rarity === 'mythic') {
        [523, 659, 783, 1046, 1318].forEach((n, i) => setTimeout(() => this.playTone(n, 'sawtooth', 0.3, 0.25), i * 120));
      } else if (rarity === 'legendary') {
        [440, 554, 659, 880].forEach((n, i) => setTimeout(() => this.playTone(n, 'triangle', 0.25, 0.2), i * 110));
      } else if (rarity === 'epic') {
        [392, 493, 587].forEach((n, i) => setTimeout(() => this.playTone(n, 'triangle', 0.2, 0.2), i * 100));
      } else {
        this.playTone(440, 'sine', 0.15, 0.18, 660);
      }
    }
    playVictory() {
      [523, 659, 783, 1046].forEach((n, i) => setTimeout(() => this.playTone(n, 'square', 0.25, 0.2), i * 150));
    }
    playDefeat() {
      [400, 360, 320, 280].forEach((n, i) => setTimeout(() => this.playTone(n, 'sawtooth', 0.3, 0.25), i * 180));
    }

    startBGM() {
      if (this.bgmPlaying) return;
      this.bgmPlaying = true;
      this.initContext();
      const melody = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 261.63, 220.0, 293.66, 349.23, 440.0, 587.33];
      let step = 0;
      const loop = () => {
        if (!this.bgmPlaying) return;
        if (!this.isMuted) {
          const freq = melody[step % melody.length];
          this.playTone(freq, 'sine', 0.22, 0.04);
          if (step % 4 === 0) this.playTone(freq / 2, 'triangle', 0.45, 0.05);
        }
        step++;
        this.bgmTimer = setTimeout(loop, 250);
      };
      loop();
    }
    stopBGM() {
      this.bgmPlaying = false;
      if (this.bgmTimer) {
        clearTimeout(this.bgmTimer);
        this.bgmTimer = null;
      }
    }
    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }
  }

  const soundEngine = new SoundEngine();

  // ==========================================
  // 6. ENGINE: PARTICLES & SCREEN SHAKE
  // ==========================================
  class ParticleSystem {
    constructor() {
      this.particles = [];
      this.floatingTexts = [];
      this.shockwaves = [];
      this.shakeIntensity = 0;
      this.shakeDecay = 0.9;
    }

    addScreenShake(amount = 8) {
      this.shakeIntensity = Math.max(this.shakeIntensity, amount);
    }

    addFloatingText(text, x, y, color = '#ffffff', isCrit = false, size = 12) {
      this.floatingTexts.push({
        text,
        x: x + (Math.random() * 8 - 4),
        y: y - 5,
        vy: -1.2,
        life: 1.0,
        color,
        isCrit,
        size: isCrit ? size * 1.35 : size
      });
    }

    createExplosion(x, y, color = '#f97316', count = 16, maxSpeed = 3.5, size = 4) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
        const speed = Math.random() * maxSpeed + 1.0;
        this.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: Math.random() * size + 2,
          life: 1.0,
          decay: Math.random() * 0.03 + 0.02
        });
      }
    }

    createMagicSpark(x, y, color = '#38bdf8', count = 6) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.0;
        this.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: Math.random() * 2.5 + 1.5,
          life: 1.0,
          decay: 0.04
        });
      }
    }

    addShockwave(x, y, maxRadius = 45, color = '#ffffff', duration = 0.4) {
      this.shockwaves.push({
        x, y, radius: 4, maxRadius, color, life: 1.0, decay: 1.0 / (duration * 60)
      });
    }

    update(dt) {
      if (this.shakeIntensity > 0.1) this.shakeIntensity *= this.shakeDecay;
      else this.shakeIntensity = 0;

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.life -= p.decay * dt * 60;
        if (p.life <= 0) this.particles.splice(i, 1);
      }

      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const ft = this.floatingTexts[i];
        ft.y += ft.vy * dt * 60;
        ft.life -= (1 / 60) * dt * 60;
        if (ft.life <= 0) this.floatingTexts.splice(i, 1);
      }

      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.15 * dt * 60;
        sw.life -= sw.decay * dt * 60;
        if (sw.life <= 0) this.shockwaves.splice(i, 1);
      }
    }

    draw(ctx) {
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

      for (const p of this.particles) {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(Math.floor(p.x - p.size / 2), Math.floor(p.y - p.size / 2), Math.floor(p.size), Math.floor(p.size));
        ctx.restore();
      }

      for (const ft of this.floatingTexts) {
        ctx.save();
        ctx.font = `bold ${Math.round(ft.size)}px 'Courier New', monospace`;
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.life);
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText(ft.text, ft.x, ft.y);
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }
    }
  }

  // ==========================================
  // 7. ENGINE: SAVE SYSTEM
  // ==========================================
  const SAVE_KEY = 'PIXEL_TOWER_DEFENSE_SAVE_V1';

  class SaveSystem {
    constructor() {
      this.data = this.getDefaultData();
      this.load();
    }

    getDefaultData() {
      return {
        gems: 250,
        unlockedTowers: ['archer', 'rock_slinger', 'frost_mage'],
        towerDuplicates: { archer: 1, rock_slinger: 1, frost_mage: 1 },
        equippedDeck: ['archer', 'rock_slinger', 'frost_mage'],
        progress: { unlockedChapter: 1, unlockedAct: 1, clearedActs: {} },
        stats: { totalGachaPulls: 0, totalEnemiesKilled: 0, totalBossesDefeated: 0, totalGoldSpent: 0 }
      };
    }

    load() {
      try {
        const json = localStorage.getItem(SAVE_KEY);
        if (json) {
          const parsed = JSON.parse(json);
          this.data = { ...this.getDefaultData(), ...parsed };
        }
      } catch (e) {
        this.data = this.getDefaultData();
      }
    }

    save() {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
      } catch (e) {}
    }

    getGems() { return this.data.gems; }
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
    isTowerUnlocked(id) { return this.data.unlockedTowers.includes(id); }
    unlockTower(id) {
      let isNew = false;
      if (!this.data.unlockedTowers.includes(id)) {
        this.data.unlockedTowers.push(id);
        this.data.towerDuplicates[id] = 1;
        isNew = true;
        if (this.data.equippedDeck.length < 5 && !this.data.equippedDeck.includes(id)) {
          this.data.equippedDeck.push(id);
        }
      } else {
        this.data.towerDuplicates[id] = (this.data.towerDuplicates[id] || 1) + 1;
      }
      this.data.stats.totalGachaPulls++;
      this.save();
      return { isNew, count: this.data.towerDuplicates[id] };
    }
    getUnlockedTowers() { return this.data.unlockedTowers; }
    getTowerCount(id) { return this.data.towerDuplicates[id] || 0; }
    getEquippedDeck() { return this.data.equippedDeck; }
    setEquippedDeck(deck) {
      const valid = deck.filter((id) => this.isTowerUnlocked(id)).slice(0, 5);
      if (valid.length > 0) {
        this.data.equippedDeck = valid;
        this.save();
        return true;
      }
      return false;
    }
    isActUnlocked(chId, actIdx) {
      if (chId === 1 && actIdx === 1) return true;
      if (chId < this.data.progress.unlockedChapter) return true;
      if (chId === this.data.progress.unlockedChapter && actIdx <= this.data.progress.unlockedAct) return true;
      return false;
    }
    getActProgress(chId, actIdx) {
      return this.data.progress.clearedActs[`ch${chId}_act${actIdx}`] || { cleared: false, stars: 0 };
    }
    completeAct(chId, actIdx, stars = 3, gemsReward = 50) {
      const key = `ch${chId}_act${actIdx}`;
      const prev = this.data.progress.clearedActs[key] || { cleared: false, stars: 0 };
      this.data.progress.clearedActs[key] = { cleared: true, stars: Math.max(prev.stars, stars) };

      if (chId === this.data.progress.unlockedChapter && actIdx === this.data.progress.unlockedAct) {
        if (actIdx < 6) this.data.progress.unlockedAct = actIdx + 1;
        else if (chId < 4) {
          this.data.progress.unlockedChapter = chId + 1;
          this.data.progress.unlockedAct = 1;
        }
      }
      this.data.gems += gemsReward;
      this.save();
    }
    giveCheatGems(amount = 500) {
      this.data.gems += amount;
      this.save();
    }
  }

  const saveSystem = new SaveSystem();

  // ==========================================
  // 8. GAMEPLAY: PATHFINDING & COMBAT
  // ==========================================
  class PathManager {
    constructor(waypoints = []) {
      this.setPath(waypoints);
    }
    setPath(waypoints) {
      this.waypoints = waypoints.map((pt) => ({
        x: pt.x * TILE_SIZE + TILE_SIZE / 2,
        y: pt.y * TILE_SIZE + TILE_SIZE / 2,
        gridX: pt.x,
        gridY: pt.y
      }));
      this.calculateSegments();
      this.buildMask();
    }
    calculateSegments() {
      this.segments = [];
      this.totalLength = 0;
      for (let i = 0; i < this.waypoints.length - 1; i++) {
        const p1 = this.waypoints[i];
        const p2 = this.waypoints[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.hypot(dx, dy);
        this.segments.push({ p1, p2, dx, dy, length, startDist: this.totalLength, endDist: this.totalLength + length });
        this.totalLength += length;
      }
    }
    buildMask() {
      this.pathGrid = Array(MAP_ROWS).fill(null).map(() => Array(MAP_COLS).fill(false));
      for (let i = 0; i < this.waypoints.length - 1; i++) {
        const p1 = this.waypoints[i];
        const p2 = this.waypoints[i + 1];
        const minX = Math.min(p1.gridX, p2.gridX);
        const maxX = Math.max(p1.gridX, p2.gridX);
        const minY = Math.min(p1.gridY, p2.gridY);
        const maxY = Math.max(p1.gridY, p2.gridY);
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            if (y >= 0 && y < MAP_ROWS && x >= 0 && x < MAP_COLS) this.pathGrid[y][x] = true;
          }
        }
      }
    }
    isPathTile(gx, gy) {
      if (gx < 0 || gx >= MAP_COLS || gy < 0 || gy >= MAP_ROWS) return true;
      return !!this.pathGrid[gy][gx];
    }
    getPositionAtDistance(distance) {
      if (this.segments.length === 0) return { x: 0, y: 0, angle: 0, reachedEnd: true };
      if (distance >= this.totalLength) {
        const last = this.waypoints[this.waypoints.length - 1];
        return { x: last.x, y: last.y, angle: 0, reachedEnd: true };
      }
      for (const seg of this.segments) {
        if (distance >= seg.startDist && distance <= seg.endDist) {
          const segDist = distance - seg.startDist;
          const progress = seg.length > 0 ? segDist / seg.length : 0;
          return { x: seg.p1.x + seg.dx * progress, y: seg.p1.y + seg.dy * progress, angle: Math.atan2(seg.dy, seg.dx), reachedEnd: false };
        }
      }
      return { x: this.waypoints[0].x, y: this.waypoints[0].y, angle: 0, reachedEnd: false };
    }
  }

  class Tower {
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
      this.targetStrategy = 'first';
      this.totalDamageDealt = 0;
      this.kills = 0;
      this.stunTimer = 0;
      this.buffDamageBonus = 0;
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

    canUpgrade() { return this.level < 5; }
    upgrade() {
      if (this.canUpgrade()) {
        this.level++;
        this.applyStats();
        return true;
      }
      return false;
    }

    getSellRefund() {
      let invested = this.rawConfig.cost;
      for (let l = 1; l < this.level; l++) invested += Math.round(this.rawConfig.upgradeBaseCost * Math.pow(1.65, l - 1));
      return Math.round(invested * 0.7);
    }

    update(dt, enemies, projectiles, particles, allTowers) {
      if (this.stunTimer > 0) {
        this.stunTimer -= dt;
        return;
      }
      if (this.cooldown > 0) this.cooldown -= dt;

      this.buffDamageBonus = 0;
      if (this.id !== 'holy_paladin') {
        for (const t of allTowers) {
          if (t.id === 'holy_paladin' && t !== this) {
            if (Math.hypot(t.x - this.x, t.y - this.y) <= t.rawConfig.buffRange) {
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
      const inRange = enemies.filter((e) => !e.isDead && !e.reachedEnd && Math.hypot(e.x - this.x, e.y - this.y) <= this.range);
      if (inRange.length === 0) return null;
      if (this.targetStrategy === 'strongest') return inRange.reduce((max, e) => (e.hp > max.hp ? e : max), inRange[0]);
      if (this.targetStrategy === 'last') return inRange.reduce((min, e) => (e.distance < min.distance ? e : min), inRange[0]);
      if (this.targetStrategy === 'closest') return inRange.reduce((cl, e) => Math.hypot(e.x - this.x, e.y - this.y) < Math.hypot(cl.x - this.x, cl.y - this.y) ? e : cl, inRange[0]);
      return inRange.reduce((max, e) => (e.distance > max.distance ? e : max), inRange[0]);
    }

    shoot(target, enemies, projectiles, particles) {
      soundEngine.playShoot(this.attackType);
      const finalDmg = Math.round(this.damage * (1 + this.buffDamageBonus));
      const isCrit = !!this.rawConfig.critChance && Math.random() < this.rawConfig.critChance;
      const dmg = isCrit ? Math.round(finalDmg * (this.rawConfig.critMultiplier || 2.0)) : finalDmg;

      if (this.attackType === 'laser') {
        target.takeDamage(dmg, isCrit, 'laser', particles, this);
        particles.createMagicSpark(target.x, target.y, '#fbbf24', 8);
        return;
      }
      if (this.attackType === 'supernova') {
        for (const e of enemies) {
          if (!e.isDead && !e.reachedEnd && Math.hypot(e.x - this.x, e.y - this.y) <= this.range * 1.5) {
            e.takeDamage(dmg, isCrit, 'fire', particles, this);
            e.applyStatus('burn', this.rawConfig.burnDuration || 4, this.rawConfig.burnDamage || 40);
          }
        }
        particles.createExplosion(this.x, this.y, '#ff0055', 24, 6, 6);
        particles.addShockwave(this.x, this.y, this.range, '#ff0055', 0.5);
        particles.addScreenShake(6);
        soundEngine.playExplosion();
        return;
      }

      projectiles.push(new Projectile({
        startX: this.x, startY: this.y, target, tower: this, damage: dmg, isCrit,
        attackType: this.attackType, speed: (this.rawConfig.bulletSpeed || 8) * 45,
        color: this.bulletColor, config: this.rawConfig
      }));
    }
  }

  class Projectile {
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
        if (Math.random() < 0.4) particles.createMagicSpark(this.x, this.y, this.color, 1);
      }
    }

    hit(enemies, particles) {
      if (this.attackType === 'aoe' || this.attackType === 'cosmic_meteor') {
        const radius = this.config.splashRadius || 55;
        soundEngine.playExplosion();
        particles.createExplosion(this.x, this.y, this.color, 18, 4.5, 4);
        particles.addShockwave(this.x, this.y, radius, this.color, 0.3);
        for (const e of enemies) {
          if (!e.isDead && !e.reachedEnd && Math.hypot(e.x - this.x, e.y - this.y) <= radius) {
            e.takeDamage(this.damage, this.isCrit, this.attackType, particles, this.tower);
          }
        }
      } else if (this.attackType === 'chain') {
        let currentTarget = this.target;
        let jumps = this.config.chainTargets || 4;
        const hitTargets = new Set();
        while (currentTarget && jumps > 0) {
          hitTargets.add(currentTarget);
          currentTarget.takeDamage(this.damage, this.isCrit, 'lightning', particles, this.tower);
          particles.createMagicSpark(currentTarget.x, currentTarget.y, '#c084fc', 8);
          let next = null;
          let minD = 120;
          for (const e of enemies) {
            if (!e.isDead && !e.reachedEnd && !hitTargets.has(e)) {
              const d = Math.hypot(e.x - currentTarget.x, e.y - currentTarget.y);
              if (d < minD) { minD = d; next = e; }
            }
          }
          currentTarget = next;
          jumps--;
        }
      } else {
        if (!this.target.isDead && !this.target.reachedEnd) {
          this.target.takeDamage(this.damage, this.isCrit, this.attackType, particles, this.tower);
          if (this.attackType === 'slow') this.target.applyStatus('slow', this.config.slowDuration || 2.5, this.config.slowAmount || 0.45);
          else if (this.attackType === 'dot') this.target.applyStatus('poison', this.config.dotDuration || 3.5, this.config.dotDamage || 15);
          else if (this.attackType === 'time_warp') {
            if (Math.random() < (this.config.freezeChance || 0.35)) this.target.applyStatus('freeze', this.config.freezeDuration || 1.5);
          } else if (this.attackType === 'glitch') {
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

  class Enemy {
    constructor(data, pathManager, hpMultiplier = 1.0, speedMultiplier = 1.0, isBoss = false) {
      this.rawConfig = data;
      this.id = data.id;
      this.name = data.name;
      this.isBoss = isBoss;
      this.maxHp = Math.round((data.hp || 100) * hpMultiplier);
      this.hp = this.maxHp;
      this.baseSpeed = (data.speed || 1.0) * speedMultiplier * 36;
      this.speed = this.baseSpeed;
      this.armor = data.armor || 0;
      this.rewardGold = data.rewardGold || 15;
      this.rewardGems = data.rewardGems || 1;
      this.spriteKey = data.spriteKey;
      this.size = data.size || 20;
      this.distance = 0;
      this.isDead = false;
      this.reachedEnd = false;
      this.status = { slowTimer: 0, slowAmount: 0, freezeTimer: 0, poisonTimer: 0, poisonDps: 0, burnTimer: 0, burnDps: 0 };
      this.bossAbility = data.ability || null;
      this.bossAbilityTimer = data.abilityCooldown || 6.0;
      this.shieldHp = 0;

      const pos = pathManager.getPositionAtDistance(0);
      this.x = pos.x;
      this.y = pos.y;
    }

    applyStatus(type, duration, val = 0) {
      if (type === 'slow') { this.status.slowTimer = Math.max(this.status.slowTimer, duration); this.status.slowAmount = Math.max(this.status.slowAmount, val); }
      else if (type === 'freeze') this.status.freezeTimer = Math.max(this.status.freezeTimer, duration);
      else if (type === 'poison') { this.status.poisonTimer = Math.max(this.status.poisonTimer, duration); this.status.poisonDps = val; }
      else if (type === 'burn') { this.status.burnTimer = Math.max(this.status.burnTimer, duration); this.status.burnDps = val; }
    }

    takeDamage(amount, isCrit = false, damageType = 'physical', particles = null, sourceTower = null) {
      if (this.isDead) return;
      let eff = damageType !== 'laser' && damageType !== 'glitch_execute' ? Math.max(1, amount - this.armor) : amount;

      if (this.shieldHp > 0) {
        if (this.shieldHp >= eff) {
          this.shieldHp -= eff;
          if (particles) particles.addFloatingText('SHIELD', this.x, this.y, '#38bdf8', false, 11);
          return;
        } else {
          eff -= this.shieldHp;
          this.shieldHp = 0;
        }
      }

      this.hp -= eff;
      if (sourceTower) sourceTower.totalDamageDealt += eff;

      if (particles) {
        const col = isCrit ? '#facc15' : damageType === 'fire' ? '#f97316' : '#ffffff';
        particles.addFloatingText(`${isCrit ? 'CRIT! ' : ''}-${eff}`, this.x, this.y, col, isCrit);
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

      let spd = this.baseSpeed;
      if (this.status.freezeTimer > 0) { this.status.freezeTimer -= dt; spd = 0; }
      else if (this.status.slowTimer > 0) { this.status.slowTimer -= dt; spd *= 1.0 - this.status.slowAmount; }

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

      this.distance += spd * dt;
      const pos = pathManager.getPositionAtDistance(this.distance);
      this.x = pos.x;
      this.y = pos.y;
      if (pos.reachedEnd) this.reachedEnd = true;

      if (this.isBoss && this.bossAbility) {
        this.bossAbilityTimer -= dt;
        if (this.bossAbility === 'regeneration') this.hp = Math.min(this.maxHp, this.hp + (this.rawConfig.healRate || 40) * dt);
        if (this.bossAbilityTimer <= 0) {
          this.bossAbilityTimer = this.rawConfig.abilityCooldown || 6.5;
          if (this.bossAbility === 'summon_minions') {
            game.spawnMinions(this.x, this.y, 2, 'goblin');
            game.particles.addFloatingText('SUMMON!', this.x, this.y - 20, '#22c55e', true, 14);
          } else if (this.bossAbility === 'magic_shield') {
            this.shieldHp = Math.round(this.maxHp * 0.25);
            game.particles.addFloatingText('BARRIER!', this.x, this.y - 20, '#38bdf8', true, 14);
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
    }

    draw(ctx, pixelRenderer) {
      if (this.isDead || this.reachedEnd) return;
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(this.x, this.y + this.size / 2 - 2, this.size / 2, this.size / 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      pixelRenderer.drawSprite(ctx, this.spriteKey, this.x, this.y, this.size * 1.5, this.size * 1.5);

      // Health bar
      const bw = Math.max(24, this.size * 1.4);
      const bh = this.isBoss ? 6 : 4;
      const bx = this.x - bw / 2;
      const by = this.y - this.size / 2 - (this.isBoss ? 12 : 8);

      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(Math.floor(bx - 1), Math.floor(by - 1), Math.floor(bw + 2), Math.floor(bh + 2));
      const ratio = Math.max(0, this.hp / this.maxHp);
      ctx.fillStyle = this.isBoss ? '#ef4444' : ratio > 0.5 ? '#22c55e' : ratio > 0.25 ? '#eab308' : '#dc2626';
      ctx.fillRect(Math.floor(bx), Math.floor(by), Math.floor(bw * ratio), Math.floor(bh));
      if (this.shieldHp > 0) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(Math.floor(bx), Math.floor(by - 3), Math.floor(bw), 2);
      }
      ctx.restore();
    }
  }

  // ==========================================
  // 9. GAMEPLAY: WAVE MANAGER & SPELLS
  // ==========================================
  class WaveManager {
    constructor(game, chapterId, actIndex) {
      this.game = game;
      this.chapterId = chapterId;
      this.actIndex = actIndex;
      this.waves = generateWavesForAct(chapterId, actIndex);
      this.currentWaveIndex = 0;
      this.isWaveInProgress = false;
      this.spawnQueue = [];
      this.waveTimer = 0;
    }

    getCurrentWaveNumber() { return this.currentWaveIndex + 1; }
    isLastWave() { return this.currentWaveIndex === 14; }

    startNextWave() {
      if (this.isWaveInProgress || this.currentWaveIndex >= 15) return;
      this.isWaveInProgress = true;
      this.waveTimer = 0;
      const waveData = this.waves[this.currentWaveIndex];

      if (waveData.isBossWave) {
        soundEngine.playBossAlert();
        this.game.particles.addScreenShake(12);
        this.game.showBossAnnouncement(getBossData(this.chapterId, this.actIndex));
      }
      this.spawnQueue = waveData.enemies.map((e) => ({ ...e, spawned: false }));
      this.game.onWaveStart(this.getCurrentWaveNumber(), waveData.isBossWave);
    }

    update(dt) {
      if (!this.isWaveInProgress) return;
      this.waveTimer += dt;
      for (const item of this.spawnQueue) {
        if (!item.spawned && this.waveTimer >= item.spawnDelay) {
          item.spawned = true;
          this.spawnEnemy(item);
        }
      }
      const allSpawned = this.spawnQueue.every((item) => item.spawned);
      if (allSpawned && this.game.enemies.length === 0) {
        this.completeWave();
      }
    }

    spawnEnemy(item) {
      if (item.isBoss) {
        const bossData = getBossData(this.chapterId, this.actIndex);
        this.game.enemies.push(new Enemy(bossData, this.game.pathManager, item.hpMultiplier || 1.0, item.speedMultiplier || 1.0, true));
      } else {
        const enemyData = ENEMY_TYPES[item.type] || ENEMY_TYPES.goblin;
        this.game.enemies.push(new Enemy(enemyData, this.game.pathManager, item.hpMultiplier || 1.0, item.speedMultiplier || 1.0, false));
      }
    }

    completeWave() {
      this.isWaveInProgress = false;
      const waveData = this.waves[this.currentWaveIndex];
      this.game.addGold(waveData.rewardGold);
      this.game.addGems(waveData.rewardGems);

      if (this.isLastWave()) {
        this.game.onActVictory();
      } else {
        this.currentWaveIndex++;
        this.game.onWaveComplete(this.getCurrentWaveNumber());
      }
    }
  }

  class SpellSystem {
    constructor(game) {
      this.game = game;
      this.cooldowns = { meteor: 0, blizzard: 0, gold_rush: 0 };
    }
    update(dt) {
      for (const k of Object.keys(this.cooldowns)) {
        if (this.cooldowns[k] > 0) this.cooldowns[k] -= dt;
      }
    }
    canCast(id) { return (this.cooldowns[id] || 0) <= 0; }
    castSpell(id, tx = null, ty = null) {
      if (!this.canCast(id)) return false;
      if (id === 'meteor') {
        const x = tx !== null ? tx : this.game.canvas.width / 2;
        const y = ty !== null ? ty : this.game.canvas.height / 2;
        this.game.particles.createExplosion(x, y, '#ef4444', 32, 6, 6);
        this.game.particles.addShockwave(x, y, 90, '#f97316', 0.5);
        this.game.particles.addScreenShake(12);
        soundEngine.playExplosion();
        for (const e of this.game.enemies) {
          if (Math.hypot(e.x - x, e.y - y) <= 90) {
            e.takeDamage(450, true, 'meteor', this.game.particles);
            e.applyStatus('burn', 4, 30);
          }
        }
        this.cooldowns[id] = 25;
      } else if (id === 'blizzard') {
        soundEngine.playShoot('slow');
        this.game.particles.addShockwave(this.game.canvas.width / 2, this.game.canvas.height / 2, 280, '#38bdf8', 0.8);
        for (const e of this.game.enemies) {
          e.applyStatus('freeze', 4.0);
          this.game.particles.createMagicSpark(e.x, e.y, '#bae6fd', 6);
        }
        this.cooldowns[id] = 35;
      } else if (id === 'gold_rush') {
        soundEngine.playCoin();
        this.game.addGold(200);
        this.game.particles.addFloatingText('+200 GOLD!', this.game.canvas.width / 2, 100, '#fbbf24', true, 16);
        this.cooldowns[id] = 40;
      }
      return true;
    }
  }

  // ==========================================
  // 10. UI CONTROLLERS: GACHA, INDEX, DECK, CHAPTERS
  // ==========================================
  class GachaUI {
    constructor(game) {
      this.game = game;
      this.modal = document.getElementById('gacha-modal');
      this.resultContainer = document.getElementById('gacha-result-cards');
      this.isPulling = false;
      this.bindEvents();
    }
    bindEvents() {
      document.getElementById('btn-gacha-1x')?.addEventListener('click', () => this.pull(1));
      document.getElementById('btn-gacha-10x')?.addEventListener('click', () => this.pull(10));
      document.getElementById('btn-close-gacha')?.addEventListener('click', () => this.hideModal());
      document.getElementById('btn-cheat-gems')?.addEventListener('click', () => {
        saveSystem.giveCheatGems(500);
        this.game.updateHeaderUI();
        soundEngine.playCoin();
      });
    }
    showModal() {
      this.modal.classList.remove('hidden');
      this.clearResults();
      this.game.updateHeaderUI();
    }
    hideModal() {
      if (this.isPulling) return;
      this.modal.classList.add('hidden');
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
    rollSingle(guaranteeEpic = false) {
      let pool = Object.keys(RARITIES);
      let chosenRarity = 'common';
      if (guaranteeEpic) {
        const high = ['epic', 'legendary', 'mythic', 'secret'];
        const total = high.reduce((a, r) => a + RARITIES[r].weight, 0);
        let rand = Math.random() * total;
        for (const r of high) {
          if (rand < RARITIES[r].weight) { chosenRarity = r; break; }
          rand -= RARITIES[r].weight;
        }
      } else {
        const total = pool.reduce((a, r) => a + RARITIES[r].weight, 0);
        let rand = Math.random() * total;
        for (const r of pool) {
          if (rand < RARITIES[r].weight) { chosenRarity = r; break; }
          rand -= RARITIES[r].weight;
        }
      }
      const match = Object.values(TOWERS_DATA).filter((t) => t.rarity === chosenRarity);
      return match[Math.floor(Math.random() * match.length)] || TOWERS_DATA.archer;
    }
    pull(count = 1) {
      if (this.isPulling) return;
      const cost = count === 1 ? 50 : 500;
      if (saveSystem.getGems() < cost) {
        alert(`Gems tidak cukup! Butuh ${cost} Gems.`);
        return;
      }
      saveSystem.spendGems(cost);
      this.game.updateHeaderUI();
      this.isPulling = true;
      soundEngine.playGachaSpin();

      this.resultContainer.innerHTML = `
        <div class="gacha-summoning-anim">
          <div class="summon-portal spinning"></div>
          <h3 class="summon-text">MEMANGGIL KEKUATAN DIMENSI...</h3>
        </div>
      `;

      setTimeout(() => this.displayResults(count), 1000);
    }
    displayResults(count) {
      const results = [];
      for (let i = 0; i < count; i++) {
        const isG = count === 10 && i === 9 && !results.some((r) => ['epic', 'legendary', 'mythic', 'secret'].includes(r.tower.rarity));
        const tower = this.rollSingle(isG);
        const unl = saveSystem.unlockTower(tower.id);
        results.push({ tower, isNew: unl.isNew, count: unl.count });
      }
      this.resultContainer.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = count === 1 ? 'gacha-cards-single' : 'gacha-cards-grid';

      results.forEach((res, i) => {
        const card = document.createElement('div');
        card.className = `gacha-card rarity-${res.tower.rarity}`;
        card.style.animationDelay = `${i * 0.1}s`;
        const rInfo = RARITIES[res.tower.rarity];
        card.innerHTML = `
          <div class="card-glow" style="background: radial-gradient(circle, ${rInfo.glow} 0%, transparent 70%);"></div>
          <div class="card-header">
            <span class="rarity-badge" style="background: ${rInfo.border}; color:#fff;">${rInfo.name.toUpperCase()}</span>
            ${res.isNew ? '<span class="new-tag">BARU!</span>' : `<span class="duplicate-tag">x${res.count}</span>`}
          </div>
          <div class="card-sprite-frame">${res.tower.icon}</div>
          <div class="card-body">
            <h4 class="tower-card-name" style="color: ${rInfo.textColor};">${res.tower.name}</h4>
            <div class="tower-stats-mini">
              <span>ATK: <b>${res.tower.damage}</b></span>
              <span>RNG: <b>${res.tower.range}</b></span>
            </div>
            <p class="tower-card-desc">${res.tower.description}</p>
          </div>
        `;
        grid.appendChild(card);
      });

      this.resultContainer.appendChild(grid);
      this.isPulling = false;
      this.game.updateHeaderUI();
      soundEngine.playGachaReveal(results[0].tower.rarity);
    }
  }

  class TowerIndexUI {
    constructor(game) {
      this.game = game;
      this.modal = document.getElementById('index-modal');
      this.grid = document.getElementById('index-grid');
      this.detailModal = document.getElementById('tower-detail-modal');
      this.currentFilter = 'all';
      this.bindEvents();
    }
    bindEvents() {
      document.getElementById('btn-close-index')?.addEventListener('click', () => this.hideModal());
      document.getElementById('btn-close-detail')?.addEventListener('click', () => this.hideDetailModal());
      document.querySelectorAll('.index-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.index-filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentFilter = btn.dataset.filter;
          this.render();
        });
      });
    }
    showModal() {
      this.modal.classList.remove('hidden');
      this.render();
      this.updateProgress();
    }
    hideModal() { this.modal.classList.add('hidden'); }
    hideDetailModal() { this.detailModal?.classList.add('hidden'); }
    updateProgress() {
      const total = Object.keys(TOWERS_DATA).length;
      const unl = saveSystem.getUnlockedTowers().length;
      const pct = Math.round((unl / total) * 100);
      const txt = document.getElementById('index-progress-text');
      const bar = document.getElementById('index-progress-bar');
      if (txt) txt.textContent = `Koleksi Terbuka: ${unl} / ${total} (${pct}%)`;
      if (bar) bar.style.width = `${pct}%`;
    }
    render() {
      if (!this.grid) return;
      this.grid.innerHTML = '';
      const list = Object.values(TOWERS_DATA).filter((t) => this.currentFilter === 'all' || t.rarity === this.currentFilter);

      list.forEach((tower) => {
        const isUnlocked = saveSystem.isTowerUnlocked(tower.id);
        const rInfo = RARITIES[tower.rarity];
        const card = document.createElement('div');
        card.className = `index-card ${isUnlocked ? 'unlocked' : 'locked'} rarity-${tower.rarity}`;

        if (isUnlocked) {
          const count = saveSystem.getTowerCount(tower.id);
          card.innerHTML = `
            <div class="index-card-header">
              <span class="rarity-badge" style="background: ${rInfo.border};">${rInfo.name.toUpperCase()}</span>
              <span class="shard-count">x${count}</span>
            </div>
            <div class="index-card-icon">${tower.icon}</div>
            <div class="index-card-name" style="color: ${rInfo.textColor};">${tower.name}</div>
            <div class="index-card-type">${tower.attackType.toUpperCase()}</div>
            <div class="index-quick-stats">
              <span>ATK: <b>${tower.damage}</b></span>
              <span>SPD: <b>${tower.attackSpeed}/s</b></span>
            </div>
          `;
          card.addEventListener('click', () => this.showDetail(tower));
        } else {
          card.innerHTML = `
            <div class="index-card-header">
              <span class="rarity-badge" style="background: ${rInfo.border};">${rInfo.name.toUpperCase()}</span>
              <span class="locked-icon">🔒</span>
            </div>
            <div class="index-card-icon silhouette">❓</div>
            <div class="index-card-name locked-text">???</div>
            <div class="index-card-type locked-text">TERKUNCI</div>
            <div class="index-quick-stats locked-hint"><span>Dapatkan dari Gacha</span></div>
          `;
        }
        this.grid.appendChild(card);
      });
    }
    showDetail(tower) {
      if (!this.detailModal) return;
      const rInfo = RARITIES[tower.rarity];
      const count = saveSystem.getTowerCount(tower.id);
      const content = document.getElementById('tower-detail-content');
      if (content) {
        content.innerHTML = `
          <div class="detail-header" style="border-bottom: 2px solid ${rInfo.border};">
            <div class="detail-icon">${tower.icon}</div>
            <div>
              <h3 style="color: ${rInfo.textColor};">${tower.name}</h3>
              <span class="rarity-badge" style="background: ${rInfo.border};">${rInfo.name.toUpperCase()} (${rInfo.stars}★)</span>
              <span class="duplicate-badge" style="margin-left:8px; font-size:11px; color:#fbbf24;">Koleksi: x${count}</span>
            </div>
          </div>
          <div class="detail-stats-grid">
            <div class="stat-box"><span class="stat-label">Damage</span><span class="stat-value">${tower.damage}</span></div>
            <div class="stat-box"><span class="stat-label">Kecepatan</span><span class="stat-value">${tower.attackSpeed}/s</span></div>
            <div class="stat-box"><span class="stat-label">Jangkauan</span><span class="stat-value">${tower.range} px</span></div>
            <div class="stat-box"><span class="stat-label">Biaya</span><span class="stat-value gold-text">${tower.cost} Gold</span></div>
            <div class="stat-box"><span class="stat-label">Tipe Serang</span><span class="stat-value">${tower.attackType.toUpperCase()}</span></div>
            <div class="stat-box"><span class="stat-label">Peluru Speed</span><span class="stat-value">${tower.bulletSpeed || 8}</span></div>
          </div>
          <div class="detail-skill-section"><h4>Kemampuan Khusus</h4><p>${tower.description}</p></div>
          <div class="detail-lore-section"><h4>Kisah Karakter</h4><p class="lore-text">"${tower.lore}"</p></div>
        `;
      }
      this.detailModal.classList.remove('hidden');
    }
  }

  class DeckUI {
    constructor(game) {
      this.game = game;
      this.modal = document.getElementById('deck-modal');
      this.slotsContainer = document.getElementById('deck-slots-container');
      this.poolContainer = document.getElementById('deck-unlocked-pool');
      this.bindEvents();
    }
    bindEvents() {
      document.getElementById('btn-close-deck')?.addEventListener('click', () => this.hideModal());
    }
    showModal() {
      this.modal.classList.remove('hidden');
      this.render();
    }
    hideModal() {
      this.modal.classList.add('hidden');
      this.game.updateBattleDeckHUD();
    }
    render() {
      if (!this.slotsContainer || !this.poolContainer) return;
      this.slotsContainer.innerHTML = '';
      this.poolContainer.innerHTML = '';

      const equipped = saveSystem.getEquippedDeck();

      for (let i = 0; i < 5; i++) {
        const towerId = equipped[i];
        const slotEl = document.createElement('div');
        slotEl.className = 'deck-slot';
        if (towerId && TOWERS_DATA[towerId]) {
          const tower = TOWERS_DATA[towerId];
          const rInfo = RARITIES[tower.rarity];
          slotEl.className += ` rarity-${tower.rarity}`;
          slotEl.innerHTML = `
            <div class="slot-badge" style="background: ${rInfo.border};">${rInfo.name.toUpperCase()}</div>
            <div class="slot-icon">${tower.icon}</div>
            <div class="slot-name" style="color: ${rInfo.textColor};">${tower.name}</div>
            <div class="slot-cost">${tower.cost} Gold</div>
            <button class="btn-remove-deck">×</button>
          `;
          slotEl.querySelector('.btn-remove-deck').addEventListener('click', (e) => {
            e.stopPropagation();
            if (equipped.length <= 1) { alert('Minimal harus ada 1 Tower di Deck!'); return; }
            saveSystem.setEquippedDeck(equipped.filter((id) => id !== towerId));
            this.render();
          });
        } else {
          slotEl.className += ' empty-slot';
          slotEl.innerHTML = `<div class="empty-slot-icon">+</div><div class="empty-slot-text">Slot Kosong (${i + 1}/5)</div>`;
        }
        this.slotsContainer.appendChild(slotEl);
      }

      saveSystem.getUnlockedTowers().forEach((towerId) => {
        const tower = TOWERS_DATA[towerId];
        if (!tower) return;
        const isEq = equipped.includes(towerId);
        const rInfo = RARITIES[tower.rarity];
        const poolEl = document.createElement('div');
        poolEl.className = `pool-card rarity-${tower.rarity} ${isEq ? 'is-equipped' : ''}`;
        poolEl.innerHTML = `
          <div class="pool-header">
            <span class="rarity-badge" style="background: ${rInfo.border};">${rInfo.name.toUpperCase()}</span>
            ${isEq ? '<span class="equipped-tag">TERPASANG</span>' : ''}
          </div>
          <div class="pool-icon">${tower.icon}</div>
          <div class="pool-name" style="color: ${rInfo.textColor};">${tower.name}</div>
          <div class="pool-stats"><span>ATK: <b>${tower.damage}</b></span><span>RNG: <b>${tower.range}</b></span></div>
          <button class="btn-equip-action ${isEq ? 'btn-unequip' : 'btn-equip'}">${isEq ? 'Lepas' : 'Pasang'}</button>
        `;
        poolEl.querySelector('.btn-equip-action').addEventListener('click', () => {
          const cur = saveSystem.getEquippedDeck();
          if (isEq) {
            if (cur.length <= 1) { alert('Minimal 1 Tower di Deck!'); return; }
            saveSystem.setEquippedDeck(cur.filter((id) => id !== towerId));
          } else {
            if (cur.length >= 5) { alert('Deck penuh! Maksimal 5 Tower.'); return; }
            cur.push(towerId);
            saveSystem.setEquippedDeck(cur);
          }
          this.render();
        });
        this.poolContainer.appendChild(poolEl);
      });
    }
  }

  class ChapterSelectUI {
    constructor(game) {
      this.game = game;
      this.modal = document.getElementById('chapter-modal');
      this.tabs = document.getElementById('chapter-tabs');
      this.grid = document.getElementById('acts-grid');
      this.selectedChapterId = 1;
      this.bindEvents();
    }
    bindEvents() {
      document.getElementById('btn-close-chapter')?.addEventListener('click', () => this.hideModal());
    }
    showModal() {
      this.modal.classList.remove('hidden');
      this.render();
    }
    hideModal() { this.modal.classList.add('hidden'); }
    render() {
      if (!this.tabs || !this.grid) return;
      this.tabs.innerHTML = '';
      this.grid.innerHTML = '';

      CHAPTERS_DATA.forEach((ch) => {
        const isUnl = ch.id <= saveSystem.data.progress.unlockedChapter;
        const tab = document.createElement('button');
        tab.className = `chapter-tab-btn ${this.selectedChapterId === ch.id ? 'active' : ''} ${!isUnl ? 'locked' : ''}`;
        tab.innerHTML = `<div class="tab-badge">${isUnl ? `BAB ${ch.id}` : '🔒'}</div><div class="tab-title">${ch.name}</div>`;
        if (isUnl) {
          tab.addEventListener('click', () => {
            this.selectedChapterId = ch.id;
            this.render();
          });
        }
        this.tabs.appendChild(tab);
      });

      const chapter = CHAPTERS_DATA.find((c) => c.id === this.selectedChapterId);
      if (!chapter) return;

      chapter.acts.forEach((act) => {
        const isUnl = saveSystem.isActUnlocked(chapter.id, act.act);
        const prog = saveSystem.getActProgress(chapter.id, act.act);
        const boss = getBossData(chapter.id, act.act);
        const card = document.createElement('div');
        card.className = `act-card ${isUnl ? 'unlocked' : 'locked'}`;

        if (isUnl) {
          const stars = '★'.repeat(prog.stars) + '☆'.repeat(3 - prog.stars);
          card.innerHTML = `
            <div class="act-card-header">
              <span class="act-number-badge">ACT ${act.act}</span>
              <span class="act-stars ${prog.stars > 0 ? 'earned' : ''}">${stars}</span>
            </div>
            <h3 class="act-title">${act.name}</h3>
            <p class="act-desc">${act.desc}</p>
            <div class="act-boss-info"><span class="boss-icon">${boss.icon}</span><span>Boss W15: <b>${boss.name}</b></span></div>
            <div class="act-rewards-info">
              <span>Modal: <b class="gold-text">${act.startGold} Gold</b></span>
              <span>Hadiah: <b class="gem-text">+${prog.cleared ? act.repeatGems : act.firstClearGems} Gems</b></span>
            </div>
            <button class="btn-play-act">Mulai Pertempuran</button>
          `;
          card.querySelector('.btn-play-act').addEventListener('click', () => {
            this.hideModal();
            this.game.loadMatch(chapter.id, act.act);
          });
        } else {
          card.innerHTML = `
            <div class="act-card-header"><span class="act-number-badge">ACT ${act.act}</span><span>🔒</span></div>
            <h3 class="act-title locked-text">Terkunci</h3>
            <p class="act-desc">Selesaikan Act sebelumnya untuk membuka peta ini.</p>
            <button class="btn-play-act disabled" disabled>Terkunci</button>
          `;
        }
        this.grid.appendChild(card);
      });
    }
  }

  // ==========================================
  // 11. MAIN GAME ORCHESTRATOR
  // ==========================================
  class Game {
    constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ctx = this.canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = false;

      this.pixelRenderer = new PixelRenderer();
      this.particles = new ParticleSystem();
      this.spellSystem = new SpellSystem(this);

      this.currentChapterId = 1;
      this.currentActIndex = 1;
      this.gold = 500;
      this.baseHp = 20;
      this.maxBaseHp = 20;
      this.isPaused = false;
      this.gameSpeed = 1;
      this.isGameOver = false;
      this.isVictory = false;

      this.towers = [];
      this.enemies = [];
      this.projectiles = [];
      this.pathManager = null;
      this.waveManager = null;

      this.selectedTowerToPlace = null;
      this.hoverGridX = -1;
      this.hoverGridY = -1;
      this.selectedPlacedTower = null;
      this.activeSpellId = null;

      this.initDOM();
      this.bindEvents();

      this.gachaUI = new GachaUI(this);
      this.towerIndexUI = new TowerIndexUI(this);
      this.deckUI = new DeckUI(this);
      this.chapterSelectUI = new ChapterSelectUI(this);

      this.lastTime = performance.now();

      this.loadMatch(1, 1);
      this.updateHeaderUI();
      this.updateBattleDeckHUD();

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
      document.getElementById('btn-nav-gacha')?.addEventListener('click', () => this.gachaUI.showModal());
      document.getElementById('btn-nav-index')?.addEventListener('click', () => this.towerIndexUI.showModal());
      document.getElementById('btn-nav-deck')?.addEventListener('click', () => this.deckUI.showModal());
      document.getElementById('btn-nav-chapters')?.addEventListener('click', () => this.chapterSelectUI.showModal());

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

      document.querySelectorAll('.btn-speed').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.btn-speed').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.gameSpeed = parseFloat(btn.dataset.speed || '1');
        });
      });

      this.btnStartWave?.addEventListener('click', () => {
        if (this.waveManager && !this.waveManager.isWaveInProgress) {
          this.waveManager.startNextWave();
        }
      });

      this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.canvas.addEventListener('mouseleave', () => { this.hoverGridX = -1; this.hoverGridY = -1; });
      this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
      this.canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); this.cancelSelection(); });

      document.querySelectorAll('.spell-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.spell;
          if (id === 'gold_rush') this.spellSystem.castSpell('gold_rush');
          else if (this.spellSystem.canCast(id)) {
            if (id === 'blizzard') this.spellSystem.castSpell('blizzard');
            else { this.activeSpellId = id; this.selectedTowerToPlace = null; }
          }
        });
      });

      document.getElementById('btn-upgrade-tower')?.addEventListener('click', () => this.upgradeSelectedTower());
      document.getElementById('btn-sell-tower')?.addEventListener('click', () => this.sellSelectedTower());
      document.getElementById('btn-target-strategy')?.addEventListener('click', () => this.toggleTargetStrategy());
      document.getElementById('btn-close-inspector')?.addEventListener('click', () => this.deselectTower());

      document.getElementById('btn-victory-next')?.addEventListener('click', () => {
        document.getElementById('victory-modal').classList.add('hidden');
        if (this.currentActIndex < 6) this.loadMatch(this.currentChapterId, this.currentActIndex + 1);
        else if (this.currentChapterId < 4) this.loadMatch(this.currentChapterId + 1, 1);
        else this.chapterSelectUI.showModal();
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

      if (this.chapterTitleEl) this.chapterTitleEl.textContent = `BAB ${chapterId} • ACT ${actIndex} (${act.name})`;

      this.updateHeaderUI();
      this.updateWaveUI(1, false);
    }

    updateHeaderUI() {
      if (this.goldEl) this.goldEl.textContent = this.gold;
      if (this.gemsEl) this.gemsEl.textContent = saveSystem.getGems();
      if (this.hpEl) this.hpEl.textContent = `${this.baseHp} / ${this.maxBaseHp}`;
    }

    updateWaveUI(waveNumber, isBossWave = false) {
      if (this.waveEl) {
        this.waveEl.innerHTML = isBossWave ? `<span style="color:#ef4444; font-weight:bold;">WAVE 15 (BOSS)</span>` : `Wave ${waveNumber} / 15`;
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

      const equipped = saveSystem.getEquippedDeck();

      equipped.forEach((towerId) => {
        const towerData = TOWERS_DATA[towerId];
        if (!towerData) return;

        const btn = document.createElement('button');
        btn.className = `battle-tower-btn rarity-${towerData.rarity}`;
        btn.innerHTML = `
          <div class="tower-btn-icon">${towerData.icon}</div>
          <div class="tower-btn-info">
            <div class="tower-btn-name">${towerData.name}</div>
            <div class="tower-btn-cost">${towerData.cost} G</div>
          </div>
        `;
        btn.addEventListener('click', () => {
          if (this.gold >= towerData.cost) {
            this.selectedTowerToPlace = towerData;
            this.activeSpellId = null;
            this.deselectTower();
          } else {
            this.particles.addFloatingText('GOLD KURANG!', this.canvas.width / 2, 80, '#ef4444', true, 14);
            soundEngine.playTone(200, 'sawtooth', 0.1, 0.2);
          }
        });
        deckContainer.appendChild(btn);
      });
    }

    cancelSelection() {
      this.selectedTowerToPlace = null;
      this.activeSpellId = null;
    }

    onMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.hoverGridX = Math.floor(((e.clientX - rect.left) * scaleX) / TILE_SIZE);
      this.hoverGridY = Math.floor(((e.clientY - rect.top) * scaleY) / TILE_SIZE);
    }

    onCanvasClick() {
      if (this.hoverGridX < 0 || this.hoverGridX >= MAP_COLS || this.hoverGridY < 0 || this.hoverGridY >= MAP_ROWS) return;
      const clickX = this.hoverGridX * TILE_SIZE + TILE_SIZE / 2;
      const clickY = this.hoverGridY * TILE_SIZE + TILE_SIZE / 2;

      if (this.activeSpellId) {
        this.spellSystem.castSpell(this.activeSpellId, clickX, clickY);
        this.activeSpellId = null;
        return;
      }

      if (this.selectedTowerToPlace) {
        if (this.canPlaceTowerAt(this.hoverGridX, this.hoverGridY)) {
          this.placeTower(this.selectedTowerToPlace, this.hoverGridX, this.hoverGridY);
        } else {
          this.particles.addFloatingText('LOKASI TIDAK VALID!', clickX, clickY, '#ef4444', true, 12);
          soundEngine.playTone(180, 'sawtooth', 0.08, 0.2);
        }
        return;
      }

      const clicked = this.towers.find((t) => t.gridX === this.hoverGridX && t.gridY === this.hoverGridY);
      if (clicked) this.selectPlacedTower(clicked);
      else this.deselectTower();
    }

    canPlaceTowerAt(gx, gy) {
      if (this.pathManager.isPathTile(gx, gy)) return false;
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
      if (btnSell) btnSell.textContent = `Jual (+${tower.getSellRefund()} G)`;
      if (btnStrat) btnStrat.textContent = `Target: ${tower.targetStrategy.toUpperCase()}`;
    }

    deselectTower() {
      this.selectedPlacedTower = null;
      if (this.towerInspector) this.towerInspector.classList.add('hidden');
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
      this.gold += this.selectedPlacedTower.getSellRefund();
      this.towers = this.towers.filter((t) => t !== this.selectedPlacedTower);
      this.particles.createMagicSpark(this.selectedPlacedTower.x, this.selectedPlacedTower.y, '#fbbf24', 8);
      soundEngine.playCoin();
      this.deselectTower();
      this.updateHeaderUI();
    }

    toggleTargetStrategy() {
      if (!this.selectedPlacedTower) return;
      const strats = ['first', 'last', 'strongest', 'closest'];
      const next = strats[(strats.indexOf(this.selectedPlacedTower.targetStrategy) + 1) % strats.length];
      this.selectedPlacedTower.targetStrategy = next;
      this.selectPlacedTower(this.selectedPlacedTower);
    }

    addGold(amount) {
      this.gold += amount;
      this.updateHeaderUI();
    }

    addGems(amount) {
      saveSystem.addGems(amount);
      this.updateHeaderUI();
    }

    spawnMinions(x, y, count, type) {
      const eData = ENEMY_TYPES[type] || ENEMY_TYPES.goblin;
      for (let i = 0; i < count; i++) {
        const m = new Enemy(eData, this.pathManager, 1.0, 1.2, false);
        m.distance = Math.max(0, this.enemies[0]?.distance || 0);
        this.enemies.push(m);
      }
    }

    stunNearbyTowers(x, y, radius, dur) {
      for (const t of this.towers) {
        if (Math.hypot(t.x - x, t.y - y) <= radius) {
          t.stunTimer = dur;
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
      setTimeout(() => this.bossBanner.classList.add('hidden'), 4000);
    }

    onWaveStart(w, isBoss) { this.updateWaveUI(w, isBoss); }
    onWaveComplete(w) {
      this.updateWaveUI(w, false);
      this.particles.addFloatingText('WAVE SELESAI!', this.canvas.width / 2, 70, '#22c55e', true, 14);
    }

    onActVictory() {
      this.isVictory = true;
      soundEngine.playVictory();
      const stars = this.baseHp === this.maxBaseHp ? 3 : this.baseHp >= this.maxBaseHp * 0.5 ? 2 : 1;
      const ch = CHAPTERS_DATA.find((c) => c.id === this.currentChapterId);
      const act = ch.acts.find((a) => a.act === this.currentActIndex);
      const reward = act.firstClearGems || 150;

      saveSystem.completeAct(this.currentChapterId, this.currentActIndex, stars, reward);

      const modal = document.getElementById('victory-modal');
      if (modal) {
        document.getElementById('victory-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
        document.getElementById('victory-act-title').textContent = `BAB ${this.currentChapterId} • ACT ${this.currentActIndex}: ${act.name}`;
        document.getElementById('victory-gems-earned').textContent = `+${reward} Gems`;
        modal.classList.remove('hidden');
      }
    }

    onGameOver() {
      this.isGameOver = true;
      soundEngine.playDefeat();
      const modal = document.getElementById('defeat-modal');
      if (modal) {
        document.getElementById('defeat-act-title').textContent = `BAB ${this.currentChapterId} • ACT ${this.currentActIndex}`;
        modal.classList.remove('hidden');
      }
    }

    gameLoop(timestamp) {
      const dt = Math.min(0.1, (timestamp - this.lastTime) / 1000) * (this.isPaused ? 0 : this.gameSpeed);
      this.lastTime = timestamp;

      this.update(dt);
      this.render();

      requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
      if (this.isGameOver || this.isVictory || dt === 0) return;

      this.spellSystem.update(dt);
      this.particles.update(dt);

      if (this.waveManager) this.waveManager.update(dt);

      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        e.update(dt, this.pathManager, this);
        if (e.isDead) {
          this.addGold(e.rewardGold);
          this.addGems(e.rewardGems);
          this.particles.createExplosion(e.x, e.y, e.rawConfig.color || '#22c55e', 14, 3, 3);
          this.enemies.splice(i, 1);
        } else if (e.reachedEnd) {
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

      for (const t of this.towers) {
        t.update(dt, this.enemies, this.projectiles, this.particles, this.towers);
      }

      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.update(dt, this.enemies, this.particles);
        if (p.isDead) this.projectiles.splice(i, 1);
      }
    }

    render() {
      this.ctx.save();
      if (this.particles.shakeIntensity > 0) {
        const sx = (Math.random() * 2 - 1) * this.particles.shakeIntensity;
        const sy = (Math.random() * 2 - 1) * this.particles.shakeIntensity;
        this.ctx.translate(sx, sy);
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.renderMap();

      for (const t of this.towers) {
        if (t.id === 'holy_paladin') {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(t.x, t.y, t.rawConfig.buffRange, 0, Math.PI * 2);
          this.ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
          this.ctx.fill();
          this.ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
          this.ctx.stroke();
          this.ctx.restore();
        }
        this.pixelRenderer.drawSprite(this.ctx, t.spriteKey, t.x, t.y, 32, 32);
        this.ctx.save();
        this.ctx.font = 'bold 9px monospace';
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Lv.${t.level}`, t.x, t.y + 14);
        this.ctx.restore();
      }

      for (const e of this.enemies) e.draw(this.ctx, this.pixelRenderer);
      for (const p of this.projectiles) p.draw(this.ctx);
      this.particles.draw(this.ctx);

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

      if (this.selectedTowerToPlace && this.hoverGridX >= 0 && this.hoverGridY >= 0) {
        const px = this.hoverGridX * TILE_SIZE + TILE_SIZE / 2;
        const py = this.hoverGridY * TILE_SIZE + TILE_SIZE / 2;
        const isValid = this.canPlaceTowerAt(this.hoverGridX, this.hoverGridY);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(px, py, this.selectedTowerToPlace.range, 0, Math.PI * 2);
        this.ctx.fillStyle = isValid ? 'rgba(34, 197, 94, 0.18)' : 'rgba(239, 68, 68, 0.18)';
        this.ctx.fill();
        this.ctx.strokeStyle = isValid ? '#22c55e' : '#ef4444';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        this.ctx.fillStyle = isValid ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';
        this.ctx.fillRect(this.hoverGridX * TILE_SIZE, this.hoverGridY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.pixelRenderer.drawSprite(this.ctx, this.selectedTowerToPlace.spriteKey, px, py, 32, 32, 0, 0.7);
        this.ctx.restore();
      }

      this.ctx.restore();
    }

    renderMap() {
      const ch = CHAPTERS_DATA.find((c) => c.id === this.currentChapterId);
      const th = ch?.theme || 'forest';
      const tileKey = th === 'volcano' ? 'tile_lava' : th === 'snow' ? 'tile_ice' : th === 'abyss' ? 'tile_void' : 'tile_grass_forest';

      for (let r = 0; r < MAP_ROWS; r++) {
        for (let c = 0; c < MAP_COLS; c++) {
          const x = c * TILE_SIZE + TILE_SIZE / 2;
          const y = r * TILE_SIZE + TILE_SIZE / 2;
          if (this.pathManager.isPathTile(c, r)) {
            this.pixelRenderer.drawSprite(this.ctx, 'tile_path_forest', x, y, TILE_SIZE, TILE_SIZE);
          } else {
            this.pixelRenderer.drawSprite(this.ctx, tileKey, x, y, TILE_SIZE, TILE_SIZE);
          }
        }
      }

      if (this.pathManager && this.pathManager.waypoints.length > 0) {
        const start = this.pathManager.waypoints[0];
        const end = this.pathManager.waypoints[this.pathManager.waypoints.length - 1];
        this.pixelRenderer.drawSprite(this.ctx, 'tile_portal', start.x, start.y, TILE_SIZE, TILE_SIZE);
        this.pixelRenderer.drawSprite(this.ctx, 'tile_castle', end.x, end.y, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  // Auto-init on DOMContentLoaded or immediate if document is ready
  function initGame() {
    if (!window.gameInstance) {
      window.gameInstance = new Game();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
})();
