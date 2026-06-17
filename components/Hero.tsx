'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { fadeUp, fadeIn, staggerContainer, staggerItem, viewport } from '@/lib/animations';
import { FaX } from 'react-icons/fa6';

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Mushfiq599', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/mush-fiq', label: 'LinkedIn' },
    { icon: FaX, href: 'https://x.com/MushFiq72288867', label: 'X' },
    { icon: FaWhatsapp, href: 'https://wa.me/8801630935413', label: 'WhatsApp' },
];

const stats = [
    { number: '10+', label: 'Projects Built' },
    { number: '3+', label: 'Years Learning' },
    { number: '5+', label: 'Technologies' },
];

export default function Hero() {
    const glowRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    // GSAP floating glow orbs
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.glow-orb-1', {
                x: 60,
                y: -40,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
            gsap.to('.glow-orb-2', {
                x: -50,
                y: 50,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1,
            });
            gsap.to('.glow-orb-3', {
                x: 30,
                y: 60,
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 2,
            });
        });

        return () => ctx.revert();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '120px 24px 80px',
            }}
        >
            {/* Background glow orbs (GSAP animated) */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div
                    className="glow-orb-1"
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '10%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                    }}
                />
                <div
                    className="glow-orb-2"
                    style={{
                        position: 'absolute',
                        top: '40%',
                        right: '5%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                    }}
                />
                <div
                    className="glow-orb-3"
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '40%',
                        width: '350px',
                        height: '350px',
                        background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                    }}
                />

                {/* Grid pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            {/* Main content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
            }}
                className="hero-grid"
            >
                {/* Left — Text */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={staggerItem}>
                        <span className="section-tag">
                            <span style={{
                                width: '6px', height: '6px',
                                borderRadius: '50%',
                                background: '#22c55e',
                                display: 'inline-block',
                                animation: 'pulse 2s infinite',
                            }} />
                            Available for work
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        ref={titleRef}
                        variants={staggerItem}
                        style={{
                            fontFamily: 'var(--font-space)',
                            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            margin: '16px 0 8px',
                        }}
                    >
                        Hi, I'm{' '}
                        <span className="gradient-text">Mushfiq</span>
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.h2
                        variants={staggerItem}
                        style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                            fontWeight: 400,
                            color: 'var(--text-muted)',
                            marginBottom: '20px',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Full Stack Developer —{' '}
                        <span style={{ color: 'var(--accent-cyan)' }}>MERN Stack</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={staggerItem}
                        style={{
                            fontSize: '1rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.7,
                            maxWidth: '460px',
                            marginBottom: '32px',
                        }}
                    >
                        I build fast, beautiful, and scalable web applications.
                        Passionate about crafting pixel-perfect UIs and robust backends
                        that solve real problems.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={staggerItem}
                        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}
                    >
                        <motion.button
                            onClick={() => scrollTo('projects')}
                            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '13px 28px',
                                background: 'var(--accent-purple)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                transition: 'box-shadow 0.3s',
                            }}
                        >
                            View My Work →
                        </motion.button>

                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '13px 28px',
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border)',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            Download Resume ↓
                        </motion.a>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        variants={staggerItem}
                        style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}
                    >
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                whileHover={{
                                    scale: 1.15,
                                    color: 'var(--accent-purple-light)',
                                    borderColor: 'var(--accent-purple)',
                                }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border)',
                                    background: 'var(--glass)',
                                    color: 'var(--text-muted)',
                                    fontSize: '1.1rem',
                                    textDecoration: 'none',
                                    backdropFilter: 'blur(8px)',
                                    transition: 'color 0.2s, border-color 0.2s',
                                }}
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={staggerItem}
                        style={{
                            display: 'flex',
                            gap: '24px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {stats.map(({ number, label }) => (
                            <div
                                key={label}
                                style={{
                                    padding: '12px 20px',
                                    background: 'var(--glass)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    minWidth: '80px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    lineHeight: 1,
                                }}>
                                    {number}
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)',
                                    marginTop: '4px',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right — Photo */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        style={{ position: 'relative' }}
                    >
                        {/* Glow ring behind photo */}
                        <div style={{
                            position: 'absolute',
                            inset: '-3px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                            zIndex: 0,
                            filter: 'blur(1px)',
                        }} />

                        {/* Photo */}
                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            width: 'clamp(280px, 35vw, 420px)',
                            aspectRatio: '4/5',
                            borderRadius: '22px',
                            overflow: 'hidden',
                            background: 'var(--bg-secondary)',
                        }}>
                            <img
                                src="../portfolio-hero.png"
                                alt="Mushfiq — Full Stack Developer"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'top center',
                                }}
                            />
                        </div>

                        {/* Floating badge — top right */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                top: '-16px',
                                right: '-20px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '10px 16px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--accent-cyan)',
                                backdropFilter: 'blur(12px)',
                                whiteSpace: 'nowrap',
                                zIndex: 2,
                            }}
                        >
                            ⚡ Open to opportunities
                        </motion.div>

                        {/* Floating badge — bottom left */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            style={{
                                position: 'absolute',
                                bottom: '-16px',
                                left: '-20px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '10px 16px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--accent-purple-light)',
                                backdropFilter: 'blur(12px)',
                                whiteSpace: 'nowrap',
                                zIndex: 2,
                            }}
                        >
                            🚀 MERN Stack Dev
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute',
                    bottom: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                }}
            >
                <span>SCROLL</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        width: '1px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, var(--accent-purple), transparent)',
                    }}
                />
            </motion.div>

            {/* Pulse animation for green dot */}
            <style>{`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @media (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
      text-align: center;
    }
    .hero-grid > div:last-child {
      order: -1;
    }
    /* Center the stats row on mobile */
    .hero-grid > div:first-child > div:last-child {
      justify-content: center;
    }
  }
`}</style>
        </section>
    );
}