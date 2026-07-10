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

  /* ---------- Kit incluido · hotspots ---------- */
  const kitHotspots = $$(".cd-kit__hotspot");
  kitHotspots.forEach(btn => {
    btn.addEventListener("click", () => {
      const open = !btn.classList.contains("is-open");
      kitHotspots.forEach(b => {
        b.classList.remove("is-open");
        b.setAttribute("aria-expanded", "false");
      });
      if (open) {
        btn.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Testimonios · marquee automático ---------- */
  const CD_TESTIMONIALS = [
    { text: "Entré sin haber tocado una gubia en mi vida. Salí con una guitarra que hoy uso en cada concierto. La atención uno a uno lo cambia todo.", name: "Camila Duarte", role: "Guitarrista clásica · Egresada 2025" },
    { text: "Es mucho más que un curso: es entender por qué la madera suena. El barnizado a muñequilla fue una experiencia casi ceremonial.", name: "Rodrigo Peña", role: "Coleccionista · Egresado 2024" },
    { text: "Llegué sin ninguna experiencia y me fui con mi propia guitarra funcionando. El acompañamiento del maestro es de otro nivel.", name: "Mariana López", role: "Egresada · Curso de guitarra criolla" },
    { text: "Cada clase avanzaba una etapa real de la construcción. Al final entendía mi instrumento de una manera que ningún manual me hubiera dado.", name: "Julián Costa", role: "Egresado · Curso de guitarra criolla" },
    { text: "El curso superó todo lo que esperaba. Terminé entendiendo cada parte del instrumento y me llevé una guitarra hecha con mis propias manos.", name: "Valentina Ríos", role: "Egresada · Curso de guitarra criolla" },
    { text: "Las clases individuales marcan la diferencia. Cada duda se resolvía en el momento, guiando mi mano paso a paso.", name: "Sofía Herrera", role: "Egresada · Curso de guitarra criolla" },
  ];
  const cdTestiTrack = $("#cdTestiTrack");
  if (cdTestiTrack) {
    const cardHTML = t => `
      <article class="testi-card">
        <div class="testi-card__stars" aria-hidden="true">★★★★★</div>
        <blockquote class="testi-card__quote">«${t.text}»</blockquote>
        <div class="testi-card__author"><b>${t.name}</b><span>${t.role}</span></div>
      </article>`;
    const html = CD_TESTIMONIALS.map(cardHTML).join("");
    cdTestiTrack.innerHTML = html + html; // duplicado para el loop continuo
  }

  /* ---------- Reveal on scroll ---------- */
  const targets = $$(".reveal, .section-title, .cd-module, .qa");
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
