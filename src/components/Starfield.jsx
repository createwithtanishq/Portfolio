import React, { useEffect, useRef } from 'react';

/* Pointer-reactive depth starfield with occasional shooting stars.
   Renders a single static frame when reduced motion is requested. */
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
    let shooting = [];
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
      const count = Math.min(200, Math.floor((w * h) / 7800));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z: depth,
          r: 0.5 + depth * 1.8,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          tw: Math.random() * Math.PI * 2,
          tws: 0.6 + Math.random() * 1.8,
        };
      });
    };

    const spawnShooter = () => {
      const fromLeft = Math.random() > 0.5;
      shooting.push({
        x: fromLeft ? -40 : w + 40,
        y: Math.random() * h * 0.5,
        vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 5),
        vy: 2 + Math.random() * 2.5,
        life: 1,
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      for (const s of stars) {
        const px = s.x + mouse.x * s.z * 45;
        const py = s.y + mouse.y * s.z * 45;
        const tw = reduce ? 0.9 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.tws + s.tw);
        ctx.globalAlpha = (0.35 + s.z * 0.6) * tw;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.z > 0.8) {
          ctx.globalAlpha *= 0.35;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce) {
        if (Math.random() < 0.004 && shooting.length < 2) spawnShooter();
        shooting = shooting.filter((m) => m.life > 0);
        for (const m of shooting) {
          m.x += m.vx;
          m.y += m.vy;
          m.life -= 0.012;
          const len = 90;
          const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 6, m.y - m.vy * 6);
          g.addColorStop(0, `rgba(255,220,190,${Math.max(0, m.life)})`);
          g.addColorStop(1, 'rgba(255,220,190,0)');
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - (m.vx / Math.hypot(m.vx, m.vy)) * len, m.y - (m.vy / Math.hypot(m.vx, m.vy)) * len);
          ctx.stroke();
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
      style={{ zIndex: -1 }}
    />
  );
};

export default Starfield;
