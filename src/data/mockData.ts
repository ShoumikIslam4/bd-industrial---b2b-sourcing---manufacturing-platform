import { Product, Supplier, RFQ, Quotation, Order, WebsiteBuilderConfig, CMSPage, AuditLog, User } from '../types';

export const initialUsers: User[] = [
  {
    id: 'user-admin-1',
    email: 'admin@bdsource.com.bd',
    name: 'Tariq Rahman',
    role: 'superadmin',
    companyName: 'BD-Industrial National Platform HQ',
    phone: '+880 1711-000111',
    location: 'Gulshan-1, Dhaka',
    status: 'active',
    password: 'admin123456',
    createdAt: '2025-01-10T09:00:00Z',
  },
  {
    id: 'user-sup-1',
    email: 'sales@apexapparels-bd.com',
    name: 'Engr. Mahbubul Alam',
    role: 'supplier',
    companyName: 'Apex Composite Knitwear Ltd.',
    phone: '+880 1819-223344',
    location: 'Konabari, Gazipur',
    status: 'active',
    password: 'supplier123',
    createdAt: '2025-02-01T10:30:00Z',
  },
  {
    id: 'user-sup-2',
    email: 'info@delta-pack.com.bd',
    name: 'Farhana Hossain',
    role: 'supplier',
    companyName: 'Delta Industrial Packaging & Cartons Ltd.',
    phone: '+880 1712-889900',
    location: 'Adamjee EPZ, Narayanganj',
    status: 'active',
    password: 'supplier123',
    createdAt: '2025-02-15T11:00:00Z',
  },
  {
    id: 'user-sup-3',
    email: 'commercial@banglajute.org',
    name: 'Kazi Nazmul Huda',
    role: 'supplier',
    companyName: 'Bengal Eco-Jute & Fiber Mills',
    phone: '+880 1911-334455',
    location: 'Demra, Dhaka',
    status: 'active',
    password: 'supplier123',
    createdAt: '2025-03-01T08:15:00Z',
  },
  {
    id: 'user-buyer-1',
    email: 'procurement@nordicretail.se',
    name: 'Lars Lindqvist',
    role: 'buyer',
    companyName: 'Nordic Sourcing Group AB',
    phone: '+46 8 123 4567',
    location: 'Stockholm, Sweden / Dhaka Liaison Office',
    status: 'active',
    password: 'buyer123',
    createdAt: '2025-03-10T14:20:00Z',
  },
  {
    id: 'user-buyer-2',
    email: 'sourcing@aarongcraft.com.bd',
    name: 'Shirin Akhter',
    role: 'buyer',
    companyName: 'Bengal Retail & Merchandising Corp.',
    phone: '+880 1611-778899',
    location: 'Uttara Sector 3, Dhaka',
    status: 'active',
    password: 'BuyerPass@2026!',
    createdAt: '2025-03-15T16:00:00Z',
  }
];

