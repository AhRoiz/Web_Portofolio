import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Monitor } from 'lucide-react';

const ProjectModal = ({ project, onClose, onNext, onPrev }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!project) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>

      <button onClick={onPrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-4 bg-white/10 hover:bg-blue-600 rounded-full border border-white/10 text-white transition-all backdrop-blur-md group">
        <ChevronLeft size={32} className="group-hover:scale-110 transition-transform" />
      </button>

      <button onClick={onNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-4 bg-white/10 hover:bg-blue-600 rounded-full border border-white/10 text-white transition-all backdrop-blur-md group">
        <ChevronRight size={32} className="group-hover:scale-110 transition-transform" />
      </button>

      <div className="relative bg-[#0a0a0a] w-full max-w-6xl h-auto max-h-[85vh] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden mx-4 md:mx-12">
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-md z-20 sticky top-0">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="text-blue-500">PROJECT:</span> {project.title}
          </h2>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
             <div className="lg:col-span-1 space-y-6">
                <p className="text-gray-300 leading-relaxed font-light text-lg">{project.longDesc}</p>
                <div>
                  <h4 className="font-bold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-mono">{t}</span>
                    ))}
                  </div>
                </div>
             </div>

             <div className="lg:col-span-2 space-y-12">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                   <Monitor size={20} className="text-blue-500" /> Project Gallery & Insights
                </h3>
                {project.gallery && project.gallery.length > 0 ? (
                  project.gallery.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-4 shadow-2xl">
                         <img 
                           src={item.img} 
                           alt={`Screenshot ${idx + 1}`}
                           className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                           onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }}
                         />
                         <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">IMG_0{idx + 1}</div>
                      </div>
                      <div className="flex gap-4 items-start">
                         <div className="mt-1 min-w-[24px]">
                           <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-black">{idx + 1}</div>
                         </div>
                         <p className="text-gray-400 italic font-light border-l-2 border-white/10 pl-4 py-1">"{item.desc}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No detailed gallery available for this project.</p>
                )}
             </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black to-transparent z-20 flex justify-center pointer-events-none">
           <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pointer-events-auto px-12 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">Kunjungi Project Live</a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;