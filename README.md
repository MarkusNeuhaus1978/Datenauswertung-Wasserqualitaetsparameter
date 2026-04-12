# Datenauswertung Wasserqualitätsparameter

**Progressive Web App (PWA)** für das Online-Monitoring und die fachliche Auswertung von Wasserqualitätsparametern – entwickelt von **GWF / unimon GmbH**.

## 🌐 Deployment auf GitHub Pages

```bash
# 1. ZIP entpacken → Repository initialisieren
cd pwa
git init
git add .
git commit -m "Initial commit: Wasserqualitäts-PWA v2"

# 2. Auf GitHub pushen
git remote add origin https://github.com/DEIN-USER/DEIN-REPO.git
git push -u origin main
```

Dann: Repository → **Settings → Pages → Branch: main → Save**
→ Live unter `https://DEIN-USER.github.io/DEIN-REPO/` (~1 Minute)

## 📊 Features

| Feature | Beschreibung |
|---------|-------------|
| **Interaktiver Chart** | 10 Parameter, Zoom/Pan, L/R-Achse pro Parameter |
| **🔍 Daten analysieren** | Fachliche Expertenanalyse: Biochemie, Mikrobiologie, Umwelttechnik |
| **📄 Bericht erstellen** | Word-Dokument (.docx) im GWF/Unimon-Template |
| **Excel-Upload** | Neue Messdaten direkt im Browser laden (.xlsx) |
| **Offline-fähig** | Service Worker, nach erstem Besuch vollständig offline |
| **Installierbar** | Desktop & Mobile (Install-Banner automatisch) |

## 🔍 Analyse-Features (Expertensystem)

Die Analyse-Funktion bewertet die Messdaten aus der Perspektive von:
- **Biochemie**: Hydrochemische Klassifikation, DOC-Qualität, BDOC-Schätzung
- **Mikrobiologie**: WHO-Trübungsschwellen, Redox-Aerobizität, Legionellen-/Coliformen-Risiko, Biofilm-Substrat
- **Umwelttechnik**: DVGW-Grenzwerte, saisonale Trends, Aquifer-Vulnerabilität

Ergebnisse: Gesamtrisikobewertung · Anomalie-Detektion · 4 wissenschaftliche Hypothesen · Handlungsempfehlungen (SOFORT / KURZFRISTIG / MITTELFRISTIG / LANGFRISTIG)

## 📁 Dateistruktur

```
/
├── index.html          # App (147 KB)
├── sw.js               # Service Worker
├── manifest.json       # PWA Manifest
├── favicon.ico
├── README.md
├── data/
│   └── stocketen.json  # Messdaten Jan–Feb 2026 (654 KB)
└── icons/              # 8 App-Icons (72–512px)
```

## 🔄 Neue Messdaten einspielen

**Im Browser**: Tab «📂 Daten laden» → Excel-Datei hochladen

**Per Git** (neue Standarddaten):
```bash
# data/stocketen.json ersetzen, dann:
git add data/stocketen.json
git commit -m "Update: Messdaten März–April 2026"
git push
```

## 📞 Kontakt

**unimon GmbH** · Vorbühlstrasse 21 · CH-8962 Bergdietikon
+41 (0)43 444 95 56 · info@unimon.ch · www.unimon.ch

*© unimon GmbH / GWF AG 2026*
