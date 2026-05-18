# Lake Julia Association Website

The official website of the **Lake Julia Association, Inc.** — a private lake association on Lake Julia near Three Lakes, Wisconsin.

🌐 **Live site:** [lakejuliawi.org](https://lakejuliawi.org)

---

## About

This is the source code for the LJA's public website, built in early 2026 to replace an outdated Google Sites page. It serves as the community's primary online presence — providing lake neighbors, property owners, and visitors with information about the association, the lake environment, local history, and member resources.

The site is designed to be simple, durable, and easy to hand off: no CMS, no database, no frameworks — just static HTML, CSS, and JavaScript.

---

## Tech Stack

- **Static HTML/CSS/JS** — no server-side code or build tools required
- **Leaflet** — open-source interactive map (replaces ESRI ArcGIS Online subscription)
- **Hosted** on GitHub Pages (`.nojekyll` disables Jekyll so files are served as-is)
- **Domain** lakejuliawi.org — registered through Cloudflare (~$10/yr, auto-renew)
- **SSL** via GitHub Pages / Cloudflare

---

## Site Structure

The site contains **23 pages** organized into five sections, plus a self-hosted GIS application and internal documentation.

```
lakejuliawi.org/
│
├── index.html                        # Homepage
├── .nojekyll                         # Disables Jekyll on GitHub Pages
│
├── community/
│   ├── index.html                    # Community overview
│   ├── about.html                    # About the Association
│   ├── email-list.html               # Community email list
│   ├── directory.html                # Resident directory
│   ├── annual-meeting.html           # Annual meeting info
│   └── donate.html                   # Donate (PayPal / Venmo)
│
├── environment/
│   ├── index.html                    # Lake & Environment overview
│   ├── aquatic-invasives.html        # Aquatic invasive species / CBCW
│   ├── boating-rules.html            # Boating rules & regulations
│   ├── flora-fauna.html              # Flora & fauna of Lake Julia
│   ├── recycling.html                # Recycling & waste resources
│   └── tlwa.html                     # Three Lakes Water Alliance
│
├── history/
│   ├── index.html                    # History overview
│   ├── in-memoriam.html              # In Memoriam
│   ├── archives.html                 # Photo & document archives
│   ├── ccc.html                      # CCC history
│   └── properties.html               # Cabin & property histories
│
├── resources/
│   ├── index.html                    # Resources overview
│   ├── maps.html                     # Maps & GIS (thumbnail cards linking to Leaflet map + DNR viewer)
│   ├── documents.html                # Association documents
│   ├── attractions.html              # Local attractions
│   └── links.html                    # Helpful external links
│
├── gis/
│   ├── gis.html                      # Leaflet interactive map application
│   ├── build-residents.js            # Script: syncs residents.csv → gis.html
│   ├── LakeJulia_Q.qgz               # QGIS project file
│   ├── README.md                     # GIS map documentation
│   ├── WORKFLOW.md                   # Resident data maintenance workflow
│   └── data/
│       ├── cabins.geojson                # LJA property points (maintained in QGIS)
│       ├── residents.csv                 # Resident data — NOT committed to git
│       ├── lkjulia.geojson               # Lake Julia polygon
│       ├── Subwatershed_HUC12.geojson    # HUC12 sub-watershed boundary
│       ├── WHD-Plus_Catchments.geojson   # WHD-Plus catchment polygons
│       ├── parcels.geojson               # Oneida County parcels (2024)
│       └── NHD_Flowlines.geojson         # National Hydrography Dataset flowlines
│
├── css/
│   └── style.css                     # Shared stylesheet (all pages)
│
├── js/
│   └── nav.js                        # Shared nav, footer & search index (injected into every page)
│
├── images/                           # Site imagery
│
└── readme.html                       # Internal technical documentation (gitignored, local-only — contact maintainer for a copy)
```

---

## Pages In Development

The following pages are planned but not yet live:

| Page | Description | Planned Location |
|------|-------------|-----------------|
| CBCW Expansion | Volunteer info, scheduling, and inspection data for the Clean Boats, Clean Waters program | `environment/cbcw.html` or expand `aquatic-invasives.html` |
| ILIDS Remote Monitoring | Lake sensor and water quality data via ILIDS remote monitoring | `environment/monitoring.html` |
| Lake Julia History | Broader narrative history of Lake Julia and the Three Lakes area | `history/lake-history.html` |
| Property Histories (expanded) | Member-submitted cabin and property histories with photos | `history/properties.html` (expanded) |

---

## Shared Components

All pages share a common header, navigation, footer, site search, and a soft password gate. These are injected at runtime by `js/nav.js` — edit that file to update navigation, footer, the gated-page list, or the shared password site-wide.

The shared stylesheet is `css/style.css`.

---

## Page Access Control (Soft Password Gate)

Individual pages can be restricted with a shared community password. This is a **soft gate** — it deters casual visitors but is not real security (the password is plainly visible in `js/nav.js`). It is intended only for pages where members prefer to discourage public discoverability, not for genuinely sensitive data.

**Currently gated:** `history/properties.html`

**To gate a new page (four steps):**

1. In [`js/nav.js`](js/nav.js), add the page's path to the `GATED_PATHS` array:
   ```js
   const GATED_PATHS = ['/history/properties.html', '/your-new/page.html'];
   ```
2. In the page's HTML, add `data-protected="true"` to the `<body>` tag:
   ```html
   <body data-page="..." data-protected="true">
   ```
3. Add a `noindex` meta tag to the page's `<head>` so crawlers that fetch the HTML don't index it:
   ```html
   <meta name="robots" content="noindex, nofollow">
   ```
4. Add the page path to `robots.txt` at the repo root so well-behaved crawlers don't fetch the page at all:
   ```
   Disallow: /your-new/page.html
   ```

The password prompt will then appear when anyone visits that page, and a small lock icon will automatically appear next to every link pointing to it from anywhere on the site. Steps 3 and 4 keep the page out of search engine results — step 3 is the on-page directive, step 4 is the site-root crawler rule. Both together are belt-and-suspenders.

**Storage mode:** Currently `sessionStorage` (re-prompts each browser session) for development. Before sharing the site widely, switch `sessionStorage` → `localStorage` in both spots in `js/nav.js` so members aren't re-prompted on every visit. A `TODO` comment in the file marks this.

For heavier-duty access control with per-member email verification, see the **Cloudflare Access** section in [`readme.html`](readme.html).

---

## Maintainer

Built and maintained by **Scott Schlueter**, - scottoschlueter@gmail.com - technology officer of the Lake Julia Association.  
