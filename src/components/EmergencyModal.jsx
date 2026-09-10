import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { 
  PhoneCall, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  Send, 
  Building2, 
  CheckCircle2, 
  HeartHandshake,
  Radio
} from 'lucide-react';

export function EmergencyModal({ isOpen, onClose }) {
  const { currentUser, highRiskMothers, totalOverdueDoses } = useHealthRecords();
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleSendSos = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  const emergencyContacts = [
    {
      code: '108',
      name: 'National Ambulance Emergency Service',
      desc: 'Accidents, acute trauma, respiratory distress, and emergency transport to District Hospital.',
      badge: 'Immediate 24x7',
      color: 'rose'
    },
    {
      code: '102',
      name: 'Janani Shishu Suraksha Vahan (JSSK)',
      desc: 'Free transport for pregnant mothers in labor and sick infants under 1 year.',
      badge: 'Maternal Priority',
      color: 'pink'
    },
    {
      code: '104',
      name: 'State Health Tele-Helpdesk & Medical Advice',
      desc: 'Free doctor tele-consultation, drug dosage confirmation, and medical grievance.',
      badge: 'Doctor On-Call',
      color: 'emerald'
    },
    {
      code: '1098',
      name: 'National Childline Emergency',
      desc: 'Abandoned child protection, malnutrition distress, and emergency child care.',
      badge: 'Child Welfare',
      color: 'amber'
    }
  ];

  const referralCentres = [
    {
      id: 'phc',
      name: 'Baraut Primary Health Centre (PHC)',
      type: 'Primary Care (24x7 Delivery Available)',
      distance: '3.2 km',
      doctor: 'Dr. R. K. Sharma (Medical Officer)',
      phone: '01234-224455'
    },
    {
      id: 'chc',
      name: 'Baghpat Community Health Centre (CHC / FRU)',
      type: 'First Referral Unit (Cesarean & Blood Storage)',
      distance: '14.5 km',
      doctor: 'Dr. Meena Gupta (Gynecologist On-Duty)',
      phone: '01234-228899'
    },
    {
      id: 'dh',
      name: 'District Combined Hospital Baghpat',
      type: 'Tertiary Care & Neonatal ICU (SNCU)',
      distance: '26.0 km',
      doctor: 'Emergency Trauma & Pediatric Wing',
      phone: '01234-299100'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border-b border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400 shadow-inner">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight">
                  Emergency Medical Hotlines & Dispatch
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  SOS Action
                </span>
              </div>
              <p className="text-xs text-rose-200/80">
                Frontline ASHA emergency dispatch protocols for {currentUser?.village || 'Rampur Village'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Quick SOS Village Broadcast Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-900/40 via-red-950/30 to-slate-900 border border-rose-600/40 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                Emergency Situation Alert
              </span>
              <p className="text-xs text-slate-300">
                Instantly notify PHC Medical Officer & Village Pradhan of emergency maternal labor or trauma.
              </p>
            </div>
            <button
              onClick={handleSendSos}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95 whitespace-nowrap ${
                sosSent 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
              }`}
            >
              {sosSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Alert Sent to PHC!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Send SOS Alert</span>
                </>
              )}
            </button>
          </div>

          {/* 1-Tap Government Hotlines */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>National 24x7 Emergency Helplines</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencyContacts.map((contact) => (
                <div 
                  key={contact.code}
                  className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-slate-600 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-200">
                        {contact.badge}
                      </span>
                      <button
                        onClick={() => handleCopy(contact.code)}
                        className="text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedNumber === contact.code ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {contact.code}
                      </span>
                      <span className="text-xs font-bold text-slate-200 line-clamp-1">
                        {contact.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {contact.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center gap-2">
                    <a
                      href={`tel:${contact.code}`}
                      className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Now ({contact.code})</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Health Facilities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Designated Referral Health Centres</span>
            </h4>

            <div className="space-y-2.5">
              {referralCentres.map((centre) => (
                <div 
                  key={centre.id}
                  className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{centre.name}</span>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {centre.distance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {centre.type} • {centre.doctor}
                    </p>
                  </div>

                  <a
                    href={`tel:${centre.phone.replace(/[^0-9]/g, '')}`}
                    className="px-3.5 py-2 bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{centre.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Active Village Clinical Status Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Active Field Risk Cases:</span>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-pink-400">{highRiskMothers.length} High-Risk Mothers</span>
              <span>•</span>
              <span className="text-rose-400">{totalOverdueDoses} Overdue Vaccinations</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>National Rural Health Mission (NHM) Protocol</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
