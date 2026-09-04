'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/ui/BackToTop';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import Projects from '@/components/Projects';
import GitHub from '@/components/GitHub';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Global UI */}
        <ScrollProgress />
        <BackToTop />

        {/* Sections */}
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Certificates />
        <Projects />
        <GitHub />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}