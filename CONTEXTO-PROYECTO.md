# TRASTES · Luthería de Autor — Documento de continuidad

> Documento para que otro asistente (o persona) pueda continuar el proyecto **exactamente** donde está, sin conocer nada previo. Última actualización: julio 2026.

---

## 1. Qué es el proyecto

**TRASTES** es el sitio web de una marca ficticia de **luthería de autor de alta gama** (construcción artesanal de instrumentos de cuerda a medida). Es un **trabajo académico** (materia "DG3 2026" — Diseño Gráfico / Diseño Web). El objetivo es una experiencia editorial de lujo, tipo "revista de arte + plano técnico de ingeniería acústica".

El sitio tiene **3 páginas HTML**:
1. **`index.html`** — landing principal (one-page, 12 secciones).
2. **`curso-guitarra-criolla.html`** — página de detalle de un curso de la academia (marketing de alto ticket).
3. **`biblioteca.html`** — biblioteca UX/UI / design system (documentación interactiva de la marca).

El público objetivo: músicos profesionales, coleccionistas y entusiastas dispuestos a una inversión alta. El tono es de **lujo silencioso + rigor técnico**.

---

## 2. Tecnologías (MUY IMPORTANTE)

- **HTML + CSS + JavaScript vanilla puro.** NO hay frameworks, NO hay build step, NO hay npm, NO hay React/Tailwind, NO hay preprocesadores.
- La especificación original (un brief largo) pedía React + Tailwind + Lucide, pero el proyecto **se construyó en vanilla** porque el repo era HTML/CSS/JS plano. **Mantener vanilla.**
- No hay servidor de dev disponible en el entorno (no hay Python ni Node instalados). Los cambios se verifican **abriendo el HTML en el navegador** (el usuario recarga con Ctrl+F5).
- Fuente tipográfica: **Space Mono** de Google Fonts (cargada por `<link>` en cada HTML). Es la ÚNICA tipografía del sitio.
- Publicación: **GitHub Pages**. Por eso los archivos HTML están en la **raíz** (no en subcarpetas).

---

## 3. Estructura de carpetas y archivos

```
/ (raíz del proyecto)
├── index.html                      ← landing principal (12 secciones)
├── curso-guitarra-criolla.html     ← página detalle del curso
├── biblioteca.html                 ← biblioteca UX/UI (design system)
├── CONTEXTO-PROYECTO.md            ← este documento
├── .gitattributes
├── css/
│   ├── styles.css                  ← estilos globales + index (663 líneas)
│   ├── curso.css                   ← estilos de la página del curso (230 líneas)
│   └── biblioteca.css              ← estilos de la biblioteca (173 líneas)
├── js/
│   ├── main.js                     ← JS del index (408 líneas)
│   ├── curso.js                    ← JS de la página del curso (79 líneas)
│   └── biblioteca.js               ← JS de la biblioteca (103 líneas)
└── assets/                         ← todas las imágenes + logo + audio
```

### Qué CSS/JS usa cada página
- `index.html` → `css/styles.css` + `js/main.js`
- `curso-guitarra-criolla.html` → `css/styles.css` + `css/curso.css` + `js/curso.js`
- `biblioteca.html` → `css/styles.css` + `css/biblioteca.css` + `js/biblioteca.js`

(Las tres reutilizan `styles.css` como base compartida: variables, `.nav`, `.btn`, `.tag`, `.qa`, `.modal`, planos SVG, etc.)

---

## 4. REGLA CRÍTICA DE RUTAS (no romper)

Los HTML se movieron de una carpeta `html/` a la **raíz** para GitHub Pages. Las rutas quedaron así y **hay que respetarlas**:

- **En HTML** (`href`/`src`): rutas relativas SIN `../`. Ej: `css/styles.css`, `js/main.js`, `assets/logo.svg`.
- **En CSS** (`url(...)`): con `../` porque el archivo CSS vive en `css/`. Ej: `url("../assets/hero_1.jpg")`. **NO quitar el `../` de los CSS.**
- **En JS** que inyecta estilos inline en el DOM (los granos de madera del `WOODS` en `main.js`): SIN `../`, porque esos `url(...)` se resuelven relativos al documento HTML (que está en la raíz). Ej: `url(assets/madera_1.jpg)`.

Resumen: **CSS usa `../assets/`, HTML y JS-inline usan `assets/`.**

---

