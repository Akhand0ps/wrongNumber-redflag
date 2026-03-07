import re
import json
import os

# Load RBI NBFC list
_BASE = os.path.dirname(__file__)
with open(os.path.join(_BASE, 'nbfc_list.json'), 'r') as f:
    NBFC_DATA = json.load(f)

# Build a set of short names for fast lookup
NBFC_SHORT_NAMES = {n['short'] for n in NBFC_DATA}
NBFC_FULL_NAMES  = {n['full'].lower() for n in NBFC_DATA}

DANGER_PATTERNS = [
    (r'no\s*cibil|no cibil check',              'Legitimate lenders always check CIBIL score'),
    (r'no\s*document|zero document',             'No-document loans are a major red flag'),
    (r'only\s*aadhaar|just\s*aadhaar',           'Aadhaar-only loans are unregulated'),
    (r'\.apk|download.*apk|install.*apk',        'Direct APK — not on Play Store, high risk'),
    (r'0%\s*interest|zero interest',             'No legitimate lender offers 0% interest'),
    (r'pay.*before.*disburse|fee.*before.*loan', 'Upfront fee before loan disbursement is a scam'),
    (r'morphed.*photo|share.*contact',           'Blackmail/extortion pattern'),
    (r'security\s*deposit|registration\s*fee',   'Upfront registration fee is a scam tactic'),
    (r'whatsapp.*loan|loan.*whatsapp',           'Loans via WhatsApp are not legitimate'),
]

WARNING_PATTERNS = [
    (r'guaranteed\s*approval|100%\s*approval',  'No legitimate lender guarantees approval'),
    (r'no\s*income\s*proof|without\s*salary',   'No income verification is a warning sign'),
    (r'instant.*\d+\s*min|\d+\s*min.*loan',     'Unrealistic disbursement time claims'),
]

def check_loan_app(app_name: str) -> dict:
    app_lower = app_name.lower().strip()

    # Remove common suffixes for matching
    clean = re.sub(
        r'\s*(private limited|pvt\.?\s*ltd\.?|limited|p\.?\s*ltd\.?|llp|app|loan app).*$',
        '', app_lower, flags=re.IGNORECASE
    ).strip()

    # Check against RBI NBFC registry — exact short name match
    if clean in NBFC_SHORT_NAMES or app_lower in NBFC_FULL_NAMES:
        return {
            "app_name": app_name,
            "risk_level": "SAFE",
            "reasons": ["Registered in RBI NBFC registry (as of December 2025)"],
            "recommendation": "Always verify at rbi.org.in before borrowing"
        }

    # Partial match — name appears inside a registered NBFC name
    for short in NBFC_SHORT_NAMES:
        if clean in short or short in clean:
            if len(clean) > 4:  # avoid false matches on very short strings
                return {
                    "app_name": app_name,
                    "risk_level": "SAFE",
                    "reasons": [f"Likely matches RBI-registered entity"],
                    "recommendation": "Confirm at rbi.org.in/Scripts/NBFCList.aspx"
                }

    reasons = []
    score = 0

    for pattern, reason in DANGER_PATTERNS:
        if re.search(pattern, app_lower):
            reasons.append(reason)
            score += 3

    for pattern, reason in WARNING_PATTERNS:
        if re.search(pattern, app_lower):
            reasons.append(reason)
            score += 1

    if score >= 3:
        risk = "DANGER"
    elif score >= 1:
        risk = "WARNING"
    else:
        risk = "UNKNOWN"
        reasons = [
            "Not found in RBI NBFC registry (9,185 registered entities checked)",
            "Unregistered lenders are not regulated by RBI"
        ]

    return {
        "app_name": app_name,
        "risk_level": risk,
        "reasons": reasons,
        "recommendation": "Verify at rbi.org.in/Scripts/NBFCList.aspx before borrowing"
    }