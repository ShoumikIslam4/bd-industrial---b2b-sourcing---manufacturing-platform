import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { RFQ, Quotation, Order, Product } from '../../types';
import {
  Factory,
  Package,
  Send,
  ShoppingBag,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';

interface Props {
  onBackToSite: () => void;
}

export const SupplierDashboard: React.FC<Props> = ({ onBackToSite }) => {
  const {
    currentUser,
    suppliers,
    products,
    rfqs,
    quotations,
    createQuotation,
    orders,
    updateOrderMilestone,
    formatPrice,
    showToast
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'open_rfqs' | 'orders' | 'products' | 'profile'>('open_rfqs');

  // Supplier info
  const mySupplier = suppliers.find(s => s.userId === currentUser?.id) || suppliers[0];
  const myProducts = products.filter(p => p.supplierId === mySupplier?.id);
  const myOrders = orders.filter(o => o.supplierId === mySupplier?.id);

  // Quote form modal
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [targetRFQ, setTargetRFQ] = useState<RFQ | null>(null);
  const [quotedRate, setQuotedRate] = useState<number>(240);
  const [leadTimeDays, setLeadTimeDays] = useState<number>(18);
  const [quoteNotes, setQuoteNotes] = useState('GOTS/Oeko-Tex certified organic production. FOB Chittagong Port.');

  const handleOpenQuoteModal = (rfq: RFQ) => {
    setTargetRFQ(rfq);
    setQuotedRate(240);
    setQuoteModalOpen(true);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRFQ || !mySupplier) return;

    createQuotation({
      rfqId: targetRFQ.id,
      rfqTitle: targetRFQ.title,
      supplierId: mySupplier.id,
      supplierName: mySupplier.companyName,
      supplierEmail: mySupplier.contactEmail,
      buyerId: targetRFQ.buyerId,
      unitPriceBDT: Number(quotedRate),
      totalAmountBDT: Number(quotedRate) * targetRFQ.targetQuantity,
      moqOffered: targetRFQ.targetQuantity,
      leadTimeDays: Number(leadTimeDays),
      validityUntil: '2026-12-31',
      notes: quoteNotes,
      sampleOffered: true,
      paymentTerms: '30% Advance T/T, 70% against B/L or 100% L/C at sight'
    });

    setQuoteModalOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Supplier Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-lg">
              {mySupplier?.companyName.slice(0, 2).toUpperCase() || 'SP'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl text-slate-900">
                  {mySupplier?.companyName || 'Verified Manufacturer'}
                </h1>
                {mySupplier?.verified && (
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Factory
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {mySupplier?.industrialZone} • {mySupplier?.employeeCount.toLocaleString()} Workers • Rating: ★ {mySupplier?.rating}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToSite}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Public Platform
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2">
          <button
            onClick={() => setActiveTab('open_rfqs')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'open_rfqs' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Open Market RFQs ({rfqs.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Production Orders ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'products' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Listed Products ({myProducts.length})
          </button>
        </div>

        {/* TAB 1: OPEN RFQS MARKETPLACE */}
        {activeTab === 'open_rfqs' && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                As a verified manufacturer, your quotations receive top priority placement on buyer comparison dashboards.
              </span>
            </div>

            <div className="space-y-3">
              {rfqs.map(rfq => {
                const alreadyQuoted = quotations.some(q => q.rfqId === rfq.id && q.supplierId === mySupplier?.id);
                return (
                  <div
                    key={rfq.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{rfq.title}</span>
                        <span className="font-mono text-slate-400 text-[10px]">#{rfq.id}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {rfq.category}
                        </span>
                      </div>

                      <div className="text-slate-600">
                        Buyer: <strong>{rfq.buyerCompany}</strong> • Target Qty: <strong>{rfq.targetQuantity.toLocaleString()} {rfq.targetUnit}</strong> • Delivery: {rfq.deliveryDistrict}
                      </div>

                      <div className="text-slate-400 text-[11px]">
                        Target Budget: {rfq.targetBudgetBDT ? formatPrice(rfq.targetBudgetBDT) : 'Negotiable'} • Deadline: {rfq.deadlineDate}
                      </div>

                      <p className="text-slate-500 text-xs italic pt-1">
                        Requirements: "{rfq.customRequirements}"
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {alreadyQuoted ? (
                        <span className="px-3 py-2 bg-slate-100 text-emerald-700 font-bold rounded-xl text-xs">
                          ✓ Quote Submitted
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenQuoteModal(rfq)}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Quote</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE ORDERS & MILESTONES */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                No active production orders assigned to your factory yet.
              </div>
            ) : (
              myOrders.map(order => (
                <div key={order.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{order.productTitle}</h4>
                      <p className="text-slate-500 mt-0.5">
                        Client: <strong>{order.buyerName}</strong> • Contract Total: <strong className="text-emerald-700">{formatPrice(order.totalAmountBDT)}</strong>
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-bold text-[10px] uppercase border border-amber-200">
                      {order.currentMilestone.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Milestones Updater */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Factory Production Status:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {order.milestones.map(m => (
                        <div
                          key={m.key}
                          className={`p-3 rounded-xl border ${m.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                        >
                          <div className="flex items-center justify-between font-bold text-[11px]">
                            <span>{m.label}</span>
                            {m.completed && <span className="text-emerald-700">✓</span>}
                          </div>
                          {m.notes && <div className="text-[10px] text-slate-600 mt-1">{m.notes}</div>}
                          {!m.completed && (
                            <button
                              onClick={() => updateOrderMilestone(order.id, m.key, 'Updated by factory production manager')}
                              className="mt-2 w-full py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer"
                            >
                              Update & Complete Stage
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {myProducts.map(prod => (
                <div key={prod.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                  <img src={prod.images[0]} alt={prod.title} className="w-full h-36 object-cover rounded-xl" />
                  <div>
                    <h4 className="font-bold text-slate-800 line-clamp-1">{prod.title}</h4>
                    <div className="text-slate-500 mt-0.5">MOQ: {prod.moq} {prod.moqUnit} • Lead: {prod.leadTimeDays}d</div>
                    <div className="text-sm font-extrabold text-blue-900 mt-1">
                      {formatPrice(prod.pricingTiers[0]?.unitPriceBDT || 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote Submission Modal */}
      {quoteModalOpen && targetRFQ && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Submit Quotation for: {targetRFQ.title}
            </h3>

            <form onSubmit={handleSubmitQuote} className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                <div>Buyer: <strong>{targetRFQ.buyerCompany}</strong></div>
                <div>Quantity: <strong>{targetRFQ.targetQuantity.toLocaleString()} {targetRFQ.targetUnit}</strong></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Unit Price (BDT ৳)</label>
                  <input
                    type="number"
                    required
                    value={quotedRate}
                    onChange={e => setQuotedRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Lead Time (Days)</label>
                  <input
                    type="number"
                    required
                    value={leadTimeDays}
                    onChange={e => setLeadTimeDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Total Quoted Value</label>
                <div className="text-lg font-extrabold text-emerald-700 font-mono">
                  {formatPrice(quotedRate * targetRFQ.targetQuantity)}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Commercial Notes</label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={e => setQuoteNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Send Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
