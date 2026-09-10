import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { X, UserPlus, Heart, Baby, Users, AlertTriangle, Calendar, Droplet, IdCard, MapPin } from 'lucide-react';

export function AddPatientModal({ onClose }) {
  const { t, addPatient, calculatePregnancyDetails } = useHealthRecords();

  const [type, setType] = useState('pregnant_mother');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [village, setVillage] = useState('Rampur Village');
  const [ward, setWard] = useState('Ward 1 - East Sector');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [aadhaarId, setAadhaarId] = useState('');
  const [phone, setPhone] = useState('');
  const [abhaId, setAbhaId] = useState('');
  
  // Pregnant Mother specific
  const [spouseName, setSpouseName] = useState('');
  const [lmpDate, setLmpDate] = useState('');
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [highRiskReason, setHighRiskReason] = useState('');
  const [institutionalDeliveryPlanned, setInstitutionalDeliveryPlanned] = useState('Primary Health Centre (PHC) Baraut');

  // Child specific
  const [gender, setGender] = useState('Boy');
  const [dob, setDob] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [birthWeightKg, setBirthWeightKg] = useState('2.9');
  const [birthDosesGiven, setBirthDosesGiven] = useState(true);

  // General specific
  const [generalGender, setGeneralGender] = useState('Female');
  const [healthCondition, setHealthCondition] = useState('');
  const [medicationStatus, setMedicationStatus] = useState('');

  const eddPreview = lmpDate ? calculatePregnancyDetails(lmpDate) : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'pregnant_mother') {
      const newMother = {
        type: 'pregnant_mother',
        name,
        age: parseInt(age, 10) || 24,
        village,
        ward,
        bloodGroup,
        aadhaarId: aadhaarId || 'XXXX-XXXX-XXXX',
        spouseName,
        phone,
        abhaId,
        lmpDate,
        isHighRisk,
        highRiskReason: isHighRisk ? highRiskReason : '',
        ifaGivenCount: 60,
        tdDoses: { td1: null, td2: null, booster: null },
        ancVisits: [
          { id: 1, title: 'ANC 1 (First Trimester)', date: null, dueDate: lmpDate, weight: null, bp: null, hb: null, status: 'upcoming' },
          { id: 2, title: 'ANC 2 (Second Trimester)', date: null, dueDate: null, weight: null, bp: null, hb: null, status: 'upcoming' },
          { id: 3, title: 'ANC 3 (Third Trimester)', date: null, dueDate: null, weight: null, bp: null, hb: null, status: 'upcoming' },
          { id: 4, title: 'ANC 4 (36 Weeks)', date: null, dueDate: null, weight: null, bp: null, hb: null, status: 'upcoming' }
        ],
        institutionalDeliveryPlanned,
        emergencyTransportNumber: '102 (Ambulance Service)'
      };
      addPatient(newMother);
    } else if (type === 'child') {
      const initialGiven = {};
      if (birthDosesGiven) {
        initialGiven['bcg'] = { date: dob };
        initialGiven['opv_0'] = { date: dob };
        initialGiven['hep_b_0'] = { date: dob };
      }

      const newChild = {
        type: 'child',
        name,
        age: 0,
        village,
        ward,
        bloodGroup,
        aadhaarId: aadhaarId || 'XXXX-XXXX-XXXX',
        gender,
        dob,
        birthWeightKg: parseFloat(birthWeightKg) || 2.8,
        motherName,
        fatherName,
        phone,
        givenVaccines: initialGiven,
        notes: ''
      };
      addPatient(newChild);
    } else {
      const newGeneral = {
        type: 'general',
        name,
        age: parseInt(age, 10) || 45,
        gender: generalGender,
        village,
        ward,
        bloodGroup,
        aadhaarId: aadhaarId || 'XXXX-XXXX-XXXX',
        phone,
        abhaId,
        healthCondition,
        medicationStatus,
        lastCheckedDate: new Date().toISOString().split('T')[0]
      };
      addPatient(newGeneral);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-emerald-700 px-5 py-4 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-base">
                Register New Beneficiary
              </h3>
              <p className="text-xs text-emerald-100">
                Complete Digital Health Record
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Category Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Registration Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('pregnant_mother')}
                className={`py-2 px-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'pregnant_mother'
                    ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-4 h-4 text-pink-600" />
                <span>Pregnant Mother</span>
              </button>

              <button
                type="button"
                onClick={() => setType('child')}
                className={`py-2 px-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'child'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Baby className="w-4 h-4 text-blue-600" />
                <span>Child (0-5 Yrs)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('general')}
                className={`py-2 px-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'general'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>General / NCD</span>
              </button>
            </div>
          </div>

          {/* Standard Fields: Name, Age, Blood Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {type === 'child' ? 'Child Name' : 'Full Name'} *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={type === 'child' ? 'e.g. Aarav Kumar' : 'e.g. Meena Devi'}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-rose-500" />
                <span>Blood Group</span> *
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-rose-700"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* Village & Ward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Village</span> *
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                required
                placeholder="e.g. Rampur Village"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ward / Sector *
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                <option value="Ward 1 - East Sector">Ward 1 - East Sector</option>
                <option value="Ward 2 - New Colony">Ward 2 - New Colony</option>
                <option value="Ward 3 - Main Market">Ward 3 - Main Market</option>
                <option value="Ward 4 - Greenfields Colony">Ward 4 - Greenfields Colony</option>
              </select>
            </div>
          </div>

          {/* Aadhaar ID & Mobile Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <IdCard className="w-3.5 h-3.5 text-blue-600" />
                <span>Aadhaar ID (12 Digits)</span> *
              </label>
              <input
                type="text"
                value={aadhaarId}
                onChange={(e) => setAadhaarId(e.target.value)}
                required
                placeholder="4589-7712-3490"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Phone (WhatsApp) *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="9876543210"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono"
              />
            </div>
          </div>

          {/* Specific: Pregnant Mother */}
          {type === 'pregnant_mother' && (
            <div className="p-3.5 bg-pink-50/50 rounded-xl border border-pink-200 space-y-3">
              <h4 className="text-xs font-bold text-pink-900 uppercase">
                Pregnancy & ANC Registration
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    placeholder="23"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Husband Name *
                  </label>
                  <input
                    type="text"
                    value={spouseName}
                    onChange={(e) => setSpouseName(e.target.value)}
                    required
                    placeholder="e.g. Suresh Kumar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              {/* LMP Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Menstrual Period (LMP Date) *
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-pink-500 outline-none bg-white"
                />
              </div>

              {/* Auto EDD Preview */}
              {eddPreview && (
                <div className="p-2.5 bg-white rounded-lg border border-pink-200 text-xs text-pink-900 flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    Calculated Expected Delivery Date (EDD):
                  </span>
                  <strong className="text-sm font-extrabold text-pink-700">{eddPreview.edd}</strong>
                </div>
              )}

              {/* High Risk Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isHighRisk}
                    onChange={(e) => setIsHighRisk(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Flag as High-Risk Pregnancy (HRP)?
                  </span>
                </label>

                {isHighRisk && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={highRiskReason}
                      onChange={(e) => setHighRiskReason(e.target.value)}
                      placeholder="Specify risk (e.g. Severe Anemia Hb < 7, High BP)"
                      className="w-full px-3 py-1.5 border border-rose-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Specific: Child */}
          {type === 'child' && (
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-3">
              <h4 className="text-xs font-bold text-blue-900 uppercase">
                Child UIP Immunization Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Boy">Boy</option>
                    <option value="Girl">Girl</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mother Name *
                  </label>
                  <input
                    type="text"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    required
                    placeholder="e.g. Suman Devi"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father Name
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Birth Doses Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={birthDosesGiven}
                    onChange={(e) => setBirthDosesGiven(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    Birth doses (BCG, OPV-0, Hep-B) already administered at hospital?
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Specific: General Villager */}
          {type === 'general' && (
            <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold text-emerald-900 uppercase">
                General Health / NCD Screening
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="55"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={generalGender}
                    onChange={(e) => setGeneralGender(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Health Condition (Diabetes, Hypertension, TB etc.)
                </label>
                <input
                  type="text"
                  value={healthCondition}
                  onChange={(e) => setHealthCondition(e.target.value)}
                  placeholder="e.g. Type 2 Diabetes & Hypertension"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Medication / Care Notes
                </label>
                <input
                  type="text"
                  value={medicationStatus}
                  onChange={(e) => setMedicationStatus(e.target.value)}
                  placeholder="e.g. Monthly medicines received from PHC"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Submit buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {t.save}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
