# WARFRONT - Product Requirements Document v2.0

## 📋 Proje Özeti

**Tür:** Browser-Based MMO Modern Warfare Strategy Game  
**İlham:** Travian, OGame, Tribal Wars, Age of Empires  
**Tema:** Modern Warfare (Günümüz Silahları)  
**Platform:** Web (Mobile-first responsive)  
**Teknoloji:** Next.js 15 + TypeScript + Tailwind v4

---

## 🎯 Vizyon

"Travian/OGame ruhunu modern askeri teknolojilerle birleştirmek - Gerçek silahlar, gerçek ülkeler, stratejik derinlik."

---

## 🌍 Ülke Sistemi

### Oynanabilir Ülkeler (50 ülke)

**Tier 1 - Süper Güçler:**
| Ülke | Başlangıç Gücü | Güçlü Alan | Zayıf Alan |
|------|----------------|------------|------------|
| 🇺🇸 ABD | 8/10 | Hava Kuvvetleri | Kara Savunması |
| 🇷🇺 Rusya | 7.5/10 | Zırhlı Birlikler | Hava Teknolojisi |
| 🇨🇳 Çin | 7/10 | Üretim Hızı | Bireysel Teknoloji |

**Tier 2 - Bölgesel Güçler:**
| Ülke | Başlangıç Gücü | Güçlü Alan | Zayıf Alan |
|------|----------------|------------|------------|
| 🇬🇧 İngiltere | 7/10 | Deniz Kuvvetleri | Kara Hacmi |
| 🇫🇷 Fransa | 7/10 | Hava Savunması | Üretim Kapasitesi |
| 🇩🇪 Almanya | 7/10 | Tank Teknolojisi | Uzun Menzil |
| 🇯🇵 Japonya | 7/10 | Deniz Teknolojisi | Nükleer |
| 🇮🇳 Hindistan | 6.5/10 | Nüfus/Ordu | Teknoloji |
| 🇹🇷 Türkiye | 6.5/10 | Kara Kuvvetleri | Deniz Gücü |
| 🇰🇷 Güney Kore | 6.5/10 | Teknoloji | Kaynaklar |
| 🇮🇱 İsrail | 6/10 | Teknoloji | Nüfus/Üretim |
| 🇮🇷 İran | 5/10 | Füze Teknolojisi | Hava Kuvvetleri |
| 🇸🇦 Suudi Arabistan | 5/10 | Petrol/Bütçe | Yerel Üretim |

**Tier 3 - Diğer Ülkeler (38 ülke daha):**
Pakistan, Mısır, Endonezya, Brezilya, Arjantin, Meksika, Kanada, Avustralya, İtalya, İspanya, Polonya, Ukrayna, İsveç, Norveç, Hollanda, Belçika, Yunanistan, Romanya, Çekya, Macaristan, Finlandiya, Danimarka, Portekiz, Avusturya, İsviçre, Singapur, Tayland, Vietnam, Malezya, Filipinler, Nijerya, Güney Afrika, Cezayir, Fas, BAE, Katar, Kuveyt

### Her Ülkenin 1 Özel Birimi

| Ülke | Özel Birim | Açıklama |
|------|------------|----------|
| 🇺🇸 ABD | F-22 Raptor | En gelişmiş stealth savaş uçağı |
| 🇷🇺 Rusya | T-14 Armata | Yeni nesil ana muharebe tankı |
| 🇨🇳 Çin | DF-21D | Anti-gemi balistik füze |
| 🇹🇷 Türkiye | Bayraktar TB3 | Gelişmiş SİHA (Diğer ülkelerde yok) |
| 🇮🇱 İsrail | Iron Dome | Gelişmiş hava savunma sistemi |
| 🇮🇷 İran | Shahed-136 | Kamikaze drone |
| 🇬🇧 İngiltere | Queen Elizabeth Class | Süper uçak gemisi |
| 🇫🇷 Fransa | Rafale | Çok amaçlı savaş uçağı |
| 🇩🇪 Almanya | Leopard 3 | Gelişmiş ana muharebe tankı |
| 🇯🇵 Japonya | Izumo Class | Helikopter gemisi |

---

## 🔧 Kaynak Sistemi

### 5 Ana Kaynak

| Kaynak | Sembol | Kullanım |
|--------|--------|----------|
| 💵 **Para** | 💵 | Birim üretimi, bina inşaatı |
| 🛢️ **Petrol** | 🛢️ | Hava ve kara araçları |
| ⛏️ **Maden** | ⛏️ | Tank, silah üretimi |
| ⚡ **Elektronik** | ⚡ | Gelişmiş teknolojiler, füzeler |
| 🌾 **Gıda** | 🌾 | Ordu beslemesi, nüfus |

