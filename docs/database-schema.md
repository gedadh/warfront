# WARFRONT Database Schema

## 📊 Supabase (PostgreSQL) Schema Planı

### Tablolar

#### 1. `users` - Kullanıcı Tablosu
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

#### 2. `bases` - Üs Tablosu
```sql
CREATE TABLE bases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  resources JSONB DEFAULT '{"gold": 1000, "oil": 500, "steel": 200}',
  position_x INTEGER NOT NULL,
  position_y INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bases_user_id ON bases(user_id);
CREATE INDEX idx_bases_position ON bases(position_x, position_y);
```

#### 3. `buildings` - Bina Tipleri
```sql
CREATE TABLE building_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  description TEXT,
  max_level INTEGER DEFAULT 10,
  base_cost JSONB NOT NULL, -- {"gold": 100, "oil": 50}
  upgrade_multiplier DECIMAL(3,2) DEFAULT 1.5,
  production JSONB, -- {"gold_per_hour": 100}
  requirements JSONB -- {"level": 1, "buildings": {"command_center": 2}}
);

CREATE TABLE base_buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_id UUID NOT NULL REFERENCES bases(id) ON DELETE CASCADE,
  building_type_id UUID NOT NULL REFERENCES building_types(id),
  level INTEGER DEFAULT 1,
  position_x INTEGER NOT NULL,
  position_y INTEGER NOT NULL,
  is_constructing BOOLEAN DEFAULT false,
  construction_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_base_buildings_base_id ON base_buildings(base_id);
```

#### 4. `units` - Birim Sistemi
```sql
CREATE TABLE unit_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  category VARCHAR(30) NOT NULL, -- infantry, vehicle, aircraft, special
  description TEXT,
  attack INTEGER NOT NULL,
  defense INTEGER NOT NULL,
  speed INTEGER NOT NULL,
  range INTEGER NOT NULL,
  cost JSONB NOT NULL, -- {"gold": 100, "oil": 50}
  training_time INTEGER NOT NULL, -- seconds
  requirements JSONB -- {"barracks_level": 2}
);

CREATE TABLE base_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_id UUID NOT NULL REFERENCES bases(id) ON DELETE CASCADE,
  unit_type_id UUID NOT NULL REFERENCES unit_types(id),
  quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_base_units_base_id ON base_units(base_id);
```

#### 5. `battles` - Savaş Sistemi
```sql
CREATE TABLE battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attacker_base_id UUID NOT NULL REFERENCES bases(id),
  defender_base_id UUID NOT NULL REFERENCES bases(id),
  attacker_units JSONB NOT NULL, -- [{"unit_id": "uuid", "quantity": 10}]
  defender_units JSONB NOT NULL,
  result VARCHAR(20) NOT NULL, -- attacker_win, defender_win, draw
  attacker_losses JSONB,
  defender_losses JSONB,
  loot JSONB, -- {"gold": 500, "oil": 200}
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER
);

CREATE INDEX idx_battles_attacker ON battles(attacker_base_id);
CREATE INDEX idx_battles_defender ON battles(defender_base_id);
CREATE INDEX idx_battles_started ON battles(started_at);
```

#### 6. `alliances` - İttifak Sistemi
```sql
CREATE TABLE alliances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  tag VARCHAR(5) NOT NULL UNIQUE,
  description TEXT,
  leader_id UUID NOT NULL REFERENCES users(id),
  level INTEGER DEFAULT 1,
  member_count INTEGER DEFAULT 1,
  max_members INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE alliance_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alliance_id UUID NOT NULL REFERENCES alliances(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member', -- leader, officer, member
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(alliance_id, user_id)
);

CREATE INDEX idx_alliance_members_user ON alliance_members(user_id);
CREATE INDEX idx_alliance_members_alliance ON alliance_members(alliance_id);
```

#### 7. `map_tiles` - Harita Sistemi
```sql
CREATE TABLE map_tiles (
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  terrain VARCHAR(20) NOT NULL, -- plains, forest, mountain, water, desert
  resource_bonus JSONB, -- {"gold": 1.2, "oil": 1.0}
  base_id UUID REFERENCES bases(id),
  is_spawn_point BOOLEAN DEFAULT false,
  PRIMARY KEY (x, y)
);

CREATE INDEX idx_map_tiles_base ON map_tiles(base_id);
```

---

## 🔐 Row Level Security (RLS) Politikaları

```sql
-- Users: Sadece kendi verilerini görebilir
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Bases: Sadece sahibi değiştirebilir, herkes görebilir
ALTER TABLE bases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bases are viewable by everyone" ON bases
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own bases" ON bases
  FOR ALL USING (user_id = auth.uid());
```

---

## 🚀 Supabase Kurulum Adımları

### 1. Proje Oluşturma
1. https://supabase.com adresine git
2. "New Project" tıkla
3. Proje adı: `warfront`
4. Region: `EU-West` (en yakın)
5. Database password oluştur ve kaydet
6. Plan: Free tier

### 2. API Keys
- `SUPABASE_URL`: Settings > API > Project URL
- `SUPABASE_ANON_KEY`: Settings > API > anon public key
- `SUPABASE_SERVICE_KEY`: Settings > API > service_role key (gizli!)

### 3. Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 4. Supabase CLI (Opsiyonel)
```bash
npm install -g supabase
supabase login
supabase link --project-ref your_project_ref
supabase db push
```

---

## 📝 Notlar

- Free tier: 500MB database, 1GB storage, 50k monthly active users
- RLS (Row Level Security) mutlaka aktif edilmeli
- Migration'lar versiyonlanmalı
- Backup almayı unutma!

---

*Bu şema WARFRONT MVP için tasarlanmıştır. İleride genişletilebilir.*