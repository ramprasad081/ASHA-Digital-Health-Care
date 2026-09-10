import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PATIENTS } from '../data/mockVillageData';
import { calculateVaccineStatus } from '../data/uipVaccines';
import { translations } from '../utils/translations';

const HealthRecordContext = createContext();

const STORAGE_KEY = 'asha_digital_village_records_v4_pure_english';
const AUTH_STORAGE_KEY = 'asha_authenticated_user_v1';

// Pre-configured authorized ASHA Workers
export const DEMO_ASHA_WORKERS = [
  {
    ashaId: 'ASHA-UP-2026-081',
    name: 'Sunita Devi',
    mobile: '9876543210',
    pin: '1234',
    designation: 'ASHA Facilitator',
    village: 'Rampur Village',
    wards: 'Wards 1-4',
    phc: 'Primary Health Centre (PHC) Baraut'
  },
  {
    ashaId: 'ASHA-UP-2026-082',
    name: 'Anita Sharma',
    mobile: '9811223344',
    pin: '1234',
    designation: 'Senior ASHA Worker',
    village: 'Shivpur Village',
    wards: 'Wards 1-2',
    phc: 'Primary Health Centre (PHC) Baraut'
  }
];

function sanitizeRecord(p) {
  if (!p) return p;

  const clean = (str) => {
    if (!str || typeof str !== 'string') return str;
    let res = str.replace(/[\u0900-\u097F]/g, '').trim();
    res = res.replace(/^\((.*)\)$/, '$1').trim();
    if (res.toLowerCase().includes('boy') || res.toLowerCase().includes('ladka')) return 'Boy';
    if (res.toLowerCase().includes('girl') || res.toLowerCase().includes('ladki')) return 'Girl';
    if (res.toLowerCase().includes('female') || res.toLowerCase().includes('mahila')) return 'Female';
    if (res.toLowerCase().includes('male') || res.toLowerCase().includes('purush')) return 'Male';
    return res;
  };

  let cleanWard = p.ward || 'Ward 1 - East Sector';
  if (cleanWard.includes('Mandir') || cleanWard.includes('1')) cleanWard = 'Ward 1 - East Sector';
  else if (cleanWard.includes('Basti') || cleanWard.includes('2')) cleanWard = 'Ward 2 - New Colony';
  else if (cleanWard.includes('Bazar') || cleanWard.includes('3')) cleanWard = 'Ward 3 - Main Market';
  else if (cleanWard.includes('Kisan') || cleanWard.includes('4')) cleanWard = 'Ward 4 - Greenfields Colony';

  return {
    ...p,
    name: clean(p.name) || 'Beneficiary',
    gender: clean(p.gender) || (p.type === 'pregnant_mother' ? 'Female' : 'Male'),
    village: clean(p.village) || 'Rampur Village',
    ward: cleanWard,
    bloodGroup: p.bloodGroup || 'O+',
    aadhaarId: p.aadhaarId || 'XXXX-XXXX-XXXX',
    spouseName: clean(p.spouseName) || '',
    motherName: clean(p.motherName) || '',
    fatherName: clean(p.fatherName) || '',
    highRiskReason: clean(p.highRiskReason) || (p.isHighRisk ? 'Severe Anemia (Hb: 7.2 g/dL) & Hypertension' : ''),
    notes: clean(p.notes) || '',
    healthCondition: clean(p.healthCondition) || '',
    medicationStatus: clean(p.medicationStatus) || ''
  };
}

