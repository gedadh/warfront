# WARFRONT - Oyun Tasarım Dokümanı (GDD)

**Versiyon:** 1.0  
**Tarih:** 2026-03-14  
**Yazar:** Game Design Team  
**Durum:** Draft → MVP Development

---

## 📖 Overview

### Elevator Pitch
WARFRONT, zamanda yolculuk eden bir tarihçi kaşifin, tarihin kritik anlarına tanık olduğu ve bu anları kurtarmak için bulmacalar çözdüğü 2D puzzle-adventure oyunudur. Oyuncu, geçmişe seyahat ederek tarihi olayları doğru akışına yönlendirmeli ve zaman çizelgesini korumalıdır.

### Özet
Dr. Elara Vance, 1923'te kaybolan dedesinin icat ettiği zaman makinesini keşfeder. Bu makine, tarihin "kırık noktalarını" tespit eder - tarihin yanlış akıştığı anlar. Elara, bu anlara seyahat ederek bulmacalar çözer, tarihi olayları düzeltir ve zaman çizelgesini onarır. Her dönem, benzersiz görsel tarz, mekanik ve atmosfer sunar.

### Benzersiz Satış Noktaları (USP)
- **Zaman Çapellari:** Her dönem kendi bulmaca mekanikleriyle farklı oynanış sunar
- **Tarihi Doğruluk + Fantastik Dokunuş:** Gerçek tarihi olaylar, hafif fantastik unsurlarla
- **Dokunmatik-First Design:** Mobil için optimize edilmiş, web'de de mükemmel deneyim
- **Hikaye + Puzzle Dengesi:** Hem hikaye sevenler hem de puzzle sevenler için

### Hedef Kitle
- **Birincil:** 12-25 yaş, mobil oyun sevenler, puzzle-venture sevenler
- **İkincil:** Tarih meraklıları, hikaye odaklı oyun sevenler
- **Platform:** Web (PWA) + iOS/Android (Capacitor)

### Benzer Oyunlar (Referanslar)
- *Monument Valley* - Minimalist puzzle, görsel şiirlik
- *Gorogoa* - Hikaye + bulmaca birleşimi
- *The Room* - Dokunmatik bulmaca mekanikleri
- *Braid* - Zaman mekaniği

---

## 🎭 Story & Setting

### Ana Karakter: Dr. Elara Vance

**Arka Plan:**
- 28 yaşında tarih doktoru
- Antik çağlardan modern döneme kadar geniş tarih bilgisi
- Dedesi Prof. Marcus Vance, 1923'te gizemli bir şekilde kayboldu
- Aile mirası olan eski konağında zaman makinesini keşfeder

**Kişilik:**
- Meraklı, zeki, kararlı
- Tarihe saygı duyan ama bazen risk alan
- İçsel çatışma: Tarihi mi korumalı, yoksa dedesini mi kurtarmalı?

**Görünüm:**
- Koyu kahverengi saç, toplanmış pratik şekilde
- Gözlük, ceket, çok cepli pantolon (kaşif görünümü)
- Sırtında zaman makinesinin taşınabilir versiyonu (quantum sarkacı)

### Yan Karakterler

**ARIA (Augmented Reality Intelligence Assistant)**
- Zaman makinesinin AI asistanı
- Tarihi bilgi sağlar, ipuçları verir
- Hafif mizahi, bazen aşırı gerçekçi

