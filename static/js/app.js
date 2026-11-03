
// ==========================================
// CLIENT-SIDE CLINICAL ENGINE & FALLBACK STORE
// Enables 100% permanent zero-downtime execution on Netlify, GitHub Pages, or offline
// ==========================================
const ClientFallbackStore = {
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Rajesh Sharma, MD, DM',
      specialty: 'Cardiology',
      specialty_code: 'cardiology',
      title: 'Chief of Preventive Cardiology & Heart Care',
      hospital: 'Apollo Heart Institute, New Delhi',
      experience_years: 18,
      rating: 4.95,
      review_count: 342,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
      available_slots: ['Tomorrow at 09:30 AM (Urgent Reserved)', 'Tomorrow at 02:00 PM', 'Thursday at 11:15 AM'],
      bio: 'Specializes in coronary artery disease prevention, blood pressure control, and cardiac rehabilitation.'
    },
    {
      id: 'doc-2',
      name: 'Dr. Priya Nair, MD',
      specialty: 'Endocrinology',
      specialty_code: 'endocrinology',
      title: 'Senior Consultant Diabetologist',
      hospital: 'Max Center for Diabetes & Metabolic Care, Mumbai',
      experience_years: 14,
      rating: 4.92,
      review_count: 286,
      avatar: 'https://images.unsplash.com/photo-1594824813511-309df5ff6bf9?auto=format&fit=crop&q=80&w=256',
      available_slots: ['Today at 04:30 PM', 'Wednesday at 10:00 AM', 'Friday at 01:45 PM'],
      bio: 'Specializes in reversing pre-diabetes, HbA1c control, and insulin resistance management.'
    },
    {
      id: 'doc-3',
      name: 'Dr. Amitav Banerjee, MD, DM',
      specialty: 'Nephrology',
      specialty_code: 'nephrology',
      title: 'Director of Renal Sciences & Kidney Care',
      hospital: 'Fortis Kidney Institute, Kolkata',
      experience_years: 16,
      rating: 4.89,
      review_count: 194,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=256',
      available_slots: ['Tomorrow at 10:15 AM', 'Thursday at 03:30 PM', 'Friday at 09:00 AM'],
      bio: 'Specializes in diabetic nephropathy prevention, blood pressure-induced kidney strain, and renal preservation.'
    },
    {
      id: 'doc-4',
      name: 'Dr. Sunita Deshmukh, MD, DM',
      specialty: 'Neurology',
      specialty_code: 'neurology',
      title: 'Senior Neurologist & Stroke Care Lead',
      hospital: 'Manipal Brain & Neuro Institute, Bengaluru',
      experience_years: 15,
      rating: 4.96,
      review_count: 310,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
      available_slots: ['Today at 03:00 PM (Priority)', 'Wednesday at 01:15 PM', 'Thursday at 04:00 PM'],
      bio: 'Expert in cerebrovascular health, stroke prevention, and carotid blood flow monitoring.'
    }
  ],
  patients: {
    'pat-1': { id: 'pat-1', name: 'Ramesh Patel', age: 58, sex: 'male', sbp: 160, dbp: 98, total_chol: 250, hdl_chol: 38, fasting_glucose: 115, hba1c: 6.2, bmi: 29.5, serum_creatinine: 1.2, uacr: 40, smoker: true, diabetes: false, afib: false, blood_type: 'B+' },
    'pat-2': { id: 'pat-2', name: 'Ananya Sen', age: 46, sex: 'female', sbp: 142, dbp: 88, total_chol: 215, hdl_chol: 44, fasting_glucose: 138, hba1c: 7.1, bmi: 28.2, serum_creatinine: 0.9, uacr: 25, smoker: false, diabetes: true, afib: false, blood_type: 'A+' },
    'pat-3': { id: 'pat-3', name: 'Vikram Malhotra', age: 64, sex: 'male', sbp: 165, dbp: 102, total_chol: 265, hdl_chol: 35, fasting_glucose: 155, hba1c: 8.2, bmi: 31.4, serum_creatinine: 1.8, uacr: 120, smoker: true, diabetes: true, afib: true, blood_type: 'O+' },
    'pat-4': { id: 'pat-4', name: 'Pooja Iyer', age: 34, sex: 'female', sbp: 116, dbp: 74, total_chol: 175, hdl_chol: 58, fasting_glucose: 90, hba1c: 5.1, bmi: 22.1, serum_creatinine: 0.7, uacr: 8, smoker: false, diabetes: false, afib: false, blood_type: 'AB+' }
  },
  initialAppointments: [
    {
      id: 'apt-101', patient_id: 'pat-1', patient_name: 'Ramesh Patel', doctor_id: 'doc-1', doctor_name: 'Dr. Rajesh Sharma, MD, DM', specialty: 'Cardiology',
      slot: 'Tomorrow at 09:30 AM', status: 'Waiting in Queue', urgency: 'Urgent (Within 48h)', risk_category: 'High Risk', risk_score: 74, disease: 'Cardiovascular Disease (ASCVD)',
      triage_reason: 'High blood pressure (160/98 mmHg) and active smoking.', sbar_note: { situation: '58M with SBP 160 mmHg and 60.5% ASCVD risk.' }
    },
    {
      id: 'apt-102', patient_id: 'pat-2', patient_name: 'Ananya Sen', doctor_id: 'doc-2', doctor_name: 'Dr. Priya Nair, MD', specialty: 'Endocrinology',
      slot: 'Today at 04:30 PM', status: 'Confirmed', urgency: 'High (Within 1 week)', risk_category: 'Moderate', risk_score: 42, disease: 'Type 2 Diabetes',
      triage_reason: 'Elevated HbA1c (7.1%) and fasting glucose 138 mg/dL.', sbar_note: { situation: '46F with poorly controlled hyperglycemia.' }
    }
  ],
  getAppointments() {
    try {
      const stored = localStorage.getItem('vitalsync_appointments');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return this.initialAppointments;
  },
  saveAppointments(list) {
    try {
      localStorage.setItem('vitalsync_appointments', JSON.stringify(list));
    } catch(e) {}
  },
  predict(p) {
    const age = Number(p.age) || 50;
    const sbp = Number(p.sbp) || 120;
    const tc = Number(p.total_chol) || 190;
    const hdl = Math.max(Number(p.hdl_chol) || 50, 20);
    const smoker = !!p.smoker;
    const diabetes = !!p.diabetes;
    const cholRatio = tc / hdl;

    // 1. CVD
    const sbpContrib = Math.max(-0.2, (sbp - 120) * 0.019);
    const cholContrib = (cholRatio - 3.5) * 0.28;
    const smokerContrib = smoker ? 0.65 : -0.15;
    const logOdds = -2.8 + (age - 40)*0.052 + sbpContrib + cholContrib + smokerContrib + (diabetes ? 0.72 : -0.2) + (p.sex === 'male' ? 0.22 : -0.1);
    const cvdScore = Math.round(Math.min(Math.max((1 / (1 + Math.exp(-logOdds))) * 100, 2.5), 96) * 10) / 10;

    // 2. Diabetes
    const bmi = Number(p.bmi) || 24;
    const gluc = Number(p.fasting_glucose) || 95;
    let diaScore = 5 + (bmi > 25 ? (bmi-25)*2.8 : 0) + (gluc > 100 ? (gluc-100)*0.55 : 0) + (age > 45 ? 12 : 0);
    if (diabetes) diaScore = 88;
    diaScore = Math.round(Math.min(Math.max(diaScore, 3), 95) * 10) / 10;

    // 3. Stroke
    let strokeScore = 4 + (age > 55 ? (age-55)*1.1 : 0) + (sbp > 130 ? (sbp-130)*0.6 : 0) + (smoker ? 18 : 0);
    strokeScore = Math.round(Math.min(Math.max(strokeScore, 2), 92) * 10) / 10;

    // 4. CKD
    const scr = Number(p.serum_creatinine) || 1.0;
    const uacr = Number(p.uacr) || 15;
    let ckdScore = 3 + (scr > 1.1 ? (scr-1.1)*35 : 0) + (uacr > 30 ? (uacr-30)*0.2 : 0) + (diabetes ? 14 : 0);
    ckdScore = Math.round(Math.min(Math.max(ckdScore, 1.5), 95) * 10) / 10;

    const drivers = [
      { feature: 'Systolic Blood Pressure', value: `${Math.round(sbp)} mmHg`, impact: Math.round(sbpContrib * 180)/10, is_adverse: sbp >= 130, description: sbp >= 130 ? 'Elevated stage 1/2 hypertension.' : 'Optimal blood pressure.' },
      { feature: 'Cholesterol Ratio (TC/HDL)', value: `${cholRatio.toFixed(1)}`, impact: Math.round(cholContrib * 160)/10, is_adverse: cholRatio > 4.0, description: cholRatio > 4 ? 'Atherogenic lipid imbalance.' : 'Healthy lipid ratio.' },
      { feature: 'Tobacco / Smoking Exposure', value: smoker ? 'Active Smoker' : 'Non-Smoker', impact: smoker ? 22.5 : -5.0, is_adverse: smoker, description: smoker ? 'Direct arterial endothelial strain.' : 'Protective vascular baseline.' },
      { feature: 'Metabolic & Glycemic State', value: diabetes ? 'Diabetic' : 'Normal', impact: diabetes ? 24.0 : -6.0, is_adverse: diabetes, description: diabetes ? 'Microvascular complication risk.' : 'Euglycemic baseline.' }
    ].sort((a,b) => Math.abs(b.impact) - Math.abs(a.impact));

    return {
      patient_id: p.patient_id || 'pat-1',
      assessments: {
        cardiovascular: { disease: 'Cardiovascular Disease (ASCVD)', risk_score: cvdScore, category: cvdScore >= 50 ? 'Critical High Risk' : cvdScore >= 20 ? 'Moderate Risk' : 'Low Risk', severity: cvdScore >= 50 ? 'critical' : cvdScore >= 20 ? 'moderate' : 'low', color: cvdScore >= 50 ? 'rose' : 'emerald', clinical_summary: `10-year major cardiac event risk evaluated at ${cvdScore}%.` },
        diabetes: { disease: 'Type 2 Diabetes Risk', risk_score: diaScore, category: diaScore >= 50 ? 'High Risk' : 'Moderate', severity: diaScore >= 50 ? 'high' : 'moderate', color: diaScore >= 50 ? 'orange' : 'amber', clinical_summary: `Metabolic dysfunction index evaluated at ${diaScore}%.` },
        stroke: { disease: 'Cerebrovascular Stroke Risk', risk_score: strokeScore, category: strokeScore >= 50 ? 'Critical' : 'Moderate', severity: strokeScore >= 50 ? 'critical' : 'moderate', color: strokeScore >= 50 ? 'rose' : 'amber', clinical_summary: `10-year stroke probability estimated at ${strokeScore}%.` },
        ckd: { disease: 'Chronic Kidney Disease (CKD)', risk_score: ckdScore, category: ckdScore >= 50 ? 'High Risk' : 'Optimal', severity: ckdScore >= 50 ? 'high' : 'low', color: ckdScore >= 50 ? 'orange' : 'emerald', clinical_summary: `Renal impairment progression probability estimated at ${ckdScore}%.` }
      },
      primary_concern: { disease: 'Cardiovascular Disease (ASCVD)', risk_score: cvdScore, category: cvdScore >= 50 ? 'Critical High Risk' : 'Moderate Risk', urgency: cvdScore >= 50 ? 'Urgent (Within 48h)' : 'Routine', specialty: 'Cardiology', specialty_code: 'cardiology', drivers: drivers },
      sbar_note: { situation: `${p.name || 'Patient'} evaluated with elevated SBP (${Math.round(sbp)} mmHg) and ${cvdScore}% cardiac risk.`, background: `Age ${age}, TC/HDL ${cholRatio.toFixed(1)}, Smoker: ${smoker ? 'Yes' : 'No'}.`, assessment: `High cardiovascular event vulnerability requiring clinical oversight.`, recommendation: `Schedule specialist consultation and evaluate pharmacotherapy.` }
    };
  },
  whatIf(original, mod) {
    const baseEval = this.predict(original);
    const merged = Object.assign({}, original, mod);
    const simEval = this.predict(merged);
    const base = baseEval.assessments.cardiovascular.risk_score;
    const sim = simEval.assessments.cardiovascular.risk_score;
    const reduction = Math.round(Math.max(0, ((base - sim) / base) * 100) * 10) / 10;
    return {
      baseline_score: base,
      simulated_score: sim,
      risk_reduction_pct: reduction,
      recommendations: [
        'Smoking cessation significantly halts endothelial inflammation and reduces relative risk by ~35%.',
        'Target systolic BP reduction directly prevents coronary plaque destabilization and stroke.',
        'Metabolic stabilization guards against microvascular organ damage.'
      ]
    };
  }
};


