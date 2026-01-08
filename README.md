<h1 align="center">❤️ CardioPredict AI – Advanced Cardiovascular Risk Prediction System</h1>

<p align="center">
  <a href="https://cardio-risk-predictor.netlify.app/"><img src="https://img.shields.io/badge/Live%20Demo-Online-brightgreen" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Model-XGBoost-blue" alt="Model" />
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
| **Macro F1** | 0.74 |
| **ROC-AUC** | ~0.80 |
| **Dataset Size** | 13,742 Records |
| **Model** | XGBoost Classifier (Extreme Gradient Boosting) |

## 🧠 Why XGBoost?

XGBoost (Extreme Gradient Boosting) is an optimized and regularized implementation of the Gradient Boosting framework, specifically designed for performance and scalability on structured/tabular data.

Reasons for selection:
- Superior performance on medical tabular datasets
- Built-in regularization to reduce overfitting
- Handles non-linear feature interactions effectively
- Strong control over false negatives (clinically important)
- Widely used in real-world healthcare ML systems

While XGBoost belongs to the Gradient Boosting family, it significantly improves upon traditional Gradient Boosting Classifiers through optimization, tree pruning, and parallelization.



### 📌 Confusion Matrix
| | Predicted Healthy | Predicted At-Risk |
| :--- | :---: | :---: |
| **Actual Healthy** | 5479 (TN) | 1462 (FP) |
| **Actual At-Risk** | 2139 (FN) | 4662 (TP) |

### 🔍 Class Metrics
| Class | Precision | Recall | F1 |
| :--- | :---: | :---: | :---: |
| Healthy (0) | 0.72 | 0.79 | 0.75 |
| At-Risk (1) | 0.76 | 0.69 | 0.72 |

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
- Railway Cloud Hosting

### **Machine Learning**
- XGBoost Classifier (Extreme Gradient Boosting)
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
│   │   ├── cardio_final_safe_model.pkl
│   └── utils/
│       └── preprocessing.py
├── frontend/
├── notebooks/
├── dataset/
└── README.md
```

---

## 🧩 API Usage

### 🔗 Base URL
https://cardiopredict-api.up.railway.app

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
  "gender": 1,
  "active": 1,
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
| **Backend** | Railway |
| **Frontend** | Netlify |
| **Model** | Joblib Deployed |

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
