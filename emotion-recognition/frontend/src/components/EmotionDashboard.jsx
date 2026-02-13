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

const EmotionDashboard = ({ emotionData }) => {
    if (!emotionData) return (
        <div className="glass-card p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
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
        <div className="glass-card p-6 h-full flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Live Analysis</h2>
                <div className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium border border-white/10">
                    {dominant_emotion ? dominant_emotion.toUpperCase() : 'NEUTRAL'}
                </div>
            </div>

            <div className="w-full h-[250px]">
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

            <div className="mt-4 grid grid-cols-2 gap-2">
                {/* Additional stats could go here */}
            </div>
        </div>
    );
};

export default EmotionDashboard;
