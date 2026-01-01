import pandas as pd
import numpy as np

FEATURE_ORDER = [
    'height', 'weight', 'ap_hi', 'ap_lo',
    'cholesterol', 'gluc',
    'smoke', 'alco',
    'gender', 'active',
    'age_years'
]

def preprocess_input(data, scaler):
    # Ensure data is a dictionary
    if not isinstance(data, dict):
        raise ValueError("Input data must be a dictionary")

    # Create DataFrame from single record
    df = pd.DataFrame([data])
    
    # Force column order and ensure all columns exist
    # (missing columns will be NaN, which scaler/model might catch or handle)
    df = df.reindex(columns=FEATURE_ORDER)
    
    # Fill defaults if missing (just in case) to avoid NaN errors in scaler
    df.fillna(0, inplace=True) 

    # Scale continuous features
    continuous_cols = ['height', 'weight', 'ap_hi', 'ap_lo']
    
    # Ensure continuous columns are float
    for col in continuous_cols:
        df[col] = df[col].astype(float)

    # Transform. Scaler expects ALL columns since it was fitted on them.
    # This returns a numpy array.
    scaled_array = scaler.transform(df)
    
    # Recreate DataFrame with proper columns
    df = pd.DataFrame(scaled_array, columns=FEATURE_ORDER)

    print("DEBUG PREPROCESSING: Scaled DF Shape:", df.shape)
    
    return df
