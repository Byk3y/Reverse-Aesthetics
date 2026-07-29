/**
 * Launch verification.
 *
 * Checks the things that silently break at a DNS cutover: legacy redirects,
 * de-indexing of the old theme's demo content, canonical tags, the schema
 * graph, and the sitemap. Run it against the preview deployment before the
 * switch and against the live domain after.
 *
 *   node scripts/verify-launch.mjs https://your-preview.vercel.app
 *   node scripts/verify-launch.mjs https://reverseaesthetic.com
 *
 * Exits non-zero if anything fails, so it works as a deploy gate.
 */
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

let pass = 0;
const failures = [];

function ok(name, detail = "") {
  pass++;
  console.log(`  \x1b[32m✓\x1b[0m ${name}${detail ? `  ${detail}` : ""}`);
}
function fail(name, detail) {
  failures.push(`${name} — ${detail}`);
  console.log(`  \x1b[31m✗\x1b[0m ${name}  \x1b[31m${detail}\x1b[0m`);
}

async function head(path, redirect = "manual") {
  return fetch(BASE + path, { redirect, headers: { "user-agent": "launch-verify" } });
}
async function text(path) {
  const r = await fetch(BASE + path, { headers: { "user-agent": "launch-verify" } });
  return { status: r.status, body: await r.text() };
}

/** Follow redirects manually so we can count hops and see the final landing. */
async function chase(path, max = 5) {
  let url = BASE + path;
  const hops = [];
  for (let i = 0; i < max; i++) {
    const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "launch-verify" } });
    if (r.status >= 300 && r.status < 400) {
      const loc = r.headers.get("location");
      url = loc.startsWith("http") ? loc : BASE + loc;
      hops.push(r.status);
      continue;
    }
    return { status: r.status, url, hops };
  }
  return { status: 0, url, hops, tooMany: true };
}

// The six URLs that were genuinely the clinic's, plus the ones already dead on
// the old site but possibly still linked from directories.
const REDIRECTS = [
  ["/about-us/", "/about"],
  ["/contact-us/", "/contact"],
  ["/book-a-visit/", "/booking"],
  ["/faqs/", "/#faq"],
  ["/clinic/", "/clinics"],
  ["/aesthetics-dermatology-clinic/", "/clinics/aesthetics"],
  ["/weight-loss-clinic/", "/clinics/weightloss"],
  ["/dental-clinic/", "/clinics/dental"],
  ["/hair-clinic/", "/clinics/hair"],
  ["/bookings/", "/booking"],
  ["/team/ral-abana/", "/about"],
];

// Theme demo content. Must be gone, and must NOT redirect anywhere — a 301
// would transfer plastic-surgery and salon topicality onto real pages.
const GONE = [
  "/team/dr-steven-assanti/",
  "/service/breast-lift/",
  "/service/rhinoplasty/",
  "/service/haircuts-styling/",
  "/portfolio/breast-augmentation/",
  "/product/lip-plumping-gloss/",
  "/product-category/whiskey/",
  "/category/cosmetology/",
  "/tag/sugaring/",
  "/shop",
  "/cart-2",
];

// Every page that inherited canonical:'/' from the root layout before launch.
const CANONICAL = [
  "/", "/about", "/contact", "/booking", "/gallery",
  "/clinics", "/clinics/aesthetics", "/clinics/dental",
  "/treatments", "/locations/lagos", "/locations/abuja",
];

const MUST_200 = [
  "/", "/about", "/clinics", "/treatments", "/blog", "/booking",
  "/locations/lagos", "/locations/abuja",
  "/treatments/botox-and-dermal-fillers-lagos",
  "/treatments/hair-transplant-nigeria",
];

console.log(`\nVerifying ${BASE}\n`);

console.log("Legacy redirects (must land on the new page)");
for (const [from, to] of REDIRECTS) {
  try {
    const r = await chase(from);
    const landed = r.url.replace(BASE, "") || "/";
    if (r.status !== 200) fail(from, `ended ${r.status} at ${landed}`);
    else if (landed !== to) fail(from, `landed on ${landed}, expected ${to}`);
    else ok(from, `→ ${to}`);
  } catch (e) { fail(from, e.message); }
}

