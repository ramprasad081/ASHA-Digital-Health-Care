// Universal Immunization Programme (UIP) India Schedule - Pure English Standard
export const UIP_SCHEDULE = [
  {
    milestoneId: 'birth',
    labelEn: 'At Birth',
    ageDays: 0,
    vaccines: [
      { id: 'bcg', name: 'BCG', descEn: 'Tuberculosis prevention' },
      { id: 'opv_0', name: 'OPV-0', descEn: 'Oral Polio Vaccine Birth Dose' },
      { id: 'hep_b_0', name: 'Hep-B Birth', descEn: 'Hepatitis B within 24 hours' }
    ]
  },
  {
    milestoneId: '6_weeks',
    labelEn: '6 Weeks (1.5 Months)',
    ageDays: 42,
    vaccines: [
      { id: 'opv_1', name: 'OPV-1', descEn: 'Oral Polio Vaccine Dose 1' },
      { id: 'penta_1', name: 'Pentavalent-1', descEn: 'DPT, Hep B, Hib combined' },
      { id: 'rota_1', name: 'Rotavirus-1', descEn: 'Diarrhea prevention' },
      { id: 'fipv_1', name: 'fIPV-1', descEn: 'Fractional Inactivated Polio' },
      { id: 'pcv_1', name: 'PCV-1', descEn: 'Pneumococcal Conjugate 1' }
    ]
  },
  {
    milestoneId: '10_weeks',
    labelEn: '10 Weeks (2.5 Months)',
    ageDays: 70,
    vaccines: [
      { id: 'opv_2', name: 'OPV-2', descEn: 'Oral Polio Vaccine Dose 2' },
      { id: 'penta_2', name: 'Pentavalent-2', descEn: 'DPT, Hep B, Hib combined' },
      { id: 'rota_2', name: 'Rotavirus-2', descEn: 'Diarrhea prevention' }
    ]
  },
  {
    milestoneId: '14_weeks',
    labelEn: '14 Weeks (3.5 Months)',
    ageDays: 98,
    vaccines: [
      { id: 'opv_3', name: 'OPV-3', descEn: 'Oral Polio Vaccine Dose 3' },
      { id: 'penta_3', name: 'Pentavalent-3', descEn: 'DPT, Hep B, Hib combined' },
      { id: 'rota_3', name: 'Rotavirus-3', descEn: 'Diarrhea prevention' },
      { id: 'fipv_2', name: 'fIPV-2', descEn: 'Fractional Inactivated Polio 2' },
      { id: 'pcv_2', name: 'PCV-2', descEn: 'Pneumococcal Conjugate 2' }
    ]
  },
  {
    milestoneId: '9_12_months',
    labelEn: '9-12 Months',
    ageDays: 270,
    vaccines: [
      { id: 'mr_1', name: 'MR-1', descEn: 'Measles-Rubella 1st Dose' },
      { id: 'pcv_booster', name: 'PCV Booster', descEn: 'Pneumonia Booster' },
      { id: 'vit_a_1', name: 'Vitamin A (Dose 1)', descEn: 'Eye & Immunity boost' },
      { id: 'je_1', name: 'JE-1', descEn: 'Japanese Encephalitis 1' }
    ]
  },
  {
    milestoneId: '16_24_months',
    labelEn: '16-24 Months',
    ageDays: 480,
    vaccines: [
      { id: 'mr_2', name: 'MR-2', descEn: 'Measles-Rubella 2nd Dose' },
      { id: 'dpt_booster_1', name: 'DPT Booster-1', descEn: 'Diphtheria, Pertussis, Tetanus' },
      { id: 'opv_booster', name: 'OPV Booster', descEn: 'Polio Booster' },
      { id: 'vit_a_2', name: 'Vitamin A (Dose 2)', descEn: 'Eye & Immunity dose 2' }
    ]
  },
  {
    milestoneId: '5_6_years',
    labelEn: '5-6 Years',
    ageDays: 1825,
    vaccines: [
      { id: 'dpt_booster_2', name: 'DPT Booster-2', descEn: 'School age DPT Booster' }
    ]
  }
];

export function calculateVaccineStatus(childDob, givenVaccines = {}) {
  const birthDate = new Date(childDob);
  const today = new Date();
  const diffTime = today - birthDate;
  const ageInDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let totalDoses = 0;
  let completedDoses = 0;
  let overdueDoses = [];
  let dueSoonDoses = [];
  let detailedSchedule = [];

  UIP_SCHEDULE.forEach((milestone) => {
    const dueDate = new Date(birthDate);
    dueDate.setDate(dueDate.getDate() + milestone.ageDays);

    const milestoneVaccines = milestone.vaccines.map((v) => {
      totalDoses++;
      const givenInfo = givenVaccines[v.id];
      const isGiven = !!givenInfo;

      if (isGiven) {
        completedDoses++;
        return {
          ...v,
          status: 'completed',
          dueDate: dueDate.toISOString().split('T')[0],
          givenDate: typeof givenInfo === 'string' ? givenInfo : givenInfo.date
        };
      }

      const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
      
      let status = 'upcoming';
      if (daysUntilDue < 0) {
        status = 'overdue';
        overdueDoses.push({
          ...v,
          milestoneLabel: milestone.labelEn,
          dueDate: dueDate.toISOString().split('T')[0],
          daysOverdue: Math.abs(daysUntilDue)
        });
      } else if (daysUntilDue <= 15) {
        status = 'due_soon';
        dueSoonDoses.push({
          ...v,
          milestoneLabel: milestone.labelEn,
          dueDate: dueDate.toISOString().split('T')[0],
          daysUntilDue
        });
      }

      return {
        ...v,
        status,
        dueDate: dueDate.toISOString().split('T')[0],
        daysUntilDue
      };
    });

    detailedSchedule.push({
      ...milestone,
      dueDate: dueDate.toISOString().split('T')[0],
      vaccines: milestoneVaccines
    });
  });

  return {
    ageInDays,
    ageFormatted: formatAge(ageInDays),
    totalDoses,
    completedDoses,
    overdueDoses,
    dueSoonDoses,
    completionPercentage: Math.round((completedDoses / (totalDoses || 1)) * 100),
    detailedSchedule
  };
}

export function formatAge(days) {
  if (days < 0) return 'Newborn';
  if (days < 30) return `${days} days`;
  const months = Math.floor(days / 30.4375);
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  return remMonths > 0 ? `${years}y ${remMonths}m` : `${years} years`;
}
