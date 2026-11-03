# VITALSYN
## AI-Powered Predictive & Preventive Healthcare Ecosystem
> **“Predict. Connect. Care.”**

---

### 🌐 Accessing the Application
- **Web Application URL:** [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Directory:** `C:\Users\HP\.gemini\antigravity\scratch\vitalsyn`

---

### 💡 Core Capabilities & Innovations
1. **Intelligent Multi-Disease Predictive Engine**
   - **Cardiovascular (ASCVD)**: 10-year risk calibrated via ACC/AHA pooled cohort equations.
   - **Type-2 Diabetes**: 5-year onset probability via ADA & FINDRISC risk scores.
   - **Cerebrovascular Stroke**: Framingham Stroke Risk Profile.
   - **Chronic Kidney Disease (CKD)**: 2021 CKD-EPI formula & KDIGO albuminuria staging.

2. **Standout Innovation 1: Explainable AI (XAI)**
   - **SHAP-Style Feature Attribution**: Deconstructs high-risk predictions into positive/negative pathophysiological drivers (e.g. SBP +24.5%, Smoking +22.5%, HDL -8.2% protective).
   - **Interactive "What-If" Counterfactual Simulator**: Real-time slider simulation showing how target BP/glucose changes reduce risk by up to 40%+.

3. **Standout Innovation 2: Risk-to-Appointment Auto-Triage Workflow**
   - Algorithmic urgency categorization (Critical, High, Moderate, Low).
   - Auto-matching with verified medical specialists (Cardiologist, Endocrinologist, Nephrologist, Neurologist).
   - Pre-compiles **AI SBAR (Situation, Background, Assessment, Recommendation)** clinical handover note for physician approval.
   - One-click booking into the doctor's active clinical queue.

4. **Dual-Portal Architecture**
   - **Patient Portal**: Biomarker input, disease risk cards, What-If simulator, longitudinal vitals history charts, printable clinical discharge summary.
   - **Doctor Triage Command Center**: Real-time incoming referral stream, urgency badges, SBAR note viewer, status updater (Confirm, Telehealth, Discharge).

---

### 👥 4-Member SIC Hackathon Team Division
| Member | Role | Core Deliverables |
| :--- | :--- | :--- |
| **Member 1** | **AI / ML & XAI Lead** | Formulated clinical scoring algorithms, SHAP attribution weights, counterfactual What-If simulation engine. |
| **Member 2** | **Full-Stack Architect** | Built FastAPI REST backend, database schema, responsive UI with Tailwind & Chart.js. |
| **Member 3** | **Clinical Domain & Triage Lead** | Engineered the Risk-to-Appointment pipeline, medical specialty routing, SBAR clinical note generation. |
| **Member 4** | **Product, QA & Pitch Lead** | Validated test personas, clinical safety boundaries, demo presentation script and pitch flow. |

---

### ⏱️ 3-Minute Winning Demo Script
- **0:00 - 0:45**: Problem hook (80% of chronic illnesses preventable, fragmented care).
- **0:45 - 1:45**: Load *Bob Chen (58M)* -> 74.2% ASCVD Risk -> Show XAI SHAP attribution & What-If simulator (-38.4% reduction).
- **1:45 - 2:30**: Click **"Triage & Book Specialist"** -> Show auto-matched Cardiologist (Dr. Elena Vance) & pre-filled SBAR note -> Confirm.
- **2:30 - 3:00**: Switch to **Doctor Triage Queue** -> Show Dr. Vance receiving Bob's urgent file -> Accept consultation.
