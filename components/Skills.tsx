'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaDatabase, FaGitAlt,
    FaDocker, FaFigma,
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb,
    SiFirebase, SiExpress, SiJavascript, SiHtml5,
    SiCss, SiGithub, SiVercel, SiPostman,
} from 'react-icons/si';
import {
    staggerContainer, staggerItem, fadeUp, viewport
} from '@/lib/animations';

const categories = [
    {
        title: 'Frontend',
        color: 'var(--accent-purple)',
        colorBg: 'rgba(124,58,237,0.08)',
        colorBorder: 'rgba(124,58,237,0.2)',
        skills: [
            { name: 'React', icon: FaReact, level: 90 },
            { name: 'Next.js', icon: SiNextdotjs, level: 82 },
            { name: 'JavaScript', icon: SiJavascript, level: 88 },
            { name: 'TypeScript', icon: SiTypescript, level: 70 },
            { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 },
            { name: 'HTML5', icon: SiHtml5, level: 95 },
            { name: 'CSS3', icon: SiCss, level: 90 },
        ],
    },
    {
        title: 'Backend',
        color: 'var(--accent-cyan)',
        colorBg: 'rgba(6,182,212,0.08)',
        colorBorder: 'rgba(6,182,212,0.2)',
        skills: [
            { name: 'Node.js', icon: FaNodeJs, level: 82 },
            { name: 'Express.js', icon: SiExpress, level: 80 },
            { name: 'MongoDB', icon: SiMongodb, level: 78 },
            { name: 'Firebase', icon: SiFirebase, level: 75 },
            { name: 'REST APIs', icon: FaDatabase, level: 85 },
        ],
    },
    {
        title: 'Tools & DevOps',
        color: 'var(--accent-magenta)',
        colorBg: 'rgba(236,72,153,0.08)',
        colorBorder: 'rgba(236,72,153,0.2)',
        skills: [
            { name: 'Git', icon: FaGitAlt, level: 85 },
            { name: 'GitHub', icon: SiGithub, level: 88 },
            { name: 'Vercel', icon: SiVercel, level: 80 },
            { name: 'Figma', icon: FaFigma, level: 65 },
        ],
    },
];

// Infinite scrolling ticker of all skill names
const allSkills = categories.flatMap((c) => c.skills.map((s) => s.name));

function SkillBar({
    level, color, animate,
}: {
    level: number; color: string; animate: boolean;
}) {
    return (
        <div style={{
            height: '4px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginTop: '6px',
        }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: animate ? `${level}%` : 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{
                    height: '100%',
                    background: color,
                    borderRadius: '4px',
                }}
            />
        </div>
    );
}

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

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
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '300px',
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
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
                    <span className="section-tag">02 — Skills</span>
                    <h2 className="section-heading">
                        Technologies I <span className="gradient-text">work with</span>
                    </h2>
                    <p className="section-subheading">
                        A curated toolkit built through real projects, not just tutorials.
                    </p>
                </motion.div>

                {/* Skill categories */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    marginBottom: '64px',
                }}
                    className="skills-grid"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            style={{
                                padding: '28px',
                                background: category.colorBg,
                                border: `1px solid ${category.colorBorder}`,
                                borderRadius: '20px',
                            }}
                        >
                            {/* Category title */}
                            <motion.div variants={staggerItem}>
                                <h3 style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: category.color,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    marginBottom: '24px',
                                    paddingBottom: '12px',
                                    borderBottom: `1px solid ${category.colorBorder}`,
                                }}>
                                    {category.title}
                                </h3>
                            </motion.div>

                            {/* Skills list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                {category.skills.map(({ name, icon: Icon, level }) => (
                                    <motion.div
                                        key={name}
                                        variants={staggerItem}
                                        whileHover={{ x: 4 }}
                                        style={{ transition: 'transform 0.2s' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: '2px',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}>
                                                <Icon style={{ color: category.color, fontSize: '1rem' }} />
                                                <span style={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 500,
                                                    color: 'var(--text-primary)',
                                                }}>
                                                    {name}
                                                </span>
                                            </div>
                                            <span style={{
                                                fontSize: '0.72rem',
                                                color: 'var(--text-muted)',
                                                fontWeight: 600,
                                            }}>
                                                {level}%
                                            </span>
                                        </div>
                                        <SkillBar
                                            level={level}
                                            color={category.color}
                                            animate={true}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Infinite scrolling ticker */}
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
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '80px',
                            background: 'linear-gradient(to right, var(--bg-secondary), transparent)',
                            zIndex: 2,
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '80px',
                            background: 'linear-gradient(to left, var(--bg-secondary), transparent)',
                            zIndex: 2,
                            pointerEvents: 'none',
                        }} />

                        <motion.div
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{
                                display: 'flex',
                                gap: '32px',
                                width: 'max-content',
                            }}
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
                                        width: '4px',
                                        height: '4px',
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
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .skills-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}