import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { calculateVaccineStatus } from '../data/uipVaccines';
import { 
  Baby, 
  Search, 
  Plus, 
  Send, 
  Check, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Phone, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  CheckCircle2, 
  Syringe,
  Droplet,
  IdCard
} from 'lucide-react';

export function ChildImmunizationRegister({ onOpenAddPatient }) {
  const { 
    t, 
    children, 
    markVaccineGiven, 
    openWhatsAppModal 
  } = useHealthRecords();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [expandedChildId, setExpandedChildId] = useState(null);
  const [administeringDose, setAdministeringDose] = useState(null);
  const [customGivenDate, setCustomGivenDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredChildren = children.filter((child) => {
    const matchesSearch = 
      child.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (child.village && child.village.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (child.aadhaarId && child.aadhaarId.includes(searchQuery)) ||
      (child.bloodGroup && child.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (child.motherName && child.motherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (child.fatherName && child.fatherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (child.ward && child.ward.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (child.phone && child.phone.includes(searchQuery));

    const status = calculateVaccineStatus(child.dob, child.givenVaccines || {});

    if (!matchesSearch) return false;

    if (filterMode === 'overdue') {
      return status.overdueDoses.length > 0;
    }
    if (filterMode === 'due_soon') {
      return status.dueSoonDoses.length > 0;
    }
    if (filterMode === 'completed') {
      return status.completionPercentage === 100;
    }

    return true;
  });

  const toggleExpand = (id) => {
    setExpandedChildId(expandedChildId === id ? null : id);
  };

  const handleMarkGivenConfirm = (childId, vaccineId) => {
    markVaccineGiven(childId, vaccineId, customGivenDate);
    setAdministeringDose(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Baby className="w-6 h-6 text-blue-600" />
              <span>{t.childHeading}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.childSub}
            </p>
          </div>

          <button
            onClick={onOpenAddPatient}
            className="self-start md:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register Child / Newborn</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col lg:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by child name, village, blood group, Aadhaar ID..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t.filterAll} ({children.length})
            </button>

            <button
              onClick={() => setFilterMode('overdue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'overdue'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t.filterOverdue}</span>
            </button>

            <button
              onClick={() => setFilterMode('due_soon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'due_soon'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t.filterDueSoon}</span>
            </button>

            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Fully Immunized</span>
            </button>
          </div>

        </div>
      </div>

      {/* Children Cards List */}
      {filteredChildren.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <Baby className="w-12 h-12 text-blue-300 mx-auto mb-2" />
          <p className="text-base font-bold text-slate-800">
            No child records found
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting search or register a new child.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredChildren.map((child) => {
            const status = calculateVaccineStatus(child.dob, child.givenVaccines || {});
            const hasOverdue = status.overdueDoses.length > 0;
            const hasDueSoon = status.dueSoonDoses.length > 0;
            const isExpanded = expandedChildId === child.id || hasOverdue;

            return (
              <div 
                key={child.id}
                className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                  hasOverdue
                    ? 'border-rose-300 ring-1 ring-rose-300/50'
                    : hasDueSoon
                    ? 'border-blue-300'
                    : 'border-slate-200'
                }`}
              >
                {/* Child Card Header */}
                <div className={`p-4 sm:p-5 ${hasOverdue ? 'bg-rose-50/40' : hasDueSoon ? 'bg-blue-50/20' : 'bg-slate-50/50'} border-b border-slate-100`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    
                    {/* Basic Child Info with Village, Blood Group, Aadhaar */}
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0 shadow-xs ${
                        child.gender?.toLowerCase().includes('girl')
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {child.gender?.toLowerCase().includes('girl') ? '♀' : '♂'}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900">{child.name}</h3>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                            {status.ageFormatted}
                          </span>

                          {/* Blood Group Tag */}
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full shadow-2xs">
                            <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
                            <span>{child.bloodGroup || 'O+'}</span>
                          </span>
                          
                          {/* Overdue Badge */}
                          {hasOverdue && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs animate-pulse">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{status.overdueDoses.length} {t.overdueBadge}</span>
                            </span>
                          )}

                          {/* Due Soon Badge */}
                          {hasDueSoon && !hasOverdue && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                              <Clock className="w-3 h-3" />
                              <span>{status.dueSoonDoses.length} {t.dueSoonBadge}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-600">
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{child.village || 'Rampur Village'} ({child.ward})</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono text-slate-700">
                            <IdCard className="w-3.5 h-3.5 text-blue-600" />
                            <span>{child.aadhaarId || 'Aadhaar N/A'}</span>
                          </span>
                          <span>•</span>
                          <span>
                            Mother: <strong>{child.motherName || 'N/A'}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Father: <strong>{child.fatherName || 'N/A'}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <strong>{child.phone}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>DOB: {child.dob}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Actions */}
                    <div className="flex flex-wrap items-center gap-3 self-end md:self-auto">
                      
                      {/* Completion Percentage */}
                      <div className="text-right min-w-[110px]">
                        <div className="flex items-center justify-end gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-extrabold text-slate-900">
                            {status.completionPercentage}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {status.completedDoses} / {status.totalDoses} doses
                        </p>
                      </div>

                      {/* WhatsApp Reminder Button */}
                      {(hasOverdue || hasDueSoon) && (
                        <button
                          onClick={() => {
                            const urgentDose = status.overdueDoses[0] || status.dueSoonDoses[0];
                            const allUrgentNames = (hasOverdue ? status.overdueDoses : status.dueSoonDoses).map(d => d.name).join(', ');
                            openWhatsAppModal({
                              type: 'vaccine',
                              recipientName: child.motherName || child.fatherName,
                              phone: child.phone,
                              childName: child.name,
                              vaccineName: allUrgentNames,
                              dueDate: urgentDose.dueDate
                            });
                          }}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                          title={t.sendWhatsApp}
                        >
                          <Send className="w-3.5 h-3.5 text-emerald-200" />
                          <span className="hidden sm:inline">Send Reminder</span>
                        </button>
                      )}

                      {/* Expand / Collapse Button */}
                      <button
                        onClick={() => toggleExpand(child.id)}
                        className="p-2 hover:bg-slate-200/70 text-slate-600 rounded-xl transition-colors cursor-pointer"
                        title={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>

                    </div>

                  </div>

                  {/* Overdue Alert Callout if any */}
                  {hasOverdue && (
                    <div className="mt-3 p-2.5 rounded-xl bg-rose-100/80 border border-rose-300 text-rose-950 text-xs font-medium flex flex-wrap items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>
                        <strong>Missed Doses:</strong>{' '}
                        {status.overdueDoses.map(d => `${d.name} (${d.daysOverdue} days overdue)`).join(' • ')}
                      </span>
                    </div>
                  )}

                  {/* Vaccine Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          hasOverdue ? 'bg-rose-500' : status.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${status.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed UIP Vaccine Milestone Table */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-blue-600" />
                      <span>Universal Immunization Programme (UIP) Matrix</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {status.detailedSchedule.map((milestone) => (
                        <div 
                          key={milestone.milestoneId}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 hover:bg-white transition-colors"
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                            <span className="text-xs font-bold text-slate-800">
                              {milestone.labelEn}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              Due: {milestone.dueDate}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {milestone.vaccines.map((v) => {
                              const isOverdue = v.status === 'overdue';
                              const isDueSoon = v.status === 'due_soon';
                              const isCompleted = v.status === 'completed';

                              return (
                                <div 
                                  key={v.id}
                                  className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                                    isCompleted
                                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                                      : isOverdue
                                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                                      : isDueSoon
                                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                                      : 'bg-white border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold">{v.name}</span>
                                      {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                                    </div>
                                    <p className="text-[10px] text-slate-500">
                                      {v.descEn}
                                    </p>
                                    {isCompleted && (
                                      <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                                        ✓ Given: {v.givenDate}
                                      </p>
                                    )}
                                  </div>

                                  {/* Mark as Given Button */}
                                  {!isCompleted && (
                                    <div className="flex-shrink-0">
                                      {administeringDose?.childId === child.id && administeringDose?.vaccineId === v.id ? (
                                        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300 shadow-sm">
                                          <input
                                            type="date"
                                            value={customGivenDate}
                                            onChange={(e) => setCustomGivenDate(e.target.value)}
                                            className="text-[10px] p-1 border rounded"
                                          />
                                          <button
                                            onClick={() => handleMarkGivenConfirm(child.id, v.id)}
                                            className="px-1.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold cursor-pointer hover:bg-emerald-700"
                                          >
                                            OK
                                          </button>
                                          <button
                                            onClick={() => setAdministeringDose(null)}
                                            className="px-1 py-1 text-slate-500 text-[10px] cursor-pointer"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => setAdministeringDose({ childId: child.id, vaccineId: v.id })}
                                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer shadow-2xs ${
                                            isOverdue
                                              ? 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
                                              : isDueSoon
                                              ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                                              : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                                          }`}
                                        >
                                          {t.markGiven}
                                        </button>
                                      )}
                                    </div>
                                  )}

                                </div>
                              );
                            })}
                          </div>

                        </div>
                      ))}
                    </div>

                    {child.notes && (
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                        <strong>Field Notes:</strong> {child.notes}
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
