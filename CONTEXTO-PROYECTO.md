# TRASTES · Luthería de Autor — Documento de continuidad

> Documento para que otro asistente (o persona) pueda continuar el proyecto **exactamente** donde está, sin conocer nada previo. Última actualización: julio 2026 (tras una tanda larga de responsive mobile del curso + rediseño completo de la biblioteca).

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
│   ├── styles.css                  ← estilos globales + index (~792 líneas)
│   ├── curso.css                   ← estilos de la página del curso (~476 líneas)
│   └── biblioteca.css              ← estilos de la biblioteca (~158 líneas)
├── js/
│   ├── main.js                     ← JS del index (~569 líneas)
│   ├── curso.js                    ← JS de la página del curso (~194 líneas)
│   └── biblioteca.js               ← JS de la biblioteca (~124 líneas)
└── assets/                         ← todas las imágenes + logo + audio
```

### Cache-busting (`?v=N`) en los `<link>`/`<script>`
Por problemas de **caché del navegador** durante las iteraciones (los CSS quedaban viejos aunque se recargara), se agregó un **parámetro de versión** a las referencias de CSS/JS. Estado actual:
- `curso-guitarra-criolla.html`: `styles.css?v=12`, `curso.css?v=12`.
- `biblioteca.html`: `styles.css?v=2`, `biblioteca.css?v=8`, `biblioteca.js?v=4`.
- `index.html`: `styles.css?v=2`.

Regla: **cada vez que se toca un CSS/JS y el usuario no ve el cambio, subir el número `?v`** de esa referencia (fuerza descarga fresca). No afecta el funcionamiento; es solo anti-caché.

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
- **`.nav`** — barra superior **fija** translúcida con blur. Enlaces con subrayado naranja al hover (`.nav__links a::after`) + `.nav__cta` con borde naranja. En **móvil** (`max-width:620px`): los enlaces se ocultan y aparece la **hamburguesa animada** (`.nav__burger`, las 3 barras se transforman en **×** cuando `.nav.is-open`) que despliega un **menú de enlaces numerados** (01, 02, 03… vía `counter-reset:navnum` + `::before` con `decimal-leading-zero`). Lo usan las 3 páginas (el index, el curso y **ahora también la biblioteca**).
- **`html` y `body` con `overflow-x:hidden`** — para evitar el **arrastre/scroll horizontal** en mobile (se agregó a `html` además de `body` porque `body` solo no siempre alcanza).
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

> El nav (`.nav` fijo, translúcido con blur) enlaza por ID: Manifiesto, Beneficios, Servicios, Proceso, Maderas, Academia, Portal, **Equipo**, Reseñas, FAQ (+ CTA "Consulta →"). El logo es `assets/logo.svg` (imagen SVG del texto "TRASTES", relleno `#3D1202`) + un `®` naranja. En móvil hay hamburguesa (`#burger`).
>
> **Nota de sincronización:** el orden y numeración de las etiquetas cambió respecto a versiones previas. La antigua "RESEÑAS" (carrusel vertical) es hoy la sección **EQUIPO** (`#equipo`, etiqueta 08), y se sumó una sección nueva de **TESTIMONIOS** que ahora ocupa el nombre "Reseñas" (`#reseñas`, etiqueta 09). La FAQ pasó a 10 y creció a 8 preguntas.

1. **HERO** (`#hero`, `.hero`) — grid 60/40. Izq: imagen `assets/hero_1.jpg` con overlay blueprint (círculos + `f₀ 110 Hz`) y etiqueta `TALLER · Nº 001`. Der: título **"TU SONIDO / MERECE UN / INSTRUMENTO / ÚNICO"** ("INSTRUMENTO" y "ÚNICO" en naranja bold via `.hl-word`), bajada, 2 botones ("Quiero mi pieza de autor" / "Ver el proceso") y fila de datos (**+350** proyectos, **+40** años, **+500** alumnos).

2. **MANIFIESTO** (`#manifiesto`, `.manifesto`) — "La resistencia al **clon**." Grid 3 columnas: izq = imagen `assets/clon.jpg` (etiqueta "KOA FLAMEADA · PIEZA ÚNICA", sin líneas blancas); centro = **croquis técnico vertical** (SVG con cotas 268mm, R120,5, nodos numerados 01/02/03, Ø68,0); der = texto + cita en naranja cursiva + cierre. Sección a **pantalla completa** (`min-height:100vh`) con mucho padding vertical (`clamp(10rem,21vh,20rem)` arriba / `clamp(12rem,24vh,22rem)` abajo).

3. **BENEFICIOS** (`#beneficios`, `.benefits`) — "La ciencia del **alma**." (el "alma" va en **crema** porque el fondo es NARANJA). **FONDO NARANJA** (`background:var(--accent)`). Etiqueta "02 / MATERIALES Y PRECISIÓN" en crema, arriba del título, alineados a la derecha. Las 4 cards están en **zig-zag** (`.benefits__zigzag`, grid `30% 40% 30%`): cards son rectángulos **crema** angostos alternados izq/der, conectados por **croquis en codo** (`.zz-conn`, líneas espresso + nodo violeta + cota "REF · 4A · Ø 12,4" etc.). Cada card tiene 3 secciones internas separadas por líneas: **marcador geométrico SVG** arriba (círculo concéntrico / rombo / triángulo / cruz — NO números), **título + descripción** en el medio, y **dato técnico** abajo (valor grande en naranja). En la celda vacía inferior-izquierda hay una **nota de cierre** (`.zz-note`, estilo tap-tone) con el texto "La precisión guía cada etapa..." y medida "± 0,1 mm". Los 4 beneficios: **Calibración de Precisión** (100% individual), **Estabilidad Dimensional** (15+ años), **Geometría Ergonómica** (±0,1 mm), **Trazabilidad Forestal** (CITES).

