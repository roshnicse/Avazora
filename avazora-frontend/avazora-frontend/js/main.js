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
  { name: "Brihadeeswarar Temple", local: "பெரிய கோயில்", city: "Thanjavur", state: "Tamil Nadu", deity: "Shiva", style: "Dravidian", period: "11th century · Chola Dynasty", badge: "UNESCO World Heritage", image: "images/brihadeeswarar.jpg" },
  { name: "Meenakshi Amman Temple", local: "மீனாட்சி அம்மன்", city: "Madurai", state: "Tamil Nadu", deity: "Meenakshi (Parvati)", style: "Dravidian", period: "6th–17th century · Pandya/Nayak", badge: "Living Heritage Shrine", image: "images/meenakshi.jpg" },
  { name: "Konark Sun Temple", local: "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର", city: "Konark", state: "Odisha", deity: "Surya (Sun God)", style: "Kalinga", period: "13th century · Eastern Ganga Dynasty", badge: "UNESCO World Heritage", image: "images/konark.jpg" },
  { name: "Kedarnath Temple", local: "केदारनाथ मंदिर", city: "Rudraprayag", state: "Uttarakhand", deity: "Shiva (Jyotirlinga)", style: "Himalayan Nagara", period: "8th century (Ancient Site)", badge: "Char Dham Circuit", image: "images/kedarnath.jpg" },
  { name: "Kandariya Mahadeva", local: "कंदारिया महादेव", city: "Khajuraho", state: "Madhya Pradesh", deity: "Shiva", style: "Nagara", period: "11th century · Chandela Dynasty", badge: "UNESCO World Heritage", image: "images/kandariya.jpg" },
  { name: "Lingaraj Temple", local: "ଲିଙ୍ଗରାଜ ମନ୍ଦିର", city: "Bhubaneswar", state: "Odisha", deity: "Harihara (Shiva/Vishnu)", style: "Kalinga", period: "11th century · Somavamshi Dynasty", badge: "Living Heritage Shrine", image: "images/lingaraj.jpg" },
  { name: "Kapaleeshwarar Temple", local: "கபாலீஸ்வரர் கோயில்", city: "Chennai", state: "Tamil Nadu", deity: "Shiva", style: "Dravidian", period: "7th century · Pallava/Nayak", badge: "Living Heritage Shrine", image: "images/kapaleeshwarar.jpg" },
  { name: "Thirupparankundram Murugan Temple", local: "திருப்பரங்குன்றம்", city: "Madurai", state: "Tamil Nadu", deity: "Murugan (Kartikeya)", style: "Dravidian", period: "Ancient · Pandya Dynasty", badge: "Arupadai Veedu", image: "images/thirupparankundram.jpg" },
  { name: "Parthasarathy Temple", local: "பார்த்தசாரதி கோயில்", city: "Chennai", state: "Tamil Nadu", deity: "Vishnu (Krishna)", style: "Dravidian", period: "8th century · Pallava Dynasty", badge: "Divya Desam", image: "images/parthasarathy.jpg" },
  { name: "Pazhamudircholai Murugan Temple", local: "பழமுதிர்ச்சோலை", city: "Madurai", state: "Tamil Nadu", deity: "Murugan (Kartikeya)", style: "Dravidian", period: "Ancient · Pandya Dynasty", badge: "Arupadai Veedu", image: "images/pazhamudircholai.jpg" },
  { name: "Kottai Mariamman Temple", local: "கோட்டை மாரியம்மன்", city: "Dindigul", state: "Tamil Nadu", deity: "Mariamman (Durga)", style: "Dravidian", period: "18th century", badge: "Folk Heritage Shrine", image: "images/kottai_mariamman.jpg" },
  { name: "Guruvayur Sri Krishna Temple", local: "ഗുരുവായൂർ ക്ഷേത്രം", city: "Guruvayur", state: "Kerala", deity: "Vishnu (Krishna)", style: "Kerala", period: "Ancient · Bhakti Period", badge: "Living Heritage Shrine", image: "images/guruvayur.jpg" },
  { name: "Sree Padmanabhaswamy Temple", local: "ശ്രീ പദ്മനാഭസ്വാമി ക്ഷേത്രം", city: "Thiruvananthapuram", state: "Kerala", deity: "Vishnu (Padmanabha)", style: "Kerala-Dravidian", period: "8th century · Travancore Kingdom", badge: "UNESCO Tentative List", image: "images/padmanabhaswamy.jpg" },
  { name: "Vadakkunnathan Temple", local: "വടക്കുംനാഥ ക്ഷേത്രം", city: "Thrissur", state: "Kerala", deity: "Shiva", style: "Kerala", period: "Ancient · Perumal Era", badge: "Living Heritage Shrine", image: "images/vadakkunnathan.jpg" },
  { name: "Sabarimala Sree Dharma Sastha Temple", local: "ശബരിമല അയ്യപ്പൻ", city: "Pathanamthitta", state: "Kerala", deity: "Ayyappa (Dharma Sastha)", style: "Kerala", period: "Ancient · Pandalam Dynasty", badge: "Major Pilgrimage Site", image: "images/sabarimala.jpg" }
];

