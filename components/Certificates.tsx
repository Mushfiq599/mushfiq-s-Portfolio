'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaMedal, FaCalendarAlt, FaHashtag,
  FaExternalLinkAlt, FaCode, FaExpand, FaTimes,
} from 'react-icons/fa';
import { SiProgramminghero } from 'react-icons/si';
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const certificate = {
  name: 'Complete Web Development',
  issuer: 'Programming Hero',
  issuedTo: 'Mushfiqur Rahman',
  date: 'January 2026',
  credentialId: 'WEB12-3184',
  verifyUrl: '',
  image: '/certificate-programming-hero.png',
  skills: [
    'HTML5', 'CSS3', 'JavaScript', 'React',
    'Node.js', 'Express.js', 'MongoDB', 'JWT',
    'REST APIs', 'Firebase', 'Tailwind CSS',
  ],
  description:
    'A comprehensive full-stack web development program covering modern frontend and backend technologies. Completed with structured project milestones, peer reviews, and real-world deployment assignments tracked via GitHub.',
};

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Tag slides in from left
      gsap.fromTo(tagRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: tagRef.current, start: 'top 88%' },
        }
      );

      // Heading words flip in
      const words = headingRef.current?.querySelectorAll('.cert-word');
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 50, rotationX: -35, transformOrigin: 'top center' },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.8, stagger: 0.09, ease: 'power4.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
          }
        );
      }

      // Card sweeps in from bottom
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
        }
      );

      // Skill tags stagger in
      const tags = cardRef.current?.querySelectorAll('.cert-skill-tag');
      if (tags) {
        gsap.fromTo(tags,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1,
            duration: 0.4,
            stagger: { amount: 0.6, from: 'start' },
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: cardRef.current, start: 'top 75%' },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const headingWords = ['My', 'Certificate'];

  return (
    <section
      id="certificates"
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accents */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', right: '-80px',
          width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '-60px',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <span
            ref={tagRef}
            className="section-tag"
            style={{ opacity: 0, display: 'inline-flex' }}
          >
            <FaMedal style={{ fontSize: '0.7rem' }} />
            05 — Certificate
          </span>

          <div
            ref={headingRef}
            style={{ perspective: '600px', margin: '16px 0 0' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 14px',
            }}>
              {headingWords.map((word, i) => (
                <span
                  key={i}
                  className="cert-word"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    color: i === 1 ? 'transparent' : 'var(--text-primary)',
                    backgroundImage: i === 1
                      ? 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-cyan))'
                      : 'none',
                    WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                    backgroundClip: i === 1 ? 'text' : 'unset',
                    WebkitTextFillColor: i === 1 ? 'transparent' : 'unset',
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '480px',
            marginTop: '16px',
          }}>
            Formal recognition of skills built through real projects and structured learning.
          </p>
        </div>

        {/* Certificate card */}
        <div
          ref={cardRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '0',
            background: 'var(--bg-card)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '24px',
            overflow: 'hidden',
            opacity: 0,
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 0 60px rgba(124,58,237,0.08)',
          }}
          className="cert-card-grid"
        >
          {/* Left — Certificate image */}
          <div style={{ position: 'relative', minHeight: '360px' }}>
            <img
              src={certificate.image}
              alt="Programming Hero Certificate"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />

            {/* Dark overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent 60%, var(--bg-card) 100%)',
            }} />

            {/* Expand button */}
            <motion.button
              onClick={() => setLightboxOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '38px', height: '38px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem',
              }}
              title="View full certificate"
            >
              <FaExpand />
            </motion.button>

            {/* Verified badge */}
            <div style={{
              position: 'absolute', bottom: '16px', left: '16px',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px',
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: '100px',
              backdropFilter: 'blur(8px)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#22c55e',
            }}>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'pulse 2s infinite',
              }} />
              Verified Certificate
            </div>
          </div>

          {/* Right — Details */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Issuer */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '10px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-purple-light)',
                fontSize: '1.1rem',
              }}>
                <FaCode />
              </div>
              <div>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>
                  Issued by
                </div>
                <div style={{
                  fontSize: '0.95rem', fontWeight: 700,
                  color: 'var(--accent-purple-light)',
                }}>
                  {certificate.issuer}
                </div>
              </div>
            </div>

            {/* Course name */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-space)',
                fontSize: '1.3rem', fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '6px',
              }}>
                {certificate.name}
              </h3>
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
              }}>
                {certificate.description}
              </p>
            </div>

            {/* Meta row */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '10px',
              padding: '16px',
              background: 'var(--glass)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '0.82rem', color: 'var(--text-muted)',
              }}>
                <FaMedal style={{ color: 'var(--accent-purple-light)', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {certificate.issuedTo}
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '0.82rem', color: 'var(--text-muted)',
              }}>
                <FaCalendarAlt style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                {certificate.date}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '0.82rem', color: 'var(--text-muted)',
              }}>
                <FaHashtag style={{ color: 'var(--accent-magenta)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'monospace',
                  background: 'rgba(124,58,237,0.08)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: 'var(--accent-purple-light)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                }}>
                  {certificate.credentialId}
                </span>
              </div>
            </div>

            {/* Skills covered */}
            <div>
              <div style={{
                fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '10px',
              }}>
                Skills covered
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cert-skill-tag"
                    style={{
                      fontSize: '0.68rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '100px',
                      background: 'rgba(124,58,237,0.08)',
                      border: '1px solid rgba(124,58,237,0.18)',
                      color: 'var(--accent-purple-light)',
                      opacity: 0,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* View button */}
            <motion.button
              onClick={() => setLightboxOpen(true)}
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(124,58,237,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '12px',
                background: 'var(--accent-purple)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
              }}
            >
              <FaExpand style={{ fontSize: '0.8rem' }} />
              View Full Certificate
            </motion.button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '900px', width: '100%' }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setLightboxOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute', top: '-16px', right: '-16px',
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.95rem', zIndex: 1,
              }}
            >
              <FaTimes />
            </motion.button>

            <img
              src={certificate.image}
              alt="Programming Hero Certificate"
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: '0 0 80px rgba(124,58,237,0.25)',
                display: 'block',
              }}
            />

            {/* Caption */}
            <div style={{
              textAlign: 'center', marginTop: '16px',
              fontSize: '0.82rem', color: 'var(--text-muted)',
            }}>
              {certificate.name} — {certificate.issuer} · {certificate.date} ·{' '}
              <span style={{ color: 'var(--accent-purple-light)', fontFamily: 'monospace' }}>
                {certificate.credentialId}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 700px) {
          .cert-card-grid {
            grid-template-columns: 1fr !important;
          }
          .cert-card-grid > div:first-child {
            min-height: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}