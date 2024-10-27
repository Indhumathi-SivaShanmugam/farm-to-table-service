import pandas as pd

# Load the dataset
file_path = "C:\\DBMS_Farm_to_table\\farmer_crops_data_with_star_ratings.csv"
df = pd.read_csv(file_path)

# Define the weights for each rating component
weights = {
    'annual_yield': 0.5,
    'order_fulfillment': 0.3,
    'payment_history': 0.1,
    'crop_quality': 0.1
}

# Function to calculate crop rating based on reliability criteria
def calculate_crop_rating(row):
    max_yield = 5  # Define the maximum possible yield for normalization
    annual_yield_score = row['Annual_yield'] / max_yield if max_yield > 0 else 0
    order_fulfillment_score = (
        row['Orders_Fulfilled'] / row['Total_Orders_Placed'] if row['Total_Orders_Placed'] > 0 else 0
    )
    payment_history_score = row['Payment_History']
    crop_quality_map = {'High': 1, 'Medium': 0.5, 'Low': 0}
    crop_quality_score = crop_quality_map.get(row['Crop_Quality'], 0)

    # Calculate the crop rating based on weighted scores
    crop_rating = (
        (weights['annual_yield'] * annual_yield_score) +
        (weights['order_fulfillment'] * order_fulfillment_score) +
        (weights['payment_history'] * payment_history_score) +
        (weights['crop_quality'] * crop_quality_score)
    )

    return crop_rating

# Function to convert ratings to star ratings
def convert_to_star_rating(rating, min_rating, max_rating):
    if pd.isnull(rating):
        return None  # If the rating is null, return None
    star_rating = ((rating - min_rating) / (max_rating - min_rating)) * (10 - 1) + 1
    rounded_star_rating = round(star_rating / 0.5) * 0.5
    return rounded_star_rating

# Iterate through the DataFrame and calculate ratings
for index, row in df.iterrows():
    if pd.isnull(row['Crop_Rating']):
        # Calculate Crop Rating
        crop_rating = calculate_crop_rating(row)
        df.at[index, 'Crop_Rating'] = crop_rating

# Calculate Overall Rating for each Farmer_ID and year using the mean of Crop Ratings
df['Overall_Rating'] = df.groupby(['Farmer_ID', 'year'])['Crop_Rating'].transform('mean')

# Define the min and max of the current crop ratings
min_rating = df['Crop_Rating'].min()
max_rating = df['Crop_Rating'].max()

# Calculate star ratings for Crop_Star_Rating and Overall_Star_Rating
df['Crop_Star_Rating'] = df['Crop_Rating'].apply(lambda x: convert_to_star_rating(x, min_rating, max_rating))
df['Overall_Star_Rating'] = df['Overall_Rating'].apply(lambda x: convert_to_star_rating(x, min_rating, max_rating))

# Save the updated DataFrame back to the same CSV file
df.to_csv(file_path, index=False)

print(f"Ratings updated in '{file_path}'.")