export const initialSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    userId: 'user-sup-1',
    companyName: 'Apex Composite Knitwear Ltd.',
    slug: 'apex-composite-knitwear',
    businessType: 'Manufacturer',
    factoryLocation: 'Plot 14-18, Konabari Industrial Belt, Gazipur',
    industrialZone: 'Gazipur Industrial Zone',
    establishedYear: 2008,
    employeeCount: 3200,
    certifications: ['OEKO-TEX Standard 100', 'BSCI', 'SEDEX SMETA 4-Pillar', 'GOTS (Organic)', 'ISO 9001:2015'],
    capabilities: [
      'Circular Knitting & Jacquard',
      'Eco-Friendly Jet Dyeing (Zero Liquid Discharge)',
      'Automated CAD Cutting & Stitching',
      'Rotary & High-Density Screen Printing',
      'Full In-House Physical & Colorfastness Lab'
    ],
    factoryPhotos: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    verified: true,
    verificationExpiresAt: '2027-12-31',
    tradeLicenseNumber: 'TRAD/DNCC/021948/2024',
    tinNumber: '748291038291',
    binNumber: '001928374-0102',
    rating: 4.9,
    responseRate: '98% within 2 hours',
    completedOrdersCount: 142,
    minOrderAmountBDT: 250000,
    contactEmail: 'sales@apexapparels-bd.com',
    contactPhone: '+880 1819-223344',
    whatsapp: '+8801819223344',
    about: 'Apex Composite Knitwear is a LEED Platinum certified vertical manufacturer producing high-specification knitwear, organic cotton tees, fleece hoodies, and activewear for export and institutional domestic wholesale.'
  },
  {
    id: 'sup-2',
    userId: 'user-sup-2',
    companyName: 'Delta Industrial Packaging & Cartons Ltd.',
    slug: 'delta-industrial-packaging',
    businessType: 'Manufacturer',
    factoryLocation: 'Sector 2, Road 4, Adamjee EPZ, Narayanganj',
    industrialZone: 'Adamjee Export Processing Zone',
    establishedYear: 2012,
    employeeCount: 450,
    certifications: ['FSC Certified', 'ISO 9001:2015', 'RoHS Compliant', 'ISO 14001'],
    capabilities: [
      '5-Ply & 7-Ply Heavy Corrugated Fluting',
      'High-Speed Flexo 6-Color Printing',
      'Automated Die-Cutting & Gluer Lines',
      'Custom Rigid Luxury Boxes',
      'Bio-degradable Waterproof Coatings'
    ],
    factoryPhotos: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800&auto=format&fit=crop&q=80'
    ],
    verified: true,
    verificationExpiresAt: '2027-08-30',
    tradeLicenseNumber: 'TRAD/NAR/004921/2024',
    tinNumber: '892019283401',
    binNumber: '002847192-0201',
    rating: 4.8,
    responseRate: '95% within 4 hours',
    completedOrdersCount: 310,
    minOrderAmountBDT: 100000,
    contactEmail: 'info@delta-pack.com.bd',
    contactPhone: '+880 1712-889900',
    whatsapp: '+8801712889900',
    about: 'Leading corrugated packaging manufacturer in Narayanganj supplying top export garment houses, FMCG giants, and pharmaceutical corporations across Bangladesh.'
  },
  {
    id: 'sup-3',
    userId: 'user-sup-3',
    companyName: 'Bengal Eco-Jute & Fiber Mills',
    slug: 'bengal-eco-jute-mills',
    businessType: 'Manufacturer',
    factoryLocation: 'Sultana Kamal Bridge Road, Demra, Dhaka',
    industrialZone: 'Demra Riverfront Industrial Corridor',
    establishedYear: 1996,
    employeeCount: 880,
    certifications: ['Oeko-Tex Standard 100 Class I', 'Fair Trade Certified', 'ISO 9001', 'Green Factory Gold'],
    capabilities: [
      'Jute Spinning & Multi-Ply Twisting',
      'High-Density Hessian & Burlap Weaving',
      'Laminated Eco-Shopping Bag Assembly',
      'Hydrocarbon-Free Food Grade Jute Bags',
      'Custom Screen Printing & Brand Embroidery'
    ],
    factoryPhotos: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'
    ],
    verified: true,
    verificationExpiresAt: '2028-01-15',
    tradeLicenseNumber: 'TRAD/DSCC/011928/2023',
    tinNumber: '392019482910',
    binNumber: '003928172-0303',
    rating: 4.9,
    responseRate: '100% within 1 hour',
    completedOrdersCount: 220,
    minOrderAmountBDT: 150000,
    contactEmail: 'commercial@banglajute.org',
    contactPhone: '+880 1911-334455',
    whatsapp: '+8801911334455',
    about: 'Dedicated to preserving Bangladesh’s golden fiber legacy with 100% biodegradable jute packaging, geo-textiles, export tote bags, and agricultural sacks.'
  },
  {
    id: 'sup-4',
    userId: 'user-sup-4',
    companyName: 'Padma Precision Light Engineering Ltd.',
    slug: 'padma-precision-engineering',
    businessType: 'Industrial Supplier',
    factoryLocation: 'Tejgaon Industrial Area, Dhaka 1208',
    industrialZone: 'Tejgaon Industrial Zone',
    establishedYear: 2014,
    employeeCount: 160,
    certifications: ['ISO 9001:2015', 'CE Certification', 'BUET Materials Lab Verified'],
    capabilities: [
      'CNC 5-Axis Milling & Turning',
      'Industrial Conveyor Roller Fabrication',
      'Textile Stenter Machine Spare Parts',
      'Hydraulic Cylinder Rebuilding & Hard Chroming',
      'Sheet Metal Laser Cutting up to 20mm'
    ],
    factoryPhotos: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80'
    ],
    verified: true,
    verificationExpiresAt: '2027-11-20',
    tradeLicenseNumber: 'TRAD/DNCC/083921/2024',
    tinNumber: '672910293847',
    binNumber: '004829182-0104',
    rating: 4.7,
    responseRate: '92% within 6 hours',
    completedOrdersCount: 88,
    minOrderAmountBDT: 80000,
    contactEmail: 'engineering@padmaprecision.com',
    contactPhone: '+880 1733-445566',
    whatsapp: '+8801733445566',
    about: 'Tejgaon-based high-tolerance industrial precision engineering firm manufacturing replacement components and conveyor systems for RMG, food & beverage and chemical plants.'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    supplierId: 'sup-1',
    supplierName: 'Apex Composite Knitwear Ltd.',
    supplierVerified: true,
    title: '180 GSM 100% Combed Ring-Spun Cotton Crewneck Blank T-Shirts',
    slug: 'combed-cotton-crewneck-tshirt-180gsm',
    category: 'garments',
    subCategory: 'Knitwear & Apparel',
    description: 'Premium heavyweight 180 GSM combed single jersey knit T-shirts engineered for commercial silk-screen printing, direct-to-garment (DTG) printing, and corporate workwear. Double-needle stitched neckband with Lycra ribbing, silicone washed for ultra-soft hand feel and pre-shrunk to guarantee less than 3% shrinkage.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'APX-TS-180-BLK',
    moq: 500,
    moqUnit: 'Pieces',
    pricingTiers: [
      { minQty: 500, maxQty: 1999, unitPriceBDT: 285 },
      { minQty: 2000, maxQty: 4999, unitPriceBDT: 255 },
      { minQty: 5000, unitPriceBDT: 220 }
    ],
    specifications: {
      'Fabric Composition': '100% Combed Compact Cotton',
      'Weight / Density': '180 GSM (± 5 GSM)',
      'Yarn Count': '30/1 Ne Ring-Spun',
      'Dyeing Standard': 'Reactive Dye with Azo-Free Certification',
      'Color Fastness to Washing': 'Grade 4-5 (ISO 105-C06)',
      'Shrinkage Rate': 'Under 3% Length & Width',
      'Origin': 'Gazipur, Bangladesh'
    },
    customizationOptions: [
      { name: 'Colors Available', options: ['Black', 'Navy Blue', 'Heather Grey', 'Optical White', 'Forest Green', 'Pantone Custom Dye'] },
      { name: 'Branding Method', options: ['Silk Screen Print', 'High Density Rubber Print', 'Woven Neck Label', 'Custom Polybag & Hangtag'] },
      { name: 'Size Range', options: ['S to XXL', 'Asian Fit', 'EU Standard Oversized Fit'] }
    ],
    leadTimeDays: 14,
    sampleAvailable: true,
    samplePriceBDT: 500,
    stockStatus: 'made_to_order',
    featured: true,
    popular: true,
    createdAt: '2025-02-10T10:00:00Z'
  },
  {
    id: 'prod-2',
    supplierId: 'sup-2',
    supplierName: 'Delta Industrial Packaging & Cartons Ltd.',
    supplierVerified: true,
    title: 'Heavy-Duty 5-Ply Corrugated Master Shipping Boxes (Export Grade)',
    slug: 'heavy-duty-5ply-corrugated-master-box',
    category: 'packaging',
    subCategory: 'Corrugated Cartons',
    description: 'Industrial grade 5-ply corrugated shipper cartons crafted with imported virgin Kraft liner paper. Built with BC-Flute configuration offering supreme edge crush resistance (ECT 44) for heavy garment export, automotive spares, and palletized distribution.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'DLT-CTN-5P-604040',
    moq: 1000,
    moqUnit: 'Cartons',
    pricingTiers: [
      { minQty: 1000, maxQty: 4999, unitPriceBDT: 115 },
      { minQty: 5000, maxQty: 19999, unitPriceBDT: 98 },
      { minQty: 20000, unitPriceBDT: 85 }
    ],
    specifications: {
      'Board Structure': '5-Ply (Outer Kraft 180 GSM, Fluting 140 GSM, Inner Kraft 150 GSM)',
      'Flute Profile': 'B/C Double Wall Combination',
      'Bursting Strength': '14 kg/cm² minimum',
      'Edge Crush Test (ECT)': '44 lbs/inch',
      'Standard Dimensions': '60cm (L) x 40cm (W) x 40cm (H)',
      'Water Resistance': 'Paraffin water repellent outer coating available'
    },
    customizationOptions: [
      { name: 'Print Options', options: ['1-Color Warning Text', '2-Color Company Logo', 'Full 4-Color Flexo Graphic Print'] },
      { name: 'Closure Type', options: ['Regular Slotted Container (RSC)', 'Die-cut Hand Holes', 'Lock Bottom'] }
    ],
    leadTimeDays: 7,
    sampleAvailable: true,
    samplePriceBDT: 300,
    stockStatus: 'in_stock',
    featured: true,
    popular: true,
    createdAt: '2025-02-18T12:00:00Z'
  },
  {
    id: 'prod-3',
    supplierId: 'sup-3',
    supplierName: 'Bengal Eco-Jute & Fiber Mills',
    supplierVerified: true,
    title: 'Biodegradable Heavy-Duty Jute Sacking Bags for Agricultural Export',
    slug: 'biodegradable-jute-sacking-bags-50kg',
    category: 'jute',
    subCategory: 'Natural Fibers & Sacks',
    description: 'Hydrocarbon-free food grade 100% natural golden jute sacking sacks. Specially treated with vegetable oil batching for zero petroleum residue, making them strictly compliant with European and Japanese food safety import rules for coffee beans, cocoa, grains, and potatoes.',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'BNG-JUT-BAG-50KG',
    moq: 1500,
    moqUnit: 'Bags',
    pricingTiers: [
      { minQty: 1500, maxQty: 4999, unitPriceBDT: 145 },
      { minQty: 5000, maxQty: 14999, unitPriceBDT: 132 },
      { minQty: 15000, unitPriceBDT: 118 }
    ],
    specifications: {
      'Material': '100% Tossa / White Jute Fiber',
      'Weight Capacity': 'Standard 50 KG Bulk Load',
      'Bag Weight': '680 grams per bag',
      'Weave Density': 'Porter 6 x Shot 8',
      'Batching Oil': 'Rice Bran / Vegetable Food Grade (Hydrocarbon Free)',
      'Dimensions': '100 cm x 60 cm'
    },
    customizationOptions: [
      { name: 'Branding', options: ['Single Stripe Red/Green', 'Custom Ink Stencil Logo', 'Sewn-in Fabric Brand Tag'] },
      { name: 'Top Hemming', options: ['Overlocked Safety Stitch', 'Double Hemmed'] }
    ],
    leadTimeDays: 10,
    sampleAvailable: true,
    samplePriceBDT: 250,
    stockStatus: 'in_stock',
    featured: true,
    popular: false,
    createdAt: '2025-03-02T09:30:00Z'
  },
  {
    id: 'prod-4',
    supplierId: 'sup-4',
    supplierName: 'Padma Precision Light Engineering Ltd.',
    supplierVerified: true,
    title: 'Precision Hard-Chromed Industrial Conveyor Roller (Heavy Load)',
    slug: 'precision-hard-chromed-conveyor-roller',
    category: 'machinery',
    subCategory: 'Factory Spares & Conveyors',
    description: 'Precision turned dynamic-balanced conveyor rollers fabricated from seamless carbon steel tubing. Equipped with dual sealed Japanese NSK high-speed bearings, labyrinth dust seals, and micro-inch hard chrome plating for chemical and moisture resistance.',
    images: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'PDM-ROL-89-600',
    moq: 50,
    moqUnit: 'Units',
    pricingTiers: [
      { minQty: 50, maxQty: 199, unitPriceBDT: 1850 },
      { minQty: 200, maxQty: 499, unitPriceBDT: 1650 },
      { minQty: 500, unitPriceBDT: 1480 }
    ],
    specifications: {
      'Tube Diameter': '89mm OD Seamless Steel',
      'Wall Thickness': '4.5mm Heavy Gauge',
      'Shaft Diameter': '20mm Solid Ground Steel with M12 Threaded Ends',
      'Bearings': 'NSK Deep Groove 6204-2RS Dual Sealed',
      'Surface Finish': 'Hard Chrome Plated (30 Micron Thickness)',
      'Static Load Capacity': '450 KG per Roller'
    },
    customizationOptions: [
      { name: 'Shaft Length', options: ['400mm', '600mm', '800mm', '1000mm Custom'] },
      { name: 'Sleeve Coating', options: ['Bare Hard Chrome', 'Polyurethane Rubber Lagged', 'Zinc Galvanized'] }
    ],
    leadTimeDays: 12,
    sampleAvailable: true,
    samplePriceBDT: 2500,
    stockStatus: 'made_to_order',
    featured: false,
    popular: true,
    createdAt: '2025-03-05T14:00:00Z'
  },
  {
    id: 'prod-5',
    supplierId: 'sup-1',
    supplierName: 'Apex Composite Knitwear Ltd.',
    supplierVerified: true,
    title: '320 GSM CVC Brushed Fleece Pullover Hoodies (Export Quality)',
    slug: 'cvc-brushed-fleece-pullover-hoodies',
    category: 'garments',
    subCategory: 'Winter & Sweatshirts',
    description: 'Super warm 320 GSM brushed back fleece hoodie crafted with 65% Combed Cotton and 35% Poly blend for maximum thermal insulation and shape stability. Features matching dyed drawcords, metal eyelets, deep kangaroo front pocket, and double-needle hem.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'APX-HD-320-FLC',
    moq: 300,
    moqUnit: 'Pieces',
    pricingTiers: [
      { minQty: 300, maxQty: 999, unitPriceBDT: 680 },
      { minQty: 1000, maxQty: 2999, unitPriceBDT: 610 },
      { minQty: 3000, unitPriceBDT: 550 }
    ],
    specifications: {
      'Blend': '65% Cotton / 35% Polyester CVC',
      'Fabric Weight': '320 GSM Inside Brushed Fleece',
      'Rib Trim': '2x2 Heavy Spandex Lycra Rib',
      'Hood Construction': 'Double Layer 2-Piece Anatomical Hood',
      'Pocket': 'Kangaroo Pouch with Bar-Tack Reinforcements'
    },
    customizationOptions: [
      { name: 'Colors', options: ['Pitch Black', 'Charcoal Heather', 'Burgundy Wine', 'Navy', 'Olive Green'] },
      { name: 'Embroidery & Print', options: ['Chest Chenille Patch', '3D Puff Embroidery', 'Silicone Gel Chest Logo'] }
    ],
    leadTimeDays: 18,
    sampleAvailable: true,
    samplePriceBDT: 1200,
    stockStatus: 'made_to_order',
    featured: true,
    popular: true,
    createdAt: '2025-03-08T15:20:00Z'
  },
  {
    id: 'prod-6',
    supplierId: 'sup-2',
    supplierName: 'Delta Industrial Packaging & Cartons Ltd.',
    supplierVerified: true,
    title: 'Biodegradable Self-Adhesive Security Courier Poly Mailer Bags',
    slug: 'biodegradable-courier-poly-mailer-bags',
    category: 'packaging',
    subCategory: 'E-commerce & Mailers',
    description: 'Co-extruded multi-layer tamper-evident opaque poly mailers designed for domestic e-commerce delivery and international garment shipping. Built with high-strength hot-melt permanent adhesive strip that tears if tampered with.',
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'DLT-MLR-60MIC',
    moq: 3000,
    moqUnit: 'Pieces',
    pricingTiers: [
      { minQty: 3000, maxQty: 9999, unitPriceBDT: 8.5 },
      { minQty: 10000, maxQty: 49999, unitPriceBDT: 6.8 },
      { minQty: 50000, unitPriceBDT: 5.5 }
    ],
    specifications: {
      'Material': 'Virgin LDPE + EPI Bio-Degradable D2W Additive',
      'Thickness': '60 Micron Dual-Color (White Outside / Black Inside for Privacy)',
      'Adhesive': 'Extra Strength Hot-Melt with Release Liner',
      'Tear Resistance': 'Dart Impact > 200 grams',
      'Sizes': 'Standard 10x14 inch, 12x16 inch, 14x19 inch'
    },
    customizationOptions: [
      { name: 'Custom Printing', options: ['Full Color Brand Logo', 'Barcode / QR Code Zone', 'Return Policy Instructions'] },
      { name: 'Pouch Option', options: ['Plain Back', 'Integrated Clear Waybill Document Pouch'] }
    ],
    leadTimeDays: 7,
    sampleAvailable: true,
    samplePriceBDT: 200,
    stockStatus: 'in_stock',
    featured: false,
    popular: true,
    createdAt: '2025-03-12T11:45:00Z'
  }
];

