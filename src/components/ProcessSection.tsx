import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PROCESS_STEPS } from '../data/propServiceData';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

interface ProcessSectionProps {
  onOpenBookingModal: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onOpenBookingModal,
}) => {
  return (
    <section className="border-b border-neutral-200/80 bg-[#FAF9F5] py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Service Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Zero Queue Model</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            How <span className="text-amber-600 dark:text-amber-400">Propservice Solutions</span> Works
          </h2>

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            We have redesigned property documentation into a structured 4-step workflow that removes the need to ever visit a municipal ward office or wait in revenue department lines.
          </p>
        </div>

        {/* 4 Editorial Steps Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((stepItem, idx) => (
            <ScrollReveal
              key={stepItem.step}
              delay={idx * 0.1}
              amount={0.15}
              className="h-full"
            >
              <SpotlightCard className="p-6 h-full border-neutral-300/80 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-xs">
                <div>
                  <span className="font-mono text-2xl font-bold text-amber-800 dark:text-amber-400">
                    {stepItem.step}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-neutral-950 dark:text-white">
                    {stepItem.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/80 text-[11px] font-semibold text-neutral-900 dark:text-neutral-200 flex items-center gap-1.5 dark:border-neutral-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-neutral-800 dark:text-neutral-200" />
                  <span>Dedicated Legal Support</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Callout Strip */}
        <div className="mt-12 rounded-xl border border-neutral-300/80 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-950 text-white shrink-0 dark:bg-neutral-100 dark:text-neutral-950">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                Have urgent property registration dates approaching?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                We offer priority fast-track liaison for imminent sale deed registrations in Bengaluru.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenBookingModal}
            className="rounded-md bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 shrink-0 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Request Expedited Document Audit
          </button>
        </div>
      </div>
    </section>
  );
};
