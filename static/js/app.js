/**
 * VITALSYN - Individual Multi-Role Authentication Engine
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
    appState.doctors = await res.json();
    if (!appState.currentDoctor && appState.doctors.length > 0) {
      appState.currentDoctor = appState.doctors[0];
    }
  } catch (err) {
    console.error('Error fetching doctors:', err);
  }
}

async function loadAppointments() {
  try {
    const res = await fetch('/api/appointments');
    appState.appointments = await res.json();
    updateAppointmentCounts();
    renderDoctorTriageStream();
  } catch (err) {
    console.error('Error fetching appointments:', err);
  }
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
    const res = await fetch(`/api/patients/${patId}`);
    if (!res.ok) throw new Error('Patient not found');
    const pat = await res.json();
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
  if (btn) btn.disabled = true;

  const payload = {
    patient_id: appState.currentPatientId,
    name: document.getElementById('inp-name').value,
    age: parseFloat(document.getElementById('inp-age').value),
    sex: document.getElementById('inp-sex').value,
    bmi: parseFloat(document.getElementById('inp-bmi').value),
    sbp: parseFloat(document.getElementById('inp-sbp').value),
    dbp: parseFloat(document.getElementById('inp-dbp').value),
    total_chol: parseFloat(document.getElementById('inp-total-chol').value),
    hdl_chol: parseFloat(document.getElementById('inp-hdl-chol').value),
    fasting_glucose: parseFloat(document.getElementById('inp-fasting-glucose').value),
    hba1c: parseFloat(document.getElementById('inp-hba1c').value),
    serum_creatinine: parseFloat(document.getElementById('inp-creatinine').value),
    uacr: parseFloat(document.getElementById('inp-uacr').value),
    smoker: document.getElementById('inp-smoker').checked,
    diabetes: document.getElementById('inp-diabetes').checked,
    afib: document.getElementById('inp-afib').value === 'true',
    physical_activity: document.getElementById('inp-active').value === 'true'
  };

  try {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    appState.currentEvaluation = data;

    updateDiseaseCard('cvd', data.assessments.cardiovascular);
    updateDiseaseCard('diabetes', data.assessments.diabetes);
    updateDiseaseCard('stroke', data.assessments.stroke);
    updateDiseaseCard('ckd', data.assessments.ckd);

    renderXAIFeatureAttribution(data.primary_concern.drivers);

    document.getElementById('slider-sbp').value = Math.max(118, Math.min(130, payload.sbp - 30));
    document.getElementById('slider-glucose').value = Math.max(85, Math.min(100, payload.fasting_glucose - 20));
    document.getElementById('slider-smoker-quit').checked = true;
    await runWhatIfSimulation();

    updateTriageTriggerBar(data);
  } catch (err) {
    console.error('Error running prediction:', err);
  } finally {
    if (btn) btn.disabled = false;
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
      badgeElem.className = 'px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200';
    } else if (assessment.risk_score >= 25) {
      badgeElem.textContent = 'Moderate';
      badgeElem.className = 'px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200';
    } else {
      badgeElem.textContent = 'Optimal / Low';
      badgeElem.className = 'px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
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
      <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-3 text-xs">
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
    const res = await fetch('/api/what-if', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original_data: originalData, modified_params: modifiedParams })
    });

    const result = await res.json();
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
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const newAppt = await res.json();
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
    const res = await fetch(`/api/appointments/${apptId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      const appt = appState.appointments.find(a => a.id === apptId);
      if (appt) appt.status = newStatus;
      renderDoctorTriageStream();
      showToast(`Status updated to ${newStatus}`, 'info');
    }
  } catch (err) {
    console.error('Error updating status:', err);
  }
}
