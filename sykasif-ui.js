/**
 * SyKaşif UI v3.2
 * Router, UI controller, Settings
 */

const router = {
  current: 'home',
  navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    const nav = document.querySelector('.nav-item[data-page="' + page + '"]');
    if (target) target.classList.add('active');
    if (nav) nav.classList.add('active');
    this.current = page;
    EventBus.emit('navigate', page);
    window.scrollTo(0, 0);
  }
};

const SettingsUI = {
  toggle(el, key) {
    el.classList.toggle('active');
    const settings = State.get('settings');
    settings[key] = el.classList.contains('active');
    State.set('settings', settings);
    DB.put('settings', { key, value: settings[key] }).catch(() => {});
  },
  async load() {
    try {
      const saved = await DB.getAll('settings');
      saved.forEach(s => {
        const settings = State.get('settings');
        settings[s.key] = s.value;
        State.set('settings', settings);
      });
    } catch(e) {}
  },
  reset() {
    if (!confirm('Tüm ayarlar ve veriler sıfırlanacak. Emin misiniz?')) return;
    indexedDB.deleteDatabase('SyKasifDB');
    localStorage.clear();
    location.reload();
  }
};

// Connection status updater
EventBus.on('state:connected', v => {
  const badge = document.getElementById('connection-badge');
  const text = document.getElementById('connection-text');
  if (badge && text) {
    if (v) { badge.classList.remove('offline'); text.textContent = 'Çevrimiçi'; }
    else { badge.classList.add('offline'); text.textContent = 'Çevrimdışı'; }
  }
});

// Ban banner kontrol
// NOT: Bu artık sonar/fishTargets olaylarına bağlı değil - yasak türler
// veritabanında sabit olarak tanımlı olduğundan uygulama açılır açılmaz
// (simülasyon/sonar başlamadan önce) gösterilmesi gerekir. Önceki sürümde
// banner sadece "state:fishTargets" olayında tetiklendiği için sonar hiç
// başlatılmadan yasak uyarısı hiç görünmüyordu.
const BannerUI = {
  check() {
    const banner = document.getElementById('ban-banner');
    if (!banner) return;
    const hasBanned = FishDB.some(f => f.banned);
    if (hasBanned && State.get('settings').banWarnings && !this.dismissed) {
      banner.classList.add('show');
    } else {
      banner.classList.remove('show');
    }
  },
  dismissed: false,
  close() {
    this.dismissed = true;
    const banner = document.getElementById('ban-banner');
    if (banner) banner.classList.remove('show');
  }
};
EventBus.on('state:settings', () => BannerUI.check());

// Değer değiştiğinde HUD kartlarında kısa bir "flash" efekti - verinin
// canlı güncellendiğini görsel olarak vurgular
function flashEl(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const card = el.closest('.status-card') || el;
  card.classList.remove('flash');
  void card.offsetWidth; // reflow to restart animation
  card.classList.add('flash');
}
['depth', 'temp', 'fishTargets'].forEach(key => {
  EventBus.on('state:' + key, () => flashEl('home-' + (key === 'fishTargets' ? 'fish' : key)));
});

// Sonar/AR modül kartlarında "CANLI" rozeti
EventBus.on('state:connected', v => {
  document.querySelectorAll('.module-live-badge').forEach(b => b.classList.toggle('show', !!v));
});

// Voice action handler
EventBus.on('voice:action', ({ action }) => {
  if (action === 'navigate:fish') router.navigate('fish');
  if (action === 'show:ai') {
    router.navigate('sonar');
    document.getElementById('sonar-ai-report').style.display = 'block';
  }
});

// Init settings
document.addEventListener('DOMContentLoaded', () => {
  SettingsUI.load();
  BannerUI.check();
});
