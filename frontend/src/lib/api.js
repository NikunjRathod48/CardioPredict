export const predictRisk = async (data) => {
    try {
        // Map frontend keys to backend expected keys
        // Backend expects: height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, age_years
        const payload = {
            height: data.height,
            weight: data.weight,
            ap_hi: data.ap_hi,
            ap_lo: data.ap_lo,
            cholesterol: data.cholesterol,
            gluc: data.gluc,
            smoke: data.smoke,
            alco: data.alco,
            age_years: data.age // Mapping 'age' to 'age_years'
        };

        const response = await fetch('https://cardio-backend-itbt.onrender.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.status) {
            throw new Error(result.error || 'Prediction failed');
        }

        return {
            risk: result.prediction, // 0 or 1
            probability: (result.risk_probability * 100).toFixed(1), // Convert 0.xyz to Percentage
            message: result.message
        };

    } catch (error) {
        console.error("Prediction Request Failed:", error);
        throw new Error("Failed to connect to the prediction engine. Is the backend running?");
    }
};
