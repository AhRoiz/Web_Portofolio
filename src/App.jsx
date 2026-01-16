import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import LoadingScreen from './components/common/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('default'); // Default, winter, summer

  useEffect(() => {
    document.title = "VEE | Ahmad Rofi' Izzulhaq";
  }, []);

  return (
    <div className="bg-gradient-main text-white min-h-screen font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        
        .backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .backdrop-blur-xl { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }

        .bg-gradient-main {
          background: linear-gradient(180deg, #020617 0%, #0f172a 40%, #080808 100%);
          background-attachment: fixed;
        }
      `}</style>

      {!loading && <ThreeBackground season={season} />}

      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar season={season} setSeason={setSeason} />
          <div className="relative z-10 animate-fade-in text-white">
            <Hero />
            <Skills />
            <Projects />
            <About />
            <Contact />
          </div>
        </>
      )}
    </div>
  );
}