const ARCH_PARTS = [
  { id: "gopuram", label: "Gopuram Tower", y: 6, h: 34, desc: "The monumental gateway tower marking a temple's outer sanctuary entrance — in South Indian temple towns, these soaring towers reach up to 200ft, defining the sacred skyline." },
  { id: "vimana", label: "Vimana Spire", y: 42, h: 18, desc: "The sanctum tower positioned directly above the garbhagriha. Pyramidal and stepped in Dravidian art; gracefully curving inward as a Shikhara in Nagara architecture." },
  { id: "mandapam", label: "Pillared Mandapam", y: 62, h: 14, desc: "Colonnaded assembly halls for sacred dance, musical rituals, and royal processions — sculpted with intricate pillars depicting celestial legends." },
  { id: "sanctum", label: "Garbhagriha (Sanctum)", y: 78, h: 12, desc: "The innermost womb-chamber housing the main deity — intentionally unadorned, dark, and serene, symbolizing the still center of the cosmos." },
  { id: "prakaram", label: "Prakaram Courtyard", y: 92, h: 6, desc: "The circumambulatory corridor surrounding the sanctum, often arranged in multi-layered concentric stone walls expanding across centuries." },
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
  activeState: "All States",
  searchQuery: "",
  soundEnabled: true,
  temples: FALLBACK_TEMPLES,
  festivals: FALLBACK_FESTIVALS,
  aiHistory: [
    { q: "What is the best time to visit Meenakshi Amman Temple in Madurai?", a: "Early morning between 6:00 AM and 8:00 AM offers serene light and peaceful darshan through the Thousand Pillar Hall. The evening prayer ceremony (9:00 PM) is also deeply spiritual." },
    { q: "Which ancient Shiva temples are near Chennai for a weekend yatra?", a: "Within a 3-hour drive: Thiruvanmiyur Marundeeswarar Temple, Mahabalipuram Shore Temple (8th-century UNESCO site), and Kanchipuram Ekambareswarar Temple (representing the Earth element)." }
  ]
};

// Audio sound disabled
function playTempleChime() {}

const TEMPLE_IMAGE_MAP = {
  "brihadeeswarar": "images/brihadeeswarar.jpg",
  "meenakshi": "images/meenakshi.jpg",
  "thirupparankundram": "images/thirupparankundram.jpg",
  "kapaleeshwarar": "images/kapaleeshwarar.jpg",
  "parthasarathy": "images/parthasarathy.jpg",
  "pazhamudircholai": "images/pazhamudircholai.jpg",
  "kottai": "images/kottai_mariamman.jpg",
  "mariamman": "images/kottai_mariamman.jpg",
  "guruvayur": "images/guruvayur.jpg",
  "padmanabhaswamy": "images/padmanabhaswamy.jpg",
  "vadakkunnathan": "images/vadakkunnathan.jpg",
  "sabarimala": "images/sabarimala.jpg",
  "konark": "images/konark.jpg",
  "kedarnath": "images/kedarnath.jpg",
  "kandariya": "images/kandariya.jpg",
  "lingaraj": "images/lingaraj.jpg",
};

