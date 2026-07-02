/* =====================================================================
   TRASTES · Luthería de Autor — Interacciones
   Vanilla JS · sin dependencias
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- NAV móvil + sombra al hacer scroll ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  // cerrar el menú al pulsar un enlace
  $$(".nav__links a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- SECCIÓN 4 · Servicios (acordeón exclusivo) ---------- */
  $$(".service").forEach(item => {
    const btn = $(".service__row", item);
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      $$(".service").forEach(s => {
        s.classList.remove("is-open");
        $(".service__row", s).setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- SECCIÓN 6 · Maderas (selector + panel dinámico) ---------- */
  const WOODS = {
    lutz: {
      title: "Abeto de Lutz",
      lat: "Picea × lutzii",
      grade: "Master Grade",
      grain: "url(../assets/madera_1.jpg) center/cover no-repeat",
      back: "url(../assets/abeto.png) center/cover no-repeat",
      desc: "Combina la rigidez del abeto de Sitka con la ligereza del abeto blanco. Volumen acústico y rango de proyección excepcionales. Color blanco cremoso con marcas de oso (bearclaw). Corte radial perfecto a 90° y grano de más de 15 líneas por pulgada.",
      use: "Tapas armónicas de guitarras de concierto y violines de alta proyección.",
      density: "0,42 g/cm³",
      speed: "5.900 m/s",
      freq: [45, 62, 95] // graves / medios / agudos (%)
    },
    palisandro: {
      title: "Palisandro de Brasil",
      lat: "Dalbergia nigra",
      grade: "Grado Histórico",
      grain: "url(../assets/madera_2.jpg) center/cover no-repeat",
      back: "url(../assets/palisandro.png) center/cover no-repeat",
      flip: true,
      desc: "Sonido sumamente resonante: graves profundos, agudos metálicos cristalinos y sustain muy prolongado. Marrón chocolate con líneas de crecimiento negras y destellos naranjas. Lotes antiguos pre-convención con trazabilidad legal.",
      use: "Fondos y aros de guitarras acústicas y clásicas de concierto.",
      density: "0,84 g/cm³",
      speed: "5.100 m/s",
      freq: [98, 70, 88]
    },
    koa: {
      title: "Koa Hawaiana",
      lat: "Acacia koa",
      grade: "AAAAA · Flame Extreme",
      grain: "url(../assets/madera_3.jpg) center/cover no-repeat",
      back: "url(../assets/koa.jpg) center/cover no-repeat",
      desc: "Tono equilibrado que evoluciona con el uso, ganando calidez. Veteado altamente figurado en tonos dorados, ámbar y rojizos, con intenso efecto tridimensional de llama. Simetría perfecta en el patrón de rizados.",
      use: "Cuerpos completos de guitarras acústicas Premium y diapasones ornamentales.",
      density: "0,61 g/cm³",
      speed: "4.800 m/s",
      freq: [70, 88, 74]
    },
    ebano: {
      title: "Ébano de Gabón",
      lat: "Diospyros crassiflora",
      grade: "Grado Especial de Concierto",
      grain: "url(../assets/madera_4.jpg) center/cover no-repeat",
      back: "url(../assets/ebano.jpg) center/cover no-repeat",
      desc: "Alta velocidad de transmisión del sonido, ataque percusivo inmediato y decaimiento armónico muy controlado. Negro azabache, grano extremadamente fino y densidad óptima, libre de alburas.",
      use: "Diapasones, cejuelas y puentes sometidos a alta fricción y desgaste.",
      density: "1,03 g/cm³",
      speed: "6.200 m/s",
      freq: [60, 78, 100]
    }
  };

  const panel = $("#woodPanel");
  function renderWood(key) {
    const w = WOODS[key];
    const grainStyle = `background:${w.grain}${w.flip ? ";transform:scaleX(-1)" : ""}`;
    const grainMarkup = w.back
      ? `<div class="wp__flip" tabindex="0" role="button" aria-label="Girar la muestra de madera">
           <div class="wp__flip-inner">
             <div class="wp__grain wp__face" style="${grainStyle}"></div>
             <div class="wp__grain wp__face wp__face--back" style="background:${w.back}"></div>
             <span class="wp__flip-hint">tocá para girar ↻</span>
           </div>
         </div>`
      : `<div class="wp__grain" style="${grainStyle}"></div>`;
    panel.innerHTML = `
      ${grainMarkup}
      <div>
        <h3 class="wp__title">${w.title} <em style="font-weight:400;opacity:.6">${w.lat}</em></h3>
      </div>
      <span class="tag wp__grade">${w.grade}</span>
      <p class="wp__desc">${w.desc}</p>
      <div class="wp__freq">
        <div class="bar" style="height:${w.freq[0]}%"><span>GRAVES</span></div>
        <div class="bar" style="height:${w.freq[1]}%"><span>MEDIOS</span></div>
        <div class="bar" style="height:${w.freq[2]}%"><span>AGUDOS</span></div>
      </div>
      <p class="wp__freqcap">Respuesta en frecuencias · normalizada</p>
      <div class="wp__specs">
        <div><b>${w.density}</b><span>Densidad</span></div>
        <div><b>${w.speed}</b><span>Velocidad del sonido</span></div>
      </div>
      <p class="wp__desc"><strong>Uso óptimo:</strong> ${w.use}</p>
    `;
    const flip = $(".wp__flip", panel);
    if (flip) {
      const toggle = () => flip.classList.toggle("is-flipped");
      flip.addEventListener("click", toggle);
      flip.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    }
  }
  $$(".wood-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      $$(".wood-cell").forEach(c => {
        c.classList.remove("is-active");
        c.setAttribute("aria-selected", "false");
      });
      cell.classList.add("is-active");
      cell.setAttribute("aria-selected", "true");
      renderWood(cell.dataset.wood);
    });
  });
  renderWood("lutz"); // estado inicial

  /* ---------- SECCIÓN 9 · Reseñas (carrusel + nota) ---------- */
  const REVIEWS = [
    { id: "#328", img: "rev-1", name: "Nadia Ferrán", role: "Concertista clásica",
      text: "La proyección en sala es sencillamente otra categoría. Cada matiz del pianissimo llega hasta la última fila sin esfuerzo." },
    { id: "#612", img: "rev-2", name: "Mateo Alvear", role: "Guitarrista de sesión",
      text: "Estabilidad de afinación perfecta y un balance tonal donde cada nota del registro agudo conserva una redondez y un sustain extraordinarios." },
    { id: "#541", img: "rev-3", name: "Sofia Lindqvist", role: "Violinista · Ópera de Estocolmo",
      text: "El timbre de este violín posee una densidad armónica excepcional. La velocidad de respuesta ante el menor roce del arco permite dinámicas que antes me resultaban inalcanzables." },
    { id: "#704", img: "rev-4", name: "Tomás Rivas", role: "Bajista de jazz",
      text: "El sustain y la definición en las cuerdas graves transformaron mi manera de tocar. Un instrumento con carácter propio." },
    { id: "#489", img: "rev-5", name: "Elena Kovács", role: "Violinista de cámara",
      text: "La respuesta bajo el arco es inmediata y sedosa. Sentí que el violín interpretaba conmigo, no que yo luchaba con él." },
    { id: "#856", img: "rev-6", name: "Diego Sauer", role: "Luthier & intérprete",
      text: "Detalle constructivo impecable. Se nota la mano del maestro en cada veta y en el equilibrio tonal del conjunto." },
  ];
  const revTrack = $("#revTrack");
  const revNote  = $("#revNote");
  const revCarousel = $("#revCarousel");
  if (revTrack && revNote && revCarousel) {
    let revActive = 2; // card central inicial

    // construir cards
    REVIEWS.forEach((r, i) => {
      const li = document.createElement("li");
      li.className = "rev-card";
      li.setAttribute("role", "tab");
      li.innerHTML = `
        <div class="rev-card__img rev-card__img--${r.img}"></div>
        <span class="rev-card__id">N° de afiliado ${r.id}</span>`;
      li.addEventListener("click", () => setActive(i, true));
      revTrack.appendChild(li);
    });
    const cards = $$(".rev-card", revTrack);

    function renderNote(r) {
      revNote.innerHTML = `
        <svg class="rev-note__svg" viewBox="0 0 24 66" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
          <circle cx="11" cy="3" r="2.5" class="a-dot"/>
          <line x1="11" y1="3" x2="11" y2="46" class="a-line"/>
          <line x1="11" y1="46" x2="23" y2="46" class="a-line"/>
        </svg>
        <div class="rev-note__body">
          <span class="rev-note__tag">Reseña · afiliado ${r.id}</span>
          <div class="rev-note__stars" aria-label="5 de 5 estrellas">★★★★★</div>
          <p class="rev-note__text">«${r.text}»</p>
          <span class="rev-note__author">${r.name}<em>${r.role}</em></span>
        </div>`;
    }

    function paintActive() {
      cards.forEach((c, idx) => {
        c.classList.toggle("is-active", idx === revActive);
        c.setAttribute("aria-selected", String(idx === revActive));
      });
      renderNote(REVIEWS[revActive]);
    }

    // relleno superior/inferior para que la 1ª y última card puedan centrarse
    function centerPadding() {
      const pad = Math.max(0, (revCarousel.clientHeight - cards[0].offsetHeight) / 2);
      revTrack.style.paddingTop = pad + "px";
      revTrack.style.paddingBottom = pad + "px";
    }

    function setActive(i, doScroll) {
      revActive = Math.max(0, Math.min(REVIEWS.length - 1, i));
      paintActive();
      if (doScroll) {
        const c = cards[revActive];
        const target = c.offsetTop - (revCarousel.clientHeight - c.offsetHeight) / 2;
        revCarousel.scrollTo({ top: target, behavior: "smooth" });
      }
    }

    // activo = card cuyo centro está más cerca del centro del carrusel
    let ticking = false;
    revCarousel.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const center = revCarousel.scrollTop + revCarousel.clientHeight / 2;
        let best = 0, bestDist = Infinity;
        cards.forEach((c, idx) => {
          const cc = c.offsetTop + c.offsetHeight / 2;
          const d = Math.abs(cc - center);
          if (d < bestDist) { bestDist = d; best = idx; }
        });
        if (best !== revActive) { revActive = best; paintActive(); }
        ticking = false;
      });
    });
    window.addEventListener("resize", centerPadding);

    // estado inicial: centrar la card del medio sin animación
    centerPadding();
    const c0 = cards[revActive];
    revCarousel.scrollTop = c0.offsetTop - (revCarousel.clientHeight - c0.offsetHeight) / 2;
    paintActive();
  }

  /* ---------- SECCIÓN 10 · FAQ (acordeón) ---------- */
  $$(".qa").forEach(item => {
    const btn = $(".qa__q", item);
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Audio simulado (reseñas + portal VIP) ---------- */
  function fakePlayer(btn, activeClass, playLabel, stopLabel) {
    let timer = null;
    btn.addEventListener("click", () => {
      const parent = btn.closest("." + activeClass) || btn;
      const isPlaying = parent.classList.toggle("is-playing");
      clearTimeout(timer);
      if (isPlaying) {
        if (playLabel) btn.innerHTML = stopLabel;
        // se "detiene" solo a los 4s (demo)
        timer = setTimeout(() => {
          parent.classList.remove("is-playing");
          if (playLabel) btn.innerHTML = playLabel;
        }, 4000);
      } else if (playLabel) {
        btn.innerHTML = playLabel;
      }
    });
  }
  $$(".review__play").forEach(b =>
    fakePlayer(b, "review__play", "▶ <span>escuchar muestra</span>", "❚❚ <span>reproduciendo…</span>")
  );
  const vipPlay = $(".mock__play");
  const tapAudio = $("#tapToneAudio");
  if (vipPlay && tapAudio) {
    const box = vipPlay.closest(".mock--audio");
    const setPlaying = (on) => {
      box.classList.toggle("is-playing", on);
      vipPlay.innerHTML = on ? "❚❚" : "▶";
    };
    vipPlay.addEventListener("click", () => {
      if (tapAudio.paused) {
        tapAudio.currentTime = 0;
        tapAudio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        tapAudio.pause();
        setPlaying(false);
      }
    });
    tapAudio.addEventListener("ended", () => setPlaying(false));
    tapAudio.addEventListener("pause", () => setPlaying(false));
  }

  /* ---------- SECCIÓN 11 · Modal de co-creación ---------- */
  const modal   = $("#modal");
  const openBtn = $("#openModal");
  const form    = $("#designForm");
  const done    = $("#dformDone");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  openBtn.addEventListener("click", openModal);
  $$("[data-close]", modal).forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    form.hidden = true;
    done.hidden = false;
  });

  /* ---------- Footer · newsletter (demo) ---------- */
  const newsForm = $("#newsForm");
  const newsMsg  = $("#newsMsg");
  newsForm.addEventListener("submit", e => {
    e.preventDefault();
    newsMsg.textContent = "✓ Suscripción registrada. Recibirás la bitácora del luthier.";
    newsForm.reset();
  });

  /* ---------- Reveal on scroll ---------- */
  const targets = $$(
    ".section-title, .benefit, .frame, .course, .review, .qa, .hero__text, .vip__mock, .woods__body"
  );
  targets.forEach(t => t.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add("is-in"));
  }

  /* ---------- Proceso · arrastrar para desplazar (drag scroll) ---------- */
  const track = $("#processTrack");
  if (track) {
    let down = false, startX = 0, scroll = 0;
    track.addEventListener("mousedown", e => {
      down = true; startX = e.pageX; scroll = track.scrollLeft; track.style.cursor = "grabbing";
    });
    ["mouseup", "mouseleave"].forEach(ev =>
      track.addEventListener(ev, () => { down = false; track.style.cursor = ""; })
    );
    track.addEventListener("mousemove", e => {
      if (!down) return;
      e.preventDefault();
      track.scrollLeft = scroll - (e.pageX - startX) * 1.4;
    });
  }
})();
