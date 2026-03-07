import Navigation from '@/components/Navigation';
import DeferredVisualEffects from '@/components/DeferredVisualEffects';
import SectionPrefetcher from '@/components/SectionPrefetcher';
import SectionDivider from '@/components/SectionDivider';
import Hero from '@/sections/Hero';
import Capabilities from '@/sections/Capabilities';
import HowWeThink from '@/sections/HowWeThink';
import Projects from '@/sections/Projects';
import Process from '@/sections/Process';
import AILab from '@/sections/AILab';
import TechStack from '@/sections/TechStack';
import Trust from '@/sections/Trust';
import About from '@/sections/About';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <>
      <SectionPrefetcher />
      <DeferredVisualEffects />
      <Navigation />
      <main>
        <Hero />
        <SectionDivider />
        <Capabilities />
        <SectionDivider flip />
        <HowWeThink />
        <SectionDivider />
        <Projects />
        <SectionDivider flip />
        <Process />
        <SectionDivider />
        <AILab />
        <SectionDivider flip />
        <TechStack />
        <SectionDivider />
        <Trust />
        <SectionDivider flip />
        <About />
        <SectionDivider />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
