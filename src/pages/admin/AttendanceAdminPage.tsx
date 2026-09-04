import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { QrCode } from 'lucide-react';

export const AttendanceAdminPage: React.FC = () => {
  const { meetings, setActiveMeetingQrModal } = useDemo();
  const activeMtg = meetings[0];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <QrCode className="w-6 h-6 text-amber-700" />
            <span>Live QR Attendance Monitor</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Real-time venue check-in verification monitor for conclaves.
          </p>
        </div>

        <button
          onClick={() => setActiveMeetingQrModal(activeMtg)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Launch QR Scanner Token</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 text-xs">
        <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
          Meeting: {activeMtg.title} ({activeMtg.date})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-semibold block">Total Registered</span>
            <span className="text-2xl font-black text-stone-900">85 Members</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <span className="text-emerald-800 font-semibold block">Present & Verified</span>
            <span className="text-2xl font-black text-emerald-700">79 Members</span>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="text-amber-900 font-semibold block">Attendance Rate</span>
            <span className="text-2xl font-black text-amber-800">93%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
