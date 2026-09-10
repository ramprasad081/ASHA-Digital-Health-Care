import { useState, useRef } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { 
  HeartHandshake, 
  Download, 
  Upload, 
  UserPlus, 
  RotateCcw, 
  MapPin, 
  User, 
  ShieldCheck,
  FileText,
  LogOut,
  PhoneCall
} from 'lucide-react';

export function Header({ onNavigateToDashboard, onOpenAddPatient, onOpenReport, onOpenEmergency }) {
  const { 
    t, 
    currentUser,
    logout,
    exportDataAsJSON, 
    importDataFromJSON, 
    resetToInitialData 
  } = useHealthRecords();

  const [importStatus, setImportStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      const res = importDataFromJSON(content);
      if (res.success) {
        setImportStatus({ type: 'success', text: `Successfully restored ${res.count} records!` });
      } else {
        setImportStatus({ type: 'error', text: 'Import error: ' + res.error });
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-md sticky top-0 z-30 border-b border-emerald-500/20 backdrop-blur-md">
      {/* Top Notification Toast if import */}
      {importStatus && (
        <div className={`py-2 px-4 text-center text-sm font-semibold transition-all ${
          importStatus.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          {importStatus.text}
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo and App Title - Clicking opens Dashboard */}
          <div 
            onClick={onNavigateToDashboard}
            className="flex items-center space-x-3 cursor-pointer group hover:opacity-95 transition-all"
            title="Open Dashboard"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner transition-colors">
              <HeartHandshake className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 group-hover:text-emerald-200 transition-colors">
                  {t.appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-700 text-emerald-100 border border-emerald-500">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-300" />
                  NHM Rural
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Authenticated ASHA Worker Badge & Village Info */}
          {currentUser && (
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm bg-emerald-900/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-emerald-700/60 shadow-inner">
              <div className="flex items-center gap-1.5 text-emerald-200">
                <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  {currentUser.name[0]}
                </div>
                <div>
                  <span className="font-bold text-white block leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] text-amber-300 font-mono font-medium">{currentUser.ashaId}</span>
                </div>
              </div>
              <span className="text-emerald-500">•</span>
              <div className="flex items-center gap-1 text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-xs">{currentUser.village}</span>
              </div>
              <span className="text-emerald-500">•</span>
              <button
                onClick={logout}
                title="Logout from ASHA account"
                className="flex items-center gap-1 px-2 py-1 bg-rose-600/80 hover:bg-rose-600 active:scale-95 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ml-1"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">

            {/* Emergency SOS Hotlines Button */}
            <button
              onClick={onOpenEmergency}
              title="24x7 Emergency Ambulance & Hotlines"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs sm:text-sm font-bold border border-rose-400 transition-all cursor-pointer shadow-md active:scale-95 animate-pulse"
            >
              <PhoneCall className="w-4 h-4" />
              <span>SOS 108</span>
            </button>

            {/* Monthly Report Button */}
            <button
              onClick={onOpenReport}
              title={t.tabReport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs sm:text-sm font-medium border border-emerald-500 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>{t.tabReport}</span>
            </button>

            {/* Backup / Export */}
            <button
              onClick={exportDataAsJSON}
              title={t.exportBackup}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium border border-emerald-500/80 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span className="hidden lg:inline">Backup</span>
            </button>

            {/* Hidden file input for import */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".json" 
              className="hidden" 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              title={t.importBackup}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium border border-emerald-500/80 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Upload className="w-4 h-4 text-emerald-200" />
              <span className="hidden lg:inline">Restore</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset to sample demo data?')) {
                  resetToInitialData();
                }
              }}
              title={t.resetData}
              className="p-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs transition-all cursor-pointer border border-emerald-500/80 active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-emerald-200" />
            </button>

            {/* Add Patient Button */}
            <button
              onClick={onOpenAddPatient}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 ml-1"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.registerNew}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
