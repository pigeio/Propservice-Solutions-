import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST, BBMP_ZONES } from '../data/propServiceData';
import { AuroraGlow } from './AuroraGlow';

interface ContactSectionProps {
  onNotify: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'e_khata',
    zone: 'south',
    locality: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      onNotify('Please provide your name and phone number.');
      return;
    }
    setFormSubmitted(true);
    onNotify('Consultation request received! Our documentation manager will call you within 2 hours.');
  };

  return (
    <section id="contact" className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAF9F5] py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      {/* Ambient Aurora Glow */}
      <AuroraGlow variant="section" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Details & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <span>Corporate Office & Helpdesk</span>
                <span aria-hidden="true">·</span>
                <span>Bengaluru Headquarters</span>
              </div>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Contact <span className="text-amber-600 dark:text-amber-400">Propservice Solutions</span>
              </h2>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Visit our consultation office in HSR Layout Sector 2 or connect with our verified property legal experts anywhere across Greater Bengaluru.
              </p>
            </div>

            {/* Direct Information Blocks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <MapPin className="h-5 w-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500">Physical Office</div>
                  <div className="text-sm font-bold text-neutral-950 dark:text-white mt-0.5">
                    {COMPANY_INFO.officeAddress}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Landmark: Near Sector 2 Park, HSR Layout
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <Phone className="h-5 w-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500">Helpline & WhatsApp</div>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="text-sm font-bold text-neutral-950 dark:text-white hover:underline mt-0.5 block"
                  >
                    {COMPANY_INFO.phoneFormatted}
                  </a>
                  <div className="text-xs text-neutral-500 mt-1">
                    Direct line to Senior Property Documentation Managers
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <Mail className="h-5 w-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500">Official Correspondence</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-bold text-neutral-950 dark:text-white hover:underline mt-0.5 block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <div className="text-xs text-neutral-500 mt-1">
                    Send scanned title deeds for free legal pre-check
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <Clock className="h-5 w-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500">Operational Hours</div>
                  <div className="text-sm font-bold text-neutral-950 dark:text-white mt-0.5">
                    {COMPANY_INFO.operatingHours}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Field executives available for evening & weekend home visits
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-emerald-800 shadow-xs"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat Instantly on WhatsApp (+91 99054 00269)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Consultation Booking Form */}
          <div className="lg:col-span-7 rounded-xl border border-neutral-300/80 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              Schedule a Legal Consultation
            </h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Provide your property details and contact number. We will assign a jurisdictional documentation specialist to your file.
            </p>

            {formSubmitted ? (
              <div className="mt-8 rounded-lg bg-emerald-50 p-6 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Consultation Request Registered!</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Thank you, {formData.name}. Our Bangalore Documentation Desk has logged your request for {formData.service}. A senior specialist will call you at {formData.phone} shortly to schedule document verification.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      service: 'e_khata',
                      zone: 'south',
                      locality: '',
                      notes: '',
                    });
                  }}
                  className="mt-2 text-xs font-semibold underline"
                >
                  Submit Another Property Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Hegde"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 99054 00269"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Documentation Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                    >
                      {SERVICES_LIST.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} – {s.priceFormatted} ({s.jurisdiction === 'bbmp' ? 'BBMP' : 'Panchayat'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      BBMP Zone
                    </label>
                    <select
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                    >
                      {BBMP_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Property Locality / Apartment Name
                    </label>
                    <input
                      type="text"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g. HSR Layout Sector 2 or Sobha Jasmine"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Specific Requirement or Query
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Describe your property (e.g. Need mandatory digital e-Khata for upcoming flat sale in Whitefield, have existing physical A-Khata)..."
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-neutral-950 py-3 text-center text-xs font-bold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center justify-center gap-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Service Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
