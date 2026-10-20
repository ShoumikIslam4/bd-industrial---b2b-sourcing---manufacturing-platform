export type UserRole = 'superadmin' | 'admin' | 'supplier' | 'buyer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName: string;
  phone: string;
  location: string;
  status: 'active' | 'pending' | 'suspended';
  avatarUrl?: string;
  password?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  userId: string;
  companyName: string;
  slug: string;
  businessType: 'Manufacturer' | 'Wholesaler' | 'Exporter' | 'Industrial Supplier';
  factoryLocation: string;
  industrialZone: string;
  establishedYear: number;
  employeeCount: number;
  certifications: string[];
  capabilities: string[];
  factoryPhotos: string[];
  verified: boolean;
  verificationExpiresAt: string;
  tradeLicenseNumber: string;
  tinNumber: string;
  binNumber: string;
  rating: number;
  responseRate: string;
  completedOrdersCount: number;
  minOrderAmountBDT: number;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  about: string;
}

export interface PricingTier {
  minQty: number;
  maxQty?: number;
  unitPriceBDT: number;
}

export interface CustomizationOption {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierVerified: boolean;
  title: string;
  slug: string;
  category: 'garments' | 'textiles' | 'packaging' | 'jute' | 'plastic' | 'machinery' | 'leather' | 'construction';
  subCategory: string;
  description: string;
  images: string[];
  sku: string;
  moq: number;
  moqUnit: string;
  pricingTiers: PricingTier[];
  specifications: Record<string, string>;
  customizationOptions: CustomizationOption[];
  leadTimeDays: number;
  sampleAvailable: boolean;
  samplePriceBDT: number;
  stockStatus: 'made_to_order' | 'in_stock' | 'low_stock';
  featured: boolean;
  popular: boolean;
  createdAt: string;
}

export interface RFQ {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCompany: string;
  title: string;
  category: string;
  targetQuantity: number;
  targetUnit: string;
  targetBudgetBDT?: number;
  specifications: Record<string, string>;
  customRequirements: string;
  attachments: string[];
  deliveryDistrict: string;
  deadlineDate: string;
  status: 'open' | 'quotes_received' | 'assigned' | 'in_production' | 'completed' | 'cancelled';
  assignedSupplierId?: string;
  quotesCount: number;
  createdAt: string;
}

export interface Quotation {
  id: string;
  rfqId: string;
  rfqTitle: string;
  supplierId: string;
  supplierName: string;
  supplierEmail: string;
  buyerId: string;
  unitPriceBDT: number;
  totalAmountBDT: number;
  moqOffered: number;
  leadTimeDays: number;
  validityUntil: string;
  notes: string;
  sampleOffered: boolean;
  paymentTerms: string;
  status: 'submitted' | 'accepted' | 'rejected' | 'revised';
  createdAt: string;
}

export interface OrderMilestone {
  key: string;
  label: string;
  date?: string;
  completed: boolean;
  notes?: string;
}

export interface Order {
  id: string;
  rfqId: string;
  quotationId: string;
  buyerId: string;
  buyerName: string;
  supplierId: string;
  supplierName: string;
  productTitle: string;
  quantity: number;
  unitPriceBDT: number;
  totalAmountBDT: number;
  currentMilestone: string;
  milestones: OrderMilestone[];
  createdAt: string;
  deliveryAddress: string;
}

export interface WebsiteSectionConfig {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  title: string;
  subtitle: string;
}

export interface WebsiteBuilderConfig {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
    bgGradient: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  sections: WebsiteSectionConfig[];
  theme: {
    primaryColor: string;
    accentColor: string;
    borderRadius: 'rounded-none' | 'rounded-md' | 'rounded-xl' | 'rounded-2xl';
    fontScale: 'compact' | 'normal' | 'spacious';
  };
  announcement: {
    visible: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  footer: {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    copyright: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  details: string;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  updatedAt: string;
}
