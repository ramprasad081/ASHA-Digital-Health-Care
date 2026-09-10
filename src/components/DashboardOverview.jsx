import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { FeaturesSection } from './FeaturesSection';
import { 
  Users, 
  Baby, 
  Heart, 
  AlertTriangle, 
  CalendarClock, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  ShieldAlert,
  Activity,
  PlusCircle,
  FileCheck,
  Droplet,
  IdCard,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export function DashboardOverview({ setActiveTab, onOpenAddPatient, onOpenReport }) {
  const { 
    t, 
    patients, 
    pregnantMothers, 
    children,
    highRiskMothers,
    totalOverdueDoses,
    totalDueSoonDoses,
    childrenWithOverdue,
    calculatePregnancyDetails,
    openWhatsAppModal
  } = useHealthRecords();

  // Active detail view: 'all' | 'pregnant' | 'children' | 'alerts'
  const [activeDetailTab, setActiveDetailTab] = useState('all');

  const totalPatientsCount = patients.length;
  const pregnantWomenCount = pregnantMothers.length;
  const childrenCount = children.length;
  // Total alerts combines overdue vaccination doses and high risk pregnancy cases
  const totalAlertsCount = totalOverdueDoses + highRiskMothers.length;

  return (
    <div className="space-y-6">
      
      {/* Dashboard Top Header & Village Context */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-700" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Village Health Dashboard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time overview of village beneficiaries, pregnancy monitoring, UIP child immunization, and urgent alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddPatient}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Beneficiary</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>System Features</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Dashboard Summary Metrics: Total patients, pregnant women, children, alerts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        
        {/* Total Patients Card */}
        <div 
          onClick={() => setActiveDetailTab('all')}
          className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border-2 transition-all cursor-pointer group ${
            activeDetailTab === 'all'
              ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/20'
              : 'border-slate-200 hover:border-emerald-400 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Total Patients
            </span>
            <div className={`p-2.5 rounded-xl transition-colors ${
              activeDetailTab === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
            }`}>
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {totalPatientsCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              registered
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className={activeDetailTab === 'all' ? 'text-emerald-700 font-semibold' : 'text-slate-500'}>
              {activeDetailTab === 'all' ? 'Viewing details below' : 'Click to view details'}
            </span>
            <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Pregnant Women Card */}
        <div 
          onClick={() => setActiveDetailTab('pregnant')}
          className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border-2 transition-all cursor-pointer group ${
            activeDetailTab === 'pregnant'
              ? 'border-pink-600 ring-2 ring-pink-500/20 shadow-md bg-pink-50/20'
              : 'border-slate-200 hover:border-pink-400 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">
              Pregnant Women
            </span>
            <div className={`p-2.5 rounded-xl transition-colors ${
              activeDetailTab === 'pregnant' ? 'bg-pink-600 text-white shadow-sm' : 'bg-pink-50 text-pink-700 group-hover:bg-pink-100'
            }`}>
              <Heart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-pink-700">
              {pregnantWomenCount}
            </span>
            <span className="text-xs text-pink-600 font-semibold">
              active ANC
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className={activeDetailTab === 'pregnant' ? 'text-pink-700 font-semibold' : 'text-slate-500'}>
              {activeDetailTab === 'pregnant' ? 'Viewing details below' : 'Click to view details'}
            </span>
            <span className="text-pink-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Children Card */}
        <div 
          onClick={() => setActiveDetailTab('children')}
          className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border-2 transition-all cursor-pointer group ${
            activeDetailTab === 'children'
              ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md bg-blue-50/20'
              : 'border-slate-200 hover:border-blue-400 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Children
            </span>
            <div className={`p-2.5 rounded-xl transition-colors ${
              activeDetailTab === 'children' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-700 group-hover:bg-blue-100'
            }`}>
              <Baby className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-700">
              {childrenCount}
            </span>
            <span className="text-xs text-blue-600 font-semibold">
              0 - 5 years
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className={activeDetailTab === 'children' ? 'text-blue-700 font-semibold' : 'text-slate-500'}>
              {activeDetailTab === 'children' ? 'Viewing details below' : 'Click to view details'}
            </span>
            <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Alerts Card */}
        <div 
          onClick={() => setActiveDetailTab('alerts')}
          className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border-2 transition-all cursor-pointer group ${
            activeDetailTab === 'alerts'
              ? 'border-rose-600 ring-2 ring-rose-500/20 shadow-md bg-rose-50/20'
              : totalAlertsCount > 0 
                ? 'border-rose-300 hover:border-rose-500 hover:shadow-md bg-gradient-to-br from-white to-rose-50/30' 
                : 'border-slate-200 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Alerts</span>
            </span>
            <div className={`p-2.5 rounded-xl transition-colors ${
              activeDetailTab === 'alerts'
                ? 'bg-rose-600 text-white shadow-sm'
                : totalAlertsCount > 0 
                  ? 'bg-rose-100 text-rose-700' 
                  : 'bg-emerald-50 text-emerald-700'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl sm:text-4xl font-extrabold ${
              totalAlertsCount > 0 ? 'text-rose-600' : 'text-emerald-700'
            }`}>
              {totalAlertsCount}
            </span>
            <span className="text-xs font-medium text-slate-500">
              urgent
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className={activeDetailTab === 'alerts' ? 'text-rose-700 font-semibold truncate' : 'text-slate-600 truncate'}>
              {activeDetailTab === 'alerts' ? 'Viewing details below' : `${totalOverdueDoses} overdue, ${highRiskMothers.length} HRP`}
            </span>
            <span className="text-rose-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 whitespace-nowrap">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

      </div>

      {/* Urgent Overdue & High-Risk Alert Banner */}
      {(totalOverdueDoses > 0 || highRiskMothers.length > 0) ? (
        <div className="bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 border-2 border-rose-400 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-md mt-0.5 animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-rose-900 flex items-center gap-2">
                  <span>{t.urgentAlerts}</span>
                </h3>
                <div className="text-xs sm:text-sm text-rose-800 mt-1 space-y-0.5">
                  {totalOverdueDoses > 0 && (
                    <p className="font-medium flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-rose-600"></span>
                      <span>
                        <strong className="text-rose-950 font-bold">{totalOverdueDoses}</strong> {t.overdueAlertDetail} ({childrenWithOverdue.length} children)
                      </span>
                    </p>
                  )}
                  {highRiskMothers.length > 0 && (
                    <p className="font-medium flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
                      <span>
                        <strong className="text-rose-950 font-bold">{highRiskMothers.length}</strong> {t.highRiskAlertDetail}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveDetailTab('alerts')}
                className="flex-1 sm:flex-initial px-4 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Alert Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {highRiskMothers.length > 0 && (
                <button
                  onClick={() => setActiveTab('maternal')}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>High-Risk Mothers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-emerald-900">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-medium">{t.noUrgentAlerts}</p>
        </div>
      )}

      {/* Two-Column Grid: Overdue Children Direct Actions & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Overdue Vaccination Action Center */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Missed Vaccines - Immediate Follow-Up List</span>
              </h3>
              <p className="text-xs text-slate-500">
                Contact parents directly or send 1-click WhatsApp immunization reminders
              </p>
            </div>
            <button
              onClick={() => setActiveTab('child')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all children</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {childrenWithOverdue.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-700">No missed vaccinations in the village!</p>
              <p className="text-xs text-slate-500 mt-0.5">All registered children are up-to-date with UIP guidelines.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {childrenWithOverdue.map(({ child, overdueList, ageFormatted }) => (
                <div 
                  key={child.id}
                  className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 hover:bg-rose-50/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {child.gender?.toLowerCase().includes('girl') ? '♀' : '♂'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">{child.name}</span>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                          {ageFormatted}
                        </span>
                        <span className="text-xs text-slate-500">
                          {child.village || 'Rampur Village'} • {child.ward}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Parents: <strong>{child.motherName || child.fatherName}</strong> • {child.phone}
                      </p>
                      
                      {/* Overdue dose tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {overdueList.map((od) => (
                          <span 
                            key={od.id}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-md"
                          >
                            <span>{od.name}</span>
                            <span className="text-rose-600 font-normal">
                              ({od.daysOverdue} days late)
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <button
                    onClick={() => {
                      const firstOd = overdueList[0];
                      openWhatsAppModal({
                        type: 'vaccine',
                        recipientName: child.motherName || child.fatherName,
                        phone: child.phone,
                        childName: child.name,
                        vaccineName: overdueList.map(o => o.name).join(', '),
                        dueDate: firstOd.dueDate
                      });
                    }}
                    className="w-full sm:w-auto px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Send Reminder</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Actions & Field Guide */}
        <div className="space-y-4">
          
          {/* Quick Action Shortcuts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-2">
              <button
                onClick={onOpenAddPatient}
                className="w-full text-left p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg shadow-sm">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                      + Register New Beneficiary
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Record Name, Age, Village, Blood Group, Aadhaar
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => setActiveTab('maternal')}
                className="w-full text-left p-3 rounded-xl border border-pink-200 bg-pink-50/40 hover:bg-pink-50 hover:border-pink-300 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-600 text-white rounded-lg shadow-sm">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-pink-800">
                      ANC Visits & EDD Tracker
                    </p>
                    <p className="text-[11px] text-slate-500">
                      4 checkups & HRP screening
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={onOpenReport}
                className="w-full text-left p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-300 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600 text-white rounded-lg shadow-sm">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                      ASHA Monthly Tally Report
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Ready to print for monthly PHC review
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-1.5 mb-2">
              <span>💡 ASHA Clinical Guidelines</span>
            </h4>
            <ul className="text-xs text-emerald-100 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-300 font-bold">•</span>
                <span>Check and document patient Blood Group for institutional delivery preparedness.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-300 font-bold">•</span>
                <span>Record Aadhaar ID to link beneficiaries with National Maternity Benefit Scheme entitlements.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-300 font-bold">•</span>
                <span>Refer pregnant women with Hb &lt; 7 g/dL immediately to the PHC Doctor.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Comprehensive All Details Section for Total Patients, Pregnant Women, Children, and Alerts */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        
        {/* Detail Tabs Bar & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Dashboard Detailed Registers</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review full clinical details, Aadhaar IDs, Blood Groups, and statuses for each category
            </p>
          </div>

          {/* Sub-tab Pill Switcher */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveDetailTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDetailTab === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Total Patients ({totalPatientsCount})</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('pregnant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDetailTab === 'pregnant'
                  ? 'bg-white text-pink-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-pink-600" />
              <span>Pregnant Women ({pregnantWomenCount})</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('children')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDetailTab === 'children'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Baby className="w-3.5 h-3.5 text-blue-600" />
              <span>Children ({childrenCount})</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('alerts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDetailTab === 'alerts'
                  ? 'bg-white text-rose-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Alerts ({totalAlertsCount})</span>
            </button>
          </div>
        </div>

        {/* 1. Detail View: TOTAL PATIENTS */}
        {activeDetailTab === 'all' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>All Village Beneficiaries ({patients.length})</span>
              </h4>
              <button
                onClick={() => setActiveTab('all')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span>Open Full Master Register</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Beneficiary Name & Age</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Village & Ward</th>
                    <th className="p-3">Blood Group</th>
                    <th className="p-3">Aadhaar ID</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Status / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {patients.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {p.gender || 'Female'}, {p.age ? `${p.age} yrs` : p.dob ? `DOB: ${p.dob}` : 'N/A'}
                        </div>
                      </td>
                      <td className="p-3">
                        {p.type === 'pregnant_mother' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-pink-100 text-pink-800">
                            <Heart className="w-3 h-3" /> Pregnant Mother
                          </span>
                        )}
                        {p.type === 'child' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
                            <Baby className="w-3 h-3" /> Child (0-5 Yrs)
                          </span>
                        )}
                        {p.type === 'general' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                            <Users className="w-3 h-3" /> General Citizen
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-800">{p.village || 'Rampur Village'}</div>
                        <div className="text-[11px] text-slate-500">{p.ward || 'Ward 1'}</div>
                      </td>
                      <td className="p-3">
                        {p.bloodGroup ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
                            <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
                            {p.bloodGroup}
                          </span>
                        ) : (
                          <span className="text-slate-400">Unrecorded</span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-700">
                        {p.aadhaarId ? (
                          <span className="flex items-center gap-1">
                            <IdCard className="w-3.5 h-3.5 text-slate-400" />
                            <span>{p.aadhaarId}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Not Provided</span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-700">
                        {p.phone || 'N/A'}
                      </td>
                      <td className="p-3 text-[11px] text-slate-600 max-w-xs truncate">
                        {p.isHighRisk ? (
                          <span className="text-rose-600 font-semibold">⚠️ High Risk ({p.highRiskReason})</span>
                        ) : (
                          p.notes || 'Routine village care'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Detail View: PREGNANT WOMEN */}
        {activeDetailTab === 'pregnant' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-pink-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-600" />
                <span>Active Maternal Beneficiaries ({pregnantMothers.length})</span>
              </h4>
              <button
                onClick={() => setActiveTab('maternal')}
                className="text-xs font-semibold text-pink-700 hover:text-pink-800 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span>Open Maternal Care Register</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto border border-pink-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-pink-50 text-pink-900 border-b border-pink-200 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Mother Name & Age</th>
                    <th className="p-3">Village & Ward</th>
                    <th className="p-3">Blood Group</th>
                    <th className="p-3">Aadhaar ID</th>
                    <th className="p-3">LMP & Gestation</th>
                    <th className="p-3">Expected Delivery (EDD)</th>
                    <th className="p-3">ANC Visits</th>
                    <th className="p-3">Risk Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100">
                  {pregnantMothers.map((m) => {
                    const preg = calculatePregnancyDetails(m.lmpDate);
                    const completedAnc = (m.ancVisits || []).filter(v => v.status === 'completed').length;
                    return (
                      <tr key={m.id} className="hover:bg-pink-50/50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{m.name}</div>
                          <div className="text-[11px] text-slate-500">
                            Age: {m.age} yrs • Spouse: {m.spouseName || 'N/A'}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{m.village}</div>
                          <div className="text-[11px] text-slate-500">{m.ward}</div>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
                            <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
                            {m.bloodGroup || 'O+'}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-700">
                          {m.aadhaarId || 'N/A'}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-800">Week {preg.weeks}</div>
                          <div className="text-[11px] text-pink-700 font-medium">Trimester {preg.trimester}</div>
                          <div className="text-[10px] text-slate-500">LMP: {m.lmpDate}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-emerald-800">{preg.edd}</div>
                          <div className="text-[11px] text-slate-500">
                            {preg.daysLeft > 0 ? `${preg.daysLeft} days remaining` : 'Full term delivery'}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-800">{completedAnc} of 4</span>
                            <span className="text-[11px] text-slate-500">done</span>
                          </div>
                          <div className="w-20 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                            <div 
                              className="bg-pink-600 h-1.5 rounded-full" 
                              style={{ width: `${(completedAnc / 4) * 100}%` }}
                            />
                          </div>
                        </td>
                        <td className="p-3">
                          {m.isHighRisk ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              High Risk
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800">
                              Normal
                            </span>
                          )}
                          {m.highRiskReason && (
                            <div className="text-[10px] text-rose-700 mt-0.5 max-w-xs">{m.highRiskReason}</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Detail View: CHILDREN */}
        {activeDetailTab === 'children' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <Baby className="w-4 h-4 text-blue-600" />
                <span>Child Beneficiaries (0 - 5 Years) ({children.length})</span>
              </h4>
              <button
                onClick={() => setActiveTab('child')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span>Open Immunization Tracker</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto border border-blue-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-blue-50 text-blue-900 border-b border-blue-200 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Child Name & Gender</th>
                    <th className="p-3">Date of Birth & Age</th>
                    <th className="p-3">Parents & Phone</th>
                    <th className="p-3">Village & Ward</th>
                    <th className="p-3">Blood Group</th>
                    <th className="p-3">Aadhaar ID</th>
                    <th className="p-3">Immunization Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {children.map((c) => {
                    const givenCount = Object.keys(c.givenVaccines || {}).length;
                    const overdueForChild = childrenWithOverdue.find(item => item.child.id === c.id);
                    const isOverdue = overdueForChild && overdueForChild.overdueList.length > 0;
                    return (
                      <tr key={c.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.gender}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-800">{c.dob}</div>
                          <div className="text-[11px] text-blue-700">
                            {overdueForChild ? overdueForChild.ageFormatted : 'Under 5 yrs'}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{c.motherName || c.fatherName}</div>
                          <div className="text-[11px] font-mono text-slate-600">{c.phone}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{c.village}</div>
                          <div className="text-[11px] text-slate-500">{c.ward}</div>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
                            <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
                            {c.bloodGroup || 'B+'}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-700">
                          {c.aadhaarId || 'Pending'}
                        </td>
                        <td className="p-3">
                          {isOverdue ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              {overdueForChild.overdueList.length} Doses Overdue
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Up-to-date ({givenCount} doses given)
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {isOverdue ? (
                            <button
                              onClick={() => {
                                const firstOd = overdueForChild.overdueList[0];
                                openWhatsAppModal({
                                  type: 'vaccine',
                                  recipientName: c.motherName || c.fatherName,
                                  phone: c.phone,
                                  childName: c.name,
                                  vaccineName: overdueForChild.overdueList.map(o => o.name).join(', '),
                                  dueDate: firstOd.dueDate
                                });
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                            >
                              <Send className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveTab('child')}
                              className="text-xs text-blue-700 hover:underline font-semibold"
                            >
                              View Card
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Detail View: ALERTS */}
        {activeDetailTab === 'alerts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Urgent Clinical Attention Cases ({totalAlertsCount})</span>
              </h4>
              <span className="text-xs text-rose-700 font-medium">
                {totalOverdueDoses} Missed Vaccines • {highRiskMothers.length} High-Risk Pregnancies
              </span>
            </div>

            {/* Sub-section A: Missed Vaccine Doses */}
            <div className="border border-rose-200 rounded-xl p-4 bg-rose-50/30 space-y-3">
              <h5 className="text-xs font-bold uppercase text-rose-900 tracking-wider flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-rose-600" />
                <span>Children with Missed / Overdue Vaccines ({childrenWithOverdue.length} Children)</span>
              </h5>
              
              {childrenWithOverdue.length === 0 ? (
                <p className="text-xs text-slate-500">No overdue vaccine doses!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {childrenWithOverdue.map(({ child, overdueList, ageFormatted }) => (
                    <div key={child.id} className="p-3 bg-white rounded-xl border border-rose-200 shadow-xs flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span>{child.name}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-normal">{ageFormatted}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {child.village} • Ward: {child.ward} • Blood: <strong>{child.bloodGroup || 'N/A'}</strong>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          Parent: {child.motherName || child.fatherName} ({child.phone})
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {overdueList.map(od => (
                            <span key={od.id} className="text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">
                              {od.name} ({od.daysOverdue}d late)
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const firstOd = overdueList[0];
                          openWhatsAppModal({
                            type: 'vaccine',
                            recipientName: child.motherName || child.fatherName,
                            phone: child.phone,
                            childName: child.name,
                            vaccineName: overdueList.map(o => o.name).join(', '),
                            dueDate: firstOd.dueDate
                          });
                        }}
                        className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer transition-all shadow-xs flex-shrink-0"
                        title="Send WhatsApp Reminder"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub-section B: High-Risk Mothers */}
            <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30 space-y-3">
              <h5 className="text-xs font-bold uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-600" />
                <span>High-Risk Pregnant Mothers ({highRiskMothers.length} Cases)</span>
              </h5>

              {highRiskMothers.length === 0 ? (
                <p className="text-xs text-slate-500">No high-risk pregnancies reported.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highRiskMothers.map((m) => {
                    const preg = calculatePregnancyDetails(m.lmpDate);
                    return (
                      <div key={m.id} className="p-3 bg-white rounded-xl border border-amber-300 shadow-xs flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <span>{m.name}</span>
                            <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded font-bold">Week {preg.weeks}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {m.village} • Blood: <strong>{m.bloodGroup}</strong> • Aadhaar: {m.aadhaarId}
                          </div>
                          <div className="text-[11px] font-semibold text-rose-700 mt-1 bg-rose-50 p-1.5 rounded border border-rose-200">
                            ⚠️ {m.highRiskReason}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-1">
                            EDD: <strong>{preg.edd}</strong> • Delivery at: {m.institutionalDeliveryPlanned}
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveTab('maternal')}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all shadow-xs flex-shrink-0"
                        >
                          View Case
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
