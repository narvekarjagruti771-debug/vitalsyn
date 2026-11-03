"""
VITALSYNC Automated System Test
Validates:
1. Multi-disease ML risk calculations (CVD, Diabetes, Stroke, CKD)
2. Explainable AI (XAI) feature attribution & What-If counterfactual engine
3. SBAR clinical handover generation
4. FastAPI endpoints & database operations
"""

import sys
from fastapi.testclient import TestClient
from main import app
from ml_engine import VitalSyncMLEngine

def test_ml_engine():
    print(">>> Testing VitalSync ML Engine...")
    sample_data = {
        "name": "Test Patient",
        "age": 58,
        "sex": "male",
        "sbp": 160,
        "dbp": 98,
        "total_chol": 250,
        "hdl_chol": 38,
        "fasting_glucose": 115,
        "hba1c": 6.2,
        "bmi": 29.5,
        "serum_creatinine": 1.2,
        "uacr": 40,
        "smoker": True,
        "diabetes": False,
        "afib": False
    }

    eval_result = VitalSyncMLEngine.evaluate_all(sample_data)
    assert "assessments" in eval_result, "Assessments missing"
    assert eval_result["assessments"]["cardiovascular"]["risk_score"] > 50, "CVD score should be elevated"
    assert len(eval_result["primary_concern"]["drivers"]) > 0, "XAI drivers should be present"
    assert "sbar_note" in eval_result, "SBAR note should be generated"
    assert "situation" in eval_result["sbar_note"], "Situation in SBAR"
    print("  [OK] ML Evaluation & XAI passed successfully.")

    # Test What-If
    what_if = VitalSyncMLEngine.compute_counterfactual(sample_data, {"sbp": 120, "smoker": False})
    assert what_if["risk_reduction_pct"] > 0, "Risk reduction should be positive"
    print(f"  [OK] What-If Simulation passed. Risk reduction: {what_if['risk_reduction_pct']}%")

def test_api():
    print(">>> Testing FastAPI Endpoints...")
    client = TestClient(app)

    # Health
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"
    print("  [OK] /api/health OK")

    # Doctors
    r = client.get("/api/doctors")
    assert r.status_code == 200
    docs = r.json()
    assert len(docs) >= 4
    print(f"  [OK] /api/doctors OK ({len(docs)} doctors found)")

    # Patients
    r = client.get("/api/patients")
    assert r.status_code == 200
    patients = r.json()
    assert len(patients) >= 4
    print(f"  [OK] /api/patients OK ({len(patients)} patients found)")

    # Predict API
    payload = {
        "name": "Robert Chen",
        "age": 58,
        "sex": "male",
        "sbp": 158,
        "dbp": 96,
        "total_chol": 248,
        "hdl_chol": 38,
        "fasting_glucose": 112,
        "hba1c": 6.1,
        "bmi": 29.4,
        "serum_creatinine": 1.2,
        "uacr": 45,
        "smoker": True,
        "diabetes": False,
        "afib": False
    }
    r = client.post("/api/predict", json=payload)
    assert r.status_code == 200
    res = r.json()
    assert res["assessments"]["cardiovascular"]["risk_score"] > 50
    print(f"  [OK] /api/predict OK (Score: {res['assessments']['cardiovascular']['risk_score']}%)")

    # Appointments
    r = client.get("/api/appointments")
    assert r.status_code == 200
    print(f"  [OK] /api/appointments OK ({len(r.json())} appointments)")

    # Create Appointment
    new_appt = {
        "patient_name": "Robert Chen",
        "doctor_id": "doc-1",
        "doctor_name": "Dr. Elena Vance",
        "specialty": "Cardiology",
        "slot": "Tomorrow at 09:30 AM",
        "urgency": "Urgent (Within 48h)",
        "risk_category": "High Risk",
        "risk_score": 74.2,
        "disease": "Cardiovascular Disease",
        "triage_reason": "Automated triage test."
    }
    r = client.post("/api/appointments", json=new_appt)
    assert r.status_code == 200
    appt_id = r.json()["id"]
    print(f"  [OK] Created appointment: {appt_id}")

    # Patch Status
    r = client.patch(f"/api/appointments/{appt_id}/status", json={"status": "Confirmed"})
    assert r.status_code == 200
    assert r.json()["status"] == "Confirmed"
    print("  [OK] Appointment status updated")

    print("\nALL SYSTEM TESTS PASSED PERFECTLY!")

if __name__ == "__main__":
    test_ml_engine()
    test_api()
