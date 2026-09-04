import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { QrCode, Calendar, CheckCircle2, Award, Clock } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { currentUser, meetings } = useDemo();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <QrCode className="w-6 h-6 text-amber-700" />
          <span>My Attendance Log & Verification</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Review your meeting attendance record and overall conclave participation score.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-card space-y-1">
          <span className="text-stone-500 text-xs font-bold uppercase">Attendance Rate</span>
          <div className="text-3xl font-black text-emerald-600">{currentUser.stats.attendancePercentage}%</div>
          <span className="text-[11px] text-stone-400">Target: Above 90%</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-card space-y-1">
          <span className="text-stone-500 text-xs font-bold uppercase">Conclaves Attended</span>
          <div className="text-3xl font-black text-stone-900">14 Meetings</div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Verified via QR</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-card space-y-1">
          <span className="text-stone-500 text-xs font-bold uppercase">Attendance Badge</span>
          <div className="text-xl font-extrabold text-amber-800">Attendance Champion</div>
          <span className="text-[11px] text-stone-400">Awarded by Chapter Leadership</span>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-stone-100 font-bold text-stone-900 text-sm">
          Verified Attendance History
        </div>
        <div className="divide-y divide-stone-100 text-xs">
          {meetings.map((mtg) => (
            <div key={mtg.id} className="p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-stone-900 text-sm">{mtg.title}</div>
                <div className="text-stone-500">{mtg.date} ({mtg.time}) • {mtg.venue}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PRESENT (QR Verified)</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