4. **SERVICIOS** (`#servicios`, `.services`) — "Nuestros **servicios**." (alineado a la derecha). Etiqueta "03 / SOLUCIONES A MEDIDA". **Layout ESTÁTICO** (ya NO es acordeón desplegable): 3 servicios, cada uno con barra de encabezado **beige** (número naranja + título espresso + subtítulo naranja) siempre visible con línea inferior 0.5px, y debajo un panel siempre abierto (imagen izq con croquis `.ph-croquis` + descripción der). Los 3: **01 Construcción de Autor / Bespoke Commission**, **02 Restauración y Mantenimiento / Service & Setup**, **03 Voicing y Afinación Tonal / Ajuste Fino**.

5. **PROCESO** (`#proceso`, `.process`) — "Proceso de **creación**." Etiqueta "04 / EL ORIGEN DEL SONIDO". Encabezado en 2 columnas: texto izq + **croquis técnico horizontal** der (línea con nodos 01/02/03, cota 650mm) que **sobresale y es cortado por el borde derecho** de la pantalla (`margin-right` negativo + `overflow:hidden` de la sección). Debajo: **carrusel horizontal de 6 cards** (`.process__track`, `#processTrack`) con **arrastre de mouse** (drag-scroll en JS), sin barras de scroll visibles. Cada card: imagen (sin número encima) + "Paso 0N" + título + descripción. Los 6 pasos: **01 La Selección de las Maderas**, **02 Diseño y Planificación** (`R25.jpg`), **03 Construcción Artesanal** (`R27.jpg`), **04 Terminación y Acabado** (`proceso_5.jpg`), **05 Afinación Acústica** (`w.jpg`), **06 Ajuste Final y Entrega** (`x.jpg`).

6. **MADERAS** (`#maderas`, `.woods`) — "Tipos de **madera**." Etiqueta "05 / CADA MADERA, UNA VOZ". Tiene **3 solapas tipo carpeta** (`.woods__tabs`, con abreviatura M1/M2/M3 en móvil): "Maderas resonantes", "Maderas de estabilidad", "Maderas de Máxima Resistencia" (borde 0.5px espresso, activa en naranja). Al lado del título hay una **nota técnica por familia** (`#woodNote`, objeto `WOOD_NOTES` en JS) que cambia según la solapa. Debajo, un cuerpo grid (`.woods__body`): izq = **selector de celdas** (`#woodSelector`, generado por JS según la solapa activa) tipo "tabla periódica" (símbolo Lz/Ko/etc + nombre + nombre botánico en cursiva); der = **panel** (`#woodPanel`) con **flip-card** de la imagen del grano (gira al tocar), título + nombre científico, **grado** (etiqueta violeta), descripción y **gráfico de respuesta en frecuencias por puntos** (`.wp__dot`, 5 puntos por fila: graves/medios/agudos). En **móvil** (`max-width:620px`) el selector funciona como **acordeón**: al tocar una celda el panel se despliega justo debajo. Ver la data de maderas en la sección 9 de este doc.

7. **CURSOS / ACADEMIA** (`#cursos`, `.courses`) — "Academia de **luthería**." Etiqueta "06 / Aprendé el oficio, nuestros cursos". 4 cards (`.course`) con imagen arriba (clases CSS `.course__img--criolla/electrica/violin/bajo`), título, bajada, datos (Nivel / Duración con nº de clases) y precio + botón "Quiero saber más →". Al hover: la card **se eleva** (`translateY`) con **destello naranja** (box-shadow) + subrayado marrón del título. Cursos: Guitarra Criolla (Básico, 3 meses · 12 clases, USD 750 — su botón enlaza a `curso-guitarra-criolla.html`), Guitarra Eléctrica (Intermedio, 4 meses · 16 clases, USD 850), Violín de Concierto (Avanzado, 6 meses · 24 clases, USD 1000), Bajo Eléctrico (Intermedio, 4 meses · 16 clases, USD 900). Solo el botón de Guitarra Criolla lleva a su página; el resto apunta a `#cta`. Imágenes: `guitarracriolla.jpg`, `guitarraelectrica.jpg`, `violin.jpg`, `bajoelectrico.jpg`.

8. **PORTAL VIP** (`#vip`, `.vip`) — "Seguimiento **VIP**". **FONDO ESPRESSO**, texto crema. Etiqueta "07 / LA EXCLUSIVIDAD DEL MAÑANA". Muestra un **mockup** de un portal privado: tarjeta con "ENCARGO #A-118 / Violín · Fase III", barra de progreso, imagen (`assets/vip.jpg`) y pie "Semana 06 · Encolado de la barra armónica dentro de la tapa". Debajo, un **reproductor de audio real** (`.mock--audio`, `#libAudio`... no, `#tapToneAudio`) que reproduce `assets/tap_tone.mp3` (el "tap tone"), con onda animada. Al lado sale una **nota técnica** (`.mock__annot`) que explica qué es el tap tone con medida `f₀ ≈ 340 Hz`.

