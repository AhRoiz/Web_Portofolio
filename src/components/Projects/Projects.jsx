import React, { useState, useEffect } from 'react';
import { BookOpen, Github, ExternalLink, Grid3X3, Layers } from 'lucide-react';
import ProjectQueue from './ProjectQueue';
import ProjectModal from './ProjectModal';
import ProjectGrid from './ProjectGrid';
import UnavailablePopup from './UnavailablePopup';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
  const [viewMode, setViewMode] = useState('queue'); // 'queue' or 'grid'
  const [showUnavailablePopup, setShowUnavailablePopup] = useState(false);

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
        { img: "/mathmaster/quiz.png", desc: "Sistem kuis adaptif untuk menguji pemahaman pengguna & kuis tingkat olimpiade pada berbagai jenjang." },
        { img: "/mathmaster/ai.png", desc: "Fitur tanya AI untuk menjawab pertanyaan dan juga membahas konsep matematika dan sudah support upload foto." },
        { img: "/mathmaster/calc.png", desc: "Fitur kalkulator saintifik matematika interaktif." }
      ]
    },
    {
      id: 4,
      title: "MBC Lab Landing Page",
      cat: "Web Development",
      type: "Academic",
      desc: "Landing page mockup profil untuk laboratorium riset MBC (Multimedia, Big Data, Cyber Security).",
      longDesc: "Website profil untuk MBC Laboratory Telkom University. Platform ini menyajikan informasi komprehensif mengenai divisi riset (Cybersecurity, Big Data, Game Tech, GIS) dan visi misi laboratorium.",
      tech: ["HTML5", "Tailwind CSS", "JavaScript"],
      img: "/mbc/landingpage.png",
      github: "https://github.com/AhRoiz/mbc-lab",
      demo: "https://mbc-lab.vercel.app/",
      gallery: [
        { img: "/mbc/landingpage.png", desc: "Halaman beranda dengan nuansa futuristik laboratorium." },
        { img: "mbc/divisi.png", desc: "Halaman profil divisi Cybersecurity, Big Data, Game dan GIS" },
        { img: "mbc/kontak.png", desc: "Formulir kontak terintegrasi untuk kolaborasi riset." }
      ]
    },
    {
      id: 5,
      title: "DevMind AI",
      cat: "AI Development Tool",
      type: "Featured",
      desc: "Platform analisis kode cerdas berbasis Google Gemini 2.5 Flash untuk membantu developer junior.",
      longDesc: "DevMind AI adalah asisten koding cerdas yang mengintegrasikan Google Gemini API untuk melakukan analisis statis, audit keamanan, dan visualisasi alur kode secara real-time. Dibangun dengan pendekatan 'Zero-npm-bloat', menggunakan custom Markdown renderer dan Mermaid.js wrapper yang dioptimasi untuk performa tinggi.",
      tech: ["React JS", "Gemini API", "Mermaid.js", "Tailwind CSS"],
      img: "/devmind/dashboard.png",
      github: "#",
      demo: "#",
      gallery: [
        { img: "/devmind/dashboard.png", desc: "Antarmuka utama DevMind dengan Code Editor disertai opsi pilihan Panel eksekusi." },
        { img: "/devmind/security.png", desc: "Fitur Security Audit mendeteksi celah keamanan dan memberikan solusi patch." },
        { img: "/devmind/recommend.png", desc: "Rekomendasi kode yang optimal berdasarkan analisis statis." },
        { img: "/devmind/flowchart.png", desc: "Visualisasi kode otomatis menjadi Flowchart menggunakan Mermaid.js." },
        { img: "/devmind/quiz.png", desc: "Fitur kuis interaktif untuk mengevaluasi pemahaman kode." }
      ]
    },
    {
      id: 6,
      title: "Pomocute",
      cat: "Desktop Productivity App",
      type: "Featured",
      desc: "Aplikasi Pomodoro Timer desktop dengan estetika yang lucu dan menenangkan.",
      longDesc: "Pomocute adalah aplikasi produktivitas desktop yang dibangun menggunakan Electron. Didesain khusus untuk mengurangi kecemasan saat bekerja, Pomocute menghadirkan fitur timer fokus yang dapat dikustomisasi, mode istirahat, serta pemutar suara ambien (hujan, lo-fi) untuk menciptakan suasana kerja yang nyaman.",
      tech: ["Electron", "React JS", "Vite", "Tailwind CSS"],
      img: "/pomocute/main.png",
      github: "#",
      demo: "#",
      gallery: [
        { img: "/pomocute/main.png", desc: "Tampilan timer utama dengan karakter yang lucu yang ikut menemani belajar." },
        { img: "/pomocute/setting.png", desc: "Pengaturan tema aplikasi, durasi fokus dan pilihan suara ambien." },
        { img: "/pomocute/catsetting.png", desc: "Pengaturan karakter yang lucu untuk menambah kesenangan." },
        { img: "/pomocute/break.png", desc: "Mode istirahat untuk menjaga kesehatan mata dan pikiran ditemani oleh teman yang lucu." }
      ]
    },
    {
      id: 7,
      title: "Cinetheque",
      cat: "Web Archive",
      type: "Personal",
      desc: "Arsip digital estetik untuk mencatat ulasan film dan anime favorit.",
      longDesc: "Cinetheque adalah platform web yang didesain dengan nuansa 'warm' dan estetik untuk para pecinta film. Aplikasi ini memungkinkan pengguna untuk membuat log tontonan, memberikan rating personal, dan menulis ulasan mendalam. 'Bukan bermaksud untuk menyaingi IMDB, hanya pure ekspresif sang penulis'.",
      tech: ["React JS", "Tailwind CSS", "LocalStorage", "Framer Motion"],
      img: "/cinetheque/home.png",
      github: "#",
      demo: "#",
      gallery: [
        { img: "/cinetheque/home.png", desc: "Halaman beranda dengan galeri poster film yang estetik." },
        { img: "/cinetheque/detail.png", desc: "Halaman detail film dengan ulasan personal dan rating." },
        { img: "/cinetheque/profile.png", desc: "Halaman profil pengguna dengan obsesi sang penulis." }
      ]
    },
    {
      id: 8,
      title: "Global Weather 3D",
      cat: "Interactive 3D App",
      type: "Featured",
      desc: "Visualisasi cuaca real-time dengan Globe 3D interaktif dan pemetaan geospasial.",
      longDesc: "Aplikasi cuaca futuristik yang menggabungkan visualisasi data 3D menggunakan Three.js (via React-Globe.GL) dan pemetaan 2D dengan Leaflet. Memungkinkan pengguna menjelajahi kondisi iklim global secara imersif. Dilengkapi fitur pencarian negara dengan algoritma fuzzy-matching, serta menampilkan data meteorologi mendalam (suhu, kelembaban, tekanan udara, sunrise/sunset) yang diambil secara real-time dari OpenWeatherMap API.",
      tech: ["React JS", "Three.js", "Leaflet", "OpenWeatherMap API"],
      img: "/weather/globe-view.png",
      github: "#",
      demo: "#",
      gallery: [
        { img: "/weather/globe-view.png", desc: "Eksplorasi cuaca interaktif menggunakan Globe 3D (Three.js)." },
        { img: "/weather/detail-card.png", desc: "Kartu informasi cuaca glassmorphism dengan data real-time." },
        { img: "/weather/search.png", desc: "Fitur pencarian pintar (Smart Search) dengan deteksi lokasi otomatis." }
      ]
    },
  ];

  // Helper to check if link is available
  const isLinkAvailable = (link) => {
    return link && link !== '#' && link.trim() !== '';
  };

  // Handle link click with popup
  const handleLinkClick = (e, link) => {
    if (!isLinkAvailable(link)) {
      e.preventDefault();
      setShowUnavailablePopup(true);
    }
  };

  useEffect(() => {
    let interval;
    if (!isPaused && !showDetailModal && viewMode === 'queue') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, showDetailModal, projects.length, viewMode]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const activeProject = projects[activeIndex];
  const otherProjects = projects.filter(p => p.id !== activeProject.id);

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

  const handleProjectSelect = (id) => {
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) setActiveIndex(index);
  };

  const handleGridProjectSelect = (project) => {
    openDetailModal(project);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'queue' ? 'grid' : 'queue');
    if (viewMode === 'queue') {
      setIsPaused(true);
    }
  };

  return (
    <section id="projects" className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center py-20">
      {/* Background - only show in queue mode */}
      {viewMode === 'queue' && (
        <div className="absolute inset-0 z-0 transition-opacity duration-1000">
          <div key={activeProject.id} className="absolute inset-0 animate-fade-in">
            <img src={activeProject.img} alt="bg" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }} className="w-full h-full object-cover opacity-60 blur-sm scale-105" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-10 mix-blend-overlay"></div>
        </div>
      )}

      {/* Grid mode background */}
      {viewMode === 'grid' && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-20 h-full flex flex-col">
        {/* View Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleViewMode}
            className="group flex items-center gap-3 px-5 py-3 bg-black/60 border border-white/20 rounded-full hover:bg-blue-500/20 hover:border-blue-500/50 transition-all backdrop-blur-xl"
          >
            {viewMode === 'queue' ? (
              <>
                <Grid3X3 size={18} className="text-blue-400" />
                <span className="text-white text-sm font-medium">Tampilkan Seluruh Artifact</span>
              </>
            ) : (
              <>
                <Layers size={18} className="text-blue-400" />
                <span className="text-white text-sm font-medium">Kembali ke Queue View</span>
              </>
            )}
          </button>
        </div>

        {/* Queue View */}
        {viewMode === 'queue' && (
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end flex-1">
            {/* LEFT CONTENT */}
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
                  <span key={i} className="px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-sm font-mono text-white backdrop-blur-md hover:bg-white/10 transition-colors">{t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
                <button onClick={() => openDetailModal(activeProject)} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all flex items-center gap-3 shadow-lg hover:shadow-blue-500/30">
                  <BookOpen size={20} /> Lihat Lebih Detail
                </button>
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleLinkClick(e, activeProject.github)}
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-3"
                >
                  <Github size={20} /> View Repo
                </a>
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleLinkClick(e, activeProject.demo)}
                  className="px-8 py-4 bg-black/50 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-md"
                >
                  <ExternalLink size={20} /> Demo
                </a>
              </div>
            </div>

            {/* RIGHT CONTENT (Queue) */}
            <ProjectQueue
              projects={otherProjects}
              onSelect={handleProjectSelect}
              isPaused={isPaused}
              togglePause={() => setIsPaused(!isPaused)}
              progress={progress}
            />
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <ProjectGrid
            projects={projects}
            onSelect={handleGridProjectSelect}
          />
        )}
      </div>

      {detailProject && (
        <ProjectModal
          project={detailProject}
          onClose={closeDetailModal}
          onNext={handleNextDetail}
          onPrev={handlePrevDetail}
          onUnavailableLink={() => setShowUnavailablePopup(true)}
        />
      )}

      {/* Unavailable Popup */}
      <UnavailablePopup
        isOpen={showUnavailablePopup}
        onClose={() => setShowUnavailablePopup(false)}
      />
    </section>
  );
};

export default Projects;
