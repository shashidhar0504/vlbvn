import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Badge } from '../../components/common/Badge';
import {
  Building,
  MapPin,
  Share2,
  Award,
} from 'lucide-react';

export const MemberProfileDetailPage: React.FC = () => {
  const { members, currentUser, setCurrentRoute } = useDemo();

  // Extract query param ?id= or fallback to currentUser
  const params = new URLSearchParams(window.location.search);
  const targetId = params.get('id') || currentUser.id;
  const profile = members.find((m) => m.id === targetId) || currentUser;

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-[#1C120C] via-[#2C1D14] to-[#130C08] text-white p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-500 shadow-lg shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.name}</h1>
                <Badge status={profile.status} />
              </div>
              <p className="text-amber-300 font-bold text-sm sm:text-base">
                {profile.profession} at {profile.businessName}
              </p>
              <div className="flex items-center gap-4 text-xs text-stone-300 flex-wrap">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  {profile.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {profile.city}, {profile.state}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setCurrentRoute(`/member/give-referral?receiverId=${profile.id}`)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Give Referral to {profile.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* Badges Bar */}
        <div className="pt-4 border-t border-stone-800 flex items-center gap-2 flex-wrap">
          {profile.badges.map((b) => (
            <span key={b} className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{b}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grid: Details & VLBVN Activity Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Business Bio & Offerings */}
        <div className="lg:col-span-8 space-y-6">
          {/* About Bio */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-3">
            <h3 className="font-extrabold text-stone-900 text-base border-b border-stone-100 pb-2">About Business & Vision</h3>
            <p className="text-stone-700 text-xs leading-relaxed">{profile.aboutBio}</p>
          </div>

          {/* How I Can Help & What I'm Looking For */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 shadow-card space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">How I Can Help Members</span>
              <p className="text-stone-800 text-xs leading-relaxed font-semibold">"{profile.howICanHelp}"</p>
            </div>

            <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-6 shadow-card space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-900 block">What I Am Looking For</span>
              <p className="text-stone-800 text-xs leading-relaxed font-semibold">"{profile.whatImLookingFor}"</p>
            </div>
          </div>

          {/* Services Offered */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-3">
            <h3 className="font-extrabold text-stone-900 text-base border-b border-stone-100 pb-2">Products & Services Offered</h3>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {profile.services.map((svc) => (
                <span key={svc} className="bg-stone-100 text-stone-800 font-bold px-3 py-1.5 rounded-xl border border-stone-200">
                  ✓ {svc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: VLBVN Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">VLBVN Community Metrics</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-600">Referrals Given</span>
                <span className="font-bold text-stone-900 text-sm">{profile.stats.referralsGiven}</span>
              </div>

              <div className="flex justify-between items-center bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-600">Successful Mandates</span>
                <span className="font-bold text-emerald-600 text-sm">{profile.stats.successfulReferrals}</span>
              </div>

              <div className="flex justify-between items-center bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-600">Attendance Rate</span>
                <span className="font-bold text-blue-600 text-sm">{profile.stats.attendancePercentage}%</span>
              </div>

              <div className="flex justify-between items-center bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-600">Contribution Points</span>
                <span className="font-bold text-amber-800 text-sm">{profile.stats.contributionPoints} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
