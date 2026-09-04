import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useDemo();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Membership Inquiry');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been received! VLBVN support will contact you within 24 hours.', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const offices = [
    {
      city: 'Pune Headquarters (Maharashtra)',
      address: 'Suite 504, Deshmukh Commercial Towers, Senapati Bapat Road, Pune - 411016',
      phone: '+91 94220 54321',
      email: 'pune.hq@vlbvn.org',
    },
    {
      city: 'Bengaluru Regional Secretariat (Karnataka)',
      address: 'Level 8, Apex HealthTech Towers, Inner Ring Road, Indiranagar, Bengaluru - 560038',
      phone: '+91 98450 12345',
      email: 'bengaluru@vlbvn.org',
    },
    {
      city: 'North Karnataka Chapter Office (Belagavi)',
      address: 'Kulkarni Logistics Hub, College Road, Belagavi - 590001',
      phone: '+91 98860 88776',
      email: 'belagavi@vlbvn.org',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E66B27]">Get In Touch</span>
        <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
          Connect with VLBVN Secretariat
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Have questions about membership, chapter registration, sponsorship, or conclave schedules? Our administrative team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-8 shadow-card space-y-6">
          <h2 className="text-xl font-extrabold text-stone-900 border-b border-stone-100 pb-3">
            Send an Inquiry Message
          </h2>

          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Deshmukh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mobile Phone *</label>
                <input
                  type="text"
                  placeholder="+91 98450 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="name@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Inquiry Subject Category</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 font-semibold"
                >
                  <option value="Membership Inquiry">Membership Inquiry & Application</option>
                  <option value="Chapter Launch">Launching VLBVN Chapter in New City</option>
                  <option value="Sponsorship">Summit Sponsorship & Partnership</option>
                  <option value="General Support">General Support & Feedback</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Message Details *</label>
                <textarea
                  rows={4}
                  placeholder="Write your message or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm py-3.5 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Secretariat</span>
            </button>
          </form>
        </div>

        {/* Office Locations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-amber-500/15 via-amber-100/40 to-orange-500/10 text-stone-900 rounded-3xl p-8 border border-amber-300/80 shadow-card space-y-6">
            <h2 className="text-xl font-extrabold text-stone-900 border-b border-amber-200/80 pb-3">
              Regional Chapter Offices
            </h2>

            <div className="space-y-6 text-xs">
              {offices.map((off, idx) => (
                <div key={idx} className="space-y-2 border-b border-amber-200/60 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-bold text-sm text-stone-900">{off.city}</h3>
                  <div className="text-stone-700 space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{off.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{off.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{off.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
