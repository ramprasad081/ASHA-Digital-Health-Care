// Initial realistic seed data for Rampur Village - Pure English Standard with Blood Group, Village, and Aadhaar ID

export const INITIAL_PATIENTS = [
  // 1. Pregnant Mothers (ANC)
  {
    id: 'pat-m1',
    type: 'pregnant_mother',
    name: 'Meena Devi',
    age: 23,
    village: 'Rampur Village',
    bloodGroup: 'B+',
    aadhaarId: '4589-7712-3490',
    spouseName: 'Suresh Kumar',
    phone: '9876543210',
    ward: 'Ward 2 - New Colony',
    abhaId: 'ABHA-9821-4451-2290',
    lmpDate: '2026-02-10', // LMP (EDD ~2026-11-17, ~30 weeks gestation)
    isHighRisk: true,
    highRiskReason: 'Severe Anemia (Hb: 7.2 g/dL) & Hypertension (BP: 140/95)',
    ifaGivenCount: 180,
    tdDoses: {
      td1: '2026-03-15',
      td2: '2026-04-18',
      booster: null
    },
    ancVisits: [
      { id: 1, title: 'ANC 1 (First Trimester)', date: '2026-03-15', weight: 48, bp: '120/80', hb: 8.5, status: 'completed' },
      { id: 2, title: 'ANC 2 (Second Trimester)', date: '2026-05-20', weight: 51, bp: '135/90', hb: 7.8, status: 'completed' },
      { id: 3, title: 'ANC 3 (Third Trimester - 28-34w)', date: null, dueDate: '2026-09-08', weight: null, bp: null, hb: null, status: 'overdue' },
      { id: 4, title: 'ANC 4 (36 Weeks)', date: null, dueDate: '2026-10-20', weight: null, bp: null, hb: null, status: 'upcoming' }
    ],
    institutionalDeliveryPlanned: 'Community Health Centre (CHC) Baraut',
    emergencyTransportNumber: '102 (Ambulance Service)',
    notes: 'Weekly home visits mandatory. Iron Sucrose IV infusion prescribed by Medical Officer.'
  },
  {
    id: 'pat-m2',
    type: 'pregnant_mother',
    name: 'Pooja Sharma',
    age: 26,
    village: 'Rampur Village',
    bloodGroup: 'O+',
    aadhaarId: '8834-1129-9943',
    spouseName: 'Amit Sharma',
    phone: '9812345678',
    ward: 'Ward 1 - East Sector',
    abhaId: 'ABHA-7744-1123-9988',
    lmpDate: '2025-12-15', // Full term (~38 weeks)
    isHighRisk: false,
    highRiskReason: '',
    ifaGivenCount: 180,
    tdDoses: {
      td1: '2026-01-20',
      td2: '2026-02-22',
      booster: null
    },
    ancVisits: [
      { id: 1, title: 'ANC 1', date: '2026-01-20', weight: 52, bp: '118/76', hb: 11.2, status: 'completed' },
      { id: 2, title: 'ANC 2', date: '2026-03-24', weight: 56, bp: '120/78', hb: 11.0, status: 'completed' },
      { id: 3, title: 'ANC 3', date: '2026-06-18', weight: 60, bp: '122/80', hb: 11.4, status: 'completed' },
      { id: 4, title: 'ANC 4', date: '2026-08-25', weight: 63, bp: '120/82', hb: 11.1, status: 'completed' }
    ],
    institutionalDeliveryPlanned: 'Primary Health Centre (PHC) Baraut',
    emergencyTransportNumber: '102 / 108',
    notes: 'National Maternity Benefit Scheme (JSY) registration verified. Institutional delivery ready.'
  },
  {
    id: 'pat-m3',
    type: 'pregnant_mother',
    name: 'Rukhsar Bano',
    age: 21,
    village: 'Rampur Village',
    bloodGroup: 'A+',
    aadhaarId: '6612-4498-1120',
    spouseName: 'Irfan Khan',
    phone: '9765432190',
    ward: 'Ward 3 - Main Market',
    abhaId: 'ABHA-3321-8890-4411',
    lmpDate: '2026-07-01', // 1st trimester (~10 weeks)
    isHighRisk: false,
    highRiskReason: '',
    ifaGivenCount: 60,
    tdDoses: {
      td1: '2026-08-12',
      td2: null,
      booster: null
    },
    ancVisits: [
      { id: 1, title: 'ANC 1', date: '2026-08-12', weight: 46, bp: '110/70', hb: 10.5, status: 'completed' },
      { id: 2, title: 'ANC 2', date: null, dueDate: '2026-11-05', weight: null, bp: null, hb: null, status: 'upcoming' },
      { id: 3, title: 'ANC 3', date: null, dueDate: '2027-01-20', weight: null, bp: null, hb: null, status: 'upcoming' },
      { id: 4, title: 'ANC 4', date: null, dueDate: '2027-03-10', weight: null, bp: null, hb: null, status: 'upcoming' }
    ],
    institutionalDeliveryPlanned: 'District Hospital',
    emergencyTransportNumber: '108',
    notes: 'Primi Gravida (First pregnancy). Folic Acid tablets distributed.'
  },

  // 2. Children (Immunization UIP)
  {
    id: 'pat-c1',
    type: 'child',
    name: 'Aarav Kumar',
    gender: 'Boy',
    age: 0,
    village: 'Rampur Village',
    bloodGroup: 'B+',
    aadhaarId: '9012-3344-5561',
    dob: '2026-04-20', // ~4.5 months old. 14 weeks vaccines overdue
    motherName: 'Suman Devi',
    fatherName: 'Rajesh Kumar',
    phone: '9898981234',
    ward: 'Ward 2 - New Colony',
    birthWeightKg: 2.8,
    givenVaccines: {
      'bcg': { date: '2026-04-21' },
      'opv_0': { date: '2026-04-21' },
      'hep_b_0': { date: '2026-04-21' },
      'opv_1': { date: '2026-06-03' },
      'penta_1': { date: '2026-06-03' },
      'rota_1': { date: '2026-06-03' },
      'fipv_1': { date: '2026-06-03' },
      'pcv_1': { date: '2026-06-03' },
      'opv_2': { date: '2026-07-02' },
      'penta_2': { date: '2026-07-02' },
      'rota_2': { date: '2026-07-02' }
    },
    notes: 'Parents were away for agricultural work. 14-week third pentavalent booster missed. Immediate follow-up required.'
  },
  {
    id: 'pat-c2',
    type: 'child',
    name: 'Anaya Singh',
    gender: 'Girl',
    age: 0,
    village: 'Rampur Village',
    bloodGroup: 'O+',
    aadhaarId: '7721-9988-3341',
    dob: '2026-08-25', // ~2-3 weeks old newborn
    motherName: 'Priyanka Singh',
    fatherName: 'Vikas Singh',
    phone: '9711223344',
    ward: 'Ward 4 - Greenfields Colony',
    birthWeightKg: 3.1,
    givenVaccines: {
      'bcg': { date: '2026-08-26' },
      'opv_0': { date: '2026-08-26' },
      'hep_b_0': { date: '2026-08-26' }
    },
    notes: 'Healthy newborn. Institutional delivery at PHC. 6-week dose due next month.'
  },
  {
    id: 'pat-c3',
    type: 'child',
    name: 'Kabir Verma',
    gender: 'Boy',
    age: 1,
    village: 'Rampur Village',
    bloodGroup: 'AB+',
    aadhaarId: '5544-2211-9900',
    dob: '2025-06-10', // ~15 months old
    motherName: 'Rita Verma',
    fatherName: 'Manoj Verma',
    phone: '9988776655',
    ward: 'Ward 1 - East Sector',
    birthWeightKg: 2.9,
    givenVaccines: {
      'bcg': { date: '2025-06-11' },
      'opv_0': { date: '2025-06-11' },
      'hep_b_0': { date: '2025-06-11' },
      'opv_1': { date: '2025-07-25' },
      'penta_1': { date: '2025-07-25' },
      'rota_1': { date: '2025-07-25' },
      'fipv_1': { date: '2025-07-25' },
      'pcv_1': { date: '2025-07-25' },
      'opv_2': { date: '2025-08-22' },
      'penta_2': { date: '2025-08-22' },
      'rota_2': { date: '2025-08-22' },
      'opv_3': { date: '2025-09-26' },
      'penta_3': { date: '2025-09-26' },
      'rota_3': { date: '2025-09-26' },
      'fipv_2': { date: '2025-09-26' },
      'pcv_2': { date: '2025-09-26' },
      'mr_1': { date: '2026-03-18' },
      'pcv_booster': { date: '2026-03-18' },
      'vit_a_1': { date: '2026-03-18' }
    },
    notes: 'Primary immunization completed. 16-24 month MR-2 and DPT Booster-1 due soon.'
  },
  {
    id: 'pat-c4',
    type: 'child',
    name: 'Riya Yadav',
    gender: 'Girl',
    age: 5,
    village: 'Rampur Village',
    bloodGroup: 'A-',
    aadhaarId: '3322-1199-8877',
    dob: '2021-08-15', // ~5 years old
    motherName: 'Sunita Yadav',
    fatherName: 'Dharmendra Yadav',
    phone: '9871122334',
    ward: 'Ward 3 - Main Market',
    birthWeightKg: 2.7,
    givenVaccines: {
      'bcg': { date: '2021-08-16' },
      'opv_0': { date: '2021-08-16' },
      'hep_b_0': { date: '2021-08-16' },
      'opv_1': { date: '2021-09-30' },
      'penta_1': { date: '2021-09-30' },
      'rota_1': { date: '2021-09-30' },
      'fipv_1': { date: '2021-09-30' },
      'pcv_1': { date: '2021-09-30' },
      'opv_2': { date: '2021-10-28' },
      'penta_2': { date: '2021-10-28' },
      'rota_2': { date: '2021-10-28' },
      'opv_3': { date: '2021-12-02' },
      'penta_3': { date: '2021-12-02' },
      'rota_3': { date: '2021-12-02' },
      'fipv_2': { date: '2021-12-02' },
      'pcv_2': { date: '2021-12-02' },
      'mr_1': { date: '2022-05-20' },
      'pcv_booster': { date: '2022-05-20' },
      'vit_a_1': { date: '2022-05-20' },
      'mr_2': { date: '2023-01-14' },
      'dpt_booster_1': { date: '2023-01-14' },
      'opv_booster': { date: '2023-01-14' },
      'vit_a_2': { date: '2023-01-14' }
    },
    notes: '5-year DPT Booster-2 due for school entry.'
  },

  // 3. General Villager Health Follow-ups (NCD / Elderly)
  {
    id: 'pat-g1',
    type: 'general',
    name: 'Ramlal Tyagi',
    age: 62,
    gender: 'Male',
    village: 'Rampur Village',
    bloodGroup: 'B-',
    aadhaarId: '1234-5678-9012',
    spouseName: 'Shanti Devi',
    phone: '9834567890',
    ward: 'Ward 1 - East Sector',
    abhaId: 'ABHA-1234-5678-9012',
    healthCondition: 'Diabetes & Hypertension',
    medicationStatus: 'Regular medications from PHC. Blood Sugar: 145 mg/dL, BP: 130/85',
    lastCheckedDate: '2026-08-30',
    notes: 'Screened under Non-Communicable Disease (NCD) program. Monthly checkup required.'
  },
  {
    id: 'pat-g2',
    type: 'general',
    name: 'Kamla Devi',
    age: 48,
    gender: 'Female',
    village: 'Rampur Village',
    bloodGroup: 'O-',
    aadhaarId: '9900-1122-3344',
    spouseName: 'Hari Singh',
    phone: '9845123987',
    ward: 'Ward 4 - Greenfields Colony',
    abhaId: 'ABHA-9900-1122-3344',
    healthCondition: 'Chronic Cough & Seasonal Fever (TB Screening Follow-up)',
    medicationStatus: 'Sputum test report clear. Antibiotic course completed.',
    lastCheckedDate: '2026-09-02',
    notes: 'Enrolled for nutritional supplementation program.'
  }
];
