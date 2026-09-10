import ashaHeroImg from '../assets/asha_hero.jpg';
import maternalCareImg from '../assets/maternal_care.jpg';
import childVaccineImg from '../assets/child_vaccine.jpg';
import doorstepVisitImg from '../assets/doorstep_visit.jpg';
import { 
  Users, 
  Heart, 
  Baby, 
  Bell, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Droplet,
  IdCard,
  PlusCircle,
  FileCheck,
  Calendar,
  Sparkles,
  PhoneCall,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

export function FrontPage({ setActiveTab, onOpenAddPatient, onOpenReport, onOpenEmergency }) {
  return (
    <div className="space-y-12 pb-8">
      
      {/* 1. Hero Section: Premium Card with Rural Healthcare Photography */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white shadow-2xl border border-emerald-500/30">
        
        {/* Glow Spheres */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>National Rural Health Mission (NHM) • ASHA Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Digital Village <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
                Health Record System
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl leading-relaxed">
              Empowering frontline ASHA workers with intuitive mobile & laptop records. Eliminating lost paper registers, missed childhood vaccinations, and unmonitored high-risk pregnancies across rural India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-bold rounded-2xl shadow-xl transition-all cursor-pointer flex items-center gap-2 text-sm sm:text-base group"
              >
                <Activity className="w-5 h-5 text-emerald-100" />
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onOpenAddPatient}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/25 font-semibold rounded-2xl backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 text-sm sm:text-base"
              >
                <PlusCircle className="w-4 h-4 text-emerald-300" />
                <span>+ Register Beneficiary</span>
              </button>

              <button
                onClick={onOpenEmergency}
                className="px-4 py-3.5 bg-rose-600/80 hover:bg-rose-600 active:scale-95 text-white border border-rose-400/40 font-bold rounded-2xl backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 text-sm sm:text-base"
                title="24x7 Emergency Hotlines & Referral"
              >
                <PhoneCall className="w-4 h-4 text-rose-200" />
                <span>Emergency 108</span>
              </button>
            </div>

            {/* Micro Highlights Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15 max-w-lg">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-amber-300 block">100% Offline</span>
                <span className="text-[11px] text-slate-300">Works without internet</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-emerald-300 block">Aadhaar Linked</span>
                <span className="text-[11px] text-slate-300">Safe maternity benefit</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-teal-300 block">1-Tap WhatsApp</span>
                <span className="text-[11px] text-slate-300">Instant family alerts</span>
              </div>
            </div>

          </div>

          {/* Hero Image Right */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-400/40 group">
              <img 
                src={ashaHeroImg} 
                alt="ASHA Healthcare Worker with Digital Tablet in Village" 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
              
              {/* Overlay Field Status Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Village Healthcare Live Portal</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Active ASHA
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Covering Rampur Village Wards 1-4 with live Universal Immunization & Antenatal surveillance.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 2. Photo Showcase Grid: Doorstep Care & Immunization Drives */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Story 1: Doorstep Home Visits */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
          <div>
            <div className="rounded-2xl overflow-hidden mb-5 border border-slate-700/50 shadow-xs relative">
              <img 
                src={doorstepVisitImg} 
                alt="ASHA worker conducting home doorstep visit" 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                Doorstep Care
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Home Health Visits</span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              Door-to-Door Family Health Surveillance
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              ASHA workers visit rural courtyards to check on pregnant mothers, document Blood Groups, and link families directly with government health schemes using mobile registers.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button 
              onClick={() => setActiveTab('all')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Master Beneficiary Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Story 2: Universal Immunization Program Drive */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-blue-500/50 transition-all">
          <div>
            <div className="rounded-2xl overflow-hidden mb-5 border border-slate-700/50 shadow-xs relative">
              <img 
                src={childVaccineImg} 
                alt="Child vaccination session in village health clinic" 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                UIP Child Clinic
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <Baby className="w-4 h-4 text-blue-400" />
              <span>Universal Immunization</span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              Zero-Dropout Village Vaccination Drives
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Never let an infant miss BCG, Pentavalent, Rotavirus, or MR boosters. Overdue alerts automatically trigger 1-click WhatsApp parent reminders so vaccination sessions have 100% turnout.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button 
              onClick={() => setActiveTab('child')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Immunization Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* 3. The 4 Core Service Pillars */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Rural Healthcare Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Core Digital Capabilities
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Open live dashboard view</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Patient Records */}
          <div 
            onClick={() => setActiveTab('all')}
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-800 shadow-xl hover:border-emerald-500 hover:shadow-emerald-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs border border-emerald-500/30">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                Patient Records
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Centralized village registry capturing Name, Age, Village, Blood Group, and 12-digit Aadhaar ID.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-700">Name & Age</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-700">Blood Group</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-700">Aadhaar ID</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center justify-between">
              <span>Open Master Register</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Pregnancy Care */}
          <div 
            onClick={() => setActiveTab('maternal')}
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-800 shadow-xl hover:border-pink-500 hover:shadow-pink-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors shadow-xs border border-pink-500/30">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                Pregnancy Care
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Automated gestational week calculation, 4 ANC checkup milestone tracker, and Expected Delivery Date (EDD).
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-pink-950/60 text-pink-300 px-2 py-0.5 rounded font-medium border border-pink-800/40">Week Tracking</span>
                <span className="text-[10px] bg-pink-950/60 text-pink-300 px-2 py-0.5 rounded font-medium border border-pink-800/40">ANC Visits 1-4</span>
                <span className="text-[10px] bg-pink-950/60 text-pink-300 px-2 py-0.5 rounded font-medium border border-pink-800/40">Delivery Date</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-pink-400 flex items-center justify-between">
              <span>Track Pregnancies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Vaccination Tracker */}
          <div 
            onClick={() => setActiveTab('child')}
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-800 shadow-xl hover:border-blue-500 hover:shadow-blue-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs border border-blue-500/30">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                Vaccination Tracker
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Universal Immunization Programme schedule (0-5 years). Auto-calculates dose due dates and tracks completion.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-blue-950/60 text-blue-300 px-2 py-0.5 rounded font-medium border border-blue-800/40">Birth to 5 Yrs</span>
                <span className="text-[10px] bg-blue-950/60 text-blue-300 px-2 py-0.5 rounded font-medium border border-blue-800/40">Due Date Math</span>
                <span className="text-[10px] bg-blue-950/60 text-blue-300 px-2 py-0.5 rounded font-medium border border-blue-800/40">Completed Status</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-blue-400 flex items-center justify-between">
              <span>Track Child Vaccines</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Health Reminders */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-800 shadow-xl hover:border-amber-500 hover:shadow-amber-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-xs border border-amber-500/30">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                Health Reminders
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Color-coded warning flags for overdue immunizations, high-risk conditions, and 1-click WhatsApp parent reminders.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded font-medium border border-amber-800/40">Upcoming Alerts</span>
                <span className="text-[10px] bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded font-medium border border-amber-800/40">Checkup Follow-up</span>
                <span className="text-[10px] bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded font-medium border border-amber-800/40">WhatsApp Links</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-amber-400 flex items-center justify-between">
              <span>View Alerts Center</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Deep Dive Maternal Clinic Banner */}
      <section className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Left */}
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-700 group">
            <img 
              src={maternalCareImg} 
              alt="Maternal Health and Child Nutrition Care in Village Clinic" 
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              Village Health & Nutrition Day (VHND) Clinic & Counseling
            </span>
          </div>
        </div>

        {/* Text Right */}
        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-800/50 text-pink-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span>Maternal & Child Health Focus</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Preventing Maternal & Infant Mortality with Timely Village Data
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In rural villages, lost paper registers lead to missed IFA tablets, missing Tetanus injections, and delayed institutional delivery transport. With this digital platform, ASHA workers carry the entire village health record on their device with zero paper dependencies:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">High-Risk Pregnancy Alerts</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Automated screening for severe anemia (Hb &lt; 7 g/dL) and hypertension.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Zero Missed Child Vaccines</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Instant alerts when doses like Pentavalent, OPV, or MR-1 are overdue.</p>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Open Dashboard to View Village Metrics</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </section>

      {/* 5. Call To Action Footer Banner */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Frontline Health Worker Portal
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to review village health records or register beneficiaries?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Access the complete village master register, review overdue immunizations, or open the monthly tally report.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex-1 md:flex-initial px-6 py-3.5 bg-white text-slate-950 hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4 text-emerald-700" />
            <span>Open Dashboard</span>
          </button>
        </div>
      </section>

    </div>
  );
}
