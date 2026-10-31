export type WebsiteCategory = 'saas' | 'ecommerce' | 'portfolio' | 'dashboard' | 'editorial';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageFallbackColor: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  deliverables: string[];
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
}

export interface BlueprintConfig {
  siteType: string;
  brandName: string;
  industry: string;
  targetAudience: string;
  primaryGoal: string;
  colorMood: string;
  features: string[];
  pages: string[];
}
