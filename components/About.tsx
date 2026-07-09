'use client';

import { motion } from 'framer-motion';
import { FaCode, FaHeart, FaRocket, FaCoffee } from 'react-icons/fa';
import {
    fadeUp, fadeLeft, fadeRight,
    staggerContainer, staggerItem, viewport
} from '@/lib/animations';

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
    { label: 'Education', value: 'BSc in CSE (Graduated)' },
    { label: 'Focus', value: 'Full Stack Web Development' },
    { label: 'Hobbies', value: 'Coding, Football, Chess' },
    { label: 'Languages', value: 'Bengali, English' },
    { label: 'Status', value: '🟢 Open to work' },
];

export default function About() {
    return (
        <section
            id="about"
            style={{
                padding: '120px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle background accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
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

                {/* Main two-column layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '64px',
                    alignItems: 'start',
                    marginBottom: '80px',
                }}
                    className="about-grid"
                >
                    {/* Left — Story */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-space)',
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            marginBottom: '20px',
                            color: 'var(--text-primary)',
                        }}>
                            My journey into development
                        </h3>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            fontSize: '0.97rem',
                        }}>
                            <p>
                                It started with pure curiosity. I just wanted to see how websites actually worked under the hood. What began as messing around with basic HTML quickly spiraled into a deep dive through JavaScript, then React, and eventually the full MERN stack.
                            </p>
                            <p>
                                I recently graduated with a CSE degree from BGC Trust University, Bangladesh. While school gave me the fundamentals, the real learning happened when I was building hands-on projects, which usually involved breaking things and then spending hours figuring out why.
                            </p>
                            <p>
                                I’ve always gravitated toward building things with a purpose, like platforms where real people log in, manage data, and actually come back the next day. I'm also a bit obsessive over the details, whether it's a micro-animation that makes a button click feel satisfying, a proper loading state, or an error message that actually makes sense to a human.
                            </p>
                            <p>
                                When I’m not staring at a code editor, I’m usually playing chess, falling down tech YouTube rabbit holes, or messing around with UI concepts that will probably never see the light of day.
                            </p>
                        </div>

                        {/* Quick facts */}
                        <div style={{
                            marginTop: '32px',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                        }}>
                            {facts.map(({ label, value }) => (
                                <div
                                    key={label}
                                    style={{
                                        padding: '12px 16px',
                                        background: 'var(--glass)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: 'var(--accent-purple-light)',
                                        fontWeight: 600,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        marginBottom: '4px',
                                    }}>
                                        {label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-primary)',
                                        fontWeight: 500,
                                    }}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Highlights */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                            alignContent: 'start',
                        }}
                    >
                        {highlights.map(({ icon: Icon, title, description }) => (
                            <motion.div
                                key={title}
                                variants={staggerItem}
                                whileHover={{ y: -4, borderColor: 'rgba(124,58,237,0.4)' }}
                                style={{
                                    padding: '24px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '16px',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'rgba(124,58,237,0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '14px',
                                    color: 'var(--accent-purple-light)',
                                    fontSize: '1.1rem',
                                }}>
                                    <Icon />
                                </div>
                                <h4 style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    marginBottom: '8px',
                                }}>
                                    {title}
                                </h4>
                                <p style={{
                                    fontSize: '0.82rem',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.6,
                                }}>
                                    {description}
                                </p>
                            </motion.div>
                        ))}

                        {/* What I'm currently working on */}
                        <motion.div
                            variants={staggerItem}
                            style={{
                                gridColumn: '1 / -1',
                                padding: '24px',
                                background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.06))',
                                border: '1px solid rgba(124,58,237,0.2)',
                                borderRadius: '16px',
                            }}
                        >
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--accent-cyan)',
                                marginBottom: '8px',
                            }}>
                                Currently building
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '4px',
                            }}>
                                English Janala — Next.js Learning Platform
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                            }}>
                                Firebase Auth · Tailwind CSS v4 · Next.js 15 · localStorage
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
        </section>
    );
}