# VITALSYNC
## AI-Powered Predictive & Preventive Healthcare Ecosystem
> **“Predict. Connect. Care.”**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnarvekarjagruti771-debug%2Fvitalsyn)

---

### 🌐 Accessing the Application
- **Live Public HTTPS Demo:** [https://imperial-balanced-belong-print.trycloudflare.com](https://imperial-balanced-belong-print.trycloudflare.com)
- **Local Application URL:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Live Vercel Deployment:** Ready for 1-click cloud deployment via `vercel.json` and `@vercel/python` serverless functions.

---

### 🚀 Zero-Setup Quickstart (Runs on Any Machine / Any Git Account)

#### Prerequisites
- Python 3.10, 3.11, or 3.12
- Git

#### 1. Clone the Repository
```bash
git clone https://github.com/narvekarjagruti771-debug/vitalsyn.git
cd vitalsyn
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Run the Server
```bash
python main.py
```
*Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in any web browser.*

---

### ☁️ Deploy to Vercel in 1-Click (Zero Configuration)

VitalSync includes native Vercel configuration (`vercel.json`, `requirements.txt`, and `api/index.py` entrypoint).

1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. Sign in with GitHub and select your repository: **`vitalsyn`**.
3. Keep default settings (Framework Preset: **Other** / Root Directory: `./`).
4. Click **Deploy**.
5. Your platform will be instantly live on a public `https://vitalsync-xxx.vercel.app` domain with automatic SSL and global CDN caching.

---

### 💡 Core Capabilities & Innovations

1. **Intelligent Multi-Disease Predictive Engine**
   - **Cardiovascular (ASCVD)**: 10-year risk calibrated via ACC/AHA pooled cohort equations.
   - **Type-2 Diabetes**: 5-year onset probability via ADA & FINDRISC risk scores.
   - **Cerebrovascular Stroke**: Framingham Stroke Risk Profile with blood pressure weighting.
   - **Chronic Kidney Disease (CKD)**: 2021 CKD-EPI equation & KDIGO albuminuria staging.

2. **Explainable AI (XAI) & Counterfactual What-If Simulator**
   - **SHAP-Style Feature Attribution**: Deconstructs high-risk predictions into positive/negative pathophysiological drivers (e.g. SBP +24.5%, Smoking +22.5%, HDL -8.2% protective).
   - **Interactive What-If Simulation**: Real-time slider calculation illustrating how target reductions in systolic blood pressure and smoking cessation lower clinical risk by up to 50%+.

3. **Risk-to-Appointment Auto-Triage & SBAR Clinical Handovers**
   - Algorithmic urgency categorization (Critical, High, Moderate, Low).
   - Auto-matching with certified medical specialists (Cardiologist, Diabetologist, Nephrologist, Neurologist).
   - Generates structured **AI SBAR (Situation, Background, Assessment, Recommendation)** clinical handover notes.
   - Real-time physician triage command center to accept, triage, or schedule consultations.

4. **Dedicated Multi-Role Clinical Gateway**
   - Individual authentication portals for Patients, Physicians, and Hospital Administrators.
   - Fast 1-click demo presets with verified Indian clinical personas.

---

### 👥 4-Member Team Role Division

| Team Member | Project Role | Primary Ownership Files |
| :--- | :--- | :--- |
| **Member 1** | **AI / ML & Algorithmic Lead** | `ml_engine.py` (ASCVD, FINDRISC, CKD-EPI, SHAP, What-If simulation) |
| **Member 2** | **Backend & Clinical Data Lead** | `main.py`, `db.py`, `api/index.py` (FastAPI REST endpoints, SBAR generator, DB store) |
| **Member 3** | **Frontend & Clinical UX Architect** | `static/index.html`, `static/css/style.css`, `static/js/app.js` (Lavender & white theme, interactive simulator, triage board) |
| **Member 4** | **QA, Verification & Clinical Lead** | `test_app.py`, `README.md` (Integration verification, clinical safety checks, presentation flow) |

---

### ⏱️ 3-Minute Live Demo Walkthrough

1. **0:00 - 0:45 | Clinical Gateway & Problem Context**  
   Open the application URL. Highlight how chronic diseases represent 70%+ of preventable complications in India. Show the dedicated login gateway.

2. **0:45 - 1:45 | Patient Portal & Explainable AI**  
   Click *Ramesh Patel (ASCVD)* demo autofill &rarr; Click **Sign In as Patient**. Show the multi-disease risk cards (60.5% ASCVD Risk). Demonstrate the **What-If slider**: slide SBP from 160 to 120 mmHg and toggle smoking cessation to show a **53.4% risk reduction**.

3. **1:45 - 2:30 | Automated Risk-to-Appointment Triage**  
   Click **"Initiate Clinical Triage & Consultation"** &rarr; System auto-routes to *Dr. Rajesh Sharma (Apollo Heart Institute)* and renders the pre-compiled **SBAR handover note** &rarr; Confirm booking.

4. **2:30 - 3:00 | Physician Command Center**  
   Logout and select **Doctor Portal** &rarr; Select *Dr. Rajesh Sharma* &rarr; View incoming urgent triage queue, inspect Ramesh Patel's clinical biomarkers, and click **Accept Consultation**.
