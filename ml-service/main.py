from fastapi import FastAPI
from pydantic import BaseModel

import joblib

app = FastAPI()

model = joblib.load('fraud_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

class MessageRequest(BaseModel):
    message:str

@app.get("/")
def root():
    return {
        "status":"wrongNumber: RedFlag ML service running"
    }


@app.post("/analyze")

def analyze(request:MessageRequest):
    vec =vectorizer.transform([request.message])
    prediction = model.predict(vec)[0]
    confidence = float(model.predict_proba(vec).max())


    return {
        "prediction":prediction,
        "confidence":round(confidence*100,2),
        "risk_level":"DANGER" if prediction =="fraud" and confidence >0.80 else "WARNING" if prediction =="fraud" else "SAFE"
    }
