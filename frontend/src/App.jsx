import React, { useState } from 'react';
import WebcamView from './components/WebcamView';
import EmotionDashboard from './components/EmotionDashboard';
import { Activity, Github } from 'lucide-react';

function App() {
  const [emotionData, setEmotionData] = useState(null);
  const [history, setHistory] = useState([]);

  const handleEmotionUpdate = (data) => {
    setEmotionData(data);
    setHistory(prev => {
      const newHistory = [
        { ...data, timestamp: new Date().toLocaleTimeString() },
        ...prev
      ].slice(0, 10); // Keep last 10 entries
      return newHistory;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-md border border-blue-500/30">
            <Activity className="text-blue-400" size={24} />
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
          <WebcamView onEmotionDetected={handleEmotionUpdate} />

          <div className="glass-card p-6 text-sm text-gray-300 border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              System Status
            </h3>
            <p>
              This application uses advanced computer vision (DeepFace) to analyze micro-expressions in real-time.
              The video feed is processed on our secure Python backend via WebSocket stream.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <EmotionDashboard emotionData={emotionData} history={history} />
        </div>
      </main>
    </div>
  );
}

export default App;
