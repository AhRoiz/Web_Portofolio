import React from 'react';
import { ChevronRight, Folder } from 'lucide-react';

const ProjectGrid = ({ projects, onSelect }) => {
    const getTypeColor = (type) => {
        switch (type) {
            case 'Featured':
                return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
            case 'Academic':
                return 'bg-green-500/20 border-green-500/30 text-green-300';
            case 'Personal':
                return 'bg-purple-500/20 border-purple-500/30 text-purple-300';
            default:
                return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
                <Folder size={24} className="text-blue-500" />
                <h3 className="text-2xl font-bold text-white">Semua Project</h3>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-mono">
                    {projects.length} items
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        onClick={() => onSelect(project)}
                        className="group relative bg-black/60 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 backdrop-blur-xl"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden">
                            <img
                                src={project.img}
                                alt={project.title}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800";
                                }}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Type Badge */}
                            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${getTypeColor(project.type)}`}>
                                {project.type}
                            </div>

                            {/* Project Number */}
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs font-mono text-white">
                                {String(project.id).padStart(2, '0')}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <p className="text-blue-400 text-[10px] font-mono mb-2 uppercase tracking-wider">
                                {project.cat}
                            </p>
                            <h4 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                                {project.title}
                            </h4>
                            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                {project.desc}
                            </p>

                            {/* Tech Tags - Show first 2 */}
                            <div className="flex flex-wrap gap-1.5 mt-4">
                                {project.tech.slice(0, 2).map((t, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {project.tech.length > 2 && (
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-500">
                                        +{project.tech.length - 2}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">
                            <ChevronRight size={18} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
