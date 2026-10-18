"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey, whatsappUrl } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const JourneyCanvas = dynamic(() => import("./three").then((m) => m.JourneyCanvas), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1d5c40_0%,transparent_65%)]" />,
});

/* ------------------------------------------------------------------ */
/*  The Growth Journey — pinned, scroll-driven.                        */
/*  The camera travels along the strand while the strand itself        */
/*  morphs from dull to glossy. On mobile it degrades to a clean       */
/*  stacked list — no pin, no WebGL required.                           */
/* ------------------------------------------------------------------ */

export function Journey({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isDesktop || !sectionRef.current) return;
    if (reducedMotion) {
      progressRef.current = 1;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(progressRef, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=320%",
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            const idx = Math.min(
              journey.length - 1,
              Math.floor(self.progress * journey.length),
            );
            setStage(idx);
          },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isDesktop, reducedMotion]);

  const current = journey[stage];

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-forest-2 md:h-screen md:min-h-[640px]"
    >
      {/* 3D strand canvas (desktop) */}
      {isDesktop && (
        <div className="absolute inset-0" aria-hidden="true">
          <JourneyCanvas progressRef={progressRef} reducedMotion={reducedMotion} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-2 via-forest-2/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-0 md:h-full flex flex-col justify-center">
        <p className="text-gold tracking-[0.3em] uppercase text-xs font-semibold">
          The Growth Journey
        </p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-3 max-w-xl">
          Watch dry hair come back to life.
        </h2>

        {isDesktop ? (
          <div className="mt-10 max-w-md min-h-[190px]">
            <p className="font-display text-7xl text-gold/90">{current.step}</p>
            <h3 className="font-display text-3xl mt-2">{current.title}</h3>
            <p className="mt-3 text-cream/80 leading-relaxed">{current.text}</p>
            <div className="mt-6 flex gap-2">
              {journey.map((j, i) => (
                <button
                  key={j.step}
                  onClick={() => {
                    // Jump the scrub position toward a stage (desktop only).
                    const st = ScrollTrigger.getAll().find(
                      (s) => s.trigger === sectionRef.current,
                    );
                    if (st) st.scroll(st.start + (st.end - st.start) * ((i + 0.5) / journey.length));
                  }}
                  aria-label={`Go to stage ${j.title}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === stage ? "w-12 bg-gold" : "w-6 bg-cream/25 hover:bg-cream/50"
                  }`}
                />
              ))}
            </div>
            <p className="mt-6 text-xs tracking-[0.25em] uppercase text-cream/50">
              Keep scrolling — the hair transforms
            </p>
          </div>
        ) : (
          <ol className="mt-10 space-y-8">
            {journey.map((j) => (
              <li key={j.step} className="border-l-2 border-gold/50 pl-5">
                <p className="font-display text-3xl text-gold/90">{j.step} — {j.title}</p>
                <p className="mt-2 text-cream/80 leading-relaxed">{j.text}</p>
              </li>
            ))}
          </ol>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex w-fit items-center rounded-full bg-gold px-7 py-3.5 font-semibold text-forest hover:bg-gold-2 transition-colors min-h-[48px]"
        >
          Start your journey →
        </a>
      </div>
    </section>
  );
}
