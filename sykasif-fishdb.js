/**
 * SyKaşif FishDB v3.2
 * 57 Türkiye balık türü veritabanı
 */

const FishDB = [
  { id: 1, name: "Levrek", latin: "Dicentrarchus labrax", type: "tuzlu", emoji: "🐟", habitat: "Kıyı, estüer", depth: "1-100m", temp: "8-24°C", size: "70cm/10kg", season: "Nisan-Eylül", protected: false, banned: false, desc: "Akdeniz ve Ege'nin en popüler av balıklarından. Kayalık kıyıları ve derin sulardaki yapay resifleri sever." },
  { id: 2, name: "Çipura", latin: "Sparus aurata", type: "tuzlu", emoji: "🐠", habitat: "Kıyı, lagün", depth: "1-30m", temp: "10-28°C", size: "70cm/15kg", season: "Mayıs-Ekim", protected: false, banned: false, desc: "Akdeniz'in en değerli balıklarından. Kumlu ve çamurlu diplerde beslenir." },
  { id: 3, name: "Palamut", latin: "Sarda sarda", type: "tuzlu", emoji: "🐟", habitat: "Açık deniz", depth: "0-200m", temp: "14-24°C", size: "90cm/10kg", season: "Temmuz-Ekim", protected: false, banned: false, desc: "Hızlı ve güçlü bir sürüngen balık. Yem balıklarının üzerinde avlanır." },
  { id: 4, name: "Lüfer", latin: "Pomatomus saltatrix", type: "tuzlu", emoji: "🐟", habitat: "Kıyı, boğaz", depth: "1-50m", temp: "12-26°C", size: "120cm/14kg", season: "Eylül-Kasım", protected: false, banned: false, desc: "Boğaz'ın kralı. Sürü halinde dolaşır, hızlı saldırır." },
  { id: 5, name: "Sinarit", latin: "Dentex dentex", type: "tuzlu", emoji: "🐠", habitat: "Kayalık dip", depth: "15-200m", temp: "12-24°C", size: "100cm/15kg", season: "Mart-Haziran", protected: false, banned: false, desc: "Kayalık diplerde yaşayan etobur bir balık. Zeki ve dikkatli avcıdır." },
  { id: 6, name: "Orkinos", latin: "Thunnus thynnus", type: "tuzlu", emoji: "🐟", habitat: "Açık deniz", depth: "0-1000m", temp: "12-24°C", size: "300cm/500kg", season: "Mayıs-Ekim", protected: false, banned: true, desc: "Mavi yüzgeçli orkinos. Avlanması yasak dönemlerde yasaktır. Büyük göçler yapar." },
  { id: 7, name: "Kılıç", latin: "Xiphias gladius", type: "tuzlu", emoji: "🗡️", habitat: "Açık deniz", depth: "0-800m", temp: "13-25°C", size: "450cm/650kg", season: "Haziran-Eylül", protected: true, banned: true, desc: "Uzun kılıç burnuyla tanınır. Koruma altındadır, avlanması yasaktır." },
  { id: 8, name: "Mercan", latin: "Pagellus erythrinus", type: "tuzlu", emoji: "🐠", habitat: "Kumlu dip", depth: "10-150m", temp: "10-26°C", size: "40cm/2kg", season: "Nisan-Ekim", protected: false, banned: false, desc: "Kırmızı mercan. Kumlu ve çakıllı diplerde bulunur." },
  { id: 9, name: "Tekir", latin: "Mullus barbatus", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "10-300m", temp: "10-24°C", size: "40cm/2kg", season: "Yıl boyu", protected: false, banned: false, desc: "Bıyıklarıyla dibi karıştırarak beslenir. Lezzetli etiyle bilinir." },
  { id: 10, name: "Barbunya", latin: "Mullus surmuletus", type: "tuzlu", emoji: "🐠", habitat: "Kumlu dip", depth: "10-100m", temp: "10-24°C", size: "40cm/2kg", season: "Yıl boyu", protected: false, banned: false, desc: "Tekirin büyük kuzeni. Daha derin sularda yaşar." },
  { id: 11, name: "Kefal", latin: "Mugil cephalus", type: "tuzlu", emoji: "🐟", habitat: "Estüer, lagün", depth: "0-20m", temp: "8-30°C", size: "90cm/12kg", season: "Yıl boyu", protected: false, banned: false, desc: "Hafif tuzlu sularda yaşar. Sürü halinde dolaşır." },
  { id: 12, name: "Sardalya", latin: "Sardina pilchardus", type: "tuzlu", emoji: "🐟", habitat: "Kıyı", depth: "0-100m", temp: "10-24°C", size: "25cm/0.5kg", season: "Yıl boyu", protected: false, banned: false, desc: "Küçük ama lezzetli. Yem balığı olarak da kullanılır." },
  { id: 13, name: "Hamsi", latin: "Engraulis encrasicolus", type: "tuzlu", emoji: "🐟", habitat: "Kıyı", depth: "0-100m", temp: "8-18°C", size: "20cm/0.05kg", season: "Kasım-Şubat", protected: false, banned: false, desc: "Karadeniz'in altın balığı. Soğuk sularda sürüler halinde." },
  { id: 14, name: "Mezgit", latin: "Merlangius merlangus", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "10-200m", temp: "6-18°C", size: "70cm/3kg", season: "Yıl boyu", protected: false, banned: false, desc: "Karadeniz ve Marmara'da yaygın. Beyaz etiyle bilinir." },
  { id: 15, name: "Kalkan", latin: "Scophthalmus maximus", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "10-100m", temp: "8-20°C", size: "100cm/25kg", season: "Mart-Mayıs", protected: false, banned: false, desc: "Pahalı ve lezzetli bir düz balık. Kumlu diplerde gizlenir." },
  { id: 16, name: "Dil", latin: "Solea solea", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "5-100m", temp: "8-22°C", size: "70cm/7kg", season: "Nisan-Haziran", protected: false, banned: false, desc: "Küçük boylu düz balık. Kumun altına gömülerek avlanır." },
  { id: 17, name: "İskorpit", latin: "Scorpaena scrofa", type: "tuzlu", emoji: "🦂", habitat: "Kayalık dip", depth: "5-150m", temp: "10-24°C", size: "50cm/3kg", season: "Yıl boyu", protected: false, banned: false, desc: "Zehirli dikenleri vardır. Kayalık diplerde kamufle olur." },
  { id: 18, name: "Fener", latin: "Lophius piscatorius", type: "tuzlu", emoji: "🎣", habitat: "Çamurlu dip", depth: "20-500m", temp: "6-16°C", size: "200cm/50kg", season: "Eylül-Mart", protected: false, banned: false, desc: "Çirkin ama lezzetli. Kafasında ışık organı vardır." },
  { id: 19, name: "Kaya Levreği", latin: "Serranus cabrilla", type: "tuzlu", emoji: "🐟", habitat: "Kayalık dip", depth: "5-100m", temp: "12-24°C", size: "40cm/2kg", season: "Yıl boyu", protected: false, banned: false, desc: "Kayalık bölgelerin küçük levreği. Lezzetli eti vardır." },
  { id: 20, name: "Akya", latin: "Seriola dumerili", type: "tuzlu", emoji: "🐟", habitat: "Açık deniz", depth: "10-300m", temp: "14-26°C", size: "200cm/80kg", season: "Haziran-Ekim", protected: false, banned: false, desc: "Güçlü ve hızlı bir avcı. Jigging için ideal." },
  { id: 21, name: "Turna", latin: "Esox lucius", type: "tatli", emoji: "🐊", habitat: "Gölet, nehir", depth: "0-10m", temp: "5-20°C", size: "150cm/30kg", season: "Mart-Haziran", protected: false, banned: false, desc: "Tatlı suyun en büyük yırtıcısı. Sazlık ve kamışlık bölgelerde." },
  { id: 22, name: "Sudak", latin: "Sander lucioperca", type: "tatli", emoji: "🐟", habitat: "Göl, baraj", depth: "0-30m", temp: "8-22°C", size: "100cm/15kg", season: "Mart-Mayıs", protected: false, banned: false, desc: "Turnaya benzer ama daha ince. Baraj göllerinde yaygın." },
  { id: 23, name: "Kerevit", latin: "Astacus leptodactylus", type: "tatli", emoji: "🦞", habitat: "Göl, nehir", depth: "0-5m", temp: "10-24°C", size: "20cm/0.2kg", season: "Haziran-Eylül", protected: false, banned: false, desc: "Tatlı su ıstakozu. Gece aktiftir." },
  { id: 24, name: "Sazan", latin: "Cyprinus carpio", type: "tatli", emoji: "🐟", habitat: "Göl, nehir", depth: "0-10m", temp: "5-28°C", size: "120cm/40kg", season: "Nisan-Haziran", protected: false, banned: false, desc: "Türkiye'nin en yaygın tatlı su balığı. Her ortamda yaşar." },
  { id: 25, name: "Alabalık", latin: "Oncorhynchus mykiss", type: "tatli", emoji: "🐟", habitat: "Akarsu", depth: "0-5m", temp: "5-18°C", size: "80cm/10kg", season: "Yıl boyu", protected: false, banned: false, desc: "Serin ve oksijenli sularda yaşar. Sportif balıkçılıkta popüler." },
  { id: 26, name: "Yayın", latin: "Silurus glanis", type: "tatli", emoji: "🐱", habitat: "Nehir, göl", depth: "0-30m", temp: "8-24°C", size: "300cm/150kg", season: "Haziran-Ağustos", protected: false, banned: false, desc: "Tatlı suyun en büyük balığı. Bıyıklarıyla dibi tarar." },
  { id: 27, name: "Kızılgöz", latin: "Scardinius erythrophthalmus", type: "tatli", emoji: "🐟", habitat: "Göl, gölet", depth: "0-5m", temp: "8-24°C", size: "40cm/2kg", season: "Nisan-Haziran", protected: false, banned: false, desc: "Kırmızı gözleriyle tanınır. Sazlık bölgelerde yaşar." },
  { id: 28, name: "Karasu", latin: "Carassius gibelio", type: "tatli", emoji: "🐟", habitat: "Göl, gölet", depth: "0-5m", temp: "5-26°C", size: "45cm/3kg", season: "Nisan-Haziran", protected: false, banned: false, desc: "Sazana benzer ama daha küçük. Her türlü tatlı suda yaşar." },
  { id: 29, name: "İnci Kefali", latin: "Alburnus tarichi", type: "tatli", emoji: "🐟", habitat: "Van Gölü", depth: "0-50m", temp: "8-18°C", size: "20cm/0.1kg", season: "Nisan-Mayıs", protected: true, banned: true, desc: "Van Gölü'ne özgü endemik tür. Koruma altındadır." },
  { id: 30, name: "Mersin Balığı", latin: "Mugilidae", type: "tuzlu", emoji: "🐟", habitat: "Estüer", depth: "0-10m", temp: "10-28°C", size: "60cm/5kg", season: "Yıl boyu", protected: false, banned: false, desc: "Hafif tuzlu sularda yaşar. Kefal familyasından." },
  { id: 31, name: "Çinekop", latin: "Pomatomus saltatrix juv.", type: "tuzlu", emoji: "🐟", habitat: "Kıyı", depth: "1-20m", temp: "14-26°C", size: "30cm/1kg", season: "Mayıs-Ağustos", protected: false, banned: false, desc: "Lüferin genç halidir. Kıyıya daha yakın yaşar." },
  { id: 32, name: "Sarıkanat", latin: "Seriola rivoliana", type: "tuzlu", emoji: "🐟", habitat: "Açık deniz", depth: "10-200m", temp: "16-26°C", size: "150cm/60kg", season: "Haziran-Ekim", protected: false, banned: false, desc: "Akyanın küçük kuzeni. Açık denizlerde yaşar." },
  { id: 33, name: "Zargana", latin: "Belone belone", type: "tuzlu", emoji: "🐟", habitat: "Kıyı", depth: "0-20m", temp: "12-24°C", size: "90cm/2kg", season: "Nisan-Ekim", protected: false, banned: false, desc: "Uzun ve ince bir balık. Yüzeyde sürüklenir." },
  { id: 34, name: "Torik", latin: "Mugilidae", type: "tuzlu", emoji: "🐟", habitat: "Boğaz", depth: "0-20m", temp: "10-24°C", size: "70cm/8kg", season: "Eylül-Kasım", protected: false, banned: false, desc: "Boğaz'da göç eden büyük kefal türleri." },
  { id: 35, name: "Gümüş", latin: "Atherina hepsetus", type: "tuzlu", emoji: "🐟", habitat: "Kıyı", depth: "0-10m", temp: "12-26°C", size: "15cm/0.05kg", season: "Yıl boyu", protected: false, banned: false, desc: "Küçük gümüş balığı. Yem olarak kullanılır." },
  { id: 36, name: "Kırlangıç", latin: "Trigla lucerna", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "10-150m", temp: "8-20°C", size: "75cm/6kg", season: "Yıl boyu", protected: false, banned: false, desc: "Kanat yüzgeçleriyle dibi yürür. Renkli bir balık." },
  { id: 37, name: "Kırmızı Karides", latin: "Palaemon elegans", type: "tuzlu", emoji: "🦐", habitat: "Kıyı, kayalık", depth: "0-20m", temp: "10-24°C", size: "7cm/0.01kg", season: "Yıl boyu", protected: false, banned: false, desc: "Kayalık bölgelerde yaşayan küçük karides." },
  { id: 38, name: "Müren", latin: "Muraena helena", type: "tuzlu", emoji: "🐍", habitat: "Kayalık", depth: "1-50m", temp: "14-26°C", size: "150cm/15kg", season: "Yıl boyu", protected: false, banned: false, desc: "Yılan gibi uzun. Kayalık yarıklarında gizlenir." },
  { id: 39, name: "Ahtapot", latin: "Octopus vulgaris", type: "tuzlu", emoji: "🐙", habitat: "Kayalık dip", depth: "0-200m", temp: "10-24°C", size: "100cm/10kg", season: "Yıl boyu", protected: false, banned: false, desc: "Zeki ve kurnaz. Kayalık mağaralarda yaşar." },
  { id: 40, name: "Kalamar", latin: "Loligo vulgaris", type: "tuzlu", emoji: "🦑", habitat: "Kıyı", depth: "0-200m", temp: "10-24°C", size: "50cm/2kg", season: "Yıl boyu", protected: false, banned: false, desc: "Gece avlanır. Işığa gelir." },
  { id: 41, name: "Kum Midyesi", latin: "Donax trunculus", type: "tuzlu", emoji: "🦪", habitat: "Kumsal", depth: "0-1m", temp: "10-28°C", size: "5cm/0.05kg", season: "Yıl boyu", protected: false, banned: false, desc: "Kumun altında yaşayan küçük midye." },
  { id: 42, name: "Kaya Midyesi", latin: "Mytilus galloprovincialis", type: "tuzlu", emoji: "🦪", habitat: "Kayalık", depth: "0-10m", temp: "8-24°C", size: "10cm/0.1kg", season: "Yıl boyu", protected: false, banned: false, desc: "Kayalara yapışık yaşayan siyah midye." },
  { id: 43, name: "Deniz Tarağı", latin: "Pecten jacobaeus", type: "tuzlu", emoji: "🐚", habitat: "Kumlu dip", depth: "10-100m", temp: "10-24°C", size: "15cm/0.5kg", season: "Yıl boyu", protected: false, banned: false, desc: "Değerli deniz tarağı. Kumlu diplerde yaşar." },
  { id: 44, name: "Yılan Balığı", latin: "Ophichthus rufus", type: "tuzlu", emoji: "🐍", habitat: "Kumlu dip", depth: "10-100m", temp: "14-24°C", size: "100cm/3kg", season: "Yıl boyu", protected: false, banned: false, desc: "Yılan şeklinde kumun altında yaşar." },
  { id: 45, name: "Çipura (Büyük)", latin: "Sparus aurata", type: "tuzlu", emoji: "🐠", habitat: "Kıyı", depth: "1-30m", temp: "10-28°C", size: "70cm/15kg", season: "Mayıs-Ekim", protected: false, banned: false, desc: "Büyük boy çipura. Daha derin sularda yaşar." },
  { id: 46, name: "Trança", latin: "Diplodus sargus", type: "tuzlu", emoji: "🐟", habitat: "Kayalık", depth: "1-50m", temp: "10-26°C", size: "45cm/3kg", season: "Yıl boyu", protected: false, banned: false, desc: "Dişleriyle kayalıklardan yosun kazar." },
  { id: 47, name: "Karagöz", latin: "Diplodus vulgaris", type: "tuzlu", emoji: "🐟", habitat: "Kayalık", depth: "1-50m", temp: "10-26°C", size: "45cm/3kg", season: "Yıl boyu", protected: false, banned: false, desc: "Siyah çizgili küçük balık. Kayalık bölgelerde." },
  { id: 48, name: "Mercan (Büyük)", latin: "Pagellus bogaraveo", type: "tuzlu", emoji: "🐠", habitat: "Kumlu dip", depth: "50-300m", temp: "8-18°C", size: "70cm/8kg", season: "Kasım-Mart", protected: false, banned: false, desc: "Büyük kırmızı mercan. Derin sularda yaşar." },
  { id: 49, name: "Dil (Kum)", latin: "Pegusa lascaris", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "5-100m", temp: "10-24°C", size: "40cm/2kg", season: "Nisan-Haziran", protected: false, banned: false, desc: "Kum dil balığı. Kumun altına gömülür." },
  { id: 50, name: "Kalkan (Küçük)", latin: "Psetta maxima", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "10-100m", temp: "8-20°C", size: "100cm/25kg", season: "Mart-Mayıs", protected: false, banned: false, desc: "Küçük kalkan. Daha sığ sularda bulunur." },
  { id: 51, name: "Mezgit (Büyük)", latin: "Merluccius merluccius", type: "tuzlu", emoji: "🐟", habitat: "Kumlu dip", depth: "50-500m", temp: "6-14°C", size: "140cm/15kg", season: "Yıl boyu", protected: false, banned: false, desc: "Büyük mezgit. Derin sularda yaşar." },
  { id: 52, name: "Orfoz", latin: "Epinephelus marginatus", type: "tuzlu", emoji: "🐟", habitat: "Kayalık", depth: "5-200m", temp: "12-24°C", size: "150cm/60kg", season: "Yıl boyu", protected: true, banned: false, desc: "Büyük grupör. Kayalık mağaralarda yaşar. Koruma altındadır." },
  { id: 53, name: "Lagos", latin: "Dentex gibbosus", type: "tuzlu", emoji: "🐠", habitat: "Kayalık", depth: "20-200m", temp: "12-24°C", size: "60cm/8kg", season: "Mart-Haziran", protected: false, banned: false, desc: "Sinarit familyasından. Kayalık derinlerde." },
  { id: 54, name: "Sinarit (Büyük)", latin: "Dentex dentex", type: "tuzlu", emoji: "🐠", habitat: "Kayalık", depth: "50-200m", temp: "12-24°C", size: "100cm/15kg", season: "Mart-Haziran", protected: false, banned: false, desc: "Büyük sinarit. Derin kayalıkların kralı." },
  { id: 55, name: "Turna (Tatlısu)", latin: "Esox lucius", type: "tatli", emoji: "🐊", habitat: "Göl, nehir", depth: "0-10m", temp: "5-20°C", size: "150cm/30kg", season: "Mart-Haziran", protected: false, banned: false, desc: "Tatlı su turnası. Sazlık ve kamışlıklarda." },
  { id: 56, name: "Alabalık (Deniz)", latin: "Salmo trutta", type: "tatli", emoji: "🐟", habitat: "Akarsu", depth: "0-5m", temp: "5-18°C", size: "140cm/25kg", season: "Eylül-Kasım", protected: false, banned: false, desc: "Denize inen alabalık. Çok lezzetlidir." },
  { id: 57, name: "Sazan (Ayna)", latin: "Cyprinus carpio specularis", type: "tatli", emoji: "🐟", habitat: "Göl", depth: "0-10m", temp: "5-28°C", size: "80cm/20kg", season: "Nisan-Haziran", protected: false, banned: false, desc: "Ayna sazan. Göllerde yaygın." }
];

