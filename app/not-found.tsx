'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function NotFound() {
    const glitchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Glitch animation on the 404
            gsap.to('.glitch-text', {
                skewX: 2,
                duration: 0.1,
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                ease: 'power4.inOut',
            });

            // Floating orbs
            gsap.to('.orb-404-1', {
                x: 40, y: -30, duration: 5,
                repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
            gsap.to('.orb-404-2', {
                x: -30, y: 40, duration: 6,
                repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
            });
        }, glitchRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={glitchRef}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden',
                padding: '24px',
            }}
        >
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div className="orb-404-1" style={{
                    position: 'absolute', top: '20%', left: '15%',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(40px)',
                }} />
                <div className="orb-404-2" style={{
                    position: 'absolute', bottom: '20%', right: '15%',
                    width: '350px', height: '350px',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(40px)',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '560px',
                }}
            >
                {/* 404 number */}
                <div
                    className="glitch-text"
                    style={{
                        fontFamily: 'var(--font-space)',
                        fontSize: 'clamp(100px, 20vw, 180px)',
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: '-0.05em',
                        background: 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-cyan))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '8px',
                        position: 'relative',
                    }}
                >
                    404
                    {/* Glitch layers */}
                    <span style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, var(--accent-magenta), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        clipPath: 'inset(30% 0 50% 0)',
                        transform: 'translate(-3px, 0)',
                        opacity: 0.6,
                    }}>
                        404
                    </span>
                    <span style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple-light))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        clipPath: 'inset(60% 0 20% 0)',
                        transform: 'translate(3px, 0)',
                        opacity: 0.6,
                    }}>
                        404
                    </span>
                </div>

                {/* Code-style label */}
                <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.85rem',
                    color: 'var(--accent-cyan)',
                    marginBottom: '20px',
                    letterSpacing: '0.05em',
                }}>
                    <span style={{ color: 'var(--text-muted)' }}>{'// '}</span>
                    Error: Page not found
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                }}>
                    This page doesn't exist
                </h1>

                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: '40px',
                    maxWidth: '380px',
                    margin: '0 auto 40px',
                }}>
                    Looks like you took a wrong turn. The page you're
                    looking for has been moved, deleted, or never existed.
                </p>

                {/* Code block */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '32px',
                    textAlign: 'left',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.8rem',
                }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--accent-purple-light)' }}>const</span>{' '}
                        <span style={{ color: 'var(--accent-cyan)' }}>page</span>{' '}
                        <span style={{ color: 'var(--text-muted)' }}>=</span>{' '}
                        <span style={{ color: '#f59e0b' }}>await</span>{' '}
                        <span style={{ color: 'var(--text-primary)' }}>findPage</span>
                        <span style={{ color: 'var(--text-muted)' }}>(url);</span>
                    </div>
                    <div style={{ color: 'var(--accent-magenta)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{'// '}</span>
                        Returns: <span style={{ color: 'var(--accent-magenta)' }}>null</span>
                        <span style={{ color: 'var(--text-muted)' }}> ← you are here</span>
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '13px 28px',
                                background: 'var(--accent-purple)',
                                color: '#fff',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            ← Back to Home
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            href="/#contact"
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
                            Contact Me
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}