/**
 * VITALSYNC - Individual Multi-Role Authentication Engine
 * No default auto-login. Starts on dedicated login screen.
 */

let appState = {
  isLoggedIn: false,
  currentRole: 'patient',
  currentUser: {
    name: "Ramesh Patel",
    role: "UHID: AP-94021",
    id: "pat-1"
  },
  currentDoctorId: 'doc-1',
  currentDoctor: null,
  currentPatientId: 'pat-1',
  currentPatient: null,
  currentEvaluation: null,
  doctors: [],
  appointments: []
};

document.addEventListener('DOMContentLoaded', async () => {
  if (window.lucide) lucide.createIcons();
  initGTAScrollEngine();
  await loadDoctors();
  await loadAppointments();
  // We do NOT auto-login. The login screen stays visible by default!
});

// Toast notification
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-[#512da8] text-white',
    warning: 'bg-amber-700 text-white',
    error: 'bg-rose-700 text-white',
    info: 'bg-[#1a162b] text-white'
  };

  toast.className = `p-3 rounded-lg shadow-lg flex items-center space-x-2 text-xs transition-all transform duration-150 translate-y-1 opacity-0 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `<span class="font-medium">${message}</span>`;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.remove('translate-y-1', 'opacity-0'));

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-1');
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

// Login Tabs: Patient vs Doctor vs Admin
function setLoginTab(tab) {
  document.querySelectorAll('#form-login-patient, #form-login-doctor, #form-login-admin').forEach(f => f.classList.add('hidden'));
  document.querySelectorAll('#login-tab-patient, #login-tab-doctor, #login-tab-admin').forEach(b => b.classList.remove('active'));

  const form = document.getElementById(`form-login-${tab}`);
  const btn = document.getElementById(`login-tab-${tab}`);

  if (form) form.classList.remove('hidden');
  if (btn) btn.classList.add('active');
}

// Autofill for fast demo
let selectedPatientId = 'pat-1';
function autofillPatient(patId) {
  selectedPatientId = patId;
  const uhidMap = {
    'pat-1': 'AP-94021 (Ramesh Patel)',
    'pat-2': 'AP-94038 (Ananya Sen)',
    'pat-3': 'AP-94055 (Vikram Malhotra)',
    'pat-4': 'AP-94072 (Pooja Iyer)'
  };
  const inp = document.getElementById('login-pat-id');
  if (inp) inp.value = uhidMap[patId] || 'AP-94021';
}

let selectedDoctorId = 'doc-1';
function autofillDoctor(docId) {
  selectedDoctorId = docId;
  const docMap = {
    'doc-1': 'MCI-28491 (Dr. Rajesh Sharma, Cardiology)',
    'doc-2': 'MCI-31902 (Dr. Priya Nair, Endocrinology)',
    'doc-3': 'MCI-19401 (Dr. Amitav Banerjee, Nephrology)',
    'doc-4': 'MCI-22840 (Dr. Sunita Deshmukh, Neurology)'
  };
  const inp = document.getElementById('login-doc-id');
  if (inp) inp.value = docMap[docId] || 'MCI-28491';
}

// Submit Patient Individual Login
async function submitPatientLogin() {
  const loginScreen = document.getElementById('screen-login');
  const mainContent = document.getElementById('main-app-content');

  appState.isLoggedIn = true;
  appState.currentRole = 'patient';
  await loadPersona(selectedPatientId);

  appState.currentUser = {
    name: appState.currentPatient.name,
    role: `UHID: AP-${94000 + parseInt(selectedPatientId.replace('pat-','')) * 17}`,
    id: selectedPatientId
  };

  loginScreen.classList.add('hidden');
  mainContent.classList.remove('hidden');

  switchDashboard('patient');
  updateHeaderUser();
  showToast(`Welcome, ${appState.currentPatient.name}`, "success");
}

// Submit Doctor Individual Login
async function submitDoctorLogin() {
  const loginScreen = document.getElementById('screen-login');
  const mainContent = document.getElementById('main-app-content');

  appState.isLoggedIn = true;
  appState.currentRole = 'doctor';
  appState.currentDoctorId = selectedDoctorId;

  const doc = appState.doctors.find(d => d.id === selectedDoctorId) || appState.doctors[0];
  appState.currentDoctor = doc;

  appState.currentUser = {
    name: doc.name.split(',')[0],
    role: `${doc.specialty} OPD`,
    id: selectedDoctorId
  };

  // Update profile card in Doctor view
  const docAvatar = document.getElementById('doctor-profile-avatar');
  const docName = document.getElementById('doctor-profile-name');
  const docTitle = document.getElementById('doctor-profile-title');

  if (docAvatar) docAvatar.src = doc.avatar;
  if (docName) docName.textContent = doc.name;
  if (docTitle) docTitle.textContent = `${doc.title} • ${doc.hospital}`;

  loginScreen.classList.add('hidden');
  mainContent.classList.remove('hidden');

  switchDashboard('doctor');
  updateHeaderUser();
  showToast(`Physician portal: ${doc.name}`, "success");
}

// Submit Admin Individual Login
function submitAdminLogin() {
  const loginScreen = document.getElementById('screen-login');
  const mainContent = document.getElementById('main-app-content');

  appState.isLoggedIn = true;
  appState.currentRole = 'admin';
  appState.currentUser = {
    name: "Dr. Arvind Venkataraman",
    role: "Hospital Medical Director",
    id: "admin-1"
  };

  loginScreen.classList.add('hidden');
  mainContent.classList.remove('hidden');

  switchDashboard('admin');
  updateHeaderUser();
  showToast("Hospital operations grid active", "success");
}

// Sign Out completely
function performSignOut() {
  appState.isLoggedIn = false;
  document.getElementById('main-app-content').classList.add('hidden');
  document.getElementById('screen-login').classList.remove('hidden');
  showToast("Signed out successfully", "info");
}

function updateHeaderUser() {
  const nameElem = document.getElementById('current-user-name');
  const roleElem = document.getElementById('current-user-role');
  const badgeElem = document.getElementById('header-role-badge');
  const navPatLabel = document.getElementById('nav-patient-label');
  const navDocLabel = document.getElementById('nav-doctor-label');

  if (nameElem) nameElem.textContent = appState.currentUser.name;
  if (roleElem) roleElem.textContent = appState.currentUser.role;

  if (navPatLabel && appState.currentPatient) {
    navPatLabel.textContent = appState.currentPatient.name.split(' ')[0];
  }
  if (navDocLabel && appState.currentDoctor) {
    navDocLabel.textContent = appState.currentDoctor.name.split(' ')[1] || 'Physician';
  }

  if (badgeElem) {
    if (appState.currentRole === 'patient') {
      badgeElem.textContent = 'Patient Portal';
      badgeElem.className = 'text-[10px] font-semibold bg-lavender-50 text-lavender-800 px-2 py-0.5 rounded border border-lavender-200';
    } else if (appState.currentRole === 'doctor') {
      badgeElem.textContent = 'Physician Portal';
      badgeElem.className = 'text-[10px] font-semibold bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200';
    } else if (appState.currentRole === 'admin') {
      badgeElem.textContent = 'Operations Grid';
      badgeElem.className = 'text-[10px] font-semibold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200';
    }
  }
}

// Switch Dashboards
function switchDashboard(dashId) {
  document.querySelectorAll('.dashboard-view').forEach(view => view.classList.add('hidden'));
  const target = document.getElementById(`dash-${dashId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.portal-pill').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tab-${dashId}`);
  if (activeBtn) activeBtn.classList.add('active');

  appState.currentRole = dashId;
  updateHeaderUser();

  if (dashId === 'doctor') {
    renderDoctorTriageStream();
  }

  if (window.lucide) lucide.createIcons();
}

