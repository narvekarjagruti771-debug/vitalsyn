# VitalSync — AI-Powered Predictive & Preventive Healthcare Ecosystem
> **“Predict. Connect. Care.”**

VitalSync is an evidence-based clinical intelligence platform that bridges the gap between early chronic disease detection, explainable risk assessment, and specialist intervention. By combining calibrated multi-organ machine learning models, Explainable AI (SHAP-style local feature attribution), real-time counterfactual "What-If" simulations, and an automated **Risk-to-Appointment** triage pipeline, VitalSync transforms healthcare from fragmented, reactive treatment into proactive, personalized prevention.

---

## 🚀 Key Highlights & Capabilities

### 1. 🫀 Multi-Disease Predictive Engine
Simultaneously evaluates 4 major chronic organ risk factors using evidence-based medical formulations:
- **Cardiovascular (ASCVD)**: 10-year risk calibrated via ACC/AHA pooled cohort equations.
- **Type-2 Diabetes**: 5-year onset probability via ADA & FINDRISC risk algorithms.
- **Cerebrovascular Stroke**: Framingham Stroke Risk Profile with blood pressure and atrial fibrillation factors.
- **Chronic Kidney Disease (CKD)**: 2021 CKD-EPI formula & KDIGO albuminuria staging.

### 2. 🔍 Explainable AI (XAI) & Feature Attribution
- **SHAP-Style Pathophysiological Drivers**: Eliminates opaque "black-box" predictions by quantifying exact positive and protective risk drivers (e.g., SBP $+24.5\%$, Smoking $+22.5\%$, HDL $-8.2\%$ protective).
- **Interactive "What-If" Counterfactual Simulator**: Dynamic sliders demonstrate in real time how clinical interventions (e.g., titrating SBP to 120 mmHg or smoking cessation) reduce composite event probability by up to $40\%\text{--}50\%+$.

### 3. 🏥 Automated Risk-to-Appointment Specialist Triage
- **Algorithmic Urgency Routing**: Categorizes patients into Critical, High, or Moderate priority based on highest organ severity.
- **Credentialed Specialist Matching**: Pairs patients with certified specialists across Cardiology, Endocrinology, Nephrology, and Neurology.
- **Automated SBAR Handover Generation**: Pre-compiles structured **Situation, Background, Assessment, Recommendation** handover notes for physician review.
- **1-Click Doctor OPD Queue**: Immediately reserves consultation slots into the physician’s active hospital stream.

### 4. 🎬 Cinematic Interactive Web Experience (GTA VI-Inspired Flow)
- **Kinetic Scene Snapping**: Smooth glide through 7 cinematic presentation viewports.
- **Emerging Showcase Boxes**: Content emerges from the bottom with warm contrasting luxury card styling, amber rim lighting, glowing crown accents, and staggered entrance reveals.
- **Video Scrubber Bar**: Real-time progress bar across the top edge tracking scroll depth like a video playback timeline.
- **Interactive Scene Navigator**: Floating right-edge timeline scrubber (`01 // HERO` through `07 // CLINICAL PORTAL`) with active dot expansions and smooth section jumps.
- **Ambient Medical Telemetry Aura**: Subtle, pulsing 60 FPS medical waveform ambient aura.

### 5. 👥 Multi-Role Clinical Portal
- **Patient Dashboard**: Biomarker telemetry, multi-organ gauges, SHAP risk weights, What-If simulator, and appointment booking.
- **Physician Dashboard**: Real-time triage intake stream, urgency badges, SBAR note inspection, and consultation confirmation controls.
- **Operations Grid**: High-level hospital system throughput and active telemetry monitoring.
- **1-Click Fast Presets**: Pre-configured clinical personas (Ramesh Patel — Heart Risk, Ananya Sen — Diabetes Risk, Vikram Malhotra — Kidney Risk, Pooja Iyer — Healthy Baseline).

---

## 🏛️ 7-Scene Showcase Architecture

| Scene | Section | Description |
| :--- | :--- | :--- |
| **01** | **Hero Showcase** | High-impact overview with live telemetry HUD, core proposition, and 4 KPI metrics. |
| **02** | **About Us** | Mission statement, care-gap analysis, and 4-member SIC team division. |
| **03** | **Core Capabilities** | Detailed breakdown of the 4 intelligence layers (Predict, Explain, Simulate, Triage). |
| **04** | **Specialist Network** | Directory of verified Indian medical specialists with instant triage booking. |
| **05** | **Smart Intake in 3 Steps** | Visual guide from biomarker screening to automated SBAR specialist dispatch. |
| **06** | **Competitive Benchmark** | Comparative matrix comparing VitalSync vs conventional healthcare pathways. |
| **07** | **Clinical Health Portal** | Interactive web application with multi-role login, patient simulator, and doctor queue. |

---

## 👥 4-Member SIC Hackathon Team Division

| Member | Role | Core Deliverables |
| :--- | :--- | :--- |
| **Member 1** | **AI / ML & XAI Lead** | Formulated clinical scoring algorithms, SHAP attribution weights, counterfactual What-If simulation engine. |
| **Member 2** | **Full-Stack Architect** | Built FastAPI REST backend, database schema, responsive UI with Tailwind & Chart.js, GTA VI scroll engine. |
| **Member 3** | **Clinical Domain & Triage Lead** | Engineered the Risk-to-Appointment pipeline, medical specialty routing, SBAR clinical note generation. |
| **Member 4** | **Product, QA & Pitch Lead** | Validated test personas, clinical safety boundaries, demo presentation script and pitch flow. |

---

## 🛠️ Technology Stack

- **Backend Framework:** FastAPI (Python 3.11) with Pydantic data validation & automated sanitization
- **Web Server:** Uvicorn ASGI with auto-reload
- **Data Persistence:** JSON-backed flat file store (`vitalsync_db.json`) with seeded Indian medical context
- **Frontend:** Vanilla JavaScript (ES6+), Tailwind CSS, Lucide Icons, Custom CSS Scroll Engine
- **Testing:** Automated test suite with `FastAPI TestClient` ([`test_app.py`](test_app.py))

---

## 🏁 Quickstart & Installation

### Prerequisites
- Python 3.10+ (or Python 3.11)

### Setup & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/narvekarjagruti771-debug/vitalsyn.git
   cd vitalsyn
   ```

2. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn pydantic
   ```

3. **Start the server:**
   - **Using the batch launcher:** Double-click [`run.bat`](run.bat)
   - **Or via terminal:**
     ```bash
     python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
     ```

4. **Open in browser:**
   - Web Application: **[http://localhost:8000](http://localhost:8000)**
   - Interactive Swagger API Docs: **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

## 🧪 Running Automated Tests

Run the full system test suite covering ML prediction bounds, SHAP attribution, What-If simulation, and API endpoints:
```bash
python test_app.py
```

Expected output:
```text
>>> Testing VitalSync ML Engine...
  [OK] ML Evaluation & XAI passed successfully.
  [OK] What-If Simulation passed. Risk reduction: 53.4%
>>> Testing FastAPI Endpoints...
  [OK] /api/health OK
  [OK] /api/doctors OK (4 doctors found)
  [OK] /api/patients OK (4 patients found)
  [OK] /api/predict OK (Score: 59.3%)
  [OK] /api/appointments OK (2 appointments)
  [OK] Created appointment: apt-xxxxxx
  [OK] Appointment status updated

ALL SYSTEM TESTS PASSED PERFECTLY!
```

---

## 📄 License

This project was built for the **SIC Hackathon** under the MIT License.
