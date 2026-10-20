import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Supplier } from '../../types';
import {
  ShieldCheck,
  Building2,
  MapPin,
  Award,
  Users,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  MessageSquareText
} from 'lucide-react';

interface Props {
  onSelectSupplier: (supplierId: string) => void;
  onOpenRFQModal: (title?: string, category?: string) => void;
}

export const SupplierDirectory: React.FC<Props> = ({ onSelectSupplier, onOpenRFQModal }) => {
  const { suppliers, formatPrice, language } = usePlatform();

  const [zoneFilter, setZoneFilter] = useState('all');
  const [certFilter, setCertFilter] = useState('all');

  const zones = [
    { id: 'all', label: 'All Industrial Zones' },
    { id: 'Gazipur', label: 'Gazipur & Konabari' },
    { id: 'Adamjee', label: 'Adamjee EPZ & Narayanganj' },
    { id: 'Tejgaon', label: 'Tejgaon Industrial Area' },
    { id: 'Demra', label: 'Demra Riverfront Corridor' },
    { id: 'Chittagong', label: 'Chittagong EPZ / KEPZ' }
  ];

  const filteredSuppliers = suppliers.filter(s => {
    if (zoneFilter !== 'all' && !s.industrialZone.toLowerCase().includes(zoneFilter.toLowerCase())) {
      return false;
    }
    if (certFilter !== 'all' && !s.certifications.some(c => c.toLowerCase().includes(certFilter.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span>Home</span> <span className="text-slate-300">/</span> <span className="text-slate-800 font-semibold">Suppliers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'যাচাইকৃত কারখানা ও ম্যানুফ্যাকচারার ডিরেক্টরি' : 'Verified Manufacturers & Factories in Bangladesh'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Direct access to compliant industrial plants with verified trade licenses, tax compliance, and physical factory audits
            </p>
          </div>

          <button
            onClick={() => onOpenRFQModal()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Post Custom RFQ to All Factories
          </button>
        </div>

        {/* Filter Strip */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">Filter:</span>
          </div>

          <select
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 hover:bg-white focus:outline-none"
          >
            {zones.map(z => (
              <option key={z.id} value={z.id}>{z.label}</option>
            ))}
          </select>

          <select
            value={certFilter}
            onChange={e => setCertFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 hover:bg-white focus:outline-none"
          >
            <option value="all">All Certifications</option>
            <option value="OEKO-TEX">OEKO-TEX Standard 100</option>
            <option value="BSCI">BSCI Social Compliance</option>
            <option value="ISO 9001">ISO 9001:2015</option>
            <option value="FSC">FSC Paper & Packaging</option>
            <option value="GOTS">GOTS Organic Cotton</option>
          </select>
        </div>

        {/* Supplier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuppliers.map(sup => (
            <div
              key={sup.id}
              onClick={() => onSelectSupplier(sup.id)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={sup.factoryPhotos[0]}
                    alt={sup.companyName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{sup.industrialZone}</span>
                  </div>
                  {sup.verified && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>NBR & BIDA AUDITED</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                      {sup.businessType} • Est. {sup.establishedYear}
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                      {sup.companyName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{sup.factoryLocation}</span>
                    </p>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1.5">
                    {sup.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sup.about}
                  </p>

                  {/* Capabilities Preview */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-700">Core Machinery & Capabilities:</div>
                    <ul className="text-xs text-slate-600 space-y-0.5">
                      {sup.capabilities.slice(0, 2).map((cap, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer info & CTA */}
              <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Workforce</span>
                    <strong className="text-slate-800">{sup.employeeCount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Response</span>
                    <strong className="text-slate-800">{sup.responseRate.split(' ')[0]}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    View Factory & Products <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
