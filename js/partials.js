/* =============================================================
   PAARDEKRAAL KLIPHUIS — shared header, nav & footer
   These three blocks appear on EVERY page. Edit them here ONCE
   and the change applies to all six pages automatically.
   ============================================================= */

/* -------------------------------------------------------------
   OWNER-EDITABLE SITE DETAILS  ← change these freely
   ------------------------------------------------------------- */
const SITE = {
  title:   "Paardekraal Kliphuis",
  tagline: "A destination worth the journey.",

  /* Footer closing line (brief §1.3) — keep it short and evocative. */
  footerQuote:
    "…no infrastructure to lean on, and no shortcuts. The land asks something of you, " +
    "and in return it gives you silence, strangeness, and the beauty of a land that " +
    "stays with you long after you've left.",

  /* Contact details — drop in your real number & email. */
  whatsappNumber:  "+27 XX XXX XXXX",          // shown to visitors
  whatsappLink:    "27000000000",              // wa.me/<this> — digits only, no + or spaces
  email:           "stay@paardekraalkliphuis.co.za",
};

/* Navigation items — order matters (brief §1.2). */
const NAV = [
  { id: "home",          label: "Home",          href: "index.html" },
  { id: "accommodation", label: "Accommodation", href: "accommodation.html" },
  { id: "activities",    label: "Activities",    href: "activities.html" },
  { id: "location",      label: "Location",      href: "location.html" },
  { id: "gallery",       label: "Gallery",       href: "gallery.html" },
  { id: "info",          label: "General Info",  href: "general-info.html" },
];

/* =============================================================
   Below this line is layout wiring — no need to edit.
   ============================================================= */

function buildHeader() {
  return `
  <header class="site-header">
    <h1 class="site-title">${SITE.title}</h1>
    <hr class="header-rule" />
    <p class="site-tagline">${SITE.tagline}</p>
  </header>
  <nav class="site-nav" aria-label="Primary">
    <div class="nav-inner">
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list">
        <span class="bars"><span></span></span> Menu
      </button>
      <ul class="nav-list" id="nav-list">
        ${NAV.map(n => `<li><a href="${n.href}" data-nav="${n.id}">${n.label}</a></li>`).join("")}
      </ul>
    </div>
  </nav>`;
}

function buildFooter() {
  const wa = "https://wa.me/" + SITE.whatsappLink;
  const mail = "mailto:" + SITE.email;
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-quote">${SITE.footerQuote}</p>
      <hr class="footer-rule" />
      <div class="footer-contacts">
        <a href="${wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>
          <span>WhatsApp: ${SITE.whatsappNumber}</span>
        </a>
        <a href="${mail}" aria-label="Send an email">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.01L4.4 7H19.6L12 12.01ZM4 8.24V17h16V8.24l-7.43 4.88a1 1 0 0 1-1.14 0L4 8.24Z"/></svg>
          <span>Email: ${SITE.email}</span>
        </a>
      </div>
      <p class="footer-meta">© <span id="year"></span> ${SITE.title} · Western Cape, South Africa</p>
    </div>
  </footer>`;
}

function initLayout() {
  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = buildHeader();
  if (footerSlot) footerSlot.outerHTML = buildFooter();

  // Active nav state from <body data-page="...">
  const current = document.body.getAttribute("data-page");
  if (current) {
    const link = document.querySelector(`.nav-list a[data-nav="${current}"]`);
    if (link) link.setAttribute("aria-current", "page");
  }

  // Mobile menu toggle
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // close menu when a link is tapped
    nav.querySelectorAll(".nav-list a").forEach(a =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // Current year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  initLightbox();
  initMotion();
}

/* ---------------------------------------------------------------
   MOTION — scroll-reveal, sticky-nav shadow, header parallax.
   All guarded by the user's "reduce motion" preference.
   --------------------------------------------------------------- */
function initMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Scroll-reveal: tag the natural content blocks, then reveal on enter. */
  const targets = document.querySelectorAll(
    ".section .container, .page-banner .container, .bird-card, " +
    ".gallery-grid figure, .table-wrap, .hero-figure, .map-frame"
  );
  targets.forEach(el => el.setAttribute("data-reveal", ""));

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("in"));
  } else {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger siblings within the same grid/group for a cascade effect
        const group = el.parentElement;
        const sibs = group ? [...group.children].filter(c => c.hasAttribute("data-reveal")) : [el];
        const idx = sibs.indexOf(el);
        el.style.setProperty("--reveal-delay", Math.min(idx, 6) * 90 + "ms");
        el.classList.add("in");
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(el => {
      // anything already on-screen at load reveals right away (no flash)
      if (el.getBoundingClientRect().top < vh * 0.95) {
        requestAnimationFrame(() => el.classList.add("in"));
      } else {
        io.observe(el);
      }
    });

    // failsafe: if anything is still hidden after 1.6s, force it fully visible
    // (removing the attribute drops the opacity rule entirely — no transition dependency).
    setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.in)").forEach(el => {
        el.classList.add("in");
        el.removeAttribute("data-reveal");
      });
    }, 1600);
  }

  /* 2. Sticky-nav shadow once the header scrolls away. */
  const nav = document.querySelector(".site-nav");
  const header = document.querySelector(".site-header");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || window.pageYOffset;
      if (nav) nav.classList.toggle("scrolled", y > 40);
      // 3. Header parallax — background drifts at ~35% of scroll speed.
      if (header && !reduce) {
        header.style.backgroundPosition = "center calc(50% + " + (y * 0.35) + "px)";
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Gallery lightbox (only runs if a .gallery-grid exists) */
function initLightbox() {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `<button class="close" aria-label="Close">×</button><img alt="" />`;
  document.body.appendChild(box);
  const boxImg = box.querySelector("img");

  grid.addEventListener("click", e => {
    const btn = e.target.closest("button.tile");
    if (!btn) return;
    const img = btn.querySelector("img");
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || "";
    box.classList.add("open");
  });

  function close() { box.classList.remove("open"); boxImg.src = ""; }
  box.addEventListener("click", e => { if (e.target === box || e.target.classList.contains("close")) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLayout);
} else {
  initLayout();
}