### Maden Alt Kategorileri

```
Maden (Genel) içinde:
├── 🪙 Gümüş (Elektronik için)
├── 🔶 Bakır (Kablo, elektronik)
├── ☢️ Uranyum (Nükleer, gelişmiş silahlar)
├── 🔩 Titanyum (Uçak gövdeleri)
├── 🔩 Çelik (Temel silahlar)
└── 🪨 Demir (Temel yapılar)
```

---

## ⚔️ Askeri Birimler Sistemi

### Hava Kuvvetleri

| Birim | Üretici | Diğer Ülkelerde Maliyet | Notlar |
|-------|---------|------------------------|--------|
| **F-16 Fighting Falcon** | 🇺🇸 ABD | 🇹🇷 $70M, 🇬🇧 $65M | Lisans üretimi |
| **F-35 Lightning II** | 🇺🇸 ABD | 🇬🇧 $85M, 🇯🇵 $90M | 5. nesil stealth |
| **F-22 Raptor** | 🇺🇸 ABD (ÖZEL) | ❌ Üretilemez | Sadece ABD |
| **Su-57 Felon** | 🇷🇺 Rusya (ÖZEL) | ❌ Üretilemez | Sadece Rusya |
| **J-20 Mighty Dragon** | 🇨🇳 Çin (ÖZEL) | ❌ Üretilemez | Sadece Çin |
| **Rafale** | 🇫🇷 Fransa | 🇮🇳 $75M | Lisans |
| **Eurofighter Typhoon** | 🇪🇺 Avrupa | 🇸🇦 $80M | Ortak üretim |
| **Bayraktar TB2** | 🇹🇷 Türkiye | 🇺🇦 $6M | SİHA |
| **Bayraktar TB3** | 🇹🇷 Türkiye (ÖZEL) | ❌ Üretilemez | Gemiye iniş yapabilen SİHA |
| **Shahed-136** | 🇮🇷 İran (ÖZEL) | ❌ Üretilemez | Kamikaze drone |
| **S-400 Triumf** | 🇷🇺 Rusya | 🇹🇷 $600M | Hava savunma |

### Kara Kuvvetleri

| Birim | Üretici | Diğer Ülkelerde Maliyet |
|-------|---------|------------------------|
| **M1A2 Abrams** | 🇺🇸 ABD | 🇸🇦 $12M |
| **Leopard 2A7** | 🇩🇪 Almanya | 🇹🇷 $8M |
| **T-90M** | 🇷🇺 Rusya | 🇮🇳 $4.5M |
| **T-14 Armata** | 🇷🇺 Rusya (ÖZEL) | ❌ Üretilemez |
| **Type 99** | 🇨🇳 Çin | ❌ İhracat yok |
| **Altay** | 🇹🇷 Türkiye | - | Yerli üretim |
| **Challenger 2** | 🇬🇧 İngiltere | 🇴🇲 $7M |
| **Leclerc** | 🇫🇷 Fransa | 🇦🇪 $10M |

### Deniz Kuvvetleri

| Birim | Üretici | Diğer Ülkelerde |
|-------|---------|-----------------|
| **USS Gerald Ford** | 🇺🇸 ABD (ÖZEL) | ❌ Üretilemez |
| **Queen Elizabeth** | 🇬🇧 İngiltere (ÖZEL) | ❌ Üretilemez |
| **Admiral Kuznetsov** | 🇷🇺 Rusya (ÖZEL) | ❌ Üretilemez |
| **Fırkateyn (ISTANBUL)** | 🇹🇷 Türkiye | - |
| **Denizaltı (GÜRDENİZ)** | 🇹🇷 Türkiye | - |

### Piyade Tipleri

| Birim | Açıklama |
|-------|----------|
| **Komando** | Özel kuvvetler (Türkiye güçlü) |
| **Marines** | Deniz piyadesi (ABD güçlü) |
| **Spetsnaz** | Rus özel kuvvetleri |
| **SAS** | İngiliz özel kuvvetleri |
| **Mossad** | İsrail istihbarat |

### Dronelar

| Birim | Üretici | Tip |
|-------|---------|-----|
| **MQ-9 Reaper** | 🇺🇸 ABD | İHA |
| **Bayraktar TB2** | 🇹🇷 Türkiye | SİHA |
| **Wing Loong** | 🇨🇳 Çin | İHA |
| **Orlan-10** | 🇷🇺 Rusya | Keşif |