// These all carry a trailing slash on the old site, so each one normalises
// (308) to the slashless path and *then* returns 410. Two hops is expected and
// Google follows it fine — what matters is that the chain ends in 410 and never
// lands on a real page, which would hand plastic-surgery topicality to it.
console.log("\nOld demo content (chain must end in 410, never on a live page)");
for (const path of GONE) {
  try {
    const r = await chase(path);
    const landed = r.url.replace(BASE, "") || "/";
    if (r.status === 410) ok(path, r.hops.length ? `${r.hops.join("→")}→410` : "410");
    else if (r.status === 200) fail(path, `lands on live page ${landed} — must not redirect`);
    else if (r.status === 404) fail(path, "404 — expected 410 (slower to de-index)");
    else fail(path, `ended ${r.status} at ${landed}`);
  } catch (e) { fail(path, e.message); }
}

console.log("\nCanonical tags (must be self-referential)");
for (const path of CANONICAL) {
  try {
    const { body } = await text(path);
    const m = body.match(/<link rel="canonical" href="([^"]+)"/);
    if (!m) { fail(path, "no canonical tag"); continue; }
    const got = m[1].replace(/^https?:\/\/[^/]+/, "") || "/";
    if (got !== path) fail(path, `points at ${got}`);
    else ok(path, m[1]);
  } catch (e) { fail(path, e.message); }
}

console.log("\nPaid landing pages (must be noindex so they don't cannibalise /treatments)");
for (const path of ["/lp/hair-restoration", "/lp/dermal-fillers"]) {
  try {
    const { body } = await text(path);
    /noindex/.test(body) ? ok(path, "noindex") : fail(path, "indexable");
  } catch (e) { fail(path, e.message); }
}

console.log("\nStructured data");
try {
  const { body } = await text("/");
  const blocks = [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!blocks.length) fail("json-ld", "no blocks found");
  else {
    const graph = JSON.parse(blocks[0][1])["@graph"] ?? [];
    const types = graph.map((n) => (Array.isArray(n["@type"]) ? n["@type"].join("+") : n["@type"]));
    const clinics = graph.filter((n) => n["@type"] === "MedicalClinic");
    types.length ? ok("graph parses", types.join(", ")) : fail("graph", "empty");
    clinics.length === 2
      ? ok("both clinics present", clinics.map((c) => c["@id"].split("/").at(-1)).join(", "))
      : fail("clinics", `${clinics.length} MedicalClinic entities, expected 2`);
    /aggregateRating/.test(body)
      ? fail("aggregateRating", "fabricated rating is back — must not ship")
      : ok("no fabricated aggregateRating");
    /instagram\.com\/reverse_aesthetics/.test(body)
      ? ok("instagram handle", "@reverse_aesthetics")
      : fail("instagram handle", "wrong or missing (underscore matters)");
  }
} catch (e) { fail("json-ld", e.message); }

console.log("\nCrawl files");
try {
  const { status, body } = await text("/sitemap.xml");
  const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (status !== 200) fail("/sitemap.xml", `status ${status}`);
  else if (urls.length < 20) fail("/sitemap.xml", `only ${urls.length} URLs`);
  else ok("/sitemap.xml", `${urls.length} URLs`);
  urls.some((u) => u.includes("/lp/"))
    ? fail("sitemap", "contains noindexed /lp/ pages")
    : ok("sitemap excludes /lp/");
} catch (e) { fail("/sitemap.xml", e.message); }

try {
  const { status, body } = await text("/robots.txt");
  status === 200 && /Sitemap:/i.test(body)
    ? ok("/robots.txt", "declares sitemap")
    : fail("/robots.txt", `status ${status}, sitemap declared: ${/Sitemap:/i.test(body)}`);
} catch (e) { fail("/robots.txt", e.message); }

console.log("\nCore pages reachable");
for (const path of MUST_200) {
  try {
    const r = await head(path, "follow");
    r.status === 200 ? ok(path) : fail(path, `status ${r.status}`);
  } catch (e) { fail(path, e.message); }
}

console.log(`\n${"─".repeat(60)}`);
if (failures.length) {
  console.log(`\x1b[31m${failures.length} failed\x1b[0m, ${pass} passed\n`);
  failures.forEach((f) => console.log(`  • ${f}`));
  console.log();
  process.exit(1);
}
console.log(`\x1b[32mall ${pass} checks passed\x1b[0m\n`);
