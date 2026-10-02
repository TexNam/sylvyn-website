# Publish notes (not served on www.sylvyn.co.uk)

Repo docs live under `_internal/` so GitHub Pages / Jekyll does not publish them.

- Do not move these `.md` files back to the repo root.
- Do not add a root `README.md` unless it is intentionally public and scrubbed.
- `_config.yml` also excludes `*.md` and `_internal` as a second guard.
- Site pages stay at repo root: `index.html`, `about.html`, etc.
