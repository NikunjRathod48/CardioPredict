from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from utils.preprocessing import preprocess_input

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model/cardio_model.pkl","rb"))
scaler = pickle.load(open("model/scaler.pkl","rb"))

@app.route("/", methods=["GET"])
def home():
    return "Cardio Disease Prediction API Running Successfully!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        processed_data = preprocess_input(data, scaler)

        prediction = model.predict(processed_data)[0]
        probability = model.predict_proba(processed_data)[0][1]

        return jsonify({
            "status": True,
            "prediction": int(prediction),
            "risk_probability": round(float(probability), 3),
            "message": "High Risk" if prediction == 1 else "Low Risk"
        })

    except Exception as e:
        return jsonify({"status": False, "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
