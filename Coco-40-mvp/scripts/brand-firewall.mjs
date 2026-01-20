import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src", "scripts"];

const FORBIDDEN = [
  /MEGHA/i,
  /\bMegha\b/i,
  /\bMEGHA Bio-Wellness\b/i,
  /\bMEGHA Wellness\b/i
];

// Strict: no allowlist by default
const ALLOWLIST_FILES = new Set();

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function shouldScan(file) {
  if (ALLOWLIST_FILES.has(file)) return false;
  return (
    file.endsWith(".ts") ||
    file.endsWith(".tsx") ||
    file.endsWith(".js") ||
    file.endsWith(".mjs") ||
    file.endsWith(".json") ||
    file.endsWith(".md")
  );
}

let violations = [];

for (const dir of SCAN_DIRS) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) continue;

  for (const file of walk(fullDir)) {
    if (!shouldScan(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const rx of FORBIDDEN) {
      if (rx.test(text)) violations.push({ file, pattern: rx.toString() });
    }
  }
}

if (violations.length) {
  console.error("\n❌ Brand Firewall: forbidden branding detected:");
  for (const v of violations) console.error(`- ${v.file} matched ${v.pattern}`);
  console.error("\nFix: remove forbidden terms or move internal-only docs outside /src and /scripts.\n");
  process.exit(1);
}

console.log("✅ Brand Firewall: clean (PlantBasedMan only). ");
