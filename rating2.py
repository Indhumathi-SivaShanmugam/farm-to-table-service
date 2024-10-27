import pandas as pd

# Load the dataset and calculate ratings
def load_and_process_data(file_path):
    df = pd.read_csv(file_path)

    # Define the weights for each score
    weights = {
        'annual_yield': 0.4,
        'order_fulfillment': 0.3,
        'payment_history': 0.2,
        'crop_quality': 0.1
    }

    # Function to calculate crop rating
    def calculate_crop_rating(row):
        # Use the Annual Yield directly
        annual_yield_score = row['Annual_yield']

        # Order Fulfillment Score (normalized)
        order_fulfillment_score = row['Orders_Fulfilled'] / row['Total_Orders_Placed'] if row['Total_Orders_Placed'] else 0

        # Payment History Score (directly taken)
        payment_history_score = row['Payment_History']

        # Crop Quality Score (mapped)
        crop_quality_map = {'High': 1, 'Medium': 0.5, 'Low': 0}
        crop_quality_score = crop_quality_map.get(row['Crop_Quality'], 0)

        # Calculate the crop rating based on weighted scores
        crop_rating = (weights['annual_yield'] * annual_yield_score +
                       weights['order_fulfillment'] * order_fulfillment_score +
                       weights['payment_history'] * payment_history_score +
                       weights['crop_quality'] * crop_quality_score)

        return crop_rating

    # Calculate crop rating for each row
    df['Crop_Rating'] = df.apply(calculate_crop_rating, axis=1)

    # Calculate Overall Rating for each Farmer_ID and year
    df['Overall_Rating'] = df.groupby(['Farmer_ID', 'year'])['Crop_Rating'].transform('mean')

    return df

# Function to convert ratings to star ratings
def convert_to_star_rating(rating, min_rating, max_rating):
    # Normalize the rating to the scale of 1 to 10
    star_rating = ((rating - min_rating) / (max_rating - min_rating)) * (10 - 1) + 1
    
    # Round to the nearest 0.5
    rounded_star_rating = round(star_rating / 0.5) * 0.5
    
    # Ensure the star rating is between 1 and 10
    return max(1, min(10, rounded_star_rating))

# Function to get farmers for a specific crop
def get_farmers_for_crop(df, crop_id):
    farmers = df[df['Crop_ID'] == crop_id]['Farmer_ID'].unique()
    ratings = df[df['Crop_ID'] == crop_id].groupby('Farmer_ID')['Crop_Rating'].mean()
    overall_ratings = df[df['Crop_ID'] == crop_id].groupby('Farmer_ID')['Overall_Rating'].mean()
    
    result = {}
    for farmer in farmers:
        result[farmer] = {
            'average_crop_rating': ratings.get(farmer, 0),
            'overall_average_rating': overall_ratings.get(farmer, 0)
        }
    
    return result

# Load data
file_path = "C:\\DBMS_Farm_to_table\\farmer_crops_data.csv"
df = load_and_process_data(file_path)

# Get min and max ratings for star rating calculation
min_rating = df['Crop_Rating'].min()
max_rating = df['Crop_Rating'].max()

# Example of using the function
crop_id_input = input("Enter Crop ID to view farmers: ")
farmers_info = get_farmers_for_crop(df, crop_id_input)

print(f"Farmers growing crop {crop_id_input}:")
for farmer_id, ratings in farmers_info.items():
    crop_star_rating = convert_to_star_rating(ratings['average_crop_rating'], min_rating, max_rating)
    overall_star_rating = convert_to_star_rating(ratings['overall_average_rating'], min_rating, max_rating)
    print(f"Farmer ID: {farmer_id}, Average Crop Rating (Stars): {crop_star_rating:.1f}, Overall Average Rating (Stars): {overall_star_rating:.1f}")
