import { CaseStudy, WebsiteCategory } from '../types';

export interface WebsiteDemoMeta {
  id: WebsiteCategory;
  name: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
}

export const WEBSITE_DEMO_CATEGORIES: WebsiteDemoMeta[] = [
  {
    id: 'saas',
    name: 'SaaS & Tech Platform',
    tagline: 'High-conversion subscription software portal',
    description: 'Engineered for conversion with interactive pricing calculators, product feature matrices, and client validation strips.',
    keyFeatures: ['Interactive ROI calculator', 'Annual vs monthly billing switch', 'Feature breakdown tabs', 'Customer validation proof'],
    metrics: [
      { label: 'Avg Conversion', value: '4.8%' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Interactive Latency', value: '<50ms' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    tagline: 'Minimalist luxury catalog with slide-out cart',
    description: 'Refined shopping experience with dynamic category filtering, instant cart management, coupon logic, and checkout flows.',
    keyFeatures: ['Interactive slide-out cart drawer', 'Category & price filtering', 'Real-time total & tax calculator', 'Quick view product inspector'],
    metrics: [
      { label: 'Cart Completion', value: '72%' },
      { label: 'Catalog Size', value: 'Scalable to 10k+' },
      { label: 'Checkout Time', value: '<45 sec' },
    ],
  },
  {
    id: 'portfolio',
    name: 'Design & Architecture Studio',
    tagline: 'Editorial showcase with interactive case studies',
    description: 'High-contrast editorial aesthetics designed to showcase client projects, detailed challenge/solution breakdowns, and lead capture.',
    keyFeatures: ['Interactive case study modal', 'Tag-based project archive', 'Bespoke typography grid', 'Direct client discovery form'],
    metrics: [
      { label: 'Inbound Inquiries', value: '+140%' },
      { label: 'Avg Dwell Time', value: '3m 42s' },
      { label: 'Client Retention', value: '94%' },
    ],
  },
  {
    id: 'dashboard',
    name: 'Analytics & Web App',
    tagline: 'Operational console with interactive data visualization',
    description: 'Clean data workspace featuring dynamic time-range switching, sparkline trendlines, status indicators, and searchable tables.',
    keyFeatures: ['Timeframe toggling (7d / 30d / 90d)', 'Dynamic SVG sparkline generation', 'Filterable data table with search', 'Export simulation'],
    metrics: [
      { label: 'Data Refresh', value: 'Real-time' },
      { label: 'Query Latency', value: '18ms' },
      { label: 'Filter Speed', value: 'Instant' },
    ],
  },
  {
    id: 'editorial',
    name: 'Editorial & Knowledge Hub',
    tagline: 'Distraction-free publishing with reading controls',
    description: 'Long-form editorial publication with dynamic reading progress, font-size adjuster, reading time estimates, and bookmarks.',
    keyFeatures: ['Interactive font size scale', 'Live reading progress indicator', 'Bookmark & save article state', 'Topic navigation index'],
    metrics: [
      { label: 'Reader Completion', value: '88%' },
      { label: 'Contrast Ratio', value: '14.2:1' },
      { label: 'Accessibility', value: 'WCAG AAA' },
    ],
  },
];

export const DEMO_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Vessel No. 04 Stoneware',
    category: 'Ceramics',
    price: 185,
    material: 'Wheel-thrown Japanese clay with matte ash glaze',
    dimensions: '28cm x 16cm',
    colorHex: '#C5B9AC',
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'Acoustic Monolith Speaker',
    category: 'Audio',
    price: 490,
    material: 'Cast anodized aluminum with wool acoustical grille',
    dimensions: '34cm x 12cm',
    colorHex: '#3D4148',
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Oblique Brass Table Lamp',
    category: 'Lighting',
    price: 340,
    material: 'Brushed solid unlacquered brass with opal glass diffuser',
    dimensions: '42cm x 22cm',
    colorHex: '#BFA15F',
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Forma Cantilever Chair',
    category: 'Furniture',
    price: 820,
    material: 'Tubular cold-rolled steel with vegetable-tanned saddle leather',
    dimensions: '78cm x 56cm x 62cm',
    colorHex: '#52453B',
    inStock: false,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Nordic Clean Mobility Interface',
    client: 'Polestar Spatial Labs',
    category: 'Digital Product',
    year: '2026',
    deliverables: ['Design System', 'Next-Gen Cockpit Web App', 'Component Architecture'],
    challenge: 'Transition legacy automotive configuration tooling into an ultra-low-latency real-time web interface without layout shifting across varying vehicle display formats.',
    solution: 'Designed and engineered a modular React component architecture using strict tabular telemetry, SVG vector geometry, and sub-10ms state transitions.',
    metrics: [
      { label: 'Lead Velocity', value: '+84%' },
      { label: 'Configuration Time', value: '-62%' },
      { label: 'Customer CSAT', value: '4.9/5' },
    ],
  },
  {
    id: 'cs-2',
    title: 'Kinetic Archival Publishing Platform',
    client: 'Basel Art Foundation',
    category: 'Editorial & Brand',
    year: '2025',
    deliverables: ['Custom Content Engine', 'High-Res Artwork Inspector', 'Multilingual Typography'],
    challenge: 'Present over 14,000 historical architectural monographs and contemporary art pieces with uncompromising typographic rhythm and zero visual bloat.',
    solution: 'Built an unboxed, whitespace-governed editorial layout pairing Plus Jakarta Sans display typography with custom deep-zoom canvas inspection.',
    metrics: [
      { label: 'Archive Views', value: '2.4M' },
      { label: 'Institutional Grants', value: '$1.8M' },
      { label: 'Avg Session Length', value: '5m 18s' },
    ],
  },
];