9. **EQUIPO** (`#equipo`, `.reviews`) — "Conocé a nuestro **equipo**." Etiqueta "08 / Maestros del oficio". Reutiliza el **carrusel VERTICAL** (`.rev-carousel`, `#revCarousel`, alto 70vh, scroll propio con máscara de desvanecido arriba/abajo): cards horizontales apiladas y centradas (foto + nombre del integrante). La card **más cercana al centro** es la activa y su bio se muestra en una **nota técnica** a la derecha (`#revNote`: tag "Equipo · TRASTES" + texto + "+N años de experiencia"). Datos en `js/main.js` array `REVIEWS` (**hoy 4 integrantes**: rev-1 Nadia Ferrán, rev-2 Mateo Alvear, rev-3 Sofía Lindqvist, rev-6 Diego Sauer). Fotos: `resena_1..6.jpg` (mapeo en `styles.css` `.rev-card__img--rev-1..6`). *(Nota: la sección conserva las clases `.reviews`/`.rev-*` heredadas de cuando eran reseñas de clientes.)*

10. **TESTIMONIOS / RESEÑAS** (`#reseñas`, `.testi`) — "La voz de quienes nos **eligieron**." Etiqueta "09 / EXPERIENCIAS REALES". Sección **nueva**: **marquee horizontal automático** (`.testi__track`, `#testiTrack`) de cards con 5 estrellas ★★★★★ + cita + autor/rol. Generado y **duplicado** por JS para loop continuo desde el array `TESTIMONIALS` de `js/main.js` (10 testimonios de egresados/clientes).

11. **FAQ** (`#faq`, `.faq`) — "Preguntas **frecuentes**." Etiqueta "10 / Todo lo que necesitás saber". Acordeón (`.qa`) con **8 preguntas** (tiempo de construcción, personalización, tipos de instrumento, mantenimiento, restauraciones, visita al taller, clima/envío internacional con mini-gráfico `18°C · 45–55% HR`, y madera propia quartersawn).

12. **CTA** (`#cta`, `.cta`) — **FONDO NARANJA**. Marquee animado arriba ("CO·CREACIÓN — CUPOS LIMITADOS"). Título "¿Preparado para dar vida a tu **propia voz**?" (recto, NO rotado). Botón "Agendar consulta →" que abre el **modal de co-creación** (`#modal`, "Diseñá tu instrumento": selects de instrumento y madera + nombre + email).

13. **FOOTER** (`.footer`) — grid asimétrico: marca (bajada "Cada instrumento cuenta una historia que comienza en la madera y termina en **tus manos**." + redes sociales IG/FB/X/YT), **Contacto** (tel, mail, Bs.As., cita previa), **Navegación** (Manifiesto/Servicios/FAQ/Reseñas), **Cursos** (Violín, Bajo, Guitarra Criolla → `curso-guitarra-criolla.html`, Guitarra eléctrica) y **La Correspondencia** (newsletter). Fila legal con enlace **"Biblioteca UX/UI"** → `biblioteca.html`. **Todos los textos del footer** (excepto los títulos `h4`, que van en naranja) se **homogeneizaron a `opacity:.75`** en color espresso. *(El footer del curso es distinto: ver sección 11.2.)*

---

## 8. Funcionalidades JavaScript

### `js/main.js` (index) — todo dentro de un IIFE
- **Nav móvil**: toggle del menú hamburguesa.
- **Maderas (sección 6)**: objeto `WOODS` con toda la data (10 maderas). `renderWood(key)` genera el panel (incl. flip-card con handler de giro y respeto de `flip:true` que espeja el frente). `renderCells(cat)` genera las celdas del selector filtradas por la categoría de la solapa activa y engancha sus clicks. En **móvil** (`mqWoods`, `max-width:620px`) las celdas funcionan como acordeón (el panel se mueve debajo de la celda; `restoreWoodPanel()` lo devuelve a escritorio). Objeto `WOOD_NOTES` + `renderWoodNote(cat)` pintan la nota técnica por familia (`#woodNote`). Las **solapas** (`.woods__tab`) llaman `renderCells` + `renderWoodNote`. Init: `renderCells("resonantes")` + `renderWoodNote("resonantes")`.
- **Equipo (sección 9)**: array `REVIEWS` (integrantes del equipo), construcción de cards, carrusel vertical con detección de la card central por scroll (elige la más cercana al centro), `renderNote` para la nota técnica (bio + años de experiencia).
- **Testimonios (sección 10)**: array `TESTIMONIALS`, se generan las cards y se **duplican** (`html + html`) en `#testiTrack` para el marquee de loop continuo (animación CSS).
- **Cursos**: (ya no hay toggle; las cards son estáticas con hover CSS).
- **FAQ**: acordeón (toggle `is-open`).
- **Audio simulado de reseñas**: `fakePlayer` (animación visual, sin audio real) para los `.review__play` (histórico; puede que ya no existan esos botones).
- **Audio VIP real**: el botón `.mock__play` reproduce/pausa `#tapToneAudio` (archivo `assets/tap_tone.mp3`), con clase `is-playing` para la onda.
- **Modal**: abrir/cerrar (botón `#openModal`, `[data-close]`, tecla Esc). Form de diseño con mensaje de éxito.
- **Newsletter del footer**: mensaje de confirmación (demo).
- **Reveal on scroll**: IntersectionObserver agrega `.is-in` a `.section-title, .benefit, .course, .review, .qa, .hero__text, .vip__mock, .woods__body` (las `.frame` del proceso **se excluyeron a propósito** para que no "aparezcan desde abajo" al scrollear el carrusel).
- **Drag-scroll del proceso**: sobre `#processTrack`, con `mousedown`/`mousemove`, `mouseup` en `window`, `user-select:none` en CSS.