function getTempleImage(name, primaryUrl) {
  if (primaryUrl) return primaryUrl;
  const n = (name || "").toLowerCase();
  for (const [key, imgPath] of Object.entries(TEMPLE_IMAGE_MAP)) {
    if (n.includes(key)) return imgPath;
  }
  return "images/brihadeeswarar.jpg";
}

function mapTempleFromApi(t) {
  return {
    name: t.name,
    local: t.local_name || "",
    city: t.city || "",
    state: t.state?.name || "",
    deity: t.deity || "",
    style: t.architecture_style || "Traditional",
    period: t.historical_period || "Ancient",
    badge: t.heritage_status || "Heritage Site",
    image: getTempleImage(t.name, t.primary_image_url),
  };
}

async function loadLiveData() {
  const [apiTemples, apiFestivals] = await Promise.all([
    apiGet("/temples", null),
    apiGet("/festivals", null),
  ]);

  if (apiTemples && apiTemples.length) state.temples = apiTemples.map(mapTempleFromApi);
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
    const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.state.toLowerCase().includes(q) || t.deity.toLowerCase().includes(q) || t.style.toLowerCase().includes(q) || t.period.toLowerCase().includes(q) || t.badge.toLowerCase().includes(q);
    
    if (!matchesQuery) return false;
    if (state.activeState !== "All States" && t.state !== state.activeState) return false;

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
  const gridEl = document.getElementById("templeGrid");
  if (!gridEl) return;

  const filtered = filterTemples();

  if (filtered.length === 0) {
    gridEl.innerHTML = `<div style="grid-column:1/-1;padding:48px;text-align:center;background:#fff;border-radius:12px;border:1px solid #C89741;">
      <h3 style="color:#12382B;font-family:'Cinzel',serif;">No sacred shrines found</h3>
      <p style="color:#666;font-size:14px;">Try modifying your filters.</p>
    </div>`;
    return;
  }

  const ratings = [4.8, 4.7, 4.9, 4.6, 4.8, 4.9, 4.7, 4.8, 4.9, 4.6];
  const counts  = [320, 215, 410, 188, 275, 340, 162, 290, 380, 220];

  gridEl.innerHTML = filtered.map((t, i) => `
    <div class="temple-card-w" style="cursor:pointer" onclick="window.openTempleDetail && window.openTempleDetail('${t.name.replace(/'/g, "\\'")}')">
      <img src="${t.image}" alt="${t.name}" loading="lazy"
           onerror="this.style.minHeight='175px';this.style.background='#EAF5EF';this.removeAttribute('src')">
      <div class="tc-info">
        <div class="tc-name">${t.name}</div>
        <div class="tc-loc">📍 ${t.city}${t.state ? `, ${t.state}` : ""}</div>
        <div class="tc-rating">
          <span class="tc-stars">★★★★★</span>
          <span>${ratings[i % ratings.length]}</span>
          <span class="tc-count">(${counts[i % counts.length]})</span>
        </div>
      </div>
    </div>
  `).join("");
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

  const query = q.toLowerCase();
  let a = "";

  // 1. Questions about duration, minimum travel days, or tour planning
  if (query.includes("how many days") || query.includes("days") || query.includes("duration") || query.includes("min tour") || query.includes("minimum")) {
    if (query.includes("chola") || query.includes("thanjavur")) {
      a = "For the **Chola Heritage Trail** (Thanjavur, Gangaikonda Cholapuram, and Darasuram), a minimum of **3 to 4 days** is recommended to experience the grand temples and local bronze craft traditions.";
    } else if (query.includes("jyotirlinga")) {
      a = "A complete **12 Jyotirlinga Circuit** across India spans **18 to 21 days**. For regional circuits (like Maharashtra 5 Jyotirlingas or Gujarat/MP), **4 to 6 days** is ideal.";
    } else if (query.includes("char dham") || query.includes("kedarnath") || query.includes("himalaya")) {
      a = "The **Himalayan Char Dham Circuit** (Yamunotri, Gangotri, Kedarnath, Badrinath) requires a minimum of **9 to 12 days** due to high-altitude mountain travel and acclimatization.";
    } else if (query.includes("tamil nadu") || query.includes("south india") || query.includes("madurai")) {
      a = "A classic **South India / Tamil Nadu Temple Tour** (Chennai → Kanchipuram → Thanjavur → Madurai → Rameswaram) requires a minimum of **5 to 7 days**.";
    } else {
      a = "Recommended tour durations based on circuit:\n• **Regional / State Temple Trail:** 3 to 5 days\n• **South India Grand Circuit:** 7 to 10 days\n• **Himalayan Char Dham:** 9 to 12 days\n• **Pan-India Jyotirlinga Circuit:** 18 to 21 days\n\nNeed a customized duration? You can also send an enquiry via our **[Contact Page](contact.html)**.";
    }
  }
  // 2. Specific City / Temple questions
  else if (query.includes("madurai") || query.includes("meenakshi")) {
    a = "In Madurai, visit **Meenakshi Amman Temple** during morning darshan (6:00 AM - 8:00 AM) to experience peaceful rituals and the Thousand Pillar Hall. Minimum recommended stay is **2 days**.";
  } else if (query.includes("chola") || query.includes("thanjavur") || query.includes("brihadeeswarar")) {
    a = "The **Great Living Chola Temples** (Brihadeeswarar in Thanjavur, Gangaikonda Cholapuram, and Airavatesvara in Darasuram) are 11th-12th century UNESCO World Heritage sites famous for monumental granite vimanas.";
  } else if (query.includes("unesco")) {
    a = "India's key UNESCO temple sites include the **Great Living Chola Temples** (Tamil Nadu), **Konark Sun Temple** (Odisha), **Khajuraho Group** (Madhya Pradesh), **Hampi & Pattadakal** (Karnataka), and **Mahabalipuram Monuments**.";
  } else if (query.includes("deepam") || query.includes("tiruvannamalai") || query.includes("arunachala")) {
    a = "**Karthigai Deepam** at Arunachaleswarar Temple, Tiruvannamalai features a giant holy beacon lit atop Arunachala Mountain, celebrating Shiva as cosmic fire (Agni Lingam).";
  } else if (query.includes("puri") || query.includes("rath yatra") || query.includes("jagannath")) {
    a = "The **Puri Rath Yatra** in Odisha is held annually in June/July where Lord Jagannath, Balabhadra, and Subhadra are escorted in giant wooden chariots along the Bada Danda.";
  } else if (query.includes("kedarnath") || query.includes("badrinath")) {
    a = "**Kedarnath Temple** (3,583m) is one of the 12 Jyotirlingas and open from May to November. A minimum of **3 days** from Haridwar/Rishikesh is required for the trek and darshan.";
  } else if (query.includes("budget") || query.includes("cost") || query.includes("price") || query.includes("booking")) {
    a = "Tour budgets vary based on vehicle preference, stay category, and temple puja arrangements. You can submit your exact requirements on our **[Contact Page](contact.html)** or message us directly on WhatsApp.";
  } else {
    // 3. Fallback with helpful guidance
    a = `Avazora's verified archives record comprehensive details for **${q}**. You can explore specific shrines in the **Temple Directory**, plan customized routes on our **[Contact Page](contact.html)**, or ask about timing, architecture, festivals, and travel days for any sacred site.`;
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
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(temple.name + ' ' + temple.city)}`;
  document.getElementById("templeDetailCity").innerHTML = `<a href="${mapUrl}" target="_blank" style="color:inherit;text-decoration:underline;">${temple.city} (View Map)</a>`;
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
        0%          { opacity: 0; transform: none; }
        ${start}%   { opacity: 0; transform: none; }
        ${start + 0.1}% { opacity: 1; transform: none; }
        ${end - 0.1}%  { opacity: 1; transform: none; }
        ${end}%        { opacity: 0; transform: none; }
        100%        { opacity: 0; transform: none; }
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
  renderFestivals();
  renderAI();

  try {
    await loadLiveData();
    renderTemples();
    renderFestivals();
  } catch (e) {
    console.warn("API failed to load, keeping fallback data");
  }
});