export const CAPABILITY_ITEMS = [
  {
    number: '01',
    title: 'Full-Stack Architecture & Frameworks',
    description: 'We build with modern React 19, TypeScript, and Vite on the client, seamlessly connected to Express servers, REST APIs, or background workers.',
    details: ['TypeScript end-to-end', 'Vite lightning fast dev & build', 'Express server proxying', 'Zero runtime bloat'],
  },
  {
    number: '02',
    title: 'Persistent Databases & Authentication',
    description: 'Integrate real relational data with Cloud SQL (PostgreSQL & Drizzle ORM) or document collections with Firebase Firestore & Authentication.',
    details: ['Cloud SQL / PostgreSQL', 'Firebase Firestore & Auth', 'Secure permission rules', 'Live real-time sync'],
  },
  {
    number: '03',
    title: 'Design Systems & Anti-Slop Aesthetics',
    description: 'Tailwind CSS v4 with bespoke typographic hierarchy, domain-native palettes, zero-pill discipline, and smooth compositor animations.',
    details: ['Strict 60-30-10 color budget', 'Accessible WCAG AA standards', 'Motion micro-interactions', 'Flawless light/dark themes'],
  },
  {
    number: '04',
    title: 'Third-Party Services & Integrations',
    description: 'Connect Google Workspace APIs (Calendar, Sheets, Gmail, Drive), Google Maps Platform, OAuth providers, payment flows, and webhooks.',
    details: ['Google Workspace OAuth', 'Interactive Google Maps', 'REST & WebSocket gateways', 'Exportable clean repositories'],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Can you build complete websites from scratch right here?',
    answer: 'Yes! Every file in this project is written directly by me — HTML, React components, Tailwind styling, TypeScript logic, and backend Express routes. You can ask for any kind of website or web application and I will generate and refine it in real time.',
  },
  {
    question: 'What types of websites and web applications can you make?',
    answer: 'Any web experience: SaaS landing pages, multi-page business websites, interactive dashboards, e-commerce storefronts, portfolios, educational tools, scientific calculators, 2D web games, restaurant booking systems, and internal admin tooling.',
  },
  {
    question: 'Can my website have a real database and user accounts?',
    answer: 'Absolutely. We can provision a relational PostgreSQL database via Cloud SQL or set up Firebase Firestore and Firebase Authentication with full security rules and persistent user profiles.',
  },
  {
    question: 'How do I request changes or new features for my site?',
    answer: 'Just type your request naturally in the chat! For example: "Change the hero section to emphasize medical clinics", "Add a customer testimonial carousel", "Implement an appointment booking form", or "Add a shopping cart drawer".',
  },
  {
    question: 'Is the generated code standard and production-ready?',
    answer: 'Yes. It uses clean modern TypeScript, React 19, standard Tailwind CSS, accessible HTML markup, and modular component structures. There are no proprietary lock-ins.',
  },
];
