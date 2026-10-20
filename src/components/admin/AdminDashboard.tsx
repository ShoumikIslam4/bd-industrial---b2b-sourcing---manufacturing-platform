import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Product, Supplier, RFQ, Quotation, Order, CMSPage, UserRole, WebsiteSectionConfig } from '../../types';
import {
  LayoutDashboard,
  Palette,
  FileCode,
  Package,
  Factory,
  Users,
  Send,
  ShoppingBag,
  Share2,
  Settings,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  Eye,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Smartphone,
  Monitor,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Printer,
  Lock,
  Mail,
  KeyRound,
  EyeOff,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { exportProductsToCSV, parseProductsCSV } from '../../utils/csvHelper';
import { generateQuotationPDF } from '../../utils/pdfGenerator';

interface Props {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<Props> = ({ onBackToSite }) => {
  const {
    currentUser,
    loginWithCredentials,
    logout,
    users,
    updateUserStatus,
    updateUserRole,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    importProducts,
    suppliers,
    updateSupplierVerification,
    updateSupplierProfile,
    rfqs,
    updateRFQStatus,
    quotations,
    createQuotation,
    updateQuotationStatus,
    orders,
    updateOrderMilestone,
    websiteConfig,
    draftWebsiteConfig,
    updateDraftWebsiteConfig,
    publishWebsiteConfig,
    rollbackWebsiteConfig,
    reorderSections,
    cmsPages,
    saveCMSPage,
    deleteCMSPage,
    auditLogs,
    formatPrice,
    currency,
    setCurrency,
    language,
    setLanguage,
    showToast
  } = usePlatform();

  // Admin gate form states (when unauthenticated)
  const [adminGateEmail, setAdminGateEmail] = useState('admin@bdsource.com.bd');
  const [adminGatePassword, setAdminGatePassword] = useState('');
  const [showGatePassword, setShowGatePassword] = useState(false);
  const [gateError, setGateError] = useState('');
  const [isGateLoading, setIsGateLoading] = useState(false);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'builder' | 'design' | 'pages' | 'products' | 'suppliers' | 'users' | 'rfqs' | 'orders' | 'marketing' | 'settings'
  >('overview');

  // Sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search in admin
  const [adminSearch, setAdminSearch] = useState('');

  // Builder preview device
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Product modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // CMS Page modal
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('garments');
  const [newSubCategory, setNewSubCategory] = useState('Knitwear');
  const [newSku, setNewSku] = useState('');
  const [newMoq, setNewMoq] = useState(500);
  const [newMoqUnit, setNewMoqUnit] = useState('Pieces');
  const [newBasePrice, setNewBasePrice] = useState(280);
  const [newLeadTime, setNewLeadTime] = useState(14);
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80');
  const [newSupplierId, setNewSupplierId] = useState('sup-1');

  // New quote modal
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [targetRFQ, setTargetRFQ] = useState<RFQ | null>(null);
  const [quoteUnitPrice, setQuoteUnitPrice] = useState<number>(220);
  const [quoteLeadTime, setQuoteLeadTime] = useState<number>(20);
  const [quoteNotes, setQuoteNotes] = useState('Official factory direct quotation with FOB delivery.');

  // Handle open add product
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setNewTitle('');
    setNewCategory('garments');
    setNewSubCategory('Knitwear');
    setNewSku(`BD-SKU-${Date.now().toString().slice(-4)}`);
    setNewMoq(500);
    setNewMoqUnit('Pieces');
    setNewBasePrice(280);
    setNewLeadTime(14);
    setNewDescription('High-volume export grade commercial manufacturing.');
    setNewSupplierId(suppliers[0]?.id || 'sup-1');
    setProductModalOpen(true);
  };

  // Handle edit product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setNewTitle(prod.title);
    setNewCategory(prod.category);
    setNewSubCategory(prod.subCategory);
    setNewSku(prod.sku);
    setNewMoq(prod.moq);
    setNewMoqUnit(prod.moqUnit);
    setNewBasePrice(prod.pricingTiers[0]?.unitPriceBDT || 200);
    setNewLeadTime(prod.leadTimeDays);
    setNewDescription(prod.description);
    setNewImage(prod.images[0] || '');
    setNewSupplierId(prod.supplierId);
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === newSupplierId) || suppliers[0];

    const prodPayload = {
      supplierId: newSupplierId,
      supplierName: sup ? sup.companyName : 'Apex Composite Knitwear Ltd.',
      supplierVerified: sup ? sup.verified : true,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      subCategory: newSubCategory,
      description: newDescription,
      images: [newImage],
      sku: newSku,
      moq: Number(newMoq),
      moqUnit: newMoqUnit,
      pricingTiers: [
        { minQty: Number(newMoq), maxQty: Number(newMoq) * 4, unitPriceBDT: Number(newBasePrice) },
        { minQty: Number(newMoq) * 4 + 1, unitPriceBDT: Math.round(Number(newBasePrice) * 0.88) }
      ],
      specifications: {
        'Quality Standard': 'Industrial Manufacturing Specification',
        'Testing Requirement': 'AQL 2.5 Strict Pass',
        'Batch Origin': 'Gazipur / Narayanganj, Bangladesh'
      },
      customizationOptions: [
        { name: 'Branding', options: ['Silk Screen', 'Woven Label', 'Heat Transfer'] }
      ],
      leadTimeDays: Number(newLeadTime),
      sampleAvailable: true,
      samplePriceBDT: Math.round(Number(newBasePrice) * 1.5),
      stockStatus: 'made_to_order' as const,
      featured: true,
      popular: true,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, prodPayload);
    } else {
      addProduct(prodPayload);
    }
    setProductModalOpen(false);
  };

  // CSV Import handler
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      if (text) {
        const parsed = parseProductsCSV(text);
        if (parsed.length > 0) {
          importProducts(parsed);
        } else {
          showToast('No valid product rows parsed from CSV', 'error');
        }
      }
    };
    reader.readAsText(file);
  };

  // Section Move Up/Down in Visual Builder
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const currentSections = [...draftWebsiteConfig.sections].sort((a, b) => a.order - b.order);
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentSections.length) return;

    // Swap orders
    const tempOrder = currentSections[index].order;
    currentSections[index].order = currentSections[targetIdx].order;
    currentSections[targetIdx].order = tempOrder;

    reorderSections(currentSections);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const updated = draftWebsiteConfig.sections.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s);
    reorderSections(updated);
  };

  // Submit Quote on behalf of supplier
  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRFQ) return;

    const sup = suppliers[0];
    const unitP = Number(quoteUnitPrice);
    const totalP = unitP * targetRFQ.targetQuantity;

    createQuotation({
      rfqId: targetRFQ.id,
      rfqTitle: targetRFQ.title,
      supplierId: sup.id,
      supplierName: sup.companyName,
      supplierEmail: sup.contactEmail,
      buyerId: targetRFQ.buyerId,
      unitPriceBDT: unitP,
      totalAmountBDT: totalP,
      moqOffered: targetRFQ.targetQuantity,
      leadTimeDays: Number(quoteLeadTime),
      validityUntil: '2026-12-31',
      notes: quoteNotes,
      sampleOffered: true,
      paymentTerms: '30% Advance T/T, 70% against B/L copy or Irrevocable L/C at sight',
    });

    setQuoteModalOpen(false);
  };

  // Analytics Metrics
  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmountBDT, 0) + 12850000;
  const verifiedCount = suppliers.filter(s => s.verified).length;

  // Authentication Guard: Check if current user is an authorized admin
  const isAuthorizedAdmin = currentUser && (currentUser.role === 'superadmin' || currentUser.role === 'admin');

  const handleAdminGateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setGateError('');

    if (!adminGateEmail || !adminGatePassword) {
      setGateError('Please enter both administrator email and password.');
      return;
    }

    setIsGateLoading(true);
    setTimeout(() => {
      const result = loginWithCredentials(adminGateEmail, adminGatePassword);
      setIsGateLoading(false);

      if (!result.success || !result.user) {
        setGateError(result.message || 'Invalid administrator credentials.');
      } else if (result.user.role !== 'superadmin' && result.user.role !== 'admin') {
        setGateError('This account does not have administrative dashboard privileges.');
      } else {
        setGateError('');
      }
    }, 250);
  };

  const autoFillAdminGate = () => {
    setAdminGateEmail('admin@bdsource.com.bd');
    setAdminGatePassword('admin123456');
    setGateError('');
  };

  // If user is not logged in as admin, show the Admin Gate Screen
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative font-sans">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 items-center justify-center mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Admin Control Center
            </h1>
            <p className="text-xs text-slate-400">
              Authorized access only. One-click anonymous login has been disabled for dashboard security.
            </p>
          </div>

          {/* Demo Credentials Callout */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin Demo Credentials</span>
              </div>
              <button
                type="button"
                onClick={autoFillAdminGate}
                className="text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700 transition-colors cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
                <span className="text-slate-500 text-[10px] block uppercase">Email:</span>
                <span className="text-slate-200 select-all font-semibold">admin@bdsource.com.bd</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
                <span className="text-slate-500 text-[10px] block uppercase">Password:</span>
                <span className="text-slate-200 select-all font-semibold">admin123456</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {gateError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>{gateError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAdminGateLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@bdsource.com.bd"
                  value={adminGateEmail}
                  onChange={e => setAdminGateEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Master Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showGatePassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={adminGatePassword}
                  onChange={e => setAdminGatePassword(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowGatePassword(!showGatePassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showGatePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGateLoading}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isGateLoading ? 'Verifying Credentials...' : 'Sign In to Admin Dashboard'}</span>
            </button>
          </form>

          {/* Back to site action */}
          <div className="text-center pt-2 border-t border-slate-800">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-200 shrink-0 z-30`}
      >
        <div>
          {/* Logo & Platform Info */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-sm">
                  BD
                </div>
                <div>
                  <h1 className="font-extrabold text-sm text-white leading-tight">Admin Console</h1>
                  <span className="text-[10px] text-emerald-400 font-semibold block">Full Website Control</span>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 hover:text-white p-1 rounded-lg text-xs"
              title="Toggle sidebar"
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-1 text-xs">
            {[
              { id: 'overview', label: 'Overview & Metrics', icon: LayoutDashboard },
              { id: 'builder', label: 'Visual Website Builder', icon: Monitor, badge: 'Live CMS' },
              { id: 'design', label: 'Global Design Settings', icon: Palette },
              { id: 'pages', label: 'Page & CMS Manager', icon: FileCode },
              { id: 'products', label: 'Product Catalog CRUD', icon: Package, count: products.length },
              { id: 'suppliers', label: 'Supplier Verification', icon: Factory, count: suppliers.length },
              { id: 'users', label: 'Buyers & User Roles', icon: Users, count: users.length },
              { id: 'rfqs', label: 'RFQs & Quotes Hub', icon: Send, count: rfqs.length },
              { id: 'orders', label: 'Orders & Production', icon: ShoppingBag, count: orders.length },
              { id: 'marketing', label: 'Marketing & SEO', icon: Share2 },
              { id: 'settings', label: 'System & Audit Logs', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${isActive ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 font-medium'}`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between truncate text-left">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && (
                        <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Switch back to public site */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 text-xs font-bold transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            {!sidebarCollapsed && <span>View Live Website</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-14 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-sm sm:text-base font-bold text-white capitalize">
              {activeTab.replace('_', ' ')}
            </h2>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Super Admin: {currentUser?.name} ({currentUser?.email})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Currency Toggle */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400">Currency:</span>
              <button
                onClick={() => setCurrency('BDT')}
                className={`px-1.5 py-0.5 rounded font-bold ${currency === 'BDT' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                BDT
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded font-bold ${currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                USD
              </button>
            </div>

            <button
              onClick={onBackToSite}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>

            <button
              onClick={() => {
                logout();
                onBackToSite();
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              title="Sign Out & Lock Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Platform GMV</span>
                  <div className="text-2xl font-extrabold text-emerald-400 tracking-tight">
                    {formatPrice(totalGMV)}
                  </div>
                  <div className="text-[11px] text-emerald-500 font-medium">↑ +24.8% from last month</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active RFQs</span>
                  <div className="text-2xl font-extrabold text-blue-400 tracking-tight">
                    {rfqs.length} Inquiries
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Average 2.4 quotes per inquiry</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Verified Factories</span>
                  <div className="text-2xl font-extrabold text-white tracking-tight">
                    {verifiedCount} of {suppliers.length}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Gazipur, Narayanganj & CEPZ</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Production Orders</span>
                  <div className="text-2xl font-extrabold text-amber-400 tracking-tight">
                    {orders.length} Active
                  </div>
                  <div className="text-[11px] text-amber-500 font-medium">99.4% on-schedule dispatch</div>
                </div>
              </div>

              {/* Quick Actions & Recent RFQs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 cols: Recent RFQs */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <h3 className="font-bold text-sm text-white">Recent Buyer Requests for Quotation (RFQs)</h3>
                    <button onClick={() => setActiveTab('rfqs')} className="text-xs text-blue-400 hover:underline">
                      View all ({rfqs.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {rfqs.map(r => (
                      <div key={r.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-between text-xs">
                        <div className="space-y-1">
                          <div className="font-bold text-white line-clamp-1">{r.title}</div>
                          <div className="text-slate-400">
                            {r.buyerCompany} • Qty: <strong>{r.targetQuantity.toLocaleString()} {r.targetUnit}</strong> • Destination: {r.deliveryDistrict}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-900/60 text-blue-300 border border-blue-700/60">
                            {r.status.replace('_', ' ')}
                          </span>
                          <div className="text-slate-400 text-[10px] mt-1">{r.quotesCount} quote(s)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right col: Quick Operations */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="font-bold text-sm text-white border-b border-slate-800/80 pb-3">Quick Operations</h3>
                  <div className="space-y-2">
                    <button
                      onClick={handleOpenAddProduct}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product Listing</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('builder')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Monitor className="w-4 h-4 text-emerald-400" />
                      <span>Customize Homepage Visuals</span>
                    </button>

                    <button
                      onClick={() => exportProductsToCSV(products)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-blue-400" />
                      <span>Export All Products (CSV)</span>
                    </button>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800 leading-relaxed">
                    Changes made anywhere in this dashboard update the live customer portal and persist to local and cloud database.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL WEBSITE BUILDER */}
          {activeTab === 'builder' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-white">Visual Website Builder & Layout Manager</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live drag/reorder sections, edit hero copy, toggle section visibility, and publish without code.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={rollbackWebsiteConfig}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-800"
                    title="Rollback to previously published version"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rollback</span>
                  </button>

                  <button
                    onClick={publishWebsiteConfig}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/40"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish Changes to Live Site</span>
                  </button>
                </div>
              </div>

              {/* Editor & Live Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Customization Controls (6 cols) */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Hero Section Editor */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      <span>Hero Section Customization</span>
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Badge Pill Text:</label>
                        <input
                          type="text"
                          value={draftWebsiteConfig.hero.badge}
                          onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, badge: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Headline Title:</label>
                        <input
                          type="text"
                          value={draftWebsiteConfig.hero.title}
                          onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, title: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Hero Subtitle / Value Proposition:</label>
                        <textarea
                          rows={3}
                          value={draftWebsiteConfig.hero.subtitle}
                          onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, subtitle: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Primary Button Text:</label>
                          <input
                            type="text"
                            value={draftWebsiteConfig.hero.primaryBtnText}
                            onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, primaryBtnText: e.target.value } })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Secondary Button Text:</label>
                          <input
                            type="text"
                            value={draftWebsiteConfig.hero.secondaryBtnText}
                            onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, secondaryBtnText: e.target.value } })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Stat 1:</label>
                          <input
                            type="text"
                            value={draftWebsiteConfig.hero.stat1Value}
                            onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, stat1Value: e.target.value } })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Stat 2:</label>
                          <input
                            type="text"
                            value={draftWebsiteConfig.hero.stat2Value}
                            onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, stat2Value: e.target.value } })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Stat 3:</label>
                          <input
                            type="text"
                            value={draftWebsiteConfig.hero.stat3Value}
                            onChange={e => updateDraftWebsiteConfig({ hero: { ...draftWebsiteConfig.hero, stat3Value: e.target.value } })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Order & Visibility */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="font-bold text-sm text-white flex items-center justify-between">
                      <span>Homepage Sections Order & Visibility</span>
                      <span className="text-xs text-slate-400 font-normal">Reorder or toggle</span>
                    </h4>

                    <div className="space-y-2 text-xs">
                      {[...draftWebsiteConfig.sections].sort((a, b) => a.order - b.order).map((sec, idx, arr) => (
                        <div
                          key={sec.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-white"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-slate-500 font-bold">{sec.order}</span>
                            <div>
                              <div className="font-bold text-slate-200">{sec.name}</div>
                              <div className="text-[11px] text-slate-400">{sec.subtitle}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Visibility toggle */}
                            <button
                              onClick={() => toggleSectionVisibility(sec.id)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer ${sec.visible ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-500'}`}
                            >
                              {sec.visible ? 'Visible' : 'Hidden'}
                            </button>

                            {/* Move Up/Down */}
                            <div className="flex items-center gap-0.5">
                              <button
                                disabled={idx === 0}
                                onClick={() => moveSection(idx, 'up')}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                                title="Move section up"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={idx === arr.length - 1}
                                onClick={() => moveSection(idx, 'down')}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                                title="Move section down"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Real-time Visual Device Simulator Preview (6 cols) */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="font-semibold">Interactive Live Simulation:</span>
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1.5 rounded transition-colors ${previewDevice === 'desktop' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
                        title="Desktop view"
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1.5 rounded transition-colors ${previewDevice === 'mobile' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
                        title="Mobile view"
                      >
                        <Smartphone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className={`mx-auto bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 transition-all overflow-hidden ${previewDevice === 'mobile' ? 'max-w-xs' : 'w-full'}`}>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white space-y-3">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase bg-blue-950/80 px-2 py-0.5 rounded inline-block">
                        {draftWebsiteConfig.hero.badge}
                      </div>
                      <h3 className="font-extrabold text-base sm:text-lg leading-snug">
                        {draftWebsiteConfig.hero.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {draftWebsiteConfig.hero.subtitle}
                      </p>
                      <div className="flex gap-2 pt-1">
                        <button className="px-3 py-1.5 bg-emerald-600 rounded-lg text-white font-bold text-[11px]">
                          {draftWebsiteConfig.hero.primaryBtnText}
                        </button>
                        <button className="px-3 py-1.5 bg-slate-800 rounded-lg text-white font-semibold text-[11px]">
                          {draftWebsiteConfig.hero.secondaryBtnText}
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-800 text-center">
                        <div>
                          <div className="font-bold text-xs">{draftWebsiteConfig.hero.stat1Value}</div>
                          <div className="text-[9px] text-slate-400">{draftWebsiteConfig.hero.stat1Label}</div>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-emerald-400">{draftWebsiteConfig.hero.stat2Value}</div>
                          <div className="text-[9px] text-slate-400">{draftWebsiteConfig.hero.stat2Label}</div>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-blue-400">{draftWebsiteConfig.hero.stat3Value}</div>
                          <div className="text-[9px] text-slate-400">{draftWebsiteConfig.hero.stat3Label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GLOBAL DESIGN SETTINGS */}
          {activeTab === 'design' && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
              <h3 className="font-bold text-base text-white">Global Theme, Brand & Navigation Settings</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {/* Announcement Bar */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">Header Announcement Bar</h4>
                    <input
                      type="checkbox"
                      checked={draftWebsiteConfig.announcement.visible}
                      onChange={e => updateDraftWebsiteConfig({ announcement: { ...draftWebsiteConfig.announcement, visible: e.target.checked } })}
                      className="cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Banner Announcement Text:</label>
                    <input
                      type="text"
                      value={draftWebsiteConfig.announcement.text}
                      onChange={e => updateDraftWebsiteConfig({ announcement: { ...draftWebsiteConfig.announcement, text: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">Action Link Text:</label>
                      <input
                        type="text"
                        value={draftWebsiteConfig.announcement.linkText}
                        onChange={e => updateDraftWebsiteConfig({ announcement: { ...draftWebsiteConfig.announcement, linkText: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Action Link Route:</label>
                      <input
                        type="text"
                        value={draftWebsiteConfig.announcement.linkUrl}
                        onChange={e => updateDraftWebsiteConfig({ announcement: { ...draftWebsiteConfig.announcement, linkUrl: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Configuration */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-sm text-white">Footer & Contact Information</h4>
                  <div>
                    <label className="block text-slate-400 mb-1">Legal Entity / Platform Company Name:</label>
                    <input
                      type="text"
                      value={draftWebsiteConfig.footer.companyName}
                      onChange={e => updateDraftWebsiteConfig({ footer: { ...draftWebsiteConfig.footer, companyName: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Corporate Address in Dhaka:</label>
                    <input
                      type="text"
                      value={draftWebsiteConfig.footer.address}
                      onChange={e => updateDraftWebsiteConfig({ footer: { ...draftWebsiteConfig.footer, address: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">Phone Hotline:</label>
                      <input
                        type="text"
                        value={draftWebsiteConfig.footer.phone}
                        onChange={e => updateDraftWebsiteConfig({ footer: { ...draftWebsiteConfig.footer, phone: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Procurement Email:</label>
                      <input
                        type="text"
                        value={draftWebsiteConfig.footer.email}
                        onChange={e => updateDraftWebsiteConfig({ footer: { ...draftWebsiteConfig.footer, email: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={publishWebsiteConfig}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save & Publish Design Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PAGE & CMS MANAGER */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-white">Content Pages & Rich-Text CMS</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Manage About, How It Works, FAQ, and custom policy pages.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingPage({
                      id: `page-${Date.now()}`,
                      slug: 'custom-guide',
                      title: 'New Industrial Sourcing Guide',
                      content: '# New Guide\n\nContent details here...',
                      seoTitle: 'Guide | BD-Industrial',
                      seoDescription: 'Guide description',
                      published: true,
                      updatedAt: new Date().toISOString()
                    });
                    setPageModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New CMS Page</span>
                </button>
              </div>

              <div className="space-y-3">
                {cmsPages.map(page => (
                  <div key={page.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">{page.title}</h4>
                        <span className="font-mono text-blue-400 text-[11px]">/{page.slug}</span>
                        {page.published ? (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">Published</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">Draft</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">
                        SEO Title: {page.seoTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingPage(page);
                          setPageModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold border border-slate-800 cursor-pointer"
                      >
                        Edit Page
                      </button>
                      <button
                        onClick={() => deleteCMSPage(page.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 border border-rose-800/60 cursor-pointer"
                        title="Delete page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCT MANAGEMENT (CRUD & CSV) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-white">Product Catalog Management</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Total listings: <strong>{products.length}</strong> • Full CRUD with CSV import & export
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <label className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import CSV</span>
                    <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
                  </label>

                  <button
                    onClick={() => exportProductsToCSV(products)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleOpenAddProduct}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Product Table */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Product Title & SKU</th>
                      <th className="p-3.5">Manufacturer</th>
                      <th className="p-3.5">Sector</th>
                      <th className="p-3.5">MOQ</th>
                      <th className="p-3.5">Base Price</th>
                      <th className="p-3.5">Lead Time</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={p.images[0]} alt={p.title} className="w-10 h-10 object-cover rounded-lg shrink-0 border border-slate-800" />
                          <div>
                            <div className="font-bold text-white line-clamp-1 max-w-xs">{p.title}</div>
                            <div className="text-[10px] text-slate-500 font-mono">SKU: {p.sku}</div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium">{p.supplierName}</td>
                        <td className="p-3.5 uppercase font-bold text-[10px] text-blue-400">{p.category}</td>
                        <td className="p-3.5 text-slate-300">{p.moq} {p.moqUnit}</td>
                        <td className="p-3.5 font-bold text-emerald-400">{formatPrice(p.pricingTiers[0]?.unitPriceBDT || 0)}</td>
                        <td className="p-3.5 text-slate-400">{p.leadTimeDays}d</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1 text-slate-400 hover:text-blue-400 cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SUPPLIER VERIFICATION */}
          {activeTab === 'suppliers' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="text-base font-extrabold text-white">Factory Verification & NBR Compliance</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verify trade licenses, National Board of Revenue (NBR) e-TIN & BIN registrations, and audit accreditations.
                </p>
              </div>

              <div className="space-y-4">
                {suppliers.map(sup => (
                  <div key={sup.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="flex items-start gap-4">
                      <img src={sup.factoryPhotos[0]} alt={sup.companyName} className="w-20 h-20 object-cover rounded-xl shrink-0 border border-slate-800" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{sup.companyName}</h4>
                          {sup.verified ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              VERIFIED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-bold border border-amber-800">
                              PENDING AUDIT
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400">
                          {sup.industrialZone} • {sup.employeeCount.toLocaleString()} workers • Est. {sup.establishedYear}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Trade Lic: {sup.tradeLicenseNumber} | TIN: {sup.tinNumber} | BIN: {sup.binNumber}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => updateSupplierVerification(sup.id, !sup.verified)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${sup.verified ? 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                      >
                        {sup.verified ? 'Revoke Verification' : 'Approve & Verify Factory'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="text-base font-extrabold text-white">User Accounts & Role Permissions</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage buyer corporate accounts, factory supplier accounts, and platform super administrators.</p>
              </div>

              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Name & Organization</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-slate-900/50">
                        <td className="p-3.5">
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-slate-500 text-[11px]">{u.companyName}</div>
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{u.email}</td>
                        <td className="p-3.5">
                          <select
                            value={u.role}
                            onChange={e => updateUserRole(u.id, e.target.value as UserRole)}
                            className="bg-slate-900 text-slate-200 border border-slate-800 rounded px-2 py-1 text-xs font-semibold focus:outline-none"
                          >
                            <option value="superadmin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="supplier">Supplier</option>
                            <option value="buyer">Buyer</option>
                          </select>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => updateUserStatus(u.id, u.status === 'active' ? 'suspended' : 'active')}
                            className="text-xs font-bold text-blue-400 hover:underline cursor-pointer"
                          >
                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: RFQS & QUOTATIONS (WITH REAL PDF GENERATOR) */}
          {activeTab === 'rfqs' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="text-base font-extrabold text-white">Requests for Quotation (RFQs) & Bids</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Track buyer inquiries, submit binding supplier quotes, and generate official downloadable PDF commercial quotations.
                </p>
              </div>

              {/* RFQ List */}
              <div className="space-y-4">
                {rfqs.map(r => {
                  const rfqQuotes = quotations.filter(q => q.rfqId === r.id);
                  return (
                    <div key={r.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{r.title}</h4>
                            <span className="font-mono text-blue-400 text-[11px]">#{r.id}</span>
                          </div>
                          <div className="text-slate-400 mt-0.5">
                            Buyer: <strong>{r.buyerCompany}</strong> ({r.buyerName}) • Deadline: {r.deadlineDate} • Destination: {r.deliveryDistrict}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-900 text-blue-200">
                            {r.status.replace('_', ' ')}
                          </span>

                          <button
                            onClick={() => {
                              setTargetRFQ(r);
                              setQuoteUnitPrice(220);
                              setQuoteModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs cursor-pointer"
                          >
                            + Submit Quote
                          </button>
                        </div>
                      </div>

                      {/* Submitted Quotations */}
                      <div className="space-y-2">
                        <div className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
                          Received Quotations ({rfqQuotes.length}):
                        </div>
                        {rfqQuotes.length === 0 ? (
                          <div className="text-slate-500 italic py-1">No supplier quotations submitted yet.</div>
                        ) : (
                          rfqQuotes.map(q => (
                            <div key={q.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                              <div>
                                <div className="font-bold text-slate-200">{q.supplierName}</div>
                                <div className="text-slate-400 text-[11px]">
                                  Rate: <strong>{formatPrice(q.unitPriceBDT)}/pc</strong> • Total: <strong className="text-emerald-400">{formatPrice(q.totalAmountBDT)}</strong> • Lead: {q.leadTimeDays}d
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => generateQuotationPDF(q, r)}
                                  className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-700/60 text-blue-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                                  title="Download Official PDF Quotation"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Download PDF Quote</span>
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 9: ORDERS & PRODUCTION PIPELINE */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="text-base font-extrabold text-white">Orders & Production Milestone Pipeline</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Track physical manufacturing stages from raw material sourcing through AQL inspection and container dispatch.
                </p>
              </div>

              <div className="space-y-6">
                {orders.map(ord => (
                  <div key={ord.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{ord.productTitle}</h4>
                          <span className="font-mono text-blue-400 text-[11px]">#{ord.id}</span>
                        </div>
                        <div className="text-slate-400 mt-0.5">
                          Buyer: <strong>{ord.buyerName}</strong> • Manufacturer: <strong>{ord.supplierName}</strong> • Value: <strong className="text-emerald-400">{formatPrice(ord.totalAmountBDT)}</strong>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 font-bold text-[10px] uppercase border border-amber-800">
                          {ord.currentMilestone.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Milestones horizontal tracker */}
                    <div className="space-y-2">
                      <div className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Production Milestones:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {ord.milestones.map(m => (
                          <div
                            key={m.key}
                            className={`p-3 rounded-xl border ${m.completed ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            <div className="flex items-center justify-between font-bold text-[11px]">
                              <span>{m.label}</span>
                              {m.completed && <span>✓</span>}
                            </div>
                            {m.notes && <div className="text-[10px] text-slate-400 mt-1">{m.notes}</div>}
                            {!m.completed && (
                              <button
                                onClick={() => updateOrderMilestone(ord.id, m.key, 'Verified by on-site factory inspector')}
                                className="mt-2 w-full py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 font-bold text-[10px] cursor-pointer"
                              >
                                Mark Completed
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: MARKETING & SEO */}
          {activeTab === 'marketing' && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 text-xs">
              <h3 className="font-bold text-base text-white">Marketing, Metadata & Search Engine Optimization (SEO)</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Global SEO Title Template:</label>
                  <input
                    type="text"
                    defaultValue="BD-Industrial — B2B Sourcing & Manufacturing Platform | Bangladesh"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Meta Description:</label>
                  <textarea
                    rows={3}
                    defaultValue="Directly source verified apparel, corrugated packaging, eco-jute, and industrial spare parts from audited manufacturers in Gazipur, Narayanganj, and Chittagong with BDT wholesale pricing."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Google Analytics 4 Tracking Measurement ID:</label>
                  <input
                    type="text"
                    defaultValue="G-BDINDUSTRIAL2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => showToast('SEO settings updated!')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Save SEO Configurations
                </button>
              </div>
            </div>
          )}

          {/* TAB 11: SYSTEM SETTINGS & AUDIT LOGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                <h3 className="font-bold text-base text-white">System Settings & Defaults</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Platform Currency:</label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
                    >
                      <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                      <option value="USD">USD ($) - United States Dollar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Default Interface Language:</label>
                    <select
                      value={language}
                      onChange={e => setLanguage(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
                    >
                      <option value="en">English</option>
                      <option value="bn">বাংলা (Bengali)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">National Tax / VAT:</label>
                    <input
                      type="text"
                      defaultValue="0% Export / 5% AIT Domestic"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Audit Logs */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                <h3 className="font-bold text-base text-white">Administrative Audit Trail & Security Logs</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-200">{log.action}: {log.details}</div>
                        <div className="text-[10px] text-slate-500">Actor: {log.actorEmail} ({log.actorRole})</div>
                      </div>
                      <div className="text-slate-400 text-[10px] font-mono shrink-0 ml-4">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 text-xs shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {editingProduct ? 'Edit Product Listing' : 'Add New Industrial Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Manufacturing Sector</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="garments">Garments & RMG</option>
                    <option value="packaging">Packaging & Corrugated</option>
                    <option value="jute">Jute & Natural Fiber</option>
                    <option value="machinery">Machinery & Spares</option>
                    <option value="textiles">Textiles & Yarns</option>
                    <option value="plastic">Plastics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Manufacturer</label>
                  <select
                    value={newSupplierId}
                    onChange={e => setNewSupplierId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.companyName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">MOQ</label>
                  <input
                    type="number"
                    value={newMoq}
                    onChange={e => setNewMoq(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Unit</label>
                  <input
                    type="text"
                    value={newMoqUnit}
                    onChange={e => setNewMoqUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Base Price (BDT)</label>
                  <input
                    type="number"
                    value={newBasePrice}
                    onChange={e => setNewBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Photo URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Product Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quote Submission Modal */}
      {quoteModalOpen && targetRFQ && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl">
            <h3 className="text-base font-bold text-white">
              Submit Quotation for RFQ: {targetRFQ.title}
            </h3>

            <form onSubmit={handleSaveQuotation} className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                <div>Buyer: <strong>{targetRFQ.buyerCompany}</strong></div>
                <div>Target Qty: <strong>{targetRFQ.targetQuantity.toLocaleString()} {targetRFQ.targetUnit}</strong></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Unit Price (BDT ৳)</label>
                  <input
                    type="number"
                    required
                    value={quoteUnitPrice}
                    onChange={e => setQuoteUnitPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Lead Time (Days)</label>
                  <input
                    type="number"
                    required
                    value={quoteLeadTime}
                    onChange={e => setQuoteLeadTime(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Total Quoted Value</label>
                <div className="text-lg font-extrabold text-emerald-400 font-mono">
                  {formatPrice(quoteUnitPrice * targetRFQ.targetQuantity)}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Commercial Notes & Specifications</label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={e => setQuoteNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                >
                  Submit Official Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CMS Page Edit Modal */}
      {pageModalOpen && editingPage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 text-xs shadow-2xl">
            <h3 className="text-base font-bold text-white">Edit CMS Page: {editingPage.title}</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Page Title:</label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={e => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">URL Slug:</label>
                <input
                  type="text"
                  value={editingPage.slug}
                  onChange={e => setEditingPage({ ...editingPage, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Content (Markdown):</label>
                <textarea
                  rows={8}
                  value={editingPage.content}
                  onChange={e => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono resize-none text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPageModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveCMSPage(editingPage);
                    setPageModalOpen(false);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save CMS Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
