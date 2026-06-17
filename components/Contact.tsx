'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaEnvelope, FaPhone, FaWhatsapp,
    FaGithub, FaLinkedin, FaTwitter,
    FaPaperPlane, FaCheckCircle,
} from 'react-icons/fa';
import {
    fadeUp, fadeLeft, fadeRight,
    staggerContainer, staggerItem, viewport,
} from '@/lib/animations';
import { FaX } from 'react-icons/fa6';

const contactDetails = [
    {
        icon: FaEnvelope,
        label: 'Email',
        value: 'mellowm678@gmail.com',
        href: 'mailto:mellowm678@gmail.com',
        color: 'var(--accent-purple)',
        bg: 'rgba(124,58,237,0.08)',
        border: 'rgba(124,58,237,0.2)',
    },
    {
        icon: FaPhone,
        label: 'Phone',
        value: '+880 1630935413',
        href: 'tel:+8801630935413',
        color: 'var(--accent-cyan)',
        bg: 'rgba(6,182,212,0.08)',
        border: 'rgba(6,182,212,0.2)',
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        value: '+880 1630935413',
        href: 'https://wa.me/8801630935413',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.08)',
        border: 'rgba(34,197,94,0.2)',
    },
];

const socialLinks = [
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/Mushfiq599',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mush-fiq',
    },
    {
        icon: FaX,
        label: 'X',
        href: 'https://x.com/MushFiq72288867',
    },
];

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<Status>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Basic validation
        if (!form.name || !form.email || !form.message) return;

        setStatus('sending');

        // Simulate sending — replace with your actual API call or EmailJS
        await new Promise((res) => setTimeout(res, 1800));
        setStatus('success');

        // Reset after 4 seconds
        setTimeout(() => {
            setStatus('idle');
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 4000);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '13px 16px',
        background: 'var(--glass)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        fontFamily: 'var(--font-inter)',
    };

    return (
        <section
            id="contact"
            style={{
                padding: '120px 24px',
                background: 'var(--bg-secondary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background accents */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '-80px',
                width: '380px',
                height: '380px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '-60px',
                width: '320px',
                height: '320px',
                background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
            }}>

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    style={{ marginBottom: '64px' }}
                >
                    <span className="section-tag">06 — Contact</span>
                    <h2 className="section-heading">
                        Let's <span className="gradient-text">work together</span>
                    </h2>
                    <p className="section-subheading">
                        Have a project in mind or just want to say hello?
                        My inbox is always open.
                    </p>
                </motion.div>

                {/* Two column layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.6fr',
                    gap: '48px',
                    alignItems: 'start',
                }}
                    className="contact-grid"
                >

                    {/* Left — contact details */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <motion.h3
                            variants={staggerItem}
                            style={{
                                fontFamily: 'var(--font-space)',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '8px',
                            }}
                        >
                            Reach me directly
                        </motion.h3>

                        {/* Contact cards */}
                        {contactDetails.map(({ icon: Icon, label, value, href, color, bg, border }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel="noreferrer"
                                variants={staggerItem}
                                whileHover={{ x: 4, borderColor: border }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '14px',
                                    padding: '16px 18px',
                                    background: bg,
                                    border: `1px solid ${border}`,
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: `${color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color,
                                    fontSize: '1rem',
                                    flexShrink: 0,
                                }}>
                                    <Icon />
                                </div>
                                <div>
                                    <div style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-muted)',
                                        marginBottom: '2px',
                                    }}>
                                        {label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'var(--text-primary)',
                                    }}>
                                        {value}
                                    </div>
                                </div>
                            </motion.a>
                        ))}

                        {/* Social links */}
                        <motion.div variants={staggerItem} style={{ marginTop: '8px' }}>
                            <p style={{
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginBottom: '12px',
                            }}>
                                Find me on
                            </p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {socialLinks.map(({ icon: Icon, label, href }) => (
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
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '10px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--glass)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--text-muted)',
                                            fontSize: '1rem',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        <Icon />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability card */}
                        <motion.div
                            variants={staggerItem}
                            style={{
                                marginTop: '8px',
                                padding: '20px',
                                background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))',
                                border: '1px solid rgba(124,58,237,0.2)',
                                borderRadius: '12px',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '6px',
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#22c55e',
                                    display: 'inline-block',
                                    animation: 'pulse 2s infinite',
                                }} />
                                <span style={{
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    color: '#22c55e',
                                }}>
                                    Currently available
                                </span>
                            </div>
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.6,
                            }}>
                                Open to freelance projects, internships, and
                                full-time roles. Response time is usually within 24 hours.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right — contact form */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{
                            padding: '36px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '20px',
                        }}
                    >
                        {status === 'success' ? (
                            /* Success state */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    minHeight: '360px',
                                    gap: '16px',
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        background: 'rgba(34,197,94,0.12)',
                                        border: '1px solid rgba(34,197,94,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#22c55e',
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    <FaCheckCircle />
                                </motion.div>
                                <h3 style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '1.3rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                }}>
                                    Message sent!
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--text-muted)',
                                    maxWidth: '280px',
                                    lineHeight: 1.6,
                                }}>
                                    Thanks for reaching out. I'll get back to you within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            /* Form */
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-space)',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    marginBottom: '4px',
                                }}>
                                    Send a message
                                </h3>

                                {/* Name + Email row */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px',
                                }}
                                    className="form-row"
                                >
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: 'var(--text-muted)',
                                            marginBottom: '6px',
                                            letterSpacing: '0.05em',
                                        }}>
                                            NAME *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            style={inputStyle}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'rgba(124,58,237,0.5)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'var(--border)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: 'var(--text-muted)',
                                            marginBottom: '6px',
                                            letterSpacing: '0.05em',
                                        }}>
                                            EMAIL *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            style={inputStyle}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'rgba(124,58,237,0.5)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'var(--border)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: 'var(--text-muted)',
                                        marginBottom: '6px',
                                        letterSpacing: '0.05em',
                                    }}>
                                        SUBJECT
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="What's this about?"
                                        style={inputStyle}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(124,58,237,0.5)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'var(--border)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: 'var(--text-muted)',
                                        marginBottom: '6px',
                                        letterSpacing: '0.05em',
                                    }}>
                                        MESSAGE *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project, timeline, budget..."
                                        rows={5}
                                        style={{
                                            ...inputStyle,
                                            resize: 'vertical',
                                            minHeight: '130px',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(124,58,237,0.5)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'var(--border)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                {/* Submit */}
                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={status === 'sending'}
                                    whileHover={status !== 'sending' ? {
                                        scale: 1.02,
                                        boxShadow: '0 0 28px rgba(124,58,237,0.4)',
                                    } : {}}
                                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        background: status === 'sending'
                                            ? 'rgba(124,58,237,0.5)'
                                            : 'var(--accent-purple)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'background 0.2s',
                                    }}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    border: '2px solid rgba(255,255,255,0.3)',
                                                    borderTopColor: '#fff',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>

                                <p style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)',
                                    textAlign: 'center',
                                }}>
                                    I typically reply within 24 hours ·{' '}
                                    <a
                                        href="https://wa.me/8801630935413"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: '#22c55e', textDecoration: 'none' }}
                                    >
                                        WhatsApp me instead
                                    </a>
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div >

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section >
    );
}