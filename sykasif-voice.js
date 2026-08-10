/**
 * SyKaşif Voice v3.2
 * Web Speech API (TR) + komut parser
 */

const Voice = {
  recognition: null,
  listening: false,
  synth: window.speechSynthesis,

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'tr-TR';
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => { this.listening = true; this.updateUI(); };
    this.recognition.onend = () => { this.listening = false; this.updateUI(); };
    this.recognition.onresult = (e) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      document.getElementById('voice-transcript').textContent = transcript;
      if (e.results[e.results.length - 1].isFinal) {
        this.processCommand(transcript);
      }
    };
    this.recognition.onerror = (e) => {
      this.listening = false;
      this.updateUI();
      document.getElementById('voice-status').textContent = 'Hata: ' + e.error;
    };
  },

  toggle() {
    if (!this.recognition) { alert('Tarayıcınız ses tanımayı desteklemiyor'); return; }
    if (this.listening) { this.recognition.stop(); }
    else { this.recognition.start(); }
  },

  updateUI() {
    const mic = document.getElementById('voice-mic');
    const status = document.getElementById('voice-status');
    if (this.listening) {
      mic.classList.add('listening');
      status.textContent = 'Dinleniyor...';
    } else {
      mic.classList.remove('listening');
      status.textContent = 'Dinlemek için mikrofona dokunun';
    }
  },

  processCommand(cmd) {
    cmd = cmd.toLowerCase().trim();
    let response = '';
    let action = '';

    if (cmd.includes('derinlik') || cmd.includes('metre')) {
      const d = State.get('depth');
      response = d != null ? `Derinlik ${d} metre` : 'Derinlik verisi yok';
    } else if (cmd.includes('sıcaklık') || cmd.includes('derece')) {
      const t = State.get('temp');
      response = t != null ? `Su sıcaklığı ${t} derece` : 'Sıcaklık verisi yok';
    } else if (cmd.includes('nerede') || cmd.includes('konum')) {
      const g = State.get('gps');
      response = g ? `Konumunuz enlem ${g.lat.toFixed(4)}, boylam ${g.lon.toFixed(4)}` : 'GPS sinyali yok';
    } else if (cmd.includes('turna')) {
      response = 'Turna tatlı sularda, sazlık ve kamışlık bölgelerde yaşar. En iyi dönem mart-haziran.';
      action = 'navigate:fish';
    } else if (cmd.includes('analiz') || cmd.includes('rapor')) {
      response = AI.analyze();
      action = 'show:ai';
    } else if (cmd.includes('yasak') || cmd.includes('koruma')) {
      const banned = FishDB.filter(f => f.banned || f.protected);
      response = banned.length > 0 ? `${banned.length} tür koruma altında veya yasak dönemde.` : 'Şu an yasak dönem yok.';
    } else if (cmd.includes('hangi balık') || cmd.includes('tutmalıyım')) {
      const temp = State.get('temp');
      const depth = State.get('depth');
      if (temp == null || depth == null) {
        response = 'Önce sonar bağlantısı kurun veya simülasyon başlatın.';
      } else {
        const suggestions = FishDB.filter(f => {
          const tMin = parseFloat(f.temp.split('-')[0]);
          const tMax = parseFloat(f.temp.split('-')[1].replace('°C',''));
          return temp >= tMin && temp <= tMax;
        }).slice(0, 3);
        response = suggestions.length > 0
          ? `Şartlara uygun balıklar: ${suggestions.map(s => s.name).join(', ')}`
          : 'Şu anki şartlara uygun balık bulunamadı.';
      }
    } else {
      response = 'Komut anlaşılamadı. Örnek: "Derinlik kaç metre?", "Analiz yap"';
    }

    document.getElementById('voice-ai-report').style.display = 'block';
    document.getElementById('voice-ai-text').textContent = response;
    this.speak(response);
    if (action) EventBus.emit('voice:action', { action, cmd });
  },

  speak(text) {
    if (!this.synth) return;
    this.synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'tr-TR';
    u.rate = 1;
    u.pitch = 1;
    this.synth.speak(u);
  }
};

const VoiceUI = {
  toggle() { Voice.toggle(); }
};

document.addEventListener('DOMContentLoaded', () => Voice.init());
