import React from 'react';
import { ArrowRight, Layout, Database, Layers, Smartphone } from 'lucide-react';

interface HeroProps {
  onScrollToDemos: () => void;
  onOpenBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToDemos,
  onOpenBuilder,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-16 lg:py-24 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Editorial Kicker & Natural Headline */}
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Engineering & Design Engine</span>
            <span aria-hidden="true">·</span>
            <span>Web Applications</span>
            <span aria-hidden="true">·</span>
            <span>Production Ready</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
            Yes, we build complete production-grade websites and web applications.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed dark:text-neutral-300">
            From high-conversion SaaS landing pages and curated e-commerce stores to data-rich dashboards and responsive client portals. Every line of React, TypeScript, and Tailwind code is authored cleanly and running live right now.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onScrollToDemos}
              className="flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              <span>Test Interactive Website Demos</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onOpenBuilder}
              className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <span>Generate Website Blueprint</span>
            </button>
          </div>
        </div>

        {/* Full-width 4-Column Proof & Architecture Strip */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
              <Layout className="h-4 w-4 text-neutral-500" />
              <span className="text-sm">Modern Component Stack</span>
            </div>
            <div className="text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
              React 19 & Tailwind
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Clean modular hooks, strict TypeScript interfaces, and zero-pill typography.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
              <Database className="h-4 w-4 text-neutral-500" />
              <span className="text-sm">Real Persistent Storage</span>
            </div>
            <div className="text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
              Cloud SQL & Firebase
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Relational PostgreSQL schemas or document databases with role-based auth.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
              <Layers className="h-4 w-4 text-neutral-500" />
              <span className="text-sm">Live Speed & Latency</span>
            </div>
            <div className="text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
              &lt; 50ms State Transitions
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Compositor-only hardware-accelerated micro-interactions and instant routing.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
              <Smartphone className="h-4 w-4 text-neutral-500" />
              <span className="text-sm">Adaptive Viewports</span>
            </div>
            <div className="text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
              100% Mobile Ready
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Responsive layouts verified on 375px mobile, 768px tablet, and 1440px desktop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