## 5. Sistema de diseño (design tokens)

### Variables CSS (`:root` en `css/styles.css`)
```css
--cream:    #f8edd7;              /* Crema Orgánico — fondo principal (OJO: cambiado de #FAF6EE) */
--espresso: #2A1005;              /* Espresso Profundo — texto, líneas, bordes */
--accent:   #FF5000;             /* Naranja Vibrante — acentos, CTA, estados activos */
--violet:   #5E17EB;             /* Violeta Eléctrico — etiquetas técnicas, nodos, software */
--line:     rgba(42,16,5,.5);    /* líneas técnicas de 0.5px (espresso semitransparente) */
--line-strong: #2A1005;
--ease:     cubic-bezier(.2,.7,.2,1);   /* curva de todas las transiciones */
--gut:      clamp(1.2rem,4vw,4rem);     /* gutter/padding lateral fluido */
```

### Paleta (con función)
| Color | HEX | Uso |
|---|---|---|
| Crema Orgánico | `#f8edd7` | Fondo principal, cards, secciones. (El comentario del CSS dice `#FAF6EE` pero el valor real actual es `#f8edd7`.) |
| Espresso Profundo | `#2A1005` | Tipografía principal, líneas, bordes, botones oscuros |
| Naranja Vibrante | `#FF5000` | Acentos, CTA, estados activos, palabra destacada de títulos |
| Violeta Eléctrico | `#5E17EB` | Etiquetas de sección (tags), nodos de croquis, marcadores técnicos, hover del scrollbar |
| Gris scrollbar | `#595958` | Riel de la barra de scroll de la página |
| Gris placeholder | `#cfc7b8` | (histórico) placeholder de imágenes |

### Tipografía
- **Space Mono** (monoespaciada), pesos 400 (regular) y 700 (bold), con cursivas.
- Títulos monumentales (`.section-title`): 700, `letter-spacing:-.04em`, `font-size:clamp(2.6rem,7vw,6rem)`, mezcla de mayúsc/minúsc.
- Cuerpo: 400, `line-height:1.6`, `font-size:clamp(14px,1.05vw,16px)`.
- Labels/tags: mayúsculas, `letter-spacing` 0.14–0.18em, ~0.6–0.72rem.

### Componentes base (en `styles.css`, compartidos)
- **`.tag`** / **`.tag--violet`** — etiquetas de sección. Formato de texto: `"NN / TÍTULO EN MAYÚSCULAS"`. Casi todas son violeta.
- **`.section-title`** — título grande. Convención: la palabra clave va en `<em>` (naranja) y termina en un **punto marrón** FUERA del `<em>`. Ej: `Proceso de <em>creación</em>.`
- **`.btn`** con variantes `.btn--accent` (naranja), `.btn--ghost`, `.btn--dark` (espresso), `.btn--soon`.
- **`.modal`** — overlay fijo con backdrop desenfocado; se abre con `.is-open`.
- **`.qa`** — ítem de acordeón (FAQ): `.qa__q` (botón), `.qa__icon` (+/× rota), `.qa__a` (panel con `max-height`).
- **`.ph`** — "placeholder" de imagen: `div` con `background` (imagen o degradado) + `data-label` que renderiza texto vía `::after`. Variantes por sección: `.ph--hero`, `.ph--diapason`, `.ph--servicios2/3/4`, `.ph--proceso1..6`, etc.
- **`.blueprint`** — SVG overlay de líneas técnicas (círculos concéntricos, ejes) sobre imágenes oscuras (stroke crema, `mix-blend-mode:screen`).
- **Croquis técnicos** con clases `d-axis`, `d-line`, `d-thin`, `d-dot`, `d-txt`, `d-num` (líneas espresso, nodos violeta, numeración naranja). Usados en el Manifiesto y el Proceso.
- **`.ph-croquis`** — croquis de línea blanca sobre las imágenes de los servicios (línea de acotación + nodo violeta + medida).

---

## 6. Convenciones de nombres

- CSS estilo **BEM suelto**: `bloque__elemento` y `--modificador`. Ej: `.service__row`, `.wp__title`, `.benefit__num`, `.woods__tab.is-active`.
- Estados con `is-`: `.is-active`, `.is-open`, `.is-flipped`, `.is-in`, `.is-playing`, `.is-show`.
- Prefijos por página: `cd-` (curso detalle, en `curso.css`), `lib-` (biblioteca, en `biblioteca.css`).
- Comentarios de sección en HTML: `<!-- ============ SECCIÓN N · NOMBRE ============ -->`.

