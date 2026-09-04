/* ---------------------------------------------------------
   AVAZORA — Sacred Indian Temple & Heritage Tourism
   Interactive JavaScript Architecture & Data Layer
---------------------------------------------------------- */

const API_BASE = "http://localhost:8000/api";

async function apiGet(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.warn(`Avazora API unavailable for ${path}, utilizing rich fallback data.`, err);
    return fallback;
  }
}

const REGIONS = [
  { id: "south", label: "South India", blurb: "The heartland of Dravidian gopurams, bronze-age temple towns, and unbroken ritual calendars.", states: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"] },
  { id: "north", label: "North India", blurb: "Nagara shikharas rising from the Gangetic plains, Himalayan shrines, and the Char Dham pilgrimage route.", states: ["Uttar Pradesh", "Uttarakhand", "Rajasthan", "Haryana", "Delhi"] },
  { id: "east", label: "East India", blurb: "Kalinga temple science, terracotta shrines, and the living chariot festivals of the Bay of Bengal coast.", states: ["Odisha", "West Bengal", "Bihar", "Jharkhand"] },
  { id: "west", label: "West India", blurb: "Rock-cut cave temples, Solanki-era stepwells, and marble Jain shrines in the Aravallis.", states: ["Gujarat", "Maharashtra", "Goa"] },
  { id: "central", label: "Central India", blurb: "The sculptural peak of Nagara art — Khajuraho's spires and the sandstone shrines of the Vindhyas.", states: ["Madhya Pradesh", "Chhattisgarh"] },
  { id: "northeast", label: "Northeast India", blurb: "Ahom-era shrines and syncretic hill temples where Vedic and indigenous traditions meet.", states: ["Assam", "Tripura", "Meghalaya"] },
];

const FALLBACK_TEMPLES = [
  { name: "Brihadeeswarar Temple", local: "பெரிய கோயில்", city: "Thanjavur, Tamil Nadu", deity: "Shiva", style: "Dravidian", period: "11th century · Chola Dynasty", badge: "UNESCO World Heritage", image: "images/brihadeeswarar.jpg" },
  { name: "Meenakshi Amman Temple", local: "மீனாட்சி அம்மன்", city: "Madurai, Tamil Nadu", deity: "Meenakshi (Parvati)", style: "Dravidian", period: "6th–17th century · Pandya/Nayak", badge: "Living Heritage Shrine", image: "images/meenakshi.jpg" },
  { name: "Konark Sun Temple", local: "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର", city: "Konark, Odisha", deity: "Surya (Sun God)", style: "Kalinga", period: "13th century · Eastern Ganga Dynasty", badge: "UNESCO World Heritage", image: "images/konark.jpg" },
  { name: "Kedarnath Temple", local: "केदारनाथ मंदिर", city: "Rudraprayag, Uttarakhand", deity: "Shiva (Jyotirlinga)", style: "Himalayan Nagara", period: "8th century (Ancient Site)", badge: "Char Dham Circuit", image: "images/kedarnath.jpg" },
  { name: "Kandariya Mahadeva", local: "कंदारिया महादेव", city: "Khajuraho, Madhya Pradesh", deity: "Shiva", style: "Nagara", period: "11th century · Chandela Dynasty", badge: "UNESCO World Heritage", image: "images/kandariya.jpg" },
  { name: "Lingaraj Temple", local: "ଲିଙ୍ଗରାଜ ମନ୍ଦିର", city: "Bhubaneswar, Odisha", deity: "Harihara (Shiva/Vishnu)", style: "Kalinga", period: "11th century · Somavamshi Dynasty", badge: "Living Heritage Shrine", image: "images/lingaraj.jpg" },
];

const ARCH_PARTS = [
  { id: "gopuram", label: "Gopuram Tower", y: 6, h: 34, desc: "The monumental gateway tower marking a temple's outer sanctuary entrance — in South Indian temple towns, these soaring towers reach up to 200ft, defining the sacred skyline." },
  { id: "vimana", label: "Vimana Spire", y: 42, h: 18, desc: "The sanctum tower positioned directly above the garbhagriha. Pyramidal and stepped in Dravidian art; gracefully curving inward as a Shikhara in Nagara architecture." },
  { id: "mandapam", label: "Pillared Mandapam", y: 62, h: 14, desc: "Colonnaded assembly halls for sacred dance, musical rituals, and royal processions — sculpted with intricate pillars depicting celestial legends." },
  { id: "sanctum", label: "Garbhagriha (Sanctum)", y: 78, h: 12, desc: "The innermost womb-chamber housing the main deity — intentionally unadorned, dark, and serene, symbolizing the still center of the cosmos." },
  { id: "prakaram", label: "Prakaram Courtyard", y: 92, h: 6, desc: "The circumambulatory corridor surrounding the sanctum, often arranged in multi-layered concentric stone walls expanding across centuries." },
];

const FALLBACK_TRAILS = [
  { name: "Chola Imperial Heritage Trail", region: "Tamil Nadu", temples: 5, days: "3–4 days", desc: "Journey through the great living Chola temples — Thanjavur, Gangaikonda Cholapuram, and Darasuram." },
  { name: "Pan-India 12 Jyotirlinga Trail", region: "Pan-India", temples: 12, days: "18–21 days", desc: "The sacred circuit of self-manifest Shiva shrines, spanning Somnath, Mahakaleshwar, and Kedarnath." },
  { name: "Himalayan Char Dham Circuit", region: "Uttarakhand", temples: 4, days: "9–12 days", desc: "Yamunotri, Gangotri, Kedarnath, and Badrinath — the revered high-altitude Himalayan pilgrimage." },
  { name: "UNESCO World Heritage Circuit", region: "Pan-India", temples: 8, days: "10–14 days", desc: "Explore India's globally inscribed temple monuments, from Hampi and Pattadakal to Khajuraho." },
];

const FALLBACK_FESTIVALS = [
  { name: "Mahashivaratri Vigil", when: "Feb–Mar", temple: "Pan-India Shiva Temples", note: "A night-long vigil of sacred chanting, fasting, and ritual abhishekam honoring Shiva's cosmic dance." },
  { name: "Chithirai Celestial Wedding", when: "Apr", temple: "Meenakshi Amman Temple, Madurai", note: "The grand annual coronation and celestial wedding of Goddess Meenakshi and Lord Sundareswarar." },
  { name: "Karthigai Deepam Festival", when: "Nov–Dec", temple: "Arunachaleswarar, Tiruvannamalai", note: "A colossal holy fire beacon is lit atop Arunachala Hill, symbolizing Shiva as eternal light." },
  { name: "Puri Rath Yatra Chariots", when: "Jun–Jul", temple: "Jagannath Temple, Puri", note: "Colossal wooden chariots carrying Lord Jagannath, Balabhadra, and Subhadra through sacred streets." },
];

let state = {
  region: "south",
  arch: "gopuram",
  festival: 0,
  activeFilter: "All",
  searchQuery: "",
  soundEnabled: true,
  temples: FALLBACK_TEMPLES,
  trails: FALLBACK_TRAILS,
  festivals: FALLBACK_FESTIVALS,
  aiHistory: [
    { q: "What is the best time to visit Meenakshi Amman Temple in Madurai?", a: "Early morning between 6:00 AM and 8:00 AM offers serene light and peaceful darshan through the Thousand Pillar Hall. The evening prayer ceremony (9:00 PM) is also deeply spiritual." },
    { q: "Which ancient Shiva temples are near Chennai for a weekend yatra?", a: "Within a 3-hour drive: Thiruvanmiyur Marundeeswarar Temple, Mahabalipuram Shore Temple (8th-century UNESCO site), and Kanchipuram Ekambareswarar Temple (representing the Earth element)." }
  ]
};

// Audio sound disabled
function playTempleChime() {}

function mapTempleFromApi(t) {
  let img = "images/brihadeeswarar.jpg";
  if (t.name.includes("Meenakshi")) img = "images/meenakshi.jpg";
  else if (t.name.includes("Konark")) img = "images/konark.jpg";
  else if (t.name.includes("Kedarnath")) img = "images/kedarnath.jpg";
  else if (t.name.includes("Kandariya")) img = "images/kandariya.jpg";
  else if (t.name.includes("Lingaraj")) img = "images/lingaraj.jpg";

  return {
    name: t.name,
    local: t.local_name || "",
    city: t.city || "",
    deity: t.deity || "",
    style: t.architecture_style || "Traditional",
    period: t.historical_period || "Ancient",
    badge: t.heritage_status || "Heritage Site",
    image: img,
  };
}

async function loadLiveData() {
  const [apiTemples, apiTrails, apiFestivals] = await Promise.all([
    apiGet("/temples", null),
    apiGet("/trails", null),
    apiGet("/festivals", null),
  ]);

  if (apiTemples && apiTemples.length) state.temples = apiTemples.map(mapTempleFromApi);
  if (apiTrails && apiTrails.length) state.trails = apiTrails.map(t => ({ name: t.name, region: t.region, temples: t.temple_count || 4, days: t.recommended_days || "3 days", desc: t.description || "" }));
  if (apiFestivals && apiFestivals.length) state.festivals = apiFestivals.map(f => ({ name: f.name, when: f.typical_timing, temple: f.temple_name, note: f.significance }));
}

function skylineSVG(tone, withDiyas) {
  if (tone === "hero") {
    return `
      <path d="M0,240 L0,140 L60,140 L60,90 L90,90 L90,60 L150,60 L150,30 L190,30 L190,10 L230,10 L230,30 L270,30 L270,60 L330,60 L330,90 L360,90 L360,140 L420,140 L420,240 Z" fill="rgba(232,190,120,0.12)"/>
      <path d="M60,240 L60,160 L120,160 L120,120 L160,120 L160,80 L220,80 L220,50 L260,50 L260,80 L320,80 L320,120 L360,120 L360,160 L420,160 L420,240 Z" fill="rgba(232,190,120,0.18)" transform="translate(380,0)"/>
      <path d="M0,240 L0,180 L50,180 L50,150 L90,150 L90,120 L130,120 L130,95 L160,95 L160,75 L190,75 L190,60 L220,60 L220,75 L250,75 L250,95 L280,95 L280,120 L320,120 L320,150 L360,150 L360,180 L410,180 L410,240 Z" fill="rgba(232,190,120,0.25)" transform="translate(760,0)"/>
    `;
  }
  const band = "M0,260 L0,180 L50,180 L50,140 L90,140 L90,100 L130,100 L130,70 L160,70 L160,50 L190,50 L190,35 L220,35 L220,50 L250,50 L250,70 L280,70 L280,100 L320,100 L320,140 L360,140 L360,180 L410,180 L410,260 Z";
  let out = [0, 380, 760].map(x => `<path d="${band}" fill="rgba(200,151,65,0.35)" transform="translate(${x},0)"/>`).join("");
  if (withDiyas) {
    out += [110,190,270,490,570,650,870,950,1030].map((cx, i) =>
      `<circle class="diya" cx="${cx}" cy="70" r="2.8" fill="#E8BE78" style="animation-delay:${i*0.4}s"/>`
    ).join("");
  }
  return out;
}

function renderRegions() {
  const tabsContainer = document.getElementById("regionTabs");
  if (!tabsContainer) return;
  tabsContainer.innerHTML = REGIONS.map(r =>
    `<button class="region-tab ${r.id === state.region ? "active" : ""}" data-region="${r.id}">${r.label}</button>`
  ).join("");

  const r = REGIONS.find(x => x.id === state.region) || REGIONS[0];
  document.getElementById("regionPanel").innerHTML = `
    <div>
      <div class="eyebrow" style="margin-bottom:10px"><span class="dash"></span>${r.label.toUpperCase()} REGIONAL HERITAGE</div>
      <p class="region-blurb f-cinzel">${r.blurb}</p>
      <a class="region-link" href="#temples" onclick="window.filterByRegion('${r.id}')">Explore shrines in ${r.label} <span data-icon="chevron-right"></span></a>
    </div>
    <div>
      ${r.states.map(s => `<span class="state-chip"><span data-icon="map-pin"></span>${s}</span>`).join("")}
    </div>
  `;

  document.querySelectorAll(".region-tab").forEach(btn =>
    btn.addEventListener("click", () => {
      state.region = btn.dataset.region;
      playTempleChime();
      renderRegions();
    })
  );
}

function filterTemples() {
  return state.temples.filter(t => {
    const q = state.searchQuery.toLowerCase();
    const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.deity.toLowerCase().includes(q) || t.style.toLowerCase().includes(q) || t.period.toLowerCase().includes(q) || t.badge.toLowerCase().includes(q);
    
    if (!matchesQuery) return false;

    if (state.activeFilter === "All") return true;
    if (state.activeFilter === "UNESCO Heritage") return t.badge.includes("UNESCO");
    if (state.activeFilter === "Dravidian") return t.style.includes("Dravidian");
    if (state.activeFilter === "Nagara") return t.style.includes("Nagara");
    if (state.activeFilter === "Kalinga") return t.style.includes("Kalinga");
    if (state.activeFilter === "Shiva") return t.deity.includes("Shiva");
    if (state.activeFilter === "Vishnu") return t.deity.includes("Vishnu") || t.deity.includes("Surya");
    return true;
  });
}

function renderTemples() {
  const filterRow = document.getElementById("filterRow");
  if (!filterRow) return;

  const filterOptions = ["All", "UNESCO Heritage", "Dravidian", "Nagara", "Kalinga", "Shiva", "Vishnu"];
  filterRow.innerHTML = filterOptions.map(f =>
    `<button class="filter-chip ${f === state.activeFilter ? "active" : ""}" data-filter="${f}">${f}</button>`
  ).join("");

  const filtered = filterTemples();
  const countEl = document.getElementById("resultsCount");
  if (countEl) countEl.innerText = `Showing ${filtered.length} of ${state.temples.length} sacred attractions`;

  const gridEl = document.getElementById("templeGrid");
  if (!gridEl) return;

  if (filtered.length === 0) {
    gridEl.innerHTML = `<div style="grid-column:1/-1; padding:48px; text-align:center; background:#fff; border-radius:4px; border:1px solid var(--gold);">
      <h3 class="f-cinzel" style="color:var(--green-deep);">No sacred shrines found</h3>
      <p style="color:#666; font-size:14px;">Try modifying your search filter or key phrase.</p>
    </div>`;
    return;
  }

  gridEl.innerHTML = filtered.map(t => `
    <div class="t-card carved-frame" onclick="window.openTempleDetail('${t.name}')">
      <div class="t-image" style="background-image: url('${t.image}')">
        <div class="t-image-overlay"></div>
        <span class="t-badge">${t.badge}</span>
      </div>
      <div class="t-body">
        <div class="t-name f-cinzel">${t.name}</div>
        <div class="t-local">${t.local}</div>
        <div class="t-meta"><span data-icon="map-pin"></span>${t.city}</div>
        <div class="t-meta"><span data-icon="sparkles"></span>${t.deity} · ${t.style}</div>
        <div class="t-meta"><span data-icon="landmark"></span>${t.period}</div>
        <div class="t-explore">Explore Attraction <span data-icon="chevron-right"></span></div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".filter-chip").forEach(btn =>
    btn.addEventListener("click", () => {
      state.activeFilter = btn.dataset.filter;
      playTempleChime();
      renderTemples();
    })
  );
}

function renderArchitecture() {
  const diagEl = document.getElementById("archDiagram");
  if (!diagEl) return;

  diagEl.innerHTML = ARCH_PARTS.map(p => `
    <div class="arch-band ${p.id === state.arch ? "active" : ""}" style="top:${p.y}%; height:${p.h}%" data-arch="${p.id}">${p.label}</div>
  `).join("");

  document.getElementById("archList").innerHTML = ARCH_PARTS.map(p => `
    <div class="arch-row ${p.id === state.arch ? "active" : ""}" data-arch="${p.id}">
      <div class="label">${p.label} <span data-icon="chevron-right"></span></div>
      <div class="desc">${p.desc}</div>
    </div>
  `).join("");

  document.querySelectorAll("[data-arch]").forEach(el =>
    el.addEventListener("click", () => {
      state.arch = el.dataset.arch;
      playTempleChime();
      renderArchitecture();
    })
  );
}

function renderTrails() {
  const trailRow = document.getElementById("trailRow");
  if (!trailRow) return;

  trailRow.innerHTML = state.trails.map(t => `
    <div class="trail-card carved-frame">
      <span data-icon="route"></span>
      <div class="tname f-cinzel">${t.name}</div>
      <div class="tregion f-utility">${t.region}</div>
      <div class="tdesc">${t.desc}</div>
      <div class="trail-meta">
        <div><div class="num">${t.temples}</div>Shrines</div>
        <div><div class="num">${t.days}</div>Duration</div>
      </div>
    </div>
  `).join("");
}

function renderFestivals() {
  const festTabs = document.getElementById("festTabs");
  if (!festTabs) return;

  festTabs.innerHTML = state.festivals.map((f, i) =>
    `<button class="fest-tab ${i === state.festival ? "active" : ""}" data-fest="${i}">${f.name}</button>`
  ).join("");

  const f = state.festivals[state.festival] || state.festivals[0];
  document.getElementById("festPanel").innerHTML = `
    <div>
      <div class="fest-when f-cinzel">${f.when}</div>
      <div class="fest-timing f-utility"><span data-icon="calendar"></span> Annual Sacred Timing</div>
    </div>
    <div>
      <div class="fest-name f-cinzel">${f.name}</div>
      <div class="fest-temple">${f.temple}</div>
      <p class="fest-note">${f.note}</p>
    </div>
  `;

  document.querySelectorAll("[data-fest]").forEach(btn =>
    btn.addEventListener("click", () => {
      state.festival = Number(btn.dataset.fest);
      playTempleChime();
      renderFestivals();
    })
  );
}

function renderAI() {
  const shellEl = document.getElementById("aiShell");
  if (!shellEl) return;

  const bubbles = state.aiHistory.map(ex => `
    <div style="margin-bottom:20px">
      <div class="ai-bubble-q">${ex.q}</div>
      <div class="ai-bubble-a">${ex.a}</div>
    </div>
  `).join("");

  shellEl.innerHTML = `
    ${bubbles}
    <form id="aiForm" onsubmit="event.preventDefault(); window.submitAiQuestion();">
      <div class="ai-input">
        <input id="aiInput" placeholder="Ask about a temple, trail, or festival..." />
        <button type="submit" class="ai-submit-btn" data-icon="compass" title="Send Question"></button>
      </div>
    </form>
  `;

  document.querySelectorAll(".prompt-chip").forEach(chip => {
    chip.onclick = () => {
      const q = chip.dataset.query;
      document.getElementById("aiInput").value = q;
      window.submitAiQuestion();
    };
  });
}

window.submitAiQuestion = function() {
  const input = document.getElementById("aiInput");
  if (!input || !input.value.trim()) return;
  const q = input.value.trim();
  playTempleChime();

  let a = "Avazora's verified archives record this temple's origins, ritual calendar, and architectural lineage. For detailed travel planning, you can also build a custom itinerary via our Yatra Builder.";
  
  if (q.toLowerCase().includes("madurai")) {
    a = "In Madurai, visit Meenakshi Amman Temple during morning pooja (6:00 AM). Be sure to explore Thirumalai Nayakkar Palace and the surrounding street craft markets.";
  } else if (q.toLowerCase().includes("chola") || q.toLowerCase().includes("unesco")) {
    a = "The Great Living Chola Temples (Thanjavur Brihadeeswarar, Gangaikonda Cholapuram, and Darasuram Airavatesvara) are UNESCO World Heritage sites renowned for granite vimanas and Chola frescoes.";
  } else if (q.toLowerCase().includes("deepam")) {
    a = "Karthigai Deepam at Arunachaleswarar Temple features a giant sacred beacon lit atop Annamalai Hill, symbolizing Shiva as cosmic fire.";
  }

  state.aiHistory.push({ q, a });
  renderAI();
};

window.openTempleDetail = function(name) {
  playTempleChime();
  
  // Find the temple in state
  const temple = state.temples.find(t => t.name === name);
  if (!temple) return;
  
  // Populate modal with temple data
  document.getElementById("templeDetailImg").src = temple.image;
  document.getElementById("templeDetailBadge").textContent = temple.badge;
  document.getElementById("templeDetailName").textContent = temple.name;
  document.getElementById("templeDetailLocal").textContent = temple.local;
  document.getElementById("templeDetailCity").textContent = temple.city;
  document.getElementById("templeDetailDeity").textContent = temple.deity;
  document.getElementById("templeDetailStyle").textContent = temple.style;
  document.getElementById("templeDetailPeriod").textContent = temple.period;
  
  // Generate description based on temple data
  const descriptions = {
    "Brihadeeswarar Temple": "One of the greatest achievements of Chola architecture, the Brihadeeswarar Temple is a UNESCO World Heritage Site. The towering vimana (spire) rises 216 feet above the sanctuary, showcasing the pinnacle of Dravidian architectural excellence with intricate stone work and enduring granite construction.",
    "Meenakshi Amman Temple": "This ancient temple dedicated to Goddess Meenakshi is the heart of Madurai. Known for its magnificent gopurams (gateway towers) and the sacred Thousand Pillar Hall, it attracts devotees seeking the divine wedding ceremony of Meenakshi and Lord Sundareswarar.",
    "Konark Sun Temple": "A masterpiece of 13th-century Kalinga architecture, the Konark Sun Temple is designed as a colossal chariot of Surya (Sun God). Adorned with intricate stone carvings and sculptures, this UNESCO World Heritage Site represents the zenith of Odia temple design.",
    "Kedarnath Temple": "Nestled in the Himalayas at an altitude of 3,583 meters, Kedarnath Temple is one of the four sacred sites of the Char Dham pilgrimage. Dedicated to Shiva, it is one of the twelve Jyotirlingas and holds profound spiritual significance.",
    "Kandariya Mahadeva": "The largest temple of the Khajuraho group, Kandariya Mahadeva exemplifies the height of Nagara architecture from the 11th century Chandela period. Its soaring shikhara and intricate sculptural details make it a UNESCO World Heritage masterpiece.",
    "Lingaraj Temple": "The principal temple of Bhubaneswar, Lingaraj Temple is a stunning example of Kalinga architecture. The main tower rises majestically above the city, and the temple remains an active worship center, making it a living heritage site."
  };
  
  const desc = descriptions[temple.name] || "This sacred temple holds deep spiritual significance in Indian heritage and architecture. It serves as a place of pilgrimage and spiritual awakening for devotees across the country.";
  document.getElementById("templeDetailDescription").textContent = desc;
  
  // Set default visiting information
  document.getElementById("templeDetailTiming").textContent = "6:00 AM - 8:00 PM (varies by temple)";
  document.getElementById("templeDetailFee").textContent = "Free (Donation welcomed)";
  document.getElementById("templeDetailBestTime").textContent = "Early morning (5:00-8:00 AM) for peaceful darshan and optimal lighting";
  
  // Show modal
  const backdrop = document.getElementById("templeDetailBackdrop");
  if (backdrop) backdrop.classList.add("open");
};

window.filterByRegion = function(regionId) {
  state.activeFilter = "All";
  state.searchQuery = regionId;
  const input = document.getElementById("searchInput");
  if (input) input.value = regionId;
  renderTemples();
};

function initNav() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("solid", window.scrollY > 24);
  });

  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("data-icon", open ? "x" : "menu");
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("data-icon", "menu");
    }));
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  if (input) {
    input.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = state.searchQuery ? "inline-block" : "none";
      renderTemples();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      if (input) input.value = "";
      clearBtn.style.display = "none";
      renderTemples();
    });
  }
}

function initModals() {
  const backdrop = document.getElementById("modalBackdrop");
  const watchLink = document.getElementById("watchLink");
  const modalClose = document.getElementById("modalClose");
  const closeReelBtn = document.getElementById("closeReelBtn");

  if (watchLink && backdrop) {
    watchLink.addEventListener("click", () => { playTempleChime(); backdrop.classList.add("open"); });
  }
  if (modalClose) modalClose.addEventListener("click", () => backdrop.classList.remove("open"));
  if (closeReelBtn) closeReelBtn.addEventListener("click", () => backdrop.classList.remove("open"));

  // Yatra Modal
  const yatraBackdrop = document.getElementById("yatraModalBackdrop");
  const openYatraModalBtn = document.getElementById("openYatraModal");
  const heroYatraBtn = document.getElementById("heroYatraBtn");
  const yatraClose = document.getElementById("yatraModalClose");

  const openYatra = () => { playTempleChime(); if (yatraBackdrop) yatraBackdrop.classList.add("open"); };
  if (openYatraModalBtn) openYatraModalBtn.onclick = openYatra;
  if (heroYatraBtn) heroYatraBtn.onclick = openYatra;
  if (yatraClose && yatraBackdrop) yatraClose.onclick = () => yatraBackdrop.classList.remove("open");

  window.submitYatraPlan = function() {
    playTempleChime();
    const reg = document.getElementById("yatraRegionSelect").value;
    const days = document.getElementById("yatraDaysInput").value;
    const res = document.getElementById("yatraResult");
    if (res) {
      res.style.display = "block";
      res.innerHTML = `<strong>Yatra Itinerary Created!</strong><br/>Region: ${reg}<br/>Duration: ${days} Days.<br/>Your customized day-by-day temple stops have been generated.`;
    }
  };

  // Temple Detail Modal
  const templeDetailBackdrop = document.getElementById("templeDetailBackdrop");
  const templeDetailClose = document.getElementById("templeDetailClose");
  const templeDetailClose2 = document.getElementById("templeDetailClose2");
  
  if (templeDetailClose && templeDetailBackdrop) {
    templeDetailClose.addEventListener("click", () => templeDetailBackdrop.classList.remove("open"));
  }
  if (templeDetailClose2 && templeDetailBackdrop) {
    templeDetailClose2.addEventListener("click", () => templeDetailBackdrop.classList.remove("open"));
  }
  
  // Close modal when clicking outside of it
  if (templeDetailBackdrop) {
    templeDetailBackdrop.addEventListener("click", (e) => {
      if (e.target === templeDetailBackdrop) {
        templeDetailBackdrop.classList.remove("open");
      }
    });
  }
}

function initSkylines() {
  const heroSky = document.getElementById("heroSkyline");
  const divSky = document.getElementById("dividerSkyline");
  if (heroSky) heroSky.innerHTML = skylineSVG("hero", false);
  if (divSky) divSky.innerHTML = skylineSVG("divider", true);
}

/* ------------------------------------------------------------------ */
/*  HERO VIDEO — force-play with full fallback                          */
/* ------------------------------------------------------------------ */
function forceHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  // Ensure all required attributes are set via JS too (belt & suspenders)
  video.muted    = true;
  video.autoplay = true;
  video.loop     = true;
  video.playsInline = true;

  function tryPlay() {
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        // Autoplay blocked — listen for any user gesture, then play
        const resume = () => { video.play(); document.removeEventListener("click", resume); };
        document.addEventListener("click", resume, { once: true });
      });
    }
  }

  // If video already has enough data, play immediately
  if (video.readyState >= 3) {
    tryPlay();
  } else {
    video.addEventListener("canplay", tryPlay, { once: true });
  }

  // If the video source errors (wrong codec, file not found, etc.)
  // fall back to a CSS image slideshow so the hero is never blank
  video.addEventListener("error", () => {
    console.warn("Avanora: hero video failed to load — activating image slideshow fallback.");
    activateImageSlideshowFallback();
  });

  const source = video.querySelector("source");
  if (source) {
    source.addEventListener("error", () => {
      console.warn("Avanora: video source error — activating image slideshow fallback.");
      activateImageSlideshowFallback();
    });
  }
}

/* ------------------------------------------------------------------ */
/*  IMAGE SLIDESHOW FALLBACK (if video fails)                          */
/*  Cycles through the 6 temple images using CSS keyframes injected    */
/*  at runtime. No extra files needed.                                 */
/* ------------------------------------------------------------------ */
function activateImageSlideshowFallback() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  const images = [
    "images/brihadeeswarar.jpg",
    "images/meenakshi.jpg",
    "images/konark.jpg",
    "images/kedarnath.jpg",
    "images/kandariya.jpg",
    "images/lingaraj.jpg",
  ];

  const n   = images.length;
  const dur = 8; // seconds per image

  // Build CSS keyframes for each slide layer
  let style = "<style>";
  images.forEach((src, i) => {
    const start = (i / n) * 100;
    const peak  = ((i + 0.5) / n) * 100;
    const end   = ((i + 1) / n) * 100;
    style += `
      @keyframes slide${i} {
        0%          { opacity: 0; transform: scale(1.00); }
        ${start}%   { opacity: 0; transform: scale(1.00); }
        ${Math.min(start + 5, 100)}% { opacity: 1; transform: scale(1.00); }
        ${peak}%    { opacity: 1; transform: scale(1.08); }
        ${Math.min(end - 1, 100)}%  { opacity: 0; transform: scale(1.12); }
        100%        { opacity: 0; transform: scale(1.12); }
      }
      .slide-layer-${i} {
        position: absolute; inset: 0; z-index: 1;
        background: url('${src}') center/cover no-repeat;
        opacity: 0;
        animation: slide${i} ${n * dur}s ease-in-out infinite;
        animation-delay: 0s;
      }
    `;
  });
  style += "</style>";
  document.head.insertAdjacentHTML("beforeend", style);

  // Hide the broken video element
  const vid = document.querySelector(".hero-video");
  if (vid) vid.style.display = "none";

  // Inject slide layers into hero
  images.forEach((_, i) => {
    const div = document.createElement("div");
    div.className = `slide-layer-${i}`;
    heroSection.prepend(div);
  });
}

/* ------------------------------------------------------------------ */
/*  INIT                                                                */
/* ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", async () => {
  forceHeroVideo();   // <-- video play fix runs first
  initNav();
  initSearch();
  initModals();
  initSkylines();
  renderRegions();
  renderTemples();
  renderArchitecture();
  renderTrails();
  renderFestivals();
  renderAI();

  await loadLiveData();
  renderTemples();
  renderTrails();
  renderFestivals();
});
