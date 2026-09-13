const stops = [
  {
    id: "spyridon",
    title: "כנסיית St. Spyridon",
    duration: "25–30 דקות",
    position: { lat: 39.625123, lng: 19.922665 },
    short: "הקדוש הפטרון של קורפו והמפגש בין האורתודוקסיה היוונית לעולם הוונציאני.",
    body: `
      <p>הכנסייה נבנתה בין 1589 ל־1594, בתקופת השלטון הוונציאני. היא אורתודוקסית בפולחן, אך ניכרות בה השפעות מערביות; מגדל הפעמונים הגבוה שלה מזכיר במיוחד את San Giorgio dei Greci בוונציה.</p>
      <h3>מה לחפש</h3>
      <p>את ארון השרידים הכסוף של ספירידון הקדוש, את התקרה המצוירת המחולקת ל־17 מסגרות, ואת מגדל הפעמונים מבחוץ.</p>
      <h3>הסיפור של 1716</h3>
      <p>במסורת הקורפית מיוחסת לקדוש התערבות ניסית במהלך המצור העות'מאני של 1716. בהמשך הסיור תראו במצודה את הצד הצבאי של אותו סיפור.</p>`
  },
  {
    id: "campiello",
    title: "Campiello וה־kantounia",
    duration: "30–35 דקות",
    position: { lat: 39.6262, lng: 19.92275 },
    short: "הרובע הישן והצפוף של העיר: סמטאות צרות, בתים גבוהים וכיכרות קטנות.",
    body: `
      <p>ב־Campiello לא מחפשים אתר בודד אלא את צורת העיר. הסמטאות הצרות — kantounia — והבתים הגבוהים מזכירים עד כמה קורפו התפתחה בתוך שטח מבוצר ומוגבל.</p>
      <h3>מה לחפש</h3>
      <p>כביסה מעל הסמטאות, חלונות ותריסים, מעברים צרים וכיכרות קטנות שנפתחות לפתע. זו אחת הנקודות שבהן האופי הוונציאני של העיר מורגש במיוחד.</p>`
  },
  {
    id: "palace",
    title: "Palace of St. Michael and St. George",
    duration: "15 דקות",
    position: { lat: 39.6257, lng: 19.9248 },
    short: "מעבר חד מן התקופה הוונציאנית אל השכבה הבריטית של קורפו.",
    body: `
      <p>הארמון הנאו־קלאסי נבנה בשנים 1819–1824 בתקופת הפרוטקטורט הבריטי. הוא שימש את מוסדות השלטון וכיום שוכן בו מוזיאון האמנות האסייתית.</p>
      <h3>ציר הזמן שכדאי לזכור</h3>
      <p>ונציה עד 1797 → תקופות צרפתיות ורוסיות קצרות → צרפת הנפוליאונית → שלטון בריטי 1815–1864 → איחוד עם יוון ב־1864.</p>`
  },
  {
    id: "spianada",
    title: "Liston וה־Spianada",
    duration: "30–40 דקות",
    position: { lat: 39.6241, lng: 19.9246 },
    short: "ה־Liston צרפתי; ה־Spianada מספרת דווקא סיפור צבאי ונציאני.",
    body: `
      <p>ה־Liston בעל הקשתות נבנה בתקופה הצרפתית. לעומתו, המרחב העצום של ה־Spianada נולד מצורך צבאי: הוונציאנים פינו והרסו מבנים לפני המצודה כדי ליצור שדה אש פתוח.</p>
      <h3>עצרו והביטו אל המצודה</h3>
      <p>מכאן קל להבין את ההיגיון: כמעט דבר אינו מסתיר את קו הראייה אל הביצורים. מה שהיום הוא פארק וכיכר היה חלק ממערכת ההגנה.</p>`
  },
  {
    id: "entrance",
    title: "הכניסה ל־Old Fortress וה־Contrafossa",
    duration: "20–30 דקות",
    position: { lat: 39.6235, lng: 19.92604 },
    short: "התעלה והגשר מפרידים את חצי האי המבוצר מן העיר.",
    body: `
      <p>ה־Contrafossa היא תעלת ים שחוצה את בסיס חצי האי והפכה את המצודה למעשה לאי מלאכותי. כיום עוברים עליה בגשר; בעבר פעל כאן גשר מתרומם.</p>
      <h3>הנדסת רנסנס</h3>
      <p>הבסטיונים נועדו לעידן התותחים: צורות גיאומטריות שמאפשרות למגינים לכסות באש את חזית החומות ולצמצם שטחים מתים.</p>`
  },
  {
    id: "inside",
    title: "בתוך המצודה: שכבות של אימפריות",
    duration: "25–30 דקות",
    position: { lat: 39.62335, lng: 19.92755 },
    short: "ביזנטים, ונציאנים ובריטים השאירו כאן שכבות זו על גבי זו.",
    body: `
      <p>ה־Old Fortress איננה מבנה מתקופה אחת. הגרעין המבוצר קדום, הוונציאנים הרחיבו ושינו אותו באופן עמוק, והבריטים המשיכו להתאים אותו לצורכיהם.</p>
      <h3>מה לחפש</h3>
      <p>כתובות, סמלי אצולה, שרידי ביצורים וסמלים ונציאניים. האריה המכונף של מרקוס הקדוש הוא הסמל המזוהה ביותר עם הרפובליקה של ונציה.</p>`
  },
  {
    id: "george",
    title: "כנסיית St. George",
    duration: "10–15 דקות",
    position: { lat: 39.62269, lng: 19.92943 },
    short: "כנסייה שנראית כמקדש יווני — אך נבנתה בידי הבריטים.",
    body: `
      <p>הכנסייה נבנתה סביב 1840 עבור החיילים הבריטים במצודה, במראה נאו־קלאסי עם חזית דורית. לאחר איחוד האיים היוניים עם יוון היא הפכה לכנסייה אורתודוקסית.</p>
      <p>זו דוגמה כמעט מושלמת לאופן שבו שכבות שונות של קורפו מתחברות: מבנה בריטי, שפה קלאסית יוונית ופולחן אורתודוקסי.</p>`
  },
  {
    id: "upper",
    title: "העלייה למצודה העליונה והתצפית",
    duration: "25–35 דקות",
    position: { lat: 39.6240, lng: 19.9299 },
    short: "נקודת הסיכום: הים, ה־Spianada, העיר הצפופה ומגדל St. Spyridon.",
    body: `
      <p>מהאזור העליון אפשר להבין את העיר כמערכת אחת: הים והנתיבים האסטרטגיים ממזרח, המצודה, המרחב הפתוח של ה־Spianada והעיר הצפופה שמאחור.</p>
      <h3>שימו לב לנגישות</h3>
      <p>העלייה כוללת מדרגות, אבנים לא אחידות ושיפועים. היא אינה הכרחית להבנת האתר; גם מהמפלסים התחתונים מתקבלת תמונה היסטורית עשירה.</p>`
  },
  {
    id: "faliraki",
    title: "Faliraki / Aleko’s Baths",
    duration: "20–30 דקות",
    position: { lat: 39.62679, lng: 19.92531 },
    short: "סיום ליד הים, מתחת לעיר העתיקה, עם מבט חזרה אל המצודה.",
    body: `
      <p>Faliraki הוא מקום רחצה קטן ומקומי מתחת לעיר העתיקה, הידוע גם כ־Aleko’s Baths. הגישה ההיסטורית אל הים הייתה דרך שער St. Nicholas.</p>
      <p>זה מקום מתאים לסיום רגוע של הסיור: ישיבה ליד המים, שתייה או רחצה קצרה, תוך הסתכלות חזרה אל הנוף ההיסטורי שעברתם בו.</p>`
  }
];

