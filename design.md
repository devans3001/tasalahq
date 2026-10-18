# design.md — Client Website House Style

The standing design rules for every client website build. Set by Evans, October 2026, after the Kams Hair & Beauty and Rob's Best Foot Forward test builds.

## 1. Social proof leads

- Every site opens with real Google-review social proof: star rating, review count, and testimonial snippets.
- Social proof is not a footer afterthought — it anchors the design from the first screen.

## 2. Motion is the bar (GSAP-level)

- Scroll-driven effects are expected: the gsap.com-style pinned horizontal scroll, not generic fade-ins.
- Four motion families, all present in every build:
  1. Scroll-driven effects
  2. UI interactions
  3. Text animations
  4. SVG animations
- **Standing dare:** each new build must exceed the animation level of the previous one. Rob's v2 was the warm-up.

## 3. Heroes

- Heroes must be cinematic and captivating. Never plain.
- If the hero could belong to any business, it has failed.

## 4. No filler

- No decorative-only elements. A meaningless divider or ornament gets removed, or replaced with something meaningful.
- Any replacement must itself be well animated and captivating.

## 5. Uniqueness rule (non-negotiable)

- Every client site must have a completely different design, structure, and animation from every other build. No shared template feel.
- Lesson learned: Rob's v1 was an amber retheme of the Kams architecture and read as "the same site". That mistake does not repeat.

## 6. Testimonials

- Testimonial sections get a standout animated treatment — the pinned, scroll-driven quote rotator from Rob's v2 is the reference point and Evans's favourite effect so far.

## 7. Inspiration & research

- Before designing, research major companies in the client's industry.
- Pull additional inspiration from design sites like Dribbble.
- Inspiration informs; it never becomes a copy.

## 8. Assets & delivery

- Photos hotlinked from Unsplash/Pexels CDNs (the GitHub connector pushes text files only, so no binary image uploads).
- Placeholder logos are unique per client (e.g. scissors mark for Kams, footprints mark for Rob's) until the client supplies their own.
- Finished sites are pushed to a GitHub repo under Evans's account so he can host on Vercel or attach a bought domain.

## Reference builds

- **Kams Hair & Beauty** (test build #1, Oct 8 2026) — Next.js, github.com/devans3001/kams-hair-beauty. The build that set this style.
- **Rob's Best Foot Forward** (free build #2, Oct 9 2026) — github.com/devans3001/robs-best-foot-forward. v2: dark editorial chapter narrative, full-bleed "WORN / REBORN" hero, pinned horizontal "The resurrection", hover-preview service index, pinned quote rotator, ledger pricing, giant-type visit CTA.
