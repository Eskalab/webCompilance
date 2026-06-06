'use client';

import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import HeroSlider from '@/components/home/hero-slider';
import QueHacemos from '@/components/home/que-hacemos';
import QuienesSomos from '@/components/home/quienes-somos';
import ServicesSection from '@/components/home/services-section';
import Capacitaciones from '@/components/home/capacitaciones';
import BlogSection from '@/components/home/blog-section';
import TeamSection from '@/components/home/team-section';
import PartnersSection from '@/components/home/partners-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <HeroSlider />
      <QueHacemos />
      <QuienesSomos />
      <ServicesSection />
      <Capacitaciones />
      <BlogSection />
      <TeamSection />
      <PartnersSection />
      <SiteFooter />
    </main>
  );
}