// Load Doctors & Appointments
async function loadDoctors() {
  try {
    const res = await fetch('/api/doctors');
    if (res.ok) {
      appState.doctors = await res.json();
    } else {
      throw new Error('API unavailable');
    }
    renderLandingDoctors();
  } catch (err) {
    appState.doctors = ClientFallbackStore.doctors;
  }
  if (!appState.currentDoctor && appState.doctors.length > 0) {
    appState.currentDoctor = appState.doctors[0];
  }
}

async function loadAppointments() {
  try {
    const res = await fetch('/api/appointments');
    if (res.ok) {
      appState.appointments = await res.json();
    } else {
      throw new Error('API unavailable');
    }
  } catch (err) {
    appState.appointments = ClientFallbackStore.getAppointments();
  }
  updateAppointmentCounts();
  renderDoctorTriageStream();
}

function updateAppointmentCounts() {
  const docQueueBadge = document.getElementById('doc-queue-count');
  if (docQueueBadge) docQueueBadge.textContent = appState.appointments.length;

  const criticals = appState.appointments.filter(a => a.urgency.toLowerCase().includes('urgent') || a.risk_score >= 60).length;
  const docCriticalBadge = document.getElementById('doc-critical-count');
  if (docCriticalBadge) docCriticalBadge.textContent = criticals;
}

