// formulir.js - Form page

const JENJANG_KELAS = {
  'RA': ['A', 'B'],
  'MI': ['1', '2', '3', '4', '5', '6'],
  'MTs': ['7', '8', '9'],
  'MA': ['10', '11', '12']
};

const MODEL_PEMBELAJARAN = [
  'Inkuiri-Discovery Learning',
  'Project Based Learning (PjBL)',
  'Cooperative Learning',
  'Experiential Learning ARKA',
  'Problem Based Learning',
  'Contextual Teaching and Learning'
];

const PROFIL_LULUSAN = [
  'Keimanan dan Ketakwaan terhadap Tuhan YME',
  'Kewargaan',
  'Penalaran Kritis',
  'Kreativitas',
  'Kolaborasi',
  'Kemandirian',
  'Kesehatan',
  'Komunikasi'
];

const PANCA_CINTA = [
  'Cinta Kepada Allah dan Rasul-Nya',
  'Cinta Ilmu',
  'Cinta Diri dan Sesama',
  'Cinta Lingkungan',
  'Cinta Tanah Air'
];

const DATA_CONTOH = {
  nama_madrasah: 'MI Nurul Huda Sukowono',
  nama_guru: 'Ahmad Fauzi, S.Pd.I',
  nip_guru: '198505152010011012',
  nama_kamad: 'Drs. H. Mukhtar, M.Pd.I',
  nip_kamad: '196708201995031003',
  jenjang: 'MI',
  kelas: '5',
  semester: 'Ganjil',
  tahun_pelajaran: '2025/2026',
  mata_pelajaran: 'Fikih',
  jumlah_pertemuan: '4',
  alokasi_waktu: '2 x 35 menit',
  capaian_pembelajaran: 'Peserta didik mampu memahami dan mempraktikkan tata cara bersuci (thaharah) sesuai dengan ketentuan syariat Islam, termasuk wudhu, tayammum, dan mandi wajib.',
  tujuan_pembelajaran: '1. Peserta didik dapat menjelaskan pengertian dan hikmah bersuci dalam Islam\n2. Peserta didik dapat menyebutkan macam-macam najis dan cara mensucikannya\n3. Peserta didik dapat mendemonstrasikan tata cara wudhu dengan benar\n4. Peserta didik dapat menjelaskan hal-hal yang membatalkan wudhu',
  materi_utama: 'Thaharah (Bersuci): Pengertian thaharah, macam-macam najis, tata cara wudhu, hal yang membatalkan wudhu, tayammum',
  profil_lulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Penalaran Kritis'],
  panca_cinta: ['Cinta Kepada Allah dan Rasul-Nya', 'Cinta Diri dan Sesama'],
  materi_insersi_kbc: 'Mengaitkan kebersihan sebagai bagian dari iman (an-nazhaafatu minal iman). Menanamkan rasa cinta kepada Allah melalui ibadah yang dimulai dengan bersuci. Adab menjaga kebersihan diri dan lingkungan sebagai bentuk syukur.',
  model_pertemuan: ['Inkuiri-Discovery Learning', 'Cooperative Learning', 'Experiential Learning ARKA', 'Problem Based Learning']
};

