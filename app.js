/* Corfu History Walk – app logic
   Mobile-first self-guided tour. No build step; plain ES2020. */

// ---------- helpers ----------
const en = (text) => `<span lang="en" dir="ltr">${text}</span>`;
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Photos: one per stop, freely licensed, hot-linked from Wikimedia Commons.
// Filled by STOP_IMAGES below; a stop with no entry simply renders without a photo.
const STOP_IMAGES = window.CORFU_STOP_IMAGES || {};

const ROUTE_MODES = {
  full: {
    label: "המסלול המלא",
    description: "העיר הוונציאנית, הכנסיות והמצודה העתיקה",
    hours: "כ־4–4.5 שעות"
  },
  short: {
    label: "מסלול מקוצר",
    description: "מכנסיית ספירידון הקדוש עד הכניסה למצודה",
    hours: "כ־2–2.5 שעות"
  }
};

const UNESCO = { label: "UNESCO – Old Town of Corfu", url: "https://whc.unesco.org/en/list/978" };
const UNESCO_EVAL = { label: "UNESCO – Advisory Body Evaluation (PDF)", url: "https://whc.unesco.org/archive/advisory_body_evaluation/978.pdf" };
const UNESCO_FORTS = { label: "UNESCO – Late Medieval Bastioned Fortifications in Greece", url: "https://whc.unesco.org/en/tentativelists/5855" };
const VISIT_FORTRESS = { label: "Visit Corfu – Old Fortress", url: "https://visit.corfu.gr/sights/old-fortress/" };

