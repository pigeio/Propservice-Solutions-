import React, { useState } from 'react';
import {
  Maximize2,
  FileCheck2,
  Building,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X,
  MapPin,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  locality: string;
  description: string;
  imageUrl: string;
  fallbackGradient: string;
  docStatus: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'HSR Layout Sector 2 Contemporary Villa',
    category: 'Independent Residential',
    locality: 'South Zone, Bengaluru',
    description: '30x50 G+2 residential structure with verified BBMP A-Khata to digital e-Khata migration, sanctioned building plan, and 30-year clear title search.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-amber-900/40 via-neutral-900 to-black',
    docStatus: 'BBMP Digital e-Khata Issued · PID Verified',
  },
  {
    id: 'gal-2',
    title: 'Whitefield Luxury Gated Apartment Enclave',
    category: 'Apartment Complex',
    locality: 'Mahadevapura Zone, Bengaluru',
    description: 'Multi-tower residential community in Whitefield tech corridor. Complete bulk Kaveri 2.0 digital verification and individual flat mutation records.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-slate-900 via-neutral-900 to-black',
    docStatus: 'Occupancy Certificate (OC) & e-Khata Linked',
  },
  {
    id: 'gal-3',
    title: 'Official BBMP Digital e-Khata Certificate (Kaveri 2.0)',
    category: 'Government Documentation',
    locality: 'All 8 BBMP Zones',
    description: 'Sample certified digital e-Khata with encrypted QR validation code, Property Identification Number (PID), and municipal revenue watermark required for property sale deeds.',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-blue-950 via-neutral-900 to-black',
    docStatus: 'Mandatory Government Format for 2026 Resales',
  },
  {
    id: 'gal-4',
    title: 'Indiranagar Colonial Heritage Residence',
    category: 'Ancestral Title Scrutiny',
    locality: 'East Zone, Bengaluru',
    description: 'Prime central Bengaluru property with 35-year historical title deed chain, release deeds, and municipal property tax arrears clearance.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-emerald-950 via-neutral-900 to-black',
    docStatus: 'Advocate Legal Scrutiny Report (LSR) Certified',
  },
  {
    id: 'gal-5',
    title: 'Electronic City Modern Residential Tower',
    category: 'Gated Tech Corridor',
    locality: 'Bommanahalli Zone, Bengaluru',
    description: 'High-volume residential development adjacent to Electronic City Phase 1. Expedited Khata transfer and Sub-Registrar mutation clearance.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-cyan-950 via-neutral-900 to-black',
    docStatus: '7-Day Turnaround Khata Transfer Completed',
  },
  {
    id: 'gal-6',
    title: 'Sub-Registrar Encumbrance Certificate Archive',
    category: 'Department of Stamps & Registration',
    locality: 'Karnataka Sub-Registrar Offices',
    description: 'Certified 15-year and 30-year Form 15 ledger search proving nil mortgage encumbrance and zero pending civil court attachments.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-amber-950 via-neutral-900 to-black',
    docStatus: 'Form 15 & Form 16 Sub-Registrar Seal',
  },
];

export const PropertyGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filterCategory === 'All' || item.category.includes(filterCategory)
  );

  return (
    <section className="border-b border-neutral-200/80 bg-[#FAF9F5] py-20 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Bengaluru Visual Showcase</span>
              <span aria-hidden="true">·</span>
              <span>Documented Properties & Archives</span>
            </div>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Verified Properties & Official Documentation Archives
            </h2>

            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Explore real-world Bengaluru residential projects, villas, and certified municipal documentation dockets processed by PropService Solutions.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['All', 'Residential', 'Apartment', 'Government'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterCategory === cat
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Image Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer flex flex-col justify-between rounded-xl border border-neutral-300/80 bg-white shadow-xs overflow-hidden transition-all duration-300 hover:border-neutral-500 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              {/* Image Frame with Measured Scrim Overlay as per §1.F */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Safe zero-broken-image fallback container as per §3.E
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Ambient Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Top Corner Category Badge */}
                <div className="absolute top-3 left-3 z-10 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-xs">
                  {item.category}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>{item.locality}</span>
                  </div>
                  <Maximize2 className="h-4 w-4 opacity-75 group-hover:opacity-100" />
                </div>
              </div>

              {/* Text Description Block */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Document Status Tag */}
                <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 dark:border-neutral-800">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.docStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Screen Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-3xl rounded-xl border border-neutral-700 bg-neutral-950 text-white p-6 shadow-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 rounded-md bg-neutral-900 p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-16/9 w-full rounded-lg overflow-hidden bg-neutral-900 mb-5">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-wider font-semibold">
                  <span>{selectedItem.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedItem.locality}</span>
                </div>

                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedItem.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="mt-4 rounded-lg bg-neutral-900 p-3 text-xs text-emerald-400 border border-neutral-800 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{selectedItem.docStatus}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
