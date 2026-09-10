import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { RecordAncModal } from './RecordAncModal';
import { 
  Heart, 
  AlertTriangle, 
  Calendar, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Hospital, 
  Pill, 
  Syringe, 
  Plus, 
  Search,
  Check,
  Droplet,
  IdCard
} from 'lucide-react';

export function MaternalRegister({ onOpenAddPatient }) {
  const { 
    t, 
    pregnantMothers, 
    calculatePregnancyDetails, 
    openWhatsAppModal 
  } = useHealthRecords();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterHighRisk, setFilterHighRisk] = useState(false);
  const [activeAncModal, setActiveAncModal] = useState(null);

  const filteredMothers = pregnantMothers.filter((mother) => {
    const matchesSearch = 
      mother.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mother.village && mother.village.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mother.aadhaarId && mother.aadhaarId.includes(searchQuery)) ||
      (mother.bloodGroup && mother.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mother.spouseName && mother.spouseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mother.ward && mother.ward.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mother.phone && mother.phone.includes(searchQuery));
    
    if (filterHighRisk) {
      return matchesSearch && mother.isHighRisk;
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-600" />
              <span>{t.maternalHeading}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.maternalSub}
            </p>
          </div>

          <button
            onClick={onOpenAddPatient}
            className="self-start md:self-auto px-4 py-2 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register Expectant Mother</span>
          </button>
        </div>

        {/* Filter & Search Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mother name, village, blood group, Aadhaar ID..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          {/* High Risk Filter Toggle */}
          <button
            onClick={() => setFilterHighRisk(!filterHighRisk)}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              filterHighRisk
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 ${filterHighRisk ? 'text-white' : 'text-rose-500'}`} />
            <span>High Risk Only (HRP)</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${filterHighRisk ? 'bg-white text-rose-700' : 'bg-rose-100 text-rose-700'}`}>
              {pregnantMothers.filter((m) => m.isHighRisk).length}
            </span>
          </button>

        </div>
      </div>

      {/* Mothers List */}
      {filteredMothers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <Heart className="w-12 h-12 text-pink-300 mx-auto mb-2" />
          <p className="text-base font-bold text-slate-800">
            No pregnant mother records found
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery 
              ? 'Try adjusting your search criteria' 
              : 'Click "+ Register Expectant Mother" to add a record.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMothers.map((mother) => {
            const preg = calculatePregnancyDetails(mother.lmpDate);
            const ancCompletedCount = mother.ancVisits?.filter((v) => v.status === 'completed').length || 0;

            return (
              <div 
                key={mother.id}
                className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                  mother.isHighRisk 
                    ? 'border-rose-400 hover:border-rose-500 shadow-rose-100/50' 
                    : 'border-slate-200 hover:border-pink-400'
                }`}
              >
                {/* Mother Card Top Header */}
                <div className={`p-4 sm:p-5 ${mother.isHighRisk ? 'bg-rose-50/60' : 'bg-pink-50/30'} border-b border-slate-100`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    
                    {/* Basic Details with Village, Blood Group, Aadhaar */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900">{mother.name}</h3>
                        <span className="text-xs bg-white text-slate-700 px-2.5 py-0.5 rounded-full font-semibold border border-slate-200 shadow-xs">
                          {mother.age} yrs
                        </span>
                        
                        {/* Blood Group Tag */}
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                          <Droplet className="w-3 h-3 text-rose-600 fill-rose-600" />
                          <span>{mother.bloodGroup || 'O+'}</span>
                        </span>

                        {mother.isHighRisk && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-600 text-white px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            High Risk (HRP)
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{mother.village || 'Rampur Village'} ({mother.ward})</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-slate-700">
                          <IdCard className="w-3.5 h-3.5 text-blue-600" />
                          <span>{mother.aadhaarId || 'Aadhaar N/A'}</span>
                        </span>
                        <span>•</span>
                        <span>Spouse: <strong>{mother.spouseName}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <strong>{mother.phone}</strong>
                        </span>
                        {mother.abhaId && (
                          <>
                            <span>•</span>
                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] text-slate-700">
                              {mother.abhaId}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* EDD & Gestation Highlights */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-right shadow-2xs">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase">
                          {t.edd}
                        </p>
                        <p className="text-sm sm:text-base font-extrabold text-pink-700 flex items-center gap-1.5 justify-end">
                          <Calendar className="w-4 h-4 text-pink-500" />
                          <span>{preg.edd || 'N/A'}</span>
                        </p>
                        <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                          {preg.daysLeft > 0 
                            ? `${preg.daysLeft} days left (${preg.weeks} weeks)`
                            : 'Full term reached'}
                        </p>
                      </div>

                      {/* WhatsApp Reminder Button */}
                      <button
                        onClick={() => {
                          const nextAnc = mother.ancVisits?.find((v) => v.status !== 'completed');
                          openWhatsAppModal({
                            type: 'anc',
                            recipientName: mother.name,
                            phone: mother.phone,
                            motherName: mother.name,
                            ancName: nextAnc ? nextAnc.title : 'ANC Checkup',
                            dueDate: nextAnc ? (nextAnc.dueDate || preg.edd) : preg.edd
                          });
                        }}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                        title={t.sendWhatsApp}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reminder</span>
                      </button>

                    </div>

                  </div>

                  {/* High Risk Factor Warning Bar */}
                  {mother.isHighRisk && mother.highRiskReason && (
                    <div className="mt-3 p-2.5 rounded-xl bg-rose-100/90 border border-rose-300 text-rose-900 text-xs font-medium flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span><strong>Risk Factor:</strong> {mother.highRiskReason}</span>
                    </div>
                  )}

                  {/* Gestational Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-1">
                      <span>
                        Pregnancy Progress: <strong>{preg.weeks} / 40 Weeks</strong> (Trimester {preg.trimester})
                      </span>
                      <span>{Math.min(100, Math.round((preg.weeks / 40) * 100))}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${mother.isHighRisk ? 'bg-rose-500' : 'bg-pink-500'}`}
                        style={{ width: `${Math.min(100, (preg.weeks / 40) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                </div>

                {/* ANC Visits Matrix */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-pink-600" />
                      <span>{t.ancVisits} ({ancCompletedCount} / 4 Completed)</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {mother.ancVisits?.map((visit) => (
                      <div 
                        key={visit.id}
                        className={`p-3 rounded-xl border transition-all ${
                          visit.status === 'completed'
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : visit.status === 'overdue'
                            ? 'bg-rose-50/50 border-rose-300'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            ANC {visit.id}
                          </span>
                          {visit.status === 'completed' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              <Check className="w-3 h-3" />
                              Done
                            </span>
                          ) : visit.status === 'overdue' ? (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                              Overdue
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                              Due
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 leading-tight">
                          {visit.title}
                        </p>

                        {visit.status === 'completed' ? (
                          <div className="mt-2 text-[11px] text-slate-700 space-y-0.5 bg-white/70 p-2 rounded-lg border border-emerald-100">
                            <p><strong>Date:</strong> {visit.date}</p>
                            <p><strong>Weight:</strong> {visit.weight} kg • <strong>BP:</strong> {visit.bp}</p>
                            <p><strong>Hb:</strong> {visit.hb} g/dL</p>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <p className="text-[11px] text-slate-500 mb-2">
                              Due: <strong>{visit.dueDate || 'Schedule Date'}</strong>
                            </p>
                            <button
                              onClick={() => setActiveAncModal({ mother, ancVisit: visit })}
                              className="w-full py-1.5 px-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Record Visit</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Medical Logistics: IFA, Td & Institutional Delivery */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Pill className="w-4 h-4 text-amber-500" />
                        <span>IFA Tablets: <strong>{mother.ifaGivenCount || 0} distributed</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Syringe className="w-4 h-4 text-blue-500" />
                        <span>Td Dose: <strong>{mother.tdDoses?.td1 ? 'Dose 1 Completed' : 'Pending'}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Hospital className="w-4 h-4 text-emerald-600" />
                        <span>Delivery Plan: <strong>{mother.institutionalDeliveryPlanned || 'PHC Baraut'}</strong></span>
                      </div>
                    </div>

                    {mother.notes && (
                      <p className="text-[11px] text-slate-500 italic">
                        "{mother.notes}"
                      </p>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Record ANC Modal */}
      {activeAncModal && (
        <RecordAncModal
          mother={activeAncModal.mother}
          ancVisit={activeAncModal.ancVisit}
          onClose={() => setActiveAncModal(null)}
        />
      )}

    </div>
  );
}
