import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MessageSquareQuote, Star, Send, CheckCircle2 } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { testimonials, submitTestimonial, currentUser } = useDemo();
  const [rating, setRating] = useState(5);
  const [testimonialText, setTestimonialText] = useState('');

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonialText.trim()) {
      submitTestimonial({
        rating,
        testimonialText,
      });
      setTestimonialText('');
    }
  };

  const myTestimonials = testimonials.filter((t) => t.authorId === currentUser.id);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <MessageSquareQuote className="w-6 h-6 text-amber-700" />
          <span>VLBVN Community Testimonials & Recognition</span>
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Share your experience with VLBVN network to be published on the public community portal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Submit Testimonial Form */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-5 text-xs">
          <h3 className="font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
            Share Your Community Experience
          </h3>

          <form onSubmit={handleTestimonialSubmit} className="space-y-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Star Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${rating >= star ? 'fill-amber-400' : 'text-stone-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Your Testimonial Review *</label>
              <textarea
                rows={4}
                placeholder="Describe how VLBVN network has helped grow your business..."
                value={testimonialText}
                onChange={(e) => setTestimonialText(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-xs py-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Testimonial for Review</span>
            </button>
          </form>
        </div>

        {/* Right Column: Submitted History */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-card space-y-4 text-xs">
            <h3 className="font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-3">
              My Submitted Testimonials ({myTestimonials.length})
            </h3>

            <div className="space-y-3">
              {myTestimonials.map((t) => (
                <div key={t.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-extrabold text-[10px] uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {t.approvalStatus}
                    </span>
                  </div>
                  <p className="text-stone-700 italic text-[11px]">"{t.testimonialText}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
