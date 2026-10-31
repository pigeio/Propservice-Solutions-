import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST, BBMP_ZONES } from '../data/propServiceData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-400 py-16 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-bold shadow-md shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-2xl font-black tracking-tight text-white">
                    Propservice
                  </span>
                  <span className="text-2xl font-black tracking-tight text-amber-400">
                    Solutions
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 font-medium tracking-wide mt-1">
                  Bengaluru Property Legal & Documentation Agency
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Bengaluru's specialized property documentation, BBMP e-Khata conversion, mutation, and legal scrutiny agency. Providing comprehensive legal assistance across all 8 BBMP municipal zones.
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{COMPANY_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <a href={COMPANY_INFO.phoneHref} className="hover:text-white">
                  {COMPANY_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Documentation Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_LIST.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.name}
                  </a>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {s.priceFormatted}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* BBMP Zones */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Zonal Coverage
            </h4>
            <ul className="space-y-2 text-xs">
              {BBMP_ZONES.map((z) => (
                <li key={z.id}>
                  <a href="#zones" className="hover:text-white transition-colors">
                    {z.name} (BBMP)
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Government Portals & Legal Notice */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Karnataka Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://bbmp.karnataka.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>BBMP Official Portal</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://kaveri.karnataka.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>Kaveri 2.0 Registration</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://bbmptax.karnataka.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>BBMP Property Tax SAS</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://rera.karnataka.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>RERA Karnataka</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Registered property documentation facilitation agency in Bengaluru.
          </div>
          <div className="flex items-center gap-4">
            <span>HSR Layout, Bengaluru</span>
            <span aria-hidden="true">·</span>
            <span>Zero Queue Facilitation</span>
            <span aria-hidden="true">·</span>
            <span>Document Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
