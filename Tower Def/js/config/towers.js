/**
 * Tower Database & Rarity Config
 * 6 Tiers: Common, Rare, Epic, Legendary, Mythic, Secret
 */

export const RARITIES = {
  common: {
    name: 'Common',
    color: '#a0aec0',
    border: '#718096',
    glow: 'rgba(160, 174, 192, 0.4)',
    bgGradient: 'linear-gradient(135deg, #2d3748, #1a202c)',
    weight: 50.0,
    textColor: '#cbd5e0',
    stars: 1,
    badge: '★'
  },
  rare: {
    name: 'Rare',
    color: '#4299e1',
    border: '#2b6cb0',
    glow: 'rgba(66, 153, 225, 0.5)',
    bgGradient: 'linear-gradient(135deg, #1a365d, #0f172a)',
    weight: 30.0,
    textColor: '#63b3ed',
    stars: 2,
    badge: '★★'
  },
  epic: {
    name: 'Epic',
    color: '#9f7aea',
    border: '#6b46c1',
    glow: 'rgba(159, 122, 234, 0.6)',
    bgGradient: 'linear-gradient(135deg, #321e54, #180d2b)',
    weight: 14.0,
    textColor: '#b794f4',
    stars: 3,
    badge: '★★★'
  },
  legendary: {
    name: 'Legendary',
    color: '#ecc94b',
    border: '#b7791f',
    glow: 'rgba(236, 201, 75, 0.7)',
    bgGradient: 'linear-gradient(135deg, #5f370e, #2e1a04)',
    weight: 4.8,
    textColor: '#f6e05e',
    stars: 4,
    badge: '★★★★'
  },
  mythic: {
    name: 'Mythic',
    color: '#f56565',
    border: '#c53030',
    glow: 'rgba(245, 101, 101, 0.85)',
    bgGradient: 'linear-gradient(135deg, #681717, #2c0b0e)',
    weight: 1.0,
    textColor: '#fc8181',
    stars: 5,
    badge: '★★★★★'
  },
  secret: {
    name: 'Secret',
    color: '#00f5d4',
    border: '#00bbf9',
    glow: 'rgba(0, 245, 212, 0.95)',
    bgGradient: 'linear-gradient(135deg, #053b3b, #001220)',
    weight: 0.2,
    textColor: '#70e000',
    stars: 6,
    badge: '★SECRET★'
  }
};

export const TOWERS_DATA = {
  // COMMON
  archer: {
    id: 'archer',
    name: 'Archer Guard',
    rarity: 'common',
    cost: 100,
    upgradeBaseCost: 75,
    damage: 18,
    range: 120,
    attackSpeed: 1.2, // attacks per sec
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
    slowAmount: 0.45, // 45% slow
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
    chainDecay: 0.8,
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
    buffDamageBonus: 0.25, // +25% damage to nearby towers
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
    vortexPull: 2.0,
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
    splashRadius: 85,
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
    executeHpThreshold: 0.15, // Instantly deletes enemies below 15% HP
    glitchChain: 6,
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

/**
 * Mendapatkan Tower berdasarkan ID
 */
export function getTowerData(id) {
  return TOWERS_DATA[id] || null;
}

/**
 * Menghitung stats tower berdasarkan level (1-5)
 */
export function calculateTowerStats(baseData, level = 1) {
  const levelMult = 1 + (level - 1) * 0.45; // +45% stat per level
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
