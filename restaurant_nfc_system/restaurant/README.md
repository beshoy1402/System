# 🍽️ Flavor House — NFC Restaurant Ordering System

> Apple-level UI · Three.js 3D hero · GSAP animations · Supabase real-time backend

## 🗂️ File Structure

```
/restaurant
├── frontend/
│   ├── index.html       ← Customer ordering website
│   └── app.js           ← App logic (GSAP, Three.js, Supabase)
├── admin/
│   ├── admin.html       ← Admin dashboard
│   └── admin.js         ← Dashboard logic (charts, CRUD, realtime)
├── shared/
│   └── supabase.js      ← Supabase config + full API layer
├── supabase.sql         ← Full DB schema (for reference)
└── README.md
```

## 🗄️ Supabase Setup (Already Done for You)

The database is already configured at:
- **URL:** `https://ddjmhwjefduddcocapgz.supabase.co`
- **Tables:** `menu_items`, `orders`, `categories`, `restaurant_settings`, `coupons`, `restaurant_tables`
- **RLS:** Enabled with proper policies
- **Realtime:** Enabled on orders and menu_items

### Create Admin User

1. Go to **Supabase Dashboard → Authentication → Users**
2. Click **"Add user"** → Invite user
3. Enter your email and password
4. Use those credentials to log into the admin panel

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create GitHub Repo

```bash
# Install GitHub CLI or use the web UI
gh auth login
gh repo create flavor-house --public
```

### Step 2 — Push all files

```bash
cd /path/to/restaurant
git init
git add .
git commit -m "🍽️ Launch Flavor House"
git remote add origin https://github.com/YOUR-USERNAME/flavor-house.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / Folder: **/ (root)**
4. Save → wait ~1 minute
5. Visit: `https://YOUR-USERNAME.github.io/flavor-house/frontend/`
6. Admin: `https://YOUR-USERNAME.github.io/flavor-house/admin/admin.html`

---

## 🚀 Deploy to Vercel (Recommended — Faster)

```bash
npm i -g vercel
cd /path/to/restaurant
vercel --prod
```

Or drag-and-drop the folder at [vercel.com/new](https://vercel.com/new)

---

## 📱 NFC Setup (Real Tables)

1. Buy **NFC stickers** (NTAG213, ~$0.30 each on Amazon)
2. Install **NFC Tools** app (Android/iOS)
3. For each table, write URL:
   ```
   https://your-domain.com/frontend/index.html?table=5
   ```
4. Stick to table
5. Customer taps → browser opens → auto-detected table

---

## 🔑 API Keys (In `shared/supabase.js`)

```javascript
const SUPABASE_URL = 'https://ddjmhwjefduddcocapgz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGci...'; // Anon key — safe to expose
```

The **anon key** is safe for frontend use — Supabase RLS policies restrict what it can do.
Never expose your **service_role** key in frontend code.

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| UI Animations | GSAP 3.12 + ScrollTrigger |
| 3D Hero | Three.js r128 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime subscriptions |
| Charts | Chart.js 4 |
| Fonts | Inter + Playfair Display |
| Hosting | GitHub Pages / Vercel |

---

## 🔐 Security

- ✅ Row Level Security enabled on all tables
- ✅ Public can only read menu + insert orders
- ✅ Admin routes protected by Supabase Auth
- ✅ Only anon key used in frontend
- ✅ Input validation on all forms

---

## 🧪 Local Development

```bash
# Option 1: Python
cd restaurant
python3 -m http.server 8080
# Open: http://localhost:8080/frontend/

# Option 2: VS Code Live Server
# Install "Live Server" extension → right-click index.html → Open with Live Server

# Option 3: Node
npx serve . -p 8080
```

---

## 📦 Features

### Customer Website
- 🎬 Three.js animated 3D hero section
- 🌊 GSAP scroll animations + parallax
- 🍕 Bilingual menu (EN/AR) with RTL support
- 🔍 Live search + category filter
- 🛒 Animated slide-in cart drawer
- 🎟 Coupon code system
- 📊 Real-time order tracking
- 📱 NFC table auto-detection
- 🌙 Dark theme (Apple-inspired)

### Admin Dashboard
- 🔐 Supabase Auth login
- 📊 Live dashboard with Chart.js
- 📋 Order management + status updates
- 🍕 Full menu CRUD with image preview
- 📈 Revenue analytics (14-day chart)
- 🎟 Coupon management
- ⚙️ Restaurant settings
- 📥 CSV export
- 🔴 Real-time notifications (new orders)

---

Made with ❤️ for Egyptian restaurants 🇪🇬
