import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const ApplyMembershipPage: React.FC = () => {
  const { submitApplication, setCurrentRoute } = useDemo();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    city: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    businessName: '',
    profession: '',
    category: 'Information Technology & Software',
    services: '',
    experienceYears: 5,
    website: '',
    linkedin: '',
    referralSource: 'Member Referral',
    motivation: '',
    contributions: '',
    desiredCollaborations: '',
    acceptedTerms: false,
  });

  const categories = [
    'Information Technology & Software',
    'Real Estate & Construction',
    'Healthcare & Life Sciences',
    'Financial Services & Accounting',
    'Clean Energy & Utilities',
    'Logistics & Supply Chain',
    'Manufacturing & Textiles',
    'Automotive & Mobility',
    'Legal & Compliance',
    'Education & Training',
  ];

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    const appId = submitApplication({
      applicantName: formData.applicantName || 'Applicant Leader',
      email: formData.email || 'applicant@vlbvn.org',
      phone: formData.phone || '+91 98000 11223',
      city: formData.city || 'Pune',
      photoUrl: formData.photoUrl,
      businessName: formData.businessName || 'Visionary Enterprises',
      profession: formData.profession || 'Managing Director',
      category: formData.category,
      services: formData.services || 'Consulting & Growth Advisory',
      experienceYears: Number(formData.experienceYears) || 5,
      website: formData.website,
      linkedin: formData.linkedin,
      referralSource: formData.referralSource,
      motivation: formData.motivation || 'To expand business network and exchange qualified referrals.',
      contributions: formData.contributions || 'Offering mentorship and procurement contracts.',
      desiredCollaborations: formData.desiredCollaborations || 'Seeking IT and logistics partners.',
    });

    setCurrentRoute(`/apply-submitted?id=${appId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C120C] to-[#2C1D14] text-white p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-amber-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VLBVN Official Membership Application</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-300">Apply for VLBVN Membership</h1>
        <p className="text-stone-300 text-xs sm:text-sm">
          Join the premier business network for Veerashaiva Lingayat visionary entrepreneurs and leaders.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Personal' },
            { num: 2, label: 'Business' },
            { num: 3, label: 'Community' },
            { num: 4, label: 'Declaration' },
            { num: 5, label: 'Review' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === s.num
                    ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-200 shadow-md'
                    : currentStep > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`hidden sm:inline text-xs font-bold ${
                  currentStep === s.num ? 'text-amber-900' : 'text-stone-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card Container */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        {/* STEP 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-extrabold text-stone-900 border-b border-stone-100 pb-2">
              Step 1: Personal & Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Basavaraj Shivacharya"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mobile Phone *</label>
                <input
                  type="text"
                  placeholder="+91 98450 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="name@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">City / Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Bengaluru, Solapur, Hubballi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Profile Photo URL</label>
                <input
                  type="text"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Business Info */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-extrabold text-stone-900 border-b border-stone-100 pb-2">
              Step 2: Business & Professional Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Business / Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Apex HealthTech & Hospitals"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Profession / Role *</label>
                <input
                  type="text"
                  placeholder="e.g. Managing Director & CEO"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Business Industry Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Years of Business Experience</label>
                <input
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Products / Services Offered *</label>
                <input
                  type="text"
                  placeholder="e.g. Turnkey solar EPC, energy auditing, PPA solar models"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Company Website</label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Community Alignment */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-extrabold text-stone-900 border-b border-stone-100 pb-2">
              Step 3: Community Alignment & Capabilities
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">How did you hear about VLBVN?</label>
                <input
                  type="text"
                  placeholder="e.g. Referred by Anand Deshmukh / Chapter Event"
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Why do you want to join VLBVN? *</label>
                <textarea
                  rows={3}
                  placeholder="Describe your business growth goals and community engagement motivation..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">What can you contribute to fellow members? *</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Mentorship on FDA compliance, discounted contracts for members..."
                  value={formData.contributions}
                  onChange={(e) => setFormData({ ...formData, contributions: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">What collaborations are you seeking? *</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Seeking software development vendors and hospital procurement partners..."
                  value={formData.desiredCollaborations}
                  onChange={(e) => setFormData({ ...formData, desiredCollaborations: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Verification */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-extrabold text-stone-900 border-b border-stone-100 pb-2">
              Step 4: Code of Conduct & Declaration
            </h2>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3 text-xs text-stone-800">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>VLBVN Community Guidelines & Code of Conduct</span>
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-stone-700 leading-relaxed">
                <li>I agree to pass qualified, genuine business referrals with complete transparency.</li>
                <li>I agree to uphold highest ethical standards in all commercial dealings with fellow members.</li>
                <li>I understand that membership applications undergo administrative credential review.</li>
                <li>I confirm all information provided in this dossier is accurate and verifiable.</li>
              </ul>
            </div>

            <div className="pt-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-900">
                <input
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span>I accept VLBVN terms, community code of conduct, and declaration.</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 5: Final Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-extrabold text-stone-900 border-b border-stone-100 pb-2">
              Step 5: Review Application Summary
            </h2>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-500 block">Applicant Name</span>
                  <span className="font-bold text-stone-900 text-sm">{formData.applicantName || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Mobile & Email</span>
                  <span className="font-bold text-stone-900">{formData.phone} | {formData.email}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Business & Category</span>
                  <span className="font-bold text-stone-900">{formData.businessName} ({formData.category})</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Location</span>
                  <span className="font-bold text-stone-900">{formData.city}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2">
                <div>
                  <span className="text-stone-500 block font-semibold">Services Offered:</span>
                  <p className="text-stone-800">{formData.services || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-stone-500 block font-semibold">Growth Motivation:</span>
                  <p className="text-stone-800">{formData.motivation || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Stepper Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : <div />}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitFinal}
              className="flex items-center gap-1.5 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Application Dossier</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
