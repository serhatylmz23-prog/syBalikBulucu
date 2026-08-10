/**
 * SyKaşif AR v3.2
 * WebXR + Kamera fallback
 */

const AR = {
  video: null,
  stream: null,
  running: false,
  hudVisible: true,

  init() {
    this.video = document.getElementById('ar-video');
  },

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Kamera erişimi desteklenmiyor');
      return;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.video.srcObject = this.stream;
      this.video.style.display = 'block';
      this.running = true;
      this.updateInfo();
    } catch (e) {
      alert('Kamera açılamadı: ' + e.message);
    }
  },
  stopCamera() {
    if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
    if (this.video) this.video.style.display = 'none';
    this.running = false;
  },

  toggleHUD() {
    this.hudVisible = !this.hudVisible;
    const overlay = document.getElementById('ar-overlay');
    if (overlay) overlay.style.opacity = this.hudVisible ? '1' : '0';
  },

  updateInfo() {
    if (!this.running) return;
    const fish = State.get('fishTargets') || 0;
    const gps = State.get('gps');
    const depth = State.get('depth');
    document.getElementById('ar-fish-count').textContent = fish + ' Hedef';
    document.getElementById('ar-gps').textContent = gps ? `GPS: ${gps.lat.toFixed(4)}, ${gps.lon.toFixed(4)}` : 'GPS: --';
    document.getElementById('ar-depth').textContent = depth != null ? 'Derinlik: ' + depth + 'm' : 'Derinlik: --';
    requestAnimationFrame(() => this.updateInfo());
  }
};

const ARUI = {
  toggleCamera() {
    if (AR.running) AR.stopCamera();
    else AR.startCamera();
  },
  toggleHUD() { AR.toggleHUD(); },
  stop() { AR.stopCamera(); }
};

document.addEventListener('DOMContentLoaded', () => AR.init());
