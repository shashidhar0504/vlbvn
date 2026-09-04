import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ReferralStatus, Referral } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Share2,
  CheckCircle2,
  Clock,
  ArrowRight,
  HeartHandshake,
  MessageSquareQuote,
  TrendingUp,
  UserCheck,
  Building,
  Plus,
} from 'lucide-react';

export const ReferralsPage: React.FC = () => {
  const { referrals, currentUser, updateReferralStatus, setCurrentRoute } = useDemo();
  const [activeTab, setActiveTab] = useState<'GIVEN' | 'RECEIVED' | 'CONVERTED' | 'ALL'>('ALL');
  const [selectedRef, setSelectedRef] = useState<Referral | null>(null);

  const filteredReferrals = referrals.filter((r) => {
    if (activeTab === 'GIVEN') return r.referrerId === currentUser.id;
    if (activeTab === 'RECEIVED') return r.receiverId === currentUser.id;
    if (activeTab === 'CONVERTED') return r.status === 'CONVERTED';
    return true;
  });

  const handleAdvanceStatus = (refId: string, nextStatus: ReferralStatus) => {
    updateReferralStatus(refId, nextStatus);
    if (selectedRef && selectedRef.id === refId) {
      setSelectedRef({ ...selectedRef, status: nextStatus });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <Share2 className="w-6 h-6 text-amber-700" />
            <span>Referral Management & Lifecycle Engine</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Track business referrals given and received, advance conversion stages, and automate thank-you notes.
          </p>
        </div>

        <button
          onClick={() => setCurrentRoute('/member/give-referral')}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Give New Referral</span>
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-2 flex items-center gap-2 overflow-x-auto shadow-xs">
        {[
          { tab: 'ALL', label: 'All Referrals', count: referrals.length },
          { tab: 'GIVEN', label: 'Given by Me', count: referrals.filter((r) => r.referrerId === currentUser.id).length },
          { tab: 'RECEIVED', label: 'Received by Me', count: referrals.filter((r) => r.receiverId === currentUser.id).length },
          { tab: 'CONVERTED', label: 'Converted Mandates', count: referrals.filter((r) => r.status === 'CONVERTED').length },
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

      {/* Referrals Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReferrals.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-800">{r.id}</span>
                  <Badge status={r.status} />
                  <span className="text-stone-400 text-xs">• Created {new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-extrabold text-base text-stone-900">{r.businessOpportunity}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-stone-500 text-xs">Estimated Value:</span>
                <span className="font-extrabold text-stone-900 text-sm">{r.estimatedValue}</span>
              </div>
            </div>

            {/* Referrer & Receiver Info Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200/80 text-xs">
              <div className="flex items-center gap-3">
                <img src={r.referrerPhoto} alt={r.referrerName} className="w-9 h-9 rounded-full object-cover border border-amber-500/40" />
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-bold block">Referrer</span>
                  <span className="font-bold text-stone-900">{r.referrerName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img src={r.receiverPhoto} alt={r.receiverName} className="w-9 h-9 rounded-full object-cover border border-amber-500/40" />
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-bold block">Receiver</span>
                  <span className="font-bold text-stone-900">{r.receiverName}</span>
                </div>
              </div>
            </div>

            {/* Visual Lifecycle Progress Stepper */}
            <div className="pt-2">
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">Referral Lifecycle Progression</div>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold">
                {['CREATED', 'RECEIVED', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED'].map((step, idx) => {
                  const statuses = ['CREATED', 'RECEIVED', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED'];
                  const currentIdx = statuses.indexOf(r.status);
                  const isDone = currentIdx >= idx;

                  return (
                    <div
                      key={step}
                      className={`p-2 rounded-lg border transition-all ${
                        isDone
                          ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                          : 'bg-stone-100 text-stone-400 border-stone-200'
                      }`}
                    >
                      {step.replace('_', ' ')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Automation Prompts for Converted Referrals */}
            {r.status === 'CONVERTED' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Referral Converted Successfully! Trigger follow-up automation:</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentRoute(`/member/thank-you?refId=${r.id}`)}
                    className="bg-emerald-600 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg shadow hover:bg-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Send Thank-You</span>
                  </button>
                  <button
                    onClick={() => setCurrentRoute('/member/testimonials')}
                    className="bg-amber-500 text-stone-950 font-extrabold text-[11px] px-3 py-1.5 rounded-lg shadow hover:bg-amber-400 transition-colors flex items-center gap-1"
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5" />
                    <span>Submit Testimonial</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons to Advance Status */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedRef(r)}
                className="text-stone-600 font-bold text-xs hover:text-stone-900"
              >
                View Full Timeline
              </button>

              {r.status !== 'CONVERTED' && (
                <div className="flex items-center gap-2">
                  {r.status === 'CREATED' && (
                    <button
                      onClick={() => handleAdvanceStatus(r.id, 'RECEIVED')}
                      className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      Acknowledge Receipt
                    </button>
                  )}
                  {r.status === 'RECEIVED' && (
                    <button
                      onClick={() => handleAdvanceStatus(r.id, 'CONTACTED')}
                      className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      Mark Contacted
                    </button>
                  )}
                  {r.status === 'CONTACTED' && (
                    <button
                      onClick={() => handleAdvanceStatus(r.id, 'IN_DISCUSSION')}
                      className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      Move to Discussion
                    </button>
                  )}
                  {r.status === 'IN_DISCUSSION' && (
                    <button
                      onClick={() => handleAdvanceStatus(r.id, 'CONVERTED')}
                      className="bg-emerald-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-lg shadow hover:bg-emerald-700"
                    >
                      Mark CONVERTED 🎉
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Referral Detail Modal */}
      {selectedRef && (
        <Modal
          isOpen={!!selectedRef}
          onClose={() => setSelectedRef(null)}
          title={`Referral Dossier — ${selectedRef.id}`}
          subtitle={selectedRef.businessOpportunity}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="font-bold text-stone-900 text-sm">{selectedRef.businessOpportunity}</div>
              <p className="text-stone-600">{selectedRef.description}</p>
              <div className="text-stone-500 pt-1">Client Prospect: <strong>{selectedRef.prospectName}</strong> ({selectedRef.prospectPhone})</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-stone-900">Timeline History</h4>
              {selectedRef.timeline.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex justify-between">
                  <div>
                    <span className="font-extrabold text-amber-900">{item.status}</span> by {item.updatedBy}
                    {item.note && <p className="text-stone-600">{item.note}</p>}
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">{new Date(item.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