// Load Patient Persona
async function loadPersona(patId) {
  try {
    let pat;
    try {
      const res = await fetch(`/api/patients/${patId}`);
      if (res.ok) {
        pat = await res.json();
      } else {
        throw new Error();
      }
    } catch(e) {
      pat = ClientFallbackStore.patients[patId] || ClientFallbackStore.patients['pat-1'];
    }
    appState.currentPatientId = pat.id;
    appState.currentPatient = pat;

    document.getElementById('inp-name').value = pat.name;
    document.getElementById('inp-age').value = pat.age;
    document.getElementById('inp-sbp').value = pat.sbp;
    document.getElementById('inp-dbp').value = pat.dbp;
    document.getElementById('inp-total-chol').value = pat.total_chol;
    document.getElementById('inp-hdl-chol').value = pat.hdl_chol;
    document.getElementById('inp-fasting-glucose').value = pat.fasting_glucose;
    document.getElementById('inp-bmi').value = pat.bmi;
    document.getElementById('inp-smoker').checked = !!pat.smoker;
    document.getElementById('inp-diabetes').checked = !!pat.diabetes;

    const greeting = document.getElementById('patient-greeting');
    if (greeting) greeting.textContent = `${pat.name}`;

    const uhidBadge = document.getElementById('patient-uhid-badge');
    if (uhidBadge) uhidBadge.textContent = `UHID: AP-${94000 + parseInt(pat.id.replace('pat-','')) * 17}`;

    const demoText = document.getElementById('patient-demographics-text');
    if (demoText) demoText.textContent = `${pat.age} Yrs / ${pat.sex === 'male' ? 'Male' : 'Female'} • Blood Group ${pat.blood_type || 'B+'}`;

    await runPrediction();
  } catch (err) {
    console.error('Error loading persona:', err);
  }
}