export const initialRFQs: RFQ[] = [
  {
    id: 'rfq-101',
    buyerId: 'user-buyer-1',
    buyerName: 'Lars Lindqvist',
    buyerEmail: 'procurement@nordicretail.se',
    buyerPhone: '+46 8 123 4567',
    buyerCompany: 'Nordic Sourcing Group AB',
    title: '15,000 Pcs Organic Combed Cotton Blank Tees for Nordic Spring Launch',
    category: 'garments',
    targetQuantity: 15000,
    targetUnit: 'Pieces',
    targetBudgetBDT: 3450000,
    specifications: {
      'Fabric Requirement': '100% GOTS Certified Organic Cotton 180 GSM',
      'Color Palette': '5 Colors (3,000 pcs per color: White, Sage, Sand, Marine, Charcoal)',
      'Testing': 'Oeko-Tex Standard 100 Lab Certificate required prior to shipment',
      'Labeling': 'Private woven heat-seal size label inside back collar',
      'Packaging': 'Individual biodegradable polybag + 50 pcs master carton'
    },
    customRequirements: 'Factory must have BSCI or Sedex SMETA social compliance audit report valid through 2026. Pre-production sample (PPS) required within 10 days of order placement.',
    attachments: ['TechPack_NordicSpring_2026.pdf', 'MeasurementChart_EU.xlsx'],
    deliveryDistrict: 'Chittagong Port (FOB) or Dhaka Airport',
    deadlineDate: '2026-11-30',
    status: 'quotes_received',
    assignedSupplierId: 'sup-1',
    quotesCount: 3,
    createdAt: '2025-03-14T08:30:00Z'
  },
  {
    id: 'rfq-102',
    buyerId: 'user-buyer-2',
    buyerName: 'Shirin Akhter',
    buyerEmail: 'sourcing@aarongcraft.com.bd',
    buyerPhone: '+880 1611-778899',
    buyerCompany: 'Bengal Retail & Merchandising Corp.',
    title: '50,000 Units Printed Eco-Jute Promotional Tote Bags for Eid Campaign',
    category: 'jute',
    targetQuantity: 50000,
    targetUnit: 'Units',
    targetBudgetBDT: 5500000,
    specifications: {
      'Fabric': 'Fine Natural Laminated Jute (Hessian 14x15)',
      'Dimensions': '15" Height x 14" Width x 5" Gusset',
      'Handle': 'Cotton webbed padded tubular handles 18" drop',
      'Printing': '2-color screen print water-based eco ink on both faces'
    },
    customRequirements: 'Stitching must be reinforced with x-box stitch on all handle joints. Capacity to deliver in two tranches of 25,000 units to Tejgaon central warehouse.',
    attachments: ['Aarong_Eid_ArtFile_Vector.ai'],
    deliveryDistrict: 'Dhaka (Tejgaon Central Logistics)',
    deadlineDate: '2026-12-15',
    status: 'open',
    quotesCount: 2,
    createdAt: '2025-03-16T12:00:00Z'
  },
  {
    id: 'rfq-103',
    buyerId: 'user-buyer-1',
    buyerName: 'Lars Lindqvist',
    buyerEmail: 'procurement@nordicretail.se',
    buyerPhone: '+46 8 123 4567',
    buyerCompany: 'Nordic Sourcing Group AB',
    title: '25,000 Pcs 5-Ply Master Export Cartons with FSC Certification',
    category: 'packaging',
    targetQuantity: 25000,
    targetUnit: 'Cartons',
    targetBudgetBDT: 2150000,
    specifications: {
      'Board Grade': '5-Ply Kraft Paperboard ECT 44',
      'Dimensions': '58 x 38 x 38 cm',
      'Print': '2-Color International shipping symbols + QR Code barcode'
    },
    customRequirements: 'Moisture content below 9%. FSC chain of custody certificate mandatory.',
    attachments: ['Carton_Dieline_Specs.pdf'],
    deliveryDistrict: 'Gazipur (Konabari Garment Factory Delivery)',
    deadlineDate: '2026-11-10',
    status: 'in_production',
    assignedSupplierId: 'sup-2',
    quotesCount: 1,
    createdAt: '2025-03-01T10:00:00Z'
  }
];