function renderFormulir() {
  const saved = Store.getFormData();
  const d = { ...DATA_CONTOH, ...saved };

  document.getElementById('app-content').innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h3 class="fw-bold mb-0"><i class="bi bi-pencil-square me-2"></i>Formulir RPM</h3>
      <div>
        <button class="btn btn-outline-secondary btn-sm me-1" id="btnContoh">
          <i class="bi bi-lightbulb me-1"></i>Data Contoh
        </button>
        <button class="btn btn-outline-danger btn-sm" id="btnResetForm">
          <i class="bi bi-arrow-counterclockwise me-1"></i>Reset
        </button>
      </div>
    </div>

    <form id="rpmForm">
      <!-- Satuan & Personel -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-building me-2"></i>Satuan & Personel</h5>
        <div class="row g-3">
          <div class="col-12">
            <label for="nama_madrasah" class="form-label">Nama Madrasah</label>
            <input type="text" class="form-control" id="nama_madrasah" value="${escHtml(d.nama_madrasah || '')}" required>
          </div>
          <div class="col-md-6">
            <label for="nama_guru" class="form-label">Nama Guru Pengajar</label>
            <input type="text" class="form-control" id="nama_guru" value="${escHtml(d.nama_guru || '')}" required>
          </div>
          <div class="col-md-6">
            <label for="nip_guru" class="form-label">NIP Guru</label>
            <input type="text" class="form-control" id="nip_guru" value="${escHtml(d.nip_guru || '')}">
          </div>
          <div class="col-md-6">
            <label for="nama_kamad" class="form-label">Kepala Madrasah</label>
            <input type="text" class="form-control" id="nama_kamad" value="${escHtml(d.nama_kamad || '')}" required>
          </div>
          <div class="col-md-6">
            <label for="nip_kamad" class="form-label">NIP Kepala Madrasah</label>
            <input type="text" class="form-control" id="nip_kamad" value="${escHtml(d.nip_kamad || '')}">
          </div>
        </div>
      </div>

      <!-- Detail Akademik -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-mortarboard me-2"></i>Detail Akademik</h5>
        <div class="row g-3">
          <div class="col-md-4">
            <label for="jenjang" class="form-label">Jenjang</label>
            <select class="form-select" id="jenjang" required>
              <option value="">-- Pilih --</option>
              ${['RA', 'MI', 'MTs', 'MA'].map(j => `<option value="${j}" ${d.jenjang === j ? 'selected' : ''}>${j}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label for="kelas" class="form-label">Kelas</label>
            <select class="form-select" id="kelas" required>
              <option value="">-- Pilih Jenjang dulu --</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="semester" class="form-label">Semester</label>
            <select class="form-select" id="semester" required>
              <option value="">-- Pilih --</option>
              <option value="Ganjil" ${d.semester === 'Ganjil' ? 'selected' : ''}>Ganjil</option>
              <option value="Genap" ${d.semester === 'Genap' ? 'selected' : ''}>Genap</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="tahun_pelajaran" class="form-label">Tahun Pelajaran</label>
            <input type="text" class="form-control" id="tahun_pelajaran" value="${escHtml(d.tahun_pelajaran || '')}" placeholder="2025/2026" required>
          </div>
          <div class="col-md-4">
            <label for="mata_pelajaran" class="form-label">Mata Pelajaran</label>
            <input type="text" class="form-control" id="mata_pelajaran" value="${escHtml(d.mata_pelajaran || '')}" required>
          </div>
          <div class="col-md-2">
            <label for="jumlah_pertemuan" class="form-label">Jml Pertemuan</label>
            <input type="number" class="form-control" id="jumlah_pertemuan" value="${d.jumlah_pertemuan || '4'}" min="1" max="16" required>
          </div>
          <div class="col-md-2">
            <label for="alokasi_waktu" class="form-label">Alokasi Waktu</label>
            <input type="text" class="form-control" id="alokasi_waktu" value="${escHtml(d.alokasi_waktu || '')}" placeholder="2x35 mnt" required>
          </div>
        </div>
      </div>

      <!-- Kurikulum & Materi -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-book me-2"></i>Kurikulum & Materi</h5>
        <div class="row g-3">
          <div class="col-12">
            <label for="capaian_pembelajaran" class="form-label">Capaian Pembelajaran (CP)</label>
            <textarea class="form-control" id="capaian_pembelajaran" rows="3" required>${escHtml(d.capaian_pembelajaran || '')}</textarea>
          </div>
          <div class="col-12">
            <label for="tujuan_pembelajaran" class="form-label">Tujuan Pembelajaran (TP)</label>
            <textarea class="form-control" id="tujuan_pembelajaran" rows="4" required>${escHtml(d.tujuan_pembelajaran || '')}</textarea>
          </div>
          <div class="col-12">
            <label for="materi_utama" class="form-label">Materi Pelajaran Utama</label>
            <textarea class="form-control" id="materi_utama" rows="2" required>${escHtml(d.materi_utama || '')}</textarea>
          </div>
        </div>
      </div>

      <!-- Model Pembelajaran per Pertemuan -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-diagram-3 me-2"></i>Model Pembelajaran per Pertemuan</h5>
        <div id="modelPertemuanContainer"></div>
      </div>

      <!-- 8 Dimensi Profil Lulusan -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-star me-2"></i>8 Dimensi Profil Lulusan</h5>
        <p class="text-muted small">Pilih dimensi yang ditargetkan:</p>
        <div class="row g-2">
          ${PROFIL_LULUSAN.map((p, i) => `
            <div class="col-md-6">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="pl_${i}" value="${p}" 
                  ${(d.profil_lulusan || []).includes(p) ? 'checked' : ''}>
                <label class="form-check-label" for="pl_${i}">${p}</label>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Panca Cinta -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-heart me-2"></i>Panca Cinta</h5>
        <div class="row g-2">
          ${PANCA_CINTA.map((t, i) => `
            <div class="col-md-6">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="pc_${i}" value="${t}"
                  ${(d.panca_cinta || []).includes(t) ? 'checked' : ''}>
                <label class="form-check-label" for="pc_${i}">${t}</label>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Materi Insersi KBC -->
      <div class="form-section">
        <h5 class="form-section-title"><i class="bi bi-chat-quote me-2"></i>Materi Insersi KBC/Adab</h5>
        <textarea class="form-control" id="materi_insersi_kbc" rows="3" 
          placeholder="Detail materi insersi KBC/adab yang akan diintegrasikan...">${escHtml(d.materi_insersi_kbc || '')}</textarea>
      </div>

      <!-- Submit -->
      <div class="text-center py-3">
        <button type="submit" class="btn btn-primary btn-lg px-5" id="btnGenerate">
          <i class="bi bi-stars me-2"></i>Generate RPM Sekarang
        </button>
      </div>
    </form>

    <!-- Loading overlay -->
    <div class="loading-overlay d-none" id="loadingOverlay">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Sedang men-generate RPM dengan AI...</p>
      <p class="small text-muted">Proses ini memerlukan waktu 15-30 detik</p>
    </div>
  `;

  // Initialize dynamic kelas dropdown
  updateKelasDropdown(d.jenjang, d.kelas);
  updateModelPertemuan(parseInt(d.jumlah_pertemuan) || 4, d.model_pertemuan || []);

  // Event: jenjang change
  document.getElementById('jenjang').addEventListener('change', (e) => {
    updateKelasDropdown(e.target.value, '');
    autoSaveForm();
  });

  // Event: jumlah_pertemuan change
  document.getElementById('jumlah_pertemuan').addEventListener('change', (e) => {
    const num = parseInt(e.target.value) || 1;
    updateModelPertemuan(num, []);
    autoSaveForm();
  });

  // Event: Data contoh
  document.getElementById('btnContoh').addEventListener('click', () => {
    Store.setFormData(DATA_CONTOH);
    showToast('Data contoh dimuat!', 'success');
    renderFormulir();
  });

  // Event: Reset form
  document.getElementById('btnResetForm').addEventListener('click', () => {
    if (confirm('Reset formulir dan hapus data tersimpan?')) {
      Store.clearFormData();
      showToast('Formulir direset', 'info');
      renderFormulir();
    }
  });

  // Event: Auto-save on input
  document.getElementById('rpmForm').addEventListener('input', () => {
    autoSaveForm();
  });
  document.getElementById('rpmForm').addEventListener('change', () => {
    autoSaveForm();
  });

  // Event: Submit / Generate
  document.getElementById('rpmForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await generateRPM();
  });
}

function updateKelasDropdown(jenjang, selectedKelas) {
  const kelasSelect = document.getElementById('kelas');
  const options = JENJANG_KELAS[jenjang] || [];

  kelasSelect.innerHTML = options.length === 0
    ? '<option value="">-- Pilih Jenjang dulu --</option>'
    : '<option value="">-- Pilih Kelas --</option>' +
      options.map(k => `<option value="${k}" ${k === selectedKelas ? 'selected' : ''}>${k}</option>`).join('');
}

function updateModelPertemuan(count, saved) {
  const container = document.getElementById('modelPertemuanContainer');
  let html = '<div class="row g-2">';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="col-md-6">
        <label class="form-label small">Pertemuan ${i + 1}:</label>
        <select class="form-select form-select-sm model-select" data-index="${i}">
          ${MODEL_PEMBELAJARAN.map(m => `<option value="${m}" ${(saved[i] || '') === m ? 'selected' : ''}>${m}</option>`).join('')}
        </select>
      </div>
    `;
  }
  html += '</div>';
  container.innerHTML = html;
}

function getFormValues() {
  const profil = [];
  PROFIL_LULUSAN.forEach((p, i) => {
    if (document.getElementById(`pl_${i}`)?.checked) profil.push(p);
  });

  const kbc = [];
  PANCA_CINTA.forEach((t, i) => {
    if (document.getElementById(`pc_${i}`)?.checked) kbc.push(t);
  });

  const modelPertemuan = [];
  document.querySelectorAll('.model-select').forEach(sel => {
    modelPertemuan.push(sel.value);
  });

  return {
    nama_madrasah: document.getElementById('nama_madrasah')?.value || '',
    nama_guru: document.getElementById('nama_guru')?.value || '',
    nip_guru: document.getElementById('nip_guru')?.value || '',
    nama_kamad: document.getElementById('nama_kamad')?.value || '',
    nip_kamad: document.getElementById('nip_kamad')?.value || '',
    jenjang: document.getElementById('jenjang')?.value || '',
    kelas: document.getElementById('kelas')?.value || '',
    semester: document.getElementById('semester')?.value || '',
    tahun_pelajaran: document.getElementById('tahun_pelajaran')?.value || '',
    mata_pelajaran: document.getElementById('mata_pelajaran')?.value || '',
    jumlah_pertemuan: document.getElementById('jumlah_pertemuan')?.value || '4',
    alokasi_waktu: document.getElementById('alokasi_waktu')?.value || '',
    capaian_pembelajaran: document.getElementById('capaian_pembelajaran')?.value || '',
    tujuan_pembelajaran: document.getElementById('tujuan_pembelajaran')?.value || '',
    materi_utama: document.getElementById('materi_utama')?.value || '',
    profil_lulusan: profil,
    panca_cinta: kbc,
    materi_insersi_kbc: document.getElementById('materi_insersi_kbc')?.value || '',
    model_pertemuan: modelPertemuan
  };
}

function autoSaveForm() {
  const data = getFormValues();
  Store.setFormData(data);
}

async function generateRPM() {
  const formData = getFormValues();

  // Validation
  if (!formData.nama_madrasah || !formData.mata_pelajaran || !formData.jenjang || !formData.kelas) {
    showToast('Mohon lengkapi field yang wajib diisi (madrasah, mapel, jenjang, kelas)', 'warning');
    return;
  }

  if (!Store.getApiKey()) {
    showToast('API Key Gemini belum diatur! Silakan isi di halaman Pengaturan.', 'danger');
    return;
  }

  // Show loading
  document.getElementById('loadingOverlay').classList.remove('d-none');

  try {
    const content = await Gemini.generate(formData);

    // Save result
    const resultItem = {
      ...formData,
      content: content
    };

    // Add to history
    Store.addToHistory(resultItem);

    // Set as current result for preview
    Store.setCurrentResult(resultItem);

    // Navigate to result page
    window.location.hash = '#/hasil';
    showToast('RPM berhasil di-generate!', 'success');
  } catch (error) {
    showToast(error.message, 'danger');
  } finally {
    document.getElementById('loadingOverlay').classList.add('d-none');
  }
}

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
