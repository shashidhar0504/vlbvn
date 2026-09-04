import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

export const RolesPermissionsPage: React.FC = () => {
  const permissionsMatrix = [
    { module: 'Public Website & Application Stepper', superAdmin: true, commAdmin: true, coord: true, member: true },
    { module: 'Membership Approvals & Dossier Review', superAdmin: true, commAdmin: true, coord: false, member: false },
    { module: 'Member Directory & Business Search', superAdmin: true, commAdmin: true, coord: true, member: true },
    { module: 'Referral Creation & Status Progression', superAdmin: true, commAdmin: true, coord: true, member: true },
    { module: 'Collaborations Opportunity Posting', superAdmin: true, commAdmin: true, coord: true, member: true },
    { module: 'Conclave Scheduling & Agenda Builder', superAdmin: true, commAdmin: true, coord: true, member: false },
    { module: 'QR Attendance Verification & Monitor', superAdmin: true, commAdmin: true, coord: true, member: false },
    { module: 'Thank-You Notes & Testimonial Submissions', superAdmin: true, commAdmin: true, coord: true, member: true },
    { module: 'Testimonials Approval Queue', superAdmin: true, commAdmin: true, coord: false, member: false },
    { module: 'Multi-Channel Announcements Broadcast', superAdmin: true, commAdmin: true, coord: false, member: false },
    { module: 'Reports & Network Conversion Analytics', superAdmin: true, commAdmin: true, coord: false, member: false },
    { module: 'Security Audit Log Access', superAdmin: true, commAdmin: true, coord: false, member: false },
    { module: 'System Settings & Role Assignment', superAdmin: true, commAdmin: false, coord: false, member: false },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-700" />
          <span>Role & Permission Security Matrix</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Configured capability boundaries across Super Admin, Community Admin, Coordinator, and Member personas.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-amber-100/70 text-stone-900 uppercase tracking-wider font-extrabold border-b border-amber-300">
                <th className="p-4">Platform Module / Capability</th>
                <th className="p-4 text-center bg-amber-200/50 text-amber-950">Super Admin</th>
                <th className="p-4 text-center">Community Admin</th>
                <th className="p-4 text-center">Coordinator</th>
                <th className="p-4 text-center">Member</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {permissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-4 font-bold text-stone-900">{item.module}</td>
                  <td className="p-4 text-center bg-amber-50/30">
                    <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="w-4 h-4" />
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {item.commAdmin ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-stone-100 text-stone-400">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {item.coord ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-stone-100 text-stone-400">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {item.member ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-stone-100 text-stone-400">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