// Run Prediction
async function runPrediction() {
  const btn = document.getElementById('btn-run-prediction');
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Recalculating...";
  }

  const getVal = (id, defaultVal) => {
    const el = document.getElementById(id);
    if (!el) return defaultVal;
    const v = parseFloat(el.value);
    return isNaN(v) ? defaultVal : v;
  };

  const sbp = getVal('inp-sbp', 120);
  const dbp = getVal('inp-dbp', 80);
  const age = getVal('inp-age', 50);
  const totalChol = getVal('inp-total-chol', 190);
  const hdlChol = getVal('inp-hdl-chol', 50);
  const fastingGlucose = getVal('inp-fasting-glucose', 100);
  const bmi = getVal('inp-bmi', 24.5);
  const hba1c = getVal('inp-hba1c', 5.4);
  const creatinine = getVal('inp-creatinine', 1.0);
  const uacr = getVal('inp-uacr', 20.0);

  const payload = {
    patient_id: appState.currentPatientId || 'pat-guest',
    name: (document.getElementById('inp-name') && document.getElementById('inp-name').value) || "Patient",
    age: age,
    sex: (document.getElementById('inp-sex') && document.getElementById('inp-sex').value) || "male",
    bmi: bmi,
    sbp: sbp,
    dbp: dbp,
    total_chol: totalChol,
    hdl_chol: hdlChol,
    fasting_glucose: fastingGlucose,
    hba1c: hba1c,
    serum_creatinine: creatinine,
    uacr: uacr,
    smoker: document.getElementById('inp-smoker') ? document.getElementById('inp-smoker').checked : false,
    diabetes: document.getElementById('inp-diabetes') ? document.getElementById('inp-diabetes').checked : false,
    afib: document.getElementById('inp-afib') ? (document.getElementById('inp-afib').value === 'true') : false,
    physical_activity: document.getElementById('inp-active') ? (document.getElementById('inp-active').value === 'true') : true
  };

  try {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      let errMsg = "Validation Error";
      if (data && data.detail) {
        if (Array.isArray(data.detail)) {
          errMsg = data.detail.map(d => `${d.loc ? d.loc.slice(-1)[0] + ': ' : ''}${d.msg}`).join(', ');
        } else if (typeof data.detail === 'string') {
          errMsg = data.detail;
        }
      }
      showToast(errMsg, "error");
      return;
    }

    appState.currentEvaluation = data;

    if (data.assessments) {
      if (data.assessments.cardiovascular) updateDiseaseCard('cvd', data.assessments.cardiovascular);
      if (data.assessments.diabetes) updateDiseaseCard('diabetes', data.assessments.diabetes);
      if (data.assessments.stroke) updateDiseaseCard('stroke', data.assessments.stroke);
      if (data.assessments.ckd) updateDiseaseCard('ckd', data.assessments.ckd);
    }

    if (data.primary_concern && data.primary_concern.drivers) {
      renderXAIFeatureAttribution(data.primary_concern.drivers);
    }

    const sliderSbp = document.getElementById('slider-sbp');
    if (sliderSbp) sliderSbp.value = Math.max(110, Math.min(140, Math.round(payload.sbp * 0.75)));
    const sliderGluc = document.getElementById('slider-glucose');
    if (sliderGluc) sliderGluc.value = Math.max(85, Math.min(110, Math.round(payload.fasting_glucose * 0.85)));
    const sliderSmoke = document.getElementById('slider-smoker-quit');
    if (sliderSmoke) sliderSmoke.checked = true;

    await runWhatIfSimulation();
    updateTriageTriggerBar(data);

    showToast("Clinical risk recalculated successfully!", "success");
  } catch (err) {
    console.error('Error running prediction:', err);
    showToast("Error recalculating risk: " + (err.message || err), "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Recalculate Clinical Risk";
    }
  }
}

