import React, { useState } from 'react';
import { MapPin, Clock, Building, ArrowRight, Check } from 'lucide-react';
import { BBMP_ZONES } from '../data/propServiceData';

interface ZoneCoverageProps {
  onOpenBookingModal: (service?: string) => void;
}

export const ZoneCoverage: React.FC<ZoneCoverageProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState(BBMP_ZONES[0].id);
  const activeZone = BBMP_ZONES.find((z) => z.id === selectedZoneId)!;

  return (
    <section id="zones" className="border-b border-neutral-200/80 bg-white py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Municipal Jurisdiction Directory</span>
            <span aria-hidden="true">·</span>
            <span>All 8 Zones Covered</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Bengaluru BBMP Zonal Office Coverage
          </h2>

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            PropService Solutions maintains verified field executives and daily municipal liaison officers across all jurisdictional BBMP Assistant Revenue Offices (ARO) in Greater Bengaluru.
          </p>
        </div>

        {/* Zone Selector Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
          {BBMP_ZONES.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZoneId(zone.id)}
                className={`rounded-md px-4 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-neutral-950 text-white shadow-xs dark:bg-white dark:text-neutral-950'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>

        {/* Selected Zone Deep Dive Card */}
        <div className="mt-8 rounded-xl border border-neutral-300/80 bg-[#FAF9F5] p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                <MapPin className="h-4 w-4" />
                <span>{activeZone.name} Jurisdiction</span>
              </div>

              <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">
                Property Documentation Services in {activeZone.name}
              </h3>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {activeZone.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white block mb-2">
                  Key Localities Covered:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeZone.keyLocalities.map((loc, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 shadow-2xs dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Zonal Office & Turnaround Card */}
            <div className="lg:col-span-5 rounded-lg border border-neutral-200 bg-white p-5 space-y-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start gap-3">
                <Building className="h-4 w-4 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500">
                    Jurisdictional BBMP Office
                  </div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {activeZone.headOffice}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <Clock className="h-4 w-4 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500">
                    Average Turnaround Timeline
                  </div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {activeZone.turnaroundAvg} from document verification
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenBookingModal()}
                className="w-full mt-2 rounded-md bg-neutral-950 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center justify-center gap-1.5"
              >
                <span>Book Service in {activeZone.name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
