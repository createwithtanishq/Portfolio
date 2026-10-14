import React, { useEffect, useRef } from 'react';

/* Pointer-reactive depth starfield on a canvas. Sits behind all content.
   Static single-frame render when reduced motion is requested. */
const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf;

    const COLORS = ['#eaf0ff', '#9fb4ff', '#ffb38c', '#8ef0d8'];

    const init = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(170, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z: depth, // 0 far .. 1 near
          r: 0.4 + depth * 1.6,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          tw: Math.random() * Math.PI * 2,
          tws: 0.6 + Math.random() * 1.6,
        };
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      for (const s of stars) {
        const px = s.x + mouse.x * s.z * 40;
        const py = s.y + mouse.y * s.z * 40;
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.tws + s.tw);
        ctx.globalAlpha = (0.25 + s.z * 0.6) * tw;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.z > 0.82) {
          ctx.globalAlpha *= 0.4;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      init();
      if (reduce) draw(0);
    };

    init();
    draw(0);
    if (!reduce) window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: -3 }}
    />
  );
};

export default Starfield;