function updateDiseaseCard(prefix, assessment) {
  const scoreElem = document.getElementById(`${prefix}-score`);
  const barElem = document.getElementById(`${prefix}-bar`);
  const badgeElem = document.getElementById(`${prefix}-badge`);

  if (scoreElem) scoreElem.textContent = `${Math.round(assessment.risk_score)}%`;
  if (barElem) barElem.style.width = `${Math.min(assessment.risk_score, 100)}%`;
  
  if (badgeElem) {
    if (assessment.risk_score >= 50) {
      badgeElem.textContent = 'High Risk';
      badgeElem.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200';
    } else if (assessment.risk_score >= 25) {
      badgeElem.textContent = 'Moderate';
      badgeElem.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200';
    } else {
      badgeElem.textContent = 'Optimal / Low';
      badgeElem.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  }
}

function renderXAIFeatureAttribution(drivers) {
  const container = document.getElementById('xai-drivers-list');
  if (!container) return;

  const clinicalExplanations = {
    "Systolic Blood Pressure": "Systolic arterial pressure exceeds 130 mmHg benchmark; primary driver of coronary workload.",
    "Cholesterol Ratio (TC/HDL)": "Atherogenic index indicates lipid ratio requiring clinical monitoring.",
    "Tobacco Use / Smoking": "Active tobacco use induces endothelial vascular damage and accelerates plaque instability.",
    "Metabolic Status (Diabetes)": "Diabetic dysglycemia benchmark contributing to vascular remodeling.",
    "Chronological Age": "Age-adjusted cardiovascular baseline risk attribution.",
    "Glycemic Markers (HbA1c & Fasting Glucose)": "Fasting glucose exceeds optimal 100 mg/dL glycemic threshold.",
    "Body Mass Index (BMI)": "Adiposity index contributing to metabolic resistance.",
    "Estimated GFR (eGFR)": "Glomerular filtration rate within acceptable clinical parameters.",
    "Albuminuria (uACR)": "Urinary albumin excretion within normal baseline.",
    "Serum Creatinine": "Renal clearance index within physiological limits."
  };

  container.innerHTML = drivers.slice(0, 3).map(d => {
    const isAdverse = d.impact > 0;
    const badge = isAdverse
      ? `<span class="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">+${Math.round(d.impact)}% Risk Weight</span>`
      : `<span class="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">-${Math.abs(Math.round(d.impact))}% Protective</span>`;

    const desc = clinicalExplanations[d.feature] || d.description;

    return `
      <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-3 text-xs">
        <div>
          <div class="font-semibold text-slate-900 flex items-center space-x-1.5">
            <span>${d.feature}</span>
            <span class="text-slate-500 font-normal">(${d.value})</span>
          </div>
          <p class="text-slate-600 text-[11px] mt-0.5">${desc}</p>
        </div>
        <div class="shrink-0">${badge}</div>
      </div>
    `;
  }).join('');
}

async function runWhatIfSimulation() {
  if (!appState.currentEvaluation) return;

  const targetSbp = parseFloat(document.getElementById('slider-sbp').value);
  const targetGlucose = parseFloat(document.getElementById('slider-glucose').value);
  const quitSmoker = document.getElementById('slider-smoker-quit').checked;

  document.getElementById('slider-sbp-val').textContent = `${targetSbp} mmHg`;
  document.getElementById('slider-glucose-val').textContent = `${targetGlucose} mg/dL`;

  const originalData = {
    age: parseFloat(document.getElementById('inp-age').value),
    sex: document.getElementById('inp-sex').value,
    sbp: parseFloat(document.getElementById('inp-sbp').value),
    dbp: parseFloat(document.getElementById('inp-dbp').value),
    total_chol: parseFloat(document.getElementById('inp-total-chol').value),
    hdl_chol: parseFloat(document.getElementById('inp-hdl-chol').value),
    fasting_glucose: parseFloat(document.getElementById('inp-fasting-glucose').value),
    hba1c: parseFloat(document.getElementById('inp-hba1c').value),
    bmi: parseFloat(document.getElementById('inp-bmi').value),
    serum_creatinine: parseFloat(document.getElementById('inp-creatinine').value),
    smoker: document.getElementById('inp-smoker').checked,
    diabetes: document.getElementById('inp-diabetes').checked
  };

  const modifiedParams = {
    sbp: targetSbp,
    fasting_glucose: targetGlucose,
    smoker: !quitSmoker
  };

  try {
    let result;
    try {
      const res = await fetch('/api/what-if', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_data: originalData, modified_params: modifiedParams })
      });
      if (res.ok) {
        result = await res.json();
      } else {
        throw new Error();
      }
    } catch(e) {
      result = ClientFallbackStore.whatIf(originalData, modifiedParams);
    }
    const deltaBadge = document.getElementById('whatif-delta-badge');
    const netDelta = document.getElementById('whatif-net-delta');
    const friendlyText = document.getElementById('whatif-friendly-text');

    const reduction = Math.round(result.risk_reduction_pct);
    if (deltaBadge) deltaBadge.textContent = `-${reduction}% Risk Reduction`;
    if (netDelta) netDelta.textContent = `-${reduction}%`;

    if (friendlyText) {
      friendlyText.innerHTML = `Projected clinical outcome: Titrating blood pressure to ${targetSbp} mmHg and ${quitSmoker ? 'smoking cessation' : 'metabolic regulation'} reduces 10-year cardiac event probability from <strong>${Math.round(result.baseline_score)}% down to ${Math.round(result.simulated_score)}%</strong>.`;
    }
  } catch (err) {
    console.error('Error simulating what-if:', err);
  }
}

