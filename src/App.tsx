import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { DemoRoleBanner } from './components/common/DemoRoleBanner';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { QrCodeModal } from './components/common/QrCodeModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { MembershipPage } from './pages/public/MembershipPage';
import { BenefitsPage } from './pages/public/BenefitsPage';
import { ContactPage } from './pages/public/ContactPage';
import { ApplyMembershipPage } from './pages/public/ApplyMembershipPage';
import { ApplicationSubmittedPage } from './pages/public/ApplicationSubmittedPage';
import { LoginPage } from './pages/auth/LoginPage';

// Member Portal Pages
import { MemberDashboard } from './pages/member/MemberDashboard';
import { MemberDirectoryPage } from './pages/member/MemberDirectoryPage';
import { MemberProfileDetailPage } from './pages/member/MemberProfileDetailPage';
import { GiveReferralPage } from './pages/member/GiveReferralPage';
import { ReferralsPage } from './pages/member/ReferralsPage';
import { CollaborationsPage } from './pages/member/CollaborationsPage';
import { MeetingsPage } from './pages/member/MeetingsPage';
import { AttendancePage } from './pages/member/AttendancePage';
import { ThankYouCenterPage } from './pages/member/ThankYouCenterPage';
import { TestimonialsPage } from './pages/member/TestimonialsPage';
import { ContributionsPage } from './pages/member/ContributionsPage';
import { NotificationsPage } from './pages/member/NotificationsPage';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MemberRequestsPage } from './pages/admin/MemberRequestsPage';
import { MembersManagementPage } from './pages/admin/MembersManagementPage';
import { ReferralsOverviewPage } from './pages/admin/ReferralsOverviewPage';
import { MeetingsManagementPage } from './pages/admin/MeetingsManagementPage';
import { AttendanceAdminPage } from './pages/admin/AttendanceAdminPage';
import { CommunicationCenterPage } from './pages/admin/CommunicationCenterPage';
import { TestimonialsApprovalPage } from './pages/admin/TestimonialsApprovalPage';
import { ReportsAnalyticsPage } from './pages/admin/ReportsAnalyticsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';
import { RolesPermissionsPage } from './pages/admin/RolesPermissionsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

const RouterContent: React.FC = () => {
  const { currentRoute, currentRole } = useDemo();

  // Helper to resolve route components
  const renderRouteComponent = () => {
    switch (currentRoute) {
      // Public / Marketing
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/membership':
        return <MembershipPage />;
      case '/benefits':
        return <BenefitsPage />;
      case '/contact':
        return <ContactPage />;
      case '/community':
        return <MemberDirectoryPage />;
      case '/events':
        return <MeetingsPage />;
      case '/apply-membership':
        return <ApplyMembershipPage />;
      case '/login':
      case '/forgot-password':
        return <LoginPage />;
      case (currentRoute.match(/\/apply-submitted.*/) || {}).input:
        return <ApplicationSubmittedPage />;

      // Member Portal
      case '/member/dashboard':
        return <MemberDashboard />;
      case (currentRoute.match(/\/member\/profile.*/) || {}).input:
        return <MemberProfileDetailPage />;
      case '/member/directory':
        return <MemberDirectoryPage />;
      case (currentRoute.match(/\/member\/give-referral.*/) || {}).input:
        return <GiveReferralPage />;
      case '/member/referrals':
      case (currentRoute.match(/\/member\/referrals\/.*/) || {}).input:
        return <ReferralsPage />;
      case '/member/collaborations':
        return <CollaborationsPage />;
      case '/member/meetings':
        return <MeetingsPage />;
      case '/member/attendance':
        return <AttendancePage />;
      case (currentRoute.match(/\/member\/thank-you.*/) || {}).input:
        return <ThankYouCenterPage />;
      case '/member/testimonials':
        return <TestimonialsPage />;
      case '/member/contributions':
        return <ContributionsPage />;
      case '/member/notifications':
        return <NotificationsPage />;

      // Admin Portal
      case '/admin/dashboard':
        return <AdminDashboard />;
      case (currentRoute.match(/\/admin\/requests.*/) || {}).input:
        return <MemberRequestsPage />;
      case '/admin/members':
        return <MembersManagementPage />;
      case '/admin/referrals':
        return <ReferralsOverviewPage />;
      case '/admin/collaborations':
        return <CollaborationsPage />;
      case '/admin/meetings':
        return <MeetingsManagementPage />;
      case '/admin/attendance':
        return <AttendanceAdminPage />;
      case '/admin/communication':
        return <CommunicationCenterPage />;
      case '/admin/testimonials':
        return <TestimonialsApprovalPage />;
      case '/admin/reports':
        return <ReportsAnalyticsPage />;
      case '/admin/audit-logs':
        return <AuditLogsPage />;
      case '/admin/roles':
        return <RolesPermissionsPage />;
      case '/admin/settings':
        return <SettingsPage />;

      default:
        return currentRole === 'VISITOR' ? <HomePage /> : currentRole === 'MEMBER' ? <MemberDashboard /> : <AdminDashboard />;
    }
  };

  const isPortalLayout = currentRoute.startsWith('/member/') || currentRoute.startsWith('/admin/');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col font-sans">
      {/* Sticky Demo Role Switcher Controls */}
      <DemoRoleBanner />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Workspace Body */}
      {isPortalLayout ? (
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Sidebar />
          <main className="flex-1 min-w-0 md:pl-6 pb-16">{renderRouteComponent()}</main>
        </div>
      ) : (
        <main className="flex-1">{renderRouteComponent()}</main>
      )}

      {/* Footer - Light Theme */}
      <footer className="bg-[#F4EFE6] text-stone-700 border-t border-amber-300/60 py-8 mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-semibold">
            <span className="font-extrabold text-amber-900">VLBVN</span> — Veerashaiva Lingayat Business Visionary Network © 2026. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-stone-600 font-semibold">
            <span className="hover:text-amber-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-amber-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-amber-900 cursor-pointer">Community Guidelines</span>
          </div>
        </div>
      </footer>

      {/* Floating Systems Modals & Toasts */}
      <QrCodeModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <DemoProvider>
      <RouterContent />
    </DemoProvider>
  );
}

export default App;
