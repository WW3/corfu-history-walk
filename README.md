# Corfu History Walk

אפליקציית ווב סטטית לסיור היסטורי עצמאי בעיר העתיקה של קורפו.

## הפעלה

1. פתחו את `index.html` בדפדפן.
2. רשימת התחנות וההסברים פועלים מיד.
3. להצגת Google Maps, הזינו במסך המפה API key של Google Maps JavaScript API.
4. המפתח נשמר ב־`localStorage` של הדפדפן בלבד.

לחלופין אפשר להריץ שרת מקומי:

```bash
python -m http.server 8080
```

ולפתוח `http://localhost:8080`.

## Google Maps

### מפתח API באתר הפרוס (GitHub Pages)

האתר נפרס דרך GitHub Actions (`.github/workflows/deploy-pages.yml`). בזמן הפריסה, ה־workflow מחליף את ה־placeholder
שב־`config.js` בערך של ה־secret `GOOGLE_MAPS_API_KEY` של המאגר, כך שהמפתח אינו נשמר בקוד המקור או בהיסטוריית git.

הגדרה חד־פעמית:

1. ב־Google Cloud Console: צרו פרויקט, הפעילו **Maps JavaScript API**, וצרו API key.
2. הגבילו את המפתח:
   - **Application restrictions → Websites**: `https://ww3.github.io/*`
   - **API restrictions**: Maps JavaScript API בלבד.
3. ב־GitHub: Settings → Secrets and variables → Actions → **New repository secret**, בשם `GOOGLE_MAPS_API_KEY`.
4. הריצו מחדש את ה־workflow (או דחפו commit) כדי לפרוס עם המפתח.

מפתח של Maps JavaScript API נחשף בהכרח בדפדפן; ההגנה האפקטיבית היא הגבלת ה־referrer וה־API שלמעלה.
אם ה־secret אינו מוגדר, האפליקציה חוזרת לטופס הידני של הזנת מפתח (נשמר ב־`localStorage`).


יש להפעיל בפרויקט Google Cloud את **Maps JavaScript API**. האפליקציה משתמשת ב־Advanced Markers וב־`DEMO_MAP_ID`, כך שאין צורך ב־Map ID פרטי לצורך בדיקה.

המסלול עצמו מוצג כ־polyline המחבר את תחנות הסיור, ואינו משתמש ב־DirectionsService הישן.

## נגישות

- כיוון RTL ועברית.
- רשימת תחנות מלאה שאינה תלויה במפה.
- ניווט מקלדת מלא.
- סימון התחנה הנבחרת באמצעות `aria-current`.
- אזור פירוט עם `aria-live`.
- קישור "דלג לרשימת התחנות".
- תמיכה ב־`prefers-reduced-motion`.
- המפה מוגדרת כאזור משלים ולא כממשק היחיד לקבלת המידע.

## הערה על המסלול

ה־polyline הוא המחשה של סדר התחנות ולא ניווט מדויק בתוך סמטאות/ביצורים.
הכפתור "פתח את המסלול ב־Google Maps" פותח מסלול הליכה חיצוני, ושם Google עשויה לשנות מעט את הנתיב בהתאם למעברים הזמינים.
