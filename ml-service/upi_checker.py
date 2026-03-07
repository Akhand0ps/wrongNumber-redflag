import re

KNOWN_LEGIT_HANDLES = [
    "@oksbi", "@okaxis", "@okhdfcbank", "@okicici",
    "@paytm", "@ybl", "@ibl", "@axl", "@upi",
    "@razorpay", "@stripe", "@juspay"
]

SUSPICIOUS_KEYWORDS = [
    "prize", "reward", "lucky", "win", "claim", "kyc",
    "verify", "refund", "cashback", "support", "helpline",
    "free", "offer", "gift", "bonus", "lucky"
]

def check_upi(upi_id: str) -> dict:
    upi_lower = upi_id.lower().strip()
    reasons = []
    score = 0  # 0 = safe, higher = more suspicious

    # Check format
    if "@" not in upi_lower:
        return {"upi_id": upi_id, "risk_level": "DANGER",
                "reasons": ["Invalid UPI format — not a valid UPI ID"]}

    username, handle = upi_lower.split("@", 1)

    # Check for suspicious keywords in username
    for keyword in SUSPICIOUS_KEYWORDS:
        if keyword in username:
            reasons.append(f"Contains '{keyword}' — common in fraud UPI IDs")
            score += 2

    # Check if handle is a known legitimate bank handle
    full_handle = "@" + handle
    if full_handle not in KNOWN_LEGIT_HANDLES:
        reasons.append(f"'{full_handle}' is not a recognized bank UPI handle")
        score += 1

    # Check if username looks like random characters (scammer pattern)
    if re.match(r'^[a-z0-9]{15,}$', username):
        reasons.append("Unusually long random-looking UPI username")
        score += 1

    # Check if username is purely numeric but not a phone number
    if username.isdigit() and len(username) != 10:
        reasons.append("Numeric username that is not a valid phone number")
        score += 2

    if score >= 3:
        risk = "DANGER"
    elif score >= 1:
        risk = "WARNING"
    else:
        risk = "SAFE"
        reasons = ["Follows legitimate UPI ID patterns"]

    return {
        "upi_id": upi_id,
        "risk_level": risk,
        "reasons": reasons
    }


ans = check_upi("akhand@oksbi");

print(ans);