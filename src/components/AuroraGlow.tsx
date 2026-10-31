import React from 'react';

interface AuroraGlowProps {
  variant?: 'hero' | 'section' | 'subtle';
  className?: string;
}

export const AuroraGlow: React.FC<AuroraGlowProps> = ({ variant = 'section', className = '' }) => {
  if (variant === 'hero') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}>
        {/* Golden Amber Primary Orb (Top Right / Center) */}
        <div className="animate-aurora-1 absolute -top-24 right-1/4 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-amber-500/25 via-amber-400/15 to-transparent blur-[120px] dark:from-amber-500/20 dark:via-amber-600/10" />

        {/* Emerald Municipal Clearance Orb (Bottom Left) */}
        <div className="animate-aurora-2 absolute -bottom-20 -left-20 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-[130px] dark:from-emerald-600/15 dark:via-teal-600/5" />

        {/* Soft Center Fill Gold Light */}
        <div className="animate-aurora-pulse absolute top-1/3 left-1/3 h-[380px] w-[380px] rounded-full bg-amber-400/10 blur-[100px] dark:bg-amber-500/10" />

        {/* Architectural Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#80808018_1px,transparent_1px)] bg-[size:28px_28px] opacity-75 dark:opacity-40" />
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}>
        <div className="animate-aurora-1 absolute -top-32 right-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px] dark:bg-amber-500/15" />
        <div className="animate-aurora-2 absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-600/10" />
      </div>
    );
  }

  // Standard Section Variant
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}>
      {/* Top Ambient Glow */}
      <div className="animate-aurora-1 absolute -top-40 right-1/3 h-[420px] w-[420px] rounded-full bg-gradient-to-b from-amber-500/15 via-amber-400/10 to-transparent blur-[110px] dark:from-amber-600/15" />

      {/* Bottom Counter Glow */}
      <div className="animate-aurora-2 absolute -bottom-32 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-t from-emerald-500/15 via-teal-500/5 to-transparent blur-[120px] dark:from-emerald-700/10" />

      {/* Micro-dot overlay for textured depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808014_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 dark:opacity-30" />
    </div>
  );
};

