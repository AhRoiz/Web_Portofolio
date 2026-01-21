import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeInSection from './common/FadeInSection';

const Hero = () => {
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const roles = ["Web Designer / Dev", "Cyber Tester", "Software Developer", "Tech Enthusiast"];

  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[loopIndex % roles.length];
      const updatedText = isDeleting 
        ? currentRole.substring(0, roleText.length - 1) 
        : currentRole.substring(0, roleText.length + 1);

      setRoleText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 50 : 120);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, loopIndex]);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 text-white">
      <FadeInSection>
        <p className="text-blue-400 font-mono tracking-[0.4em] mb-4 text-xs md:text-sm bg-blue-500/10 px-4 py-1 rounded-full border border-blue-500/20 uppercase">SYSTEM.IDENTITY_INITIALIZED</p>
      </FadeInSection>
      
      <FadeInSection delay={200}>
        <h1 className="text-5xl md:text-8xl font-black text-center mb-6 leading-tight tracking-tighter">
          <span className="text-white">Ahmad</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Rofi'</span>
          <br />
          <span className="text-white">Izzulhaq</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">(Vee)</span>
        </h1>
      </FadeInSection>

      <FadeInSection delay={400}>
        <div className="text-lg md:text-3xl text-gray-400 font-light mb-12 flex items-center gap-3">
          <span className="font-mono opacity-50 text-base md:text-xl uppercase tracking-widest text-white">I'm a :</span>
          <span className="text-white border-r-2 border-white pr-2 animate-pulse min-w-[200px] md:min-w-[350px] text-left font-mono">
            {roleText}
          </span>
        </div>
      </FadeInSection>

      <FadeInSection delay={600}>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <a href="#projects" className="group px-12 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Explore Artifacts <ChevronDown className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a href="#contact" className="px-12 py-4 border border-white/20 hover:bg-white/5 rounded-full transition-all text-sm font-mono tracking-widest hover:border-blue-500/50">
            GET_IN_TOUCH()
          </a>
        </div>
      </FadeInSection>

      <div className="absolute bottom-10 animate-bounce text-gray-500 hidden md:block">
        <ChevronDown size={30} />
      </div>
    </section>
  );
};

export default Hero;