export type PropertyType = 'apartment' | 'villa' | 'plot' | 'commercial';

export type KhataType = 'a_khata' | 'b_khata' | 'e_khata' | 'panchayat' | 'unsure';

export type JurisdictionType = 'bbmp' | 'panchayat';

export type ServiceId = 
  | 'e_khata'
  | 'khata_transfer'
  | 'new_khata'
  | 'encumbrance_certificate'
  | 'bbmp_bescom'
  | 'panchayat_e_khata'
  | 'panchayat_bescom';

export interface ServiceDetail {
  id: ServiceId;
  name: string;
  jurisdiction: JurisdictionType;
  priceFormatted: string;
  priceNumeric: number;
  originalPriceFormatted?: string;
  originalPriceNumeric?: number;
  discountBadge?: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  requiredDocs: string[];
  timelineDays: string;
  startingPrice: string;
  governmentBody: string;
  keyBenefit: string;
  imageUrl?: string;
}

export interface BBMPZone {
  id: string;
  name: string;
  keyLocalities: string[];
  headOffice: string;
  turnaroundAvg: string;
  description: string;
}

export interface ApplicationStatusRecord {
  applicationId: string;
  clientName: string;
  propertyType: string;
  locality: string;
  serviceName: string;
  currentStep: number;
  totalSteps: number;
  statusLabel: string;
  estimatedDeliveryDate: string;
  steps: {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isCurrent: boolean;
  }[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  designation: string;
  locality: string;
  serviceUsed: string;
  quote: string;
  rating: number;
  year: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'e_khata' | 'transfer' | 'general' | 'legal';
}
