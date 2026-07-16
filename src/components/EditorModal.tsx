import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Upload, FileText, Layout, ListPlus, Database, Award, GraduationCap, Briefcase, Sparkles, AlertCircle, HelpCircle, SlidersHorizontal } from 'lucide-react';
import { PortfolioData, Project, Skill, Service, Metric, Achievement, EducationItem, CertificateItem, WhyWorkWithMeItem, HighlightStat } from '../types';
import { compressBase64 } from '../utils';

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

type TabType = 'bio' | 'achievements' | 'services' | 'skills' | 'projects' | 'edu_certs' | 'why_me' | 'stats' | 'headings';

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
  const [locationEn, setLocationEn] = useState(data.profile.location?.en || 'Giza, Egypt');
  const [locationAr, setLocationAr] = useState(data.profile.location?.ar || 'الجيزة، مصر');

  // Section Headers States
  const [aboutTitleEn, setAboutTitleEn] = useState(data.profile.aboutTitle?.en || '');
  const [aboutTitleAr, setAboutTitleAr] = useState(data.profile.aboutTitle?.ar || '');
  const [aboutSubtitleEn, setAboutSubtitleEn] = useState(data.profile.aboutSubtitle?.en || '');
  const [aboutSubtitleAr, setAboutSubtitleAr] = useState(data.profile.aboutSubtitle?.ar || '');

  const [whyMeTitleEn, setWhyMeTitleEn] = useState(data.profile.whyMeTitle?.en || '');
  const [whyMeTitleAr, setWhyMeTitleAr] = useState(data.profile.whyMeTitle?.ar || '');
  const [whyMeSubtitleEn, setWhyMeSubtitleEn] = useState(data.profile.whyMeSubtitle?.en || '');
  const [whyMeSubtitleAr, setWhyMeSubtitleAr] = useState(data.profile.whyMeSubtitle?.ar || '');
  const [whyMeDescriptionEn, setWhyMeDescriptionEn] = useState(data.profile.whyMeDescription?.en || '');
  const [whyMeDescriptionAr, setWhyMeDescriptionAr] = useState(data.profile.whyMeDescription?.ar || '');

  const [servicesTitleEn, setServicesTitleEn] = useState(data.profile.servicesTitle?.en || '');
  const [servicesTitleAr, setServicesTitleAr] = useState(data.profile.servicesTitle?.ar || '');
  const [servicesSubtitleEn, setServicesSubtitleEn] = useState(data.profile.servicesSubtitle?.en || '');
  const [servicesSubtitleAr, setServicesSubtitleAr] = useState(data.profile.servicesSubtitle?.ar || '');
  const [servicesDescriptionEn, setServicesDescriptionEn] = useState(data.profile.servicesDescription?.en || '');
  const [servicesDescriptionAr, setServicesDescriptionAr] = useState(data.profile.servicesDescription?.ar || '');

  const [skillsTitleEn, setSkillsTitleEn] = useState(data.profile.skillsTitle?.en || '');
  const [skillsTitleAr, setSkillsTitleAr] = useState(data.profile.skillsTitle?.ar || '');
  const [skillsSubtitleEn, setSkillsSubtitleEn] = useState(data.profile.skillsSubtitle?.en || '');
  const [skillsSubtitleAr, setSkillsSubtitleAr] = useState(data.profile.skillsSubtitle?.ar || '');
  const [skillsDescriptionEn, setSkillsDescriptionEn] = useState(data.profile.skillsDescription?.en || '');
  const [skillsDescriptionAr, setSkillsDescriptionAr] = useState(data.profile.skillsDescription?.ar || '');

  const [projectsTitleEn, setProjectsTitleEn] = useState(data.profile.projectsTitle?.en || '');
  const [projectsTitleAr, setProjectsTitleAr] = useState(data.profile.projectsTitle?.ar || '');
  const [projectsSubtitleEn, setProjectsSubtitleEn] = useState(data.profile.projectsSubtitle?.en || '');
  const [projectsSubtitleAr, setProjectsSubtitleAr] = useState(data.profile.projectsSubtitle?.ar || '');

  const [heroOverlaySkillsEn, setHeroOverlaySkillsEn] = useState(data.profile.heroOverlaySkills?.en || '');
  const [heroOverlaySkillsAr, setHeroOverlaySkillsAr] = useState(data.profile.heroOverlaySkills?.ar || '');

  // Lists states for local edits before save
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [whyWorkWithMe, setWhyWorkWithMe] = useState<WhyWorkWithMeItem[]>([]);
  const [stats, setStats] = useState<HighlightStat[]>([]);

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
      setLocationEn(data.profile.location?.en || 'Giza, Egypt');
      setLocationAr(data.profile.location?.ar || 'الجيزة، مصر');

      setAboutTitleEn(data.profile.aboutTitle?.en || 'Bridging Industrial Expertise with Data Analytics');
      setAboutTitleAr(data.profile.aboutTitle?.ar || 'الربط بين الخبرة الصناعية العميقة وتحليل البيانات الذكية');
      setAboutSubtitleEn(data.profile.aboutSubtitle?.en || 'Professional Biography');
      setAboutSubtitleAr(data.profile.aboutSubtitle?.ar || 'السيرة الذاتية المهنية');

      setWhyMeTitleEn(data.profile.whyMeTitle?.en || 'Why Work With Me?');
      setWhyMeTitleAr(data.profile.whyMeTitle?.ar || 'لماذا تعمل معي؟');
      setWhyMeSubtitleEn(data.profile.whyMeSubtitle?.en || 'Core Value Proposition');
      setWhyMeSubtitleAr(data.profile.whyMeSubtitle?.ar || 'القيمة المضافة والشراكة');
      setWhyMeDescriptionEn(data.profile.whyMeDescription?.en || 'Delivering measurable improvements and professional results at every phase of operations.');
      setWhyMeDescriptionAr(data.profile.whyMeDescription?.ar || 'تقديم تحسينات تشغيلية ملموسة ونتائج احترافية في كل مرحلة من مراحل التشغيل.');

      setServicesTitleEn(data.profile.servicesTitle?.en || 'Specialized Professional Services');
      setServicesTitleAr(data.profile.servicesTitle?.ar || 'خدمات استشارية وتنفيذية متخصصة');
      setServicesSubtitleEn(data.profile.servicesSubtitle?.en || 'Core Solutions');
      setServicesSubtitleAr(data.profile.servicesSubtitle?.ar || 'مجالات التميز والخدمات');
      setServicesDescriptionEn(data.profile.servicesDescription?.en || 'Tailored end-to-end consulting and technical execution for industrial and commercial operations.');
      setServicesDescriptionAr(data.profile.servicesDescription?.ar || 'خدمات برمجية وتحليلية مخصصة للشركات والقطاعات الصناعية لتحسين كفاءة التشغيل اليومي.');

      setSkillsTitleEn(data.profile.skillsTitle?.en || 'Expertise & Technical Stack');
      setSkillsTitleAr(data.profile.skillsTitle?.ar || 'القدرات الفنية والبرمجية');
      setSkillsSubtitleEn(data.profile.skillsSubtitle?.en || 'Core Capabilities');
      setSkillsSubtitleAr(data.profile.skillsSubtitle?.ar || 'مصفوفة القدرات والمهارات');
      setSkillsDescriptionEn(data.profile.skillsDescription?.en || 'A breakdown of specialized software, algorithms, and engineering frameworks utilized.');
      setSkillsDescriptionAr(data.profile.skillsDescription?.ar || 'تفصيل للمهارات البرمجية والأدوات التقنية التي أتقنها لخدمة التحول الرقمي وحلول الجودة.');

      setProjectsTitleEn(data.profile.projectsTitle?.en || 'Engineering Case Studies');
      setProjectsTitleAr(data.profile.projectsTitle?.ar || 'مشاريع هندسية وقصص نجاح حقيقية');
      setProjectsSubtitleEn(data.profile.projectsSubtitle?.en || 'Interactive Portfolio');
      setProjectsSubtitleAr(data.profile.projectsSubtitle?.ar || 'معرض المشروعات والحلول المنجزة');

      setHeroOverlaySkillsEn(data.profile.heroOverlaySkills?.en || 'Power BI • SQL • Automate');
      setHeroOverlaySkillsAr(data.profile.heroOverlaySkills?.ar || 'Power BI • SQL • أتمتة');

      setAchievements([...data.achievements]);
      setSkills([...data.skills]);
      setServices([...data.services]);
      setEducation([...data.education]);
      setCertificates([...data.certificates]);
      setWhyWorkWithMe(data.whyWorkWithMe ? [...data.whyWorkWithMe] : []);
      setStats(data.stats ? [...data.stats] : [
        {
          id: "stat_1",
          value: "6+",
          suffix: { en: "Years", ar: "سنوات خبرة" },
          label: { en: "Industrial Expertise", ar: "خبرة في القطاع الصناعي" },
          iconName: "Award"
        },
        {
          id: "stat_2",
          value: "95%",
          suffix: { en: "", ar: "" },
          label: { en: "Lab Utilization (from 70%)", ar: "استغلال المختبرات (من 70%)" },
          iconName: "TrendingUp"
        },
        {
          id: "stat_3",
          value: "0",
          suffix: { en: "%", ar: "%" },
          label: { en: "Ledger Discrepancies", ar: "نسبة الفروقات التشغيلية" },
          iconName: "Cpu"
        },
        {
          id: "stat_4",
          value: "100%",
          suffix: { en: "", ar: "" },
          label: { en: "Digital Shop floor Adoption", ar: "الاعتماد الرقمي للعمال" },
          iconName: "Database"
        }
      ]);
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
    imageSrc: '', videoUrl: '',
    images: [] as string[],
    videoUrls: [] as string[]
  });

  const [projectForm, setProjectForm] = useState(emptyProjectForm());
  const [newAddImageUrl, setNewAddImageUrl] = useState('');
  const [newAddVideoUrl, setNewAddVideoUrl] = useState('');

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
        videoUrl: editingProject.videoUrl || '',
        images: editingProject.images || [],
        videoUrls: editingProject.videoUrls || []
      });
      setNewAddImageUrl('');
      setNewAddVideoUrl('');
    } else if (isAddingProject) {
      setActiveTab('projects');
      setProjectForm(emptyProjectForm());
      setNewAddImageUrl('');
      setNewAddVideoUrl('');
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
        linkedin: linkedin,
        location: { en: locationEn, ar: locationAr }
      }
    };
    setData(updated);
    alert(lang === 'en' ? 'Profile details saved successfully!' : 'تم حفظ السيرة الذاتية ومعلومات الاتصال بنجاح!');
  };

  // Save Section Headings and Custom Subtitles
  const handleSaveHeadings = () => {
    const updated = {
      ...data,
      profile: {
        ...data.profile,
        aboutTitle: { en: aboutTitleEn, ar: aboutTitleAr },
        aboutSubtitle: { en: aboutSubtitleEn, ar: aboutSubtitleAr },
        whyMeTitle: { en: whyMeTitleEn, ar: whyMeTitleAr },
        whyMeSubtitle: { en: whyMeSubtitleEn, ar: whyMeSubtitleAr },
        whyMeDescription: { en: whyMeDescriptionEn, ar: whyMeDescriptionAr },
        servicesTitle: { en: servicesTitleEn, ar: servicesTitleAr },
        servicesSubtitle: { en: servicesSubtitleEn, ar: servicesSubtitleAr },
        servicesDescription: { en: servicesDescriptionEn, ar: servicesDescriptionAr },
        skillsTitle: { en: skillsTitleEn, ar: skillsTitleAr },
        skillsSubtitle: { en: skillsSubtitleEn, ar: skillsSubtitleAr },
        skillsDescription: { en: skillsDescriptionEn, ar: skillsDescriptionAr },
        projectsTitle: { en: projectsTitleEn, ar: projectsTitleAr },
        projectsSubtitle: { en: projectsSubtitleEn, ar: projectsSubtitleAr },
        heroOverlaySkills: { en: heroOverlaySkillsEn, ar: heroOverlaySkillsAr }
      }
    };
    setData(updated);
    alert(lang === 'en' ? 'Section headings saved successfully!' : 'تم حفظ عناوين وأوصاف الأقسام بنجاح!');
  };

  // Save Why Work With Me list
  const handleSaveWhyWorkWithMe = () => {
    setData({
      ...data,
      whyWorkWithMe: whyWorkWithMe
    });
    alert(lang === 'en' ? 'Why Me section updated successfully!' : 'تم حفظ قسم "لماذا أنا؟" بنجاح!');
  };

  // Save Highlight Stats list
  const handleSaveStats = () => {
    setData({
      ...data,
      stats: stats
    });
    alert(lang === 'en' ? 'Highlight stats updated successfully!' : 'تم حفظ إحصائيات الهيرو بنجاح!');
  };

  // Convert uploaded image to base64 data url for profile photo
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const compressed = await compressBase64(event.target.result as string, 500, 600, 0.75);
        setAvatar(compressed);
      }
    };
    reader.readAsDataURL(file);
  };

  // Convert uploaded image to base64 data url for project thumbnail
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const compressed = await compressBase64(event.target.result as string, 800, 600, 0.7);
        setProjectForm(prev => ({
          ...prev,
          imageSrc: compressed
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Convert uploaded image to base64 data url for multiple additional images
  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const compressed = await compressBase64(event.target.result as string, 800, 600, 0.7);
          setProjectForm(prev => ({
            ...prev,
            images: [...(prev.images || []), compressed]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset file input so same file can be selected again
    e.target.value = '';
  };

  const handleAddProjectImage = (url: string) => {
    if (!url.trim()) return;
    setProjectForm(prev => ({
      ...prev,
      images: [...(prev.images || []), url.trim()]
    }));
  };

  const handleRemoveProjectImage = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddProjectVideo = (url: string) => {
    if (!url.trim()) return;
    setProjectForm(prev => ({
      ...prev,
      videoUrls: [...(prev.videoUrls || []), url.trim()]
    }));
  };

  const handleRemoveProjectVideo = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      videoUrls: (prev.videoUrls || []).filter((_, i) => i !== index)
    }));
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
      videoUrl: projectForm.videoUrl || undefined,
      images: projectForm.images,
      videoUrls: projectForm.videoUrls
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

          <button
            onClick={() => { setActiveTab('why_me'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'why_me' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <HelpCircle size={14} />
            <span>{lang === 'en' ? 'Why Me' : 'لماذا أنا'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('stats'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'stats' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Briefcase size={14} />
            <span>{lang === 'en' ? 'Hero Stats' : 'إحصائيات الهيرو'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('headings'); setEditingProject(null); setIsAddingProject(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${activeTab === 'headings' ? 'bg-white border border-zinc-200 text-teal-700 font-semibold shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <SlidersHorizontal size={14} />
            <span>{lang === 'en' ? 'Section Headings' : 'عناوين الأقسام والمسميات'}</span>
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* TAB 1: BIO & CONTACT */}
          {activeTab === 'bio' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_bio">
              
              <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-[11px] leading-relaxed flex items-center gap-2 font-sans font-medium">
                <AlertCircle size={16} className="text-teal-600 shrink-0" />
                <span>
                  {lang === 'en' 
                    ? 'Edit profile metadata, contact shortcuts, and portrait photo. These load instantly in the hero banner and page footer.' 
                    : 'قم بتعديل السيرة الذاتية، ومنافذ التواصل المباشر، وصورتك الشخصية. سيتم تحديثها فورًا.'}
                </span>
              </div>

              {/* Photo Upload Row */}
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-3">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Profile Photo (Hero & About)</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="h-16 w-16 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-100 shrink-0 shadow-inner flex items-center justify-center">
                    {avatar ? (
                      <img src={avatar} alt="Profile Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400 italic font-medium">No Photo</div>
                    )}
                  </div>
                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex items-center gap-3 flex-wrap">
                      <label className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs text-zinc-700 font-semibold cursor-pointer transition-all shadow-sm">
                        <Upload size={12} className="text-teal-600" />
                        <span>{lang === 'en' ? 'Upload Photo' : 'رفع صورة'}</span>
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                      {avatar && (
                        <button
                          type="button"
                          onClick={() => setAvatar('')}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
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
                      className="w-full bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none max-w-md shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Display Name (EN)</label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">الاسم بالكامل (AR)</label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none text-right font-sans shadow-sm"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Headline / Professional Title (EN)</label>
                  <input
                    type="text"
                    value={headlineEn}
                    onChange={(e) => setHeadlineEn(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">المسمى واللقب المهني (AR)</label>
                  <input
                    type="text"
                    value={headlineAr}
                    onChange={(e) => setHeadlineAr(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none text-right font-sans shadow-sm"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 border border-zinc-200 p-4 rounded-xl shadow-sm">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50 shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Phone number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50 shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50 shadow-sm"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Location (EN)</label>
                  <input
                    type="text"
                    value={locationEn}
                    onChange={(e) => setLocationEn(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">الموقع / المدينة (AR)</label>
                  <input
                    type="text"
                    value={locationAr}
                    onChange={(e) => setLocationAr(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 outline-none text-right font-sans shadow-sm"
                  />
                </div>
              </div>

              {/* Value Proposition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Value Proposition (EN)</label>
                  <textarea
                    rows={3}
                    value={valPropEn}
                    onChange={(e) => setValPropEn(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:border-teal-500/50 outline-none resize-none shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">رسالة القيمة المضافة المحققة (AR)</label>
                  <textarea
                    rows={3}
                    value={valPropAr}
                    onChange={(e) => setValPropAr(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:border-teal-500/50 outline-none resize-none text-right font-sans shadow-sm"
                  />
                </div>
              </div>

              {/* About Me */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">About Me / Profile Summary (EN)</label>
                  <textarea
                    rows={6}
                    value={aboutEn}
                    onChange={(e) => setAboutEn(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:border-teal-500/50 outline-none scrollbar-thin shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">الملخص المهني الكامل وسيرة العمل (AR)</label>
                  <textarea
                    rows={6}
                    value={aboutAr}
                    onChange={(e) => setAboutAr(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:border-teal-500/50 outline-none text-right scrollbar-thin font-sans shadow-sm"
                  />
                </div>
              </div>

              {/* Actions Footer inside Tab */}
              <div className="flex justify-end pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={handleSaveBio}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
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

                  {/* MULTI-MEDIA GALLERY SECTION */}
                  <div className="space-y-4 pt-4 border-t border-zinc-200">
                    <div>
                      <h5 className="text-[12px] font-sans font-bold text-zinc-800 uppercase tracking-tight">
                        {lang === 'en' ? 'Additional Media Gallery (Optional)' : 'معرض وسائط إضافي للمشروع (اختياري)'}
                      </h5>
                      <p className="text-[10px] text-zinc-500">
                        {lang === 'en' 
                          ? 'Add multiple images and videos to make this project case study highly rich.' 
                          : 'يمكنك إضافة صور وفيديوهات إضافية متعددة لجعل دراسة الحالة تفاعلية وغنية.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* MULTIPLE IMAGES PANEL */}
                      <div className="space-y-3 bg-zinc-50 border border-zinc-200 p-4 rounded-xl shadow-sm">
                        <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider font-bold block">
                          {lang === 'en' ? 'Additional Images' : 'صور إضافية'}
                        </label>
                        
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-[11px] text-zinc-700 font-semibold cursor-pointer select-none transition-all shadow-sm shrink-0">
                              <Upload size={12} className="text-teal-600" />
                              <span>{lang === 'en' ? 'Upload' : 'رفع ملف'}</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                multiple 
                                onChange={handleAdditionalImageUpload} 
                                className="hidden" 
                              />
                            </label>
                            
                            <div className="flex-1 flex gap-1">
                              <input
                                type="text"
                                placeholder={lang === 'en' ? 'Or paste custom image URL' : 'أو الصق رابط صورة إضافية'}
                                value={newAddImageUrl}
                                onChange={(e) => setNewAddImageUrl(e.target.value)}
                                className="flex-1 bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-800 focus:border-teal-500/50 outline-none shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newAddImageUrl.trim()) {
                                    handleAddProjectImage(newAddImageUrl);
                                    setNewAddImageUrl('');
                                  }
                                }}
                                className="p-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-sm"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* List of images */}
                        {projectForm.images && projectForm.images.length > 0 ? (
                          <div className="grid grid-cols-4 gap-2 max-h-[160px] overflow-y-auto p-1.5 border border-zinc-200 bg-white rounded-lg scrollbar-thin">
                            {projectForm.images.map((img, idx) => (
                              <div key={idx} className="relative aspect-[4/3] rounded-md border border-zinc-200 overflow-hidden bg-zinc-100 group">
                                <img src={img} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProjectImage(idx)}
                                  className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                  title={lang === 'en' ? 'Delete' : 'حذف'}
                                >
                                  <Trash2 size={12} className="text-white hover:scale-110 transition-transform" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 border border-dashed border-zinc-250 bg-white rounded-lg text-[10px] text-zinc-400 italic">
                            {lang === 'en' ? 'No additional images added.' : 'لم يتم إضافة صور إضافية بعد.'}
                          </div>
                        )}
                      </div>

                      {/* MULTIPLE VIDEOS PANEL */}
                      <div className="space-y-3 bg-zinc-50 border border-zinc-200 p-4 rounded-xl shadow-sm">
                        <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider font-bold block">
                          {lang === 'en' ? 'Additional Video Embeds' : 'روابط فيديو إضافية'}
                        </label>

                        <div className="flex gap-1">
                          <input
                            type="url"
                            placeholder="https://www.youtube.com/embed/..."
                            value={newAddVideoUrl}
                            onChange={(e) => setNewAddVideoUrl(e.target.value)}
                            className="flex-1 bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-800 focus:border-teal-500/50 outline-none shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newAddVideoUrl.trim()) {
                                handleAddProjectVideo(newAddVideoUrl);
                                setNewAddVideoUrl('');
                              }
                            }}
                            className="p-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-sm"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* List of videos */}
                        {projectForm.videoUrls && projectForm.videoUrls.length > 0 ? (
                          <div className="space-y-1.5 max-h-[160px] overflow-y-auto p-1 border border-zinc-200 bg-white rounded-lg scrollbar-thin">
                            {projectForm.videoUrls.map((vid, idx) => (
                              <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-zinc-50 border border-zinc-150 rounded-lg text-xs">
                                <span className="font-mono text-[9px] text-zinc-500 truncate flex-1">{vid}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProjectVideo(idx)}
                                  className="p-1 hover:bg-rose-50 text-rose-600 rounded-md transition-all shrink-0 cursor-pointer"
                                  title={lang === 'en' ? 'Delete' : 'حذف'}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 border border-dashed border-zinc-250 bg-white rounded-lg text-[10px] text-zinc-400 italic">
                            {lang === 'en' ? 'No additional video embeds added.' : 'لم يتم إضافة فيديوهات إضافية بعد.'}
                          </div>
                        )}
                      </div>
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

          {/* TAB 7: WHY ME? */}
          {activeTab === 'why_me' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_why_me">
              <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-[11px] flex items-center gap-2 font-sans font-medium">
                <AlertCircle size={16} className="text-teal-600 shrink-0" />
                <span>
                  {lang === 'en' 
                    ? 'Edit the "Why Work With Me?" section blocks displayed in the About section.' 
                    : 'قم بتعديل كتل قسم "لماذا أنا؟" المعروضة في صفحة النبذة التعريفية.'}
                </span>
              </div>

              <div className="space-y-4">
                {whyWorkWithMe.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">TITLE (EN)</label>
                        <input
                          type="text"
                          value={item.title.en}
                          onChange={(e) => {
                            const next = [...whyWorkWithMe];
                            next[idx].title.en = e.target.value;
                            setWhyWorkWithMe(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">العنوان (AR)</label>
                        <input
                          type="text"
                          value={item.title.ar}
                          onChange={(e) => {
                            const next = [...whyWorkWithMe];
                            next[idx].title.ar = e.target.value;
                            setWhyWorkWithMe(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">DESCRIPTION (EN)</label>
                        <textarea
                          rows={2}
                          value={item.description.en}
                          onChange={(e) => {
                            const next = [...whyWorkWithMe];
                            next[idx].description.en = e.target.value;
                            setWhyWorkWithMe(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-800 outline-none resize-none focus:border-teal-500/50"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">الوصف (AR)</label>
                        <textarea
                          rows={2}
                          value={item.description.ar}
                          onChange={(e) => {
                            const next = [...whyWorkWithMe];
                            next[idx].description.ar = e.target.value;
                            setWhyWorkWithMe(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-800 text-right font-sans outline-none resize-none focus:border-teal-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Icon Name (lucide-react, e.g. Binary, Zap, Cpu, LayoutDashboard)</label>
                      <input
                        type="text"
                        value={item.iconName}
                        onChange={(e) => {
                          const next = [...whyWorkWithMe];
                          next[idx].iconName = e.target.value;
                          setWhyWorkWithMe(next);
                        }}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={handleSaveWhyWorkWithMe}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Why Me Block' : 'حفظ التغييرات'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: HIGHLIGHT STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_stats">
              <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-[11px] flex items-center gap-2 font-sans font-medium">
                <AlertCircle size={16} className="text-teal-600 shrink-0" />
                <span>
                  {lang === 'en' 
                    ? 'Edit the 4 main highlight stats cards that appear on the hero section.' 
                    : 'قم بتعديل كروت الإحصائيات الأربعة الرئيسية المعروضة في واجهة الموقع (الهيرو).'}
                </span>
              </div>

              <div className="space-y-4">
                {stats.map((stat, idx) => (
                  <div key={stat.id || idx} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">STAT VALUE (e.g. 6+, 95%)</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const next = [...stats];
                            next[idx].value = e.target.value;
                            setStats(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">SUFFIX EN</label>
                        <input
                          type="text"
                          value={stat.suffix.en}
                          onChange={(e) => {
                            const next = [...stats];
                            next[idx].suffix.en = e.target.value;
                            setStats(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">اللاحقة AR</label>
                        <input
                          type="text"
                          value={stat.suffix.ar}
                          onChange={(e) => {
                            const next = [...stats];
                            next[idx].suffix.ar = e.target.value;
                            setStats(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">LABEL (EN)</label>
                        <input
                          type="text"
                          value={stat.label.en}
                          onChange={(e) => {
                            const next = [...stats];
                            next[idx].label.en = e.target.value;
                            setStats(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">العنوان AR</label>
                        <input
                          type="text"
                          value={stat.label.ar}
                          onChange={(e) => {
                            const next = [...stats];
                            next[idx].label.ar = e.target.value;
                            setStats(next);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Icon Name (Award, TrendingUp, Cpu, Database)</label>
                      <input
                        type="text"
                        value={stat.iconName}
                        onChange={(e) => {
                          const next = [...stats];
                          next[idx].iconName = e.target.value;
                          setStats(next);
                        }}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={handleSaveStats}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save Stats Block' : 'حفظ التغييرات'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: SECTION HEADINGS & CUSTOM LABELS */}
          {activeTab === 'headings' && (
            <div className="space-y-6 animate-fade-in" id="edit_tab_headings">
              <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-[11px] flex items-center gap-2 font-sans font-medium">
                <AlertCircle size={16} className="text-teal-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Fully customize every single heading, subtitle, description, and status tag on the home page.'
                    : 'قم بتخصيص كل عنوان رئيسي وفرعي ووصف وجمل توضيحية في جميع أقسام الموقع بالكامل.'}
                </span>
              </div>

              {/* 1. Hero Overlay Badge */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider font-sans">
                  {lang === 'en' ? '1. Hero Portrait Floating Badge' : '1. الشارة العائمة على صورة الهيرو'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Skills Badge Text (EN)</label>
                    <input
                      type="text"
                      value={heroOverlaySkillsEn}
                      onChange={(e) => setHeroOverlaySkillsEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">نص الشارة العائمة (AR)</label>
                    <input
                      type="text"
                      value={heroOverlaySkillsAr}
                      onChange={(e) => setHeroOverlaySkillsAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* 2. About Section Headings */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider font-sans">
                  {lang === 'en' ? '2. About Me Section Headings' : '2. عناوين قسم "عني"'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Subtitle (EN)</label>
                    <input
                      type="text"
                      value={aboutSubtitleEn}
                      onChange={(e) => setAboutSubtitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الفرعي للقسم (AR)</label>
                    <input
                      type="text"
                      value={aboutSubtitleAr}
                      onChange={(e) => setAboutSubtitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Main Title (EN)</label>
                    <input
                      type="text"
                      value={aboutTitleEn}
                      onChange={(e) => setAboutTitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الرئيسي للقسم (AR)</label>
                    <input
                      type="text"
                      value={aboutTitleAr}
                      onChange={(e) => setAboutTitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Why Me Section Headings */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider font-sans">
                  {lang === 'en' ? '3. "Why Work With Me?" Headings' : '3. عناوين قسم "لماذا تعمل معي؟"'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Subtitle (EN)</label>
                    <input
                      type="text"
                      value={whyMeSubtitleEn}
                      onChange={(e) => setWhyMeSubtitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الفرعي للقسم (AR)</label>
                    <input
                      type="text"
                      value={whyMeSubtitleAr}
                      onChange={(e) => setWhyMeSubtitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Main Title (EN)</label>
                    <input
                      type="text"
                      value={whyMeTitleEn}
                      onChange={(e) => setWhyMeTitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الرئيسي للقسم (AR)</label>
                    <input
                      type="text"
                      value={whyMeTitleAr}
                      onChange={(e) => setWhyMeTitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Description (EN)</label>
                    <textarea
                      rows={2}
                      value={whyMeDescriptionEn}
                      onChange={(e) => setWhyMeDescriptionEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">وصف القسم (AR)</label>
                    <textarea
                      rows={2}
                      value={whyMeDescriptionAr}
                      onChange={(e) => setWhyMeDescriptionAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Services Section Headings */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider font-sans">
                  {lang === 'en' ? '4. Services Section Headings' : '4. عناوين قسم "الخدمات والاستشارات"'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Subtitle (EN)</label>
                    <input
                      type="text"
                      value={servicesSubtitleEn}
                      onChange={(e) => setServicesSubtitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الفرعي للقسم (AR)</label>
                    <input
                      type="text"
                      value={servicesSubtitleAr}
                      onChange={(e) => setServicesSubtitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Main Title (EN)</label>
                    <input
                      type="text"
                      value={servicesTitleEn}
                      onChange={(e) => setServicesTitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الرئيسي للقسم (AR)</label>
                    <input
                      type="text"
                      value={servicesTitleAr}
                      onChange={(e) => setServicesTitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Description (EN)</label>
                    <textarea
                      rows={2}
                      value={servicesDescriptionEn}
                      onChange={(e) => setServicesDescriptionEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">وصف القسم (AR)</label>
                    <textarea
                      rows={2}
                      value={servicesDescriptionAr}
                      onChange={(e) => setServicesDescriptionAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Skills Section Headings */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider font-sans">
                  {lang === 'en' ? '5. Skills Section Headings' : '5. عناوين قسم "المهارات الفنية"'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Subtitle (EN)</label>
                    <input
                      type="text"
                      value={skillsSubtitleEn}
                      onChange={(e) => setSkillsSubtitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الفرعي للقسم (AR)</label>
                    <input
                      type="text"
                      value={skillsSubtitleAr}
                      onChange={(e) => setSkillsSubtitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Main Title (EN)</label>
                    <input
                      type="text"
                      value={skillsTitleEn}
                      onChange={(e) => setSkillsTitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الرئيسي للقسم (AR)</label>
                    <input
                      type="text"
                      value={skillsTitleAr}
                      onChange={(e) => setSkillsTitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Description (EN)</label>
                    <textarea
                      rows={2}
                      value={skillsDescriptionEn}
                      onChange={(e) => setSkillsDescriptionEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">وصف القسم (AR)</label>
                    <textarea
                      rows={2}
                      value={skillsDescriptionAr}
                      onChange={(e) => setSkillsDescriptionAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Projects Section Headings */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider font-sans">
                  {lang === 'en' ? '6. Projects Portfolio Headings' : '6. عناوين معرض المشروعات'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Section Subtitle (EN)</label>
                    <input
                      type="text"
                      value={projectsSubtitleEn}
                      onChange={(e) => setProjectsSubtitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الفرعي للقسم (AR)</label>
                    <input
                      type="text"
                      value={projectsSubtitleAr}
                      onChange={(e) => setProjectsSubtitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Main Title (EN)</label>
                    <input
                      type="text"
                      value={projectsTitleEn}
                      onChange={(e) => setProjectsTitleEn(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 outline-none focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">العنوان الرئيسي للقسم (AR)</label>
                    <input
                      type="text"
                      value={projectsTitleAr}
                      onChange={(e) => setProjectsTitleAr(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 text-right font-sans outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={handleSaveHeadings}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  <Save size={14} />
                  <span>{lang === 'en' ? 'Save All Headings' : 'حفظ جميع العناوين'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
