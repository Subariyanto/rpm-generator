// gemini.js - Gemini API integration

const Gemini = {
  MODELS: [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite'
  ],
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/',

  async generate(formData) {
    const apiKey = Store.getApiKey();
    if (!apiKey) {
      throw new Error('API Key Gemini belum diatur. Silakan masukkan API Key di halaman Pengaturan.');
    }

    const prompt = this.buildPrompt(formData);

    // Try each model with retry
    for (const model of this.MODELS) {
      try {
        const result = await this._callModel(model, apiKey, prompt);
        return result;
      } catch (err) {
        // If rate limited or model issue, try next model
        if (err.status === 429 || err.status === 404) {
          console.warn(`Model ${model} gagal (${err.status}), mencoba model berikutnya...`);
          continue;
        }
        throw err;
      }
    }

    // All models failed — wait and retry once with first model
    await new Promise(r => setTimeout(r, 3000));
    try {
      return await this._callModel(this.MODELS[0], apiKey, prompt);
    } catch (err) {
      if (err.status === 429) {
        throw new Error('Kuota API habis. Silakan tunggu 1-2 menit lalu coba lagi, atau cek kuota di Google AI Studio.');
      }
      throw err;
    }
  },

  async _callModel(model, apiKey, prompt) {
    const url = `${this.BASE_URL}${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 8192
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 400) {
        throw Object.assign(new Error('Request tidak valid. Periksa kembali data input Anda.'), {status: 400});
      } else if (response.status === 401 || response.status === 403) {
        throw Object.assign(new Error('API Key tidak valid atau tidak memiliki akses. Periksa kembali API Key Anda di Pengaturan.'), {status: response.status});
      } else if (response.status === 429) {
        throw Object.assign(new Error('Terlalu banyak request. Silakan tunggu beberapa saat dan coba lagi.'), {status: 429});
      } else if (response.status === 404) {
        throw Object.assign(new Error(`Model ${model} tidak ditemukan.`), {status: 404});
      } else {
        throw Object.assign(new Error(`Error dari Gemini API: ${errorData.error?.message || response.statusText}`), {status: response.status});
      }
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Tidak mendapatkan respons yang valid dari Gemini AI. Silakan coba lagi.');
    }

    return data.candidates[0].content.parts[0].text;
  },

  buildPrompt(d) {
    const modelPertemuan = d.model_pertemuan || [];
    let modelDetail = '';
    for (let i = 0; i < (d.jumlah_pertemuan || 1); i++) {
      const model = modelPertemuan[i] || 'Discovery Learning';
      modelDetail += `  - Pertemuan ${i + 1}: ${model}\n`;
    }

    const profil = (d.profil_lulusan || d.profil_pelajar || []).join(', ');
    const panca = (d.panca_cinta || d.tema_kbc || []).join(', ');

    return `Anda adalah seorang ahli pendidikan di Madrasah yang sangat berpengalaman dalam menyusun Rencana Pembelajaran Mendalam (RPM) sesuai kurikulum terbaru. Buatkan RPM yang lengkap dan detail berdasarkan data berikut:

## DATA INPUT

**Identitas Madrasah:**
- Satuan Pendidikan: ${d.nama_madrasah || '-'}
- Jenjang: ${d.jenjang || '-'}
- Kelas: ${d.kelas || '-'}
- Semester: ${d.semester || '-'}
- Tahun Pelajaran: ${d.tahun_pelajaran || '-'}
- Mata Pelajaran: ${d.mata_pelajaran || '-'}
- Jumlah Pertemuan: ${d.jumlah_pertemuan || '-'}
- Alokasi Waktu: ${d.alokasi_waktu || '-'}

**Personel:**
- Guru Pengajar: ${d.nama_guru || '-'} / NIP: ${d.nip_guru || '-'}
- Kepala Madrasah: ${d.nama_kamad || '-'} / NIP: ${d.nip_kamad || '-'}

**Kurikulum & Materi:**
- Capaian Pembelajaran (CP): ${d.capaian_pembelajaran || '-'}
- Tujuan Pembelajaran (TP): ${d.tujuan_pembelajaran || '-'}
- Materi Pelajaran Utama: ${d.materi_utama || '-'}

**Model Pembelajaran per Pertemuan:**
${modelDetail}

**8 Dimensi Profil Lulusan yang Ditargetkan:**
${profil || '-'}

**Panca Cinta:**
${panca || '-'}

**Materi Insersi KBC/Adab:**
${d.materi_insersi_kbc || '-'}

## INSTRUKSI OUTPUT

Buatkan RPM dengan format resmi dan lengkap yang mencakup:

1. **IDENTITAS** - tabel berisi identitas madrasah, mapel, kelas, semester, alokasi waktu, guru pengajar, kepala madrasah
2. **CAPAIAN PEMBELAJARAN (CP)** - sesuai input
3. **TUJUAN PEMBELAJARAN (TP)** - sesuai input, diperjelas jika perlu
4. **8 DIMENSI PROFIL LULUSAN** - dimensi yang ditargetkan beserta indikatornya
5. **MATERI PEMBELAJARAN**
   - Materi Reguler (sesuai CP/TP)
   - Materi Insersi KBC/Adab
6. **LANGKAH-LANGKAH PEMBELAJARAN MENDALAM (DEEP LEARNING)** - untuk setiap pertemuan:
   - **Pendahuluan** (±15 menit): salam, motivasi, apersepsi, penyampaian tujuan
   - **Kegiatan Inti** (sesuai alokasi): menggunakan model pembelajaran yang ditentukan, dengan tahapan yang jelas dan detail, integrasi 8 Dimensi Profil Lulusan, sisipan Panca Cinta/Adab
   - **Penutup** (±15 menit): refleksi, kesimpulan, tindak lanjut, doa
7. **ASESMEN**
   - Asesmen Formatif (proses): teknik, instrumen
   - Asesmen Sumatif (hasil): teknik, instrumen
8. **SUMBER DAN MEDIA PEMBELAJARAN** - buku, media digital, alat peraga
9. **LAMPIRAN**
   - Rubrik penilaian
   - LKPD (Lembar Kerja Peserta Didik) contoh

## FORMAT
- Gunakan format Markdown yang rapi dengan heading, sub-heading, tabel, dan bullet points
- Bahasa Indonesia formal dan sesuai istilah pendidikan
- Pastikan detail dan operasional (bisa langsung digunakan guru)
- Setiap pertemuan harus memiliki langkah yang berbeda dan progresif
- Integrasikan nilai KBC secara natural dalam kegiatan pembelajaran`;
  }
};
