import React from 'react';
import { Monitor, Lock, Smartphone, Braces, Terminal, Gamepad2, Binary, Globe, Database, Code, Github, Wind, Zap, Shield, Box, Cloud } from 'lucide-react';
import FadeInSection from './common/FadeInSection';

const Skills = () => {
  const skillList = [
    { title: "Frontend Dev", icon: <Monitor />, items: ["React JS", "Next.js", "Tailwind CSS", "Three.js"], color: "blue" },
    { title: "Cyber Security", icon: <Lock />, items: ["PenTest", "Kali Linux", "Security Audit", "Network"], color: "red" },
    { title: "Software Dev", icon: <Smartphone />, items: ["Python", "Node.js", "Firebase", "C++", "Golang"], color: "purple" }
  ];

  const codingLanguages = [
    { name: "JavaScript", icon: <Braces />, category: "Logic" },
    { name: "Python", icon: <Terminal />, category: "Cyber/Data" },
    { name: "C#", icon: <Gamepad2 />, category: "Game Dev" },
    { name: "GDScript", icon: <Binary />, category: "Godot" },
    { name: "Go", icon: <Terminal />, category: "Backend" },
    { name: "MATLAB", icon: <Binary />, category: "Scientific" },
    { name: "C++", icon: <Binary />, category: "System" },
    { name: "PHP", icon: <Globe />, category: "Backend" },
    { name: "SQL", icon: <Database />, category: "Database" },
    { name: "HTML/CSS", icon: <Code />, category: "Structure" }
  ];

  const techStack = [
    { name: "VS Code", icon: <Code />, category: "IDE" },
    { name: "Figma", icon: <Monitor />, category: "Design" },
    { name: "Git & Github", icon: <Github />, category: "VCS" },
    { name: "Tailwind CSS", icon: <Wind />, category: "UI" },
    { name: "Postman", icon: <Zap />, category: "API" },
    { name: "Burp Suite", icon: <Shield />, category: "Security" },
    { name: "Docker", icon: <Box />, category: "DevOps" },
    { name: "Firebase", icon: <Database />, category: "Cloud" },
    { name: "Kali Linux", icon: <Terminal />, category: "OS" },
    { name: "Vercel", icon: <Cloud />, category: "Web Hosting" }
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-[#030303]/40 backdrop-blur-md text-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="flex items-center gap-4 mb-16 justify-center md:justify-start text-white">
            <div className="h-px w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-3xl md:text-5xl font-black">My <span className="text-blue-500">Expertise</span></h2>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-white">
          {skillList.map((skill, i) => (
            <FadeInSection key={i} delay={i * 200}>
              <div className="p-10 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:border-blue-500/30 transition-all group relative overflow-hidden backdrop-blur-sm text-white">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full group-hover:bg-blue-500/10 transition-colors text-white"></div>
                <div className="w-16 h-16 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-400 mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">{skill.title}</h3>
                <div className="flex flex-wrap gap-2 text-white">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-black border border-white/10 rounded-full text-xs font-mono text-gray-400 uppercase group-hover:text-white transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="flex items-center gap-4 mb-12 justify-center md:justify-start">
            <div className="h-px w-12 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <h2 className="text-3xl font-bold">Coding <span className="text-green-500 text-white">Languages</span></h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-24 text-white">
          {codingLanguages.map((lang, i) => (
            <FadeInSection key={i} delay={i * 50}>
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-green-500/10 hover:border-green-500/30 transition-all group backdrop-blur-sm">
                <div className="text-gray-500 group-hover:text-green-400 transition-colors group-hover:rotate-6">
                  {React.cloneElement(lang.icon, { size: 32 })}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white mb-1">{lang.name}</p>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{lang.category}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="flex items-center gap-4 mb-12 justify-center md:justify-start text-white">
            <div className="h-px w-12 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            <h2 className="text-3xl font-bold">Tools & <span className="text-purple-500 text-white">Software</span></h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-white">
          {techStack.map((tool, i) => (
            <FadeInSection key={i} delay={i * 50}>
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all group backdrop-blur-sm">
                <div className="text-gray-500 group-hover:text-purple-400 transition-colors">
                  {React.cloneElement(tool.icon, { size: 32 })}
                </div>
                <div className="text-center text-white">
                  <p className="text-xs font-bold text-white mb-1">{tool.name}</p>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{tool.category}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;