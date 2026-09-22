# DOKUMEN DESAIN GAME (GAME DESIGN DOCUMENT - GDD)
## JUDUL PROYEK: *AETHERIA: DIMENSIONAL PARADOX*
**Genre:** Turn-Based Educational Sci-Fi/Fantasy RPG  
**Gaya Visual:** HD Pixel Art (HD-2D Aesthetic), Dynamic Lighting, Modern Particle Systems  
**Platform Target:** PC / Web (HTML5 Canvas & WebGL) / Mobile  
**Target Audiens:** Remaja, Pelajar, dan Penggemar RPG Retro yang menyukai tantangan logika matematika.

---

## 1. ARAHAN SENI & DESAIN VISUAL (HD-2D PIXEL ART)

### 1.1 Estetika Visual & Teknologi Rendering
*   **HD-2D Rendering Hybrid:**
    *   Latar belakang (background) dan layer lingkungan dibangun menggunakan kombinasi sprite pixel beresolusi tinggi (32x32 / 64x64 grid dasar) yang dirender di atas bidang 2.5D dengan kedalaman multi-paralaks (5-7 layer paralaks).
    *   **Pencahayaan Dinamis (Dynamic Lighting):** Sumber cahaya titik (point lights) dan cahaya ambient menggunakan normal map pada sprite pixel, menghasilkan bayangan lembut (soft shadows) pada puing-puing kota dan pendaran neon/magis.
    *   **Partikel Modern:** Efek partikel modern (GPU particle system) untuk percikan api (embers), serpihan es kristal fraktal, pendaran listrik statis (chromatic aberration & bloom), serta distorsi gelombang dimensi (*heat wave & rift distortion*).
    *   **Post-Processing:** Bloom lembut pada elemen neon dan sihir, color grading berbasis LUT untuk setiap chapter (misal: nuansa sephia-amber di Kota Hancur, neon-teal beracun di Hutan Karantina, monokrom-cyan dingin di Pabrik Siber, dan ultra-violet kosmik di Inti Kapal Induk).

### 1.2 Kebijakan Nol Daur Ulang Warna (100% Unique Sprite Assets - No Palette Swap)
Setiap entitas dalam permainan—apakah pahlawan, musuh, bos, maupun warga desa—memiliki kerangka siluet (*silhouette*), lembar animasi (*sprite sheet*), palet warna orisinal, serta animasi *idle, attack, cast, hurt,* dan *death* yang didesain dari nol tanpa teknik *color recoloring/palette swapping*.

---

## 2. PREMIS CERITA & LORE DUNIA LENGKAP

### 2.1 Latar Belakang Dunia: Tragedi "The Fractured Singularity"
Pada tahun 2184, proyek akselerator materi global mengalami kegagalan kalkulasi singularitas matematis, merobek batas dimensi ruang-waktu (*The Rift*). Dari celah dimensi tersebut, entitas penjajah kosmik yang dipimpin oleh dinasti **Sovereign Dimensions** menginvasi bumi. Mereka menyerap energi realitas dengan mendistorsi hukum fisika dan logika matematika planet. Wilayah bumi berubah menjadi zona anomali di mana materi membusuk, mesin memberontak, dan makhluk hidup bermutasi menjadi monster biomekanis.

### 2.2 Sang Protagonis & Kebangkitan Tiga Elemen
Pemain adalah kadet muda dari Divisi Arkitek Logika Aliansi Bumi. Saat fasilitas perlindungan runtuh, pemain menyentuh pecahan *Aetherial Core* (Inti Aether) purba. Kristal ini merespons frekuensi saraf pemain, memungkinkannya mengendalikan salah satu dari 3 manipulasi energi kuantum:
1.  **Pyromancer (Ignis Vektor):** Manipulasi eksitasi termal kuantum, membakar ikatan atom musuh.
2.  **Cryomancer (Glacies Entropi):** Penurunan entropi mutlak, membekukan materi dan menghentikan resonansi dimensi.
3.  **Electromancer (Fulmen Kinetik):** Akselerasi elektron bertegangan tinggi, meretas sistem saraf biologis dan sirkuit mesin.

### 2.3 Perjalanan Membebaskan Bumi (4 Chapter Arsitektur Cerita)
*   **Prologue:** Pelarian dari Bunker Bawah Tanah menuju Menara Komunikasi Tertinggi di Reruntuhan Kota.
*   **Chapter 1 (Reruntuhan Kota Terakhir):** Menghidupkan kembali jaringan komunikasi global sambil membersihkan sisa-sisa drone penjajah dan slime mutan radioaktif.
*   **Chapter 2 (Hutan Karantina Bio-Hazard):** Menembus kanopi hutan laboratorium botani raksasa yang tertular zat pemutarbalik logika genetik untuk mencari bahan penetralisir *Void Toxin*.
*   **Chapter 3 (Pabrik Inti Siber Penjajah):** Menyusup ke dalam benteng perak otomatisasi musuh untuk melumpuhkan reaktor pelindung kapal induk dimensi.
*   **Chapter 4 (Inti Kapal Induk Dimensi - Final):** Menembus portal antariksa dan bertarung di ruang hampa singularitas melawan Komandan Dimensi dan *Sovereign Beast*, memulihkan konstanta matematika semesta.
*   **Epilogue:** Pecahan celah menutup. Bumi mulai dibangun kembali dengan integrasi sains matematika dan energi Aether harmonis.

---

## 3. SISTEM NPC INTERAKTIF & DETAIL VISUAL KARAKTER

Setiap NPC memiliki fungsi mekanik, visual HD Pixel Art khas, serta naskah dialog interaksi dengan percabangan (*branching dialogue*) yang kaya.

```
+-----------------------------------------------------------------------------------+
|                              ARSITEKTUR HUBUNGAN NPC                              |
+-----------------------------------------------------------------------------------+
|  [Mentor/Tetua Aliansi]       --> Pengarah Lore & Penuntun Pemilihan Cabang Elemen|
|  [Ilmuwan/Pengrajin Matematik]--> Peningkat Efisiensi Skill & Side Quests Logika  |
|  [Pedagang Penyintas (Scav)]  --> Barter Potion/Gear & Intel Kelemahan Monster     |
|  [Warga yang Diselamatkan]    --> Pemberi Buff Waktu Nyata, Aksesori, & Side-Lore |
+-----------------------------------------------------------------------------------+
```

---

### 3.1 Profil NPC Global (Camp & Sanctuary)

#### A. Mentor/Tetua Aliansi: **Grand Archivist Balthazar**
*   **Desain Visual Pixel:** Pria tua berjanggut perak panjang bergelombang, mengenakan jubah tenun nano-tekstur berwarna biru malam bergaris sirkuit keemasan. Membawa tongkat komputasi kristal hologram yang melayang berputar (*floating gyroscopic lens*). Animasi idle menampilkan jubahnya berkibar ditiup angin partikel aether.
*   **Fungsi Mekanik:** 
    *   Pengenalan tutorial pertarungan dan pengantar elemen.
    *   Fasilitas *Respec Skill Point* (mereset pohon keahlian dengan biaya *Dimensional Dust*).
    *   Memberikan ringkasan sejarah dunia dan ramalan kelemahan dimensi.

