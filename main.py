"""
VITALSYN: AI-Powered Predictive & Preventive Healthcare Ecosystem
FastAPI Web Server & RESTful API Service
"""

import os
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

from ml_engine import VitalSynMLEngine
from db import db

app = FastAPI(
    title="VITALSYN API",
    description="Intelligent Disease Risk Assessment, Explainable AI & Smart Risk-to-Appointment Triage",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(STATIC_DIR, exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "css"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "js"), exist_ok=True)

# Pydantic Schemas
class RiskAssessmentRequest(BaseModel):
    patient_id: Optional[str] = None
    name: str = "Anonymous Patient"
    age: float = Field(..., ge=18, le=110)
    sex: str = "male"
    sbp: float = Field(..., ge=70, le=240, description="Systolic Blood Pressure (mmHg)")
    dbp: float = Field(..., ge=40, le=140, description="Diastolic Blood Pressure (mmHg)")
    fasting_glucose: float = Field(..., ge=50, le=450, description="Fasting Blood Glucose (mg/dL)")
    hba1c: float = Field(5.4, ge=4.0, le=16.0, description="HbA1c percentage")
    total_chol: float = Field(190.0, ge=80, le=450, description="Total Cholesterol (mg/dL)")
    hdl_chol: float = Field(50.0, ge=15, le=120, description="HDL Cholesterol (mg/dL)")
    bmi: float = Field(24.5, ge=14.0, le=60.0, description="Body Mass Index (kg/m2)")
    serum_creatinine: float = Field(1.0, ge=0.3, le=10.0, description="Serum Creatinine (mg/dL)")
    uacr: float = Field(20.0, ge=1.0, le=1000.0, description="Urine Albumin/Creatinine (mg/g)")
    smoker: bool = False
    diabetes: bool = False
    bp_treated: bool = False
    physical_activity: bool = True
    family_history: bool = False
    afib: bool = False
    prev_tia: bool = False

class WhatIfRequest(BaseModel):
    original_data: Dict[str, Any]
    modified_params: Dict[str, Any]

class AppointmentCreateRequest(BaseModel):
    patient_id: Optional[str] = "pat-guest"
    patient_name: str
    doctor_id: str
    doctor_name: str
    specialty: str
    slot: str
    urgency: str = "Routine"
    risk_category: str = "Standard Triage"
    risk_score: float = 0.0
    disease: str = "General Care"
    triage_reason: str = "AI Risk-to-Appointment Auto-Triage"
    sbar_note: Optional[Dict[str, str]] = None

class StatusUpdateRequest(BaseModel):
    status: str

# API Routes
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "VITALSYN Healthcare Ecosystem",
        "version": "1.0.0",
        "engine": "VitalSyn XAI & Risk-to-Appointment Engine"
    }

@app.get("/api/doctors")
def get_doctors(specialty: Optional[str] = None):
    docs = db.get_all_doctors()
    if specialty:
        docs = [d for d in docs if d["specialty"].lower() == specialty.lower() or d["specialty_code"].lower() == specialty.lower()]
    return docs

@app.get("/api/patients")
def get_patients():
    return db.get_all_patients()

@app.get("/api/patients/{pat_id}")
def get_patient(pat_id: str):
    pat = db.get_patient(pat_id)
    if not pat:
        raise HTTPException(status_code=404, detail="Patient not found")
    return pat

@app.post("/api/predict")
def predict_disease_risks(req: RiskAssessmentRequest):
    data = req.model_dump()
    evaluation = VitalSynMLEngine.evaluate_all(data)
    # Record assessment in history
    recorded = db.record_assessment({**data, **evaluation})
    return evaluation

@app.post("/api/what-if")
def simulate_counterfactual(req: WhatIfRequest):
    result = VitalSynMLEngine.compute_counterfactual(req.original_data, req.modified_params)
    return result

@app.get("/api/appointments")
def get_appointments():
    return db.get_all_appointments()

@app.post("/api/appointments")
def book_appointment(req: AppointmentCreateRequest):
    created = db.create_appointment(req.model_dump())
    return created

@app.patch("/api/appointments/{appt_id}/status")
def update_status(appt_id: str, req: StatusUpdateRequest):
    updated = db.update_appointment_status(appt_id, req.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return updated

@app.post("/api/reset-demo")
def reset_demo():
    db.seed_initial_data()
    db.save()
    return {"message": "Demo database successfully reseeded to initial state!"}

# Serve Frontend static assets
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def serve_index():
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Frontend not yet built. Please check /static/index.html"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
