import React, { useState, useEffect } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Header } from './components/common/Header';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { RFQModal } from './components/common/RFQModal';
import { AuthModal } from './components/common/AuthModal';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';

import { HomePage } from './components/public/HomePage';
import { ProductDirectory } from './components/public/ProductDirectory';
import { ProductDetailPage } from './components/public/ProductDetailPage';
import { SupplierDirectory } from './components/public/SupplierDirectory';
import { SupplierDetailPage } from './components/public/SupplierDetailPage';
import { CMSPageView } from './components/public/CMSPageView';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { SupplierDashboard } from './components/supplier/SupplierDashboard';

function AppContent() {
  const { currentUser, language } = usePlatform();

  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqPrefillTitle, setRfqPrefillTitle] = useState('');
  const [rfqPrefillCategory, setRfqPrefillCategory] = useState('garments');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Sync route on browser navigation or programmatic
  const handleNavigate = (route: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route.startsWith('/products?category=')) {
      const cat = route.split('=')[1];
      setSelectedCategory(cat);
      setCurrentRoute('/products');
      return;
    }
    setCurrentRoute(route);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    handleNavigate(`/product/${productId}`);
  };

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSupplierId(supplierId);
    handleNavigate(`/supplier/${supplierId}`);
  };

  const handleOpenRFQModal = (title?: string, category?: string) => {
    if (title) setRfqPrefillTitle(title);
    if (category) setRfqPrefillCategory(category);
    setRfqModalOpen(true);
  };

  // Render view based on route
  const renderView = () => {
    if (currentRoute === '/admin') {
      return <AdminDashboard onBackToSite={() => handleNavigate('/')} />;
    }
    if (currentRoute === '/buyer-portal') {
      return (
        <BuyerDashboard
          onBackToSite={() => handleNavigate('/')}
          onOpenRFQModal={() => handleOpenRFQModal()}
        />
      );
    }
    if (currentRoute === '/supplier-portal') {
      return <SupplierDashboard onBackToSite={() => handleNavigate('/')} />;
    }
    if (currentRoute.startsWith('/product/') && selectedProductId) {
      return (
        <ProductDetailPage
          productId={selectedProductId}
          onBack={() => handleNavigate('/products')}
          onOpenRFQModal={handleOpenRFQModal}
          onSelectSupplier={handleSelectSupplier}
          onSelectProduct={handleSelectProduct}
        />
      );
    }
    if (currentRoute.startsWith('/supplier/') && selectedSupplierId) {
      return (
        <SupplierDetailPage
          supplierId={selectedSupplierId}
          onBack={() => handleNavigate('/suppliers')}
          onSelectProduct={handleSelectProduct}
          onOpenRFQModal={handleOpenRFQModal}
        />
      );
    }
    if (currentRoute === '/products') {
      return (
        <ProductDirectory
          onSelectProduct={handleSelectProduct}
          onOpenRFQModal={handleOpenRFQModal}
          initialCategory={selectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      );
    }
    if (currentRoute === '/suppliers') {
      return (
        <SupplierDirectory
          onSelectSupplier={handleSelectSupplier}
          onOpenRFQModal={handleOpenRFQModal}
        />
      );
    }
    if (currentRoute === '/how-it-works') {
      return (
        <CMSPageView
          slug="how-it-works"
          onBack={() => handleNavigate('/')}
          onOpenRFQModal={() => handleOpenRFQModal()}
        />
      );
    }
    if (currentRoute === '/faq') {
      return (
        <CMSPageView
          slug="faq"
          onBack={() => handleNavigate('/')}
          onOpenRFQModal={() => handleOpenRFQModal()}
        />
      );
    }
    if (currentRoute === '/about-us') {
      return (
        <CMSPageView
          slug="about-us"
          onBack={() => handleNavigate('/')}
          onOpenRFQModal={() => handleOpenRFQModal()}
        />
      );
    }
    if (currentRoute === '/industries') {
      return (
        <ProductDirectory
          onSelectProduct={handleSelectProduct}
          onOpenRFQModal={handleOpenRFQModal}
          initialCategory="all"
          searchQuery=""
          setSearchQuery={setSearchQuery}
        />
      );
    }

    // Default: Home Page
    return (
      <HomePage
        onNavigate={handleNavigate}
        onOpenRFQModal={handleOpenRFQModal}
        onSelectProduct={handleSelectProduct}
        onSelectSupplier={handleSelectSupplier}
      />
    );
  };

  const isAdminView = currentRoute === '/admin';

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 ${language === 'bn' ? 'font-bangla' : ''}`}>
      {!isAdminView && <AnnouncementBar onNavigate={handleNavigate} />}
      {!isAdminView && (
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenRFQModal={() => handleOpenRFQModal()}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      <main className="flex-1">
        {renderView()}
      </main>

      {!isAdminView && <Footer onNavigate={handleNavigate} />}

      {/* Floating Elements & Modals */}
      {!isAdminView && <WhatsAppFloatingButton />}
      <ToastContainer />

      <RFQModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        prefilledProductTitle={rfqPrefillTitle}
        prefilledCategory={rfqPrefillCategory}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <AppContent />
    </PlatformProvider>
  );
}
