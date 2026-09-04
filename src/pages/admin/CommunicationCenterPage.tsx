import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Megaphone, Send, Mail, MessageSquare, Bell } from 'lucide-react';

export const CommunicationCenterPage: React.FC = () => {
  const { announcements, createAnnouncement } = useDemo();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<'ALL' | 'CHAPTER' | 'CATEGORY'>('ALL');
  const [selectedChannels, setSelectedChannels] = useState<('IN_APP' | 'EMAIL' | 'WHATSAPP' | 'SMS')[]>([
    'IN_APP',
    'EMAIL',
    'WHATSAPP',
  ]);

  const toggleChannel = (ch: 'IN_APP' | 'EMAIL' | 'WHATSAPP' | 'SMS') => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      createAnnouncement({
        title,
        content,
        audience,
        channels: selectedChannels,
      });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-amber-700" />
          <span>Communication Center & Multi-Channel Broadcast</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Draft community announcements and dispatch via In-App, Email, WhatsApp, and SMS gateways.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Announcement Creator Form */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-5 text-xs">
          <h3 className="font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
            Draft Community Announcement
          </h3>

          <form onSubmit={handleBroadcastSubmit} className="space-y-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Announcement Title *</label>
              <input
                type="text"
                placeholder="e.g. Registration Open for VLBVN Global Business Conclave"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Audience Targeting</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white"
              >
                <option value="ALL">All Active Members (Global)</option>
                <option value="CHAPTER">Pune & Bengaluru Chapters Only</option>
                <option value="CATEGORY">Healthcare & Tech Sectors</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Announcement Body Content *</label>
              <textarea
                rows={4}
                placeholder="Compose message text for members..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>

            {/* Channels Checklist */}
            <div className="space-y-2 pt-1">
              <label className="font-bold text-stone-700 block">Dispatch Communication Channels</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'IN_APP', label: 'In-App Alert', icon: <Bell className="w-3.5 h-3.5" /> },
                  { id: 'EMAIL', label: 'Email Broadcast', icon: <Mail className="w-3.5 h-3.5" /> },
                  { id: 'WHATSAPP', label: 'WhatsApp Bot', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                  { id: 'SMS', label: 'SMS Gateway', icon: <Send className="w-3.5 h-3.5" /> },
                ].map((ch) => {
                  const isChecked = selectedChannels.includes(ch.id as any);
                  return (
                    <button
                      type="button"
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id as any)}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500 text-amber-900 shadow-2xs'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                      }`}
                    >
                      {ch.icon}
                      <span>{ch.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm py-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Announcement Now</span>
            </button>
          </form>
        </div>

        {/* Right Column: Broadcast History */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 text-xs">
            <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-3">
              Broadcast History ({announcements.length})
            </h3>

            <div className="space-y-3">
              {announcements.map((anc) => (
                <div key={anc.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{anc.title}</span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {new Date(anc.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">{anc.content}</p>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {anc.channels.map((c) => (
                      <span key={c} className="bg-amber-100 text-amber-900 font-extrabold text-[9px] px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
