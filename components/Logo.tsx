/* TasalaHQ placeholder mark: a single strand coiling into a "T".
   Unique to this client — never reuse for another build. */

export function StrandMark({
  className = "w-9 h-9",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 10 C 18 4, 30 4, 40 10 C 44 13, 44 20, 38 24 C 30 29, 18 29, 12 24 C 7 20, 9 14, 15 13 C 21 12, 29 14, 33 19 C 36 23, 33 29, 26 30 C 20 31, 14 29, 12 25"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        className={animated ? "strand-path" : ""}
      />
      <circle cx="36" cy="38" r="3" fill="#c9a24b" />
    </svg>
  );
}

export function LogoLockup({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="TasalaHQ home">
      <span className={light ? "text-forest" : "text-gold"}>
        <StrandMark className="w-9 h-9" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[1.35rem] font-semibold tracking-tight ${
            light ? "text-forest" : "text-cream"
          }`}
        >
          Tasala<span className="text-gold">HQ</span>
        </span>
        <span
          className={`block text-[0.6rem] tracking-[0.28em] uppercase ${
            light ? "text-forest/60" : "text-cream/60"
          }`}
        >
          Healthy Hair Experts
        </span>
      </span>
    </a>
  );
}