function updateTriageTriggerBar(evalData) {
  const primary = evalData.primary_concern;
  const specialistBadge = document.getElementById('triage-matched-specialist');

  if (specialistBadge) {
    const matchedDoc = appState.doctors.find(d => d.specialty_code.toLowerCase() === primary.specialty_code.toLowerCase()) || appState.doctors[0];
    specialistBadge.textContent = `${matchedDoc.name} (${matchedDoc.hospital})`;
  }
}

// Modal
function openTriageBookingModal() {
  if (!appState.currentEvaluation) return;

  const evalData = appState.currentEvaluation;
  const primary = evalData.primary_concern;
  const matchedDoc = appState.doctors.find(d => d.specialty_code.toLowerCase() === primary.specialty_code.toLowerCase()) || appState.doctors[0];

  document.getElementById('modal-doc-avatar').src = matchedDoc.avatar;
  document.getElementById('modal-doc-name').textContent = matchedDoc.name;
  document.getElementById('modal-doc-specialty').textContent = matchedDoc.title;
  document.getElementById('modal-doc-hospital').textContent = matchedDoc.hospital;

  const patientName = document.getElementById('inp-name').value;
  const sbp = document.getElementById('inp-sbp').value;
  const smoker = document.getElementById('inp-smoker').checked ? 'Active smoker' : 'Non-smoker';

  const referralNote = `Patient ${patientName} evaluated with SBP ${sbp} mmHg (${smoker.toLowerCase()}). Primary risk stratified at ${Math.round(primary.risk_score)}% for ${primary.disease}. Clinical priority consultation requested for pharmacotherapy review and lifestyle protocol.`;
  document.getElementById('modal-sbar-s').textContent = referralNote;

  const modal = document.getElementById('modal-triage-booking');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeTriageBookingModal() {
  const modal = document.getElementById('modal-triage-booking');
  if (modal) modal.classList.add('hidden');
}

async function confirmTriageBooking() {
  if (!appState.currentEvaluation) return;

  const evalData = appState.currentEvaluation;
  const primary = evalData.primary_concern;
  const matchedDoc = appState.doctors.find(d => d.specialty_code.toLowerCase() === primary.specialty_code.toLowerCase()) || appState.doctors[0];
  const slot = document.getElementById('modal-slot-select').value;
  const patientName = document.getElementById('inp-name').value;
  const sbp = document.getElementById('inp-sbp').value;

  const payload = {
    patient_id: appState.currentPatientId,
    patient_name: patientName,
    doctor_id: matchedDoc.id,
    doctor_name: matchedDoc.name,
    specialty: matchedDoc.specialty,
    slot: slot,
    urgency: primary.urgency,
    risk_category: primary.category,
    risk_score: Math.round(primary.risk_score),
    disease: primary.disease,
    triage_reason: `Elevated SBP ${sbp} mmHg. Clinical OPD intake requested.`,
    sbar_note: {
      situation: `${patientName} evaluated with elevated SBP (${sbp} mmHg). Primary risk: ${Math.round(primary.risk_score)}%.`,
      recommendation: "Conduct clinical evaluation and cardiovascular risk management protocol."
    }
  };

  try {
    let newAppt;
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        newAppt = await res.json();
      } else {
        throw new Error();
      }
    } catch(e) {
      newAppt = Object.assign({ id: 'apt-' + Date.now().toString().slice(-4) }, payload, { status: 'Waiting in Queue' });
      ClientFallbackStore.saveAppointments(appState.appointments);
    }
    appState.appointments.unshift(newAppt);
    updateAppointmentCounts();
    closeTriageBookingModal();

    showToast(`Appointment confirmed with ${matchedDoc.name}!`, 'success');
  } catch (err) {
    console.error('Error booking appointment:', err);
  }
}

