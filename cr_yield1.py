import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Load your dataset
data = pd.read_csv("C:\\DBMS_Farm_to_table\\farmer_crops_data.csv")

# Define features and target
X = data[['Crop_ID', 'Farmer_ID', 'Plot_Size', 'year', 'avg_rainfall', 'avg_temperature']]
y = data['Annual_yield']

# Define the column transformer to apply OneHotEncoder to categorical features
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(drop='first'), ['Farmer_ID', 'Crop_ID'])
    ],
    remainder='passthrough'  # This keeps the other columns as is
)

# Create a pipeline that first transforms the data and then fits the model
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('model', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Fit the model using the pipeline
pipeline.fit(X_train, y_train)
joblib.dump(pipeline, 'crop_yield_model.pkl')
# Prepare input for prediction (without specifying one-hot encoded columns)
new_data = pd.DataFrame({
    'Plot_Size': [5],                # Example plot size
    'year': [2024],                  # Example year
    'avg_rainfall': [1175],          # Example average rainfall
    'avg_temperature': [29],          # Example average temperature
    'Farmer_ID': ['F001'],           # Specify the Farmer_ID directly
    'Crop_ID': ['F001C001']              # Specify the Crop_ID directly
})

# Make the prediction
predicted_yield = pipeline.predict(new_data)
print(f'Predicted Annual Yield: {predicted_yield[0]}')
