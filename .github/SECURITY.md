# Security Policy

This repository is a personal portfolio site. It is fully static — no backend,
no database, no user accounts, no data collected from visitors. It builds to
static files and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Reporting a vulnerability

Email **mccormicktravis1110@gmail.com** with `SECURITY` in the subject line.
Please include a description, affected URL or file, and steps to reproduce.

You can expect an acknowledgement within a few days. There is no bug bounty.

## In scope

- Client-side issues in the deployed site (e.g. XSS, script injection)
- The GitHub Actions deploy workflow
- Vulnerable or malicious dependencies in `package-lock.json`

## Out of scope

- Findings that require a compromised GitHub account or local machine
- Missing hardening headers that GitHub Pages does not allow me to set
- Automated scanner output with no demonstrated impact
