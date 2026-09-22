/**
 * AETHERIA: DIMENSIONAL PARADOX - ENGINE MASTER (EXPANDED)
 * Ultra HD Detailed Pixel Sprites, Ruined Burning Buildings, Ultra HD Roads,
 * and 4-Directional Pyromancer-Style Hero Animation (Maju, Mundur, Samping)!
 */

// ==========================================
// 1. PROCEDURAL SOUND SYNTHESIZER (WEB AUDIO)
// ==========================================
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type, duration, gainStart = 0.2, gainEnd = 0.001) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainStart, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  step() { this.playTone(85 + Math.random() * 35, 'triangle', 0.04, 0.04); }
  click() { this.playTone(600, 'square', 0.05, 0.08); }
  dialogue() { this.playTone(480 + Math.random() * 80, 'sine', 0.03, 0.05); }
  attack() { this.playTone(220, 'sawtooth', 0.15, 0.25, 0.01); }
  fire() { this.playTone(180, 'sawtooth', 0.35, 0.35); setTimeout(() => this.playTone(90, 'triangle', 0.25, 0.3), 50); }
  ice() { this.playTone(880, 'sine', 0.2, 0.25); setTimeout(() => this.playTone(1200, 'triangle', 0.15, 0.2), 60); }
  lightning() { this.playTone(140, 'square', 0.15, 0.35); setTimeout(() => this.playTone(880, 'sawtooth', 0.2, 0.3), 30); }
  portal() { this.playTone(320, 'sine', 0.4, 0.2); }
  locked() { this.playTone(150, 'sawtooth', 0.2, 0.4); setTimeout(() => this.playTone(110, 'sawtooth', 0.3, 0.4), 120); }
  buy() {
    this.playTone(659.25, 'triangle', 0.1, 0.2);
    setTimeout(() => this.playTone(880, 'triangle', 0.2, 0.2), 80);
  }
  keyFanfare() {
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.4, 0.25), i * 90);
    });
  }
  riddleSuccess() {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.25, 0.2), i * 80);
    });
  }
  riddleFail() {
    this.playTone(160, 'sawtooth', 0.3, 0.3);
    setTimeout(() => this.playTone(120, 'sawtooth', 0.3, 0.3), 160);
  }
  levelUp() {
    [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.3, 0.25), i * 90);
    });
  }
}

const AudioSys = new SoundSynth();

// ==========================================
// 2. MASTER DATABASE: SKILLS, WEAPONS & COSMETICS
// ==========================================
const SKILLS_DB = {
  pyromancer: [
    { id: 'p1', name: 'Ignition Spark', tier: 1, costMp: 8, mult: 1.2, bonus: 15, unlocked: true, desc: 'Bara api kuantum. Menimbulkan efek Burn (10% ATK/turn)', type: 'burn' },
    { id: 'p2', name: 'Thermal Wave', tier: 2, costMp: 18, mult: 1.6, bonus: 25, unlocked: false, desc: 'Gelombang api horizontal menyapu musuh (Melt -15% DEF)', type: 'melt' },
    { id: 'p3', name: 'Combustion Engine', tier: 3, costMp: 15, mult: 0.5, bonus: 20, unlocked: false, desc: 'Pilar api membakar di sekitar pahlawan (+15% ATK & Burn)', type: 'burst' },
    { id: 'p4', name: 'Plasma Flare', tier: 4, costMp: 30, mult: 2.6, bonus: 80, unlocked: false, desc: 'Pilar plasma langit yang meledakkan titik lemah monster', type: 'burst' },
    { id: 'p5', name: 'Supernova Collapse', tier: 5, costMp: 50, mult: 4.5, bonus: 200, unlocked: false, desc: 'Ultimate: Ledakan supernova kosmik menembus 50% DEF', type: 'ultimate' }
  ],
  cryomancer: [
    { id: 'c1', name: 'Frost Needle', tier: 1, costMp: 7, mult: 1.0, bonus: 10, unlocked: true, desc: 'Rentetan jarum kristal es runcing (Chill -15% SPD)', type: 'chill' },
    { id: 'c2', name: 'Absolute Zero Barrier', tier: 2, costMp: 20, mult: 0, bonus: 60, unlocked: false, desc: 'Prisma es heksagonal berputar menyerap 60 damage', type: 'shield' },
    { id: 'c3', name: 'Brittle Lattice', tier: 3, costMp: 15, mult: 1.4, bonus: 20, unlocked: false, desc: 'Jaringan kristal es membekukan tanah di bawah monster', type: 'chill' },
    { id: 'c4', name: 'Blizzard Vortex', tier: 4, costMp: 28, mult: 2.2, bonus: 45, unlocked: false, desc: 'Pusaran badai salju mematikan (Frozen - lewati turn)', type: 'freeze' },
    { id: 'c5', name: 'Glacial Cataclysm', tier: 5, costMp: 45, mult: 3.8, bonus: 150, unlocked: false, desc: 'Ultimate: Gletser raksasa meledak hancur menghasilkan Shatter', type: 'ultimate' }
  ],
  electromancer: [
    { id: 'e1', name: 'Volt Jolt', tier: 1, costMp: 8, mult: 1.15, bonus: 12, unlocked: true, desc: 'Sengatan petir mendadak dengan peluang Paralisis', type: 'shock' },
    { id: 'e2', name: 'Chain Discharge', tier: 2, costMp: 22, mult: 1.8, bonus: 30, unlocked: false, desc: 'Petir zigzag bercabang menyengat medan elektromagnetik', type: 'chain' },
    { id: 'e3', name: 'Superconductor', tier: 3, costMp: 16, mult: 1.3, bonus: 25, unlocked: false, desc: 'Bola plasma magnetik berputar di sekeliling pahlawan', type: 'shock' },
    { id: 'e4', name: 'Railgun Impact', tier: 4, costMp: 32, mult: 3.1, bonus: 95, unlocked: false, desc: 'Proyektil laser hipersonik dengan 100% Critical pada Shock', type: 'pierce' },
    { id: 'e5', name: 'Apocalyptic Tempest', tier: 5, costMp: 55, mult: 4.2, bonus: 180, unlocked: false, desc: 'Ultimate: Rentetan 7 halilintar kosmik mengguncang arena', type: 'ultimate' }
  ]
};

// WEAPONS DATABASE (Staves & Element Weapons that amplify skill damage)
const WEAPONS_SHOP_DB = [
  { id: 'w_novice', name: 'Novice Aether Wand', icon: '🪄', type: 'all', cost: 0, atk: 5, skillMult: 0.05, desc: 'Tongkat sihir dasar buatan Aliansi. Meningkatkan sedikit damage skill.', owned: true },
  { id: 'w_pyrostaff', name: 'Pyrostaff Embercore', icon: '🔥', type: 'pyromancer', cost: 110, atk: 22, skillMult: 0.25, desc: 'Tongkat magma bersumbu inti api. +22 ATK & +25% Damage Skill Api.', owned: false },
  { id: 'w_frostscepter', name: 'Glacial Frost Scepter', icon: '❄️', type: 'cryomancer', cost: 110, atk: 20, skillMult: 0.25, desc: 'Skeptrum kristal glasier abadi. +20 ATK & +25% Damage Skill Es.', owned: false },
  { id: 'w_arcbaton', name: 'Voltstorm Arc Baton', icon: '⚡', type: 'electromancer', cost: 125, atk: 25, skillMult: 0.30, desc: 'Tongkat induksi petir frekuensi ultra. +25 ATK & +30% Damage Skill Petir.', owned: false },
  { id: 'w_scrapcleaver', name: 'Titanium Scrap Cleaver', icon: '🗡️', type: 'all', cost: 180, atk: 35, skillMult: 0.35, desc: 'Pedang besar ditempa dari zirah Titan Colossus. +35 ATK & +35% Damage Skill.', owned: false },
  { id: 'w_singularity', name: 'Cosmic Singularity Staff', icon: '🌌', type: 'all', cost: 280, atk: 52, skillMult: 0.50, desc: 'Tongkat pamungkas inti bintang nebula. +52 ATK & +50% Damage Skill!', owned: false }
];

// POTIONS SHOP DATABASE
const POTIONS_SHOP_DB = [
  { id: 'p_potion', name: 'Aether Potion', icon: '🧪', cost: 25, key: 'potion', desc: 'Memulihkan 70 HP seketika.' },
  { id: 'p_mega', name: 'Mega Elixir', icon: '🍷', cost: 55, key: 'mega_potion', desc: 'Serum nano tingkat tinggi: memulihkan 160 HP.' },
  { id: 'p_mana', name: 'Mana Injector', icon: '🔷', cost: 25, key: 'mana', desc: 'Injeksi energi kuantum: memulihkan 40 MP.' },
  { id: 'p_hyper', name: 'Hyper Battery', icon: '🔋', cost: 55, key: 'hyper_mana', desc: 'Baterai fusi terkondensasi: memulihkan 90 MP.' },
  { id: 'p_cleanse', name: 'Status Cleanser', icon: '✨', cost: 30, key: 'cleanse', desc: 'Menghapus seluruh status debuff (Burn, Chill, Poison).' }
];

// COSMETICS WARDROBE DATABASE
const COSMETICS_DB = {
  skins: [
    { id: 's_default', name: 'Initiate Aether Robe', cost: 0, owned: true, colorRobe: '#b91c1c', colorTrim: '#f59e0b', desc: 'Jubah kadet inisiasi standar Aliansi.' },
    { id: 's_cyber', name: 'Cyberpunk Nano-Exosuit', cost: 80, owned: false, colorRobe: '#0f172a', colorTrim: '#06b6d4', desc: 'Zirah bionik hitam titanium dengan aksen neon cyan menyala.' },
    { id: 's_archon', name: 'Golden Archon Vestment', cost: 140, owned: false, colorRobe: '#f8fafc', colorTrim: '#eab308', desc: 'Jubah sutra putih suci bersulam emas keagungan.' },
    { id: 's_void', name: 'Void Stalker Cloak', cost: 190, owned: false, colorRobe: '#1e1035', colorTrim: '#c084fc', desc: 'Mantel bayangan kosmik terjalin dari partikel celah dimensi.' },
    { id: 's_dragon', name: 'Dragon Knight Scales', cost: 240, owned: false, colorRobe: '#7f1d1d', colorTrim: '#fbbf24', desc: 'Zirah sisik naga merah tahan panas bersuhu tinggi.' }
  ],
  heads: [
    { id: 'h_none', name: 'Default Hood / Cowl', cost: 0, owned: true, desc: 'Tudung kain misterius dengan bayangan void gelap.' },
    { id: 'h_visor', name: 'Holographic Cyber Visor', cost: 50, owned: false, desc: 'Kacamata taktis neon pemindai medan tempur.' },
    { id: 'h_mask', name: 'Biohazard Gas Mask', cost: 70, owned: false, desc: 'Masker gas penyaring spora beracun Hutan Karantina.' },
    { id: 'h_crown', name: 'Crown of Singularities', cost: 110, owned: false, desc: 'Mahkota kristal obsidian melayang di atas kepala.' },
    { id: 'h_fox', name: 'Kitsune Mystic Mask', cost: 90, owned: false, desc: 'Topeng rubah putih dengan ornamen merah mistis.' }
  ]
};

const QUESTS_DATA = [
  { id: 'q1', title: 'Chapter 1: Menara Komunikasi & Titan Scrap', desc: 'Bantu Aki Wardana di Reruntuhan Kota dan kalahkan BOSS Titan Scrap Colossus untuk mendapatkan Kunci Bio-Hazard pembuka Chapter 2.', done: false },
  { id: 'q2', title: 'Chapter 2: Penawar Spora & Ratu Serangga', desc: 'Temui Profesor Vern di Hutan Karantina dan musnahkan BOSS Queen Brood Mother untuk merebut Kartu Akses Siber pembuka Chapter 3.', done: false },
  { id: 'q3', title: 'Chapter 3: Sabotase Reaktor & Apex Executioner', desc: 'Bekerja sama dengan Android Echo di Pabrik Siber dan taklukkan BOSS Apex Executioner untuk mendapatkan Kristal Singularitas pembuka Chapter 4.', done: false },
  { id: 'q4', title: 'Chapter 4: Pertarungan Terakhir di Void', desc: 'Dampingi Komandan Dananjaya menembus ruang singularitas, kalahkan Malakor dan Sovereign Void Leviathan untuk menutup celah dimensi selamanya!', done: false }
];

