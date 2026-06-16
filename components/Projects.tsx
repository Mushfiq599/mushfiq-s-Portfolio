'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/animations';
import ProjectModal from '@/components/ui/ProjectModal';
import { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
    {
        title: 'Care.xyz',
        description:
            'A trusted care platform connecting verified caretakers with families needing help for children, elderly parents, and sick members.',
        detailedDescription:
            'Care.xyz is a full-stack care services booking platform built with Next.js 14 and the App Router. It features Google OAuth via NextAuth, a multi-step booking flow with location dropdowns, Stripe payment integration, Nodemailer invoice emails, and an admin dashboard for managing bookings and users. The platform serves as a marketplace between care seekers and verified caretakers, with a clean, accessible UI designed for all age groups.',
        technologies: ['Next.js 14', 'NextAuth', 'MongoDB', 'Stripe', 'Nodemailer', 'Tailwind CSS'],
        github: 'https://github.com/Mushfiq599/care-xyz',
        live: 'https://github.com/Mushfiq599/care-xyz',
        image: 'https://i.ibb.co.com/zHB78qS7/Screenshot-354.png',
        challenges: [
            'Implementing async params correctly in Next.js 14 dynamic routes',
            'Syncing Stripe webhook events with MongoDB booking status updates',
            'Building a multi-step form with persistent state across page navigations',
            'Serving dynamic data through API routes instead of hardcoded components',
        ],
        improvements: [
            'Add real-time chat between caretaker and family using Socket.io',
            'Mobile app version with React Native',
            'AI-powered caretaker matching based on requirements',
            'Video call integration for remote consultations',
        ],
    },
    {
        title: 'StyleDecor',
        description:
            'A premium decoration services booking platform with role-based dashboards, ImageBB uploads, and JWT authentication.',
        detailedDescription:
            'StyleDecor is an industry-ready decoration services platform built with React, Vite, Node.js, Express, and MongoDB. It features a role-aware dashboard with analytics and admin user management, ImageBB image upload integration, client-side pagination and sorting, and a full reusable component library with React.lazy code splitting. The platform supports complete booking lifecycle management from service browsing to confirmed bookings.',
        technologies: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT', 'ImageBB', 'Tailwind CSS'],
        github: 'https://github.com/Mushfiq599/stleDecor-client',
        live: 'https://github.com/Mushfiq599/stleDecor-client',
        image: 'https://i.ibb.co.com/CpvMLn9T/Screenshot-356.png',
        challenges: [
            'Auth race condition where setLoading(false) fired before JWT token was saved',
            'axiosSecure interceptor causing infinite redirect loops on public pages',
            'MongoDB Atlas seeding running against local DB instead of Atlas',
            'Awaiting MongoDB connection before app.listen() in production',
        ],
        improvements: [
            'Migrate backend to Next.js API routes for unified deployment',
            'Add real-time booking notifications with WebSockets',
            'Implement a review and rating system for services',
            'Add multi-language support for broader reach',
        ],
    },
    {
        title: 'TaskNova',
        description:
            'A micro-task and earning platform with a three-role coin economy — Worker, Buyer, and Admin — with Stripe integration.',
        detailedDescription:
            'TaskNova is a micro-task marketplace built with Next.js App Router, Tailwind CSS v4, Firebase Auth, JWT, and Stripe. It features a three-role coin economy where Buyers post tasks with coin rewards, Workers complete them for earnings, and Admins manage the ecosystem. The design system uses a Dark Neon Fintech aesthetic with theme toggle via CSS custom properties. Notable infrastructure challenges included MongoDB SRV DNS failures on a Bangladesh ISP resolved via direct connection strings.',
        technologies: ['Next.js', 'Tailwind CSS v4', 'Firebase Auth', 'JWT', 'Stripe', 'MongoDB'],
        github: 'https://github.com/Mushfiq599/tasknova',
        live: 'https://github.com/Mushfiq599/tasknova',
        image: 'https://i.ibb.co.com/bRRPVZK8/Screenshot-357.png',
        challenges: [
            'MongoDB SRV DNS failures on ISP in Bangladesh — fixed with direct connection string',
            'Node.js and PowerShell environment setup conflicts during development',
            'Implementing a fair coin economy that prevents abuse across three roles',
            'Tailwind CSS v4 @variant dark directive syntax differences from v3',
        ],
        improvements: [
            'Add an escrow system to hold coins until task is verified complete',
            'Build a dispute resolution flow between Buyers and Workers',
            'Add task categories and AI-powered task suggestions',
            'Mobile push notifications for task updates',
        ],
    },
    {
        title: 'GadgetHub',
        description:
            'A Next.js 15 tech gadget showcase platform with Firebase Auth and localStorage for cart and wishlist persistence.',
        detailedDescription:
            'GadgetHub is a tech gadget showcase platform built with Next.js 15, Tailwind CSS v4, and Firebase Authentication. It allows users to browse gadgets by category, save items to a wishlist, and manage a cart — all persisted in localStorage. The project focuses on clean component architecture, Firebase Auth integration, and responsive design without TypeScript for rapid prototyping.',
        technologies: ['Next.js 15', 'Tailwind CSS v4', 'Firebase Auth', 'localStorage', 'JavaScript'],
        github: 'https://github.com/Mushfiq599/gadgethub',
        live: 'https://github.com/Mushfiq599/gadgethub',
        image: 'https://i.ibb.co.com/zHB78qS7/Screenshot-354.png',
        challenges: [
            'Missing lucide-react export errors in Next.js 15 build pipeline',
            'Async params handling in Next.js 15 dynamic routes',
            'Syncing localStorage state across tabs without a global store',
            'Tailwind CSS v4 configuration differences from previous versions',
        ],
        improvements: [
            'Add a real backend with product management API',
            'Implement Stripe checkout for a full e-commerce flow',
            'Add product comparison feature',
            'Migrate to TypeScript for better maintainability',
        ],
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    // GSAP scroll-triggered heading animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!headingRef.current) return;
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

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
            {/* Background accents */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-60px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-60px',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div ref={headingRef} style={{ marginBottom: '64px', opacity: 0 }}>
                    <span className="section-tag">05 — Projects</span>
                    <h2 className="section-heading">
                        Things I've <span className="gradient-text">built</span>
                    </h2>
                    <p className="section-subheading">
                        A selection of projects across the full stack — each one a real problem solved.
                    </p>
                </div>

                {/* Projects grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '24px',
                    }}
                    className="projects-grid"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={staggerItem}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            whileHover={{ y: -6 }}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                transition: 'border-color 0.3s',
                                borderColor: hoveredIndex === index
                                    ? 'rgba(124,58,237,0.35)'
                                    : 'var(--border)',
                            }}
                        >
                            {/* Image */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                overflow: 'hidden',
                            }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                        transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                />

                                {/* Hover overlay */}
                                <motion.div
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(10,10,15,0.75)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <motion.button
                                        onClick={() => setSelectedProject(project)}
                                        whileHover={{ scale: 1.08, background: 'var(--accent-purple)' }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            padding: '10px 20px',
                                            background: 'rgba(124,58,237,0.85)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            backdropFilter: 'blur(8px)',
                                            transition: 'background 0.2s',
                                        }}
                                    >
                                        <FaEye /> View Details
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Card body */}
                            <div style={{ padding: '24px' }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    marginBottom: '8px',
                                }}>
                                    {project.title}
                                </h3>

                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.65,
                                    marginBottom: '16px',
                                }}>
                                    {project.description}
                                </p>

                                {/* Tech tags */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '6px',
                                    marginBottom: '20px',
                                }}>
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                padding: '3px 9px',
                                                borderRadius: '100px',
                                                background: 'var(--glass)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text-muted)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            padding: '3px 9px',
                                            borderRadius: '100px',
                                            background: 'rgba(124,58,237,0.1)',
                                            border: '1px solid rgba(124,58,237,0.2)',
                                            color: 'var(--accent-purple-light)',
                                        }}>
                                            +{project.technologies.length - 4} more
                                        </span>
                                    )}
                                </div>

                                {/* Bottom links */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingTop: '16px',
                                    borderTop: '1px solid var(--border)',
                                }}>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--accent-purple-light)',
                                            fontSize: '0.82rem',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            padding: 0,
                                        }}
                                    >
                                        <FaEye style={{ fontSize: '0.75rem' }} />
                                        View Details
                                    </button>

                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            whileHover={{ scale: 1.1, color: 'var(--text-primary)' }}
                                            style={{
                                                color: 'var(--text-muted)',
                                                fontSize: '1rem',
                                                transition: 'color 0.2s',
                                            }}
                                            aria-label="GitHub"
                                        >
                                            <FaGithub />
                                        </motion.a>
                                        <motion.a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            whileHover={{ scale: 1.1, color: 'var(--accent-cyan)' }}
                                            style={{
                                                color: 'var(--text-muted)',
                                                fontSize: '0.9rem',
                                                transition: 'color 0.2s',
                                            }}
                                            aria-label="Live Demo"
                                        >
                                            <FaExternalLinkAlt />
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* GitHub CTA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{
                        marginTop: '48px',
                        textAlign: 'center',
                    }}
                >
                    <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        marginBottom: '16px',
                    }}>
                        These are just the highlights — there's more on GitHub.
                    </p>
                    <motion.a
                        href="https://github.com/Mushfiq599"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(124,58,237,0.3)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 28px',
                            background: 'var(--accent-purple)',
                            color: '#fff',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >
                        <FaGithub /> View All Projects on GitHub
                    </motion.a>
                </motion.div>
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}