---

## 7. Secciones del `index.html` (en orden actual)

> El nav (`.nav` fijo, translúcido con blur) enlaza por ID. El logo es `assets/logo.svg` (imagen SVG del texto "TRASTES", relleno `#3D1202`) + un `®` naranja. En móvil hay hamburguesa (`#burger`).

1. **HERO** (`#hero`, `.hero`) — grid 60/40. Izq: imagen `assets/hero_1.jpg` con overlay blueprint (círculos + `f₀ 110 Hz`) y etiqueta `TALLER · Nº 001`. Der: título **"TU SONIDO / MERECE UN / INSTRUMENTO / ÚNICO"** ("INSTRUMENTO" y "ÚNICO" en naranja bold via `.hl-word`), bajada, 2 botones ("Quiero mi pieza de autor" / "Ver el proceso") y fila de datos (**+350** proyectos, **+40** años, **+500** alumnos).

2. **MANIFIESTO** (`#manifiesto`, `.manifesto`) — "La resistencia al **clon**." Grid 3 columnas: izq = imagen `assets/clon.jpg` (etiqueta "KOA FLAMEADA · PIEZA ÚNICA", sin líneas blancas); centro = **croquis técnico vertical** (SVG con cotas 268mm, R120,5, nodos numerados 01/02/03, Ø68,0); der = texto + cita en naranja cursiva + cierre. Sección a **pantalla completa** (`min-height:100vh`) con mucho padding vertical (`clamp(10rem,21vh,20rem)` arriba / `clamp(12rem,24vh,22rem)` abajo).

3. **BENEFICIOS** (`#beneficios`, `.benefits`) — "La ciencia del **alma**." (el "alma" va en **crema** porque el fondo es NARANJA). **FONDO NARANJA** (`background:var(--accent)`). Etiqueta "02 / MATERIALES Y PRECISIÓN" en crema, arriba del título, alineados a la derecha. Las 4 cards están en **zig-zag** (`.benefits__zigzag`, grid `30% 40% 30%`): cards son rectángulos **crema** angostos alternados izq/der, conectados por **croquis en codo** (`.zz-conn`, líneas espresso + nodo violeta + cota "REF · 4A · Ø 12,4" etc.). Cada card tiene 3 secciones internas separadas por líneas: **marcador geométrico SVG** arriba (círculo concéntrico / rombo / triángulo / cruz — NO números), **título + descripción** en el medio, y **dato técnico** abajo (valor grande en naranja). En la celda vacía inferior-izquierda hay una **nota de cierre** (`.zz-note`, estilo tap-tone) con el texto "La precisión guía cada etapa..." y medida "± 0,1 mm". Los 4 beneficios: **Calibración de Precisión** (100% individual), **Estabilidad Dimensional** (15+ años), **Geometría Ergonómica** (±0,1 mm), **Trazabilidad Forestal** (CITES).

4. **SERVICIOS** (`#servicios`, `.services`) — "Nuestros **servicios**." (alineado a la derecha). Etiqueta "03 / SOLUCIONES A MEDIDA". **Layout ESTÁTICO** (ya NO es acordeón desplegable): 3 servicios, cada uno con barra de encabezado **beige** (número naranja + título espresso + subtítulo naranja) siempre visible con línea inferior 0.5px, y debajo un panel siempre abierto (imagen izq con croquis `.ph-croquis` + descripción der). Los 3: **01 Construcción de Autor / Bespoke Commission**, **02 Restauración y Mantenimiento / Service & Setup**, **03 Voicing y Afinación Tonal / Ajuste Fino**.

5. **PROCESO** (`#proceso`, `.process`) — "Proceso de **creación**." Etiqueta "04 / EL ORIGEN DEL SONIDO". Encabezado en 2 columnas: texto izq + **croquis técnico horizontal** der (línea con nodos 01/02/03, cota 650mm) que **sobresale y es cortado por el borde derecho** de la pantalla (`margin-right` negativo + `overflow:hidden` de la sección). Debajo: **carrusel horizontal de 6 cards** (`.process__track`, `#processTrack`) con **arrastre de mouse** (drag-scroll en JS), sin barras de scroll visibles. Cada card: imagen (sin número encima) + "Paso 0N" + título + descripción. Los 6 pasos: **01 La Selección de las Maderas**, **02 Diseño y Planificación** (`R25.jpg`), **03 Construcción Artesanal** (`R27.jpg`), **04 Terminación y Acabado** (`proceso_5.jpg`), **05 Afinación Acústica** (`w.jpg`), **06 Ajuste Final y Entrega** (`x.jpg`).