### `js/curso.js` (página del curso)
- Nav móvil, acordeón del temario (`.cd-module`, **una sola celda abierta a la vez**: al abrir una se cierran las demás; tocar la abierta la cierra), acordeón FAQ (`.qa`), form de inscripción (demo, hace scroll al mensaje de éxito), newsletter, reveal on scroll.
- **Hotspots del kit** (`.cd-kit__hotspot`): al tocar un punto se abre su info y se cierran los demás (uno a la vez).
- **Popup mobile del kit**: en `max-width:620px` la info del hotspot no se muestra en el `.cd-kit__pop` inline sino en un elemento **`.cd-kit__mobile-pop`** (creado por JS, insertado después del `.cd-kit`), y se marca `.is-kit-open` en `.cd-includes__extra`.
- **Marquee de testimonios** (`CD_TESTIMONIALS` → `#cdTestiTrack`, duplicado para loop continuo), mismo patrón que el del index.
- **Puntitos del carrusel del hero (solo mobile)**: genera un `.cd-hero__dot` por imagen dentro de `#cdHeroDots`, marca el activo según el scroll horizontal de `.cd-hero__media` (card más cercana al centro) y al tocarlos desliza a esa imagen (`scrollIntoView`). Ver el carrusel en la sección 11.
- **Reveal temprano en mobile**: un IntersectionObserver extra con `threshold:0.01` para `.cd-method` y `.cd-tools`, para que aparezcan antes al scrollear en pantallas chicas.

### `js/biblioteca.js` (biblioteca)
- **Copiar al portapapeles** (`[data-copy]`) con toast (chips de color, HEX).
- **Acordeón** (`.qa`), **flip-card** (`.wp__flip`), **reproductor demo** (`.mock__play` de `#libAudio`, animación de onda visual).
- **Hotspot "+"** (`.cd-kit__hotspot`): toggle `is-open` (el `+` rota a `×`) — es el mismo botón del kit del curso, replicado como demo.
- **Modal**: bloque **blindado con `if (modal)`** porque la sección Modal fue eliminada (si no existe `#modal`, no hace nada y no rompe).
- **Nav** (reemplazó al TOC lateral): toggle de la hamburguesa (`#burger`/`#nav`) + al tocar un enlace se cierra el menú. **Resaltado del grupo activo** (`groupOf`, IntersectionObserver): marca cuál de los 3 accesos (Fundamentos/Componentes/Sistema) corresponde a la sección visible.
  - *Nota:* el objeto `groupOf` todavía lista ids de secciones ya eliminadas (tags, navegacion, marquee, frecuencias, patrones); son claves muertas inofensivas.

---

## 9. Data de las MADERAS (en `js/main.js`, objeto `WOODS`)

Cada madera tiene: `cat` (categoría/solapa), `sym` (símbolo del selector), `title`, `lat` (nombre botánico), `grade` (etiqueta violeta), `grain` (imagen/degradado frontal de la flip-card), `back` (imagen del reverso; opcional — sin `back` no hay flip), `desc`, `use`, `density`, `speed`, `freq` (array [graves,medios,agudos] en %).

Orden y categorías actuales (**10 maderas, las 3 solapas pobladas**):
- **resonantes**: `koa` (Koa Hawaiana), `lutz` (Abeto de Lutz), `redwood` (Redwood Burl), `cedro` (Cedro Rojo Occidental).
- **estabilidad**: `maple` (Quilted Maple), `caoba` (Caoba), `arce` (Arce), `nogal` (Nogal). *(Ya NO está vacía.)*
- **dureza** (solapa "Maderas de Máxima Resistencia"): `palisandro` (Palisandro), `ebano` (Ébano Macassar), `snakewood` (Snakewood), `manchinga` (Manchinga Spalted).

Detalle de imágenes de flip-card (**todas tienen `back` → todas flipean**):
- `koa`: front `koa.jpg`, back `madera_3.jpg`.
- `lutz`: front `abeto.jpg`, back `madera_1.jpg`.
- `redwood`: front `redwood.jpg`, back `madera_5.jpg`. *(Ya tiene imágenes reales.)*
- `cedro`: front `cedro.jpg`, back `madera_6.jpg`. *(Ya tiene imágenes reales.)*
- `maple`: front `quilted.png`, back `madera_10.jpg`.
- `caoba`: front `caoba.jpg`, back `madera_7.jpg`.
- `arce`: front `arce.png`, back `madera_8.jpg`.
- `nogal`: front `nogal.jpg`, back `madera_9.jpg`.
- `palisandro`: front `palisandro.jpg`, back `mastil1.jpg`, `flip:true` (espeja el frente).
- `ebano`: front `ebanom.png`, back `mastil2.jpg`.
- `snakewood`: front `snakewood.jpg`, back `mastil3.jpg`.
- `manchinga`: front `spalted.jpg`, back `mastil4.jpg`.

