import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface Props {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  const { websiteConfig } = usePlatform();

  return (
    <footer className="bg-black text-slate-300 font-sans border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 space-y-12">
        {/* Brand & Established Year Header Row (Matching reference image) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-900 pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-extrabold text-white text-sm">
                M
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">Matrik BD</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Welcome to Matrik BD-Industrial, where precision engineering meets high-volume verified manufacturing.
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-red-600 font-mono">
              EST . 2008
            </div>
            <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
              Accredited Industrial Hub
            </div>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Col 1: Industrial Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Locations</h4>
            <div className="space-y-3 text-slate-400">
              <div>
                <strong className="text-slate-200 block">Gazipur & Konabari</strong>
                <span>Plot 14-18, Kashimpur Industrial Belt, Gazipur</span>
              </div>
              <div>
                <strong className="text-slate-200 block">Adamjee EPZ</strong>
                <span>Sector 2, Narayanganj Industrial Corridor</span>
              </div>
              <div>
                <strong className="text-slate-200 block">Tejgaon Industrial</strong>
                <span>Shaheed Tajuddin Ahmed Sarani, Dhaka</span>
              </div>
            </div>
          </div>

          {/* Col 2: Company Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about-us')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/suppliers')} className="hover:text-white transition-colors cursor-pointer">
                  Audited Factories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  Quality & AQL Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-white transition-colors cursor-pointer">
                  Commercial Terms & L/C FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Solutions</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('/products?category=garments')} className="hover:text-white transition-colors cursor-pointer">
                  RMG Knitwear & Apparel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products?category=packaging')} className="hover:text-white transition-colors cursor-pointer">
                  5-Ply Corrugated Master Boxes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products?category=jute')} className="hover:text-white transition-colors cursor-pointer">
                  Hydrocarbon-Free Jute Bags
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products?category=machinery')} className="hover:text-white transition-colors cursor-pointer">
                  Precision CNC Conveyor Rollers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact & Hotline</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-semibold text-slate-200">+880 (2) 988-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>procurement@bdsource.com.bd</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>Navana Tower, Level 9, Gulshan-1, Dhaka 1212</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/8801711000111"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-red-400 hover:text-white font-bold transition-colors"
                >
                  <span>WhatsApp Factory Liaison (+880)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Compliance Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2008–2026 Matrik BD-Industrial Manufacturing Exchange. Recognized by BIDA & NBR.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>NBR e-TIN & VAT Verified</span>
            </span>
            <span>•</span>
            <button onClick={() => onNavigate('/admin')} className="hover:text-slate-300 transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
