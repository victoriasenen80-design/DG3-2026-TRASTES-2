/* =====================================================================
   TRASTES · Luthería de Autor — Interacciones
   Vanilla JS · sin dependencias
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Preloader (pantalla de carga) ---------- */
  const preloader = $("#preloader");
  if (preloader) {
    const start = Date.now();
    const MIN = 900;   // tiempo mínimo visible para que no "parpadee"
    const hidePreloader = () => {
      const wait = Math.max(0, MIN - (Date.now() - start));
      setTimeout(() => preloader.classList.add("is-hidden"), wait);
    };
    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);
      // fallback por si algún recurso tarda demasiado
      setTimeout(() => preloader.classList.add("is-hidden"), 6000);
    }
  }

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

  /* ---------- SECCIÓN 6 · Maderas (selector + panel dinámico) ---------- */
  const WOODS = {
    koa: {
      cat: "resonantes", sym: "Ko",
      title: "Koa Hawaiana",
      lat: "Acacia koa",
      grade: "AAAAA · Flame Extreme",
      grain: "url(assets/koa.jpg) center/cover no-repeat",
      back: "url(assets/madera_3.jpg) center/cover no-repeat",
      desc: "Madera hawaiana de tonos dorados con un marcado dibujo flameado que cambia con la luz. Su sonido combina calidez, definición y una proyección muy equilibrada.",
      use: "Tapas armónicas en algunos instrumentos de alta gama, fondos, y aros.",
      density: "0,61 g/cm³",
      speed: "4.800 m/s",
      freq: [70, 88, 74]
    },
    lutz: {
      cat: "resonantes", sym: "Lz",
      title: "Abeto de Lutz",
      lat: "Picea × lutzii",
      grade: "Master Grade",
      grain: "url(assets/abeto.jpg) center/cover no-repeat",
      back: "url(assets/madera_1.jpg) center/cover no-repeat",
      desc: "De color crema claro con vetas rectas y uniformes. Destaca por su excelente relación entre rigidez y peso, ofreciendo un sonido potente, equilibrado y con gran proyección.",
      use: "Tapas armónicas de guitarras de concierto y violines de alta proyección.",
      density: "0,42 g/cm³",
      speed: "5.900 m/s",
      freq: [45, 62, 95] // graves / medios / agudos (%)
    },
    redwood: {
      cat: "resonantes", sym: "Rw",
      title: "Redwood Burl",
      lat: "Sequoia semper",
      grade: "Master Grade · Burl Figure",
      grain: "url(assets/redwood.jpg) center/cover no-repeat",
      back: "url(assets/madera_5.jpg) center/cover no-repeat",
      desc: "Se caracteriza por sus vetas onduladas y patrones tridimensionales únicos. Ofrece un sonido cálido, abierto y muy equilibrado, con una excelente riqueza de armónicos.",
      use: "Tapas armónicas y elementos decorativos en instrumentos personalizados de alta gama.",
      density: "≈ 0,45 g/cm³",
      speed: "≈ 5.100 m/s",
      freq: [86, 86, 68]
    },
    cedro: {
      cat: "resonantes", sym: "Cr",
      title: "Cedro Rojo Occidental",
      lat: "Thuja",
      grade: "Master Grade",
      grain: "url(assets/cedro.jpg) center/cover no-repeat",
      back: "url(assets/madera_6.jpg) center/cover no-repeat",
      desc: "Presenta tonalidades rojizas y una veta fina y uniforme. Produce un sonido cálido, con gran riqueza armónica y una respuesta inmediata al toque.",
      use: "Tapa armónica de guitarras clásicas y flamencas de concierto.",
      density: "≈ 0,37 g/cm³",
      speed: "≈ 5.300 m/s",
      freq: [86, 86, 68]
    },
    maple: {
      cat: "estabilidad", sym: "Qm",
      title: "Quilted Maple",
      lat: "Acer macrophyllum",
      grade: "Master Grade · Quilt Figure",
      grain: "url(assets/quilted.png) center/cover no-repeat",
      back: "url(assets/madera_10.jpg) center/cover no-repeat",
      desc: "Destaca por su espectacular figura tridimensional con efecto acolchado que cambia según la luz. Produce un sonido brillante, preciso y muy definido.",
      use: "Fondos, aros, tapas decorativas y cuerpos de instrumentos premium.",
      density: "≈ 0,56 g/cm³",
      speed: "≈ 5.000 m/s",
      freq: [48, 72, 92]
    },
    caoba: {
      cat: "estabilidad", sym: "Ca",
      title: "Caoba",
      lat: "Swietenia macrophylla",
      grade: "AAA · Calidad superior",
      grain: "url(assets/caoba.jpg) center/cover no-repeat",
      back: "url(assets/madera_7.jpg) center/cover no-repeat",
      desc: "Madera de tonos marrón rojizo con veta recta y uniforme. Destaca por su gran estabilidad, ofreciendo un sonido cálido, equilibrado y con medios muy presentes.",
      use: "Cuerpos, mástiles y componentes estructurales de instrumentos acústicos y eléctricos.",
      density: "≈ 0,56 g/cm³",
      speed: "≈ 4.700 m/s",
      freq: [72, 92, 48]
    },
    arce: {
      cat: "estabilidad", sym: "Ar",
      title: "Arce",
      lat: "Acer saccharum",
      grade: "AAA · Calidad superior",
      grain: "url(assets/arce.png) center/cover no-repeat",
      back: "url(assets/madera_8.jpg) center/cover no-repeat",
      desc: "Madera clara de veta fina y uniforme, apreciada por su elevada rigidez y estabilidad. Produce un sonido brillante, definido y con excelente respuesta dinámica.",
      use: "Mástiles, fondos, aros y cuerpos de instrumentos de alta gama.",
      density: "≈ 0,71 g/cm³",
      speed: "≈ 5.100 m/s",
      freq: [48, 72, 92]
    },
    nogal: {
      cat: "estabilidad", sym: "Nc",
      title: "Nogal",
      lat: "Juglans regia",
      grade: "Master Grade · Figura natural",
      grain: "url(assets/nogal.jpg) center/cover no-repeat",
      back: "url(assets/madera_9.jpg) center/cover no-repeat",
      desc: "Presenta una combinación de tonos marrones, dorados y vetas oscuras muy marcadas. Ofrece un sonido equilibrado, con graves profundos, medios cálidos y agudos suaves.",
      use: "Fondos, aros y cuerpos de instrumentos personalizados de alta gama.",
      density: "≈ 0,61 g/cm³",
      speed: "≈ 4.800 m/s",
      freq: [92, 72, 72]
    },
    palisandro: {
      cat: "dureza", sym: "Pb",
      title: "Palisandro",
      lat: "Dalbergia latifolia",
      grade: "Grado Histórico",
      grain: "url(assets/palisandro.jpg) center/cover no-repeat",
      back: "url(assets/mastil1.jpg) center/cover no-repeat",
      flip: true,
      desc: "Sonido sumamente resonante: graves profundos, agudos metálicos cristalinos y sustain muy prolongado. Marrón chocolate con líneas de crecimiento negras y destellos naranjas. Lotes antiguos pre-convención con trazabilidad legal.",
      use: "Fondos y aros de guitarras acústicas y clásicas de concierto.",
      density: "0,84 g/cm³",
      speed: "5.100 m/s",
      freq: [98, 70, 88]
    },
    ebano: {
      cat: "dureza", sym: "Éb",
      title: "Ébano Macassar",
      lat: "Diospyros celebica",
      grade: "Master Grade · Exotic Figure",
      grain: "url(assets/ebanom.png) center/cover no-repeat",
      back: "url(assets/mastil2.jpg) center/cover no-repeat",
      desc: "Se distingue por su combinación de vetas negras y marrón oscuro con un patrón lineal muy elegante. Su elevada densidad proporciona un ataque rápido, gran definición y una respuesta extremadamente precisa.",
      use: "Diapasones, puentes, clavijas y detalles decorativos en instrumentos de alta gama.",
      density: "≈ 1,05 g/cm³",
      speed: "≈ 5.400 m/s",
      freq: [48, 72, 92]
    },
    snakewood: {
      cat: "dureza", sym: "Sw",
      title: "Snakewood",
      lat: "Brosimum guianense",
      grade: "Master Grade · Exotic Figure",
      grain: "url(assets/snakewood.jpg) center/cover no-repeat",
      back: "url(assets/mastil3.jpg) center/cover no-repeat",
      desc: "Reconocida por su llamativo dibujo que recuerda a la piel de una serpiente, combina una dureza excepcional con una gran estabilidad. Produce un sonido brillante, muy definido y con excelente articulación.",
      use: "Diapasones, puentes, cordales, accesorios y detalles exclusivos en instrumentos premium.",
      density: "≈ 1,20 g/cm³",
      speed: "≈ 5.600 m/s",
      freq: [48, 72, 92]
    },
    manchinga: {
      cat: "dureza", sym: "Ms",
      title: "Manchinga Spalted",
      lat: "Brosimum utile",
      grade: "Master Grade · Spalted Figure",
      grain: "url(assets/spalted.jpg) center/cover no-repeat",
      back: "url(assets/mastil4.jpg) center/cover no-repeat",
      desc: "Se caracteriza por sus líneas oscuras generadas naturalmente durante el proceso de spalting, creando un patrón único e irrepetible. Ofrece un sonido equilibrado, con buena proyección y riqueza armónica.",
      use: "Fondos, aros, tapas decorativas y detalles exclusivos en instrumentos personalizados.",
      density: "≈ 0,78 g/cm³",
      speed: "≈ 4.700 m/s",
      freq: [72, 92, 72]
    }
  };

  const panel = $("#woodPanel");
  // convierte un porcentaje (0-100) en una fila de 5 puntos rellenos
  const freqDots = (pct) => {
    const on = Math.round(pct / 20);
    let s = "";
    for (let i = 0; i < 5; i++) s += `<i class="wp__dot${i < on ? " is-on" : ""}"></i>`;
    return s;
  };
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
        <div class="wp__freq-row"><span class="wp__freq-label">Graves</span><span class="wp__dots">${freqDots(w.freq[0])}</span></div>
        <div class="wp__freq-row"><span class="wp__freq-label">Medios</span><span class="wp__dots">${freqDots(w.freq[1])}</span></div>
        <div class="wp__freq-row"><span class="wp__freq-label">Agudos</span><span class="wp__dots">${freqDots(w.freq[2])}</span></div>
      </div>
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
  const woodSelector = $("#woodSelector");
  const woodsBody = $(".woods__body");
  const mqWoods = window.matchMedia("(max-width:620px)");   // acordeón solo en mobile
  // devuelve el panel a su posición de escritorio (después del selector)
  function restoreWoodPanel() {
    if (panel && panel.previousElementSibling !== woodSelector) {
      woodSelector.after(panel);
    }
    if (woodsBody) woodsBody.classList.remove("woods__body--open");
  }
  // construye las celdas de la categoría activa
  function renderCells(cat) {
    restoreWoodPanel();
    const keys = Object.keys(WOODS).filter(k => WOODS[k].cat === cat);
    woodSelector.innerHTML = keys.map((k, i) => {
      const w = WOODS[k];
      return `<button class="wood-cell${i === 0 ? " is-active" : ""}" role="tab" data-wood="${k}" aria-selected="${i === 0}">
          <span class="wood-cell__sym">${w.sym}</span>
          <span class="wood-cell__name">${w.title}</span>
          <span class="wood-cell__lat">${w.lat}</span>
        </button>`;
    }).join("");
    const cells = $$(".wood-cell", woodSelector);
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if (mqWoods.matches) {
          // acordeón mobile: el panel se despliega debajo de la celda
          const wasOpen = cell.classList.contains("is-active") && woodsBody.classList.contains("woods__body--open");
          cells.forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
          if (wasOpen) { restoreWoodPanel(); return; }
          cell.classList.add("is-active");
          cell.setAttribute("aria-selected", "true");
          renderWood(cell.dataset.wood);
          cell.after(panel);
          woodsBody.classList.add("woods__body--open");
        } else {
          cells.forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
          cell.classList.add("is-active");
          cell.setAttribute("aria-selected", "true");
          renderWood(cell.dataset.wood);
        }
      });
    });
    if (keys[0]) renderWood(keys[0]);
    if (mqWoods.matches) {
      // en mobile arranca colapsado
      cells.forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
      restoreWoodPanel();
    }
  }
  // al cruzar el breakpoint, reconstruir con el estado correcto
  mqWoods.addEventListener("change", () => {
    const t = $(".woods__tab.is-active");
    const cat = t ? t.dataset.cat : "resonantes";
    renderCells(cat);
  });
  // nota técnica por familia de madera (se muestra al elegir una solapa)
  const WOOD_NOTES = {
    resonantes: "Definen gran parte del carácter tonal del instrumento y optimizan la transmisión de las vibraciones. Se utilizan principalmente en tapas armónicas.",
    estabilidad: "Aportan rigidez y estabilidad estructural para mantener el rendimiento del instrumento a lo largo del tiempo. Se emplean en mástiles, cuerpos, fondos y aros.",
    dureza: "Destacan por su elevada dureza y durabilidad, ideales para soportar el desgaste continuo. Se utilizan en diapasones, puentes y componentes de alta exigencia."
  };
  const woodNote = $("#woodNote");
  function renderWoodNote(cat) {
    if (!woodNote) return;
    const txt = WOOD_NOTES[cat];
    if (!txt) { woodNote.classList.remove("is-show"); woodNote.innerHTML = ""; return; }
    const tab = $(`.woods__tab[data-cat="${cat}"]`);
    const tabFull = tab ? $(".woods__tab-full", tab) : null;
    const label = (tabFull ? tabFull.textContent : tab ? tab.textContent : "Maderas").trim();
    woodNote.innerHTML = `
      <svg class="wn__svg" viewBox="0 0 24 66" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
        <circle cx="11" cy="3" r="2.5" class="a-dot"/>
        <line x1="11" y1="3" x2="11" y2="46" class="a-line"/>
        <line x1="11" y1="46" x2="23" y2="46" class="a-line"/>
      </svg>
      <div class="wn__body">
        <span class="wn__tag">Nota téc. · ${label}</span>
        <p>${txt}</p>
      </div>`;
    woodNote.classList.add("is-show");
  }
  // pestañas de categoría
  $$(".woods__tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".woods__tab").forEach(t => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderCells(tab.dataset.cat);
      renderWoodNote(tab.dataset.cat);
    });
  });
  renderCells("resonantes");    // estado inicial
  renderWoodNote("resonantes"); // nota de la solapa activa por defecto

  /* ---------- SECCIÓN 9 · Reseñas (carrusel + nota) ---------- */
  const REVIEWS = [
    { img: "rev-1", name: "Nadia Ferrán", role: "Concertista clásica", years: 25,
      text: "Concertista clásica de trayectoria internacional. Aporta su experiencia electrónica y puesta a punto para lograr bajos precisos y equilibrados." },
    { img: "rev-2", name: "Mateo Alvear", role: "Guitarrista clásico", years: 20,
      text: "Luthier especializado en guitarras clásicas de concierto. En el taller comparte las técnicas tradicionales del oficio en cada etapa del curso." },
    { img: "rev-3", name: "Sofia Lindqvist", role: "Violinista · Ópera de Estocolmo", years: 22,
      text: "Violinista de la Ópera de Estocolmo. Su experiencia como intérprete aporta precisión acústica y sensibilidad musical en cada etapa de la construcción." },
    { img: "rev-6", name: "Diego Sauer", role: "Luthier & intérprete", years: 40,
      text: "Guitarrista de sesión con amplia experiencia en escenario. Guía la construcción de guitarras eléctricas con foco en el sonido, la comodidad y la versatilidad." },
  ];
  const revTrack = $("#revTrack");
  const revNote  = $("#revNote");
  const revCarousel = $("#revCarousel");
  if (revTrack && revNote && revCarousel) {
    let revActive = 0; // card inicial: Nadia Ferrán

    // construir cards
    REVIEWS.forEach((r, i) => {
      const li = document.createElement("li");
      li.className = "rev-card";
      li.setAttribute("role", "tab");
      li.innerHTML = `<div class="rev-card__img rev-card__img--${r.img}"></div><span class="rev-card__id">${r.name}</span>`;
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
          <span class="rev-note__tag">Equipo · TRASTES</span>
          <p class="rev-note__text">${r.text}</p>
          <span class="rev-note__author">+${r.years} años de experiencia</span>
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

  /* ---------- Reseñas · marquee automático (testimonios) ---------- */
  const TESTIMONIALS = [
    { text: "Entré sin haber tocado una gubia en mi vida. Salí con una guitarra que hoy uso en cada concierto. La atención uno a uno lo cambia todo.", name: "Camila Duarte", role: "Guitarrista clásica · Egresada 2025" },
    { text: "Compré una criolla de autor y no hay comparación con las de fábrica. El sonido tiene un alma propia que se siente en cada nota.", name: "Martín Silva", role: "Coleccionista · Guitarra criolla a medida" },
    { text: "El curso superó todo lo que esperaba. Terminé entendiendo cada parte del instrumento y me llevé una eléctrica hecha con mis propias manos.", name: "Rodrigo Peña", role: "Egresado · Curso de guitarra eléctrica" },
    { text: "Encargué un violín a medida y la proyección en sala es incomparable. Se nota el trabajo artesanal en cada detalle.", name: "Valentina Ríos", role: "Violinista · Instrumento por encargo" },
    { text: "Las clases individuales marcan la diferencia. Cada duda se resolvía en el momento, guiando mi mano paso a paso.", name: "Sofía Herrera", role: "Egresada · Curso de guitarra criolla" },
    { text: "Pedí un bajo con especificaciones muy puntuales y lo clavaron. Comodidad y definición en cada nota, de punta a punta del mástil.", name: "Andrés Molina", role: "Bajista · Bajo eléctrico a medida" },
    { text: "Aprendí muchísimo más de lo que imaginaba. Hoy no solo toco: también entiendo por qué mi instrumento suena como suena.", name: "Lucía Fernández", role: "Egresada · Curso de violín" },
    { text: "Es una inversión que se justifica sola. Un instrumento irrepetible, con una calidez que no encontré en ningún otro lado.", name: "Julián Costa", role: "Coleccionista · Guitarra de concierto" },
    { text: "Llegué sin ninguna experiencia y me fui con mi propia guitarra funcionando. El acompañamiento del maestro es de otro nivel.", name: "Mariana López", role: "Egresada · Curso de guitarra eléctrica" },
    { text: "Mi guitarra hecha a medida se siente como una extensión de mi mano. Cada encargo es una experiencia realmente única.", name: "Federico Ramos", role: "Guitarrista · Guitarra a medida" },
  ];
  const testiTrack = $("#testiTrack");
  if (testiTrack) {
    const cardHTML = t => `
      <article class="testi-card">
        <div class="testi-card__stars" aria-hidden="true">★★★★★</div>
        <blockquote class="testi-card__quote">«${t.text}»</blockquote>
        <div class="testi-card__author"><b>${t.name}</b><span>${t.role}</span></div>
      </article>`;
    const html = TESTIMONIALS.map(cardHTML).join("");
    testiTrack.innerHTML = html + html; // duplicado para el loop continuo
  }

  /* ---------- Proceso · arrastrar para desplazar (drag scroll) ---------- */
  const track = $("#processTrack");
  if (track) {
    let down = false, startX = 0, scroll = 0;
    track.addEventListener("mousedown", e => {
      down = true; startX = e.pageX; scroll = track.scrollLeft;
      e.preventDefault();
    });
    window.addEventListener("mouseup", () => { down = false; });
    track.addEventListener("mousemove", e => {
      if (!down) return;
      e.preventDefault();
      track.scrollLeft = scroll - (e.pageX - startX) * 1.4;
    });
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
  if (newsForm && newsMsg) {
    newsForm.addEventListener("submit", e => {
      e.preventDefault();
      newsMsg.textContent = "✓ Suscripción registrada. Recibirás la bitácora del luthier.";
      newsForm.reset();
    });
  }

  /* ---------- Galería · botón "+" + lightbox ---------- */
  const galleryItems = $$(".gallery__item");
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  if (galleryItems.length && lightbox && lightboxImg) {
    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lightboxImg.src = "";
    };
    // inyectar el botón "+" en cada imagen
    galleryItems.forEach(item => {
      const img = $("img", item);
      if (!img) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__zoom";
      btn.setAttribute("aria-label", "Ver imagen completa");
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="4 9 4 4 9 4"/><line x1="4" y1="4" x2="10" y2="10"/>
        <polyline points="15 4 20 4 20 9"/><line x1="20" y1="4" x2="14" y2="10"/>
        <polyline points="4 15 4 20 9 20"/><line x1="4" y1="20" x2="10" y2="14"/>
        <polyline points="20 15 20 20 15 20"/><line x1="20" y1="20" x2="14" y2="14"/>
      </svg>`;
      btn.addEventListener("click", () => openLightbox(img.src, img.alt));
      item.appendChild(btn);
    });
    // cerrar: botón ×, click en el fondo, tecla Esc
    $$("[data-close]", lightbox).forEach(el => el.addEventListener("click", closeLightbox));
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const targets = $$(
    ".section-title, .benefit, .course, .review, .qa, .hero__text, .vip__mock, .woods__body"
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

})();
