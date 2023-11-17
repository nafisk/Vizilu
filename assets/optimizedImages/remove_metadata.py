from PIL import Image
import os

# Set the directory containing your .webp images
input_directory = './1080p/webp'
output_directory = './1080p/cleaned_webp'

# Create the output directory if it does not exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Loop over all the files in the directory
for filename in os.listdir(input_directory):
    if filename.endswith('.webp'):
        # Construct the full path of the image file
        img_path = os.path.join(input_directory, filename)

        # Open the image file
        with Image.open(img_path) as img:
            # Construct the full path for the output file
            output_path = os.path.join(output_directory, filename)

            # Save the image in WebP format, which should remove most metadata
            img.save(output_path, 'WEBP')

print("Metadata removal complete!")
