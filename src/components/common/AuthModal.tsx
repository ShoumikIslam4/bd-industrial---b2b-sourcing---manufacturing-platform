import React, { useState, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { X, ShieldCheck, Factory, ShoppingCart, Lock, Mail, Eye, EyeOff, User, Building, ArrowRight, KeyRound } from 'lucide-react';
import { UserRole } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'general' | 'admin';
  onAdminLoginSuccess?: () => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultTab = 'general',
  onAdminLoginSuccess,
}) => {
  const { loginWithCredentials, registerUser } = usePlatform();

  const [activeTab, setActiveTab] = useState<'general' | 'admin'>(defaultTab);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [signupRole, setSignupRole] = useState<'buyer' | 'supplier'>('buyer');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
    setErrorMessage('');
    setEmail('');
    setPassword('');
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = loginWithCredentials(email, password);
      setIsLoading(false);

      if (result.success && result.user) {
        if (result.user.role === 'superadmin' || result.user.role === 'admin') {
          if (onAdminLoginSuccess) {
            onAdminLoginSuccess();
          }
        }
        onClose();
      } else {
        setErrorMessage(result.message || 'Authentication failed. Please check your credentials.');
      }
    }, 250);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !companyName || !email || !password) {
      setErrorMessage('Please fill in all required registration fields.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = registerUser({
        name,
        companyName,
        email,
        phone: phone || '+880 1700-000000',
        role: signupRole,
        location: 'Dhaka, Bangladesh',
        status: 'active',
        password,
      });
      setIsLoading(false);

      if (result.success) {
        onClose();
      } else {
        setErrorMessage(result.message || 'Registration failed.');
      }
    }, 250);
  };

  const fillAdminCredentials = () => {
    setEmail('admin@bdsource.com.bd');
    setPassword('admin123456');
    setErrorMessage('');
  };

  const fillSupplierCredentials = () => {
    setEmail('sales@apexapparels-bd.com');
    setPassword('supplier123');
    setErrorMessage('');
  };

  const fillBuyerCredentials = () => {
    setEmail('procurement@nordicretail.se');
    setPassword('buyer123');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header Tabs */}
        <div className="bg-slate-950 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-extrabold text-white text-sm">
              M
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                {activeTab === 'admin' ? 'Admin Control Center' : 'BD-Industrial Portal'}
              </h3>
              <p className="text-xs text-slate-400">
                {activeTab === 'admin'
                  ? 'Authorized executive and platform management access'
                  : 'Commercial manufacturing and wholesale procurement'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: General vs Admin */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('general');
              setMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Factory className="w-4 h-4 text-slate-600" />
            <span>Buyer & Supplier Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Admin Dashboard Login</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ADMIN TAB */}
          {activeTab === 'admin' ? (
            <div className="space-y-4">
              {/* Demo Credentials Box for Admin */}
              <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Admin Demo Credentials</span>
                  </div>
                  <button
                    type="button"
                    onClick={fillAdminCredentials}
                    className="text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700 transition-colors cursor-pointer"
                  >
                    Auto-fill Form
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block uppercase">Email:</span>
                    <span className="text-slate-200 select-all">admin@bdsource.com.bd</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block uppercase">Password:</span>
                    <span className="text-slate-200 select-all font-bold">admin123456</span>
                  </div>
                </div>
              </div>

              {/* Admin Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Super Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="admin@bdsource.com.bd"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Master Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl focus:border-red-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Admin Dashboard'}</span>
                </button>
              </form>
            </div>
          ) : (
            /* GENERAL TAB (BUYER & SUPPLIER) */
            <div className="space-y-4">
              {mode === 'login' ? (
                <>
                  {/* Demo Credentials Reference for Buyer & Supplier */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <span>Verified Demo Logins:</span>
                      <span>Click to Auto-fill</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={fillSupplierCredentials}
                        className="text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                          <Factory className="w-3 h-3 text-emerald-600" />
                          <span>Supplier Account</span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">sales@apexapparels-bd.com</div>
                        <div className="text-[10px] text-slate-600 font-mono font-bold mt-0.5">supplier123</div>
                      </button>

                      <button
                        type="button"
                        onClick={fillBuyerCredentials}
                        className="text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                          <ShoppingCart className="w-3 h-3 text-blue-600" />
                          <span>Buyer Account</span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">procurement@nordicretail.se</div>
                        <div className="text-[10px] text-slate-600 font-mono font-bold mt-0.5">buyer123</div>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Work Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="your.name@company.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:border-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl focus:border-red-600 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <span>{isLoading ? 'Signing In...' : 'Sign In to Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="text-center pt-2 text-xs text-slate-500">
                    Don't have an enterprise account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setErrorMessage('');
                      }}
                      className="font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Create Account
                    </button>
                  </div>
                </>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Account Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSignupRole('buyer')}
                        className={`p-2.5 rounded-xl border text-left font-bold cursor-pointer transition-colors ${
                          signupRole === 'buyer'
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Institutional Buyer
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignupRole('supplier')}
                        className={`p-2.5 rounded-xl border text-left font-bold cursor-pointer transition-colors ${
                          signupRole === 'supplier'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Verified Manufacturer
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Company *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="Organization Ltd."
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="corporate@company.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm mt-2 cursor-pointer shadow-md"
                  >
                    {isLoading ? 'Creating Account...' : 'Register Enterprise Account'}
                  </button>

                  <div className="text-center pt-1 text-xs text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
