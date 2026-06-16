'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { fadeUp, fadeRight, staggerContainer, staggerItem, viewport } from '@/lib/animations';

const experienceData = [
    {
        title: 'Full Stack Developer (Freelance)',
        company: 'Self-Employed',
        companyUrl: 'https://github.com/Mushfiq599',
        period: '2023 — Present',
        type: 'Freelance',
        typeColor: 'var(--accent-cyan)',
        typeBg: 'rgba(6,182,212,0.1)',
        description: [
            'Designed and built full-stack web applications for clients using the MERN stack, handling everything from database design to UI implementation.',
            'Delivered StyleDecor, a full-featured decoration services booking platform with role-based dashboards, ImageBB image uploads, and JWT authentication.',
            'Built Care.xyz, a care services platform featuring Google OAuth via NextAuth, Stripe payments, Nodemailer invoicing, and multi-step booking flows.',
            'Maintained clean Git workflows with structured commits for every major feature, making codebases easy to review and hand off.',
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Tailwind CSS', 'JWT', 'Stripe'],
        highlight: true,
    },
    {
        title: 'Frontend Developer (Project-Based)',
        company: 'Programming Hero / Zapshift',
        companyUrl: 'https://web.programming-hero.com',
        period: '2022 — 2023',
        type: 'Training',
        typeColor: 'var(--accent-purple-light)',
        typeBg: 'rgba(124,58,237,0.1)',
        description: [
            'Completed an intensive full-stack web development program with structured, assessed project milestones tracked via GitHub commits.',
            'Built TaskNova, a micro-task and earning platform with a three-role coin economy (Worker, Buyer, Admin), Stripe integration, and a dark neon design system.',
            'Resolved real production challenges including MongoDB SRV DNS failures, Firebase auth race conditions, and Next.js async params issues.',
            'Developed strong habits around component reusability, code splitting with React.lazy, and performance optimization.',
        ],
        technologies: ['React', 'Next.js 15', 'Tailwind CSS v4', 'Firebase', 'MongoDB', 'Stripe', 'JWT'],
        highlight: false,
    },
    {
        title: 'Open Source Contributor',
        company: 'GitHub',
        companyUrl: 'https://github.com/Mushfiq599',
        period: '2022 — Present',
        type: 'Open Source',
        typeColor: 'var(--accent-magenta)',
        typeBg: 'rgba(236,72,153,0.1)',
        description: [
            'Actively maintain personal repositories covering full-stack projects, UI experiments, and reusable component libraries.',
            'Document projects thoroughly with structured READMEs, live demo links, and clear setup instructions for contributors.',
            'Explore new tools and patterns through side projects — from GSAP animations to Lenis smooth scrolling integrations.',
        ],
        technologies: ['Git', 'GitHub', 'Markdown', 'Vercel', 'Render'],
        highlight: false,
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            style={{
                padding: '120px 24px',
                background: 'var(--bg-secondary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background accent */}
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '-80px',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
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
                    <span className="section-tag">04 — Experience</span>
                    <h2 className="section-heading">
                        What I've <span className="gradient-text">shipped</span>
                    </h2>
                    <p className="section-subheading">
                        Real projects, real problems, real solutions — built and deployed.
                    </p>
                </motion.div>

                {/* Experience cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}
                >
                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={exp.title}
                            variants={staggerItem}
                            whileHover={{ y: -3 }}
                            style={{
                                padding: '32px',
                                background: exp.highlight
                                    ? 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(6,182,212,0.04))'
                                    : 'var(--bg-card)',
                                border: `1px solid ${exp.highlight ? 'rgba(124,58,237,0.2)' : 'var(--border)'}`,
                                borderRadius: '20px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {/* Card header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '16px',
                                marginBottom: '20px',
                            }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    {/* Icon */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: exp.typeBg,
                                        border: `1px solid ${exp.typeColor}33`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: exp.typeColor,
                                        fontSize: '1.1rem',
                                        flexShrink: 0,
                                    }}>
                                        <FaBriefcase />
                                    </div>

                                    <div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-space)',
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            color: 'var(--text-primary)',
                                            marginBottom: '4px',
                                        }}>
                                            {exp.title}
                                        </h3>
                                        <a
                                            href={exp.companyUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                fontSize: '0.875rem',
                                                color: exp.typeColor,
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {exp.company}
                                            <FaExternalLinkAlt style={{ fontSize: '0.65rem' }} />
                                        </a>
                                    </div>
                                </div>

                                {/* Right badges */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '8px',
                                }}>
                                    <span style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        padding: '4px 12px',
                                        borderRadius: '100px',
                                        background: exp.typeBg,
                                        color: exp.typeColor,
                                        border: `1px solid ${exp.typeColor}33`,
                                        letterSpacing: '0.05em',
                                    }}>
                                        {exp.type}
                                    </span>
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontSize: '0.78rem',
                                        color: 'var(--text-muted)',
                                    }}>
                                        <FaCalendarAlt style={{ color: 'var(--accent-purple-light)', fontSize: '0.7rem' }} />
                                        {exp.period}
                                    </span>
                                </div>
                            </div>

                            {/* Bullet points */}
                            < ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginBottom: '20px',
                                paddingLeft: '0',
                            }}>
                                {exp.description.map((point, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '0.875rem',
                                            color: 'var(--text-muted)',
                                            lineHeight: 1.65,
                                        }}
                                    >
                                        <span style={{
                                            flexShrink: 0,
                                            marginTop: '8px',
                                            width: '5px',
                                            height: '5px',
                                            borderRadius: '50%',
                                            background: exp.typeColor,
                                        }} />
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {/* Tech tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {exp.technologies.map((tech) => (
                                    <span
                                        key={tech}
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
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        marginTop: '48px',
                        padding: '32px',
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(6,182,212,0.04))',
                        border: '1px solid rgba(124,58,237,0.15)',
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px',
                    }}
                >
                    <div>
                        <div style={{
                            fontFamily: 'var(--font-space)',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '4px',
                        }}>
                            Want to work together?
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            I'm open to freelance projects, internships, and full-time roles.
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '10px 22px',
                                background: 'transparent',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Download Resume ↓
                        </motion.a>
                        <motion.button
                            onClick={() =>
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                            }
                            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(124,58,237,0.35)' }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '10px 22px',
                                background: 'var(--accent-purple)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                            }}
                        >
                            Get In Touch →
                        </motion.button>
                    </div>
                </motion.div>
            </div >
        </section >
    );
}