// template.js - Generate RPM dari template (tanpa API key)

const Template = {
  generate(formData) {
    const d = formData;
    const modelPertemuan = d.model_pertemuan || [];
    const profilLulusan = (d.profil_lulusan || []).join(', ') || '-';
    const pancaCinta = (d.panca_cinta || []).join(', ') || '-';
    const jmlPertemuan = parseInt(d.jumlah_pertemuan) || 1;

    // Generate langkah pembelajaran per pertemuan
    let langkahPembelajaran = '';
    for (let i = 0; i < jmlPertemuan; i++) {
      const model = modelPertemuan[i] || 'Discovery Learning';
      const pertemuanKe = i + 1;
      langkahPembelajaran += this.generatePertemuan(pertemuanKe, model, d, jmlPertemuan);
    }

    // Generate asesmen
    const asesmen = this.generateAsesmen(d);

    return `# RENCANA PEMBELAJARAN MENDALAM (RPM)

## I. IDENTITAS

| Komponen | Keterangan |
|----------|-----------|
| Satuan Pendidikan | ${d.nama_madrasah || '-'} |
| Jenjang | ${d.jenjang || '-'} |
| Kelas/Semester | ${d.kelas || '-'} / ${d.semester || '-'} |
| Tahun Pelajaran | ${d.tahun_pelajaran || '-'} |
| Mata Pelajaran | ${d.mata_pelajaran || '-'} |
| Jumlah Pertemuan | ${jmlPertemuan} pertemuan |
| Alokasi Waktu | ${d.alokasi_waktu || '-'} per pertemuan |
| Guru Pengajar | ${d.nama_guru || '-'} / NIP: ${d.nip_guru || '-'} |
| Kepala Madrasah | ${d.nama_kamad || '-'} / NIP: ${d.nip_kamad || '-'} |

## II. CAPAIAN PEMBELAJARAN (CP)

${d.capaian_pembelajaran || '-'}

## III. TUJUAN PEMBELAJARAN (TP)

${d.tujuan_pembelajaran || '-'}

## IV. 8 DIMENSI PROFIL LULUSAN YANG DITARGETKAN

${profilLulusan}

**Indikator:**
${this.generateIndikatorProfil(d.profil_lulusan || [])}

## V. PANCA CINTA

${pancaCinta}

## VI. MATERI PEMBELAJARAN

### A. Materi Reguler
${d.materi_utama || '-'}

### B. Materi Insersi Panca Cinta/Adab
${d.materi_insersi_kbc || '-'}

## VII. LANGKAH-LANGKAH PEMBELAJARAN MENDALAM (DEEP LEARNING)

${langkahPembelajaran}

## VIII. ASESMEN

${asesmen}

## IX. SUMBER DAN MEDIA PEMBELAJARAN

### Sumber Belajar:
1. Buku Paket ${d.mata_pelajaran || ''} ${d.jenjang || ''} Kelas ${d.kelas || ''} (Kemenag RI)
2. Al-Qur'an dan Hadits terkait materi
3. Buku referensi pendukung yang relevan
4. Modul/LKS ${d.mata_pelajaran || ''}

### Media Pembelajaran:
1. Papan tulis/whiteboard
2. LCD Proyektor dan laptop
3. Lembar Kerja Peserta Didik (LKPD)
4. Media visual (gambar, poster, video pembelajaran)
5. Alat peraga sesuai materi

## X. LAMPIRAN

### A. Rubrik Penilaian Sikap

| No | Aspek | Kriteria | Skor |
|----|-------|----------|------|
| 1 | Keaktifan | Sangat aktif berpartisipasi | 4 |
| | | Aktif berpartisipasi | 3 |
| | | Cukup aktif | 2 |
| | | Kurang aktif | 1 |
| 2 | Kerjasama | Sangat baik bekerjasama | 4 |
| | | Baik bekerjasama | 3 |
| | | Cukup baik | 2 |
| | | Kurang baik | 1 |
| 3 | Tanggung Jawab | Sangat bertanggung jawab | 4 |
| | | Bertanggung jawab | 3 |
| | | Cukup bertanggung jawab | 2 |
| | | Kurang bertanggung jawab | 1 |

### B. Contoh LKPD (Lembar Kerja Peserta Didik)

**LKPD - ${d.mata_pelajaran || 'Mata Pelajaran'}**

**Nama Siswa:** ___________________
**Kelas:** ${d.kelas || '___'}
**Tanggal:** ___________________

**Petunjuk:**
1. Bacalah materi dengan seksama
2. Diskusikan dengan kelompokmu
3. Jawablah pertanyaan berikut dengan jelas

**Kegiatan 1: Mengamati**
- Amatilah materi yang disajikan guru tentang ${d.materi_utama || '...'}
- Catatlah hal-hal penting yang kamu temukan

**Kegiatan 2: Menanya**
- Tuliskan 3 pertanyaan yang ingin kamu ketahui tentang materi ini:
  1. _______________________________________________
  2. _______________________________________________
  3. _______________________________________________

**Kegiatan 3: Mengeksplorasi**
- Carilah informasi dari berbagai sumber untuk menjawab pertanyaanmu

**Kegiatan 4: Menyimpulkan**
- Tuliskan kesimpulan dari pembelajaran hari ini:
  ________________________________________________
  ________________________________________________

---

*RPM ini disusun sebagai panduan pelaksanaan pembelajaran mendalam (deep learning) yang mengintegrasikan 8 Dimensi Profil Lulusan dan Panca Cinta.*

| | |
|---|---|
| Guru Pengajar, | Mengetahui, |
| | Kepala Madrasah |
| | |
| | |
| **${d.nama_guru || '________________'}** | **${d.nama_kamad || '________________'}** |
| NIP. ${d.nip_guru || '________________'} | NIP. ${d.nip_kamad || '________________'} |
`;
  },

  generatePertemuan(ke, model, d, total) {
    const tahapanModel = this.getTahapanModel(model);
    const isFirst = ke === 1;
    const isLast = ke === total;

    let kegiatan = '';
    tahapanModel.forEach((tahap, idx) => {
      kegiatan += `   ${idx + 1}. **${tahap.nama}** (±${tahap.durasi} menit)\n`;
      kegiatan += `      - ${tahap.kegiatan}\n`;
      if (tahap.profil) kegiatan += `      - *Dimensi Profil Lulusan: ${tahap.profil}*\n`;
      if (tahap.pancaCinta) kegiatan += `      - *Panca Cinta: ${tahap.pancaCinta}*\n`;
    });

    return `### Pertemuan ${ke} — Model: ${model}

**A. Pendahuluan (±15 menit)**
1. Guru membuka pembelajaran dengan salam dan berdoa bersama
2. Guru memeriksa kehadiran peserta didik
3. ${isFirst ? 'Guru menyampaikan tujuan pembelajaran dan cakupan materi yang akan dipelajari' : 'Guru mengulas materi pertemuan sebelumnya dan mengaitkan dengan materi hari ini'}
4. Guru memberikan motivasi dan apersepsi yang relevan dengan materi
5. Guru menyampaikan teknik penilaian yang akan digunakan

**B. Kegiatan Inti — ${model} (±${this.hitungDurasiInti(d.alokasi_waktu)} menit)**

${kegiatan}
**C. Penutup (±15 menit)**
1. Guru bersama peserta didik menyimpulkan materi pembelajaran
2. ${isLast ? 'Guru melaksanakan asesmen sumatif' : 'Guru memberikan asesmen formatif (pertanyaan refleksi)'}
3. Guru memberikan umpan balik terhadap proses pembelajaran
4. ${isLast ? 'Guru menyampaikan rencana pembelajaran selanjutnya' : 'Guru memberikan tugas/penugasan untuk pertemuan berikutnya'}
5. Guru menutup pembelajaran dengan doa dan salam

---

`;
  },

  getTahapanModel(model) {
    const models = {
      'Inkuiri-Discovery Learning': [
        { nama: 'Stimulasi (Pemberian Rangsangan)', durasi: 10, kegiatan: 'Guru menyajikan fenomena/masalah yang berkaitan dengan materi untuk merangsang rasa ingin tahu peserta didik', profil: 'Penalaran Kritis' },
        { nama: 'Identifikasi Masalah', durasi: 10, kegiatan: 'Peserta didik mengidentifikasi masalah/pertanyaan dari fenomena yang disajikan', profil: 'Penalaran Kritis, Kemandirian' },
        { nama: 'Pengumpulan Data', durasi: 15, kegiatan: 'Peserta didik mengumpulkan informasi dari berbagai sumber untuk menjawab pertanyaan', profil: 'Kemandirian, Komunikasi' },
        { nama: 'Pengolahan Data', durasi: 10, kegiatan: 'Peserta didik mengolah dan menganalisis data yang telah dikumpulkan', profil: 'Penalaran Kritis, Kreativitas' },
        { nama: 'Verifikasi', durasi: 10, kegiatan: 'Peserta didik memverifikasi hasil temuan dengan sumber yang valid', profil: 'Penalaran Kritis' },
        { nama: 'Generalisasi (Menyimpulkan)', durasi: 10, kegiatan: 'Peserta didik menarik kesimpulan berdasarkan hasil verifikasi dan mempresentasikan', profil: 'Komunikasi, Kolaborasi', pancaCinta: 'Cinta Ilmu' }
      ],
      'Project Based Learning (PjBL)': [
        { nama: 'Penentuan Pertanyaan Mendasar', durasi: 10, kegiatan: 'Guru mengajukan pertanyaan esensial yang mengarah pada penugasan proyek', profil: 'Penalaran Kritis' },
        { nama: 'Mendesain Perencanaan Proyek', durasi: 10, kegiatan: 'Peserta didik secara kolaboratif merancang langkah-langkah penyelesaian proyek', profil: 'Kolaborasi, Kreativitas' },
        { nama: 'Menyusun Jadwal', durasi: 5, kegiatan: 'Peserta didik menyusun jadwal pelaksanaan proyek dengan timeline yang jelas', profil: 'Kemandirian' },
        { nama: 'Monitoring Pelaksanaan Proyek', durasi: 20, kegiatan: 'Peserta didik mengerjakan proyek dengan bimbingan guru, mencatat kemajuan', profil: 'Kemandirian, Kolaborasi', pancaCinta: 'Cinta Ilmu' },
        { nama: 'Menguji Hasil (Presentasi)', durasi: 10, kegiatan: 'Peserta didik mempresentasikan hasil proyek di depan kelas', profil: 'Komunikasi, Kreativitas' },
        { nama: 'Evaluasi Pengalaman', durasi: 10, kegiatan: 'Guru dan peserta didik melakukan refleksi terhadap proses dan hasil proyek', profil: 'Penalaran Kritis' }
      ],
      'Cooperative Learning': [
        { nama: 'Menyampaikan Tujuan & Memotivasi', durasi: 5, kegiatan: 'Guru menyampaikan tujuan pembelajaran dan memotivasi peserta didik untuk aktif bekerjasama', profil: 'Komunikasi' },
        { nama: 'Menyajikan Informasi', durasi: 10, kegiatan: 'Guru menyajikan informasi/materi dasar kepada peserta didik', profil: 'Penalaran Kritis' },
        { nama: 'Mengorganisasikan Kelompok', durasi: 5, kegiatan: 'Guru membagi peserta didik dalam kelompok heterogen (4-5 orang)', profil: 'Kolaborasi', pancaCinta: 'Cinta Diri dan Sesama' },
        { nama: 'Membimbing Kerja Kelompok', durasi: 25, kegiatan: 'Peserta didik berdiskusi dan mengerjakan tugas kelompok, guru membimbing', profil: 'Kolaborasi, Komunikasi, Kemandirian' },
        { nama: 'Presentasi & Evaluasi', durasi: 10, kegiatan: 'Kelompok mempresentasikan hasil kerja, kelompok lain menanggapi', profil: 'Komunikasi, Penalaran Kritis' },
        { nama: 'Memberikan Penghargaan', durasi: 5, kegiatan: 'Guru memberikan penghargaan/apresiasi kepada kelompok terbaik', profil: 'Kolaborasi' }
      ],
      'Experiential Learning ARKA': [
        { nama: 'Amati (Concrete Experience)', durasi: 10, kegiatan: 'Peserta didik mengamati langsung objek/fenomena yang berkaitan dengan materi', profil: 'Penalaran Kritis', pancaCinta: 'Cinta Lingkungan' },
        { nama: 'Rekam (Reflective Observation)', durasi: 10, kegiatan: 'Peserta didik mencatat dan merefleksikan hasil pengamatan', profil: 'Kemandirian, Komunikasi' },
        { nama: 'Kaji (Abstract Conceptualization)', durasi: 15, kegiatan: 'Peserta didik mengkaji dan menganalisis hasil pengamatan dengan teori/konsep', profil: 'Penalaran Kritis, Kreativitas' },
        { nama: 'Aksi (Active Experimentation)', durasi: 20, kegiatan: 'Peserta didik mempraktikkan/mengaplikasikan konsep dalam situasi nyata', profil: 'Kemandirian, Kreativitas', pancaCinta: 'Cinta Ilmu' },
        { nama: 'Refleksi & Berbagi', durasi: 10, kegiatan: 'Peserta didik merefleksikan pengalaman belajar dan berbagi dengan teman', profil: 'Komunikasi, Kolaborasi' }
      ],
      'Problem Based Learning': [
        { nama: 'Orientasi Masalah', durasi: 10, kegiatan: 'Guru menyajikan masalah kontekstual yang berkaitan dengan kehidupan sehari-hari', profil: 'Penalaran Kritis', pancaCinta: 'Cinta Lingkungan' },
        { nama: 'Mengorganisasi Peserta Didik', durasi: 5, kegiatan: 'Guru membantu peserta didik mendefinisikan dan mengorganisasi tugas belajar', profil: 'Kolaborasi' },
        { nama: 'Membimbing Penyelidikan', durasi: 20, kegiatan: 'Peserta didik mengumpulkan informasi dan melakukan penyelidikan untuk memecahkan masalah', profil: 'Penalaran Kritis, Kemandirian' },
        { nama: 'Mengembangkan & Menyajikan Hasil', durasi: 15, kegiatan: 'Peserta didik menyusun laporan/karya dan mempresentasikan solusi', profil: 'Kreativitas, Komunikasi', pancaCinta: 'Cinta Ilmu' },
        { nama: 'Menganalisis & Mengevaluasi', durasi: 10, kegiatan: 'Guru bersama peserta didik menganalisis dan mengevaluasi proses pemecahan masalah', profil: 'Penalaran Kritis' }
      ],
      'Contextual Teaching and Learning': [
        { nama: 'Relating (Mengaitkan)', durasi: 10, kegiatan: 'Guru mengaitkan materi dengan pengalaman nyata peserta didik', profil: 'Penalaran Kritis', pancaCinta: 'Cinta Lingkungan' },
        { nama: 'Experiencing (Mengalami)', durasi: 15, kegiatan: 'Peserta didik melakukan eksplorasi dan menemukan sendiri konsep melalui kegiatan langsung', profil: 'Kemandirian, Kreativitas' },
        { nama: 'Applying (Menerapkan)', durasi: 15, kegiatan: 'Peserta didik menerapkan konsep dalam konteks yang bermakna/nyata', profil: 'Penalaran Kritis, Kemandirian', pancaCinta: 'Cinta Ilmu' },
        { nama: 'Cooperating (Bekerjasama)', durasi: 10, kegiatan: 'Peserta didik berdiskusi dan saling berbagi dalam kelompok', profil: 'Kolaborasi, Komunikasi', pancaCinta: 'Cinta Diri dan Sesama' },
        { nama: 'Transferring (Mentransfer)', durasi: 10, kegiatan: 'Peserta didik mentransfer pengetahuan ke situasi/konteks baru', profil: 'Kreativitas, Penalaran Kritis' }
      ]
    };

    return models[model] || models['Inkuiri-Discovery Learning'];
  },

  hitungDurasiInti(alokasiWaktu) {
    // Parse alokasi waktu (mis: "2 x 35 menit" → 70 - 30 = 40 menit inti)
    const match = (alokasiWaktu || '').match(/(\d+)\s*[x×]\s*(\d+)/i);
    if (match) {
      const total = parseInt(match[1]) * parseInt(match[2]);
      return Math.max(total - 30, 30); // kurangi 30 menit (pendahuluan + penutup)
    }
    return 40; // default
  },

  generateIndikatorProfil(profilList) {
    const indikators = {
      'Keimanan dan Ketakwaan terhadap Tuhan YME': '- Peserta didik menunjukkan sikap taat beribadah dan berakhlak mulia\n- Peserta didik mampu mengaitkan materi pelajaran dengan nilai-nilai keimanan',
      'Kewargaan': '- Peserta didik menunjukkan sikap peduli terhadap lingkungan dan sesama\n- Peserta didik berpartisipasi aktif dalam kegiatan sosial di madrasah',
      'Penalaran Kritis': '- Peserta didik mampu menganalisis informasi secara logis\n- Peserta didik mampu membuat kesimpulan berdasarkan bukti/data',
      'Kreativitas': '- Peserta didik mampu menghasilkan ide/karya yang original\n- Peserta didik berani mencoba pendekatan baru dalam menyelesaikan masalah',
      'Kolaborasi': '- Peserta didik mampu bekerjasama dalam kelompok secara efektif\n- Peserta didik menghargai pendapat dan kontribusi teman',
      'Kemandirian': '- Peserta didik mampu menyelesaikan tugas secara mandiri\n- Peserta didik menunjukkan inisiatif dalam belajar',
      'Kesehatan': '- Peserta didik menunjukkan perilaku hidup bersih dan sehat\n- Peserta didik menjaga kesehatan fisik dan mental selama proses pembelajaran',
      'Komunikasi': '- Peserta didik mampu menyampaikan ide/gagasan secara jelas\n- Peserta didik mampu mendengarkan dan merespons dengan baik'
    };

    if (profilList.length === 0) return '- (Belum dipilih)';
    return profilList.map(p => `**${p}:**\n${indikators[p] || '- Indikator sesuai dimensi'}`).join('\n\n');
  },

  generateAsesmen(d) {
    return `### A. Asesmen Formatif (Proses)

**Teknik:** Observasi, Tanya Jawab, Penugasan

| No | Teknik | Instrumen | Keterangan |
|----|--------|-----------|------------|
| 1 | Observasi | Lembar observasi sikap | Mengamati keaktifan, kerjasama, dan tanggung jawab |
| 2 | Tanya Jawab | Daftar pertanyaan | Pertanyaan lisan selama proses pembelajaran |
| 3 | Penugasan | LKPD | Lembar kerja yang dikerjakan selama pembelajaran |
| 4 | Penilaian Diri | Angket refleksi | Peserta didik menilai pemahaman sendiri |

### B. Asesmen Sumatif (Hasil)

**Teknik:** Tes Tertulis, Unjuk Kerja/Produk

| No | Teknik | Instrumen | Keterangan |
|----|--------|-----------|------------|
| 1 | Tes Tertulis | Soal uraian (5-10 soal) | Mengukur pemahaman konsep |
| 2 | Unjuk Kerja | Rubrik penilaian | Menilai keterampilan praktik |
| 3 | Produk/Portofolio | Rubrik penilaian produk | Menilai hasil karya peserta didik |

### Kriteria Ketuntasan:
- **Tuntas:** Skor ≥ 75 dari skor maksimal 100
- **Belum Tuntas:** Skor < 75 (perlu remedial/pengayaan)`;
  }
};