6. **MADERAS** (`#maderas`, `.woods`) — "Tipos de **madera**." Etiqueta "05 / CADA MADERA, UNA VOZ". Tiene **3 solapas tipo carpeta** (`.woods__tabs`): "Maderas resonantes", "Maderas de estabilidad", "Maderas de alta dureza" (borde 0.5px espresso, activa en naranja). Debajo, un cuerpo grid (`.woods__body`): izq = **selector de celdas** (`#woodSelector`, generado por JS según la solapa activa) tipo "tabla periódica" (símbolo Lz/Ko/etc + nombre + nombre botánico en cursiva); der = **panel** (`#woodPanel`) con **flip-card** de la imagen del grano (gira al tocar), título + nombre científico, **grado** (etiqueta violeta), descripción, **gráfico de barras de respuesta en frecuencias** (graves/medios/agudos), densidad, velocidad del sonido, uso óptimo. Ver la data de maderas en la sección 9 de este doc.

7. **CURSOS / ACADEMIA** (`#cursos`, `.courses`) — "Academia de **luthería**." Etiqueta "06 / LA TRANSMISIÓN DEL OFICIO". 4 cards (`.course`) con imagen circular arriba, título, bajada, datos (Nivel / Duración / Precio) y botón "Quiero saber más". Al hover: la card **se eleva** (`translateY`) con **destello naranja** (box-shadow) + subrayado marrón del título. Cursos: Guitarra Criolla (Básico, 3 meses, USD 750 — su botón enlaza a `curso-guitarra-criolla.html`), Guitarra Eléctrica (Intermedio, USD 850), Violín de Concierto (Avanzado, USD 1000), Bajo Eléctrico (Intermedio, USD 900). Imágenes circulares: `guitarracriolla.jpg`, `guitarraelectrica.jpg`, `violin.jpg`, `bajoelectrico.jpg`.

8. **PORTAL VIP** (`#vip`, `.vip`) — "Seguimiento **VIP**". **FONDO ESPRESSO**, texto crema. Etiqueta "07 / LA EXCLUSIVIDAD DEL MAÑANA". Muestra un **mockup** de un portal privado: tarjeta con "ENCARGO #A-118 / Violín · Fase III", barra de progreso, imagen (`assets/vip.jpg`) y pie "Semana 06 · Encolado de la barra armónica dentro de la tapa". Debajo, un **reproductor de audio real** (`.mock--audio`, `#libAudio`... no, `#tapToneAudio`) que reproduce `assets/tap_tone.mp3` (el "tap tone"), con onda animada. Al lado sale una **nota técnica** (`.mock__annot`) que explica qué es el tap tone con medida `f₀ ≈ 340 Hz`.

9. **RESEÑAS** (`#reseñas`, `.reviews`) — "La voz de quienes nos **eligieron**." Etiqueta "08 / LA VALIDACIÓN DEL SONIDO". **Carrusel VERTICAL** (`.rev-carousel`, `#revCarousel`, alto 70vh, scroll propio con máscara de desvanecido arriba/abajo): 6 cards horizontales apiladas y centradas (foto + "N° de afiliado #XXX"). La card **más cercana al centro** es la activa y su reseña se muestra en una **nota técnica** a la derecha (`#revNote`: 5 estrellas ★★★★★ + texto + autor). Datos en `js/main.js` array `REVIEWS`. Fotos: `resena_1..6.jpg` (mapeo en `styles.css` `.rev-card__img--rev-1..6`).

10. **FAQ** (`#faq`, `.faq`) — "Preguntas **frecuentes**." Etiqueta "09 / LA CLARIDAD DEL COLECCIONISTA". Acordeón (`.qa`) con 3 preguntas (clima/envío, madera propia, goma laca).

11. **CTA** (`#cta`, `.cta`) — **FONDO NARANJA**. Marquee animado arriba ("CO·CREACIÓN — CUPOS LIMITADOS"). Título "¿Preparado para dar vida a tu **propia voz**?" (recto, NO rotado). Botón "Agendar consulta →" que abre el **modal de co-creación** (`#modal`, "Diseñá tu instrumento": selects de instrumento y madera + nombre + email).

