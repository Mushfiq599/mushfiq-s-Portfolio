'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaMedal, FaCalendarAlt, FaHashtag,
  FaExpand, FaTimes, FaCode, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import { fadeUp, viewport } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    id: 1,
    name: 'Complete Web Development',
    issuer: 'Programming Hero',
    issuedTo: 'Mushfiqur Rahman',
    date: 'January 2026',
    credentialId: 'WEB12-3184',
    image: '/images/cert-programming-hero.png',
    accentColor: 'var(--accent-purple)',
    accentBg: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.2)',
    skills: [
      'HTML5', 'CSS3', 'JavaScript', 'React',
      'Node.js', 'Express.js', 'MongoDB', 'JWT',
      'REST APIs', 'Firebase', 'Tailwind CSS',
    ],
    description:
      'A comprehensive full-stack web development program covering modern frontend and backend technologies. Completed with structured project milestones, peer reviews, and real-world deployment assignments tracked via GitHub.',
  },
  {
    id: 2,
    name: 'AI Workflows & Agents',
    issuer: 'Grameenphone Academy',
    issuedTo: 'Mushfiqur Rahman',
    date: 'July 2026',
    credentialId: null,
    image: '/images/cert-gp-ai-workflows.png',
    accentColor: 'var(--accent-cyan)',
    accentBg: 'rgba(6,182,212,0.08)',
    accentBorder: 'rgba(6,182,212,0.2)',
    skills: [
      'AI Agents', 'Workflow Automation', 'Prompt Engineering',
      'LLM Integration', 'AI Tools',
    ],
    description:
      'Certificate of Excellence awarded by Grameenphone Academy for successfully completing the AI Workflows & Agents course. Covers practical AI agent design, automation pipelines, and LLM-powered workflow integration.',
  },
  {
    id: 3,
    name: 'Personal Branding in AI Era',
    issuer: 'Grameenphone Academy',
    issuedTo: 'Mushfiqur Rahman',
    date: 'August 2026',
    credentialId: null,
    image: '/images/cert-gp-personal-branding.png',
    accentColor: 'var(--accent-magenta)',
    accentBg: 'rgba(236,72,153,0.08)',
    accentBorder: 'rgba(236,72,153,0.2)',
    skills: [
      'Personal Branding', 'AI Tools', 'LinkedIn Optimization',
      'Content Strategy', 'Digital Presence',
    ],
    description:
      'Certificate of Excellence awarded by Grameenphone Academy for completing the Personal Branding in AI Era course. Covers building a compelling digital identity, leveraging AI tools for content creation, and optimizing professional presence.',
  },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxName, setLightboxName] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Tag slides in
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

      // Cards cascade in
      const cards = cardsRef.current?.querySelectorAll('.cert-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxImage ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImage]);

  const headingWords = ['My', 'Certificates'];

  const openLightbox = (image: string, name: string) => {
    setLightboxImage(image);
    setLightboxName(name);
  };

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
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', right: '-80px',
          width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
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
            style={{ opacity: 0, display: 'inline-flex', gap: '6px' }}
          >
            <FaMedal style={{ fontSize: '0.7rem' }} />
            05 — Certificates
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
            Formal recognition across web development, AI, and professional skills.
          </p>
        </div>

        {/* Certificate cards grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="certs-grid"
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="cert-card"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${cert.accentBorder}`,
                borderRadius: '20px',
                overflow: 'hidden',
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Certificate image */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                background: cert.accentBg,
              }}>
                <img
                  src={cert.image}
                  alt={cert.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1)';
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Expand button */}
                <motion.button
                  onClick={() => openLightbox(cert.image, cert.name)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '34px', height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  <FaExpand />
                </motion.button>

                {/* Verified badge */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '10px',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '4px 10px',
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  borderRadius: '100px',
                  backdropFilter: 'blur(8px)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#22c55e',
                }}>
                  <span style={{
                    width: '5px', height: '5px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'pulse 2s infinite',
                  }} />
                  Verified
                </div>
              </div>

              {/* Card body */}
              <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1,
              }}>

                {/* Issuer */}
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: cert.accentColor,
                }}>
                  {cert.issuer}
                </div>

                {/* Course name */}
                <h3 style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                }}>
                  {cert.name}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {cert.description}
                </p>

                {/* Meta */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '12px',
                  background: cert.accentBg,
                  border: `1px solid ${cert.accentBorder}`,
                  borderRadius: '10px',
                  marginTop: 'auto',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    fontSize: '0.75rem', color: 'var(--text-muted)',
                  }}>
                    <FaMedal style={{ color: cert.accentColor, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {cert.issuedTo}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    fontSize: '0.75rem', color: 'var(--text-muted)',
                  }}>
                    <FaCalendarAlt style={{ color: cert.accentColor, flexShrink: 0 }} />
                    {cert.date}
                  </div>
                  {cert.credentialId && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                    }}>
                      <FaHashtag style={{ color: cert.accentColor, flexShrink: 0 }} />
                      <span style={{
                        fontFamily: 'monospace',
                        background: cert.accentBg,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        color: cert.accentColor,
                        fontSize: '0.72rem',
                      }}>
                        {cert.credentialId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: cert.accentBg,
                        border: `1px solid ${cert.accentBorder}`,
                        color: cert.accentColor,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View button */}
                <motion.button
                  onClick={() => openLightbox(cert.image, cert.name)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: cert.accentBg,
                    border: `1px solid ${cert.accentBorder}`,
                    borderRadius: '10px',
                    color: cert.accentColor,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <FaExpand style={{ fontSize: '0.7rem' }} />
                  View Certificate
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
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
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '960px', width: '100%' }}
            >
              {/* Close */}
              <motion.button
                onClick={() => setLightboxImage(null)}
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
                src={lightboxImage}
                alt={lightboxName}
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 0 80px rgba(124,58,237,0.2)',
                  display: 'block',
                }}
              />

              <div style={{
                textAlign: 'center', marginTop: '14px',
                fontSize: '0.82rem', color: 'var(--text-muted)',
              }}>
                {lightboxName}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          .certs-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .certs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}