#### B. Ilmuwan & Pengrajin Matematika: **Dr. Aris Thorne**
*   **Desain Visual Pixel:** Pria paruh baya kurus berkacamata monokel ganda yang memancarkan pendaran kalkulasi hijau neon. Mengenakan jas laboratorium kotor penuh kantung alat mekanik presisi dan tablet kalkulator kuantum portabel di pergelangan tangannya.
*   **Fungsi Mekanik:**
    *   *Skill Resonance Tuning:* Meningkatkan efektivitas skill (misal: +15% burn damage, +10% freeze duration) dengan menuntaskan tantangan kuis matriks logika.
    *   Memberikan misi sampingan eksperimen matematika berhadiah *Aether Shard*.

#### C. Pedagang Penyintas (Scavenger): **Mira Si Tangan Besi**
*   **Desain Visual Pixel:** Gadis muda berpostur tegap mengenakan jaket kulit tambalan, masker gas respirasi berfilter ganda yang digantung di leher, serta lengan prostetik mekanik kuningan uap (*steampunk-dieselpunk arm*) yang memegang ransel raksasa penuh botol ramuan berpendar.
*   **Fungsi Mekanik:**
    *   Membeli material drop monster (*Scrap Core, Bio-Resin, Cyber-Chips*).
    *   Menjual *Aether Potion, Mana Injector, Status Cleanser*, serta buku catatan *Monster Dossier* yang membeberkan statistik kelemahan monster.

#### D. Warga yang Diselamatkan: **Gadis Penenun Cahaya - Lyra**
*   **Desain Visual Pixel:** Anak perempuan bertudung kain rajut merah kusam dengan mata besar ekspresif, memegang lentera kaca berisi partikel api yang tidak pernah padam.
*   **Fungsi Mekanik:**
    *   Memberikan buff berdurasi (misal: *Aura Semangat*: Regenerasi 3% HP per giliran selama 3 pertarungan).
    *   Memberikan artefak kenang-kenangan keluarga yang menambah stat keberuntungan (*Drop Rate +20%*).

---

### 3.2 Profil NPC Eksklusif Setiap Chapter & Naskah Dialog Kunci

#### CHAPTER 1: Reruntuhan Kota Terakhir
**1. Aki Wardana (Penjaga Menara Komunikasi)**
*   **Visual:** Kakek tangguh beralas kaki sepatu bot militer tua, rompi utilitas berantena radio berkedip merah di pundaknya, wajah berkerut dengan perban di pelipis.
*   **Peran:** Pemandu navigasi kota dan instruktur pengaktifan frekuensi relay menara.

> **Dialog Kunci: Pertemuan di Pintu Masuk Menara Radio**  
> **Aki Wardana:**  
> *"Berhenti di sana, bocah! Melangkah tiga inci lagi dan kakimu akan meleleh terkena lendir Ferro-Slime. ...Tunggu, lambang di sarung tanganmu itu... Inti Aether? Syukurlah, sinyal darurat Aliansi ternyata tidak berbohong."*  
> **Pemain (Pilihan Percabangan):**  
> *   `[Respon A]` *"Saya datang untuk mengaktifkan pemancar menara, Kek. Apa situasinya?"*  
> *   `[Respon B]` *"Monster di luar hampir menghancurkan seluruh perimeter. Siapa yang masih bertahan di sini?"*  
>  
> *(Jika memilih Respon A):*  
> **Aki Wardana:**  
> *"Menara ini adalah satu-satunya harapan kita untuk menyatukan distrik yang terisolasi. Tapi pemancar frekuensinya diacak oleh Drone Pengintai Penjajah. Rumus algoritmanya kacau balau! Jika kamu bisa menghancurkan monster itu dan memecahkan enkripsi aritmatika intinya, sinyal bumi akan kembali menyala!"*

**2. Timmy (Anak Pengungsi yang Terjebak)**
*   **Visual:** Bocah kecil bertopi kupluk longgar yang menutupi telinganya, memeluk boneka robot beruang compang-camping, bersembunyi di balik reruntuhan lemari besi.
*   **Peran:** Misi penyelamatan awal; memberikan *Kunci Gudang Logistik Bawah Tanah* jika diselamatkan dari kepungan Ferroslime.

> **Dialog Kunci:**  
> **Timmy:** *"Kakak pahlawan...! Mesin lendir besi itu memakan mainan robotku dan mengunci pintu darurat! Katanya hanya orang yang tahu perkalian kode pintu yang bisa membukanya... Tolong Timmy!"*

---

#### CHAPTER 2: Hutan Karantina Bio-Hazard
**Profesor Vern (Ahli Botani Eksentrik)**
*   **Visual:** Wanita setengah baya berambut ikal hijau daun yang diikat acak-acakan, kacamata pelindung kimia berlensa segitiga, mengenakan sarung tangan karet tebal berwarna kuning cerah, selalu membawa penjepit tanaman dan tabung reaksi berisi getah mendidih.
*   **Peran:** Meracik serum penangkal spora beracun hutan; menuntut pemain menghitung rasio campuran obat berbasis pecahan dan persentase.

> **Dialog Kunci: Laboratorium Kubah Kaca Hutan Karantina**  
> **Profesor Vern:**  
> *"Jangan bernapas terlalu dalam, anak muda! Spora Chlorella di udara ini bisa mengubah paru-parumu menjadi pot tanaman dalam lima belas menit! Menakjubkan sekaligus mematikan, bukan? Ha! Tapi tenang, aku punya formulanya. Sayangnya, otak brilianku sedang sibuk mengamati stomata daun kristal ini."*  
> **Pemain (Pilihan Percabangan):**  
> *   `[Respon A]` *"Profesor, tolong fokus! Berikan kami serum penangkal racun itu sekarang!"*  
> *   `[Respon B]` *"Apa yang Anda butuhkan untuk menyelesaikan ramuan penawarnya?"*  
>  
> *(Jika memilih Respon B):*  
> **Profesor Vern:**  
> *"Nah, ini baru etika ilmuwan! Ambilkan aku getah murni dari Chlorella Devourer dan kristal punggung Carapace Stalker. Tapi ingat, perbandingan campurannya harus tepat 3/8 getah dan 62.5% ekstrak kristal. Kurang satu desimal saja... BOOM! Kita berdua jadi pupuk kompos!"*

---

#### CHAPTER 3: Pabrik Inti Siber Penjajah
**Unit RX-7 / "Echo" (Android Pembelot)**
*   **Visual:** Android berkerangka titanium ramping dengan cat putih yang terkelupas menampakkan serat optik bercahaya oranye hangat di bagian dadanya (tanda ia memiliki emosi nurani). Membawa senapan laser yang sudah dimodifikasi menjadi alat pembongkar data (*data-slicer*).
*   **Peran:** Membuka gerbang firewall pabrik, meretas medan gaya medan perang, dan memberikan petunjuk persamaan aljabar untuk melumpuhkan baju zirah Executioner-09.

