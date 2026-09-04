import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Badge } from '../../components/common/Badge';
import { CheckCircle2, ArrowRight, UserCheck, Clock } from 'lucide-react';

export const ApplicationSubmittedPage: React.FC = () => {
  const { setCurrentRoute, switchRole } = useDemo();

  // Extract application ID from window location URL query or fallback
  const params = new URLSearchParams(window.location.search);
  const appId = params.get('id') || 'VLBVN-2026-8942';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Success Symbol */}
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-500 shadow-xl animate-scale-up">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">Application Receipt</span>
        <h1 className="text-3xl font-extrabold text-stone-900">Membership Application Submitted!</h1>
        <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
          Your dossier has been logged into the VLBVN administrative approval pipeline. An authorized community administrator will verify your credentials shortly.
        </p>
      </div>

      {/* Application Receipt Details Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 text-left max-w-md mx-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <span className="text-xs text-stone-500 font-semibold">Application Reference ID</span>
          <span className="font-mono font-extrabold text-stone-900 text-sm">{appId}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-500 font-semibold">Current Review Status</span>
          <Badge status="PENDING_REVIEW" size="md" />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>Next Steps in Approval Lifecycle</span>
          </div>
          <p className="text-[11px] text-amber-800/90 leading-relaxed">
            1. Admin reviews credentials & background.<br />
            2. Email activation link will be dispatched upon approval.<br />
            3. Set password & access Member Network Dashboard.
          </p>
        </div>
      </div>

      {/* Demo Journey Shortcut Callout */}
      <div className="bg-gradient-to-r from-stone-900 to-[#1C120C] text-white p-6 rounded-2xl border border-amber-500/30 space-y-4 max-w-md mx-auto shadow-lg text-left">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <UserCheck className="w-4 h-4" />
          <span>Interactive Demo Flow Shortcut</span>
        </div>
        <p className="text-stone-300 text-xs leading-relaxed">
          Want to test the Admin Approval workflow right now? Click below to switch role to <strong className="text-amber-300">Community Admin</strong> and approve this application!
        </p>
        <button
          onClick={() => {
            switchRole('COMMUNITY_ADMIN');
            setCurrentRoute('/admin/requests');
          }}
          className="w-full bg-amber-500 text-stone-950 font-extrabold text-xs py-3 rounded-xl shadow-md hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
        >
          <span>Switch to Community Admin & Approve Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div>
        <button
          onClick={() => setCurrentRoute('/')}
          className="text-stone-600 font-bold text-xs hover:text-stone-900 transition-colors"
        >
          Return to Public Homepage
        </button>
      </div>
    </div>
  );
};
