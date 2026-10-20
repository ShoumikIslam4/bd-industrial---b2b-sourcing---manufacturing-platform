import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Product } from '../../types';
import {
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Send,
  PackageCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Share2,
  MessageSquareText
} from 'lucide-react';
import { SampleRequestModal } from '../common/SampleRequestModal';

interface Props {
  productId: string;
  onBack: () => void;
  onOpenRFQModal: (title?: string, category?: string) => void;
  onSelectSupplier: (supplierId: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductDetailPage: React.FC<Props> = ({
  productId,
  onBack,
  onOpenRFQModal,
  onSelectSupplier,
  onSelectProduct,
}) => {
  const { products, suppliers, formatPrice, showToast, language } = usePlatform();

  const product = products.find(p => p.id === productId) || products[0];
  const supplier = suppliers.find(s => s.id === product?.supplierId);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCustomization, setSelectedCustomization] = useState<string>('');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold">
          ← Back to Directory
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast('Product link copied to clipboard');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs h-96 sm:h-[460px]">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.supplierVerified && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AUDITED FACTORY SUPPLY</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${activeImageIdx === idx ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Specifications (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">SKU: {product.sku}</span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <button
                  onClick={() => supplier && onSelectSupplier(supplier.id)}
                  className="font-bold text-slate-800 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>{product.supplierName}</span>
                </button>
                {product.supplierVerified && (
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    ✓ Verified Ex-Factory
                  </span>
                )}
              </div>
            </div>

            {/* Tiered Bulk Pricing Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Wholesale Quantity Pricing Tiers</span>
                <span className="text-blue-700 font-bold">Currency: BDT (৳)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${idx === 0 ? 'bg-blue-50/60 border-blue-200' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <div className="text-xs text-slate-500 font-medium">
                      {tier.maxQty ? `${tier.minQty.toLocaleString()} - ${tier.maxQty.toLocaleString()} ${product.moqUnit}` : `${tier.minQty.toLocaleString()}+ ${product.moqUnit}`}
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">
                      {formatPrice(tier.unitPriceBDT)}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">per unit FOB Dhaka/CTG</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                <span>Minimum Order Quantity (MOQ): <strong className="text-slate-900">{product.moq.toLocaleString()} {product.moqUnit}</strong></span>
                <span>Production Lead Time: <strong className="text-slate-900">{product.leadTimeDays} business days</strong></span>
              </div>
            </div>

            {/* Customization Options */}
            {product.customizationOptions.length > 0 && (
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Factory Customization Capabilities
                </div>
                <div className="space-y-3">
                  {product.customizationOptions.map((opt, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">{opt.name}:</label>
                      <div className="flex flex-wrap gap-2">
                        {opt.options.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenRFQModal(product.title, product.category)}
                className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit RFQ / Bulk Order Inquiry</span>
              </button>

              <button
                onClick={() => setSampleModalOpen(true)}
                className="py-3.5 px-6 rounded-xl border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-blue-700" />
                <span>Request Sample</span>
              </button>
            </div>
          </div>
        </div>

        {/* Technical Specification Sheet Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Layers className="w-5 h-5 text-blue-700" />
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Technical Specification Sheet & Compliance Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, val], idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <span className="font-semibold text-slate-500">{key}</span>
                <strong className="text-slate-900 text-right ml-4">{val}</strong>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-xl text-xs text-blue-900 leading-relaxed">
            <strong>Description & Testing Overview: </strong>
            {product.description}
          </div>
        </div>

        {/* Verified Supplier Info Card */}
        {supplier && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white font-extrabold flex items-center justify-center text-lg">
                  {supplier.companyName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">{supplier.companyName}</h3>
                    {supplier.verified && (
                      <span className="text-emerald-700 font-bold bg-emerald-50 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Audited Factory
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {supplier.industrialZone} • Trade License: {supplier.tradeLicenseNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${supplier.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>WhatsApp Liaison</span>
                </a>

                <button
                  onClick={() => onSelectSupplier(supplier.id)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  View Full Profile & Facility
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400">Established</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">{supplier.establishedYear}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400">Workforce</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">{supplier.employeeCount.toLocaleString()} Workers</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400">Response Speed</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">{supplier.responseRate}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400">Completed Orders</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">{supplier.completedOrdersCount}+ Shipments</div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="font-extrabold text-lg text-slate-900">Similar Products from Verified Factories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p.id)}
                  className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                >
                  <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                  <div className="text-xs space-y-1">
                    <h4 className="font-bold text-slate-800 line-clamp-1 hover:text-blue-700">{p.title}</h4>
                    <div className="text-slate-500">MOQ: {p.moq} {p.moqUnit}</div>
                    <div className="font-extrabold text-blue-900">{formatPrice(p.pricingTiers[0]?.unitPriceBDT || 0)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sample Modal */}
      <SampleRequestModal
        product={product}
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
      />
    </div>
  );
};
