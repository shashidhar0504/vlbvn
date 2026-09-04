import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Users, Search, Filter, Share2, Briefcase, ExternalLink, MapPin, Building } from 'lucide-react';

export const MemberDirectoryPage: React.FC = () => {
  const { members, setCurrentRoute } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [cityFilter, setCityFilter] = useState('ALL');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.services.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
    const matchesCity = cityFilter === 'ALL' || m.city === cityFilter;
    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-700" />
          <span>VLBVN Member Network Directory</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Search verified business leaders, explore industry categories, and connect for referrals.
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-card flex flex-col md:flex-row items-center gap-4 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search member name, business, profession or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-56 px-3 py-2.5 rounded-xl border border-stone-300 bg-white font-semibold text-stone-700"
          >
            <option value="ALL">All Categories</option>
            <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
            <option value="Real Estate & Construction">Real Estate & Construction</option>
            <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
            <option value="Clean Energy & Utilities">Clean Energy & Utilities</option>
            <option value="Financial Services & Accounting">Financial Services & Accounting</option>
            <option value="Information Technology & Software">Information Technology & Software</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full md:w-40 px-3 py-2.5 rounded-xl border border-stone-300 bg-white font-semibold text-stone-700"
          >
            <option value="ALL">All Cities</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Belagavi">Belagavi</option>
            <option value="Solapur">Solapur</option>
            <option value="Hubballi">Hubballi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>
      </div>

      {/* Members Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-stone-900 leading-tight">{member.name}</h3>
                  <p className="text-xs font-bold text-amber-800">{member.businessName}</p>
                  <p className="text-[11px] text-stone-500">{member.profession}</p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-stone-600 font-semibold">
                  <Building className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">{member.category}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{member.city}, {member.state}</span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">How I Can Help</span>
                <p className="text-stone-700 line-clamp-2 italic">"{member.howICanHelp}"</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setCurrentRoute(`/member/profile?id=${member.id}`)}
                className="flex-1 text-center bg-stone-100 text-stone-800 font-bold text-xs py-2 rounded-xl border border-stone-200 hover:bg-stone-200 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => setCurrentRoute(`/member/give-referral?receiverId=${member.id}`)}
                className="flex-1 text-center bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs py-2 rounded-xl shadow hover:brightness-105 transition-all flex items-center justify-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Give Referral</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
