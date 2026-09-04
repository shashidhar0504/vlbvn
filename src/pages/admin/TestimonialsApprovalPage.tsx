import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Badge } from '../../components/common/Badge';
import { MessageSquareQuote, Check, Star } from 'lucide-react';

export const TestimonialsApprovalPage: React.FC = () => {
  const { testimonials, approveTestimonial, rejectTestimonial } = useDemo();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <MessageSquareQuote className="w-6 h-6 text-amber-700" />
          <span>Testimonials Approval Queue</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Review member testimonials before publishing them to the public VLBVN website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <Badge status={t.approvalStatus} />
            </div>

            <p className="text-stone-700 leading-relaxed italic text-sm">"{t.testimonialText}"</p>

            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <img src={t.authorPhoto} alt={t.authorName} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
              <div>
                <div className="font-bold text-stone-900">{t.authorName}</div>
                <div className="text-[11px] text-stone-500">{t.authorBusiness}</div>
              </div>
            </div>

            {t.approvalStatus === 'PENDING' && (
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => approveTestimonial(t.id)}
                  className="flex-1 bg-emerald-600 text-white font-extrabold text-xs py-2 rounded-xl shadow hover:bg-emerald-700 flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Publish</span>
                </button>
                <button
                  onClick={() => rejectTestimonial(t.id)}
                  className="px-4 py-2 text-stone-600 hover:text-red-600 font-bold border border-stone-300 rounded-xl"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
