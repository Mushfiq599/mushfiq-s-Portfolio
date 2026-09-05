import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mushfiq — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#0A0A0F',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '30%',
                    width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    display: 'flex',
                }} />

                {/* Left — Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 1 }}>

                    {/* Badge */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(124,58,237,0.15)',
                        border: '1px solid rgba(124,58,237,0.3)',
                        borderRadius: '100px',
                        padding: '6px 16px',
                        width: 'fit-content',
                    }}>
                        <div style={{
                            width: '8px', height: '8px',
                            borderRadius: '50%', background: '#22c55e',
                            display: 'flex',
                        }} />
                        <span style={{ color: '#9F6EFF', fontSize: '14px', fontWeight: 600 }}>
                            Available for work
                        </span>
                    </div>

                    {/* Name */}
                    <div style={{
                        fontSize: '72px', fontWeight: 800,
                        color: '#F8FAFC', lineHeight: 1.05,
                        letterSpacing: '-2px',
                        display: 'flex',
                    }}>
                        Mushfiqur
                    </div>
                    <div style={{
                        fontSize: '72px', fontWeight: 800,
                        lineHeight: 1.05, letterSpacing: '-2px',
                        background: 'linear-gradient(135deg, #9F6EFF, #06B6D4)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        display: 'flex',
                        marginTop: '-16px',
                    }}>
                        Rahman
                    </div>

                    {/* Title */}
                    <div style={{
                        fontSize: '24px', color: '#94A3B8',
                        fontWeight: 400, marginTop: '8px',
                        display: 'flex',
                    }}>
                        Full Stack Developer — MERN Stack
                    </div>

                    {/* Tech stack */}
                    <div style={{
                        display: 'flex', gap: '10px', marginTop: '8px',
                    }}>
                        {['React', 'Next.js', 'Node.js', 'MongoDB'].map((tech) => (
                            <div key={tech} style={{
                                padding: '6px 14px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#94A3B8',
                                fontSize: '14px',
                                fontWeight: 600,
                                display: 'flex',
                            }}>
                                {tech}
                            </div>
                        ))}
                    </div>

                    {/* URL */}
                    <div style={{
                        fontSize: '16px', color: '#7C3AED',
                        fontWeight: 600, marginTop: '16px',
                        display: 'flex',
                    }}>
                        mushfiq-s-portfolio.vercel.app
                    </div>
                </div>

                {/* Right — Photo */}
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <div style={{
                        width: '320px', height: '380px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '2px solid rgba(124,58,237,0.4)',
                        boxShadow: '0 0 60px rgba(124,58,237,0.3)',
                        display: 'flex',
                    }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://mushfiq-s-portfolio.vercel.app/images/profile.png"
                            alt="Mushfiq"
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}