---

## 10. Animaciones e interacciones

- Transiciones globales con `--ease` (0.3–0.7s).
- **Reveal on scroll** (fade + translateY) vía `.reveal`/`.is-in`.
- **Hover cards de beneficios**: subrayado que crece desde la izquierda (animando `background-size` de un gradiente, para grosor constante 1px).
- **Hover cards de cursos**: elevación + glow naranja.
- **Flip-card de maderas**: rotación 3D (`rotateY(180deg)`, `.is-flipped`).
- **Marquee del CTA** y **marquee de testimonios** (index y curso): `@keyframes` de translateX con pista duplicada para bucle continuo.
- **Onda del reproductor de audio**: `@keyframes wave` cuando `.is-playing`.
- **Carrusel del proceso**: drag-scroll horizontal.
- **Carrusel de equipo** (`#equipo`): scroll vertical con scroll-snap y detección de card central.
- **Scrollbar de la página**: riel `#595958`, pulgar naranja → violeta al hover, flechas naranjas.

---

## 11. Página del curso (`curso-guitarra-criolla.html` + `css/curso.css` + `js/curso.js`)

Página de detalle del curso "Construcción de Guitarra Criolla" con enfoque de **marketing de alto ticket** (~14 secciones, prefijo `cd-`). Orden real por `id`:
1. **Hero** (`#hero`, `.cd-hero`) a pantalla completa. Ahora **sí muestra el precio** (`cd-hero__price` USD 750 · inversión total) + botón de volver "← Academia de luthería". 2 imágenes escalonadas (`hero_curso.jpg`, `hero_curso_2.jpg`) con hueco + líneas técnicas/anotaciones (AROS · R120,5 / TAPA ARMÓNICA · 480mm / ESC 1:4 · f₀ 110 Hz).
2. **Ficha del curso** (`#ficha`): Básico / 3 meses / 1 a 1 / USD 750.
3. **Transformación** (`#transformacion`): Hoy → Al terminar.
4. **¿Es para vos?** (`#es-para-vos`): 4 ítems (para vos).
5. **Temario** (`#temario`): acordeón de **5 fases · 13 clases** (`.cd-module`). **Una sola celda abierta a la vez** (ver `curso.js`). La celda abierta (`.is-open`) mantiene el **fondo espresso** (mismo look que el hover) de forma persistente aunque se saque el cursor. Cada `.cd-module__head` muestra Fase · Título · rango de clases · icono `+`/`×`. Fase IV se llama **"Ensamblaje del mástil"**. Sin línea entre el título de la celda y su primera descripción (`.cd-classes li:first-child` sin `border-top`).
6. **Franja técnica** decorativa (`.cd-strip`).
7. **Qué incluye** (`#incluye`, `.cd-includes`).
8. **Metodología 1 a 1** (`#metodologia`, imagen `individual.jpg`).
9. **Herramientas / Kit** (`#herramientas`, `.cd-tools`) con **hotspots interactivos** (`.cd-kit__hotspot`).
10. **Testimonios** (`#reseñas`, `.testi.cd-testi`): marquee horizontal (`CD_TESTIMONIALS`).
11. **Garantía** (`#garantia`, fondo espresso, minimiza riesgo).
12. **Inversión / price card** (`#inscripcion`, USD 750, 6 cuotas, medios de pago con íconos).
13. **FAQ** (`#faq`).
14. **CTA / Contacto** (`#contacto`) con formulario de inscripción.

### 11.1 Adaptaciones MOBILE de la página del curso (`@media(max-width:620px)` en `curso.css`)

Se hizo un trabajo fino de responsive **solo para mobile** (todo dentro del media query `max-width:620px`, sin tocar escritorio). Puntos clave:

