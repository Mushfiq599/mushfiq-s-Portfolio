'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarVariants, fadeIn } from '@/lib/animations';

const navItems = [
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Education', href: 'education' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'GitHub', href: 'github' },
    { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Highlight active nav link based on scroll position
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        navItems.forEach(({ href }) => {
            const el = document.getElementById(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: scrolled ? '12px 0' : '20px 0',
                
                background: scrolled
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(124,58,237,0.04) 50%, rgba(6,182,212,0.03) 100%)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
                boxShadow: scrolled
                    ? '0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 32px rgba(0,0,0,0.25)'
                    : 'none',
                transition: 'all 0.4s ease',
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>

                {/* Logo */}
                <motion.button
                    onClick={() => scrollTo('home')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontFamily: 'var(--font-space)',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                    }}
                >
                    M<span style={{ color: 'var(--accent-purple)' }}>.</span>
                </motion.button>

                {/* Desktop Nav */}
                <ul style={{
                    display: 'flex',
                    gap: '8px',
                    listStyle: 'none',
                    alignItems: 'center',
                }}
                    className="desktop-nav"
                >
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <motion.button
                                onClick={() => scrollTo(item.href)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: activeSection === item.href
                                        ? 'rgba(124, 58, 237, 0.12)'
                                        : 'none',
                                    border: activeSection === item.href
                                        ? '1px solid rgba(124, 58, 237, 0.25)'
                                        : '1px solid transparent',
                                    borderRadius: '8px',
                                    padding: '7px 16px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: activeSection === item.href
                                        ? 'var(--accent-purple-light)'
                                        : 'var(--text-muted)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {item.label}
                            </motion.button>
                        </li>
                    ))}

                    {/* Resume button */}
                    <li>
                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 18px',
                                background: 'var(--accent-purple)',
                                color: '#fff',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                marginLeft: '8px',
                            }}
                        >
                            Resume ↓
                        </motion.a>
                    </li>
                </ul>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-menu-btn"
                    aria-label="Toggle menu"
                    style={{
                        display: 'none',
                        flexDirection: 'column',
                        gap: '5px',
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            animate={{
                                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                                y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }}
                            style={{
                                display: 'block',
                                width: '24px',
                                height: '2px',
                                background: 'var(--text-primary)',
                                borderRadius: '2px',
                                transformOrigin: 'center',
                            }}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            overflow: 'hidden',
                            background: 'rgba(10, 10, 15, 0.97)',
                            borderTop: '1px solid var(--border)',
                        }}
                    >
                        <ul style={{
                            listStyle: 'none',
                            padding: '16px 24px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}>
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <button
                                        onClick={() => scrollTo(item.href)}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            background: 'none',
                                            border: 'none',
                                            padding: '12px 0',
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            color: activeSection === item.href
                                                ? 'var(--accent-purple-light)'
                                                : 'var(--text-muted)',
                                            borderBottom: '1px solid var(--border)',
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{ marginTop: '12px' }}
                            >
                                <a
                                    href="/resume.pdf"
                                    download
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '12px',
                                        background: 'var(--accent-purple)',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                    }}
                                >
                                    Download Resume ↓
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </motion.nav >
    );
}