'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { Project } from '@/types';
import ProjectModal from '@/components/ui/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
    {
        title: 'Care.xyz',
        description: 'A trusted care platform connecting verified caretakers with families needing help for children, elderly parents, and sick members.',
        detailedDescription: 'Care.xyz is a full-stack care services booking platform built with Next.js 14 and the App Router. It features Google OAuth via NextAuth, a multi-step booking flow with location dropdowns, Stripe payment integration, Nodemailer invoice emails, and an admin dashboard for managing bookings and users.',
        technologies: ['Next.js 14', 'NextAuth', 'MongoDB', 'Stripe', 'Nodemailer', 'Tailwind CSS'],
        github: 'https://github.com/Mushfiq599/care-xyz',
        live: 'https://github.com/Mushfiq599/care-xyz',
        image: 'https://i.ibb.co.com/zHB78qS7/Screenshot-354.png',
        challenges: [
            'Implementing async params correctly in Next.js 14 dynamic routes',
            'Syncing Stripe webhook events with MongoDB booking status updates',
            'Building a multi-step form with persistent state across page navigations',
        ],
        improvements: [
            'Add real-time chat between caretaker and family using Socket.io',
            'Mobile app version with React Native',
            'AI-powered caretaker matching based on requirements',
        ],
    },
    {
        title: 'StyleDecor',
        description: 'A premium decoration services booking platform with role-based dashboards, ImageBB uploads, and JWT authentication.',
        detailedDescription: 'StyleDecor is an industry-ready decoration services platform built with React, Vite, Node.js, Express, and MongoDB. It features a role-aware dashboard with analytics and admin user management, ImageBB image upload integration, and a full reusable component library with React.lazy code splitting.',
        technologies: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT', 'ImageBB', 'Tailwind CSS'],
        github: 'https://github.com/Mushfiq599/stleDecor-client',
        live: 'https://github.com/Mushfiq599/stleDecor-client',
        image: 'https://i.ibb.co.com/CpvMLn9T/Screenshot-356.png',
        challenges: [
            'Auth race condition where setLoading(false) fired before JWT token was saved',
            'axiosSecure interceptor causing infinite redirect loops on public pages',
            'MongoDB Atlas seeding running against local DB instead of Atlas',
        ],
        improvements: [
            'Migrate backend to Next.js API routes for unified deployment',
            'Add real-time booking notifications with WebSockets',
            'Implement a review and rating system for services',
        ],
    },
    {
        title: 'TaskNova',
        description: 'A micro-task and earning platform with a three-role coin economy — Worker, Buyer, and Admin — with Stripe integration.',
        detailedDescription: 'TaskNova is a micro-task marketplace built with Next.js App Router, Tailwind CSS v4, Firebase Auth, JWT, and Stripe. It features a three-role coin economy where Buyers post tasks with coin rewards, Workers complete them for earnings, and Admins manage the ecosystem.',
        technologies: ['Next.js', 'Tailwind CSS v4', 'Firebase Auth', 'JWT', 'Stripe', 'MongoDB'],
        github: 'https://github.com/Mushfiq599/tasknova',
        live: 'https://github.com/Mushfiq599/tasknova',
        image: 'https://i.ibb.co.com/bRRPVZK8/Screenshot-357.png',
        challenges: [
            'MongoDB SRV DNS failures on ISP in Bangladesh — fixed with direct connection string',
            'Implementing a fair coin economy that prevents abuse across three roles',
            'Tailwind CSS v4 @variant dark directive syntax differences from v3',
        ],
        improvements: [
            'Add an escrow system to hold coins until task is verified complete',
            'Build a dispute resolution flow between Buyers and Workers',
            'Add task categories and AI-powered task suggestions',
        ],
    },
    {
        title: 'GadgetHub',
        description: 'A Next.js 15 tech gadget showcase platform with Firebase Auth and localStorage for cart and wishlist persistence.',
        detailedDescription: 'GadgetHub is a tech gadget showcase platform built with Next.js 15, Tailwind CSS v4, and Firebase Authentication. It allows users to browse gadgets by category, save items to a wishlist, and manage a cart — all persisted in localStorage.',
        technologies: ['Next.js 15', 'Tailwind CSS v4', 'Firebase Auth', 'localStorage', 'JavaScript'],
        github: 'https://github.com/Mushfiq599/gadgethub',
        live: 'https://github.com/Mushfiq599/gadgethub',
        image: 'https://i.ibb.co.com/zHB78qS7/Screenshot-354.png',
        challenges: [
            'Missing lucide-react export errors in Next.js 15 build pipeline',
            'Async params handling in Next.js 15 dynamic routes',
            'Syncing localStorage state across tabs without a global store',
        ],
        improvements: [
            'Add a real backend with product management API',
            'Implement Stripe checkout for a full e-commerce flow',
            'Migrate to TypeScript for better maintainability',
        ],
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLSpanElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Section tag slides in from left
            gsap.fromTo(tagRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: tagRef.current, start: 'top 88%' },
                }
            );

            // 2. Heading words flip in with 3D rotationX stagger
            const words = headingRef.current?.querySelectorAll('.word');
            if (words) {
                gsap.fromTo(words,
                    { opacity: 0, y: 60, rotationX: -40, transformOrigin: 'top center' },
                    {
                        opacity: 1, y: 0, rotationX: 0,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: 'power4.out',
                        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
                    }
                );
            }

            // 3. Underline draws from left to right
            gsap.fromTo(lineRef.current,
                { scaleX: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1, duration: 1.2, ease: 'expo.out',
                    scrollTrigger: { trigger: lineRef.current, start: 'top 88%' },
                }
            );

            // 4. Cards cascade in with scale + y
            const cards = cardsRef.current?.querySelectorAll('.project-card');
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 80, scale: 0.94 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.9,
                        stagger: { amount: 0.5, from: 'start' },
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // 5. Parallax image scroll per card
            const cardEls = cardsRef.current?.querySelectorAll('.project-card');
            cardEls?.forEach((card) => {
                const img = card.querySelector('.card-img') as HTMLElement;
                if (!img) return;
                gsap.to(img, {
                    yPercent: -12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            });

            // 6. CTA fades up
            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
                }
            );

            // 7. Ghost numbers spring in
            const counters = sectionRef.current?.querySelectorAll('.project-number');
            counters?.forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.6 },
                    {
                        opacity: 1, scale: 1, duration: 1.1, ease: 'elastic.out(1,0.6)',
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // 3D magnetic tilt on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
            rotateY: x / 30,
            rotateX: -y / 30,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power2.out',
        });
        const shine = card.querySelector('.card-shine') as HTMLElement;
        if (shine) {
            shine.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(124,58,237,0.12) 0%, transparent 60%)`;
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotateY: 0, rotateX: 0,
            duration: 0.6, ease: 'elastic.out(1, 0.5)',
        });
        const shine = e.currentTarget.querySelector('.card-shine') as HTMLElement;
        if (shine) shine.style.background = 'transparent';
    };

    const headingWords = ['Things', "I've", 'built'];

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                padding: '120px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient background */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div style={{
                    position: 'absolute', top: '5%', right: '-80px',
                    width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
                    borderRadius: '50%', filter: 'blur(50px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', left: '-60px',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)',
                    borderRadius: '50%', filter: 'blur(50px)',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }} />
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ marginBottom: '72px' }}>
                    <span
                        ref={tagRef}
                        className="section-tag"
                        style={{ opacity: 0, display: 'inline-flex' }}
                    >
                        05 — Projects
                    </span>

                    <div
                        ref={headingRef}
                        style={{ perspective: '600px', margin: '16px 0 0', overflow: 'hidden' }}
                    >
                        <h2 style={{
                            fontFamily: 'var(--font-space)',
                            fontSize: 'clamp(2.6rem, 6vw, 4rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0 14px',
                        }}>
                            {headingWords.map((word, i) => (
                                <span
                                    key={i}
                                    className="word"
                                    style={{
                                        display: 'inline-block',
                                        opacity: 0,
                                        color: i === 2 ? 'transparent' : 'var(--text-primary)',
                                        backgroundImage: i === 2
                                            ? 'linear-gradient(135deg, var(--accent-purple-light), var(--accent-cyan))'
                                            : 'none',
                                        WebkitBackgroundClip: i === 2 ? 'text' : 'unset',
                                        backgroundClip: i === 2 ? 'text' : 'unset',
                                        WebkitTextFillColor: i === 2 ? 'transparent' : 'unset',
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </h2>
                    </div>

                    {/* Animated underline */}
                    <div
                        ref={lineRef}
                        style={{
                            height: '1px',
                            width: '120px',
                            background: 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))',
                            marginTop: '20px',
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                        }}
                    />

                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        maxWidth: '500px',
                        marginTop: '16px',
                    }}>
                        A selection of projects across the full stack — each one a real problem solved.
                    </p>
                </div>

                {/* Cards grid */}
                <div
                    ref={cardsRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '28px',
                    }}
                    className="projects-grid"
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className="project-card"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                position: 'relative',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                opacity: 0,
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                        >
                            {/* Magnetic shine overlay */}
                            <div
                                className="card-shine"
                                style={{
                                    position: 'absolute', inset: 0,
                                    zIndex: 2, pointerEvents: 'none',
                                    borderRadius: '20px',
                                    transition: 'background 0.1s',
                                }}
                            />

                            {/* Ghost number */}
                            <div
                                className="project-number"
                                style={{
                                    position: 'absolute', top: '16px', right: '20px',
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '4rem', fontWeight: 900,
                                    color: 'rgba(124,58,237,0.07)',
                                    lineHeight: 1, zIndex: 0,
                                    letterSpacing: '-0.04em',
                                    userSelect: 'none',
                                    opacity: 0,
                                }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Image — parallax target */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '220px',
                                overflow: 'hidden',
                            }}>
                                <img
                                    className="card-img"
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '130%',
                                        objectFit: 'cover',
                                        objectPosition: 'top',
                                        display: 'block',
                                        willChange: 'transform',
                                    }}
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to bottom, rgba(10,10,15,0) 30%, var(--bg-card) 100%)',
                                }} />

                                {/* Hover overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        background: 'rgba(10,10,15,0.72)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(4px)',
                                    }}
                                >
                                    <motion.button
                                        onClick={() => setSelectedProject(project)}
                                        initial={{ scale: 0.85, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                            padding: '11px 24px',
                                            background: 'var(--accent-purple)',
                                            border: 'none', borderRadius: '10px',
                                            color: '#fff', fontSize: '0.88rem', fontWeight: 700,
                                        }}
                                    >
                                        <FaEye /> View Details
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Card body */}
                            <div style={{ padding: '24px 24px 20px', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'flex-start', marginBottom: '10px',
                                }}>
                                    <h3 style={{
                                        fontFamily: 'var(--font-space)',
                                        fontSize: '1.15rem', fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {project.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginLeft: '12px' }}>
                                        <motion.a
                                            href={project.github}
                                            target="_blank" rel="noreferrer"
                                            whileHover={{ scale: 1.15, color: 'var(--text-primary)' }}
                                            style={{ color: 'var(--text-muted)', fontSize: '1rem', transition: 'color 0.2s' }}
                                            aria-label="GitHub"
                                        >
                                            <FaGithub />
                                        </motion.a>
                                        <motion.a
                                            href={project.live}
                                            target="_blank" rel="noreferrer"
                                            whileHover={{ scale: 1.15, color: 'var(--accent-cyan)' }}
                                            style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                                            aria-label="Live demo"
                                        >
                                            <FaExternalLinkAlt />
                                        </motion.a>
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: '0.855rem', color: 'var(--text-muted)',
                                    lineHeight: 1.65, marginBottom: '16px',
                                }}>
                                    {project.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            style={{
                                                fontSize: '0.68rem', fontWeight: 700,
                                                padding: '3px 9px', borderRadius: '100px',
                                                background: 'rgba(124,58,237,0.08)',
                                                border: '1px solid rgba(124,58,237,0.18)',
                                                color: 'var(--accent-purple-light)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span style={{
                                            fontSize: '0.68rem', fontWeight: 700,
                                            padding: '3px 9px', borderRadius: '100px',
                                            background: 'var(--glass)', border: '1px solid var(--border)',
                                            color: 'var(--text-muted)',
                                        }}>
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingTop: '14px',
                                    borderTop: '1px solid var(--border)',
                                }}>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        style={{
                                            background: 'none', border: 'none', padding: 0,
                                            color: 'var(--accent-purple-light)',
                                            fontSize: '0.8rem', fontWeight: 700,
                                            display: 'flex', alignItems: 'center', gap: '5px',
                                        }}
                                    >
                                        <FaEye style={{ fontSize: '0.72rem' }} />
                                        View Details →
                                    </button>
                                    <div style={{
                                        fontSize: '0.7rem', fontWeight: 600,
                                        color: 'var(--text-muted)', letterSpacing: '0.06em',
                                    }}>
                                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* GitHub CTA */}
                <div ref={ctaRef} style={{ marginTop: '56px', textAlign: 'center', opacity: 0 }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                        These are just the highlights — there's more on GitHub.
                    </p>
                    <motion.a
                        href="https://github.com/Mushfiq599"
                        target="_blank" rel="noreferrer"
                        whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(124,58,237,0.35)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '9px',
                            padding: '13px 30px',
                            background: 'var(--accent-purple)', color: '#fff',
                            borderRadius: '10px', fontSize: '0.92rem', fontWeight: 700,
                            textDecoration: 'none',
                        }}
                    >
                        <FaGithub style={{ fontSize: '1.1rem' }} />
                        View All Projects on GitHub
                    </motion.a>
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}