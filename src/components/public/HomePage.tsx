import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck,
  Building2,
  Package,
  Layers,
  ArrowRight,
  Send,
  CheckCircle2,
  Factory,
  Cpu,
  Clock,
  Play,
  MapPin,
  ChevronRight,
  ExternalLink,
  Award,
  Check,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenRFQModal: (title?: string, category?: string) => void;
  onSelectProduct: (productId: string) => void;
  onSelectSupplier: (supplierId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenRFQModal,
  onSelectProduct,
  onSelectSupplier,
}) => {
  const { websiteConfig, products, suppliers, formatPrice, language } = usePlatform();

  // Active solution tab for the "Innovative Factory Solutions" section
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(0);

  // Active accordion item for the numbered FAQ section
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '01. Is Matrik BD-Industrial Suitable For My Business?',
      a: 'Yes. Whether you are an international apparel importer seeking vertical knitwear composite facilities, a regional consumer brand needing high-speed corrugated cartons, or an industrial plant needing CNC spares, our verified exchange connects you directly with audited, licensed Bangladesh manufacturers with zero middlemen.'
    },
    {
      q: '02. What Is Your Typical Project Timeline?',
      a: 'Production schedules are synchronized with international shipping lanes: ready woven and knit garments typically dispatch within 14 to 30 days depending on fabric milling; export corrugated packaging lines deliver within 7 to 14 days; and precision CNC machine replacement parts take 5 to 10 working days.'
    },
    {
      q: '03. How Do You Handle Permits And Inspections?',
      a: 'Every factory undergoes rigorous legal compliance verification before receiving listing approval: active NBR e-TIN, verified Trade Licenses, Fire Safety Accreditations, and OEKO-TEX / ISO / WRAP certifications. Every production order is backed by mandatory third-party AQL 2.5 quality control before final container sealing.'
    },
    {
      q: '04. How Do You Handle Waste Disposal And Recycling?',
      a: 'Our partner industrial complexes in Gazipur and Narayanganj operate zero-liquid discharge Effluent Treatment Plants (ETP) and post-industrial cotton jhut recycling systems, compliant with strict European chemical management protocols and LEED Platinum green building standards.'
    },
    {
      q: '05. What Are The Minimum Order Quantities (MOQ)?',
      a: 'MOQs are established by individual factories based on production economy: typical RMG orders begin at 300 to 500 pieces per colorway, corrugated packaging starts at 1,000 cartons, and custom metal spares start at 10 to 50 units.'
    }
  ];

  const solutions = [
    {
      title: 'RMG Knitwear & Composite Apparel',
      kicker: 'Garments & Textiles',
      desc: 'LEED Platinum certified vertical composite manufacturing with circular knitting, zero liquid discharge eco-dyeing, and automated Juki sewing lines.',
      specs: 'Monthly capacity: 4.5M Units • AQL 1.5/2.5 strict inspection • OEKO-TEX Standard 100',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
      route: '/products?category=garments'
    },
    {
      title: 'Robotic Assembly & Packaging',
      kicker: 'Corrugated & Automation',
      desc: 'High-speed automated flexographic corrugated carton lines, 5-ply & 7-ply master export shippers, and die-cut mailer production in Adamjee EPZ.',
      specs: 'ECT 44 Edge Crush resistance • FSC Chain of Custody • 18,000 cartons/hour line speed',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
      route: '/products?category=packaging'
    },
    {
      title: 'Eco-Jute & Sustainable Fiber Sacks',
      kicker: 'Natural Composites',
      desc: 'Hydrocarbon-free food grade golden jute sacking sacks, export shopping totes, and river erosion geo-textiles compliant with European food contact standards.',
      specs: '100% Biodegradable • Vegetable oil batching • Rice bran oil food-grade certified',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
      route: '/products?category=jute'
    },
    {
      title: 'Precision Metal & Machinery Spares',
      kicker: 'Tejgaon Light Engineering',
      desc: 'Computerized 5-axis CNC machining, dynamic balanced conveyor rollers, stenter machine replacement parts, and heavy hydraulic repairs.',
      specs: 'BUET Materials verified • Hard chrome 30-micron plating • NSK high-speed bearings',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&auto=format&fit=crop&q=80',
      route: '/products?category=machinery'
    },
    {
      title: 'Supply Chain & Lab Inspections',
      kicker: 'Quality Assurance',
      desc: 'Physical textile and packaging quality testing labs in Dhaka verifying bursting strength, yarn counts, GSM weight tolerance, and international shipment clearance.',
      specs: 'ISO 9001:2015 accredited • SGS / Intertek standard alignment • Chittagong FOB coordination',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80',
      route: '/how-it-works'
    }
  ];

  const articles = [
    {
      title: 'Revolutionizing Production Then Future Of Factories.',
      category: 'FACTORY INNOVATION',
      date: 'OCTOBER 2026',
      readTime: '5 MIN READ',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      summary: 'How robotic CAD cutting and computerized spreading lines in Gazipur are reducing fabric wastage below 2.1%.'
    },
    {
      title: 'Factory Spotlight Technology Efficiency In Manufacturing.',
      category: 'ENGINEERING & AUTOMATION',
      date: 'SEPTEMBER 2026',
      readTime: '4 MIN READ',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
      summary: 'A deep dive into zero liquid discharge effluent treatment plants powering Bangladesh green textile mills.'
    },
    {
      title: 'Pulse Of Manufacturing Factories News & Advances.',
      category: 'SUPPLY CHAIN & LOGISTICS',
      date: 'SEPTEMBER 2026',
      readTime: '6 MIN READ',
      image: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800&auto=format&fit=crop&q=80',
      summary: 'Port of Chittagong fast-track digital customs clearance and direct maritime shipping corridors to Europe.'
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* 1. HERO SECTION (Directly matching reference image layout) */}
      <section className="relative bg-slate-950 text-white overflow-hidden min-h-[580px] sm:min-h-[640px] flex items-center">
        {/* Full-width authentic industrial factory photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=85"
            alt="Modern Factory Operation & High Precision Facility"
            className="w-full h-full object-cover object-center opacity-45 brightness-90 contrast-110"
          />
          {/* Subtle measured directional scrim ensuring crisp 4.5:1 text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-2xl text-balance">
                Modern Factory Operation Innovative Facility.
              </h1>

              {/* Subtitle / Human Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                Direct procurement from certified manufacturers in Gazipur, Adamjee EPZ, and Chittagong. High-volume RMG apparel, industrial packaging, and precision light engineering.
              </p>

              {/* Action Buttons matching the reference image */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenRFQModal()}
                  className="px-7 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-950/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Start A Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/suppliers')}
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Facilities</span>
                </button>
              </div>
            </div>

            {/* Right Badge / Stamp (Circular Stamp from reference image) */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-center p-3 backdrop-blur-xs bg-slate-900/40 shadow-xl">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">EST. 2008</span>
                <span className="font-extrabold text-sm text-white uppercase tracking-tight mt-0.5">VERIFIED</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-widest">FACILITIES</span>
                <div className="w-6 h-0.5 bg-red-500 my-1"></div>
                <span className="text-[9px] text-slate-400">BANGLADESH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "OUR STORY OF MANUFACTURING EXCELLENCE BUILT ON" (From reference image) */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Story Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Kicker */}
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  About Our Story
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Our Story Of Manufacturing Excellence Built On.
              </h2>

              {/* Video reel play affordance */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Play className="w-5 h-5 ml-0.5 text-white fill-white" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Industrial Capabilities Video Showcase
                  </div>
                  <p className="text-xs text-slate-500">
                    Tour our partner industrial complexes in Gazipur, Narayanganj and CEPZ
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bangladesh has built a global reputation as the world's second-largest manufacturing powerhouse. With over 200 LEED-certified green factories and fully audited industrial infrastructure, Matrik BD-Industrial connects discerning enterprise procurement teams directly to factory floor directors.
              </p>

              {/* Who We Are & Our Mission Sub-blocks (Matching reference image) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Who We Are
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A verified institutional exchange connecting qualified manufacturers with buyers across Scandinavia, Europe, North America and domestic retail conglomerates.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Our Mission
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enforcing transparent BDT pricing, guaranteed trade license audits, AQL 2.5 quality inspections, and direct technical collaboration with zero middlemen.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Photo Column (Workers in safety gear on factory floor) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 h-96 sm:h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=85"
                  alt="Factory engineers reviewing robotic assembly operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl text-white flex items-center justify-between border border-slate-800">
                  <div>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">Production Standard</span>
                    <span className="text-xs sm:text-sm font-bold">100% Audited Factory Floor Protocols</span>
                  </div>
                  <button
                    onClick={() => onNavigate('/suppliers')}
                    className="text-xs font-bold text-white hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Audit Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "INNOVATIVE FACTORY SOLUTIONS" (From reference image) */}
      <section className="py-16 sm:py-24 bg-[#F4F6F8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  Our Factory Services
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Innovative Factory Solutions
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/products')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>

          {/* Interactive Industrial Tabs & Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Tabs List */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
              {solutions.map((sol, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSolutionIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeSolutionIdx === idx
                      ? 'bg-white border-red-600/80 shadow-md text-slate-900'
                      : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {sol.kicker}
                    </div>
                    <div className="font-bold text-sm text-slate-900 mt-0.5">
                      {sol.title}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeSolutionIdx === idx ? 'text-red-600 translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right Active Solution Showcase Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden h-64 sm:h-72 bg-slate-900">
                  <img
                    src={solutions[activeSolutionIdx].image}
                    alt={solutions[activeSolutionIdx].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1 rounded-md backdrop-blur-xs">
                    {solutions[activeSolutionIdx].kicker}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {solutions[activeSolutionIdx].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {solutions[activeSolutionIdx].desc}
                  </p>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                    {solutions[activeSolutionIdx].specs}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => onNavigate(solutions[activeSolutionIdx].route)}
                  className="font-bold text-xs text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Browse Catalog Listings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenRFQModal(solutions[activeSolutionIdx].title, 'garments')}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Request Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACTORY LOCATIONS & INDUSTRIAL HUBS (From reference image) */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Locations List */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                  Our Factory Locations
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Strategic Industrial Belts in Bangladesh
              </h2>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span>Gazipur Industrial Belt</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase">RMG & Knitwear</span>
                  </div>
                  <p className="text-slate-400">Plot 14-18, Konabari & Kashimpur Highway, Gazipur</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span>Adamjee EPZ (Narayanganj)</span>
                    <span className="text-[10px] text-blue-400 font-bold uppercase">Corrugated & Poly</span>
                  </div>
                  <p className="text-slate-400">Sector 2, Road 4, Adamjee Export Processing Zone</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span>Tejgaon Heavy Industrial Area</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Precision CNC</span>
                  </div>
                  <p className="text-slate-400">Shaheed Tajuddin Ahmed Sarani, Tejgaon, Dhaka 1208</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('/suppliers')}
                  className="font-bold text-xs uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View All Factory Locations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Industrial Map Graphic */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">REGIONAL LOGISTICS MAP</span>
                    <h3 className="font-bold text-base text-white">Dhaka — Chittagong Industrial Corridor</h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    FOB CHITTAGONG
                  </span>
                </div>

                {/* Map Grid Visual */}
                <div className="h-64 sm:h-72 rounded-xl bg-slate-950/90 border border-slate-800/60 relative p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Nodes on map */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                      <div className="font-bold text-red-400">Gazipur & Konabari</div>
                      <div className="text-[10px] text-slate-400">45 Factories Audited</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                      <div className="font-bold text-blue-400">Dhaka Airport Village</div>
                      <div className="text-[10px] text-slate-400">Express Air Cargo</div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs pt-8">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                      <div className="font-bold text-emerald-400">Adamjee EPZ (Narayanganj)</div>
                      <div className="text-[10px] text-slate-400">Packaging & Textile Mills</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                      <div className="font-bold text-amber-400">Chittagong Port (CEPZ)</div>
                      <div className="text-[10px] text-slate-400">Primary Deep-Sea Port</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Direct bonded warehouse transit to Chittagong Port</span>
                  <span className="font-bold text-white">Average transit: 6–8 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "COMMONLY ASKED QUESTIONS" (Numbered Accordion from reference image) */}
      <section className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading, Context & Director Badge */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  Industrial FAQ & Protocol
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Clear Answers For Enterprise Procurement
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Everything you need to know about factory audits, trade compliance, minimum order quantities, and FOB Chittagong shipping logistics.
              </p>

              {/* Circular badge photo from reference image */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-600 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                    alt="Industrial Advisory Desk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900">
                    Industrial Advisory Desk
                  </div>
                  <p className="text-xs text-slate-500">
                    Have technical custom specifications? Speak directly with our Gazipur production engineers.
                  </p>
                  <button
                    onClick={() => onOpenRFQModal()}
                    className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors mt-1 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Submit Tech-Pack Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Numbered Accordion List matching the reference image */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-xl transition-all ${
                      isOpen
                        ? 'border-slate-300 bg-slate-50/50 shadow-xs'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className={`font-bold text-xs sm:text-sm tracking-tight transition-colors ${
                        isOpen ? 'text-red-600' : 'text-slate-900 hover:text-slate-700'
                      }`}>
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. "FACTORY TRENDS & UPDATES" (From reference image) */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  Our Blog & Articles
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Factory Trends & Updates
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('/about-us')}
                className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/about-us')}
                className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art, idx) => (
              <article
                key={idx}
                className="group border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-slate-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer"
                onClick={() => onNavigate('/about-us')}
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-slate-400 font-medium">
                      {art.date} • {art.readTime}
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors flex items-center gap-1">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "LET'S BUILD DREAM SOMETHING AMAZING" VIVID RED CTA (From reference image) */}
      <section className="py-16 sm:py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-red-200">
              BUILDING YOUR VISION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Let's Build Dream Something Amazing.
            </h2>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl">
              Connect with accredited Bangladesh manufacturers for bulk production runs, custom tech-pack specifications, and export packaging.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenRFQModal()}
              className="px-7 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Start Project
            </button>
            <button
              onClick={() => onNavigate('/suppliers')}
              className="px-6 py-3.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer border border-red-500"
            >
              Explore Factories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
