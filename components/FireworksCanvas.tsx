import React, { useEffect, useRef } from 'react';

const COLORS = [
  '#ff0043', '#14fc56', '#1e7fff', '#e60aff', '#ffbf36', '#ffffff'
];

export const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Game state
    let fireworks: any[] = [];
    let particles: any[] = [];
    let animationId: number;

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const createFirework = () => {
      const x = random(width * 0.1, width * 0.9);
      const targetY = random(height * 0.1, height * 0.4);
      const startY = height;
      
      fireworks.push({
        x,
        y: startY,
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: random(4, 7),
        angle: Math.PI / 2 + random(-0.1, 0.1), // Slight drift
        exploded: false
      });
    };

    const createParticles = (x: number, y: number, color: string) => {
      const particleCount = 60;
      for (let i = 0; i < particleCount; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(1, 6);
        const friction = 0.95;
        const gravity = 0.05;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: random(0.01, 0.03),
          friction,
          gravity
        });
      }
    };

    const loop = () => {
      // Clear with trail effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Controls trail length
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Update Fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const f = fireworks[i];
        
        f.y -= f.speed;
        f.x += Math.cos(f.angle); // Slight drift

        // Draw firework trail
        ctx.beginPath();
        ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.fill();

        if (f.y <= f.targetY) {
          f.exploded = true;
          createParticles(f.x, f.y, f.color);
          fireworks.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Randomly spawn new fireworks
      if (Math.random() < 0.05) { // 5% chance per frame
        createFirework();
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};