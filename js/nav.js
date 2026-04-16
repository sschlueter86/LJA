/* ══════════════════════════════════════════════════════════════
   nav.js — Shared header and footer injection for every page.
   This file is loaded by every HTML page on the site.
   It builds and injects the <header> and <footer> elements,
   wires up the mobile hamburger menu, and keeps nav links
   highlighted based on which section of the site you're in.
   ══════════════════════════════════════════════════════════════ */

const LAST_UPDATED = '04/09/2026 @ 2:06 PM CST'; // update this each time the site is published

// ── SEARCH INDEX ──────────────────────────────────────────────────
// Each entry: { title, url (root-relative), section, snippet, body }
// body is a space-separated bag of keywords/phrases searched at query time.
const SEARCH_INDEX = [
  {
    title: 'Home',
    url: 'index.html',
    section: 'Home',
    snippet: 'Welcome to Lake Julia — a 404-acre freshwater lake in Oneida & Forest Counties, Wisconsin.',
    body: 'lake julia welcome 404 acres 45 feet deep 6.4 miles shoreline 49 properties 1910 piney woods cabin wisconsin oneida forest county association history hero weather stats home'
  },
  {
    title: 'Community — Overview',
    url: 'community/index.html',
    section: 'Community',
    snippet: 'Resident directory, email list, annual meeting, governance, and how to support the Association.',
    body: 'community overview residents directory email list annual meeting governance donate support board association members'
  },
  {
    title: 'About the Association',
    url: 'community/about.html',
    section: 'Community',
    snippet: 'Incorporated in 2004 as a Wisconsin Non-Stock Corporation, governed by a twelve-person Board of Directors.',
    body: 'about association incorporated 2004 wisconsin non-stock corporation board of directors twelve person 501c3 nonprofit bylaws governance zoom meetings memorial day labor day officers president treasurer secretary'
  },
  {
    title: 'Annual Meeting',
    url: 'community/annual-meeting.html',
    section: 'Community',
    snippet: 'The Annual Meeting is held around the Fourth of July each year.',
    body: 'annual meeting fourth of july july 4th meeting agenda election vote minutes board elections quorum members attendance past meetings'
  },
  {
    title: 'Resident Directory',
    url: 'community/directory.html',
    section: 'Community',
    snippet: 'Lake Julia property owner and resident contact directory (restricted to registered residents).',
    body: 'directory resident directory property owners lake residents contact information phone address email restricted member login'
  },
  {
    title: 'Community Email List',
    url: 'community/email-list.html',
    section: 'Community',
    snippet: 'Join the Lake Julia community email list to stay informed about lake news and events.',
    body: 'email list community email newsletter subscribe join sign up mailing list notifications updates announcements resident registration'
  },
  {
    title: 'Donate',
    url: 'community/donate.html',
    section: 'Community',
    snippet: 'Support the Lake Julia Association — a 501(c)(3) nonprofit. Donations fund CBCW and lake stewardship.',
    body: 'donate donation 501c3 charitable cbcw clean boats clean waters support contribution tax deductible fund financial stewardship give'
  },
  {
    title: 'Lake & Environment — Overview',
    url: 'environment/index.html',
    section: 'Lake & Environment',
    snippet: 'Protecting Lake Julia\'s water quality, ecology, and natural character for generations to come.',
    body: 'environment lake overview water quality ecology conservation natural character protection stewardship environmental health'
  },
  {
    title: 'Aquatic Invasive Species',
    url: 'environment/aquatic-invasives.html',
    section: 'Lake & Environment',
    snippet: 'Eurasian Water Milfoil (EWM) is a top threat. The CBCW program inspects boats to keep invasives out.',
    body: 'aquatic invasives ewm eurasian water milfoil cbcw clean boats clean waters invasive species boat inspection virgin lake weed milfoil zebra mussel spiny water flea curly leaf pondweed prevention threat property values'
  },
  {
    title: 'Boats & Boating Rules',
    url: 'environment/boating-rules.html',
    section: 'Lake & Environment',
    snippet: 'Community boating standards: wake policy, no-wake zones, boat launch rules, and DNR regulations.',
    body: 'boating rules wake boat no-wake zone boat launch boat landing speed limit wakes watercraft jet ski kayak canoe fishing wake policy dnr regulations launch hours quiet hours safety courtesy'
  },
  {
    title: 'Flora & Fauna',
    url: 'environment/flora-fauna.html',
    section: 'Lake & Environment',
    snippet: 'Wildlife, plants, birds, and fish found at and around Lake Julia.',
    body: 'flora fauna plants animals birds wildlife loons eagles osprey herons waterfowl fish walleye bass panfish bluegill perch pike muskie deer bear vegetation native plants shoreline habitat'
  },
  {
    title: 'Recycling & Waste Disposal',
    url: 'environment/recycling.html',
    section: 'Lake & Environment',
    snippet: 'Information on recycling drop-off locations and waste disposal for Lake Julia area residents.',
    body: 'recycling waste disposal trash garbage recycling center crandon three lakes drop-off hazardous waste cardboard plastic glass metal compost'
  },
  {
    title: 'Three Lakes Waterfront Association',
    url: 'environment/tlwa.html',
    section: 'Lake & Environment',
    snippet: 'Lake Julia is a member of the Three Lakes Waterfront Association (TLWA) regional federation.',
    body: 'tlwa three lakes waterfront association three lakes lake association regional federation member advocacy lakes chain of lakes'
  },
  {
    title: 'History — Overview',
    url: 'history/index.html',
    section: 'History',
    snippet: 'Over a century of life on Lake Julia — the families, events, and landscapes that shaped this place.',
    body: 'history overview timeline 1910 1912 1930s 2004 century heritage piney woods point house railroad chicago northwestern CCC civilian conservation corps association incorporated'
  },
  {
    title: 'Historical Archives',
    url: 'history/archives.html',
    section: 'History',
    snippet: 'Historical documents, photographs, and records from over a century of life on Lake Julia.',
    body: 'archives historical documents photos photographs historical records scrapbook memorabilia old pictures vintage documents letters newspaper clippings'
  },
  {
    title: 'Civilian Conservation Corps',
    url: 'history/ccc.html',
    section: 'History',
    snippet: 'In the 1930s, the Civilian Conservation Corps reforested and reshaped the landscape surrounding Lake Julia.',
    body: 'ccc civilian conservation corps 1930s new deal reforestation conservation corps camp work great depression federal program forestry roads bridges improvements'
  },
  {
    title: 'In Memoriam',
    url: 'history/in-memoriam.html',
    section: 'History',
    snippet: 'Remembering Lake Julia community members who have passed away.',
    body: 'in memoriam memorial tribute passed away deceased memory remembrance obituary community members families beloved'
  },
  {
    title: 'Property Histories',
    url: 'history/properties.html',
    section: 'History',
    snippet: 'The history of individual properties and cabins on Lake Julia — original owners and how they changed hands.',
    body: 'property histories cabins property owners original owners lot history property history deeds parcels shoreline lots camp cabin cottage family names'
  },
  {
    title: 'Resources — Overview',
    url: 'resources/index.html',
    section: 'Resources',
    snippet: 'Maps, GIS viewer, association documents, local attractions, and helpful external links.',
    body: 'resources overview maps gis documents links attractions helpful external tools references'
  },
  {
    title: 'Maps & GIS',
    url: 'resources/maps.html',
    section: 'Resources',
    snippet: 'Lake Julia lake maps, bathymetric depth chart, neighbor map, and interactive GIS viewer.',
    body: 'maps gis bathymetric map lake map depth map interactive map gis viewer neighbors map boat launch shoreline contours depth chart topographic plat county parcels'
  },
  {
    title: 'Association Documents',
    url: 'resources/documents.html',
    section: 'Resources',
    snippet: 'Bylaws, meeting minutes, financial reports, and other official association documents.',
    body: 'documents bylaws meeting minutes financial reports pdf association documents board minutes annual report forms policies procedures official records'
  },
  {
    title: 'Helpful Links',
    url: 'resources/links.html',
    section: 'Resources',
    snippet: 'External links to Wisconsin DNR, TLWA, Oneida County, Forest County, and other local resources.',
    body: 'links helpful links external links wisconsin dnr department of natural resources tlwa oneida county forest county local resources lake data water quality weather noaa weather station'
  },
  {
    title: 'Local Attractions',
    url: 'resources/attractions.html',
    section: 'Resources',
    snippet: 'Nearby restaurants, shops, activities, and points of interest around the Lake Julia area.',
    body: 'attractions local attractions restaurants dining three lakes eagle river rhinelander shopping activities recreation hiking fishing snowmobile trails golf bowling ice fishing antiques tourism'
  },
];

