'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaCode, FaHeart, FaRocket, FaCoffee } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    fadeUp, fadeRight,
    staggerContainer, staggerItem, viewport,
} from '@/lib/animations';
import CurrentlyBuilding from './ui/CurrentlyBuilding';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        icon: FaCode,
        title: 'Clean Code',
        description: 'Maintainable, well-architected code built to scale with your product.',
    },
    {
        icon: FaRocket,
        title: 'Performance First',
        description: 'Every build is optimized for speed, accessibility, and real user impact.',
    },
    {
        icon: FaHeart,
        title: 'Always Learning',
        description: 'Constantly exploring new technologies and sharpening the craft.',
    },
    {
        icon: FaCoffee,
        title: 'Problem Solver',
        description: 'I turn complex, messy problems into clean, elegant solutions.',
    },
];

const facts = [
    { label: 'Based in', value: 'Chattogram, Bangladesh' },
    { label: 'Education', value: 'BSc in CSE — UITS' },
    { label: 'Focus', value: 'Full Stack Web Dev' },
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
                background: 'rgba(14,14,22,0.92)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '10px',
                padding: '8px 13px',
                backdropFilter: 'blur(16px)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                zIndex: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
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
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 120, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(hover: none)').matches);

        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 1.1, ease: 'power3.out',
                    scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
                }
            );
            gsap.to('.about-orb', {
                scale: 1.25, opacity: 0.9,
                duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        if (isTouchDevice) return;
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                padding: '140px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background accents */}
            <div style={{
                position: 'absolute', top: '20%', left: '-120px',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '-80px',
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `
          linear-gradient(rgba(124,58,237,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.02) 1px, transparent 1px)
        `,
                backgroundSize: '72px 72px',
            }} />

            <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* ── Section header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{ marginBottom: '80px' }}
                >
                    <span className="section-tag">01 — About</span>
                    <h2 className="section-heading" style={{ marginTop: '12px' }}>
                        The person behind{' '}
                        <span className="gradient-text">the code</span>
                    </h2>
                    <p className="section-subheading" style={{ marginTop: '14px' }}>
                        A full stack developer from Bangladesh — turning ideas into
                        fast, accessible, and genuinely useful web experiences.
                    </p>
                </motion.div>

                {/* ── Main grid ── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '360px 1fr',
                        gap: '80px',
                        alignItems: 'start',
                    }}
                    className="about-main-grid"
                >

                    {/* ── LEFT — Photo + highlight cards ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

                        {/* Photo */}
                        <div ref={imageRef} style={{ opacity: 0 }}>
                            <motion.div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    rotateX: isTouchDevice ? 0 : rotateX,
                                    rotateY: isTouchDevice ? 0 : rotateY,
                                    transformPerspective: 900,
                                    transformStyle: 'preserve-3d',
                                    position: 'relative',
                                }}
                            >
                                {/* Breathing glow */}
                                <div
                                    className="about-orb"
                                    style={{
                                        position: 'absolute', inset: '-24px',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
                                        filter: 'blur(24px)',
                                        zIndex: 0, pointerEvents: 'none',
                                    }}
                                />

                                {/* Image frame */}
                                <div style={{
                                    position: 'relative', zIndex: 1,
                                    borderRadius: '22px', overflow: 'hidden',
                                    border: '1px solid rgba(124,58,237,0.22)',
                                    boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.08)',
                                    background: 'linear-gradient(160deg, rgba(124,58,237,0.08), rgba(6,182,212,0.04))',
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
                                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                                        background: 'linear-gradient(to top, rgba(10,10,15,0.55), transparent)',
                                        pointerEvents: 'none',
                                    }} />
                                </div>

                                {/* Floating badges */}
                                <FloatingBadge delay={0} amplitude={6} style={{ top: '-14px', right: '-18px' }}>
                                    <span style={{ color: '#22c55e', marginRight: '6px' }}>⚡</span>
                                    Open to work
                                </FloatingBadge>

                                <FloatingBadge delay={1} amplitude={9} style={{ bottom: '28px', right: '-26px' }}>
                                    <span style={{ marginRight: '6px' }}>🚀</span>
                                    Full Stack Dev
                                </FloatingBadge>

                                <FloatingBadge delay={0.5} amplitude={7} style={{ bottom: '-14px', left: '-14px' }}>
                                    <span style={{ color: 'var(--accent-cyan)', marginRight: '6px' }}>💻</span>
                                    MERN Stack
                                </FloatingBadge>

                                {/* Floating skill pills — hidden on mobile */}
                                {['React', 'Next.js', 'Node'].map((tech, i) => (
                                    <motion.div
                                        key={tech}
                                        animate={{ y: [0, -8, 0], opacity: [0.65, 1, 0.65] }}
                                        transition={{
                                            duration: 2.6 + i * 0.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: i * 0.8,
                                        }}
                                        className="skill-pill"
                                        style={{
                                            position: 'absolute',
                                            top: `${22 + i * 24}%`,
                                            left: '-42px',
                                            padding: '4px 10px',
                                            background: 'rgba(124,58,237,0.14)',
                                            border: '1px solid rgba(124,58,237,0.28)',
                                            borderRadius: '100px',
                                            fontSize: '0.62rem', fontWeight: 700,
                                            color: 'var(--accent-purple-light)',
                                            backdropFilter: 'blur(10px)',
                                            zIndex: 3,
                                        }}
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Highlight cards */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            {highlights.map(({ icon: Icon, title, description }) => (
                                <motion.div
                                    key={title}
                                    variants={staggerItem}
                                    whileHover={{ y: -4, borderColor: 'rgba(124,58,237,0.4)' }}
                                    style={{
                                        padding: '16px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '14px',
                                        transition: 'border-color 0.25s, transform 0.25s',
                                    }}
                                >
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '9px',
                                        background: 'rgba(124,58,237,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '10px',
                                        color: 'var(--accent-purple-light)', fontSize: '0.9rem',
                                    }}>
                                        <Icon />
                                    </div>
                                    <h4 style={{
                                        fontSize: '0.82rem', fontWeight: 700,
                                        color: 'var(--text-primary)', marginBottom: '4px',
                                        letterSpacing: '-0.01em',
                                    }}>
                                        {title}
                                    </h4>
                                    <p style={{
                                        fontSize: '0.72rem', color: 'var(--text-muted)',
                                        lineHeight: 1.65,
                                    }}>
                                        {description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT — Story + facts + currently building ── */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{ position: 'sticky', top: '120px' }}
                        className="about-right-sticky"
                    >
                        {/* Journey heading */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-space)',
                                fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2,
                            }}>
                                My journey into development
                            </h3>
                            <div style={{
                                width: '40px', height: '3px',
                                background: 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))',
                                borderRadius: '2px',
                                marginTop: '10px',
                            }} />
                        </div>

                        {/* Story */}
                        <div style={{
                            display: 'flex', flexDirection: 'column', gap: '14px',
                            marginBottom: '36px',
                        }}>
                            <p style={{
                                fontSize: '0.95rem', color: 'var(--text-muted)',
                                lineHeight: 1.85, margin: 0,
                            }}>
                                It didn't start with a plan — it started with a question.{' '}
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                    How does this actually work?
                                </span>{' '}
                                That single question pulled me into a rabbit hole of HTML, then CSS,
                                then JavaScript — and I never came back out. What began as curiosity
                                became conviction.
                            </p>
                            <p style={{
                                fontSize: '0.95rem', color: 'var(--text-muted)',
                                lineHeight: 1.85, margin: 0,
                            }}>
                                Today I build across the full stack — crafting React and Next.js frontends
                                that feel alive, backed by Node.js APIs and MongoDB databases that scale.
                                I'm a CSE student at UITS by day, and a relentless builder by night.
                                Most of what I know came from shipping real things,{' '}
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                    watching them break,
                                </span>{' '}
                                and understanding exactly why.
                            </p>
                            <p style={{
                                fontSize: '0.95rem', color: 'var(--text-muted)',
                                lineHeight: 1.85, margin: 0,
                            }}>
                                I'm drawn to products that matter — platforms where real users return,
                                real decisions get made, and real value is created. The details obsess me:
                                the animation that makes an interaction feel satisfying, the error message
                                that actually guides instead of confuses, the loading state that earns trust.
                            </p>
                            <p style={{
                                fontSize: '0.95rem', color: 'var(--text-muted)',
                                lineHeight: 1.85, margin: 0,
                            }}>
                                When I'm not writing code, I'm studying chess endgames, going down tech
                                YouTube rabbit holes, or prototyping UI ideas that may never ship —
                                but always teach me something new.
                            </p>
                        </div>

                        {/* Facts grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginBottom: '24px',
                        }}
                            className="facts-grid"
                        >
                            {facts.map(({ label, value }) => (
                                <motion.div
                                    key={label}
                                    whileHover={{ x: 4, borderColor: 'rgba(124,58,237,0.35)' }}
                                    style={{
                                        padding: '12px 14px',
                                        background: 'var(--glass)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '0.65rem', color: 'var(--accent-purple-light)',
                                        fontWeight: 700, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', marginBottom: '4px',
                                    }}>
                                        {label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.855rem', color: 'var(--text-primary)', fontWeight: 500,
                                    }}>
                                        {value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Currently building */}
                        <CurrentlyBuilding />
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 960px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .about-main-grid > div:first-child {
            max-width: 360px;
            margin: 0 auto;
          }
          .about-right-sticky {
            position: relative !important;
            top: 0 !important;
          }
          .skill-pill {
            display: none !important;
          }
        }
        @media (max-width: 560px) {
          .facts-grid {
            grid-template-columns: 1fr !important;
          }
          .about-main-grid > div:first-child {
            max-width: 100% !important;
          }
        }
      `}</style>
        </section>
    );
}