### Hava Savunma

| Birim | Üretici |
|-------|---------|
| **Patriot PAC-3** | 🇺🇸 ABD |
| **S-400** | 🇷🇺 Rusya |
| **Iron Dome** | 🇮🇱 İsrail (ÖZEL) |
| **Hisar** | 🇹🇷 Türkiye |

---

## 📋 Birim Bilgi Kartı (Unit Card) Sistemi

Her birim için detaylı bilgi ekranı:

```
┌─────────────────────────────────────┐
│ 🖼️ [Birim Resmi - Gerçek Fotoğraf]  │
│                                     │
│ F-16 Fighting Falcon               │
│ 🇺🇸 ABD Hava Kuvvetleri            │
│─────────────────────────────────────│
│ ⚔️ Saldırı: ████████░░ 80          │
│ 🛡️ Savunma: ██████░░░░ 60          │
│ ⚡ Hız: ███████░░░ 70              │
│ 🎯 Menzil: ████████░░ 800          │
│ 💰 Maliyet: $60M (ABD)             │
│ 💰 Maliyet: $70M (Türkiye)         │
│ ⏱️ Üretim: 12 saat                 │
│─────────────────────────────────────│
│ 🏭 Menşei: 🇺🇸 ABD                  │
│ ⚠️ Lisans Üretimi                  │
│─────────────────────────────────────│
│ ✅ Avantajlar:                      │
│ • Çok amaçlı (hava-kara)           │
│ • Yüksek manevra                   │
│ • NATO uyumlu                      │
│                                     │
│ ❌ Dezavantajlar:                   │
│ • Hava savunmasına karşı zayıf     │
│ • Stealth değil                    │
│                                     │
│ 🎯 Karşı Avantajlar:               │
│ ✅ vs Helikopter: +30% hasar       │
│ ✅ vs Tank: +20% hasar             │
│ ✅ vs Piyade: +50% hasar           │
│ ❌ vs S-400: -40% etki             │
│ ❌ vs F-22: -25% kazanma şansı     │
│ ❌ vs Fırkateyn: -30% etki         │
└─────────────────────────────────────┘
```

---

## ⚖️ Oyun Dengesi Sistemi

### 1. Silah Tutarlılığı

**Kural:** Aynı silah tüm ülkelerde benzer güçte

```
F-16 Saldırı Gücü:
├── 🇺🇸 ABD: 80 (Temel)
├── 🇹🇷 Türkiye: 78 (Küçük fark)
├── 🇮🇱 İsrail: 82 (Modifikasyon bonus)
├── 🇬🇷 Yunanistan: 77 (Eski model)
└── Fark aralığı: ±5% max
```

### 2. Ülke Dengesi (Rock-Paper-Scissors)

| Ülke | Güçlü Olduğu | Zayıf Olduğu |
|------|--------------|--------------|
| 🇺🇸 ABD | Hava savaşları, teknoloji | Kara savunması, maliyet |
| 🇷🇺 Rusya | Zırhlı, füze | Hava teknolojisi, elektronik |
| 🇨🇳 Çin | Üretim hızı, sayı | Kalite, gelişmiş teknoloji |
| 🇹🇷 Türkiye | Kara savaşları, SİHA | Deniz, hava savunma |
| 🇮🇱 İsrail | Teknoloji, savunma | Sayı, kaynak |
| 🇮🇷 İran | Füze, drone | Hava kuvvetleri |

### 3. Birim Karşı Avantajları (Counter System)

| Birim | Güçlü Olduğu | Zayıf Olduğu |
|-------|--------------|--------------|
| ✈️ Savaş Uçağı | Helikopter, Tank, Piyade | SAM, Savaş Gemisi |
| 🚁 Helikopter | Piyade, Tank, Araç | Savaş Uçağı, SAM |
| 🛡️ SAM (S-400) | Uçak, Helikopter | Top, Komando |
| 🚢 Savaş Gemisi | Uçak, Sahil Savunması | Denizaltı |
| 🐋 Denizaltı | Savaş Gemisi, Konvoy | Fırkateyn, Helikopter |
| 🚛 Tank | Piyade, Araç, Bina | Helikopter, Anti-Tank |
| 🚶 Piyade | Anti-Tank, SAM, Komando | Tank, Helikopter |
| 🎯 Anti-Tank | Tank, Zırhlı | Piyade, Top |
| 🤖 Drone | Tank, Top, Keşif | SAM, Elektronik Savaş |

