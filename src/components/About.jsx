import React from 'react';
import FadeInSection from './common/FadeInSection';

const About = () => (
  <section id="about" className="py-32 px-6 bg-[#030303]/60 backdrop-blur-md text-white">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20 items-center text-white">
      <FadeInSection>
        <div className="relative group text-white">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden relative text-white">
             <img src="/ahmad.jpeg" alt="Ahmad Rofi' Izzulhaq" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 text-white" onError={(e) => { e.target.style.display = 'none'; }} />
             <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 bg-gradient-to-tr from-gray-800 to-black text-white">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-gray-800 to-black mx-auto mb-4 border border-white/5 flex items-center justify-center text-white">
                  <span className="text-white/20 font-black text-6xl text-white">V</span>
                </div>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-white">Ahmad Rofi' Izzulhaq</p>
             </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white text-[10px] font-mono font-bold px-4 py-2 rounded-full shadow-lg border-2 border-black animate-bounce text-white">
            STATUS: AVAILABLE
          </div>
        </div>
      </FadeInSection>
      <div className="flex-1 text-center md:text-left text-white">
        <FadeInSection delay={200}>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-white">
            Membangun Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic font-light">Line by line.</span>
          </h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light text-white">
            <p>Halo! Saya <strong className="text-white">Vee</strong>, seorang pelajar dan juga pengembang yang percaya bahwa kode adalah bentuk seni modern. Saya menggabungkan estetika desain web dengan keamanan siber yang ketat.</p>
            <p>Bagi saya, tantangan teknis bukan sekadar masalah yang harus diselesaikan, tapi peluang untuk menciptakan inovasi yang berdampak nyata bagi pengguna di seluruh dunia.</p>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
);

export default About;