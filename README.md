# Dreamspell Public Site Repo Template

Use this template in a separate public GitHub repository so the Dreamspell app code can stay private.

## Recommended repository

- Repository name: `dreamspell-site`
- GitHub Pages temporary URLs:
  - `https://ninjatomonline.github.io/dreamspell-site/`
  - `https://ninjatomonline.github.io/dreamspell-site/support.html`
  - `https://ninjatomonline.github.io/dreamspell-site/privacy.html`

## Contents this repo should contain

- `index.html`
- `support.html`
- `privacy.html`
- `site.css`
- `screenshots/`
- `.nojekyll`
- `.github/workflows/publish-pages.yml`

## Setup

1. Create a new public GitHub repository named `dreamspell-site`.
2. Copy the exported Dreamspell site files into that repo root.
3. In the new repo, go to `Settings > Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to `main` and let the workflow deploy the site.

If the first workflow run fails with a `Get Pages site failed` or `Not Found` error, revisit `Settings > Pages` and save `Source: GitHub Actions` once. GitHub's `configure-pages` action can auto-enable Pages only when you provide a token stronger than the default `GITHUB_TOKEN`, so first-time repo enablement often remains a manual one-time setup step.

## Later custom-domain swap

When your final domain is ready:

1. Add a `CNAME` file in the repo root with the final domain name.
2. Open the public repo on GitHub.
3. Go to `Settings > Pages`.
4. Enter the custom domain.
5. Point the domain's DNS records at GitHub Pages.
6. Turn on `Enforce HTTPS` after DNS propagation finishes.
