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
    sm: { icon: 'w-8 h-8', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', title: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', title: 'text-2xl', sub: 'text-[11px]' },
    xl: { icon: 'w-20 h-20', title: 'text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  const textColor = variant === 'dark' ? 'text-white' : variant === 'light' ? 'text-stone-900' : 'text-stone-900';
  const subColor = variant === 'dark' ? 'text-amber-200/80' : 'text-amber-900/70';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official VLBVN Circular Emblem Logo */}
      <img
        src="/vlbvn-logo.png"
        alt="VLBVN Official Logo"
        className={`${currentSize.icon} object-contain rounded-full drop-shadow-md transition-transform duration-300 hover:scale-105 shrink-0`}
      />

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