const stops = [
  {
    id: "spyridon",
    name: "כנסיית ספירידון הקדוש",
    nameEn: "Church of St. Spyridon",
    duration: "25–30 דקות",
    inShort: true,
    position: { lat: 39.625123, lng: 19.922665 },
    short: "הקדוש הפטרון של קורפו והמפגש בין האורתודוקסיה היוונית לעולם הוונציאני.",
    body: `
      <p>הכנסייה הנוכחית הוקמה ב־1589, בתקופת השלטון הוונציאני. היא אורתודוקסית בפולחן, אך ניכרות בה השפעות מערביות; מגדל הפעמונים הגבוה שלה מזכיר במיוחד את ${en("San Giorgio dei Greci")} בוונציה.</p>
      <h3>מה לחפש</h3>
      <p>את ארון השרידים הכסוף של ספירידון הקדוש, את התקרה המצוירת המחולקת ל־17 מסגרות, ואת מגדל הפעמונים מבחוץ.</p>
      <h3>הסיפור של 1716</h3>
      <p>במסורת הקורפית מיוחסת לקדוש התערבות ניסית במהלך המצור העות'מאני של 1716. בהמשך הסיור תראו במצודה את הצד הצבאי של אותו סיפור.</p>`,
    sources: [
      { label: "Visit Corfu – The Church of St Spyridon", url: "https://visit.corfu.gr/sights/the-church-of-st-spyridon/" },
      UNESCO
    ]
  },
  {
    id: "campiello",
    name: "קמפיילו והקאנטוניה",
    nameEn: "Campiello & the kantounia",
    duration: "30–35 דקות",
    inShort: true,
    position: { lat: 39.6262, lng: 19.92275 },
    short: "הרובע הישן והצפוף של העיר: סמטאות צרות, בתים גבוהים וכיכרות קטנות.",
    body: `
      <p>בקמפיילו (${en("Campiello")}) לא מחפשים אתר בודד אלא את צורת העיר. הסמטאות הצרות — הקאנטוניה (${en("kantounia")}) — והבתים הגבוהים מזכירים עד כמה קורפו התפתחה בתוך שטח מבוצר ומוגבל.</p>
      <h3>מה לחפש</h3>
      <p>כביסה מעל הסמטאות, חלונות ותריסים, מעברים צרים וכיכרות קטנות שנפתחות לפתע. זו אחת הנקודות שבהן האופי הוונציאני של העיר מורגש במיוחד.</p>`,
    sources: [
      { label: "Visit Corfu – Kampielo", url: "https://visit.corfu.gr/sights/kampielo/" },
      UNESCO
    ]
  },
  {
    id: "palace",
    name: "ארמון מיכאל וגאורגיוס הקדושים",
    nameEn: "Palace of St. Michael and St. George",
    duration: "15 דקות",
    inShort: true,
    position: { lat: 39.6257, lng: 19.9248 },
    short: "מעבר חד מן התקופה הוונציאנית אל השכבה הבריטית של קורפו.",
    body: `
      <p>הארמון הנאו־קלאסי נבנה בשנים 1819–1823 בתקופת הפרוטקטורט הבריטי. הוא שימש את מוסדות השלטון וכיום שוכן בו מוזיאון האמנות האסייתית.</p>
      <h3>ציר הזמן שכדאי לזכור</h3>
      <p>ונציה עד 1797 ← תקופות צרפתיות ורוסיות קצרות ← צרפת הנפוליאונית ← שלטון בריטי 1815–1864 ← איחוד עם יוון ב־1864.</p>`,
    sources: [
      { label: "Museum of Asian Art – Palace History", url: "https://matk.gr/st-michael-st-george-palace-corfu-history/" },
      { label: "Visit Corfu – Palace of St. Michael and St. George", url: "https://visit.corfu.gr/sights/palace-of-st-michael-and-st-george/" }
    ]
  },
  {
    id: "spianada",
    name: "הליסטון והספיאנדה",
    nameEn: "The Liston & the Spianada",
    duration: "30–40 דקות",
    inShort: true,
    position: { lat: 39.6241, lng: 19.9246 },
    short: "הליסטון צרפתי; הספיאנדה מספרת דווקא סיפור צבאי ונציאני.",
    body: `
      <p>הליסטון (${en("Liston")}) בעל הקשתות נבנה בתקופה הצרפתית האימפריאלית (1807–1814), בהשראת ${en("rue de Rivoli")} בפריז. לעומתו, המרחב העצום של הספיאנדה (${en("Spianada")}) נולד מצורך צבאי: הוונציאנים פינו והרסו מבנים לפני המצודה כדי ליצור שדה אש פתוח, והכיכר קיבלה את ממדיה הנוכחיים במאה ה־17.</p>
      <h3>עצרו והביטו אל המצודה</h3>
      <p>מכאן קל להבין את ההיגיון: כמעט דבר אינו מסתיר את קו הראייה אל הביצורים. מה שהיום הוא פארק וכיכר היה חלק ממערכת ההגנה.</p>`,
    sources: [
      { label: "Visit Corfu – Spianada Square", url: "https://visit.corfu.gr/sights/spianada-square/" },
      UNESCO_EVAL
    ]
  },
  {
    id: "entrance",
    name: "הכניסה למצודה העתיקה והקונטרפוסה",
    nameEn: "Old Fortress entrance & the Contrafossa",
    duration: "20–30 דקות",
    inShort: true,
    position: { lat: 39.6235, lng: 19.92604 },
    short: "התעלה והגשר מפרידים את חצי האי המבוצר מן העיר.",
    body: `
      <p>הקונטרפוסה (${en("Contrafossa")}) היא תעלת ים שחוצה את בסיס חצי האי והפכה את המצודה למעשה לאי מלאכותי. כיום עוברים עליה בגשר; בעבר פעל כאן גשר מתרומם.</p>
      <h3>הנדסת רנסנס</h3>
      <p>הבסטיונים נועדו לעידן התותחים: צורות גיאומטריות שמאפשרות למגינים לכסות באש את חזית החומות ולצמצם שטחים מתים.</p>
      <h3>במסלול המקוצר</h3>
      <p>זו תחנת הסיום. מי שרוצה להמשיך יכול להיכנס למצודה בכוחות עצמו; שימו לב לשעות הפתיחה ולכניסה בתשלום.</p>`,
    sources: [VISIT_FORTRESS, UNESCO_FORTS]
  },
  {
    id: "inside",
    name: "בתוך המצודה: שכבות של אימפריות",
    nameEn: "Inside the Old Fortress",
    duration: "25–30 דקות",
    position: { lat: 39.62335, lng: 19.92755 },
    short: "ביזנטים, ונציאנים ובריטים השאירו כאן שכבות זו על גבי זו.",
    body: `
      <p>המצודה העתיקה (${en("Old Fortress")}) איננה מבנה מתקופה אחת. הגרעין המבוצר ביזנטי, הוונציאנים הרחיבו ושינו אותו באופן עמוק, והבריטים המשיכו להתאים אותו לצורכיהם.</p>
      <h3>מה לחפש</h3>
      <p>כתובות, סמלי אצולה, שרידי ביצורים וסמלים ונציאניים. האריה המכונף של מרקוס הקדוש הוא הסמל המזוהה ביותר עם הרפובליקה של ונציה.</p>`,
    sources: [UNESCO, VISIT_FORTRESS]
  },
  {
    id: "george",
    name: "כנסיית גאורגיוס הקדוש",
    nameEn: "Church of St. George",
    duration: "10–15 דקות",
    position: { lat: 39.62269, lng: 19.92943 },
    short: "כנסייה שנראית כמקדש יווני — אך נבנתה בידי הבריטים.",
    body: `
      <p>הכנסייה נבנתה סביב 1840 עבור החיילים הבריטים במצודה, במראה נאו־קלאסי עם חזית דורית. לאחר איחוד האיים היוניים עם יוון היא הפכה לכנסייה אורתודוקסית.</p>
      <p>זו דוגמה כמעט מושלמת לאופן שבו שכבות שונות של קורפו מתחברות: מבנה בריטי, שפה קלאסית יוונית ופולחן אורתודוקסי.</p>`,
    sources: [VISIT_FORTRESS, UNESCO]
  },
  {
    id: "upper",
    name: "העלייה למצודה העליונה והתצפית",
    nameEn: "Climb to the upper fortress & lookout",
    duration: "25–35 דקות",
    optional: true,
    position: { lat: 39.6240, lng: 19.9299 },
    short: "נקודת הסיכום: הים, הספיאנדה, העיר הצפופה ומגדל ספירידון הקדוש.",
    body: `
      <p>מהאזור העליון אפשר להבין את העיר כמערכת אחת: הים והנתיבים האסטרטגיים ממזרח, המצודה, המרחב הפתוח של הספיאנדה והעיר הצפופה שמאחור.</p>
      <h3>תחנה אופציונלית</h3>
      <p>העלייה כוללת מדרגות, אבנים לא אחידות ושיפועים. היא אינה הכרחית להבנת האתר; גם מהמפלסים התחתונים מתקבלת תמונה היסטורית עשירה. אפשר לדלג ישירות לתחנה הבאה.</p>`,
    sources: [VISIT_FORTRESS]
  },
  {
    id: "faliraki",
    name: "פלירקי (המרחצאות של אלקו)",
    nameEn: "Faliraki / Aleko’s Baths",
    duration: "20–30 דקות",
    position: { lat: 39.62679, lng: 19.92531 },
    short: "סיום ליד הים, מתחת לעיר העתיקה, עם מבט חזרה אל המצודה.",
    body: `
      <p>פלירקי (${en("Faliraki")}) הוא מקום רחצה קטן ומקומי מתחת לעיר העתיקה, הידוע גם כ״מרחצאות של אלקו״ (${en("Aleko’s Baths")}). הגישה ההיסטורית אל הים הייתה דרך שער ניקולאוס הקדוש (${en("St. Nicholas Gate")}).</p>
      <p>זה מקום מתאים לסיום רגוע של הסיור: ישיבה ליד המים, שתייה או רחצה קצרה, תוך הסתכלות חזרה אל הנוף ההיסטורי שעברתם בו.</p>`,
    sources: [{ label: "Visit Corfu – The Old Town", url: "https://visit.corfu.gr/sights/the-old-town/" }]
  }
];

