import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom'; 
import { 
  Code, 
  Terminal, 
  Shield, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  Menu, 
  X, 
  Globe, 
  Monitor, 
  Lock, 
  Smartphone, 
  Database, 
  Cloud, 
  Box, 
  Zap, 
  Braces, 
  Binary,
  ArrowRight,
  Gamepad2,
  Play,
  Pause,
  ChevronRight,
  BookOpen,
  Wind,
  Send,
  Heart,
  Coffee,
  MessageSquare,
  Twitter, 
  Youtube,
  CloudSnow, 
  Sun,       
  Layers     
} from 'lucide-react';
import emailjs from '@emailjs/browser'; 

//Icon X Custom
const IconX = ({ size = 20, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

//Icon WhatsApp Custom 
const IconWhatsapp = ({ size = 20, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

//Icon Discord Custom
const IconDiscord = ({ size = 20, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"  
    stroke="none"        
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.842 13.842 0 0 0-.585 1.205 18.237 18.237 0 0 0-5.533 0 13.904 13.904 0 0 0-.589-1.205.078.078 0 0 0-.078-.037 19.766 19.766 0 0 0-4.885 1.515.068.068 0 0 0-.031.026C1.403 9.473.187 14.444.821 19.336a.078.078 0 0 0 .034.056 19.907 19.907 0 0 0 6.079 3.033.076.076 0 0 0 .083-.027 14.07 14.07 0 0 0 1.242-2.023.075.075 0 0 0-.041-.106 13.044 13.044 0 0 1-1.928-.916.077.077 0 0 1-.008-.127c.133-.098.264-.2.392-.305a.075.075 0 0 1 .078-.01c4.135 1.889 8.57 1.889 12.657 0a.077.077 0 0 1 .079.01c.129.106.26.208.394.305a.076.076 0 0 1-.008.127 13.197 13.197 0 0 1-1.928.916.076.076 0 0 0-.042.106 13.864 13.864 0 0 0 1.244 2.023.077.077 0 0 0 .084.027 19.907 19.907 0 0 0 6.078-3.033.076.076 0 0 0 .034-.056c.725-5.385-.826-10.32-4.502-14.94a.074.074 0 0 0-.03-.026ZM7.689 15.36c-1.173 0-2.137-1.077-2.137-2.397 0-1.319.944-2.397 2.137-2.397 1.203 0 2.156 1.078 2.137 2.397 0 1.32-.934 2.397-2.137 2.397Zm8.622 0c-1.173 0-2.137-1.077-2.137-2.397 0-1.319.944-2.397 2.137-2.397 1.203 0 2.156 1.078 2.137 2.397 0 1.32-.934 2.397-2.137 2.397Z" />
  </svg>
);

//URL Three.js dari CDN
const THREE_JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

//Latar Belakang 3D (Waves & Aurora & Seasons) ---
const ThreeBackground = ({ season }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, particles, auroraPoints;
    let mouseX = 0, mouseY = 0;
    let scrollY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let animationFrameId;

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onPointerMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.4;
      mouseY = (event.clientY - windowHalfY) * 0.4;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 400, 1000);

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); 
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if (mountRef.current) {
        mountRef.current.innerHTML = ''; // Reset canvas saat season berubah
        mountRef.current.appendChild(renderer.domElement);
      }

      // LOGIKA SEASON 
      
      if (season === 'winter') {
        //  MUSIM SALJU (Winter) 
        const particleCount = 1500;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount);

        for(let i=0; i<particleCount; i++) {
          pos[i*3] = (Math.random() - 0.5) * 4000;
          pos[i*3+1] = (Math.random() - 0.5) * 4000;
          pos[i*3+2] = (Math.random() - 0.5) * 4000;
          vel[i] = 1 + Math.random() * 3; // Kecepatan jatuh
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        
        const mat = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 4,
          transparent: true,
          opacity: 0.8
        });
        particles = new THREE.Points(geom, mat);
        particles.userData = { velocities: vel, type: 'snow' };
        scene.add(particles);

      } else if (season === 'summer') {
        //  MUSIM KEMARAU/SEMI (Fireflies) 
        const particleCount = 500;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(particleCount * 3);
        const phases = new Float32Array(particleCount);

        for(let i=0; i<particleCount; i++) {
          pos[i*3] = (Math.random() - 0.5) * 3000;
          pos[i*3+1] = (Math.random() - 0.5) * 2000;
          pos[i*3+2] = (Math.random() - 0.5) * 3000;
          phases[i] = Math.random() * Math.PI * 2;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

        const mat = new THREE.PointsMaterial({
          color: 0xffaa00, // Warna oranye hangat
          size: 6,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending
        });
        particles = new THREE.Points(geom, mat);
        particles.userData = { phases: phases, type: 'fireflies' };
        scene.add(particles);

      } else {
        //  DEFAULT (Wave & Aurora) 
        // 1. WAVE SYSTEM 
        const SEPARATION = 100, AMOUNTX = 45, AMOUNTY = 45;
        const numParticles = AMOUNTX * AMOUNTY;
        const wavePositions = new Float32Array(numParticles * 3);
        const waveScales = new Float32Array(numParticles);

        let i = 0, j = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            wavePositions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            wavePositions[i + 1] = -200;
            wavePositions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
            waveScales[j] = 1;
            i += 3; j++;
          }
        }

        const waveGeometry = new THREE.BufferGeometry();
        waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
        waveGeometry.setAttribute('scale', new THREE.BufferAttribute(waveScales, 1));

        const waveMaterial = new THREE.PointsMaterial({
          color: 0x3b82f6,
          size: 3,
          transparent: true,
          opacity: 0.5,
        });

        particles = new THREE.Points(waveGeometry, waveMaterial);
        particles.userData = { type: 'wave', amountX: AMOUNTX, amountY: AMOUNTY };
        scene.add(particles);

        // 2. AURORA SYSTEM 
        const auroraCount = 1200; 
        const auroraPos = new Float32Array(auroraCount * 3);
        const auroraColors = new Float32Array(auroraCount * 3);
        
        for (let a = 0; a < auroraCount; a++) {
          auroraPos[a * 3] = (Math.random() - 0.5) * 4000;
          auroraPos[a * 3 + 1] = 400 + Math.random() * 500;
          auroraPos[a * 3 + 2] = -1200 + Math.random() * 1800;

          const isGreen = Math.random() > 0.4;
          auroraColors[a * 3] = isGreen ? 0.1 : 0.5;
          auroraColors[a * 3 + 1] = isGreen ? 0.7 : 0.1;
          auroraColors[a * 3 + 2] = isGreen ? 0.3 : 0.7;
        }

        const auroraGeometry = new THREE.BufferGeometry();
        auroraGeometry.setAttribute('position', new THREE.BufferAttribute(auroraPos, 3));
        auroraGeometry.setAttribute('color', new THREE.BufferAttribute(auroraColors, 3));

        const auroraMaterial = new THREE.PointsMaterial({
          size: 6,
          vertexColors: true,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending
        });

        auroraPoints = new THREE.Points(auroraGeometry, auroraMaterial);
        scene.add(auroraPoints);
      }

      window.addEventListener('resize', onWindowResize);
      document.addEventListener('pointermove', onPointerMove);
      window.addEventListener('scroll', onScroll);

      let count = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        const targetY = -mouseY + 400 - (scrollY * 0.15);
        camera.position.y += (targetY - camera.position.y) * 0.05;
        
        // Sedikit penyesuaian lookAt untuk mode seasonal
        if (season === 'default') {
            camera.lookAt(0, 100 - (scrollY * 0.05), 0);
        } else {
            camera.lookAt(0, 0, 0);
        }

        const positions = particles.geometry.attributes.position.array;

        if (season === 'winter') {
            // Animasi Salju
            const vels = particles.userData.velocities;
            for(let i=0; i<positions.length/3; i++) {
               positions[i*3+1] -= vels[i]; // Turun ke bawah (Y axis)
               if (positions[i*3+1] < -2000) positions[i*3+1] = 2000; // Reset ke atas
               
               // Drift X (Angin)
               positions[i*3] += Math.sin(count * 0.1 + i) * 0.5;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y = count * 0.02;

        } else if (season === 'summer') {
            // Animasi Kunang-kunang/Summer
            const phases = particles.userData.phases;
            for(let i=0; i<positions.length/3; i++) {
              positions[i*3+1] += Math.sin(count * 0.5 + phases[i]) * 2; // Naik turun
              positions[i*3] += Math.cos(count * 0.3 + phases[i]) * 2;   // Kiri kanan
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y = count * 0.05;

        } else if (season === 'default') {
            // Animasi Wave
            let i = 0;
            const amountX = particles.userData.amountX;
            const amountY = particles.userData.amountY;
            for (let ix = 0; ix < amountX; ix++) {
                for (let iy = 0; iy < amountY; iy++) {
                const scrollInfluence = scrollY * 0.0005;
                positions[i + 1] = (Math.sin((ix + count + scrollInfluence) * 0.3) * 40) + (Math.sin((iy + count) * 0.5) * 40);
                i += 3;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Animasi Aurora
            if (auroraPoints) {
                const aurPos = auroraPoints.geometry.attributes.position.array;
                const auroraCount = aurPos.length / 3;
                for (let a = 0; a < auroraCount; a++) {
                    aurPos[a * 3 + 1] += Math.sin(count * 0.4 + a) * 0.3;
                }
                auroraPoints.geometry.attributes.position.needsUpdate = true;
            }
        }

        renderer.render(scene, camera);
        count += 0.04; 
      };

      animate();
    };

    const script = document.createElement('script');
    script.src = THREE_JS_URL;
    script.async = true;
    script.onload = () => initThree();
    document.head.appendChild(script);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      if (document.head.contains(script)) document.head.removeChild(script);
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [season]); // Re-run effect saat season berubah

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

// Komponen Animasi Scroll 
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setVisible(entry.isIntersecting);
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px"
    });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'
      }`}
    >
      {children}
    </div>
  );
};

// 1. Loading Screen
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

// 2. Navbar (Modified for Season Control)
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

  // Fungsi Toggle Musim
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
          
          {/* Tombol Ganti Musim */}
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

// 3. Hero Section
const Hero = () => {
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const roles = ["Web Designer / Developer", "Cyber Tester", "Software Developer", "Game Developer"];

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

// 4. Skills Section
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

// 5. Projects Section (Cinematic Queue Style with Details)
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
  
  // New state for queue pagination/sliding
  const [queueStartIndex, setQueueStartIndex] = useState(0);

  const projects = [
    { 
      id: 1,
      title: "OpenSketcher", 
      cat: "Web Design Tool", 
      type: "Featured",
      desc: "Web-based drawing tool dengan estetika sketsa tangan dan filter gambar kustom.",
      longDesc: "OpenSketcher adalah platform desain grafis berbasis web yang menggunakan library Rough.js untuk menciptakan estetika unik menyerupai gambaran tangan. Dilengkapi fitur manipulasi bentuk (shapes), sistem undo/redo yang canggih, serta filter gambar kustom.",
      tech: ["React JS", "Rough.js", "Tailwind CSS", "Canvas API"],
      img: "/opensketcher/opensketcher.png",
      github: "https://github.com/AhRoiz/Tubes-Sistem-Multimedia",
      demo: "https://opensketcher.vercel.app/",
      gallery: [
        { img: "/opensketcher/opensketcher.png", desc: "Tampilan utama OpenSketcher dengan kanvas interaktif." },
        { img: "/opensketcher/filter.png", desc: "Fitur custom filter controls untuk memberikan efek pada canvas digital." },
        { img: "/opensketcher/export.png", desc: "Contoh opsi hasil ekspor karya seni digital." },
        { img: "/opensketcher/pen.png", desc: "Fitur pen dan alat khusus untuk menggambar." }
      ]
    },
    { 
      id: 2,
      title: "Money Buddy", 
      cat: "Mobile App (APK)", 
      type: "Featured",
      desc: "Aplikasi manajemen keuangan pribadi Android yang aman dan efisien.",
      longDesc: "Money Buddy adalah solusi cerdas untuk mengelola finansial harian Anda. Aplikasi ini dikembangkan untuk memberikan kontrol penuh atas pengeluaran dan pemasukan dengan antarmuka yang sangat user-friendly.",
      tech: ["React Native", "Firebase", "Redux", "Android SDK"],
      img: "/money/dashboard.png",
      github: "https://github.com/AhRoiz/Money-Buddy",
      demo: "#",
      gallery: [
        { img: "/money/dashboard.png", desc: "Dashboard utama menampilkan ringkasan pengeluaran bulanan." },
        { img: "/money/stats.png", desc: "Fitur statistik pengeluaran dan pemasukan." },
        { img: "/money/history.png", desc: "Fitur riwayat transaksi pengeluaran dan pemasukan." },
      ]
    },
    { 
      id: 3,
      title: "MathMaster", 
      cat: "Education Platform", 
      type: "Featured",
      desc: "Platform edukasi matematika dan teori bilangan untuk ilmu saintek.",
      longDesc: "MathMaster dirancang untuk membantu mahasiswa dan pelajar memahami konsep dasar matematika dan teori bilangan. Platform ini menyediakan materi interaktif yang mendalam.",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
      img: "/mathmaster/dashboard.png",
      github: "https://github.com/AhRoiz/MathMaster",
      demo: "https://mathmasterindonesia.my.id/",
      gallery: [
        { img: "/mathmaster/dashboard.png", desc: "Halaman dashboard interaktif dengan pilihan materi sesuai jenjang." },
        { img: "/mathmaster/quiz.png", desc: "Sistem kuis adaptif untuk menguji pemahaman pengguna." },
        { img: "/mathmaster/ai.png", desc: "Fitur tanya AI untuk menjawab pertanyaan dan juga membahas konsep matematika." }
      ]
    },
    { 
      id: 4,
      title: "Campus WiFi Monitor", 
      cat: "Network Security",
      type: "Academic",
      desc: "Sistem pemantauan performa dan keamanan jaringan WiFi kampus.",
      longDesc: "Dashboard Monitoring WiFi Kampus dikembangkan untuk mengawasi infrastruktur jaringan universitas secara terpusat. Sistem ini mampu mendeteksi anomali pada trafik WiFi.",
      tech: ["Python", "Grafana", "Prometheus", "SNMP Protocol"],
      img: "/wifi_campus/dashboard1.png",
      github: "https://github.com/AhRoiz",
      demo: "#",
      gallery: [
        { img: "/wifi_campus/dashboard1.png", desc: "Real-time traffic monitoring dashboard." },
        { img: "/wifi_campus/dashboard2.png", desc: "Weekly Snapshot dan monitoring harian." },
        { img: "/wifi_campus/dashboard3.png", desc: "Laporan MSR dan tabel rekomendasi." }
      ]
    },
    { 
      id: 5,
      title: "MBC Lab Landing Page", 
      cat: "Web Development",
      type: "Academic",
      desc: "Landing page profil untuk laboratorium riset MBC (Multimedia, Big Data, Cyber Security).",
      longDesc: "Website profil resmi untuk MBC Laboratory Telkom University. Platform ini menyajikan informasi komprehensif mengenai divisi riset (Cybersecurity, Big Data, Game Tech, GIS) dan visi misi laboratorium.",
      tech: ["HTML5", "Tailwind CSS", "JavaScript"],
      img: "/mbc/landingpage.png",
      github: "https://github.com/AhRoiz/mbc-lab",
      demo: "https://mbc-lab.vercel.app/",
      gallery: [
        { img: "/mbc/landingpage.png", desc: "Halaman beranda dengan nuansa futuristik laboratorium." },
        { img: "mbc/divisi.png", desc: "Halaman profil divisi Cybersecurity, Big Data, Game dan GIS" },
        { img: "mbc/kontak.png", desc: "Formulir kontak terintegrasi untuk kolaborasi riset." }
      ]
    }
  ];

  // UPDATE: LOCK BODY SCROLL WHEN MODAL IS OPEN
  useEffect(() => {
    if (showDetailModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function -> mengembalikan scroll saat komponen unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDetailModal]);

  // Auto Switch 
  useEffect(() => {
    let interval;
    if (!isPaused && !showDetailModal) { // Stop auto-switch if modal is open
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 50); 
    }
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, showDetailModal]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handleProjectClick = (id) => {
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      setActiveIndex(index);
      setProgress(0);
    }
  };

  const openDetailModal = (project) => {
    setDetailProject(project);
    setShowDetailModal(true);
    setIsPaused(true); 
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setIsPaused(false);
    setDetailProject(null);
  };

  const handleNextDetail = (e) => {
    e.stopPropagation();
    const currentIndex = projects.findIndex(p => p.id === detailProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setDetailProject(projects[nextIndex]);
  };

  const handlePrevDetail = (e) => {
    e.stopPropagation();
    const currentIndex = projects.findIndex(p => p.id === detailProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setDetailProject(projects[prevIndex]);
  };

  const activeProject = projects[activeIndex];
  
  // Get all projects EXCEPT the active one to show in the queue
  const otherProjects = projects.filter(p => p.id !== activeProject.id);
  
  const handleQueueSlideUp = () => {
    setQueueStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleQueueSlideDown = () => {
    // Ensure we don't slide past the end (showing 3 items at a time)
    setQueueStartIndex((prev) => Math.min(otherProjects.length - 3, prev + 1));
  };
  
  // Safe slice for display (always show up to 3 items)
  // If total others < 3, show all. If index is at end, adjust.
  const visibleQueue = otherProjects.slice(queueStartIndex, queueStartIndex + 3);

  return (
    <section id="projects" className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center py-20">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <div key={activeProject.id} className="absolute inset-0 animate-fade-in">
          <img 
            src={activeProject.img} 
            alt="bg" 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }}
            className="w-full h-full object-cover opacity-60 blur-sm scale-105" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 h-full flex flex-col lg:flex-row gap-12 lg:items-end">
        
        {/* LEFT SIDE: MAIN PROJECT CONTENT */}
        <div className="lg:w-2/3 flex flex-col justify-center min-h-[60vh] lg:min-h-[70vh]">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-mono tracking-widest uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Now Viewing: Project_0{activeIndex + 1}
            </span>
          </div>

          <h1 key={`title-${activeProject.id}`} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight animate-fade-in drop-shadow-lg">
            {activeProject.title}
          </h1>

          <p key={`desc-${activeProject.id}`} className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed font-light border-l-4 border-blue-500 pl-6 animate-fade-in delay-100 bg-black/30 p-4 rounded-r-xl backdrop-blur-sm">
            {activeProject.longDesc}
          </p>

          <div key={`tech-${activeProject.id}`} className="flex flex-wrap gap-3 mb-10 animate-fade-in delay-200">
            {activeProject.tech.map((t, i) => (
              <span key={i} className="px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-sm font-mono text-white backdrop-blur-md hover:bg-white/10 transition-colors">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
            <button 
              onClick={() => openDetailModal(activeProject)}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all flex items-center gap-3 shadow-lg hover:shadow-blue-500/30"
            >
              <BookOpen size={20} /> Lihat Lebih Detail
            </button>
            <a 
              href={activeProject.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-3"
            >
              <Github size={20} /> View Repo
            </a>
            <a 
              href={activeProject.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-black/50 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-md"
            >
              <ExternalLink size={20} /> Demo
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: QUEUE LIST (Sliding Card System) */}
        <div className="lg:w-1/3 w-full flex flex-col gap-4">
          <div className="flex justify-between items-end mb-2 border-b border-white/20 pb-2">
            <h3 className="text-gray-300 text-xs font-mono uppercase tracking-[0.2em] drop-shadow-md">Up Next Queue ({otherProjects.length})</h3>
            <div className="flex gap-2">
               {/* Pause Button */}
               <button 
                onClick={() => setIsPaused(!isPaused)} 
                className="text-gray-300 hover:text-white transition-colors"
                title={isPaused ? "Play Autoplay" : "Pause Autoplay"}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
          </div>

          {/* Autoplay Progress Bar */}
          <div className="h-1 w-full bg-gray-800/50 rounded-full overflow-hidden mb-2 backdrop-blur-sm">
             <div 
               className={`h-full bg-blue-500 transition-all duration-75 ease-linear ${isPaused ? 'bg-yellow-500' : ''}`}
               style={{ width: `${progress}%` }}
             ></div>
          </div>

          {/* Queue Controls - Slide Up */}
          <button 
            onClick={handleQueueSlideUp}
            disabled={queueStartIndex === 0}
            className={`w-full py-2 flex items-center justify-center rounded-lg bg-black/20 border border-white/5 transition-all ${queueStartIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20'}`}
          >
            <ChevronUp size={16} className="text-white" />
          </button>

          {/* Queue List Cards */}
          <div className="flex flex-col gap-3 min-h-[320px]"> 
            {visibleQueue.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="group relative flex items-center gap-4 p-4 bg-black/60 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 cursor-pointer transition-all active:scale-95 backdrop-blur-xl shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/10">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-blue-400 text-[9px] font-mono mb-1 uppercase tracking-wider">{project.cat}</p>
                    <h4 className="text-white font-bold text-base truncate">{project.title}</h4>
                    <p className="text-gray-400 text-xs truncate mt-1">{project.desc}</p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all shadow-md">
                    <ChevronRight size={14} />
                  </div>
                </div>
            ))}
          </div>

          {/* Queue Controls - Slide Down */}
          <button 
            onClick={handleQueueSlideDown}
            disabled={otherProjects.length <= 3 || queueStartIndex >= otherProjects.length - 3}
            className={`w-full py-2 flex items-center justify-center rounded-lg bg-black/20 border border-white/5 transition-all ${otherProjects.length <= 3 || queueStartIndex >= otherProjects.length - 3 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20'}`}
          >
            <ChevronDown size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* MODAL POPUP FOR PROJECT DETAILS USING PORTAL */}
      {showDetailModal && detailProject && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeDetailModal}
          ></div>

          {/* Navigation Buttons (Left/Right) */}
          <button 
            onClick={handlePrevDetail}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-4 bg-white/10 hover:bg-blue-600 rounded-full border border-white/10 text-white transition-all backdrop-blur-md group"
          >
            <ChevronLeft size={32} className="group-hover:scale-110 transition-transform" />
          </button>

          <button 
            onClick={handleNextDetail}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-4 bg-white/10 hover:bg-blue-600 rounded-full border border-white/10 text-white transition-all backdrop-blur-md group"
          >
            <ChevronRight size={32} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Modal Content - Centered & Sized Properly */}
          <div className="relative bg-[#0a0a0a] w-full max-w-6xl h-auto max-h-[85vh] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden mx-4 md:mx-12">
            
            {/* Header / Top Bar */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-md z-20 sticky top-0">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span className="text-blue-500">PROJECT:</span> {detailProject.title}
              </h2>
              <button 
                onClick={closeDetailModal}
                className="p-2 bg-white/10 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                 {/* Left Column: Description */}
                 <div className="lg:col-span-1 space-y-6">
                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                      {detailProject.longDesc}
                    </p>
                    <div>
                      <h4 className="font-bold text-white mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailProject.tech.map((t, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                 </div>

                 {/* Right Column: Gallery */}
                 <div className="lg:col-span-2 space-y-12">
                    <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                       <Monitor size={20} className="text-blue-500" /> Project Gallery & Insights
                    </h3>
                    
                    {detailProject.gallery && detailProject.gallery.length > 0 ? (
                      detailProject.gallery.map((item, idx) => (
                        <div key={idx} className="group">
                          {/* Image Container */}
                          <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-4 shadow-2xl">
                             <img 
                               src={item.img} 
                               alt={`Screenshot ${idx + 1}`}
                               className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                               onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }}
                             />
                             <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                               IMG_0{idx + 1}
                             </div>
                          </div>
                          {/* Explanation */}
                          <div className="flex gap-4 items-start">
                             <div className="mt-1 min-w-[24px]">
                               <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-black">
                                 {idx + 1}
                               </div>
                             </div>
                             <p className="text-gray-400 italic font-light border-l-2 border-white/10 pl-4 py-1">
                               "{item.desc}"
                             </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No detailed gallery available for this project.</p>
                    )}
                 </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black to-transparent z-20 flex justify-center pointer-events-none">
               <a href={detailProject.demo} target="_blank" rel="noopener noreferrer" className="pointer-events-auto px-12 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                 Kunjungi Project Live
               </a>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

// 6. About Section
const About = () => (
  <section id="about" className="py-32 px-6 bg-[#030303]/60 backdrop-blur-md text-white">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20 items-center text-white">
      <FadeInSection>
        <div className="relative group text-white">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden relative text-white">
             {/* Profile Image Support */}
             <img 
                src="/ahmad.jpeg" 
                alt="Ahmad Rofi' Izzulhaq"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 text-white"
                onError={(e) => { e.target.style.display = 'none'; }}
             />
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

// 7. Contact Section
const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/ahroiz/", color: "hover:bg-pink-600" },
    { icon: <IconX size={20} />, label: "Twitter", href: "https://twitter.com/ahrofzul56684", color: "hover:bg-blue-400" },
    { icon: <Github size={20} />, label: "Github", href: "https://github.com/AhRoiz", color: "hover:bg-gray-700" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/ahroiz", color: "hover:bg-blue-700" },
    { icon: <Youtube size={20} />, label: "YouTube", href: "#", color: "hover:bg-red-600" },
    { icon: <IconDiscord size={20} />, label: "Discord", href: "https://discordapp.com/users/541250359625252867", color: "hover:bg-indigo-600" },
    { icon: <IconWhatsapp size={20} />, label: "WhatsApp", href: "https://wa.me/6282120648685", color: "hover:bg-indigo-600" }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,   
      import.meta.env.VITE_TEMPLATE_ID,  
      form.current,
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then((result) => {
        alert("Pesan berhasil dikirim! Saya akan segera membalasnya.");
        setLoading(false);
        e.target.reset(); 
    }, (error) => {
        alert("Gagal mengirim pesan. Silakan coba lagi atau hubungi via DM Instagram.");
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
          
          {/* Form */}
          <form ref={form} onSubmit={sendEmail} className="space-y-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              <input 
                type="text" 
                name="user_name" // PENTING
                required
                placeholder="Nama Lengkap" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500/50 transition-all font-light focus:bg-white/10 text-white" 
              />
              <input 
                type="email" 
                name="user_email" // PENTING
                required
                placeholder="Alamat Email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500/50 transition-all font-light focus:bg-white/10 text-white" 
              />
            </div>
            <textarea 
              name="message" // PENTING
              required
              rows="5" 
              placeholder="Pesan Anda" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500/50 transition-all font-light resize-none focus:bg-white/10 text-white"
            ></textarea>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-95 group text-white ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
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

// Main App Component 

export default function App() {
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('default'); // Default, winter, summer

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

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
        
        /* Glassmorphism global helpers */
        .backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .backdrop-blur-xl { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }

        /* Custom Main Gradient */
        .bg-gradient-main {
          background: linear-gradient(180deg, #020617 0%, #0f172a 40%, #080808 100%);
          background-attachment: fixed;
        }
      `}</style>

      {/* 3D Background  */}
      {!loading && <ThreeBackground season={season} />}

      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          {/* Navbar  */}
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