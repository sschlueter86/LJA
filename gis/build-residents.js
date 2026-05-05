#!/usr/bin/env node
// gis/build-residents.js
// Usage: node gis/build-residents.js
//
// Reads gis/data/residents.csv and rewrites the RESIDENTS and ALT_CABINS
// constants in gis/gis.html. Run this after any change to the CSV.

const fs   = require('fs');
const path = require('path');

const CSV_PATH  = path.join(__dirname, 'data', 'residents.csv');
const HTML_PATH = path.join(__dirname, 'gis.html');

// ── CSV parser — handles quoted fields and embedded double-quotes ──────────
function parseRow(line) {
  const fields = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i++;
      let field = '';
      while (i < line.length) {
        if (line[i] === '"' && line[i + 1] === '"') { field += '"'; i += 2; }
        else if (line[i] === '"')                   { i++; break; }
        else                                         { field += line[i++]; }
      }
      fields.push(field);
      if (line[i] === ',') i++;
    } else {
      const end = line.indexOf(',', i);
      if (end === -1) { fields.push(line.slice(i)); break; }
      fields.push(line.slice(i, end));
      i = end + 1;
    }
  }
  return fields;
}

function parseCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const headers = parseRow(lines[0]);
  return lines.slice(1)
    .filter(l => l.trim())
    .map(line => {
      const values = parseRow(line);
      return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] ?? '').trim()]));
    });
}

// ── Parse CSV ────────────────────────────────────────────────────────────
const rows = parseCSV(fs.readFileSync(CSV_PATH, 'utf8'));

// ── Build RESIDENTS ──────────────────────────────────────────────────────
const residentMap = {};      // cabinNum → [[name, sortOrder], ...]
const altSources  = {};      // altCabinNum → sourceCabinNum (first seen)

for (const row of rows) {
  const cabinNum  = row['Cabin #'];
  const fullName  = row['Full Name:'];
  const sortOrder = parseInt(row['sortOrder'] || '99', 10);
  const altCabin  = row['Alt. Cabin #'];

  if (!cabinNum || !fullName) continue;

  if (!residentMap[cabinNum]) residentMap[cabinNum] = [];
  residentMap[cabinNum].push([fullName, isNaN(sortOrder) ? 99 : sortOrder]);

  if (altCabin) {
    if (!altSources[altCabin]) altSources[altCabin] = cabinNum;
  }
}

// ── Build ALT_CABINS: alt cabin numbers that have no primary residents ────
const altCabins = {};
for (const [altNum, srcNum] of Object.entries(altSources)) {
  if (!residentMap[altNum]) {
    altCabins[altNum] = parseInt(srcNum, 10);
  }
}

// ── Format JS blocks ─────────────────────────────────────────────────────
function escapeJsString(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

const residentLines = Object.entries(residentMap)
  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  .map(([num, names]) => {
    const entries = names.map(([n, s]) => `["${escapeJsString(n)}",${s}]`).join(',');
    return `  "${num}": [${entries}]`;
  });

const altLines = Object.entries(altCabins)
  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  .map(([alt, src]) => `  "${alt}": ${src}`);

const residentsBlock = `const RESIDENTS = {\n${residentLines.join(',\n')},\n};`;

const altCabinsBlock = altLines.length
  ? `const ALT_CABINS = {\n${altLines.join(',\n')},\n};`
  : `const ALT_CABINS = {};`;

// ── Patch gis.html ───────────────────────────────────────────────────────
let html = fs.readFileSync(HTML_PATH, 'utf8');

const beforeResidents = html.length;
html = html.replace(/const RESIDENTS = \{[\s\S]*?\};/, residentsBlock);
if (html.length === beforeResidents) {
  console.error('ERROR: Could not find RESIDENTS block in gis.html');
  process.exit(1);
}

const beforeAlt = html.length;
html = html.replace(/const ALT_CABINS = \{[\s\S]*?\};/, altCabinsBlock);
if (html.length === beforeAlt) {
  console.error('ERROR: Could not find ALT_CABINS block in gis.html');
  process.exit(1);
}

fs.writeFileSync(HTML_PATH, html, 'utf8');

console.log(`✓ RESIDENTS updated — ${Object.keys(residentMap).length} cabins`);
console.log(`✓ ALT_CABINS updated — ${Object.keys(altCabins).length} entries: ${Object.entries(altCabins).map(([a,s]) => `${a}→${s}`).join(', ')}`);
