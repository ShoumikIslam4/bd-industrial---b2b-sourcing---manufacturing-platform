import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Product } from '../../types';
import { X, PackageCheck, Truck, MapPin, Send } from 'lucide-react';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const { currentUser, formatPrice, showToast } = usePlatform();

  const [quantity, setQuantity] = useState(2);
  const [courier, setCourier] = useState('Sundarban Courier Service');
  const [shippingAddress, setShippingAddress] = useState('House 42, Road 11, Banani, Dhaka');
  const [contactPhone, setContactPhone] = useState('+880 1711-223344');
  const [notes, setNotes] = useState('Please send in original size spec with test report.');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Sample request for "${product.title}" submitted to ${product.supplierName}! Courier: ${courier}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base sm:text-lg">Request Pre-Production Sample</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-14 h-14 object-cover rounded-lg border border-slate-200"
            />
            <div className="text-xs">
              <h4 className="font-bold text-slate-800 line-clamp-1">{product.title}</h4>
              <p className="text-slate-500">{product.supplierName}</p>
              <p className="font-semibold text-emerald-700 mt-0.5">
                Sample Fee: {product.samplePriceBDT > 0 ? formatPrice(product.samplePriceBDT) : 'Complimentary upon approval'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sample Units
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Courier Delivery
              </label>
              <select
                value={courier}
                onChange={e => setCourier(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="Sundarban Courier Service">Sundarban Courier (National)</option>
                <option value="SA Paribahan">SA Paribahan Express</option>
                <option value="Paperfly / RedX">Paperfly Next-Day (Dhaka Metro)</option>
                <option value="DHL Express International">DHL Express (Global Air)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Sample Delivery Address in Bangladesh</span>
            </label>
            <input
              type="text"
              required
              value={shippingAddress}
              onChange={e => setShippingAddress(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contact Phone / WhatsApp for Courier Gate Pass
            </label>
            <input
              type="text"
              required
              value={contactPhone}
              onChange={e => setContactPhone(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sample Notes / Size / Color Spec
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Sample Dispatch Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
