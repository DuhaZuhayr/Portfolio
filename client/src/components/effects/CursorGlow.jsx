import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        background:
          'radial-gradient(circle, rgba(108, 99, 255, 0.07) 0%, rgba(91, 52, 217, 0.04) 35%, transparent 70%)',
        filter: 'blur(2px)',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};

export default CursorGlow;
