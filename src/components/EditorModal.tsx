import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Upload, FileText, Layout, ListPlus, Database, Eye } from 'lucide-react';
import { PortfolioData, Project, Skill, Service, Metric } from '../types';

interface EditorModalProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  lang: 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  isAddingProject: boolean;
  setIsAddingProject: (isAdding: boolean) => void;
}

export default function EditorModal({
  data,
  setData,
  lang,
  isOpen,
  onClose,
  editingProject,
  setEditingProject,
  isAddingProject,
  setIsAddingProject
}: EditorModalProps) {
  const [activeTab, setActiveTab] = useState<'bio' | 'projects' | 'skills' | 'services'>('bio');

  // Bio state inputs
  const [nameEn, setNameEn] = useState(data.profile.name.en);
  const [nameAr, setNameAr] = useState(data.profile.name.ar);
  const [headlineEn, setHeadlineEn] = useState(data.profile.headline.en);
  const [headlineAr, setHeadlineAr] = useState(data.profile.headline.ar);
  const [valPropEn, setValPropEn] = useState(data.profile.valueProposition.en);
  const [valPropAr, setValPropAr] = useState(data.profile.valueProposition.ar);
  const [aboutEn, setAboutEn] = useState(data.profile.aboutMe.en);
  const [aboutAr, setAboutAr] = useState(data.profile.aboutMe.ar);

  // New Project Form State
  const emptyProjectForm = () => ({
    titleEn: '', titleAr: '',
    catEn: '', catAr: '',
    probEn: '', probAr: '',
    solEn: '', solAr: '',
    resEn: '', resAr: '',
    metric1Val: '', metric1LabelEn: '', metric1LabelAr: '',
    metric2Val: '', metric2LabelEn: '', metric2LabelAr: '',
    metric3Val: '', metric3LabelEn: '', metric3LabelAr: '',
    imageSrc: '', videoUrl: ''
  });

  const [projectForm, setProjectForm] = useState(emptyProjectForm());

  // Initialize form when editing a project
  React.useEffect(() => {
    if (editingProject) {
      setActiveTab('projects');
      setProjectForm({
        titleEn: editingProject.title.en,
        titleAr: editingProject.title.ar,
        catEn: editingProject.category.en,
        catAr: editingProject.category.ar,
        probEn: editingProject.problem.en,
        probAr: editingProject.problem.ar,
        solEn: editingProject.solution.en,
        solAr: editingProject.solution.ar,
        resEn: editingProject.results.en,
        resAr: editingProject.results.ar,
        metric1Val: editingProject.metrics[0]?.value || '',
        metric1LabelEn: editingProject.metrics[0]?.label.en || '',
        metric1LabelAr: editingProject.metrics[0]?.label.ar || '',
        metric2Val: editingProject.metrics[1]?.value || '',
        metric2LabelEn: editingProject.metrics[1]?.label.en || '',
        metric2LabelAr: editingProject.metrics[1]?.label.ar || '',
        metric3Val: editingProject.metrics[2]?.value || '',
        metric3LabelEn: editingProject.metrics[2]?.label.en || '',
        metric3LabelAr: editingProject.metrics[2]?.label.ar || '',
        imageSrc: editingProject.image,
        videoUrl: editingProject.videoUrl || ''
      });
    } else if (isAddingProject) {
      setActiveTab('projects');
      setProjectForm(emptyProjectForm());
    }
  }, [editingProject, isAddingProject]);

  if (!isOpen) return null;

  // Save profile info
  const handleSaveBio = () => {
    const updated = {
      ...data,
      profile: {
        ...data.profile,
        name: { en: nameEn, ar: nameAr },
        headline: { en: headlineEn, ar: headlineAr },
        valueProposition: { en: valPropEn, ar: valPropAr },
        aboutMe: { en: aboutEn, ar: aboutAr }
      }
    };
    setData(updated);
    alert(lang === 'en' ? 'Profile details saved successfully!' : 'تم حفظ السيرة الذاتية بنجاح!');
  };

  // Convert uploaded image to base64 data url
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProjectForm(prev => ({
          ...prev,
          imageSrc: event.target!.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save project (add new or update existing)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    const newMetrics: Metric[] = [
      { value: projectForm.metric1Val, label: { en: projectForm.metric1LabelEn, ar: projectForm.metric1LabelAr } },
      { value: projectForm.metric2Val, label: { en: projectForm.metric2LabelEn, ar: projectForm.metric2LabelAr } },
      { value: projectForm.metric3Val, label: { en: projectForm.metric3LabelEn, ar: projectForm.metric3LabelAr } }
    ];

    const projectData: Project = {
      id: editingProject ? editingProject.id : `proj_${Date.now()}`,
      title: { en: projectForm.titleEn, ar: projectForm.titleAr },
      category: { en: projectForm.catEn, ar: projectForm.catAr },
      problem: { en: projectForm.probEn, ar: projectForm.probAr },
      solution: { en: projectForm.solEn, ar: projectForm.solAr },
      results: { en: projectForm.resEn, ar: projectForm.resAr },
      metrics: newMetrics,
      image: projectForm.imageSrc || 'default',
      videoUrl: projectForm.videoUrl || undefined
    };

    let updatedProjects = [...data.projects];
    if (editingProject) {
      updatedProjects = updatedProjects.map(p => p.id === editingProject.id ? projectData : p);
    } else {
      updatedProjects.unshift(projectData);
    }

    setData({
      ...data,
      projects: updatedProjects
    });

    // Reset editing states
    setEditingProject(null);
    setIsAddingProject(false);
    setProjectForm(emptyProjectForm());

    alert(lang === 'en' ? 'Project saved successfully!' : 'تم حفظ المشروع وتحديث المعرض!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fade-in" id="editor_modal_wrapper">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Layout className="text-teal-400" size={18} />
            <h3 className="text-md sm:text-lg font-bold text-white font-sans">
              {lang === 'en' ? 'Portfolio Management Dashboard' : 'لوحة تحكم وإدارة البورتفوليو'}
            </h3>
            <span className="text-[10px] bg-teal-950 border border-teal-800/40 text-teal-400 font-mono px-2 py-0.5 rounded-full ml-2">ADMIN ACTIVE</span>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsAddingProject(false);
              onClose();
            }}
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-800/60 bg-zinc-950/40 p-2 text-xs">
          <button
            onClick={() => setActiveTab('bio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'bio' ? 'bg-zinc-800 text-teal-400' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <FileText size={14} />
            <span>{lang === 'en' ? 'Bio & Headline' : 'النبذة والكلمة الافتتاحية'}</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'projects' ? 'bg-zinc-800 text-teal-400' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <ListPlus size={14} />
            <span>{lang === 'en' ? 'Case Studies / Projects' : 'المشاريع وقصص النجاح'}</span>
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* TAB 1: BIO & HEADLINE */}
          {activeTab === 'bio' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_bio">
              
              {/* Note */}
              <div className="p-3 bg-teal-950/25 border border-teal-800/30 text-teal-400 rounded-xl text-[11px] leading-relaxed">
                {lang === 'en' 
                  ? 'All input fields support dual languages. Edit English and Arabic counterparts to ensure a seamless language toggle for site visitors.' 
                  : 'جميع الحقول تدعم الازدواج اللغوي. يرجى ملء البيانات باللغتين الإنجليزية والعربية لتسهيل التصفح للزوار.'}
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Display Name (EN)</label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">الاسم بالكامل (AR)</label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Headline / Role (EN)</label>
                  <input
                    type="text"
                    value={headlineEn}
                    onChange={(e) => setHeadlineEn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">المسمى الوظيفي واللقب (AR)</label>
                  <input
                    type="text"
                    value={headlineAr}
                    onChange={(e) => setHeadlineAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right"
                  />
                </div>
              </div>

              {/* Value Proposition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Value Proposition (EN)</label>
                  <textarea
                    rows={3}
                    value={valPropEn}
                    onChange={(e) => setValPropEn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">القيمة المضافة ورسالة العمل (AR)</label>
                  <textarea
                    rows={3}
                    value={valPropAr}
                    onChange={(e) => setValPropAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right"
                  />
                </div>
              </div>

              {/* About Me */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">About Me Paragraphs (EN)</label>
                  <textarea
                    rows={6}
                    value={aboutEn}
                    onChange={(e) => setAboutEn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none scrollbar-thin"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">نبذة تفصيلية عن مسيرتي وأهدافي (AR)</label>
                  <textarea
                    rows={6}
                    value={aboutAr}
                    onChange={(e) => setAboutAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none text-right scrollbar-thin"
                  />
                </div>
              </div>

              {/* Actions Footer inside Tab */}
              <div className="flex justify-end pt-4 border-t border-zinc-800/40">
                <button
                  type="button"
                  onClick={handleSaveBio}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Biography Info' : 'حفظ التغييرات'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_projects">
              
              {/* Sub-Header context */}
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
                <div>
                  <h4 className="text-sm font-bold text-white font-sans">
                    {editingProject 
                      ? (lang === 'en' ? `Editing: ${editingProject.title.en}` : `تعديل: ${editingProject.title.ar}`)
                      : isAddingProject 
                        ? (lang === 'en' ? 'Add New Project Case Study' : 'إضافة دراسة حالة مشروع جديد')
                        : (lang === 'en' ? 'Select or Create Case Study' : 'تعديل أو إضافة المشاريع')}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
                    {lang === 'en' 
                      ? 'Add high-impact descriptions highlighting: Problem, Solution, and numerical Results.' 
                      : 'أضف تفاصيل قوية تسلط الضوء على: المشكلة، الحل الذكي، والنتيجة بالأرقام ملموسة.'}
                  </p>
                </div>

                {(editingProject || isAddingProject) && (
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setIsAddingProject(false);
                    }}
                    className="text-xs text-rose-400 border border-rose-900/30 bg-rose-950/20 px-3 py-1.5 rounded-lg hover:bg-rose-900/30 transition-all cursor-pointer"
                  >
                    {lang === 'en' ? 'Cancel & List Projects' : 'إلغاء والعودة للقائمة'}
                  </button>
                )}
              </div>

              {/* LIST PROJECTS IF NOT CURRENTLY EDITING/ADDING */}
              {!editingProject && !isAddingProject ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="editor_projects_list">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="p-4 bg-zinc-950/60 border border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-zinc-100 font-sans">{proj.title[lang]}</h5>
                        <p className="text-[10px] text-zinc-500 font-sans mt-1">{proj.category[lang]}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-2 bg-zinc-900 hover:bg-teal-500 hover:text-black border border-zinc-800 text-zinc-300 rounded-lg transition-all text-xs"
                        >
                          <FileText size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(lang === 'en' ? 'Are you sure you want to delete this project?' : 'هل أنت متأكد من حذف هذا المشروع؟')) {
                              setData({ ...data, projects: data.projects.filter(p => p.id !== proj.id) });
                            }
                          }}
                          className="p-2 bg-zinc-900 hover:bg-rose-600 hover:text-white border border-zinc-850 text-zinc-300 rounded-lg transition-all text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setIsAddingProject(true)}
                    className="col-span-full py-8 border-2 border-dashed border-zinc-800 hover:border-teal-500/30 bg-zinc-950/30 hover:bg-teal-500/[0.02] rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-teal-400 transition-all cursor-pointer"
                  >
                    <Plus size={20} />
                    <span className="text-xs font-semibold">{lang === 'en' ? 'Add Another High-Impact Project' : 'إضافة دراسة حالة لمشروع جديد'}</span>
                  </button>
                </div>
              ) : (
                /* ACTUAL PROJECT FORM FOR EDITING OR ADDING */
                <form onSubmit={handleSaveProject} className="space-y-6" id="editor_project_form">
                  
                  {/* Title & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Project Title (EN)</label>
                      <input
                        type="text"
                        required
                        value={projectForm.titleEn}
                        onChange={(e) => setProjectForm({ ...projectForm, titleEn: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">عنوان المشروع (AR)</label>
                      <input
                        type="text"
                        required
                        value={projectForm.titleAr}
                        onChange={(e) => setProjectForm({ ...projectForm, titleAr: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Category (EN) - e.g. "Process Automation"</label>
                      <input
                        type="text"
                        required
                        value={projectForm.catEn}
                        onChange={(e) => setProjectForm({ ...projectForm, catEn: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">قسم وتصنيف المشروع (AR)</label>
                      <input
                        type="text"
                        required
                        value={projectForm.catAr}
                        onChange={(e) => setProjectForm({ ...projectForm, catAr: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right"
                      />
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">The Problem Statement (EN)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.probEn}
                        onChange={(e) => setProjectForm({ ...projectForm, probEn: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">توصيف المشكلة والخلل القائم (AR)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.probAr}
                        onChange={(e) => setProjectForm({ ...projectForm, probAr: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right"
                      />
                    </div>
                  </div>

                  {/* Solution Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">The Solution Provided (EN)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.solEn}
                        onChange={(e) => setProjectForm({ ...projectForm, solEn: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">الحل والمنهجية المطبقة بالتفصيل (AR)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.solAr}
                        onChange={(e) => setProjectForm({ ...projectForm, solAr: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right"
                      />
                    </div>
                  </div>

                  {/* Results Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">The Results & Impact in numbers (EN)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.resEn}
                        onChange={(e) => setProjectForm({ ...projectForm, resEn: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">النتائج والوفر المحقق بالأرقام (AR)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.resAr}
                        onChange={(e) => setProjectForm({ ...projectForm, resAr: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right"
                      />
                    </div>
                  </div>

                  {/* Metrics Blocks (Three Cards) */}
                  <div className="space-y-3 pt-3 border-t border-zinc-800/40">
                    <h5 className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Key Metrics Statistics (Up to 3 blocks)</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Metric 1 */}
                      <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500">METRIC #1</span>
                        <input
                          type="text"
                          required
                          placeholder="Value (e.g. +60%)"
                          value={projectForm.metric1Val}
                          onChange={(e) => setProjectForm({ ...projectForm, metric1Val: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-teal-400 font-bold font-mono outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Label EN (e.g. Response Speed)"
                          value={projectForm.metric1LabelEn}
                          onChange={(e) => setProjectForm({ ...projectForm, metric1LabelEn: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="العنوان بالعربية"
                          value={projectForm.metric1LabelAr}
                          onChange={(e) => setProjectForm({ ...projectForm, metric1LabelAr: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white text-right outline-none"
                        />
                      </div>

                      {/* Metric 2 */}
                      <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500">METRIC #2</span>
                        <input
                          type="text"
                          required
                          placeholder="Value (e.g. -18%)"
                          value={projectForm.metric2Val}
                          onChange={(e) => setProjectForm({ ...projectForm, metric2Val: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-teal-400 font-bold font-mono outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Label EN"
                          value={projectForm.metric2LabelEn}
                          onChange={(e) => setProjectForm({ ...projectForm, metric2LabelEn: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="العنوان بالعربية"
                          value={projectForm.metric2LabelAr}
                          onChange={(e) => setProjectForm({ ...projectForm, metric2LabelAr: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white text-right outline-none"
                        />
                      </div>

                      {/* Metric 3 */}
                      <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500">METRIC #3</span>
                        <input
                          type="text"
                          required
                          placeholder="Value (e.g. 100%)"
                          value={projectForm.metric3Val}
                          onChange={(e) => setProjectForm({ ...projectForm, metric3Val: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-teal-400 font-bold font-mono outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Label EN"
                          value={projectForm.metric3LabelEn}
                          onChange={(e) => setProjectForm({ ...projectForm, metric3LabelEn: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="العنوان بالعربية"
                          value={projectForm.metric3LabelAr}
                          onChange={(e) => setProjectForm({ ...projectForm, metric3LabelAr: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white text-right outline-none"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Media uploads (Image & Video URL) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-zinc-800/40">
                    
                    {/* Image Uploader */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Project Cover Image</label>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-xs text-zinc-300 font-semibold cursor-pointer select-none transition-all">
                            <Upload size={14} className="text-teal-500" />
                            <span>{lang === 'en' ? 'Upload Image File' : 'رفع ملف صورة'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[10px] text-zinc-500">{lang === 'en' ? 'PNG, JPG, or GIF support' : 'يدعم صيغ الصور المختلفة'}</span>
                        </div>
                        {/* Optional manual URL input */}
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Or paste external image URL' : 'أو الصق رابط صورة خارجي'}
                          value={projectForm.imageSrc.startsWith('data:') ? '' : projectForm.imageSrc}
                          onChange={(e) => setProjectForm({ ...projectForm, imageSrc: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none"
                        />
                        {projectForm.imageSrc && (
                          <div className="mt-2 relative rounded-xl border border-zinc-800 overflow-hidden aspect-[16/9] w-32 bg-zinc-950">
                            {projectForm.imageSrc.startsWith('data:') || projectForm.imageSrc.startsWith('http') ? (
                              <img src={projectForm.imageSrc} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600 italic">SVG Mockup active</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Video URL (Optional Embed) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Project Video Embed (Optional URL)</label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/embed/..."
                        value={projectForm.videoUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-teal-500/50 outline-none"
                      />
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        {lang === 'en' 
                          ? 'Paste a YouTube or Vimeo embedded player URL (e.g. https://www.youtube.com/embed/dQw4w9WgXcQ) to feature an interactive player in the details modal.' 
                          : 'الصق رابط مشغل فيديو مضمن (embed) لعرض مقاطع الفيديو وشرح المشاريع والأنظمة للزوار.'}
                      </p>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-5 border-t border-zinc-800/40">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs cursor-pointer shadow-md"
                    >
                      <Save size={14} />
                      <span>{lang === 'en' ? 'Save Project Details' : 'حفظ ونشر المشروع'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