12. **FOOTER** (`.footer`) — grid asimétrico 5 columnas: marca, El Taller (contacto), Colecciones, Legado, La Correspondencia (newsletter). Fila legal con enlace **"Biblioteca UX/UI"** → `biblioteca.html`.

---

## 8. Funcionalidades JavaScript

### `js/main.js` (index) — todo dentro de un IIFE
- **Nav móvil**: toggle del menú hamburguesa.
- **Maderas (sección 6)**: objeto `WOODS` con toda la data. `renderWood(key)` genera el panel (incl. flip-card con handler de giro). `renderCells(cat)` genera las celdas del selector filtradas por la categoría de la solapa activa y engancha sus clicks. Las **solapas** (`.woods__tab`) llaman `renderCells`. Init: `renderCells("resonantes")`.
- **Reseñas (sección 9)**: array `REVIEWS`, construcción de cards, carrusel vertical con detección de la card central por scroll (elige la más cercana al centro), `renderNote` para la nota técnica.
- **Cursos**: (ya no hay toggle; las cards son estáticas con hover CSS).
- **FAQ**: acordeón (toggle `is-open`).
- **Audio simulado de reseñas**: `fakePlayer` (animación visual, sin audio real) para los `.review__play` (histórico; puede que ya no existan esos botones).
- **Audio VIP real**: el botón `.mock__play` reproduce/pausa `#tapToneAudio` (archivo `assets/tap_tone.mp3`), con clase `is-playing` para la onda.
- **Modal**: abrir/cerrar (botón `#openModal`, `[data-close]`, tecla Esc). Form de diseño con mensaje de éxito.
- **Newsletter del footer**: mensaje de confirmación (demo).
- **Reveal on scroll**: IntersectionObserver agrega `.is-in` a `.section-title, .benefit, .course, .review, .qa, .hero__text, .vip__mock, .woods__body` (las `.frame` del proceso **se excluyeron a propósito** para que no "aparezcan desde abajo" al scrollear el carrusel).
- **Drag-scroll del proceso**: sobre `#processTrack`, con `mousedown`/`mousemove`, `mouseup` en `window`, `user-select:none` en CSS.

### `js/curso.js` (página del curso)
- Nav móvil, acordeón del temario (`.cd-module`), acordeón FAQ (`.qa`), form de inscripción (demo), newsletter, reveal on scroll.

### `js/biblioteca.js` (biblioteca)
- Copiar al portapapeles (`[data-copy]`) con toast, acordeón, flip-card demo, reproductor demo, modal, menú móvil del TOC, resaltado de la sección activa en el TOC (IntersectionObserver).

---

## 9. Data de las MADERAS (en `js/main.js`, objeto `WOODS`)

Cada madera tiene: `cat` (categoría/solapa), `sym` (símbolo del selector), `title`, `lat` (nombre botánico), `grade` (etiqueta violeta), `grain` (imagen/degradado frontal de la flip-card), `back` (imagen del reverso; opcional — sin `back` no hay flip), `desc`, `use`, `density`, `speed`, `freq` (array [graves,medios,agudos] en %).

Orden y categorías actuales:
- **resonantes**: `koa` (Koa Hawaiana), `lutz` (Abeto de Lutz), `redwood` (Redwood Burl), `cedro` (Cedro Rojo Occidental) — en ese orden.
- **estabilidad**: (VACÍA — ver problemas conocidos).
- **dureza**: `palisandro` (Palisandro de Brasil), `ebano` (Ébano de Gabón).

Detalle de imágenes de flip-card:
- `koa`: front `koa.jpg`, back `madera_3.jpg`.
- `lutz`: front `abeto.png`, back `madera_1.jpg`.
- `redwood`: solo degradado rojizo (SIN imágenes reales → no flipea).
- `cedro`: solo degradado rojizo (SIN imágenes reales → no flipea).
- `palisandro`: front `madera_2.jpg`, back `palisandro.png`, `flip:true` (espeja el frente).
- `ebano`: front `madera_4.jpg`, back `ebano.jpg`.

---

## 10. Animaciones e interacciones

