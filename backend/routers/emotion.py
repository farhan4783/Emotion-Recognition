from fastapi import APIRouter, UploadFile, File, WebSocket, WebSocketDisconnect
from services.emotion_service import emotion_service
import json

router = APIRouter()

@router.post("/analyze")
async def analyze_emotion(file: UploadFile = File(...)):
    """
    Analyze emotion from an uploaded image file.
    """
    contents = await file.read()
    result = emotion_service.analyze_image(contents)
    return result

@router.websocket("/ws/analyze")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time analysis.
    Expects base64 encoded image frames.
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text() # Expecting base64 string
            result = emotion_service.analyze_base64(data)
            await websocket.send_json(result)
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"WebSocket Error: {e}")
        await websocket.close()