// ---------- state ----------
const MOBILE_QUERY = window.matchMedia("(max-width: 820px)");
const STORAGE_MODE = "corfuRouteMode";
const STORAGE_KEY = "corfuGoogleMapsKey";

let mode = readStoredMode();
let activeStopId = null;
let map;
let markers = [];
let routeLine;
let mapState = "idle"; // idle | loading | ready | failed | unavailable
let apiState = "idle"; // Maps JS API script: idle | loading | ready | failed
let mapWanted = false;
const legsByMode = {}; // mode -> { legs: [{ minutes, meters }], path: [{ lat, lng }] }

// ---------- DOM ----------
const $ = (sel) => document.querySelector(sel);
const listEl = $("#tour-stops");
const detailEl = $("#stop-detail");
const statusEl = $("#status");
const summaryEl = $("#route-summary");
const modeGroupEl = $("#route-mode");
const mapColumn = $("#map-column");
const mapToggle = $("#map-toggle");
const mapPanel = $("#map-panel");
const mapFallback = $("#map-fallback");
const mapFallbackText = $("#map-fallback-text");
const mapFallbackLink = $("#map-fallback-link");
const devForm = $("#api-key-form");
const devInput = $("#api-key");
const showAllBtn = $("#show-all");
const legsEl = $("#route-legs");
const dialog = $("#image-dialog");

