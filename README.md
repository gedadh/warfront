# WARFRONT

Modern silahlı MMORTS (Massively Multiplayer Online Real-Time Strategy) oyunu.

## 🎮 Proje Hakkında

WARFRONT, modern savaş temalı, gerçek zamanlı strateji oyunudur. Oyuncular kendi üslerini kurar, ordularını yönetir ve diğer oyunculara karşı savaşır.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Auth:** NextAuth.js / Clerk (TBD)
- **Deploy:** Vercel

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

## 🏗️ Proje Yapısı

```
src/
├── app/           # Next.js App Router
├── components/    # React bileşenleri
├── lib/           # Utility fonksiyonları
└── types/         # TypeScript tip tanımları
```

## 🚀 Roadmap

### Phase 1: Foundation ✅
- [x] Next.js 15 + TypeScript + Tailwind v4 setup
- [ ] Supabase database schema
- [ ] Auth sistemi (Register/Login)

### Phase 2: Core Gameplay
- [ ] Harita sistemi
- [ ] Üs yönetimi
- [ ] Birim oluşturma
- [ ] Savaş mekanikleri

### Phase 3: Multiplayer
- [ ] Gerçek zamanlı senkronizasyon
- [ ] Matchmaking
- [ ] Liderlik tablosu

## 📄 Lisans

MIT License - [gedadh](https://github.com/gedadh)

---

**Not:** Bu proje geliştirme aşamasındadır.