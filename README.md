# TasalaHQ — Booking-First Redesign (Concept)

A complete, immersive 3D website concept for **TasalaHQ** — *Healthy Hair Experts* — the natural-hair salon in Ikoyi & Lekki Phase 1, Lagos.

> **This is a redesign concept built to show TasalaHQ what their site could be.** It is not affiliated with or endorsed by the salon. Real business facts (addresses, phones, hours, rating, reviews) were verified from tasalahq.com, Google/Fresha listings and the salon's Instagram bio in October 2026. Prices are placeholders — see below.

## What makes this build different

- **Design concept: "The Growth Journey."** Deep botanical green + cream + gold, Fraunces display serif + Outfit body. Nothing about the structure, motion or layout is shared with the Kams or Rob's builds.
- **3D, not decoration.** A procedural golden hair-strand coil (React Three Fiber) in the hero, a scroll-driven camera journey where the strand morphs from dull to glossy, and an interactive **Strand Lab** where picking Moisture / Colour / Strength changes the strand's colour, gloss and glow live.
- **Social proof leads.** 4.6 stars · 1,089 reviews · 174K Instagram followers are in the hero and the proof strip, with real quoted reviews (sourced on each card) in a pinned scroll-driven Love Wall.
- **Booking-first.** Every CTA goes to WhatsApp (`wa.me/2347063509207`) — the channel the salon actually books through today — plus tap-to-call for both locations.

## Before this goes live for the client

1. **Prices (services)** — every service shows "Confirmed at booking". Replace with the real prices from the salon's Fresha price list in `lib/data.ts`.
2. **Products are REAL** — the Truth by Tasala line (8 products, £ prices) was verified Oct 18, 2026 from the brand's own SumUp store (https://truth-by-tasala.sumupstore.com/). Check the live store for current stock before launch — several lines sell out.
3. **Testimonials** — the five quotes are real (Fresha/Google, sources noted). Ask the salon for 2–3 more favourites to rotate in.
3. **Photos** — gallery + service images are stock style references from Unsplash. Swap in the salon's own portfolio photos (same hotlink pattern).
4. **Booking** — point the CTAs at the salon's real booking tool (Fresha, or keep WhatsApp) once they choose.
5. **Credits** — the footer currently notes "Concept redesign by Claro & Co". Remove or keep per the client's wishes.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Vercel-ready as-is)
```

## Deploy

Push to GitHub → import the repo in [Vercel](https://vercel.com/new) → deploy. No environment variables needed.

## Edit content

Everything editable lives in one file: **`lib/data.ts`** — services, menu, prices, testimonials, hours, locations, products, gallery. No code changes needed for copy updates.

## House style

`design.md` in this repo is the standing Claro & Co house style every client build follows.
