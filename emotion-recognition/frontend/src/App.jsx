import React, { useState } from 'react';
import WebcamView from './components/WebcamView';
import EmotionDashboard from './components/EmotionDashboard';
import { Activity, Github } from 'lucide-react';

function App() {
  const [emotionData, setEmotionData] = useState(null);

  return (
    <div className="min-h-screen bg-transparent text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg backdrop-blur-md">
            <Activity className="text-primary" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            EmotionAI
          </h1>
        </div>
        <a href="https://github.com" target="_blank" className="p-2 hover:bg-white/10 rounded-full transition-all">
          <Github size={20} />
        </a>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WebcamView onEmotionDetected={setEmotionData} />

          <div className="glass-card p-6 text-sm text-gray-300">
            <h3 className="text-white font-semibold mb-2">How it works</h3>
            <p>
              This application uses advanced computer vision (DeepFace) to analyze micro-expressions in real-time.
              The video feed is processed on our secure Python backend via WebSocket stream.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <EmotionDashboard emotionData={emotionData} />
        </div>
      </main>
    </div>
  );
}

export default App;
