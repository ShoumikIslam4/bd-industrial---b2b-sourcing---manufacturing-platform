import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  Users,
  Award,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MessageSquareText,
  ArrowLeft,
  Send,
  ExternalLink,
  Layers
} from 'lucide-react';

interface Props {
  supplierId: string;
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
  onOpenRFQModal: (title?: string, category?: string) => void;
}

export const SupplierDetailPage: React.FC<Props> = ({
  supplierId,
  onBack,
  onSelectProduct,
  onOpenRFQModal,
}) => {
  const { suppliers, products, formatPrice } = usePlatform();

  const supplier = suppliers.find(s => s.id === supplierId) || suppliers[0];
  const supplierProducts = products.filter(p => p.supplierId === supplier?.id);

  if (!supplier) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Factory Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold">
          ← Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Suppliers Directory</span>
        </button>

        {/* Hero Factory Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="relative h-60 sm:h-72 bg-slate-900">
            <img
              src={supplier.factoryPhotos[0]}
              alt={supplier.companyName}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-blue-600/80 px-2 py-0.5 rounded">
                    {supplier.businessType}
                  </span>
                  {supplier.verified && (
                    <span className="text-xs font-bold bg-emerald-600 px-2.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>NBR & BIDA AUDITED FACILITY</span>
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {supplier.companyName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{supplier.factoryLocation}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${supplier.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>WhatsApp Factory Desk</span>
                </a>

                <button
                  onClick={() => onOpenRFQModal(undefined, 'garments')}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Factory Quote</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/50 p-4 text-xs">
            <div className="p-2 sm:px-4">
              <span className="text-slate-400 block text-[11px]">Established</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{supplier.establishedYear} ({new Date().getFullYear() - supplier.establishedYear} Years in Operation)</strong>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-slate-400 block text-[11px]">Total Plant Workforce</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{supplier.employeeCount.toLocaleString()} Technicians & Workers</strong>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-slate-400 block text-[11px]">Audit Rating & Response</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">★ {supplier.rating} / 5.0 ({supplier.responseRate})</strong>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-slate-400 block text-[11px]">Minimum Export Order</span>
              <strong className="text-emerald-700 text-sm mt-0.5 block">{formatPrice(supplier.minOrderAmountBDT)}</strong>
            </div>
          </div>
        </div>

        {/* Grid: Compliance credentials & About */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: About & Capabilities (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
              <h2 className="text-base font-extrabold text-slate-900">Factory Overview & History</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {supplier.about}
              </p>
            </div>

            {/* Machinery & Infrastructure */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>Production Line Equipment & Capabilities</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {supplier.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Factory Gallery */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h2 className="text-base font-extrabold text-slate-900">Plant & Workshop Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {supplier.factoryPhotos.map((photo, i) => (
                  <div key={i} className="h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={photo} alt="Factory Unit" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Verified Legal Documents & Contact (1 col) */}
          <div className="space-y-6">
            {/* Audit & Legal Box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-extrabold text-sm text-slate-900">Government & NBR Credentials</h3>
              </div>

              <div className="space-y-3 text-xs divide-y divide-slate-100">
                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px]">Trade License Number:</span>
                  <span className="font-bold text-slate-800 font-mono">{supplier.tradeLicenseNumber}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px]">e-TIN Tax Registration:</span>
                  <span className="font-bold text-slate-800 font-mono">{supplier.tinNumber}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px]">Business Identification Number (BIN):</span>
                  <span className="font-bold text-slate-800 font-mono">{supplier.binNumber}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px]">Physical Audit Accreditation Valid Until:</span>
                  <span className="font-bold text-emerald-700">{supplier.verificationExpiresAt}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-500 font-bold text-[11px] block mb-2">Accredited Certifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {supplier.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 space-y-4 shadow-md">
              <h3 className="font-bold text-sm text-white">Commercial Liaison Department</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{supplier.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{supplier.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{supplier.factoryLocation}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${supplier.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>Chat with Factory Manager</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Products Manufactured by this Factory */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">
              Products Manufactured by {supplier.companyName} ({supplierProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplierProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod.id)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      MOQ: {prod.moq} {prod.moqUnit}
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {prod.title}
                    </h3>
                    <div className="text-base font-extrabold text-blue-900 mt-1">
                      {formatPrice(prod.pricingTiers[0]?.unitPriceBDT || 0)}
                      <span className="text-xs font-normal text-slate-500"> / {prod.moqUnit.slice(0, -1)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRFQModal(prod.title, prod.category);
                    }}
                    className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire / Request RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
