import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBg?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg = 'bg-amber-50 text-amber-700 border-amber-200/50',
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-stone-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">{title}</span>
          <div className="text-2xl font-extrabold text-stone-900 tracking-tight">{value}</div>
        </div>
        <div className={`p-3 rounded-xl border ${iconBg} shrink-0`}>{icon}</div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-bold ${
                trend.isPositive ? 'text-emerald-600' : 'text-stone-500'
              }`}
            >
              {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {trend.value}
            </span>
          )}
          {subtitle && <span className="text-stone-500 text-[11px]">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
