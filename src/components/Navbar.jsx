import React, { useState, useEffect } from 'react';
import { Menu, X, Layers, CloudSnow, Sun } from 'lucide-react';

const Navbar = ({ season, setSeason }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const cycleSeason = () => {
    if (season === 'default') setSeason('winter');
    else if (season === 'winter') setSeason('summer');
    else setSeason('default');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <div className="text-2xl font-black font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-white">
          VEECODES.ID
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-mono tracking-widest text-gray-400 hover:text-white transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
              onClick={cycleSeason}
              className="p-2 ml-4 rounded-full bg-white/10 hover:bg-white/20 transition-all text-blue-400 border border-white/5 hover:scale-110"
              title={`Effect: ${season.toUpperCase()}`}
          >
              {season === 'default' && <Layers size={18} />}
              {season === 'winter' && <CloudSnow size={18} />}
              {season === 'summer' && <Sun size={18} />}
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 flex flex-col p-6 gap-4 md:hidden animate-fade-in text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="text-sm font-mono tracking-widest text-gray-400 text-white">
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex justify-center">
             <button 
                onClick={cycleSeason}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-blue-400 font-mono text-xs tracking-widest"
             >
                {season === 'default' && <><Layers size={16} /> DEFAULT EFFECT</>}
                {season === 'winter' && <><CloudSnow size={16} /> SNOW EFFECT</>}
                {season === 'summer' && <><Sun size={16} /> SUMMER EFFECT</>}
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;