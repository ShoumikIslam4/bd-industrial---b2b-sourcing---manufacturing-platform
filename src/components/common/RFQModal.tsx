import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { X, Send, Paperclip, CheckCircle2, Building, DollarSign, Calendar, MapPin, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefilledProductTitle?: string;
  prefilledCategory?: string;
}

export const RFQModal: React.FC<Props> = ({
  isOpen,
  onClose,
  prefilledProductTitle = '',
  prefilledCategory = 'garments',
}) => {
  const { currentUser, createRFQ, language } = usePlatform();

  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState(prefilledProductTitle || '');
  const [category, setCategory] = useState(prefilledCategory || 'garments');
  const [targetQuantity, setTargetQuantity] = useState<number>(5000);
  const [targetUnit, setTargetUnit] = useState('Pieces');
  const [targetBudgetBDT, setTargetBudgetBDT] = useState<number>(1200000);
  const [customRequirements, setCustomRequirements] = useState('');
  const [deliveryDistrict, setDeliveryDistrict] = useState('Dhaka (Tejgaon / Gazipur EPZ)');
  const [deadlineDate, setDeadlineDate] = useState('2026-12-31');
  const [techPackFile, setTechPackFile] = useState<string>('TechPack_Commercial_v1.pdf');

  // Contact info
  const [buyerCompany, setBuyerCompany] = useState(currentUser?.companyName || 'Nordic Commercial Imports');
  const [buyerName, setBuyerName] = useState(currentUser?.name || 'Chief Procurement Officer');
  const [buyerEmail, setBuyerEmail] = useState(currentUser?.email || 'procurement@nordicretail.se');
  const [buyerPhone, setBuyerPhone] = useState(currentUser?.phone || '+880 1711-223344');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    createRFQ({
      buyerId: currentUser ? currentUser.id : `buyer-guest-${Date.now()}`,
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerCompany,
      title,
      category,
      targetQuantity: Number(targetQuantity),
      targetUnit,
      targetBudgetBDT: Number(targetBudgetBDT),
      specifications: {
        'Quality Standard': 'AQL 2.5 Strict Inspection',
        'Required Unit': targetUnit,
        'Tech-Pack Status': 'Confirmed Vector/CAD Specifications Attached',
      },
      customRequirements: customRequirements || 'Standard export packaging with barcode hangtags and verified lab test certificates.',
      attachments: [techPackFile],
      deliveryDistrict,
      deadlineDate,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'bn' ? 'কাস্টম কোটেশন অনুরোধ (RFQ)' : 'Post Custom Request for Quotation (RFQ)'}
              </h3>
              <p className="text-xs text-slate-400">
                Directly matches with verified Bangladesh manufacturers in Gazipur & Narayanganj
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                <span>Step 1 of 2: Product & Technical Requirements</span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product / Manufacturing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10,000 Pcs 180 GSM Combed Cotton Blank Tees or 25,000 5-Ply Cartons"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Category & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Industry Sector
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none bg-white"
                  >
                    <option value="garments">Garments & RMG Knitwear</option>
                    <option value="packaging">Industrial Packaging & Corrugated</option>
                    <option value="jute">Jute & Natural Fiber Sacks</option>
                    <option value="machinery">Precision Engineering & Machinery</option>
                    <option value="textiles">Textiles & Yarns</option>
                    <option value="plastic">Plastics & Polymer Molding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Order Unit
                  </label>
                  <select
                    value={targetUnit}
                    onChange={e => setTargetUnit(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Pieces">Pieces / Units</option>
                    <option value="Cartons">Cartons / Boxes</option>
                    <option value="Kilograms">Kilograms (KG)</option>
                    <option value="Yards">Yards / Meters</option>
                    <option value="Sets">Sets</option>
                  </select>
                </div>
              </div>

              {/* Target Quantity & Target Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Order Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={targetQuantity}
                    onChange={e => setTargetQuantity(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Total Budget (BDT ৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 1500000"
                    value={targetBudgetBDT}
                    onChange={e => setTargetBudgetBDT(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Specifications / Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Specifications & Material Grade
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail fabric GSM, flute structure, yarn count, AQL tolerance, or custom branding requirements..."
                  value={customRequirements}
                  onChange={e => setCustomRequirements(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              {/* Tech-Pack Attachment Simulator */}
              <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-semibold text-slate-800">Attached Spec/Tech-Pack: </span>
                    <span className="text-slate-600">{techPackFile}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTechPackFile(`TechPack_Rev_${Math.floor(Math.random() * 100)}.pdf`)}
                  className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Change File
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer"
                >
                  Proceed to Delivery & Contact →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                <span>Step 2 of 2: Logistics & Procurement Contact</span>
              </div>

              {/* Delivery District & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Delivery Destination in BD</span>
                  </label>
                  <select
                    value={deliveryDistrict}
                    onChange={e => setDeliveryDistrict(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Dhaka (Tejgaon / Central)">Dhaka (Tejgaon / Central Hub)</option>
                    <option value="Gazipur (Konabari / Tongi EPZ)">Gazipur (Konabari / Tongi EPZ)</option>
                    <option value="Narayanganj (Adamjee EPZ)">Narayanganj (Adamjee EPZ)</option>
                    <option value="Chittagong Port (FOB Export Loading)">Chittagong Port (FOB Export Loading)</option>
                    <option value="Dhaka Airport Cargo Village">Dhaka Airport Cargo Village</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Target Delivery Deadline</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={deadlineDate}
                    onChange={e => setDeadlineDate(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Buyer Contact details */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Buyer Organization / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerCompany}
                      onChange={e => setBuyerCompany(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Procurement Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={e => setBuyerEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={e => setBuyerPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Safety notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Guaranteed Supplier Response: </span>
                  Your RFQ will be routed exclusively to verified factories with active trade licenses and compliance audits. You will receive quotes directly in your Buyer Portal within 24 hours.
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit RFQ to Verified Suppliers</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