**Prof. Marcus Vance (Flashback'ler)**
- Elara'nın dedesi
- Ses kayıtları ve notlar üzerinden hikaye anlatır
- Gizemli kayboluşu, ana hikayenin merkezinde

**Zaman Muhafızları (Antagonistler)**
- Zamanda anomaliler yaratan gölge varlıklar
- Tarihin yanlış akmasını sağlarlar
- Her bölümün sonunda boss fight yerine "zaman onarımı" sequence

### Hikaye Akışı

**Prologue (Tutorial)**
- Elara konağa gelir, dedesinin laboratuvarını keşfeder
- Zaman makinesini aktive eder, ilk seyahat (kazara)
- Tutorial: Temel mekanikleri öğrenir

**Chapter 1: Mısır, 1330 BCE - Tutankhamun'un Laneti**
- Tarihi olay: Firavunun erken ölümü engellenmeli
- Puzzle odaklı: Tapınak bulmacaları, hiyeroglifler

**Chapter 2: Roma, 44 BCE - İdalar'da Suikast**
- Tarihi olay: Caesar suikastını engellemek değil, doğru şekilde gerçekleşmesini sağlamak
- Politika + gizem unsurları

**Chapter 3: Konstantinopolis, 1204 CE - Dördüncü Haçlı Seferi**
- Tarihi olay: Şehrin yağmalanması, kütüphanelerin korunması
- Kaçış + bulmaca

**Chapter 4: İstanbul, 1453 CE - Fethin Gecesi**
- Tarihi olay: Şehrin düşüşü, barışçıl geçiş sağlanmalı
- Stratejik bulmacalar

**Chapter 5: Londra, 1666 CE - Büyük Yangın**
- Tarihi olay: Yangının kontrolsüz yayılması
- Fizik tabanlı bulmacalar (ateş mekaniği)

**Epilogue**
- Dedesinin kayboluşuyla ilgili truth reveal
- Zaman çizelgesi korundu, ama bir trade-off

### Atmosfer & Ton

**Genel Ton:**
- Hayranlık uyandıran (sense of wonder)
- Hafif melankolik (geçmişe duygu)
- Gizemli (zaman paradox'ları)
- Umut verici (tarihi koruma)

**Görsel Atmosfer:**
- Her dönem kendi renk paleti
- Altın tonlar (Mısır), mermer beyazları (Roma), gece mavisi (İstanbul)
- Zaman yolculuğu sırasında "glitch" efektleri

---

## 🎮 Gameplay Mechanics

### Core Loop

```
Zaman Makinesi Hub → Dönem Seçimi → Bölüm Girişi → 
Bulmacalar Çöz → Hikaye Parçaları Topla → 
Dönem Tamamla → Hub'a Dön → Sonraki Dönem
```

### Zaman Yolculuğu Sistemi

**Hub: Vance Konağı**
- Ana menü ve seviye seçimi
- Zaman makinesi konsolu
- Toplanan artifact'ler sergilenir
- ARIA ile etkileşim

**Zaman Enerjisi (Time Energy)**
- Her seyahat enerji tüketir
- Enerji zamanla dolar (real-time) veya artifact ile doldurulur
- MVP'de bu sistem basit veya yok (premium feature)

**Quantum Sarkaç (Cihaz)**
- Elara'nın ana aracı
- Zamanı yavaşlatabilir (slow-mo bulmacalar)
- Nesneleri "zamanda sabitleyebilir"
- Upgrade edilebilir (ilerleyen bölümlerde)

### Bulmaca Mekanikleri

**1. Manipülasyon Bulmacaları**
- Nesneleri sürükle-bırak, döndür
- Aynalar, prizmalar, mekanikler
- Örnek: Işık huzmelerini yansıtma

**2. Zaman Bulmacaları**
- Zamanı geri sar (limitli)
- Paralel zaman çizelgeleri (split-screen)
- Örnek: Kapıyı geçmişte aç, şimdide geç

**3. Çevresel Bulmacalar**
- Sıralı etkileşimler
- Gizli geçitler
- Örnek: Doğru sırayla tuşlara basma

**4. Mantık Bulmacaları**
- Şifre çözme, kombinasyon
- Tarihi bilgi gerektiren bulmacalar
- Örnek: Roma rakamları, hiyeroglif eşleştirme

**5. Gizlilik Bulmacaları**
- Nöbetçilerden kaçınma
- Timing-based hareketler
- Örnek: Bekçilerin rotasını takip etme

### Dokunmatik Kontroller

**Temel Etkileşimler:**
```
Tap → Seç / İncele
Tap & Hold → Sürükle
Two-finger Pinch → Zoom
Two-finger Rotate → Döndürme
Swipe → Kaydırma (harita)
Double Tap → Hızlı aksiyon
```

**Zaman Mekaniği (Quantum Sarkaç):**
```
Hold → Zamanı yavaşlat (radius göstergesi)
Drag → Zamanda sabitleme alanı oluştur
Release → Etkiyi uygula
```

**UI/UX İlkeleri:**
- Minimal HUD, bağlamsal ipuçları
- Büyük touch hedefleri (min 44x44pt)
- Haptic feedback (mobil)
- Erişilebilirlik: Renk körlüğü modu, yazı boyutu ayarı

### İpucu Sistemi

**ARIA'dan İpuçları:**
- 3 seviye: Subtle → Direct → Solution
- Her ipucu puan kaybettirir (optional leaderboard için)
- MVP'de sınırsız ipucu

### Kayıt Sistemi

**Checkpoint'ler:**
- Her bulmaca sonrası otomatik kayıt
- Manuel kayıt yok (mobil için optimize)
- Cloud save (PWA sync)

---

## 🏰 Levels & Progression

### Bölüm Yapısı

**Her Bölüm İçeriği:**
- 1 Story Intro (cinematic)
- 8-12 Puzzle Room
- 1-2 Hidden Artifact
- 1 Boss Sequence (zaman onarımı)
- 1 Story Outro

**Süre:**
- Her bölüm: 30-45 dakika
- Toplam oyun: 5-6 saat (MVP: 2-3 saat)

### İlerleme Sistemi

**1. Linear Progression**
- Bölümler sırayla açılır
- Her bölüm tamamlanınca sonraki açılır

**2. Artifact Collection**
- Her bölümde gizli artifact'ler
- Collection hub'da sergilenir
- Lore/backstory açar

**3. ARIA Güncellemeleri**
- Bölümler arası hikaye konuşmaları
- Karakter gelişimi

**4. Achievement System**
- "Speed Run" - Bölümü hızlı bitir
- "No Hints" - İpucu kullanmadan
- "Collector" - Tüm artifact'leri bul
- "Historian" - Tarih notlarını oku

### Zorluk Ayarı

**Adaptive Difficulty:**
- Başarısız girişim sonrası ipuçları güçlenir
- Hızlı çözenler için ek challenge'lar

**Difficulty Modes (Post-MVP):**
- Story Mode: Kolay, hikaye odaklı
- Puzzle Mode: Normal, dengeli
- Historian Mode: Zor, az ipucu

---

## 🎨 Art Style

### Görsel Tarz

**Genel Estetik:**
- **Hand-painted, 2D illustrative**
- 2.5D depth (katmanlı paralaks)
- Stylized realism (foto-realistik değil)
- Hafif "storybook" hissi

**Renk Paleti:**
- Her dönem kendi paleti
- Hub: Sepia tonlar, sıcak ahşap
- Zaman yolculuğu: Mavi-mor glitch efektleri

**Örnek Dönem Paletleri:**
```
Mısır: Altın, kum, turkuaz, lacivert
Roma: Mermer beyazı, kırmızı, altın
Konstantinopolis: Mor, altın, koyu mavi
İstanbul 1453: Yeşil, altın, gece mavisi
Londra 1666: Turuncu, kırmızı, siyah (yangın)
```

### Karakter Design

**Elara:**
- Clean lines, belirgin siluet
- Gözlük, ceket, çok cepli pantolon
- Expresif yüz animasyonları
- Walking/idle/investigation pozları

**NPC'ler:**
- Siluet veya hafif detaylı
- Tarihi doğruluk ama stilize
- Antagonistler: Gölge figürler, parlama efektleri

### Environment Art

**Teknik:**
- 1920x1080 base resolution
- Layered parallax (3-5 katman)
- Animated elements (su, ateş, yaprak)
- Particle effects (toz, ışık)

**Perspektif:**
- 3/4 view veya side-view (bölüme göre)
- Flat art with depth layers

### UI Design

**HUD:**
- Minimal, diegetik (oyun dünyasının parçası)
- Quantum sarkaç göstergesi
- Bölüm ilerleme göstergesi
- Menü butonları (köşelerde)

**Font:**
- Display: Serif, klasik (başlıklar)
- Body: Sans-serif, okunabilir
- Tür: Google Fonts veya custom

### Asset Üretim

**MVP İçin:**
- Placeholder art → Final art
- Procedural veya hand-drawn
- Asset store kullanımı (budget varsa)

**Tools:**
- Aseprite (pixel/hand-painted)
- Photoshop/Procreate
- Figma (UI)

---

## 🔊 Audio

### Müzik

**Genel Yaklaşım:**
- Orkestral + period instruments
- Her dönem kendi müzik tarzı
- Dynamic music (adaptif)

**Dönem Müzikleri:**
```
Mısır: Harp, flüt, hafif choral
Roma: Brass, percussion, strings
Konstantinopolis: Bizans choral, strings
İstanbul: Oud, ney, percussion
Londra: Baroque organ, strings
Hub: Piano, ambient
```

**Müzik Sistemi:**
- Exploration: Sakin, atmosferik
- Puzzle Active: Daha aktif
- Danger/Tension: Dramatik
- Success: Uplifting stinger

### Ses Efektleri

**Kategoriler:**
1. **UI Sounds:** Tıklama, hover, success, error
2. **Ambience:** Çevre sesleri (su, rüzgar, kalabalık)
3. **Puzzle Sounds:** Mekanik sesler, aksesuarlar
4. **Time Effects:** Zaman yavaşlama, glitch
5. **Character:** Elara ayak sesleri, nefes

**Zaman Efektleri:**
- Zaman yavaşlama: Low-pass filter + reverb
- Zaman yolculuğu: Whoosh + glitch + reverse sounds

### Voice Acting

**MVP:** Voice acting yok
**Post-MVP:**
- Elara: Türkçe + İngilizce (opsiyonel)
- ARIA: Sentetik ses (TTS veya voice actor)

### Teknik

**Format:** MP3/OGG (compressed), WAV (short SFX)
**Implementation:** 
- Phaser.js audio system
- Web Audio API (advanced features için)
- Spatial audio (opsiyonel)

---

## 💰 Monetization

### MVP Stratejisi

**Ücretsiz (Free-to-Play):**
- İlk bölüm ücretsiz
- Kalan bölümler tek seferlik satın alma

**Premium (Buy-to-Play):**
- Tam oyun tek fiyat
- DLC bölümler (post-launch)

### Premium Model (Önerilen)

**Fiyatlandırma:**
- Mobil: $4.99 - $6.99
- Web: $4.99 (PayPal/Stripe)

**Neden Premium?**
- Puzzle-venture hedef kitlesi premium'a açık
- Ads deneyimi bozar
- Simpler development

### Alternative: Freemium

**Free:**
- İlk 2 bölüm ücretsiz
- Reklamsız, IAP yok

**Paid:**
- Kalan bölümler ($3.99 - $5.99)
- Ya da bölüm başına ($0.99)

### Post-MVP Revenue

**DLC Bölümler:**
- Yeni tarihi dönemler
- $1.99 - $2.99 per chapter

**Cosmetic (Low Priority):**
- Elara skin'leri
- Artifact display themes

### Analytics

**Metrikler:**
- Bölüm tamamlama oranı
- Churn point'leri
- Average session length
- Hint usage

**Tools:**
- Google Analytics veya GameAnalytics
- PWA: Service Worker tracking

---

## ⚙️ Technical Constraints

### Platform Gereksinimleri

**Web (PWA):**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Service Worker support
- Offline play (cached assets)
- Responsive: 320px - 1920px width

**Mobil (Capacitor):**
- iOS 13+
- Android 6.0+ (API 23)
- Touch controls primary
- Portrait & Landscape (auto-rotate)

### Teknoloji Stack

**Engine:** Phaser.js 3.x
**Language:** TypeScript
**Build:** Vite or Webpack
**Wrapper:** Capacitor (mobil için)
**State Management:** Custom or Zustand

**Dependencies:**
```json
{
  "phaser": "^3.70.0",
  "typescript": "^5.x",
  "vite": "^5.x",
  "@capacitor/core": "^6.x",
  "@capacitor/android": "^6.x",
  "@capacitor/ios": "^6.x"
}
```

### Performans Hedefleri

**Load Time:**
- Initial load: < 5 seconds (3G)
- Scene transition: < 2 seconds
- Asset streaming enabled

**Runtime:**
- 60 FPS target
- < 100MB RAM (mobile)
- Battery efficient

**Asset Size:**
- Total game: < 100MB (MVP)
- Per scene: < 10MB
- Audio: < 20MB total

### Save System

**Local:**
- localStorage (web)
- SQLite (mobile - Capacitor)

**Cloud (Post-MVP):**
- Firebase or custom backend
- Cross-platform sync

### Accessibility

**Gereksinimler:**
- Renk körlüğü modu (color blind mode)
- Subtitle için tüm sesler
- Text size ayarı
- Reduced motion option
- Screen reader support (partial)

### Localization

**MVP:**
- İngilizce (default)
- Türkçe

**Post-MVP:**
- Çoklu dil desteği
- i18n sistemi

---

## 🎯 MVP Scope

### MVP Hedefleri

**Tamamlanmış Özellikler:**
- ✅ Tutorial (Prologue)
- ✅ 2 Full Chapters (Mısır + Roma veya İstanbul)
- ✅ 15-20 Puzzle (chapter başına 8-10)
- ✅ Core mechanics (manipülasyon + zaman bulmacaları)
- ✅ Basic story + 1 artifact per chapter
- ✅ Hub (basit)
- ✅ Web PWA deploy
- ✅ Android APK (Capacitor)

**MVP'de YOK (Post-MVP):**
- ❌ iOS (App Store süreci uzun)
- ❌ Voice acting
- ❌ Cloud save
- ❌ Multiple difficulty modes
- ❌ All 5 chapters (2-3 yeterli)
- ❌ DLC system
- ❌ Analytics (basic entegrasyon)

### MVP Timeline (Önerilen)

**Phase 1: Core (4 hafta)**
- Project setup (Phaser + TS + Vite)
- Basic game loop
- Tutorial chapter
- 5 puzzle prototypes

**Phase 2: Content (6 hafta)**
- 2 chapters full content
- Story integration
- Art production
- Audio implementation

**Phase 3: Polish (3 hafta)**
- Bug fixes
- Performance optimization
- PWA setup
- Android build

**Phase 4: Launch (1 hafta)**
- Testing
- Web deploy
- APK distribution

**Toplam: ~14 hafta (3.5 ay)**

---

## 📋 Appendices

### A. Puzzle Ideas (Örnekler)

**Mısır Bölümü:**
1. Işık huzmesi puzzle (aynalarla yansıtma)
2. Hiyeroglif eşleştirme
3. Su seviyesi puzzle (kapiler etki)
4. Tapınak kapısı kombinasyon
5. Kum saat timing puzzle
6. Gölge boyutu puzzle

**Roma Bölümü:**
1. Archimedes aynaları (ışık odaklama)
2. Su kemeri akış puzzle
3. Gladyatör arena sıralama
4. Caesar şifresi çözme
5. Senate voting puzzle
6. Mosaic restoration

### B. Reference Links

- Phaser.js 3 Documentation: https://photonstorm.github.io/phaser3-docs/
- Capacitor Docs: https://capacitorjs.com/docs
- Monument Valley Art: https://www.ustwogames.co/games/monument-valley/
- PWA Guidelines: https://web.dev/progressive-web-apps/

### C. Art References

- *Monument Valley* - Minimalist environment
- *Gorogoa* - Hand-painted style
- *The Banner Saga* - Character art
- *Child of Light* - Atmosphere & lighting

---

## 📝 Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-03-14 | Initial GDD creation | Game Design Team |

---

*Bu doküman WARFRONT oyununun tasarım rehberidir. Geliştirme sırasında güncellenecektir.*