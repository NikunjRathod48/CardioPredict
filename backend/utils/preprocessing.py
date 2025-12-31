import pandas as pd

FEATURE_ORDER = [
 'height','weight','ap_hi','ap_lo',
 'cholesterol','gluc',
 'smoke','alco',
 'gender','active',
 'age_years'
]

def preprocess_input(data, scaler):
    df = pd.DataFrame([data])

    df = df.reindex(columns=FEATURE_ORDER)

    continuous_cols = ['height','weight','ap_hi','ap_lo']
    df[continuous_cols] = scaler.transform(df[continuous_cols])

    return df
