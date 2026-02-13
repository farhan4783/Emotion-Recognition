from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Emotion Recognition API", description="Real-time emotion detection using DeepFace")

# CORS Setup
origins = [
    "http://localhost:5173",  # React Frontend
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers import emotion
app.include_router(emotion.router, prefix="/api", tags=["emotion"])

@app.get("/")
async def root():
    return {"message": "Emotion Recognition API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
