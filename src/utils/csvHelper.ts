import { Product } from '../types';

export const exportProductsToCSV = (products: Product[]) => {
  const headers = [
    'ID',
    'Title',
    'Category',
    'SubCategory',
    'SKU',
    'SupplierName',
    'MOQ',
    'MOQUnit',
    'BasePriceBDT',
    'LeadTimeDays',
    'StockStatus',
    'Featured',
    'Popular'
  ];

  const rows = products.map(p => [
    `"${p.id}"`,
    `"${p.title.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    `"${p.subCategory}"`,
    `"${p.sku}"`,
    `"${p.supplierName.replace(/"/g, '""')}"`,
    p.moq,
    `"${p.moqUnit}"`,
    p.pricingTiers[0]?.unitPriceBDT || 0,
    p.leadTimeDays,
    `"${p.stockStatus}"`,
    p.featured ? 'YES' : 'NO',
    p.popular ? 'YES' : 'NO'
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `BD_Industrial_Products_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseProductsCSV = (csvText: string): Partial<Product>[] => {
  const lines = csvText.split('\n').filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.replace(/(^"|"$)/g, '').trim());
  const parsed: Partial<Product>[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Simple regex parser for comma-separated values respecting quotes
    const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!matches) continue;

    const values = matches.map(val => val.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
    const title = values[1] || `Imported Product #${i}`;
    const category = (values[2] as Product['category']) || 'garments';
    const subCategory = values[3] || 'General Wholesale';
    const sku = values[4] || `IMP-SKU-${Date.now().toString().slice(-4)}-${i}`;
    const moq = parseInt(values[6]) || 100;
    const moqUnit = values[7] || 'Pieces';
    const basePrice = parseFloat(values[8]) || 100;
    const leadTime = parseInt(values[9]) || 14;

    parsed.push({
      id: `prod-imp-${Date.now()}-${i}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      subCategory,
      sku,
      moq,
      moqUnit,
      pricingTiers: [
        { minQty: moq, maxQty: moq * 4, unitPriceBDT: basePrice },
        { minQty: moq * 4 + 1, unitPriceBDT: Math.round(basePrice * 0.88) }
      ],
      specifications: {
        'Quality Standard': 'Industrial Grade Specification',
        'Inspection': 'AQL 2.5 Standard',
        'Batch': 'Imported Bulk Batch'
      },
      customizationOptions: [
        { name: 'Branding', options: ['Custom Logo Print', 'Standard Neutral'] }
      ],
      leadTimeDays: leadTime,
      sampleAvailable: true,
      samplePriceBDT: Math.round(basePrice * 1.5),
      stockStatus: 'made_to_order',
      featured: false,
      popular: false,
      description: `Commercial wholesale supply batch of ${title}. High-volume production capability in Gazipur/Narayanganj.`,
      images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80'],
      createdAt: new Date().toISOString()
    });
  }

  return parsed;
};