// Doctor's Triage Stream
function renderDoctorTriageStream() {
  const stream = document.getElementById('doctor-triage-stream');
  if (!stream) return;

  const currentDoc = appState.currentDoctor || appState.doctors[0];
  let docAppointments = appState.appointments.filter(a => 
    a.doctor_id === currentDoc.id || 
    a.specialty.toLowerCase() === currentDoc.specialty.toLowerCase()
  );

  if (docAppointments.length === 0) {
    docAppointments = appState.appointments;
  }

  if (docAppointments.length === 0) {
    stream.innerHTML = `<div class="p-6 text-center text-slate-400 card-clean bg-white border border-slate-200">No triage cases currently pending in queue.</div>`;
    return;
  }

  stream.innerHTML = docAppointments.map(appt => {
    const isUrgent = appt.urgency.toLowerCase().includes('urgent') || appt.risk_score >= 60;
    const borderStyle = isUrgent ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-lavender-700';

    return `
      <div class="card-clean p-4 bg-white border border-slate-200 ${borderStyle} space-y-2.5">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span>${appt.patient_name}</span>
              <span class="text-xs text-slate-400 font-normal">• ${appt.slot}</span>
            </div>
            <div class="text-xs text-slate-600 mt-0.5">${appt.disease} • <strong class="text-rose-600 font-mono">${appt.risk_score}% Risk</strong></div>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${isUrgent ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'}">
            ${isUrgent ? 'Priority Referral' : 'Routine OPD'}
          </span>
        </div>

        <div class="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs text-slate-700">
          <strong class="text-slate-900">SBAR Referral Summary:</strong> ${appt.sbar_note?.situation || appt.triage_reason}
        </div>

        <div class="flex items-center justify-between pt-1 text-xs">
          <span class="text-slate-500">Intake Status: <strong class="text-lavender-800">${appt.status}</strong></span>
          <div class="flex space-x-2">
            <button onclick="updateApptStatus('${appt.id}', 'Confirmed')" class="px-3 py-1 bg-lavender-50 hover:bg-lavender-100 text-lavender-800 font-medium rounded border border-lavender-200 transition">
              Accept Consultation
            </button>
            <button onclick="updateApptStatus('${appt.id}', 'Completed')" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded transition">
              Mark Completed
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function updateApptStatus(apptId, newStatus) {
  try {
    try {
      await fetch(`/api/appointments/${apptId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch(e) {}
    const appt = appState.appointments.find(a => a.id === apptId);
    if (appt) {
      appt.status = newStatus;
      ClientFallbackStore.saveAppointments(appState.appointments);
      renderDoctorTriageStream();
      showToast(`Status updated to ${newStatus}`, 'info');
    }
  } catch (err) {
    console.error('Error updating status:', err);
  }
}


// Landing Page Showcase: Render verified doctors
function renderLandingDoctors() {
  const grid = document.getElementById('landing-doctors-grid');
  if (!grid || !appState.doctors || appState.doctors.length === 0) return;

  grid.innerHTML = appState.doctors.map(doc => {
    const slotCount = (doc.available_slots && doc.available_slots.length) ? `${doc.available_slots.length} Slots Today` : '3 Slots Today';
    return `
      <div class="card-clean p-5 flex flex-col justify-between hover:shadow-lg transition bg-white border border-slate-200/90 shadow-xs">
        <div>
          <div class="flex items-center space-x-3.5 mb-3.5">
            <img src="${doc.avatar}" alt="${doc.name}" class="w-13 h-13 rounded-xl object-cover border border-slate-200 shadow-sm">
            <div>
              <h4 class="font-bold text-slate-900 text-sm">${doc.name}</h4>
              <span class="inline-block text-[11px] font-semibold text-lavender-800 bg-lavender-50 px-2 py-0.5 rounded border border-lavender-200 mt-0.5">${doc.specialty}</span>
            </div>
          </div>
          <p class="text-xs text-slate-500 mb-2">${doc.title}</p>
          <p class="text-xs text-slate-600 font-medium flex items-center space-x-1.5 mb-4">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>${doc.hospital}</span>
          </p>
        </div>
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center space-x-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>${slotCount}</span>
          </span>
          <a href="#portal" onclick="quickSelectDoctor('${doc.id}')" class="px-3.5 py-1.5 rounded-lg bg-lavender-700 hover:bg-lavender-800 text-white font-semibold text-xs shadow-xs transition">
            Book Triage
          </a>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// GTA VI SCROLL ENGINE: Box emergence from bottom + Video Scrubber + Scene Nav
function initGTAScrollEngine() {
  const boxes = document.querySelectorAll('.gta-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  boxes.forEach(box => observer.observe(box));

  // Ensure hero is revealed on load
  const heroBox = document.querySelector('#hero .gta-box');
  if (heroBox) {
    heroBox.classList.add('is-revealed');
  }

  // Update top scrubber bar & right-hand timeline dots on scroll
  const scrubber = document.getElementById('video-scrubber-bar');
  const sceneItems = document.querySelectorAll('.scene-nav-item');
  const sections = ['hero', 'about', 'what-we-do', 'doctors', 'book-appointment', 'why-choose-us', 'portal'];

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrubber && docHeight > 0) {
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      scrubber.style.width = pct + '%';
    }

    let currentSec = 'hero';
    for (const secId of sections) {
      const el = document.getElementById(secId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          currentSec = secId;
        }
      }
    }

    sceneItems.forEach(item => {
      if (item.getAttribute('data-target') === currentSec) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function quickSelectDoctor(docId) {
  autofillDoctor(docId);
  setLoginTab('doctor');
  const target = document.getElementById('portal');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}
