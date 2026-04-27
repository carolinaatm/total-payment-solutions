# CLAUDE.md — Total Payment Solutions Website Redesign

## Project Goal
Redesign totalpaysolutions.com as a top-ranking, SEO-optimized site that builds trust and converts visitors into Salesforce leads. Outrank cash-discount-focused competitors (cashdiscountprogram.com, shiftprocessing.com, vizypay.com).

## Project State (as of 2026-04-15)
Static HTML site build, Netlify-ready. Latest bundle: **tps-v35.zip**. Pending deployment to production DNS.

## Locked Decisions
- **Domain:** totalpaysolutions.com
- **Hosting path:** Netlify static (netlify.toml, _headers, _redirects, sitemap.xml all present). WordPress was considered but current build is static.
- **ICP:** Convenience stores, tobacco shops, carnivals, event concessionaires
- **Geography:** NC/SC/VA Phase 1, national Phase 2
- **Hero Offer:** Free terminal + Zero Fee / Cash Discount Program
- **Lead destination:** Salesforce Web-to-Lead → Jason as default owner
- **Primary rep:** Jason — (919) 608-1195 local, 1-844-590-5044 toll-free
- **Design:** Dark premium (navy #0d1b2a, green #5fa827, orange #E87722 for CTA only)
- **Logo:** Shield design with interlocking green/gray lattice, embedded "T" monogram
- **Mandatory footer legal line:** "Total Payment Solutions is a registered ISO of Wells Fargo Bank, N.A., Walnut Creek, CA"

## Design Rules (do not break)
- Dark navy background throughout — never white/light
- Orange is CTA-only, never decorative
- Green for brand identity (headings, links, trust signals)
- Every page must have a CTA to /get-a-quote
- Use tps-styles.css variables; some pages have styles inlined
- Max width 1180px, responsive with `-sm` image variants at 768px breakpoint
- WebP images with JPG fallback
- SEO standards per page: title, meta description, canonical, OG/Twitter tags

## Key Differentiators (copy reference)
Clover authorized reseller • Registered ISO of Wells Fargo • High-risk + CBD approved • Local NC roots (Jason is the face) • Payroll + business funding • White-glove 24/7 support • Carnival/event/mobile niche • "$100 or less guaranteed" monthly bill

## Source-of-Truth Documents (in this folder)
- `TotalPay_Site_Research_Brief.md` — competitive research, keyword strategy, ICP, brand identity
- `TotalPay_Site_Architecture.md` — URL map, page SEO specs, Salesforce field mapping, nav, internal links, build phases

## Outstanding Work
- Point DNS at Netlify and deploy tps-v35
- Confirm Salesforce Web-to-Lead field mapping with Jason
- Collect client logos + testimonials
- Real stats from Jason (merchants served, savings delivered)
- 5 more blog posts (architecture calls for 8, only 3 built)
- Review outreach campaign (Google + Trustpilot)
- Submit to Merchant Maverick + CardPaymentOptions for backlinks
- Google Business Profile optimization
- GA4 + Search Console setup

## How to Work in This Project
Short, direct responses. Maintain dark premium aesthetic. Keep orange strictly for CTAs. Every page needs /get-a-quote CTA and full SEO metadata. Use shared tps-styles.css conventions. When adding or editing pages, preserve the sticky header, 4-column footer with ISO disclosure, and responsive image pattern.
