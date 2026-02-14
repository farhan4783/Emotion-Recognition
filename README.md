# EmotionAI - Real-time Emotion Recognition

EmotionAI is a cutting-edge web application that leverages advanced computer vision to detect and analyze human emotions in real-time. Built with a robust Python backend using DeepFace and a modern React frontend, it provides instant feedback on facial expressions.

## 🚀 Features

- **Real-time Analysis**: Instant detection of emotions from your webcam feed.
- **Micro-expression Detection**: Powered by DeepFace for high accuracy.
- **Session History**: Tracks and displays a history of detected emotions during your session.
- **Privacy Focused**: All processing happens locally on your machine.
- **Responsive Design**: Beautiful glassmorphism UI that works across devices.

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance web framework for building APIs.
- **DeepFace**: Lightweight face recognition and facial attribute analysis framework.
- **OpenCV**: Open Source Computer Vision Library.
- **WebSockets**: For real-time bi-directional communication.

### Frontend
- **React**: Library for building user interfaces.
- **Vite**: Next Generation Frontend Tooling.
- **Recharts**: Redefined chart library built with React and D3.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide React**: Beautiful & consistent icon toolkit.

## 📋 Prerequisites

Ensure you have the following installed:
- **Python 3.8+**
- **Node.js 16+**
- **npm** (Node Package Manager)

## ⚡ Quick Start

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment (optional but recommended):
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Start the server:
```bash
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📖 Usage Guide

1.  **Grant Camera Access**: When you first load the app, your browser will ask for permission to use your camera. Click "Allow".
2.  **Start Analysis**: Click the "Start Analysis" button on the video feed.
3.  **View Results**:
    - The **Live Analysis** chart shows the confidence levels for various emotions (Happy, Sad, Angry, etc.).
    - The **System Status** indicator confirms the backend connection.
    - The **Recent History** section logs the dominant emotion detected over time.
4.  **Stop Analysis**: Click the "X" button or refresh the page to stop the session.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
