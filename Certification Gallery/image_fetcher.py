import os
import json

# Path to your image folder (make sure this path is correct)
images_folder = 'images'  # Change this to the path of your images folder

# List all files in the directory and filter only image files
image_files = {}
for f in os.listdir(images_folder):
    if f.lower().endswith(('jpg', 'jpeg', 'png', 'gif')):
        # Create the key-value pair where the key is the image name and value is its relative path
        image_files[f] = os.path.join('images', f)

# Save the structured data (key-value format) to a JSON file
json_file_path = 'image-names.json'
with open(json_file_path, 'w') as json_file:
    json.dump(image_files, json_file, indent=2)

print(f"Image paths saved to {json_file_path}")