---

## 🏭 Dışa Bağımlılık Sistemi

### Lisans Üretim Maliyeti

**Kural:** Kendi üreticisi olmayan ülkeler %15-30 daha fazla öder

```
F-16 Örnek:
├── 🇺🇸 ABD (Üretici): $60M
├── 🇬🇧 İngiltere (NATO): $65M (+8%)
├── 🇯🇵 Japonya (Müttefik): $68M (+13%)
├── 🇹🇷 Türkiye (Lisans): $70M (+17%)
├── 🇸🇦 Suudi Arabistan: $75M (+25%)
└── 🇨🇳 Çin: ❌ Üretilemez (Envanter yok)
```

### Menşei Göstergesi

Her üretim ekranında:
```
🏭 Menşei: 🇺🇸 ABD
⚠️ Lisans Üretimi
💰 Ek Maliyet: +$10M
⏱️ Ek Süre: +2 saat
```

---

## 🔬 Teknoloji Geliştirme (R&D)

### Başlangıç vs Maksimum Güç

| Ülke | Başlangıç | Maksimum | Gap |
|------|-----------|----------|-----|
| 🇺🇸 ABD | 8/10 | 10/10 | 2 |
| 🇷🇺 Rusya | 7.5/10 | 10/10 | 2.5 |
| 🇨🇳 Çin | 7/10 | 10/10 | 3 |
| 🇹🇷 Türkiye | 6.5/10 | 10/10 | 3.5 |
| 🇮🇱 İsrail | 6/10 | 10/10 | 4 |
| 🇮🇷 İran | 5/10 | 9/10 | 4 |

### R&D Yolu

```
🔬 Araştırma Ağacı:
├── Temel Teknoloji (1-3 ay)
│   └── Maliyet: $100M
├── Orta Seviye (6-12 ay)
│   └── Maliyet: $500M
├── İleri Teknoloji (1-2 yıl)
│   └── Maliyet: $2B
└── Kendi Tasarım (2-5 yıl) ⭐
    └── Maliyet: $5B+
    └── Sonuç: Dışa bağımlılık azalır

Örnek: Türkiye Bayraktar Geliştirme
├── Aşama 1: Temel SİHA Teknolojisi (6 ay, $200M)
├── Aşama 2: Gelişmiş Sensörler (1 yıl, $300M)
├── Aşama 3: Silah Entegrasyonu (1 yıl, $400M)
└── Sonuç: Bayraktar TB2 (Kendi üretim, satılabilir)
```

---

## 💰 Oyun İçi Ticaret Sistemi

### İhracat Paneli

```
📦 İhracat Paneli:
┌────────────────────────────────────┐
│ Ürün: Bayraktar TB2                │
│ 🏭 Üretici: 🇹🇷 Türkiye             │
│ 💰 Üretim Maliyeti: $5M            │
│ 🏷️ Satış Fiyatı: $8M               │
│ 📊 Kar: $3M                        │
│────────────────────────────────────│
│ Talep Eden Ülkeler:                │
│ 🇺🇦 Ukrayna: Yüksek talep          │
│ 🇦🇿 Azerbaycan: Orta talep          │
│ 🇵🇰 Pakistan: Düşük talep           │
│────────────────────────────────────│
│ ⏱️ Teslimat: 7 gün                 │
│ 🚚 Nakliye: $0.5M                  │
└────────────────────────────────────┘
```

### Ticaret Kuralları

| Kural | Açıklama |
|-------|----------|
| Sadece kendi üretimi | Başkasının lisansı satılamaz |
| Ambargo | Düşman ülkelere satış yasak |
| Talep Dinamikleri | Savaş durumunda artar |
| Mesafe | Uzak ülkelere nakliye pahalı |

---

## 🎨 Görsel Tutarlılık

### Stil Seçimi

**Seçilen Stil:** Gerçek Fotoğraf / 3D Render

**Kurallar:**
- Tüm birimler için TUTARLI görsel tarz
- Ya hepsi gerçek fotoğraf, ya hepsi 3D render
- Karikatür/çizim KULLANILMAYACAK
- Kaynak: Wikimedia Commons, askeri arşivler, stock fotoğraflar

### Görsel Kaynakları

| Birim | Kaynak |
|-------|--------|
| F-16 | USAF resmi fotoğrafları |
| Bayraktar TB2 | Baykar resmi görselleri |
| Tanklar | Üretici firma görselleri |
| Gemiler | Deniz kuvvetleri arşivleri |

