import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { CollaborationType } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Briefcase, Plus, Tag, Send, Users, ArrowRight } from 'lucide-react';

export const CollaborationsPage: React.FC = () => {
  const { collaborations, createCollaboration, currentUser } = useDemo();
  const [activeTab, setActiveTab] = useState<'ALL' | 'LOOKING_FOR' | 'CAN_HELP_WITH'>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [type, setType] = useState<CollaborationType>('LOOKING_FOR');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Information Technology');
  const [description, setDescription] = useState('');
  const [tagsStr, setTagsStr] = useState('AI Automation, ERP, Compliance');

  const filteredCollaborations = collaborations.filter((c) => {
    if (activeTab === 'ALL') return true;
    return c.type === activeTab;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      createCollaboration({
        type,
        title,
        category,
        description,
        tags: tagsStr.split(',').map((t) => t.trim()),
        status: 'OPEN',
      });
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-700" />
            <span>Collaboration & Capability Matching Hub</span>
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Post joint venture opportunities, project tenders, and service capabilities to team up with members.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Collaboration Opportunity</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-stone-200 rounded-xl p-2 flex items-center gap-2 overflow-x-auto shadow-xs">
        {[
          { tab: 'ALL', label: 'All Opportunities', count: collaborations.length },
          { tab: 'LOOKING_FOR', label: 'I Am Looking For...', count: collaborations.filter((c) => c.type === 'LOOKING_FOR').length },
          { tab: 'CAN_HELP_WITH', label: 'I Can Help With...', count: collaborations.filter((c) => c.type === 'CAN_HELP_WITH').length },
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

      {/* Collaborations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCollaborations.map((col) => (
          <div
            key={col.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge status={col.type} />
                <span className="text-[10px] text-stone-400 font-mono">
                  Posted {new Date(col.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-stone-900 leading-tight">{col.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{col.description}</p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-2">
                <img src={col.authorPhoto} alt={col.authorName} className="w-8 h-8 rounded-full object-cover border border-amber-500/40" />
                <div className="text-xs">
                  <div className="font-bold text-stone-900">{col.authorName}</div>
                  <div className="text-[10px] text-stone-500">{col.authorBusiness}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {col.tags.map((tag) => (
                  <span key={tag} className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-stone-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">
                {col.applicantsCount} Member Proposals
              </span>
              <button
                onClick={() => alert(`Submitted collaboration response to ${col.authorName}`)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-4 py-2 rounded-xl hover:brightness-110 transition-all flex items-center gap-1 shadow-md"
              >
                <span>Express Interest</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Collaboration Modal */}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Post Collaboration Request"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Collaboration Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('LOOKING_FOR')}
                  className={`p-3 rounded-xl border font-bold text-xs ${
                    type === 'LOOKING_FOR' ? 'bg-purple-100 border-purple-400 text-purple-900' : 'bg-stone-50 text-stone-600'
                  }`}
                >
                  I Am Looking For Vendors/Partners
                </button>
                <button
                  type="button"
                  onClick={() => setType('CAN_HELP_WITH')}
                  className={`p-3 rounded-xl border font-bold text-xs ${
                    type === 'CAN_HELP_WITH' ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-stone-50 text-stone-600'
                  }`}
                >
                  I Can Offer Capability/Services
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Title *</label>
              <input
                type="text"
                placeholder="e.g. Hospital Management EHR Software Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Description *</label>
              <textarea
                rows={3}
                placeholder="Explain the project scope and partner requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Tags (Comma Separated)</label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold rounded-xl shadow"
              >
                Post Opportunity
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
