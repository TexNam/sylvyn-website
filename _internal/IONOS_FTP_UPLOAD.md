# IONOS FTP / SFTP upload — Sylvyn static site

**Publish freeze:** Do **not** replace the live sylvyn.co.uk holding page until **Rob / Eve explicit yes** in Eve chat. This doc is preparation only.

**Goal:** Host this static site on existing IONOS webspace (~£4/month class of product — FTP/SFTP + document root). Domain and DNS stay on IONOS; **Google Workspace MX must not be changed.**

---

## Before you touch production

1. **Get Publish yes** from Rob/Eve.  
2. **Backup** the current holding page / document root:
   - Connect via SFTP/FTP (steps below).
   - Download the entire document root to a dated folder, e.g. `sylvyn-ionos-backup-YYYY-MM-DD/`.
   - Keep that zip offline until you confirm the new site is correct.
3. Confirm you will upload **only** the contents of `static-site/` (HTML, `css/`, `js/`, `assets/`). Do **not** upload `README.md`, `IONOS_FTP_UPLOAD.md`, or a filled `CNAME` unless you intentionally want those on the public server (usually omit docs from production root).

---

## What you need from IONOS

In IONOS Control Panel → your hosting package / webspace:

| Item | Where |
|------|--------|
| **FTP/SFTP host** | Often `access-XXXXXX.webspace-data.io` or similar — copy from “FTP credentials” / “SFTP” |
| **Username** | FTP/SFTP user for this contract |
| **Password** | Or SSH key if SFTP key auth is enabled |
| **Port** | SFTP usually **22**; classic FTP **21** (prefer **SFTP**) |
| **Document root** | Often `/` or `/htdocs` or `/httpdocs` — the folder that serves `https://sylvyn.co.uk/` |

Prefer **SFTP** over plain FTP.

---

## Connect (FileZilla — typical)

1. Open FileZilla → File → Site Manager → New Site.  
2. Protocol: **SFTP – SSH File Transfer Protocol**.  
3. Host / user / password / port from IONOS.  
4. Connect.  
5. Right-hand pane: open the **document root** (the folder that currently holds the holding page `index` or MyWebsite export).  
6. Left-hand pane: open your local `static-site/` folder.

### CLI alternative (SFTP)

```bash
sftp -P 22 USER@HOST
# then:
cd /path/to/document/root
lcd /path/to/sylvyn-website-rebuild/static-site
put index.html
put why-scotland.html
put about.html
put contact.html
mkdir css js assets
put -r css
put -r js
put -r assets
bye
```

Or `rsync` over SSH if IONOS SSH is enabled for the contract:

```bash
rsync -avz --delete \
  --exclude 'README.md' \
  --exclude 'IONOS_FTP_UPLOAD.md' \
  --exclude 'CNAME' \
  --exclude '.git' \
  ./static-site/ USER@HOST:/path/to/document/root/
```

Use `--delete` only if you intend to remove old holding-page files after backup.

---

## Upload checklist

Upload these into the document root so URLs resolve as:

| Local | Live URL |
|-------|----------|
| `index.html` | `/` |
| `why-scotland.html` | `/why-scotland.html` |
| `about.html` | `/about.html` |
| `contact.html` | `/contact.html` |
| `css/styles.css` | `/css/styles.css` |
| `js/main.js` | `/js/main.js` |
| `assets/hero-scotland-dusk.jpg` | `/assets/hero-scotland-dusk.jpg` |
| `assets/hero-scotland-dusk.webp` | `/assets/hero-scotland-dusk.webp` |

**Omit from production root (recommended):** `README.md`, `IONOS_FTP_UPLOAD.md`, commented `CNAME`, `.git/`.

If MyWebsite left extra paths or a subdirectory structure, remove or replace only after backup — the new site expects flat root HTML as above.

---

## DNS / mail — do not touch

- **Do not** change MX records (Google Workspace mail for `@sylvyn.co.uk`).  
- **Do not** cancel the MyWebsite / hosting contract until the static site is verified live and Rob is happy.  
- A records / web forwarding: leave as they already point this webspace at sylvyn.co.uk unless IONOS support directs a documented change.  
- Custom domain on GitHub Pages is **out of scope** for this FTP cutover.

---

## After upload

1. Hard-refresh `https://sylvyn.co.uk/` (and `/why-scotland.html`, `/about.html`, `/contact.html`).  
2. Check hero image, fonts (Google Fonts), mailto CTAs.  
3. If anything is wrong: restore from the dated backup immediately.  
4. Notify Rob/Eve that production is live.

---

## Staging vs production

| | Staging (GitHub Pages) | Production (IONOS) |
|--|------------------------|--------------------|
| When | Now — review URL | Only after Publish yes |
| Domain | `*.github.io/...` | sylvyn.co.uk |
| DNS/MX | Untouched | Untouched |
| CNAME file | Empty / commented | Not used for IONOS FTP |

---

## Rollback

Re-upload the backup document root (or re-publish the previous MyWebsite build if that was the live face). Keep the backup until at least one full business day of successful live checks.
