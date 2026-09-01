/**
 * Database Chapter (1-4) & Act (1-6)
 * Total 24 Act Peta Unik dengan 15 Wave per Act + Boss di Wave 15
 */

export const MAP_COLS = 24;
export const MAP_ROWS = 16;
export const TILE_SIZE = 32; // 32x32 pixel

export const CHAPTERS_DATA = [
  {
    id: 1,
    name: 'Whispering Woods',
    title: 'Bab 1: Hutan Mistis',
    desc: 'Lembah hijau berangin yang dipenuhi gerombolan Goblin dan monster liar.',
    theme: 'forest',
    themeColor: '#22c55e',
    tileColors: {
      grass: '#2d6a4f',
      grassAlt: '#1b4332',
      path: '#997b66',
      pathBorder: '#6c584c',
      decor: '#52b788',
      water: '#2a6f97'
    },
    acts: [
      {
        act: 1,
        name: 'Garis Batas Hutan',
        desc: 'Gerbang masuk hutan. Jalur lurus sederhana yang cocok untuk melatih formasi tower.',
        startGold: 450,
        baseHp: 20,
        firstClearGems: 150,
        repeatGems: 45,
        path: [
          { x: 0, y: 8 },
          { x: 7, y: 8 },
          { x: 7, y: 4 },
          { x: 16, y: 4 },
          { x: 16, y: 11 },
          { x: 23, y: 11 }
        ]
      },
      {
        act: 2,
        name: 'Rawa Purba Kelam',
        desc: 'Jalur berlumpur berkelok di tengah rawa beracun dan pohon kuno.',
        startGold: 480,
        baseHp: 20,
        firstClearGems: 175,
        repeatGems: 50,
        path: [
          { x: 0, y: 3 },
          { x: 6, y: 3 },
          { x: 6, y: 12 },
          { x: 13, y: 12 },
          { x: 13, y: 4 },
          { x: 19, y: 4 },
          { x: 19, y: 10 },
          { x: 23, y: 10 }
        ]
      },
      {
        act: 3,
        name: 'Lembah Serigala Liar',
        desc: 'Wilayah perburuan kawanan serigala buas yang bergerak sangat lincah.',
        startGold: 500,
        baseHp: 20,
        firstClearGems: 200,
        repeatGems: 55,
        path: [
          { x: 3, y: 0 },
          { x: 3, y: 7 },
          { x: 11, y: 7 },
          { x: 11, y: 2 },
          { x: 18, y: 2 },
          { x: 18, y: 13 },
          { x: 8, y: 13 },
          { x: 8, y: 15 }
        ]
      },
      {
        act: 4,
        name: 'Kuil Sihir Terlupakan',
        desc: 'Reruntuhan candi suci di mana energi sihir menarik makhluk gaib dan penyihir.',
        startGold: 520,
        baseHp: 20,
        firstClearGems: 220,
        repeatGems: 60,
        path: [
          { x: 0, y: 13 },
          { x: 5, y: 13 },
          { x: 5, y: 4 },
          { x: 12, y: 4 },
          { x: 12, y: 11 },
          { x: 19, y: 11 },
          { x: 19, y: 2 },
          { x: 23, y: 2 }
        ]
      },
      {
        act: 5,
        name: 'Ngarai Batu Terbelah',
        desc: 'Celah tebing terjal yang sempit dengan pertahanan kokoh para titan batu.',
        startGold: 550,
        baseHp: 20,
        firstClearGems: 250,
        repeatGems: 65,
        path: [
          { x: 12, y: 0 },
          { x: 12, y: 5 },
          { x: 4, y: 5 },
          { x: 4, y: 11 },
          { x: 20, y: 11 },
          { x: 20, y: 5 },
          { x: 17, y: 5 },
          { x: 17, y: 15 }
        ]
      },
      {
        act: 6,
        name: 'Sarang Naga Sylvan',
        desc: 'Puncak tertinggi hutan rimba tempat bersemayamnya Sylvan the Forest Drake!',
        startGold: 600,
        baseHp: 25,
        firstClearGems: 350,
        repeatGems: 80,
        path: [
          { x: 0, y: 2 },
          { x: 8, y: 2 },
          { x: 8, y: 13 },
          { x: 15, y: 13 },
          { x: 15, y: 3 },
          { x: 21, y: 3 },
          { x: 21, y: 14 },
          { x: 23, y: 14 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Scorched Badlands',
    title: 'Bab 2: Gurun Lahar',
    desc: 'Bumi hangus membara penuh sungai magma cair dan prajurit berapi ganas.',
    theme: 'volcano',
    themeColor: '#f97316',
    tileColors: {
      grass: '#441d15',
      grassAlt: '#2c120c',
      path: '#78350f',
      pathBorder: '#451a03',
      decor: '#dc2626',
      water: '#ea580c' // Lava
    },
    acts: [
      {
        act: 1,
        name: 'Gerbang Cadas Api',
        desc: 'Tanah retak bertabur bara api di mulut kawah gunung berapi.',
        startGold: 500,
        baseHp: 20,
        firstClearGems: 200,
        repeatGems: 60,
        path: [
          { x: 0, y: 6 },
          { x: 10, y: 6 },
          { x: 10, y: 12 },
          { x: 18, y: 12 },
          { x: 18, y: 4 },
          { x: 23, y: 4 }
        ]
      },
      {
        act: 2,
        name: 'Lembah Abu Panas',
        desc: 'Kabut belerang dan abu vulkanik menyamarkan pergerakan pasukan monster.',
        startGold: 530,
        baseHp: 20,
        firstClearGems: 220,
        repeatGems: 65,
        path: [
          { x: 0, y: 14 },
          { x: 6, y: 14 },
          { x: 6, y: 7 },
          { x: 14, y: 7 },
          { x: 14, y: 13 },
          { x: 20, y: 13 },
          { x: 20, y: 3 },
          { x: 23, y: 3 }
        ]
      },
      {
        act: 3,
        name: 'Sungai Magma Berpijar',
        desc: 'Jembatan cadas rapuh melintasi danau lahar pijar yang mendidih.',
        startGold: 560,
        baseHp: 20,
        firstClearGems: 240,
        repeatGems: 70,
        path: [
          { x: 0, y: 3 },
          { x: 8, y: 3 },
          { x: 8, y: 11 },
          { x: 16, y: 11 },
          { x: 16, y: 3 },
          { x: 23, y: 3 }
        ]
      },
      {
        act: 4,
        name: 'Oasis Terbakar',
        desc: 'Puing mata air yang kini mengering digantikan oleh api abadi padang pasir.',
        startGold: 600,
        baseHp: 20,
        firstClearGems: 270,
        repeatGems: 75,
        path: [
          { x: 5, y: 0 },
          { x: 5, y: 8 },
          { x: 12, y: 8 },
          { x: 12, y: 2 },
          { x: 19, y: 2 },
          { x: 19, y: 12 },
          { x: 10, y: 12 },
          { x: 10, y: 15 }
        ]
      },
      {
        act: 5,
        name: 'Benteng Kaca Hitam Obsidian',
        desc: 'Dinding tebing obsidian keras yang memantulkan panas membakar.',
        startGold: 650,
        baseHp: 20,
        firstClearGems: 300,
        repeatGems: 85,
        path: [
          { x: 0, y: 11 },
          { x: 7, y: 11 },
          { x: 7, y: 4 },
          { x: 17, y: 4 },
          { x: 17, y: 13 },
          { x: 21, y: 13 },
          { x: 21, y: 1 },
          { x: 23, y: 1 }
        ]
      },
      {
        act: 6,
        name: 'Kawah Inti Pyroclast',
        desc: 'Pusat dapur magma di mana sang naga berkepala sembilan menanti mangsa!',
        startGold: 700,
        baseHp: 25,
        firstClearGems: 450,
        repeatGems: 100,
        path: [
          { x: 0, y: 8 },
          { x: 5, y: 8 },
          { x: 5, y: 2 },
          { x: 12, y: 2 },
          { x: 12, y: 14 },
          { x: 18, y: 14 },
          { x: 18, y: 6 },
          { x: 23, y: 6 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Frostbite Peaks',
    title: 'Bab 3: Puncak Salju Abadi',
    desc: 'Gletser es beku dengan badai salju tak berkesudahan dan monster es kutub.',
    theme: 'snow',
    themeColor: '#38bdf8',
    tileColors: {
      grass: '#e0f2fe',
      grassAlt: '#bae6fd',
      path: '#7dd3fc',
      pathBorder: '#38bdf8',
      decor: '#0284c7',
      water: '#0369a1'
    },
    acts: [
      {
        act: 1,
        name: 'Gua Kristal Es',
        desc: 'Gua stalaktit es berkilau dengan suhu di bawah titik beku.',
        startGold: 600,
        baseHp: 20,
        firstClearGems: 250,
        repeatGems: 75,
        path: [
          { x: 0, y: 4 },
          { x: 9, y: 4 },
          { x: 9, y: 11 },
          { x: 17, y: 11 },
          { x: 17, y: 5 },
          { x: 23, y: 5 }
        ]
      },
      {
        act: 2,
        name: 'Jurang Gletser Runtuh',
        desc: 'Titi gantung es rapuh di atas ngarai salju tanpa dasar.',
        startGold: 640,
        baseHp: 20,
        firstClearGems: 280,
        repeatGems: 80,
        path: [
          { x: 0, y: 12 },
          { x: 6, y: 12 },
          { x: 6, y: 4 },
          { x: 13, y: 4 },
          { x: 13, y: 12 },
          { x: 19, y: 12 },
          { x: 19, y: 2 },
          { x: 23, y: 2 }
        ]
      },
      {
        act: 3,
        name: 'Pekuburan Naga Beku',
        desc: 'Kerangka naga purba yang terawetkan dalam lapisan es ratusan tahun.',
        startGold: 680,
        baseHp: 20,
        firstClearGems: 310,
        repeatGems: 85,
        path: [
          { x: 4, y: 0 },
          { x: 4, y: 9 },
          { x: 11, y: 9 },
          { x: 11, y: 3 },
          { x: 18, y: 3 },
          { x: 18, y: 14 },
          { x: 23, y: 14 }
        ]
      },
      {
        act: 4,
        name: 'Jalan Badai Blizzard',
        desc: 'Kawasan terbuka yang dihantam angin kencang bersuhu ekstrem.',
        startGold: 720,
        baseHp: 20,
        firstClearGems: 340,
        repeatGems: 90,
        path: [
          { x: 0, y: 2 },
          { x: 7, y: 2 },
          { x: 7, y: 13 },
          { x: 14, y: 13 },
          { x: 14, y: 3 },
          { x: 20, y: 3 },
          { x: 20, y: 11 },
          { x: 23, y: 11 }
        ]
      },
      {
        act: 5,
        name: 'Benteng Takhta Es Abadi',
        desc: 'Dinding es tebal yang dibangun oleh suku titan raksasa salju.',
        startGold: 780,
        baseHp: 20,
        firstClearGems: 380,
        repeatGems: 95,
        path: [
          { x: 0, y: 14 },
          { x: 8, y: 14 },
          { x: 8, y: 6 },
          { x: 16, y: 6 },
          { x: 16, y: 13 },
          { x: 22, y: 13 },
          { x: 22, y: 0 }
        ]
      },
      {
        act: 6,
        name: 'Domain Nol Mutlak',
        desc: 'Sanctuary puncak di mana Kaelith Absolute Zero membekukan seluruh kehidupan!',
        startGold: 850,
        baseHp: 25,
        firstClearGems: 550,
        repeatGems: 120,
        path: [
          { x: 0, y: 7 },
          { x: 5, y: 7 },
          { x: 5, y: 2 },
          { x: 12, y: 2 },
          { x: 12, y: 13 },
          { x: 19, y: 13 },
          { x: 19, y: 4 },
          { x: 23, y: 4 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Abyssal Realm',
    title: 'Bab 4: Dimensi Kehampaan',
    desc: 'Ruang tanpa batas penuh anomali gravitasi, bintang runtuh, dan dewa kosmik purba.',
    theme: 'abyss',
    themeColor: '#a855f7',
    tileColors: {
      grass: '#1e1035',
      grassAlt: '#0f061e',
      path: '#581c87',
      pathBorder: '#3b0764',
      decor: '#c084fc',
      water: '#00f5d4'
    },
    acts: [
      {
        act: 1,
        name: 'Retakan Ruang Waktu',
        desc: 'Celah dimensi yang menghubungkan dunia fana dengan kehampaan hitam.',
        startGold: 750,
        baseHp: 20,
        firstClearGems: 350,
        repeatGems: 100,
        path: [
          { x: 0, y: 5 },
          { x: 8, y: 5 },
          { x: 8, y: 12 },
          { x: 16, y: 12 },
          { x: 16, y: 4 },
          { x: 23, y: 4 }
        ]
      },
      {
        act: 2,
        name: 'Puing Bintang Runtuh',
        desc: 'Puing-puing asteroid melayang di sekitar gravitasi bintang mati.',
        startGold: 800,
        baseHp: 20,
        firstClearGems: 400,
        repeatGems: 110,
        path: [
          { x: 0, y: 13 },
          { x: 6, y: 13 },
          { x: 6, y: 3 },
          { x: 13, y: 3 },
          { x: 13, y: 12 },
          { x: 20, y: 12 },
          { x: 20, y: 2 },
          { x: 23, y: 2 }
        ]
      },
      {
        act: 3,
        name: 'Cakrawala Peristiwa Supermasif',
        desc: 'Zona gravitasi ekstrem di mana waktu dan proyektil terdistorsi.',
        startGold: 850,
        baseHp: 20,
        firstClearGems: 450,
        repeatGems: 120,
        path: [
          { x: 3, y: 0 },
          { x: 3, y: 8 },
          { x: 10, y: 8 },
          { x: 10, y: 2 },
          { x: 17, y: 2 },
          { x: 17, y: 13 },
          { x: 23, y: 13 }
        ]
      },
      {
        act: 4,
        name: 'Gerhana Kegelapan Abadi',
        desc: 'Cahaya tidak dapat menembus kabut antimateri pekat di benteng jurang ini.',
        startGold: 900,
        baseHp: 20,
        firstClearGems: 500,
        repeatGems: 130,
        path: [
          { x: 0, y: 2 },
          { x: 8, y: 2 },
          { x: 8, y: 13 },
          { x: 15, y: 13 },
          { x: 15, y: 4 },
          { x: 21, y: 4 },
          { x: 21, y: 14 },
          { x: 23, y: 14 }
        ]
      },
      {
        act: 5,
        name: 'Singularity Nexus',
        desc: 'Jantung anomali dimensi di mana hukum fisika tidak lagi berlaku.',
        startGold: 980,
        baseHp: 20,
        firstClearGems: 600,
        repeatGems: 150,
        path: [
          { x: 0, y: 14 },
          { x: 7, y: 14 },
          { x: 7, y: 5 },
          { x: 15, y: 5 },
          { x: 15, y: 12 },
          { x: 21, y: 12 },
          { x: 21, y: 1 },
          { x: 23, y: 1 }
        ]
      },
      {
        act: 6,
        name: 'Tahta Penciptaan Kosmik Omega',
        desc: 'Puncak pertempuran akhir menghadapi Omega Cosmic Primordial!',
        startGold: 1100,
        baseHp: 30,
        firstClearGems: 1000,
        repeatGems: 250,
        path: [
          { x: 0, y: 8 },
          { x: 6, y: 8 },
          { x: 6, y: 2 },
          { x: 13, y: 2 },
          { x: 13, y: 14 },
          { x: 19, y: 14 },
          { x: 19, y: 6 },
          { x: 23, y: 6 }
        ]
      }
    ]
  }
];

/**
 * Helper untuk membuat 15 Wave per Act secara dinamis & terstruktur
 */
export function generateWavesForAct(chapterId, actIndex) {
  const waves = [];
  const chMult = 1 + (chapterId - 1) * 0.75;
  const actMult = 1 + (actIndex - 1) * 0.25;
  const totalMult = chMult * actMult;

  const enemyPool = [
    ['goblin'],
    ['goblin', 'wolf'],
    ['goblin', 'orc'],
    ['wolf', 'orc'],
    ['skeleton', 'orc'],
    ['bat', 'skeleton'],
    ['orc', 'golem'],
    ['bat', 'wolf', 'golem'],
    ['fire_elemental', 'golem'],
    ['ice_wraith', 'fire_elemental'],
    ['bat', 'void_crawler'],
    ['void_crawler', 'golem'],
    ['void_crawler', 'fire_elemental', 'ice_wraith'],
    ['orc', 'golem', 'void_crawler']
  ];

  for (let w = 1; w <= 14; w++) {
    const waveEnemies = [];
    const pool = enemyPool[w - 1] || ['goblin', 'orc'];
    const count = Math.floor(6 + w * 2.2 * (1 + chapterId * 0.15));

    for (let i = 0; i < count; i++) {
      const type = pool[i % pool.length];
      waveEnemies.push({
        type,
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
    enemies: [
      {
        isBoss: true,
        bossKey: `ch${chapterId}_act${actIndex}`,
        spawnDelay: 0.5,
        hpMultiplier: Number(totalMult.toFixed(2)),
        speedMultiplier: 1.0
      }
    ],
    rewardGold: Math.round(200 * totalMult),
    rewardGems: 15
  });

  return waves;
}
