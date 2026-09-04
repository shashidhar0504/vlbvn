import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  Share2,
  CheckCircle2,
  Calendar,
  Award,
  PlusCircle,
  Users,
  QrCode,
  ArrowRight,
  Sparkles,
  Clock,
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const { currentUser, referrals, meetings, setCurrentRoute, setActiveMeetingQrModal } = useDemo();

  const myGivenReferrals = referrals.filter((r) => r.referrerId === currentUser.id);
  const upcomingMeeting = meetings.find((m) => m.status === 'UPCOMING') || meetings[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner - Light Theme */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-100/50 to-orange-500/10 text-stone-900 p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.photoUrl}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                VLBVN Active Member
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                {currentUser.chapter}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Good morning, {currentUser.name}</h1>
            <p className="text-stone-700 text-xs sm:text-sm font-medium">
              {currentUser.profession} at <strong className="text-amber-900">{currentUser.businessName}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <button
            onClick={() => setCurrentRoute('/member/give-referral')}
            className="flex-1 md:flex-none bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Give Referral</span>
          </button>
          <button
            onClick={() => setCurrentRoute('/member/directory')}
            className="flex-1 md:flex-none bg-white text-stone-900 border border-stone-300 font-extrabold text-xs px-4 py-3 rounded-xl hover:bg-stone-50 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Users className="w-4 h-4 text-amber-700" />
            <span>Find Members</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="My Referrals Given"
          value={currentUser.stats.referralsGiven}
          subtitle="Opportunities shared"
          trend={{ value: '+4 this month', isPositive: true }}
          icon={<Share2 className="w-6 h-6 text-amber-700" />}
          onClick={() => setCurrentRoute('/member/referrals')}
        />
        <StatCard
          title="Successful Mandates"
          value={currentUser.stats.successfulReferrals}
          subtitle="Converted business"
          trend={{ value: '₹ 45L Value', isPositive: true }}
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
          iconBg="bg-emerald-50 text-emerald-700 border-emerald-200/50"
          onClick={() => setCurrentRoute('/member/referrals')}
        />
        <StatCard
          title="Attendance Rate"
          value={`${currentUser.stats.attendancePercentage}%`}
          subtitle="Conclave participation"
          icon={<Calendar className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-50 text-blue-700 border-blue-200/50"
          onClick={() => setCurrentRoute('/member/attendance')}
        />
        <StatCard
          title="Contribution Points"
          value={currentUser.stats.contributionPoints}
          subtitle="Community score"
          icon={<Award className="w-6 h-6 text-orange-600" />}
          iconBg="bg-orange-50 text-orange-700 border-orange-200/50"
          onClick={() => setCurrentRoute('/member/contributions')}
        />
      </div>

      {/* Your Action Center Prompts */}
      <div className="bg-amber-500/10 border-2 border-amber-300 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-700" />
          <h3 className="font-extrabold text-stone-900 text-sm">Your Action Center — Priority Tasks</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-orange-600">Referral Follow-up</span>
            <h4 className="font-bold text-xs text-stone-900">Follow up on Referral #REF-2026-104</h4>
            <p className="text-[11px] text-stone-500">Proposal in discussion with Vardhman Infra.</p>
            <button
              onClick={() => setCurrentRoute('/member/referrals')}
              className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Update Lifecycle Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-emerald-600">Send Thank-You</span>
            <h4 className="font-bold text-xs text-stone-900">Send Thank-You for Converted Referral</h4>
            <p className="text-[11px] text-stone-500">Priya Shreshthi converted Kalyani Solar mandate.</p>
            <button
              onClick={() => setCurrentRoute('/member/thank-you')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Send Templated Note</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-blue-600">Upcoming Meeting</span>
            <h4 className="font-bold text-xs text-stone-900">VLBVN Pune Growth Conclave</h4>
            <p className="text-[11px] text-stone-500">Sept 12 at JW Marriott Hotel Pune.</p>
            <button
              onClick={() => setActiveMeetingQrModal(upcomingMeeting)}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 pt-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Launch QR Attendance Token</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Referrals & Upcoming Meeting Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Referrals Tracker Quick Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-700" />
                <span>Active Referrals Lifecycle Tracker</span>
              </h3>
              <button
                onClick={() => setCurrentRoute('/member/referrals')}
                className="text-xs font-bold text-amber-800 hover:underline"
              >
                View All Referrals
              </button>
            </div>

            <div className="space-y-3">
              {myGivenReferrals.map((r) => (
                <div key={r.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-800">{r.id}</span>
                      <h4 className="font-bold text-sm text-stone-900">{r.businessOpportunity}</h4>
                    </div>
                    <Badge status={r.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>Passed to: <strong className="text-stone-900">{r.receiverName}</strong></span>
                    <span>Value: <strong className="text-stone-900">{r.estimatedValue}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Meeting Widget - Light Theme */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-amber-500/10 to-orange-500/10 text-stone-900 rounded-3xl p-6 shadow-card border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <span className="text-amber-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Next Chapter Conclave</span>
              </span>
              <span className="bg-amber-200 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase border border-amber-300">
                {upcomingMeeting.type}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-base text-stone-900">{upcomingMeeting.title}</h4>
              <div className="text-xs text-stone-700 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{upcomingMeeting.date} ({upcomingMeeting.time})</span>
                </div>
                <div className="text-stone-600 text-[11px] truncate">{upcomingMeeting.venue}</div>
              </div>
            </div>

            <button
              onClick={() => setActiveMeetingQrModal(upcomingMeeting)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs py-3 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Show My Attendance QR Token</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
