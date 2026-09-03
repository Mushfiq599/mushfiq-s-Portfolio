'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Detect touch device — hide cursor entirely
        const touch = window.matchMedia('(hover: none)').matches;
        setIsTouch(touch);
        if (touch) return;

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
            dot.classList.add('visible');
            cursor.classList.add('visible');
        };

        const handleMouseLeave = () => {
            cursor.classList.remove('visible');
            dot.classList.remove('visible');
        };

        const handleHoverIn = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, [data-cursor="pointer"]')) {
                cursor.classList.add('expanded');
            }
        };

        const handleHoverOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, [data-cursor="pointer"]')) {
                cursor.classList.remove('expanded');
            }
        };

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.12;
            cursorY += (mouseY - cursorY) * 0.12;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseover', handleHoverIn);
        window.addEventListener('mouseout', handleHoverOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseover', handleHoverIn);
            window.removeEventListener('mouseout', handleHoverOut);
        };
    }, []);

    if (isTouch) return null;

    return (
        <>
            <div ref={cursorRef} className="custom-cursor-ring" />
            <div ref={dotRef} className="custom-cursor-dot" />
        </>
    );
}