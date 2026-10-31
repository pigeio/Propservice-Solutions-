import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  Clock,
  MapPin,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO, BBMP_ZONES, SERVICES_LIST } from '../data/propServiceData';
import { AuroraGlow } from './AuroraGlow';

interface HeroSectionProps {
  onOpenBookingModal: (service?: string) => void;
  onScrollToEstimator: () => void;
  onOpenAIStudio?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBookingModal,
  onScrollToEstimator,
  onOpenAIStudio,
}) => {
  const [selectedService, setSelectedService] = useState('e_khata');
  const [selectedZone, setSelectedZone] = useState('south');

  const handleQuickAction = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingModal(selectedService);
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAF9F5] py-16 lg:py-24 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      {/* Ambient Aurora Mesh & Gold Glow */}
      <AuroraGlow variant="hero" />

      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7">
            {/* Prominent Company Identity Badge */}
            <div className="mb-4 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-amber-300 bg-amber-50/90 px-4 py-1.5 shadow-xs dark:border-amber-800/80 dark:bg-amber-950/60">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white dark:bg-amber-500 dark:text-neutral-950">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-black tracking-wide uppercase text-neutral-950 dark:text-white">
                Propservice Solutions
              </span>
              <span className="text-amber-500 font-bold hidden sm:inline">·</span>
              <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 hidden sm:inline">
                Bengaluru Property Documentation & Legal Agency
              </span>
              <span className="text-neutral-400 dark:text-neutral-600 hidden md:inline">·</span>
              <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 hidden md:inline">
                HSR Layout Sector 2
              </span>
            </div>

            {/* Christmas & Year-End Sale Urgency Strip */}
            <div className="mb-5 block">
              <div className="inline-flex items-center gap-2 rounded-lg border border-red-300/80 bg-red-50/95 px-3 py-1.5 text-xs font-bold text-red-900 shadow-2xs dark:border-red-900/60 dark:bg-red-950/70 dark:text-red-300">
                <span className="text-base leading-none">🎄</span>
                <span className="uppercase tracking-wider font-black text-[11px] text-red-700 dark:text-red-400">Christmas & Year-End Sale:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Valid till 31st Dec only — Get your documents done!</span>
              </div>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Seamless BBMP e-Khata, Property Mutations & Title Scrutiny.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-700 leading-relaxed dark:text-neutral-300">
              With the Karnataka Government mandating digital e-Khata for all property registrations under Kaveri 2.0, our verified property advocates and legal team manage the entire municipal process seamlessly on your behalf. Zero government office queues, full legal accountability.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBookingModal()}
                className="flex items-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {onOpenAIStudio && (
                <button
                  type="button"
                  onClick={onOpenAIStudio}
                  className="flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>AI e-Khata & Document Checker</span>
                </button>
              )}

              <button
                type="button"
                onClick={onScrollToEstimator}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white px-3 py-2"
              >
                <span>Calculate Fees & Timeline</span>
              </button>
            </div>

            {/* Quick Micro-Highlights */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                <span>Verified Field Executives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                <span>Zero Advance on Legal Scrutiny</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                <span>All 8 BBMP Zones Covered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Interactive Quick Request Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-neutral-300/80 bg-white p-6 sm:p-8 shadow-xl transition-all dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Propservice Solutions Desk
                    </div>
                    <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                      Instant Document Assessment
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Get turnaround time & processing schedule
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Bengaluru
                </span>
              </div>

              <form onSubmit={handleQuickAction} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Select Documentation Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:border-neutral-900 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} – {srv.priceFormatted} ({srv.jurisdiction === 'bbmp' ? 'BBMP' : 'Panchayat'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your BBMP Ward / Locality
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:border-neutral-900 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                  >
                    {BBMP_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} ({zone.keyLocalities.slice(0, 3).join(', ')})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3.5 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950/70 dark:text-neutral-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Service Model:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">100% End-to-End Assistance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Government Integration:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">BBMP & Kaveri 2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Physical Presence:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">HSR Layout Sector 2 Office</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-neutral-950 py-3 text-center text-xs font-bold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  Book Executive Consultation
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>Direct Helpline:</span>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="font-bold text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>{COMPANY_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Statistics Strip (Adjacent to Proposition) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-neutral-300/80 pt-10 dark:border-neutral-800">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
              <Building2 className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
              <span>Properties Handled</span>
            </div>
            <div className="text-3xl font-bold tabular-nums text-neutral-950 dark:text-white">
              4,850+
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Apartments, villas, and residential plots documented across Greater Bengaluru.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
              <Clock className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
              <span>Average e-Khata Timeline</span>
            </div>
            <div className="text-3xl font-bold tabular-nums text-neutral-950 dark:text-white">
              7 - 10 Days
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Rapid municipal filing with daily Assistant Revenue Officer (ARO) tracking.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
              <MapPin className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
              <span>Zonal Coverage</span>
            </div>
            <div className="text-3xl font-bold tabular-nums text-neutral-950 dark:text-white">
              8 BBMP Zones
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Comprehensive reach from Electronic City to Yelahanka and Whitefield to Malleshwaram.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
              <span>Legal Scrutiny</span>
            </div>
            <div className="text-3xl font-bold tabular-nums text-neutral-950 dark:text-white">
              30-Yr Search
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Sub-Registrar Encumbrance Certificates and High Court advocate title audit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
