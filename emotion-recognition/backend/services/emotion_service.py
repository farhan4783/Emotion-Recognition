import cv2
import numpy as np
from deepface import DeepFace
import base64
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmotionService:
    def __init__(self):
        # DeepFace models are loaded on first use usually, but we can verify here if needed
        # For now, we rely on DeepFace's auto-loading
        pass

    def analyze_image(self, image_bytes: bytes):
        """
        Analyze emotion from image bytes.
        Returns the dominant emotion and the confidence scores.
        """
        try:
            # Convert bytes to numpy array
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None:
                raise ValueError("Could not decode image")

            # DeepFace expects path or numpy array (BGR is fine for opencv, DeepFace handles it)
            # actions=['emotion'] enforces only emotion analysis
            result = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)
            
            # DeepFace returns a list of detected faces. We'll take the first one for now or all.
            # If enforce_detection=False, it might return even if no face found (returns region of whole image).
            # But usually we want to know if a face is detected. 
            
            if not result:
                return {"error": "No face detected"}

            # Taking the first face
            analysis = result[0]
            emotions = analysis['emotion']
            dominant_emotion = analysis['dominant_emotion']
            
            return {
                "dominant_emotion": dominant_emotion,
                "emotions": emotions,
                "face_coordinates": analysis['region']
            }

        except Exception as e:
            logger.error(f"Error analyzing emotion: {e}")
            return {"error": str(e)}

    def analyze_base64(self, base64_str: str):
        """
        Analyze emotion from base64 string.
        """
        try:
            if "," in base64_str:
                base64_str = base64_str.split(",")[1]
            image_bytes = base64.b64decode(base64_str)
            return self.analyze_image(image_bytes)
        except Exception as e:
            return {"error": str(e)}

emotion_service = EmotionService()
