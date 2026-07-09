'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaReact, FaNodeJs, FaDatabase, FaGitAlt,
  FaDocker, FaFigma,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb,
  SiFirebase, SiExpress, SiJavascript, SiHtml5,
  SiCss, SiGithub, SiVercel, SiPostman,
} from 'react-icons/si';
import { fadeUp, viewport } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Frontend',
    color: 'var(--accent-purple)',
    colorBg: 'rgba(124,58,237,0.06)',
    colorBorder: 'rgba(124,58,237,0.18)',
    glowColor: 'rgba(124,58,237,0.25)',
    skills: [
      { name: 'React', icon: FaReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
    ],
  },
  {
    title: 'Backend',
    color: 'var(--accent-cyan)',
    colorBg: 'rgba(6,182,212,0.06)',
    colorBorder: 'rgba(6,182,212,0.18)',
    glowColor: 'rgba(6,182,212,0.25)',
    skills: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'REST APIs', icon: FaDatabase },
    ],
  },
  {
    title: 'Tools & DevOps',
    color: 'var(--accent-magenta)',
    colorBg: 'rgba(236,72,153,0.06)',
    colorBorder: 'rgba(236,72,153,0.18)',
    glowColor: 'rgba(236,72,153,0.25)',
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Docker', icon: FaDocker },
      { name: 'Figma', icon: FaFigma },
      { name: 'Postman', icon: SiPostman },
    ],
  },
];

const allSkills = categories.flatMap((c) => c.skills.map((s) => s.name));

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading words flip in
      const words = headingRef.current?.querySelectorAll('.skill-word');
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

      // Category cards sweep in
      const cards = cardsRef.current?.querySelectorAll('.skill-category');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }

      // Skill icons pop in with elastic spring
      const icons = cardsRef.current?.querySelectorAll('.skill-icon-wrap');
      if (icons) {
        gsap.fromTo(icons,
          { opacity: 0, scale: 0, rotation: -15 },
          {
            opacity: 1, scale: 1, rotation: 0,
            duration: 0.5,
            stagger: { amount: 1.2, from: 'start' },
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating hover effect on each skill icon
  const handleIconEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -6,
      scale: 1.12,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleIconLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const headingWords = ['Technologies', 'I', 'work with'];

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          bottom: '0', left: '50%',
          transform: 'translateX(-50%)',
          width: '700px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <span className="section-tag" style={{ display: 'inline-flex' }}>
            02 — Skills
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
                  className="skill-word"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    color: i === 2 ? 'transparent' : 'var(--text-primary)',
                    backgroundImage: i === 2
                      ? 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-cyan))'
                      : 'none',
                    WebkitBackgroundClip: i === 2 ? 'text' : 'unset',
                    backgroundClip: i === 2 ? 'text' : 'unset',
                    WebkitTextFillColor: i === 2 ? 'transparent' : 'unset',
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
            A curated toolkit built through real projects, not just tutorials.
          </p>
        </div>

        {/* Skill categories */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '64px',
          }}
          className="skills-grid"
        >
          {categories.map((category) => (
            <div
              key={category.title}
              className="skill-category"
              style={{
                padding: '32px 28px',
                background: category.colorBg,
                border: `1px solid ${category.colorBorder}`,
                borderRadius: '20px',
                opacity: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: 'absolute',
                top: '-30px', right: '-30px',
                width: '120px', height: '120px',
                background: `radial-gradient(circle, ${category.glowColor} 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />

              {/* Category title */}
              <h3 style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: category.color,
                marginBottom: '28px',
                paddingBottom: '16px',
                borderBottom: `1px solid ${category.colorBorder}`,
                position: 'relative',
              }}>
                {category.title}
              </h3>

              {/* Skill icons grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
              }}
                className="skill-icons-grid"
              >
                {category.skills.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="skill-icon-wrap"
                    onMouseEnter={handleIconEnter}
                    onMouseLeave={handleIconLeave}
                    style={{
                      opacity: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'default',
                    }}
                  >
                    {/* Icon box */}
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: 'var(--bg-card)',
                      border: `1px solid ${category.colorBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      color: category.color,
                      boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Shine on box */}
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '50%',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)',
                        pointerEvents: 'none',
                        borderRadius: '14px 14px 0 0',
                      }} />
                      <Icon />
                    </div>

                    {/* Skill name */}
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      letterSpacing: '0.03em',
                      lineHeight: 1.2,
                    }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Infinite ticker */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div style={{
            overflow: 'hidden',
            padding: '20px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            position: 'relative',
          }}>
            {/* Fade edges */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
              background: 'linear-gradient(to right, var(--bg-secondary), transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
              background: 'linear-gradient(to left, var(--bg-secondary), transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex', gap: '32px', width: 'max-content' }}
            >
              {[...allSkills, ...allSkills].map((skill, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {skill}
                  <span style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: 'var(--accent-purple)',
                    display: 'inline-block',
                  }} />
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .skill-icons-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}