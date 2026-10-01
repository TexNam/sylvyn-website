# Sylvyn Ltd — static site (staging)

Institutional front door for **Sylvyn Ltd** (SC861646). Cream / Montserrat Light wordmark / Market–Moat–Management posture. **Not live on sylvyn.co.uk until explicit Publish yes in Eve chat.**

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, £394m proof, Market + Moat, CTA |
| `why-scotland.html` | Three beats + renewables strip (sourced GW / £ / TWh only) |
| `about.html` | Institutional partners + company identity |
| `contact.html` | Partner with Sylvyn → mailto |
| `css/styles.css` | Locked palette + typography |
| `js/main.js` | Mobile nav only |
| `assets/hero-scotland-dusk.jpg` (+ `.webp`) | Quiet dusk landscape (no turbines / solar / text) |

## Local preview

```bash
cd static-site
python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

## GitHub Pages staging

**Do not point DNS or CNAME at sylvyn.co.uk until Publish yes.**

1. Ensure `gh auth login` is complete for the intended GitHub user/org.
2. From this folder (site at repo root):

```bash
cd static-site
gh repo create sylvyn-website --public --source=. --remote=origin --push
# Or: create empty repo first, then:
# git init && git add -A && git commit -m "Sylvyn staging site"
# git branch -M main
# git remote add origin git@github.com:USER/sylvyn-website.git
# git push -u origin main
```

3. Enable Pages: **Settings → Pages → Deploy from branch → `main` / root** (or use `gh-pages` branch with site at root).
4. Staging URL pattern: `https://USER.github.io/sylvyn-website/`
   (Replace `USER` / repo name with the authenticated account.)

### Updating staging

```bash
cd static-site
# edit files…
git add -A && git commit -m "Update staging copy/design" && git push
```

Pages rebuilds in ~1 minute. Leave `CNAME` empty / commented until cutover.

## Production (IONOS) — frozen

Live face today is the IONOS holding page. **Do not FTP-overwrite production until Rob/Eve say Publish yes.**

When approved, follow **[IONOS_FTP_UPLOAD.md](./IONOS_FTP_UPLOAD.md)**:

1. Backup current document root first
2. Upload this folder’s contents to the webspace document root
3. Leave MX / DNS / Google Workspace mail untouched
4. Confirm on sylvyn.co.uk only after upload verification

## Content rails (do not break)

- No Westfield or other VDR place names
- No megawatt ladders / invented MW figures on the open web
- GW / £ / TWh only as already sourced in Why Scotland figures
- CTA: Partner with us / Get in touch → `info@sylvyn.co.uk` only
- Company: Sylvyn Ltd, SC861646, Office 145, 18 Young Street, Edinburgh EH2 4JB

## Next steps for Rob

1. Review staging (once GitHub auth + Pages are live)
2. Approve wording / design tweaks
3. Explicit **Publish yes** → FTP to IONOS per `IONOS_FTP_UPLOAD.md`
4. Only then consider CNAME / DNS for custom domain (MX untouched)
