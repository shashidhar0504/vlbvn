import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Share2, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const GiveReferralPage: React.FC = () => {
  const { members, currentUser, giveReferral, setCurrentRoute } = useDemo();

  // Extract optional preset receiver ID from query
  const params = new URLSearchParams(window.location.search);
  const initialReceiverId = params.get('receiverId') || (members[0]?.id || '');

  const [receiverId, setReceiverId] = useState(initialReceiverId);
  const [prospectName, setProspectName] = useState('');
  const [prospectPhone, setProspectPhone] = useState('');
  const [prospectEmail, setProspectEmail] = useState('');
  const [businessOpportunity, setBusinessOpportunity] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('₹ 5.0 Lakhs');

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiverId && businessOpportunity.trim()) {
      giveReferral({
        receiverId,
        prospectName: prospectName || 'Prospect Client',
        prospectPhone: prospectPhone || '+91 98000 00000',
        prospectEmail: prospectEmail || 'prospect@business.com',
        businessOpportunity,
        description,
        estimatedValue,
      });
      setCurrentRoute('/member/referrals');
    }
  };

  const selectedMember = members.find((m) => m.id === receiverId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C120C] to-[#2C1D14] text-white p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-amber-500/30">
          <Share2 className="w-3.5 h-3.5" />
          <span>VLBVN Referral Exchange Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-300">Give a Business Referral</h1>
        <p className="text-stone-300 text-xs sm:text-sm">
          Pass qualified business leads to fellow VLBVN members and track the conversion lifecycle.
        </p>
      </div>

      {/* Form Card Container */}
      <form onSubmit={handleReferralSubmit} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-card space-y-6 text-xs">
        {/* Step 1: Select Member Receiver */}
        <div className="space-y-3 border-b border-stone-100 pb-4">
          <label className="font-extrabold text-stone-900 text-sm block">1. Select Referral Receiver Member *</label>
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-white font-semibold text-xs"
          >
            {members
              .filter((m) => m.id !== currentUser.id)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.businessName} ({m.category})
                </option>
              ))}
          </select>

          {selectedMember && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
              <img
                src={selectedMember.photoUrl}
                alt={selectedMember.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
              />
              <div>
                <h4 className="font-bold text-stone-900">{selectedMember.name}</h4>
                <p className="text-[11px] text-stone-600">{selectedMember.profession} at {selectedMember.businessName}</p>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Opportunity Details */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
            2. Business Opportunity Details
          </h3>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Opportunity Title *</label>
            <input
              type="text"
              placeholder="e.g. 500 kW Rooftop Solar EPC Contract for Factory Sheds"
              value={businessOpportunity}
              onChange={(e) => setBusinessOpportunity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Estimated Contract Value *</label>
              <input
                type="text"
                placeholder="e.g. ₹ 15.0 Lakhs"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Prospect Client Name</label>
              <input
                type="text"
                placeholder="e.g. Vardhman Industrial Park"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Prospect Phone</label>
              <input
                type="text"
                placeholder="+91 98221 00998"
                value={prospectPhone}
                onChange={(e) => setProspectPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Prospect Email</label>
              <input
                type="email"
                placeholder="procurement@client.com"
                value={prospectEmail}
                onChange={(e) => setProspectEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Detailed Requirement Description</label>
            <textarea
              rows={3}
              placeholder="Provide background context and client specific requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setCurrentRoute('/member/directory')}
            className="px-4 py-2.5 font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-8 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Pass Referral Now</span>
          </button>
        </div>
      </form>
    </div>
  );
};
