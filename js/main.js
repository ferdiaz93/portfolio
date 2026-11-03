(function () {
  const root = document.documentElement;
  root.classList.remove("no-js");

  // ---------- i18n ----------
  // Spanish lives in the HTML; we snapshot it on load so only English needs a dictionary.
  const en = {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.hello": "Hey 👋, I’m <strong>Fernando</strong>",
    "hero.line1": "Senior Fullstack",
    "hero.line2": "<b>D</b>eveloper",
    "hero.sub": "Web &amp; Mobile · React Native · TypeScript",
    "hero.cta": "See my work →",
    "hero.cv": "Download CV",

    "about.eyebrow": "About me",
    "about.title": "I’m a Fullstack Developer",
    "about.subtitle": "With 7+ years of experience",
    "about.text": "Fullstack developer with 7+ years of experience on web and mobile projects, almost 5 of them building apps with React Native and TypeScript. I’m currently the frontend and mobile technical lead at HitOcean, where I also mentor new team members. I own apps end to end: architecture, state management, API integration, Expo/EAS builds and publishing to the App Store and Google Play.",
    "about.langs": "Spanish (native) · English B1",
    "about.stores": "Apps shipped to the App Store and Google Play",

    "skills.title": "My <span class=\"accent\">stack</span> includes...",
    "skills.languages": "Languages",
    "skills.state": "State &amp; data",
    "skills.auth": "Authentication",
    "skills.social": "Social login",
    "skills.pipelines": "Build &amp; deploy pipelines for mobile apps",
    "skills.web": "Web &amp; backend",

    "exp.eyebrow": "Professional experience",
    "exp.hitocean.date": "Feb 2024 – Present",
    "exp.hitocean.bullets":
      "<li>Frontend and mobile technical lead across web and mobile projects.</li>" +
      "<li>Building mobile apps with React Native, Expo and TypeScript, from architecture to store release.</li>" +
      "<li>Server data and caching with React Query.</li>" +
      "<li>OAuth login and CI/CD pipelines with EAS.</li>" +
      "<li>Currently migrating a React (web) application to React Native.</li>" +
      "<li>Mentoring and technical onboarding of new hires.</li>" +
      "<li>Backend development with PHP and Laravel.</li>",
    "exp.bitflow.bullets": "<li>Web development with React, TypeScript and Node.js.</li>",
    "exp.wisboo.bullets": "<li>Web development with AngularJS and Next.js.</li>",
    "exp.ego.bullets":
      "<li>Mobile apps with React Native and TypeScript.</li>" +
      "<li>Web development with React and TypeScript.</li>" +
      "<li>Global state management with Redux and Zustand.</li>" +
      "<li>Backend and CMS with Python, Django and Wagtail.</li>",
    "exp.mdevz.bullets": "<li>Web development with JavaScript, Angular, PHP and Laravel.</li>",

    "projects.eyebrow": "Featured projects",
    "projects.p1.title": "Mobile app (placeholder)",
    "projects.p1.desc": "Short project description: the problem, your role and the outcome.",
    "projects.p2.title": "Web platform (placeholder)",
    "projects.p2.desc": "Short project description: the problem, your role and the outcome.",
    "projects.p3.title": "React → React Native migration (placeholder)",
    "projects.p3.desc": "Short project description: the problem, your role and the outcome.",
    "projects.p4.title": "Backend / CMS (placeholder)",
    "projects.p4.desc": "Short project description: the problem, your role and the outcome.",
    "projects.demo": "Live demo",
    "projects.case": "Case study",

    "edu.eyebrow": "Education",
    "edu.davinci.title": "Multimedia Design <small>(not completed)</small>",
    "edu.courses.title": "Web development",
    "edu.courses.desc": "Intensive courses at Acámica and Comunidad IT (12 months)",
    "edu.school.title": "Commercial high school diploma",

    "contact.title": "So what are you waiting for?",
    "contact.lead": "Contact me at",
    "contact.socials": "Let’s connect on socials",

    "footer.made": "Built with HTML, CSS and a little JS",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const es = {};
  nodes.forEach((el) => { es[el.dataset.i18n] = el.innerHTML; });
  const dict = { es, en };
  const titles = {
    es: document.title,
    en: "Fernando Díaz · Fullstack Developer",
  };

  function setLang(lang) {
    nodes.forEach((el) => {
      const value = dict[lang][el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    root.lang = lang;
    document.title = titles[lang];
    try { localStorage.setItem("lang", lang); } catch (e) { /* storage unavailable */ }
  }

  let initial = null;
  try { initial = localStorage.getItem("lang"); } catch (e) { /* storage unavailable */ }
  if (!initial) initial = (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  if (initial !== "es") setLang(initial);

  document.getElementById("lang-toggle").addEventListener("click", () => {
    setLang(root.lang === "es" ? "en" : "es");
  });

  // ---------- Mobile menu ----------
  const burger = document.getElementById("nav-burger");
  const menu = document.getElementById("nav-menu");

  function toggleMenu(open) {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) toggleMenu(false); });

  // ---------- Placeholder links ----------
  document.querySelectorAll('a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
