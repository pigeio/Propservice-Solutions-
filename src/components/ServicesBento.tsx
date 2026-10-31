import React, { useState } from 'react';
import {
  FileCheck2,
  ArrowLeftRight,
  FilePlus2,
  FileText,
  Zap,
  Landmark,
  ArrowRight,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  SERVICES_LIST,
  OFFICIAL_DOCUMENTS_REQUIRED,
  FLYER_VALUE_PILLARS,
  FESTIVE_CAMPAIGN,
} from '../data/propServiceData';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

interface ServicesBentoProps {
  onOpenBookingModal: (serviceId?: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'all' | 'bbmp' | 'panchayat'>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('e_khata');

  const filteredServices = SERVICES_LIST.filter(
    (s) => selectedJurisdiction === 'all' || s.jurisdiction === selectedJurisdiction
  );

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'e_khata':
        return <FileCheck2 className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />;
      case 'khata_transfer':
        return <ArrowLeftRight className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />;
      case 'new_khata':
        return <FilePlus2 className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />;
      case 'encumbrance_certificate':
        return <FileText className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />;
      case 'bbmp_bescom':
        return <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case 'panchayat_e_khata':
        return <Landmark className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />;
      case 'panchayat_bescom':
        return <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <FileCheck2 className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />;
    }
  };

  return (
    <section id="services" className="border-b border-neutral-200/80 bg-white py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Official Service Catalog & Transparent Rates</span>
              <span aria-hidden="true">·</span>
              <span>Bengaluru Municipality & Panchayats</span>
            </div>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Get Your E-Khata Done With Us Hassle Free
            </h2>

            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Complete municipal and rural property documentation services with fixed transparent pricing, seamless processing, and end-to-end government liaison.
            </p>
          </div>

          {/* Jurisdiction Filter Tabs */}
          <div className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-50 p-1 dark:border-neutral-700 dark:bg-neutral-900 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('all')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                selectedJurisdiction === 'all'
                  ? 'bg-neutral-950 text-white shadow-xs dark:bg-white dark:text-neutral-950'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              All Services ({SERVICES_LIST.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('bbmp')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                selectedJurisdiction === 'bbmp'
                  ? 'bg-neutral-950 text-white shadow-xs dark:bg-white dark:text-neutral-950'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              BBMP Jurisdiction (5)
            </button>
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('panchayat')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                selectedJurisdiction === 'panchayat'
                  ? 'bg-neutral-950 text-white shadow-xs dark:bg-white dark:text-neutral-950'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Panchayat Jurisdiction (2)
            </button>
          </div>
        </div>

        {/* 4 Value Pillars Strip directly from Flyer */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-neutral-200/80 py-6 dark:border-neutral-800">
          {FLYER_VALUE_PILLARS.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-950 dark:text-white">
                  {pillar.title}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5">
                  {pillar.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Christmas & Year-End Special Offer Banner */}
        <div className="mt-8 rounded-xl border border-red-300/80 bg-gradient-to-r from-red-50 via-amber-50/50 to-emerald-50/80 p-4 sm:p-5 dark:border-red-900/60 dark:from-red-950/40 dark:via-neutral-900 dark:to-emerald-950/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-2xl shadow-md shrink-0">
              🎄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Limited Period
                </span>
                <span className="text-xs font-extrabold text-red-700 dark:text-red-400">
                  Valid till 31st Dec only
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white mt-0.5">
                Christmas & Year-End Sale · Get Your Documents Done!
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                Special holiday fee cuts on BBMP e-Khata, Transfers & Encumbrance Certificates. Lock in discounted rates before the new year!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenBookingModal('e_khata')}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-colors shrink-0 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Claim Discount</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv, idx) => {
            const isExpanded = expandedServiceId === srv.id;
            const isPanchayat = srv.jurisdiction === 'panchayat';

            return (
              <ScrollReveal
                key={srv.id}
                delay={(idx % 3) * 0.08}
                amount={0.12}
                className="h-full"
              >
                <SpotlightCard
                  className={`group h-full p-6 ${
                    isPanchayat
                      ? 'border-emerald-200/80 bg-[#F4F9F5] dark:border-emerald-900/60 dark:bg-emerald-950/20'
                      : 'border-neutral-200/90 bg-white dark:border-neutral-800 dark:bg-neutral-900/40'
                  }`}
                  spotlightColor={isPanchayat ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)'}
                  borderColor={isPanchayat ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)'}
                >
                <div>
                  {/* Top Header: Icon & Jurisdiction Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white shadow-xs dark:border-neutral-700 dark:bg-neutral-800">
                      {getServiceIcon(srv.id)}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isPanchayat
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                          : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}
                    >
                      {srv.governmentBody}
                    </span>
                  </div>

                  {/* Thumbnail Image with Scrim */}
                  {srv.imageUrl && (
                    <div className="relative aspect-16/9 w-full rounded-lg overflow-hidden bg-neutral-900 mb-4 shadow-2xs">
                      <img
                        src={srv.imageUrl}
                        alt={srv.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white/95">
                        {srv.timelineDays}
                      </div>
                    </div>
                  )}

                  {/* Title & Price Banner with Strikethrough Discount */}
                  <div className="flex items-start justify-between gap-2 border-b border-neutral-200/60 pb-3 dark:border-neutral-800">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-950 dark:text-white leading-snug">
                        {srv.name}
                      </h3>
                      {srv.discountBadge && (
                        <span className="inline-flex items-center gap-1 mt-1 rounded bg-red-100 px-2 py-0.5 text-[10px] font-extrabold text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900">
                          <span>🎄</span>
                          <span>{srv.discountBadge}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      {srv.originalPriceFormatted && (
                        <div className="text-xs text-neutral-400 dark:text-neutral-500 line-through tabular-nums decoration-red-500 decoration-1.5 font-medium">
                          {srv.originalPriceFormatted}
                        </div>
                      )}
                      <div className="text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums tracking-tight">
                        {srv.priceFormatted}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-semibold">
                        Valid till 31st Dec
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  {/* Expandable Deliverables */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3 border-t border-neutral-200/80 pt-3 text-xs dark:border-neutral-800">
                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-white block mb-1.5">
                          What You Receive:
                        </span>
                        <ul className="space-y-1 text-neutral-600 dark:text-neutral-300">
                          {srv.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle className="h-3.5 w-3.5 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                          Documents Required:
                        </span>
                        <ul className="space-y-0.5 text-neutral-500 dark:text-neutral-400">
                          {srv.requiredDocs.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="font-mono text-[10px]">·</span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setExpandedServiceId(isExpanded ? null : srv.id)}
                    className="flex-1 rounded-md border border-neutral-300 bg-white py-2 text-center text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1"
                  >
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBookingModal(srv.id)}
                    className="flex-1 rounded-md bg-neutral-950 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center justify-center gap-1"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Official Documents Required Box (Directly from flyer) */}
        <div className="mt-14 rounded-2xl border border-neutral-300/80 bg-[#FAF9F5] p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                <FileText className="h-4 w-4" />
                <span>Verification Checklist</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white mt-0.5">
                Documents Required from Property Owners
              </h3>
            </div>
            <span className="text-xs text-neutral-500">
              Secure document intake and comprehensive verification handled end-to-end
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICIAL_DOCUMENTS_REQUIRED.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-3.5 shadow-2xs dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200 shrink-0 font-bold text-xs">
                  0{idx + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-950 dark:text-white">
                    {doc.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {doc.note}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/80 text-xs text-neutral-500 dark:border-neutral-800">
            <div>
              *Manual Khata & Occupancy Certificate (OC) required only where applicable.
            </div>
            <button
              type="button"
              onClick={() => onOpenBookingModal()}
              className="rounded-md bg-neutral-950 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 shrink-0"
            >
              Request Free Document Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
