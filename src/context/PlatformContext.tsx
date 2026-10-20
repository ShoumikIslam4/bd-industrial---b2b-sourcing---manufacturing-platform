import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Supplier,
  Product,
  RFQ,
  Quotation,
  Order,
  WebsiteBuilderConfig,
  CMSPage,
  AuditLog,
  UserRole
} from '../types';
import {
  initialUsers,
  initialSuppliers,
  initialProducts,
  initialRFQs,
  initialQuotations,
  initialOrders,
  initialWebsiteConfig,
  initialCMSPages,
  initialAuditLogs
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface PlatformContextType {
  // Current user & auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginWithCredentials: (email: string, password: string) => { success: boolean; message?: string; user?: User };
  registerUser: (userData: Omit<User, 'id' | 'createdAt'>) => { success: boolean; message?: string; user?: User };
  logout: () => void;
  users: User[];
  updateUserStatus: (userId: string, status: User['status']) => void;
  updateUserRole: (userId: string, role: UserRole) => void;

  // Language & Currency
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  currency: 'BDT' | 'USD';
  setCurrency: (curr: 'BDT' | 'USD') => void;
  formatPrice: (amountBDT: number) => string;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  importProducts: (newProducts: Partial<Product>[]) => void;

  // Suppliers
  suppliers: Supplier[];
  updateSupplierVerification: (id: string, verified: boolean) => void;
  updateSupplierProfile: (id: string, updates: Partial<Supplier>) => void;

  // RFQs
  rfqs: RFQ[];
  createRFQ: (rfqData: Omit<RFQ, 'id' | 'createdAt' | 'quotesCount' | 'status'>) => string;
  updateRFQStatus: (id: string, status: RFQ['status'], assignedSupplierId?: string) => void;

  // Quotations
  quotations: Quotation[];
  createQuotation: (quoteData: Omit<Quotation, 'id' | 'createdAt' | 'status'>) => void;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;

  // Orders
  orders: Order[];
  createOrderFromQuotation: (quotationId: string, deliveryAddress: string) => void;
  updateOrderMilestone: (orderId: string, milestoneKey: string, notes?: string) => void;

  // Website Builder & CMS
  websiteConfig: WebsiteBuilderConfig;
  draftWebsiteConfig: WebsiteBuilderConfig;
  updateDraftWebsiteConfig: (updates: Partial<WebsiteBuilderConfig>) => void;
  publishWebsiteConfig: () => void;
  rollbackWebsiteConfig: () => void;
  reorderSections: (newSections: WebsiteBuilderConfig['sections']) => void;

  // CMS Pages
  cmsPages: CMSPage[];
  saveCMSPage: (page: CMSPage) => void;
  deleteCMSPage: (id: string) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;

  // Feedback & Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'bdsource_users_v2',
  SUPPLIERS: 'bdsource_suppliers_v2',
  PRODUCTS: 'bdsource_products_v2',
  RFQS: 'bdsource_rfqs_v2',
  QUOTATIONS: 'bdsource_quotations_v2',
  ORDERS: 'bdsource_orders_v2',
  WEBSITE_CONFIG: 'bdsource_config_v2',
  SAVED_CONFIG_HISTORY: 'bdsource_config_history_v2',
  CMS_PAGES: 'bdsource_pages_v2',
  AUDIT_LOGS: 'bdsource_audit_v2',
  CURRENT_USER_ID: 'bdsource_current_user_id_v2',
  LANGUAGE: 'bdsource_lang_v2',
  CURRENCY: 'bdsource_curr_v2'
};

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || null;
  });

  const currentUser = currentUserId ? (users.find(u => u.id === currentUserId) || null) : null;

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPPLIERS);
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [rfqs, setRFQs] = useState<RFQ[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RFQS);
    return saved ? JSON.parse(saved) : initialRFQs;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
    return saved ? JSON.parse(saved) : initialQuotations;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [websiteConfig, setWebsiteConfig] = useState<WebsiteBuilderConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WEBSITE_CONFIG);
    return saved ? JSON.parse(saved) : initialWebsiteConfig;
  });

  const [draftWebsiteConfig, setDraftWebsiteConfig] = useState<WebsiteBuilderConfig>(() => websiteConfig);
  const [previousWebsiteConfig, setPreviousWebsiteConfig] = useState<WebsiteBuilderConfig | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_CONFIG_HISTORY);
    return saved ? JSON.parse(saved) : null;
  });

  const [cmsPages, setCMSPages] = useState<CMSPage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CMS_PAGES);
    return saved ? JSON.parse(saved) : initialCMSPages;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [language, setLanguageState] = useState<'en' | 'bn'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as 'en' | 'bn') || 'en';
  });

  const [currency, setCurrencyState] = useState<'BDT' | 'USD'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.CURRENCY) as 'BDT' | 'USD') || 'BDT';
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RFQS, JSON.stringify(rfqs));
  }, [rfqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WEBSITE_CONFIG, JSON.stringify(websiteConfig));
  }, [websiteConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CMS_PAGES, JSON.stringify(cmsPages));
  }, [cmsPages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorEmail: currentUser ? currentUser.email : 'system@bdsource.com.bd',
      actorRole: currentUser ? currentUser.role : 'system',
      action,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const formatPrice = (amountBDT: number): string => {
    if (currency === 'USD') {
      const usdAmount = amountBDT / 122; // approx exchange rate
      return `$${usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `৳${amountBDT.toLocaleString('en-IN')}`;
  };

  const setLanguage = (lang: 'en' | 'bn') => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    showToast(lang === 'bn' ? 'ভাষা বাংলায় পরিবর্তিত হয়েছে' : 'Language switched to English', 'info');
  };

  const setCurrency = (curr: 'BDT' | 'USD') => {
    setCurrencyState(curr);
    localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
    showToast(`Currency set to ${curr}`, 'info');
  };

  const setCurrentUser = (user: User | null) => {
    setCurrentUserId(user ? user.id : null);
  };

  const loginWithCredentials = (email: string, password: string): { success: boolean; message?: string; user?: User } => {
    const trimmedEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === trimmedEmail);
    if (!found) {
      showToast('No user account found with this email.', 'error');
      return { success: false, message: 'No user account found with this email.' };
    }
    const cleanPass = password.trim();
    const expectedPassword = found.password || 'admin123456';
    
    // Check match against user password or recognized demo passwords
    const isValid =
      cleanPass === expectedPassword ||
      (found.role === 'superadmin' && (cleanPass === 'admin123456' || cleanPass === 'AdminPass@2026!')) ||
      (found.role === 'supplier' && (cleanPass === 'supplier123' || cleanPass === 'SupplierPass@2026!')) ||
      (found.role === 'buyer' && (cleanPass === 'buyer123' || cleanPass === 'BuyerPass@2026!'));

    if (!isValid) {
      showToast('Incorrect password. Please verify your credentials.', 'error');
      return { success: false, message: 'Incorrect password. Please verify your credentials.' };
    }
    setCurrentUserId(found.id);
    addAuditLog('USER_LOGIN', `User ${found.email} (${found.role.toUpperCase()}) authenticated`);
    showToast(`Welcome back, ${found.name}!`, 'success');
    return { success: true, user: found };
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('USER_LOGOUT', `User ${currentUser.email} logged out`);
    }
    setCurrentUserId(null);
    showToast('Signed out successfully', 'info');
  };

  const registerUser = (userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message?: string; user?: User } => {
    const exists = users.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (exists) {
      showToast('An account with this email already exists.', 'error');
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    addAuditLog('USER_REGISTER', `New user registered: ${newUser.email} (${newUser.role})`);
    showToast(`Account created! Welcome, ${newUser.name}`, 'success');
    return { success: true, user: newUser };
  };

  const updateUserStatus = (userId: string, status: User['status']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    addAuditLog('UPDATE_USER_STATUS', `Changed status of user ${userId} to ${status}`);
    showToast(`User status updated to ${status}`);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    addAuditLog('UPDATE_USER_ROLE', `Updated user ${userId} role to ${role}`);
    showToast(`User role updated to ${role}`);
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog('ADD_PRODUCT', `Added product: ${newProduct.title} (SKU: ${newProduct.sku})`);
    showToast('Product created successfully');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addAuditLog('UPDATE_PRODUCT', `Updated product: ${id}`);
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    addAuditLog('DELETE_PRODUCT', `Deleted product: ${target ? target.title : id}`);
    showToast('Product deleted from directory');
  };

  const importProducts = (newProducts: Partial<Product>[]) => {
    const fullProducts: Product[] = newProducts.map((p, idx) => ({
      id: p.id || `prod-bulk-${Date.now()}-${idx}`,
      supplierId: p.supplierId || (currentUser?.role === 'supplier' ? 'sup-1' : 'sup-1'),
      supplierName: p.supplierName || 'Verified Industrial Supplier',
      supplierVerified: true,
      title: p.title || 'Untitled Bulk Product',
      slug: p.slug || `bulk-product-${idx}`,
      category: p.category || 'garments',
      subCategory: p.subCategory || 'Industrial',
      description: p.description || 'Imported catalog item',
      images: p.images || ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80'],
      sku: p.sku || `SKU-${Date.now()}-${idx}`,
      moq: p.moq || 100,
      moqUnit: p.moqUnit || 'Pieces',
      pricingTiers: p.pricingTiers || [{ minQty: 100, unitPriceBDT: 250 }],
      specifications: p.specifications || {},
      customizationOptions: p.customizationOptions || [],
      leadTimeDays: p.leadTimeDays || 14,
      sampleAvailable: true,
      samplePriceBDT: 500,
      stockStatus: p.stockStatus || 'made_to_order',
      featured: false,
      popular: false,
      createdAt: new Date().toISOString(),
    }));

    setProducts(prev => [...fullProducts, ...prev]);
    addAuditLog('BULK_IMPORT_PRODUCTS', `Imported ${fullProducts.length} products via CSV`);
    showToast(`Successfully imported ${fullProducts.length} products`);
  };

  // Supplier Management
  const updateSupplierVerification = (id: string, verified: boolean) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, verified } : s));
    // Also update products supplierVerified flag
    setProducts(prev => prev.map(p => p.supplierId === id ? { ...p, supplierVerified: verified } : p));
    addAuditLog('SUPPLIER_VERIFICATION', `${verified ? 'Verified' : 'Unverified'} supplier ${id}`);
    showToast(`Supplier verification status set to ${verified ? 'Verified' : 'Pending Review'}`);
  };

  const updateSupplierProfile = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addAuditLog('UPDATE_SUPPLIER', `Updated supplier profile: ${id}`);
    showToast('Supplier profile updated');
  };

  // RFQ Workflow
  const createRFQ = (rfqData: Omit<RFQ, 'id' | 'createdAt' | 'quotesCount' | 'status'>): string => {
    const newId = `rfq-${Date.now().toString().slice(-4)}`;
    const newRFQ: RFQ = {
      ...rfqData,
      id: newId,
      status: 'open',
      quotesCount: 0,
      createdAt: new Date().toISOString(),
    };
    setRFQs(prev => [newRFQ, ...prev]);
    addAuditLog('CREATE_RFQ', `Buyer ${rfqData.buyerCompany} submitted RFQ: ${rfqData.title}`);
    showToast('RFQ posted successfully! Verified factories will be notified.');
    return newId;
  };

  const updateRFQStatus = (id: string, status: RFQ['status'], assignedSupplierId?: string) => {
    setRFQs(prev => prev.map(r => r.id === id ? { ...r, status, ...(assignedSupplierId ? { assignedSupplierId } : {}) } : r));
    addAuditLog('UPDATE_RFQ_STATUS', `RFQ ${id} status set to ${status}`);
    showToast(`RFQ status updated to ${status}`);
  };

  // Quotation Workflow
  const createQuotation = (quoteData: Omit<Quotation, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: Quotation = {
      ...quoteData,
      id: `quot-${Date.now().toString().slice(-4)}`,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    setQuotations(prev => [newQuote, ...prev]);
    // increment RFQ quotesCount
    setRFQs(prev => prev.map(r => r.id === quoteData.rfqId ? { ...r, quotesCount: r.quotesCount + 1, status: 'quotes_received' } : r));
    addAuditLog('SUBMIT_QUOTATION', `Supplier ${quoteData.supplierName} submitted quotation for ${quoteData.rfqTitle}`);
    showToast('Quotation submitted to buyer successfully');
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    addAuditLog('UPDATE_QUOTATION_STATUS', `Quotation ${id} set to ${status}`);
    showToast(`Quotation marked as ${status}`);
  };

  // Order Workflow
  const createOrderFromQuotation = (quotationId: string, deliveryAddress: string) => {
    const quote = quotations.find(q => q.id === quotationId);
    if (!quote) return;

    const rfq = rfqs.find(r => r.id === quote.rfqId);

    const newOrder: Order = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      rfqId: quote.rfqId,
      quotationId: quote.id,
      buyerId: quote.buyerId,
      buyerName: rfq ? rfq.buyerCompany : 'Buyer Corporate',
      supplierId: quote.supplierId,
      supplierName: quote.supplierName,
      productTitle: quote.rfqTitle,
      quantity: rfq ? rfq.targetQuantity : 1000,
      unitPriceBDT: quote.unitPriceBDT,
      totalAmountBDT: quote.totalAmountBDT,
      currentMilestone: 'order_confirmed',
      milestones: [
        { key: 'order_confirmed', label: 'Order & Purchase Order Confirmed', date: new Date().toISOString().slice(0, 10), completed: true, notes: 'Order approved through platform contract' },
        { key: 'sample_approved', label: 'Pre-Production Sample Approved', completed: false, notes: 'Awaiting lab dips / PPS review' },
        { key: 'raw_material_sourced', label: 'Raw Material Sourced & Inspected', completed: false },
        { key: 'in_production', label: 'Factory Manufacturing / Bulk Assembly', completed: false },
        { key: 'qc_inspection', label: 'Final Quality & Safety Inspection (AQL 2.5)', completed: false },
        { key: 'dispatched', label: 'Dispatched to Delivery Facility', completed: false },
        { key: 'delivered', label: 'Goods Received & Sign-Off', completed: false }
      ],
      createdAt: new Date().toISOString(),
      deliveryAddress,
    };

    setOrders(prev => [newOrder, ...prev]);
    updateQuotationStatus(quotationId, 'accepted');
    if (rfq) {
      updateRFQStatus(rfq.id, 'in_production', quote.supplierId);
    }
    addAuditLog('CREATE_ORDER', `Created production order #${newOrder.id} with ${quote.supplierName}`);
    showToast(`Order #${newOrder.id} created! Production timeline initialized.`);
  };

  const updateOrderMilestone = (orderId: string, milestoneKey: string, notes?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id !== orderId) return ord;
      const updatedMilestones = ord.milestones.map(m => {
        if (m.key === milestoneKey) {
          return { ...m, completed: true, date: new Date().toISOString().slice(0, 10), ...(notes ? { notes } : {}) };
        }
        return m;
      });
      return {
        ...ord,
        currentMilestone: milestoneKey,
        milestones: updatedMilestones,
      };
    }));
    addAuditLog('UPDATE_ORDER_MILESTONE', `Updated Order ${orderId} milestone: ${milestoneKey}`);
    showToast(`Milestone updated to: ${milestoneKey}`);
  };

  // Website Builder
  const updateDraftWebsiteConfig = (updates: Partial<WebsiteBuilderConfig>) => {
    setDraftWebsiteConfig(prev => ({
      ...prev,
      ...updates,
      hero: { ...prev.hero, ...(updates.hero || {}) },
      theme: { ...prev.theme, ...(updates.theme || {}) },
      announcement: { ...prev.announcement, ...(updates.announcement || {}) },
      footer: { ...prev.footer, ...(updates.footer || {}) },
      sections: updates.sections || prev.sections
    }));
  };

  const publishWebsiteConfig = () => {
    setPreviousWebsiteConfig(websiteConfig);
    localStorage.setItem(STORAGE_KEYS.SAVED_CONFIG_HISTORY, JSON.stringify(websiteConfig));
    setWebsiteConfig(draftWebsiteConfig);
    addAuditLog('PUBLISH_WEBSITE_BUILDER', 'Published new visual builder settings to live website');
    showToast('Visual Website Builder configuration published to live site!');
  };

  const rollbackWebsiteConfig = () => {
    if (previousWebsiteConfig) {
      setDraftWebsiteConfig(previousWebsiteConfig);
      setWebsiteConfig(previousWebsiteConfig);
      addAuditLog('ROLLBACK_WEBSITE_CONFIG', 'Rolled back visual website configuration to previous version');
      showToast('Rolled back to previous published version');
    } else {
      showToast('No previous version to rollback to', 'info');
    }
  };

  const reorderSections = (newSections: WebsiteBuilderConfig['sections']) => {
    updateDraftWebsiteConfig({ sections: newSections });
  };

  // CMS Pages
  const saveCMSPage = (page: CMSPage) => {
    setCMSPages(prev => {
      const exists = prev.some(p => p.id === page.id);
      if (exists) {
        return prev.map(p => p.id === page.id ? page : p);
      }
      return [page, ...prev];
    });
    addAuditLog('SAVE_CMS_PAGE', `Saved CMS Page: ${page.title} (/${page.slug})`);
    showToast(`Page "${page.title}" saved successfully`);
  };

  const deleteCMSPage = (id: string) => {
    const target = cmsPages.find(p => p.id === id);
    setCMSPages(prev => prev.filter(p => p.id !== id));
    addAuditLog('DELETE_CMS_PAGE', `Deleted page: ${target?.title || id}`);
    showToast('Page deleted');
  };

  return (
    <PlatformContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginWithCredentials,
        registerUser,
        logout,
        users,
        updateUserStatus,
        updateUserRole,
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        importProducts,
        suppliers,
        updateSupplierVerification,
        updateSupplierProfile,
        rfqs,
        createRFQ,
        updateRFQStatus,
        quotations,
        createQuotation,
        updateQuotationStatus,
        orders,
        createOrderFromQuotation,
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
        addAuditLog,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
