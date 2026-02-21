const sportsData = [
  { name: "Cricket Prime League", type: "cricket", desc: "Elite batting drills, bowling tactics, match strategy.", level: "Beginner → Pro", players: "11" },
  { name: "Football Strike Zone", type: "football", desc: "Passing, defending, finishing — sharpen your skills.", level: "All Levels", players: "11" },
  { name: "Basketball Dunk Arena", type: "basketball", desc: "Dribble, shoot, defend — play fast and win smart.", level: "Intermediate", players: "5" },
  { name: "Badminton Smash Court", type: "badminton", desc: "Footwork, reflex, speed — dominate singles/doubles.", level: "All Levels", players: "1/2" },
  { name: "Athletics Power Track", type: "athletics", desc: "Sprint, endurance, strength — break personal records.", level: "All Levels", players: "Solo/Team" },
  { name: "Kabaddi Raid Battle", type: "kabaddi", desc: "Power raids + tactical defense. Teamwork matters.", level: "Intermediate", players: "7" }
];

const sportsGrid = document.getElementById("sportsGrid");
const sportFilter = document.getElementById("sportFilter");
const searchInput = document.getElementById("searchInput");

const themeColor = document.getElementById("themeColor");
const modeBtn = document.getElementById("modeBtn");
const accentSelect = document.getElementById("accentSelect");
const cardSize = document.getElementById("cardSize");

const joinBtn = document.getElementById("joinBtn");
const randomThemeBtn = document.getElementById("randomThemeBtn");
const toast = document.getElementById("toast");

document.getElementById("year").textContent = new Date().getFullYear();

// Back to top
document.getElementById("topBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile menu (DOM style)
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  nav.style.display = menuOpen ? "flex" : "none";
  nav.style.flexDirection = "column";
  nav.style.position = "absolute";
  nav.style.right = "4%";
  nav.style.top = "64px";
  nav.style.background = "rgba(7,11,20,0.92)";
  nav.style.padding = "10px";
  nav.style.border = "1px solid rgba(255,255,255,0.10)";
  nav.style.borderRadius = "14px";
});

// Toast
function showToast(msg) {
  toast.textContent = msg;
  toast.style.opacity = "1";
  setTimeout(() => (toast.style.opacity = "0.85"), 800);
  setTimeout(() => (toast.textContent = ""), 2400);
}

// Cards (DOM create)
function makeCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.type = item.type;

  const h3 = document.createElement("h3");
  h3.textContent = item.name;

  const p = document.createElement("p");
  p.textContent = item.desc;

  const meta = document.createElement("div");
  meta.className = "meta";

  const badge1 = document.createElement("span");
  badge1.className = "badge";
  badge1.textContent = `Level: ${item.level}`;

  const badge2 = document.createElement("span");
  badge2.className = "badge";
  badge2.textContent = `Players: ${item.players}`;

  meta.appendChild(badge1);
  meta.appendChild(badge2);

  card.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => {
      c.style.outline = "none";
      c.style.background = "rgba(255,255,255,0.06)";
    });

    card.style.outline = "2px solid var(--primary)";
    card.style.background = "var(--primary-2)";
    showToast(`${item.name} selected ✅`);
  });

  card.appendChild(h3);
  card.appendChild(p);
  card.appendChild(meta);

  return card;
}

function renderCards(list) {
  sportsGrid.innerHTML = "";
  list.forEach(item => sportsGrid.appendChild(makeCard(item)));
}

function applyFilter() {
  const f = sportFilter.value;
  const q = searchInput.value.trim().toLowerCase();

  const filtered = sportsData.filter(item => {
    const okType = (f === "all") || (item.type === f);
    const okSearch =
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q);
    return okType && okSearch;
  });

  renderCards(filtered);
}

renderCards(sportsData);

sportFilter.addEventListener("change", applyFilter);
searchInput.addEventListener("input", applyFilter);

// Theme changer (DOM + CSS variables)
themeColor.addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--primary", color);
  document.documentElement.style.setProperty("--primary-2", hexToRgba(color, 0.18));
  showToast(`Theme updated: ${color}`);
});

randomThemeBtn.addEventListener("click", () => {
  const c = randomHex();
  themeColor.value = c;
  themeColor.dispatchEvent(new Event("input"));
});

// Dark / Light mode
let darkMode = true;
modeBtn.addEventListener("click", () => {
  darkMode = !darkMode;

  if (darkMode) {
    setVars({
      "--bg": "#0b1220",
      "--text": "#eaf0ff",
      "--muted": "#b9c6e6",
      "--border": "rgba(255,255,255,0.10)"
    });
    modeBtn.textContent = "🌙 Dark";
  } else {
    setVars({
      "--bg": "#f6f8ff",
      "--text": "#0b1220",
      "--muted": "#4b5563",
      "--border": "rgba(0,0,0,0.12)"
    });
    modeBtn.textContent = "☀️ Light";
  }

  showToast(darkMode ? "Dark mode ON" : "Light mode ON");
});

function setVars(vars) {
  Object.entries(vars).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
}

// Card Accent style
accentSelect.addEventListener("change", () => {
  const v = accentSelect.value;
  document.querySelectorAll(".card").forEach(card => {
    card.style.borderColor = "rgba(255,255,255,0.10)";
    card.style.boxShadow = "0 18px 38px rgba(0,0,0,0.40)";

    if (v === "soft") {
      card.style.borderColor = "rgba(255,255,255,0.12)";
    } else if (v === "bold") {
      card.style.borderColor = "var(--primary)";
    } else {
      card.style.boxShadow = "none";
    }
  });

  showToast(`Card accent: ${v}`);
});

// Card size
cardSize.addEventListener("input", (e) => {
  const v = Number(e.target.value);
  document.querySelectorAll(".card").forEach(card => {
    card.style.padding = `${14 + v}px`;
    card.style.borderRadius = `${18 + v}px`;
  });
});

// Join button
joinBtn.addEventListener("click", () => {
  showToast("Welcome to Athirathii Vilaiyaatuu! 🏆");
  document.getElementById("sports").scrollIntoView({ behavior: "smooth" });
});

// Contact form (DOM validation)
const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 3) {
    formHint.textContent = "Name must be at least 3 characters.";
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    formHint.textContent = "Enter a valid email address.";
    return;
  }
  if (message.length < 10) {
    formHint.textContent = "Message should be at least 10 characters.";
    return;
  }

  formHint.textContent = "Message sent ✅ (demo)";
  showToast("Thanks! We will contact you soon.");
  contactForm.reset();
});

// Utils
function randomHex() {
  const chars = "0123456789abcdef";
  let out = "#";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}