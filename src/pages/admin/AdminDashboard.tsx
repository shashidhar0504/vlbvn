import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  Users,
  UserPlus,
  Share2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  MessageSquareQuote,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    members,
    applications,
    referrals,
    testimonials,
    auditLogs,
    setCurrentRoute,
  } = useDemo();

  const pendingApps = applications.filter((a) => a.status === 'PENDING_REVIEW');
  const convertedReferrals = referrals.filter((r) => r.status === 'CONVERTED');
  const pendingTestimonials = testimonials.filter((t) => t.approvalStatus === 'PENDING');

  return (
    <div className="space-y-8 pb-12">
      {/* Header Greeting - Light Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/15 via-amber-100/50 to-orange-500/10 text-stone-900 p-6 sm:p-7 rounded-3xl border-2 border-amber-300 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
              VLBVN Operational Control Center
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900">Welcome back, {currentUser.name}</h1>
          <p className="text-stone-600 text-xs font-medium">
            Managing community operations, membership approvals, referrals, and conclaves.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentRoute('/admin/requests')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Review Applications ({pendingApps.length})</span>
          </button>
        </div>
      </div>

      {/* Top Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Active Members"
          value={members.filter((m) => m.status === 'ACTIVATED').length}
          subtitle="Verified business visionaries"
          trend={{ value: '+14% this month', isPositive: true }}
          icon={<Users className="w-6 h-6 text-amber-700" />}
          onClick={() => setCurrentRoute('/admin/members')}
        />
        <StatCard
          title="Pending Applications"
          value={pendingApps.length}
          subtitle="Dossiers awaiting admin review"
          icon={<UserPlus className="w-6 h-6 text-orange-600" />}
          iconBg="bg-orange-50 text-orange-700 border-orange-200/50"
          onClick={() => setCurrentRoute('/admin/requests')}
        />
        <StatCard
          title="Referral Volume"
          value={`₹ ${referrals.length * 45} Lakhs`}
          subtitle={`${convertedReferrals.length} converted mandates`}
          trend={{ value: '84% success rate', isPositive: true }}
          icon={<Share2 className="w-6 h-6 text-emerald-600" />}
          iconBg="bg-emerald-50 text-emerald-700 border-emerald-200/50"
          onClick={() => setCurrentRoute('/admin/referrals')}
        />
        <StatCard
          title="Testimonials Pending"
          value={pendingTestimonials.length}
          subtitle="Awaiting publication approval"
          icon={<MessageSquareQuote className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-50 text-blue-700 border-blue-200/50"
          onClick={() => setCurrentRoute('/admin/testimonials')}
        />
      </div>

      {/* Action Center Banner */}
      {pendingApps.length > 0 && (
        <div className="bg-amber-500/10 border-2 border-amber-400 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500 text-stone-950 rounded-xl font-bold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-sm">Action Required: Pending Membership Requests</h3>
              <p className="text-xs text-stone-600 mt-0.5">
                {pendingApps.length} new membership dossier requires review and approval.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentRoute('/admin/requests')}
            className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow hover:brightness-105 transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <span>Review Requests Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Pending Approvals & Audit Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Applications Queue Quick Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-700" />
                <span>Recent Membership Applications</span>
              </h3>
              <button
                onClick={() => setCurrentRoute('/admin/requests')}
                className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
              >
                <span>View Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-stone-50 hover:bg-amber-50/50 rounded-xl border border-stone-200/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={app.photoUrl}
                      alt={app.applicantName}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{app.applicantName}</h4>
                      <p className="text-xs text-stone-500">{app.businessName} ({app.city})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <Badge status={app.status} />
                    <button
                      onClick={() => setCurrentRoute(`/admin/requests?reviewId=${app.id}`)}
                      className="bg-amber-50 border border-amber-300 text-amber-950 hover:bg-amber-100 font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Security Audit Activity Stream */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                <span>System Security Audit Feed</span>
              </h3>
              <button
                onClick={() => setCurrentRoute('/admin/audit-logs')}
                className="text-xs font-bold text-amber-800 hover:underline"
              >
                Full Audit Log
              </button>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>{log.actorName}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{log.timestamp}</span>
                  </div>
                  <div className="font-semibold text-amber-800 text-[11px] uppercase tracking-wide">{log.action}</div>
                  <p className="text-stone-600 text-[11px]">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
