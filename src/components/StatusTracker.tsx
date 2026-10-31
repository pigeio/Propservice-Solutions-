import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { SAMPLE_TRACKING_RECORDS } from '../data/propServiceData';
import { ApplicationStatusRecord } from '../types/propService';

interface StatusTrackerProps {
  onNotify: (msg: string) => void;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ onNotify }) => {
  const [searchId, setSearchId] = useState('DOC-BLR-8492');
  const [activeRecord, setActiveRecord] = useState<ApplicationStatusRecord | null>(
    SAMPLE_TRACKING_RECORDS['DOC-BLR-8492']
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (SAMPLE_TRACKING_RECORDS[query]) {
      setActiveRecord(SAMPLE_TRACKING_RECORDS[query]);
      setErrorMessage('');
      onNotify(`Tracking docket ${query} loaded.`);
    } else {
      setErrorMessage(
        `Application ID "${query}" not found in current active docket queue. Try sample dockets DOC-BLR-8492 or DOC-BLR-4410.`
      );
    }
  };

  const loadSample = (id: string) => {
    setSearchId(id);
    setActiveRecord(SAMPLE_TRACKING_RECORDS[id]);
    setErrorMessage('');
    onNotify(`Viewing live application status for ${id}.`);
  };

  return (
    <section id="status-tracker" className="border-b border-neutral-200/80 bg-white py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Real-Time Municipal Tracking</span>
            <span aria-hidden="true">·</span>
            <span>Client Transparency Portal</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Track Your Property Document Application
          </h2>

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Every file managed by Propservice Solutions is assigned an official tracking docket. Enter your Application ID below to inspect current stage, BBMP officer endorsements, and expected completion date.
          </p>
        </div>

        {/* Search Bar & Sample ID buttons */}
        <div className="mt-10 max-w-2xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Docket ID (e.g., DOC-BLR-8492)"
                className="w-full rounded-md border border-neutral-300 bg-neutral-50 pl-10 pr-4 py-3 text-xs sm:text-sm text-neutral-900 focus:border-neutral-900 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-neutral-950 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 shrink-0"
            >
              Track Docket
            </button>
          </form>

          {/* Quick Sample Links */}
          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Click to test sample dockets:</span>
            <button
              type="button"
              onClick={() => loadSample('DOC-BLR-8492')}
              className="font-mono text-neutral-900 underline hover:opacity-75 dark:text-neutral-100"
            >
              DOC-BLR-8492 (Sobha Varthur e-Khata)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => loadSample('DOC-BLR-4410')}
              className="font-mono text-neutral-900 underline hover:opacity-75 dark:text-neutral-100"
            >
              DOC-BLR-4410 (HSR Villa Transfer)
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Tracking Card Display */}
        {activeRecord && (
          <div className="mt-10 rounded-xl border border-neutral-300/80 bg-[#FAF9F5] p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
            {/* Record Summary Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200/80 pb-6 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">
                    {activeRecord.applicationId}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeRecord.serviceName}</span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-neutral-950 dark:text-white">
                  {activeRecord.propertyType}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                    <span>{activeRecord.locality}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Applicant: {activeRecord.clientName}</span>
                </div>
              </div>

              {/* Status & Delivery Pill */}
              <div className="flex flex-col sm:items-end gap-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{activeRecord.statusLabel}</span>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Estimated Delivery: {activeRecord.estimatedDeliveryDate}</span>
                </div>
              </div>
            </div>

            {/* 4-Stage Progress Timeline */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {activeRecord.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`relative flex flex-col justify-between rounded-lg border p-4 transition-all ${
                      step.isCompleted
                        ? 'border-neutral-950 bg-white shadow-xs dark:border-neutral-600 dark:bg-neutral-900'
                        : step.isCurrent
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs dark:border-amber-500 dark:bg-amber-950/20'
                        : 'border-neutral-200 bg-neutral-100/60 opacity-60 dark:border-neutral-800 dark:bg-neutral-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                          Stage 0{idx + 1}
                        </span>
                        {step.isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        ) : step.isCurrent ? (
                          <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-spin" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-neutral-950 dark:text-white">
                        {step.title}
                      </h4>

                      <p className="mt-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-neutral-200/60 text-[10px] text-neutral-500 dark:border-neutral-800">
                      {step.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
