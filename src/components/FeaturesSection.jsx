import { 
  Users, 
  Baby, 
  Heart, 
  Bell, 
  Droplet, 
  IdCard, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  Sparkles,
  Activity
} from 'lucide-react';

export function FeaturesSection({ setActiveTab, onOpenAddPatient }) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 overflow-hidden relative mb-6">
      
      {/* Decorative Glow Background */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Section Header (No numbers) */}
      <div className="relative z-10 max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Core System Features</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Village Health Record Features
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
          Streamlined digital tools for ASHA workers to record patient data, track vaccinations, monitor pregnancies, and send automated health alerts.
        </p>
      </div>

      {/* Features Grid (No numbers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        
        {/* Feature: Patient Records */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:border-emerald-400/60 transition-all flex flex-col justify-between group shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Patient Records</span>
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              Patient Records
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Consolidated digital profiles capturing essential demographic and identification details with offline local storage.
            </p>

            {/* Sub-features: Name, age, village, blood group, Aadhaar ID */}
            <div className="mt-3 p-3 bg-black/25 rounded-xl border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                Recorded Patient Details
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span><strong>Name</strong> & <strong>Age</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span><strong>Village</strong> & Ward</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200">
                  <Droplet className="w-3.5 h-3.5 text-rose-400" />
                  <span><strong>Blood Group</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200">
                  <IdCard className="w-3.5 h-3.5 text-blue-300" />
                  <span><strong>Aadhaar ID</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('all')}
              className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Patient Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenAddPatient}
              className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              + Register Patient
            </button>
          </div>
        </div>

        {/* Feature: Vaccination Tracker */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:border-blue-400/60 transition-all flex flex-col justify-between group shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider bg-blue-400/20 px-2.5 py-0.5 rounded-full border border-blue-300/30 flex items-center gap-1">
                <Baby className="w-3 h-3" />
                <span>Vaccination Tracker</span>
              </span>
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 group-hover:scale-110 transition-transform">
                <Baby className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              Vaccination Tracker
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Standard Universal Immunization Programme tracking from birth to 5 years with due dates, completion logging, and parent reminders.
            </p>

            {/* Sub-features: Due date, completed status, reminders */}
            <div className="mt-3 p-3 bg-black/25 rounded-xl border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                Vaccination Milestones
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span><strong>Due Date:</strong> Automatic age-based schedule calculation</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>Completed Status:</strong> 1-click date logging & progress tracker</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span><strong>Reminders:</strong> Overdue flags and instant parent alerts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('child')}
              className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Open Vaccine Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-blue-200 font-semibold bg-blue-500/20 px-2 py-0.5 rounded">
              Birth to 5 Years
            </span>
          </div>
        </div>

        {/* Feature: Pregnancy Care */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:border-pink-400/60 transition-all flex flex-col justify-between group shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider bg-pink-400/20 px-2.5 py-0.5 rounded-full border border-pink-300/30 flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>Pregnancy Care</span>
              </span>
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-300 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
              Pregnancy Care
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Maternal healthcare tracking covering gestational weeks, 4 standard ANC visits, and Expected Delivery Date calculation.
            </p>

            {/* Sub-features: Week tracking, ANC visits, expected delivery date */}
            <div className="mt-3 p-3 bg-black/25 rounded-xl border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider block">
                Maternal Care Tools
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Activity className="w-3.5 h-3.5 text-pink-400" />
                  <span><strong>Week Tracking:</strong> Gestational progress bar & trimester monitoring</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>ANC Visits:</strong> 4 Antenatal checkups (weight, BP, hemoglobin)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span><strong>Expected Delivery Date:</strong> Auto EDD countdown from LMP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('maternal')}
              className="text-xs font-bold text-pink-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Open Pregnancy Care</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-pink-200 font-semibold bg-pink-500/20 px-2 py-0.5 rounded">
              ANC 1 to 4
            </span>
          </div>
        </div>

        {/* Feature: Health Reminders */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/30 flex items-center gap-1">
                <Bell className="w-3 h-3" />
                <span>Health Reminders</span>
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Health Reminders
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Automated alerts for upcoming vaccinations and ANC checkups with 1-click WhatsApp messaging to parents and mothers.
            </p>

            {/* Sub-features: Upcoming vaccine & checkup alerts */}
            <div className="mt-3 p-3 bg-black/25 rounded-xl border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                Notification & Alert System
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span><strong>Upcoming Vaccine Alerts:</strong> Due date reminders within 15 days</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span><strong>Checkup Alerts:</strong> Next ANC visit dates & high-risk follow-up notifications</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>WhatsApp Delivery:</strong> Direct 1-click messaging with pre-filled text</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('child')}
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Overdue & Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-amber-200 font-semibold bg-amber-500/20 px-2 py-0.5 rounded">
              WhatsApp & Alerts
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
