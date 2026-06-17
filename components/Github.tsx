'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaGithub, FaStar, FaCodeBranch,
    FaUsers, FaFire, FaCode,
} from 'react-icons/fa';
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

// ── Types ────────────────────────────────────────────
interface GitHubUser {
    login: string;
    name: string;
    bio: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
}

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
}

interface ContribDay {
    date: string;
    count: number;
}

interface Stats {
    totalCommits: number;
    currentStreak: number;
    longestStreak: number;
    publicRepos: number;
    followers: number;
    averageDaily: number;
}

// ── Language colors ──────────────────────────────────
const langColors: Record<string, string> = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    Go: '#00add8',
    Rust: '#dea584',
    default: '#7C3AED',
};

// ── Heatmap cell color ────────────────────────────────
function getCellColor(count: number): string {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    if (count <= 2) return 'rgba(124,58,237,0.3)';
    if (count <= 5) return 'rgba(124,58,237,0.55)';
    if (count <= 9) return 'rgba(124,58,237,0.8)';
    return 'rgba(124,58,237,1)';
}

// ── Skeleton loader ───────────────────────────────────
function Skeleton({ w = '100%', h = '16px', radius = '6px' }: {
    w?: string; h?: string; radius?: string;
}) {
    return (
        <div style={{
            width: w, height: h, borderRadius: radius,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
        }} />
    );
}

