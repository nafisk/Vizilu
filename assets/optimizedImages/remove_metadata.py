from PIL import Image
import os

# Set the directory containing your .jpg images
input_directory = './1080p/jpeg'
output_directory = './1080p/cleaned_jpeg'

# Create the output directory if it does not exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Loop over all the files in the input directory
for filename in os.listdir(input_directory):
    # Check if the file is a JPEG image
    if filename.endswith('.jpg'):
        # Construct the full path of the image file
        img_path = os.path.join(input_directory, filename)
        
        # Open the image file
        # Using 'with' ensures the file is properly closed after its suite finishes
        with Image.open(img_path) as img:
            # Save the image in JPEG format without metadata
            # 'quality', 'optimize', and 'progressive' parameters are optional and can be adjusted
            # 'quality' ranges from 1 (worst) to 95 (best), 'optimize' reduces file size, and 'progressive' makes it load in layers
            output_filename = os.path.join(output_directory, filename)
            img.save(output_filename, 'JPEG', quality=85, optimize=True, progressive=True)
            print('Removed metadata from', filename, 'and saved to', output_filename)

print("Metadata removal complete!")
