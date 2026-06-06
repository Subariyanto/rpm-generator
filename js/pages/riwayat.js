// riwayat.js - History page

function renderRiwayat() {
  const history = Store.getHistory();

  let content = `
    <h3 class="fw-bold mb-4"><i class="bi bi-clock-history me-2"></i>Riwayat RPM</h3>
  `;

  if (history.length === 0) {
    content += `
      <div class="text-center py-5">
        <i class="bi bi-inbox fs-1 text-muted"></i>
        <p class="text-muted mt-3">Belum ada RPM yang di-generate.</p>
        <a href="#/formulir" class="btn btn-primary">
          <i class="bi bi-plus-circle me-1"></i>Buat RPM Baru
        </a>
      </div>
    `;
  } else {
    // Filter controls
    content += `
      <div class="row g-2 mb-4">
        <div class="col-md-4">
          <input type="text" class="form-control" id="filterSearch" placeholder="Cari mapel, madrasah...">
        </div>
        <div class="col-md-3">
          <select class="form-select" id="filterJenjang">
            <option value="">Semua Jenjang</option>
            <option value="RA">RA</option>
            <option value="MI">MI</option>
            <option value="MTs">MTs</option>
            <option value="MA">MA</option>
          </select>
        </div>
        <div class="col-md-3">
          <input type="date" class="form-control" id="filterTanggal">
        </div>
        <div class="col-md-2">
          <button class="btn btn-outline-secondary w-100" id="clearFilterBtn">Reset</button>
        </div>
      </div>
    `;

    content += `<div id="riwayatList">`;
    content += renderRiwayatItems(history);
    content += `</div>`;
  }

  document.getElementById('app-content').innerHTML = content;

  // Event listeners for filters
  if (history.length > 0) {
    const filterSearch = document.getElementById('filterSearch');
    const filterJenjang = document.getElementById('filterJenjang');
    const filterTanggal = document.getElementById('filterTanggal');
    const clearFilterBtn = document.getElementById('clearFilterBtn');

    const applyFilters = () => {
      const search = filterSearch.value.toLowerCase();
      const jenjang = filterJenjang.value;
      const tanggal = filterTanggal.value;

      let filtered = history;

      if (search) {
        filtered = filtered.filter(item =>
          (item.mata_pelajaran || '').toLowerCase().includes(search) ||
          (item.nama_madrasah || '').toLowerCase().includes(search) ||
          (item.jenjang || '').toLowerCase().includes(search)
        );
      }

      if (jenjang) {
        filtered = filtered.filter(item => item.jenjang === jenjang);
      }

      if (tanggal) {
        filtered = filtered.filter(item => item.tanggal.startsWith(tanggal));
      }

      document.getElementById('riwayatList').innerHTML = renderRiwayatItems(filtered);
      attachRiwayatListeners();
    };

    filterSearch.addEventListener('input', applyFilters);
    filterJenjang.addEventListener('change', applyFilters);
    filterTanggal.addEventListener('change', applyFilters);
    clearFilterBtn.addEventListener('click', () => {
      filterSearch.value = '';
      filterJenjang.value = '';
      filterTanggal.value = '';
      applyFilters();
    });

    attachRiwayatListeners();
  }
}

function renderRiwayatItems(items) {
  if (items.length === 0) {
    return `<p class="text-muted text-center py-3">Tidak ada hasil yang cocok.</p>`;
  }

  return items.map(item => {
    const tanggal = new Date(item.tanggal).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const jenjangColors = { RA: 'success', MI: 'primary', MTs: 'info', MA: 'warning' };
    const badgeColor = jenjangColors[item.jenjang] || 'secondary';

    return `
      <div class="card riwayat-item p-3 mb-3">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-1 fw-bold">${item.mata_pelajaran || 'Tanpa Judul'}</h6>
            <p class="mb-1 small text-muted">
              <span class="badge bg-${badgeColor} badge-jenjang me-1">${item.jenjang || '-'}</span>
              ${item.nama_madrasah || '-'} | Kelas ${item.kelas || '-'} | ${item.semester || '-'}
            </p>
            <p class="mb-0 small text-muted">
              <i class="bi bi-calendar3 me-1"></i>${tanggal}
            </p>
          </div>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary riwayat-view-btn" data-id="${item.id}" title="Lihat">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-danger riwayat-delete-btn" data-id="${item.id}" title="Hapus">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function attachRiwayatListeners() {
  document.querySelectorAll('.riwayat-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = Store.getHistoryItem(id);
      if (item) {
        Store.setCurrentResult(item);
        window.location.hash = '#/hasil';
      }
    });
  });

  document.querySelectorAll('.riwayat-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('Hapus RPM ini dari riwayat?')) {
        Store.deleteHistoryItem(id);
        showToast('RPM dihapus dari riwayat', 'info');
        renderRiwayat();
      }
    });
  });
}
