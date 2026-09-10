import { useHealthRecords } from '../context/HealthRecordContext';
import { X, Printer, FileText, Heart, Baby } from 'lucide-react';

export function MonthlyReportModal({ onClose }) {
  const { 
    t, 
    pregnantMothers, 
    children, 
    highRiskMothers 
  } = useHealthRecords();

  const handlePrint = () => {
    window.print();
  };

  let bcgCount = 0;
  let pentaCount = 0;
  let mrCount = 0;
  let dptBoosterCount = 0;

  children.forEach((c) => {
    const given = c.givenVaccines || {};
    if (given['bcg']) bcgCount++;
    if (given['penta_1'] || given['penta_2'] || given['penta_3']) pentaCount++;
    if (given['mr_1'] || given['mr_2']) mrCount++;
    if (given['dpt_booster_1'] || given['dpt_booster_2']) dptBoosterCount++;
  });

  const totalAncDone = pregnantMothers.reduce((acc, m) => {
    return acc + (m.ancVisits?.filter(v => v.status === 'completed').length || 0);
  }, 0);

  const totalIfaGiven = pregnantMothers.reduce((acc, m) => {
    return acc + (m.ifaGivenCount || 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Modal Toolbar (hidden during print) */}
        <div className="bg-slate-900 px-5 py-3.5 text-white flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm sm:text-base">
              {t.monthlyReportTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printReport}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Sheet Document */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 font-sans" id="printable-report">
          
          {/* Document Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <div className="inline-block px-3 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full uppercase tracking-wider mb-1">
              National Health Mission (NHM) • Ministry of Health & Family Welfare
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-slate-900">
              ASHA Monthly Progress & Tally Form
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              {t.reportingMonth} • {t.villageName}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-200 text-xs text-left bg-slate-50 p-2 rounded-lg">
              <div><strong>ASHA Worker:</strong> {t.ashaName}</div>
              <div><strong>Village / Ward:</strong> Rampur (1-4)</div>
              <div><strong>Sub-Center / PHC:</strong> PHC Baraut</div>
              <div><strong>Report Date:</strong> {new Date().toLocaleDateString('en-GB')}</div>
            </div>
          </div>

          {/* Section 1: Maternal Health (MCH) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-800 bg-pink-50 p-2 rounded-lg border-l-4 border-pink-600 flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-pink-600" />
              <span>1. Maternal Health & Antenatal Care Services (ANC)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">Total Registered Expectant Mothers</span>
                <strong className="text-xl font-bold text-slate-900">{pregnantMothers.length}</strong>
              </div>

              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">High-Risk Pregnancies (HRP)</span>
                <strong className="text-xl font-bold text-rose-600">{highRiskMothers.length}</strong>
              </div>

              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">Total Completed ANC Checkups</span>
                <strong className="text-xl font-bold text-emerald-700">{totalAncDone}</strong>
              </div>

              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">IFA Tablets Distributed</span>
                <strong className="text-xl font-bold text-amber-700">{totalIfaGiven}</strong>
              </div>

              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">Institutional Delivery Plans</span>
                <strong className="text-xl font-bold text-blue-700">100% ({pregnantMothers.length}/{pregnantMothers.length})</strong>
              </div>

              <div className="border border-slate-200 p-3 rounded-xl bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">102 Ambulance Emergency Linkage</span>
                <strong className="text-xl font-bold text-slate-800">Active</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Child Immunization (UIP Tally) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-800 bg-blue-50 p-2 rounded-lg border-l-4 border-blue-600 flex items-center gap-2 mb-3">
              <Baby className="w-4 h-4 text-blue-600" />
              <span>2. Universal Immunization Programme (UIP) Tally Sheet</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2 border-r border-slate-200">Vaccine / Antigen</th>
                    <th className="p-2 border-r border-slate-200">Target Age Group</th>
                    <th className="p-2 border-r border-slate-200">Doses Administered</th>
                    <th className="p-2">Coverage Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">BCG + OPV-0 + Hep-B</td>
                    <td className="p-2 border-r border-slate-200">At Birth</td>
                    <td className="p-2 font-bold text-emerald-700 border-r border-slate-200">{bcgCount}</td>
                    <td className="p-2 text-emerald-600 font-semibold">100% (Complete)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">Pentavalent (1, 2, 3)</td>
                    <td className="p-2 border-r border-slate-200">6, 10, 14 Weeks</td>
                    <td className="p-2 font-bold text-blue-700 border-r border-slate-200">{pentaCount}</td>
                    <td className="p-2 text-blue-600 font-semibold">On Track</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">Measles-Rubella (MR 1 & 2)</td>
                    <td className="p-2 border-r border-slate-200">9 Months & 16-24 Months</td>
                    <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{mrCount}</td>
                    <td className="p-2 text-slate-600">In Progress</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">DPT Booster (1 & 2)</td>
                    <td className="p-2 border-r border-slate-200">16-24 Months & 5-6 Years</td>
                    <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{dptBoosterCount}</td>
                    <td className="p-2 text-slate-600">In Progress</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures & Certification */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs text-slate-600">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1"></div>
              <p className="font-bold text-slate-800">Signature of ASHA</p>
              <p className="text-[10px] text-slate-500">Sunita Devi</p>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1"></div>
              <p className="font-bold text-slate-800">Verified by ANM</p>
              <p className="text-[10px] text-slate-500">Sub-Centre Rampur</p>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1"></div>
              <p className="font-bold text-slate-800">Medical Officer (MOIC)</p>
              <p className="text-[10px] text-slate-500">PHC Baraut</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
