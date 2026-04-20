# 🍽️ Flavor House — NFC Restaurant Ordering System

A complete, production-ready restaurant ordering system in a **single HTML file**. No server, no database, no API keys needed. Works offline after first load.

## ✨ Features

### Customer Side
- 🏠 **Animated landing page** with WiFi info display
- 🍕 **Menu** with categories (Meals, Drinks, Desserts), grid/list layouts
- 🛒 **Cart** with quantity controls and coupon code support
- 📋 **Checkout** with table number + special notes
- ✅ **Success screen** with printable receipt
- 💬 **Smart AI chat** — understands questions in English & Arabic without any API

### Admin Dashboard
- 📊 **Dashboard** — Revenue, order count, today's orders, top items chart
- 🍕 **Menu Management** — Add/edit/delete items, enable/disable, mark as featured, image preview, bilingual names
- 📋 **Order Management** — View all orders, filter by table/status, update order status, export CSV, print receipts
- 🎨 **Design Control** — Accent color picker, dark/light mode, font selector, layout toggle, tax/service/discount sliders
- ⚙️ **Settings** — Restaurant name (EN/AR), WiFi, hours, table count, admin credentials
- 🎟️ **Coupons** — Create/delete discount codes with custom percentages

### Extras
- 🇬🇧🇪🇬 **Bilingual** — Full English/Arabic with RTL support
- 🌙 **Dark/Light mode**
- 💰 **Egyptian Pound (ج.م)** currency
- 📱 **Mobile-first responsive design**
- 🖨️ **Print receipts** in a new window
- 📥 **Export orders to CSV**
- 💾 **localStorage persistence** — data survives page refresh

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Method 1 — GitHub Web UI (Easiest)

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** (green button)
3. Name it: `flavor-house` (or anything you like)
4. Set to **Public**, check "Add a README file"
5. Click **Create repository**
6. Click **Add file → Upload files**
7. Drag and drop `restaurant_nfc_production.html`
8. **Important:** Rename the file to `index.html` before uploading
9. Click **Commit changes**
10. Go to **Settings → Pages**
11. Under "Source" select **main** branch, folder **/ (root)**
12. Click **Save**
13. Wait ~1 minute, then visit: `https://YOUR-USERNAME.github.io/flavor-house/`

### Method 2 — GitHub CLI (Terminal)

```bash
# Install GitHub CLI: https://cli.github.com
gh auth login
gh repo create flavor-house --public
cd /path/to/your/file
cp restaurant_nfc_production.html index.html
git init && git add . && git commit -m "Launch Flavor House"
gh repo set-default
git push -u origin main
gh api repos/:owner/:repo/pages -X POST -f source.branch=main -f source.path=/
```

### Method 3 — Drag & Drop (Even Easier)

Use **Netlify Drop** — no account needed for quick testing:
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Rename the file to `index.html`
3. Drag the file onto the page
4. Get an instant URL like `https://amazing-curie-123.netlify.app`

## 🔧 Customization Before Deploying

Open `index.html` in any text editor and find the `defState()` function. Change:

```javascript
restaurantName: 'Flavor House',       // Your restaurant name
restaurantNameAr: 'فلايفر هاوس',     // Arabic name
wifi: 'FH_Guest',                     // Your WiFi name
wifiPass: 'flavorhouse2024',          // Your WiFi password
adminUser: 'admin',                   // Change this!
adminPass: 'admin123',                // Change this!
openTime: '10:00 AM',
closeTime: '12:00 AM',
tableCount: 20,                       // Number of tables
```

## 📱 NFC Setup (For Real Restaurants)

1. Buy **NFC stickers** (e.g., NTAG213 — cheap on Amazon/Noon)
2. Use a free NFC writer app (NFC Tools on Android/iOS)
3. Write your GitHub Pages URL to each sticker
4. Stick one on each table
5. Customers tap → browser opens → they order!

## 🔐 Security Notes

- Change the default admin password before deploying
- This system uses localStorage — data is per-browser/device
- For multi-device sync, consider upgrading to Firebase (free tier)

## 🛠️ Tech Stack

- Pure **HTML + CSS + JavaScript** — zero dependencies
- **localStorage** for data persistence
- Works on any browser, any device
- No build step, no npm, no framework

## 📄 License

MIT — free to use, modify, and deploy for your restaurant.

---

Made with ❤️ for Egyptian restaurants 🇪🇬