- **Hero — carrusel horizontal de imágenes**: en mobile las 2 fotos escalonadas dejan de apilarse y pasan a un **carril horizontal con scroll-snap** (`.cd-hero__media` en `flex-direction:row`, `overflow-x:auto`, `scroll-snap-type:x mandatory`, scrollbar oculta). Es **full-bleed** (`margin-inline:calc(-1*var(--gut))`) con `padding-inline:var(--gut)` + `scroll-padding-left:var(--gut)` para que la 1ª foto tenga aire a la izquierda al abrir y la 2ª tenga aire a la derecha al deslizar, pero las fotos lleguen a los bordes durante el scroll. Cada `.cd-himg` ocupa `flex:0 0 70%` (asoma ~30% de la siguiente), `aspect-ratio:16/10`, `scroll-snap-align:start`. Las líneas/nodos/anotaciones técnicas del hero (`.cd-tline,.cd-dot,.cd-anno`) se ocultan.
- **Puntitos del carrusel**: `<div class="cd-hero__dots" id="cdHeroDots">` (3er hijo del `.cd-hero`; `display:none` en escritorio para no crear columna en la grilla, `display:flex` en mobile). Lógica en `curso.js` (ver sección 8).
- **Hero — otros ajustes mobile**: `padding-top:4.5rem`, `gap:1.2rem`; `.cd-back` (volver) con `margin-top:1rem`; bajada `.cd-hero__lead` a `.85rem`; precio `.cd-hero__price{margin-top:0}`; **botones en una sola fila** (`.cd-hero__actions{flex-wrap:nowrap}` + botones `flex:1`, `padding:.9rem .8rem`, `font-size:.72rem`, `white-space:nowrap`).
- **Ficha del curso**: se **oculta el título** "Ficha del curso" (`.cd-ficha__label{display:none}`) y los 4 datos pasan a **grilla 2×2** (`.cd-ficha__grid{grid-template-columns:1fr 1fr}`): fila 1 = Básico | 3 meses; fila 2 = 1 a 1 | Presencial. Sección más compacta (`padding-block:.7rem`, gaps reducidos).
- **Transformación**: `padding-top:4rem`/`padding-bottom:4rem`; título con **interlineado `1.1`**; corte del título con `<br>` alternado por CSS (`.cd-promise__br-d` escritorio / `.cd-promise__br-m` mobile) para que quede "De admirar una / guitarra a / firmar la tuya."; `gap` del grid Hoy↔flecha↔Al terminar reducido a `.2rem`.
- **¿Es para vos?**: head con `padding-top:4rem`, y **etiqueta↔título y título↔primera card igualados a `2.8rem`** (`gap` + `padding-bottom` del head). Las 4 cards (`.cd-fit`) quedan con **padding uniforme** (`2.2rem`, se neutralizan los `+3rem` de los bordes del 2×2 de escritorio), **misma altura** (`.cd-fit-list{grid-auto-rows:1fr}`) y texto **centrado verticalmente** (`justify-content:center`).
- **Temario**: `padding-top:4rem`; intro a `.85rem`; el `.cd-module__head` se **reordena con `grid-template-areas`** (`"fase fase" / "title icon" / "range icon"`): Fase arriba, Título debajo, etiqueta de clase debajo del título y el `+` a la derecha (el rango, que en escritorio va inline, acá se muestra en su propia línea).
- **Franja técnica (`separador1.jpg`)**: en mobile el contenedor toma la **proporción real de la imagen** (`.cd-strip__img{aspect-ratio:1942/809}`) para verla completa (en escritorio sigue `28/9`).
- **Croquis técnico sobre las fotos del hero (SOLO mobile)**: cada `.cd-himg` lleva un overlay `.cd-hcroquis` (nodo violeta + etiqueta "01 · AROS / 02 · TAPA ARMÓNICA" + cota "R 120,5 / 480 mm" + nota "ESC. 1:4 · f₀ 110 Hz", líneas crema para contraste). En escritorio va `display:none` (ahí se usan las `.cd-tline/.cd-anno` de siempre).
- **Kit / Herramientas (`#herramientas`, `#incluye`)**: en mobile el croquis/hotspots del kit se reacomodan y la info del hotspot se muestra en `.cd-kit__mobile-pop` (ver `curso.js`); la imagen del kit se escala/recorta (`transform:scale(1.1);clip-path:inset(4.55%)`). Paddings de `.cd-tools__head`, `.cd-includes__head/__extra`, `.cd-method__text` bajados a ~4rem con gaps `2.2rem`. Título de "Herramientas del oficio" con `<br>` alternado (`.cd-tools__br-m` / `.cd-tools__br-d`).
- **Testimonios / Garantía / Precio (mobile)**: paddings verticales llevados a `4rem` y gaps a `2.2rem`. En **Garantía** el espacio entre cada título (`.cd-guarantee__stat`) y su párrafo es `margin-bottom:.6rem`. En **Precio**, la `.cd-price-card` va `width:calc(100% - 2*var(--gut))` centrada, con `margin-bottom:0` (el aire inferior lo da el `padding-bottom:4rem` de `.cd-pricing`). El `.cd-faq__head` tiene `padding-top:4rem`, `padding-bottom:2.2rem` y `gap:2.2rem`.
- **CTA / Contacto (mobile)**: `.cd-cta__inner` con `grid-template-columns:1fr`, `padding-top:4rem` y `padding-bottom:4rem`; `gap:2.2rem` (= distancia datos↔"Tu nombre"); `.cd-cta__left{gap:2.2rem}` (= etiqueta↔título↔párrafo↔datos, todas a 2.2rem). Los **3 datos (Inicio/Horario/Día)** entran en **una sola línea** con `flex-wrap:nowrap;justify-content:space-between;width:100%` (valores `1.2rem`, labels `.58rem`). El horario se abrevia a **"16-19 h"** en mobile via spans alternados `.cd-cta__hr-d` (escritorio "16:00 a 19:00") / `.cd-cta__hr-m`; ojo: se agregó `.cd-cta__info b span{font-size:inherit;text-transform:none;opacity:1}` para que esos spans no hereden el estilo de label.

