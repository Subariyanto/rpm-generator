// store.js - localStorage helpers

const Store = {
  KEYS: {
    API_KEY: 'rpm_api_key',
    SETTINGS: 'rpm_settings',
    FORM_DATA: 'rpm_form_data',
    HISTORY: 'rpm_history',
    CURRENT_RESULT: 'rpm_current_result'
  },

  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Store.get error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Store.set error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  // API Key
  getApiKey() {
    return localStorage.getItem(this.KEYS.API_KEY) || '';
  },

  setApiKey(key) {
    localStorage.setItem(this.KEYS.API_KEY, key);
  },

  // Settings
  getSettings() {
    return this.get(this.KEYS.SETTINGS) || {
      nama_pengawas: 'SUBARIYANTO, S.Pd, M.Pd.I',
      nip_pengawas: '197002122005011004',
      wilayah: 'KKMA 04 Jember (Kecamatan Sukowono)'
    };
  },

  setSettings(settings) {
    this.set(this.KEYS.SETTINGS, settings);
  },

  // Form data (auto-save)
  getFormData() {
    return this.get(this.KEYS.FORM_DATA) || {};
  },

  setFormData(data) {
    this.set(this.KEYS.FORM_DATA, data);
  },

  clearFormData() {
    this.remove(this.KEYS.FORM_DATA);
  },

  // History
  getHistory() {
    return this.get(this.KEYS.HISTORY) || [];
  },

  addToHistory(item) {
    const history = this.getHistory();
    item.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    item.tanggal = new Date().toISOString();
    history.unshift(item);
    this.set(this.KEYS.HISTORY, history);
    return item.id;
  },

  getHistoryItem(id) {
    const history = this.getHistory();
    return history.find(item => item.id === id) || null;
  },

  deleteHistoryItem(id) {
    const history = this.getHistory();
    const filtered = history.filter(item => item.id !== id);
    this.set(this.KEYS.HISTORY, filtered);
  },

  // Current result (for preview page)
  setCurrentResult(result) {
    this.set(this.KEYS.CURRENT_RESULT, result);
  },

  getCurrentResult() {
    return this.get(this.KEYS.CURRENT_RESULT);
  },

  clearCurrentResult() {
    this.remove(this.KEYS.CURRENT_RESULT);
  }
};