// ==========================================
// 3. MAPS & WORLD BUILDING WITH SHOP OUTPOST & BURNING BUILDINGS
// ==========================================
const MAPS = {
  sanctuary: {
    id: 'sanctuary',
    name: 'Sanctuary Perlindungan Aliansi',
    sub: 'ZONA AMAN BAWAH TANAH & BENGKEL MIRA',
    colorFloor: '#1e293b',
    colorGrid: '#334155',
    width: 30,
    height: 20,
    spawn: { x: 15, y: 10 },
    // Shop Outpost Structure at Base
    shopBuilding: {
      x: 18,
      y: 11,
      w: 6,
      h: 4,
      name: 'BENGKEL & TOKO ARSENAL MIRA'
    },
    portals: [
      { x: 15, y: 1, targetMap: 'city', targetX: 15, yOffset: 18, reqKey: null, label: 'Ke Chapter 1: Reruntuhan Kota' },
      { x: 28, y: 10, targetMap: 'forest', targetX: 2, yOffset: 10, reqKey: 'ch2_bio', label: 'Ke Chapter 2: Hutan Karantina' },
      { x: 1, y: 10, targetMap: 'cyber', targetX: 27, yOffset: 10, reqKey: 'ch3_cyber', label: 'Ke Chapter 3: Pabrik Siber' },
      { x: 15, y: 18, targetMap: 'void', targetX: 15, yOffset: 2, reqKey: 'ch4_void', label: 'Ke Chapter 4: Kapal Induk Void' }
    ],
    npcs: [
      { id: 'balthazar', name: 'Grand Archivist Balthazar', role: 'Mentor Aliansi', x: 10, y: 8, quote: 'Dunia kita hancur oleh robekan singularitas. Kalahkan Boss di setiap chapter untuk merebut kunci pembuka wilayah selanjutnya!', choices: [{ text: 'Bolehkah saya mereset skill (Respec)?', action: 'respec', reply: 'Pohon keahlianmu telah direset! Seluruh Skill Point telah dikembalikan.' }, { text: 'Bagaimana cara membuka Chapter 2?', reply: 'Kamu harus mengalahkan Titan Scrap Colossus di puncak reruntuhan Chapter 1 untuk mendapatkan Kunci Bio-Hazard!' }] },
      { id: 'thorne', name: 'Dr. Aris Thorne', role: 'Ilmuwan Logika', x: 14, y: 7, quote: 'Matematika adalah bahasa alam semesta. Pecahkan kalkulasi Death-Riddle untuk menghancurkan anomali monster!', choices: [{ text: 'Minta sinkronisasi frekuensi senjata (+15% ATK).', action: 'buff_atk', reply: 'Frekuensi kuantum senjatamu telah diselaraskan. Seranganmu kini lebih mematikan!' }] },
      { id: 'mira', name: 'Mira Si Tangan Besi', role: 'Pemilik Toko & Pandai Besi', x: 21, y: 13, quote: 'Selamat datang di Toko Arsenal! Di sini aku menjual berbagai ramuan dan tongkat sihir (Staff) untuk memperkuat serangan elemenmu. Silakan pilih!', choices: [{ text: 'Buka Toko Perlengkapan & Senjata [B]', action: 'open_shop', reply: 'Pilihlah senjata tongkat terbaik untuk meningkatkan damage skill-mu!' }, { text: 'Beli 2x Aether Potion (30 Scrap)', action: 'buy_pot', reply: 'Ramuan penyembuh nano-seluler ini akan menyelamatkan nyawamu.' }] },
      { id: 'lyra', name: 'Gadis Penenun Cahaya - Lyra', role: 'Penyelamat Jiwa', x: 8, y: 14, quote: 'Di tengah kegelapan bumi yang hancur, cahaya lentera ini membimbing kita menuju kebangkitan.', choices: [{ text: 'Minta pemulihan penuh HP & MP.', action: 'heal', reply: 'Cahaya lentera menyelimutimu. Seluruh luka dan lelahmu sembuh seketika!' }] }
    ],
    monsters: []
  },

  city: {
    id: 'city',
    name: 'Chapter 1: Reruntuhan Kota Terakhir',
    sub: 'KOTA HANCUR BERPUING & KAWAH DIMENSI',
    colorFloor: '#283142',
    colorGrid: '#3e4c63',
    width: 32,
    height: 22,
    spawn: { x: 15, y: 19 },
    // RUINED & BURNING MULTI-STORY BUILDINGS
    ruinedBuildings: [
      { id: 'bld_nw', x: 2, y: 2, w: 6, h: 5, name: 'Reruntuhan Gedung Perkantoran Sektor-4', fireIntensity: 1.0 },
      { id: 'bld_sw', x: 2, y: 13, w: 5, h: 5, name: 'Apartemen Ambruk & Terbakar', fireIntensity: 0.9 },
      { id: 'bld_ne', x: 21, y: 1, w: 6, h: 5, name: 'Gudang Logistik Meledak', fireIntensity: 1.2 },
      { id: 'bld_se', x: 21, y: 13, w: 6, h: 6, name: 'Pembangkit Daya Hancur Berapi', fireIntensity: 1.1 }
    ],
    portals: [
      { x: 15, y: 20, targetMap: 'sanctuary', targetX: 15, yOffset: 2, reqKey: null, label: 'Kembali ke Sanctuary' },
      { x: 30, y: 10, targetMap: 'forest', targetX: 2, yOffset: 10, reqKey: 'ch2_bio', label: 'Ke Chapter 2: Hutan Karantina' }
    ],
    npcs: [
      { id: 'aki', name: 'Aki Wardana', role: 'Penjaga Menara Komunikasi', x: 16, y: 6, quote: 'Menara ini dikepung oleh Titan Scrap Colossus di timur laut! Kalahkan dia untuk mendapatkan Kunci Bio-Hazard pembuka gerbang hutan!', choices: [{ text: 'Saya akan menumbangkan Titan Colossus itu, Kek!', reply: 'Hati-hati! Zirahnya tersusun dari plat baja bekas gedung bertingkat!' }] },
      { id: 'timmy', name: 'Timmy', role: 'Anak Pengungsi', x: 6, y: 14, quote: 'Kakak pahlawan! Slime besi dan drone rusak berkeliaran di dekat kawah berapi... Tolong selamatkan kami!', choices: [{ text: 'Jangan takut Timmy, aku akan membersihkan area ini!', reply: 'Terima kasih banyak kak! Ini ada bekal sedikit untuk kakak.' }] }
    ],
    monsters: [
      { id: 'ferroslime', name: 'Corrosive Ferroslime', title: 'Slime Radioaktif Berkaki Besi', isBoss: false, x: 8, y: 10, patrolRadius: 3, hp: 180, atk: 24, def: 12, speed: 12, exp: 75, scrap: 35, riddles: [
        { cat: 'ARITMATIKA CEPAT (PENGURANGAN)', q: 'Reaktor inti Ferroslime memompa 84 unit asam per detik. Radiator kaki baja menyerap 37 unit. Berapa sisa asam yang mengalir?', opts: ['45 unit', '47 unit', '49 unit', '51 unit'], ans: 1, expl: '84 - 37 = 47 unit asam.' },
        { cat: 'ARITMATIKA CEPAT (PERKALIAN)', q: 'Ferroslime memiliki 4 kaki baja. Setiap kaki membutuhkan 16 sekrup magnetik. Berapa total sekrup pada kakinya?', opts: ['54 sekrup', '60 sekrup', '64 sekrup', '68 sekrup'], ans: 2, expl: '4 x 16 = 64 sekrup.' }
      ]},
      { id: 'sentinel', name: 'Scrap Sentinel MK-I', title: 'Drone Pengintai Rusak', isBoss: false, x: 18, y: 14, patrolRadius: 4, hp: 220, atk: 32, def: 16, speed: 22, exp: 95, scrap: 45, riddles: [
        { cat: 'OPERASI CAMPURAN', q: 'Suhu CPU Sentinel pada 42°C. Tiap detik laser aktif, suhu naik 6°C. Batas shutdown 90°C. Berapa detik pemindaian laser tersisa?', opts: ['6 detik', '7 detik', '8 detik', '9 detik'], ans: 2, expl: '(90 - 42) / 6 = 48 / 6 = 8 detik.' },
        { cat: 'ARITMATIKA PELURU', q: 'Sentinel menembakkan 21 butir peluru per siklus. Dari total 95 butir peluru, berapa sisa peluru setelah 4 siklus tembakan penuh?', opts: ['9 butir', '11 butir', '13 butir', '15 butir'], ans: 1, expl: '95 - (4 x 21) = 95 - 84 = 11 butir.' }
      ]},
      // BOSS CHAPTER 1
      { id: 'titan_colossus', name: 'Titan Scrap Colossus', title: 'BOSS CHAPTER 1: Titan Reruntuhan MK-Omega', isBoss: true, dropKey: 'ch2_bio', dropKeyName: 'Kunci Bio-Hazard', x: 26, y: 5, patrolRadius: 2, hp: 520, atk: 55, def: 35, speed: 16, exp: 250, scrap: 150, riddles: [
        { cat: 'KALIBRASI TEGANGAN TITAN', q: 'Reaktor fusi Titan Colossus menghasilkan 480 MW daya. Tangan hidrolik menghabiskan 185 MW dan perisai menyerap 145 MW. Berapa sisa MW daya yang tersisa di inti?', opts: ['140 MW', '150 MW', '160 MW', '170 MW'], ans: 1, expl: '480 - 185 - 145 = 150 MW.' },
        { cat: 'SOAL CERITA BERTINGKAT BOBOT BAJA', q: 'Kaki kiri Titan tersusun dari 6 lapis plat baja masing-masing seberat 45 ton. Jika 2 lapis berhasil dirontokkan pahlawan, berapa ton sisa bobot plat baja kaki tersebut?', opts: ['160 ton', '180 ton', '200 ton', '220 ton'], ans: 1, expl: '(6 - 2) x 45 = 4 x 45 = 180 ton.' }
      ]}
    ]
  },

  forest: {
    id: 'forest',
    name: 'Chapter 2: Hutan Karantina Bio-Hazard',
    sub: 'HUTAN RACUN DENGAN BANGKAI LABORATORIUM',
    colorFloor: '#0d694f',
    colorGrid: '#10b981',
    width: 32,
    height: 22,
    spawn: { x: 3, y: 10 },
    portals: [
      { x: 1, y: 10, targetMap: 'city', targetX: 29, yOffset: 10, reqKey: null, label: 'Ke Chapter 1: Reruntuhan Kota' },
      { x: 30, y: 10, targetMap: 'cyber', targetX: 2, yOffset: 10, reqKey: 'ch3_cyber', label: 'Ke Chapter 3: Pabrik Siber' }
    ],
    npcs: [
      { id: 'vern', name: 'Profesor Vern', role: 'Ahli Botani Eksentrik', x: 16, y: 11, quote: 'Hutan ini hancur oleh racun alien! Di sarang terdalam di timur, Ratu Serangga Brood Mother menjaga Kartu Akses Siber ke pabrik penjajah. Kalahkan dia!', choices: [{ text: 'Beri saya petunjuk kelemahan Ratu Serangga.', reply: 'Cangkang kristal ratu memiliki konsentrasi racun desimal. Jawab Death-Riddle pecahan dengan tepat untuk memecahkan kepompongnya!' }] }
    ],
    monsters: [
      { id: 'chlorella', name: 'Chlorella Devourer', title: 'Tumbuhan Karnivora Parasit', isBoss: false, x: 8, y: 6, patrolRadius: 3, hp: 460, atk: 52, def: 28, speed: 15, exp: 150, scrap: 60, riddles: [
        { cat: 'OPERASI DESIMAL', q: 'Spora mencemari udara 2.45 ppm. Angin menipiskannya 0.88 ppm, lalu bertambah 1.15 ppm. Berapa kadar spora akhir?', opts: ['2.62 ppm', '2.72 ppm', '2.82 ppm', '2.92 ppm'], ans: 1, expl: '2.45 - 0.88 + 1.15 = 2.72 ppm.' },
        { cat: 'PERSENTASE GETAH', q: 'Kantung getah berkapasitas 400 ml, saat ini terisi 260 ml. Berapa persentase isi getah terhadap kapasitas totalnya?', opts: ['60%', '62.5%', '65%', '70%'], ans: 2, expl: '(260 / 400) x 100% = 65%.' }
      ]},
      { id: 'carapace', name: 'Chitin Carapace Stalker', title: 'Serangga Kristal Zamrud', isBoss: false, x: 18, y: 14, patrolRadius: 4, hp: 520, atk: 66, def: 50, speed: 26, exp: 180, scrap: 75, riddles: [
        { cat: 'PENGURANGAN DESIMAL', q: 'Cangkang kristal tebalnya 4.25 cm. Tebasan laser mengikis 1.68 cm. Berapa sisa ketebalan cangkang kristal?', opts: ['2.47 cm', '2.57 cm', '2.67 cm', '3.07 cm'], ans: 1, expl: '4.25 - 1.68 = 2.57 cm.' },
        { cat: 'PECAHAN CAMPURAN', q: 'Dibutuhkan 2 1/2 botol pelarut. Peracikan tiap botol 1 1/4 menit. Berapa total menit peracikan seluruh botol?', opts: ['2 3/4 menit', '3 menit', '3 1/8 menit', '3 1/2 menit'], ans: 2, expl: '(5/2) x (5/4) = 25/8 = 3 1/8 menit.' }
      ]},
      // BOSS CHAPTER 2
      { id: 'queen_brood', name: 'Queen Brood Mother', title: 'BOSS CHAPTER 2: Ratu Serangga Kristal Mutan', isBoss: true, dropKey: 'ch3_cyber', dropKeyName: 'Kartu Akses Siber', x: 26, y: 5, patrolRadius: 2, hp: 880, atk: 85, def: 60, speed: 30, exp: 400, scrap: 220, riddles: [
        { cat: 'PERSENTASE RACUN RATU', q: 'Kelenjar bisa Ratu memproduksi 600 ml racun. Sebanyak 45% telah disemprotkan ke sarang. Berapa ml sisa racun di kelenjarnya?', opts: ['300 ml', '330 ml', '350 ml', '370 ml'], ans: 1, expl: '600 x (100% - 45%) = 600 x 55% = 330 ml.' },
        { cat: 'PECAHAN DESIMAL CAMPURAN', q: 'Ratu membutuhkan 3 3/4 liter asam untuk membentuk kepompong pelindung. Jika saat ini tersedia 2.45 liter, berapa liter lagi asam yang dibutuhkan?', opts: ['1.25 liter', '1.30 liter', '1.35 liter', '1.40 liter'], ans: 1, expl: '3.75 - 2.45 = 1.30 liter.' }
      ]}
    ]
  },

  cyber: {
    id: 'cyber',
    name: 'Chapter 3: Pabrik Inti Siber Penjajah',
    sub: 'BENTENG SIBER OTOMASISASI & KONSOL RUSAK',
    colorFloor: '#3730a3',
    colorGrid: '#4f46e5',
    width: 32,
    height: 22,
    spawn: { x: 3, y: 10 },
    portals: [
      { x: 1, y: 10, targetMap: 'forest', targetX: 29, yOffset: 10, reqKey: null, label: 'Ke Chapter 2: Hutan Karantina' },
      { x: 16, y: 2, targetMap: 'void', targetX: 15, yOffset: 18, reqKey: 'ch4_void', label: 'Ke Chapter 4: Kapal Induk Void' }
    ],
    npcs: [
      { id: 'echo', name: 'Unit RX-7 ("Echo")', role: 'Android Pembelot', x: 16, y: 15, quote: 'Pabrik ini telah memproduksi algojo bionik tanpa henti. Di ruang generator utara berdiri Apex Executioner. Kalahkan dia untuk merebut Kristal Singularitas pembuka celah kapal induk!', choices: [{ text: 'Bagaimana cara menembus zirah Apex Executioner?', reply: 'Sistem komputasinya terkunci pada persamaan linear ganda. Pecahkan Death-Riddle aljabar untuk melumpuhkan reaktornya!' }] }
    ],
    monsters: [
      { id: 'vector', name: 'Cyber-Canine Vector', title: 'Mech-Hound Pelacak Siber', isBoss: false, x: 8, y: 8, patrolRadius: 4, hp: 750, atk: 88, def: 42, speed: 40, exp: 260, scrap: 110, riddles: [
        { cat: 'ALJABAR PERSAMAAN LINEAR', q: 'Frekuensi radar Vector memenuhi persamaan: 3x + 15 = 42. Berapakah nilai variabel frekuensi x?', opts: ['x = 7', 'x = 8', 'x = 9', 'x = 11'], ans: 2, expl: '3x = 42 - 15 => 3x = 27 => x = 9.' },
        { cat: 'DERET ARITMATIKA TEGANGAN', q: 'Lonjakan tegangan melonjak: 14, 21, 28, 35, ... Volt. Berapakah lonjakan tegangan pada suku ke-7 (U7)?', opts: ['49 Volt', '52 Volt', '56 Volt', '63 Volt'], ans: 2, expl: 'U7 = 14 + (7 - 1) x 7 = 14 + 42 = 56 Volt.' }
      ]},
      { id: 'executioner', name: 'Executioner-09', title: 'Cyborg Algojo Bionik 3M', isBoss: false, x: 23, y: 14, patrolRadius: 3, hp: 1100, atk: 120, def: 80, speed: 20, exp: 340, scrap: 150, riddles: [
        { cat: 'PERSAMAAN LINEAR REAKTOR', q: 'Sistem pendingin terkunci pada: 2(y - 4) = 3y - 19. Carilah nilai variabel y untuk mematikan reaktor!', opts: ['y = 9', 'y = 10', 'y = 11', 'y = 13'], ans: 2, expl: '2y - 8 = 3y - 19 => 19 - 8 = 3y - 2y => y = 11.' },
        { cat: 'SPLDV BOBOT ENERGI', q: 'Dua baterai A dan 3 sel B berbobot 47 kg (2A + 3B = 47). Jika sel B berbobot 9 kg, berapa bobot baterai A?', opts: ['8 kg', '10 kg', '12 kg', '14 kg'], ans: 1, expl: '2A + 3(9) = 47 => 2A = 20 => A = 10 kg.' }
      ]},
      // BOSS CHAPTER 3
      { id: 'apex_executioner', name: 'Apex Executioner: Overclocked', title: 'BOSS CHAPTER 3: Algojo Siber Protokol Zero', isBoss: true, dropKey: 'ch4_void', dropKeyName: 'Kristal Singularitas Dimensi', x: 26, y: 5, patrolRadius: 2, hp: 1600, atk: 150, def: 95, speed: 32, exp: 600, scrap: 300, riddles: [
        { cat: 'SISTEM PERSAMAAN DUA VARIABEL', q: 'Dua inti daya X dan 4 turbin Y mengonsumsi 76 GW (2X + 4Y = 76). Jika satu turbin Y mengonsumsi 11 GW, berapakah konsumsi daya satu inti X?', opts: ['14 GW', '16 GW', '18 GW', '20 GW'], ans: 1, expl: '2X + 4(11) = 76 => 2X + 44 = 76 => 2X = 32 => X = 16 GW.' },
        { cat: 'ALJABAR LINEAR OVERHEAT', q: 'Persamaan suhu turbin: 5(k - 6) = 2k + 18. Berapakah nilai variabel k sebelum pendingin darurat aktif?', opts: ['k = 14', 'k = 16', 'k = 18', 'k = 20'], ans: 1, expl: '5k - 30 = 2k + 18 => 3k = 48 => k = 16.' }
      ]}
    ]
  },

  void: {
    id: 'void',
    name: 'Chapter 4: Inti Kapal Induk Dimensi (Final)',
    sub: 'RUANG SINGULARITAS OBSIDIAN & RUNTUHAN REALITAS',
    colorFloor: '#2e1c66',
    colorGrid: '#9333ea',
    width: 32,
    height: 22,
    spawn: { x: 15, y: 19 },
    portals: [
      { x: 15, y: 20, targetMap: 'sanctuary', targetX: 15, yOffset: 16, reqKey: null, label: 'Kembali ke Sanctuary' }
    ],
    npcs: [
      { id: 'dananjaya', name: 'Komandan Dananjaya', role: 'Panglima Pasukan Gerilya', x: 15, y: 15, quote: 'Kita telah sampai di jantung kapal induk musuh! Warlord Malakor dan Sovereign Leviathan berada di singgasana kehampaan. Taklukkan mereka untuk menutup celah dimensi selamanya!', choices: [{ text: 'Pasukan gerilya siap mendukung, Komandan!', reply: 'Maju terus, Kadet! Tuntaskan anomali singularitas ini sampai ke titik nol!' }] }
    ],
    monsters: [
      { id: 'malakor', name: 'Warlord Malakor', title: 'BOSS CHAPTER 4: Jenderal Penjajah Dimensi', isBoss: true, dropKey: null, x: 8, y: 7, patrolRadius: 3, hp: 2400, atk: 175, def: 105, speed: 38, exp: 800, scrap: 400, riddles: [
        { cat: 'GEOMETRI SUDUT SEGITIGA', q: 'Tiga pedang Malakor membentuk formasi segitiga berukuran 65° dan 70°. Berapakah besar sudut ketiga (θ)?', opts: ['35°', '40°', '45°', '50°'], ans: 2, expl: 'θ = 180° - (65° + 70°) = 45°.' },
        { cat: 'SOAL CERITA BERTINGKAT', q: 'Perisai awal 3000 unit. Serangan hero memotong 750 unit, artileri menghancurkan 40% dari sisa. Berapa sisa energi perisai?', opts: ['1,200 unit', '1,250 unit', '1,350 unit', '1,500 unit'], ans: 2, expl: 'Sisa tahap 1 = 2250. Tahap 2 = 2250 - 900 = 1350 unit.' }
      ]},
      { id: 'leviathan', name: 'Sovereign Void Leviathan', title: 'FINAL BOSS: Singularitas Kosmik (Fase Ganda)', isBoss: true, dropKey: null, x: 22, y: 7, patrolRadius: 2, hp: 4200, atk: 220, def: 130, speed: 44, exp: 2000, scrap: 1000, riddles: [
        { cat: 'TEOREMA PYTHAGORAS KOSMIK', q: 'Pahlawan di (0,0). Kepala Leviathan di koordinat (8, 15). Berapakah jarak langsung garis lurus hipotenusa serangan?', opts: ['16 unit', '17 unit', '19 unit', '23 unit'], ans: 1, expl: 'd = akar(8^2 + 15^2) = akar(64 + 225) = 17 unit.' },
        { cat: 'LOGIKA PECAHAN BERTINGKAT', q: 'Lubang hitam menelan 1/2 ruang di menit 1, lalu 1/4 dari sisa di menit 2. Berapa bagian realitas bumi yang masih tersisa?', opts: ['1/8 bagian', '1/4 bagian', '3/8 bagian', '1/2 bagian'], ans: 2, expl: 'Menit 1 sisa 1/2. Menit 2 tertelan 1/8. Sisa akhir = 1/2 - 1/8 = 3/8 bagian.' },
        { cat: 'SISTEM TIGA VARIABEL FINAL', q: 'Segel realitas membutuhkan hasil (x * y * z) dari: x + y = 14; y - z = 3; 2z = 8. Berapakah nilai x * y * z?', opts: ['168', '182', '196', '210'], ans: 2, expl: 'z = 4 => y = 7 => x = 7. Hasil kali = 7 x 7 x 4 = 196.' }
      ]}
    ]
  }
};

