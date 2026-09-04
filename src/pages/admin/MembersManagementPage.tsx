import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Badge } from '../../components/common/Badge';
import { Users, Search } from 'lucide-react';

export const MembersManagementPage: React.FC = () => {
  const { members, updateMemberStatus } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-700" />
            <span>Members Directory Management</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Manage active community members, inspect credentials, and manage membership status.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-card flex flex-col sm:flex-row items-center gap-4 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search member name, business or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-64 px-3 py-2.5 rounded-xl border border-stone-300 bg-white font-semibold text-stone-700"
        >
          <option value="ALL">All Categories ({members.length})</option>
          <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
          <option value="Real Estate & Construction">Real Estate & Construction</option>
          <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
          <option value="Clean Energy & Utilities">Clean Energy & Utilities</option>
          <option value="Financial Services & Accounting">Financial Services & Accounting</option>
          <option value="Information Technology & Software">Information Technology & Software</option>
        </select>
      </div>

      {/* Members Table - Light Theme Header */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-amber-100/70 text-stone-900 uppercase tracking-wider font-extrabold border-b border-amber-300">
                <th className="p-4">Member / Business</th>
                <th className="p-4">Category & Location</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Referrals Stats</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.photoUrl}
                        alt={m.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                      />
                      <div>
                        <div className="font-bold text-stone-900 text-sm">{m.name}</div>
                        <div className="text-stone-500 text-[11px]">{m.businessName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-stone-900">{m.category}</div>
                    <div className="text-stone-500">{m.city}, {m.state}</div>
                  </td>
                  <td className="p-4 font-mono text-stone-600">{m.joinedDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                        {m.stats.successfulReferrals} Converted
                      </span>
                      <span className="text-stone-500">({m.stats.referralsGiven} Given)</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge status={m.status} />
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {m.status === 'ACTIVATED' ? (
                      <button
                        onClick={() => updateMemberStatus(m.id, 'SUSPENDED')}
                        className="text-stone-600 hover:text-red-600 font-bold px-2 py-1 rounded hover:bg-stone-100"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => updateMemberStatus(m.id, 'ACTIVATED')}
                        className="text-emerald-700 font-bold px-2 py-1 rounded hover:bg-emerald-50"
                      >
                        Reactivate
                      </button>
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
