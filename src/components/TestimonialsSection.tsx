import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/propServiceData';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="border-b border-neutral-200/80 bg-[#FAF9F5] py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Verified Bangalore Homeowners</span>
            <span aria-hidden="true">·</span>
            <span>Client Experiences</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Trusted by 4,800+ Bengaluru Property Owners
          </h2>

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Read direct feedback from tech professionals, senior citizens, and NRI property investors who secured their BBMP e-Khatas and title transfers with PropService Solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal
              key={t.id}
              delay={idx * 0.1}
              amount={0.12}
              className="h-full"
            >
              <SpotlightCard className="p-7 h-full border-neutral-300/80 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-xs">
                <div>
                  {/* Rating & Service */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {t.serviceUsed}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author & Locality */}
                <div className="mt-6 border-t border-neutral-200/80 pt-4 flex items-center justify-between dark:border-neutral-800">
                  <div>
                    <div className="text-sm font-bold text-neutral-950 dark:text-white">
                      {t.author}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {t.designation}
                    </div>
                  </div>

                  <div className="text-right text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="font-medium text-neutral-900 dark:text-white">{t.locality}</div>
                    <div className="text-[11px] text-neutral-400">Year {t.year}</div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
