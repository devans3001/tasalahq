"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

/* Reduced-motion hook — one source of truth for the whole site. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/* Split-text reveal: lines slide up with a mask, GSAP-driven. */
export function SplitReveal({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current
        .querySelectorAll(".split-line > span")
        .forEach((el) => ((el as HTMLElement).style.transform = "none"));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(ref.current!.querySelectorAll(".split-line > span"), {
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        delay,
        ease: "power4.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="split-line">
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/* Generic fade/slide-in on scroll. */
export function Reveal({
  children,
  className = "",
  y = 36,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [y, delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* Magnetic button — drifts toward the cursor, springs back. */
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power3.out" });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* Animated strand divider — a hair strand that draws itself on scroll. */
export function StrandDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const p = ref.current.querySelector(".strand-path");
      if (p) (p as SVGPathElement).style.strokeDashoffset = "0";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(ref.current!.querySelector(".strand-path"), {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 40"
      fill="none"
      aria-hidden="true"
      className={`w-full h-10 ${flip ? "-scale-y-100" : ""}`}
      preserveAspectRatio="none"
    >
      <path
        className="strand-path"
        d="M0 20 C 150 2, 300 38, 450 20 S 750 2, 900 20 S 1100 38, 1200 20"
        stroke="#c9a24b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="600" cy="20" r="4" fill="#c9a24b" />
    </svg>
  );
}

/* Section heading: eyebrow + display headline. */
export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <p
          className={`tracking-[0.3em] uppercase text-xs font-semibold ${
            tone === "dark" ? "text-moss" : "text-gold"
          }`}
        >
          {eyebrow}
        </p>
      </Reveal>
      <SplitReveal
        lines={[title]}
        as="h2"
        className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-3"
      />
    </div>
  );
}

/* Animated number counter. */
export function Counter({
  to,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to.toFixed(decimals) + suffix;
      return;
    }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
        onUpdate: () => {
          el.textContent =
            obj.v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [to, decimals, suffix]);
  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
