import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const VlbvnLogo: React.FC<LogoProps> = ({
  variant = 'color',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 28, title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 38, title: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 48, title: 'text-2xl', sub: 'text-[11px]' },
    xl: { icon: 64, title: 'text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  const textColor = variant === 'dark' ? 'text-white' : variant === 'light' ? 'text-stone-900' : 'text-stone-900';
  const subColor = variant === 'dark' ? 'text-amber-200/80' : 'text-amber-900/70';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* VLBVN Golden Geometric Emblem SVG */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="vlbvnGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>

          <linearGradient id="vlbvnOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#E66B27" />
          </linearGradient>

          <linearGradient id="vlbvnDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2C1D14" />
            <stop offset="100%" stopColor="#1C120C" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Golden Sacred Ring */}
        <circle cx="50" cy="50" r="46" stroke="url(#vlbvnGoldGrad)" strokeWidth="3" fill="url(#vlbvnDarkGrad)" />
        <circle cx="50" cy="50" r="41" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Lotus Petals Base */}
        <path
          d="M 50 82 C 30 82 20 68 20 62 C 32 64 42 70 50 78 C 58 70 68 64 80 62 C 80 68 70 82 50 82 Z"
          fill="url(#vlbvnOrangeGrad)"
          opacity="0.9"
        />

        {/* Central Lingam / Visionary Pillar */}
        <path
          d="M 50 20 C 42 20 40 28 40 38 C 40 50 42 58 50 58 C 58 58 60 50 60 38 C 60 28 58 20 50 20 Z"
          fill="url(#vlbvnGoldGrad)"
          filter="url(#goldGlow)"
        />

        {/* Sacred Tripundra (Three Horizontal Lines of Wisdom) */}
        <line x1="43" y1="30" x2="57" y2="30" stroke="#1C120C" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="34" x2="58" y2="34" stroke="#1C120C" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="43" y1="38" x2="57" y2="38" stroke="#1C120C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="34" r="1.5" fill="#E66B27" />

        {/* Interlocked Business Network Hands Symbolism */}
        <path
          d="M 30 52 C 38 46 45 48 50 54 C 55 48 62 46 70 52"
          stroke="url(#vlbvnGoldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Connecting Nodes */}
        <circle cx="28" cy="52" r="3" fill="#E66B27" />
        <circle cx="72" cy="52" r="3" fill="#E66B27" />
        <circle cx="50" cy="54" r="3.5" fill="#F5D77F" />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight ${currentSize.title} ${textColor}`}>
          VLBVN<span className="text-[#E66B27]">.</span>
        </span>
        {showSubtitle && (
          <span className={`font-semibold tracking-wider uppercase mt-0.5 ${currentSize.sub} ${subColor}`}>
            Veerashaiva Lingayat Business Visionary Network
          </span>
        )}
      </div>
    </div>
  );
};