// ---------- route helpers ----------
function readStoredMode() {
  try {
    const stored = localStorage.getItem(STORAGE_MODE);
    return stored in ROUTE_MODES ? stored : "full";
  } catch { return "full"; }
}

function routeStops() {
  return mode === "short" ? stops.filter(s => s.inShort) : stops;
}

function stopIndex(id) {
  return routeStops().findIndex(s => s.id === id);
}

function toRad(d) { return d * Math.PI / 180; }

function distanceMeters(a, b) {
  const R = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Straight-line distance × 1.35 for alleys and detours, at ~75 m/min (slow tourist pace).
function walkingMinutes(a, b) {
  return Math.max(1, Math.round(distanceMeters(a.position, b.position) * 1.35 / 75));
}

function latLng(stop) { return `${stop.position.lat},${stop.position.lng}`; }

function estimatedLeg(from, to) {
  return {
    minutes: walkingMinutes(from, to),
    meters: Math.round(distanceMeters(from.position, to.position) * 1.35),
    estimated: true
  };
}

// Real walking leg from the Routes API when available, otherwise the straight-line estimate.
function getLeg(from, to) {
  const i = stopIndex(from.id);
  const leg = legsByMode[mode]?.legs?.[i];
  if (leg && stopIndex(to.id) === i + 1) return leg;
  return estimatedLeg(from, to);
}

function formatDistance(meters) {
  return meters < 1000 ? `${Math.round(meters / 10) * 10} מ׳` : `${(meters / 1000).toFixed(1)} ק״מ`;
}

function legText(leg) {
  return leg.estimated
    ? `כ־${leg.minutes} דקות הליכה (הערכה)`
    : `${leg.minutes} דקות · ${formatDistance(leg.meters)} הליכה`;
}

function routeTotals() {
  const list = routeStops();
  let minutes = 0, meters = 0, estimated = false;
  for (let i = 0; i < list.length - 1; i++) {
    const leg = getLeg(list[i], list[i + 1]);
    minutes += leg.minutes; meters += leg.meters; estimated ||= Boolean(leg.estimated);
  }
  return { minutes, meters, estimated };
}

function legCacheKey(m) {
  const ids = (m === "short" ? stops.filter(s => s.inShort) : stops).map(s => s.id).join(",");
  return `corfuRouteLegs:${m}:${ids}`;
}

function toLatLngLiteral(p) {
  return { lat: typeof p.lat === "function" ? p.lat() : p.lat, lng: typeof p.lng === "function" ? p.lng() : p.lng };
}

// One computeRoutes() call per route mode (<=7 intermediates keeps it in the Essentials tier).
// Results are cached in localStorage so the last known legs also work offline.
async function ensureRoutes() {
  const m = mode;
  if (legsByMode[m]) return;
  const list = routeStops();

  try {
    const cached = JSON.parse(localStorage.getItem(legCacheKey(m)) || "null");
    if (cached?.legs?.length === list.length - 1) {
      legsByMode[m] = cached;
      onLegsUpdated(m);
      return;
    }
  } catch { /* ignore */ }

  if (apiState !== "ready") return;

  try {
    const { Route } = await google.maps.importLibrary("routes");
    const { routes } = await Route.computeRoutes({
      origin: list[0].position,
      destination: list[list.length - 1].position,
      intermediates: list.slice(1, -1).map(stop => ({ location: stop.position })),
      travelMode: "WALKING",
      fields: ["legs", "path"]
    });
    const route = routes?.[0];
    if (!route?.legs || route.legs.length !== list.length - 1) throw new Error("Unexpected route shape");

    const data = {
      legs: route.legs.map(leg => ({
        minutes: Math.max(1, Math.round(Number(leg.durationMillis) / 60000)),
        meters: Math.round(Number(leg.distanceMeters))
      })),
      path: (route.path || []).map(toLatLngLiteral)
    };
    legsByMode[m] = data;
    try { localStorage.setItem(legCacheKey(m), JSON.stringify(data)); } catch { /* ignore */ }
    onLegsUpdated(m);
  } catch (error) {
    console.warn("Routes API unavailable, using straight-line estimates.", error);
  }
}

function onLegsUpdated(m) {
  if (m !== mode) return;
  refreshLegText();
  renderLegs();
  if (mapState === "ready") drawRoute();
}

// Update the walking-time line in place so focus inside the stop card is not disturbed.
function refreshLegText() {
  const list = routeStops();
  const i = stopIndex(activeStopId);
  const meta = detailEl.querySelector(".nav-next-meta");
  if (!meta || i < 0 || !list[i + 1]) return;
  meta.innerHTML = `${legText(getLeg(list[i], list[i + 1]))} · נפתח ב־${en("Google Maps")}`;
}

function legUrl(from, to) {
  const params = new URLSearchParams({ api: "1", destination: latLng(to), travelmode: "walking" });
  if (from) params.set("origin", latLng(from));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

// Google Maps URLs support at most 3 waypoints on mobile browsers → ≤5 stops per link.
function segmentUrl(segment) {
  const params = new URLSearchParams({
    api: "1",
    origin: latLng(segment[0]),
    destination: latLng(segment[segment.length - 1]),
    travelmode: "walking"
  });
  const mid = segment.slice(1, -1);
  if (mid.length) params.set("waypoints", mid.map(latLng).join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function routeSegments() {
  const list = routeStops();
  const segments = [];
  for (let i = 0; i < list.length - 1; i += 4) {
    segments.push(list.slice(i, Math.min(i + 5, list.length)));
  }
  return segments;
}

// ---------- rendering ----------
function stopTitleHtml(stop) {
  return `<span class="stop-name">${stop.name}</span>
          <span class="stop-name-en">${en(stop.nameEn)}</span>`;
}

function renderModeToggle() {
  modeGroupEl.querySelectorAll("[data-mode]").forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode));
  });
  const route = ROUTE_MODES[mode];
  summaryEl.textContent = `${route.hours} · ${routeStops().length} תחנות · ${route.description}`;
}

