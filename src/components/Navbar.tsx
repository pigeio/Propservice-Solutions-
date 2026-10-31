import React from 'react';
import { Phone, Moon, Sun, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/propServiceData';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenBookingModal: (service?: string) => void;
  onOpenAIStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenBookingModal,
  onOpenAIStudio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-6 py-3 sm:py-3.5">
        {/* Brand Zone */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.01] shrink-0 group min-w-0"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-amber-400 shadow-md ring-1 ring-neutral-900/10 dark:from-white dark:to-neutral-200 dark:text-neutral-950 dark:ring-white/20 shrink-0">
            <ShieldCheck className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
              <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-950 dark:text-white">
                Propservice
              </span>
              <span className="text-lg sm:text-xl font-black tracking-tight text-amber-600 dark:text-amber-400">
                Solutions
              </span>
              <span className="hidden sm:inline-block rounded-full bg-amber-100 px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 ml-0.5">
                Legal
              </span>
            </div>
            <span className="hidden md:inline text-[10px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400 truncate max-w-[240px]">
              Bengaluru Property Legal & Documentation
            </span>
          </div>
        </a>

        {/* Center Nav Links - Only visible on wide viewports (xl:) so they don't crush the right-side controls */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 shrink-0">
          <a
            href="#services"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap dark:hover:text-white"
          >
            Services
          </a>
          <a
            href="#fee-estimator"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap dark:hover:text-white"
          >
            Fee Estimator
          </a>
          <a
            href="#status-tracker"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap dark:hover:text-white"
          >
            Track Application
          </a>
          <a
            href="#faq"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap dark:hover:text-white"
          >
            e-Khata FAQ
          </a>
        </nav>

        {/* Controls Zone: Always stays fully visible on the screen */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Christmas Sale Pill (large screens only) */}
          <div className="hidden 2xl:flex items-center gap-1 rounded-full bg-red-100 border border-red-200 px-2.5 py-1 text-[11px] font-bold text-red-700 dark:bg-red-950/80 dark:border-red-900 dark:text-red-300">
            <span>🎄</span>
            <span>Sale till 31st Dec</span>
          </div>

          {/* AI Property Document Assistant Button (large screens) */}
          {onOpenAIStudio && (
            <button
              type="button"
              onClick={onOpenAIStudio}
              className="hidden lg:flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50/80 px-2.5 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/60 shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>AI Document Checker</span>
            </button>
          )}

          {/* Direct Phone Call Link */}
          <a
            href={COMPANY_INFO.phoneHref}
            aria-label={`Call ${COMPANY_INFO.phoneFormatted}`}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white shrink-0"
          >
            <Phone className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
            <span className="hidden lg:inline">{COMPANY_INFO.phoneFormatted}</span>
          </a>

          {/* Night Mode Toggle - ALWAYS visible without scrolling */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white shrink-0 shadow-2xs cursor-pointer"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Primary CTA - ALWAYS visible without scrolling */}
          <button
            type="button"
            onClick={() => onOpenBookingModal()}
            className="flex items-center gap-1.5 rounded-lg bg-neutral-950 px-3 sm:px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-neutral-800 whitespace-nowrap shrink-0 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
