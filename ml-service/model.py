import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import joblib

# Load both datasets
combined = pd.read_csv('combined_dataset.csv')
indian = pd.read_csv('indian_fraud_dataset.csv')

# Merge them
df = pd.concat([combined, indian], ignore_index=True)
df = df.dropna(subset=['message'])

print("Dataset size:", df.shape)
print(df['label'].value_counts())

X_train, X_test, y_train, y_test = train_test_split(
    df['message'], df['label'], test_size=0.2, random_state=42
)

vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf  = vectorizer.transform(X_test)

model = LogisticRegression(class_weight='balanced')
model.fit(X_train_tfidf, y_train)

print(classification_report(y_test, model.predict(X_test_tfidf)))

joblib.dump(model, 'fraud_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')
print('Model Saved')

# Test
test_messages = [
    "Your UPI account will be blocked. Verify KYC immediately at bit.ly/upi-kyc",
    "Your order of Rs.499 from Swiggy has been placed successfully.",
    "Dear customer your PhonePe wallet is suspended. Click here to verify now.",
    "UPI payment of Rs.350 to BigBasket successful. Thank you for shopping.",
]

for msg in test_messages:
    vec = vectorizer.transform([msg])
    prediction = model.predict(vec)[0]
    confidence = model.predict_proba(vec).max()
    print(f"[{prediction.upper()}] ({confidence:.0%}) — {msg[:60]}...")



