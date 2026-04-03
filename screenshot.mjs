import puppeteer from "puppeteer";
import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const url = process.argv[2] || "http://localhost:3000";
const dir = "./temporary screenshots";

await mkdir(dir, { recursive: true });

// Determine next screenshot number
const files = await readdir(dir).catch(() => []);
const nums = files
  .filter((f) => f.startsWith("screenshot-") && f.endsWith(".png"))
  .map((f) => parseInt(f.match(/screenshot-(\d+)/)?.[1] || "0", 10));
const next = nums.length ? Math.max(...nums) + 1 : 1;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Force all scroll-animated elements to be visible for screenshots
async function revealAllAnimations() {
  await page.evaluate(async () => {
    // Force-reveal all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    // Ensure hero animations have completed
    document.querySelectorAll('.hero-animate').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    // Wait for transitions to settle
    await new Promise(r => setTimeout(r, 600));
  });
}

// Desktop viewport
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
await revealAllAnimations();
const desktopPath = join(dir, `screenshot-${next}.png`);
await page.screenshot({ path: desktopPath, fullPage: true });
console.log(`Desktop screenshot saved: ${desktopPath}`);

// Mobile viewport
await page.setViewport({ width: 375, height: 812 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
await revealAllAnimations();
const mobilePath = join(dir, `screenshot-${next + 1}.png`);
await page.screenshot({ path: mobilePath, fullPage: true });
console.log(`Mobile screenshot saved: ${mobilePath}`);

await browser.close();
