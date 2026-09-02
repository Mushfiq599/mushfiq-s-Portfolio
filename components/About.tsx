'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaCode, FaHeart, FaRocket, FaCoffee } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    fadeUp, fadeLeft, fadeRight,
    staggerContainer, staggerItem, viewport,
} from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        icon: FaCode,
        title: 'Clean Code',
        description: 'I write maintainable, well-structured code that scales with your product.',
    },
    {
        icon: FaRocket,
        title: 'Performance First',
        description: 'Every project is optimized for speed, accessibility, and user experience.',
    },
    {
        icon: FaHeart,
        title: 'Passionate Learner',
        description: 'Always exploring new technologies and keeping up with industry trends.',
    },
    {
        icon: FaCoffee,
        title: 'Problem Solver',
        description: 'I enjoy breaking down complex problems into elegant, simple solutions.',
    },
];

const facts = [
    { label: 'Based in', value: 'Chattogram, Bangladesh' },
    { label: 'Education', value: 'BSc in CSE (ongoing)' },
    { label: 'Focus', value: 'Full Stack Web Development' },
    { label: 'Hobbies', value: 'Coding, Gaming, Chess' },
    { label: 'Languages', value: 'Bengali, English' },
    { label: 'Status', value: '🟢 Open to work' },
];

function FloatingBadge({
    children,
    style,
    delay = 0,
    amplitude = 8,
}: {
    children: React.ReactNode;
    style: React.CSSProperties;
    delay?: number;
    amplitude?: number;
}) {
    return (
        <motion.div
            animate={{ y: [0, -amplitude, 0] }}
            transition={{
                duration: 3 + delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
            style={{
                position: 'absolute',
                background: 'rgba(16,16,28,0.88)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '10px 14px',
                backdropFilter: 'blur(12px)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                zIndex: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                ...style,
            }}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 120, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
                }
            );
            gsap.to('.about-orb', {
                scale: 1.2, opacity: 0.8,
                duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                padding: '120px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background accent */}
            <div style={{
                position: 'absolute',
                top: '50%', left: '-100px',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{ marginBottom: '64px' }}
                >
                    <span className="section-tag">01 — About</span>
                    <h2 className="section-heading">
                        The person behind <span className="gradient-text">the code</span>
                    </h2>
                    <p className="section-subheading">
                        A full stack developer from Bangladesh, building digital experiences
                        that are fast, accessible, and genuinely useful.
                    </p>
                </motion.div>

                {/* Main grid — photo LEFT, text RIGHT */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '380px 1fr',
                    gap: '72px',
                    alignItems: 'start',
                }}
                    className="about-main-grid"
                >

                    {/* ── LEFT — Photo + highlight cards ─────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                        {/* Animated photo */}
                        <div
                            ref={imageRef}
                            style={{ opacity: 0 }}
                        >
                            <motion.div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformPerspective: 800,
                                    transformStyle: 'preserve-3d',
                                    position: 'relative',
                                }}
                            >
                                {/* Glow orb */}
                                <div
                                    className="about-orb"
                                    style={{
                                        position: 'absolute',
                                        inset: '-20px',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
                                        filter: 'blur(20px)',
                                        zIndex: 0,
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Image */}
                                <div style={{
                                    position: 'relative', zIndex: 1,
                                    borderRadius: '24px', overflow: 'hidden',
                                    background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))',
                                    border: '1px solid rgba(124,58,237,0.2)',
                                    boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.1)',
                                }}>
                                    <img
                                        src="/images/profile.png"
                                        alt="Mushfiq — Full Stack Developer"
                                        style={{
                                            width: '100%', height: 'auto',
                                            display: 'block', objectFit: 'cover',
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        height: '40%',
                                        background: 'linear-gradient(to top, rgba(10,10,15,0.5), transparent)',
                                        pointerEvents: 'none',
                                    }} />
                                </div>

                                {/* Floating badges */}
                                <FloatingBadge delay={0} amplitude={6} style={{ top: '-16px', right: '-20px' }}>
                                    <span style={{ color: '#22c55e', marginRight: '6px' }}>⚡</span>
                                    Open to work
                                </FloatingBadge>

                                <FloatingBadge delay={1} amplitude={10} style={{ bottom: '24px', right: '-28px' }}>
                                    <span style={{ marginRight: '6px' }}>🚀</span>
                                    Full Stack Dev
                                </FloatingBadge>

                                <FloatingBadge delay={0.5} amplitude={7} style={{ bottom: '-16px', left: '-16px' }}>
                                    <span style={{ color: 'var(--accent-cyan)', marginRight: '6px' }}>💻</span>
                                    MERN Stack
                                </FloatingBadge>

                                {/* Floating skill pills — left side */}
                                {['React', 'Next.js', 'Node'].map((tech, i) => (
                                    <motion.div
                                        key={tech}
                                        animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                                        transition={{
                                            duration: 2.5 + i * 0.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: i * 0.8,
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: `${20 + i * 25}%`,
                                            left: '-44px',
                                            padding: '5px 10px',
                                            background: 'rgba(124,58,237,0.15)',
                                            border: '1px solid rgba(124,58,237,0.3)',
                                            borderRadius: '100px',
                                            fontSize: '0.65rem', fontWeight: 700,
                                            color: 'var(--accent-purple-light)',
                                            backdropFilter: 'blur(8px)',
                                            zIndex: 3,
                                        }}
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Highlight cards — below the photo */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                            }}
                        >
                            {highlights.map(({ icon: Icon, title, description }) => (
                                <motion.div
                                    key={title}
                                    variants={staggerItem}
                                    whileHover={{ y: -4, borderColor: 'rgba(124,58,237,0.4)' }}
                                    style={{
                                        padding: '18px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '14px',
                                        transition: 'border-color 0.2s',
                                    }}
                                >
                                    <div style={{
                                        width: '34px', height: '34px', borderRadius: '9px',
                                        background: 'rgba(124,58,237,0.12)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '10px',
                                        color: 'var(--accent-purple-light)', fontSize: '0.95rem',
                                    }}>
                                        <Icon />
                                    </div>
                                    <h4 style={{
                                        fontSize: '0.85rem', fontWeight: 600,
                                        color: 'var(--text-primary)', marginBottom: '5px',
                                    }}>
                                        {title}
                                    </h4>
                                    <p style={{
                                        fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.6,
                                    }}>
                                        {description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT — Story + facts ───────────────── */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{ position: 'sticky', top: '120px' }}
                        className="about-right-sticky"
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-space)',
                            fontSize: '1.5rem', fontWeight: 600,
                            marginBottom: '20px', color: 'var(--text-primary)',
                        }}>
                            My journey into development
                        </h3>

                        <div style={{
                            display: 'flex', flexDirection: 'column', gap: '16px',
                            color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.97rem',
                            marginBottom: '32px',
                        }}>
                            <p>
                                It started with curiosity — I wanted to understand how websites actually
                                worked under the hood. What began as tweaking HTML quickly turned into
                                a deep dive into JavaScript, then React, and eventually the full MERN stack.
                            </p>
                            <p>
                                I'm currently a CSE student at UITS, Bangladesh, where I balance academic
                                learning with hands-on project building. Most of what I know came from
                                building real things, breaking them, and figuring out why.
                            </p>
                            <p>
                                I gravitate toward projects that have a clear impact — platforms where
                                real users log in, book things, manage data, and come back the next day.
                                I care deeply about the details: the micro-animation that makes an
                                interaction feel satisfying, the loading state that keeps users informed,
                                the error message that actually helps.
                            </p>
                            <p>
                                Outside of coding, you'll find me playing chess, following tech YouTube
                                rabbit holes, or experimenting with UI concepts I'll probably never ship.
                            </p>
                        </div>

                        {/* Quick facts grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginBottom: '28px',
                        }}
                            className="facts-grid"
                        >
                            {facts.map(({ label, value }) => (
                                <motion.div
                                    key={label}
                                    whileHover={{ x: 4, borderColor: 'rgba(124,58,237,0.35)' }}
                                    style={{
                                        padding: '12px 16px',
                                        background: 'var(--glass)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '0.7rem', color: 'var(--accent-purple-light)',
                                        fontWeight: 600, letterSpacing: '0.08em',
                                        textTransform: 'uppercase', marginBottom: '4px',
                                    }}>
                                        {label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500,
                                    }}>
                                        {value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Currently building card */}
                        <div style={{
                            padding: '20px',
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))',
                            border: '1px solid rgba(124,58,237,0.2)',
                            borderRadius: '14px',
                        }}>
                            <div style={{
                                fontSize: '0.7rem', fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: 'var(--accent-cyan)', marginBottom: '6px',
                            }}>
                                Currently building
                            </div>
                            <div style={{
                                fontSize: '0.95rem', fontWeight: 600,
                                color: 'var(--text-primary)', marginBottom: '4px',
                            }}>
                                mushfiq-s-Portfolio — Next.js Portfolio
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                Next.js 15 · Framer Motion · GSAP · Lenis · TypeScript
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .about-main-grid > div:first-child {
            max-width: 340px;
            margin: 0 auto;
          }
          .about-right-sticky {
            position: relative !important;
            top: 0 !important;
          }
        }
        @media (max-width: 560px) {
          .facts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}