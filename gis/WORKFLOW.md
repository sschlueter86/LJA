# GIS Map — Maintenance Workflow

## Updating Residents / Visitors

1. Edit `data/residents.csv` — add, remove, or reorder people, change sort orders, or add alt cabin relationships
2. Run the build script from the project root:
   ```
   node gis/build-residents.js
   ```
3. The script rewrites `RESIDENTS` and `ALT_CABINS` in `gis.html` automatically
4. Preview in Live Server, then commit and push

### What the script handles automatically
- Adding or removing residents from any cabin
- Sort order changes (`sortOrder` column controls display order in popups — lower = higher priority)
- Alt cabin fallbacks — if a cabin has no rows of its own in the CSV, the script detects it and maps it to the source cabin via `ALT_CABINS`. To set this up, populate the `Alt. Cabin #` column on the source cabin's rows.

### Sort order convention
| Value | Meaning |
|---|---|
| 1 | Property owner / primary contact |
| 2 | Immediate family |
| 3 | Extended family / in-laws |
| 4+ | Friends / guests |

---

## Adding a New Property to the Map

New property points must be added in **QGIS**, then re-exported:

1. Add the point to the QGIS layer with all required fields (Name, Alias, Address, PrimaryPointOfContact, Lake_Phone, PropertyMapNumber, LakeAccess)
2. Export: Layer → Export → Save Features As → GeoJSON, CRS: EPSG:4326
3. Save to `data/cabins.geojson`
4. Add the new cabin's residents to `data/residents.csv`
5. Run `node gis/build-residents.js`

---

## Files

| File | Purpose |
|---|---|
| `gis.html` | The map application — do not edit `RESIDENTS` or `ALT_CABINS` by hand |
| `data/cabins.geojson` | Property point locations and attributes |
| `data/residents.csv` | Source of truth for all resident data (not committed to git) |
| `build-residents.js` | Script that syncs the CSV into gis.html |

---

## Local Development

- Open `gis.html` with **VS Code Live Server** (right-click → Open with Live Server)
- Do **not** open via `file://` — the GeoJSON fetch will be blocked by CORS
- Live Server URL: `http://127.0.0.1:5500/gis/gis.html`
- The map is also embedded on `resources/maps.html` — test both views before publishing

## Deployment

Push to `main` branch → GitHub Pages updates automatically.
The map appears in two places on the live site:
- Embedded iframe on [resources/maps.html](https://lakejuliawi.org/resources/maps.html)
- Full screen at [gis/gis.html](https://lakejuliawi.org/gis/gis.html)
