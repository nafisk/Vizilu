from PIL import Image
import os

# Set the directories for input and output images
# 'input_directory' is where your original PNG files are located.
# 'output_directory' is where the converted JPEG files will be saved.
input_directory = './1080p/png'
output_directory = './1080p/jpeg'

# Check if the output directory exists, if not, create it
# This is necessary to avoid errors when trying to save files in a non-existent directory.
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Loop through all files in the input directory
for filename in os.listdir(input_directory):
    # Check if the file is a PNG image
    if filename.endswith('.png'):
        # Construct the full file path
        # Joins the directory path with the filename to get the complete path of the image.
        img_path = os.path.join(input_directory, filename)

        # Open the image file using Pillow
        # 'with' statement ensures the image file is properly closed after processing.
        with Image.open(img_path) as img:
            # Convert the image to RGB mode
            # JPEG doesn't support alpha channel (transparency) as in PNG, so we convert to RGB.
            rgb_img = img.convert('RGB')

            # Removing '.png' from filename and append '.jpg' to create the JPEG filename
            output_filename = filename[:-4] + '.jpg'

            # Save the converted image in JPEG format
            # Saves the RGB image in JPEG format in the output directory.
            rgb_img.save(os.path.join(output_directory, output_filename), 'JPEG')
            # Print a message indicating the conversion of each file
            print('Converted', filename, 'to', output_filename)

# Print a message when the entire conversion process is complete
print("Conversion complete!")