> **Dialog Kunci: Koridor Terminal Pendingin Server**  
> **Unit RX-7 (Echo):**  
> *"[Status Sistem: Detak Jantung Terdeteksi. Klasifikasi: Manusia/Sekutu]. Berhenti. Sensor optik saya membaca tanda vital Anda berada di bawah ambang optimal untuk menghadapi Algojo-09. Zirah kinetiknya menyerap 90% benturan fisik."*  
> **Pemain (Pilihan Percabangan):**  
> *   `[Respon A]` *"Bagaimana caramu melepaskan diri dari kontrol penjajah, Echo?"*  
> *   `[Respon B]` *"Bagaimana cara menembus zirah baja algojo tersebut?"*  
>  
> *(Jika memilih Respon B):*  
> **Unit RX-7 (Echo):**  
> *"Zirahnya diatur oleh fungsi persamaan linier fluktuatif: Tegangan Inti = 4x + 18. Ketika nilai 'x' mencapai titik ekuilibrium, medan pelindungnya akan lumpuh selama siklus Death-Riddle. Izinkan saya membuka porta data terminal—Anda yang harus mengeksekusi solusinya!"*

---

#### CHAPTER 4: Inti Kapal Induk Dimensi (Final)
**Komandan Dananjaya (Panglima Pasukan Gerilya Terakhir)**
*   **Visual:** Pria berwajah tegas penuh bekas luka sayatan energi plasma, mengenakan baju zirah exo-suit berat bertenaga reaktor mikro di punggungnya, memegang bendera aliansi yang robek namun tertancap kokoh di lantai anjungan kapal.
*   **Peran:** Memimpin regu pengalih perhatian melawan armada induk musuh, memicu medan pelindung darurat saat boss mengeluarkan serangan kiamat (*Ultimate Extinction Beam*), dan memberikan buff moral terakhir.

> **Dialog Kunci: Gerbang Ruang Singkapan Tak Terbatas (The Void Antechamber)**  
> **Komandan Dananjaya:**  
> *"Prajurit! Seluruh sisa armada udara kita telah gugur untuk membukakan jalan ini bagimu. Di balik gerbang itu bukan lagi dunia kita. Hukum fisika, gravitasi, bahkan logika dasar telah dibengkokkan oleh Malakor dan Sovereign Beast."*  
> **Pemain:**  
> *"Saya tidak akan membiarkan pengorbanan rekan-rekan kita sia-sia, Komandan. Semesta ini milik akal budi manusia."*  
> **Komandan Dananjaya:**  
> *"Pegang kata-katamu itu, Nak! Ambil bekal pasokan terakhir ini. Bawa akal sehat, keberanian, dan api tekadmu. Saat monstermu jatuh, jangan ragu sedetik pun saat memecahkan anomali dimensinya. Hancurkan mereka sampai ke titik nol!"*

---

## 4. MEKANIK GAMEPLAY & SISTEM EDUKASI "DEATH-RIDDLE"

### 4.0 Sistem Eksplorasi Overworld & Navigasi WASD
Pemain menjelajahi dunia game dalam perspektif **Top-Down / 2.5D HD Pixel Art** dengan fitur eksplorasi berikut:
*   **Kontrol Gerak WASD:** Pahlawan digerakkan secara bebas menggunakan tombol **W, A, S, D** atau **Arrow Keys** dengan animasi berjalan 4 arah (Depan, Belakang, Kiri, Kanan) dan sistem kolisi terhadap rintangan lingkungan.
*   **Model Ultra HD 256x256:** Seluruh pahlawan, NPC, monster, dan boss digambar ulang dalam kanvas beresolusi tinggi 256x256 piksel dengan tekstur zirah mendalam, gradien dinamis, dan highlight neon.
*   **Sistem Kunci Chapter Progresif (Chapter Boss Keys):**
    - Chapter berikutnya **TIDAK AKAN TERBUKA** jika player belum mengalahkan Boss pada chapter sebelumnya.
    - Gerbang portal antar area dilindungi oleh medan energi perisai merah dengan status terkunci 🔒.
    - Mengalahkan Boss chapter akan memicu drop item kunci khusus:
      1. *Chapter 1 Boss (Titan Scrap Colossus)* $\rightarrow$ Menjatuhkan **Kunci Bio-Hazard** (Membuka Chapter 2).
      2. *Chapter 2 Boss (Queen Brood Mother)* $\rightarrow$ Menjatuhkan **Kartu Akses Siber** (Membuka Chapter 3).
      3. *Chapter 3 Boss (Apex Executioner)* $\rightarrow$ Menjatuhkan **Kristal Singularitas Dimensi** (Membuka Chapter 4).
      4. *Chapter 4 Boss (Warlord Malakor & Sovereign Leviathan)* $\rightarrow$ Mengakhiri krisis singularitas bumi!
*   **Elemen Visual Dunia Hancur (*Ruined Post-Apocalyptic Storytelling*):**
    - Kawah tabrakan meteor/bom dimensi dengan retakan magma ungu menyala.
    - Bangkai robot/cyborg raksasa yang tertimbun puing tanah reruntuhan.
    - Rambu-rambu peringatan bahaya radiasi dimensi (*"DANGER: BIO-TOXIN LEVEL 5"*, *"QUARANTINE ENFORCED"*).
    - Partikel abu vulkanik/fallout yang melayang (*drifting fallout ash*) di seluruh layer overworld.
*   **Sistem Interaksi Proksimitas NPC:** Ketika pahlawan mendekati NPC dalam radius 48 pixel, balon dialog mengambang `[E] / [Spasi] Bicara` akan muncul di atas kepala NPC. Menekan tombol E akan membuka kotak dialog cerita klasik di bagian bawah layar lengkap dengan potret ekspresif, percabangan dialog, dan suara blip retro.


### 4.1 Siklus Pertarungan (Core Combat Loop)
Pertarungan mengusung sistem **Turn-Based Tactical Combat** dengan elemen eksekusi matematika yang terintegrasi dinamis:

```
[Eksplorasi Overworld WASD] ──(Kontak Monster)──> [Inisiasi Pertarungan] 

         │
         ▼
[Fase Taktis: Hero vs Monster] 
(Serang biasa, Gunakan Skill Elemen, Item, atau Bertahan)
         │
         ▼
[HP Monster Mencapai 0] ──────────────────────────┐
         │                                       │
         ▼                                       │
[TRANSISI: FASE DEATH-RIDDLE]                    │ (Jika Gagal)
- Monster terkunci dalam medan stasis energi kuantum  │ Monster pulih 35% HP
- Antarmuka berubah ke Holographic Riddle Screen │ Diberi buff "Enraged"
- Muncul soal matematika kontekstual + Timer 45 detik│ Pertarungan berlanjut
         │                                       │
   ┌─────┴────────────────┐                      │
   │                      │                      │
[Jawaban BENAR]      [Jawaban SALAH / Timeout] ──┘
   │
   ▼
[OVERKILL DISSOLUTION]
- Animasi partikel hancur spektakuler
- Hadiah: 100% EXP, Skill Points (SP),
  Rare Crafting Materials, Gold/Scrap
```

### 4.2 Aturan & Penalti Death-Riddle
1.  **Kondisi Kritis (Paradox Lock):** Monster tidak dapat dikalahkan hanya dengan *brute force* (mengikis HP sampai 0). Mereka dilindungi oleh anomali singularitas dimensi yang hanya bisa diruntuhkan jika anomali logikanya diselesaikan.
2.  **Timer Dinamis:** 
    *   Chapter 1: 45 detik
    *   Chapter 2: 40 detik
    *   Chapter 3: 35 detik
    *   Chapter 4: 30 detik (Pertarungan Final: 25 detik per tahap!)
