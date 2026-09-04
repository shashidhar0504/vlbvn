import React from 'react';
import { BarChart3, Download } from 'lucide-react';

export const ReportsAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-700" />
            <span>Reports & Network Conversion Analytics</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Community growth metrics, referral conversion ratios, and chapter performance reports.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting VLBVN Network Analytics Report (PDF/Excel)...')}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow hover:brightness-110 transition-all flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4">
          <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
            Referral Conversion Performance
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Converted Business Mandates</span>
                <span className="text-emerald-600">84% Success Ratio</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full w-[84%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Conclave Attendance Score</span>
                <span className="text-amber-800">92% Average</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-3">
                <div className="bg-amber-500 h-3 rounded-full w-[92%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4">
          <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
            Chapter Growth Breakdown
          </h3>
          <div className="space-y-2">
            {[
              { chapter: 'Pune West Chapter', members: 142, growth: '+18%' },
              { chapter: 'Bengaluru Central Chapter', members: 185, growth: '+22%' },
              { chapter: 'Belagavi & Hubballi Chapter', members: 98, growth: '+12%' },
              { chapter: 'Solapur & Mumbai Chapter', members: 75, growth: '+15%' },
            ].map((c) => (
              <div key={c.chapter} className="p-3 bg-stone-50 rounded-xl flex items-center justify-between font-semibold">
                <span>{c.chapter}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-stone-900">{c.members} Members</span>
                  <span className="text-emerald-600 font-extrabold">{c.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
