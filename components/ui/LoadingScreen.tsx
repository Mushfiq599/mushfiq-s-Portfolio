'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading');

    useEffect(() => {
        // Progress bar animation
        const duration = 2200;
        const interval = 16;
        const steps = duration / interval;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            // Ease-out feel — fast at start, slows near end
            const eased = Math.min(100, Math.round((1 - Math.pow(1 - current / steps, 3)) * 100));
            setProgress(eased);

            if (current >= steps) {
                clearInterval(timer);
                setPhase('reveal');

                // Hold the reveal for a moment then exit
                setTimeout(() => {
                    setPhase('exit');
                    setTimeout(onComplete, 900);
                }, 600);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'exit' && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--bg-primary)',
                        overflow: 'hidden',
                    }}
                >
                    {/* ── Background headline ─────────────────── */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        gap: '8px',
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.04, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            style={{
                                fontFamily: 'var(--font-space)',
                                fontSize: 'clamp(60px, 14vw, 180px)',
                                fontWeight: 900,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                lineHeight: 1,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Mushfiq
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.04, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                            style={{
                                fontFamily: 'var(--font-space)',
                                fontSize: 'clamp(16px, 4vw, 52px)',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--text-primary)',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Full Stack Developer
                        </motion.p>
                    </div>

                    {/* ── Grid overlay ────────────────────────── */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
              linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                        pointerEvents: 'none',
                    }} />

                    {/* ── Glow orbs ───────────────────────────── */}
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            top: '30%',
                            left: '20%',
                            width: '400px',
                            height: '400px',
                            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                            borderRadius: '50%',
                            filter: 'blur(40px)',
                            pointerEvents: 'none',
                        }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: '25%',
                            right: '15%',
                            width: '320px',
                            height: '320px',
                            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
                            borderRadius: '50%',
                            filter: 'blur(40px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* ── Center content ──────────────────────── */}
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '32px',
                    }}>

                        {/* Logo mark */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: '72px',
                                height: '72px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-space)',
                                fontSize: '1.8rem',
                                fontWeight: 900,
                                color: '#fff',
                                letterSpacing: '-0.04em',
                                boxShadow: '0 0 40px rgba(124,58,237,0.45)',
                            }}
                        >
                            M
                        </motion.div>

                        {/* Name + title */}
                        <div style={{ textAlign: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.1,
                                    marginBottom: '8px',
                                }}
                            >
                                Mushfiq
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                Full Stack Developer
                            </motion.div>
                        </div>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.55 }}
                            style={{
                                width: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {/* Track */}
                            <div style={{
                                width: '100%',
                                height: '2px',
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '2px',
                                overflow: 'hidden',
                            }}>
                                {/* Fill */}
                                <motion.div
                                    style={{
                                        height: '100%',
                                        width: `${progress}%`,
                                        background: 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))',
                                        borderRadius: '2px',
                                        transition: 'width 0.016s linear',
                                        boxShadow: '0 0 8px rgba(124,58,237,0.6)',
                                    }}
                                />
                            </div>

                            {/* Percentage */}
                            <span style={{
                                fontFamily: 'var(--font-space)',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                letterSpacing: '0.05em',
                                tabularNums: true,
                            } as React.CSSProperties}>
                                {progress}%
                            </span>
                        </motion.div>
                    </div>

                    {/* ── Reveal flash on complete ─────────────── */}
                    <AnimatePresence>
                        {phase === 'reveal' && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))',
                                    transformOrigin: 'left center',
                                    pointerEvents: 'none',
                                }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}