3.  **Efek Jawaban Benar (*Critical Solve*):**
    *   Menghilangkan monster seketika dengan animasi ledakan pixel HD.
    *   Memberikan bonus *Mind Surge* (pemain memulihkan 20 MP untuk pertarungan berikutnya).
4.  **Efek Jawaban Salah / Waktu Habis (*Paradox Failure*):**
    *   Monster menyerap energi distorsi dan pulih sebesar **35% Max HP**.
    *   Monster mendapatkan buff **"Rift Surge"**: *Attack +25%, Speed +20%* selama sisa pertarungan.
    *   Pemain kehilangan 1 nyawa kesempatan (*Riddle Shield*). Jika salah 3 kali pada pertarungan yang sama, monster mengeluarkan serangan instan *Dimension Wipe*.

---

## 5. POHON KEAHLIAN (SKILL TREE) & STATISTIK LENGKAP TIGA CABANG ELEMEN

Setiap kelas memiliki 5 tier skill:
*   **Tier 1:** Dasar (Basic Single Target)
*   **Tier 2:** Area / Kontrol Status (Crowd Control / DoT)
*   **Tier 3:** Pasif Bertahan / Pendukung
*   **Tier 4:** Spesialisasi Tingkat Lanjut
*   **Tier 5:** Ultimate Kuantum (Membutuhkan 100% Resonance Gauge)

---

### 5.1 Cabang 1: PYROMANCER (Ignis Vektor - Sang Pembakar Realitas)
*Fokus: Burst Damage Tinggi, Damage Over Time (Burn), Penetrasi Zirah.*

| Nama Skill | Tipe | Biaya MP | Cooldown | Target | Efek & Formula Damage | Animasi HD Pixel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Ignition Spark** | Aktif (T1) | 8 MP | 0 Turn | 1 Musuh | Damage: `120% ATK + 15`. Memicu *Burn* (10% ATK/turn selama 2 turn). | Percikan bara api pixel oranye yang melesat spiral meninggalkan jejak asap hitam. |
| **Thermal Wave** | Aktif (T2) | 18 MP | 2 Turn | Semua Musuh | Damage: `90% ATK + 25`. Memberikan debuff *Melt Armor* (mengurangi DEF musuh 15% selama 3 turn). | Gelombang api horizontal menyapu lantai arena dengan distorsi gelombang panas (*heat shimmer*). |
| **Combustion Engine**| Pasif (T3)| - | Pasif | Diri Sendiri | Tiap kali musuh menerima status *Burn*, pahlawan mendapatkan +5% ATK tambahan (maksimal stack 4x). | Pendaran aura merah membara di sekitar telapak tangan hero. |
| **Plasma Flare** | Aktif (T4) | 30 MP | 3 Turn | 1 Musuh | Damage: `260% ATK + 80`. Jika target memiliki status *Burn*, memicu ledakan instan setara 200% sisa damage burn. | Pilar plasma biru-putih jatuh dari langit membakar tanah dengan pendaran neon kontras. |
| **Supernova Collapse**| Ultimate (T5)| 50 MP + 100% Res | 5 Turn | Semua Musuh | Damage: `450% ATK + 200`. Mengabaikan 50% DEF musuh. Memberikan efek *Incinerate* (HP musuh tidak bisa beregenerasi). | Hero melayang ke udara, mengompres bola api miniatur hingga menjadi hitam lalu meledak menghancurkan layar game. |

---

### 5.2 Cabang 2: CRYOMANCER (Glacies Entropi - Pengendali Titik Beku)
*Fokus: Crowd Control, Perlindungan Shield, Pengurangan Turn Speed Musuh, Efek Shatter.*

| Nama Skill | Tipe | Biaya MP | Cooldown | Target | Efek & Formula Damage | Animasi HD Pixel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Frost Needle** | Aktif (T1) | 7 MP | 0 Turn | 1 Musuh | Damage: `100% ATK + 10`. Menurunkan *Turn Speed* target sebesar 15% selama 2 turn (*Chill*). | Tiga jarum es runcing tembus pandang melesat menancap dengan serpihan pecahan kristal. |
| **Absolute Zero Barrier**| Aktif (T2)| 20 MP | 3 Turn | Pahlawan | Memberikan *Shield* sebesar `25% Max HP + 40` selama 3 turn. Menyerang penyerang balik dengan efek *Chill*. | Lapisan prisma es geometri heksagonal berputar melindungi tubuh hero. |
| **Brittle Lattice** | Pasif (T3)| - | Pasif | Diri Sendiri | Serangan pahlawan pada musuh yang terkena efek *Chill/Frozen* memiliki +25% Critical Hit Chance. | Kilatan pendaran biru sian dingin pada ujung senjata hero. |
| **Blizzard Vortex** | Aktif (T4) | 28 MP | 3 Turn | Semua Musuh | Damage: `110% ATK + 35`. Memiliki peluang 60% membekukan musuh (*Frozen* - lewati 1 turn). | Badai salju pixel tebal berputar di seluruh arena disertai partikel kristal fraktal tajam. |
| **Glacial Cataclysm**| Ultimate (T5)| 45 MP + 100% Res | 5 Turn | Semua Musuh | Damage: `380% ATK + 150`. Membekukan semua musuh selama 1 turn dan memecahkan es (*Shatter*) menghasilkan damage tambahan `15% Current HP` monster. | Seluruh layar membeku menjadi balok es raksasa, lalu retak dan hancur berkeping-keping dengan efek suara kristal pecah. |

---

### 5.3 Cabang 3: ELECTROMANCER (Fulmen Kinetik - Penembus Sirkuit)
*Fokus: Kecepatan Ekstrem, Serangan Berantai (Chain Attack), Efek Shock/Paralysis, Stun Lock.*

| Nama Skill | Tipe | Biaya MP | Cooldown | Target | Efek & Formula Damage | Animasi HD Pixel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Volt Jolt** | Aktif (T1) | 8 MP | 0 Turn | 1 Musuh | Damage: `115% ATK + 12`. 25% peluang memicu *Paralysis* (musuh gagal bergerak pada aksi berikutnya). | Kilatan petir kuning keemasan menyengat musuh dengan getaran sprite berfrekuensi tinggi. |
| **Chain Discharge**| Aktif (T2) | 22 MP | 2 Turn | 3 Musuh | Damage: `130% ATK` pada target utama, melompat ke 2 musuh lain dengan damage berkurang 20% per lompatan. Memberikan status *Shock*. | Sambaran petir zigzag neon ungu-kuning bercabang melompat dari satu musuh ke musuh lain. |
| **Superconductor** | Pasif (T3)| - | Pasif | Diri Sendiri | Tiap kali memberikan damage listrik, pahlawan memulihkan 4 MP dan meningkatkan Speed sebesar 10% (stack hingga 3x). | Busur listrik miniatur berkedip-kedip di sekitar sepatu pahlawan. |
| **Railgun Impact** | Aktif (T4) | 32 MP | 3 Turn | 1 Musuh | Damage: `310% ATK + 95`. Mengabaikan status pertahanan musuh (Armor Pierce). 100% Critical jika musuh terkena status *Shock*. | Hero membidik dengan garis laser merah, lalu menembakkan proyektil partikel berkecepatan hipersonik menembus target. |
| **Apocalyptic Tempest**| Ultimate (T5)| 55 MP + 100% Res | 5 Turn | Semua Musuh | Damage: `420% ATK + 180`. Menyetrum semua musuh (*Stun* mutlak 1 turn), mereset action counter musuh ke 0. | Langit-langit arena menggelap total, puluhan sambaran petir giga menyambar bumi secara berurutan dengan flash layar putih dramatis. |

