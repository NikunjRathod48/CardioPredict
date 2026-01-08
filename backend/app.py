from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from utils.preprocessing import preprocess_input
import time

app = Flask(__name__)
CORS(app)

# ------------------------------
# Load FINAL PIPELINE MODEL ONLY
# ------------------------------
try:
    model = joblib.load(open("model/cardio_final_safe_model.pkl", "rb"))
    print("✅ Model loaded successfully")
except Exception as e:
    raise RuntimeError(f"Model loading failed: {e}")

# ------------------------------
# Root
# ------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": True,
        "message": "Cardio Disease Prediction API is running"
    })

# ------------------------------
# Prediction
# ------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": False, "error": "No JSON received"}), 400

        df = preprocess_input(data)

        prediction = int(model.predict(df)[0])
        probability = float(model.predict_proba(df)[0][1])

        return jsonify({
            "status": True,
            "prediction": prediction,
            "risk_probability": round(probability * 100, 2),
            "risk_label": "High Risk" if prediction == 1 else "Low Risk"
        })

    except Exception as e:
        return jsonify({
            "status": False,
            "error": str(e)
        }), 500

# ------------------------------
if __name__ == "__main__":
    app.run(debug=True)
