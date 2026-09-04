import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Award, HelpCircle, FileText } from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const { setCurrentRoute } = useDemo();

  const criteria = [
    {
      title: 'Verified Business Ownership / Executive Leadership',
      desc: 'Applicants must be founders, directors, partners, or senior C-suite executives in a registered business enterprise.',
    },
    {
      title: 'Commitment to Ethical Growth (Kayaka & Dasoha)',
      desc: 'Pledge to uphold ethical commercial practices, transparent referral exchanges, and community mentorship.',
    },
    {
      title: 'Active Conclave & Meeting Participation',
      desc: 'Maintain minimum 80%+ attendance at monthly chapter conclaves and speed networking Conclaves.',
    },
    {
      title: 'Peer Recommendation & Verification',
      desc: 'Applications undergo credential check by VLBVN chapter administrative committee.',
    },
  ];

  const faqs = [
    {
      q: 'How long does the membership approval process take?',
      a: 'Once you submit your 5-step application dossier online, the chapter administrative committee typically reviews credentials within 48 to 72 hours.',
    },
    {
      q: 'Can multiple representatives from the same company join?',
      a: 'Primary membership is tied to individual business leaders; however, corporate partner accounts allow additional executive participation.',
    },
    {
      q: 'What is required after my application is approved?',
      a: 'You will receive an email activation link to set your password, complete your business profile ("How I Can Help"), and access the member network directory.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">Membership Overview</span>
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
          Join India's Premier Business Network
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          VLBVN membership unlocks direct access to a verified network of visionary business leaders, structured referral pipelines, and high-value collaboration opportunities.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setCurrentRoute('/apply-membership')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <span>Start 5-Step Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Membership Tiers & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
              Standard Membership
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">Visionary Entrepreneur</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Designed for MSME owners, software founders, civil contractors, and service professionals.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Member Directory & Profile</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Give & Receive Referrals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Monthly Chapter Conclaves</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentRoute('/apply-membership')}
            className="w-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs py-2.5 rounded-xl transition-colors"
          >
            Apply for Entrepreneur Tier
          </button>
        </div>

        <div className="bg-gradient-to-b from-amber-500/10 via-amber-100/60 to-orange-500/10 text-stone-900 border-2 border-amber-500 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between relative transform scale-105">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
            Most Popular
          </div>

          <div className="space-y-3 pt-2">
            <span className="bg-amber-500/20 text-amber-900 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full border border-amber-500/30">
              Corporate & Industrial
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">Patron & Industry Leader</h3>
            <p className="text-stone-700 text-xs leading-relaxed">
              For manufacturing plants, hospital networks, real estate developers, and export houses.
            </p>
            <ul className="space-y-2 text-xs text-stone-800 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Priority Collaboration Matching</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Conclave Keynote Spotlight Slots</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-chapter Global Access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentRoute('/apply-membership')}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs py-3 rounded-xl shadow hover:brightness-110 transition-all"
          >
            Apply for Corporate Patron
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="bg-orange-100 text-orange-900 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
              Global Advisory
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">Charter Fellow & Mentor</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              For senior industry veterans, global mentors, and institutional leadership.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strategic Advisory Seat</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Global Summit VIP Access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentRoute('/apply-membership')}
            className="w-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs py-2.5 rounded-xl transition-colors"
          >
            Apply for Charter Fellow
          </button>
        </div>
      </div>

      {/* Membership Criteria */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-extrabold text-stone-900">Membership Criteria & Eligibility</h2>
          <p className="text-stone-600 text-xs">Ensuring high quality and trust across our networking community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteria.map((item, idx) => (
            <div key={idx} className="bg-stone-50 border border-stone-200 p-5 rounded-xl space-y-2 flex items-start gap-4">
              <div className="p-2.5 bg-amber-500/15 text-amber-900 rounded-lg font-bold text-sm shrink-0">
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-sm">{item.title}</h3>
                <p className="text-stone-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-card space-y-6">
        <h2 className="text-2xl font-extrabold text-stone-900 text-center">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-stone-50 rounded-xl space-y-2 border border-stone-200">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
