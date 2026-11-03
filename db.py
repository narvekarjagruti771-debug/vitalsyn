"""
VITALSYN Data Store & In-Memory / File-Persisted Database
Indian Healthcare Context: Verified Indian Doctors, Patients & Clinical Personas
"""

import json
import os
import uuid
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional

DB_FILE = os.path.join(os.path.dirname(__file__), "vitalsyn_db.json")

class VitalSynDB:
    def __init__(self):
        self.patients: Dict[str, Dict[str, Any]] = {}
        self.doctors: Dict[str, Dict[str, Any]] = {}
        self.users: Dict[str, Dict[str, Any]] = {}
        self.assessments: List[Dict[str, Any]] = []
        self.appointments: List[Dict[str, Any]] = []
        self.load_or_seed()

    def load_or_seed(self):
        # We reseed to update all records to Indian context
        self.seed_initial_data()
        self.save()

    def save(self):
        data = {
            "patients": self.patients,
            "doctors": self.doctors,
            "users": self.users,
            "assessments": self.assessments,
            "appointments": self.appointments,
            "last_updated": datetime.now().isoformat()
        }
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def seed_initial_data(self):
        # 1. Indian Certified Medical Specialists
        self.doctors = {
            "doc-1": {
                "id": "doc-1",
                "name": "Dr. Rajesh Sharma, MD, DM",
                "specialty": "Cardiology",
                "specialty_code": "cardiology",
                "title": "Chief of Preventive Cardiology & Heart Care",
                "hospital": "Apollo Heart Institute, New Delhi",
                "experience_years": 18,
                "rating": 4.95,
                "review_count": 342,
                "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256",
                "available_slots": ["Tomorrow at 09:30 AM (Urgent Reserved)", "Tomorrow at 02:00 PM", "Thursday at 11:15 AM"],
                "bio": "Specializes in coronary artery disease prevention, blood pressure control, and cardiac rehabilitation."
            },
            "doc-2": {
                "id": "doc-2",
                "name": "Dr. Priya Nair, MD",
                "specialty": "Endocrinology",
                "specialty_code": "endocrinology",
                "title": "Senior Consultant Diabetologist",
                "hospital": "Max Center for Diabetes & Metabolic Care, Mumbai",
                "experience_years": 14,
                "rating": 4.92,
                "review_count": 286,
                "avatar": "https://images.unsplash.com/photo-1594824813511-309df5ff6bf9?auto=format&fit=crop&q=80&w=256",
                "available_slots": ["Today at 04:30 PM", "Wednesday at 10:00 AM", "Friday at 01:45 PM"],
                "bio": "Specializes in reversing pre-diabetes, HbA1c control, and insulin resistance management."
            },
            "doc-3": {
                "id": "doc-3",
                "name": "Dr. Amitav Banerjee, MD, DM",
                "specialty": "Nephrology",
                "specialty_code": "nephrology",
                "title": "Director of Renal Sciences & Kidney Care",
                "hospital": "Fortis Kidney Institute, Kolkata",
                "experience_years": 16,
                "rating": 4.89,
                "review_count": 194,
                "avatar": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=256",
                "available_slots": ["Tomorrow at 10:15 AM", "Thursday at 03:30 PM", "Friday at 09:00 AM"],
                "bio": "Specializes in diabetic nephropathy prevention, blood pressure-induced kidney strain, and renal preservation."
            },
            "doc-4": {
                "id": "doc-4",
                "name": "Dr. Sunita Deshmukh, MD, DM",
                "specialty": "Neurology",
                "specialty_code": "neurology",
                "title": "Senior Neurologist & Stroke Care Lead",
                "hospital": "Manipal Brain & Neuro Institute, Bengaluru",
                "experience_years": 15,
                "rating": 4.96,
                "review_count": 310,
                "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256",
                "available_slots": ["Today at 03:00 PM (Priority)", "Wednesday at 01:15 PM", "Thursday at 04:00 PM"],
                "bio": "Expert in cerebrovascular health, stroke prevention, and carotid blood flow monitoring."
            }
        }

        # 2. Indian Patients
        self.patients = {
            "pat-1": {
                "id": "pat-1",
                "name": "Ramesh Patel",
                "age": 58,
                "sex": "male",
                "phone": "+91 98201 44812",
                "email": "ramesh.patel@email.in",
                "blood_type": "B+",
                "bmi": 29.4,
                "sbp": 158,
                "dbp": 96,
                "total_chol": 248,
                "hdl_chol": 38,
                "fasting_glucose": 112,
                "hba1c": 6.1,
                "serum_creatinine": 1.2,
                "uacr": 45,
                "smoker": True,
                "diabetes": False,
                "afib": False,
                "history": [
                    {"date": "2026-05-10", "sbp": 142, "glucose": 104, "risk_note": "Mild blood pressure elevation."},
                    {"date": "2026-08-15", "sbp": 150, "glucose": 108, "risk_note": "Hypertension progressing, smoking cessation advised."},
                    {"date": "2026-11-01", "sbp": 158, "glucose": 112, "risk_note": "High cardiovascular risk spike detected."}
                ]
            },
            "pat-2": {
                "id": "pat-2",
                "name": "Ananya Sen",
                "age": 47,
                "sex": "female",
                "phone": "+91 98450 71290",
                "email": "ananya.sen@email.in",
                "blood_type": "A+",
                "bmi": 33.1,
                "sbp": 136,
                "dbp": 86,
                "total_chol": 215,
                "hdl_chol": 44,
                "fasting_glucose": 128,
                "hba1c": 6.7,
                "serum_creatinine": 0.9,
                "uacr": 25,
                "smoker": False,
                "diabetes": True,
                "afib": False,
                "history": [
                    {"date": "2026-04-12", "sbp": 128, "glucose": 110, "risk_note": "Impaired morning fasting blood sugar."},
                    {"date": "2026-07-20", "sbp": 132, "glucose": 120, "risk_note": "Pre-diabetes transitioning to early diabetes."},
                    {"date": "2026-10-28", "sbp": 136, "glucose": 128, "risk_note": "HbA1c reached 6.7%, endocrine follow-up required."}
                ]
            },
            "pat-3": {
                "id": "pat-3",
                "name": "Vikram Malhotra",
                "age": 66,
                "sex": "male",
                "phone": "+91 97110 52391",
                "email": "vikram.m@email.in",
                "blood_type": "O+",
                "bmi": 27.8,
                "sbp": 152,
                "dbp": 88,
                "total_chol": 195,
                "hdl_chol": 41,
                "fasting_glucose": 118,
                "hba1c": 6.3,
                "serum_creatinine": 1.9,
                "uacr": 210,
                "smoker": False,
                "diabetes": True,
                "afib": False,
                "history": [
                    {"date": "2026-03-01", "sbp": 140, "glucose": 105, "risk_note": "Mild renal decline observed."},
                    {"date": "2026-06-15", "sbp": 146, "glucose": 112, "risk_note": "Urine protein microalbuminuria detected."},
                    {"date": "2026-10-15", "sbp": 152, "glucose": 118, "risk_note": "Kidney strain with elevated creatinine (1.9)."}
                ]
            },
            "pat-4": {
                "id": "pat-4",
                "name": "Pooja Iyer",
                "age": 32,
                "sex": "female",
                "phone": "+91 98840 31920",
                "email": "pooja.iyer@email.in",
                "blood_type": "O-",
                "bmi": 21.8,
                "sbp": 116,
                "dbp": 74,
                "total_chol": 165,
                "hdl_chol": 62,
                "fasting_glucose": 86,
                "hba1c": 5.1,
                "serum_creatinine": 0.8,
                "uacr": 15,
                "smoker": False,
                "diabetes": False,
                "afib": False,
                "history": [
                    {"date": "2026-02-10", "sbp": 114, "glucose": 84, "risk_note": "Optimal routine wellness screen."},
                    {"date": "2026-10-01", "sbp": 116, "glucose": 86, "risk_note": "All vitals in ideal healthy range."}
                ]
            }
        }

        # 3. Initial Appointments
        self.appointments = [
            {
                "id": "apt-101",
                "patient_id": "pat-1",
                "patient_name": "Ramesh Patel",
                "doctor_id": "doc-1",
                "doctor_name": "Dr. Rajesh Sharma, MD, DM",
                "specialty": "Cardiology",
                "slot": "Tomorrow at 09:30 AM",
                "status": "Waiting in Queue",
                "urgency": "Urgent Follow-up",
                "risk_category": "High Risk",
                "risk_score": 74,
                "disease": "Heart Disease (ASCVD)",
                "triage_reason": "High blood pressure (158/96 mmHg) and active smoking.",
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")
            },
            {
                "id": "apt-102",
                "patient_id": "pat-2",
                "patient_name": "Ananya Sen",
                "doctor_id": "doc-2",
                "doctor_name": "Dr. Priya Nair, MD",
                "specialty": "Endocrinology",
                "slot": "Wednesday at 10:00 AM",
                "status": "Confirmed",
                "urgency": "Moderate Follow-up",
                "risk_category": "Moderate Risk",
                "risk_score": 42,
                "disease": "Type 2 Diabetes",
                "triage_reason": "Elevated HbA1c (6.7%) and fasting glucose 128 mg/dL.",
                "created_at": (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d %H:%M")
            }
        ]

    def get_all_doctors(self) -> List[Dict[str, Any]]:
        return list(self.doctors.values())

    def get_doctor(self, doc_id: str) -> Optional[Dict[str, Any]]:
        return self.doctors.get(doc_id)

    def get_all_patients(self) -> List[Dict[str, Any]]:
        return list(self.patients.values())

    def get_patient(self, pat_id: str) -> Optional[Dict[str, Any]]:
        return self.patients.get(pat_id)

    def record_assessment(self, assessment_data: Dict[str, Any]) -> Dict[str, Any]:
        rec_id = f"eval-{uuid.uuid4().hex[:8]}"
        assessment_data["id"] = rec_id
        assessment_data["timestamp"] = datetime.now().isoformat()
        self.assessments.insert(0, assessment_data)
        
        pat_id = assessment_data.get("patient_id")
        if pat_id and pat_id in self.patients:
            self.patients[pat_id]["history"].append({
                "date": datetime.now().strftime("%Y-%m-%d"),
                "sbp": assessment_data.get("sbp", 120),
                "glucose": assessment_data.get("fasting_glucose", 95),
                "risk_score": assessment_data.get("primary_concern", {}).get("risk_score", 0),
                "risk_category": assessment_data.get("primary_concern", {}).get("category", "Normal"),
                "risk_note": f"VITALSYN Check: {assessment_data.get('primary_concern', {}).get('disease', 'Evaluation')} ({assessment_data.get('primary_concern', {}).get('risk_score', 0)}%)"
            })
        self.save()
        return assessment_data

    def get_all_appointments(self) -> List[Dict[str, Any]]:
        return self.appointments

    def create_appointment(self, appt_data: Dict[str, Any]) -> Dict[str, Any]:
        appt_id = f"apt-{uuid.uuid4().hex[:6]}"
        appt = {
            "id": appt_id,
            "patient_id": appt_data.get("patient_id", "pat-1"),
            "patient_name": appt_data.get("patient_name", "Patient"),
            "doctor_id": appt_data.get("doctor_id", "doc-1"),
            "doctor_name": appt_data.get("doctor_name", "Dr. Rajesh Sharma"),
            "specialty": appt_data.get("specialty", "Cardiology"),
            "slot": appt_data.get("slot", "Next Available Slot"),
            "status": "Waiting in Queue",
            "urgency": appt_data.get("urgency", "Routine"),
            "risk_category": appt_data.get("risk_category", "Standard"),
            "risk_score": appt_data.get("risk_score", 0),
            "disease": appt_data.get("disease", "Heart Health"),
            "triage_reason": appt_data.get("triage_reason", "Routine checkup requested."),
            "sbar_note": appt_data.get("sbar_note", {}),
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        self.appointments.insert(0, appt)
        self.save()
        return appt

    def update_appointment_status(self, appt_id: str, new_status: str) -> Optional[Dict[str, Any]]:
        for a in self.appointments:
            if a["id"] == appt_id:
                a["status"] = new_status
                self.save()
                return a
        return None

db = VitalSynDB()
