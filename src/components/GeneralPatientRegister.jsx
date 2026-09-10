import { useState } from 'react';
import { useHealthRecords } from '../context/HealthRecordContext';
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Heart, 
  Baby, 
  Activity,
  Droplet,
  IdCard,
  MapPin
} from 'lucide-react';

export function GeneralPatientRegister({ onOpenAddPatient }) {
  const { t, patients, deletePatient } = useHealthRecords();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('all');

  const wards = Array.from(new Set(patients.map((p) => p.ward).filter(Boolean)));
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.village && p.village.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.aadhaarId && p.aadhaarId.includes(searchQuery)) ||
      (p.bloodGroup && p.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.spouseName && p.spouseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.motherName && p.motherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.fatherName && p.fatherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.phone && p.phone.includes(searchQuery)) ||
      (p.ward && p.ward.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWard = selectedWard === 'all' || p.ward === selectedWard;
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesBloodGroup = selectedBloodGroup === 'all' || p.bloodGroup === selectedBloodGroup;

    return matchesSearch && matchesWard && matchesType && matchesBloodGroup;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s record?`)) {
      deletePatient(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" />
              <span>Village Master Health Register</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consolidated records of all citizens: Name, Age, Village, Blood Group, and Aadhaar ID
            </p>
          </div>

          <button
            onClick={onOpenAddPatient}
            className="self-start md:self-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t.registerNew}</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col lg:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, village, Aadhaar ID, blood group, phone..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              <option value="pregnant_mother">Pregnant Mothers (ANC)</option>
              <option value="child">Children (0-5 Yrs)</option>
              <option value="general">General / NCD</option>
            </select>

            {/* Blood Group Filter */}
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="all">All Blood Groups</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>

            {/* Ward Filter */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Wards</option>
              {wards.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Name & Age</th>
                <th className="py-3 px-4">Village & Ward</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Aadhaar ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Contact & Notes</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No records found matching filters
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Name & Age */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {p.age !== undefined && p.age !== null ? `${p.age} years` : 'Age N/A'}
                        {p.gender ? ` • ${p.gender}` : ''}
                      </div>
                    </td>

                    {/* Village & Ward */}
                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{p.village || 'Rampur Village'}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {p.ward}
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                        <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
                        <span>{p.bloodGroup || 'O+'}</span>
                      </span>
                    </td>

                    {/* Aadhaar ID */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-slate-800 font-mono text-xs bg-slate-100 px-2 py-1 rounded-md border border-slate-200 w-fit">
                        <IdCard className="w-3.5 h-3.5 text-slate-500" />
                        <span>{p.aadhaarId || 'XXXX-XXXX-XXXX'}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      {p.type === 'pregnant_mother' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                          <Heart className="w-3 h-3 text-pink-600" />
                          <span>Pregnant</span>
                        </span>
                      )}
                      {p.type === 'child' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          <Baby className="w-3 h-3 text-blue-600" />
                          <span>Child</span>
                        </span>
                      )}
                      {p.type === 'general' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <Activity className="w-3 h-3 text-emerald-600" />
                          <span>General</span>
                        </span>
                      )}
                    </td>

                    {/* Contact & Notes */}
                    <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
                      <div className="font-mono text-slate-700 font-semibold">{p.phone}</div>
                      {p.type === 'pregnant_mother' && (
                        <p className="text-[11px] text-slate-500">
                          {p.isHighRisk ? <span className="text-rose-600 font-bold">⚠ {p.highRiskReason}</span> : `LMP: ${p.lmpDate}`}
                        </p>
                      )}
                      {p.type === 'child' && (
                        <p className="text-[11px] text-slate-500">
                          Mother: {p.motherName || 'N/A'} • DOB: {p.dob}
                        </p>
                      )}
                      {p.type === 'general' && p.healthCondition && (
                        <p className="text-[11px] text-slate-500 font-medium">
                          {p.healthCondition}
                        </p>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
