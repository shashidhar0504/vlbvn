import React from 'react';
import { ShieldCheck, Target, Heart, Compass, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">About VLBVN</span>
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
          Fostering Economic Vision & Community Networking
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          The Veerashaiva Lingayat Business Visionary Network (VLBVN) was founded to unite entrepreneurs, professionals, industrial leaders, and visionaries into a trusted ecosystem of mutual growth and ethical business excellence.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-card space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl w-fit border border-amber-200">
            <Target className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900">Our Vision</h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            To build a global business network where every member expands their commercial horizon, creates high-value employment, and champions community prosperity through technology, referrals, and collaboration.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-card space-y-4">
          <div className="p-3 bg-orange-50 rounded-xl w-fit border border-orange-200">
            <Compass className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900">Our Mission</h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            To provide robust digital platforms, chapter conclaves, verified referral pipelines, and strategic mentorship that enable Veerashaiva Lingayat business leaders to scale across India and international markets.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-stone-900">Our Core Principles</h2>
          <p className="text-stone-600 text-xs mt-1">Guiding values behind every connection and transaction</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Trust & Authenticity',
              desc: 'Every member application undergo thorough peer verification to maintain absolute integrity.',
              icon: <ShieldCheck className="w-6 h-6 text-amber-700" />,
            },
            {
              title: 'Mutual Prosperity (Kayaka & Dasoha)',
              desc: 'Embracing traditional ethos of dedicated honest work and selfless contribution to society.',
              icon: <Heart className="w-6 h-6 text-orange-600" />,
            },
            {
              title: 'Professional Excellence',
              desc: 'Adopting state-of-the-art SaaS technology, digital analytics, and modern CRM practices.',
              icon: <Award className="w-6 h-6 text-blue-600" />,
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-stone-50 border border-stone-200 p-6 rounded-xl space-y-3">
              {item.icon}
              <h3 className="font-bold text-base text-stone-900">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
