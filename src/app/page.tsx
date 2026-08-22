"use client";
import { useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Credits } from "@/components/sections/Credits";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ScrawlBand } from "@/components/ui/ScrawlBand";
import { RibbonDivider } from "@/components/ui/RibbonDivider";
import { Marquee } from "@/components/ui/Marquee";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  useEffect(() => {
    // Reveal Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <ScrawlBand />
      <Work />
      <RibbonDivider type="double" />
      <Credits />
      <Marquee />
      <About />
      <RibbonDivider type="single" />
      <Contact />
      <Footer />
    </main>
  );
}
