# wrongNumber: RedFlag

**AI-powered fraud detection for UPI scams, phishing messages, and financial fraud — built for the LPU Computing & AI Expo 2026.**

---

## What it does

Paste any suspicious message — a UPI alert, loan offer, KYC warning, or prize notification — and the system instantly classifies it as **SAFE**, **SUSPICIOUS**, or **HIGH RISK (Fraud)** using a machine learning model trained on Indian fraud datasets.

**Detects:**
- UPI & payment scams
- Phishing links
- Fake KYC / account suspension alerts
- Loan app fraud
- Prize / lottery scams
- OTP theft attempts

---

## Architecture

```
Client (React)  →  Backend (Express)  →  ML Service (FastAPI)
    :5173              :3000                   :8000
```

| Layer | Stack |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5, Axios |
| **ML Service** | Python, FastAPI, scikit-learn, joblib |

---

## Project Structure

```
wrongNumber-redflag/
├── client/          # React frontend
├── backend/         # Express API gateway
└── ml-service/      # FastAPI + ML model
    ├── model.py          # Train the model
    ├── main.py           # FastAPI server
    ├── fraud_model.pkl   # Trained model (generated)
    └── vectorizer.pkl    # TF-IDF vectorizer (generated)
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- npm

---

### 1. ML Service

```bash
cd ml-service

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux

# Install dependencies
pip install fastapi uvicorn scikit-learn pandas joblib

# Train the model (generates fraud_model.pkl & vectorizer.pkl)
python model.py

# Start the ML service
uvicorn main:app --reload --port 8000
```

---

### 2. Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo PORT=3000 > .env
echo ML_SERVICE=http://127.0.0.1:8000 >> .env

# Start the backend
npm run dev
```

---

### 3. Client

```bash
cd client

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API

### `POST /api/v1/analyze`

**Request**
```json
{ "message": "Your UPI account will be blocked. Verify KYC at bit.ly/upi-kyc" }
```

**Response**
```json
{
  "result": {
    "prediction": "fraud",
    "confidence": 94.3,
    "risk_level": "DANGER"
  }
}
```

`risk_level` values: `DANGER` · `WARNING` · `SAFE`

---

## Model

Trained with **Logistic Regression + TF-IDF** on a combined dataset of Indian SMS fraud and phishing messages.

- `model.py` — trains and saves the model
- `main.py` — serves predictions via FastAPI
- Re-train anytime: `python model.py`

---

## Environment Variables

| File | Variable | Description |
|---|---|---|
| `backend/.env` | `PORT` | Express server port (default: 3000) |
| `backend/.env` | `ML_SERVICE` | FastAPI base URL (default: http://127.0.0.1:8000) |

---

*wrongNumber: RedFlag — LPU Computing & AI Expo 2026*
