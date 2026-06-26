import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Upload, FileText, Layout, ListPlus, Database, Award, GraduationCap, Briefcase, Sparkles, AlertCircle } from 'lucide-react';
import { PortfolioData, Project, Skill, Service, Metric, Achievement, EducationItem, CertificateItem } from '../types';

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

type TabType = 'bio' | 'achievements' | 'services' | 'skills' | 'projects' | 'edu_certs';

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
  const [activeTab, setActiveTab] = useState<TabType>('bio');

  // Bio state inputs
  const [nameEn, setNameEn] = useState(data.profile.name.en);
  const [nameAr, setNameAr] = useState(data.profile.name.ar);
  const [headlineEn, setHeadlineEn] = useState(data.profile.headline.en);
  const [headlineAr, setHeadlineAr] = useState(data.profile.headline.ar);
  const [valPropEn, setValPropEn] = useState(data.profile.valueProposition.en);
  const [valPropAr, setValPropAr] = useState(data.profile.valueProposition.ar);
  const [aboutEn, setAboutEn] = useState(data.profile.aboutMe.en);
  const [aboutAr, setAboutAr] = useState(data.profile.aboutMe.ar);
  const [phone, setPhone] = useState(data.profile.phone);
  const [email, setEmail] = useState(data.profile.email);
  const [linkedin, setLinkedin] = useState(data.profile.linkedin);
  const [avatar, setAvatar] = useState(data.profile.avatar);

  // Lists states for local edits before save
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  // Sync state with incoming props on load or tab shift
  useEffect(() => {
    if (isOpen) {
      setNameEn(data.profile.name.en);
      setNameAr(data.profile.name.ar);
      setHeadlineEn(data.profile.headline.en);
      setHeadlineAr(data.profile.headline.ar);
      setValPropEn(data.profile.valueProposition.en);
      setValPropAr(data.profile.valueProposition.ar);
      setAboutEn(data.profile.aboutMe.en);
      setAboutAr(data.profile.aboutMe.ar);
      setPhone(data.profile.phone);
      setEmail(data.profile.email);
      setLinkedin(data.profile.linkedin);
      setAvatar(data.profile.avatar);

      setAchievements([...data.achievements]);
      setSkills([...data.skills]);
      setServices([...data.services]);
      setEducation([...data.education]);
      setCertificates([...data.certificates]);
    }
  }, [isOpen, data]);

  // Skill Adding Form State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Expert' | 'Advanced' | 'Intermediate'>('Expert');
  const [newSkillCategory, setNewSkillCategory] = useState<'data' | 'bi' | 'automation' | 'quality' | 'languages'>('data');

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
  useEffect(() => {
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
        name: { en: nameEn, ar: nameAr },
        headline: { en: headlineEn, ar: headlineAr },
        valueProposition: { en: valPropEn, ar: valPropAr },
        aboutMe: { en: aboutEn, ar: aboutAr },
        avatar: avatar,
        email: email,
        phone: phone,
        linkedin: linkedin
      }
    };
    setData(updated);
    alert(lang === 'en' ? 'Profile details saved successfully!' : 'تم حفظ السيرة الذاتية ومعلومات الاتصال بنجاح!');
  };

  // Convert uploaded image to base64 data url for profile photo
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatar(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Convert uploaded image to base64 data url for project thumbnail
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

    alert(lang === 'en' ? 'Project saved successfully!' : 'تم حفظ المشروع وتحديث المعرض بنجاح!');
  };

  // Save Achievements list
  const handleSaveAchievements = () => {
    setData({
      ...data,
      achievements: achievements
    });
    alert(lang === 'en' ? 'Key achievements updated!' : 'تم حفظ الإنجازات والأرقام القياسية!');
  };

  // Add a technical skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const levelArMap = {
      'Expert': 'خبير',
      'Advanced': 'متقدم',
      'Intermediate': 'متوسط'
    };

    const newSkill: Skill = {
      id: `sk_${Date.now()}`,
      name: newSkillName.trim(),
      level: newSkillLevel,
      levelAr: levelArMap[newSkillLevel],
      category: newSkillCategory
    };

    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    setData({
      ...data,
      skills: updatedSkills
    });

    setNewSkillName('');
    alert(lang === 'en' ? 'Skill added successfully!' : 'تم إضافة المهارة الفنية الجديدة!');
  };

  // Delete a skill
  const handleDeleteSkill = (id: string) => {
    const updatedSkills = skills.filter(s => s.id !== id);
    setSkills(updatedSkills);
    setData({
      ...data,
      skills: updatedSkills
    });
  };

  // Save Service updates
  const handleSaveServices = () => {
    setData({
      ...data,
      services: services
    });
    alert(lang === 'en' ? 'Services solutions saved!' : 'تم حفظ وتحديث الخدمات بنجاح!');
  };

  // Handle service bullet point edit
  const handleEditServiceBullet = (srvIdx: number, itemIdx: number, val: string, fieldLang: 'en' | 'ar') => {
    const nextServices = [...services];
    nextServices[srvIdx].items[itemIdx][fieldLang] = val;
    setServices(nextServices);
  };

  // Add bullet point to service
  const handleAddServiceBullet = (srvIdx: number) => {
    const nextServices = [...services];
    nextServices[srvIdx].items.push({ en: 'New Service Item', ar: 'بند خدمة جديد' });
    setServices(nextServices);
  };

  // Delete bullet point from service
  const handleDeleteServiceBullet = (srvIdx: number, itemIdx: number) => {
    const nextServices = [...services];
    nextServices[srvIdx].items.splice(itemIdx, 1);
    setServices(nextServices);
  };

  // Save Education and Certs
  const handleSaveEduCerts = () => {
    setData({
      ...data,
      education: education,
      certificates: certificates
    });
    alert(lang === 'en' ? 'Education & Credentials saved!' : 'تم حفظ المؤهلات الأكاديمية والشهادات المهنية!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md animate-fade-in" id="editor_modal_wrapper">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 shrink-0">
          <div className="flex items-center gap-2">
            <Layout className="text-teal-600" size={18} />
            <h3 className="text-md sm:text-lg font-bold text-zinc-950 font-sans">
              {lang === 'en' ? 'Portfolio Management Dashboard' : 'لوحة تحكم وإدارة البورتفوليو'}
            </h3>
            <span className="text-[10px] bg-teal-50 border border-teal-200 text-teal-700 font-mono px-2.5 py-0.5 rounded-full ml-2 font-semibold">ADMIN ACTIVE</span>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsAddingProject(false);
              onClose();
            }}
            className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Tabs - Fully Expanded Scrollable Row */}
        <div className="flex overflow-x-auto border-b border-zinc-200 bg-zinc-50 p-2 text-xs shrink-0 scrollbar-thin">
          <button
            onClick={() => { setActiveTab('bio'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'bio' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <FileText size={14} />
            <span>{lang === 'en' ? 'Bio & Contact' : 'النبذة والاتصال'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('projects'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'projects' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <ListPlus size={14} />
            <span>{lang === 'en' ? 'Projects' : 'المشاريع وقصص النجاح'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('skills'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'skills' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Database size={14} />
            <span>{lang === 'en' ? 'Skills Matrix' : 'المهارات الفنية'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('services'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'services' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Sparkles size={14} />
            <span>{lang === 'en' ? 'Services' : 'الخدمات والحلول'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('achievements'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'achievements' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Briefcase size={14} />
            <span>{lang === 'en' ? 'Highlights' : 'الأرقام والإنجازات'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('edu_certs'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'edu_certs' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Award size={14} />
            <span>{lang === 'en' ? 'Education & Certs' : 'الشهادات والمؤهلات'}</span>
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* TAB 1: BIO & CONTACT */}
          {activeTab === 'bio' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_bio">
              
              <div className="p-3 bg-teal-950/25 border border-teal-800/30 text-teal-400 rounded-xl text-[11px] leading-relaxed flex items-center gap-2">
                <AlertCircle size={16} />
                <span>
                  {lang === 'en' 
                    ? 'Edit profile metadata, contact shortcuts, and portrait photo. These load instantly in the hero banner and page footer.' 
                    : 'قم بتعديل السيرة الذاتية، ومنافذ التواصل المباشر، وصورتك الشخصية. سيتم تحديثها فورًا.'}
                </span>
              </div>

              {/* Photo Upload Row */}
              <div className="bg-zinc-950/40 border border-zinc-800/60 p-4 rounded-xl space-y-3">
                <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Profile Photo (Hero & About)</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950 shrink-0">
                    {avatar ? (
                      <img src={avatar} alt="Profile Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 italic">No Photo</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-850 bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 font-semibold cursor-pointer transition-all">
                        <Upload size={12} className="text-teal-500" />
                        <span>{lang === 'en' ? 'Upload Photo' : 'رفع صورة'}</span>
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                      {avatar && (
                        <button
                          type="button"
                          onClick={() => setAvatar('')}
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                        >
                          {lang === 'en' ? 'Reset to default' : 'إعادة الافتراضي'}
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={lang === 'en' ? 'Or paste custom image URL' : 'أو الصق رابط صورة خارجي'}
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-teal-500/50 outline-none max-w-md"
                    />
                  </div>
                </div>
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
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right font-sans"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Headline / Professional Title (EN)</label>
                  <input
                    type="text"
                    value={headlineEn}
                    onChange={(e) => setHeadlineEn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">المسمى واللقب المهني (AR)</label>
                  <input
                    type="text"
                    value={headlineAr}
                    onChange={(e) => setHeadlineAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right font-sans"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-950/20 border border-zinc-800/40 p-4 rounded-xl">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Phone number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-500/50"
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
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">رسالة القيمة المضافة المحققة (AR)</label>
                  <textarea
                    rows={3}
                    value={valPropAr}
                    onChange={(e) => setValPropAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right font-sans"
                  />
                </div>
              </div>

              {/* About Me */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">About Me / Profile Summary (EN)</label>
                  <textarea
                    rows={6}
                    value={aboutEn}
                    onChange={(e) => setAboutEn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none scrollbar-thin"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">الملخص المهني الكامل وسيرة العمل (AR)</label>
                  <textarea
                    rows={6}
                    value={aboutAr}
                    onChange={(e) => setAboutAr(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none text-right scrollbar-thin font-sans"
                  />
                </div>
              </div>

              {/* Actions Footer inside Tab */}
              <div className="flex justify-end pt-4 border-t border-zinc-800/40">
                <button
                  type="button"
                  onClick={handleSaveBio}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Bio & Contact' : 'حفظ التعديلات'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_projects">
              
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
                <div>
                  <h4 className="text-sm font-bold text-white font-sans">
                    {editingProject 
                      ? (lang === 'en' ? `Editing: ${editingProject.title.en}` : `تعديل: ${editingProject.title.ar}`)
                      : isAddingProject 
                        ? (lang === 'en' ? 'Add New Project Case Study' : 'إضافة دراسة حالة مشروع جديد')
                        : (lang === 'en' ? 'Select or Create Case Study' : 'تعديل أو إضافة المشاريع')}
                  </h4>
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
                    <span className="text-xs font-semibold">{lang === 'en' ? 'Add New Project' : 'إضافة دراسة حالة لمشروع جديد'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveProject} className="space-y-6" id="editor_project_form">
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
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right font-sans"
                      />
                    </div>
                  </div>

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
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500/50 outline-none text-right font-sans"
                      />
                    </div>
                  </div>

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
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right font-sans"
                      />
                    </div>
                  </div>

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
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">The Results & Impact (EN)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.resEn}
                        onChange={(e) => setProjectForm({ ...projectForm, resEn: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">النتائج والوفر المحقق (AR)</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.resAr}
                        onChange={(e) => setProjectForm({ ...projectForm, resAr: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-teal-500/50 outline-none resize-none text-right font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-zinc-800/40">
                    <h5 className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Key Metrics Statistics (Up to 3 blocks)</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
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
                          placeholder="Label EN"
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
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white text-right outline-none font-sans"
                        />
                      </div>

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
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white text-right outline-none font-sans"
                        />
                      </div>

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
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white text-right outline-none font-sans"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-zinc-800/40">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Project Cover Image</label>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-xs text-zinc-300 font-semibold cursor-pointer select-none transition-all">
                            <Upload size={14} className="text-teal-500" />
                            <span>{lang === 'en' ? 'Upload Image File' : 'رفع ملف صورة'}</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Or paste image URL' : 'أو الصق رابط صورة خارجي'}
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

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Project Video Embed (Optional URL)</label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/embed/..."
                        value={projectForm.videoUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-teal-500/50 outline-none"
                      />
                    </div>
                  </div>

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

          {/* TAB 3: SKILLS MATRIX */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_skills">
              
              {/* Add skill form */}
              <form onSubmit={handleAddSkill} className="bg-zinc-950/40 border border-zinc-800/60 p-4 rounded-xl space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Add Technical Skill</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] text-zinc-500 font-mono">SKILL NAME (e.g. "Power Pivot")</label>
                    <input
                      type="text"
                      required
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      placeholder="Skill name"
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 font-mono">LEVEL</label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(e.target.value as any)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-teal-500/50"
                    >
                      <option value="Expert">Expert / خبير</option>
                      <option value="Advanced">Advanced / متقدم</option>
                      <option value="Intermediate">Intermediate / متوسط</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs cursor-pointer transition-all h-[36px]"
                  >
                    <Plus size={14} />
                    <span>{lang === 'en' ? 'Add Skill' : 'إضافة المهارة'}</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-mono block">CATEGORY</label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { value: 'data', label: 'Data Cleaning & ETL / تنظيف ومعالجة البيانات' },
                      { value: 'bi', label: 'BI & Modeling / ذكاء الأعمال والنمذجة' },
                      { value: 'automation', label: 'Process Automation / أتمتة العمليات' },
                      { value: 'quality', label: 'Quality & Statistics / الجودة والإحصاء' },
                      { value: 'languages', label: 'Query Languages / لغات الاستعلام والبرمجة' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setNewSkillCategory(opt.value as any)}
                        className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all ${newSkillCategory === opt.value ? 'border-teal-500 bg-teal-500/10 text-teal-400' : 'border-zinc-850 text-zinc-400 hover:text-zinc-200'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* List of skills categorized */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Current Skills Matrix ({skills.length} skills)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((s) => (
                    <div key={s.id} className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl flex items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="font-bold text-white">{s.name}</p>
                        <p className="text-[10px] text-teal-400 mt-1 font-mono uppercase">{s.level} • {s.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(s.id)}
                        className="p-1.5 rounded-md hover:bg-rose-950 hover:text-rose-400 text-zinc-500 transition-colors cursor-pointer"
                        title="Delete skill"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SERVICES SOLUTIONS */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_services">
              
              <div className="p-3 bg-teal-950/25 border border-teal-800/30 text-teal-400 rounded-xl text-[11px] leading-relaxed">
                {lang === 'en' 
                  ? 'Update the 4 core professional columns featured in your services portfolio. Manage individual bullet points in both languages.' 
                  : 'تعديل قطاعات الخدمات الأربعة المكتوبة في الصفحة. يمكنك تعديل بنود النقاط باللغتين بسهولة.'}
              </div>

              {services.map((srv, srvIdx) => (
                <div key={srv.id} className="p-5 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-zinc-850 pb-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500">SERVICE CATEGORY TITLE (EN)</span>
                      <input
                        type="text"
                        value={srv.categoryTitle.en}
                        onChange={(e) => {
                          const next = [...services];
                          next[srvIdx].categoryTitle.en = e.target.value;
                          setServices(next);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-teal-500/50 font-bold"
                      />
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-[9px] font-mono text-zinc-500">عنوان الخدمة (AR)</span>
                      <input
                        type="text"
                        value={srv.categoryTitle.ar}
                        onChange={(e) => {
                          const next = [...services];
                          next[srvIdx].categoryTitle.ar = e.target.value;
                          setServices(next);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white text-right outline-none focus:border-teal-500/50 font-bold font-sans"
                      />
                    </div>
                  </div>

                  {/* Bullet Points List */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Service Bullet Items</span>
                      <button
                        type="button"
                        onClick={() => handleAddServiceBullet(srvIdx)}
                        className="flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 font-bold cursor-pointer"
                      >
                        <Plus size={12} />
                        <span>Add Item</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {srv.items.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="grid grid-cols-12 gap-3 items-center bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                          <div className="col-span-5">
                            <input
                              type="text"
                              value={bullet.en}
                              onChange={(e) => handleEditServiceBullet(srvIdx, bulletIdx, e.target.value, 'en')}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-xs text-zinc-300 outline-none"
                            />
                          </div>
                          <div className="col-span-6">
                            <input
                              type="text"
                              value={bullet.ar}
                              onChange={(e) => handleEditServiceBullet(srvIdx, bulletIdx, e.target.value, 'ar')}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-xs text-zinc-300 text-right font-sans outline-none"
                            />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteServiceBullet(srvIdx, bulletIdx)}
                              className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-950/40 cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4 border-t border-zinc-800/40">
                <button
                  type="button"
                  onClick={handleSaveServices}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Services Solutions' : 'حفظ التعديلات'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 5: KEY HIGHLIGHTS / ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_achievements">
              
              <div className="p-3 bg-teal-950/25 border border-teal-800/30 text-teal-400 rounded-xl text-[11px] leading-relaxed">
                {lang === 'en' 
                  ? 'Edit the numerical achievements and key performance indices featured across the bottom of the hero block.' 
                  : 'تعديل الأرقام القياسية والمؤشرات المئوية البارزة أسفل الشاشة الرئيسية للتعريف السريع بإنجازاتك.'}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {achievements.map((ach, idx) => (
                  <div key={ach.id} className="p-4 bg-zinc-950/40 border border-zinc-850 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-1 text-xs font-mono text-zinc-500">0{idx + 1}</div>
                    
                    <div className="sm:col-span-5 space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500">HIGHLIGHT DESCRIPTION (EN)</span>
                      <input
                        type="text"
                        value={ach.title.en}
                        onChange={(e) => {
                          const next = [...achievements];
                          next[idx].title.en = e.target.value;
                          setAchievements(next);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="sm:col-span-5 space-y-1 text-right">
                      <span className="text-[9px] font-mono text-zinc-500">الوصف بالعربية (AR)</span>
                      <input
                        type="text"
                        value={ach.title.ar}
                        onChange={(e) => {
                          const next = [...achievements];
                          next[idx].title.ar = e.target.value;
                          setAchievements(next);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1 text-xs text-white text-right outline-none font-sans"
                      />
                    </div>

                    <div className="sm:col-span-1 space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500">ICON</span>
                      <input
                        type="text"
                        value={ach.iconName}
                        onChange={(e) => {
                          const next = [...achievements];
                          next[idx].iconName = e.target.value;
                          setAchievements(next);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white text-center font-mono outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-800/40">
                <button
                  type="button"
                  onClick={handleSaveAchievements}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Key Highlights' : 'حفظ التعديلات'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 6: EDUCATION & CERTIFICATES */}
          {activeTab === 'edu_certs' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_edu_certs">
              
              {/* Education section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold flex items-center gap-1.5">
                    <GraduationCap size={16} className="text-teal-400" />
                    <span>{lang === 'en' ? 'Academic Education' : 'المؤهلات والتعليم الأكاديمي'}</span>
                  </h4>
                </div>

                {education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-500">DEGREE TITLE (EN)</span>
                        <input
                          type="text"
                          value={edu.degree.en}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].degree.en = e.target.value;
                            setEducation(next);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-[9px] font-mono text-zinc-500">الدرجة والتخصص (AR)</span>
                        <input
                          type="text"
                          value={edu.degree.ar}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].degree.ar = e.target.value;
                            setEducation(next);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white text-right font-sans outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-500">INSTITUTION (EN)</span>
                        <input
                          type="text"
                          value={edu.institution.en}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].institution.en = e.target.value;
                            setEducation(next);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-[9px] font-mono text-zinc-500">الجامعة والكلية (AR)</span>
                        <input
                          type="text"
                          value={edu.institution.ar}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].institution.ar = e.target.value;
                            setEducation(next);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white text-right font-sans outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-500">GRADUATION YEAR</span>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].year = e.target.value;
                            setEducation(next);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificates section */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/40">
                <div className="flex justify-between items-center pb-2">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold flex items-center gap-1.5">
                    <Award size={16} className="text-teal-400" />
                    <span>{lang === 'en' ? 'Professional Credentials' : 'الشهادات والاعتمادات المهنية'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...certificates, {
                        id: `cert_${Date.now()}`,
                        name: { en: 'New Certificate', ar: 'شهادة جديدة' },
                        issuer: { en: 'Issuer Body', ar: 'الجهة المانحة' }
                      }];
                      setCertificates(next);
                    }}
                    className="flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 font-bold cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add Certificate</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {certificates.map((cert, idx) => (
                    <div key={cert.id} className="p-4 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-500">CERTIFICATION NAME (EN)</span>
                            <input
                              type="text"
                              value={cert.name.en}
                              onChange={(e) => {
                                const next = [...certificates];
                                next[idx].name.en = e.target.value;
                                setCertificates(next);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                            />
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-[9px] font-mono text-zinc-500">اسم الشهادة والاعتماد (AR)</span>
                            <input
                              type="text"
                              value={cert.name.ar}
                              onChange={(e) => {
                                const next = [...certificates];
                                next[idx].name.ar = e.target.value;
                                setCertificates(next);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white text-right font-sans outline-none"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = certificates.filter(c => c.id !== cert.id);
                            setCertificates(next);
                          }}
                          className="text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-950/40 cursor-pointer mt-5"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500">ISSUING AUTHORITY (EN)</span>
                          <input
                            type="text"
                            value={cert.issuer.en}
                            onChange={(e) => {
                              const next = [...certificates];
                              next[idx].issuer.en = e.target.value;
                              setCertificates(next);
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[9px] font-mono text-zinc-500">الجهة المانحة والناشرة (AR)</span>
                          <input
                            type="text"
                            value={cert.issuer.ar}
                            onChange={(e) => {
                              const next = [...certificates];
                              next[idx].issuer.ar = e.target.value;
                              setCertificates(next);
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white text-right font-sans outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-800/40">
                <button
                  type="button"
                  onClick={handleSaveEduCerts}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Education & Certs' : 'حفظ التعديلات'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
