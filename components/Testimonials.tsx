"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials, whatsappUrl } from "@/lib/data";
import { Magnetic } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Love Wall — pinned, scroll-driven quote rotator.                   */
/*  Each quote takes over the screen with kinetic word reveals,        */
/*  a 3D tilt on the card, and a scrub-linked progress rail.           */
/*  On mobile / reduced motion it degrades to a clean stacked list.    */
/* ------------------------------------------------------------------ */

export function Testimonials({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isDesktop || !sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${(testimonials.length - 1) * 100}%`,
            scrub: 0.5,
            pin: true,
            onUpdate: (self) => {
              setActive(
                Math.min(
                  testimonials.length - 1,
                  Math.floor(self.progress * testimonials.length),
                ),
              );
            },
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [isDesktop, reducedMotion]);

  const t = testimonials[active];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream text-forest md:h-screen md:min-h-[620px]"
    >
      <style>{`
        @keyframes quoteIn {
          from { opacity: 0; transform: translateY(0.6em) rotateX(35deg); }
          to { opacity: 1; transform: none; }
        }
        .quote-word {
          display: inline-block;
          opacity: 0;
          animation: quoteIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-0 md:h-full flex flex-col justify-center">
        <p className="text-moss tracking-[0.3em] uppercase text-xs font-semibold">The Love Wall</p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-3">
          1,089 reviews. <span className="text-moss">This is what they say.</span>
        </h2>

        {isDesktop && !reducedMotion ? (
          <div className="mt-12">
            <div
              key={active}
              className="max-w-4xl rounded-3xl border border-forest/10 bg-white/70 p-8 sm:p-12 shadow-[0_40px_80px_-30px_rgba(10,42,31,0.35)]"
              style={{ transform: "perspective(1000px) rotateX(1.5deg)" }}
            >
              <p className="font-display text-6xl leading-none text-gold" aria-hidden="true">“</p>
              <blockquote className="font-display text-2xl sm:text-4xl leading-[1.25] -mt-4">
                {t.quote.split(" ").map((w, i) => (
                  <span key={i} className="quote-word" style={{ animationDelay: `${i * 45}ms` }}>
                    {w}&nbsp;
                  </span>
                ))}
              </blockquote>
              <footer className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-forest/50">· {t.service}</span>
                <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-cream">
                  {t.source}
                </span>
              </footer>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-forest/10">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${((active + 1) / testimonials.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-4 text-xs tracking-[0.25em] uppercase text-forest/50">
              Keep scrolling — the next review takes over
            </p>
          </div>
        ) : (
          <ul className="mt-12 space-y-6">
            {testimonials.map((q) => (
              <li key={q.quote} className="rounded-3xl border border-forest/10 bg-white/70 p-7">
                <blockquote className="font-display text-xl sm:text-2xl leading-snug">
                  “{q.quote}”
                </blockquote>
                <footer className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-semibold">{q.name}</span>
                  <span className="text-forest/50">· {q.service}</span>
                  <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-cream">
                    {q.source}
                  </span>
                </footer>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12">
          <Magnetic>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-forest px-7 py-3.5 font-semibold text-cream hover:bg-forest-2 transition-colors min-h-[48px]"
            >
              Join the 1,089 →
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
