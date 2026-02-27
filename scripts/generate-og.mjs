import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function generateDefaultOG() {
	const src = join(root, "public/images/hero/boone-lake-1920.jpg");
	const out = join(root, "public/images/og/og-default.jpg");

	// Text overlay SVG — "Sullivan County" in serif + "Tennessee — Est. 1779" subtitle
	const textOverlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark gradient overlay -->
  <defs>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c1e33" stop-opacity="0.3"/>
      <stop offset="40%" stop-color="#0c1e33" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0c1e33" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="hoverlay" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1e33" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#0c1e33" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#overlay)"/>
  <rect width="1200" height="630" fill="url(#hoverlay)"/>

  <!-- Brass accent line -->
  <rect x="80" y="340" width="80" height="3" rx="1.5" fill="#c9a84c"/>

  <!-- "Sullivan" large serif -->
  <text x="80" y="430" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="white" letter-spacing="2">Sullivan</text>

  <!-- "County" in brass -->
  <text x="80" y="510" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" fill="#c9a84c" letter-spacing="4">County</text>

  <!-- Subtitle -->
  <text x="84" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="400" fill="rgba(255,255,255,0.7)" letter-spacing="6">TENNESSEE  ·  ESTABLISHED 1779</text>

  <!-- Small SC logo badge top-left -->
  <rect x="80" y="50" width="52" height="52" rx="4" fill="white"/>
  <text x="106" y="84" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="700" fill="#0c1e33" text-anchor="middle">SC</text>
</svg>`);

	await sharp(src)
		.resize(1200, 630, { fit: "cover", position: "center" })
		.composite([{ input: textOverlay, top: 0, left: 0 }])
		.jpeg({ quality: 90 })
		.toFile(out);

	console.log("Created og-default.jpg");
}

async function generateCourthouseOG() {
	const src = join(root, "public/images/about/courthouse-960.jpg");
	const out = join(root, "public/images/og/og-courthouse.jpg");

	const textOverlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c1e33" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#0c1e33" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0c1e33" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="hoverlay" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1e33" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#0c1e33" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#overlay)"/>
  <rect width="1200" height="630" fill="url(#hoverlay)"/>

  <rect x="80" y="340" width="80" height="3" rx="1.5" fill="#c9a84c"/>

  <text x="80" y="430" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="white" letter-spacing="2">Sullivan</text>
  <text x="80" y="510" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" fill="#c9a84c" letter-spacing="4">County</text>
  <text x="84" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="400" fill="rgba(255,255,255,0.7)" letter-spacing="6">TENNESSEE  ·  ESTABLISHED 1779</text>

  <rect x="80" y="50" width="52" height="52" rx="4" fill="white"/>
  <text x="106" y="84" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="700" fill="#0c1e33" text-anchor="middle">SC</text>
</svg>`);

	await sharp(src)
		.resize(1200, 630, { fit: "cover", position: "center" })
		.composite([{ input: textOverlay, top: 0, left: 0 }])
		.jpeg({ quality: 90 })
		.toFile(out);

	console.log("Created og-courthouse.jpg");
}

await generateDefaultOG();
await generateCourthouseOG();
console.log("Done! OG images generated in public/images/og/");
