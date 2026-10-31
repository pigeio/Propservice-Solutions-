import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, Clock, MapPin, ChevronRight, X, Activity, ExternalLink } from 'lucide-react';

export interface MunicipalEvent {
  id: string;
  service: string;
  locality: string;
  zone: string;
  timestamp: string;
  docketId: string;
  status: 'Endorsed' | 'Delivered' | 'Verified' | 'Sanctioned';
}

const LIVE_EVENTS: MunicipalEvent[] = [
  {
    id: '1',
    service: 'BBMP Digital e-Khata',
    locality: 'Indiranagar Ward 112',
    zone: 'East Zone',
    timestamp: '9 mins ago',
    docketId: 'DOC-BLR-8941',
    status: 'Endorsed',
  },
  {
    id: '2',
    service: '30-Year Encumbrance Search (EC Form 15)',
    locality: 'HSR Layout Sector 2',
    zone: 'South Zone',
    timestamp: '24 mins ago',
    docketId: 'DOC-BLR-8938',
    status: 'Delivered',
  },
  {
    id: '3',
    service: 'Kaveri 2.0 PID Mapping & Aadhaar e-KYC',
    locality: 'Bellandur / Green Glen Layout',
    zone: 'Mahadevapura Zone',
    timestamp: '37 mins ago',
    docketId: 'DOC-BLR-8935',
    status: 'Verified',
  },
  {
    id: '4',
    service: 'Khata Transfer (Property Mutation)',
    locality: 'Whitefield Prestige Palms',
    zone: 'Mahadevapura Zone',
    timestamp: '52 mins ago',
    docketId: 'DOC-BLR-8930',
    status: 'Sanctioned',
  },
  {
    id: '5',
    service: 'Digital e-Khata & Betterment Arrears Clearance',
    locality: 'JP Nagar 7th Phase',
    zone: 'South Zone',
    timestamp: '1 hour ago',
    docketId: 'DOC-BLR-8924',
    status: 'Endorsed',
  },
  {
    id: '6',
    service: '30-Year Historical Title Search & CC Retrieval',
    locality: 'Malleshwaram 15th Cross',
    zone: 'West Zone',
    timestamp: '1 hr 18 mins ago',
    docketId: 'DOC-BLR-8919',
    status: 'Verified',
  },
  {
    id: '7',
    service: 'Panchayat Form 9/11 to BBMP Transition',
    locality: 'Sarjapur Road Corridor',
    zone: 'Bommanahalli Zone',
    timestamp: '1 hr 45 mins ago',
    docketId: 'DOC-BLR-8912',
    status: 'Sanctioned',
  },
  {
    id: '8',
    service: 'B-Khata Building Setback Legal Scrutiny',
    locality: 'Koramangala 4th Block',
    zone: 'South Zone',
    timestamp: '2 hours ago',
    docketId: 'DOC-BLR-8908',
    status: 'Verified',
  },
];

interface LiveActivityPulseProps {
  onOpenBookingModal?: (serviceId?: string) => void;
}

export const LiveActivityPulse: React.FC<LiveActivityPulseProps> = ({ onOpenBookingModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(true);

  // Auto-cycle through events every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = LIVE_EVENTS[currentIndex];

  const getStatusBadge = (status: MunicipalEvent['status']) => {
    switch (status) {
      case 'Endorsed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Sanctioned':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Delivered':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      case 'Verified':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200';
    }
  };

  return (
    <>
      {/* 1. TOP SLEEK TICKER RIBBON (Directly below Navbar) */}
      <div className="border-b border-neutral-200/80 bg-neutral-900 text-white dark:border-neutral-800 dark:bg-black py-2 px-4 select-none relative overflow-hidden text-xs">
        {/* Subtle glowing ambient line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Left: Pulse Indicator & Live Desk Label */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold tracking-wider uppercase text-[10px] text-amber-400 flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>Live Desk:</span>
            </span>
            <span className="text-neutral-400 hidden sm:inline text-[11px]">
              Bengaluru Municipal Real-Time Filings
            </span>
          </div>

          {/* Center: Dynamic Cycling Event */}
          <div className="flex-1 overflow-hidden h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex items-center gap-2 text-[11px] truncate"
              >
                <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(current.status)}`}>
                  {current.status}
                </span>
                <span className="font-semibold text-neutral-100 truncate">
                  {current.service}
                </span>
                <span className="text-neutral-500 hidden md:inline">·</span>
                <span className="text-amber-300 hidden md:inline truncate">
                  {current.locality} ({current.zone})
                </span>
                <span className="text-neutral-500 font-mono text-[10px] hidden lg:inline">
                  {current.docketId}
                </span>
                <span className="text-neutral-400 text-[10px] ml-1 shrink-0">
                  {current.timestamp}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: View All Feed Trigger */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-amber-400 transition-colors shrink-0"
          >
            <span className="hidden sm:inline">View Feed</span>
            <span className="sm:hidden">Feed</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 2. FLOATING BOTTOM-RIGHT INTERACTIVE TOAST POPUP */}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 max-w-sm rounded-xl border border-neutral-300/90 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95 text-neutral-900 dark:text-white hidden sm:block"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Municipal Activity Pulse
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsToastVisible(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                aria-label="Dismiss live alert"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-950 dark:text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{current.service}</span>
              </div>
              <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-300 leading-tight">
                Successfully processed in <strong className="text-neutral-900 dark:text-white">{current.locality}</strong> ({current.zone}).
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-neutral-200/80 pt-2.5 text-[10px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <span className="font-mono">{current.docketId} · {current.timestamp}</span>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-0.5"
              >
                <span>Live Ledger</span>
                <ChevronRight className="h-2.5 w-2.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FULL LIVE MUNICIPAL ACTIVITY DRAWER / MODAL */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full max-w-md bg-white p-6 shadow-2xl dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      <Activity className="h-4 w-4" />
                      <span>Bengaluru Real-Time Docket Ledger</span>
                    </div>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                      Live Municipal Filings
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      Files actively cleared and endorsed across BBMP wards today.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Live Stats Summary Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="text-base font-extrabold text-neutral-950 dark:text-white">18</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Active Files Today</div>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Verification Rate</div>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">8.4 Days</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Avg Turnaround</div>
                  </div>
                </div>

                {/* Event Feed List */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Recent Docket Activity:
                  </h4>
                  {LIVE_EVENTS.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg border border-neutral-200 bg-white p-3.5 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900/70 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-neutral-500">
                          {event.docketId}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(event.status)}`}>
                          {event.status}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-neutral-950 dark:text-white">
                        {event.service}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
                        <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
                          <MapPin className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                          <span>{event.locality}</span>
                        </span>
                        <span>{event.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Consultation CTA */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    if (onOpenBookingModal) {
                      onOpenBookingModal('e_khata');
                    }
                  }}
                  className="w-full rounded-md bg-neutral-950 py-3 text-center text-xs font-bold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  Book Your File for Priority Clearance
                </button>
                <div className="text-center text-[10px] text-neutral-500">
                  Files handled directly by senior Bangalore property advocates.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