let map;
let markers = [];
let routeLine;
let activeStopId = null;

const listEl = document.querySelector("#tour-stops");
const detailEl = document.querySelector("#stop-detail");
const setupEl = document.querySelector("#map-setup");
const apiForm = document.querySelector("#api-key-form");
const apiInput = document.querySelector("#api-key");
const showAllBtn = document.querySelector("#show-all");
const routeLink = document.querySelector("#open-google-route");

function renderStops() {
  listEl.innerHTML = stops.map((stop, index) => `
    <li class="stop-item">
      <button class="stop-button" type="button" data-stop-id="${stop.id}" aria-current="false">
        <span class="stop-number" aria-hidden="true">${index + 1}</span>
        <span>
          <span class="stop-title">${stop.title}</span>
          <span class="stop-meta">${stop.duration} · ${stop.short}</span>
        </span>
      </button>
    </li>
  `).join("");

  listEl.addEventListener("click", (event) => {
    const button = event.target.closest(".stop-button");
    if (!button) return;
    selectStop(button.dataset.stopId, true);
  });
}

function renderDetail(stop) {
  detailEl.innerHTML = `
    <h2>${stop.title}</h2>
    <p class="detail-meta">${stop.duration}</p>
    ${stop.body}
  `;
}

function selectStop(id, moveMap = false) {
  const stop = stops.find(s => s.id === id);
  if (!stop) return;
  activeStopId = id;
  renderDetail(stop);

  document.querySelectorAll(".stop-button").forEach(btn => {
    btn.setAttribute("aria-current", String(btn.dataset.stopId === id));
  });

  if (map && moveMap) {
    map.panTo(stop.position);
    map.setZoom(18);
  }
}

