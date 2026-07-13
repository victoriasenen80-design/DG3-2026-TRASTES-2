/* =====================================================================
   TRASTES · Biblioteca UX/UI — interacciones de la documentación
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Copiar al portapapeles + toast ---------- */
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 1600);
  }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast("Copiado ✓ " + text))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); showToast("Copiado ✓ " + text); } catch (e) { showToast("No se pudo copiar"); }
    document.body.removeChild(ta);
  }
  $$("[data-copy]").forEach(el =>
    el.addEventListener("click", () => copy(el.getAttribute("data-copy")))
  );

  /* ---------- Acordeón (FAQ) ---------- */
  $$(".qa").forEach(item => {
    const btn = $(".qa__q", item);
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Hotspot "+" (demo) ---------- */
  $$(".cd-kit__hotspot").forEach(h => {
    h.addEventListener("click", () => {
      const open = h.classList.toggle("is-open");
      h.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Flip-card ---------- */
  $$(".wp__flip").forEach(flip => {
    const toggle = () => flip.classList.toggle("is-flipped");
    flip.addEventListener("click", toggle);
    flip.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });

  /* ---------- Reproductor demo (animación de onda) ---------- */
  const audio = $("#libAudio");
  if (audio) {
    const btn = $(".mock__play", audio);
    let t = null;
    btn.addEventListener("click", () => {
      const on = audio.classList.toggle("is-playing");
      btn.textContent = on ? "❚❚" : "▶";
      clearTimeout(t);
      if (on) t = setTimeout(() => { audio.classList.remove("is-playing"); btn.textContent = "▶"; }, 4000);
    });
  }

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  if (modal) {
    const openBtn = $("#libOpenModal");
    const openModal = () => { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; };
    const closeModal = () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
    if (openBtn) openBtn.addEventListener("click", openModal);
    $$("[data-close]", modal).forEach(el => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });
  }

  /* ---------- NAV móvil (hamburguesa) ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  if (nav && burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    $$(".nav__links a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- Nav · resaltar el grupo activo según el scroll ---------- */
  // cada grupo empieza en su primera sección
  const groups = [
    { link: 'a[href="#colores"]', from: "colores", to: "graficos" },   // Fundamentos
    { link: 'a[href="#botones"]', from: "botones", to: "frecuencias" }, // Componentes
    { link: 'a[href="#estados"]', from: "estados", to: "patrones" }     // Sistema
  ];
  const navLinks = $$(".nav__links a");
  const groupOf = { colores:0, tipografia:0, grilla:0, forma:0, graficos:0,
    botones:1, tags:1, cards:1, formularios:1, acordeon:1, navegacion:1, modal:1, audio:1, flip:1, nota:1, carrusel:1, marquee:1, frecuencias:1,
    estados:2, patrones:2 };
  if ("IntersectionObserver" in window && navLinks.length === 3) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const g = groupOf[en.target.id];
          if (g === undefined) return;
          navLinks.forEach((l, i) => l.classList.toggle("is-active", i === g));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    $$("section[id]").forEach(s => io.observe(s));
  }
})();
