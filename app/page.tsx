"use client";

import { Nav, Hero, Marquee, ProofStrip, SignatureServices, MenuBoard, Products, Gallery, Visit, Footer } from "@/components/Sections";
import { Journey } from "@/components/Journey";
import { Compare } from "@/components/Compare";
import { StrandLab } from "@/components/Lab";
import { Testimonials } from "@/components/Testimonials";
import { useReducedMotion } from "@/components/ui";

export default function Home() {
  const reducedMotion = useReducedMotion();
  return (
    <>
      <Nav />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <Marquee />
        <ProofStrip />
        <SignatureServices />
        <Journey reducedMotion={reducedMotion} />
        <Compare reducedMotion={reducedMotion} />
        <StrandLab reducedMotion={reducedMotion} />
        <MenuBoard />
        <Products />
        <Testimonials reducedMotion={reducedMotion} />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
