/* =====================================================================
   TRASTES · Página de detalle del curso — interacciones
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- NAV móvil ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    $$(".nav__links a").forEach(a =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Temario · acordeón de módulos (múltiples abiertos) ---------- */
  $$(".cd-module").forEach(mod => {
    const btn = $(".cd-module__head", mod);
    btn.addEventListener("click", () => {
      const open = mod.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- FAQ · acordeón ---------- */
  $$(".qa").forEach(item => {
    const btn = $(".qa__q", item);
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Formulario de inscripción ---------- */
  const form = $("#cursoForm");
  const done = $("#cursoDone");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      form.hidden = true;
      done.hidden = false;
      done.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Newsletter del footer ---------- */
  const newsForm = $("#newsForm");
  const newsMsg  = $("#newsMsg");
  if (newsForm) {
    newsForm.addEventListener("submit", e => {
      e.preventDefault();
      newsMsg.textContent = "✓ Suscripción registrada. Recibirás la bitácora del luthier.";
      newsForm.reset();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const targets = $$(".reveal, .section-title, .cd-module, .cd-inc, .cd-review, .qa");
  targets.forEach(t => t.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add("is-in"));
  }
})();
