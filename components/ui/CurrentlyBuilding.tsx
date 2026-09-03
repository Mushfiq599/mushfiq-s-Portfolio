'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCodeBranch } from 'react-icons/fa';

interface LatestRepo {
    name: string;
    description: string;
    url: string;
    techs: string[];
    lastCommit: string;
    timeAgo: string;
    language: string;
    stars: number;
}

export default function CurrentlyBuilding() {
    const [repo, setRepo] = useState<LatestRepo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/github/latest')
            .then((r) => r.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                setRepo(data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '14px',
            }}>
                <div style={{
                    height: '10px', width: '120px', borderRadius: '4px', marginBottom: '12px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                }} />
                <div style={{
                    height: '16px', width: '200px', borderRadius: '4px', marginBottom: '8px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                }} />
                <div style={{
                    height: '12px', width: '160px', borderRadius: '4px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                }} />
                <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
            </div>
        );
    }

    if (error || !repo) {
        return (
            <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '14px',
            }}>
                <div style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--accent-cyan)', marginBottom: '6px',
                }}>
                    Currently building
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    mushfiq-s-Portfolio
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Next.js · Framer Motion · GSAP · TypeScript
                </div>
            </div>
        );
    }

    // Format repo name for display
    const displayName = repo.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <motion.a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, borderColor: 'rgba(124,58,237,0.4)' }}
            style={{
                display: 'block',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Live pulse top-right */}
            <div style={{
                position: 'absolute', top: '14px', right: '14px',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.62rem', fontWeight: 700,
                color: '#22c55e',
            }}>
                <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'livePulse 2s infinite',
                    display: 'inline-block',
                }} />
                LIVE
            </div>

            {/* Header */}
            <div style={{
                fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--accent-cyan)', marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '6px',
            }}>
                <FaCodeBranch style={{ fontSize: '0.65rem' }} />
                Currently building
            </div>

            {/* Repo name */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                marginBottom: '6px',
            }}>
                <FaGithub style={{ color: 'var(--text-muted)', fontSize: '0.9rem', flexShrink: 0 }} />
                <span style={{
                    fontSize: '0.95rem', fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: "'Courier New', monospace",
                }}>
                    {repo.name}
                </span>
                <FaExternalLinkAlt style={{
                    fontSize: '0.65rem', color: 'var(--text-muted)',
                    marginLeft: 'auto', flexShrink: 0,
                }} />
            </div>

            {/* Description */}
            {repo.description && (
                <p style={{
                    fontSize: '0.78rem', color: 'var(--text-muted)',
                    lineHeight: 1.55, marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {repo.description}
                </p>
            )}

            {/* Tech stack */}
            {repo.techs.length > 0 && (
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '5px',
                    marginBottom: '12px',
                }}>
                    {repo.techs.map((tech) => (
                        <span
                            key={tech}
                            style={{
                                fontSize: '0.65rem', fontWeight: 700,
                                padding: '2px 8px', borderRadius: '100px',
                                background: 'rgba(124,58,237,0.1)',
                                border: '1px solid rgba(124,58,237,0.2)',
                                color: 'var(--accent-purple-light)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            {/* Last commit */}
            {repo.lastCommit && (
                <div style={{
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'flex-start', gap: '6px',
                }}>
                    <span style={{
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        color: 'var(--accent-cyan)',
                        flexShrink: 0,
                        marginTop: '1px',
                    }}>
                        git push
                    </span>
                    <span style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.4,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        "{repo.lastCommit}"
                    </span>
                    <span style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        flexShrink: 0,
                        opacity: 0.7,
                    }}>
                        {repo.timeAgo}
                    </span>
                </div>
            )}

            <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
        </motion.a>
    );
}