import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Experience from '@/components/Experience';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />

      {/* Placeholder sections */}
      {['projects', 'contact'].map((id) => (
        <section
          key={id}
          id={id}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: '1.5rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          {id} — coming soon
        </section>
      ))}
    </main>
  );
}