// ==========================================
// 4. MAIN GAME ENGINE OBJECT
// ==========================================
const Game = {
  canvas: null,
  ctx: null,
  radarCanvas: null,
  radarCtx: null,

  // Player Entity with Weapon & Cosmetics
  player: {
    x: 15 * 32,
    y: 10 * 32,
    dir: 'down',
    isMoving: false,
    walkFrame: 0,
    walkTimer: 0,
    classId: 'pyromancer',
    className: 'Pyromancer',
    level: 1,
    exp: 0,
    expToLevel: 100,
    sp: 2,
    scrap: 80,
    maxHp: 200,
    hp: 200,
    maxMp: 80,
    mp: 80,
    baseAtk: 38,
    atk: 43,
    def: 14,
    speed: 18,
    skillMult: 0.05,
    resonance: 0,
    equippedWeapon: 'w_novice',
    equippedSkin: 's_default',
    equippedHead: 'h_none',
    items: { potion: 3, mega_potion: 0, mana: 2, hyper_mana: 0, cleanse: 1 },
    keys: { ch2_bio: false, ch3_cyber: false, ch4_void: false },
    skills: []
  },

  // State
  currentMapId: 'sanctuary',
  gameState: 'explore',
  camera: { x: 0, y: 0 },
  keys: {},
  currentShopTab: 'weapons',
  currentCosmTab: 'skins',

  // Current Interactions
  nearbyNpc: null,
  nearbyPortal: null,
  nearbyShopCounter: false,
  activeNpc: null,

  // Combat State
  battle: {
    monster: null,
    turn: 'player',
    shield: 0,
    statuses: { player: [], monster: [] },
    riddleTimer: null,
    riddleSecRemaining: 35,
    currentRiddle: null
  },

  // Visual FX & Fallout Particles
  particles: [],
  falloutAsh: [],
  combatVFX: [],
  screenShake: 0,

  init() {
    this.canvas = document.getElementById('overworldCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.radarCanvas = document.getElementById('miniMapCanvas');
    this.radarCtx = this.radarCanvas.getContext('2d');

    this.initFalloutAsh();
    this.bindControls();
    this.renderClassAvatars();
    this.setupCombatTabs();

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.mainLoop(t));
  },

  initFalloutAsh() {
    this.falloutAsh = [];
    for (let i = 0; i < 45; i++) {
      this.falloutAsh.push({
        x: Math.random() * 960,
        y: Math.random() * 540,
        vx: (Math.random() - 0.7) * 20,
        vy: Math.random() * 15 + 10,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  },

  bindControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      this.handleKeyDown(e.key.toLowerCase());
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    document.querySelectorAll('.class-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.class-choice-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
      card.querySelector('.btn-pick').addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectClass(card.dataset.class);
      });
    });

    document.getElementById('btn-shop').addEventListener('click', () => this.toggleShop(true));
    document.getElementById('btn-cosmetics').addEventListener('click', () => this.toggleCosmetics(true));
    document.getElementById('btn-journal').addEventListener('click', () => this.toggleJournal(true));
    document.getElementById('btn-skilltree').addEventListener('click', () => this.toggleSkillTree(true));
    document.getElementById('btn-worldmap').addEventListener('click', () => this.toggleWorldMap(true));
    document.getElementById('hud-equipped-weapon').addEventListener('click', () => this.toggleShop(true));
    document.getElementById('btn-sound').addEventListener('click', (e) => {
      AudioSys.enabled = !AudioSys.enabled;
      e.target.textContent = AudioSys.enabled ? '🔊' : '🔇';
      AudioSys.click();
    });

    document.getElementById('btn-close-dialogue').addEventListener('click', () => this.closeDialogue());

    // Touch D-Pad
    const setupTouchBtn = (id, key) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[key] = true; });
      btn.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[key] = false; });
      btn.addEventListener('mousedown', () => { this.keys[key] = true; });
      btn.addEventListener('mouseup', () => { this.keys[key] = false; });
    };
    setupTouchBtn('btn-t-up', 'w');
    setupTouchBtn('btn-t-down', 's');
    setupTouchBtn('btn-t-left', 'a');
    setupTouchBtn('btn-t-right', 'd');
    const actBtn = document.getElementById('btn-t-action');
    if (actBtn) actBtn.addEventListener('click', () => this.triggerInteraction());
  },

  handleKeyDown(key) {
    if (this.gameState === 'explore') {
      if (key === 'e' || key === ' ') this.triggerInteraction();
      else if (key === 'b') this.toggleShop(true);
      else if (key === 'c') this.toggleCosmetics(true);
      else if (key === 'j') this.toggleJournal(true);
      else if (key === 'k') this.toggleSkillTree(true);
      else if (key === 'm') this.toggleWorldMap(true);
    } else if (this.gameState === 'dialogue') {
      if (key === 'escape') this.closeDialogue();
    } else if (this.gameState === 'modal') {
      if (key === 'escape') {
        this.toggleShop(false);
        this.toggleCosmetics(false);
        this.toggleJournal(false);
        this.toggleSkillTree(false);
        this.toggleWorldMap(false);
      }
    }
  },

  selectClass(classId) {
    this.player.classId = classId;
    if (classId === 'pyromancer') {
      this.player.className = 'Pyromancer (Ignis Vektor)';
      this.player.baseAtk = 40;
      this.player.def = 14;
      this.player.speed = 18;
    } else if (classId === 'cryomancer') {
      this.player.className = 'Cryomancer (Glacies Entropi)';
      this.player.baseAtk = 32;
      this.player.def = 22;
      this.player.speed = 15;
    } else {
      this.player.className = 'Electromancer (Fulmen Kinetik)';
      this.player.baseAtk = 36;
      this.player.def = 16;
      this.player.speed = 26;
    }

    this.recalculateStats();
    this.player.skills = JSON.parse(JSON.stringify(SKILLS_DB[classId]));
    AudioSys.levelUp();

    document.getElementById('screen-class-select').classList.remove('active');
    document.getElementById('screen-class-select').classList.add('hidden');

    this.drawHeroFace();
    this.updateTopHUD();
  },

  recalculateStats() {
    const wp = WEAPONS_SHOP_DB.find(w => w.id === this.player.equippedWeapon);
    const wpAtk = wp ? wp.atk : 0;
    this.player.skillMult = wp ? wp.skillMult : 0.05;
    this.player.atk = this.player.baseAtk + wpAtk;
  },

  updateTopHUD() {
    document.getElementById('hud-hero-name').textContent = this.player.className.split(' ')[0];
    document.getElementById('hud-hero-lvl').textContent = this.player.level;
    document.getElementById('hud-hp-fill').style.width = `${Math.max(0, (this.player.hp / this.player.maxHp) * 100)}%`;
    document.getElementById('hud-hp-text').textContent = `${Math.round(this.player.hp)}/${this.player.maxHp}`;
    document.getElementById('hud-mp-fill').style.width = `${Math.max(0, (this.player.mp / this.player.maxMp) * 100)}%`;
    document.getElementById('hud-mp-text').textContent = `${Math.round(this.player.mp)}/${this.player.maxMp}`;

    document.getElementById('hud-scrap').textContent = this.player.scrap;
    document.getElementById('hud-sp').textContent = this.player.sp;

    const wp = WEAPONS_SHOP_DB.find(w => w.id === this.player.equippedWeapon);
    if (wp) {
      document.getElementById('hud-weapon-name').textContent = wp.name;
      document.getElementById('hud-weapon-bonus').textContent = `Skill Dmg +${Math.round(wp.skillMult * 100)}%`;
    }

    const k2 = document.getElementById('key-ch2');
    const k3 = document.getElementById('key-ch3');
    const k4 = document.getElementById('key-ch4');

    if (this.player.keys.ch2_bio) { k2.className = 'key-badge unlocked'; k2.textContent = '🗝️ Bio-Key ✓'; }
    else { k2.className = 'key-badge locked'; k2.textContent = '🗝️ Ch.2 🔒'; }

    if (this.player.keys.ch3_cyber) { k3.className = 'key-badge unlocked'; k3.textContent = '💳 Cyber-Card ✓'; }
    else { k3.className = 'key-badge locked'; k3.textContent = '💳 Ch.3 🔒'; }

    if (this.player.keys.ch4_void) { k4.className = 'key-badge unlocked'; k4.textContent = '🔮 Void-Crystal ✓'; }
    else { k4.className = 'key-badge locked'; k4.textContent = '🔮 Ch.4 🔒'; }

    const map = MAPS[this.currentMapId];
    document.getElementById('hud-zone-name').textContent = map.name;
    document.getElementById('hud-zone-sub').textContent = map.sub;
  },

  showToast(title, desc, icon = '🗝️') {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-desc').textContent = desc;
    document.getElementById('toast-icon').textContent = icon;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
  },

  // ==========================================
  // 5. SHOP & WEAPONS SYSTEM
  // ==========================================
  toggleShop(open) {
    AudioSys.click();
    const modal = document.getElementById('modal-shop');
    if (open) {
      this.gameState = 'modal';
      modal.classList.remove('hidden');
      document.getElementById('shop-scrap-val').textContent = this.player.scrap;
      this.renderShopContent();
    } else {
      this.gameState = 'explore';
      modal.classList.add('hidden');
    }
  },

  switchShopTab(tab) {
    this.currentShopTab = tab;
    document.getElementById('shop-tab-weapons').classList.toggle('active', tab === 'weapons');
    document.getElementById('shop-tab-potions').classList.toggle('active', tab === 'potions');
    AudioSys.click();
    this.renderShopContent();
  },

  renderShopContent() {
    const container = document.getElementById('shop-items-container');
    container.innerHTML = '';
    document.getElementById('shop-scrap-val').textContent = this.player.scrap;

    if (this.currentShopTab === 'weapons') {
      WEAPONS_SHOP_DB.forEach(w => {
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        const isEquipped = this.player.equippedWeapon === w.id;
        const canBuy = !w.owned && this.player.scrap >= w.cost;

        card.innerHTML = `
          <div class="shop-item-meta">
            <span class="shop-item-title">${w.icon} ${w.name}</span>
            <span class="shop-item-desc">${w.desc}</span>
            <span class="shop-item-stat">⚡ ATK +${w.atk} | 💥 Bonus Skill: +${Math.round(w.skillMult * 100)}%</span>
          </div>
          <div>
            ${isEquipped ? 
              '<button class="shop-buy-btn equipped" disabled>DIPAKAI ✓</button>' : 
              (w.owned ? 
                `<button class="shop-buy-btn" onclick="Game.equipWeapon('${w.id}')">GUNAKAN</button>` : 
                `<button class="shop-buy-btn" ${canBuy ? '' : 'disabled'} onclick="Game.buyWeapon('${w.id}')">BELI (${w.cost} ⚙️)</button>`
              )
            }
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      POTIONS_SHOP_DB.forEach(p => {
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        const canBuy = this.player.scrap >= p.cost;
        const currentQty = this.player.items[p.key] || 0;

        card.innerHTML = `
          <div class="shop-item-meta">
            <span class="shop-item-title">${p.icon} ${p.name} <small style="color:var(--cryo); font-weight:normal;">(Dimiliki: x${currentQty})</small></span>
            <span class="shop-item-desc">${p.desc}</span>
          </div>
          <div>
            <button class="shop-buy-btn" ${canBuy ? '' : 'disabled'} onclick="Game.buyPotion('${p.key}', ${p.cost})">BELI (${p.cost} ⚙️)</button>
          </div>
        `;
        container.appendChild(card);
      });
    }
  },

  buyWeapon(wpId) {
    const wp = WEAPONS_SHOP_DB.find(w => w.id === wpId);
    if (!wp || this.player.scrap < wp.cost) return;
    this.player.scrap -= wp.cost;
    wp.owned = true;
    this.player.equippedWeapon = wp.id;
    this.recalculateStats();
    AudioSys.buy();
    this.showToast("SENJATA DIBELI & DIPAKAI!", `${wp.name}: ATK +${wp.atk}, Skill Dmg +${Math.round(wp.skillMult*100)}%`, wp.icon);
    this.updateTopHUD();
    this.renderShopContent();
  },

  equipWeapon(wpId) {
    const wp = WEAPONS_SHOP_DB.find(w => w.id === wpId);
    if (!wp || !wp.owned) return;
    this.player.equippedWeapon = wp.id;
    this.recalculateStats();
    AudioSys.click();
    this.showToast("SENJATA DIPAKAI!", `${wp.name} aktif di tangan pahlawan!`, wp.icon);
    this.updateTopHUD();
    this.renderShopContent();
  },

  buyPotion(itemKey, cost) {
    if (this.player.scrap < cost) return;
    this.player.scrap -= cost;
    this.player.items[itemKey] = (this.player.items[itemKey] || 0) + 1;
    AudioSys.buy();
    this.updateTopHUD();
    this.renderShopContent();
  },

  // ==========================================
  // 6. COSMETICS & WARDROBE SYSTEM
  // ==========================================
  toggleCosmetics(open) {
    AudioSys.click();
    const modal = document.getElementById('modal-cosmetics');
    if (open) {
      this.gameState = 'modal';
      modal.classList.remove('hidden');
      document.getElementById('cosmetics-scrap-val').textContent = this.player.scrap;
      this.renderCosmeticsContent();
      this.drawCosmeticsPreview();
    } else {
      this.gameState = 'explore';
      modal.classList.add('hidden');
    }
  },

  switchCosmTab(tab) {
    this.currentCosmTab = tab;
    document.getElementById('cosm-tab-skins').classList.toggle('active', tab === 'skins');
    document.getElementById('cosm-tab-heads').classList.toggle('active', tab === 'heads');
    AudioSys.click();
    this.renderCosmeticsContent();
  },

  renderCosmeticsContent() {
    const container = document.getElementById('cosmetics-items-container');
    container.innerHTML = '';
    document.getElementById('cosmetics-scrap-val').textContent = this.player.scrap;

    const list = this.currentCosmTab === 'skins' ? COSMETICS_DB.skins : COSMETICS_DB.heads;
    const currentEquipped = this.currentCosmTab === 'skins' ? this.player.equippedSkin : this.player.equippedHead;

    list.forEach(item => {
      const card = document.createElement('div');
      const isEquipped = currentEquipped === item.id;
      card.className = `cosmetic-card ${isEquipped ? 'active' : ''}`;
      const canBuy = !item.owned && this.player.scrap >= item.cost;

      card.innerHTML = `
        <div class="shop-item-meta">
          <span class="shop-item-title">${item.name}</span>
          <span class="shop-item-desc">${item.desc}</span>
        </div>
        <div>
          ${isEquipped ? 
            '<button class="shop-buy-btn equipped" disabled>DIPAKAI ✓</button>' : 
            (item.owned ? 
              `<button class="shop-buy-btn" onclick="Game.equipCosmetic('${this.currentCosmTab}', '${item.id}')">PAKAI</button>` : 
              `<button class="shop-buy-btn" ${canBuy ? '' : 'disabled'} onclick="Game.buyCosmetic('${this.currentCosmTab}', '${item.id}')">BUKA (${item.cost} ⚙️)</button>`
            )
          }
        </div>
      `;
      container.appendChild(card);
    });

    const skinObj = COSMETICS_DB.skins.find(s => s.id === this.player.equippedSkin);
    const headObj = COSMETICS_DB.heads.find(h => h.id === this.player.equippedHead);
    document.getElementById('preview-skin-label').textContent = `Jubah: ${skinObj ? skinObj.name : 'Default'}`;
    document.getElementById('preview-head-label').textContent = `Kepala: ${headObj ? headObj.name : 'Default'}`;
  },

  buyCosmetic(type, id) {
    const list = type === 'skins' ? COSMETICS_DB.skins : COSMETICS_DB.heads;
    const item = list.find(x => x.id === id);
    if (!item || this.player.scrap < item.cost) return;

    this.player.scrap -= item.cost;
    item.owned = true;
    if (type === 'skins') this.player.equippedSkin = item.id;
    else this.player.equippedHead = item.id;

    AudioSys.buy();
    this.drawHeroFace();
    this.drawCosmeticsPreview();
    this.updateTopHUD();
    this.renderCosmeticsContent();
  },

  equipCosmetic(type, id) {
    const list = type === 'skins' ? COSMETICS_DB.skins : COSMETICS_DB.heads;
    const item = list.find(x => x.id === id);
    if (!item || !item.owned) return;

    if (type === 'skins') this.player.equippedSkin = item.id;
    else this.player.equippedHead = item.id;

    AudioSys.click();
    this.drawHeroFace();
    this.drawCosmeticsPreview();
    this.renderCosmeticsContent();
  },

  drawCosmeticsPreview() {
    const c = document.getElementById('cosmetics-hero-preview');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 160, 160);

    ctx.save();
    ctx.translate(80, 100);
    this.drawPyromancerStyleHero(ctx, this.player.classId, 2.8, 'down', 0, performance.now() / 1000);
    ctx.restore();
  },

  // ==========================================
  // 7. OVERWORLD EXPLORATION & COLLISION
  // ==========================================
  triggerInteraction() {
    if (this.nearbyNpc) {
      if (this.nearbyNpc.id === 'mira') this.toggleShop(true);
      else this.openDialogue(this.nearbyNpc);
    } else if (this.nearbyShopCounter) {
      this.toggleShop(true);
    } else if (this.nearbyPortal) {
      this.usePortal(this.nearbyPortal);
    }
  },

  usePortal(portal) {
    if (portal.reqKey && !this.player.keys[portal.reqKey]) {
      AudioSys.locked();
      this.screenShake = 10;
      let neededBoss = "Boss Chapter sebelumnya";
      if (portal.reqKey === 'ch2_bio') neededBoss = "Titan Scrap Colossus di Chapter 1 untuk Kunci Bio-Hazard";
      else if (portal.reqKey === 'ch3_cyber') neededBoss = "Queen Brood Mother di Chapter 2 untuk Kartu Akses Siber";
      else if (portal.reqKey === 'ch4_void') neededBoss = "Apex Executioner di Chapter 3 untuk Kristal Singularitas";

      this.showToast("GERBANG DIMENSI TERSEGEL! 🔒", `Kalahkan ${neededBoss}!`, "⛔");
      return;
    }

    AudioSys.portal();
    this.currentMapId = portal.targetMap;
    this.player.x = portal.targetX * 32;
    this.player.y = portal.yOffset * 32;
    this.nearbyPortal = null;
    this.nearbyNpc = null;
    this.updateTopHUD();
  },

  updatePlayer(dt) {
    if (this.gameState !== 'explore') return;

    let moveX = 0;
    let moveY = 0;

    if (this.keys['w'] || this.keys['arrowup']) moveY -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) moveY += 1;
    if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
    if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

    this.player.isMoving = (moveX !== 0 || moveY !== 0);

    if (this.player.isMoving) {
      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.player.dir = moveX > 0 ? 'right' : 'left';
      } else {
        this.player.dir = moveY > 0 ? 'down' : 'up';
      }

      const len = Math.hypot(moveX, moveY);
      const speed = 145;
      const dx = (moveX / len) * speed * dt;
      const dy = (moveY / len) * speed * dt;

      const map = MAPS[this.currentMapId];
      this.player.x = Math.max(16, Math.min((map.width - 1) * 32, this.player.x + dx));
      this.player.y = Math.max(16, Math.min((map.height - 1) * 32, this.player.y + dy));

      this.player.walkTimer += dt * 8;
      if (this.player.walkTimer >= 1) {
        this.player.walkTimer = 0;
        this.player.walkFrame = (this.player.walkFrame + 1) % 4;
        AudioSys.step();
        this.spawnFootstepDust();
      }
    } else {
      this.player.walkFrame = 0;
    }

    const targetCamX = this.player.x - this.canvas.width / 2;
    const targetCamY = this.player.y - this.canvas.height / 2;
    this.camera.x += (targetCamX - this.camera.x) * 0.12;
    this.camera.y += (targetCamY - this.camera.y) * 0.12;

    this.checkProximity();
    this.checkMonsterCollision();
  },

  spawnFootstepDust() {
    const pColor = this.player.classId === 'pyromancer' ? 'rgba(255, 120, 50, 0.7)' : (this.player.classId === 'cryomancer' ? 'rgba(100, 220, 255, 0.7)' : 'rgba(230, 140, 255, 0.7)');
    for (let i = 0; i < 2; i++) {
      this.particles.push({
        x: this.player.x + (Math.random() - 0.5) * 12,
        y: this.player.y + 12,
        vx: (Math.random() - 0.5) * 15,
        vy: -Math.random() * 8,
        color: pColor,
        size: Math.random() * 3 + 2,
        life: 0.6,
        decay: 1.2
      });
    }
  },

  checkProximity() {
    const map = MAPS[this.currentMapId];
    this.nearbyNpc = null;
    this.nearbyPortal = null;
    this.nearbyShopCounter = false;

    // Check NPC Proximity
    for (const npc of map.npcs) {
      if (Math.hypot(this.player.x - (npc.x * 32), this.player.y - (npc.y * 32)) < 48) {
        this.nearbyNpc = npc;
        break;
      }
    }

    // Check Shop Counter Proximity in Sanctuary
    if (!this.nearbyNpc && map.shopBuilding) {
      const sb = map.shopBuilding;
      const counterX = (sb.x + sb.w / 2) * 32;
      const counterY = (sb.y + sb.h) * 32;
      if (Math.hypot(this.player.x - counterX, this.player.y - counterY) < 55) {
        this.nearbyShopCounter = true;
      }
    }

    // Check Portal Proximity
    if (!this.nearbyNpc && !this.nearbyShopCounter) {
      for (const portal of map.portals) {
        if (Math.hypot(this.player.x - (portal.x * 32), this.player.y - (portal.y * 32)) < 40) {
          this.nearbyPortal = portal;
          break;
        }
      }
    }

    const prompt = document.getElementById('proximity-prompt');
    if (this.nearbyNpc) {
      prompt.classList.remove('hidden');
      const actionText = this.nearbyNpc.id === 'mira' ? 'Buka Toko Arsenal Mira' : `Bicara dengan ${this.nearbyNpc.name}`;
      document.getElementById('prompt-label').textContent = actionText;
      prompt.style.left = `${(this.nearbyNpc.x * 32) - this.camera.x}px`;
      prompt.style.top = `${(this.nearbyNpc.y * 32) - this.camera.y - 32}px`;
    } else if (this.nearbyShopCounter) {
      prompt.classList.remove('hidden');
      document.getElementById('prompt-label').textContent = 'Buka Toko Arsenal Mira [B]';
      const sb = map.shopBuilding;
      prompt.style.left = `${((sb.x + sb.w/2) * 32) - this.camera.x}px`;
      prompt.style.top = `${((sb.y + sb.h) * 32) - this.camera.y - 20}px`;
    } else if (this.nearbyPortal) {
      prompt.classList.remove('hidden');
      const isLocked = portalIsLocked(this.nearbyPortal, this.player.keys);
      document.getElementById('prompt-label').textContent = isLocked ? `🔒 ${this.nearbyPortal.label} (TERKUNCI)` : this.nearbyPortal.label;
      prompt.style.left = `${(this.nearbyPortal.x * 32) - this.camera.x}px`;
      prompt.style.top = `${(this.nearbyPortal.y * 32) - this.camera.y - 28}px`;
    } else {
      prompt.classList.add('hidden');
    }
  },

  checkMonsterCollision() {
    const map = MAPS[this.currentMapId];
    for (let i = 0; i < map.monsters.length; i++) {
      const m = map.monsters[i];
      if (Math.hypot(this.player.x - (m.x * 32), this.player.y - (m.y * 32)) < 30) {
        this.startBattle(m, i);
        break;
      }
    }
  },

  // ==========================================
  // 8. NPC DIALOGUE SYSTEM
  // ==========================================
  openDialogue(npc) {
    AudioSys.dialogue();
    this.gameState = 'dialogue';
    this.activeNpc = npc;

    const box = document.getElementById('dialogue-box-container');
    box.classList.remove('hidden');

    document.getElementById('dialogue-speaker-name').textContent = npc.name;
    document.getElementById('dialogue-speaker-role').textContent = npc.role;
    document.getElementById('dialogue-text').textContent = `"${npc.quote}"`;

    this.drawHD256Portrait('dialogue-portrait-canvas', npc.id, 96);

    const optsRow = document.getElementById('dialogue-options-list');
    optsRow.innerHTML = '';
    npc.choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'dialogue-choice-pill';
      btn.textContent = `▶ ${ch.text}`;
      btn.addEventListener('click', () => {
        AudioSys.dialogue();
        document.getElementById('dialogue-text').textContent = `"${ch.reply}"`;
        this.handleDialogueAction(ch.action);
      });
      optsRow.appendChild(btn);
    });
  },

  handleDialogueAction(action) {
    if (!action) return;
    if (action === 'open_shop') {
      this.closeDialogue();
      this.toggleShop(true);
    } else if (action === 'respec') {
      let refund = 0;
      this.player.skills.forEach((s, idx) => {
        if (idx > 0 && s.unlocked) { s.unlocked = false; refund++; }
      });
      this.player.sp += refund;
      AudioSys.levelUp();
      this.updateTopHUD();
    } else if (action === 'buff_atk') {
      this.player.baseAtk = Math.round(this.player.baseAtk * 1.15);
      this.recalculateStats();
      AudioSys.levelUp();
      this.updateTopHUD();
    } else if (action === 'heal') {
      this.player.hp = this.player.maxHp;
      this.player.mp = this.player.maxMp;
      AudioSys.ice();
      this.updateTopHUD();
    } else if (action === 'buy_pot') {
      if (this.player.scrap >= 30) {
        this.player.scrap -= 30;
        this.player.items.potion = (this.player.items.potion || 0) + 2;
        AudioSys.levelUp();
        this.updateTopHUD();
      } else {
        document.getElementById('dialogue-text').textContent = '"Scrap-mu belum cukup! Kumpulkan lebih banyak dari monster."';
      }
    }
  },

  closeDialogue() {
    this.gameState = 'explore';
    document.getElementById('dialogue-box-container').classList.add('hidden');
    this.activeNpc = null;
  },

  // ==========================================
  // 9. TACTICAL COMBAT SYSTEM
  // ==========================================
  setupCombatTabs() {
    document.getElementById('c-tab-attack').addEventListener('click', () => this.battleAttack());
    document.getElementById('c-tab-skills').addEventListener('click', () => {
      document.getElementById('combat-skills-sub').classList.remove('hidden');
      document.getElementById('combat-items-sub').classList.add('hidden');
      AudioSys.click();
    });
    document.getElementById('c-tab-items').addEventListener('click', () => {
      document.getElementById('combat-skills-sub').classList.add('hidden');
      document.getElementById('combat-items-sub').classList.remove('hidden');
      AudioSys.click();
    });
    document.getElementById('c-tab-guard').addEventListener('click', () => this.battleGuard());
  },

  startBattle(monsterData, monsterIndex) {
    AudioSys.attack();
    this.gameState = 'battle';
    this.battle.monster = {
      ...monsterData,
      maxHp: monsterData.hp,
      mapIndex: monsterIndex,
      isEnraged: false
    };
    this.battle.turn = 'player';
    this.battle.shield = 0;
    this.battle.statuses = { player: [], monster: [] };
    this.combatVFX = [];

    const enemyCard = document.getElementById('battle-enemy-card');
    if (monsterData.isBoss) {
      enemyCard.classList.add('boss-mode');
      this.screenShake = 14;
      AudioSys.locked();
    } else {
      enemyCard.classList.remove('boss-mode');
    }

    document.getElementById('screen-combat-arena').classList.remove('hidden');
    document.getElementById('battle-enemy-name').textContent = monsterData.name;
    document.getElementById('battle-enemy-desc').textContent = monsterData.title;

    this.renderCombatSkills();
    this.updateCombatHUD();
    this.addCombatLog(monsterData.isBoss ? `PERINGATAN ANOMALI TINGKAT BOSS: ${monsterData.name}!` : `Kontak dengan anomali: ${monsterData.name}!`);
  },

  renderCombatSkills() {
    const container = document.getElementById('combat-skills-sub');
    container.innerHTML = '';
    this.player.skills.forEach(sk => {
      const btn = document.createElement('button');
      btn.className = 'c-skill-btn';
      btn.disabled = !sk.unlocked || this.player.mp < sk.costMp || sk.costMp === 0;
      btn.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>${sk.name}</span>
          <span style="color: var(--cryo);">${sk.costMp > 0 ? sk.costMp + ' MP' : 'PASIF'}</span>
        </div>
        <div style="font-size: 9px; color: var(--text-dim); margin-top: 2px;">${sk.desc}</div>
      `;
      btn.addEventListener('click', () => {
        if (sk.unlocked && this.player.mp >= sk.costMp && sk.costMp > 0) {
          this.executeBattleSkill(sk);
        }
      });
      container.appendChild(btn);
    });

    document.getElementById('b-qty-potion').textContent = `x${this.player.items.potion || 0}`;
    document.getElementById('b-qty-mega').textContent = `x${this.player.items.mega_potion || 0}`;
    document.getElementById('b-qty-mana').textContent = `x${this.player.items.mana || 0}`;
    document.getElementById('b-qty-hyper').textContent = `x${this.player.items.hyper_mana || 0}`;
    document.getElementById('b-qty-cleanse').textContent = `x${this.player.items.cleanse || 0}`;
  },

  updateCombatHUD() {
    const m = this.battle.monster;
    document.getElementById('battle-enemy-hp-fill').style.width = `${Math.max(0, (m.hp / m.maxHp) * 100)}%`;
    document.getElementById('battle-enemy-hp-text').textContent = `${Math.round(m.hp)} / ${m.maxHp} HP`;

    document.getElementById('battle-player-name').textContent = this.player.className.split(' ')[0];
    document.getElementById('battle-player-hp-fill').style.width = `${Math.max(0, (this.player.hp / this.player.maxHp) * 100)}%`;
    document.getElementById('battle-player-hp-text').textContent = `${Math.round(this.player.hp)}/${this.player.maxHp} HP`;
    document.getElementById('battle-player-mp-fill').style.width = `${Math.max(0, (this.player.mp / this.player.maxMp) * 100)}%`;
    document.getElementById('battle-player-mp-text').textContent = `${Math.round(this.player.mp)}/${this.player.maxMp} MP`;
    document.getElementById('battle-resonance-gauge').textContent = `RESONANSI: ${this.player.resonance}%`;
  },

  addCombatLog(msg) {
    const body = document.getElementById('combat-log-body');
    const p = document.createElement('p');
    p.textContent = msg;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  },

  battleAttack() {
    if (this.battle.turn !== 'player') return;
    AudioSys.attack();

    const m = this.battle.monster;
    let dmg = Math.max(6, this.player.atk - (m.def * 0.3));
    const isCrit = Math.random() < 0.2;
    if (isCrit) dmg *= 1.5;
    dmg = Math.round(dmg);

    m.hp -= dmg;
    this.player.resonance = Math.min(100, this.player.resonance + 15);
    this.addCombatLog(`Pahlawan menebas musuh! Menghasilkan ${dmg} damage! ${isCrit ? '(CRITICAL!)' : ''}`);

    this.triggerSkillVFX('slash');
    this.updateCombatHUD();
    this.checkMonsterDefeat();
  },

  executeBattleSkill(skill) {
    if (this.battle.turn !== 'player') return;
    if (this.player.mp < skill.costMp) return;

    this.player.mp -= skill.costMp;
    const m = this.battle.monster;

    if (this.player.classId === 'pyromancer') AudioSys.fire();
    else if (this.player.classId === 'cryomancer') AudioSys.ice();
    else AudioSys.lightning();

    const effectiveMult = skill.mult * (1 + this.player.skillMult);
    let dmg = Math.round((this.player.atk * effectiveMult) + skill.bonus - (m.def * 0.2));
    dmg = Math.max(12, dmg);

    if (skill.type === 'shield') {
      this.battle.shield += skill.bonus;
      this.addCombatLog(`Perisai Kuantum menyerap serangan hingga ${skill.bonus} poin!`);
    } else {
      m.hp -= dmg;
      this.addCombatLog(`${skill.name} meledak! Menimbulkan ${dmg} damage fatal! (Bonus Senjata: +${Math.round(this.player.skillMult * 100)}%)`);
      if (skill.type === 'burn') this.battle.statuses.monster.push({ type: 'burn', turns: 2, val: 12 });
      if (skill.type === 'chill' || skill.type === 'freeze') this.battle.statuses.monster.push({ type: 'chill', turns: 2, val: 10 });
      if (skill.type === 'shock') this.battle.statuses.monster.push({ type: 'shock', turns: 2, val: 15 });
    }

    this.triggerSkillVFX(skill.id);
    this.player.resonance = Math.min(100, this.player.resonance + 25);
    this.updateCombatHUD();
    this.renderCombatSkills();
    this.checkMonsterDefeat();
  },

  triggerSkillVFX(skillId) {
    this.screenShake = 6;
    let duration = 0.8;
    if (skillId === 'p5' || skillId === 'c5' || skillId === 'e5') {
      duration = 1.4;
      this.screenShake = 16;
    }
    this.combatVFX.push({ id: skillId, time: 0, duration: duration });
  },

  battleGuard() {
    if (this.battle.turn !== 'player') return;
    AudioSys.click();
    this.battle.shield += 25;
    this.player.mp = Math.min(this.player.maxMp, this.player.mp + 15);
    this.addCombatLog('Pahlawan bertahan (+25 Shield, +15 MP).');
    this.updateCombatHUD();
    this.endPlayerCombatTurn();
  },

  useBattleItem(type) {
    if (this.battle.turn !== 'player') return;
    if (!this.player.items[type] || this.player.items[type] <= 0) return;

    this.player.items[type]--;
    AudioSys.ice();

    if (type === 'potion') {
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 70);
      this.addCombatLog('Menggunakan Aether Potion (+70 HP)!');
    } else if (type === 'mega_potion') {
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 160);
      this.addCombatLog('Menggunakan Mega Elixir (+160 HP)!');
    } else if (type === 'mana') {
      this.player.mp = Math.min(this.player.maxMp, this.player.mp + 40);
      this.addCombatLog('Menggunakan Mana Injector (+40 MP)!');
    } else if (type === 'hyper_mana') {
      this.player.mp = Math.min(this.player.maxMp, this.player.mp + 90);
      this.addCombatLog('Menggunakan Hyper Battery (+90 MP)!');
    } else if (type === 'cleanse') {
      this.battle.statuses.player = [];
      this.addCombatLog('Status Cleanser memulihkan kondisi normal!');
    }

    this.renderCombatSkills();
    this.updateCombatHUD();
    this.endPlayerCombatTurn();
  },

  checkMonsterDefeat() {
    if (this.battle.monster.hp <= 0) {
      this.battle.monster.hp = 0;
      this.updateCombatHUD();
      this.triggerDeathRiddle();
    } else {
      this.endPlayerCombatTurn();
    }
  },

  endPlayerCombatTurn() {
    this.battle.turn = 'enemy';
    setTimeout(() => this.monsterCombatTurn(), 850);
  },

  monsterCombatTurn() {
    if (this.gameState !== 'battle' || this.battle.monster.hp <= 0) return;

    this.battle.statuses.monster = this.battle.statuses.monster.filter(st => {
      if (st.type === 'burn') {
        this.battle.monster.hp -= st.val;
        this.addCombatLog(`Efek Burn membakar ${this.battle.monster.name} sebesar ${st.val} damage!`);
      }
      st.turns--;
      return st.turns > 0;
    });

    if (this.battle.monster.hp <= 0) {
      this.triggerDeathRiddle();
      return;
    }

    const m = this.battle.monster;
    let rawDmg = Math.max(8, m.atk - (this.player.def * 0.35));
    if (m.isEnraged) rawDmg *= 1.35;
    rawDmg = Math.round(rawDmg);

    if (this.battle.shield > 0) {
      const absorbed = Math.min(this.battle.shield, rawDmg);
      this.battle.shield -= absorbed;
      rawDmg -= absorbed;
      this.addCombatLog(`Perisai menyerap ${absorbed} damage!`);
    }

    if (rawDmg > 0) {
      this.player.hp = Math.max(0, this.player.hp - rawDmg);
      AudioSys.attack();
      this.screenShake = 8;
      this.addCombatLog(`${m.name} menyerang pahlawan sebesar ${rawDmg} damage!`);
    }

    this.updateCombatHUD();
    this.updateTopHUD();

    if (this.player.hp <= 0) this.handlePlayerDefeat();
    else this.battle.turn = 'player';
  },

  handlePlayerDefeat() {
    AudioSys.riddleFail();
    alert('Pahlawan kehabisan tenaga! Sinyal darurat membawamu kembali ke Sanctuary.');
    this.player.hp = this.player.maxHp;
    this.player.mp = this.player.maxMp;
    this.currentMapId = 'sanctuary';
    this.player.x = 15 * 32;
    this.player.y = 10 * 32;
    document.getElementById('screen-combat-arena').classList.add('hidden');
    this.gameState = 'explore';
    this.updateTopHUD();
  },

  // ==========================================
  // 10. DEATH-RIDDLE & KEY REWARDS
  // ==========================================
  triggerDeathRiddle() {
    this.gameState = 'riddle';
    const m = this.battle.monster;
    const modal = document.getElementById('modal-death-riddle');
    modal.classList.remove('hidden');

    this.drawHD256Portrait('riddle-enemy-preview', m.id, 110);
    document.getElementById('riddle-enemy-title').textContent = m.name;
    document.getElementById('riddle-enemy-hint').textContent = m.title;

    const riddles = m.riddles;
    const rIdx = Math.floor(Math.random() * riddles.length);
    const r = riddles[rIdx];
    this.battle.currentRiddle = r;

    document.getElementById('riddle-topic-badge').textContent = r.cat;
    document.getElementById('riddle-question-body').textContent = r.q;

    const optContainer = document.getElementById('riddle-options-deck');
    optContainer.innerHTML = '';
    r.opts.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-choice-btn';
      btn.textContent = `${String.fromCharCode(65 + optIdx)}. ${optText}`;
      btn.addEventListener('click', () => this.submitDeathRiddle(optIdx));
      optContainer.appendChild(btn);
    });

    this.battle.riddleSecRemaining = 35;
    document.getElementById('riddle-clock').textContent = this.battle.riddleSecRemaining;
    clearInterval(this.battle.riddleTimer);
    this.battle.riddleTimer = setInterval(() => {
      this.battle.riddleSecRemaining--;
      document.getElementById('riddle-clock').textContent = this.battle.riddleSecRemaining;
      if (this.battle.riddleSecRemaining <= 0) {
        clearInterval(this.battle.riddleTimer);
        this.submitDeathRiddle(-1);
      }
    }, 1000);
  },

  submitDeathRiddle(chosenIndex) {
    clearInterval(this.battle.riddleTimer);
    document.getElementById('modal-death-riddle').classList.add('hidden');

    const r = this.battle.currentRiddle;
    const m = this.battle.monster;

    if (chosenIndex === r.ans) {
      AudioSys.riddleSuccess();
      this.addCombatLog(`[CRITICAL SOLVE!] Jawaban Tepat! ${r.expl}`);
      this.player.mp = Math.min(this.player.maxMp, this.player.mp + 20);

      const map = MAPS[this.currentMapId];
      map.monsters.splice(m.mapIndex, 1);

      let unlockedKey = null;
      if (m.isBoss && m.dropKey) {
        this.player.keys[m.dropKey] = true;
        unlockedKey = m.dropKeyName;
        AudioSys.keyFanfare();
        this.showToast(`KUNCI DIDAPATKAN: ${m.dropKeyName}!`, "Gerbang Chapter berikutnya kini telah terbuka!", "🗝️");
      }

      setTimeout(() => this.showVictoryModal(unlockedKey), 600);
    } else {
      AudioSys.riddleFail();
      m.hp = Math.round(m.maxHp * 0.35);
      m.isEnraged = true;
      m.atk = Math.round(m.atk * 1.25);
      this.addCombatLog(`[PARADOX ERROR!] Jawaban Salah! ${r.expl}`);
      this.addCombatLog(`${m.name} beregenerasi 35% HP dan masuk status ENRAGED!`);

      this.gameState = 'battle';
      this.updateCombatHUD();
      this.endPlayerCombatTurn();
    }
  },

  showVictoryModal(unlockedKey) {
    document.getElementById('screen-combat-arena').classList.add('hidden');
    const vicModal = document.getElementById('modal-overkill-victory');
    vicModal.classList.remove('hidden');

    const m = this.battle.monster;
    this.player.exp += m.exp;
    this.player.scrap += m.scrap;

    document.getElementById('vic-exp-text').textContent = `+${m.exp} EXP`;
    document.getElementById('vic-scrap-text').textContent = `+${m.scrap} Scrap`;

    const keyBox = document.getElementById('vic-key-reward');
    if (unlockedKey) {
      keyBox.classList.remove('hidden');
      document.getElementById('vic-key-name').textContent = `${unlockedKey} Berhasil Didapatkan!`;
    } else {
      keyBox.classList.add('hidden');
    }

    let lvlUp = false;
    if (this.player.exp >= this.player.expToLevel) {
      this.player.exp -= this.player.expToLevel;
      this.player.level++;
      this.player.sp += 1;
      this.player.maxHp += 25;
      this.player.hp = this.player.maxHp;
      this.player.maxMp += 15;
      this.player.mp = this.player.maxMp;
      this.player.baseAtk += 6;
      this.recalculateStats();
      this.player.def += 4;
      this.player.expToLevel = Math.round(this.player.expToLevel * 1.4);
      lvlUp = true;
      AudioSys.levelUp();
    }

    const lvlBanner = document.getElementById('vic-level-banner');
    if (lvlUp) {
      lvlBanner.classList.remove('hidden');
      lvlBanner.textContent = `🎉 LEVEL UP! Kadet mencapai Level ${this.player.level}! (+1 Skill Point)`;
    } else {
      lvlBanner.classList.add('hidden');
    }

    this.updateTopHUD();
  },

  closeVictoryModal() {
    document.getElementById('modal-overkill-victory').classList.add('hidden');
    this.gameState = 'explore';
  },

  // ==========================================
  // 11. SUB-MODALS (SKILL TREE, JOURNAL, MAP)
  // ==========================================
  toggleSkillTree(open) {
    AudioSys.click();
    const modal = document.getElementById('modal-skill-tree');
    if (open) {
      this.gameState = 'modal';
      modal.classList.remove('hidden');
      this.renderSkillTree();
    } else {
      this.gameState = 'explore';
      modal.classList.add('hidden');
    }
  },

  renderSkillTree() {
    const container = document.getElementById('skill-nodes-container');
    container.innerHTML = '';
    document.getElementById('st-sp-val').textContent = this.player.sp;

    this.player.skills.forEach((sk, idx) => {
      const card = document.createElement('div');
      card.style.cssText = `background: rgba(255,255,255,0.04); border: 1px solid var(--border-glass); border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;`;
      const canUnlock = !sk.unlocked && this.player.sp > 0 && (idx === 0 || this.player.skills[idx - 1].unlocked);

      card.innerHTML = `
        <div>
          <h4 style="font-family: var(--font-tech); font-size: 13px; color: #fff;">${sk.name} <span style="font-size: 9px; color: var(--cryo);">[TIER ${sk.tier}]</span></h4>
          <p style="font-size: 11px; color: var(--text-muted);">${sk.desc}</p>
        </div>
        <div>
          ${sk.unlocked ? '<span style="color: #10b981; font-weight: 700; font-size: 11px;">TERBUKA ✓</span>' : `<button class="c-tab-btn" ${canUnlock ? '' : 'disabled'}>BUKA (1 SP)</button>`}
        </div>
      `;

      if (canUnlock) {
        card.querySelector('button').addEventListener('click', () => {
          this.player.sp--;
          sk.unlocked = true;
          AudioSys.levelUp();
          this.renderSkillTree();
          this.updateTopHUD();
        });
      }
      container.appendChild(card);
    });
  },

  toggleJournal(open) {
    AudioSys.click();
    const modal = document.getElementById('modal-journal');
    if (open) {
      this.gameState = 'modal';
      modal.classList.remove('hidden');
      const container = document.getElementById('journal-entries-container');
      container.innerHTML = '';
      QUESTS_DATA.forEach(q => {
        const d = document.createElement('div');
        d.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 8px; padding: 12px;';
        d.innerHTML = `
          <h4 style="font-family: var(--font-tech); font-size: 13px; color: #fff; margin-bottom: 4px;">${q.title}</h4>
          <p style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">${q.desc}</p>
        `;
        container.appendChild(d);
      });
    } else {
      this.gameState = 'explore';
      modal.classList.add('hidden');
    }
  },

  toggleWorldMap(open) {
    AudioSys.click();
    const modal = document.getElementById('modal-worldmap');
    if (open) {
      this.gameState = 'modal';
      modal.classList.remove('hidden');
      const container = document.getElementById('worldmap-areas-container');
      container.innerHTML = '';

      Object.values(MAPS).forEach(m => {
        const card = document.createElement('div');
        const isLocked = mapIsLocked(m.id, this.player.keys);
        card.className = `map-card ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `
          <h4>${isLocked ? '🔒 ' : '🌐 '}${m.name}</h4>
          <span>${m.sub}</span>
        `;
        card.addEventListener('click', () => {
          if (isLocked) {
            AudioSys.locked();
            this.showToast("CHAPTER TERKUNCI! 🔒", "Kalahkan Boss di chapter sebelumnya untuk membuka kunci!", "⛔");
            return;
          }
          this.currentMapId = m.id;
          this.player.x = m.spawn.x * 32;
          this.player.y = m.spawn.y * 32;
          AudioSys.portal();
          this.toggleWorldMap(false);
          this.updateTopHUD();
        });
        container.appendChild(card);
      });
    } else {
      this.gameState = 'explore';
      modal.classList.add('hidden');
    }
  },

  // ==========================================
  // 12. ULTRA HD ROAD TILES & RUINED BURNING BUILDINGS
  // ==========================================
  mainLoop(time) {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 25);
    }

    this.particles = this.particles.filter(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= p.decay * dt;
      return p.life > 0;
    });

    this.falloutAsh.forEach(a => {
      a.x += a.vx * dt;
      a.y += a.vy * dt;
      if (a.y > 540) { a.y = -10; a.x = Math.random() * 960; }
      if (a.x < -10) a.x = 970;
    });

    if (this.combatVFX.length > 0) {
      this.combatVFX = this.combatVFX.filter(v => {
        v.time += dt;
        return v.time < v.duration;
      });
    }

    this.updatePlayer(dt);
    this.renderOverworld(time / 1000);
    this.renderRadar();

    if (this.gameState === 'battle') {
      this.renderBattleStage(time / 1000);
    }

    requestAnimationFrame((t) => this.mainLoop(t));
  },

  renderOverworld(timeSec) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const map = MAPS[this.currentMapId];

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    let camX = this.camera.x;
    let camY = this.camera.y;
    if (this.screenShake > 0) {
      camX += (Math.random() - 0.5) * this.screenShake;
      camY += (Math.random() - 0.5) * this.screenShake;
    }
    ctx.translate(-Math.round(camX), -Math.round(camY));

    // 1. ULTRA HD DETAILED ROAD & FLOOR TILES
    for (let x = 0; x < map.width; x++) {
      for (let y = 0; y < map.height; y++) {
        const px = x * 32;
        const py = y * 32;
        this.renderUltraHDRoadTile(ctx, this.currentMapId, x, y, px, py, timeSec);
      }
    }

    // 2. RUINED & BURNING MULTI-STORY BUILDINGS (In City)
    if (map.ruinedBuildings) {
      map.ruinedBuildings.forEach(bld => this.drawRuinedBurningBuilding(ctx, bld, timeSec));
    }

    // 3. BASE SHOP BUILDING (In Sanctuary)
    if (map.shopBuilding) {
      this.drawShopOutpost(ctx, map.shopBuilding);
    }

    // Portals
    map.portals.forEach(portal => {
      const px = portal.x * 32;
      const py = portal.y * 32;
      const isLocked = portalIsLocked(portal, this.player.keys);

      if (isLocked) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.beginPath();
        ctx.ellipse(px + 16, py + 16, 22, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(px + 12, py + 12, 8, 8);
      } else {
        ctx.fillStyle = 'rgba(217, 70, 239, 0.4)';
        ctx.beginPath();
        ctx.ellipse(px + 16, py + 16, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(px + 16, py + 16, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // NPCs
    map.npcs.forEach(npc => this.drawNpcSprite(ctx, npc, timeSec));

    // Monsters
    map.monsters.forEach(m => this.drawMonsterSprite(ctx, m, timeSec));

    // Particles
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1.0;

    // Player (4-Directional Pyromancer Style with Front, Back & Side)
    this.drawPlayerSprite(ctx, timeSec);

    ctx.restore();

    // Drifting Fallout Ash & Burning Embers
    this.falloutAsh.forEach(a => {
      ctx.fillStyle = this.currentMapId === 'city' ? 'rgba(251, 146, 60, ' + a.alpha + ')' : 'rgba(241, 245, 249, ' + a.alpha + ')';
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Ambient Lighting
    const haloX = this.player.x - this.camera.x;
    const haloY = this.player.y - this.camera.y;
    const haloGrad = ctx.createRadialGradient(haloX, haloY, 150, haloX, haloY, 500);
    haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
    haloGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.0)');
    haloGrad.addColorStop(1, 'rgba(6, 10, 22, 0.28)');
    ctx.fillStyle = haloGrad;
    ctx.fillRect(0, 0, w, h);
  },

  // ULTRA HD ROAD & FLOOR TILE DETAIL
  renderUltraHDRoadTile(ctx, mapId, x, y, px, py, timeSec) {
    if (mapId === 'city') {
      const isBoulevard = (y === 10 || y === 11);
      const isCrossroad = (x === 15 || x === 16);

      if (isBoulevard || isCrossroad) {
        // Real Asphalt Road with texture & curbs
        ctx.fillStyle = '#171d26'; // Dark asphalt base
        ctx.fillRect(px, py, 32, 32);

        // Gravel texture grains
        ctx.fillStyle = '#242e3d';
        ctx.fillRect(px + 4, py + 6, 3, 2);
        ctx.fillRect(px + 18, py + 14, 2, 3);
        ctx.fillRect(px + 26, py + 22, 3, 2);
        ctx.fillRect(px + 10, py + 26, 2, 2);

        // Road Curbs with Hazard Warning Chevrons
        if (y === 10) {
          ctx.fillStyle = '#475569';
          ctx.fillRect(px, py, 32, 4); // Curb stone
          ctx.fillStyle = (x % 2 === 0) ? '#f59e0b' : '#0f172a'; // Hazard stripes
          ctx.fillRect(px + 2, py + 1, 12, 2);
          ctx.fillRect(px + 18, py + 1, 12, 2);
        } else if (y === 11) {
          ctx.fillStyle = '#475569';
          ctx.fillRect(px, py + 28, 32, 4); // Bottom curb
          ctx.fillStyle = (x % 2 === 1) ? '#f59e0b' : '#0f172a';
          ctx.fillRect(px + 2, py + 29, 12, 2);
          ctx.fillRect(px + 18, py + 29, 12, 2);
        }

        // Dashed White Road Dividers (Center of boulevard)
        if (y === 10) {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(px + 8, py + 29, 16, 3); // Divider dash
        }

        // Crosswalk Zebra Stripes at intersection
        if (isCrossroad && isBoulevard) {
          ctx.fillStyle = '#f1f5f9';
          for (let z = 0; z < 4; z++) {
            ctx.fillRect(px + 2 + z * 8, py + 4, 4, 24);
          }
        }

        // Manhole Iron Cover
        if ((x === 7 && y === 10) || (x === 24 && y === 10)) {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(px + 16, py + 16, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#64748b';
          ctx.beginPath();
          ctx.arc(px + 16, py + 16, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#334155';
          ctx.fillRect(px + 12, py + 15, 8, 2);
        }

        // Reflective Water Puddles reflecting purple rift light
        if ((x === 12 && y === 11) || (x === 20 && y === 11)) {
          ctx.fillStyle = 'rgba(192, 132, 252, 0.45)';
          ctx.beginPath();
          ctx.ellipse(px + 16, py + 16, 12, 7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else {
        // Sidewalk / Plaza Cobblestones with bevelled stone bricks
        ctx.fillStyle = '#283142';
        ctx.fillRect(px, py, 32, 32);

        // Stone Brick Paver Grid
        ctx.fillStyle = '#3e4c63';
        ctx.fillRect(px, py, 32, 1);
        ctx.fillRect(px, py, 1, 32);

        // Brick Shading Highlight & Shadow
        ctx.fillStyle = '#4a5b75';
        ctx.fillRect(px + 2, py + 2, 28, 2);
        ctx.fillStyle = '#1c2430';
        ctx.fillRect(px + 2, py + 30, 28, 2);

        // Occasional Rubble Stones
        if ((x * 3 + y * 7) % 11 === 0) {
          ctx.fillStyle = '#64748b';
          ctx.fillRect(px + 10, py + 12, 6, 5);
          ctx.fillStyle = '#94a3b8';
          ctx.fillRect(px + 11, py + 13, 2, 2);
        }
      }
    } else if (mapId === 'sanctuary') {
      // Ancient Temple Flagstones with Blue Mana Conduits
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(px, py, 32, 32);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, 32, 32);

      // Gold Inlay Corner Borders
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(px, py, 3, 3);
      ctx.fillRect(px + 29, py, 3, 3);
      ctx.fillRect(px, py + 29, 3, 3);
      ctx.fillRect(px + 29, py + 29, 3, 3);

      // Glowing Mana Conduit Line through center path
      if (y === 10) {
        const pulse = 0.5 + Math.sin(timeSec * 3 + x * 0.4) * 0.3;
        ctx.fillStyle = `rgba(0, 217, 255, ${pulse})`;
        ctx.fillRect(px, py + 15, 32, 2);
      }
    } else {
      // Default / Other Maps
      ctx.fillStyle = MAPS[mapId].colorFloor;
      ctx.fillRect(px, py, 32, 32);
      ctx.strokeStyle = MAPS[mapId].colorGrid;
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, 32, 32);
    }
  },

  // DRAW RUINED & BURNING MULTI-STORY BUILDINGS
  drawRuinedBurningBuilding(ctx, b, timeSec) {
    const sx = b.x * 32;
    const sy = b.y * 32;
    const sw = b.w * 32;
    const sh = b.h * 32;
    const cOutline = '#100c14';

    // 1. Dynamic Radial Fire Heat Glow on the ground around the building
    const fireCenterX = sx + sw / 2;
    const fireCenterY = sy + sh / 2;
    const heatGrad = ctx.createRadialGradient(fireCenterX, fireCenterY, 20, fireCenterX, fireCenterY, sw * 0.9);
    const flicker = 0.35 + Math.sin(timeSec * 10 + b.x) * 0.15;
    heatGrad.addColorStop(0, `rgba(249, 115, 22, ${flicker})`);
    heatGrad.addColorStop(0.5, `rgba(239, 68, 68, ${flicker * 0.5})`);
    heatGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = heatGrad;
    ctx.beginPath();
    ctx.arc(fireCenterX, fireCenterY, sw * 0.9, 0, Math.PI * 2);
    ctx.fill();

    // 2. Building Body & Collapsed Structural Walls
    ctx.fillStyle = cOutline;
    ctx.fillRect(sx - 2, sy - 2, sw + 4, sh + 4);

    // Charred Blackened Concrete & Brick
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(sx, sy, sw, sh);

    // Brick Patterns on Walls
    ctx.fillStyle = '#334155';
    for (let row = 0; row < 5; row++) {
      ctx.fillRect(sx, sy + row * 22, sw, 2);
    }

    // Jagged Collapsed Upper Parapet (Broken stepped roof)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + sw * 0.3, sy + 18);
    ctx.lineTo(sx + sw * 0.5, sy + 6);
    ctx.lineTo(sx + sw * 0.8, sy + 24);
    ctx.lineTo(sx + sw, sy + 4);
    ctx.lineTo(sx + sw, sy + sh);
    ctx.lineTo(sx, sy + sh);
    ctx.closePath();
    ctx.fill();

    // Exposed Twisted Steel Rebar Wires sticking out of broken concrete
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx + sw * 0.3, sy + 18);
    ctx.lineTo(sx + sw * 0.3 - 4, sy + 8);
    ctx.moveTo(sx + sw * 0.8, sy + 24);
    ctx.lineTo(sx + sw * 0.8 + 6, sy + 12);
    ctx.stroke();

    // Shattered Window Openings with Burning Fire inside!
    const winW = 18;
    const winH = 22;
    for (let wIdx = 0; wIdx < Math.floor(sw / 34); wIdx++) {
      const wx = sx + 14 + wIdx * 34;
      const wy = sy + 32;

      // Window Frame & Broken Glass
      ctx.fillStyle = cOutline;
      ctx.fillRect(wx - 1, wy - 1, winW + 2, winH + 2);
      ctx.fillStyle = '#450a0a'; // Dark fiery interior
      ctx.fillRect(wx, wy, winW, winH);

      // Flickering Fire inside the Window!
      const winFlameH = 8 + Math.sin(timeSec * 12 + wIdx * 2) * 5;
      ctx.fillStyle = '#f97316';
      ctx.fillRect(wx + 2, wy + winH - winFlameH, winW - 4, winFlameH);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(wx + 5, wy + winH - winFlameH + 3, winW - 10, winFlameH - 3);

      // Broken Glass Shard Outline
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(wx, wy, 4, 3);
    }

    // 3. ROARING REAL-TIME ACTIVE ROOF FLAMES!
    const flameCount = Math.floor(sw / 14);
    for (let f = 0; f < flameCount; f++) {
      const fx = sx + 8 + f * 14;
      const fy = sy + 10;
      const flameH = (14 + Math.sin(timeSec * 14 + f * 1.8) * 8) * b.fireIntensity;

      // Outer Crimson Flame Tongue
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(fx - 6, fy);
      ctx.lineTo(fx, fy - flameH);
      ctx.lineTo(fx + 6, fy);
      ctx.closePath();
      ctx.fill();

      // Mid Vibrant Orange Flame
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(fx - 4, fy);
      ctx.lineTo(fx, fy - flameH * 0.75);
      ctx.lineTo(fx + 4, fy);
      ctx.closePath();
      ctx.fill();

      // Core Yellow-White Flame
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.moveTo(fx - 2, fy);
      ctx.lineTo(fx, fy - flameH * 0.45);
      ctx.lineTo(fx + 2, fy);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Rising Dark Smoke Clouds & Drifting Ember Sparks
    for (let sm = 0; sm < 3; sm++) {
      const smPhase = (timeSec * 2 + sm * 1.2) % 3;
      const smY = sy - (smPhase * 18);
      const smX = sx + 20 + sm * 25 + Math.sin(timeSec * 3 + sm) * 6;
      const smSize = 8 + smPhase * 5;
      const smAlpha = Math.max(0, 0.4 - smPhase * 0.12);

      ctx.fillStyle = `rgba(30, 41, 59, ${smAlpha})`;
      ctx.beginPath();
      ctx.arc(smX, smY, smSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Fallen Rubble Pile at Base
    ctx.fillStyle = '#334155';
    ctx.fillRect(sx - 4, sy + sh - 8, sw + 8, 10);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(sx + 10, sy + sh - 12, 12, 6);
    ctx.fillRect(sx + sw - 24, sy + sh - 14, 14, 8);
  },

  // DRAW BASE SHOP BUILDING (In Sanctuary)
  drawShopOutpost(ctx, sb) {
    const sx = sb.x * 32;
    const sy = sb.y * 32;
    const sw = sb.w * 32;
    const sh = sb.h * 32;

    // Stone Foundation & Backwall
    ctx.fillStyle = '#100c14'; // Bold dark outline
    ctx.fillRect(sx - 2, sy - 2, sw + 4, sh + 4);
    ctx.fillStyle = '#334155'; // Dark slate bricks
    ctx.fillRect(sx, sy, sw, sh);

    // Brick Texture Lines
    ctx.fillStyle = '#1e293b';
    for (let r = 0; r < 4; r++) {
      ctx.fillRect(sx, sy + r * 20, sw, 2);
    }

    // Potion Shelves on Back Wall
    ctx.fillStyle = '#78350f'; // Wood shelf
    ctx.fillRect(sx + 16, sy + 28, sw - 32, 6);
    // Glowing Potions
    const potColors = ['#ef4444', '#0284c7', '#22c55e', '#facc15', '#a855f7'];
    potColors.forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.fillRect(sx + 26 + i * 26, sy + 16, 10, 12);
      ctx.fillStyle = '#fff';
      ctx.fillRect(sx + 28 + i * 26, sy + 18, 3, 4);
    });

    // Striped Awning Canopy Roof
    const awningH = 34;
    ctx.fillStyle = '#100c14';
    ctx.fillRect(sx - 6, sy - 14, sw + 12, awningH + 4);
    for (let st = 0; st < 8; st++) {
      ctx.fillStyle = st % 2 === 0 ? '#b91c1c' : '#fbbf24';
      ctx.fillRect(sx - 4 + st * ((sw + 8) / 8), sy - 12, (sw + 8) / 8, awningH);
    }

    // Shop Counter Desk at Front
    const counterY = sy + sh - 18;
    ctx.fillStyle = '#100c14';
    ctx.fillRect(sx + 8, counterY - 2, sw - 16, 22);
    ctx.fillStyle = '#92400e'; // Polished timber counter
    ctx.fillRect(sx + 10, counterY, sw - 20, 18);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(sx + 10, counterY, sw - 20, 4); // Brass edge

    // Wooden Hanging Sign: "MIRA SHOP"
    ctx.fillStyle = '#100c14';
    ctx.fillRect(sx + sw/2 - 40, sy - 28, 80, 18);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(sx + sw/2 - 38, sy - 26, 76, 14);
    ctx.fillStyle = '#100c14';
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MIRA SHOP', sx + sw/2, sy - 16);
    ctx.textAlign = 'left';

    // Hanging Lantern
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(sx + 16, sy + 44, 6, 0, Math.PI * 2);
    ctx.fill();
  },

  // ==========================================
  // 13. EXACT 4-DIRECTIONAL PYROMANCER HERO RENDERER
  // (MAJU, MUNDUR, DAN SAMPING SESUAI REFERENSI USER!)
  // ==========================================
  drawPlayerSprite(ctx, timeSec) {
    const x = Math.round(this.player.x);
    const y = Math.round(this.player.y);
    const s = 1.35;
    const dir = this.player.dir;
    const frame = this.player.walkFrame;

    ctx.save();
    ctx.translate(x, y);
    this.drawPyromancerStyleHero(ctx, this.player.classId, s, dir, frame, timeSec);
    ctx.restore();
  },

  drawPyromancerStyleHero(ctx, classId, s, dir = 'down', frame = 0, timeSec = 0) {
    // Ground Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 14 * s, 11 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    const bob = (this.player && this.player.isMoving && (frame === 1 || frame === 3)) ? 1.5 : 0;
    const strideL = (this.player && this.player.isMoving && frame === 1) ? 3 : (this.player && this.player.isMoving && frame === 3 ? -3 : 0);
    const strideR = -strideL;

    // Palette Ramps
    const skinObj = COSMETICS_DB.skins.find(sk => sk.id === this.player.equippedSkin);
    let cOutline = '#100c14';
    let cRobeShadow = '#6b0f1a';
    let cRobeMid = '#991b1b';
    let cRobeLight = '#dc2626';
    let cSpellCore = '#fbbf24';
    let cSpellGlow = '#ef4444';
    let cEmber = '#f97316';

    if (classId === 'cryomancer') {
      cRobeShadow = '#0c4a6e';
      cRobeMid = '#0284c7';
      cRobeLight = '#38bdf8';
      cSpellCore = '#e0f2fe';
      cSpellGlow = '#00e5ff';
      cEmber = '#7dd3fc';
    } else if (classId === 'electromancer') {
      cRobeShadow = '#3b0764';
      cRobeMid = '#6b21a8';
      cRobeLight = '#a855f7';
      cSpellCore = '#fde047';
      cSpellGlow = '#d946ef';
      cEmber = '#facc15';
    }

    if (skinObj && skinObj.id !== 's_default') {
      cRobeMid = skinObj.colorRobe;
      cRobeLight = skinObj.colorTrim;
    }

    // ==========================================
    // DIRECTION 1: MAJU / FORWARD (dir === 'down')
    // ==========================================
    if (dir === 'down') {
      // 1. Chunky Leather Boots (Stepping forward)
      ctx.fillStyle = cOutline;
      ctx.fillRect(-6 * s, 8 * s + strideL, 5 * s, 6 * s);
      ctx.fillRect(1 * s, 8 * s + strideR, 5 * s, 6 * s);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-5 * s, 9 * s + strideL, 3 * s, 4 * s);
      ctx.fillRect(2 * s, 9 * s + strideR, 3 * s, 4 * s);

      // 2. Flowing Tunic / Robe Body
      ctx.fillStyle = cOutline;
      ctx.fillRect(-8 * s, -6 * s + bob, 16 * s, 17 * s);
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-7 * s, -5 * s + bob, 14 * s, 15 * s);
      ctx.fillStyle = cRobeMid;
      ctx.fillRect(-6 * s, -5 * s + bob, 12 * s, 14 * s);

      // Center fold highlight
      ctx.fillStyle = cRobeLight;
      ctx.fillRect(-1 * s, -4 * s + bob, 3 * s, 13 * s);

      // Waist Belt with Gold Buckle
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, 1 * s + bob, 14 * s, 4 * s);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-6 * s, 2 * s + bob, 12 * s, 2 * s);
      ctx.fillStyle = '#fbbf24'; // Center buckle
      ctx.fillRect(-1 * s, 1 * s + bob, 3 * s, 3 * s);

      // 3. Segmented Steel Plate Pauldron (Left shoulder, viewer's left)
      // Plate 1: Shoulder Cap
      ctx.fillStyle = cOutline;
      ctx.fillRect(-12 * s, -7 * s + bob, 6 * s, 5 * s);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-11 * s, -6 * s + bob, 4 * s, 3 * s);
      ctx.fillStyle = '#ffffff'; // White specular shine
      ctx.fillRect(-10 * s, -6 * s + bob, 2 * s, 1 * s);

      // Plate 2: Bicep Plate
      ctx.fillStyle = cOutline;
      ctx.fillRect(-12 * s, -2 * s + bob, 5 * s, 5 * s);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-11 * s, -1 * s + bob, 3 * s, 3 * s);

      // Plate 3: Forearm Gauntlet
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11 * s, 3 * s + bob, 5 * s, 5 * s);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-10 * s, 4 * s + bob, 3 * s, 3 * s);

      // 4. Centered Peaked Cowl Hood with Dark Void Face Shadow
      ctx.fillStyle = cOutline;
      ctx.fillRect(-8 * s, -17 * s + bob, 16 * s, 13 * s);
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-7 * s, -16 * s + bob, 14 * s, 11 * s);
      ctx.fillStyle = cRobeMid;
      ctx.fillRect(-6 * s, -16 * s + bob, 12 * s, 10 * s);
      ctx.fillStyle = cRobeLight;
      ctx.fillRect(-3 * s, -16 * s + bob, 6 * s, 3 * s); // Hood peak

      // THE ICONIC HOOD VOID: Pure Pitch-Black Mystery Face!
      ctx.fillStyle = '#09090b';
      ctx.fillRect(-4 * s, -14 * s + bob, 8 * s, 8 * s);
      ctx.fillRect(-3 * s, -15 * s + bob, 6 * s, 10 * s);

      // Headgear Cosmetic (if equipped)
      if (this.player && this.player.equippedHead === 'h_visor') {
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(-3 * s, -12 * s + bob, 6 * s, 2 * s);
      } else if (this.player && this.player.equippedHead === 'h_crown') {
        ctx.fillStyle = '#facc15';
        ctx.fillRect(-5 * s, -19 * s + bob, 10 * s, 3 * s);
      } else if (this.player && this.player.equippedHead === 'h_mask') {
        ctx.fillStyle = '#334155';
        ctx.fillRect(-3 * s, -10 * s + bob, 6 * s, 4 * s);
      }

      // 5. Outstretched Right Hand holding Floating Fire with Rising Embers!
      const handX = 7 * s;
      const handY = 0 * s + bob;
      ctx.fillStyle = cOutline;
      ctx.fillRect(handX - 1 * s, handY - 1 * s, 5 * s, 4 * s);
      ctx.fillStyle = '#fed7aa'; // Palm
      ctx.fillRect(handX, handY, 3 * s, 2 * s);

      // Floating Flame Core
      ctx.fillStyle = cOutline;
      ctx.fillRect(handX + 1 * s, handY - 9 * s, 8 * s, 9 * s);
      ctx.fillStyle = cSpellGlow;
      ctx.fillRect(handX + 2 * s, handY - 8 * s, 6 * s, 7 * s);
      ctx.fillStyle = cSpellCore;
      ctx.fillRect(handX + 3 * s, handY - 6 * s, 4 * s, 4 * s);

      // Floating Rising Embers
      const t = timeSec * 6;
      for (let e = 0; e < 4; e++) {
        const emPhase = (t + e * 1.5) % 3;
        const emY = handY - 8 * s - (emPhase * 6 * s);
        const emX = handX + 2 * s + Math.sin(t + e) * 4 * s;
        ctx.fillStyle = e % 2 === 0 ? cSpellGlow : cEmber;
        ctx.fillRect(emX, emY, 2 * s, 2 * s);
      }
    }
    // ==========================================
    // DIRECTION 2: MUNDUR / BACKWARD (dir === 'up')
    // ==========================================
    else if (dir === 'up') {
      // 1. Chunky Leather Boots (View from behind)
      ctx.fillStyle = cOutline;
      ctx.fillRect(-6 * s, 8 * s + strideR, 5 * s, 6 * s);
      ctx.fillRect(1 * s, 8 * s + strideL, 5 * s, 6 * s);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-5 * s, 9 * s + strideR, 3 * s, 4 * s);
      ctx.fillRect(2 * s, 9 * s + strideL, 3 * s, 4 * s);

      // 2. Flowing Crimson Cape / Cloak viewed from behind
      ctx.fillStyle = cOutline;
      ctx.fillRect(-8 * s, -6 * s + bob, 16 * s, 17 * s);
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-7 * s, -5 * s + bob, 14 * s, 15 * s);
      ctx.fillStyle = cRobeMid;
      ctx.fillRect(-6 * s, -5 * s + bob, 12 * s, 14 * s);

      // Deep cloak fold pleats
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-4 * s, -4 * s + bob, 2 * s, 14 * s);
      ctx.fillRect(2 * s, -4 * s + bob, 2 * s, 14 * s);

      // Waist Belt (Rear view with utility equipment pouch)
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, 1 * s + bob, 14 * s, 4 * s);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-6 * s, 2 * s + bob, 12 * s, 2 * s);
      ctx.fillStyle = '#451a03'; // Utility pouch
      ctx.fillRect(1 * s, 0 * s + bob, 4 * s, 5 * s);

      // 3. Steel Pauldron Plate curving over left shoulder from behind
      ctx.fillStyle = cOutline;
      ctx.fillRect(-12 * s, -7 * s + bob, 6 * s, 5 * s);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-11 * s, -6 * s + bob, 4 * s, 3 * s);

      // 4. Rear of Peaked Cowl Hood with central seam
      ctx.fillStyle = cOutline;
      ctx.fillRect(-8 * s, -17 * s + bob, 16 * s, 13 * s);
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-7 * s, -16 * s + bob, 14 * s, 11 * s);
      ctx.fillStyle = cRobeMid;
      ctx.fillRect(-6 * s, -16 * s + bob, 12 * s, 10 * s);
      ctx.fillStyle = cRobeLight;
      ctx.fillRect(-1 * s, -16 * s + bob, 2 * s, 10 * s); // Central hood seam

      // 5. Fire Spell Glow & Embers peeking out from the right side!
      const handX = 7 * s;
      const handY = 0 * s + bob;
      ctx.fillStyle = cSpellGlow;
      ctx.fillRect(handX + 1 * s, handY - 6 * s, 5 * s, 6 * s);
      ctx.fillStyle = cSpellCore;
      ctx.fillRect(handX + 2 * s, handY - 4 * s, 3 * s, 3 * s);

      const t = timeSec * 6;
      for (let e = 0; e < 3; e++) {
        const emPhase = (t + e * 1.5) % 3;
        const emY = handY - 6 * s - (emPhase * 6 * s);
        const emX = handX + 2 * s + Math.sin(t + e) * 3 * s;
        ctx.fillStyle = e % 2 === 0 ? cSpellGlow : cEmber;
        ctx.fillRect(emX, emY, 2 * s, 2 * s);
      }
    }
    // ==========================================
    // DIRECTION 3 & 4: SAMPING / SIDE (dir === 'right' / 'left')
    // ==========================================
    else {
      const flip = (dir === 'left') ? -1 : 1;
      ctx.scale(flip, 1);

      // 1. Chunky Leather Boots
      ctx.fillStyle = cOutline;
      ctx.fillRect(-6 * s, 8 * s + strideL, 5 * s, 6 * s);
      ctx.fillRect(1 * s, 8 * s + strideR, 5 * s, 6 * s);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-5 * s, 9 * s + strideL, 3 * s, 4 * s);
      ctx.fillRect(2 * s, 9 * s + strideR, 3 * s, 4 * s);

      // 2. Flowing Belted Robe Body
      ctx.fillStyle = cOutline;
      ctx.fillRect(-8 * s, -6 * s + bob, 16 * s, 17 * s);
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-7 * s, -5 * s + bob, 14 * s, 15 * s);
      ctx.fillStyle = cRobeMid;
      ctx.fillRect(-6 * s, -5 * s + bob, 11 * s, 14 * s);
      ctx.fillStyle = cRobeLight;
      ctx.fillRect(-4 * s, -4 * s + bob, 5 * s, 13 * s);

      // Waist Belt
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, 1 * s + bob, 14 * s, 4 * s);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-6 * s, 2 * s + bob, 12 * s, 2 * s);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-1 * s, 1 * s + bob, 3 * s, 3 * s);

      // 3. Segmented Steel Plate Pauldron Arm (On left shoulder)
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11 * s, -7 * s + bob, 6 * s, 5 * s);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-10 * s, -6 * s + bob, 4 * s, 3 * s);
      ctx.fillStyle = '#ffffff'; // Specular shine
      ctx.fillRect(-9 * s, -6 * s + bob, 2 * s, 1 * s);

      ctx.fillStyle = cOutline;
      ctx.fillRect(-11 * s, -2 * s + bob, 5 * s, 5 * s);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-10 * s, -1 * s + bob, 3 * s, 3 * s);

      ctx.fillStyle = cOutline;
      ctx.fillRect(-10 * s, 3 * s + bob, 5 * s, 5 * s);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-9 * s, 4 * s + bob, 3 * s, 3 * s);

      // 4. Mysterious Hooded Cowl with Pitch-Black Shadow Void Face
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -17 * s + bob, 15 * s, 13 * s);
      ctx.fillStyle = cRobeShadow;
      ctx.fillRect(-6 * s, -16 * s + bob, 13 * s, 11 * s);
      ctx.fillStyle = cRobeMid;
      ctx.fillRect(-5 * s, -16 * s + bob, 10 * s, 10 * s);
      ctx.fillStyle = cRobeLight;
      ctx.fillRect(-4 * s, -16 * s + bob, 6 * s, 3 * s);

      // Pitch-black cowl void
      ctx.fillStyle = '#09090b';
      ctx.fillRect(-2 * s, -14 * s + bob, 8 * s, 8 * s);
      ctx.fillRect(-1 * s, -15 * s + bob, 6 * s, 10 * s);

      // Headgear Cosmetic
      if (this.player && this.player.equippedHead === 'h_visor') {
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(-1 * s, -12 * s + bob, 6 * s, 2 * s);
      } else if (this.player && this.player.equippedHead === 'h_crown') {
        ctx.fillStyle = '#facc15';
        ctx.fillRect(-4 * s, -19 * s + bob, 9 * s, 3 * s);
      } else if (this.player && this.player.equippedHead === 'h_mask') {
        ctx.fillStyle = '#334155';
        ctx.fillRect(-1 * s, -10 * s + bob, 6 * s, 4 * s);
      }

      // 5. Outstretched Casting Hand & Levitating Flame
      const handX = 7 * s;
      const handY = 0 * s + bob;
      ctx.fillStyle = cOutline;
      ctx.fillRect(handX - 1 * s, handY - 1 * s, 5 * s, 4 * s);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(handX, handY, 3 * s, 2 * s);

      ctx.fillStyle = cOutline;
      ctx.fillRect(handX + 1 * s, handY - 9 * s, 8 * s, 9 * s);
      ctx.fillStyle = cSpellGlow;
      ctx.fillRect(handX + 2 * s, handY - 8 * s, 6 * s, 7 * s);
      ctx.fillStyle = cSpellCore;
      ctx.fillRect(handX + 3 * s, handY - 6 * s, 4 * s, 4 * s);

      const t = timeSec * 6;
      for (let e = 0; e < 4; e++) {
        const emPhase = (t + e * 1.5) % 3;
        const emY = handY - 8 * s - (emPhase * 6 * s);
        const emX = handX + 2 * s + Math.sin(t + e) * 4 * s;
        ctx.fillStyle = e % 2 === 0 ? cSpellGlow : cEmber;
        ctx.fillRect(emX, emY, 2 * s, 2 * s);
      }
    }
  },

  // DETAILED NPC SPRITES (Exact Pixel Art Style)
  drawNpcSprite(ctx, npc, timeSec) {
    const x = npc.x * 32;
    const y = npc.y * 32;

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y + 14, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(x, y);

    const s = 1.35;
    const cOutline = '#100c14';

    if (npc.id === 'balthazar') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#09090b';
      ctx.fillRect(-4 * s, -12 * s, 8 * s, 6 * s);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(-5 * s, -7 * s, 10 * s, 12 * s);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(-2 * s, -11 * s, 4 * s, 2 * s);
      ctx.fillStyle = cOutline;
      ctx.fillRect(7 * s, -6 * s, 8 * s, 10 * s);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(8 * s, -5 * s, 6 * s, 8 * s);
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(9 * s, -3 * s, 4 * s, 4 * s);
    } else if (npc.id === 'thorne') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#09090b';
      ctx.fillRect(-4 * s, -12 * s, 8 * s, 6 * s);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(1 * s, -11 * s, 3 * s, 3 * s);
      ctx.fillStyle = cOutline;
      ctx.fillRect(7 * s, -4 * s, 5 * s, 9 * s);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(8 * s, -3 * s, 3 * s, 7 * s);
    } else if (npc.id === 'mira') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(-4 * s, -12 * s, 8 * s, 6 * s);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(6 * s, -6 * s, 5 * s, 12 * s);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(8 * s, -12 * s, 3 * s, 10 * s);
    } else if (npc.id === 'lyra') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#ffedd5';
      ctx.fillRect(-4 * s, -12 * s, 8 * s, 6 * s);
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11 * s, -4 * s, 6 * s, 10 * s);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-10 * s, -3 * s, 4 * s, 8 * s);
    } else if (npc.id === 'aki') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(-4 * s, -12 * s, 8 * s, 6 * s);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-8 * s, -20 * s, 2 * s, 10 * s);
      ctx.fillRect(-9 * s, -22 * s, 4 * s, 3 * s);
    } else if (npc.id === 'vern') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#84cc16';
      ctx.fillRect(-7 * s, -18 * s, 14 * s, 8 * s);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(-4 * s, -12 * s, 8 * s, 4 * s);
    } else if (npc.id === 'echo') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(-2 * s, -4 * s, 4 * s, 4 * s);
    } else {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7 * s, -14 * s, 14 * s, 26 * s);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-6 * s, -13 * s, 12 * s, 24 * s);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-12 * s, -22 * s, 6 * s, 12 * s);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-12 * s, -22 * s, 2 * s, 28 * s);
    }

    ctx.restore();
  },

  // DETAILED PIXEL MONSTERS & BOSSES
  drawMonsterSprite(ctx, m, timeSec) {
    const x = m.x * 32;
    const y = m.y * 32;

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y + 14, m.isBoss ? 20 : 12, m.isBoss ? 8 : 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(x, y);

    const cOutline = '#100c14';

    if (m.id === 'titan_colossus') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-18, -28, 36, 38);
      ctx.fillStyle = '#475569';
      ctx.fillRect(-16, -26, 32, 34);
      ctx.fillStyle = '#334155';
      ctx.fillRect(-14, -24, 28, 12);
      ctx.fillStyle = cOutline;
      ctx.fillRect(-7, -13, 14, 14);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(-6, -12, 12, 12);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-3, -9, 6, 6);
      ctx.fillStyle = cOutline;
      ctx.fillRect(16, -18, 9, 26);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(17, -17, 7, 24);
      ctx.fillStyle = cOutline;
      ctx.fillRect(-8, -34, 16, 8);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-7, -33, 14, 6);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-4, -31, 3, 2);
      ctx.fillRect(2, -31, 3, 2);
    } else if (m.id === 'queen_brood') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-22, -26, 44, 8);
      ctx.fillStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.fillRect(-20, -25, 40, 6);
      ctx.fillStyle = cOutline;
      ctx.fillRect(-10, -20, 20, 24);
      ctx.fillStyle = '#065f46';
      ctx.fillRect(-9, -19, 18, 22);
      ctx.fillStyle = cOutline;
      ctx.beginPath();
      ctx.arc(0, 5, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(0, 5, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = cOutline;
      ctx.fillRect(-18, -26, 6, 20);
      ctx.fillRect(12, -26, 6, 20);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(-17, -25, 4, 18);
      ctx.fillRect(13, -25, 4, 18);
    } else if (m.id === 'apex_executioner') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-16, -28, 32, 36);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-15, -27, 30, 34);
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(0, -12, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = cOutline;
      ctx.fillRect(-24, -34, 8, 40);
      ctx.fillRect(16, -34, 8, 40);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-23, -33, 6, 38);
      ctx.fillRect(17, -33, 6, 38);
    } else if (m.id === 'ferroslime') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-13, -2, 5, 14);
      ctx.fillRect(8, -2, 5, 14);
      ctx.fillRect(-15, 6, 5, 10);
      ctx.fillRect(10, 6, 5, 10);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-12, -1, 3, 12);
      ctx.fillRect(9, -1, 3, 12);
      ctx.fillStyle = cOutline;
      ctx.beginPath();
      ctx.moveTo(-11, 7);
      ctx.lineTo(-13, -5);
      ctx.lineTo(-7, -13);
      ctx.lineTo(7, -13);
      ctx.lineTo(13, -5);
      ctx.lineTo(11, 7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#15803d';
      ctx.fillRect(-9, -11, 18, 16);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(-7, -9, 14, 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-4, -6, 8, 6);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-3, -5, 2, 2);
      ctx.fillRect(1, -5, 2, 2);
    } else if (m.id === 'sentinel') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11, -9, 22, 12);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-10, -8, 20, 10);
      ctx.fillStyle = cOutline;
      ctx.fillRect(-19, -13, 11, 3);
      ctx.fillRect(8, -13, 11, 3);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-18, -12, 9, 1);
      ctx.fillRect(9, -12, 9, 1);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-2, -6, 4, 4);
    } else if (m.id === 'chlorella') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-9, -15, 18, 24);
      ctx.fillStyle = '#6b21a8';
      ctx.fillRect(-8, -14, 16, 22);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-5, -12, 2, 3);
      ctx.fillRect(0, -12, 2, 3);
      ctx.fillRect(4, -12, 2, 3);
    } else if (m.id === 'carapace') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11, -11, 22, 20);
      ctx.fillStyle = '#065f46';
      ctx.fillRect(-10, -10, 20, 18);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(-8, -8, 16, 14);
      ctx.fillStyle = '#34d399';
      ctx.fillRect(-14, -16, 4, 10);
      ctx.fillRect(10, -16, 4, 10);
    } else if (m.id === 'vector') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-15, -9, 30, 16);
      ctx.fillStyle = '#334155';
      ctx.fillRect(-14, -8, 28, 14);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(14, -10, 4, 2);
    } else if (m.id === 'executioner') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11, -21, 22, 30);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-10, -20, 20, 28);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-2, -10, 4, 4);
    } else if (m.id === 'malakor') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-11, -23, 22, 32);
      ctx.fillStyle = '#3b0764';
      ctx.fillRect(-10, -22, 20, 30);
      ctx.fillStyle = '#c084fc';
      ctx.fillRect(-14, -28, 4, 8);
      ctx.fillRect(10, -28, 4, 8);
    } else {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-17, -17, 34, 26);
      ctx.fillStyle = '#831843';
      ctx.fillRect(-16, -16, 32, 24);
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, -6, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  renderRadar() {
    const ctx = this.radarCtx;
    const w = this.radarCanvas.width;
    const h = this.radarCanvas.height;
    const map = MAPS[this.currentMapId];

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const scaleX = w / (map.width * 32);
    const scaleY = h / (map.height * 32);

    ctx.fillStyle = '#d946ef';
    map.portals.forEach(p => ctx.fillRect(p.x * 32 * scaleX - 2, p.y * 32 * scaleY - 2, 4, 4));

    ctx.fillStyle = '#facc15';
    map.npcs.forEach(npc => ctx.fillRect(npc.x * 32 * scaleX - 2, npc.y * 32 * scaleY - 2, 4, 4));

    map.monsters.forEach(m => {
      ctx.fillStyle = m.isBoss ? '#facc15' : '#ef4444';
      const sz = m.isBoss ? 6 : 4;
      ctx.fillRect(m.x * 32 * scaleX - sz/2, m.y * 32 * scaleY - sz/2, sz, sz);
    });

    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(this.player.x * scaleX, this.player.y * scaleY, 3, 0, Math.PI * 2);
    ctx.fill();
  },

  // ==========================================
  // 14. COMBAT ARENA VISUALS & DETAILED POSES
  // ==========================================
  renderBattleStage(timeSec) {
    const c = document.getElementById('battleStageCanvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width;
    const h = c.height;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let y = 140; y < h; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Hero at (220, 180) in Pyromancer reference style
    ctx.save();
    ctx.translate(220, 180);
    this.drawPyromancerStyleHero(ctx, this.player.classId, 2.8, 'right', 0, timeSec);
    ctx.restore();

    // Monster at (620, 170)
    ctx.save();
    ctx.translate(620, 170);
    if (this.battle.monster) {
      this.drawMonsterCombatPose(ctx, this.battle.monster.id);
    }
    ctx.restore();

    this.renderCombatSkillAnimations(ctx, w, h);
    ctx.restore();
  },

  renderCombatSkillAnimations(ctx, w, h) {
    const hx = 220;
    const hy = 180;
    const mx = 620;
    const my = 170;

    this.combatVFX.forEach(vfx => {
      const p = vfx.time / vfx.duration;

      if (vfx.id === 'slash') {
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 4;
        ctx.beginPath();
        const ax = mx - 30 + p * 60;
        ctx.arc(ax, my - 10, 35, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
      } else if (vfx.id === 'p1') {
        const curX = hx + (mx - hx) * p;
        const curY = hy + (my - hy) * p - Math.sin(p * Math.PI) * 40;
        ctx.fillStyle = '#ff4726';
        ctx.beginPath();
        ctx.arc(curX, curY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(curX, curY, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (vfx.id === 'p2') {
        const waveX = hx + (w - hx) * p;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.fillRect(waveX - 30, 40, 50, h - 60);
      } else if (vfx.id === 'p3') {
        for (let i = -1; i <= 1; i++) {
          const px = hx + i * 30;
          ctx.fillStyle = 'rgba(251, 146, 60, 0.6)';
          ctx.fillRect(px - 10, hy - 80 * (1 - p), 20, 80 * (1 - p));
        }
      } else if (vfx.id === 'p4') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.fillRect(mx - 25, 0, 50, my + 30);
      } else if (vfx.id === 'p5') {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.sin(p * Math.PI) * 0.8})`;
        ctx.fillRect(0, 0, w, h);
        const blastR = Math.max(10, (p - 0.3) * 500);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.arc(mx, my, blastR, 0, Math.PI * 2);
        ctx.stroke();
      } else if (vfx.id === 'c1') {
        for (let i = 0; i < 3; i++) {
          const subP = Math.min(1, Math.max(0, p * 1.5 - i * 0.2));
          const nx = hx + (mx - hx) * subP;
          const ny = hy + (my - hy) * subP + (i - 1) * 15;
          ctx.fillStyle = '#7dd3fc';
          ctx.beginPath();
          ctx.arc(nx, ny, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (vfx.id === 'c2') {
        const angle = p * Math.PI * 4;
        for (let i = 0; i < 6; i++) {
          const a = angle + (i * Math.PI / 3);
          ctx.fillStyle = 'rgba(0, 217, 255, 0.7)';
          ctx.fillRect(hx + Math.cos(a) * 45 - 8, hy + Math.sin(a) * 45 - 8, 16, 16);
        }
      } else if (vfx.id === 'c3') {
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(hx, hy + 20);
        ctx.lineTo(hx + (mx - hx) * p, hy + 20);
        ctx.stroke();
      } else if (vfx.id === 'c4') {
        for (let i = 0; i < 18; i++) {
          const sx = mx + Math.cos(p * 10 + i) * (i * 3.5);
          const sy = my + Math.sin(p * 10 + i) * (i * 3.5);
          ctx.fillStyle = '#e0f2fe';
          ctx.fillRect(sx, sy, 4, 4);
        }
      } else if (vfx.id === 'c5') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.fillRect(mx - 40, my - 60, 80, 100);
      } else if (vfx.id === 'e1') {
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(mx, 0);
        ctx.lineTo(mx - 15, my * 0.5);
        ctx.lineTo(mx, my);
        ctx.stroke();
      } else if (vfx.id === 'e2') {
        ctx.strokeStyle = '#d946ef';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        for (let i = 1; i <= 5; i++) {
          ctx.lineTo(hx + (mx - hx) * (i / 5), hy + (my - hy) * (i / 5) + (Math.random() - 0.5) * 35);
        }
        ctx.stroke();
      } else if (vfx.id === 'e3') {
        const scAngle = p * Math.PI * 6;
        for (let i = 0; i < 4; i++) {
          const a = scAngle + (i * Math.PI / 2);
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(hx + Math.cos(a) * 35, hy + Math.sin(a) * 35, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (vfx.id === 'e4') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(hx, my - 6, mx - hx, 12);
        ctx.fillStyle = '#e879f9';
        ctx.fillRect(hx, my - 12, mx - hx, 24);
      } else if (vfx.id === 'e5') {
        const bx = 450 + (Math.floor(p * 7) * 35);
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(bx, 0);
        ctx.lineTo(bx - 15, 100);
        ctx.lineTo(bx, my + 10);
        ctx.stroke();
      }
    });
  },

  drawMonsterCombatPose(ctx, id) {
    const s = 2.4;
    const isBoss = this.battle.monster && this.battle.monster.isBoss;
    const bScale = isBoss ? s * 1.35 : s;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 20, isBoss ? 45 : 32, isBoss ? 14 : 10, 0, 0, Math.PI * 2);
    ctx.fill();

    const cOutline = '#100c14';

    if (id === 'titan_colossus') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-19 * bScale, -29 * bScale, 38 * bScale, 42 * bScale);
      ctx.fillStyle = '#334155';
      ctx.fillRect(-18 * bScale, -28 * bScale, 36 * bScale, 40 * bScale);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(-6 * bScale, -14 * bScale, 12 * bScale, 12 * bScale);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(16 * bScale, -24 * bScale, 12 * bScale, 36 * bScale);
    } else if (id === 'queen_brood') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-19 * bScale, -27 * bScale, 38 * bScale, 40 * bScale);
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(-18 * bScale, -26 * bScale, 36 * bScale, 38 * bScale);
      ctx.fillStyle = '#34d399';
      ctx.fillRect(-12 * bScale, -34 * bScale, 24 * bScale, 12 * bScale);
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(-6 * bScale, -10 * bScale, 12 * bScale, 12 * bScale);
    } else if (id === 'apex_executioner') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-21 * bScale, -33 * bScale, 42 * bScale, 48 * bScale);
      ctx.fillStyle = '#020617';
      ctx.fillRect(-20 * bScale, -32 * bScale, 40 * bScale, 46 * bScale);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-6 * bScale, -20 * bScale, 12 * bScale, 12 * bScale);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(18 * bScale, -36 * bScale, 10 * bScale, 52 * bScale);
      ctx.fillRect(-28 * bScale, -36 * bScale, 10 * bScale, 52 * bScale);
    } else if (id === 'ferroslime') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-19 * s, 0, 38 * s, 18 * s);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-18 * s, 2 * s, 6 * s, 14 * s);
      ctx.fillRect(12 * s, 2 * s, 6 * s, 14 * s);
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(0, -6 * s, 16 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(0, -6 * s, 12 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-6 * s, -10 * s, 12 * s, 8 * s);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-4 * s, -8 * s, 3 * s, 3 * s);
      ctx.fillRect(1 * s, -8 * s, 3 * s, 3 * s);
    } else if (id === 'sentinel') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-15 * s, -13 * s, 30 * s, 18 * s);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-14 * s, -12 * s, 28 * s, 16 * s);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-24 * s, -16 * s, 12 * s, 3 * s);
      ctx.fillRect(12 * s, -16 * s, 12 * s, 3 * s);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-4 * s, -8 * s, 8 * s, 8 * s);
    } else if (id === 'chlorella') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-15 * s, -19 * s, 30 * s, 34 * s);
      ctx.fillStyle = '#7e22ce';
      ctx.fillRect(-14 * s, -18 * s, 28 * s, 32 * s);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-8 * s, -12 * s, 16 * s, 4 * s);
    } else if (id === 'carapace') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-15 * s, -15 * s, 30 * s, 30 * s);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(-14 * s, -14 * s, 28 * s, 28 * s);
      ctx.fillStyle = '#34d399';
      ctx.fillRect(-20 * s, -22 * s, 6 * s, 16 * s);
      ctx.fillRect(14 * s, -22 * s, 6 * s, 16 * s);
    } else if (id === 'vector') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-19 * s, -9 * s, 38 * s, 18 * s);
      ctx.fillStyle = '#475569';
      ctx.fillRect(-18 * s, -8 * s, 36 * s, 16 * s);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(12 * s, -12 * s, 8 * s, 3 * s);
    } else if (id === 'executioner') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-17 * s, -25 * s, 34 * s, 38 * s);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-16 * s, -24 * s, 32 * s, 36 * s);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(16 * s, -28 * s, 10 * s, 42 * s);
    } else if (id === 'malakor') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(-13 * s, -21 * s, 26 * s, 38 * s);
      ctx.fillStyle = '#4c1d95';
      ctx.fillRect(-12 * s, -20 * s, 24 * s, 36 * s);
      ctx.fillStyle = '#c084fc';
      ctx.fillRect(-22 * s, -16 * s, 4 * s, 18 * s);
      ctx.fillRect(18 * s, -16 * s, 4 * s, 18 * s);
    } else {
      ctx.fillStyle = cOutline;
      ctx.beginPath();
      ctx.arc(0, 0, 26 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(0, 0, 24 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, 0, 10 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  // ==========================================
  // 15. ULTRA HD 256x256 PORTRAITS
  // ==========================================
  renderClassAvatars() {
    this.drawHD256Portrait('prev-pyro', 'pyromancer', 96);
    this.drawHD256Portrait('prev-cryo', 'cryomancer', 96);
    this.drawHD256Portrait('prev-electro', 'electromancer', 96);
  },

  drawHeroFace() {
    this.drawHD256Portrait('hero-hud-face', this.player.classId, 40);
  },

  drawHD256Portrait(canvasId, id, renderSize) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, renderSize, renderSize);

    const s = renderSize / 256;
    ctx.save();
    ctx.scale(s, s);

    // Dark Background
    const bgGrad = ctx.createLinearGradient(0, 0, 256, 256);
    bgGrad.addColorStop(0, '#090d18');
    bgGrad.addColorStop(1, '#020408');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 256, 256);

    const cOutline = '#100c14';

    if (id === 'pyromancer' || id === 'cryomancer' || id === 'electromancer') {
      ctx.save();
      ctx.translate(128, 145);
      this.drawPyromancerStyleHero(ctx, id, 4.4, 'down', 0, performance.now() / 1000);
      ctx.restore();
    } else if (id === 'titan_colossus') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(28, 38, 200, 220);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(30, 40, 196, 216);
      ctx.fillStyle = '#475569';
      ctx.fillRect(50, 60, 156, 196);
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(128, 140, 36, 0, Math.PI * 2);
      ctx.fill();
    } else if (id === 'queen_brood') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(28, 38, 200, 220);
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(30, 40, 196, 216);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(50, 60, 156, 196);
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(128, 160, 40, 0, Math.PI * 2);
      ctx.fill();
    } else if (id === 'apex_executioner') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(28, 28, 200, 230);
      ctx.fillStyle = '#020617';
      ctx.fillRect(30, 30, 196, 226);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(80, 80, 96, 40);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(35, 60, 20, 190);
      ctx.fillRect(201, 60, 20, 190);
    } else if (id === 'balthazar') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(38, 48, 180, 210);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(40, 50, 176, 206);
      ctx.fillStyle = '#fcd34d';
      ctx.fillRect(80, 40, 96, 80);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(70, 90, 116, 120);
    } else if (id === 'thorne') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(38, 68, 180, 190);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(40, 70, 176, 186);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(80, 40, 96, 80);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(85, 60, 35, 35);
    } else if (id === 'mira') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(38, 68, 180, 190);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(40, 70, 176, 186);
      ctx.fillStyle = '#fdba74';
      ctx.fillRect(80, 40, 96, 80);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(20, 90, 36, 120);
    } else if (id === 'lyra') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(48, 48, 160, 210);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(50, 50, 156, 206);
      ctx.fillStyle = '#ffedd5';
      ctx.fillRect(80, 60, 96, 80);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(20, 120, 40, 60);
    } else if (id === 'aki') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(38, 68, 180, 190);
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(40, 70, 176, 186);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(80, 40, 96, 80);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(190, 20, 14, 80);
    } else if (id === 'vern') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(38, 68, 180, 190);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(40, 70, 176, 186);
      ctx.fillStyle = '#84cc16';
      ctx.fillRect(60, 20, 136, 80);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(80, 60, 96, 70);
    } else if (id === 'echo') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(48, 38, 160, 220);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(50, 40, 156, 216);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(100, 120, 56, 40);
    } else if (id === 'dananjaya') {
      ctx.fillStyle = cOutline;
      ctx.fillRect(38, 48, 180, 210);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, 50, 176, 206);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(80, 40, 96, 80);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(20, 20, 50, 70);
    } else {
      ctx.fillStyle = cOutline;
      ctx.fillRect(58, 58, 140, 140);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(60, 60, 136, 136);
    }

    ctx.restore();
  }
};

function portalIsLocked(portal, keys) {
  if (!portal || !portal.reqKey) return false;
  return !keys[portal.reqKey];
}

function mapIsLocked(mapId, keys) {
  if (mapId === 'sanctuary' || mapId === 'city') return false;
  if (mapId === 'forest') return !keys.ch2_bio;
  if (mapId === 'cyber') return !keys.ch3_cyber;
  if (mapId === 'void') return !keys.ch4_void;
  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
