import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { X, HeartHandshake, Check, AlertCircle } from 'lucide-react';

export function RecordAncModal({ mother, ancVisit, onClose }) {
  const { recordAncVisit } = useHealthRecords();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState(mother?.weight || 50);
  const [bp, setBp] = useState('120/80');
  const [hb, setHb] = useState(10.5);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    recordAncVisit(mother.id, ancVisit.id, {
      date,
      weight: parseFloat(weight),
      bp,
      hb: parseFloat(hb),
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-pink-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-pink-200" />
            <div>
              <h3 className="font-bold text-base">
                Record Antenatal Care (ANC) Checkup
              </h3>
              <p className="text-xs text-pink-100">
                {mother.name} • {ancVisit.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-pink-200 hover:text-white rounded-lg hover:bg-pink-700/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Checkup Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Blood Pressure (BP)
              </label>
              <input
                type="text"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                placeholder="120/80"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
              <span>Hemoglobin (Hb in g/dL)</span>
              {parseFloat(hb) < 11 && (
                <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Anemia Indicator (&lt;11 g/dL)
                </span>
              )}
            </label>
            <input
              type="number"
              step="0.1"
              value={hb}
              onChange={(e) => setHb(e.target.value)}
              required
              className={`w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-pink-500 outline-none ${
                parseFloat(hb) < 7 ? 'border-rose-500 bg-rose-50' : parseFloat(hb) < 11 ? 'border-amber-500 bg-amber-50' : 'border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Doctor / ASHA Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="IFA tablets distributed, doctor referral recommendations etc."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Checkup</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
