import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Badge } from '../../components/common/Badge';
import { Share2 } from 'lucide-react';

export const ReferralsOverviewPage: React.FC = () => {
  const { referrals } = useDemo();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Share2 className="w-6 h-6 text-amber-700" />
          <span>System-Wide Referral Analytics & Conversion History</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Monitor community referral volumes, conversion rates, and financial impact.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500/15 via-amber-100/50 to-orange-500/10 text-stone-900 uppercase tracking-wider font-extrabold border-b border-amber-200">
                <th className="p-4">Referral ID / Opportunity</th>
                <th className="p-4">Referrer</th>
                <th className="p-4">Receiver</th>
                <th className="p-4">Est. Value</th>
                <th className="p-4">Lifecycle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {referrals.map((r) => (
                <tr key={r.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="p-4">
                    <div className="font-mono text-stone-500 text-[11px] font-bold">{r.id}</div>
                    <div className="font-bold text-stone-900">{r.businessOpportunity}</div>
                  </td>
                  <td className="p-4 font-bold text-stone-800">{r.referrerName}</td>
                  <td className="p-4 font-bold text-amber-800">{r.receiverName}</td>
                  <td className="p-4 font-extrabold text-stone-900">{r.estimatedValue}</td>
                  <td className="p-4"><Badge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
