import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Meeting, AgendaItem } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  QrCode,
} from 'lucide-react';

export const MeetingsManagementPage: React.FC = () => {
  const { meetings, createMeeting, setActiveMeetingQrModal } = useDemo();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // New Meeting Form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-09-25');
  const [time, setTime] = useState('10:00 AM - 01:00 PM IST');
  const [venue, setVenue] = useState('Hotel Taj Gateway, Residency Road, Bengaluru');
  const [type, setType] = useState<'IN_PERSON' | 'VIRTUAL' | 'HYBRID'>('HYBRID');
  const [coordinatorName, setCoordinatorName] = useState('Suresh Kulkarni');

  // Agenda Builder Items
  const [agendaList, setAgendaList] = useState<Omit<AgendaItem, 'id'>[]>([
    { time: '10:00 AM', title: 'Welcome & Shiva Stavan', description: 'Opening Prayer & Welcome', presenter: 'Chapter Leader', durationMinutes: 15 },
    { time: '10:15 AM', title: 'Member Business Spotlight', description: 'Business Presentation', presenter: 'Spotlight Member', durationMinutes: 20 },
    { time: '10:35 AM', title: 'Speed Referral Pass', description: '1-to-1 Referral Exchange', presenter: 'All Members', durationMinutes: 45 },
  ]);

  const [newAgTitle, setNewAgTitle] = useState('');
  const [newAgTime, setNewAgTime] = useState('11:20 AM');
  const [newAgPresenter, setNewAgPresenter] = useState('');

  const handleAddAgendaItem = () => {
    if (newAgTitle.trim()) {
      setAgendaList([
        ...agendaList,
        {
          time: newAgTime,
          title: newAgTitle,
          description: 'Scheduled Agenda Item',
          presenter: newAgPresenter || 'Coordinator',
          durationMinutes: 15,
        },
      ]);
      setNewAgTitle('');
      setNewAgPresenter('');
    }
  };

  const handleCreateMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMeeting({
      title: title || 'VLBVN Regional Business Conclave',
      date,
      time,
      venue,
      type,
      coordinatorName,
      agenda: agendaList.map((ag, idx) => ({ ...ag, id: `ag-${idx}` })),
    });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-700" />
            <span>Meetings & Interactive Agenda Builder</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Schedule conclaves, configure minute-by-minute agendas, and launch QR check-in monitors.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Conclave</span>
        </button>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {meetings.map((mtg) => (
          <div
            key={mtg.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all space-y-4"
          >
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-800">{mtg.id}</span>
                  <Badge status={mtg.status} />
                </div>
                <h3 className="font-extrabold text-base text-stone-900">{mtg.title}</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span className="font-bold text-stone-800">{mtg.date}</span>
                <span className="text-stone-400">|</span>
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{mtg.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>{mtg.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-700" />
                <span>Attendees Registered: <strong className="text-stone-900">{mtg.attendeesCount}</strong></span>
              </div>
            </div>

            {/* Agenda Count Preview */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-1">
              <div className="font-bold text-stone-900 flex items-center justify-between">
                <span>Configured Agenda Items ({mtg.agenda.length})</span>
                <button
                  onClick={() => setSelectedMeeting(mtg)}
                  className="text-amber-800 hover:underline text-[11px]"
                >
                  View Agenda Details
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Keynote, Speed Networking, Member Spotlight, Referral Pass
              </p>
            </div>

            {/* Card Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveMeetingQrModal(mtg)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>QR Check-In Token</span>
              </button>

              <button
                onClick={() => setSelectedMeeting(mtg)}
                className="bg-stone-100 text-stone-800 font-bold text-xs px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-200"
              >
                Agenda Builder
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Meeting Agenda Builder & Detail Modal */}
      {selectedMeeting && (
        <Modal
          isOpen={!!selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
          title={`Conclave Agenda Schedule — ${selectedMeeting.id}`}
          subtitle={selectedMeeting.title}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1 text-stone-900">
              <div className="font-bold">{selectedMeeting.title}</div>
              <div className="text-stone-600">{selectedMeeting.date} ({selectedMeeting.time})</div>
              <div className="text-stone-600">{selectedMeeting.venue}</div>
            </div>

            {/* Agenda Timeline Items */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-stone-900 text-sm">Minute-by-Minute Conclave Agenda</h4>
              {selectedMeeting.agenda.map((ag) => (
                <div key={ag.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-4">
                  <div className="bg-amber-500/20 text-amber-900 font-mono font-extrabold text-xs px-2.5 py-1 rounded-md shrink-0">
                    {ag.time}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-bold text-stone-900 text-sm">{ag.title}</div>
                    <p className="text-stone-600 text-xs">{ag.description}</p>
                    <div className="text-[11px] text-stone-500">Presenter: <strong className="text-stone-800">{ag.presenter}</strong> ({ag.durationMinutes} mins)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule New Conclave Modal */}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Schedule New Conclave & Agenda"
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateMeetingSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Meeting Conclave Title *</label>
                <input
                  type="text"
                  placeholder="e.g. VLBVN Q3 Bengaluru Business Summit"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Conclave Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Time Slot *</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Venue / Address *</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Inline Agenda Items Builder */}
            <div className="border-t border-stone-200 pt-4 space-y-3">
              <h4 className="font-bold text-stone-900">Agenda Items Builder ({agendaList.length})</h4>
              <div className="space-y-2">
                {agendaList.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-amber-800">{item.time}</span> — <strong>{item.title}</strong> ({item.presenter})
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Agenda Item Title (e.g. Guest Keynote)"
                  value={newAgTitle}
                  onChange={(e) => setNewAgTitle(e.target.value)}
                  className="flex-1 px-3 py-2 border border-stone-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Presenter"
                  value={newAgPresenter}
                  onChange={(e) => setNewAgPresenter(e.target.value)}
                  className="w-36 px-3 py-2 border border-stone-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleAddAgendaItem}
                  className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold px-3.5 py-2 rounded-lg transition-colors"
                >
                  + Add Item
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 font-bold text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold rounded-lg shadow"
              >
                Save & Create Conclave
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
