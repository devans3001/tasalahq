"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal, SectionHeading } from "./ui";
import { whatsappUrl } from "@/lib/data";

const CompareCanvas = dynamic(() => import("./three").then((m) => m.CompareCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#1d5c40_0%,transparent_65%)]" />,
});

/* ------------------------------------------------------------------ */
/*  Drag the Transformation — before / after, in real 3D.              */
/*  The slider drives the hair itself: dry, frizzy and dull on the     */
/*  left; healthy, glossy and growing on the right. This is the        */
/*  salon's promise, made touchable.                                   */
/* ------------------------------------------------------------------ */

export function Compare({ reducedMotion }: { reducedMotion: boolean }) {
  const healthRef = useRef(0.2);
  const [val, setVal] = useState(20);

  return (
    <section className="py-24 sm:py-32 bg-forest-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Before / After" title="Drag the transformation." />
        <Reveal className="mt-4 max-w-2xl">
          <p className="text-cream/75 text-lg">
            This is what a Tasala appointment does. Drag the slider and watch the same head of
            hair go from dry and breaking to healthy and growing — in real 3D, not a photo filter.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] items-center">
          <Reveal className="relative h-[440px] sm:h-[560px] rounded-3xl border border-cream/10 bg-forest overflow-hidden">
            <CompareCanvas healthRef={healthRef} reducedMotion={reducedMotion} />
            <div className="absolute left-4 top-4 rounded-full bg-forest/70 px-4 py-1.5 text-xs tracking-widest uppercase text-cream/80 backdrop-blur">
              Before — dry &amp; breaking
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-gold px-4 py-1.5 text-xs tracking-widest uppercase text-forest font-semibold">
              After — healthy &amp; growing
            </div>
          </Reveal>

          <div>
            <label htmlFor="hair-health" className="font-display text-3xl leading-tight">
              How healthy is her hair?
            </label>
            <input
              id="hair-health"
              type="range"
              min={0}
              max={100}
              value={val}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVal(v);
                healthRef.current = v / 100;
              }}
              className="mt-6 w-full accent-[#c9a24b]"
              aria-valuetext={`${val}% healthy`}
            />
            <div className="mt-2 flex justify-between text-xs tracking-widest uppercase text-cream/50">
              <span>Dry</span>
              <span className="text-gold-2 font-semibold">{val}% healthy</span>
              <span>Thriving</span>
            </div>
            <p className="mt-6 text-cream/75 leading-relaxed">
              Every Tasala visit moves the needle: consultation, treatment, styling, then a
              home routine that keeps it growing between visits.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center rounded-full bg-gold px-6 py-3 font-semibold text-forest hover:bg-gold-2 transition-colors min-h-[44px]"
            >
              Start your transformation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