---

## 6. STRUKTUR CHAPTER, MONSTER, DAN BANK SOAL MATEMATIKA KONTEKSTUAL

Setiap monster memiliki desain visual unik, statistik bertarung, serta **Bank Soal Matematika Kontekstual** yang relevan dengan fisiologi atau teknologi monster tersebut.

---

### CHAPTER 1: RERUNTUHAN KOTA TERAKHIR
*Tema Matematika: Operasi Hitung Dasar (Aritmatika Cepat, Penjumlahan, Pengurangan, Perkalian, Pembagian, Operasi Campuran)*

#### 1. Monster: Slime Radioaktif Berkaki Besi (*Corrosive Ferroslime*)
*   **Desain Visual Pixel:** Massa gel hijau neon radioaktif yang menggelegak dengan gelembung asam beracun, ditopang oleh 4 kaki cakar baja berkarat yang diambil dari rongsokan kendaraan lapis baja. Terdapat inti reaktor nuklir mini yang berdenyut di tengah tubuhnya.
*   **Statistik:** HP: 180 | ATK: 24 | DEF: 12 | SPD: 10
*   **Skill Musuh:** *Acid Splash* (Damage 20 + mengikis pertahanan pahlawan).

##### Bank Soal Death-Riddle (Ferroslime):
1.  **Soal 1.1 (Dekompensasi Asam):**  
    *"Reaktor inti Ferroslime menghasilkan 84 unit asam korosif per detik. Jika sistem pendingin kaki bajanya berhasil menyerap 37 unit asam, berapa unit kelebihan asam yang masih mengalir di reaktor intinya?"*  
    *   **Perhitungan:** $84 - 37 = 47$  
    *   **Pilihan Jawaban:** A. 45 | **B. 47** | C. 49 | D. 51  
    *   **Kunci:** B
2.  **Soal 1.2 (Frekuensi Langkah Kaki Besi):**  
    *"Ferroslime memiliki 4 kaki baja. Setiap kaki memerlukan 16 sekrup magnetik untuk menahan bobot cairan radioaktifnya. Berapa total sekrup magnetik pada seluruh kaki Ferroslime?"*  
    *   **Perhitungan:** $4 \times 16 = 64$  
    *   **Pilihan Jawaban:** A. 54 | B. 60 | **C. 64** | D. 68  
    *   **Kunci:** C
3.  **Soal 1.3 (Dosis Netralisasi Gel):**  
    *"Sebuah kapsul penawar kimia mengandung 72 ml larutan basa. Satu tetes penawar membutuhkan 9 ml larutan. Berapa tetes penawar yang dapat dihasilkan untuk melarutkan tubuh Ferroslime hingga tuntas?"*  
    *   **Perhitungan:** $72 \div 9 = 8$  
    *   **Pilihan Jawaban:** A. 6 tetes | B. 7 tetes | **C. 8 tetes** | D. 9 tetes  
    *   **Kunci:** C

---

#### 2. Monster: Drone Pengintai Rusak (*Scrap Sentinel MK-I*)
*   **Desain Visual Pixel:** Drone pengintai bundar melayang dengan baling-baling tunggal di bagian atas yang berputar kencang. Memiliki lensa kamera merah menyala yang retak, kabel-kabel putus bertegangan listrik yang menjuntai di bawahnya, serta moncong senapan mesin mikro di sisinya.
*   **Statistik:** HP: 220 | ATK: 32 | DEF: 18 | SPD: 22
*   **Skill Musuh:** *Gatling Burst* (Serangan 3 tembakan beruntun @12 damage).

##### Bank Soal Death-Riddle (Scrap Sentinel MK-I):
1.  **Soal 1.4 (Kalkulasi Peluru Gatling):**  
    *"Sentinel MK-I menembakkan 3 rentetan peluru per siklus. Setiap rentetan menghabiskan 18 butir peluru micro-kinetic. Jika kapasitas cadangannya memiliki 100 butir peluru, berapa sisa peluru setelah 4 siklus tembakan penuh?"*  
    *   **Perhitungan:** Peluru terpakai $= 4 \times (3 \times 18)$... tunggu, jika per siklus $= 3 \times 6 = 18$ butir atau 3 rentetan masing-masing 18 butir?  
    *   *Formulasi Jelas:* "Setiap siklus menghabiskan $3 \times 7 = 21$ peluru. Jika total ada 95 butir peluru, berapa sisa peluru setelah 4 siklus tembakan?"  
    *   $95 - (4 \times 21) = 95 - 84 = 11$  
    *   **Pilihan Jawaban:** A. 9 | **B. 11** | C. 13 | D. 15  
    *   **Kunci:** B
2.  **Soal 1.5 (Sinkronisasi Rotor Ketinggian):**  
    *"Rotor Sentinel berputar 450 RPM pada ketinggian dasar. Ketika mengunci target pahlawan, kecepatan putaran naik $180 \text{ RPM}$, kemudian turun $95 \text{ RPM}$ akibat motor yang rusak. Berapa kecepatan putaran akhir rotor?"*  
    *   **Perhitungan:** $450 + 180 - 95 = 535 \text{ RPM}$  
    *   **Pilihan Jawaban:** A. 525 | B. 530 | **C. 535** | D. 545  
    *   **Kunci:** C
3.  **Soal 1.6 (Overheat Processor Logic):**  
    *"Suhu CPU Sentinel berada pada $42^\circ\text{C}$. Setiap detik pemindaian laser, suhunya naik $6^\circ\text{C}$. Batas aman sebelum shutdown adalah $90^\circ\text{C}$. Berapa detik lagi pemindaian laser dapat berlangsung sebelum terjadi shutdown?"*  
    *   **Perhitungan:** $(90 - 42) \div 6 = 48 \div 6 = 8 \text{ detik}$  
    *   **Pilihan Jawaban:** A. 6 detik | B. 7 detik | **C. 8 detik** | D. 9 detik  
    *   **Kunci:** C

---

### CHAPTER 2: HUTAN KARANTINA BIO-HAZARD
*Tema Matematika: Pecahan, Desimal, Rasio, Proporsi, dan Persentase*

#### 1. Monster: Tumbuhan Karnivora Parasit (*Chlorella Devourer*)
*   **Desain Visual Pixel:** Bunga raksasa menyerupai kantong semar berlendir ungu gelap dengan taring-taring duri chitinous di bibir kelopaknya. Akarnya bergerak merayap seperti tentakel, dengan sulur bunga yang mengeluarkan kabut spora beracun kuning keemasan.
*   **Statistik:** HP: 460 | ATK: 55 | DEF: 30 | SPD: 14
*   **Skill Musuh:** *Toxic Spore Pollen* (Meracuni target sebesar 5% Max HP per turn dan menyembuhkan dirinya sendiri).

