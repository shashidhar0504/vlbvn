import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { HeartHandshake, Send, MessageSquare, User, Award, CheckCircle2 } from 'lucide-react';

export const ThankYouCenterPage: React.FC = () => {
  const { thankYouNotes, sendThankYouNote, members, currentUser } = useDemo();
  const [receiverId, setReceiverId] = useState(members[1]?.id || '');
  const [template, setTemplate] = useState('Thank you for the high-value business referral!');
  const [message, setMessage] = useState('');

  const templates = [
    'Thank you for the high-value business referral!',
    'Thank you for the warm introduction to the client!',
    'Thank you for the outstanding joint project collaboration!',
    'Thank you for your strategic business mentorship!',
  ];

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiverId && message.trim()) {
      sendThankYouNote({
        referralId: 'REF-2026-103',
        receiverId,
        template,
        message,
      });
      setMessage('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-amber-700" />
          <span>VLBVN Thank-You Note Center</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Express gratitude to fellow members for successful referrals, introductions, and joint collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Send Form */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-5 text-xs">
          <h3 className="font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
            Send a Personalized Thank-You Note
          </h3>

          <form onSubmit={handleSendSubmit} className="space-y-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Select Member Recipient *</label>
              <select
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white font-semibold text-stone-900"
              >
                {members
                  .filter((m) => m.id !== currentUser.id)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.businessName}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Select Gratitude Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 font-semibold"
              >
                {templates.map((tpl) => (
                  <option key={tpl} value={tpl}>
                    {tpl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Personal Message Body *</label>
              <textarea
                rows={4}
                placeholder="Write your note of appreciation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs py-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Thank-You Note</span>
            </button>
          </form>
        </div>

        {/* Right Column: Thank You History */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 text-xs">
            <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-3">
              Sent & Received Thank-You History ({thankYouNotes.length})
            </h3>

            <div className="space-y-3">
              {thankYouNotes.map((note) => (
                <div key={note.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={note.senderPhoto} alt={note.senderName} className="w-7 h-7 rounded-full object-cover border border-amber-500" />
                      <span className="font-bold text-stone-900">{note.senderName}</span>
                      <span className="text-stone-400">→</span>
                      <span className="font-bold text-amber-800">{note.receiverName}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="font-extrabold text-amber-900 text-xs">{note.template}</div>
                  <p className="text-stone-700 italic text-[11px]">"{note.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
