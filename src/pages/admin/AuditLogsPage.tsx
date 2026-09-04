import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { FileText, Search, ShieldCheck, Lock, Eye } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-700" />
            <span>Immutable Security Audit Log</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            System activity timeline tracking admin approvals, role modifications, and critical business actions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/15 text-amber-900 text-xs px-3 py-1.5 rounded-lg border border-amber-300 font-bold">
          <Lock className="w-4 h-4" />
          <span className="font-mono font-bold">READ-ONLY AUDIT STREAM</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-card">
        <div className="relative w-full text-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action or target entity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500/15 via-amber-100/50 to-orange-500/10 text-stone-900 uppercase tracking-wider font-extrabold border-b border-amber-200">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor / Role</th>
                <th className="p-4">Action Event</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="p-4 font-mono text-stone-500 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4">
                    <div className="font-bold text-stone-900">{log.actorName}</div>
                    <div className="text-[10px] text-amber-800 font-extrabold uppercase">{log.actorRole}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-stone-100 text-stone-900 font-mono font-bold text-[11px] px-2 py-1 rounded border border-stone-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-stone-800">{log.target}</div>
                    <div className="text-stone-500 text-[11px]">{log.details}</div>
                  </td>
                  <td className="p-4 font-mono text-stone-500 text-[11px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
