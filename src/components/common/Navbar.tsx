import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { VlbvnLogo } from './VlbvnLogo';
import {
  Bell,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
  QrCode,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, currentUser, notifications, currentRoute, setCurrentRoute, switchRole, setActiveMeetingQrModal, meetings } = useDemo();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const publicNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Membership', path: '/membership' },
    { label: 'Benefits', path: '/benefits' },
    { label: 'Community', path: '/community' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleQrAttendanceClick = () => {
    const nextMeeting = meetings.find((m) => m.status === 'UPCOMING') || meetings[0];
    if (nextMeeting) {
      setActiveMeetingQrModal(nextMeeting);
    }
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-9 z-40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentRoute(currentRole === 'VISITOR' ? '/' : currentRole === 'MEMBER' ? '/member/dashboard' : '/admin/dashboard')}>
              <VlbvnLogo variant="color" size="md" />
            </button>
          </div>

          {/* Desktop Navigation for Visitor / Public Website */}
          {currentRole === 'VISITOR' ? (
            <nav className="hidden lg:flex items-center gap-6">
              {publicNavLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => setCurrentRoute(link.path)}
                  className={`text-sm font-semibold transition-colors ${
                    currentRoute === link.path ? 'text-[#E66B27] border-b-2 border-[#E66B27] pb-1' : 'text-stone-600 hover:text-amber-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              {/* Quick Action Button for Members */}
              {currentRole === 'MEMBER' && (
                <button
                  onClick={() => setCurrentRoute('/member/give-referral')}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-sm hover:brightness-105 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Give Referral</span>
                </button>
              )}

              {/* QR Attendance Button */}
              <button
                onClick={handleQrAttendanceClick}
                className="flex items-center gap-1.5 bg-amber-50 text-amber-900 font-bold text-xs px-3 py-2 rounded-xl hover:bg-amber-100 transition-colors border border-amber-200"
              >
                <QrCode className="w-4 h-4 text-amber-700" />
                <span>QR Check-In</span>
              </button>
            </div>
          )}

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {currentRole === 'VISITOR' ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentRoute('/login')}
                  className="text-stone-700 font-bold text-sm hover:text-amber-900 px-3 py-1.5 transition-colors"
                >
                  Member Login
                </button>
                <button
                  onClick={() => setCurrentRoute('/apply-membership')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4.5 py-2.5 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-1.5"
                >
                  <span>Apply for Membership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Notification Bell Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg relative transition-colors"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-xl shadow-xl z-50 p-3">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                        <span className="font-bold text-xs text-stone-900">Notifications ({notifications.length})</span>
                        <button onClick={() => setCurrentRoute('/member/notifications')} className="text-[11px] font-medium text-amber-700 hover:underline">
                          View All
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="p-2 bg-stone-50 hover:bg-amber-50/50 rounded-lg text-xs transition-colors cursor-pointer" onClick={() => {
                            setShowNotifications(false);
                            if (n.actionUrl) setCurrentRoute(n.actionUrl);
                          }}>
                            <div className="font-bold text-stone-900">{n.title}</div>
                            <div className="text-stone-600 text-[11px] mt-0.5">{n.message}</div>
                            <div className="text-[9px] text-stone-400 mt-1">{n.timestamp}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Pill Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50/50 transition-all"
                  >
                    <img
                      src={currentUser.photoUrl}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                    />
                    <div className="hidden sm:flex flex-col text-left leading-none">
                      <span className="font-bold text-xs text-stone-900">{currentUser.name}</span>
                      <span className="text-[10px] font-semibold text-amber-800 uppercase mt-0.5">
                        {currentRole.replace('_', ' ')}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-2">
                      <div className="px-4 py-2 border-b border-stone-100">
                        <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                        <p className="text-[11px] text-stone-500 truncate">{currentUser.businessName}</p>
                      </div>
                      <div className="py-1 text-xs">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            setCurrentRoute('/member/profile');
                          }}
                          className="w-full text-left px-4 py-2 text-stone-700 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2 font-semibold"
                        >
                          <User className="w-4 h-4 text-stone-400" />
                          <span>My Business Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            switchRole('VISITOR');
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout / Public View</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-stone-900 border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          {currentRole === 'VISITOR' ? (
            <div className="space-y-2">
              {publicNavLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    setCurrentRoute(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 font-semibold text-sm text-stone-700 hover:text-amber-700 border-b border-stone-100"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setCurrentRoute('/apply-membership');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold py-2.5 rounded-xl text-center text-xs shadow-sm"
                >
                  Apply for Membership
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setCurrentRoute('/member/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 font-bold text-amber-700"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('/member/directory');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-stone-700"
              >
                Member Directory
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('/member/referrals');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-stone-700"
              >
                Referrals & Automation
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('/member/meetings');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-stone-700"
              >
                Meetings & QR Code
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
