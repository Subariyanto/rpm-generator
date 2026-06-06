// app.js - Router & initialization

const App = {
  routes: {
    '#/beranda': renderBeranda,
    '#/formulir': renderFormulir,
    '#/hasil': renderHasil,
    '#/riwayat': renderRiwayat,
    '#/pengaturan': renderPengaturan
  },

  init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('SW registration failed:', err);
      });
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.navigate());

    // Initial navigation
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      window.location.hash = '#/beranda';
    } else {
      this.navigate();
    }
  },

  navigate() {
    const hash = window.location.hash || '#/beranda';
    const renderFn = this.routes[hash];

    // Render header and footer
    renderHeader();
    renderFooter();

    if (renderFn) {
      renderFn();
    } else {
      // 404 fallback
      document.getElementById('app-content').innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-question-circle fs-1 text-muted"></i>
          <h4 class="mt-3">Halaman Tidak Ditemukan</h4>
          <p class="text-muted">Halaman yang Anda cari tidak tersedia.</p>
          <a href="#/beranda" class="btn btn-primary">Kembali ke Beranda</a>
        </div>
      `;
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }
};

// Toast notification helper
function showToast(message, type = 'info') {
  // Remove existing toast container if any
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'bi-check-circle-fill',
    danger: 'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill'
  };

  const toastEl = document.createElement('div');
  toastEl.className = `toast show align-items-center text-bg-${type} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi ${icons[type] || icons.info} me-2"></i>${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  container.appendChild(toastEl);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => toastEl.remove(), 300);
  }, 4000);

  // Manual close
  toastEl.querySelector('.btn-close').addEventListener('click', () => {
    toastEl.remove();
  });
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