function renderStops() {
  const list = routeStops();
  listEl.innerHTML = list.map((stop, index) => {
    const img = STOP_IMAGES[stop.id];
    return `
    <li class="stop-item">
      <button class="stop-button" type="button" data-stop-id="${stop.id}" aria-controls="stop-detail">
        <span class="stop-number" aria-hidden="true">${index + 1}</span>
        ${img ? `<img class="stop-thumb" src="${img.thumb320}" alt="" width="72" height="54" loading="lazy" decoding="async">` : ""}
        <span class="stop-text">
          <span class="stop-title">${stopTitleHtml(stop)}</span>
          <span class="stop-meta">${stop.duration}${stop.optional ? " · אופציונלי" : ""} · ${stop.short}</span>
        </span>
      </button>
    </li>`;
  }).join("");
  markActiveButton();
}

function markActiveButton() {
  listEl.querySelectorAll(".stop-button").forEach(btn => {
    if (btn.dataset.stopId === activeStopId) btn.setAttribute("aria-current", "step");
    else btn.removeAttribute("aria-current");
  });
}

function renderDetail(stop) {
  const list = routeStops();
  const index = list.indexOf(stop);
  const next = list[index + 1];
  const prev = list[index - 1];
  const img = STOP_IMAGES[stop.id];

  const nextAction = next
    ? `<a class="primary-link nav-next" href="${legUrl(stop, next)}" target="_blank" rel="noopener">
         <span class="nav-next-label">נווטו לתחנה ${index + 2} · ${next.name}</span>
         <span class="nav-next-meta">${legText(getLeg(stop, next))} · נפתח ב־${en("Google Maps")}</span>
       </a>`
    : `<p class="route-end">זו התחנה האחרונה במסלול${mode === "short" ? " המקוצר" : ""}. תודה שהלכתם איתנו.</p>`;

  const figure = img ? `
    <figure class="stop-figure">
      <button type="button" class="figure-button" data-enlarge="${stop.id}" aria-label="הגדלת התמונה: ${escapeHtml(img.alt)}">
        <img src="${img.thumb800}" alt="${escapeHtml(img.alt)}" width="960" height="${Math.round(960 * img.height / img.width)}" loading="lazy" decoding="async">
      </button>
      <figcaption>${en(`Photo: <a href="${img.descriptionUrl}" target="_blank" rel="noopener">${escapeHtml(img.author)}</a>, <a href="${img.licenseUrl}" target="_blank" rel="noopener">${escapeHtml(img.license)}</a>, via Wikimedia Commons`)}</figcaption>
    </figure>` : "";

  const sources = stop.sources?.length ? `
    <details class="sources">
      <summary>מקורות</summary>
      <ul>${stop.sources.map(s => `<li>${en(`<a href="${s.url}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a>`)}</li>`).join("")}</ul>
    </details>` : "";

  detailEl.innerHTML = `
    <p class="progress">תחנה ${index + 1} מתוך ${list.length}${stop.optional ? ' <span class="badge">אופציונלי</span>' : ""}</p>
    <h2 id="stop-heading">${stopTitleHtml(stop)}</h2>
    <p class="detail-meta">${stop.duration} במקום</p>
    ${figure}
    <div class="stop-body">${stop.body}</div>
    ${sources}
    <div class="stop-actions">
      ${nextAction}
      <div class="action-row">
        <button type="button" class="secondary-button" data-action="prev" ${prev ? "" : "disabled"}>התחנה הקודמת</button>
        <button type="button" class="secondary-button" data-action="next" ${next ? "" : "disabled"}>התחנה הבאה</button>
      </div>
      <div class="action-row">
        <a class="text-link" href="${legUrl(null, stop)}" target="_blank" rel="noopener">נווטו לתחנה זו ממקומכם</a>
        <button type="button" class="text-link mobile-only" data-action="show-map">הצג מפה</button>
        <a class="text-link" href="#tour-stops-heading">כל התחנות</a>
      </div>
    </div>`;
}

