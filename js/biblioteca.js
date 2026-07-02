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
  const openBtn = $("#libOpenModal");
  function openModal() { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeModal() { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  if (openBtn) openBtn.addEventListener("click", openModal);
  $$("[data-close]", modal).forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });

  /* ---------- Menú móvil del TOC ---------- */
  const toc = $("#toc");
  const tocBurger = $("#tocBurger");
  tocBurger.addEventListener("click", () => {
    const open = toc.classList.toggle("is-open");
    tocBurger.setAttribute("aria-expanded", String(open));
  });
  $$("#toc a").forEach(a => a.addEventListener("click", () => {
    if (window.innerWidth <= 900) { toc.classList.remove("is-open"); tocBurger.setAttribute("aria-expanded", "false"); }
  }));

  /* ---------- TOC · resaltar sección activa ---------- */
  const links = $$("#toc a");
  const map = {};
  links.forEach(a => { const id = a.getAttribute("href").slice(1); map[id] = a; });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.remove("is-active"));
          if (map[en.target.id]) map[en.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    $$("section[id]").forEach(s => io.observe(s));
  }
})();
