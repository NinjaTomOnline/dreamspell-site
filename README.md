# Dreamspell Public Site Repo Template

Use this template in a separate public GitHub repository so the Dreamspell app code can stay private.

## Recommended repository

- Repository name: `dreamspell-site`
- Production custom domain:
  - `https://getdreamspell.com/`
  - `https://getdreamspell.com/guide.html`
  - `https://getdreamspell.com/glossary.html`
  - `https://getdreamspell.com/faq.html`
  - `https://getdreamspell.com/get-app.html`
  - `https://getdreamspell.com/updates.html`
  - `https://getdreamspell.com/start-here.html`
  - `https://getdreamspell.com/why-dreamspell.html`
  - `https://getdreamspell.com/13-moon-calendar-meaning.html`
  - `https://getdreamspell.com/galactic-tones-meaning.html`
  - `https://getdreamspell.com/kin-meaning.html`
  - `https://getdreamspell.com/support.html`
  - `https://getdreamspell.com/privacy.html`
- GitHub Pages temporary fallback URLs:
  - `https://ninjatomonline.github.io/dreamspell-site/`
  - `https://ninjatomonline.github.io/dreamspell-site/guide.html`
  - `https://ninjatomonline.github.io/dreamspell-site/glossary.html`
  - `https://ninjatomonline.github.io/dreamspell-site/faq.html`
  - `https://ninjatomonline.github.io/dreamspell-site/get-app.html`
  - `https://ninjatomonline.github.io/dreamspell-site/updates.html`
  - `https://ninjatomonline.github.io/dreamspell-site/start-here.html`
  - `https://ninjatomonline.github.io/dreamspell-site/why-dreamspell.html`
  - `https://ninjatomonline.github.io/dreamspell-site/13-moon-calendar-meaning.html`
  - `https://ninjatomonline.github.io/dreamspell-site/galactic-tones-meaning.html`
  - `https://ninjatomonline.github.io/dreamspell-site/kin-meaning.html`
  - `https://ninjatomonline.github.io/dreamspell-site/support.html`
  - `https://ninjatomonline.github.io/dreamspell-site/privacy.html`

## Contents this repo should contain

- `index.html`
- `guide.html`
- `glossary.html`
- `faq.html`
- `get-app.html`
- `updates.html`
- `start-here.html`
- `why-dreamspell.html`
- `13-moon-calendar-meaning.html`
- `galactic-tones-meaning.html`
- `kin-meaning.html`
- `support.html`
- `privacy.html`
- `404.html`
- `site.css`
- `site.js`
- `app-store-badge.svg`
- `screenshots.json`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `CNAME`
- favicon and touch icon PNGs
- `screenshots/`
- `.nojekyll`
- `.github/workflows/publish-pages.yml`

`app-store-badge.svg` should remain the Apple-provided App Store marketing badge artwork rather than a custom imitation.

## Setup

1. Create a new public GitHub repository named `dreamspell-site`.
2. Copy the exported Dreamspell site files into that repo root.
3. In the new repo, go to `Settings > Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to `main` and let the workflow deploy the site.

If the first workflow run fails with a `Get Pages site failed` or `Not Found` error, revisit `Settings > Pages` and save `Source: GitHub Actions` once. GitHub's `configure-pages` action can auto-enable Pages only when you provide a token stronger than the default `GITHUB_TOKEN`, so first-time repo enablement often remains a manual one-time setup step.

## Custom domain: getdreamspell.com

This bundle includes a `CNAME` file with `getdreamspell.com`, but GitHub documents that `CNAME` files are ignored for Pages sites deployed from a custom GitHub Actions workflow. You still need to save the custom domain in `Settings > Pages`.

1. Open the public repo on GitHub.
2. Go to `Settings > Pages`.
3. Enter `getdreamspell.com` under `Custom domain` and save.
4. In IONOS, add these apex `A` records for `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. Optionally add these apex `AAAA` records:
   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`
6. Add a `www` `CNAME` that points to `ninjatomonline.github.io`.
7. Remove any conflicting default parking, forwarding, wildcard, or placeholder DNS records first.
8. Turn on `Enforce HTTPS` after DNS propagation finishes.
