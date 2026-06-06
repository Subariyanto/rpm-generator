// hasil.js - Result/Preview page

function renderHasil() {
  const result = Store.getCurrentResult();

  if (!result || !result.content) {
    document.getElementById('app-content').innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-file-earmark-x fs-1 text-muted"></i>
        <p class="text-muted mt-3">Tidak ada hasil RPM untuk ditampilkan.</p>
        <a href="#/formulir" class="btn btn-primary">
          <i class="bi bi-pencil-square me-1"></i>Buat RPM Baru
        </a>
      </div>
    `;
    return;
  }

  const renderedContent = marked.parse(result.content);

  document.getElementById('app-content').innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h3 class="fw-bold mb-0"><i class="bi bi-file-earmark-text me-2"></i>Hasil RPM</h3>
      <div class="no-print">
        <button class="btn btn-outline-primary btn-sm me-1" id="btnCopy" title="Copy to Clipboard">
          <i class="bi bi-clipboard me-1"></i>Copy
        </button>
        <button class="btn btn-outline-success btn-sm me-1" id="btnDownload" title="Download DOCX">
          <i class="bi bi-file-earmark-word me-1"></i>DOCX
        </button>
        <button class="btn btn-outline-secondary btn-sm me-1" id="btnPrint" title="Cetak">
          <i class="bi bi-printer me-1"></i>Cetak
        </button>
        <a href="#/formulir" class="btn btn-primary btn-sm">
          <i class="bi bi-plus-circle me-1"></i>Buat Baru
        </a>
      </div>
    </div>

    ${result.mata_pelajaran ? `
    <div class="alert alert-light border mb-3 small no-print">
      <strong>${result.mata_pelajaran}</strong> | ${result.jenjang || ''} - Kelas ${result.kelas || ''} | ${result.semester || ''} | ${result.nama_madrasah || ''}
    </div>
    ` : ''}

    <div class="rpm-result" id="rpmContent">
      ${renderedContent}
    </div>
  `;

  // Copy to clipboard
  document.getElementById('btnCopy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      showToast('RPM berhasil disalin ke clipboard!', 'success');
    } catch (e) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = result.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('RPM berhasil disalin ke clipboard!', 'success');
    }
  });

  // Print
  document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
  });

  // Download DOCX
  document.getElementById('btnDownload').addEventListener('click', () => {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 2cm; }
            h1 { font-size: 16pt; text-align: center; }
            h2 { font-size: 14pt; }
            h3 { font-size: 12pt; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            table th, table td { border: 1px solid #000; padding: 5px 8px; }
            table th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>${document.getElementById('rpmContent').innerHTML}</body>
        </html>
      `;

      if (typeof htmlDocx !== 'undefined') {
        const blob = htmlDocx.asBlob(htmlContent);
        const filename = `RPM_${(result.mata_pelajaran || 'dokumen').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        showToast('File DOCX berhasil diunduh!', 'success');
      } else {
        // Fallback: download as HTML
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-word' });
        const filename = `RPM_${(result.mata_pelajaran || 'dokumen').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.doc`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        showToast('File DOC berhasil diunduh!', 'success');
      }
    } catch (e) {
      showToast('Gagal mengunduh file: ' + e.message, 'danger');
    }
  });
}
