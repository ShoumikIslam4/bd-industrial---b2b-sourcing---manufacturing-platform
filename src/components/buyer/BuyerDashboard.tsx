import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { RFQ, Quotation, Order } from '../../types';
import {
  FileText,
  Send,
  Building,
  Clock,
  Download,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { generateQuotationPDF } from '../../utils/pdfGenerator';

interface Props {
  onBackToSite: () => void;
  onOpenRFQModal: () => void;
}

export const BuyerDashboard: React.FC<Props> = ({ onBackToSite, onOpenRFQModal }) => {
  const {
    currentUser,
    rfqs,
    quotations,
    orders,
    createOrderFromQuotation,
    formatPrice,
    showToast
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'rfqs' | 'comparator' | 'orders' | 'profile'>('rfqs');
  const [selectedRFQId, setSelectedRFQId] = useState<string>(rfqs[0]?.id || '');
  const [deliveryAddress, setDeliveryAddress] = useState('Tejgaon Central Warehousing, Dhaka');

  // Filter buyer specific data
  const myRFQs = rfqs.filter(r => r.buyerEmail === currentUser?.email || r.buyerId === currentUser?.id || currentUser?.role === 'buyer');
  const activeRFQ = rfqs.find(r => r.id === selectedRFQId) || myRFQs[0];
  const matchingQuotes = quotations.filter(q => q.rfqId === activeRFQ?.id);
  const myOrders = orders.filter(o => o.buyerId === currentUser?.id || currentUser?.role === 'buyer');

  const handleAcceptQuote = (quote: Quotation) => {
    createOrderFromQuotation(quote.id, deliveryAddress);
    setActiveTab('orders');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-white font-extrabold flex items-center justify-center text-lg">
              {currentUser?.companyName.slice(0, 2).toUpperCase() || 'BY'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl text-slate-900">
                  {currentUser?.companyName || 'Enterprise Procurement'}
                </h1>
                <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  Institutional Buyer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Contact: {currentUser?.name} • {currentUser?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToSite}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Browse Catalog
            </button>
            <button
              onClick={onOpenRFQModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Create New RFQ</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2">
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'rfqs' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            My RFQs ({myRFQs.length})
          </button>
          <button
            onClick={() => setActiveTab('comparator')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'comparator' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Quotation Comparator
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Active Orders ({myOrders.length})
          </button>
        </div>

        {/* TAB 1: MY RFQS */}
        {activeTab === 'rfqs' && (
          <div className="space-y-4">
            {myRFQs.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-base text-slate-800">No active RFQs found</h3>
                <p className="text-xs text-slate-500">Post a custom RFQ to receive competitive bids from verified manufacturers.</p>
                <button onClick={onOpenRFQModal} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
                  Post RFQ Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {myRFQs.map(rfq => {
                  const rfqQuotes = quotations.filter(q => q.rfqId === rfq.id);
                  return (
                    <div
                      key={rfq.id}
                      className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{rfq.title}</span>
                          <span className="font-mono text-slate-400 text-[10px]">#{rfq.id}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            {rfq.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          Sector: <strong className="text-slate-700">{rfq.category}</strong> • Target Qty: <strong className="text-slate-700">{rfq.targetQuantity.toLocaleString()} {rfq.targetUnit}</strong> • Delivery: {rfq.deliveryDistrict}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          Target Budget: {rfq.targetBudgetBDT ? formatPrice(rfq.targetBudgetBDT) : 'Negotiable'} • Deadline: {rfq.deadlineDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-700 block">
                            {rfqQuotes.length} Quote(s)
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedRFQId(rfq.id);
                            setActiveTab('comparator');
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
                        >
                          Compare Quotes →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUOTATION COMPARATOR */}
        {activeTab === 'comparator' && (
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500">Selected RFQ:</span>
                <select
                  value={selectedRFQId}
                  onChange={e => setSelectedRFQId(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-xl font-bold text-slate-800 bg-slate-50 focus:outline-none"
                >
                  {myRFQs.map(r => (
                    <option key={r.id} value={r.id}>{r.title.slice(0, 45)}... (#{r.id})</option>
                  ))}
                </select>
              </div>

              <div className="text-slate-500">
                Quantity: <strong>{activeRFQ?.targetQuantity.toLocaleString()} {activeRFQ?.targetUnit}</strong>
              </div>
            </div>

            {matchingQuotes.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No supplier quotes submitted yet for this RFQ. Notifications will be sent when verified factories submit bids.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingQuotes.map(quote => (
                  <div
                    key={quote.id}
                    className="p-5 bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-600/60 shadow-xs flex flex-col justify-between space-y-4 text-xs transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                          Verified Bid
                        </span>
                        <span className="font-mono text-slate-400 text-[10px]">#{quote.id}</span>
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-slate-900">{quote.supplierName}</h4>
                        <div className="text-slate-400 text-[11px] mt-0.5">Valid until: {quote.validityUntil}</div>
                      </div>

                      {/* Pricing Highlight */}
                      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                        <div className="text-slate-500 text-[11px]">Unit Price Offered:</div>
                        <div className="text-2xl font-extrabold text-blue-900">
                          {formatPrice(quote.unitPriceBDT)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Total Contract Value: <strong className="text-slate-900">{formatPrice(quote.totalAmountBDT)}</strong>
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="space-y-1.5 text-slate-600">
                        <div>MOQ Offered: <strong>{quote.moqOffered.toLocaleString()} Pcs</strong></div>
                        <div>Production Lead Time: <strong>{quote.leadTimeDays} business days</strong></div>
                        <div>Payment Terms: <span className="text-slate-700 text-[11px]">{quote.paymentTerms}</span></div>
                        <div className="pt-1 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                          "{quote.notes}"
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => generateQuotationPDF(quote, activeRFQ)}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-700" />
                        <span>Download Official PDF Quote</span>
                      </button>

                      {quote.status !== 'accepted' ? (
                        <button
                          onClick={() => handleAcceptQuote(quote)}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Accept & Issue Purchase Order</span>
                        </button>
                      ) : (
                        <div className="py-2 text-center text-emerald-700 font-bold bg-emerald-50 rounded-xl">
                          ✓ Accepted & in Production
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ACTIVE PRODUCTION ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No active manufacturing orders. Accept a supplier quotation to initialize production milestones.</p>
              </div>
            ) : (
              myOrders.map(order => (
                <div key={order.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-slate-900">{order.productTitle}</h4>
                        <span className="font-mono text-blue-700 text-xs">#{order.id}</span>
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Manufacturer: <strong>{order.supplierName}</strong> • Delivery Destination: {order.deliveryAddress}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-blue-900">{formatPrice(order.totalAmountBDT)}</div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                        {order.currentMilestone.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Milestones Tracker */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Production Timeline:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {order.milestones.map((m, i) => (
                        <div
                          key={m.key}
                          className={`p-3 rounded-xl border ${m.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                        >
                          <div className="flex items-center justify-between font-bold text-[11px]">
                            <span>{i + 1}. {m.label}</span>
                            {m.completed && <span className="text-emerald-700">✓</span>}
                          </div>
                          {m.date && <div className="text-[10px] text-slate-400 mt-1">{m.date}</div>}
                          {m.notes && <div className="text-[10px] text-slate-600 mt-1">{m.notes}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