function renderLegs() {
  const segments = routeSegments();
  const totals = routeTotals();
  legsEl.innerHTML = `
    <p class="legs-total">סה״כ הליכה${totals.estimated ? " (הערכה)" : ""}: כ־${totals.minutes} דקות · ${formatDistance(totals.meters)}</p>
    <p class="legs-title">המסלול ב־${en("Google Maps")}${segments.length > 1 ? " (בשני מקטעים)" : ""}:</p>
    <ul class="legs-list">
      ${segments.map((seg, i) => {
        const first = stopIndex(seg[0].id) + 1;
        const last = stopIndex(seg[seg.length - 1].id) + 1;
        return `<li><a class="text-link" href="${segmentUrl(seg)}" target="_blank" rel="noopener">${segments.length > 1 ? `מקטע ${i + 1}: ` : ""}תחנות ${first}–${last}</a></li>`;
      }).join("")}
    </ul>`;
}

function announce(text) {
  statusEl.textContent = "";
  // Re-set on next frame so identical messages are re-announced.
  requestAnimationFrame(() => { statusEl.textContent = text; });
}

function updateFallbackLink(stop) {
  const list = routeStops();
  const next = list[list.indexOf(stop) + 1];
  mapFallbackLink.href = next ? legUrl(stop, next) : legUrl(null, stop);
  mapFallbackLink.textContent = next ? `פתחו ניווט לתחנה ${list.indexOf(next) + 1} ב־Google Maps` : "פתחו את התחנה ב־Google Maps";
}

