/**
 * SyKaşif AI v3.2
 * Yapay zeka analiz motoru (offline rule-based)
 */

const AI = {
  analyze() {
    const depth = State.get('depth');
    const temp = State.get('temp');
    const fishTargets = State.get('fishTargets');
    const gps = State.get('gps');

    if (depth == null || temp == null) {
      return 'Sonar verisi yok. Lütfen önce bağlantı kurun veya simülasyon başlatın.';
    }

    let report = [];

    // Derinlik analizi
    if (depth < 5) report.push('Çok sığ su. Kıyı balıkları aktif olabilir.');
    else if (depth < 20) report.push('Orta derinlik. Levrek, çipura ve lüfer bölgesi.');
    else if (depth < 50) report.push('Derin su. Sinarit, akya ve orkinos potansiyeli.');
    else report.push('Çok derin. Büyük avcı balıkları ve dip balıkları.');

    // Sıcaklık analizi
    if (temp < 10) report.push('Su soğuk. Kış balıkları (hamsi, mezgit) aktif.');
    else if (temp < 18) report.push('Serin su. Turna, alabalık ve lüfer için ideal.');
    else if (temp < 24) report.push('Ilık su. Levrek, çipura ve palamut için mükemmel.');
    else report.push('Sıcak su. Gece avı önerilir, gündüz derin sulara çekilin.');

    // Balık hedefi
    if (fishTargets > 5) report.push('Yoğun balık sürüsü tespit edildi! Hemen atış yapın.');
    else if (fishTargets > 0) report.push(`${fishTargets} balık hedefi mevcut.`);
    else report.push('Balık hedefi yok. Bölge değiştirmeyi düşünün.');

    // Yasak kontrol
    const banned = FishDB.filter(f => f.banned);
    if (banned.length > 0 && State.get('settings').banWarnings) {
      report.push(`⚠️ ${banned.length} tür için yasak dönem devam ediyor.`);
    }

    // Öneri
    const suitable = FishDB.filter(f => {
      const tRange = f.temp.replace('°C','').split('-');
      const tMin = parseFloat(tRange[0]), tMax = parseFloat(tRange[1]);
      return temp >= tMin && temp <= tMax;
    }).slice(0, 3);

    if (suitable.length) {
      report.push(`Önerilen türler: ${suitable.map(s => s.name).join(', ')}.`);
    }

    const result = report.join(' ');
    this.showReport(result);
    return result;
  },

  showReport(text) {
    const homeReport = document.getElementById('home-ai-report');
    const homeText = document.getElementById('home-ai-text');
    const sonarReport = document.getElementById('sonar-ai-report');
    const sonarText = document.getElementById('sonar-ai-text');

    if (homeReport && homeText) { homeReport.style.display = 'block'; homeText.textContent = text; }
    if (sonarReport && sonarText) { sonarReport.style.display = 'block'; sonarText.textContent = text; }
  },

  predictSpot() {
    const temp = State.get('temp');
    const depth = State.get('depth');
    if (temp == null || depth == null) return null;
    // Basit tahmin: sıcaklık ve derinliğe göre en uygun balık
    return FishDB.filter(f => {
      const tRange = f.temp.replace('°C','').split('-');
      const tMin = parseFloat(tRange[0]), tMax = parseFloat(tRange[1]);
      return temp >= tMin && temp <= tMax;
    }).sort((a, b) => (a.protected ? 1 : 0) - (b.protected ? 1 : 0))[0];
  }
};

// AI raporunu periyodik güncelle
EventBus.on('sonar:data', () => {
  if (State.get('settings').autoConnect) AI.analyze();
});
