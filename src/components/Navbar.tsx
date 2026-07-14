import React, { useState } from 'react';
import { Globe, Settings, Lock, Unlock, Mail, FileDown, RefreshCw } from 'lucide-react';
import { PortfolioData, BilingualText } from '../types';

interface NavbarProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onOpenEditor: () => void;
  onExportData: () => void;
  onResetToDefault: () => void;
}

export default function Navbar({
  data,
  lang,
  setLang,
  isAdmin,
  setIsAdmin,
  onOpenEditor,
  onExportData,
  onResetToDefault
}: NavbarProps) {
  const [showAdminToast, setShowAdminToast] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const toggleAdmin = () => {
    const nextState = !isAdmin;
    setIsAdmin(nextState);
    if (nextState) {
      setShowAdminToast(true);
      setTimeout(() => setShowAdminToast(false), 3000);
    }
  };

  const navLinks = [
    { label: { en: 'About', ar: 'من أنا' }, href: '#about' },
    { label: { en: 'Services', ar: 'الخدمات' }, href: '#services' },
    { label: { en: 'Skills', ar: 'المهارات' }, href: '#skills' },
    { label: { en: 'Projects', ar: 'المشاريع' }, href: '#projects' },
    { label: { en: 'Why Me?', ar: 'لماذا أنا؟' }, href: '#why-me' },
  ];

  const profile = data.profile;
  const initials = profile.name.en
    ? profile.name.en.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AS';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 font-extrabold text-white font-sans text-xs tracking-wider shadow-lg shadow-teal-600/10 group-hover:shadow-teal-600/30 transition-all">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xs font-bold tracking-tight text-zinc-900 hover:text-teal-600 transition-colors leading-none">
              {profile.name[lang]}
            </span>
            <span className="text-[9px] font-mono text-zinc-500 mt-0.5 leading-none max-w-[150px] sm:max-w-[250px] truncate">
              {profile.headline[lang]}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Resume Pill Button */}
          <a
            href="#about"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 text-[11px] font-semibold text-zinc-700 hover:text-zinc-900 hover:border-zinc-350 transition-all"
          >
            <span>{lang === 'en' ? 'Resume ↗' : 'السيرة الذاتية ↗'}</span>
          </a>

          {/* Export Data Button */}
          <button
            onClick={onExportData}
            title={lang === 'en' ? 'Backup & Export Portfolio (JSON)' : 'نسخ احتياطي وتصدير البيانات (JSON)'}
            className="flex items-center gap-1 text-[11px] font-mono px-2 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-800 hover:border-zinc-300 transition-all cursor-pointer"
          >
            <FileDown size={14} className="text-teal-600" />
            <span className="hidden lg:inline">{lang === 'en' ? 'Backup JSON' : 'تصدير JSON'}</span>
          </button>

          {/* Reset/Sync with Code Button */}
          <button
            onClick={onResetToDefault}
            title={lang === 'en' ? 'Reset to Latest Code Data' : 'التحديث لأحدث بيانات في الكود'}
            className="flex items-center gap-1 text-[11px] font-mono px-2 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-800 hover:border-zinc-300 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className="text-teal-600 animate-hover-spin" />
            <span className="hidden lg:inline">{lang === 'en' ? 'Sync Code' : 'تحديث للكود'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:border-teal-500/50 hover:bg-zinc-50 text-zinc-700 transition-all cursor-pointer font-sans"
          >
            <Globe size={14} className="text-teal-600" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Admin / Editor Switch */}
          <button
            onClick={toggleAdmin}
            title={isAdmin ? (lang === 'en' ? 'Lock Editor' : 'قفل التعديل') : (lang === 'en' ? 'Unlock Editor' : 'فتح وضع التعديل')}
            className={`flex items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
              isAdmin 
                ? 'bg-teal-500/10 border-teal-500 text-teal-600' 
                : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300'
            }`}
          >
            {isAdmin ? <Unlock size={14} /> : <Lock size={14} />}
          </button>

          {/* Manage Button (only visible when admin is active) */}
          {isAdmin && (
            <button
              onClick={onOpenEditor}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-all shadow-md shadow-teal-600/10 cursor-pointer animate-pulse"
            >
              <Settings size={14} />
              <span>{lang === 'en' ? 'Manage' : 'تعديل المحتوى'}</span>
            </button>
          )}

          {/* Email Shortcut */}
          <a
            href={`mailto:${profile.email}`}
            className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all"
            title={lang === 'en' ? 'Contact Email' : 'البريد الإلكتروني'}
          >
            <Mail size={14} />
          </a>
        </div>
      </div>

      {/* Admin Mode Floating Notification */}
      {showAdminToast && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl border border-teal-500/30 bg-zinc-950 p-4 shadow-2xl shadow-teal-500/10 animate-slide-up">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-500 text-black">
            <Unlock size={12} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">{lang === 'en' ? 'Editor Mode Activated' : 'تم تفعيل وضع التعديل المباشر'}</p>
            <p className="text-[11px] text-zinc-400">
              {lang === 'en' 
                ? 'You can now add, edit, or remove projects, skills, and bio. Save locally!' 
                : 'يمكنك الآن إضافة أو تعديل أو حذف المشاريع والبيانات، وحفظها محليًا!'}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
