import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const sequence = [
    "VeeOS v2.5.0 loading...",
    "System check: OK",
    "Initializing Optimized Engine...",
    "Securing connection...",
    "Authorized User: Ahmad Rofi' Izzulhaq",
    "Ready."
  ];

  useEffect(() => {
    let timeouts = [];
    sequence.forEach((text, i) => {
      const t = setTimeout(() => {
        setLogs(prev => [...prev, text]);
        if (i === sequence.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, i * 200);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center font-mono p-6 text-white">
      <div className="max-w-md w-full border border-green-500/30 p-6 bg-gray-900/50 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="text-green-500 text-sm">
              <span className="opacity-50 mr-2">[{i}]</span> {log}
            </div>
          ))}
          <div className="w-2 h-4 bg-green-500 animate-pulse inline-block ml-1"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;