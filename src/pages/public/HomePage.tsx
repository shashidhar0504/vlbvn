import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { VlbvnLogo } from '../../components/common/VlbvnLogo';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Briefcase,
  Share2,
  Calendar,
  CheckCircle,
  Quote,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, testimonials } = useDemo();

  const publicTestimonials = testimonials.filter((t) => t.approvalStatus === 'APPROVED');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section - Light Theme */}
      <section className="relative bg-gradient-to-b from-[#FDFBF7] via-[#FAF5EC] to-[#F4EFE6] text-stone-900 pt-16 pb-24 overflow-hidden border-b border-amber-200/80">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-900 text-xs font-extrabold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Premier Veerashaiva Lingayat Business Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-stone-900">
                Connect. Collaborate. <br />
                <span className="gold-gradient-text">Grow Together.</span>
              </h1>

              <p className="text-stone-700 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                VLBVN brings visionary business professionals together to create meaningful relationships, high-value referral exchanges, and collaborative opportunities for collective economic growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => setCurrentRoute('/apply-membership')}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply for Membership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentRoute('/community')}
                  className="w-full sm:w-auto bg-white text-stone-900 border border-stone-300 font-extrabold text-sm px-7 py-4 rounded-xl hover:bg-stone-50 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>Explore Community</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-stone-300/70 flex items-center justify-center lg:justify-start gap-8 text-xs text-stone-600 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Verified Business Leaders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Qualified Business Referrals</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Banner - Light Theme */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-amber-300 rounded-3xl p-7 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <VlbvnLogo variant="color" size="sm" />
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-amber-300">
                    Live Platform Stats
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                    <span className="text-stone-500 text-xs font-semibold block">Active Members</span>
                    <span className="text-2xl font-extrabold text-stone-900 mt-1 block">500+</span>
                    <span className="text-[10px] text-emerald-700 font-bold mt-1 block">↑ 18% this quarter</span>
                  </div>
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                    <span className="text-stone-500 text-xs font-semibold block">Referrals Generated</span>
                    <span className="text-2xl font-extrabold text-amber-800 mt-1 block">₹ 42 Cr+</span>
                    <span className="text-[10px] text-emerald-700 font-bold mt-1 block">Value passed</span>
                  </div>
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                    <span className="text-stone-500 text-xs font-semibold block">Regional Chapters</span>
                    <span className="text-2xl font-extrabold text-stone-900 mt-1 block">12</span>
                    <span className="text-[10px] text-stone-500 font-semibold mt-1 block">MH, KA, TS & Global</span>
                  </div>
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                    <span className="text-stone-500 text-xs font-semibold block">Conversion Rate</span>
                    <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">84%</span>
                    <span className="text-[10px] text-emerald-700 font-bold mt-1 block">Referral success</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 font-medium">
                  <p className="font-extrabold mb-1 text-stone-900">Join the premier referral circle</p>
                  <p className="text-[11px] text-stone-700">
                    Applications undergo thorough peer credential verification to ensure highest business standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Vision Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">The VLBVN Operating System</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            An End-to-End Ecosystem for Business Success
          </h2>
          <p className="text-stone-600 text-sm">
            From initial membership approval to referral conversion, thank-you notes, and analytics — every stage of your growth is interconnected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              step: '01',
              title: 'Membership & Approval',
              desc: 'Multi-step application verified by authorized VLBVN administrative committee.',
              icon: <ShieldCheck className="w-6 h-6 text-amber-700" />,
            },
            {
              step: '02',
              title: 'Direct Referral Exchange',
              desc: 'Pass and receive qualified business opportunities with real-time lifecycle tracking.',
              icon: <Share2 className="w-6 h-6 text-orange-600" />,
            },
            {
              step: '03',
              title: 'Collaborations & Projects',
              desc: 'Post joint venture requests, tender needs, and capability partnerships.',
              icon: <Briefcase className="w-6 h-6 text-blue-600" />,
            },
            {
              step: '04',
              title: 'Conclaves & Attendance',
              desc: 'Attend monthly chapter conclaves with instant QR code attendance verification.',
              icon: <Calendar className="w-6 h-6 text-emerald-600" />,
            },
          ].map((item) => (
            <div key={item.step} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">{item.icon}</div>
                <span className="text-2xl font-black text-amber-900/30">{item.step}</span>
              </div>
              <h3 className="font-bold text-base text-stone-900 mb-2">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Member Testimonials Section */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">Community Recognition</span>
            <h2 className="text-3xl font-extrabold text-stone-900">What Visionary Leaders Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicTestimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <Quote className="w-8 h-8 text-amber-500/40" />
                <p className="text-sm text-stone-700 leading-relaxed italic">"{t.testimonialText}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <img src={t.authorPhoto} alt={t.authorName} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{t.authorName}</h4>
                    <p className="text-[11px] text-stone-500">{t.authorBusiness}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Membership CTA - Light Theme */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-orange-500/10 rounded-3xl p-8 sm:p-12 text-stone-900 text-center space-y-6 shadow-xl border-2 border-amber-300">
          <VlbvnLogo variant="color" size="lg" className="justify-center" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto text-stone-900">
            Ready to Scale Your Business with Visionary Peers?
          </h2>
          <p className="text-stone-700 text-sm max-w-xl mx-auto font-medium">
            Submit your membership application today and connect with verified entrepreneurs across Maharashtra, Karnataka, Telangana, and globally.
          </p>
          <div>
            <button
              onClick={() => setCurrentRoute('/apply-membership')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm px-9 py-4 rounded-xl shadow-xl hover:brightness-105 transition-all inline-flex items-center gap-2"
            >
              <span>Apply for VLBVN Membership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
