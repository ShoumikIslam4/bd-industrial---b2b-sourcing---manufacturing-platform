import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Product } from '../../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  Grid,
  List,
  ShieldCheck,
  Send,
  ChevronDown,
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import { exportProductsToCSV } from '../../utils/csvHelper';

interface Props {
  onSelectProduct: (productId: string) => void;
  onOpenRFQModal: (title?: string, category?: string) => void;
  initialCategory?: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductDirectory: React.FC<Props> = ({
  onSelectProduct,
  onOpenRFQModal,
  initialCategory = 'all',
  searchQuery,
  setSearchQuery,
}) => {
  const { products, formatPrice, language } = usePlatform();

  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [stockStatusFilter, setStockStatusFilter] = useState<string>('all');
  const [maxMoq, setMaxMoq] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'moq_asc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Categories list
  const categories = [
    { id: 'all', label: 'All Sectors' },
    { id: 'garments', label: 'Garments & RMG Knitwear' },
    { id: 'packaging', label: 'Industrial Packaging & Cartons' },
    { id: 'jute', label: 'Eco-Jute & Natural Fibers' },
    { id: 'machinery', label: 'Precision Machinery & Spares' },
    { id: 'textiles', label: 'Textiles & Yarns' },
    { id: 'plastic', label: 'Plastic & Polymer Molding' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesSupplier = p.supplierName.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSupplier && !matchesSku && !matchesCategory) {
          return false;
        }
      }

      // Category
      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }

      // Verified only
      if (verifiedOnly && !p.supplierVerified) {
        return false;
      }

      // Stock status
      if (stockStatusFilter !== 'all' && p.stockStatus !== stockStatusFilter) {
        return false;
      }

      // MOQ
      if (p.moq > maxMoq) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.pricingTiers[0]?.unitPriceBDT || 0;
      const priceB = b.pricingTiers[0]?.unitPriceBDT || 0;

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'moq_asc') return a.moq - b.moq;
      // Default: featured/popular first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, searchQuery, categoryFilter, verifiedOnly, stockStatusFilter, maxMoq, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span>Home</span> <span className="text-slate-300">/</span> <span className="text-slate-800 font-semibold">Wholesale Products</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'পাইকারি পণ্য ক্যাটালগ ও স্পেসিফিকেশন' : 'B2B Wholesale Product Catalog'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Direct factory pricing in Bangladeshi Taka (BDT) with volume tiers and verified factory compliance
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => exportProductsToCSV(filteredProducts)}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onOpenRFQModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Custom RFQ</span>
            </button>
          </div>
        </div>

        {/* Filter bar & Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Sector select */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 hover:bg-white focus:outline-none focus:border-blue-600"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>

            {/* Verified toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${verifiedOnly ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-white'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Factories Only</span>
            </button>

            {/* Stock status */}
            <select
              value={stockStatusFilter}
              onChange={e => setStockStatusFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 hover:bg-white focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Availability</option>
              <option value="in_stock">In Stock (Immediate Dispatch)</option>
              <option value="made_to_order">Made to Order / Production Run</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort by */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none"
              >
                <option value="featured">Featured / Best Match</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="moq_asc">MOQ: Smallest First</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-400 hover:text-slate-700'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-400 hover:text-slate-700'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> industrial listings
          </span>
          {(searchQuery || categoryFilter !== 'all' || verifiedOnly || stockStatusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setVerifiedOnly(false);
                setStockStatusFilter('all');
              }}
              className="text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Container */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-base text-slate-800">No products match your current filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your sector filter, clearing search keywords, or submit a Custom RFQ to source directly from factories.
            </p>
            <button
              onClick={() => onOpenRFQModal()}
              className="mt-2 px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 cursor-pointer"
            >
              Post Custom RFQ
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod.id)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      MOQ: {prod.moq.toLocaleString()} {prod.moqUnit}
                    </div>
                    {prod.supplierVerified && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3 h-3" />
                        <span>AUDITED</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-medium truncate max-w-[170px]">{prod.supplierName}</span>
                      <span className="uppercase text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-slate-600">
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                      {prod.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                      {prod.description}
                    </p>

                    {/* Price Tier Table */}
                    <div className="pt-2">
                      <div className="text-[11px] text-slate-400 font-medium">Bulk Pricing:</div>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-lg font-extrabold text-blue-900">
                          {formatPrice(prod.pricingTiers[0]?.unitPriceBDT || 0)}
                        </span>
                        <span className="text-xs text-slate-500">
                          / {prod.moqUnit.slice(0, -1) || 'pc'}
                        </span>
                        {prod.pricingTiers.length > 1 && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-2 font-bold">
                            Tiers down to {formatPrice(prod.pricingTiers[prod.pricingTiers.length - 1].unitPriceBDT)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">
                    Lead Time: <strong>{prod.leadTimeDays}d</strong>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRFQModal(prod.title, prod.category);
                    }}
                    className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire / RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod.id)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col sm:flex-row items-center justify-between gap-5 cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shrink-0 border border-slate-100"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">{prod.supplierName}</span>
                      {prod.supplierVerified && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                      {prod.title}
                    </h3>
                    <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span>MOQ: <strong>{prod.moq.toLocaleString()} {prod.moqUnit}</strong></span>
                      <span>Lead Time: <strong>{prod.leadTimeDays} days</strong></span>
                      <span>SKU: <strong>{prod.sku}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-blue-900">
                      {formatPrice(prod.pricingTiers[0]?.unitPriceBDT || 0)}
                      <span className="text-xs font-normal text-slate-500"> / {prod.moqUnit.slice(0, -1)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Ex-Factory Bangladesh</div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRFQModal(prod.title, prod.category);
                    }}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
