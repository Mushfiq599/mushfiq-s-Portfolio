'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { fadeUp, viewport } from '@/lib/animations';
import { FaX } from 'react-icons/fa6';

const navLinks = [
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Education', href: 'education' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
];

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Mushfiq599', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/mush-fiq', label: 'LinkedIn' },
    { icon: FaX, href: 'https://x.com/MushFiq72288867', label: 'X' },
];

export default function Footer() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--border)',
            padding: '60px 24px 32px',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Subtle top glow */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '500px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--accent-purple), transparent)',
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Top row */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '40px',
                        marginBottom: '48px',
                    }}
                >
                    {/* Brand */}
                    <div style={{ maxWidth: '300px' }}>
                        <button
                            onClick={scrollToTop}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontFamily: 'var(--font-space)',
                                fontSize: '1.6rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.03em',
                                marginBottom: '12px',
                                display: 'block',
                            }}
                        >
                            M<span style={{ color: 'var(--accent-purple)' }}>.</span>
                        </button>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.7,
                        }}>
                            Full Stack Developer from Bangladesh, building fast and
                            beautiful web experiences with the MERN stack and Next.js.
                        </p>

                        {/* Social icons */}
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '20px',
                        }}>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    whileHover={{
                                        scale: 1.12,
                                        borderColor: 'rgba(124,58,237,0.5)',
                                        color: 'var(--accent-purple-light)',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '9px',
                                        border: '1px solid var(--border)',
                                        background: 'var(--glass)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Nav links */}
                    <div>
                        <p style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-purple-light)',
                            marginBottom: '16px',
                        }}>
                            Navigation
                        </p>
                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}>
                            {navLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <motion.button
                                        onClick={() => scrollTo(href)}
                                        whileHover={{ x: 4, color: 'var(--text-primary)' }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-muted)',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            padding: 0,
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        {label}
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Currently open to */}
                    <div style={{ maxWidth: '220px' }}>
                        <p style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-purple-light)',
                            marginBottom: '16px',
                        }}>
                            Open to
                        </p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}>
                            {['Freelance Projects', 'Internships', 'Full-time Roles', 'Open Source'].map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '0.85rem',
                                        color: 'var(--text-muted)',
                                    }}
                                >
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--accent-purple)',
                                        flexShrink: 0,
                                    }} />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Resume download */}
                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginTop: '20px',
                                padding: '9px 18px',
                                background: 'var(--accent-purple)',
                                color: '#fff',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Download Resume ↓
                        </motion.a>
                    </div>
                </motion.div>

                {/* Divider */}
                <div style={{
                    height: '1px',
                    background: 'var(--border)',
                    marginBottom: '28px',
                }} />

                {/* Bottom row */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                    }}
                >
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        flexWrap: 'wrap',
                    }}>
                        © {new Date().getFullYear()} Mushfiq. Built with
                        <FaHeart style={{ color: 'var(--accent-magenta)', fontSize: '0.7rem' }} />
                        using Next.js + Framer Motion + GSAP
                    </p>

                    {/* Back to top */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{
                            scale: 1.05,
                            borderColor: 'rgba(124,58,237,0.4)',
                            color: 'var(--accent-purple-light)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '7px 14px',
                            background: 'var(--glass)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            color: 'var(--text-muted)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Back to top ↑
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
}