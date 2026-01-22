import React, { useRef, useState } from 'react';
import { Send, Globe, Heart, Coffee, Instagram, Github, Linkedin, Youtube } from 'lucide-react';
import emailjs from '@emailjs/browser';
import FadeInSection from './common/FadeInSection';
import { IconX, IconDiscord, IconWhatsapp } from './common/CustomIcons';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/ahroiz/", color: "hover:bg-pink-600" },
    { icon: <IconX size={20} />, label: "Twitter", href: "https://twitter.com/ahrofzul56684", color: "hover:bg-blue-400" },
    { icon: <Github size={20} />, label: "Github", href: "https://github.com/AhRoiz", color: "hover:bg-gray-700" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/ahroiz", color: "hover:bg-blue-700" },
    { icon: <IconDiscord size={20} />, label: "Discord", href: "https://discordapp.com/users/541250359625252867", color: "hover:bg-indigo-600" },
    { icon: <IconWhatsapp size={20} />, label: "WhatsApp", href: "https://wa.me/6282120648685", color: "hover:bg-indigo-600" }
  ];

  // 2. Logic Kirim Email dengan Rate Limit
  const sendEmail = (e) => {
    e.preventDefault();

    // CEK RATE LIMIT (COOLDOWN)
    const lastSent = localStorage.getItem('lastEmailTime');
    const cooldownTime = 5 * 60 * 1000; // 5 Menit

    if (lastSent && Date.now() - lastSent < cooldownTime) {
      const remainingTime = Math.ceil((cooldownTime - (Date.now() - lastSent)) / 60000);
      alert(`Mohon tunggu ${remainingTime} menit lagi sebelum mengirim pesan baru.`);
      return; // Stop
    }

    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,   
      import.meta.env.VITE_TEMPLATE_ID,  
      form.current,
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then((result) => {
        alert("Pesan berhasil dikirim! Saya akan segera membalasnya.");
        
        // SIMPAN WAKTU
        localStorage.setItem('lastEmailTime', Date.now());
        
        setLoading(false);
        e.target.reset(); 
    }, (error) => {
        alert("Gagal mengirim pesan. Silakan coba lagi nanti.");
        console.log(error.text);
        setLoading(false);
    });
  };

  return (
    <footer id="contact" className="py-32 px-6 border-t border-white/5 bg-black/90 backdrop-blur-2xl overflow-hidden relative text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 text-white">
        <FadeInSection>
          <div className="mb-12 text-white">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white">Get In <span className="text-blue-500 italic text-white">Touch.</span></h2>
            <p className="text-gray-400 max-w-md font-light leading-relaxed mb-10 text-white">Punya proyek menarik atau ingin sekadar menyapa? Kirimkan pesan langsung melalui formulir terenkripsi ini.</p>
          </div>
          
          <form ref={form} onSubmit={sendEmail} className="space-y-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              <input type="text" name="user_name" required placeholder="Nama Lengkap" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500/50 transition-all font-light focus:bg-white/10 text-white" />
              <input type="email" name="user_email" required placeholder="Alamat Email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500/50 transition-all font-light focus:bg-white/10 text-white" />
            </div>
            <textarea name="message" required rows="5" placeholder="Pesan Anda" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500/50 transition-all font-light resize-none focus:bg-white/10 text-white"></textarea>
            
            <button type="submit" disabled={loading} className={`px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-95 group text-white ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? 'MENGIRIM...' : 'KIRIM_PESAN()'} 
              {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-white" />}
            </button>
          </form>

        </FadeInSection>
        <div className="space-y-16 text-white">
          <FadeInSection delay={200}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white"><Globe className="text-blue-500 text-white" size={24} /> Follow <span className="text-blue-500 text-white">Me.</span></h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-white">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`aspect-square flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all duration-500 ${social.color} group shadow-xl hover:border-transparent text-white`} title={social.label}>
                  <div className="group-hover:scale-125 transition-transform text-white">{social.icon}</div>
                </a>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection delay={400}>
            <div className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 rounded-[2.5rem] relative overflow-hidden group text-white">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000 text-white"></div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Heart className="text-pink-500 animate-pulse text-white" size={24} /> Become a <span className="text-purple-500 text-white">Sponsor.</span>
              </h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed text-white">
                Dukung keberlangsungan proyek-proyek saya melalui donasi. Setiap kontribusi sangat berarti untuk pengembangan inovasi digital ke depan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-white">
                <a href= "https://teer.id/ahroiz" className="flex-1 px-6 py-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-mono text-center hover:text-black transition-colors duration-300">
                  Buy Me a Coffee <Coffee size={16} />
                </a>
                <a href="#" className="flex-1 px-6 py-4 border border-purple-500/30 hover:border-purple-500 bg-purple-500/10 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-mono text-purple-400 text-center text-white">
                  GitHub Sponsor <Heart size={16} className="text-white" />
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
      <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white opacity-50 text-white">
        <div className="text-center md:text-left text-white">
          <p className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 text-white">Designed & Built by Ahmad Rofi' Izzulhaq (Vee)</p>
          <p className="text-gray-500 font-mono text-[9px] text-white">© {new Date().getFullYear()} VEE. ALL RIGHTS RESERVED. RUNNING_ON_REACT.JS</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;