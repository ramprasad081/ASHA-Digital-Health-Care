import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  KeyRound, 
  MapPin, 
  AlertCircle,
  Sparkles,
  Phone
} from 'lucide-react';

export function LoginPage() {
  const { login, demoUsers } = useHealthRecords();
  
  const [identifier, setIdentifier] = useState('ASHA-UP-2026-081');
  const [pin, setPin] = useState('1234');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      const success = login(identifier.trim(), pin.trim());
      if (!success) {
        setErrorMessage('Invalid ASHA ID or PIN. Please check your credentials or click Quick Demo Login below.');
        setLoading(false);
      }
    }, 300);
  };

  const handleQuickDemo = (user) => {
    setIdentifier(user.ashaId);
    setPin(user.pin);
    login(user.ashaId, user.pin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden font-sans">
      
      {/* Background Decorative Blur Spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Login Card Container */}
      <div className="max-w-md w-full relative z-10">
        
        {/* Top Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-900/40 border border-emerald-400/40 mb-3 transform hover:scale-105 transition-transform">
            <HeartHandshake className="w-9 h-9 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ASHA Worker Portal
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-1">
            National Health Mission • Digital Village Health Registry
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div>
              <h2 className="text-base font-bold text-white">
                Authorized Staff Login
              </h2>
              <p className="text-xs text-slate-300">
                Sign in to manage village patient records
              </p>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Secure
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* ASHA ID / Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
                <span>ASHA Registration ID / Mobile</span>
                <span className="text-[10px] text-emerald-300">Default: ASHA-UP-2026-081</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  placeholder="e.g. ASHA-UP-2026-081 or 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/20 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all font-mono"
                />
              </div>
            </div>

            {/* Security PIN */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
                <span>Security PIN (4-Digit)</span>
                <span className="text-[10px] text-emerald-300">Default: 1234</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  maxLength={6}
                  placeholder="••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/20 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all font-mono tracking-widest"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as ASHA Worker</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login Box */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick 1-Click Demo Login:</span>
            </p>

            <div className="space-y-2">
              {demoUsers.map((user) => (
                <button
                  key={user.ashaId}
                  type="button"
                  onClick={() => handleQuickDemo(user)}
                  className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {user.name} ({user.designation})
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{user.village} • {user.wards}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-lg">
                    Demo Login →
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Security Footer */}
        <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted for National Rural Health Mission Field Verification</span>
        </div>

      </div>

    </div>
  );
}
