import React, { useState } from 'react';
import {
  Calculator,
  Clock,
  FileText,
  ShieldCheck,
  Check,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PropertyType, ServiceId, KhataType } from '../types/propService';
import { SERVICES_LIST, OFFICIAL_DOCUMENTS_REQUIRED } from '../data/propServiceData';
import { AuroraGlow } from './AuroraGlow';
import { SpotlightCard } from './SpotlightCard';

interface FeeEstimatorProps {
  onOpenBookingModal: (service?: string) => void;
}

export const FeeEstimator: React.FC<FeeEstimatorProps> = ({
  onOpenBookingModal,
}) => {
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [serviceId, setServiceId] = useState<ServiceId>('e_khata');
  const [khataType, setKhataType] = useState<KhataType>('a_khata');
  const [hasEncumbrance, setHasEncumbrance] = useState(false);

  const currentService = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];

  // Dynamic fee computation matching flyer exactly
  const getEstimation = () => {
    let baseAgencyFee = currentService.priceNumeric;
    let govtFeeEst = 'Included in fixed service fee';
    let timeline = currentService.timelineDays;
    let complexity = currentService.governmentBody;

    if (serviceId === 'e_khata') {
      baseAgencyFee = 4500;
      govtFeeEst = 'BBMP Digital Stamp & Kaveri 2.0 Fee';
      timeline = '7 - 10 Business Days';
      complexity = 'BBMP Jurisdiction · Kaveri 2.0 Integration';
    } else if (serviceId === 'khata_transfer') {
      baseAgencyFee = 12000;
      govtFeeEst = 'ARO Revenue Register Mutation Filing';
      timeline = '12 - 15 Business Days';
      complexity = 'BBMP Jurisdiction · Ownership Mutation';
    } else if (serviceId === 'new_khata') {
      baseAgencyFee = 15000;
      govtFeeEst = 'First-time Municipal Assessment & PID Generation';
      timeline = '15 - 20 Business Days';
      complexity = 'BBMP Jurisdiction · Fresh Khata Allocation';
    } else if (serviceId === 'encumbrance_certificate') {
      baseAgencyFee = 1500;
      govtFeeEst = 'Sub-Registrar Certified Search Fees';
      timeline = '3 - 5 Business Days';
      complexity = 'Department of Stamps & Registration';
    } else if (serviceId === 'bbmp_bescom') {
      baseAgencyFee = 5000;
      govtFeeEst = 'BESCOM Consumer Ledger Update & Meter Transfer';
      timeline = '7 - 10 Business Days';
      complexity = 'BBMP - BESCOM Mutation / Name Change';
    } else if (serviceId === 'panchayat_e_khata') {
      baseAgencyFee = 25000;
      govtFeeEst = 'E-Swathu Portal Form 9 & Form 11 Verification';
      timeline = '15 - 20 Business Days';
      complexity = 'Panchayat Jurisdiction · E-Swathu Certification';
    } else if (serviceId === 'panchayat_bescom') {
      baseAgencyFee = 7000;
      govtFeeEst = 'Rural BESCOM Electricity Account Name Change';
      timeline = '8 - 12 Business Days';
      complexity = 'Panchayat BESCOM Mutation / Name Change';
    }

    return {
      baseAgencyFee,
      govtFeeEst,
      timeline,
      complexity,
    };
  };

  const est = getEstimation();
  const totalPrice = est.baseAgencyFee + (hasEncumbrance && serviceId !== 'encumbrance_certificate' ? 1500 : 0);
  const originalBase = currentService.originalPriceNumeric || currentService.priceNumeric;
  const originalTotal = originalBase + (hasEncumbrance && serviceId !== 'encumbrance_certificate' ? 2500 : 0);
  const savings = Math.max(0, originalTotal - totalPrice);

  return (
    <section id="fee-estimator" className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAF9F5] py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      {/* Ambient Aurora Mesh Glow */}
      <AuroraGlow variant="section" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Instant Quote & Timeline Engine</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Pricing</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Bengaluru Property Documentation Fee Estimator
          </h2>

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Select your property classification and documentation service to calculate verified fixed service fees, expected turnaround times, and mandatory government paperwork.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 rounded-xl border border-neutral-300/80 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            {/* Step 1: Property Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                1. Select Property Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'apartment', label: 'Apartment / Flat' },
                  { id: 'villa', label: 'Independent Villa' },
                  { id: 'plot', label: 'Residential Plot' },
                  { id: 'commercial', label: 'Commercial Site' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id as PropertyType)}
                    className={`rounded-md border p-3 text-left transition-colors ${
                      propertyType === item.id
                        ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                        : 'border-neutral-200 bg-neutral-50/50 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Documentation Service */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  2. Documentation Service Required
                </label>
                <span className="text-[11px] text-neutral-500">
                  BBMP & Panchayat Jurisdiction
                </span>
              </div>

              {/* Service Selection Cards */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  BBMP Services
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES_LIST.filter((s) => s.jurisdiction === 'bbmp').map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setServiceId(srv.id)}
                      className={`rounded-md border p-3 text-left transition-colors flex items-center justify-between ${
                        serviceId === srv.id
                          ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                          : 'border-neutral-200 bg-neutral-50/50 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{srv.name}</div>
                        <div className={`text-[11px] mt-0.5 ${serviceId === srv.id ? 'opacity-80' : 'text-neutral-500'}`}>
                          {srv.timelineDays}
                        </div>
                      </div>
                      <div className="text-xs font-extrabold tabular-nums">
                        {srv.priceFormatted}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider pt-2">
                  Panchayat Services
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES_LIST.filter((s) => s.jurisdiction === 'panchayat').map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setServiceId(srv.id)}
                      className={`rounded-md border p-3 text-left transition-colors flex items-center justify-between ${
                        serviceId === srv.id
                          ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                          : 'border-neutral-200 bg-emerald-50/40 text-neutral-700 hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{srv.name}</div>
                        <div className={`text-[11px] mt-0.5 ${serviceId === srv.id ? 'opacity-80' : 'text-neutral-500'}`}>
                          {srv.timelineDays}
                        </div>
                      </div>
                      <div className="text-xs font-extrabold tabular-nums">
                        {srv.priceFormatted}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Current Khata / Title Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                3. Current Property Title Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'a_khata', label: 'Physical A-Khata', desc: 'Approved Layout / BBMP' },
                  { id: 'b_khata', label: 'B-Khata / Manual', desc: 'Tax Register / DC Converted' },
                  { id: 'panchayat', label: 'Gram Panchayat', desc: 'Form 9 & 11 / E-Swathu' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setKhataType(item.id as KhataType)}
                    className={`rounded-md border p-3 text-left transition-colors ${
                      khataType === item.id
                        ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                        : 'border-neutral-200 bg-neutral-50/50 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${khataType === item.id ? 'opacity-80' : 'text-neutral-500'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Include Encumbrance Search Addon */}
            {serviceId !== 'encumbrance_certificate' && (
              <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="ec-addon"
                    type="checkbox"
                    checked={hasEncumbrance}
                    onChange={(e) => setHasEncumbrance(e.target.checked)}
                    className="h-4 w-4 rounded accent-neutral-900 dark:accent-white"
                  />
                  <label htmlFor="ec-addon" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    Add Encumbrance Certificate (EC) Search
                  </label>
                </div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white tabular-nums">
                  +₹ 1,500/-
                </span>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <SpotlightCard className="lg:col-span-5 p-6 sm:p-8 shadow-xl sticky top-24 border-neutral-300/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Official Quote Summary
              </span>
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                {currentService.governmentBody}
              </span>
            </div>

            {/* Calculated Fee Block with Christmas Strikethrough */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Total Professional Service Fee
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-[10px] font-black uppercase text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900">
                  <span>🎄</span>
                  <span>Christmas Offer</span>
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-lg text-neutral-400 dark:text-neutral-500 line-through tabular-nums decoration-red-500 decoration-2 font-semibold">
                  ₹ {originalTotal.toLocaleString('en-IN')}/-
                </span>
                <span className="text-4xl font-black tabular-nums text-amber-600 dark:text-amber-400 tracking-tight">
                  ₹ {totalPrice.toLocaleString('en-IN')}/-
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] rounded bg-neutral-100 p-2 dark:bg-neutral-800">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  You Save ₹ {savings.toLocaleString('en-IN')}/-
                </span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  Valid till 31st Dec only
                </span>
              </div>

              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Includes comprehensive document verification, government office liaison, and delivery of certified records.
              </p>
            </div>

            {/* Department Workflow & Timeline */}
            <div className="mt-6 space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-950/60">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Jurisdiction:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{currentService.governmentBody}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Expected Turnaround:</span>
                <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
                  <Clock className="h-3 w-3 text-neutral-600 dark:text-neutral-300" />
                  <span>{est.timeline}</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Official Process:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{est.complexity}</span>
              </div>
            </div>

            {/* Official Required Documents Checklist */}
            <div className="mt-6">
              <span className="text-xs font-semibold text-neutral-900 dark:text-white block mb-2">
                Documents Required from You:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                {OFFICIAL_DOCUMENTS_REQUIRED.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-800 dark:text-neutral-200">{doc.name}</strong>{' '}
                      <span className="opacity-75">{doc.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => onOpenBookingModal(serviceId)}
              className="mt-6 w-full rounded-md bg-neutral-950 py-3 text-center text-xs font-bold text-white shadow-xs transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center justify-center gap-2"
            >
              <span>Book Consultation for this Service</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-3 text-center text-[11px] text-neutral-500 dark:text-neutral-400">
              Zero advance taken until preliminary document verification is confirmed.
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
