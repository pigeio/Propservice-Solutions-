import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  Search,
  Download,
  Bookmark,
  Share2,
  Sliders,
  DollarSign,
  Clock,
  Sparkles,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  WEBSITE_DEMO_CATEGORIES,
  DEMO_PRODUCTS,
  CASE_STUDIES,
} from '../data/websiteTypes';
import { CartItem, CaseStudy, ViewportMode, WebsiteCategory } from '../types';

interface InteractiveDemosProps {
  onNotify: (message: string) => void;
  onOpenBuilderForCategory: (category: string) => void;
}

export const InteractiveDemos: React.FC<InteractiveDemosProps> = ({
  onNotify,
  onOpenBuilderForCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<WebsiteCategory>('saas');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  // SaaS Demo State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [teamSeats, setTeamSeats] = useState<number>(8);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'automation' | 'governance' | 'analytics'>('automation');

  // E-Commerce Demo State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'prod-1',
      name: 'Vessel No. 04 Stoneware',
      price: 185,
      quantity: 1,
      imageFallbackColor: '#C5B9AC',
      category: 'Ceramics',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('All');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof DEMO_PRODUCTS[0] | null>(null);

  // Portfolio Demo State
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryBudget, setInquiryBudget] = useState('$15k - $30k');

  // Dashboard Demo State
  const [dashboardTimeframe, setDashboardTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [tableSearch, setTableSearch] = useState('');
  const [tableFilterStatus, setTableFilterStatus] = useState<string>('All');

  // Editorial Demo State
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Cart operations
  const addToCart = (product: typeof DEMO_PRODUCTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageFallbackColor: product.colorHex,
          category: product.category,
        },
      ];
    });
    setIsCartOpen(true);
    onNotify(`Added ${product.name} to shopping bag.`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    onNotify('Item removed from shopping bag.');
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'STUDIO20') {
      setDiscountPercent(20);
      onNotify('Coupon applied: 20% discount granted!');
    } else {
      onNotify('Invalid coupon code. Try entering "STUDIO20".');
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartDiscount = (cartSubtotal * discountPercent) / 100;
  const cartTotal = cartSubtotal - cartDiscount;

  // Active Category Meta
  const currentCategoryMeta = WEBSITE_DEMO_CATEGORIES.find((c) => c.id === activeCategory)!;

  // Dashboard calculations
  const dashboardData = {
    '7d': {
      revenue: '$14,820',
      users: '3,410',
      conversion: '4.9%',
      sparkline: [20, 35, 25, 45, 60, 55, 80],
    },
    '30d': {
      revenue: '$62,450',
      users: '14,280',
      conversion: '5.2%',
      sparkline: [30, 42, 38, 55, 68, 74, 92],
    },
    '90d': {
      revenue: '$189,200',
      users: '48,150',
      conversion: '5.4%',
      sparkline: [25, 40, 50, 62, 70, 85, 98],
    },
  }[dashboardTimeframe];

  const transactions = [
    { id: 'TX-9021', customer: 'Acme Robotics', plan: 'Enterprise Annual', amount: '$4,800', status: 'Completed', date: 'Oct 30, 2026' },
    { id: 'TX-9022', customer: 'Vektor Design', plan: 'Team Pro', amount: '$490', status: 'Completed', date: 'Oct 29, 2026' },
    { id: 'TX-9023', customer: 'Helix Bio', plan: 'Developer Suite', amount: '$1,200', status: 'Processing', date: 'Oct 29, 2026' },
    { id: 'TX-9024', customer: 'Stellar Mobility', plan: 'Enterprise Annual', amount: '$9,600', status: 'Completed', date: 'Oct 28, 2026' },
    { id: 'TX-9025', customer: 'Urbanist Media', plan: 'Single Seat', amount: '$120', status: 'Refunded', date: 'Oct 27, 2026' },
  ].filter((t) => {
    const matchesSearch = t.customer.toLowerCase().includes(tableSearch.toLowerCase()) || t.id.toLowerCase().includes(tableSearch.toLowerCase());
    const matchesFilter = tableFilterStatus === 'All' || t.status === tableFilterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="interactive-demos" className="border-b border-neutral-200 bg-neutral-100/60 py-16 transition-colors dark:border-neutral-800 dark:bg-neutral-900/40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Live Functional Sandbox</span>
              <span aria-hidden="true">·</span>
              <span>Architecture Exploration</span>
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Interact with 5 Live Website Archetypes
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl text-sm sm:text-base">
              Test real state logic, cart systems, calculators, and responsive viewport behaviors. Every archetype is engineered with production clean code standards.
            </p>
          </div>

          {/* Viewport Simulation Controls */}
          <div className="flex items-center gap-1 rounded-lg border border-neutral-300 bg-white p-1 shadow-xs dark:border-neutral-700 dark:bg-neutral-950 shrink-0">
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop (1440px)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('tablet')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewportMode === 'tablet'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
              <span>Tablet (768px)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile (375px)</span>
            </button>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800">
          {WEBSITE_DEMO_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs dark:bg-white dark:text-neutral-950'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Demo Description & Quick Specs Strip */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900 dark:text-white">{currentCategoryMeta.name}:</span>
            <span>{currentCategoryMeta.tagline}</span>
          </div>

          <div className="flex items-center gap-4">
            {currentCategoryMeta.metrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-neutral-500">{m.label}:</span>
                <span className="font-semibold tabular-nums text-neutral-900 dark:text-white">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Viewport Frame Container */}
        <div className="mt-6 flex justify-center">
          <div
            className={`w-full transition-all duration-300 rounded-xl border border-neutral-300 bg-white shadow-xl overflow-hidden dark:border-neutral-800 dark:bg-neutral-950 ${
              viewportMode === 'mobile'
                ? 'max-w-[400px] border-8 border-neutral-800 dark:border-neutral-700'
                : viewportMode === 'tablet'
                ? 'max-w-[800px] border-4 border-neutral-700 dark:border-neutral-600'
                : 'max-w-full'
            }`}
          >
            {/* Simulated Browser Bar */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-2 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <div className="rounded-md bg-white px-3 py-1 text-center font-mono text-[11px] text-neutral-700 shadow-xs dark:bg-neutral-950 dark:text-neutral-300">
                https://craftstudio.engine/demos/{activeCategory}
              </div>
              <button
                type="button"
                onClick={() => onOpenBuilderForCategory(activeCategory)}
                className="text-[11px] font-medium text-neutral-900 hover:underline dark:text-white flex items-center gap-1"
              >
                <span>Customize this site</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>

            {/* LIVE DEMO CONTENT AREA */}
            <div className="min-h-[540px] p-6 lg:p-8">
              {/* ==================== 1. SAAS DEMO ==================== */}
              {activeCategory === 'saas' && (
                <div className="space-y-10">
                  {/* SaaS Mini Header */}
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                    <div className="font-bold tracking-tight text-neutral-900 dark:text-white">
                      Synapse Automation Platform
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onNotify('Trial invitation sent! Check email preview.')}
                        className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
                      >
                        Start 14-Day Trial
                      </button>
                    </div>
                  </div>

                  {/* SaaS Hero & Interactive Calculator */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Intelligent Data Pipelines
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                        Automate cross-cloud operations with sub-second synchronization.
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        Deploy micro-pipelines across Postgres, Snowflake, and BigQuery without managing fragile ETL scripts. Built with resilient dead-letter retries.
                      </p>

                      {/* Feature Tabs */}
                      <div className="pt-2">
                        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
                          <button
                            type="button"
                            onClick={() => setActiveFeatureTab('automation')}
                            className={`pb-2 text-xs font-semibold transition-colors mr-6 ${
                              activeFeatureTab === 'automation'
                                ? 'border-b-2 border-neutral-900 text-neutral-950 dark:border-white dark:text-white'
                                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                            }`}
                          >
                            Autonomous Routing
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveFeatureTab('governance')}
                            className={`pb-2 text-xs font-semibold transition-colors mr-6 ${
                              activeFeatureTab === 'governance'
                                ? 'border-b-2 border-neutral-900 text-neutral-950 dark:border-white dark:text-white'
                                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                            }`}
                          >
                            SOC2 Compliance
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveFeatureTab('analytics')}
                            className={`pb-2 text-xs font-semibold transition-colors ${
                              activeFeatureTab === 'analytics'
                                ? 'border-b-2 border-neutral-900 text-neutral-950 dark:border-white dark:text-white'
                                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                            }`}
                          >
                            Real-Time Latency
                          </button>
                        </div>

                        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
                          {activeFeatureTab === 'automation' && (
                            <p>
                              Dynamic event triggering executes data validation handlers within 12 milliseconds of origin commit. Failures automatically branch into isolated verification pods.
                            </p>
                          )}
                          {activeFeatureTab === 'governance' && (
                            <p>
                              End-to-end zero-knowledge encryption ensures secrets never leave your sovereign VPC. Automatic cryptographic audit proofs generated hourly.
                            </p>
                          )}
                          {activeFeatureTab === 'analytics' && (
                            <p>
                              Live throughput graphs stream memory utilization and network I/O per pod directly into OpenTelemetry collectors.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Pricing & ROI Calculator Card */}
                    <div className="lg:col-span-5 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          Interactive Pricing & ROI
                        </span>
                        {/* Billing Switcher */}
                        <div className="flex items-center gap-1 rounded-md bg-neutral-200/70 p-0.5 text-xs dark:bg-neutral-800">
                          <button
                            type="button"
                            onClick={() => setBillingCycle('monthly')}
                            className={`rounded px-2 py-1 font-medium transition-colors ${
                              billingCycle === 'monthly'
                                ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-700 dark:text-white'
                                : 'text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            type="button"
                            onClick={() => setBillingCycle('annual')}
                            className={`rounded px-2 py-1 font-medium transition-colors ${
                              billingCycle === 'annual'
                                ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-700 dark:text-white'
                                : 'text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            Annual (-20%)
                          </button>
                        </div>
                      </div>

                      {/* Seat Slider */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                          <span>Active Engineering Seats:</span>
                          <span className="font-bold tabular-nums text-neutral-950 dark:text-white">
                            {teamSeats} Engineers
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="40"
                          value={teamSeats}
                          onChange={(e) => setTeamSeats(Number(e.target.value))}
                          className="mt-2 w-full accent-neutral-900 dark:accent-white"
                        />
                      </div>

                      {/* Calculated Pricing Metrics */}
                      <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                        <div className="text-3xl font-bold tabular-nums text-neutral-950 dark:text-white">
                          ${(billingCycle === 'annual' ? 39 : 49) * teamSeats}
                          <span className="text-xs font-normal text-neutral-500"> / month</span>
                        </div>
                        <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                          {billingCycle === 'annual' ? 'Billed annually · Save $240/yr per seat' : 'Flexible monthly billing · Cancel anytime'}
                        </div>

                        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <span className="font-semibold">Estimated ROI:</span> Saves ~{teamSeats * 14} engineering hours/mo (${teamSeats * 1150} monthly value)
                        </div>

                        <button
                          type="button"
                          onClick={() => onNotify(`Simulated checkout for ${teamSeats} seats (${billingCycle}) initialized!`)}
                          className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                        >
                          Deploy Cluster Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 2. E-COMMERCE DEMO ==================== */}
              {activeCategory === 'ecommerce' && (
                <div className="space-y-8">
                  {/* Store Header */}
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                    <div className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                      ATELIER OBJECTS
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Category filters */}
                      <div className="hidden sm:flex items-center gap-1">
                        {['All', 'Ceramics', 'Audio', 'Lighting', 'Furniture'].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedProductCategory(cat)}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                              selectedProductCategory === cat
                                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Cart Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="relative flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DEMO_PRODUCTS.filter(
                      (p) => selectedProductCategory === 'All' || p.category === selectedProductCategory
                    ).map((product) => (
                      <div
                        key={product.id}
                        className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900"
                      >
                        {/* Visual Asset / Styled Fallback Frame */}
                        <div
                          className="relative aspect-4/3 w-full rounded-lg overflow-hidden flex items-center justify-center text-xs font-medium text-neutral-600 shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${product.colorHex}25 0%, ${product.colorHex}60 100%)`,
                          }}
                        >
                          <div className="text-center p-3">
                            <div className="font-semibold text-neutral-800 dark:text-neutral-200">{product.name}</div>
                            <div className="text-[11px] opacity-75">{product.category}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col flex-grow justify-between">
                          <div>
                            <div className="flex items-baseline justify-between">
                              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                                {product.name}
                              </h4>
                              <span className="text-sm font-bold tabular-nums text-neutral-950 dark:text-white">
                                ${product.price}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-neutral-500 line-clamp-2 dark:text-neutral-400">
                              {product.material}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(product)}
                              className="w-1/2 rounded-md border border-neutral-300 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              className="w-1/2 rounded-md bg-neutral-900 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slide-out Cart Drawer Overlay */}
                  {isCartOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/40 backdrop-blur-xs">
                      <div className="w-full max-w-md bg-white p-6 shadow-2xl transition-all dark:bg-neutral-950 dark:border-l dark:border-neutral-800 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                              <ShoppingBag className="h-4 w-4" />
                              <span>Your Order Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsCartOpen(false)}
                              className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Cart items */}
                          <div className="mt-4 max-h-[320px] overflow-y-auto space-y-3">
                            {cart.length === 0 ? (
                              <div className="py-12 text-center text-sm text-neutral-500">
                                Your shopping bag is currently empty.
                              </div>
                            ) : (
                              cart.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="h-10 w-10 rounded-md shrink-0 flex items-center justify-center text-[10px] font-bold"
                                      style={{ backgroundColor: `${item.imageFallbackColor}30` }}
                                    >
                                      {item.category[0]}
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                                        {item.name}
                                      </div>
                                      <div className="text-xs tabular-nums text-neutral-500">
                                        ${item.price} each
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center rounded border border-neutral-200 dark:border-neutral-800">
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="px-2 text-xs font-medium tabular-nums">{item.quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </button>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      className="p-1 text-neutral-400 hover:text-red-500"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Order Summary & Coupon */}
                        <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                          <form onSubmit={applyCoupon} className="mb-4 flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="Discount code (try STUDIO20)"
                              className="flex-grow rounded-md border border-neutral-300 px-3 py-1.5 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                            />
                            <button
                              type="submit"
                              className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                            >
                              Apply
                            </button>
                          </form>

                          <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-medium tabular-nums text-neutral-900 dark:text-white">
                                ${cartSubtotal.toFixed(2)}
                              </span>
                            </div>
                            {discountPercent > 0 && (
                              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                                <span>Discount ({discountPercent}%)</span>
                                <span className="font-medium tabular-nums">-${cartDiscount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between border-t border-neutral-200 pt-2 font-bold text-sm text-neutral-950 dark:border-neutral-800 dark:text-white">
                              <span>Total Due</span>
                              <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={cart.length === 0}
                            onClick={() => {
                              onNotify('Mock Stripe Checkout complete! Order confirmation created.');
                              setCart([]);
                              setIsCartOpen(false);
                            }}
                            className="mt-4 w-full rounded-lg bg-neutral-900 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950"
                          >
                            Proceed to Secure Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick View Modal */}
                  {quickViewProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4 backdrop-blur-xs">
                      <div className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-neutral-500">
                              {quickViewProduct.category}
                            </span>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                              {quickViewProduct.name}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(null)}
                            className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-4 space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
                          <div>
                            <span className="font-semibold text-neutral-900 dark:text-white">Material & Craft: </span>
                            {quickViewProduct.material}
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-900 dark:text-white">Dimensions: </span>
                            {quickViewProduct.dimensions}
                          </div>
                          <div className="text-base font-bold tabular-nums text-neutral-950 dark:text-white pt-2">
                            ${quickViewProduct.price} USD
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(quickViewProduct);
                              setQuickViewProduct(null);
                            }}
                            className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== 3. PORTFOLIO & STUDIO DEMO ==================== */}
              {activeCategory === 'portfolio' && (
                <div className="space-y-8">
                  {/* Studio Header */}
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                    <div>
                      <div className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
                        Vektor Spatial Design Studio
                      </div>
                      <div className="text-xs text-neutral-500">
                        Copenhagen · Zurich · Architecture & Digital Product
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNotify('Discovery form scroll triggered')}
                      className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                    >
                      Inquire on Project
                    </button>
                  </div>

                  {/* Curated Case Study Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CASE_STUDIES.map((cs) => (
                      <div
                        key={cs.id}
                        className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/40"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                            <span>{cs.client}</span>
                            <span>{cs.year}</span>
                          </div>
                          <h4 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            {cs.title}
                          </h4>
                          <p className="mt-3 text-xs leading-relaxed text-neutral-600 line-clamp-3 dark:text-neutral-300">
                            {cs.challenge}
                          </p>

                          {/* Quantified Metrics Proof */}
                          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                            {cs.metrics.map((m, idx) => (
                              <div key={idx}>
                                <div className="text-sm font-bold tabular-nums text-neutral-900 dark:text-white">
                                  {m.value}
                                </div>
                                <div className="text-[10px] text-neutral-500">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudy(cs)}
                            className="w-full rounded-md border border-neutral-300 py-2 text-center text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                          >
                            Examine Architectural Case Study
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Discovery Form */}
                  <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                      Start a Design Commission
                    </h4>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      We accept 4 strategic brand or software commissions per quarter.
                    </p>

                    {inquirySubmitted ? (
                      <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Commission inquiry received. Our partners will reach out within 24 business hours.</span>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setInquirySubmitted(true);
                          onNotify('Commission proposal submitted successfully!');
                        }}
                        className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <input
                          type="text"
                          required
                          placeholder="Your Name & Studio"
                          className="rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                        />
                        <select
                          value={inquiryBudget}
                          onChange={(e) => setInquiryBudget(e.target.value)}
                          className="rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                        >
                          <option>$10k - $25k</option>
                          <option>$25k - $50k</option>
                          <option>$50k+</option>
                        </select>
                        <button
                          type="submit"
                          className="rounded-md bg-neutral-900 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                        >
                          Submit Commission Inquiry
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Case Study Inspector Modal */}
                  {selectedCaseStudy && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4 backdrop-blur-xs">
                      <div className="w-full max-w-2xl rounded-xl border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-neutral-500">
                              {selectedCaseStudy.client} · {selectedCaseStudy.year}
                            </span>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                              {selectedCaseStudy.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudy(null)}
                            className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-6 space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          <div>
                            <h5 className="font-semibold text-neutral-950 dark:text-white">Core Challenge:</h5>
                            <p className="mt-1">{selectedCaseStudy.challenge}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-neutral-950 dark:text-white">Engineered Solution:</h5>
                            <p className="mt-1">{selectedCaseStudy.solution}</p>
                          </div>

                          <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                            <h5 className="font-semibold text-neutral-950 dark:text-white mb-2">Deliverables:</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedCaseStudy.deliverables.map((deliv, idx) => (
                                <span
                                  key={idx}
                                  className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                                >
                                  {deliv}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8">
                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudy(null)}
                            className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950"
                          >
                            Close Case Study
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== 4. ANALYTICS & DASHBOARD DEMO ==================== */}
              {activeCategory === 'dashboard' && (
                <div className="space-y-6">
                  {/* Dashboard Top bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                    <div>
                      <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                        Operational Telemetry & Inbound Orders
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Real-time query performance with instantaneous cache invalidation
                      </p>
                    </div>

                    {/* Timeframe selector tabs */}
                    <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1 text-xs dark:bg-neutral-900">
                      {(['7d', '30d', '90d'] as const).map((tf) => (
                        <button
                          key={tf}
                          type="button"
                          onClick={() => setDashboardTimeframe(tf)}
                          className={`rounded px-2.5 py-1 font-medium transition-colors ${
                            dashboardTimeframe === tf
                              ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white'
                              : 'text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {tf.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Metric Cards with dynamic sparklines */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="text-xs text-neutral-500">Gross Processed Volume</div>
                      <div className="mt-1 text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
                        {dashboardData.revenue}
                      </div>
                      {/* SVG Sparkline */}
                      <svg className="mt-3 h-8 w-full overflow-visible" viewBox="0 0 100 30">
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-neutral-900 dark:text-white"
                          points={dashboardData.sparkline
                            .map((val, idx) => `${idx * 16.6},${30 - (val / 100) * 26}`)
                            .join(' ')}
                        />
                      </svg>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="text-xs text-neutral-500">Active Monthly Users</div>
                      <div className="mt-1 text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
                        {dashboardData.users}
                      </div>
                      <svg className="mt-3 h-8 w-full overflow-visible" viewBox="0 0 100 30">
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-neutral-900 dark:text-white"
                          points={dashboardData.sparkline
                            .slice()
                            .reverse()
                            .map((val, idx) => `${idx * 16.6},${30 - (val / 100) * 26}`)
                            .join(' ')}
                        />
                      </svg>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="text-xs text-neutral-500">Checkout Conversion</div>
                      <div className="mt-1 text-2xl font-bold tabular-nums text-neutral-950 dark:text-white">
                        {dashboardData.conversion}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                        <span>+0.4% above historical cohort</span>
                      </div>
                    </div>
                  </div>

                  {/* Filterable Table */}
                  <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800">
                      <div className="relative flex-grow max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          type="text"
                          value={tableSearch}
                          onChange={(e) => setTableSearch(e.target.value)}
                          placeholder="Search transactions..."
                          className="w-full rounded-md border border-neutral-300 pl-8 pr-3 py-1.5 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={tableFilterStatus}
                          onChange={(e) => setTableFilterStatus(e.target.value)}
                          className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                        >
                          <option value="All">All Statuses</option>
                          <option value="Completed">Completed</option>
                          <option value="Processing">Processing</option>
                          <option value="Refunded">Refunded</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => onNotify('Exported 5 records to CSV!')}
                          className="flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Export</span>
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800">
                          <tr>
                            <th className="py-2.5 px-4 font-semibold">Reference</th>
                            <th className="py-2.5 px-4 font-semibold">Customer</th>
                            <th className="py-2.5 px-4 font-semibold">Plan</th>
                            <th className="py-2.5 px-4 font-semibold">Amount</th>
                            <th className="py-2.5 px-4 font-semibold">Status</th>
                            <th className="py-2.5 px-4 font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                              <td className="py-2.5 px-4 font-mono">{tx.id}</td>
                              <td className="py-2.5 px-4 font-medium text-neutral-900 dark:text-white">{tx.customer}</td>
                              <td className="py-2.5 px-4 text-neutral-600 dark:text-neutral-300">{tx.plan}</td>
                              <td className="py-2.5 px-4 font-bold tabular-nums text-neutral-900 dark:text-white">{tx.amount}</td>
                              <td className="py-2.5 px-4">
                                <span
                                  className={`inline-flex items-center gap-1 font-medium ${
                                    tx.status === 'Completed'
                                      ? 'text-emerald-600 dark:text-emerald-400'
                                      : tx.status === 'Processing'
                                      ? 'text-amber-600 dark:text-amber-400'
                                      : 'text-neutral-500'
                                  }`}
                                >
                                  {tx.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-neutral-500">{tx.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 5. EDITORIAL & PUBLICATION DEMO ==================== */}
              {activeCategory === 'editorial' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Article Controls Top Bar */}
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span>Architectural Dispatch</span>
                      <span aria-hidden="true">·</span>
                      <span>Issue 142</span>
                      <span aria-hidden="true">·</span>
                      <span>5 min read</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Font size toggle */}
                      <div className="flex items-center gap-1 rounded bg-neutral-100 p-0.5 text-xs dark:bg-neutral-900">
                        <button
                          type="button"
                          onClick={() => setFontSize('sm')}
                          className={`px-2 py-0.5 rounded font-medium ${
                            fontSize === 'sm' ? 'bg-white shadow-xs text-neutral-950 dark:bg-neutral-800 dark:text-white' : 'text-neutral-500'
                          }`}
                        >
                          A
                        </button>
                        <button
                          type="button"
                          onClick={() => setFontSize('md')}
                          className={`px-2 py-0.5 rounded font-medium ${
                            fontSize === 'md' ? 'bg-white shadow-xs text-neutral-950 dark:bg-neutral-800 dark:text-white' : 'text-neutral-500'
                          }`}
                        >
                          A+
                        </button>
                        <button
                          type="button"
                          onClick={() => setFontSize('lg')}
                          className={`px-2 py-0.5 rounded font-medium ${
                            fontSize === 'lg' ? 'bg-white shadow-xs text-neutral-950 dark:bg-neutral-800 dark:text-white' : 'text-neutral-500'
                          }`}
                        >
                          A++
                        </button>
                      </div>

                      {/* Bookmark button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsBookmarked(!isBookmarked);
                          onNotify(isBookmarked ? 'Removed from saved reading list.' : 'Saved to reading list!');
                        }}
                        className={`rounded p-1.5 transition-colors ${
                          isBookmarked
                            ? 'text-neutral-900 bg-neutral-100 dark:text-white dark:bg-neutral-800'
                            : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                        aria-label="Bookmark article"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white" style={{ textWrap: 'balance' }}>
                      The Discipline of Quiet Interfaces: Why Restraint Beats Noise
                    </h3>

                    <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                      <span>By Clara Lindqvist, Lead Systems Architect</span>
                      <span aria-hidden="true">·</span>
                      <span>Published October 2026</span>
                    </div>

                    <div
                      className={`mt-6 space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed ${
                        fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base'
                      }`}
                    >
                      <p>
                        When web applications prioritize ornamental gradients and mechanical clutter over typographic hierarchy, users suffer cognitive friction. True design craftsmanship lives in the spatial rhythm between elements: generous whitespace, high-contrast readable type, and deliberate zero-pill discipline.
                      </p>
                      <p>
                        A user should never have to guess what a button does or decipher roleplay jargon. By pairing Plus Jakarta Sans display typography with responsive layouts, we build digital environments that communicate confidence and operational utility.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
