// pengaturan.js - Settings page

function renderPengaturan() {
  const settings = Store.getSettings();
  const apiKey = Store.getApiKey();
  const maskedKey = apiKey ? apiKey.substring(0, 6) + '••••••••' + apiKey.substring(apiKey.length - 4) : '';

  document.getElementById('app-content').innerHTML = `
    <h3 class="fw-bold mb-4"><i class="bi bi-gear me-2"></i>Pengaturan</h3>

    <div class="form-section">
      <h5 class="form-section-title"><i class="bi bi-key me-2"></i>API Key Gemini</h5>
      <p class="text-muted small mb-3">
        Dapatkan API Key dari <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Google AI Studio</a>. 
        Key disimpan di browser Anda (localStorage) dan tidak dikirim ke server manapun selain Google.
      </p>
      ${apiKey ? `
        <div class="mb-3">
          <label class="form-label fw-semibold">API Key Tersimpan:</label>
          <div class="api-key-display">${maskedKey}</div>
        </div>
      ` : ''}
      <div class="mb-3">
        <label for="apiKeyInput" class="form-label fw-semibold">${apiKey ? 'Ganti' : 'Masukkan'} API Key:</label>
        <div class="input-group">
          <input type="password" class="form-control" id="apiKeyInput" 
                 placeholder="Masukkan API Key Gemini Anda" autocomplete="off">
          <button class="btn btn-outline-secondary" type="button" id="toggleKeyBtn" title="Tampilkan/sembunyikan">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </div>
      <button class="btn btn-primary" id="saveApiKeyBtn">
        <i class="bi bi-check-lg me-1"></i>Simpan API Key
      </button>
      ${apiKey ? `
        <button class="btn btn-outline-danger ms-2" id="deleteApiKeyBtn">
          <i class="bi bi-trash me-1"></i>Hapus Key
        </button>
      ` : ''}
    </div>

    <div class="form-section">
      <h5 class="form-section-title"><i class="bi bi-person-badge me-2"></i>Identitas Pengawas</h5>
      <div class="mb-3">
        <label for="namaPengawas" class="form-label fw-semibold">Nama Pengawas:</label>
        <input type="text" class="form-control" id="namaPengawas" value="${settings.nama_pengawas || ''}">
      </div>
      <div class="mb-3">
        <label for="nipPengawas" class="form-label fw-semibold">NIP Pengawas:</label>
        <input type="text" class="form-control" id="nipPengawas" value="${settings.nip_pengawas || ''}">
      </div>
      <div class="mb-3">
        <label for="wilayah" class="form-label fw-semibold">Wilayah:</label>
        <input type="text" class="form-control" id="wilayah" value="${settings.wilayah || ''}">
      </div>
      <button class="btn btn-primary" id="saveSettingsBtn">
        <i class="bi bi-check-lg me-1"></i>Simpan Pengaturan
      </button>
    </div>

    <div class="form-section">
      <h5 class="form-section-title"><i class="bi bi-database me-2"></i>Data & Penyimpanan</h5>
      <p class="text-muted small mb-3">Kelola data yang tersimpan di browser Anda.</p>
      <button class="btn btn-outline-warning me-2" id="clearFormBtn">
        <i class="bi bi-eraser me-1"></i>Hapus Data Formulir
      </button>
      <button class="btn btn-outline-danger" id="clearAllBtn">
        <i class="bi bi-trash me-1"></i>Hapus Semua Data
      </button>
    </div>

    <div id="settingsToast" class="toast-container"></div>
  `;

  // Event listeners
  document.getElementById('toggleKeyBtn').addEventListener('click', () => {
    const input = document.getElementById('apiKeyInput');
    const icon = document.querySelector('#toggleKeyBtn i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'bi bi-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'bi bi-eye';
    }
  });

  document.getElementById('saveApiKeyBtn').addEventListener('click', () => {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key) {
      showToast('Masukkan API Key terlebih dahulu', 'warning');
      return;
    }
    Store.setApiKey(key);
    showToast('API Key berhasil disimpan!', 'success');
    setTimeout(() => renderPengaturan(), 1000);
  });

  const deleteBtn = document.getElementById('deleteApiKeyBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin menghapus API Key?')) {
        Store.remove(Store.KEYS.API_KEY);
        showToast('API Key dihapus', 'info');
        setTimeout(() => renderPengaturan(), 1000);
      }
    });
  }

  document.getElementById('saveSettingsBtn').addEventListener('click', () => {
    const settings = {
      nama_pengawas: document.getElementById('namaPengawas').value.trim(),
      nip_pengawas: document.getElementById('nipPengawas').value.trim(),
      wilayah: document.getElementById('wilayah').value.trim()
    };
    Store.setSettings(settings);
    showToast('Pengaturan berhasil disimpan!', 'success');
  });

  document.getElementById('clearFormBtn').addEventListener('click', () => {
    if (confirm('Hapus data formulir yang tersimpan?')) {
      Store.clearFormData();
      showToast('Data formulir dihapus', 'info');
    }
  });

  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('PERINGATAN: Semua data (riwayat, formulir, pengaturan) akan dihapus. Lanjutkan?')) {
      localStorage.clear();
      showToast('Semua data dihapus', 'info');
      setTimeout(() => {
        window.location.hash = '#/beranda';
        window.location.reload();
      }, 1000);
    }
  });
}
