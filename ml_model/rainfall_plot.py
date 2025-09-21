import pickle
import tensorflow as tf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# -------------------------
# Load saved model & files
# -------------------------
model = tf.keras.models.load_model('C:\\Users\\KULDEEP SINGH\\model\\global_lstm_model.h5')

with open('C:\\Users\\KULDEEP SINGH\\model\\scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('C:\\Users\\KULDEEP SINGH\\model\\state_columns.pkl', 'rb') as f:
    state_columns = pickle.load(f)

with open('C:\\Users\\KULDEEP SINGH\\model\\model_params.pkl', 'rb') as f:
    params = pickle.load(f)

n_input = params['n_input']
n_output = params['n_output']

# -------------------------
# Prediction function
# -------------------------
def predict_rainfall_for_state(state_name, df_encoded):
    state_column_name = f"States/UTs_{state_name}"
    if state_column_name not in df_encoded.columns:
        return None
    df_state_last_12 = df_encoded[df_encoded[state_column_name] == 1].tail(n_input)
    if df_state_last_12.shape[0] < n_input:
        return None
    
    last_12_rainfall = scaler.transform(df_state_last_12['Rainfall_mm'].values.reshape(-1, 1))
    last_12_states = df_state_last_12.drop(columns=['Rainfall_mm']).values
    input_for_prediction = np.hstack((last_12_rainfall, last_12_states))
    input_for_prediction = input_for_prediction.reshape(1, n_input, input_for_prediction.shape[1])
    
    predicted_scaled = model.predict(input_for_prediction)[0]
    predicted = scaler.inverse_transform(predicted_scaled.reshape(-1, 1)).flatten()
    predicted_annual = np.sum(predicted)
    return predicted, predicted_annual

# -------------------------
# Compact side-by-side plot
# -------------------------
def plot_rainfall_side_by_side_compact(predicted, state_name):
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    predicted_annual = np.sum(predicted)
    
    fig, axes = plt.subplots(1, 2, figsize=(5, 2))
    
    axes[0].plot(months, predicted, marker='o', color='coral', markersize=3, linewidth=1)
    axes[0].set_title('Monthly Rainfall', fontsize=8)
    axes[0].tick_params(axis='x', rotation=0.3, labelsize=5)
    axes[0].tick_params(axis='y', labelsize=5)
    axes[0].grid(True, linestyle='--', alpha=0.5)
    
    axes[1].bar(['Annual'], [predicted_annual], color='coral')
    axes[1].set_title('Annual Rainfall', fontsize=8)
    axes[1].tick_params(axis='y', labelsize=5)
    axes[1].grid(True, linestyle='--', alpha=0.5, axis='y')
    
    plt.suptitle(f'{state_name} Rainfall', fontsize=10)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.show()

# -------------------------
# Data preparation function
# -------------------------
def prepare_encoded_dataframe(csv_file):
    df = pd.read_csv(csv_file)
    df_long = pd.melt(df, id_vars=['States/UTs','YEAR'],
                      value_vars=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
                      var_name='Month', value_name='Rainfall_mm')
    df_long['Rainfall_mm'] = pd.to_numeric(df_long['Rainfall_mm'], errors='coerce')
    df_long.dropna(subset=['Rainfall_mm'], inplace=True)
    df_encoded = pd.get_dummies(df_long, columns=['States/UTs'])
    df_encoded.drop(columns=['YEAR','Month'], inplace=True)
    return df_encoded, df