##### Bank Soal Death-Riddle (Chlorella Devourer):
1.  **Soal 2.1 (Konsentrasi Racun Spora - Desimal):**  
    *"Spora Chlorella mencemari udara dengan konsentrasi awal $2.45 \text{ ppm}$. Jika semprotan angin menipiskan konsentrasi tersebut sebanyak $0.88 \text{ ppm}$, lalu parasit mengeluarkan gelombang spora baru sebesar $1.15 \text{ ppm}$, berapa konsentrasi akhir spora di udara?"*  
    *   **Perhitungan:** $2.45 - 0.88 + 1.15 = 1.57 + 1.15 = 2.72 \text{ ppm}$  
    *   **Pilihan Jawaban:** A. 2.62 | **B. 2.72** | C. 2.82 | D. 2.92  
    *   **Kunci:** B
2.  **Soal 2.2 (Ekstraksi Nektar Parasit - Pecahan):**  
    *"Sebuah labu reaksi berisi $\frac{5}{6}$ liter nektar asam Chlorella. Untuk menciptakan penawar racun, Profesor Vern menuangkan $\frac{1}{3}$ liter nektar tersebut ke dalam tabung sentrifugal. Berapa liter nektar yang tersisa di dalam labu?"*  
    *   **Perhitungan:** $\frac{5}{6} - \frac{1}{3} = \frac{5}{6} - \frac{2}{6} = \frac{3}{6} = \frac{1}{2} \text{ liter}$  
    *   **Pilihan Jawaban:** A. $\frac{1}{4}$ liter | B. $\frac{1}{3}$ liter | **C. $\frac{1}{2}$ liter** | D. $\frac{2}{3}$ liter  
    *   **Kunci:** C
3.  **Soal 2.3 (Efisiensi Fotosintesis Bio-Resin - Persentase):**  
    *"Kantung getah Chlorella menampung kapasitas maksimum $400 \text{ ml}$. Saat ini getah tersebut terisi sebanyak $260 \text{ ml}$. Berapa persentase isi getah terhadap kapasitas maksimumnya?"*  
    *   **Perhitungan:** $\frac{260}{400} \times 100\% = \frac{26}{40} \times 100\% = 65\%$  
    *   **Pilihan Jawaban:** A. 60% | B. 62.5% | **C. 65%** | D. 70%  
    *   **Kunci:** C

---

#### 2. Monster: Serangga Raksasa Berduri Kristal (*Chitin Carapace Stalker*)
*   **Desain Visual Pixel:** Kumbang predator berkaki enam setinggi dua meter. Cangkang eksoskeletonnya terbentuk dari kristal kuarsa hijau zamrud yang membiaskan cahaya secara dinamis. Mandibula (rahang) depannya berupa gunting kristal bergerigi yang berdengung tajam.
*   **Statistik:** HP: 520 | ATK: 68 | DEF: 52 | SPD: 26
*   **Skill Musuh:** *Crystalline Carapace* (Mengurangi 40% damage serangan fisik dan memantulkan pecahan kristal).

##### Bank Soal Death-Riddle (Carapace Stalker):
1.  **Soal 2.4 (Penetrasi Ketebalan Cangkang - Desimal):**  
    *"Cangkang kristal Stalker memiliki ketebalan awal $4.25 \text{ cm}$. Serangan laser Cryomancer berhasil mengikis lapisan sebesar $1.68 \text{ cm}$. Berapa sisa ketebalan cangkang kristal yang harus ditembus oleh pahlawan?"*  
    *   **Perhitungan:** $4.25 - 1.68 = 2.57 \text{ cm}$  
    *   **Pilihan Jawaban:** A. 2.47 cm | **B. 2.57 cm** | C. 2.67 cm | D. 3.07 cm  
    *   **Kunci:** B
2.  **Soal 2.5 (Diskon Resistensi Bio-Resin - Persentase):**  
    *"Zirah kristal Stalker memiliki nilai proteksi sebesar 150 poin. Setelah terkena cairan pelarut botani Profesor Vern, proteksinya berkurang sebesar 30%. Berapa poin proteksi yang tersisa pada cangkang Stalker?"*  
    *   **Perhitungan:** Pengurangan $= 150 \times 30\% = 45$. Sisa $= 150 - 45 = 105 \text{ poin}$.  
    *   **Pilihan Jawaban:** A. 95 | B. 100 | **C. 105** | D. 115  
    *   **Kunci:** C
3.  **Soal 2.6 (Rasio Campuran Fraktal - Pecahan Campuran):**  
    *"Untuk meretakkan capit kristal, dibutuhkan $2 \frac{1}{2}$ botol asam pelarut. Jika setiap botol membutuhkan waktu peracikan $1 \frac{1}{4}$ menit, berapa total menit yang dibutuhkan untuk meracik seluruh larutan tersebut?"*  
    *   **Perhitungan:** $2.5 \times 1.25 = \frac{5}{2} \times \frac{5}{4} = \frac{25}{8} = 3 \frac{1}{8} \text{ menit } (3.125 \text{ menit})$.  
    *   **Pilihan Jawaban:** A. $2 \frac{3}{4}$ | B. $3$ | **C. $3 \frac{1}{8}$** | D. $3 \frac{1}{2}$  
    *   **Kunci:** C

---

### CHAPTER 3: PABRIK INTI SIBER PENJAJAH
*Tema Matematika: Aljabar Dasar, Persamaan Linear Satu & Dua Variabel, Pola Bilangan, Sistem Koordinat*

#### 1. Monster: Mech-Hound Pelacak (*Cyber-Canine Vector*)
*   **Desain Visual Pixel:** Anjing robot predator berkaki empat dengan sendi hidrolik krom mengkilap. Matanya berupa pemindai inframerah horizontal berwarna merah darah yang bergeser bolak-balik. Di punggungnya terpasang meriam paku elektromagnetik (*rail-spike launcher*).
*   **Statistik:** HP: 750 | ATK: 90 | DEF: 45 | SPD: 42
*   **Skill Musuh:** *Pounce Overdrive* (Menerjang dengan kecepatan tinggi, mengabaikan giliran pemain jika SPD lebih tinggi).

##### Bank Soal Death-Riddle (Cyber-Canine Vector):
1.  **Soal 3.1 (Frekuensi Radar Pelacak - Aljabar Dasar):**  
    *"Sinyal sensor infra-merah Vector memenuhi persamaan linear: $3x + 15 = 42$, di mana $x$ adalah modulasi gelombang yang harus disabotase pahlawan. Berapakah nilai $x$?"*  
    *   **Perhitungan:** $3x = 42 - 15 \Rightarrow 3x = 27 \Rightarrow x = 9$  
    *   **Pilihan Jawaban:** A. 7 | B. 8 | **C. 9** | D. 11  
    *   **Kunci:** C
