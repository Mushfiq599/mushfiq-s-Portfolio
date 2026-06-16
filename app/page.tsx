import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Placeholder sections so nav scroll targets exist */}
      {['about', 'skills', 'education', 'experience', 'projects', 'contact'].map((id) => (
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