- Transiciones globales con `--ease` (0.3–0.7s).
- **Reveal on scroll** (fade + translateY) vía `.reveal`/`.is-in`.
- **Hover cards de beneficios**: subrayado que crece desde la izquierda (animando `background-size` de un gradiente, para grosor constante 1px).
- **Hover cards de cursos**: elevación + glow naranja.
- **Flip-card de maderas**: rotación 3D (`rotateY(180deg)`, `.is-flipped`).
- **Marquee del CTA**: `@keyframes marquee` (translateX -50%, pista duplicada para bucle continuo).
- **Onda del reproductor de audio**: `@keyframes wave` cuando `.is-playing`.
- **Carrusel del proceso**: drag-scroll horizontal.
- **Carrusel de reseñas**: scroll vertical con scroll-snap y detección de card central.
- **Scrollbar de la página**: riel `#595958`, pulgar naranja → violeta al hover, flechas naranjas.

---

## 11. Página del curso (`curso-guitarra-criolla.html` + `css/curso.css` + `js/curso.js`)

Página de detalle del curso "Construcción de Guitarra Criolla" con enfoque de **marketing de alto ticket** (~12 secciones, prefijo `cd-`):
1. Hero **sobrio** a pantalla completa (sin la info de la ficha) con 2 imágenes escalonadas (`hero_curso.jpg`, `hero_curso_2.jpg`) con hueco entre ellas + líneas técnicas/anotaciones (AROS · R120,5 / TAPA ARMÓNICA · 480mm / ESC 1:4).
2. **Ficha del curso** (debajo del hero, fuera del pliegue): Básico / 3 meses / 1 a 1 / USD 750.
3. La transformación (Hoy → Al terminar).
4. ¿Es para vos? (para vos / no para vos).
5. **Temario**: acordeón de 4 fases con 12 clases.
6. Metodología 1 a 1 (imagen `individual.jpg`).
7. Qué incluye (4 items).
8. El maestro (imagen `maestro.jpg`, +40 años / +350 instrumentos / +500 alumnos).
9. Testimonios (2, con estrellas).
10. Garantía (fondo espresso, minimiza riesgo).
11. Inversión / price card (USD 750).
12. FAQ + CTA/Contacto con formulario.

---

## 12. Biblioteca UX/UI (`biblioteca.html` + `css/biblioteca.css` + `js/biblioteca.js`)

