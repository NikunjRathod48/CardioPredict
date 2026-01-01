from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from utils.preprocessing import preprocess_input

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ------------------------------
# Load Model + Scaler
# ------------------------------
try:
    model = pickle.load(open("model/cardio_model.pkl", "rb"))
    scaler = pickle.load(open("model/scaler.pkl", "rb"))
    print("Model & Scaler Loaded Successfully!")
except Exception as e:
    print("❌ Error loading model/scaler:", e)


# ------------------------------
# Root Check Endpoint
# ------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": True,
        "message": "Cardio Disease Prediction API Running Successfully!"
    })


# ------------------------------
# Prediction Endpoint
# ------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"status": False, "error": "No JSON data received"}), 400

        processed = preprocess_input(data, scaler)

        prediction = model.predict(processed)[0]
        probability = float(model.predict_proba(processed)[0][1])

        return jsonify({
            "status": True,
            "prediction": int(prediction),
            "risk_probability": round(probability * 100, 2),  # % value
            "risk_label": "High Risk" if prediction == 1 else "Low Risk"
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        debug_info = {}
        if 'processed' in locals():
            if hasattr(processed, 'columns'):
                debug_info['input_columns'] = processed.columns.tolist()
            else:
                debug_info['input_type'] = str(type(processed))
        
        if hasattr(model, 'feature_names_in_'):
            debug_info['expected_features'] = model.feature_names_in_.tolist()

        return jsonify({
            "status": False,
            "error": str(e),
            "debug": debug_info
        }), 500


# ------------------------------
# Model Metrics API
# ------------------------------
@app.route("/model-metrics", methods=["GET"])
def model_metrics():
    try:
        metrics = {
            "model_name": "Gradient Boosting Classifier",
            "dataset_samples": 13095,
            "accuracy": 0.739,

            "class_report": {
                "class_0": {"precision": 0.70, "recall": 0.76, "f1": 0.73},
                "class_1": {"precision": 0.75, "recall": 0.68, "f1": 0.71},
                "macro_f1": 0.72
            },

            "confusion_matrix": {
                "tn": 4926,
                "fp": 1531,
                "fn": 2148,
                "tp": 4490
            },

            "feature_importance": [
                {"name": "Systolic BP", "value": 0.32},
                {"name": "Age", "value": 0.24},
                {"name": "Cholesterol", "value": 0.15},
                {"name": "BMI", "value": 0.12},
                {"name": "Glucose", "value": 0.10},
                {"name": "Lifestyle", "value": 0.07}
            ],

            "roc_auc": 0.80,
            "roc_curve": {
                "fpr": [0.0, 0.1, 0.2, 0.4, 1.0],
                "tpr": [0.0, 0.55, 0.68, 0.82, 1.0]
            }
        }

        return jsonify({"status": True, "metrics": metrics})

    except Exception as e:
        return jsonify({"status": False, "error": str(e)}), 500


# ------------------------------
# Run App
# ------------------------------
if __name__ == "__main__":
    app.run(debug=True)