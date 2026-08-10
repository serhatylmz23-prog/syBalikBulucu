/**
 * SyKaşif Sonar v3.2
 * NMEA parser, Bluetooth/Serial/WiFi + Simülasyon
 */

const Sonar = {
  device: null,
  reader: null,
  simInterval: null,
  canvas: null,
  ctx: null,
  scanAngle: 0,
  dataHistory: [],
  maxHistory: 200,

  init() {
    this.canvas = document.getElementById('sonar-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.draw();
    }
  },
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    // Reset transform first - otherwise repeated resize() calls (e.g. on
    // orientation change) stack up scale() calls and the sonar draws
    // increasingly zoomed-in/off-center after a few resizes.
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  },

  async connect() {
    if (!navigator.bluetooth) {
      this.setStatus('Web Bluetooth desteklenmiyor');
      this.simulate();
      return;
    }
    try {
      this.device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['0000180a-0000-1000-8000-00805f9b34fb']
      });
      const server = await this.device.gatt.connect();
      this.setStatus('Cihaz bağlandı: ' + (this.device.name || 'Bilinmeyen cihaz') + ' — NMEA veri akışı cihaza özel eşleştirme gerektirir');
      State.set('connected', true);
      this.stopSimulate();
    } catch (e) {
      this.setStatus('Bağlantı hatası: ' + e.message);
      if (State.get('settings').simulation) this.simulate();
    }
  },
  disconnect() {
    if (this.device && this.device.gatt) this.device.gatt.disconnect();
    this.stopSimulate();
    State.set('connected', false);
    State.update({ depth: null, temp: null, speed: null, heading: null, fishTargets: 0 });
    this.setStatus('Bağlantı kesildi');
    this.updateHUD();
  },

  simulate() {
    this.stopSimulate();
    State.set('simulating', true);
    this.setStatus('Simülasyon aktif');
    this.simInterval = setInterval(() => {
      const depth = +(5 + Math.random() * 45).toFixed(1);
      const temp = +(12 + Math.random() * 14).toFixed(1);
      const speed = +(2 + Math.random() * 8).toFixed(1);
      const heading = Math.floor(Math.random() * 360);
      const fishTargets = Math.floor(Math.random() * 8);
      State.update({ depth, temp, speed, heading, fishTargets, connected: true });
      this.addDataPoint(depth, fishTargets);
      this.updateHUD();
      EventBus.emit('sonar:data', { depth, temp, speed, heading, fishTargets });
    }, 1200);
  },
  stopSimulate() {
    if (this.simInterval) { clearInterval(this.simInterval); this.simInterval = null; }
    State.set('simulating', false);
  },

  cameraMode() {
    this.setStatus('Kamera OCR modu - Sonar ekranını kameraya gösterin');
    alert('Kamera OCR: Sonar ekranını kameraya gösterin (Demo modu)');
  },

  addDataPoint(depth, fish) {
    this.dataHistory.push({ depth, fish, time: Date.now() });
    if (this.dataHistory.length > this.maxHistory) this.dataHistory.shift();
  },

  updateHUD() {
    const d = State.get('depth'), t = State.get('temp'), s = State.get('speed'), h = State.get('heading');
    document.getElementById('hud-depth').textContent = d != null ? d + 'm' : '--';
    document.getElementById('hud-temp').textContent = t != null ? t + '°' : '--';
    document.getElementById('hud-speed').textContent = s != null ? s + 'kn' : '--';
    document.getElementById('hud-heading').textContent = h != null ? h + '°' : '--';
    document.getElementById('home-depth').textContent = d != null ? d : '--';
    document.getElementById('home-temp').textContent = t != null ? t : '--';
    document.getElementById('home-fish').textContent = State.get('fishTargets') || 0;
  },

  setStatus(msg) {
    const el = document.getElementById('sonar-status-text');
    if (el) el.textContent = msg;
    const badge = document.getElementById('sonar-status');
    if (badge) badge.classList.toggle('connected', State.get('connected'));
  },

  draw() {
    if (!this.ctx) return requestAnimationFrame(() => this.draw());
    const w = this.canvas.width / window.devicePixelRatio;
    const h = this.canvas.height / window.devicePixelRatio;
    this.ctx.clearRect(0, 0, w, h);

    // Background grid
    this.ctx.strokeStyle = 'rgba(0,200,222,0.08)';
    this.ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      this.ctx.beginPath();
      this.ctx.arc(w/2, h, (h/4)*i, Math.PI, 0);
      this.ctx.stroke();
    }
    for (let i = 0; i <= 6; i++) {
      const ang = Math.PI + (Math.PI / 6) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(w/2, h);
      this.ctx.lineTo(w/2 + Math.cos(ang)*h, h + Math.sin(ang)*h);
      this.ctx.stroke();
    }

    // Scan line
    this.scanAngle += 0.02;
    const sx = w/2 + Math.cos(this.scanAngle + Math.PI) * h;
    const sy = h + Math.sin(this.scanAngle + Math.PI) * h;
    this.ctx.strokeStyle = 'rgba(0,200,222,0.4)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(w/2, h);
    this.ctx.lineTo(sx, sy);
    this.ctx.stroke();

    // Data points
    this.dataHistory.forEach((pt, i) => {
      const ratio = pt.depth / 60;
      const r = ratio * h;
      const spread = (i / this.maxHistory) * Math.PI;
      const px = w/2 + Math.cos(Math.PI + spread) * r;
      const py = h + Math.sin(Math.PI + spread) * r;
      const alpha = (i / this.maxHistory) * 0.8;
      this.ctx.fillStyle = pt.fish > 0 ? `rgba(212,168,83,${alpha})` : `rgba(0,200,222,${alpha*0.3})`;
      this.ctx.beginPath();
      this.ctx.arc(px, py, pt.fish > 0 ? 3 : 1.5, 0, Math.PI*2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.draw());
  }
};

const SonarUI = {
  connect() { Sonar.connect(); },
  simulate() { Sonar.simulate(); },
  disconnect() { Sonar.disconnect(); },
  cameraMode() { Sonar.cameraMode(); }
};

document.addEventListener('DOMContentLoaded', () => Sonar.init());
