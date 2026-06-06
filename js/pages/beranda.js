// beranda.js - Dashboard page

function renderBeranda() {
  const history = Store.getHistory();
  const totalRPM = history.length;
  const lastGenerate = history.length > 0 
    ? new Date(history[0].tanggal).toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
      }) 
    : 'Belum ada';

  const hasApiKey = !!Store.getApiKey();

  document.getElementById('app-content').innerHTML = `
    <div class="row mb-4">
      <div class="col-12 text-center mb-4">
        <h2 class="fw-bold" style="color: var(--primary);">
          📚✨ Generator RPM
        </h2>
        <p class="text-muted">Sistem Perencanaan Pembelajaran Mendalam Otomatis Berbasis AI untuk Madrasah</p>
      </div>
    </div>

    ${!hasApiKey ? `
    <div class="alert alert-warning d-flex align-items-center mb-4" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
      <div>
        <strong>API Key belum diatur!</strong> Silakan masukkan API Key Gemini di 
        <a href="#/pengaturan" class="alert-link">halaman Pengaturan</a> untuk mulai generate RPM.
      </div>
    </div>
    ` : ''}

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <div class="card stat-card p-3">
          <div class="stat-number">${totalRPM}</div>
          <div class="stat-label">Total RPM Dibuat</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card stat-card p-3">
          <div class="stat-number" style="font-size: 1.2rem;">${lastGenerate}</div>
          <div class="stat-label">Terakhir Generate</div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card quick-action-btn" onclick="window.location.hash='#/formulir'">
          <i class="bi bi-plus-circle"></i>
          <strong>Buat RPM Baru</strong>
          <small class="text-muted d-block mt-1">Isi formulir & generate</small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card quick-action-btn" onclick="window.location.hash='#/riwayat'">
          <i class="bi bi-clock-history"></i>
          <strong>Lihat Riwayat</strong>
          <small class="text-muted d-block mt-1">RPM yang sudah dibuat</small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card quick-action-btn" onclick="window.location.hash='#/pengaturan'">
          <i class="bi bi-gear"></i>
          <strong>Pengaturan</strong>
          <small class="text-muted d-block mt-1">API Key & identitas</small>
        </div>
      </div>
    </div>

    <div class="card p-4">
      <h5 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>Tentang Aplikasi</h5>
      <p class="mb-2">
        <strong>Generator RPM v1.0</strong> adalah aplikasi berbasis AI untuk membantu guru madrasah 
        menyusun Rencana Pembelajaran Mendalam (RPM) secara otomatis dan terstruktur.
      </p>
      <ul class="mb-2">
        <li>Menggunakan Google Gemini AI untuk generate konten RPM</li>
        <li>Format sesuai standar kurikulum madrasah terbaru</li>
        <li>Integrasi Profil Pelajar Pancasila & KBC (Khas Budaya Cinta)</li>
        <li>Mendukung model Pembelajaran Mendalam (Deep Learning)</li>
        <li>Export ke DOCX & cetak langsung</li>
      </ul>
      <p class="mb-0 text-muted small">
        <i class="bi bi-person-circle me-1"></i>Referensi: Ahmad Bashir, Pengawas Kemenag Kota Tangerang
      </p>
    </div>
  `;
}
