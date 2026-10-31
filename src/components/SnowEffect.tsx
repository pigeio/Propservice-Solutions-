import React, { useEffect, useRef, useState } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  speed: number;
  opacity: number;
  swaySpeed: number;
  swayOffset: number;
}

export const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate 45-60 graceful snowflakes
    const flakeCount = Math.min(65, Math.floor(width / 22));
    const flakes: Snowflake[] = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2, // between 1.2px and 4px
        density: Math.random() * 25 + 10,
        speed: Math.random() * 0.9 + 0.6, // gentle drift
        opacity: Math.random() * 0.55 + 0.25, // soft translucent glow
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.01;

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Horizontal sway calculation
        const horizontalDrift = Math.sin(angle + flake.swayOffset) * 0.8;

        flake.y += flake.speed;
        flake.x += horizontalDrift;

        // Wrap around bottom
        if (flake.y > height + 10) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }

        // Wrap around horizontal edges
        if (flake.x > width + 10) {
          flake.x = -10;
        } else if (flake.x < -10) {
          flake.x = width + 10;
        }

        // Draw soft glowing snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <>
      {/* Falling Snow Canvas Overlay */}
      {isActive && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 h-full w-full select-none"
        />
      )}

      {/* Floating Holiday Snow Controller Pill (Placed cleanly above live tracking toast) */}
      <div className="fixed bottom-52 sm:bottom-56 right-5 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          title={isActive ? 'Turn off falling snow' : 'Turn on falling snow'}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:scale-105 border cursor-pointer ${
            isActive
              ? 'border-red-300 bg-red-50/95 text-red-700 dark:border-red-900 dark:bg-red-950/90 dark:text-red-300'
              : 'border-neutral-300 bg-white/90 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-400'
          }`}
        >
          <span className="text-sm">{isActive ? '❄️' : '⛄'}</span>
          <span>{isActive ? 'Snow: ON' : 'Snow: OFF'}</span>
        </button>
      </div>
    </>
  );
};
