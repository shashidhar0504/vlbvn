import React from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Share2,
  Users,
  Briefcase,
  Calendar,
  Award,
  ShieldCheck,
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const BenefitsPage: React.FC = () => {
  const { setCurrentRoute } = useDemo();

  const benefits = [
    {
      title: 'Qualified Referral Pipeline',
      desc: 'Pass and receive pre-verified business leads with real-time conversion tracking. Over ₹ 42 Crore in referral value generated across chapters.',
      icon: <Share2 className="w-8 h-8 text-orange-600" />,
    },
    {
      title: 'Multi-Chapter Regional & Global Network',
      desc: 'Connect with 500+ verified entrepreneurs across Pune, Bengaluru, Belagavi, Solapur, Hubballi, Mumbai, Hyderabad, and international chapters.',
      icon: <Globe className="w-8 h-8 text-amber-700" />,
    },
    {
      title: 'Digital Community Operating System',
      desc: 'Access our custom SaaS platform featuring interactive member directory, QR code attendance, thank-you note center, and testimonial publishing.',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    },
    {
      title: 'Conclaves & Speed Business Matchmaking',
      desc: 'Participate in monthly chapter conclaves featuring keynote speakers, member spotlights, and structured 1-on-1 referral exchange rounds.',
      icon: <Calendar className="w-8 h-8 text-emerald-600" />,
    },
    {
      title: 'Joint Venture & Tender Tenders',
      desc: 'Post and bid on high-value tender requirements, subcontracting bids, and technology implementation requests.',
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
    },
    {
      title: 'Mentorship & Professional Recognition',
      desc: 'Earn community contribution points, receive recognition badges, and access strategic mentorship from founding visionaries.',
      icon: <Award className="w-8 h-8 text-amber-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">Why Join VLBVN</span>
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
          Unmatched Growth Benefits for Visionary Leaders
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          VLBVN provides a comprehensive suite of networking tools, conclaves, digital CRM features, and community recognition designed to accelerate your business growth.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all space-y-4"
          >
            <div className="p-3 bg-stone-50 rounded-xl w-fit border border-stone-100">{b.icon}</div>
            <h3 className="text-xl font-extrabold text-stone-900">{b.title}</h3>
            <p className="text-stone-600 text-xs leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Impact Statistics */}
      <div className="bg-gradient-to-r from-[#1C120C] via-[#2C1D14] to-[#130C08] rounded-3xl p-8 sm:p-12 text-white border border-amber-500/30 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block">₹ 42 Cr+</span>
            <span className="text-stone-300 text-xs font-semibold">Referral Value Generated</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-white block">500+</span>
            <span className="text-stone-300 text-xs font-semibold">Active Verified Members</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 block">84%</span>
            <span className="text-stone-300 text-xs font-semibold">Referral Conversion Rate</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block">12</span>
            <span className="text-stone-300 text-xs font-semibold">Regional & Global Chapters</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 text-center">
          <button
            onClick={() => setCurrentRoute('/apply-membership')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <span>Apply to Unlock All Member Benefits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