function selectStop(id, { focus = false, moveMap = false } = {}) {
  const stop = routeStops().find(s => s.id === id);
  if (!stop) return;
  activeStopId = id;
  renderDetail(stop);
  markActiveButton();
  updateFallbackLink(stop);

  const index = stopIndex(id) + 1;
  announce(`נבחרה תחנה ${index} מתוך ${routeStops().length}, ${stop.name}`);

  if (focus) {
    detailEl.focus({ preventScroll: true });
    detailEl.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  if (map && moveMap && isMapVisible()) {
    map.panTo(stop.position);
    map.setZoom(18);
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setMode(nextMode) {
  if (!(nextMode in ROUTE_MODES) || nextMode === mode) return;
  mode = nextMode;
  try { localStorage.setItem(STORAGE_MODE, mode); } catch { /* ignore */ }
  renderModeToggle();
  renderStops();
  renderLegs();
  const keep = routeStops().some(s => s.id === activeStopId) ? activeStopId : routeStops()[0].id;
  selectStop(keep);
  announce(`${ROUTE_MODES[mode].label}: ${routeStops().length} תחנות, ${ROUTE_MODES[mode].hours}`);
  if (mapState === "ready") drawRoute();
  ensureRoutes();
}

// ---------- map ----------
function isMapVisible() {
  return !MOBILE_QUERY.matches || mapColumn.classList.contains("is-open");
}

function setMapOpen(open) {
  mapColumn.classList.toggle("is-open", open);
  mapToggle.setAttribute("aria-expanded", String(open));
  mapToggle.textContent = open ? "הסתר מפה" : "הצג מפה";
  if (open) {
    ensureMap();
    if (mapState === "ready") requestAnimationFrame(showRouteBounds);
  }
}

function getEmbeddedKey() {
  const key = window.CORFU_CONFIG?.googleMapsApiKey;
  if (!key || key.startsWith("__")) return "";
  return key.trim();
}

function getKey() {
  const embedded = getEmbeddedKey();
  if (embedded) return embedded;
  try { return localStorage.getItem(STORAGE_KEY) || ""; } catch { return ""; }
}

function isDevHost() {
  return ["localhost", "127.0.0.1"].includes(location.hostname) || new URLSearchParams(location.search).has("devkey");
}

function showMapFallback(message) {
  mapFallbackText.textContent = message;
  mapFallback.hidden = false;
  if (isDevHost()) devForm.hidden = false;
}

// Loads the Maps JavaScript API script only (no map instance yet, so no map-load charge).
// v=beta is required for the Route class (google.maps.routes).
function loadMapsApi() {
  if (apiState !== "idle") return;
  const key = getKey();
  if (!key) return;
  apiState = "loading";
  if (window.google?.maps) { onApiReady(); return; }

  // With loading=async the script's load event fires before importLibrary exists;
  // Google invokes the named callback once the API is actually ready.
  window.__corfuMapsReady = onApiReady;
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=beta&loading=async&callback=__corfuMapsReady&libraries=marker,routes&language=he&region=GR`;
  script.async = true;
  script.defer = true;
  script.addEventListener("error", () => {
    apiState = "failed";
    if (mapWanted) onMapError();
  });
  document.head.appendChild(script);
}

function onApiReady() {
  apiState = "ready";
  // Bad/restricted key: surface the friendly fallback instead of Google's alert.
  window.gm_authFailure = onMapError;
  ensureRoutes();
  if (mapWanted || isMapVisible()) ensureMap();
}

function ensureMap() {
  if (mapState !== "idle") return;
  if (!getKey()) {
    mapState = "unavailable";
    showMapFallback("המפה האינטראקטיבית אינה זמינה כרגע. רשימת התחנות וההסברים זמינים כרגיל.");
    return;
  }
  mapWanted = true;
  if (apiState === "failed") { onMapError(); return; }
  if (apiState !== "ready") { loadMapsApi(); return; }
  mapState = "loading";
  initMap().catch(onMapError);
}

function onMapError(error) {
  if (error) console.warn("Map failed to initialise:", error);
  mapState = "failed";
  showMapFallback("לא הצלחנו לטעון את המפה האינטראקטיבית. רשימת התחנות זמינה כרגיל.");
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  await google.maps.importLibrary("marker");

  map = new Map($("#map"), {
    center: { lat: 39.6248, lng: 19.9258 },
    zoom: 16,
    mapId: "DEMO_MAP_ID",
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    gestureHandling: "cooperative"
  });

  mapState = "ready";
  mapFallback.hidden = true;
  drawRoute();
}

function drawRoute() {
  if (!map) return;
  const list = routeStops();
  const { AdvancedMarkerElement } = google.maps.marker;

  markers.forEach(m => { m.map = null; });
  routeLine?.setMap(null);

  const realPath = legsByMode[mode]?.path;
  routeLine = new google.maps.Polyline({
    path: realPath?.length ? realPath : list.map(s => s.position),
    geodesic: true,
    strokeColor: "#0b66b2",
    strokeOpacity: 0.92,
    strokeWeight: 5,
    map
  });

  markers = list.map((stop, index) => {
    const node = document.createElement("button");
    node.type = "button";
    node.className = "marker-button";
    node.textContent = String(index + 1);
    node.setAttribute("aria-label", `${index + 1}. ${stop.name}`);
    node.addEventListener("click", () => selectStop(stop.id, { focus: true }));
    return new AdvancedMarkerElement({ map, position: stop.position, title: `${index + 1}. ${stop.name}`, content: node });
  });

  showRouteBounds();
}

function showRouteBounds() {
  if (!map || !window.google) return;
  const bounds = new google.maps.LatLngBounds();
  routeStops().forEach(stop => bounds.extend(stop.position));
  map.fitBounds(bounds, 48);
}

// ---------- lightbox ----------
function openImage(stopId) {
  const img = STOP_IMAGES[stopId];
  const stop = stops.find(s => s.id === stopId);
  if (!img || !dialog?.showModal) return;
  dialog.querySelector("img").src = img.thumb800.replace("/960px-", "/1920px-");
  dialog.querySelector("img").alt = img.alt;
  dialog.querySelector("#image-dialog-title").textContent = stop.name;
  dialog.showModal();
}

// ---------- events ----------
listEl.addEventListener("click", (event) => {
  const button = event.target.closest(".stop-button");
  if (!button) return;
  selectStop(button.dataset.stopId, { focus: true, moveMap: true });
});

detailEl.addEventListener("click", (event) => {
  const enlarge = event.target.closest("[data-enlarge]");
  if (enlarge) { openImage(enlarge.dataset.enlarge); return; }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  const list = routeStops();
  const i = stopIndex(activeStopId);
  if (action === "prev" && list[i - 1]) selectStop(list[i - 1].id, { focus: true, moveMap: true });
  if (action === "next" && list[i + 1]) selectStop(list[i + 1].id, { focus: true, moveMap: true });
  if (action === "show-map") {
    setMapOpen(true);
    mapColumn.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    mapToggle.focus({ preventScroll: true });
  }
});

modeGroupEl.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-mode]");
  if (btn) setMode(btn.dataset.mode);
});

mapToggle.addEventListener("click", () => setMapOpen(!mapColumn.classList.contains("is-open")));
showAllBtn.addEventListener("click", showRouteBounds);

dialog?.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

devForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const key = devInput.value.trim();
  if (!key) return;
  try { localStorage.setItem(STORAGE_KEY, key); } catch { /* ignore */ }
  mapState = "idle";
  apiState = "idle";
  mapFallback.hidden = true;
  ensureMap();
});

MOBILE_QUERY.addEventListener("change", () => {
  if (!MOBILE_QUERY.matches) ensureMap();
  if (mapState === "ready" && isMapVisible()) requestAnimationFrame(showRouteBounds);
});

// ---------- boot ----------
renderModeToggle();
renderStops();
renderLegs();
selectStop(routeStops()[0].id);
if (isDevHost()) devForm.hidden = false;
ensureRoutes(); // cached legs, if any, apply immediately
if (getKey()) loadMapsApi(); else if (!MOBILE_QUERY.matches) ensureMap();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then(() => {
      // After a deploy the old worker serves the stale shell once; reload as soon as the new one takes over.
      let hadController = Boolean(navigator.serviceWorker.controller);
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (hadController) location.reload();
        hadController = true;
      });
    }).catch(() => { /* offline support is best-effort */ });
  });
}