2.  **Soal 3.2 (Kecepatan Lari Hidrolik - Persamaan Linear):**  
    *"Kecepatan lari Vector dirumuskan dengan $V = 5t + 20$ meter/detik, di mana $t$ adalah waktu pengisian kapasitor dalam detik. Jika pahlawan ingin memperlambat Vector hingga kecepatannya turun menjadi $65 \text{ m/s}$, berapa detik waktu pengisian $t$ yang sesuai?"*  
    *   **Perhitungan:** $5t + 20 = 65 \Rightarrow 5t = 45 \Rightarrow t = 9 \text{ detik}$  
    *   **Pilihan Jawaban:** A. 7 detik | **B. 9 detik** | C. 11 detik | D. 13 detik  
    *   **Kunci:** B
3.  **Soal 3.3 (Deret Lonjakan Voltase Kaki):**  
    *"Lonjakan tegangan pada empat cakar servo melompat mengikuti barisan aritmatika: $14, 21, 28, 35, \dots$ Berapakah lonjakan tegangan pada suku ke-7 ($U_7$) yang menjadi titik kritis ledakan sirkuit cakar?"*  
    *   **Perhitungan:** $a = 14, b = 7 \Rightarrow U_7 = 14 + (7 - 1) \times 7 = 14 + 42 = 56 \text{ Volt}$  
    *   **Pilihan Jawaban:** A. 49 Volt | B. 52 Volt | **C. 56 Volt** | D. 63 Volt  
    *   **Kunci:** C

---

#### 2. Monster: Cyborg Algojo Berlapis Baja (*Executioner-09*)
*   **Desain Visual Pixel:** Raksasa humanoid bionik setinggi tiga meter berbalut zirah baja hitam karbon doff dengan aksen garis energi sian bercahaya. Tangan kanannya berupa kapak pemotong termal bergigi energi (*thermal plasma cleaver*), dada tengahnya memiliki turbin reaktor fusi berputar.
*   **Statistik:** HP: 1,100 | ATK: 125 | DEF: 85 | SPD: 20
*   **Skill Musuh:** *Guillotine Slam* (Serangan kapak berbobot masif yang memberikan efek Stun 1 turn).

##### Bank Soal Death-Riddle (Executioner-09):
1.  **Soal 3.4 (Tegangan Inti Reaktor Fusi - Aljabar):**  
    *"Sistem perlindungan reaktor Executioner-09 dienkripsi dengan persamaan: $2(y - 4) = 3y - 19$. Temukan nilai variabel $y$ untuk memicu pemadaman darurat pendingin fusi!"*  
    *   **Perhitungan:** $2y - 8 = 3y - 19 \Rightarrow -8 + 19 = 3y - 2y \Rightarrow y = 11$  
    *   **Pilihan Jawaban:** A. 9 | B. 10 | **C. 11** | D. 13  
    *   **Kunci:** C
2.  **Soal 3.5 (Sistem Persamaan Bobot Amunisi Plasma):**  
    *"Dua baterai plasma tipe $A$ dan tiga sel daya tipe $B$ berbobot total $47 \text{ kg}$ ($2A + 3B = 47$). Diketahui satu sel daya $B$ berbobot $9 \text{ kg}$. Berapa bobot satu baterai plasma tipe $A$?"*  
    *   **Perhitungan:** $2A + 3(9) = 47 \Rightarrow 2A + 27 = 47 \Rightarrow 2A = 20 \Rightarrow A = 10 \text{ kg}$  
    *   **Pilihan Jawaban:** A. 8 kg | **B. 10 kg** | C. 12 kg | D. 14 kg  
    *   **Kunci:** B
3.  **Soal 3.6 (Persamaan Garis Titik Lemah Zirah):**  
    *"Sensor Android Echo mendeteksi retakan zirah pada koordinat garis lurus yang memotong sumbu X di titik $(x, 0)$ pada persamaan $4x - 8y = 24$. Pada nilai $x$ berapakah retakan fatal zirah tersebut berada?"*  
    *   **Perhitungan:** Titik potong sumbu X maka $y = 0 \Rightarrow 4x - 8(0) = 24 \Rightarrow 4x = 24 \Rightarrow x = 6$  
    *   **Pilihan Jawaban:** A. 4 | B. 5 | **C. 6** | D. 8  
    *   **Kunci:** C

---

### CHAPTER 4: INTI KAPAL INDUK DIMENSI (FINAL BOSS)
*Tema Matematika: Logika Tingkat Lanjut, Geometri & Trigonometri Dasar, Volume/Luas Bangun Ruang Kuantum, Soal Cerita Bertingkat*

#### 1. Monster: Jenderal Penjajah Dimensi (*Warlord Malakor*)
*   **Desain Visual Pixel:** Panglima perang bertopeng pualam hitam dengan jubah bayangan dimensi yang berkibar menembus ruang hampa. Mengambang di udara dengan 4 pedang energi psionik melayang mengelilingi tubuhnya (*telekinetic orbit*). Animasi serangannya merobek layar menjadi celah kehampaan ungu.
*   **Statistik:** HP: 2,200 | ATK: 165 | DEF: 95 | SPD: 38
*   **Skill Musuh:** *Dimensional Slash* (Menyerang seluruh party dan menukar posisi stat buff).

##### Bank Soal Death-Riddle (Warlord Malakor):
1.  **Soal 4.1 (Sudut Bidik Orbit Pedang Psionik - Geometri Sudut):**  
    *"Empat pedang Malakor membentuk formasi segitiga kuantum terhadap posisi hero. Jika sudut pertama adalah $65^\circ$ dan sudut kedua adalah $70^\circ$, berapakah besar sudut ketiga ($\theta$) agar medan pembatas psionik runtuh?"*  
    *   **Perhitungan:** Jumlah sudut segitiga $= 180^\circ \Rightarrow \theta = 180^\circ - (65^\circ + 70^\circ) = 180^\circ - 135^\circ = 45^\circ$  
    *   **Pilihan Jawaban:** A. 35° | B. 40° | **C. 45°** | D. 50°  
    *   **Kunci:** C
2.  **Soal 4.2 (Volume Kubus Pembatas Ruang Hampa):**  
    *"Malakor mengurung pahlawan dalam kubus gravitasi dimensi dengan panjang rusuk $s = 12 \text{ meter}$. Berapa volume ruang gravitasi ($V = s^3$) yang harus diledakkan pahlawan dengan serangan elemen?"*  
    *   **Perhitungan:** $12^3 = 12 \times 12 \times 12 = 144 \times 12 = 1,728 \text{ m}^3$  
    *   **Pilihan Jawaban:** A. 1,440 m³ | B. 1,628 m³ | **C. 1,728 m³** | D. 1,828 m³  
    *   **Kunci:** C
3.  **Soal 4.3 (Kalkulasi Energi Penetrasi Perisai - Soal Cerita Bertingkat):**  
    *"Perisai Malakor memiliki $3,000 \text{ unit}$ energi. Hero melepaskan serangan Pyromancer sebesar 750 unit. Kemudian Komandan Dananjaya meledakkan torpedo gerilya yang mengurangi sisa perisai sebesar 40%. Berapa sisa energi perisai Malakor saat ini?"*  
    *   **Perhitungan:** Sisa tahap 1 $= 3,000 - 750 = 2,250 \text{ unit}$.  
    *   Pengurangan tahap 2 $= 2,250 \times 40\% = 900 \text{ unit}$.  
    *   Sisa akhir $= 2,250 - 900 = 1,350 \text{ unit}$.  
    *   **Pilihan Jawaban:** A. 1,200 unit | B. 1,250 unit | **C. 1,350 unit** | D. 1,500 unit  
    *   **Kunci:** C

