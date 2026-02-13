import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, XCircle } from 'lucide-react';
import axios from 'axios';

const WebcamView = ({ onEmotionDetected }) => {
    const webcamRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        return () => {
            if (ws) ws.close();
        };
    }, [ws]);

    const startAnalysis = () => {
        setIsCapturing(true);
        const socket = new WebSocket('ws://localhost:8000/api/ws/analyze');

        socket.onopen = () => {
            console.log('Connected to WebSocket');
            const interval = setInterval(() => {
                if (webcamRef.current && socket.readyState === WebSocket.OPEN) {
                    const imageSrc = webcamRef.current.getScreenshot();
                    if (imageSrc) {
                        socket.send(imageSrc);
                    }
                }
            }, 500); // 2 FPS
            socket.interval = interval;
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data && !data.error) {
                onEmotionDetected(data);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected');
            if (socket.interval) clearInterval(socket.interval);
        };

        setWs(socket);
    };

    const stopAnalysis = () => {
        setIsCapturing(false);
        if (ws) {
            ws.close();
            setWs(null);
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto glass-card p-4 overflow-hidden group">
            <div className="relative rounded-lg overflow-hidden bg-black/50 aspect-video flex items-center justify-center">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    mirrored={true}
                />
                {!isCapturing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                        <button
                            onClick={startAnalysis}
                            className="glass-button flex items-center gap-2 transform hover:scale-105"
                        >
                            <Camera size={20} />
                            Start Analysis
                        </button>
                    </div>
                )}
            </div>

            {isCapturing && (
                <div className="absolute top-6 right-6 z-20">
                    <button
                        onClick={stopAnalysis}
                        className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white transition-all shadow-lg"
                    >
                        <XCircle size={20} />
                    </button>
                </div>
            )}

            {/* Grid overlay or face tracking box could go here */}
        </div>
    );
};

export default WebcamView;
