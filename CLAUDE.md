# CLAUDE.md — Bark and Bubbles by Ellie

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Project Context
- This is a website for "Bark and Bubbles by Ellie", a 1-to-1 dog grooming service in Felinfoel, Llanelli, Wales.
- Friendly, warm, approachable feel — this is a small local business run by one person who loves dogs.
- NOT corporate, NOT techy. Think clean, warm, and inviting.
- Check `brand_assets/brand-guidelines.md` for all brand colours, typography, and tone.
- Check `brand_assets/` for logo and photos — use real assets where available, placehold.co for anything missing.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- If serve.mjs doesn't exist yet, create it. If the server is already running, do not start a second instance.

## Screenshot Workflow
- Set up Puppeteer if not already configured.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots save to `./temporary screenshots/screenshot-N.png`
- Do at least 2 comparison rounds. Check spacing, fonts, colours, alignment.

## Output Defaults
- Single `index.html` file, all styles inline
- Tailwind CSS via CDN
- Mobile-first responsive
- Google Fonts via CDN

## Anti-Generic Guardrails
- Use the brand palette from brand-guidelines.md — never default Tailwind colours
- Pair a friendly display/rounded heading font with a clean sans body font
- Layered shadows with warm tint, not flat shadow-md
- Only animate transform and opacity, never transition-all
- Every button/link needs hover, focus-visible, and active states
- Soft warm background, not pure white

## Hard Rules
- Do not use default Tailwind blue/indigo
- Do not make it look like a tech startup — this is a friendly dog grooming business
- Do not stop after one screenshot pass
- Always test on localhost before pushing
- Don't push to GitHub until I explicitly say so