'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMedal } from 'react-icons/fa';
import { fadeUp, fadeLeft, staggerContainer, staggerItem, viewport } from '@/lib/animations';

const educationData = [
    {
        degree: 'Bachelor of Science in Computer Science & Engineering',
        institution: 'University of Information Technology & Sciences (UITS)',
        period: '2023 — Present',
        description:
            'Studying core CS fundamentals including data structures, algorithms, operating systems, and database management. Actively applying academic knowledge through real-world full-stack projects alongside coursework.',
        grade: 'Ongoing',
        tags: ['Data Structures', 'Algorithms', 'OOP', 'Database Systems', 'Networking'],
        highlight: true,
    },
    {
        degree: 'Higher Secondary Certificate (HSC) — Science',
        institution: 'Chattogram College, Chattogram',
        period: '2020 — 2022',
        description:
            'Completed HSC with a focus on Physics, Chemistry, and Mathematics. Built strong analytical and logical thinking foundations that directly support my engineering studies.',
        grade: 'GPA 4.42 / 5.00',
        tags: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
        highlight: false,
    },
    {
        degree: 'Secondary School Certificate (SSC) — Science',
        institution: 'Chattogram Grammar School',
        period: '2018 — 2020',
        description:
            'Completed SSC with distinction. First exposure to computer science basics through the ICT subject, which sparked an interest in technology and problem-solving.',
        grade: 'GPA 4.78 / 5.00',
        tags: ['ICT', 'Mathematics', 'Science'],
        highlight: false,
    },
];

export default function Education() {
    return (
        <section
            id="education"
            style={{
                padding: '120px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background accent */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{ marginBottom: '64px' }}
                >
                    <span className="section-tag">03 — Education</span>
                    <h2 className="section-heading">
                        Academic <span className="gradient-text">background</span>
                    </h2>
                    <p className="section-subheading">
                        The formal foundation behind the hands-on skills.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>

                    {/* Vertical line */}
                    <div style={{
                        position: 'absolute',
                        left: '28px',
                        top: '0',
                        bottom: '0',
                        width: '1px',
                        background: 'linear-gradient(to bottom, var(--accent-purple), rgba(124,58,237,0.1))',
                    }}
                        className="timeline-line"
                    />

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '40px',
                    }}>
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={edu.degree}
                                variants={fadeLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    display: 'flex',
                                    gap: '40px',
                                    alignItems: 'flex-start',
                                }}
                                className="timeline-row"
                            >
                                {/* Icon node */}
                                <div style={{
                                    flexShrink: 0,
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: edu.highlight
                                        ? 'var(--accent-purple)'
                                        : 'var(--bg-card)',
                                    border: `2px solid ${edu.highlight ? 'var(--accent-purple)' : 'var(--border)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: edu.highlight ? '#fff' : 'var(--text-muted)',
                                    fontSize: '1.2rem',
                                    zIndex: 1,
                                    boxShadow: edu.highlight
                                        ? '0 0 24px rgba(124,58,237,0.4)'
                                        : 'none',
                                }}>
                                    <FaGraduationCap />
                                </div>

                                {/* Card */}
                                <motion.div
                                    whileHover={{ y: -3, borderColor: 'rgba(124,58,237,0.35)' }}
                                    style={{
                                        flex: 1,
                                        padding: '28px 32px',
                                        background: edu.highlight
                                            ? 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.04))'
                                            : 'var(--bg-card)',
                                        border: `1px solid ${edu.highlight ? 'rgba(124,58,237,0.25)' : 'var(--border)'}`,
                                        borderRadius: '16px',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {/* Top row */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        flexWrap: 'wrap',
                                        gap: '12px',
                                        marginBottom: '12px',
                                    }}>
                                        <div>
                                            <h3 style={{
                                                fontFamily: 'var(--font-space)',
                                                fontSize: '1.05rem',
                                                fontWeight: 700,
                                                color: 'var(--text-primary)',
                                                marginBottom: '4px',
                                            }}>
                                                {edu.degree}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.875rem',
                                                color: edu.highlight
                                                    ? 'var(--accent-cyan)'
                                                    : 'var(--text-muted)',
                                                fontWeight: 500,
                                            }}>
                                                {edu.institution}
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            gap: '6px',
                                        }}>
                                            {/* Period */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontSize: '0.78rem',
                                                color: 'var(--text-muted)',
                                            }}>
                                                <FaCalendarAlt style={{ color: 'var(--accent-purple-light)' }} />
                                                {edu.period}
                                            </div>

                                            {/* Grade */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontSize: '0.78rem',
                                                fontWeight: 600,
                                                color: 'var(--accent-purple-light)',
                                                background: 'rgba(124,58,237,0.1)',
                                                padding: '3px 10px',
                                                borderRadius: '100px',
                                            }}>
                                                <FaMedal />
                                                {edu.grade}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-muted)',
                                        lineHeight: 1.7,
                                        marginBottom: '16px',
                                    }}>
                                        {edu.description}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {edu.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    fontSize: '0.72rem',
                                                    fontWeight: 600,
                                                    padding: '3px 10px',
                                                    borderRadius: '100px',
                                                    background: 'var(--glass)',
                                                    border: '1px solid var(--border)',
                                                    color: 'var(--text-muted)',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 640px) {
          .timeline-line { left: 20px !important; }
          .timeline-row { gap: 20px !important; }
          .timeline-row > div:first-child {
            width: 40px !important;
            height: 40px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
        </section>
    );
}