export default function GitHub() {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [weeks, setWeeks] = useState<ContribDay[][]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [userRes, reposRes, contribRes] = await Promise.all([
                    fetch('/api/github/user'),
                    fetch('/api/github/repos'),
                    fetch('/api/github/contributions'),
                ]);

                const userData = await userRes.json();
                const reposData = await reposRes.json();
                const contribData = await contribRes.json();

                if (userData.error) throw new Error(userData.error);

                setUser(userData);
                setRepos(Array.isArray(reposData) ? reposData : []);
                setWeeks(contribData.weeks || []);
                setStats(contribData.stats || null);
            } catch (err: any) {
                setError(err.message || 'Failed to load GitHub data');
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    // Galaxy particle effect via GSAP
    useEffect(() => {
        if (loading || error) return;
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.galaxy-particle').forEach((el) => {
                gsap.to(el, {
                    x: gsap.utils.random(-30, 30),
                    y: gsap.utils.random(-30, 30),
                    opacity: gsap.utils.random(0.3, 1),
                    duration: gsap.utils.random(3, 6),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: gsap.utils.random(0, 3),
                });
            });
        });
        return () => ctx.revert();
    }, [loading, error]);

    const statCards = stats
        ? [
            { label: 'Contributions', value: stats.totalCommits, icon: FaCode, color: 'var(--accent-purple)' },
            { label: 'Current Streak', value: `${stats.currentStreak}d`, icon: FaFire, color: '#f97316' },
            { label: 'Longest Streak', value: `${stats.longestStreak}d`, icon: FaStar, color: 'var(--accent-cyan)' },
            { label: 'Public Repos', value: stats.publicRepos, icon: FaCodeBranch, color: 'var(--accent-magenta)' },
            { label: 'Followers', value: stats.followers, icon: FaUsers, color: '#22c55e' },
            { label: 'Daily Avg', value: stats.averageDaily, icon: FaGithub, color: 'var(--accent-purple-light)' },
        ]
        : [];

    // Month labels for heatmap
    const monthLabels = (() => {
        if (!weeks.length) return [];
        const labels: { label: string; col: number }[] = [];
        let lastMonth = -1;
        weeks.forEach((week, i) => {
            const month = new Date(week[0].date).getMonth();
            if (month !== lastMonth) {
                labels.push({
                    label: new Date(week[0].date).toLocaleString('default', { month: 'short' }),
                    col: i,
                });
                lastMonth = month;
            }
        });
        return labels;
    })();

    return (
        <section
            id="github"
            style={{
                padding: '120px 24px',
                background: 'var(--bg-secondary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Galaxy background particles */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="galaxy-particle"
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            borderRadius: '50%',
                            background: i % 3 === 0
                                ? 'var(--accent-purple)'
                                : i % 3 === 1
                                    ? 'var(--accent-cyan)'
                                    : 'rgba(255,255,255,0.5)',
                            opacity: Math.random() * 0.6 + 0.2,
                        }}
                    />
                ))}
                {/* Glow orbs */}
                <div style={{
                    position: 'absolute', top: '20%', left: '10%',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(40px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', right: '5%',
                    width: '350px', height: '350px',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(40px)',
                }} />
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{ marginBottom: '64px' }}
                >
                    <span className="section-tag">
                        <FaGithub /> GitHub Activity
                    </span>
                    <h2 className="section-heading">
                        Code I've <span className="gradient-text">shipped</span>
                    </h2>
                    <p className="section-subheading">
                        Live stats and activity straight from my GitHub profile.
                    </p>
                </motion.div>

                {error && (
                    <div style={{
                        padding: '20px',
                        background: 'rgba(236,72,153,0.08)',
                        border: '1px solid rgba(236,72,153,0.2)',
                        borderRadius: '12px',
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        marginBottom: '32px',
                    }}>
                        ⚠️ {error} — add a <code>GITHUB_TOKEN</code> env variable to increase rate limits.
                    </div>
                )}

                {/* ── Profile card + stats ───────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '300px 1fr',
                    gap: '24px',
                    marginBottom: '24px',
                    alignItems: 'start',
                }}
                    className="github-top-grid"
                >
                    {/* Profile card */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{
                            padding: '28px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: '12px',
                        }}
                    >
                        {loading ? (
                            <>
                                <Skeleton w="80px" h="80px" radius="50%" />
                                <Skeleton w="120px" h="20px" />
                                <Skeleton w="180px" h="14px" />
                                <Skeleton w="100%" h="14px" />
                                <Skeleton w="80%" h="14px" />
                            </>
                        ) : user ? (
                            <>
                                {/* Avatar with glow */}
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', inset: '-3px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                                        zIndex: 0,
                                    }} />
                                    <img
                                        src={user.avatar_url}
                                        alt={user.login}
                                        style={{
                                            position: 'relative', zIndex: 1,
                                            width: '80px', height: '80px',
                                            borderRadius: '50%',
                                            border: '3px solid var(--bg-card)',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>

                                <div>
                                    <div style={{
                                        fontFamily: 'var(--font-space)',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                    }}>
                                        {user.name || user.login}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--accent-purple-light)',
                                        fontWeight: 500,
                                    }}>
                                        @{user.login}
                                    </div>
                                </div>

                                {user.bio && (
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--text-muted)',
                                        lineHeight: 1.6,
                                    }}>
                                        {user.bio}
                                    </p>
                                )}

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '8px',
                                    width: '100%',
                                    marginTop: '4px',
                                }}>
                                    {[
                                        { label: 'Repos', value: user.public_repos },
                                        { label: 'Followers', value: user.followers },
                                        { label: 'Following', value: user.following },
                                    ].map(({ label, value }) => (
                                        <div key={label} style={{
                                            padding: '8px 4px',
                                            background: 'var(--glass)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                        }}>
                                            <div style={{
                                                fontFamily: 'var(--font-space)',
                                                fontSize: '1rem',
                                                fontWeight: 700,
                                                color: 'var(--text-primary)',
                                            }}>
                                                {value}
                                            </div>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                                {label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <motion.a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '7px',
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        background: 'var(--accent-purple)',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        fontSize: '0.82rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        marginTop: '4px',
                                    }}
                                >
                                    <FaGithub /> View Profile
                                </motion.a>
                            </>
                        ) : null}
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                        }}
                        className="stats-grid"
                    >
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} style={{
                                    padding: '20px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}>
                                    <Skeleton w="32px" h="32px" radius="8px" />
                                    <Skeleton w="60px" h="24px" />
                                    <Skeleton w="80px" h="12px" />
                                </div>
                            ))
                            : statCards.map(({ label, value, icon: Icon, color }) => (
                                <motion.div
                                    key={label}
                                    variants={staggerItem}
                                    whileHover={{ y: -3, borderColor: `${color}44` }}
                                    style={{
                                        padding: '20px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '14px',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <div style={{
                                        width: '36px', height: '36px',
                                        borderRadius: '9px',
                                        background: `${color}18`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color,
                                        fontSize: '1rem',
                                        marginBottom: '10px',
                                    }}>
                                        <Icon />
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-space)',
                                        fontSize: '1.5rem',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        lineHeight: 1,
                                    }}>
                                        {value}
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--text-muted)',
                                        marginTop: '4px',
                                    }}>
                                        {label}
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                </div>

                {/* ── Contribution heatmap ───────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        padding: '28px 32px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        marginBottom: '24px',
                        position: 'relative',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        gap: '8px',
                    }}>
                        <h3 style={{
                            fontFamily: 'var(--font-space)',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                        }}>
                            Contribution activity — last 12 months
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Less
                            {[0, 2, 5, 9, 12].map((c) => (
                                <div key={c} style={{
                                    width: '11px', height: '11px',
                                    borderRadius: '2px',
                                    background: getCellColor(c),
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }} />
                            ))}
                            More
                        </div>
                    </div>

                    {loading ? (
                        <div style={{
                            height: '120px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite',
                            borderRadius: '8px',
                        }} />
                    ) : (
                        <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                            {/* Month labels */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${weeks.length}, 13px)`,
                                gap: '2px',
                                marginBottom: '4px',
                                paddingLeft: '0',
                            }}>
                                {weeks.map((_, i) => {
                                    const label = monthLabels.find((m) => m.col === i);
                                    return (
                                        <div key={i} style={{
                                            fontSize: '0.6rem',
                                            color: label ? 'var(--text-muted)' : 'transparent',
                                            whiteSpace: 'nowrap',
                                            userSelect: 'none',
                                        }}>
                                            {label?.label || '.'}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Grid */}
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {/* Day labels */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateRows: 'repeat(7, 13px)',
                                    gap: '2px',
                                    marginRight: '4px',
                                }}>
                                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                                        <div key={i} style={{
                                            fontSize: '0.6rem',
                                            color: d ? 'var(--text-muted)' : 'transparent',
                                            lineHeight: '13px',
                                            textAlign: 'right',
                                            userSelect: 'none',
                                        }}>
                                            {d || '.'}
                                        </div>
                                    ))}
                                </div>

                                {/* Cells */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${weeks.length}, 13px)`,
                                    gridTemplateRows: 'repeat(7, 13px)',
                                    gridAutoFlow: 'column',
                                    gap: '2px',
                                }}>
                                    {weeks.flatMap((week) =>
                                        week.map((day) => (
                                            <div
                                                key={day.date}
                                                onMouseEnter={(e) => {
                                                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                                                    setTooltip({
                                                        x: rect.left + window.scrollX,
                                                        y: rect.top + window.scrollY - 40,
                                                        date: day.date,
                                                        count: day.count,
                                                    });
                                                }}
                                                onMouseLeave={() => setTooltip(null)}
                                                style={{
                                                    width: '13px',
                                                    height: '13px',
                                                    borderRadius: '2px',
                                                    background: getCellColor(day.count),
                                                    border: '1px solid rgba(255,255,255,0.04)',
                                                    transition: 'transform 0.1s, filter 0.1s',
                                                    cursor: 'default',
                                                }}
                                                onMouseOver={(e) => {
                                                    (e.target as HTMLElement).style.transform = 'scale(1.4)';
                                                    (e.target as HTMLElement).style.filter = 'brightness(1.4)';
                                                }}
                                                onMouseOut={(e) => {
                                                    (e.target as HTMLElement).style.transform = 'scale(1)';
                                                    (e.target as HTMLElement).style.filter = 'none';
                                                }}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tooltip */}
                    {tooltip && (
                        <div style={{
                            position: 'fixed',
                            left: tooltip.x,
                            top: tooltip.y,
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            color: 'var(--text-primary)',
                            pointerEvents: 'none',
                            zIndex: 500,
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                        }}>
                            <span style={{ color: 'var(--accent-purple-light)', fontWeight: 700 }}>
                                {tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}
                            </span>
                            {' '}on {new Date(tooltip.date).toLocaleDateString('en-US', {
                                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
                            })}
                        </div>
                    )}
                </motion.div>

                {/* ── Recent repos ───────────────────────────── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    <h3 style={{
                        fontFamily: 'var(--font-space)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '16px',
                    }}>
                        Recent repositories
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                    }}
                        className="repos-grid"
                    >
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} style={{
                                    padding: '20px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}>
                                    <Skeleton w="60%" h="16px" />
                                    <Skeleton w="90%" h="12px" />
                                    <Skeleton w="70%" h="12px" />
                                </div>
                            ))
                            : repos.slice(0, 6).map((repo) => (
                                <motion.a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    variants={staggerItem}
                                    whileHover={{ y: -3, borderColor: 'rgba(124,58,237,0.35)' }}
                                    style={{
                                        padding: '20px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '14px',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}>
                                        <FaGithub style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                        <span style={{
                                            fontSize: '0.875rem',
                                            fontWeight: 700,
                                            color: 'var(--accent-purple-light)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {repo.name}
                                        </span>
                                    </div>

                                    <p style={{
                                        fontSize: '0.78rem',
                                        color: 'var(--text-muted)',
                                        lineHeight: 1.5,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        flex: 1,
                                    }}>
                                        {repo.description || 'No description provided.'}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginTop: 'auto',
                                    }}>
                                        {repo.language && (
                                            <span style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                fontSize: '0.72rem',
                                                color: 'var(--text-muted)',
                                            }}>
                                                <span style={{
                                                    width: '8px', height: '8px',
                                                    borderRadius: '50%',
                                                    background: langColors[repo.language] || langColors.default,
                                                    flexShrink: 0,
                                                }} />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span style={{
                                            display: 'flex', alignItems: 'center', gap: '3px',
                                            fontSize: '0.72rem', color: 'var(--text-muted)',
                                        }}>
                                            <FaStar style={{ color: '#f59e0b', fontSize: '0.65rem' }} />
                                            {repo.stargazers_count}
                                        </span>
                                        <span style={{
                                            display: 'flex', alignItems: 'center', gap: '3px',
                                            fontSize: '0.72rem', color: 'var(--text-muted)',
                                        }}>
                                            <FaCodeBranch style={{ fontSize: '0.65rem' }} />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 900px) {
          .github-top-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .repos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .repos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}