'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCheckCircle, FaRocket } from 'react-icons/fa';
import { modalVariants, overlayVariants } from '@/lib/animations';
import { Project } from '@/types';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [project]);

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.75)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 200,
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'min(780px, 92vw)',
                            maxHeight: '88vh',
                            overflowY: 'auto',
                            background: 'var(--bg-secondary)',
                            border: '1px solid rgba(124,58,237,0.25)',
                            borderRadius: '24px',
                            zIndex: 201,
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {/* Project image */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16/7',
                            overflow: 'hidden',
                            borderRadius: '24px 24px 0 0',
                        }}>
                            <img
                                src={project.image}
                                alt={project.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            {/* Gradient overlay on image */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 40%, var(--bg-secondary))',
                            }} />

                            {/* Close button */}
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.1, background: 'rgba(124,58,237,0.3)' }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    backdropFilter: 'blur(8px)',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <FaTimes />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '32px' }}>

                            {/* Title + links */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '16px',
                                marginBottom: '16px',
                            }}>
                                <h2 style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '1.6rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.02em',
                                }}>
                                    {project.title}
                                </h2>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            padding: '8px 16px',
                                            background: 'var(--glass)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.82rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <FaGithub /> GitHub
                                    </motion.a>
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            padding: '8px 16px',
                                            background: 'var(--accent-purple)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '0.82rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <FaExternalLinkAlt /> Live Demo
                                    </motion.a>
                                </div>
                            </div>

                            {/* Tech stack */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                                marginBottom: '24px',
                            }}>
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        style={{
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            background: 'rgba(124,58,237,0.1)',
                                            border: '1px solid rgba(124,58,237,0.2)',
                                            color: 'var(--accent-purple-light)',
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{
                                height: '1px',
                                background: 'var(--border)',
                                marginBottom: '24px',
                            }} />

                            {/* Detailed description */}
                            <div style={{ marginBottom: '28px' }}>
                                <h3 style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'var(--accent-cyan)',
                                    marginBottom: '10px',
                                }}>
                                    About the project
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.75,
                                }}>
                                    {project.detailedDescription}
                                </p>
                            </div>

                            {/* Two columns — challenges + improvements */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                            }}
                                className="modal-two-col"
                            >
                                {/* Challenges */}
                                <div style={{
                                    padding: '20px',
                                    background: 'rgba(236,72,153,0.05)',
                                    border: '1px solid rgba(236,72,153,0.15)',
                                    borderRadius: '12px',
                                }}>
                                    <h3 style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'var(--accent-magenta)',
                                        marginBottom: '14px',
                                    }}>
                                        Challenges faced
                                    </h3>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {project.challenges.map((challenge, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    display: 'flex',
                                                    gap: '8px',
                                                    fontSize: '0.82rem',
                                                    color: 'var(--text-muted)',
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                <span style={{
                                                    flexShrink: 0,
                                                    marginTop: '6px',
                                                    width: '5px',
                                                    height: '5px',
                                                    borderRadius: '50%',
                                                    background: 'var(--accent-magenta)',
                                                }} />
                                                {challenge}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Future improvements */}
                                <div style={{
                                    padding: '20px',
                                    background: 'rgba(6,182,212,0.05)',
                                    border: '1px solid rgba(6,182,212,0.15)',
                                    borderRadius: '12px',
                                }}>
                                    <h3 style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'var(--accent-cyan)',
                                        marginBottom: '14px',
                                    }}>
                                        Future roadmap
                                    </h3>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {project.improvements.map((item, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    display: 'flex',
                                                    gap: '8px',
                                                    fontSize: '0.82rem',
                                                    color: 'var(--text-muted)',
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                <FaRocket style={{
                                                    flexShrink: 0,
                                                    marginTop: '3px',
                                                    color: 'var(--accent-cyan)',
                                                    fontSize: '0.7rem',
                                                }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <style>{`
            @media (max-width: 600px) {
              .modal-two-col {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
                </>
            )}
        </AnimatePresence>
    );
}