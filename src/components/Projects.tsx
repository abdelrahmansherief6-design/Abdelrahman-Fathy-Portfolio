import React, { useState, useEffect } from 'react';
import { Play, ShieldAlert, Cpu, BarChart2, CheckCircle2, TrendingUp, Info, Eye, ArrowLeft, Trash2, Edit2, PlusCircle, ArrowUpRight, Check, X } from 'lucide-react';
import { PortfolioData, Project, Metric } from '../types';

interface ProjectsProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  lang: 'en' | 'ar';
  isAdmin: boolean;
  onOpenAddProject: () => void;
  onOpenEditProject: (project: Project) => void;
}

export default function Projects({
  data,
  setData,
  lang,
  isAdmin,
  onOpenAddProject,
  onOpenEditProject
}: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Reset active media when changing selected project
  useEffect(() => {
    setActiveMediaIndex(0);
  }, [selectedProject]);

  // Combine all media items for the selected project
  const getProjectMedia = (project: Project) => {
    const items: { type: 'image' | 'video'; src: string }[] = [];
    
    // Add primary video if it exists
    if (project.videoUrl) {
      items.push({ type: 'video', src: project.videoUrl });
    }
    
    // Add primary image if it exists
    if (project.image) {
      items.push({ type: 'image', src: project.image });
    }

    // Add secondary images
    if (project.images && project.images.length > 0) {
      project.images.forEach(img => {
        if (img && !items.some(x => x.src === img)) {
          items.push({ type: 'image', src: img });
        }
      });
    }

    // Add secondary videos
    if (project.videoUrls && project.videoUrls.length > 0) {
      project.videoUrls.forEach(vid => {
        if (vid && !items.some(x => x.src === vid)) {
          items.push({ type: 'video', src: vid });
        }
      });
    }

    return items;
  };

  // Extract unique categories for filter tabs
  const categories = ['all', ...Array.from(new Set(data.projects.map(p => p.category.en)))];

  const getTranslation = (item: any) => item[lang];

  // Helper to render customized SVG thumbnails for each project
  const renderProjectThumbnail = (imageKey: string) => {
    switch (imageKey) {
      case 'qms':
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            <rect x="15" y="15" width="170" height="90" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
            <line x1="15" y1="40" x2="185" y2="40" stroke="#27272a"/>
            <circle cx="30" cy="28" r="4" fill="#ef4444"/>
            <circle cx="42" cy="28" r="4" fill="#eab308"/>
            <circle cx="54" cy="28" r="4" fill="#22c55e"/>
            <text x="140" y="30" fill="#71717a" fontSize="8" fontFamily="monospace">audit_v1.0</text>
            <rect x="30" y="55" width="40" height="15" rx="3" fill="#14b8a6" fillOpacity="0.1" stroke="#14b8a6" strokeWidth="0.5"/>
            <text x="35" y="65" fill="#14b8a6" fontSize="8" fontWeight="bold">98% PASS</text>
            <rect x="30" y="75" width="60" height="6" rx="3" fill="#27272a"/>
            <rect x="30" y="75" width="52" height="6" rx="3" fill="#14b8a6"/>
            <rect x="110" y="55" width="60" height="30" rx="4" fill="#27272a" fillOpacity="0.4" stroke="#3f3f46" strokeWidth="0.5"/>
            <line x1="115" y1="65" x2="165" y2="65" stroke="#14b8a6" strokeWidth="1.5"/>
            <line x1="115" y1="72" x2="155" y2="72" stroke="#52525b"/>
            <line x1="115" y1="78" x2="145" y2="78" stroke="#52525b"/>
          </svg>
        );
      case 'lab':
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            <rect x="20" y="20" width="70" height="80" rx="4" fill="#18181b" stroke="#27272a"/>
            <text x="25" y="35" fill="#71717a" fontSize="7" fontWeight="bold">CAPACITY</text>
            <text x="25" y="55" fill="#06b6d4" fontSize="18" fontWeight="bold">95%</text>
            <rect x="25" y="70" width="60" height="4" rx="2" fill="#27272a"/>
            <rect x="25" y="70" width="57" height="4" rx="2" fill="#06b6d4"/>
            
            <rect x="105" y="20" width="75" height="35" rx="4" fill="#18181b" stroke="#27272a"/>
            <text x="110" y="32" fill="#71717a" fontSize="6">DEMAND PREDICTION</text>
            <path d="M110 48 L125 38 L140 43 L155 33 L170 38" fill="none" stroke="#06b6d4" strokeWidth="1.5"/>
            
            <rect x="105" y="65" width="75" height="35" rx="4" fill="#18181b" stroke="#27272a"/>
            <text x="110" y="77" fill="#71717a" fontSize="6">SCHEDULER BOTTLENECK</text>
            <rect x="110" y="85" width="10" height="10" fill="#06b6d4"/>
            <rect x="125" y="81" width="10" height="14" fill="#3b82f6"/>
            <rect x="140" y="88" width="10" height="7" fill="#ef4444"/>
            <rect x="155" y="86" width="10" height="9" fill="#14b8a6"/>
          </svg>
        );
      case 'refrigerator':
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            <rect x="15" y="15" width="170" height="90" rx="6" fill="#18181b" stroke="#27272a"/>
            <circle cx="30" cy="30" r="10" fill="#1e1b4b" stroke="#3730a3" strokeWidth="1"/>
            <path d="M26 30 H34 M30 26 V34 M27 27 L33 33 M27 33 L33 27" stroke="#818cf8" strokeWidth="1"/>
            <text x="45" y="33" fill="#fff" fontSize="8" fontWeight="bold">RELIABILITY CHAMBER</text>
            <line x1="15" y1="48" x2="185" y2="48" stroke="#27272a"/>
            <path d="M25 80 Q 40 55, 60 75 T 100 65 T 140 70 T 175 60" fill="none" stroke="#14b8a6" strokeWidth="2"/>
            <circle cx="100" cy="65" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1"/>
            <text x="108" y="63" fill="#ef4444" fontSize="6" fontFamily="monospace">CRITICAL FAULT</text>
          </svg>
        );
      case 'complaints':
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            <rect x="15" y="15" width="170" height="90" rx="6" fill="#18181b" stroke="#27272a"/>
            <text x="25" y="32" fill="#71717a" fontSize="8" fontWeight="bold">CUSTOMER COMPLAINTS TREND</text>
            <line x1="25" y1="45" x2="175" y2="45" stroke="#27272a"/>
            <rect x="30" y="85" width="15" height="10" fill="#3f3f46"/>
            <rect x="50" y="70" width="15" height="25" fill="#3f3f46"/>
            <rect x="70" y="55" width="15" height="40" fill="#3f3f46"/>
            <rect x="90" y="75" width="15" height="20" fill="#3f3f46"/>
            <rect x="110" y="80" width="15" height="15" fill="#3f3f46"/>
            {/* The dramatic 45% reduction curve */}
            <path d="M30 50 Q 80 48, 110 75 T 170 88" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2"/>
            <text x="130" y="65" fill="#ef4444" fontSize="8" fontWeight="bold">-45% FAULTS</text>
          </svg>
        );
      case 'sales':
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            <rect x="15" y="15" width="170" height="90" rx="6" fill="#18181b" stroke="#27272a"/>
            <text x="25" y="32" fill="#71717a" fontSize="8" fontWeight="bold">FORECAST ACCURACY</text>
            <text x="145" y="32" fill="#22c55e" fontSize="10" fontWeight="bold">94%</text>
            <path d="M25 85 L 50 80 L 75 60 L 100 65 L 125 50 L 150 45 L 175 35" fill="none" stroke="#22c55e" strokeWidth="2.5"/>
            <circle cx="175" cy="35" r="3" fill="#22c55e"/>
            <text x="115" y="90" fill="#71717a" fontSize="7">SAVED 20+ HOURS/WEEK</text>
          </svg>
        );
      case 'appsheet':
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            {/* Phone/Tablet frame */}
            <rect x="65" y="15" width="70" height="90" rx="8" fill="#1c1917" stroke="#27272a" strokeWidth="2"/>
            <rect x="70" y="25" width="60" height="70" rx="2" fill="#0c0a09"/>
            <circle cx="100" cy="20" r="1.5" fill="#27272a"/>
            {/* App interface mockup */}
            <rect x="75" y="32" width="50" height="12" rx="2" fill="#14b8a6" fillOpacity="0.2"/>
            <text x="80" y="41" fill="#14b8a6" fontSize="6" fontWeight="bold">SCAN BARCODE</text>
            <rect x="75" y="50" width="50" height="8" rx="1" fill="#27272a"/>
            <rect x="75" y="62" width="50" height="8" rx="1" fill="#27272a"/>
            <rect x="75" y="74" width="50" height="8" rx="1" fill="#27272a"/>
            {/* Success icon */}
            <circle cx="118" cy="54" r="2.5" fill="#22c55e"/>
            <circle cx="118" cy="66" r="2.5" fill="#22c55e"/>
          </svg>
        );
      default:
        // Render a customized SVG if it's a new or uploaded project
        return (
          <svg className="w-full h-full bg-zinc-900" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#09090b"/>
            <rect x="15" y="15" width="170" height="90" rx="6" fill="#18181b" stroke="#27272a"/>
            <text x="100" y="55" fill="#71717a" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Custom Project Visual</text>
            <path d="M60 75 Q 100 45, 140 75" fill="none" stroke="#14b8a6" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(lang === 'en' ? 'Are you sure you want to delete this project?' : 'هل أنت متأكد من حذف هذا المشروع؟')) {
      const updatedProjects = data.projects.filter(p => p.id !== id);
      setData({ ...data, projects: updatedProjects });
    }
  };

  const filteredProjects = activeCategory === 'all' 
    ? data.projects 
    : data.projects.filter(p => p.category.en === activeCategory);

  return (
    <section id="projects" className="py-20 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-teal-600"></span>
              <span className="text-xs uppercase tracking-widest text-teal-600 font-mono font-semibold">
                {data.profile.projectsSubtitle ? data.profile.projectsSubtitle[lang] : (lang === 'en' ? 'Interactive Portfolio' : 'معرض المشروعات والحلول المنجزة')}
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
              {data.profile.projectsTitle ? data.profile.projectsTitle[lang] : (lang === 'en' ? 'Engineering Case Studies' : 'مشاريع هندسية وقصص نجاح حقيقية')}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-teal-600 text-white font-semibold shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {lang === 'en' ? 'All Work' : 'الكل'}
              </button>
              {categories.slice(1).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-teal-600 text-white font-semibold shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Add Project Button (Admin mode only!) */}
            {isAdmin && (
              <button
                onClick={onOpenAddProject}
                className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all cursor-pointer shadow-md"
              >
                <PlusCircle size={14} />
                <span>{lang === 'en' ? 'Add Project' : 'إضافة مشروع'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects_grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer relative shadow-sm"
            >
              {/* Image/SVG Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 border-b border-zinc-150">
                {project.image.startsWith('data:') || project.image.startsWith('http') ? (
                  <img
                    src={project.image}
                    alt={getTranslation(project.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  renderProjectThumbnail(project.image)
                )}

                {/* Categories Badge on top */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 border border-zinc-200 text-[10px] uppercase font-mono tracking-wider text-teal-700 font-semibold backdrop-blur-sm shadow-sm">
                  {getTranslation(project.category)}
                </div>

                {/* Action Toolbar for Admins */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onOpenEditProject(project)}
                      className="p-1.5 bg-white/95 hover:bg-teal-50 hover:text-white border border-zinc-200 text-zinc-700 rounded-lg transition-all shadow-sm"
                      title={lang === 'en' ? 'Edit project' : 'تعديل المشروع'}
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={(e) => deleteProject(project.id, e)}
                      className="p-1.5 bg-white/95 hover:bg-rose-600 hover:text-white border border-zinc-200 text-zinc-700 rounded-lg transition-all shadow-sm"
                      title={lang === 'en' ? 'Delete project' : 'حذف المشروع'}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-teal-500/20">
                    <Eye size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 tracking-tight group-hover:text-teal-600 transition-colors font-sans leading-snug">
                    {getTranslation(project.title)}
                  </h4>
                  {/* Truncated snippet of problem */}
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed font-sans font-light">
                    {getTranslation(project.problem)}
                  </p>
                </div>

                {/* Metrics preview row */}
                <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-zinc-150 text-center">
                  {project.metrics.slice(0, 3).map((metric, index) => (
                    <div key={index} className="space-y-0.5">
                      <p className="text-base font-bold font-mono text-teal-600 tracking-tight leading-none">
                        {metric.value}
                      </p>
                      <p className="text-[9px] text-zinc-500 font-sans tracking-wide leading-tight">
                        {getTranslation(metric.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-16 text-zinc-400 italic text-xs">
              {lang === 'en' ? 'No projects matches this category selection.' : 'لا توجد أي مشروعات تطابق الفئة المختارة.'}
            </div>
          )}
        </div>

        {/* Project Detailed Detail Dialog Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md animate-fade-in" id="project_detail_modal">
            <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-thin">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 transition-all cursor-pointer shadow-sm"
              >
                <X size={16} />
              </button>

              {/* Cover visual or video with Gallery Carousel */}
              {(() => {
                const mediaItems = getProjectMedia(selectedProject);
                const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0] || { type: 'image', src: selectedProject.image };
                const hasMultipleMedia = mediaItems.length > 1;
                
                return (
                  <>
                    <div className="relative aspect-[21/9] bg-zinc-100 border-b border-zinc-150 flex items-center justify-center overflow-hidden" id="active_media_viewer">
                      {activeMedia.type === 'video' ? (
                        <iframe
                          src={activeMedia.src}
                          title={getTranslation(selectedProject.title)}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : activeMedia.src.startsWith('data:') || activeMedia.src.startsWith('http') ? (
                        <img
                          src={activeMedia.src}
                          alt={getTranslation(selectedProject.title)}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full scale-110 opacity-30">
                          {renderProjectThumbnail(activeMedia.src)}
                        </div>
                      )}
                      
                      {/* Title overlay if the active media is NOT a video and has NO multiple medias */}
                      {activeMedia.type !== 'video' && !hasMultipleMedia && (
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end p-6">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-mono text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md font-semibold">
                              {getTranslation(selectedProject.category)}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight mt-2 font-sans">
                              {getTranslation(selectedProject.title)}
                            </h3>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Media Gallery Thumbnails Row */}
                    {hasMultipleMedia && (
                      <div className="flex gap-2 px-6 py-2.5 bg-zinc-50 border-b border-zinc-150 overflow-x-auto scrollbar-thin" id="gallery_thumbnails">
                        {mediaItems.map((item, idx) => {
                          const isActive = idx === activeMediaIndex;
                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveMediaIndex(idx)}
                              className={`relative w-16 sm:w-20 aspect-[16/10] rounded-lg border overflow-hidden shrink-0 transition-all cursor-pointer ${
                                isActive 
                                  ? 'border-teal-500 ring-2 ring-teal-500/20 scale-95 shadow-sm' 
                                  : 'border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'
                              }`}
                            >
                              {item.type === 'video' ? (
                                <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center relative">
                                  <span className="text-[7px] sm:text-[8px] font-mono text-zinc-400 tracking-tight leading-none">Video</span>
                                  <div className="absolute inset-0 bg-teal-500/10 flex items-center justify-center">
                                    <div className="w-5 h-5 rounded-full bg-teal-600/90 flex items-center justify-center text-white shadow">
                                      <Play size={8} className="fill-current text-white translate-x-[0.5px]" />
                                    </div>
                                  </div>
                                </div>
                              ) : item.src.startsWith('data:') || item.src.startsWith('http') ? (
                                <img src={item.src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="w-full h-full scale-110 opacity-40">
                                  {renderProjectThumbnail(item.src)}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Content body */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Show title in body if we are viewing a video OR if there are multiple media items */}
                {(() => {
                  const mediaItems = getProjectMedia(selectedProject);
                  const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0] || { type: 'image', src: selectedProject.image };
                  const hasMultipleMedia = mediaItems.length > 1;
                  
                  if (activeMedia.type === 'video' || hasMultipleMedia) {
                    return (
                      <div className="border-b border-zinc-150 pb-4">
                        <span className="text-[10px] uppercase tracking-wider font-mono text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md font-semibold">
                          {getTranslation(selectedProject.category)}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight mt-2 font-sans">
                          {getTranslation(selectedProject.title)}
                        </h3>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Performance Metrics panels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                  {selectedProject.metrics.map((metric, i) => (
                    <div key={i} className="text-center space-y-1 relative sm:after:content-[''] sm:after:absolute sm:after:right-0 sm:after:top-2 sm:after:h-8 sm:after:w-[1px] sm:after:bg-zinc-200 sm:last:after:hidden">
                      <p className="text-2xl md:text-3xl font-extrabold font-mono text-teal-600 tracking-tight">
                        {metric.value}
                      </p>
                      <p className="text-xs text-zinc-500 font-sans">
                        {getTranslation(metric.label)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Case Study Details (Problem, Solution, Results) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  
                  {/* Problem */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-bold flex items-center gap-1.5 border-b border-zinc-150 pb-1.5">
                      <ShieldAlert size={14} className="text-rose-600" />
                      {lang === 'en' ? 'The Problem' : 'المشكلة والخلل'}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans font-light">
                      {getTranslation(selectedProject.problem)}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-bold flex items-center gap-1.5 border-b border-zinc-150 pb-1.5">
                      <Cpu size={14} className="text-teal-600" />
                      {lang === 'en' ? 'The Solution' : 'الحل والهندسة الرقمية'}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans font-light">
                      {getTranslation(selectedProject.solution)}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-bold flex items-center gap-1.5 border-b border-zinc-150 pb-1.5">
                      <TrendingUp size={14} className="text-emerald-600" />
                      {lang === 'en' ? 'The Impact' : 'الأثر بالأرقام والنتائج'}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans font-light">
                      {getTranslation(selectedProject.results)}
                    </p>
                  </div>

                </div>

                {/* Modal footer controls */}
                <div className="flex justify-end pt-6 border-t border-zinc-150">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-700 transition-all cursor-pointer shadow-sm"
                  >
                    {lang === 'en' ? 'Back to Portfolio' : 'العودة للمعرض'}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
