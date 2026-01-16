import React, { useState } from 'react';
import { Play, Pause, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';

const ProjectQueue = ({ projects, onSelect, isPaused, togglePause, progress }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleQueueSlideUp = () => setStartIndex((prev) => Math.max(0, prev - 1));
  const handleQueueSlideDown = () => setStartIndex((prev) => Math.min(projects.length - 3, prev + 1));
  
  const visibleQueue = projects.slice(startIndex, startIndex + 3);

  return (
    <div className="lg:w-1/3 w-full flex flex-col gap-4">
      <div className="flex justify-between items-end mb-2 border-b border-white/20 pb-2">
        <h3 className="text-gray-300 text-xs font-mono uppercase tracking-[0.2em] drop-shadow-md">Up Next Queue ({projects.length})</h3>
        <button onClick={togglePause} className="text-gray-300 hover:text-white transition-colors" title={isPaused ? "Play Autoplay" : "Pause Autoplay"}>
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>

      <div className="h-1 w-full bg-gray-800/50 rounded-full overflow-hidden mb-2 backdrop-blur-sm">
         <div className={`h-full bg-blue-500 transition-all duration-75 ease-linear ${isPaused ? 'bg-yellow-500' : ''}`} style={{ width: `${progress}%` }}></div>
      </div>

      <button onClick={handleQueueSlideUp} disabled={startIndex === 0} className={`w-full py-2 flex items-center justify-center rounded-lg bg-black/20 border border-white/5 transition-all ${startIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20'}`}>
        <ChevronUp size={16} className="text-white" />
      </button>

      <div className="flex flex-col gap-3 min-h-[320px]"> 
        {visibleQueue.map((project) => (
            <div key={project.id} onClick={() => onSelect(project.id)} className="group relative flex items-center gap-4 p-4 bg-black/60 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 cursor-pointer transition-all active:scale-95 backdrop-blur-xl shadow-lg hover:shadow-blue-500/10">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/10">
                <img src={project.img} alt={project.title} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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

      <button onClick={handleQueueSlideDown} disabled={projects.length <= 3 || startIndex >= projects.length - 3} className={`w-full py-2 flex items-center justify-center rounded-lg bg-black/20 border border-white/5 transition-all ${projects.length <= 3 || startIndex >= projects.length - 3 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/20'}`}>
        <ChevronDown size={16} className="text-white" />
      </button>
    </div>
  );
};

export default ProjectQueue;