export const initialQuotations: Quotation[] = [
  {
    id: 'quot-201',
    rfqId: 'rfq-101',
    rfqTitle: '15,000 Pcs Organic Combed Cotton Blank Tees for Nordic Spring Launch',
    supplierId: 'sup-1',
    supplierName: 'Apex Composite Knitwear Ltd.',
    supplierEmail: 'sales@apexapparels-bd.com',
    buyerId: 'user-buyer-1',
    unitPriceBDT: 225,
    totalAmountBDT: 3375000,
    moqOffered: 5000,
    leadTimeDays: 25,
    validityUntil: '2026-11-15',
    notes: 'Quote includes GOTS organic certificate verification, individual polybags, and FOB delivery to Chittagong Port. Lab dips for 5 colors will be dispatched within 4 days.',
    sampleOffered: true,
    paymentTerms: '30% Advance T/T, 70% against Bill of Lading (B/L) copy or 100% at sight Letter of Credit (L/C)',
    status: 'submitted',
    createdAt: '2025-03-15T14:00:00Z'
  },
  {
    id: 'quot-202',
    rfqId: 'rfq-103',
    rfqTitle: '25,000 Pcs 5-Ply Master Export Cartons with FSC Certification',
    supplierId: 'sup-2',
    supplierName: 'Delta Industrial Packaging & Cartons Ltd.',
    supplierEmail: 'info@delta-pack.com.bd',
    buyerId: 'user-buyer-1',
    unitPriceBDT: 84,
    totalAmountBDT: 2100000,
    moqOffered: 10000,
    leadTimeDays: 10,
    validityUntil: '2026-10-30',
    notes: 'Quote fully approved and in active production. FSC certified virgin Kraft tested at 14.5 kg/cm² bursting pressure.',
    sampleOffered: true,
    paymentTerms: 'Account credit 30 days after factory delivery & gate pass inspection',
    status: 'accepted',
    createdAt: '2025-03-02T16:00:00Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-5001',
    rfqId: 'rfq-103',
    quotationId: 'quot-202',
    buyerId: 'user-buyer-1',
    buyerName: 'Nordic Sourcing Group AB',
    supplierId: 'sup-2',
    supplierName: 'Delta Industrial Packaging & Cartons Ltd.',
    productTitle: '25,000 Pcs 5-Ply Master Export Cartons with FSC Certification',
    quantity: 25000,
    unitPriceBDT: 84,
    totalAmountBDT: 2100000,
    currentMilestone: 'in_production',
    milestones: [
      { key: 'order_confirmed', label: 'Order & Purchase Order Confirmed', date: '2025-03-03', completed: true, notes: 'L/C confirmed through Standard Chartered Bank Bangladesh' },
      { key: 'sample_approved', label: 'Pre-Production Sample Approved', date: '2025-03-06', completed: true, notes: 'FSC certificate & ECT 44 laboratory crush test passed' },
      { key: 'raw_material_sourced', label: 'Raw Kraft Paper Sourced & Slit', date: '2025-03-09', completed: true, notes: 'Imported liner reels transferred to corrugator line' },
      { key: 'in_production', label: 'Corrugation & Flexo Printing', date: '2025-03-12', completed: true, notes: '18,500 units corrugated, 2-color print running on Line 3' },
      { key: 'qc_inspection', label: 'Final Quality & Moisture Audit', completed: false, notes: 'Scheduled for next Tuesday by SGS Bangladesh' },
      { key: 'dispatched', label: 'Dispatched to Delivery Facility', completed: false },
      { key: 'delivered', label: 'Goods Received & Final Clearance', completed: false }
    ],
    createdAt: '2025-03-03T11:00:00Z',
    deliveryAddress: 'Konabari Garment Industrial Complex, Plot 14, Gazipur, Bangladesh'
  }
];

