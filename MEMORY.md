# MEMORY.md — Total Payment Solutions Website Redesign

_Last updated: 2026-04-16_

## Project Snapshot (2026-04-16)
- Static HTML site, live on Netlify (DNS cutover complete)
- Current deploy bundle: **`Output to Web/tps-deploy-2026-04-16.zip`**
- 50+ pages built: homepage, 8 service pages, 10 industry pages, 20+ location pages, company pages, blog index + 3 posts, 3 email templates
- Shared CSS: `tps-styles.css` (many pages also inline styles)
- Netlify config files present: `netlify.toml`, `_headers`, `_redirects`, `sitemap.xml`, `faq-nav.js`

## Pages Beyond Original Architecture
Architecture called for 39 pages. Actual build added: NRS terminal, FAQ, thank-you, industries index, locations index, gas-stations, salons-spas, contractors, healthcare, plus 14+ extra location pages (20+ total vs original 6).

## Deploy Workflow (added 2026-04-16)
- All web-upload zips live in **`Output to Web/`** (convention going forward)
- Filename format: `tps-deploy-YYYY-MM-DD.zip`
- Clean builds exclude mockups, email templates, research docs, .bmp sources, PDFs, .fuse_hidden files
- Older versioned builds (v10–v17, tps-v25 through tps-v35) are in `_archive/zip-backups/` for reference only — do not deploy

## Key Contacts / Brand
- Jason — primary rep, lead owner in Salesforce, (919) 608-1195, 1-844-590-5044
- Registered ISO of Wells Fargo Bank, N.A., Walnut Creek, CA (mandatory footer)
- Logo: shield with interlocking green/gray lattice + "T" monogram

## Color System (locked)
- `--green #5fa827` (brand, headings, links)
- `--orange #E87722` (CTA only)
- `--bg #0d1b2a` (dark navy)
- See `tps-styles.css` for full variable set

## Lead Form (Salesforce Web-to-Lead)
Fields: First Name, Last Name, Business Name, Phone, Email, Business Type, Monthly Volume, How Did You Hear. Hidden: Page URL, UTM Source, UTM Campaign. CTA button: "Send My Free Quote Request" (orange).

## Outstanding
- Jason to confirm Salesforce field mapping
- 5 more blog posts needed (how-cash-discount-program-works, cash-discount-vs-surcharge, eliminate-credit-card-processing-fees, how-to-switch-merchant-services, what-is-interchange-plus-pricing)
- Client logos + testimonials + real stats still needed from Jason
- GA4 + Search Console + Google Business Profile setup
- Backlink submissions: Merchant Maverick, CardPaymentOptions

## Related Auto-Memory Files (persistent memory system)
- `project_tps_website_redesign.md` — full status, locked decisions, outstanding items
- `reference_tps_file_structure.md` — file map, media assets, page organization
- `project_tps_design_system.md` — full design system spec, CSS variables, component patterns
