// HE-LI AB – interaktion
(() => {
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobilmeny
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
    }));
  }

  // Tonar in sektioner vid scroll
  const io = "IntersectionObserver" in window && new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  // Ticker: duplicera innehållet för sömlös loop
  document.querySelectorAll(".ticker-track").forEach(t => { t.innerHTML += t.innerHTML; });

  // RUT-räknare (50 % av arbetskostnaden)
  const range = document.getElementById("rut-range");
  if (range) {
    const fmt = n => n.toLocaleString("sv-SE") + " kr";
    const update = () => {
      const cost = +range.value;
      document.getElementById("rut-cost").textContent = fmt(cost);
      document.getElementById("rut-off").textContent = "− " + fmt(Math.round(cost / 2));
      document.getElementById("rut-pay").textContent = fmt(Math.round(cost / 2));
    };
    range.addEventListener("input", update);
    update();
  }

  // Formulär: öppnar e-post till info@heliab.se med ifyllda uppgifter
  document.querySelectorAll("form[data-mailto]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [];
      for (const [k, v] of data.entries()) if (String(v).trim()) lines.push(`${k}: ${v}`);
      const subject = form.dataset.subject || "Förfrågan via heliab.se";
      window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      const msg = form.querySelector(".form-msg");
      if (msg) msg.classList.add("show");
    });
  });

  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
})();
