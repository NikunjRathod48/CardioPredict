
<h1 align="center">❤️ CardioPredict AI – Cardiovascular Risk Prediction System</h1>

<p align="center">
  <a href="https://cardio-risk-predictor.netlify.app/"><img src="https://img.shields.io/badge/Live%20Demo-Online-green" /></a>
  <img src="https://img.shields.io/badge/Accuracy-72%25-blue" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success" />
</p>

---

## 🚀 Live Demo
▶️ **Access the Web App:**  
https://cardio-risk-predictor.netlify.app/

---

## 🧠 What is CardioPredict AI?
CardioPredict AI is a **Machine Learning–powered web application** that predicts a person’s risk of cardiovascular disease using clinical health attributes.  
It provides **real-time predictions**, **probability scores**, **model performance analytics**, and a clean medical-grade UI experience.

---

## ✨ Features
- ✔️ Real-time Risk Prediction
- ✔️ Probability Score Indicator
- ✔️ Logistic Regression ML Model
- ✔️ Confusion Matrix + Accuracy Insights
- ✔️ Feature Importance Visualization
- ✔️ Modern React + Tailwind UI
- ✔️ Fully Deployed & Live

---

## 📊 Model Performance
| Metric | Score |
|--------|--------|
| Accuracy | **72%** |
| Total Test Samples | 13,095 |
| Model | Logistic Regression |

### Confusion Matrix
```

TN = 4937   FP = 1520
FN = 2158   TP = 4480

```

---

## 🛠 Tech Stack
**Frontend**
- React + Vite ⚡
- Tailwind CSS 🎨
- Recharts 📊
- Toasts + Animations

**Backend**
- Flask (Python)
- REST API
- Pickle ML Model
- CORS Enabled

**Machine Learning**
- Logistic Regression
- Scikit-Learn
- Pandas + Numpy

---

## 📂 Project Structure
```

CardioPredict
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── model/
│   │   ├── cardio_model.pkl
│   │   └── scaler.pkl
│   └── utils/preprocessing.py
│
├── frontend/
├── notebooks/
├── dataset/
└── README.md

```

---

## 🧩 API
**Endpoint**
```

POST /predict

````

**Sample Request**
```json
{
 "height":165,
 "weight":92,
 "ap_hi":165,
 "ap_lo":105,
 "cholesterol":3,
 "gluc":3,
 "smoke":1,
 "alco":1,
 "age_years":58
}
````

**Sample Response**

```json
{
 "status": true,
 "prediction": 1,
 "risk_probability": 0.78,
 "message": "High Risk"
}
```

---

## 🛠️ Local Setup

### Clone Repo

```
git clone https://github.com/NikunjRathod48/CardioPredict
cd CardioPredict
```

### Backend

```
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```
cd ../frontend
npm install
npm run dev
```

---

## 🌍 Deployment

* **Backend:** Render
* **Frontend:** Netlify
* **Model:** Pickle Deployed

---

## ⚠️ Disclaimer

This project is for **educational & research purposes** only.
Not a substitute for professional medical diagnosis.

---

## 👤 Author

**Nikunj Rathod**
🔗 GitHub: [https://github.com/NikunjRathod48](https://github.com/NikunjRathod48)
🔗 LinkedIn: [https://linkedin.com/in/nikunj-rathod-a2176327b](https://linkedin.com/in/nikunj-rathod-a2176327b)

---

## ⭐ Support

If you like this project, please ⭐ the repo — it motivates a lot!

---

### 🧡 Thank You for Visiting CardioPredict AI

Helping technology support healthier hearts, one prediction at a time.
