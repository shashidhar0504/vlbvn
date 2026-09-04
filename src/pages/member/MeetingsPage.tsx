import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Meeting } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Calendar, Clock, MapPin, QrCode, Users, ArrowRight } from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const { meetings, setActiveMeetingQrModal } = useDemo();
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-amber-700" />
          <span>VLBVN Chapter Conclaves & Meetings</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          View upcoming conclave agendas, speed networking slots, and register QR attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {meetings.map((mtg) => (
          <div
            key={mtg.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="font-mono text-xs font-bold text-amber-800">{mtg.id}</span>
                <Badge status={mtg.status} />
              </div>

              <h3 className="font-extrabold text-base text-stone-900 leading-tight">{mtg.title}</h3>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-bold text-stone-800">{mtg.date}</span> ({mtg.time})
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="truncate">{mtg.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Coordinator: <strong className="text-stone-900">{mtg.coordinatorName}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedMeeting(mtg)}
                className="text-stone-600 font-bold text-xs hover:text-stone-900"
              >
                View Conclave Agenda ({mtg.agenda.length} items)
              </button>

              <button
                onClick={() => setActiveMeetingQrModal(mtg)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2 rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
              >
                <QrCode className="w-4 h-4" />
                <span>Show QR Attendance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Agenda Detail Modal */}
      {selectedMeeting && (
        <Modal
          isOpen={!!selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
          title={`Agenda Schedule — ${selectedMeeting.id}`}
          subtitle={selectedMeeting.title}
          maxWidth="xl"
        >
          <div className="space-y-4 text-xs">
            <div className="space-y-3">
              {selectedMeeting.agenda.map((ag) => (
                <div key={ag.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-4">
                  <div className="bg-amber-500/20 text-amber-900 font-mono font-extrabold text-xs px-2.5 py-1 rounded-md shrink-0">
                    {ag.time}
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-stone-900 text-sm">{ag.title}</div>
                    <p className="text-stone-600 text-xs">{ag.description}</p>
                    <div className="text-[11px] text-stone-500">Presenter: <strong>{ag.presenter}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
