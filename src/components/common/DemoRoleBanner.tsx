import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { UserRole } from '../../types';
import { ShieldCheck, UserCheck, Calendar, Users, Eye, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

export const DemoRoleBanner: React.FC = () => {
  const { currentRole, currentUser, switchRole, setCurrentRoute } = useDemo();
  const [isExpanded, setIsExpanded] = useState(true);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
    {
      role: 'SUPER_ADMIN',
      label: 'Super Admin',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'bg-amber-500 text-stone-950 hover:bg-amber-400',
      desc: 'Complete System Authority & Audit Logs',
    },
    {
      role: 'COMMUNITY_ADMIN',
      label: 'Community Admin',
      icon: <UserCheck className="w-4 h-4" />,
      color: 'bg-orange-500 text-white hover:bg-orange-600',
      desc: 'Member Approvals & Referrals Command',
    },
    {
      role: 'COORDINATOR',
      label: 'Coordinator',
      icon: <Calendar className="w-4 h-4" />,
      color: 'bg-blue-600 text-white hover:bg-blue-700',
      desc: 'Meetings & Live Attendance Operations',
    },
    {
      role: 'MEMBER',
      label: 'Member',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-emerald-600 text-white hover:bg-emerald-700',
      desc: 'Directory, Give Referrals & Collaborations',
    },
    {
      role: 'VISITOR',
      label: 'Public Visitor',
      icon: <Eye className="w-4 h-4" />,
      color: 'bg-stone-800 text-stone-100 hover:bg-stone-900',
      desc: 'Public Marketing Site & Apply Stepper',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-amber-100/90 via-amber-50 to-orange-100/90 text-stone-900 border-b border-amber-300/80 px-4 py-2 text-xs sticky top-0 z-50 shadow-xs backdrop-blur-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Interactive Role Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-950 px-2.5 py-1 rounded-full border border-amber-400/50">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-700" />
            <span className="font-extrabold tracking-wide uppercase text-[10px]">VLBVN Interactive Demo Controller</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-stone-700 text-xs">
            <span>Active View:</span>
            <span className="font-extrabold text-amber-900 flex items-center gap-1">
              {currentUser.name} ({currentRole.replace('_', ' ')})
            </span>
          </div>
        </div>

        {/* Right: Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((item) => {
            const isActive = currentRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => switchRole(item.role)}
                title={item.desc}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs font-semibold ${
                  isActive
                    ? `${item.color} ring-2 ring-amber-500/50 shadow-xs scale-105`
                    : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-300/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