export const initialWebsiteConfig: WebsiteBuilderConfig = {
  hero: {
    badge: '🇧🇩 Bangladesh Premier B2B Manufacturing & Industrial Portal',
    title: 'Source Directly from Verified Bangladeshi Manufacturers',
    subtitle: 'Connect with top-tier RMG knitwear, textiles, industrial packaging, jute, leather, and precision engineering factories in Gazipur, Narayanganj, and Chittagong with guaranteed compliance, transparent BDT wholesale pricing, and verified factory audits.',
    primaryBtnText: 'Post Custom RFQ',
    primaryBtnLink: '#rfq-builder',
    secondaryBtnText: 'Explore Verified Factories',
    secondaryBtnLink: '/suppliers',
    bgGradient: 'from-slate-900 via-blue-950 to-slate-900',
    stat1Value: '1,450+',
    stat1Label: 'Verified Factories & Mills',
    stat2Value: '৳3.8B+',
    stat2Label: 'Annual RFQs Processed',
    stat3Value: '99.4%',
    stat3Label: 'On-Time Export Delivery'
  },
  sections: [
    { id: 'sec-hero', name: 'Hero Banner & Live Metrics', visible: true, order: 1, title: 'Hero Banner', subtitle: 'Main landing visual with verified stats' },
    { id: 'sec-categories', name: 'Core Industrial Sectors', visible: true, order: 2, title: 'Browse by Manufacturing Sector', subtitle: 'Leading manufacturing sectors fueling Bangladesh’s global industrial rise' },
    { id: 'sec-verified-suppliers', name: 'Verified Suppliers Spotlight', visible: true, order: 3, title: 'Audited & Verified Manufacturers', subtitle: 'Factories with verified trade licenses, tax compliance, and global certifications' },
    { id: 'sec-featured-products', name: 'Featured Wholesale Products', visible: true, order: 4, title: 'Popular Industrial & Wholesale Products', subtitle: 'Factory direct wholesale pricing with bulk quantity tiers and customizable specifications' },
    { id: 'sec-capabilities', name: 'Factory Capabilities & Technology', visible: true, order: 5, title: 'Modern Manufacturing Infrastructure', subtitle: 'State of the art automated machinery, zero liquid discharge dyeing, and testing laboratories' },
    { id: 'sec-recent-rfqs', name: 'Live Buyer Inquiries', visible: true, order: 6, title: 'Live Wholesale Inquiries & Demands', subtitle: 'Active RFQs from international and domestic institutional procurement teams' },
    { id: 'sec-rfq-banner', name: 'Custom RFQ Call-to-Action', visible: true, order: 7, title: 'Need Custom Manufacturing?', subtitle: 'Submit your exact technical drawings or tech-packs to receive competitive quotes within 24 hours' }
  ],
  theme: {
    primaryColor: '#0f172a',
    accentColor: '#0284c7',
    borderRadius: 'rounded-xl',
    fontScale: 'normal'
  },
  announcement: {
    visible: true,
    text: '🇧🇩 Bangladesh National Industrial Sourcing Expo 2026 — Book B2B Factory Visits & On-Site Audits',
    linkText: 'Learn More',
    linkUrl: '/how-it-works'
  },
  footer: {
    companyName: 'BD-Industrial Manufacturing Platform Ltd.',
    address: 'Level 9, Navana Tower, Gulshan-1 Circle, Dhaka 1212, Bangladesh',
    phone: '+880 (2) 988-1234 / +880 1711-000111',
    email: 'procurement@bdsource.com.bd',
    copyright: '© 2026 BD-Industrial Platform. All rights reserved. Recognized by BIDA & Ministry of Commerce.'
  }
};

