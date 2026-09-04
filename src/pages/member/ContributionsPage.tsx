import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Award, Star, Trophy, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const ContributionsPage: React.FC = () => {
  const { currentUser, members } = useDemo();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-700" />
          <span>Contributions & Community Recognition Wall</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Professional recognition of meaningful business contributions, referrals given, and community leadership.
        </p>
      </div>

      {/* Member Score Card */}
      <div className="bg-gradient-to-r from-[#1C120C] to-[#2C1D14] text-white p-6 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Your Community Contribution Score</span>
          <div className="text-4xl font-extrabold text-white flex items-center gap-2">
            <span>{currentUser.stats.contributionPoints}</span>
            <span className="text-sm font-semibold text-amber-400">Points</span>
          </div>
          <p className="text-stone-300 text-xs">Top 5% Network Builder in Pune & Global Chapters</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {currentUser.badges.map((b) => (
            <span key={b} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{b}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card text-xs">
        <div className="p-4 border-b border-stone-100 font-extrabold text-stone-900 text-sm flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          <span>VLBVN Community Champions Leaderboard</span>
        </div>

        <div className="divide-y divide-stone-100 font-medium">
          {members
            .sort((a, b) => b.stats.contributionPoints - a.stats.contributionPoints)
            .map((m, idx) => (
              <div key={m.id} className="p-4 flex items-center justify-between hover:bg-amber-50/40 transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center font-black text-sm ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-stone-400' : idx === 2 ? 'text-amber-700' : 'text-stone-400'}`}>
                    #{idx + 1}
                  </span>
                  <img src={m.photoUrl} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{m.name}</div>
                    <div className="text-stone-500">{m.businessName} ({m.city})</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="font-extrabold text-stone-900 text-sm block">{m.stats.contributionPoints} pts</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{m.stats.successfulReferrals} Converted Mandates</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