function buildGoogleMapsRouteUrl() {
  const origin = encodeURIComponent(`${stops[0].position.lat},${stops[0].position.lng}`);
  const destination = encodeURIComponent(`${stops[stops.length - 1].position.lat},${stops[stops.length - 1].position.lng}`);
  const waypoints = stops.slice(1, -1)
    .map(s => `${s.position.lat},${s.position.lng}`)
    .join("|");

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${encodeURIComponent(waypoints)}&travelmode=walking`;
}

function showRouteBounds() {
  if (!map || !window.google) return;
  const bounds = new google.maps.LatLngBounds();
  stops.forEach(stop => bounds.extend(stop.position));
  map.fitBounds(bounds, 60);
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.querySelector("#map"), {
    center: { lat: 39.6248, lng: 19.9258 },
    zoom: 16,
    mapId: "DEMO_MAP_ID",
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true
  });

  routeLine = new google.maps.Polyline({
    path: stops.map(s => s.position),
    geodesic: true,
    strokeColor: "#0b66b2",
    strokeOpacity: 0.92,
    strokeWeight: 5,
    map
  });

  markers = stops.map((stop, index) => {
    const markerNode = document.createElement("button");
    markerNode.type = "button";
    markerNode.className = "marker-button";
    markerNode.textContent = String(index + 1);
    markerNode.setAttribute("aria-label", `${index + 1}. ${stop.title}`);
    markerNode.addEventListener("click", () => {
      selectStop(stop.id, false);
      document.querySelector(`[data-stop-id="${stop.id}"]`)?.scrollIntoView({ block: "nearest" });
    });

    return new AdvancedMarkerElement({
      map,
      position: stop.position,
      title: `${index + 1}. ${stop.title}`,
      content: markerNode
    });
  });

  showRouteBounds();
  setupEl.hidden = true;
}

function loadGoogleMaps(key) {
  if (!key) return;
  if (window.google?.maps) {
    initMap();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&libraries=marker`;
  script.async = true;
  script.defer = true;
  script.addEventListener("load", () => initMap().catch(showMapError));
  script.addEventListener("error", showMapError);
  document.head.appendChild(script);
}

function showMapError() {
  setupEl.hidden = false;
  const note = setupEl.querySelector(".setup-note");
  note.textContent = "לא ניתן היה לטעון את Google Maps. בדקו שהמפתח תקין וש־Maps JavaScript API מופעל בפרויקט.";
}

apiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const key = apiInput.value.trim();
  if (!key) return;
  localStorage.setItem("corfuGoogleMapsKey", key);
  loadGoogleMaps(key);
});

showAllBtn.addEventListener("click", showRouteBounds);

routeLink.href = buildGoogleMapsRouteUrl();
renderStops();
selectStop(stops[0].id, false);

function getEmbeddedKey() {
  const key = window.CORFU_CONFIG?.googleMapsApiKey;
  if (!key || key.startsWith("__")) return "";
  return key.trim();
}

const embeddedKey = getEmbeddedKey();
if (embeddedKey) {
  loadGoogleMaps(embeddedKey);
} else {
  const savedKey = localStorage.getItem("corfuGoogleMapsKey");
  if (savedKey) {
    apiInput.value = savedKey;
    loadGoogleMaps(savedKey);
  }
}
