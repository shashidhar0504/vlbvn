import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Bell, CheckCircle2, Share2, Calendar, Briefcase, ArrowRight } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, setCurrentRoute } = useDemo();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Bell className="w-6 h-6 text-amber-700" />
          <span>Notifications & Activity Feed</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Recent updates on your referrals, thank-you notes, meeting schedules, and announcements.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-card text-xs">
        <div className="divide-y divide-stone-100">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => n.actionUrl && setCurrentRoute(n.actionUrl)}
              className="p-4 hover:bg-amber-50/50 transition-colors cursor-pointer flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{n.title}</span>
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                    {n.category}
                  </span>
                </div>
                <p className="text-stone-600 text-xs">{n.message}</p>
                <div className="text-[10px] text-stone-400 font-mono mt-1">{n.timestamp}</div>
              </div>

              {n.actionUrl && (
                <button className="text-amber-800 font-bold hover:underline shrink-0 flex items-center gap-1">
                  <span>Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
