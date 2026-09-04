import React from 'react';

type BadgeVariant =
  | 'PENDING_REVIEW'
  | 'INFO_REQUIRED'
  | 'APPROVED'
  | 'ACTIVATED'
  | 'SUSPENDED'
  | 'REJECTED'
  | 'CREATED'
  | 'RECEIVED'
  | 'CONTACTED'
  | 'IN_DISCUSSION'
  | 'CONVERTED'
  | 'NOT_CONVERTED'
  | 'CLOSED'
  | 'PRESENT'
  | 'LATE'
  | 'ABSENT'
  | 'UPCOMING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'LOOKING_FOR'
  | 'CAN_HELP_WITH';

interface BadgeProps {
  status: BadgeVariant | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const badgeStyles: Record<string, string> = {
    PENDING_REVIEW: 'bg-amber-100 text-amber-800 border-amber-300',
    INFO_REQUIRED: 'bg-blue-100 text-blue-800 border-blue-300',
    APPROVED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ACTIVATED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    SUSPENDED: 'bg-stone-200 text-stone-700 border-stone-300',
    REJECTED: 'bg-red-100 text-red-800 border-red-300',

    CREATED: 'bg-stone-100 text-stone-800 border-stone-300',
    RECEIVED: 'bg-blue-100 text-blue-800 border-blue-300',
    CONTACTED: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    IN_DISCUSSION: 'bg-amber-100 text-amber-900 border-amber-300',
    CONVERTED: 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold',
    NOT_CONVERTED: 'bg-rose-100 text-rose-800 border-rose-300',
    CLOSED: 'bg-stone-100 text-stone-600 border-stone-200',

    PRESENT: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    LATE: 'bg-amber-100 text-amber-800 border-amber-300',
    ABSENT: 'bg-red-100 text-red-800 border-red-300',

    UPCOMING: 'bg-amber-100 text-amber-900 border-amber-300',
    IN_PROGRESS: 'bg-blue-100 text-blue-900 border-blue-300',
    COMPLETED: 'bg-emerald-100 text-emerald-900 border-emerald-300',

    LOOKING_FOR: 'bg-purple-100 text-purple-800 border-purple-300',
    CAN_HELP_WITH: 'bg-amber-100 text-amber-900 border-amber-300',
  };

  const currentStyle = badgeStyles[status] || 'bg-stone-100 text-stone-800 border-stone-300';
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wide uppercase rounded-full border shadow-2xs ${sizeClass} ${currentStyle} ${className}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};
