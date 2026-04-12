# Datenauswertung Wasserqualitätsparameter

**Progressive Web App (PWA)** für das Online-Monitoring und die Auswertung von Wasserqualitätsparametern – entwickelt von **GWF / unimon GmbH**.

---

## 🌐 Live Demo

Nach dem Deployment über GitHub Pages erreichbar unter:
```
https://<dein-username>.github.io/<repo-name>/
```

---

## 📊 Funktionen

| Feature | Beschreibung |
|---------|-------------|
| **10 Messparameter** | SSK436, SAK436, DOC, Leitfähigkeit, pH, Temperatur, Redox, TOC, Trübung, Grundwasserpegel |
| **Interaktiver Chart** | Zoom (Scrollrad), Pan (Drag), L/R-Achsenzuweisung pro Parameter |
| **Zeitfilter** | Alle / Jan / Feb (dynamisch nach Dateiinhalt) |
| **Statistiktabelle** | Min, Mittel, Median, Max, Std.Abw. aller Parameter |
| **Raw Data** | Paginierte Rohdaten-Tabelle |
| **Excel-Upload** | Neue Messdaten direkt im Browser laden (.xlsx) |
| **Bericht erstellen** | Automatische Generierung eines Word-Dokuments (.docx) im GWF/Unimon-Template |
| **PWA / Offline** | Installierbar auf Desktop & Mobile, funktioniert offline |

---

## 🚀 Deployment über GitHub Pages

### 1. Repository erstellen

```bash
git init
git remote add origin https://github.com/<username>/<repo-name>.git
```

### 2. Alle Dateien committen

```bash
git add .
git commit -m "Initial commit: Wasserqualitäts-PWA"
git push -u origin main
```

### 3. GitHub Pages aktivieren

- Repository → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: `main`, Folder: `/ (root)`
- Speichern → nach ~1 Minute verfügbar

### 4. HTTPS ist Pflicht für PWA

GitHub Pages liefert automatisch HTTPS – der Service Worker und die Install-Funktion funktionieren sofort.

---

## 📁 Dateistruktur

```
/
├── index.html          # Haupt-App (PWA Shell)
├── manifest.json       # PWA Manifest (Name, Icons, Theme)
├── sw.js               # Service Worker (Offline-Caching)
├── favicon.ico         # Browser-Favicon
├── README.md           # Diese Dokumentation
├── data/
│   └── stocketen.json  # Messdaten WV GWPW Stocketen (Jan–Feb 2026)
└── icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

---

## 🔄 Neue Messdaten einspielen

### Option A – Im Browser (Excel-Upload)

1. App öffnen → Tab **«📂 Daten laden»**
2. Excel-Datei per Drag & Drop oder Klick hochladen
3. **Dashboard aktualisieren** klicken

Die App erwartet das Stocketen-Exportformat:
- 20 Spalten in 10 Paaren (Zeitstempel + Wert)
- Zeile 1: Header (wird ignoriert)
- Ab Zeile 2: Messdaten im 1-Minuten-Intervall

### Option B – Datei ersetzen (für neue Standarddaten)

```bash
# Neue Daten lokal generieren:
python3 export_data.py neue_messung.xlsx > data/stocketen.json

# Committen und pushen:
git add data/stocketen.json
git commit -m "Update: Messdaten März–April 2026"
git push
```

---

## 📱 Als App installieren

| Plattform | Vorgehen |
|-----------|----------|
| **Chrome Desktop** | Adressleiste → Install-Icon (⊕) klicken |
| **Android** | Browser-Menü → «Zum Startbildschirm hinzufügen» |
| **iOS Safari** | Teilen-Symbol → «Zum Home-Bildschirm» |
| **Install-Banner** | Beim ersten Besuch erscheint automatisch ein Banner |

---

## ⚙️ Technologie-Stack

| Library | Version | Zweck |
|---------|---------|-------|
| Chart.js | 4.4.1 | Zeitreihen-Visualisierung |
| chartjs-plugin-zoom | 2.0.1 | Zoom & Pan im Chart |
| Hammer.js | 2.0.8 | Touch-Gesten |
| SheetJS (xlsx) | 0.18.5 | Excel-Datei parsen |
| docx.js | 8.5.0 | Word-Bericht generieren |
| Inter + IBM Plex Mono | – | Schriftarten (Google Fonts) |

Alle Libraries werden per CDN geladen und vom Service Worker gecacht – nach dem ersten Besuch funktioniert die App vollständig offline.

---

## 🔒 Datenschutz

- Keine Daten werden an externe Server gesendet
- Alle Berechnungen und die Berichterstellung laufen lokal im Browser
- Hochgeladene Excel-Dateien verlassen das Gerät nicht

---

## 📞 Kontakt

**unimon GmbH**  
Vorbühlstrasse 21 · CH-8962 Bergdietikon  
+41 (0)43 444 95 56 · info@unimon.ch · [www.unimon.ch](https://www.unimon.ch)

---

*Entwickelt mit GWF AG · © unimon GmbH 2026*
