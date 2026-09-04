import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MemberStatus, MembershipApplication } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Send,
  AlertTriangle,
} from 'lucide-react';

export const MemberRequestsPage: React.FC = () => {
  const { applications, updateApplicationStatus, addAdminNote } = useDemo();
  const [activeTab, setActiveTab] = useState<MemberStatus | 'ALL'>('PENDING_REVIEW');
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);
  const [newAdminNote, setNewAdminNote] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredApps = applications.filter((app) => {
    if (activeTab === 'ALL') return true;
    return app.status === activeTab;
  });

  const handleApprove = (app: MembershipApplication) => {
    updateApplicationStatus(app.id, 'APPROVED', 'Approved by administrative committee after credential review.');
    setSelectedApp(null);
  };

  const handleRequestInfo = (app: MembershipApplication) => {
    updateApplicationStatus(app.id, 'INFO_REQUIRED', 'Requested additional business registration documents.');
    setSelectedApp(null);
  };

  const handleConfirmReject = () => {
    if (selectedApp) {
      updateApplicationStatus(selectedApp.id, 'REJECTED', rejectReason || 'Application declined by committee.');
      setShowRejectModal(false);
      setSelectedApp(null);
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedApp && newAdminNote.trim()) {
      addAdminNote(selectedApp.id, newAdminNote.trim());
      setNewAdminNote('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-amber-700" />
            <span>Membership Requests & Approvals Queue</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Review incoming membership dossiers, inspect credentials, and activate member accounts.
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-2 flex items-center gap-2 overflow-x-auto shadow-xs">
        {[
          { tab: 'PENDING_REVIEW', label: 'Pending Review', count: applications.filter((a) => a.status === 'PENDING_REVIEW').length },
          { tab: 'INFO_REQUIRED', label: 'More Info Needed', count: applications.filter((a) => a.status === 'INFO_REQUIRED').length },
          { tab: 'APPROVED', label: 'Approved & Active', count: applications.filter((a) => a.status === 'APPROVED' || a.status === 'ACTIVATED').length },
          { tab: 'REJECTED', label: 'Rejected', count: applications.filter((a) => a.status === 'REJECTED').length },
          { tab: 'ALL', label: 'All Requests', count: applications.length },
        ].map((t) => (
          <button
            key={t.tab}
            onClick={() => setActiveTab(t.tab as any)}
            className={`px-3.5 py-2 rounded-lg font-bold text-xs shrink-0 flex items-center gap-2 transition-all ${
              activeTab === t.tab
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <span>{t.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === t.tab ? 'bg-amber-100/40 text-stone-950' : 'bg-amber-100 text-amber-900'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-stone-200 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={app.photoUrl}
                alt={app.applicantName}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-base text-stone-900">{app.applicantName}</h3>
                  <span className="text-xs text-stone-500 font-mono font-bold">({app.id})</span>
                  <Badge status={app.status} />
                </div>
                <p className="text-xs font-semibold text-stone-700">
                  {app.profession} at <span className="text-stone-900 font-bold">{app.businessName}</span>
                </p>
                <div className="flex items-center gap-4 text-xs text-stone-500 flex-wrap">
                  <span>Category: <strong className="text-stone-800">{app.category}</strong></span>
                  <span>Location: <strong className="text-stone-800">{app.city}</strong></span>
                  <span>Submitted: <strong className="text-stone-800">{new Date(app.submittedAt).toLocaleDateString()}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
              <button
                onClick={() => setSelectedApp(app)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Review Dossier</span>
              </button>
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500 text-xs">
            No membership applications found in this view tab.
          </div>
        )}
      </div>

      {/* Application Dossier Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Membership Application Dossier — ${selectedApp.id}`}
          subtitle={`Applicant: ${selectedApp.applicantName}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Applicant Summary Header */}
            <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 rounded-xl p-4">
              <img
                src={selectedApp.photoUrl}
                alt={selectedApp.applicantName}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
              />
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-stone-900">{selectedApp.applicantName}</h3>
                <p className="text-xs font-bold text-stone-700">{selectedApp.businessName} ({selectedApp.profession})</p>
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-stone-400" />{selectedApp.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-stone-400" />{selectedApp.phone}</span>
                </div>
              </div>
            </div>

            {/* Dossier Fields Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-stone-50 rounded-lg space-y-1">
                <span className="text-stone-500 font-semibold block">Industry Category</span>
                <span className="font-bold text-stone-900">{selectedApp.category}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg space-y-1">
                <span className="text-stone-500 font-semibold block">Years of Business Experience</span>
                <span className="font-bold text-stone-900">{selectedApp.experienceYears} Years</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg space-y-1 sm:col-span-2">
                <span className="text-stone-500 font-semibold block">Services & Products Offered</span>
                <span className="font-bold text-stone-900">{selectedApp.services}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg space-y-1 sm:col-span-2">
                <span className="text-stone-500 font-semibold block">Why Joining VLBVN</span>
                <p className="text-stone-800 italic">"{selectedApp.motivation}"</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg space-y-1 sm:col-span-2">
                <span className="text-stone-500 font-semibold block">Member Contributions Offered</span>
                <p className="text-stone-800">{selectedApp.contributions}</p>
              </div>
            </div>

            {/* Admin Internal Notes Thread */}
            <div className="border-t border-stone-200 pt-4 space-y-3">
              <h4 className="font-extrabold text-stone-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>Internal Admin Notes ({selectedApp.adminNotes.length})</span>
              </h4>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {selectedApp.adminNotes.map((note) => (
                  <div key={note.id} className="p-2.5 bg-amber-50/60 border border-amber-200/50 rounded-lg text-xs">
                    <div className="flex items-center justify-between font-bold text-stone-900">
                      <span>{note.authorName}</span>
                      <span className="text-[10px] text-stone-400 font-normal">{new Date(note.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-stone-700 mt-1">{note.note}</p>
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add internal review note..."
                  value={newAdminNote}
                  onChange={(e) => setNewAdminNote(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Note</span>
                </button>
              </form>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full sm:w-auto text-red-600 font-bold hover:bg-red-50 px-4 py-2.5 rounded-xl border border-red-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Application</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleRequestInfo(selectedApp)}
                  className="w-full sm:w-auto bg-stone-100 text-stone-800 font-bold px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Request More Info</span>
                </button>

                <button
                  onClick={() => handleApprove(selectedApp)}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold px-6 py-2.5 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Activate Account</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal for Rejection */}
      {showRejectModal && (
        <Modal
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title="Confirm Rejection of Membership"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <span>Are you sure you want to reject this dossier?</span>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Reason for Rejection</label>
              <textarea
                rows={3}
                placeholder="Reason provided to applicant..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-2 font-bold text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