const FishUI = {
  currentFilter: 'all',
  render(list = FishDB) {
    const container = document.getElementById('fish-list');
    if (!container) return;
    if (!list.length) {
      container.innerHTML = `<div class="fish-empty">🔍 Sonuç bulunamadı<br><span>Farklı bir arama terimi veya filtre deneyin</span></div>`;
      return;
    }
    container.innerHTML = list.map(f => `
      <div class="fish-item" onclick="FishUI.openModal(${f.id})">
        <div class="fish-emoji">${f.emoji}</div>
        <div class="fish-info">
          <div class="fish-name">${f.name}</div>
          <div class="fish-latin">${f.latin}</div>
          <div class="fish-meta">${f.habitat} · ${f.depth} · ${f.temp}</div>
          <div class="fish-tags">
            <span class="fish-tag ${f.type}">${f.type === 'tatli' ? 'Tatlı Su' : 'Tuzlu Su'}</span>
            ${f.protected ? '<span class="fish-tag protected">Koruma Altında</span>' : ''}
            ${f.banned ? '<span class="fish-tag banned">Yasak Dönem</span>' : ''}
          </div>
        </div>
      </div>
    `).join('');
  },
  search(q) {
    q = q.toLowerCase().trim();
    const filtered = FishDB.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.latin.toLowerCase().includes(q) ||
      f.habitat.toLowerCase().includes(q)
    );
    this.render(filtered);
  },
  filter(type, btn) {
    this.currentFilter = type;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    let filtered = FishDB;
    if (type === 'tatli') filtered = FishDB.filter(f => f.type === 'tatli');
    if (type === 'tuzlu') filtered = FishDB.filter(f => f.type === 'tuzlu');
    if (type === 'protected') filtered = FishDB.filter(f => f.protected);
    if (type === 'banned') filtered = FishDB.filter(f => f.banned);
    this.render(filtered);
  },
  openModal(id) {
    const f = FishDB.find(x => x.id === id);
    if (!f) return;
    document.getElementById('modal-fish-name').textContent = f.name;
    document.getElementById('modal-fish-body').innerHTML = `
      <div class="fish-detail-emoji">${f.emoji}</div>
      <div class="fish-detail-row"><span class="label">Latin Adı</span><span class="value">${f.latin}</span></div>
      <div class="fish-detail-row"><span class="label">Habitat</span><span class="value">${f.habitat}</span></div>
      <div class="fish-detail-row"><span class="label">Derinlik</span><span class="value">${f.depth}</span></div>
      <div class="fish-detail-row"><span class="label">Sıcaklık</span><span class="value">${f.temp}</span></div>
      <div class="fish-detail-row"><span class="label">Boy/Ağırlık</span><span class="value">${f.size}</span></div>
      <div class="fish-detail-row"><span class="label">Sezon</span><span class="value">${f.season}</span></div>
      <div class="fish-detail-row"><span class="label">Durum</span><span class="value">${f.protected ? 'Koruma Altında' : f.banned ? 'Yasak Dönem' : 'Serbest'}</span></div>
      <div class="fish-detail-desc">${f.desc}</div>
    `;
    document.getElementById('fish-modal').classList.add('show');
  },
  closeModal(e) {
    if (!e || e.target === document.getElementById('fish-modal')) {
      document.getElementById('fish-modal').classList.remove('show');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => FishUI.render());