> **Estilo de estas iteraciones**: el usuario pidió muchísimos ajustes finos de espaciados/tamaños **exclusivamente en mobile**, insistiendo en no alterar escritorio. Regla práctica: todo cambio mobile va en el bloque `@media(max-width:620px)` de `curso.css`; cuando algo tiene que diferir entre breakpoints (saltos de línea, croquis, etc.) se usan elementos/clases duplicadas alternadas por `display`.

### 11.2 Footer de la página del curso (DESKTOP, `@media(min-width:1001px)` de `curso.css`)

El footer del curso se reestructuró y quedó **distinto al del index**:
- **5 columnas** (grid `1.2fr .9fr .8fr .9fr 1.1fr`): **marca · Contacto · Navegación · Cursos · La Correspondencia**. Se agregó la columna **Cursos** (Violín / Guitarra eléctrica / Bajo eléctrico → `index.html#cursos`).
- **Navegación**: quedó solo con **Inicio · Temario · Reseñas** (se borraron del HTML los demás links), en **una sola columna** (`column-count:1`).
- **Bloque de texto centrado**: las columnas Contacto/Navegación/Cursos usan `display:grid;justify-content:center;align-content:start` para **centrar el bloque** en la columna manteniendo los renglones alineados a la izquierda (el `align-content:start` evita que el grid estire las filas y agrande el interlineado). Se excluye `.footer__news`.
- **Padding lateral de las columnas reducido** (`.footer>div{padding-inline:1.6rem}`) y **gap de Navegación** a `2rem`: sin eso, el padding grande (`var(--gut)` ≈ 4rem) hacía que las columnas se dimensionaran por su contenido y el `fr` "no hiciera nada".
- **Línea marrón arriba del footer**: se le puso `border-bottom:.5px solid var(--line)` a `.cd-cta` (como en el index, donde la da la sección naranja anterior).

---

## 12. Biblioteca UX/UI (`biblioteca.html` + `css/biblioteca.css` + `js/biblioteca.js`)

Design system interactivo (prefijo `lib-`) que reutiliza los componentes **reales** de `styles.css`. Enlazada desde el footer del sitio ("Biblioteca UX/UI"). **Fue rediseñada por completo** (antes tenía un TOC lateral fijo; ahora usa una navbar como el resto del sitio) y se le **podaron muchas secciones**.

### Navegación (cambio grande)
- **Se eliminó el TOC lateral** (`.lib-topbar`, `.lib-shell`, `.lib-toc` y sus estilos) y se reemplazó por una **`.nav`** igual a la de las otras páginas (hereda el estilo de `styles.css`, incluida la hamburguesa animada + menú numerado en mobile).
- La navbar tiene **3 accesos = los 3 grupos**: **Fundamentos** (→ `#colores`), **Componentes** (→ `#botones`), **Sistema** (→ `#estados`), + CTA "← Volver al sitio" + logo (→ `index.html`).
- `.lib-main` lleva `padding-top` para no quedar bajo la navbar fija, y las secciones tienen `scroll-margin-top` para que los anclajes no queden tapados.
- El **grupo activo** se resalta según el scroll (`js/biblioteca.js`, objeto `groupOf` + IntersectionObserver; estilo `.nav__links a.is-active`).

### Hero
- Etiqueta "**Sistema de diseño**". Título "**Biblioteca UI**." (antes "UX/UI"). Bajada única: "El sistema de diseño de **TRASTES · Luthería de autor**." **Se quitaron los contadores** (colores/tipografía/componentes/línea).