---

## 🌐 Dil Desteği (i18n)

### Desteklenen Diller (10 dil)

| Dil | Kod | Öncelik | Notlar |
|-----|-----|---------|--------|
| 🇬🇧 İngilizce | `en` | DEFAULT | Ana dil |
| 🇹🇷 Türkçe | `tr` | Yüksek | Ana pazar |
| 🇷🇺 Rusça | `ru` | Yüksek | Büyük pazar |
| 🇨🇳 Çince | `zh` | Yüksek | Büyük pazar |
| 🇪🇸 İspanyolca | `es` | Yüksek | Latin Amerika |
| 🇧🇷 Portekizce | `pt` | Yüksek | Brezilya |
| 🇩🇪 Almanca | `de` | Orta | Avrupa |
| 🇫🇷 Fransızca | `fr` | Orta | Afrika/Europa |
| 🇯🇵 Japonca | `ja` | Orta | Japonya |
| 🇰🇷 Korece | `ko` | Orta | Güney Kore |

### UI Metinleri

```
Örnek (Unit Card):
en: "Attack Power"
tr: "Saldırı Gücü"
ru: "Сила атаки"
zh: "攻击力"
es: "Poder de ataque"
```

---

## 🚀 Geliştirme Fazları

### Phase 1: MVP (3-4 hafta)
- [ ] Repo oluştur (Next.js 15 + TS + Tailwind)
- [ ] Supabase projesi kur
- [ ] Auth sistemi (register/login)
- [ ] Ülke seçimi ekranı (50 ülke)
- [ ] Temel UI layout
- [ ] 1 ülke, 5 birim test

### Phase 2: Core (4-6 hafta)
- [ ] 50 ülke tam implementasyon
- [ ] Tüm birimler (gerçek verilerle)
- [ ] Dışa bağımlılık sistemi
- [ ] Birim bilgi kartları
- [ ] Savaş sistemi (Counter mekanikleri)
- [ ] Harita sistemi

### Phase 3: Economy (3-4 hafta)
- [ ] Kaynak üretimi (5 kaynak)
- [ ] R&D sistemi
- [ ] Ticaret sistemi
- [ ] Bina inşaatı
- [ ] Level atlama

### Phase 4: Social (2-3 hafta)
- [ ] İttifak sistemi
- [ ] Chat
- [ ] Sıralama
- [ ] Diplomasi

### Phase 5: Polish (2 hafta)
- [ ] i18n (10 dil)
- [ ] Animasyonlar
- [ ] Ses efektleri
- [ ] Mobile responsive
- [ ] Performans optimizasyonu

---

## 🛠️ Teknoloji Stack

### Frontend
| Teknoloji | Versiyon | Amaç |
|-----------|----------|------|
| Next.js | 15.x | App Router, SSR |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Zustand | 5.x | State management |
| Framer Motion | 11.x | Animasyonlar |
| Socket.io-client | 4.x | Real-time |
| next-intl | 3.x | i18n |

### Backend
| Teknoloji | Amaç |
|-----------|------|
| Next.js API Routes | REST API |
| Socket.io | Real-time events |
| Supabase | Database + Auth |
| Redis | Cache + Session |
| Vercel | Deployment |

---

## 📁 Dosya Yapısı

```
projects/game-team/warfront/
├── PRD.md (Bu dosya)
├── docs/
│   ├── COUNTRIES.md (50 ülke detayları)
│   ├── UNITS.md (Tüm birimler)
│   ├── ECONOMY.md (Ekonomi sistemi)
│   ├── TECH_TREE.md (R&D ağacı)
│   ├── BALANCE.md (Oyun dengesi)
│   ├── COUNTER_MATRIX.md (Avantaj tablosu)
│   └── VISUAL_GUIDE.md (Görsel standartlar)
├── src/ (Kod)
└── assets/ (Görseller)
```

---

## ⚠️ Önemli Notlar

1. **Demo sürüm:** Dummy verilerle çalışacak
2. **API Key:** Çağdaş'tan istenecek (Supabase, Redis)
3. **Görseller:** Telifsiz/royalty-free kaynaklardan
4. **Ülke verileri:** Gerçek askeri veriler referans alınacak
5. **Mimari değişiklik:** Onay gerekli

---

*Son güncelleme: 2026-03-14 01:55*
*Versiyon: 2.0 - Çağdaş'ın geri bildirimleri dahil edildi*
*Hazırlayan: Kaaz 🐱*