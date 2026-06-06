// header.js - Navigation component

function renderHeader() {
  const currentHash = window.location.hash || '#/beranda';
  
  const navItems = [
    { hash: '#/beranda', icon: 'bi-house-door', label: 'Beranda' },
    { hash: '#/formulir', icon: 'bi-pencil-square', label: 'Formulir' },
    { hash: '#/riwayat', icon: 'bi-clock-history', label: 'Riwayat' },
    { hash: '#/pengaturan', icon: 'bi-gear', label: 'Pengaturan' }
  ];

  const navLinks = navItems.map(item => {
    const active = currentHash === item.hash ? 'active' : '';
    return `<li class="nav-item">
      <a class="nav-link nav-link-custom ${active}" href="${item.hash}">
        <i class="bi ${item.icon} me-1"></i>${item.label}
      </a>
    </li>`;
  }).join('');

  document.getElementById('app-header').innerHTML = `
    <nav class="navbar navbar-expand-lg bg-primary-custom navbar-dark sticky-top">
      <div class="container">
        <a class="navbar-brand navbar-brand-custom" href="#/beranda">
          <span class="brand-icon">📚✨</span>
          Generator RPM
        </a>
        <span class="navbar-text text-white-50 d-none d-md-inline ms-2 small">Dibuat oleh: Subariyanto</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            ${navLinks}
          </ul>
        </div>
      </div>
    </nav>
  `;
}
