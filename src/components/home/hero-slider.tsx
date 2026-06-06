'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { heroSlides } from '@/lib/home-data';

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const { locale } = useLanguage();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[active];

  return (
    <section className="relative h-[500px] lg:h-[600px] overflow-hidden bg-[#2c3e50]">
      {/* Background image */}
      <img
        src="/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a3a]/85 to-[#2c3e50]/70" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full border border-white/10" />
        <div className="absolute top-[15%] right-[12%] w-[250px] h-[250px] rounded-full border border-white/5" />
        <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] rounded-full border border-white/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1
            key={slide.id}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in"
          >
            {slide.title[locale]}
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-10">
            {slide.subtitle[locale]}
          </p>
          <a
            href={slide.ctaHref}
            className="inline-block px-8 py-4 bg-[#0f8b8d] text-white font-semibold rounded-lg hover:bg-[#0c7475] transition-colors text-base"
          >
            {slide.ctaText[locale]}
          </a>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === active ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
