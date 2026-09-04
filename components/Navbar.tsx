'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarVariants } from '@/lib/animations';
import LogoMark from '@/components/ui/LogoMark';

const desktopNavItems = [
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Education', href: 'education' },
    { label: 'Experience', href: 'experience' },
    { label: 'Certificate', href: 'certificates' },
    { label: 'Projects', href: 'projects' },
    { label: 'GitHub', href: 'github' },
    { label: 'Contact', href: 'contact' },
];

const mobileNavItems = [
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
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

    // Highlight active nav link
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        desktopNavItems.forEach(({ href }) => {
            const el = document.getElementById(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return (
        <motion.nav
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
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
                    whileTap={{ scale: 0.97 }}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <LogoMark size="navbar" />
                </motion.button>

                {/* Desktop Nav */}
                <ul
                    style={{
                        display: 'flex',
                        gap: '4px',
                        listStyle: 'none',
                        alignItems: 'center',
                        margin: 0,
                        padding: 0,
                    }}
                    className="desktop-nav"
                >
                    {desktopNavItems.map((item) => (
                        <li key={item.href}>
                            <motion.button
                                onClick={() => scrollTo(item.href)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: activeSection === item.href
                                        ? 'rgba(124,58,237,0.12)'
                                        : 'none',
                                    border: activeSection === item.href
                                        ? '1px solid rgba(124,58,237,0.25)'
                                        : '1px solid transparent',
                                    borderRadius: '8px',
                                    padding: '7px 14px',
                                    fontSize: '0.82rem',
                                    fontWeight: 500,
                                    color: activeSection === item.href
                                        ? 'var(--accent-purple-light)'
                                        : 'var(--text-muted)',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.label}
                            </motion.button>
                        </li>
                    ))}

                    {/* Resume button */}
                    <li style={{ marginLeft: '8px' }}>
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 18px',
                                background: 'var(--accent-purple)',
                                color: '#fff',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Resume ↗
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
                        zIndex: 110,
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
                            transition={{ duration: 0.25 }}
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
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 98,
                            }}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{
                                position: 'fixed',
                                top: 0, right: 0, bottom: 0,
                                width: 'min(300px, 80vw)',
                                background: 'rgba(16,16,28,0.98)',
                                backdropFilter: 'blur(20px)',
                                borderLeft: '1px solid var(--border)',
                                zIndex: 99,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '80px 24px 32px',
                                overflowY: 'auto',
                            }}
                        >
                            {/* Nav links */}
                            <ul style={{
                                listStyle: 'none',
                                margin: 0, padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                flex: 1,
                            }}>
                                {mobileNavItems.map((item, i) => (
                                    <motion.li
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06, duration: 0.3 }}
                                    >
                                        <button
                                            onClick={() => scrollTo(item.href)}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: activeSection === item.href
                                                    ? 'rgba(124,58,237,0.1)'
                                                    : 'none',
                                                border: 'none',
                                                borderRadius: '10px',
                                                padding: '14px 16px',
                                                fontSize: '1rem',
                                                fontWeight: activeSection === item.href ? 700 : 500,
                                                color: activeSection === item.href
                                                    ? 'var(--accent-purple-light)'
                                                    : 'var(--text-muted)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {item.label}
                                            {activeSection === item.href && (
                                                <span style={{
                                                    width: '6px', height: '6px',
                                                    borderRadius: '50%',
                                                    background: 'var(--accent-purple)',
                                                }} />
                                            )}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Divider */}
                            <div style={{
                                height: '1px',
                                background: 'var(--border)',
                                margin: '20px 0',
                            }} />

                            {/* Resume + social */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                            >
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '13px',
                                        background: 'var(--accent-purple)',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    View Resume ↗
                                </a>

                                {/* Quick links */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '8px',
                                }}>
                                    {[
                                        { label: 'Education', href: 'education' },
                                        { label: 'Experience', href: 'experience' },
                                        { label: 'Certificate', href: 'certificates' },
                                        { label: 'All Sections', href: 'about' },
                                    ].map(({ label, href }) => (
                                        <button
                                            key={href}
                                            onClick={() => scrollTo(href)}
                                            style={{
                                                padding: '10px 8px',
                                                background: 'var(--glass)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '8px',
                                                color: 'var(--text-muted)',
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Copyright */}
                            <div style={{
                                marginTop: '24px',
                                fontSize: '0.7rem',
                                color: 'var(--text-muted)',
                                textAlign: 'center',
                                opacity: 0.6,
                            }}>
                                © {new Date().getFullYear()} Mushfiq
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
        </motion.nav >
    );
}