---

#### 2. FINAL BOSS: Sovereign Beast (*Void Leviathan - Multi-Phase*)
*   **Desain Visual Pixel:**
    *   **Fase 1 (Crystalline Core Entity):** Monster kosmik berbentuk naga berkepala tiga yang tersusun dari cincin-cincin fraktal geometri hitam berbintang dan kristal prisma anti-materi. Ukuran sprite setinggi 80% layar game dengan animasi riak distorsi ruang.
    *   **Fase 2 (Awakened Cosmic Singularity):** Inti makhluk pecah menjadi lubang hitam mikro berwujud humanoid kosmik bersayap aurora berkedip cepat dengan mata galaksi yang menatap langsung ke pemain.
*   **Statistik Fase 1:** HP: 3,500 | ATK: 180 | DEF: 110 | SPD: 30  
*   **Statistik Fase 2:** HP: 4,500 | ATK: 220 | DEF: 130 | SPD: 45
*   **Skill Musuh Fase 2:** *Event Horizon Collapse* (Mengurangi HP hero menjadi 1 jika tidak dipatahkan dalam 2 turn).

##### Bank Soal Death-Riddle (Void Leviathan - Fase Ganda):

##### Fase 1: Ujian Geometri & Keliling Medan Dimensi
1.  **Soal 4.4 (Luas Permukaan Silinder Reaktor Gravitasi):**  
    *"Reaktor inti Leviathan berbentuk tabung silinder tanpa tutup dengan jari-jari $r = 7 \text{ meter}$ dan tinggi $t = 10 \text{ meter}$. Menggunakan $\pi = \frac{22}{7}$, berapakah luas permukaan tabung tanpa tutup ($L = \pi r^2 + 2\pi r t$) untuk menyuntikkan muatan elemen penghancur?"*  
    *   **Perhitungan:**  
        *   Luas alas $= \frac{22}{7} \times 7 \times 7 = 154 \text{ m}^2$  
        *   Luas selimut $= 2 \times \frac{22}{7} \times 7 \times 10 = 440 \text{ m}^2$  
        *   Total Luas $= 154 + 440 = 594 \text{ m}^2$  
    *   **Pilihan Jawaban:** A. 528 m² | B. 572 m² | **C. 594 m²** | D. 616 m²  
    *   **Kunci:** C
2.  **Soal 4.5 (Teorema Pythagoras Vektor Serangan):**  
    *"Hero berada di titik asal $(0,0)$. Kepala kiri Leviathan berada $8 \text{ unit}$ ke arah Timur (sumbu X) dan $15 \text{ unit}$ ke arah Utara (sumbu Y). Berapakah jarak langsung hipotenusa ($d = \sqrt{x^2 + y^2}$) tembakan kilat Electromancer ke kepala monster?"*  
    *   **Perhitungan:** $d = \sqrt{8^2 + 15^2} = \sqrt{64 + 225} = \sqrt{289} = 17 \text{ unit}$  
    *   **Pilihan Jawaban:** A. 16 unit | **B. 17 unit** | C. 19 unit | D. 23 unit  
    *   **Kunci:** B

##### Fase 2: Ujian Terakhir Logika Singularitas Kosmik
3.  **Soal 4.6 (Logika Matematika Pecahan Bertingkat & Waktu Kritis):**  
    *"Singularitas Leviathan memakan realitas dalam laju: $\frac{1}{2}$ ruang tertelan di menit pertama, lalu $\frac{1}{4}$ dari sisa ruang di menit kedua. Jika total ruang realitas awal bernilai $1$ bagian penuh, berapakah sisa realitas bumi yang masih terselamatkan sebelum kehancuran total?"*  
    *   **Perhitungan:**  
        *   Menit 1: Tertelan $\frac{1}{2}$, tersisa $1 - \frac{1}{2} = \frac{1}{2}$.  
        *   Menit 2: Tertelan $\frac{1}{4}$ dari sisa $= \frac{1}{4} \times \frac{1}{2} = \frac{1}{8}$.  
        *   Sisa akhir $= \frac{1}{2} - \frac{1}{8} = \frac{4}{8} - \frac{1}{8} = \frac{3}{8}$ bagian.  
    *   **Pilihan Jawaban:** A. $\frac{1}{8}$ bagian | B. $\frac{1}{4}$ bagian | **C. $\frac{3}{8}$ bagian** | D. $\frac{1}{2}$ bagian  
    *   **Kunci:** C
4.  **Soal 4.7 (Persamaan Matriks Kuantum Final):**  
    *"Untuk menutup celah dimensi selamanya, pahlawan harus menyeimbangkan tiga variabel energi $x, y, z$ dari persamaan:  
    $x + y = 14$  
    $y - z = 3$  
    $2z = 8$  
    Berapakah nilai perkalian $x \times y \times z$?"*  
    *   **Perhitungan:**  
        *   Dari $2z = 8 \Rightarrow z = 4$.  
        *   Substitusi ke $y - 4 = 3 \Rightarrow y = 7$.  
        *   Substitusi ke $x + 7 = 14 \Rightarrow x = 7$.  
        *   Hasil perkalian: $x \times y \times z = 7 \times 7 \times 4 = 49 \times 4 = 196$.  
    *   **Pilihan Jawaban:** A. 168 | B. 182 | **C. 196** | D. 210  
    *   **Kunci:** C

---

## 7. STRUKTUR DATA TEKNIS (JSON SCHEMA UNTUK IMPLEMENTASI GAME)

Agar rancangan ini dapat langsung diintegrasikan ke dalam kode permainan (HTML5 Canvas/JavaScript atau game engine pilihan), berikut adalah arsitektur schema data JSON:

```json
{
  "monster": {
    "id": "corrosive_ferroslime",
    "name": "Corrosive Ferroslime",
    "chapter": 1,
    "sprite": "assets/sprites/ch1/ferroslime.png",
    "stats": {
      "maxHp": 180,
      "atk": 24,
      "def": 12,
      "speed": 10
    },
    "deathRiddleTimer": 45,
    "deathRiddlePool": [
      {
        "id": "riddle_1_1",
        "question": "Reaktor inti Ferroslime menghasilkan 84 unit asam korosif per detik. Jika sistem pendingin kaki bajanya menyerap 37 unit asam, berapa unit kelebihan asam yang masih mengalir di reaktor intinya?",
        "options": ["45", "47", "49", "51"],
        "correctIndex": 1,
        "explanation": "84 - 37 = 47 unit asam."
      }
    ]
  },
  "skillTree": {
    "classId": "pyromancer",
    "className": "Ignis Vektor",
    "skills": [
      {
        "id": "pyro_t1",
        "name": "Ignition Spark",
        "tier": 1,
        "type": "active",
        "costMp": 8,
        "cooldown": 0,
        "target": "single_enemy",
        "formula": "atk * 1.2 + 15",
        "statusEffect": {
          "type": "burn",
          "chance": 1.0,
          "duration": 2,
          "dotFormula": "atk * 0.10"
        }
      }
    ]
  }
}
```

---
*Dokumen ini merupakan rancangan master (Master GDD) resmi untuk Aetheria: Dimensional Paradox.*
