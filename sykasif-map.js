/**
 * SyKaşif Map v3.2
 * Harita entegrasyonu (MapLibre GL fallback)
 */

const MapModule = {
  container: null,
  layers: { 'track-line': true, 'sonar-heat': false, 'fishing-spots': true },
  spots: [
    { name: 'İstanbul Boğazı', lat: 41.12, lon: 29.07, type: 'tuzlu', fish: ['Lüfer', 'Palamut', 'Çinekop'] },
    { name: 'Ege Kıyıları', lat: 37.98, lon: 27.15, type: 'tuzlu', fish: ['Levrek', 'Çipura', 'Sinarit'] },
    { name: 'Akdeniz', lat: 36.20, lon: 33.50, type: 'tuzlu', fish: ['Orkinos', 'Kılıç', 'Ahtapot'] },
    { name: 'Karadeniz', lat: 41.80, lon: 35.20, type: 'tuzlu', fish: ['Hamsi', 'Mezgit', 'Palamut'] },
    { name: 'Van Gölü', lat: 38.60, lon: 43.30, type: 'tatli', fish: ['İnci Kefali'] },
    { name: 'Beyşehir Gölü', lat: 37.78, lon: 31.50, type: 'tatli', fish: ['Turna', 'Sazan', 'Kızılgöz'] },
    { name: 'Sapanca Gölü', lat: 40.70, lon: 30.25, type: 'tatli', fish: ['Sudak', 'Sazan', 'Turna'] },
    { name: 'Manyas Gölü', lat: 40.20, lon: 27.90, type: 'tatli', fish: ['Sazan', 'Karasu', 'Yayın'] }
  ],

  init() {
    this.container = document.getElementById('map-container');
    if (!this.container) return;
    this.renderPlaceholder();
  },

  renderPlaceholder() {
    if (!this.container) return;
    const gps = State.get('gps');
    this.container.innerHTML = `
      <div class="map-placeholder">
        <div class="icon">🗺️</div>
        <div>Harita yükleniyor...</div>
        <div style="margin-top:8px;font-size:11px;color:var(--text-muted);">
          ${gps ? `Konum: ${gps.lat.toFixed(4)}, ${gps.lon.toFixed(4)}` : 'GPS sinyali bekleniyor'}
        </div>
        <div style="margin-top:12px;font-size:11px;">
          ${this.layers['fishing-spots'] ? '📍 ' + this.spots.length + ' balık noktası yüklendi' : ''}
        </div>
      </div>
    `;
  },

  toggleLayer(name) {
    this.layers[name] = !this.layers[name];
    this.renderPlaceholder();
    EventBus.emit('map:layer', { name, active: this.layers[name] });
  },

  follow() {
    const gps = State.get('gps');
    if (gps) {
      alert(`GPS Takip: ${gps.lat.toFixed(5)}, ${gps.lon.toFixed(5)}`);
    } else {
      alert('GPS sinyali alınamıyor');
    }
  }
};

const MapUI = {
  toggleLayer(name) { MapModule.toggleLayer(name); },
  follow() { MapModule.follow(); }
};

document.addEventListener('DOMContentLoaded', () => MapModule.init());
