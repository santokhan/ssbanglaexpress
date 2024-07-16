from moviepy.editor import VideoFileClip

def convert_to_webm(input_file, output_file):
    try:
        # Load video file
        video = VideoFileClip(input_file)

        # Define the output file path
        output_path = output_file

        # Export the video in WebM format
        video.write_videofile(output_path, codec='libvpx', preset='ultrafast', audio_codec='libvorbis')

        print(f"Conversion successful. Output saved as {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Input and output file paths
    input_file = "hero.mp4"
    output_file = "output.webm"

    # Call the function to convert
    convert_to_webm(input_file, output_file)
