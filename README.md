<h1 align="center">❤️ CardioPredict AI – Advanced Cardiovascular Risk Prediction System</h1>

<p align="center">
  <a href="https://cardio-risk-predictor.netlify.app/"><img src="https://img.shields.io/badge/Live%20Demo-Online-brightgreen" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Model-Gradient%20Boosting-blue" alt="Model" />
  <img src="https://img.shields.io/badge/Accuracy-73.9%25-purple" alt="Accuracy" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success" alt="Status" />
</p>

---

## 🚀 Live Demo
▶️ **Access the Web App:** [https://cardio-risk-predictor.netlify.app/](https://cardio-risk-predictor.netlify.app/)

---

## 🧠 What is CardioPredict AI?
**CardioPredict AI** is a machine learning–powered healthcare application that predicts a person’s risk of cardiovascular disease using clinically relevant health parameters.

It provides:
- **Real-time predictions** with probability confidence
- **Advanced risk explanation** and interactive charts
- **Professional, medical-grade UI**

Designed for **education, research, healthcare learning, and intelligent screening support**.

---

## ✨ Key Features
- ✔️ Real-time Cardiovascular Risk Prediction
- ✔️ Probability & Confidence Indicator
- ✔️ Benchmark vs Patient Comparison
- ✔️ Confusion Matrix, Metrics Analytics & AUC
- ✔️ Feature Importance + SHAP Explainability
- ✔️ Gradient Boosting ML Model (Final)
- ✔️ React + Tailwind Premium UI
- ✔️ Fully Live — Not Demo Code!

---

## 📊 Model Performance
| Metric | Score |
| :--- | :--- |
| **Accuracy** | 73.9% |
| **Macro F1** | 0.72 |
| **ROC-AUC** | ~0.80 |
| **Dataset Size** | 13,095 Records |
| **Model** | Gradient Boosting Classifier |

### 📌 Confusion Matrix
| | Predicted Healthy | Predicted At-Risk |
| :--- | :---: | :---: |
| **Actual Healthy** | 4926 (TN) | 1531 (FP) |
| **Actual At-Risk** | 2148 (FN) | 4490 (TP) |

### 🔍 Class Metrics
| Class | Precision | Recall | F1 |
| :--- | :---: | :---: | :---: |
| Healthy (0) | 0.70 | 0.76 | 0.73 |
| At-Risk (1) | 0.75 | 0.68 | 0.71 |

---

## 🛠 Tech Stack

### **Frontend**
- React + Vite ⚡
- Tailwind CSS 🎨
- Framer Motion ✨
- Recharts 📊

### **Backend**
- Flask (Python)
- REST API
- Render Hosted

### **Machine Learning**
- Gradient Boosting Classifier
- Scikit-Learn
- Pandas / NumPy
- Feature Scaling & Preprocessing

---

## 📂 Project Structure
```text
CardioPredict
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── model/
│   │   ├── cardio_model.pkl
│   │   └── scaler.pkl
│   └── utils/
│       └── preprocessing.py
├── frontend/
├── notebooks/
├── dataset/
└── README.md
```

---

## 🧩 API Usage

### 🔗 Endpoint
`POST /predict`

### 📤 Sample Request
```json
{
  "height": 165,
  "weight": 92,
  "ap_hi": 165,
  "ap_lo": 105,
  "cholesterol": 3,
  "gluc": 3,
  "smoke": 1,
  "alco": 1,
  "age_years": 58
}
```

### 📥 Sample Response
```json
{
  "status": true,
  "prediction": 1,
  "risk_probability": 78.4,
  "risk_label": "High Risk"
}
```

---

## 🛠️ Local Setup

### 1. Clone Repo
```bash
git clone https://github.com/NikunjRathod48/CardioPredict
cd CardioPredict
```

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌍 Deployment
| Service | Platform |
| :--- | :--- |
| **Backend** | Render |
| **Frontend** | Netlify |
| **Model** | Pickle Deployed |

---

## ⚠️ Disclaimer
> This system is intended for education & decision-support only. It is **NOT** a certified medical diagnostic tool. Always consult a licensed healthcare professional for medical decisions.

---

## 👤 Author
**Nikunj Rathod**
- 🔗 [GitHub](https://github.com/NikunjRathod48)
- 🔗 [LinkedIn](https://linkedin.com/in/nikunj-rathod-a2176327b)

---

## ⭐ Support
If you found this project useful, please ⭐ the repo — it helps a lot!

---

### 🧡 Thank You for Visiting CardioPredict AI

Helping technology support healthier hearts, one prediction at a time.
