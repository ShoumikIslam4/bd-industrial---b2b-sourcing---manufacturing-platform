import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck,
  Building2,
  Menu,
  X,
  ChevronDown,
  Globe,
  Coins,
  Send,
  LogOut,
  LayoutDashboard,
  User,
  Phone,
  Lock,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenRFQModal: () => void;
  onOpenAuthModal: (tab?: 'general' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenRFQModal,
  onOpenAuthModal,
  searchQuery,
  setSearchQuery,
}) => {
  const {
    currentUser,
    logout,
    language,
    setLanguage,
    currency,
    setCurrency,
  } = usePlatform();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 transition-all font-sans">
      {/* Top Utility Bar (Subtle, Clean) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>Matrik BD-Industrial — Verified Manufacturing & Sourcing Exchange</span>
            </span>
            <span className="text-slate-700">|</span>
            <span>EPZ Hubs: Gazipur, Adamjee, Tejgaon, Chittagong</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Phone hotline */}
            <a
              href="tel:+88029881234"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span className="font-medium">+880 (2) 988-1234</span>
            </a>

            <span className="text-slate-700">|</span>

            {/* Currency selector */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              <Coins className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => setCurrency('BDT')}
                className={`px-1 py-0.2 rounded font-bold transition-colors ${
                  currency === 'BDT' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                BDT (৳)
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-1 py-0.2 rounded font-bold transition-colors ${
                  currency === 'USD' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Language toggle */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              <Globe className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 py-0.2 rounded font-bold transition-colors ${
                  language === 'en' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                ENG
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-1 py-0.2 rounded font-bold transition-colors ${
                  language === 'bn' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Row (Matching Matrik Industrial Header) */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            {/* Geometric industrial icon */}
            <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white shadow-xs group-hover:bg-red-600 transition-colors">
              <span className="font-extrabold text-base tracking-tighter text-white">M</span>
            </div>
            <div>
              <div className="font-extrabold text-xl text-slate-950 tracking-tight leading-none flex items-center gap-1.5">
                <span>Matrik</span>
                <span className="text-red-600 text-xs font-bold uppercase tracking-wider">BD</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight block">
                Industrial Manufacturing
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-700">
            <button
              onClick={() => onNavigate('/')}
              className={`hover:text-red-600 transition-colors py-1 cursor-pointer ${
                currentRoute === '/' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('/products')}
              className={`hover:text-red-600 transition-colors py-1 cursor-pointer ${
                currentRoute === '/products' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              Solutions
            </button>
            <button
              onClick={() => onNavigate('/suppliers')}
              className={`hover:text-red-600 transition-colors py-1 cursor-pointer ${
                currentRoute === '/suppliers' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              Factories
            </button>
            <button
              onClick={() => onNavigate('/industries')}
              className={`hover:text-red-600 transition-colors py-1 cursor-pointer ${
                currentRoute === '/industries' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              Industries
            </button>
            <button
              onClick={() => onNavigate('/about-us')}
              className={`hover:text-red-600 transition-colors py-1 cursor-pointer ${
                currentRoute === '/about-us' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('/how-it-works')}
              className={`hover:text-red-600 transition-colors py-1 cursor-pointer ${
                currentRoute === '/how-it-works' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              How It Works
            </button>
          </nav>
        </div>

        {/* Right Actions & Authentication Area */}
        <div className="flex items-center gap-3">
          {/* Post RFQ / Get in Touch Button (Matching reference red button) */}
          <button
            onClick={onOpenRFQModal}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Authentication & Profile Section */}
          {currentUser ? (
            /* Logged in User Profile Dropdown */
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100 text-xs">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">{currentUser.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {currentUser.companyName}
                    </span>
                  </div>

                  <div className="py-1">
                    {/* Role-Specific Portal Button */}
                    {(currentUser.role === 'superadmin' || currentUser.role === 'admin') && (
                      <button
                        onClick={() => {
                          onNavigate('/admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-bold text-slate-800"
                      >
                        <LayoutDashboard className="w-4 h-4 text-red-600" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    {currentUser.role === 'buyer' && (
                      <button
                        onClick={() => {
                          onNavigate('/buyer-portal');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-bold text-slate-800"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-600" />
                        <span>Buyer Procurement Portal</span>
                      </button>
                    )}

                    {currentUser.role === 'supplier' && (
                      <button
                        onClick={() => {
                          onNavigate('/supplier-portal');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-bold text-slate-800"
                      >
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span>Supplier Factory Portal</span>
                      </button>
                    )}

                    {/* Admin Login feature inside user profile */}
                    {currentUser.role !== 'superadmin' && currentUser.role !== 'admin' && (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenAuthModal('admin');
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-slate-700 hover:text-slate-900 border-t border-slate-100 group transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-slate-900 text-red-500 flex items-center justify-center">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-800">Admin Dashboard Login</div>
                            <div className="text-[10px] text-slate-500 font-mono">admin@bdsource.com.bd</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          Auth Required
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2.5 font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest State: Login Buttons */
            <div className="flex items-center gap-2">
              {/* Direct Admin Login Button */}
              <button
                onClick={() => onOpenAuthModal('admin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                title="Admin Dashboard Login"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                <span>Admin Login</span>
              </button>

              {/* General Login Button */}
              <button
                onClick={() => onOpenAuthModal('general')}
                className="px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-xl">
          <div className="flex flex-col gap-2 text-sm font-bold text-slate-800">
            <button
              onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('/products'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg"
            >
              Solutions & Catalog
            </button>
            <button
              onClick={() => { onNavigate('/suppliers'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg"
            >
              Verified Factories
            </button>
            <button
              onClick={() => { onNavigate('/industries'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg"
            >
              Industries
            </button>
            <button
              onClick={() => { onNavigate('/about-us'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg"
            >
              About Platform
            </button>
            <button
              onClick={() => { onNavigate('/how-it-works'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => { onOpenRFQModal(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-red-600 text-white rounded-lg font-bold text-xs uppercase"
            >
              Get in Touch (Post RFQ)
            </button>
            {!currentUser && (
              <button
                onClick={() => { onOpenAuthModal('admin'); setMobileMenuOpen(false); }}
                className="w-full py-2 border border-slate-300 text-slate-800 rounded-lg font-bold text-xs"
              >
                Admin Dashboard Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
