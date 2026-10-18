"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LAB_MODES, type LabMode } from "./three";
import { Reveal, SectionHeading } from "./ui";
import { whatsappUrl } from "@/lib/data";

const LabCanvas = dynamic(() => import("./three").then((m) => m.LabCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#1d5c40_0%,transparent_65%)]" />,
});

/* ------------------------------------------------------------------ */
/*  The Strand Lab — interactive 3D viewer.                            */
/*  Drag to rotate. Pick a treatment and the strand itself changes:    */
/*  colour, gloss and glow all shift to match the service.              */
/* ------------------------------------------------------------------ */

const MODES: LabMode[] = ["moisture", "colour", "strength"];

export function StrandLab({ reducedMotion }: { reducedMotion: boolean }) {
  const [mode, setMode] = useState<LabMode>("moisture");
  const cfg = LAB_MODES[mode];

  return (
    <section className="py-24 sm:py-32 bg-forest">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="The Strand Lab" title="Touch the strand. See the treatment." />
        <Reveal className="mt-4 max-w-2xl">
          <p className="text-cream/75 text-lg">
            Drag the coil to rotate it. Choose a treatment — the strand changes colour,
            gloss and glow to show you what that service actually does to your hair.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 items-center">
          <Reveal className="relative h-[420px] sm:h-[520px] rounded-3xl border border-cream/10 bg-forest-2 overflow-hidden">
            <LabCanvas mode={mode} reducedMotion={reducedMotion} />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-forest/70 px-4 py-1.5 text-xs tracking-widest uppercase text-cream/70 backdrop-blur">
              Drag to rotate
            </p>
          </Reveal>

          <div>
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Treatment preview">
              {MODES.map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-6 py-3 font-semibold transition-all min-h-[44px] ${
                    mode === m
                      ? "bg-gold text-forest shadow-[0_10px_30px_rgba(201,162,75,0.35)]"
                      : "border border-cream/25 text-cream/80 hover:border-gold hover:text-gold-2"
                  }`}
                >
                  {LAB_MODES[m].label}
                </button>
              ))}
            </div>

            <div key={mode} className="mt-8">
              <p className="font-display text-3xl sm:text-4xl leading-tight">{cfg.service}</p>
              <p className="mt-3 text-lg text-cream/80 leading-relaxed">{cfg.blurb}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center rounded-full border border-gold px-6 py-3 font-semibold text-gold-2 hover:bg-gold hover:text-forest transition-colors min-h-[44px]"
              >
                Book {cfg.service} →
              </a>
            </div>

            <p className="mt-8 text-sm text-cream/50">
              The coil is a live 3D model — it reacts to your touch, not a video.
              If your device can't run WebGL, the strand still reads as a still image.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