// ── BASE PATH DETECTION ───────────────────────────────────────────
// Pages live either at the root (index.html) or one level deep
// (e.g. /community/index.html). We detect which case we're in so
// that all links in the injected header/footer use correct paths.
// _atRoot = true  → use paths like "css/style.css"
// _atRoot = false → use paths like "../css/style.css"
const _atRoot = !window.location.pathname.match(/\/(community|environment|history|resources)\//);
const _base = _atRoot ? '' : '../';

// ── SITE NAVIGATION DEFINITION ───────────────────────────────────
// The five top-level sections of the site.
// href values use _base so they resolve correctly from any depth.
const SITE_NAV = [
  { label: 'Home',                   href: _base + 'index.html' },
  { label: 'Community',              href: _base + 'community/index.html' },
  { label: 'Lake &amp; Environment', href: _base + 'environment/index.html' },
  { label: 'History',                href: _base + 'history/index.html' },
  { label: 'Resources',              href: _base + 'resources/index.html' },
];

// ── buildHeader(activePage) ───────────────────────────────────────
// Generates the full <header> HTML string.
// activePage is read from <body data-page="..."> on each page
// (e.g. "community", "history") and matched against nav labels
// to add class="active" on the correct link.
function buildHeader(activePage) {
  // Desktop nav links (rendered inside the sticky header bar)
  const navLinks = SITE_NAV.map(n =>
    `<a href="${n.href}"${n.label.replace('&amp;','&').toLowerCase().includes(activePage.toLowerCase()) ? ' class="active"' : ''}>${n.label}</a>`
  ).join('');

  // Mobile nav links (rendered inside the collapsible dropdown)
  const mobileLinks = SITE_NAV.map(n =>
    `<a href="${n.href}"${n.label.replace('&amp;','&').toLowerCase().includes(activePage.toLowerCase()) ? ' class="active"' : ''}>${n.label}</a>`
  ).join('');

  // The header markup:
  //   .header-inner: flex row with logo + desktop nav + search button + hamburger button
  //   .mobile-nav:   hidden by default; expanded by the hamburger toggle below
  //   The SVG logo-wave is a simple two-path wave illustration
  return `
<header>
  <div class="header-inner">
    <a class="site-logo" href="${_base}index.html">
      <svg class="logo-wave" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 16 Q8 8 14 16 Q20 24 26 16 Q32 8 38 16" stroke="white" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.9"/>
        <path d="M2 10 Q8 2 14 10 Q20 18 26 10 Q32 2 38 10" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>
      </svg>
      Lake Julia Association
    </a>
    <nav>${navLinks}</nav>
    <!-- Search button: magnifying glass, opens the search overlay -->
    <button class="search-toggle" aria-label="Search site" id="search-open-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="10.5" cy="10.5" r="7"/>
        <line x1="21" y1="21" x2="15.8" y2="15.8"/>
      </svg>
    </button>
    <!-- Hamburger button: visible only on mobile (CSS hides desktop nav at ≤768px) -->
    <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <!-- Mobile dropdown nav: max-height animates from 0 to 400px when .open is toggled -->
  <div class="mobile-nav" aria-hidden="true">
    ${mobileLinks}
  </div>
</header>
<!-- Search overlay: hidden until .open is added by JS -->
<div id="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
  <div class="search-box">
    <div class="search-input-row">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="10.5" cy="10.5" r="7"/>
        <line x1="21" y1="21" x2="15.8" y2="15.8"/>
      </svg>
      <input id="search-input" type="search" placeholder="Search Lake Julia…" autocomplete="off" spellcheck="false">
      <button id="search-close" aria-label="Close search">&#x2715;</button>
    </div>
    <div id="search-results" role="listbox">
      <div class="search-hint">Type to search pages across the whole site.</div>
    </div>
  </div>
</div>`;
}

// ── buildFooter() ─────────────────────────────────────────────────
// Generates the full <footer> HTML string.
// Includes: branding/contact blurb, site navigation column,
// and external links column (DNR, TLWA, Facebook).
function buildFooter() {
  return `
<footer>
  <div class="footer-inner">
    <!-- Branding and contact info -->
    <div>
      <div class="footer-brand">Lake Julia Association, Inc.</div>
      <div class="footer-sub">
        Oneida &amp; Forest Counties, Wisconsin<br>
        <a href="mailto:scottoschlueter@gmail.com?cc=jrfranke72@gmail.com">Contact Administrator</a><br>
        <span style="font-size:0.75rem; opacity:0.65;">Site Last Updated: ${LAST_UPDATED}</span>
      </div>
    </div>
    <!-- Internal navigation column -->
    <div class="footer-col">
      <h4>Navigate</h4>
      <a href="${_base}community/index.html">Community</a>
      <a href="${_base}environment/index.html">Lake &amp; Environment</a>
      <a href="${_base}history/index.html">History</a>
      <a href="${_base}resources/maps.html">Resources</a>
    </div>
    <!-- External links column -->
    <div class="footer-col">
      <h4>External</h4>
      <a href="https://apps.dnr.wi.gov/lakes/lakepages/LakeDetail.aspx?wbic=1614300" target="_blank">Wisconsin DNR — Julia Lake</a>
      <a href="http://tlwa.org" target="_blank">Three Lakes Waterfront Assn</a>
      <a href="https://www.facebook.com/lakejulia" target="_blank">Facebook</a>
    </div>
  </div>
</footer>`;
}

// ── DOMContentLoaded: inject header/footer and wire up mobile nav ─
document.addEventListener('DOMContentLoaded', () => {
  // Read which section this page belongs to (set via data-page="..." on <body>)
  const activePage = document.body.dataset.page || '';

  // Grab the placeholder divs defined in each HTML page
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  // Replace each placeholder div with the fully built header/footer HTML
  if (headerEl) headerEl.outerHTML = buildHeader(activePage);
  if (footerEl) footerEl.outerHTML = buildFooter();

  // ── HAMBURGER MENU TOGGLE ─────────────────────────────────────
  // After header injection, select the newly created toggle elements
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    // Toggle the .open class on both elements when the button is clicked
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);           // accessibility
      mobileNav.setAttribute('aria-hidden', !open);         // accessibility
    });

    // Close the mobile nav when any nav link is tapped
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
      });
    });

    // Close the mobile nav when tapping anywhere outside the header
    document.addEventListener('click', (e) => {
      if (!e.target.closest('header')) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
      }
    });
  }

  // ── SITE SEARCH ───────────────────────────────────────────────────
  const overlay    = document.getElementById('search-overlay');
  const openBtn    = document.getElementById('search-open-btn');
  const closeBtn   = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const resultsEl  = document.getElementById('search-results');

  if (!overlay || !openBtn || !closeBtn || !searchInput || !resultsEl) return;

  // Resolve a root-relative URL to an href that works from any page depth.
  // _atRoot is already defined at the top of this file.
  function resolveUrl(rootUrl) {
    return _base + rootUrl;
  }

  // Wrap matched query terms in <mark> tags within a text snippet.
  function highlight(text, terms) {
    let out = text;
    terms.forEach(term => {
      if (!term) return;
      const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  // Run a search query and render results into #search-results.
  function runSearch(query) {
    const raw = query.trim();
    if (!raw) {
      resultsEl.innerHTML = '<div class="search-hint">Type to search pages across the whole site.</div>';
      return;
    }

    // Split into individual terms (filter empty strings)
    const terms = raw.toLowerCase().split(/\s+/).filter(Boolean);

    // Score each entry: count how many terms appear in title+section+body
    const scored = SEARCH_INDEX.map(entry => {
      const haystack = (entry.title + ' ' + entry.section + ' ' + entry.body).toLowerCase();
      let score = 0;
      terms.forEach(t => {
        if (entry.title.toLowerCase().includes(t)) score += 4;   // title match = highest weight
        else if (entry.section.toLowerCase().includes(t)) score += 2;
        else if (haystack.includes(t)) score += 1;
      });
      return { entry, score };
    });

    // Keep only entries that matched at least one term, sorted best-first
    const matches = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);  // cap at 10 results

    if (!matches.length) {
      resultsEl.innerHTML = '<div class="search-hint">No results found for "<strong>' +
        raw.replace(/</g,'&lt;') + '</strong>".</div>';
      return;
    }

    resultsEl.innerHTML = matches.map(({ entry }) => {
      const snippet = highlight(entry.snippet, terms);
      return `<a class="search-result" href="${resolveUrl(entry.url)}" role="option">
        <div class="search-result-section">${entry.section}</div>
        <div class="search-result-title">${highlight(entry.title, terms)}</div>
        <div class="search-result-snippet">${snippet}</div>
      </a>`;
    }).join('');
  }

  function openSearch() {
    overlay.classList.add('open');
    searchInput.value = '';
    resultsEl.innerHTML = '<div class="search-hint">Type to search pages across the whole site.</div>';
    // Delay focus slightly so the overlay transition doesn't swallow it
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);

  // Live search as the user types
  searchInput.addEventListener('input', () => runSearch(searchInput.value));

  // Keyboard: Escape closes the overlay; Enter follows the first result
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'Enter') {
      const first = resultsEl.querySelector('.search-result');
      if (first) first.click();
    }
  });

  // Click outside the search-box panel (on the dark backdrop) closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  // Global keyboard shortcut: press "/" to open search (when not typing in an input)
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
  });
});  // end DOMContentLoaded
