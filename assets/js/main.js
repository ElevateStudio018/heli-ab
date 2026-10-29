// HE-LI AB
(() => {
  // Mobilmeny
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
  }

  // Hero-video: starta igen om webbläsaren blockerat autoplay (t.ex. strömsparläge)
  const video = document.querySelector(".hero-video");
  if (video) {
    const play = () => video.play().catch(() => {});
    play();
    ["touchstart", "click", "scroll"].forEach(ev => window.addEventListener(ev, play, { once: true, passive: true }));
  }

  // Formulär: öppnar e-post till info@heliab.se med ifyllda uppgifter
  document.querySelectorAll("form[data-mailto]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const lines = [];
      for (const [k, v] of new FormData(form).entries()) if (String(v).trim()) lines.push(`${k}: ${v}`);
      const subject = form.dataset.subject || "Förfrågan via heliab.se";
      window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      form.querySelector(".form-msg")?.classList.add("show");
    });
  });
})();
