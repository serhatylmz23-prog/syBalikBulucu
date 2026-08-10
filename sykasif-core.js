/**
 * SyKaşif Core v3.2
 * EventBus, State, GPS, IndexedDB
 */

const EventBus = {
  events: {},
  on(evt, cb) { (this.events[evt] ||= []).push(cb); return () => this.off(evt, cb); },
  off(evt, cb) { if (this.events[evt]) this.events[evt] = this.events[evt].filter(c => c !== cb); },
  emit(evt, data) { (this.events[evt] || []).forEach(cb => { try { cb(data); } catch(e) { console.error(e); } }); }
};

const State = {
  data: {
    depth: null, temp: null, speed: null, heading: null,
    fishTargets: 0, gps: null, connected: false, simulating: false,
    settings: { autoConnect: true, simulation: true, banWarnings: true, fishAlert: false, arEnabled: true, voiceEnabled: true, highContrast: false, offlineMode: true }
  },
  get(k) { return this.data[k]; },
  set(k, v) { this.data[k] = v; EventBus.emit('state:' + k, v); EventBus.emit('state:change', { key: k, value: v }); },
  update(obj) { Object.assign(this.data, obj); Object.keys(obj).forEach(k => EventBus.emit('state:' + k, obj[k])); EventBus.emit('state:change', obj); }
};

const DB = {
  db: null,
  async init() {
    return new Promise((res, rej) => {
      const req = indexedDB.open('SyKasifDB', 1);
      req.onerror = () => rej(req.error);
      req.onsuccess = () => { this.db = req.result; res(); };
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('logs')) db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('spots')) db.createObjectStore('spots', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'key' });
      };
    });
  },
  async put(store, data) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(data);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },
  async getAll(store) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  }
};

const GPS = {
  watchId: null,
  start() {
    if (!navigator.geolocation) return;
    this.watchId = navigator.geolocation.watchPosition(
      pos => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: pos.coords.accuracy };
        State.set('gps', coords);
        document.getElementById('gps-badge').style.display = 'flex';
        document.getElementById('gps-text').textContent = 'GPS';
        EventBus.emit('gps:update', coords);
      },
      err => { console.log('GPS hata:', err); document.getElementById('gps-badge').style.display = 'none'; },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  },
  stop() { if (this.watchId) navigator.geolocation.clearWatch(this.watchId); }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
  DB.init().catch(() => {});
  GPS.start();
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hidden');
  }, 2200);
});