export const initialCMSPages: CMSPage[] = [
  {
    id: 'page-about',
    slug: 'about-us',
    title: 'About BD-Industrial Platform',
    content: `
# Bangladesh's Premier B2B Industrial Ecosystem

BD-Industrial is the dedicated digital bridge uniting Bangladesh's world-class manufacturers with enterprise buyers across Europe, North America, Middle East, and domestic wholesale conglomerates.

### Our Industrial Mission
Bangladesh is the world's second-largest apparel exporter, a powerhouse of jute and eco-fibers, and one of South Asia's fastest-growing hubs for precision light engineering, packaging, and plastics. 

Our mission is to eliminate opaque intermediary layers, enable direct technical communication between factory engineers and corporate procurement teams, and enforce verified compliance standards across the entire supply chain.

### Key Industrial Clusters We Connect
- **Gazipur & Savar:** Heavy knitwear, denim, vertical spinning, and synthetic activewear.
- **Narayanganj & Adamjee EPZ:** Knit composite, fabric dyeing, and export corrugated packaging.
- **Tejgaon Industrial Area:** Precision spare parts, CNC engineering, steel rolling, and electrical components.
- **Demra & Faridpur Corridor:** Certified food-grade jute sacks, geo-textiles, and natural fiber composites.
- **Chittagong CEPZ & KEPZ:** Heavy manufacturing, footwear, and global maritime logistics.
    `,
    seoTitle: 'About Us | Bangladesh B2B Manufacturing & Wholesale Platform',
    seoDescription: 'Learn about BD-Industrial, connecting global enterprise buyers with verified Bangladeshi manufacturing plants, knitwear mills, packaging factories, and industrial suppliers.',
    published: true,
    updatedAt: '2025-03-01T10:00:00Z'
  },
  {
    id: 'page-how-it-works',
    slug: 'how-it-works',
    title: 'How Sourcing & Manufacturing Works on BD-Industrial',
    content: `
# Simple, Transparent & Secure 4-Step Sourcing Workflow

### 1. Submit Your RFQ or Tech-Pack
Detail your exact product specifications, required quantity, target budget in BDT or USD, material grades (GSM, yarn count, flute profile), and delivery deadline. You can attach PDFs, Tech-Packs, and CAD files.

### 2. Receive & Compare Verified Factory Quotations
Audited Bangladeshi manufacturers submit competitive, binding quotes including unit price tiers, minimum order quantity (MOQ), sample availability, and production lead times. Use our quotation comparator to compare terms side-by-side.

### 3. Request Pre-Production Samples
Verify hand feel, color accuracy (lab dips), stitch density, or material tolerance before committing to bulk commercial runs. Samples are dispatched via DHL, Sundarban, or SA Paribahan.

### 4. Milestone-Based Production & Inspection
Track real-time production stages: raw material sourcing, cutting, printing, stitching, and final quality inspection (AQL 2.5 standards). Payments are secured via Bank L/C, Escrow, or verified trade credit.
    `,
    seoTitle: 'How It Works | Sourcing from Bangladesh Factories',
    seoDescription: 'Step-by-step guide to submitting RFQs, comparing supplier quotations, approving pre-production samples, and tracking orders in Bangladesh.',
    published: true,
    updatedAt: '2025-03-05T12:00:00Z'
  },
  {
    id: 'page-faq',
    slug: 'faq',
    title: 'Frequently Asked Sourcing Questions (FAQ)',
    content: `
# Frequently Asked Questions

### What are the standard Minimum Order Quantities (MOQ)?
MOQs vary by sector:
- **Knitwear / Apparel:** Typically 500 to 2,000 pieces per style/color.
- **Packaging / Master Cartons:** 1,000 to 5,000 cartons.
- **Jute Sacks & Bags:** 1,500 to 5,000 units.
- **Precision Engineering:** 50 to 500 units depending on CNC tooling requirements.

### How are suppliers verified on the platform?
Every verified supplier undergoes a 4-tier audit:
1. Valid Trade License verification from municipal corporation (DNCC, DSCC, or regional municipality).
2. e-TIN & VAT / BIN registration check with the National Board of Revenue (NBR).
3. Physical factory location & machinery verification by BD-Industrial field auditors.
4. Social compliance & safety check (Fire safety, BSCI, OEKO-TEX, SEDEX, or ISO certification).

### What payment methods are accepted?
For international export buyers: Irrevocable Letter of Credit (L/C at sight) or advance Telegraphic Transfer (T/T).
For domestic enterprise buyers: Corporate Bank Transfer, Cheque, or verified invoice factoring.
    `,
    seoTitle: 'B2B Sourcing FAQ | Bangladesh Industrial Manufacturing',
    seoDescription: 'Frequently asked questions regarding MOQ, factory audits, payment methods, shipping from Chittagong port, and sample approvals in Bangladesh.',
    published: true,
    updatedAt: '2025-03-08T14:00:00Z'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2025-03-15T10:14:22Z',
    actorEmail: 'admin@bdsource.com.bd',
    actorRole: 'superadmin',
    action: 'VERIFIED_SUPPLIER',
    details: 'Verified compliance & renewed accreditation for Apex Composite Knitwear Ltd. (Exp: 2027-12-31)'
  },
  {
    id: 'log-2',
    timestamp: '2025-03-15T11:42:05Z',
    actorEmail: 'admin@bdsource.com.bd',
    actorRole: 'superadmin',
    action: 'UPDATE_WEBSITE_CONFIG',
    details: 'Published new Hero Banner copy and updated national B2B industrial statistics'
  },
  {
    id: 'log-3',
    timestamp: '2025-03-16T09:20:11Z',
    actorEmail: 'sales@apexapparels-bd.com',
    actorRole: 'supplier',
    action: 'SUBMITTED_QUOTATION',
    details: 'Submitted binding quote #quot-201 for RFQ-101 (15,000 Pcs Combed Cotton Blank Tees)'
  }
];
