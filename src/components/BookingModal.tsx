import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, Clock, MapPin } from 'lucide-react';
import { SERVICES_LIST, BBMP_ZONES } from '../data/propServiceData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onNotify: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'e_khata',
  onNotify,
}) => {
  const [selectedService, setSelectedService] = useState(initialServiceId);
  const [selectedZone, setSelectedZone] = useState('south');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10 AM - 1 PM)');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      onNotify('Please enter your name and contact phone number.');
      return;
    }
    setIsSuccess(true);
    onNotify(`Service consultation booked for ${name}! Our team will call to confirm details.`);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setLocality('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-2xl transition-all dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Legal Service</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-neutral-950 dark:text-white">
              Book Documentation Service
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h4 className="text-xl font-bold text-neutral-950 dark:text-white">
              Service Consultation Booked!
            </h4>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto leading-relaxed">
              We have dispatched your consultation booking to our Bengaluru documentation desk. Our property documentation team will call {phone} within 2 hours to confirm your requirements.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-md bg-neutral-950 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Kumar"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Mobile Number (for case manager coordination) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 99054 00269"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                >
                  {SERVICES_LIST.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} – {s.priceFormatted} ({s.jurisdiction === 'bbmp' ? 'BBMP' : 'Panchayat'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  BBMP Zone
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                >
                  {BBMP_ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Property Address / Apartment Name
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Flat 302, Green Glen Layout, Bellandur"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Preferred Consultation Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              >
                <option>Morning (10:00 AM – 1:00 PM)</option>
                <option>Afternoon (2:00 PM – 5:00 PM)</option>
                <option>Evening (5:30 PM – 8:00 PM)</option>
                <option>Weekend Saturday Slot</option>
              </select>
            </div>

            <div className="rounded-md bg-neutral-50 p-3 text-[11px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              No advance payment is required for the initial document audit. Our legal specialist will review your documents and provide an official acknowledgment and quote.
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-neutral-950 py-3 text-center text-xs font-bold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Confirm Service Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