export function HealthRecordProvider({ children: childrenElements }) {
  const lang = 'en';
  
  // ASHA Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Error loading user session', e);
    }
    // Default to Sunita Devi for instant out-of-the-box experience, but login page is fully functional
    return DEMO_ASHA_WORKERS[0];
  });

  const t = {
    ...translations.en,
    ashaName: currentUser ? `${currentUser.name} (${currentUser.designation})` : 'Sunita Devi (ASHA Worker)',
    villageName: currentUser ? `${currentUser.village} (${currentUser.wards})` : 'Rampur Village (Wards 1-4)',
    phcName: currentUser ? currentUser.phc : 'Primary Health Centre (PHC), Baraut'
  };

  // Patients state
  const [patients, setPatients] = useState(() => {
    try {
      localStorage.removeItem('asha_digital_village_records_v1');
      localStorage.removeItem('asha_digital_village_records_v2');
      localStorage.removeItem('asha_digital_village_records_v3');
      localStorage.removeItem('asha_lang_pref');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        if (saved.match(/[\u0900-\u097F]/)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
          return INITIAL_PATIENTS;
        }
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeRecord);
        }
      }
    } catch (e) {
      console.error('Error loading patients from localStorage', e);
    }
    return INITIAL_PATIENTS;
  });

  // Active WhatsApp modal state
  const [whatsAppModalData, setWhatsAppModalData] = useState(null);

  // Sync patients to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [patients]);

  // Sync user session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save auth session', e);
    }
  }, [currentUser]);

  // Login handler
  const login = (identifier, pin) => {
    const cleanId = identifier.trim().toLowerCase();
    const matchedUser = DEMO_ASHA_WORKERS.find(
      (u) => (u.ashaId.toLowerCase() === cleanId || u.mobile === cleanId) && u.pin === pin
    );

    if (matchedUser) {
      setCurrentUser(matchedUser);
      return true;
    }

    // Accept custom ASHA ID with default PIN 1234
    if (cleanId.startsWith('asha') && pin === '1234') {
      const customUser = {
        ashaId: identifier.toUpperCase(),
        name: 'ASHA Facilitator',
        mobile: '9876543210',
        pin: '1234',
        designation: 'ASHA Worker',
        village: 'Rampur Village',
        wards: 'Wards 1-4',
        phc: 'Primary Health Centre (PHC) Baraut'
      };
      setCurrentUser(customUser);
      return true;
    }

    return false;
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // 1. Add Patient
  const addPatient = (patientData) => {
    const sanitized = sanitizeRecord(patientData);
    const newPatient = {
      ...sanitized,
      id: `pat-${Date.now()}`
    };
    setPatients((prev) => [newPatient, ...prev]);
    return newPatient;
  };

  // 2. Update Patient
  const updatePatient = (patientId, updatedData) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, ...sanitizeRecord(updatedData) } : p))
    );
  };

  // 3. Delete Patient
  const deletePatient = (patientId) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
  };

  // 4. Mark Child Vaccine Given
  const markVaccineGiven = (childId, vaccineId, dateString) => {
    const administeredDate = dateString || new Date().toISOString().split('T')[0];
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== childId) return p;
        const currentGiven = p.givenVaccines || {};
        return {
          ...p,
          givenVaccines: {
            ...currentGiven,
            [vaccineId]: { date: administeredDate }
          }
        };
      })
    );
  };

  // 5. Record ANC Checkup Visit for Mother
  const recordAncVisit = (motherId, ancId, visitDetails) => {
    const visitDate = visitDetails.date || new Date().toISOString().split('T')[0];
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== motherId) return p;
        const visits = p.ancVisits || [];
        const updatedVisits = visits.map((v) => {
          if (v.id === ancId) {
            return {
              ...v,
              status: 'completed',
              date: visitDate,
              weight: visitDetails.weight || v.weight,
              bp: visitDetails.bp || v.bp,
              hb: visitDetails.hb || v.hb,
              notes: visitDetails.notes || ''
            };
          }
          return v;
        });
        return {
          ...p,
          ancVisits: updatedVisits
        };
      })
    );
  };

  // 6. Pregnancy Calculation Helper
  const calculatePregnancyDetails = (lmpDate) => {
    if (!lmpDate) return { edd: null, weeks: 0, trimester: 1, daysLeft: 0 };
    const lmp = new Date(lmpDate);
    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280);

    const today = new Date();
    const diffTime = today - lmp;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.max(0, Math.floor(diffDays / 7));
    const daysLeft = Math.floor((edd - today) / (1000 * 60 * 60 * 24));

    let trimester = 1;
    if (weeks >= 28) trimester = 3;
    else if (weeks >= 13) trimester = 2;

    return {
      edd: edd.toISOString().split('T')[0],
      weeks,
      daysLeft,
      trimester
    };
  };

  // 7. WhatsApp Reminder Helper
  const openWhatsAppModal = ({ type, recipientName, phone, childName, vaccineName, dueDate, motherName, ancName }) => {
    let message = '';
    const ashaName = t.ashaName;
    const village = t.villageName;

    if (type === 'vaccine') {
      message = `Hello ${recipientName || 'Parent'}, your child ${childName || 'Child'} is due for the "${vaccineName}" vaccine (Scheduled Date: ${dueDate}).\n\nPlease visit your nearest Village Health Centre / Primary Health Centre to ensure timely immunization.\n\n- ASHA: ${ashaName}, Village: ${village}`;
    } else if (type === 'anc') {
      message = `Hello ${motherName}, your Antenatal Care checkup (${ancName}) is scheduled for ${dueDate}.\n\nPlease visit the Primary Health Centre for your health checkup and safe delivery preparation. Remember to take your IFA tablets daily.\n\n- ASHA: ${ashaName}, Village: ${village}`;
    }

    setWhatsAppModalData({
      phone: phone ? phone.replace(/\D/g, '') : '',
      recipientName,
      message
    });
  };

  const closeWhatsAppModal = () => {
    setWhatsAppModalData(null);
  };

  // 8. Export Backup to JSON
  const exportDataAsJSON = () => {
    const dataStr = JSON.stringify(patients, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `ASHA_Village_Health_Records_Backup_${dateStr}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 9. Import Backup from JSON
  const importDataFromJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.map(sanitizeRecord);
        setPatients(cleaned);
        return { success: true, count: cleaned.length };
      }
      return { success: false, error: 'Invalid data structure' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 10. Reset to initial demo data
  const resetToInitialData = () => {
    setPatients(INITIAL_PATIENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
  };

  // Computed Stats & Metrics
  const pregnantMothers = patients.filter((p) => p.type === 'pregnant_mother');
  const children = patients.filter((p) => p.type === 'child');
  const generalPatients = patients.filter((p) => p.type === 'general');

  const highRiskMothers = pregnantMothers.filter((m) => m.isHighRisk);

  let totalOverdueDoses = 0;
  let totalDueSoonDoses = 0;
  const childrenWithOverdue = [];
  const childrenWithDueSoon = [];

  children.forEach((child) => {
    const status = calculateVaccineStatus(child.dob, child.givenVaccines || {});
    if (status.overdueDoses.length > 0) {
      totalOverdueDoses += status.overdueDoses.length;
      childrenWithOverdue.push({
        child,
        overdueList: status.overdueDoses,
        completionPercentage: status.completionPercentage,
        ageFormatted: status.ageFormatted
      });
    }
    if (status.dueSoonDoses.length > 0) {
      totalDueSoonDoses += status.dueSoonDoses.length;
      childrenWithDueSoon.push({
        child,
        dueSoonList: status.dueSoonDoses,
        completionPercentage: status.completionPercentage,
        ageFormatted: status.ageFormatted
      });
    }
  });

  return (
    <HealthRecordContext.Provider
      value={{
        lang,
        t,
        currentUser,
        login,
        logout,
        demoUsers: DEMO_ASHA_WORKERS,
        patients,
        pregnantMothers,
        children,
        generalPatients,
        highRiskMothers,
        totalOverdueDoses,
        totalDueSoonDoses,
        childrenWithOverdue,
        childrenWithDueSoon,
        addPatient,
        updatePatient,
        deletePatient,
        markVaccineGiven,
        recordAncVisit,
        calculatePregnancyDetails,
        openWhatsAppModal,
        closeWhatsAppModal,
        whatsAppModalData,
        exportDataAsJSON,
        importDataFromJSON,
        resetToInitialData
      }}
    >
      {childrenElements}
    </HealthRecordContext.Provider>
  );
}

export function useHealthRecords() {
  const context = useContext(HealthRecordContext);
  if (!context) {
    throw new Error('useHealthRecords must be used within HealthRecordProvider');
  }
  return context;
}
