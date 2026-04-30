# Lake Julia GIS Map

An interactive web map for the Lake Julia Association, built with [Leaflet](https://leafletjs.com). It displays community property data, environmental layers, and supporting GIS context for the lake and surrounding watershed.

**Live:** [lakejuliawi.org/gis/maps.html](https://lakejuliawi.org/gis/maps.html)

---

## Features

### Basemaps
Four switchable basemaps via radio buttons in the layer panel:

| Option | Source |
|---|---|
| Street | OpenStreetMap (openstreetmap.fr) |
| Satellite | ESRI World Imagery |
| Topo | ESRI World Topo Map *(default)* |
| USGS | USGS National Map |

### Layers

| Layer | Geometry | Source | Symbology |
|---|---|---|---|
| Lake Julia | Polygon | Wisconsin DNR | Transparent (basemap covers it) |
| Subwatershed (HUC12) | Polygon | Wisconsin DNR | Purple feathered outline |
| Parcels | Polygon | Oneida County GIS (2024) | Amber border, transparent fill |
| NHD Flowlines | Line | WDNR / NHD | Blue lines with directional arrowheads |
| Properties | Point | LJA (QGIS) | Color-coded squares by access road |

**Access road color key:**

| Color | Road |
|---|---|
| Green | Lake Julia Rd |
| Blue | Hill Top Rd |
| Purple | Harmony / Woodbury |
| Orange | Bradford Ln |
| Red | Puelicher / Scott Lake |

### Popups
Every layer has a styled popup on click. Properties additionally show a collapsible resident/visitor list sorted by relationship to the property.

### Resident & Property Search
A search box (top-right, adjacent to the layer panel) filters against all resident names, property names, and aliases in real time. Clicking a result flies the map to that property and opens its popup.

### Draw & Measure Tools
Powered by [Leaflet-Geoman](https://geoman.io). The toolbar appears in the top-left corner (below zoom controls):

- **Draw** — marker, polyline, polygon, rectangle
- **Edit / Drag** — reshape or reposition drawn features
- **Delete** — remove individual features
- **Measurements** — completed polylines show length (ft / mi); polygons show area (sq ft / acres). Measurements update live when a feature is edited.

Drawn features are session-only and do not persist on refresh.

---

## Data Requirements

All GeoJSON files must be in **WGS84 (EPSG:4326)**. Layers exported from ArcGIS Pro or QGIS in a projected CRS (e.g. Wisconsin Transverse Mercator EPSG:3071) will load without errors but will not appear on the map.

**To re-export in the correct CRS:**
- *QGIS:* Right-click layer → Export → Save Features As → CRS: `EPSG:4326`
- *ArcGIS Pro:* Export Features → Environments tab → Output Coordinate System: `GCS WGS 1984`

---

## Adding a New GeoJSON Layer

1. Export the layer in **EPSG:4326** and place it in `gis/data/`
2. In `maps.html`, add a `L.layerGroup().addTo(map)` before `cabinsLayer` (to control z-order)
3. Fetch the file and render with `L.geoJSON()`, including an `onEachFeature` popup handler
4. Add a toggle checkbox to the layer panel HTML
5. Register the toggle in the `[id, layer]` array near the bottom of the script

See the existing flowlines, parcels, and subwatershed blocks as reference patterns.

---

## File Structure

```
gis/
├── maps.html               # The map application
├── README.md               # This file
├── WORKFLOW.md             # Resident data maintenance workflow
├── build-residents.js      # Script: syncs residents.csv → maps.html
├── LakeJulia_Q.qgz         # QGIS project file
└── data/
    ├── cabins.geojson          # LJA property points (maintained in QGIS)
    ├── residents.csv           # Resident source of truth (not committed)
    ├── lkjulia.geojson         # Lake Julia polygon (Wisconsin DNR)
    ├── Subwatershed_HUC12.geojson  # HUC12 watershed boundary (Wisconsin DNR)
    ├── parcels.geojson         # Oneida County parcel layer (2024)
    └── NHD_Flowlines.geojson   # National Hydrography Dataset flowlines
```

---

## Dependencies (CDN, no install required)

| Library | Version | Purpose |
|---|---|---|
| [Leaflet](https://leafletjs.com) | 1.9.4 | Core mapping |
| [Leaflet-Geoman](https://geoman.io) | latest | Draw & edit tools |
| [leaflet-polylinedecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) | 1.6.0 | Flowline arrowheads |

---

## Local Development

Open `maps.html` with **VS Code Live Server** — do not open via `file://` as the GeoJSON fetches will be blocked by CORS.

```
http://127.0.0.1:5500/gis/maps.html
```

See `WORKFLOW.md` for the resident data update process.
