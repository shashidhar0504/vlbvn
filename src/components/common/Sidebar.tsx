import React from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Share2,
  Briefcase,
  Calendar,
  QrCode,
  Award,
  HeartHandshake,
  MessageSquareQuote,
  Megaphone,
  BarChart3,
  FileText,
  ShieldCheck,
  Settings,
  Bell,
  User,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentRole, currentRoute, setCurrentRoute, applications, referrals, testimonials } = useDemo();

  const pendingAppsCount = applications.filter((a) => a.status === 'PENDING_REVIEW').length;
  const pendingTestimonialsCount = testimonials.filter((t) => t.approvalStatus === 'PENDING').length;
  const activeReferralsCount = referrals.filter((r) => r.status !== 'CONVERTED' && r.status !== 'CLOSED').length;

  const isAdminView = currentRole === 'SUPER_ADMIN' || currentRole === 'COMMUNITY_ADMIN' || currentRole === 'COORDINATOR';

  const memberNavItems: NavGroup[] = [
    {
      group: 'Overview',
      items: [
        { label: 'Member Dashboard', path: '/member/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'My Business Profile', path: '/member/profile', icon: <User className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Business Networking',
      items: [
        { label: 'Member Directory', path: '/member/directory', icon: <Users className="w-4 h-4" /> },
        { label: 'Give a Referral', path: '/member/give-referral', icon: <UserPlus className="w-4 h-4" /> },
        {
          label: 'My Referrals',
          path: '/member/referrals',
          icon: <Share2 className="w-4 h-4" />,
          badge: activeReferralsCount > 0 ? activeReferralsCount : undefined,
        },
        { label: 'Collaborations', path: '/member/collaborations', icon: <Briefcase className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Meetings & Community',
      items: [
        { label: 'Meetings & Agendas', path: '/member/meetings', icon: <Calendar className="w-4 h-4" /> },
        { label: 'My Attendance Log', path: '/member/attendance', icon: <QrCode className="w-4 h-4" /> },
        { label: 'Thank-You Center', path: '/member/thank-you', icon: <HeartHandshake className="w-4 h-4" /> },
        { label: 'Testimonials', path: '/member/testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
        { label: 'Contributions & Recognition', path: '/member/contributions', icon: <Award className="w-4 h-4" /> },
        { label: 'Notifications', path: '/member/notifications', icon: <Bell className="w-4 h-4" /> },
      ],
    },
  ];

  const adminNavItems: NavGroup[] = [
    {
      group: 'Command Center',
      items: [
        { label: 'Admin Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        {
          label: 'Membership Requests',
          path: '/admin/requests',
          icon: <UserPlus className="w-4 h-4" />,
          badge: pendingAppsCount > 0 ? pendingAppsCount : undefined,
          badgeColor: 'bg-amber-500 text-stone-950 font-bold',
        },
        { label: 'Members Directory Admin', path: '/admin/members', icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Community Operations',
      items: [
        { label: 'Referral System Analytics', path: '/admin/referrals', icon: <Share2 className="w-4 h-4" /> },
        { label: 'Collaborations Board', path: '/admin/collaborations', icon: <Briefcase className="w-4 h-4" /> },
        { label: 'Meetings & Agenda Builder', path: '/admin/meetings', icon: <Calendar className="w-4 h-4" /> },
        { label: 'Live QR Attendance Monitor', path: '/admin/attendance', icon: <QrCode className="w-4 h-4" /> },
        {
          label: 'Testimonials Approval Queue',
          path: '/admin/testimonials',
          icon: <MessageSquareQuote className="w-4 h-4" />,
          badge: pendingTestimonialsCount > 0 ? pendingTestimonialsCount : undefined,
        },
        { label: 'Communication Broadcast', path: '/admin/communication', icon: <Megaphone className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Governance & Analytics',
      items: [
        { label: 'Reports & Analytics', path: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'Audit Security Logs', path: '/admin/audit-logs', icon: <FileText className="w-4 h-4" /> },
        { label: 'Roles & Permission Matrix', path: '/admin/roles', icon: <ShieldCheck className="w-4 h-4" /> },
        { label: 'Platform Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const currentNavGroups = isAdminView ? adminNavItems : memberNavItems;

  return (
    <aside className="w-64 bg-white text-stone-800 min-h-[calc(100vh-4rem)] border-r border-stone-200 shrink-0 p-4 hidden md:block shadow-xs">
      {/* Role Badge Indicator Header */}
      <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-orange-500/10 border border-amber-300 shadow-2xs">
        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 block">Current Space</span>
        <span className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5 mt-0.5">
          {isAdminView ? '🛡️ Administrator Suite' : '👤 Member Workspace'}
        </span>
      </div>

      {/* Nav Section Groups */}
      <div className="space-y-6 text-xs">
        {currentNavGroups.map((group) => (
          <div key={group.group}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70 mb-2 px-2">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = currentRoute === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => setCurrentRoute(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-sm'
                        : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          item.badgeColor || (isActive ? 'bg-amber-100/60 text-stone-950' : 'bg-amber-500 text-stone-950')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
