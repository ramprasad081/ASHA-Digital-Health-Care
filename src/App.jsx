import { useState } from 'react';
import { HealthRecordProvider, useHealthRecords } from './context/HealthRecordContext';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { FrontPage } from './components/FrontPage';
import { DashboardOverview } from './components/DashboardOverview';
import { MaternalRegister } from './components/MaternalRegister';
import { ChildImmunizationRegister } from './components/ChildImmunizationRegister';
import { GeneralPatientRegister } from './components/GeneralPatientRegister';
import { FeaturesSection } from './components/FeaturesSection';
import { AddPatientModal } from './components/AddPatientModal';
import { MonthlyReportModal } from './components/MonthlyReportModal';
import { WhatsAppReminderModal } from './components/WhatsAppReminderModal';
import { EmergencyModal } from './components/EmergencyModal';
import { 
  Home,
  LayoutDashboard, 
  Heart, 
  Baby, 
  Users, 
  Wifi, 
  ShieldCheck, 
  PhoneCall,
  Plus,
  Sparkles
} from 'lucide-react';

function MainApp() {
  const { t, currentUser, totalOverdueDoses, highRiskMothers } = useHealthRecords();
  // Home page is the landing page before clicking Dashboard
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'dashboard' | 'features' | 'maternal' | 'child' | 'all'
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // If ASHA worker is not logged in, show the Worker Login screen
  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Ambient background glow layers matching footer */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/3 right-10 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed -bottom-20 left-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Header */}
      <Header 
        onNavigateToDashboard={() => setActiveTab('home')}
        onOpenAddPatient={() => setIsAddPatientOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main Tab Navigation Bar (Desktop & Tablet) */}
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg sticky top-[69px] z-20 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-2">
            
            {/* Dashboard Tab (First on left) */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.tabDashboard}</span>
            </button>

            <button
              onClick={() => setActiveTab('features')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'features'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-300 bg-purple-950/40 border border-purple-800/40 hover:bg-purple-900/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Features</span>
            </button>

            <button
              onClick={() => setActiveTab('maternal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                activeTab === 'maternal'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>{t.tabMaternal}</span>
              {highRiskMothers.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('child')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                activeTab === 'child'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>{t.tabChild}</span>
              {totalOverdueDoses > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-rose-600 text-white animate-pulse">
                  {totalOverdueDoses}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.tabAll}</span>
            </button>

          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {activeTab === 'home' && (
          <FrontPage
            setActiveTab={setActiveTab}
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverview
            setActiveTab={setActiveTab}
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <FeaturesSection 
              setActiveTab={setActiveTab}
              onOpenAddPatient={() => setIsAddPatientOpen(true)}
              onOpenReport={() => setIsReportOpen(true)}
            />
          </div>
        )}

        {activeTab === 'maternal' && (
          <MaternalRegister
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
          />
        )}

        {activeTab === 'child' && (
          <ChildImmunizationRegister
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
          />
        )}

        {activeTab === 'all' && (
          <GeneralPatientRegister
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
          />
        )}
      </main>

      {/* Bottom Sticky Bar for Mobile Phone Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around z-30 shadow-2xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-semibold transition-colors ${
            activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Dashboard</span>
        </button>

        {/* Quick Add floating circle in middle */}
        <button
          onClick={() => setIsAddPatientOpen(true)}
          className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center -mt-5 shadow-lg active:scale-95 transition-transform border-2 border-slate-900"
          title={t.registerNew}
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setActiveTab('child')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-semibold transition-colors relative ${
            activeTab === 'child' ? 'text-blue-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Baby className="w-5 h-5 mb-0.5" />
          <span>Vaccines</span>
          {totalOverdueDoses > 0 && (
            <span className="absolute top-1 right-2 px-1 rounded-full text-[9px] font-bold bg-rose-600 text-white">
              {totalOverdueDoses}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-semibold transition-colors ${
            activeTab === 'all' ? 'text-white font-bold' : 'text-slate-400'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Register</span>
        </button>
      </div>

      {/* Awesome Rural Health Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-24 md:pb-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Column 1: Brand & Mission (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
                  <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-base tracking-tight">
                    Digital Village Health Record
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    ASHA Frontline Health Surveillance System
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated to empowering frontline Accredited Social Health Activists (ASHA) across rural India with fast, reliable, paperless digital health registers. Designed to eliminate missed child vaccinations and prevent maternal complications through automated alerts.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online / Offline Sync Ready
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  NHM Standard Compliant
                </span>
              </div>
            </div>

            {/* Column 2: Emergency Helplines (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-rose-400" />
                <span>24x7 Village Emergency Hotlines</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Direct one-tap ambulance dispatch and national health grievance lines for frontline workers:
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div 
                  onClick={() => setIsEmergencyOpen(true)} 
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 transition-all group block cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ambulance</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  </div>
                  <div className="text-lg font-black text-rose-400 group-hover:text-rose-300 flex items-center gap-1 mt-0.5">
                    108
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Medical Emergency • View Directory</div>
                </div>

                <a 
                  href="tel:102" 
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-900 transition-all group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Janani Shishu</span>
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  </div>
                  <div className="text-lg font-black text-pink-400 group-hover:text-pink-300 flex items-center gap-1 mt-0.5">
                    102
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Mother & Baby Cab</div>
                </a>

                <a 
                  href="tel:104" 
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Medical Advice</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-lg font-black text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 mt-0.5">
                    104
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Doctor Consultation</div>
                </a>

                <a 
                  href="tel:1098" 
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Childline</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <div className="text-lg font-black text-amber-400 group-hover:text-amber-300 flex items-center gap-1 mt-0.5">
                    1098
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Child Protection</div>
                </a>
              </div>
            </div>

            {/* Column 3: Quick Portals & Schemes (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-emerald-500">›</span> Home Page
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-emerald-500">›</span> Village Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('maternal')}
                    className="hover:text-pink-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-pink-500">›</span> Pregnancy Register
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('child')}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-blue-500">›</span> Vaccine Tracker
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('all')}
                    className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-slate-500">›</span> Master Directory
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsReportOpen(true)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-amber-500">›</span> Monthly Tally Report
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Govt Schemes & Standards (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Govt Schemes
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>JSY (Janani Suraksha)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  <span>PMMVY Maternity Benefit</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span>Mission Indradhanush (UIP)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>Anemia Mukt Bharat</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>ABHA (Ayushman Bharat)</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </footer>


      {/* Modals */}
      {isAddPatientOpen && (
        <AddPatientModal onClose={() => setIsAddPatientOpen(false)} />
      )}

      {isReportOpen && (
        <MonthlyReportModal onClose={() => setIsReportOpen(false)} />
      )}

      {isEmergencyOpen && (
        <EmergencyModal 
          isOpen={isEmergencyOpen} 
          onClose={() => setIsEmergencyOpen(false)} 
        />
      )}

      <WhatsAppReminderModal />

    </div>
  );
}

export default function App() {
  return (
    <HealthRecordProvider>
      <MainApp />
    </HealthRecordProvider>
  );
}
