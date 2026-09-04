import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Settings, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { showToast } = useDemo();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-700" />
          <span>VLBVN Platform Configuration & Gateway Settings</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Manage system preferences, email/WhatsApp gateways, and referral automation triggers.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-6 text-xs max-w-3xl">
        {/* Section 1: Community Brand */}
        <div className="space-y-3 border-b border-stone-100 pb-4">
          <h3 className="font-extrabold text-sm text-stone-900">1. Organization Brand & Community Identity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Organization Name</label>
              <input type="text" defaultValue="VLBVN — Veerashaiva Lingayat Business Visionary Network" className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Primary Support Email</label>
              <input type="email" defaultValue="support@vlbvn.org" className="w-full p-2.5 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Section 2: Gateways */}
        <div className="space-y-3 border-b border-stone-100 pb-4">
          <h3 className="font-extrabold text-sm text-stone-900">2. Communication Gateways (WhatsApp / Email / SMS)</h3>
          <div className="space-y-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900">WhatsApp Business Cloud API</div>
                <div className="text-[11px] text-stone-500">Connected to +91 98450 12345</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">ACTIVE</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900">SMTP Email Server (SendGrid)</div>
                <div className="text-[11px] text-stone-500">Target domain: vlbvn.org</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">ACTIVE</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => showToast('Platform settings saved successfully!', 'success')}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md hover:brightness-110 flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>
      </div>
    </div>
  );
};
