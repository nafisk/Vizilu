from PIL import Image
import os

# Set the directory containing your .png images
input_directory = './1080p/png'
output_directory = './1080p/webp'

# Create the output directory if it does not exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Loop over all the files in the directory
for filename in os.listdir(input_directory):
    if filename.endswith('.png'):
        # Open the image file
        img_path = os.path.join(input_directory, filename)
        with Image.open(img_path) as img:
            # Create the .webp filename
            output_filename = filename[:-4] + '.webp'

            # Save the image in WebP format
            img.save(os.path.join(output_directory, output_filename), 'WEBP')

            print("Converted " + filename + " to " + output_filename)

print("Conversion complete!")
