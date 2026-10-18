"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  business,
  gallery,
  hours,
  locations,
  marqueeWords,
  menu,
  products,
  signatureServices,
  whatsappUrl,
} from "@/lib/data";
import { Counter, Magnetic, Reveal, SectionHeading, SplitReveal, StrandDivider } from "./ui";
import { LogoLockup } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("./three").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,#1d5c40_0%,transparent_60%)]" />,
});

/* ------------------------------- NAV ------------------------------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-forest/85 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <LogoLockup />
        <div className="hidden md:flex items-center gap-8 text-sm text-cream/80">
          <a href="#services" className="hover:text-gold transition-colors">Services</a>
          <a href="#journey" className="hover:text-gold transition-colors">The Journey</a>
          <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
          <a href="#reviews" className="hover:text-gold transition-colors">Reviews</a>
          <a href="#visit" className="hover:text-gold transition-colors">Visit</a>
        </div>
        <Magnetic>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-forest hover:bg-gold-2 transition-colors min-h-[44px]"
          >
            Book on WhatsApp
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}

/* ------------------------------- HERO ------------------------------ */
export function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* 3D coil canvas — visible and moving within 1 second */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroCanvas reducedMotion={reducedMotion} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/60 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 min-h-[100svh] flex flex-col justify-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest/60 px-4 py-1.5 text-xs tracking-[0.25em] uppercase text-gold-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse" />
            Ikoyi · Lekki Phase 1 — Lagos
          </p>
        </Reveal>

        <SplitReveal
          as="h1"
          delay={0.15}
          className="font-display text-[13.5vw] sm:text-7xl lg:text-[5.6rem] leading-[0.98] mt-6 max-w-3xl"
          lines={["Healthy hair,", "grown with", "intention."]}
        />

        <Reveal delay={0.5} className="mt-6 max-w-xl">
          <p className="text-lg text-cream/85 leading-relaxed">
            {business.sub} <span className="text-gold-2 font-medium">Growth. Strength. Moisture. Care.</span>
          </p>
        </Reveal>

        <Reveal delay={0.65} className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream text-forest px-4 py-2 text-sm font-semibold">
            <span className="text-gold" aria-hidden="true">★★★★★</span>
            {business.rating} · {business.reviewCount.toLocaleString()} reviews
          </span>
          <a
            href={business.igUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-sm hover:border-gold hover:text-gold-2 transition-colors"
          >
            {business.igHandle} · {business.igFollowers} followers
          </a>
        </Reveal>

        <Reveal delay={0.8} className="mt-9 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-clay px-7 py-3.5 font-semibold text-cream hover:bg-[#d67f57] transition-colors min-h-[48px]"
            >
              Book an Appointment →
            </a>
          </Magnetic>
          <a
            href="#services"
            className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 font-semibold hover:border-gold hover:text-gold-2 transition-colors min-h-[48px]"
          >
            Explore Services
          </a>
        </Reveal>

        <Reveal delay={1} className="mt-14 flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-cream/50">
          <span className="inline-block h-px w-10 bg-gold/60" />
          Scroll — watch a strand come back to life
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- MARQUEE ------------------------------ */
export function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-forest-2 py-4" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl text-cream/80">
            {w} <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- PROOF STRIP --------------------------- */
export function ProofStrip() {
  const stats = [
    { value: business.rating, decimals: 1, suffix: "★", label: "Google rating" },
    { value: business.reviewCount, decimals: 0, suffix: "", label: "Reviews & counting" },
    { value: 174, decimals: 0, suffix: "K", label: "Instagram followers" },
    { value: 2, decimals: 0, suffix: "", label: "Lagos locations" },
    { value: 2000, decimals: 0, suffix: "+", label: "Hair lovers in the family" },
  ];
  return (
    <section className="bg-cream text-forest">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display text-4xl lg:text-5xl font-semibold">
              <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <p className="mt-1 text-sm text-forest/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ SIGNATURE SERVICES ------------------------ */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

export function SignatureServices() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Signature Services"
          title="The six reasons Lagos books Tasala."
        />
        <Reveal className="mt-4 max-w-2xl">
          <p className="text-cream/75 text-lg">
            Every service starts with a consultation and ends with a plan for your hair at home.
            Tap any card to book it on WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatureServices.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.1}>
              <TiltCard className="h-full">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-forest-2 border border-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-2 via-transparent to-transparent" />
                    {s.tag && (
                      <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-forest">
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl leading-tight">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{s.benefit}</p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-cream/60">{s.duration}</span>
                      <span className="font-semibold text-gold-2">{s.price}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors group-hover:text-gold-2">
                      Book this <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- MENU BOARD ---------------------------- */
export function MenuBoard() {
  return (
    <section id="menu" className="bg-cream text-forest py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="The Full Menu" title="Everything, in one place." tone="dark" />
          <Reveal>
            <p className="max-w-sm text-forest/70">
              Prices are confirmed when you book — your hair, your plan, no surprises.
              Hover any row to preview it.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 border-t-2 border-forest">
          {menu.map((m) => (
            <a
              key={m.name}
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="menu-row group relative flex items-center justify-between gap-4 border-b border-forest/15 py-5 px-2 transition-colors hover:bg-cream-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div>
                <h3 className="font-display text-2xl sm:text-3xl leading-tight group-hover:text-moss transition-colors">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm text-forest/60">{m.benefit}</p>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <span className="hidden sm:block text-sm text-forest/60">{m.duration}</span>
                <span className="font-semibold text-moss">{m.price}</span>
                <span aria-hidden="true" className="text-gold text-xl transition-transform group-hover:translate-x-1">→</span>
              </div>
              <span className="menu-photo absolute right-40 top-1/2 z-10 hidden w-44 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl lg:block">
                <Image src={m.image} alt="" width={176} height={120} className="object-cover" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PRODUCTS ---------------------------- */
export function Products() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="The Tasala Shelf" title="Take the salon home." />
        <Reveal className="mt-4 max-w-2xl">
          <p className="text-cream/75 text-lg">
            The salon's own product line — the same formulas your stylist uses in the chair,
            for the days between visits.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.08}>
              <a
                href={business.website}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-cream/10 bg-forest-2 p-6 transition-all hover:-translate-y-1 hover:border-gold/50"
              >
                <span className="font-display text-4xl text-gold/40 group-hover:text-gold transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl leading-snug">{p.name}</h3>
                <p className="mt-1 text-sm text-cream/60">{p.note}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-2">
                  Shop the line <span aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- GALLERY ---------------------------- */
export function Gallery() {
  return (
    <section className="py-24 sm:py-32 bg-forest-2">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="The Work" title="The Tasala standard." />
        <Reveal className="mt-4 max-w-2xl">
          <p className="text-cream/75 text-lg">
            Style references for the standard every appointment is held to.
            The salon's own portfolio slots into this wall on launch.
          </p>
        </Reveal>

        <div className="mt-12 columns-2 lg:columns-3 gap-4 [column-fill:balance]">
          {gallery.map((g, i) => (
            <Reveal key={g.src + i} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-3xl">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={800}
                  height={i % 2 === 0 ? 1000 : 700}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-forest/90 to-transparent px-5 pt-16 pb-4 text-sm font-medium">
                  {g.label}
                  <span className="text-gold">✦</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- VISIT ------------------------------ */
export function Visit() {
  return (
    <section id="visit" className="bg-cream text-forest py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-moss tracking-[0.3em] uppercase text-xs font-semibold">Your chair is waiting</p>
        </Reveal>
        <SplitReveal
          lines={["Come in.", "Your hair will", "thank you."]}
          as="h2"
          className="font-display text-center text-5xl sm:text-7xl lg:text-8xl leading-[0.98] mt-4"
        />

        <Reveal className="mt-10 flex justify-center">
          <Magnetic>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-clay px-8 py-4 text-lg font-semibold text-cream hover:bg-[#d67f57] transition-colors min-h-[52px]"
            >
              Book on WhatsApp →
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {locations.map((l) => (
            <div key={l.id} className="rounded-3xl border border-forest/15 bg-white/60 p-7">
              <p className="text-xs tracking-[0.25em] uppercase text-moss font-semibold">{l.label}</p>
              <p className="mt-3 font-display text-2xl leading-snug">{l.address}</p>
              <a href={l.phoneHref} className="mt-3 block text-lg font-semibold text-moss hover:text-forest">
                {l.phoneDisplay}
              </a>
              <a
                href={l.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[#a8862f]"
              >
                Get directions <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
          <div className="rounded-3xl bg-forest text-cream p-7">
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-semibold">Hours</p>
            <ul className="mt-3 space-y-2">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 text-sm">
                  <span className="text-cream/70">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </li>
              ))}
            </ul>
            <a href={`mailto:${business.email}`} className="mt-4 block text-sm text-gold-2 hover:text-gold">
              {business.email}
            </a>
          </div>
        </div>

        <StrandDivider />
      </div>
    </section>
  );
}

/* ------------------------------- FOOTER ----------------------------- */
export function Footer() {
  return (
    <footer className="bg-forest border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <LogoLockup />
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream/70">
          <a href="#services" className="hover:text-gold">Services</a>
          <a href="#journey" className="hover:text-gold">The Journey</a>
          <a href="#menu" className="hover:text-gold">Menu</a>
          <a href="#reviews" className="hover:text-gold">Reviews</a>
          <a href={business.igUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
            Instagram {business.igHandle}
          </a>
        </div>
        <p className="text-xs text-cream/40 max-w-xs">
          © {new Date().getFullYear()} {business.name}. Concept redesign by Claro &amp; Co —
          replace with your own credits on launch.
        </p>
      </div>
    </footer>
  );
}
