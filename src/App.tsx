import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesBento } from './components/ServicesBento';
import { PropertyGallery } from './components/PropertyGallery';
import { FeeEstimator } from './components/FeeEstimator';
import { StatusTracker } from './components/StatusTracker';
import { ProcessSection } from './components/ProcessSection';
import { ZoneCoverage } from './components/ZoneCoverage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AIPropertyVisualizer } from './components/AIPropertyVisualizer';
import { Toast } from './components/Toast';
import { ScrollReveal } from './components/ScrollReveal';
import { LiveActivityPulse } from './components/LiveActivityPulse';
import { SnowEffect } from './components/SnowEffect';
import { COMPANY_INFO } from './data/propServiceData';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAIStudioOpen, setIsAIStudioOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('e_khata');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    setIsBookingOpen(true);
  };

  const handleScrollToEstimator = () => {
    const el = document.getElementById('fee-estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F5] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top Bar Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenBookingModal={() => handleOpenBooking()}
        onOpenAIStudio={() => setIsAIStudioOpen(true)}
      />

      {/* Live Bengaluru Municipal Activity Ticker Ribbon & Pulse */}
      <LiveActivityPulse onOpenBookingModal={handleOpenBooking} />

      {/* Main Content Area */}
      <main className="overflow-x-clip">
        {/* Architectural Hero */}
        <ScrollReveal duration={0.7} distance={24} amount={0.02}>
          <HeroSection
            onOpenBookingModal={handleOpenBooking}
            onScrollToEstimator={handleScrollToEstimator}
            onOpenAIStudio={() => setIsAIStudioOpen(true)}
          />
        </ScrollReveal>

        {/* 6 Core Documentation Services with Photographic Cards */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <ServicesBento onOpenBookingModal={handleOpenBooking} />
        </ScrollReveal>

        {/* Visual Real Estate & Municipal Documentation Gallery */}
        <ScrollReveal id="gallery" amount={0.08} duration={0.65}>
          <PropertyGallery />
        </ScrollReveal>

        {/* Interactive Fee & Timeline Estimator */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <FeeEstimator onOpenBookingModal={handleOpenBooking} />
        </ScrollReveal>

        {/* Live Application Status Simulator */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <StatusTracker onNotify={(msg) => setToastMessage(msg)} />
        </ScrollReveal>

        {/* 4-Step Process */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <ProcessSection onOpenBookingModal={() => handleOpenBooking()} />
        </ScrollReveal>

        {/* Bengaluru BBMP 8-Zone Jurisdiction Directory */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <ZoneCoverage onOpenBookingModal={handleOpenBooking} />
        </ScrollReveal>

        {/* Verified Homeowner Reviews */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <TestimonialsSection />
        </ScrollReveal>

        {/* Interactive FAQ Accordion */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <FaqSection />
        </ScrollReveal>

        {/* Contact & Booking Form */}
        <ScrollReveal amount={0.08} duration={0.65}>
          <ContactSection onNotify={(msg) => setToastMessage(msg)} />
        </ScrollReveal>
      </main>

      {/* Official Footer */}
      <ScrollReveal amount={0.05} duration={0.6} distance={20}>
        <Footer />
      </ScrollReveal>

      {/* Interactive Booking / Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={selectedServiceForBooking}
        onNotify={(msg) => setToastMessage(msg)}
      />

      {/* AI Property Document & e-Khata Advisor Modal */}
      <AIPropertyVisualizer
        isOpen={isAIStudioOpen}
        onClose={() => setIsAIStudioOpen(false)}
        onNotify={(msg) => setToastMessage(msg)}
        onOpenBookingModal={handleOpenBooking}
      />

      {/* Floating Quick Action Widget for Mobile / Desktop */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <a
          href={COMPANY_INFO.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition-transform hover:scale-105 hover:bg-emerald-700"
        >
          <MessageSquare className="h-5 w-5" />
        </a>

        <button
          type="button"
          onClick={() => setIsAIStudioOpen(true)}
          aria-label="Open AI Property Document Advisor"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-amber-400 shadow-xl border border-neutral-700 transition-transform hover:scale-105 hover:bg-neutral-800"
        >
          <Sparkles className="h-5 w-5" />
        </button>

        <a
          href={COMPANY_INFO.phoneHref}
          aria-label="Call Direct Helpline"
          className="hidden sm:flex items-center gap-2 rounded-full border border-neutral-300 bg-white/95 px-4 py-2.5 text-xs font-bold text-neutral-900 shadow-xl backdrop-blur-md transition-transform hover:scale-105 hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/95 dark:text-white"
        >
          <Phone className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
          <span>{COMPANY_INFO.phoneFormatted}</span>
        </a>
      </div>

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Festive Holiday Falling Snow Effect */}
      <SnowEffect />
    </div>
  );
}
