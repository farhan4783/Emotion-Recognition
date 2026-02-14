import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const emotionsColorMap = {
    angry: '#ef4444',
    disgust: '#84cc16',
    fear: '#a855f7',
    happy: '#eab308',
    sad: '#3b82f6',
    surprise: '#f97316',
    neutral: '#9ca3af',
};

const EmotionDashboard = ({ emotionData, history }) => {
    if (!emotionData) return (
        <div className="glass-card p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400 border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl">
            <p>Start the camera to see real-time analysis</p>
        </div>
    );

    const { dominant_emotion, emotions } = emotionData;

    // Transform emotions object to array for Recharts
    const data = Object.keys(emotions).map(key => ({
        name: key,
        value: emotions[key],
        fill: emotionsColorMap[key] || '#8884d8'
    }));

    // Sort by value desc
    data.sort((a, b) => b.value - a.value);

    return (
        <div className="glass-card p-6 h-full flex flex-col gap-6 animate-fadeIn border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl overflow-y-auto custom-scrollbar">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Live Analysis</h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${dominant_emotion ? 'bg-white/10 border-white/20' : 'bg-gray-800 border-gray-700'}`}>
                        {dominant_emotion ? dominant_emotion.toUpperCase() : 'NEUTRAL'}
                    </div>
                </div>

                <div className="w-full h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={60}
                                tick={{ fill: '#fff', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* History Section */}
            <div className="border-t border-white/10 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">Recent History</h3>
                <div className="space-y-2">
                    {history && history.length > 0 ? (
                        history.slice(0, 5).map((entry, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: emotionsColorMap[entry.dominant_emotion] || '#9ca3af' }}
                                    ></div>
                                    <span className="capitalize text-gray-200">{entry.dominant_emotion}</span>
                                </div>
                                <span className="text-gray-500 font-mono text-xs">{entry.timestamp}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-2">No history yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmotionDashboard;