Design system interactivo (prefijo `lib-`), con TOC lateral (resalta sección activa). Reutiliza los componentes **reales** de `styles.css`. Secciones: Color (swatches con copiar HEX + toast), Tipografía, Grilla/espaciado (tokens), Elementos gráficos (blueprint + croquis), Botones, Etiquetas, Tarjetas, Formularios, Acordeón, Navegación, Modal, Reproductor, Flip-card, Nota técnica, Estados, Voz y patrones (do/don't). Enlazada desde el footer del sitio.

---

## 13. Decisiones de diseño acordadas (mantener)

- **Voseo en TODO** el contenido dirigido al usuario ("construí", "reservá", "diseñá tu instrumento", "tocá para girar"). Los "su/usted" que quedan son de tercera persona (refieren a la madera/instrumento), NO tocarlos. NO mezclar con "tú".
- **Títulos de sección**: una palabra clave en naranja (`<em>`) + **punto marrón** al final (fuera del `<em>`). Ej: "clon.", "alma.", "servicios.", "creación.", "madera.", "luthería.", "frecuentes.", "eligieron.".
- **Etiquetas de sección**: formato "NN / TÍTULO", en **violeta** (todas). Numeración: Manifiesto 01, Beneficios 02, Servicios 03, Proceso 04, Maderas 05, Academia 06, VIP 07, Reseñas 08, FAQ 09.
- **Líneas técnicas de 0.5px** (`--line`) para separar bloques; retículas asimétricas.
- **Lenguaje de plano técnico** (blueprint): cotas, círculos concéntricos, nodos, numeración. **NUNCA motivos botánicos/florales.**
- **Nunca negro puro** (usar espresso `#2A1005`).
- Nodos de croquis en **violeta**; numeración/medidas de acento en **naranja**; líneas en espresso.
- Imágenes cálidas de taller, recortadas con `background: … center/cover no-repeat`.
- Espaciados grandes entre secciones (paddings verticales tipo `clamp(10rem,21vh,20rem)`); el usuario pidió mucho aire. Varias secciones comparten `clamp(10rem,21vh,20rem)` de padding superior (Manifiesto, Beneficios, Servicios, Proceso, Maderas).

---

## 14. Cosas PENDIENTES

- **Imágenes reales de 2 maderas nuevas**: `redwood` (Redwood Burl) y `cedro` (Cedro Rojo Occidental) usan **degradados de placeholder** y NO tienen flip-card. Faltan 2 imágenes cada una (frontal + reverso) para completarlas como las demás.
- **Solapa "Maderas de estabilidad" está VACÍA** (ver problemas conocidos). Falta decidir: agregarle madera(s) o quitar la solapa.
- **Páginas de detalle de los otros 3 cursos** (eléctrica, violín, bajo): sólo existe la de guitarra criolla. Se puede clonar la plantilla `curso-guitarra-criolla.html`.
- **Formularios son demo** (no envían a ningún backend): modal de co-creación, inscripción del curso, newsletters. Muestran mensaje de éxito local.
- **Reproductores de audio de reseñas**: son visuales (sin audio real). Solo el del portal VIP reproduce audio real (tap_tone).

---

## 15. PROBLEMAS CONOCIDOS

- **`assets/tap_tone.MP3` tiene la extensión en MAYÚSCULAS** pero el HTML lo referencia como `assets/tap_tone.mp3` (minúscula). En Windows (case-insensitive) funciona, pero **en GitHub Pages (Linux, case-sensitive) el audio del portal VIP NO va a cargar.** → Hay que renombrar el archivo a `tap_tone.mp3` (minúscula) o ajustar la referencia.
- **Solapa "Maderas de estabilidad" vacía**: la Koa se movió a "resonantes", dejando esa categoría sin ninguna madera. Al clickearla el selector queda vacío y el panel no se actualiza. Decisión pendiente del usuario.
- **`min-height` "mágicos" en el panel de maderas** (`.wp__title` 3.7rem, `.wp__desc` 5.8rem): se pusieron para estabilizar la altura del panel y evitar que las celdas del selector "salten" al cambiar de madera. Están calibrados para descripciones de hasta ~4 líneas y nombres botánicos de hasta 2 líneas **en escritorio**. Si se agregan textos más largos o se prueba en anchos raros, podría reaparecer un salto mínimo → ajustar esos valores.
- **CSS muerto**: quedaron algunas reglas sin uso tras rediseños (p.ej. `.axis-label`, estilos viejos de acordeón de servicios/cursos, `.bspec`, `.review`/`.review__foot`, `.ph--wood*` que ya casi no se usan, `.section-title--light` sólo lo usa VIP). No molestan pero se pueden limpiar.
- **Scrollbar personalizada**: las flechas y colores solo funcionan en navegadores WebKit (Chrome/Edge/Safari). Firefox no muestra las flechas ni el hover (se sacó `scrollbar-color` a propósito para que Chrome respete el hover violeta).

---

## 16. Cómo trabajar en este proyecto (instrucciones para el futuro)

- **Idioma**: español rioplatense, **voseo**.
- **No introducir frameworks ni build.** Todo vanilla, editando directamente los 3 pares HTML/CSS/JS.
- **Verificación**: no hay servidor de dev; el usuario abre el HTML y recarga (Ctrl+F5). Al reemplazar una imagen con el mismo nombre, avisar que haga hard-refresh (caché).
- **Rutas**: respetar la regla de la sección 4 (CSS `../assets/`, HTML/JS-inline `assets/`).
- **Al agregar/quitar imágenes**: verificar que el archivo exista en `assets/` (ojo mayúsc/minúsc de la extensión por GitHub Pages).
- **Mantener** la coherencia del sistema de diseño (paleta, Space Mono, líneas 0.5px, títulos con acento naranja + punto, etiquetas violeta "NN / …", croquis técnicos, voseo).
- **Estilo de trabajo del usuario**: pide muchos ajustes finos e iterativos (espaciados, tamaños, colores, textos, orden de secciones/maderas/pasos). Suele mandar capturas señalando el detalle. Hacer cambios quirúrgicos y explicar brevemente qué se tocó.

---

## 17. Estado git

Rama principal: `main`. El proyecto arrancó de un repo con `index.html` vacío y carpetas `css/js/assets` vacías; se construyó todo desde cero en esta serie de conversaciones. Al momento de este documento hay cambios sin commitear (el usuario maneja los commits manualmente; no commitear sin pedido).
