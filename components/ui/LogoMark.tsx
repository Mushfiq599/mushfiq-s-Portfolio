'use client';

import { useState } from 'react';

interface LogoMarkProps {
    size?: 'navbar' | 'footer';
}

const letters = ['M', 'u', 's', 'h', 'f', 'i', 'q'];

export default function LogoMark({ size = 'navbar' }: LogoMarkProps) {
    const [hovered, setHovered] = useState(false);
    const [waveKey, setWaveKey] = useState(0);

    const isNavbar = size === 'navbar';

    const bracketSize = isNavbar ? '1.5rem' : '1.8rem';
    const letterSize = isNavbar ? '1.15rem' : '1.4rem';
    const cursorH = isNavbar ? '1rem' : '1.25rem';

    const handleEnter = () => {
        setHovered(true);
        setWaveKey((k) => k + 1);
    };

    return (
        <div
            onMouseEnter={handleEnter}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                position: 'relative',
                cursor: 'none',
            }}
        >
            {/* Glow on hover */}
            <div style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '10px',
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
            }} />

            {/* Left bracket */}
            <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: bracketSize,
                fontWeight: 300,
                color: hovered ? '#7C3AED' : '#06B6D4',
                lineHeight: 1,
                display: 'inline-block',
                transform: hovered ? 'translateX(-3px)' : 'translateX(0)',
                transition: 'color 0.3s, transform 0.3s',
                userSelect: 'none',
            }}>
                [
            </span>

            {/* Letters */}
            <span style={{ display: 'inline-flex', alignItems: 'baseline', padding: '0 3px' }}>
                {letters.map((letter, i) => (
                    <span
                        key={`${letter}-${waveKey}-${i}`}
                        style={{
                            fontFamily: "'Courier New', monospace",
                            fontSize: letterSize,
                            fontWeight: 700,
                            color: '#F8FAFC',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                            display: 'inline-block',
                            animation: hovered
                                ? `mqWave 0.7s ease forwards ${i * 0.055}s`
                                : 'none',
                            userSelect: 'none',
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </span>

            {/* Blinking cursor */}
            <span style={{
                display: 'inline-block',
                width: isNavbar ? '2.5px' : '3px',
                height: cursorH,
                background: 'var(--accent-purple)',
                borderRadius: '2px',
                marginLeft: '1px',
                verticalAlign: 'middle',
                animation: 'mqBlink 1.1s step-end infinite',
                flexShrink: 0,
            }} />

            {/* Right bracket */}
            <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: bracketSize,
                fontWeight: 300,
                color: hovered ? '#7C3AED' : '#06B6D4',
                lineHeight: 1,
                display: 'inline-block',
                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'color 0.3s, transform 0.3s',
                userSelect: 'none',
            }}>
                ]
            </span>

            <style>{`
        @keyframes mqWave {
          0%   { transform: translateY(0);    color: #F8FAFC; }
          30%  { transform: translateY(-5px); color: #9F6EFF; }
          65%  { transform: translateY(2px);  color: #06B6D4; }
          100% { transform: translateY(0);    color: #F8FAFC; }
        }
        @keyframes mqBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
        </div>
    );
}