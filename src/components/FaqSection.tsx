import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/propServiceData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = FAQ_LIST.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="faq" className="border-b border-neutral-200/80 bg-white py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span>Bengaluru Property Regulations</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Everything You Need to Know About e-Khata & Municipal Filings
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Have questions about the Karnataka Government's Kaveri 2.0 digital mandate, A-Khata vs B-Khata, or property documentation? Find detailed answers below.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex justify-center gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'e_khata', label: 'e-Khata Mandate' },
            { id: 'transfer', label: 'Khata Transfer' },
            { id: 'legal', label: 'Legal & NRI Support' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 bg-[#FAF9F5] transition-all dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200/60 dark:bg-neutral-800 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border-t border-neutral-200/60 pt-3 dark:border-neutral-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