### Secciones ACTUALES (tras la poda)
Agrupadas en el TOC/navbar en Fundamentos / Componentes / Sistema:
- **Fundamentos**: **Color** (4 swatches con copiar HEX + toast; **sin** la bajada ni la nota "Soporte gris"; el swatch **Crema** se llama solo "Crema", sin hover en el chip y con línea marrón arriba del título vía `.swatch--crema`), **Tipografía** (specimen + escala de tipos, cada fila en formato **"variable · tamaño · uso"**), **Grilla y espaciado** (tokens `--gut/--line/--ease/radios` + demo de líneas), **Elementos gráficos** (blueprint + croquis; sin caption).
- **Componentes**: **Botones** (es una sección "cajón": botones `.btn--accent/ghost/dark` + **reproductor** `.mock--audio` #libAudio + **hotspot "+"** del kit + **acordeón** `.qa` + **flip-card** `.wp__flip`, todos metidos acá), **Tarjetas** (beneficio con marcador SVG + curso), **Formularios**, **Nota técnica**, **Carrusel** (scroll-snap + puntitos).
- **Sistema**: **Estados e interacciones** (hover/foco/subrayado).

### Secciones ELIMINADAS de la biblioteca
Etiquetas, Navegación, **Modal** (sección + overlay `#modal`), Reproductor (como sección propia; su player se movió a Botones), Flip-card (como sección; movida a Botones), Acordeón (como sección; movido a Botones), Marquee, Frecuencias, Voz y patrones.

### Estilos propios agregados en `biblioteca.css`
- `#libAudio{padding:.55rem .9rem}` — el reproductor conserva el rect. marrón (`.mock`, `#1c0a03`) con outline claro pero con menos alto para igualar los botones.
- `.cd-kit__hotspot` / `.cd-kit__plus` — **replicados** en `biblioteca.css` porque `curso.css` NO se carga en la biblioteca (el botón "+" no tendría estilo si no).
- `.swatch--crema` (sin hover + `border-top` en el meta), `.nav__links a.is-active`.

---

## 13. Decisiones de diseño acordadas (mantener)

- **Voseo en TODO** el contenido dirigido al usuario ("construí", "reservá", "diseñá tu instrumento", "tocá para girar"). Los "su/usted" que quedan son de tercera persona (refieren a la madera/instrumento), NO tocarlos. NO mezclar con "tú".
- **Títulos de sección**: una palabra clave en naranja (`<em>`) + **punto marrón** al final (fuera del `<em>`). Ej: "clon.", "alma.", "servicios.", "creación.", "madera.", "luthería.", "frecuentes.", "eligieron.".
- **Etiquetas de sección**: formato "NN / TÍTULO", en **violeta** (todas). Numeración: Manifiesto 01, Beneficios 02, Servicios 03, Proceso 04, Maderas 05, Academia 06, VIP 07, Equipo 08, Reseñas/Testimonios 09, FAQ 10.
- **Líneas técnicas de 0.5px** (`--line`) para separar bloques; retículas asimétricas.
- **Lenguaje de plano técnico** (blueprint): cotas, círculos concéntricos, nodos, numeración. **NUNCA motivos botánicos/florales.**
- **Nunca negro puro** (usar espresso `#2A1005`).
- Nodos de croquis en **violeta**; numeración/medidas de acento en **naranja**; líneas en espresso.
- Imágenes cálidas de taller, recortadas con `background: … center/cover no-repeat`.
- Espaciados grandes entre secciones (paddings verticales tipo `clamp(10rem,21vh,20rem)`); el usuario pidió mucho aire. Varias secciones comparten `clamp(10rem,21vh,20rem)` de padding superior (Manifiesto, Beneficios, Servicios, Proceso, Maderas).

---

## 14. Cosas PENDIENTES

- **Páginas de detalle de los otros 3 cursos** (eléctrica, violín, bajo): sólo existe la de guitarra criolla; sus botones apuntan a `#cta`. Se puede clonar la plantilla `curso-guitarra-criolla.html`.
- **Formularios son demo** (no envían a ningún backend): modal de co-creación, inscripción del curso, newsletters. Muestran mensaje de éxito local.
- **Inconsistencia menor de nombres de madera**: el `<select>` del modal de co-creación ofrece "Palisandro de Brasil" y "Ébano de Gabón", pero en la sección Maderas ahora figuran como "Palisandro" (Dalbergia latifolia) y "Ébano Macassar". Conviene unificar.
- **Comentario de color desactualizado**: el encabezado de `styles.css` sigue diciendo `#FAF6EE` como crema, pero el valor real de `--cream` es `#f8edd7`.

> **RESUELTO desde la versión anterior del doc**: las 3 solapas de maderas están pobladas (estabilidad ya no está vacía) y `redwood`/`cedro` tienen imágenes reales con flip-card.

---

## 15. PROBLEMAS CONOCIDOS

- **`assets/tap_tone.MP3` tiene la extensión en MAYÚSCULAS** pero el HTML lo referencia como `assets/tap_tone.mp3` (minúscula). En Windows (case-insensitive) funciona, pero **en GitHub Pages (Linux, case-sensitive) el audio del portal VIP NO va a cargar.** → Hay que renombrar el archivo a `tap_tone.mp3` (minúscula) o ajustar la referencia. **(SIGUE SIN RESOLVER.)**
- **`min-height` "mágicos" en el panel de maderas** (`.wp__title` 3.7rem, `.wp__desc` 5.8rem): se pusieron para estabilizar la altura del panel y evitar que las celdas del selector "salten" al cambiar de madera. Están calibrados para descripciones de hasta ~4 líneas y nombres botánicos de hasta 2 líneas **en escritorio**. Si se agregan textos más largos o se prueba en anchos raros, podría reaparecer un salto mínimo → ajustar esos valores.
- **CSS muerto**: quedaron algunas reglas sin uso tras rediseños (p.ej. `.axis-label`, estilos viejos de acordeón de servicios/cursos, `.bspec`, `.review`/`.review__foot`, `.ph--wood*` que ya casi no se usan, `.section-title--light` sólo lo usa VIP, `.btn--soon` ya no se muestra en la biblioteca). No molestan pero se pueden limpiar.
- **`js/biblioteca.js` · `groupOf` con claves muertas**: el objeto que mapea sección→grupo todavía lista ids de secciones ya eliminadas (tags, navegacion, marquee, frecuencias, patrones). Son inofensivas (no se usan), pero se pueden limpiar.
- **Scrollbar personalizada**: las flechas y colores solo funcionan en navegadores WebKit (Chrome/Edge/Safari). Firefox no muestra las flechas ni el hover (se sacó `scrollbar-color` a propósito para que Chrome respete el hover violeta).
- **Arrastre horizontal en mobile (RESUELTO)**: aparecía a ciertos anchos (p.ej. con DevTools acopladas al costado). Se corrigió agregando `overflow-x:hidden` **también a `html`** (antes solo estaba en `body`). Clipea el desborde a cualquier ancho.

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
