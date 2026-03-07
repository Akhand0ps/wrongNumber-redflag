from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re
from upi_checker import check_upi
from loan_checker import check_loan_app

app = FastAPI()

model = joblib.load('fraud_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

FRAUD_SIGNALS = [
    (r'bit\.ly|tinyurl|shorturl|click here|verify now', 'Contains suspicious shortened link'),
    (r'kyc|k\.y\.c', 'Mentions KYC verification — common fraud trigger'),
    (r'block|suspend|deactivat|expir', 'Threatens account blocking or suspension'),
    (r'otp|one.time.password', 'Asks for OTP — banks never ask for this'),
    (r'urgent|immediately|right now|within \d+ hour', 'Uses urgency language to pressure you'),
    (r'won|winner|prize|lottery|reward|cashback.*claim', 'Promises prize or reward'),
    (r'arrest|legal action|court case|police|cbi|ed office', 'Impersonates law enforcement'),
    (r'approve.*request|accept.*request|collect request', 'Asks to approve a UPI collect request'),
    (r'share.*otp|send.*otp|otp.*share|otp.*send', 'Asks you to share OTP'),
    (r'loan.*approv|instant loan|no document|no cibil', 'Predatory loan app pattern'),
    (r'galti se|wrong number.*pay|mistake.*sent|accidentally sent', 'Fake wrong transfer scam'),
    (r'aadhaar.*otp|pan.*detail|card.*number.*cvv', 'Asks for sensitive personal/financial details'),
]

def get_reasons(message:str)->list:
    reasons=[]

    msg_lower = message.lower()

    for pattern,explanation in FRAUD_SIGNALS:
        if re.search(pattern,msg_lower):
            reasons.append(explanation)
    
    return reasons if reasons else ['Matches known message patterns']
class MessageRequest(BaseModel):
    message:str

class UPIRequest(BaseModel):
    upi_id:str

class LoanApp(BaseModel):
    appName:str

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

    reasons = get_reasons(request.message) if prediction == 'fraud' else []


    return {
        "prediction":prediction,
        "confidence":round(confidence*100,2),
        "risk_level":"DANGER" if prediction =="fraud" and confidence >0.80 else "WARNING" if prediction =="fraud" else "SAFE",
        "reasons":reasons

    }

@app.post("/upi_checker")

def upi_checker(request:UPIRequest):
    upi_id = request.upi_id
    response = check_upi(upi_id)
    
    return response

@app.post("/loanAppChecker")

def loanAppChecker(request:LoanApp):

    loanapp = request.appName
    print(loanapp)
    print(type(loanapp))
    response = check_loan_app(loanapp)

    return response
    