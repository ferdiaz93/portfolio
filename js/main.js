(function () {
  const root = document.documentElement;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { /* storage unavailable */ }
    return null;
  }

  // ---------- i18n ----------
  // Spanish lives in the HTML; we snapshot it on load so only English needs a dictionary.
  const en = {
    "explorer": "Explorer",

    "home.hello": "Hi, I’m",
    "home.tagline": "I build web and mobile apps end to end with React Native, TypeScript and Expo, from architecture to store release.",
    "home.cv": "✦ Download CV",
    "home.about": "→ About me",

    "about.title": "About Me",
    "about.bio":
      "<p>I’m a fullstack developer from Buenos Aires, Argentina, with 7+ years of experience on web and mobile projects, almost 5 of them building apps with React Native and TypeScript.</p>" +
      "<p>I’m currently the frontend and mobile technical lead at HitOcean, where I also mentor new team members.</p>" +
      "<p>I own apps end to end: architecture, state management, API integration, Expo/EAS builds and publishing to the App Store and Google Play.</p>",
    "about.facts":
      '<span class="p">{</span>\n' +
      '  <span class="k">"location"</span>: <span class="s">"Buenos Aires, Argentina"</span>,\n' +
      '  <span class="k">"experience"</span>: <span class="s">"7+ years"</span>,\n' +
      '  <span class="k">"focus"</span>: [<span class="s">"Mobile"</span>, <span class="s">"Web"</span>],\n' +
      '  <span class="k">"languages"</span>: [<span class="s">"Spanish"</span>, <span class="s">"English B1"</span>],\n' +
      '  <span class="k">"role"</span>: <span class="s">"Tech lead"</span>,\n' +
      '<span class="p">}</span>',

    "work.title": "Work Experience",
    "work.hitocean.date": "Feb 2024 — Present",
    "work.hitocean.desc": "Frontend and mobile technical lead across web and mobile projects. I build apps with React Native, Expo and TypeScript, from architecture to store release. I handle server data and caching with React Query, implemented OAuth login and CI/CD pipelines with EAS. I also mentor new hires and do backend work with PHP and Laravel.",
    "work.bitflow.desc": "Web development with React, TypeScript and Node.js.",
    "work.wisboo.desc": "Web development with AngularJS and Next.js.",
    "work.ego.desc": "Built mobile apps with React Native and TypeScript, and web apps with React and TypeScript. Managed global state with Redux and Zustand, and built backend and CMS with Python, Django and Wagtail.",
    "work.mdevz.desc": "Web development with JavaScript, Angular, PHP and Laravel.",

    "skills.title": "Skills &amp; Technologies",
    "skills.frontend": "Frontend &amp; Languages",
    "skills.state": "State, Data &amp; Auth",
    "skills.backend": "Backend &amp; CI/CD",
    "skills.social": "Social login",
    "skills.lv1": "daily use",
    "skills.lv2": "comfortable",
    "skills.lv3": "familiar",

    "edu.title": "Education &amp; Languages",
    "edu.studies": "// Studies",
    "edu.web.title": "Web development",
    "edu.web.pill": "12 months",
    "edu.web.desc": "Intensive courses at Acámica and Comunidad IT.",
    "edu.davinci.title": "Multimedia Design",
    "edu.davinci.pill": "not completed",
    "edu.more": "// More",
    "edu.school.title": "Commercial high school diploma",
    "edu.english.title": "English — B1",
    "edu.spanish.title": "Spanish — native",

    "contact.title": "Let’s talk",
    "contact.text": "Have a web or mobile project in mind, or want me on your team? Drop me a line and let’s chat.",

    "status.errors": "0 errors",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const es = {};
  nodes.forEach((el) => { es[el.dataset.i18n] = el.innerHTML; });
  const dict = { es, en };
  const langButtons = document.querySelectorAll("[data-set-lang]");

  function setLang(lang) {
    nodes.forEach((el) => {
      const value = dict[lang][el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    root.lang = lang;
    langButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setLang === lang)));
    store("lang", lang);
    updateGutter();
  }

  langButtons.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.setLang)));

  // ---------- Theme ----------
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = themeBtn.querySelector("use");

  function applyThemeIcon() {
    themeIcon.setAttribute("href", root.dataset.theme === "light" ? "#i-moon" : "#i-sun");
  }

  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    store("theme", root.dataset.theme);
    applyThemeIcon();
  });

  applyThemeIcon();

  // ---------- Router ----------
  const routes = ["home", "about", "work", "skills", "education", "contact"];
  const links = document.querySelectorAll("[data-route]");
  const statusFile = document.getElementById("status-file");
  const scroll = document.getElementById("scroll");

  function render() {
    const route = routes.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
    routes.forEach((r) => { document.getElementById("view-" + r).hidden = r !== route; });
    links.forEach((a) => a.classList.toggle("is-active", a.dataset.route === route));
    statusFile.textContent = document.getElementById("view-" + route).dataset.file;
    scroll.scrollTop = 0;
    window.scrollTo(0, 0);
    document.querySelector(".tab.is-active")?.scrollIntoView({ block: "nearest", inline: "nearest" });
    updateGutter();
    if (route === "home") typeWhoami();
  }

  window.addEventListener("hashchange", render);

  // Closing the active tab goes back home, like an editor falling back to the first file.
  document.querySelectorAll(".tab__close").forEach((x) => {
    x.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      location.hash = "home";
    });
  });

  // ---------- Line numbers ----------
  const gutter = document.getElementById("gutter");
  const content = document.getElementById("content");

  function updateGutter() {
    if (!gutter.offsetParent) return;
    const lineH = parseFloat(getComputedStyle(gutter).lineHeight) || 26;
    const height = Math.max(content.scrollHeight, scroll.clientHeight);
    const count = Math.ceil(height / lineH);
    if (gutter.childElementCount === count) return;
    gutter.innerHTML = Array.from({ length: count }, (_, i) => `<div>${i + 1}</div>`).join("");
  }

  window.addEventListener("resize", updateGutter);

  // ---------- Typing effect ----------
  const typed = document.getElementById("typed");
  let typingTimer;

  function typeWhoami() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearInterval(typingTimer);
    const text = "whoami";
    let i = 0;
    typed.textContent = "";
    typingTimer = setInterval(() => {
      typed.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typingTimer);
    }, 120);
  }

  // ---------- Particles ----------
  function spawnParticles() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.getElementById("particles");
    const colors = ["var(--blue)", "var(--pink)", "var(--purple)", "var(--green)", "var(--yellow)"];
    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const count = window.innerWidth < 768 ? 22 : 38;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      const isStar = Math.random() < 0.35;
      p.className = "particle" + (isStar ? " particle--star" : "");
      p.style.left = rand(0, 100) + "%";
      p.style.top = rand(0, 100) + "%";
      p.style.setProperty("--dur", rand(14, 30) + "s");
      p.style.setProperty("--delay", -rand(0, 30) + "s");
      p.style.setProperty("--dx", rand(-60, 60) + "px");
      p.style.setProperty("--dy", rand(-80, 40) + "px");
      if (isStar) {
        p.textContent = pick(["✦", "★", "✧"]);
        p.style.color = pick(colors);
        p.style.setProperty("--size", rand(8, 16) + "px");
      } else {
        const size = rand(6, 34);
        p.style.width = p.style.height = size + "px";
        p.style.background = `radial-gradient(circle, ${pick(colors)}, transparent 70%)`;
      }
      frag.appendChild(p);
    }
    layer.appendChild(frag);
  }

  // ---------- Init ----------
  let lang = store("lang");
  if (!lang) lang = (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  const urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang === "es" || urlLang === "en") lang = urlLang;

  spawnParticles();
  render();
  setLang(lang);
  document.fonts?.ready.then(updateGutter);
})();
