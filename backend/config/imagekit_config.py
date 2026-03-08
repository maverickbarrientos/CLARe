from imagekitio import ImageKit

from dotenv import load_dotenv
import os

load_dotenv()

IMAGEKIT_PUBLIC_KEY = os.getenv("IMAGEKIT_PUBLIC_KEY")
IMAGEKIT_PRIVATE_KEY = os.getenv("IMAGEKIT_PRIVATE_KEY")
IMAGEKIT_URL = os.getenv("IMAGEKIT_URL")

imagekit = ImageKit(
    private_key=IMAGEKIT_PRIVATE_KEY
)