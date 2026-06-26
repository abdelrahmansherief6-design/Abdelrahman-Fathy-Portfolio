import React, { useState } from 'react';
import { Globe, Settings, Lock, Unlock, Mail, FileDown } from 'lucide-react';
import { BilingualText } from '../types';

interface NavbarProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onOpenEditor: () => void;
  onExportData: () => void;
}

export default function Navbar({
  lang,
  setLang,
  isAdmin,
  setIsAdmin,
  onOpenEditor,
  onExportData
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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Name */}
        <a href="#hero" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 font-bold text-black font-sans text-base">
            AF
          </div>
          <span className="hidden sm:inline font-sans text-sm font-bold tracking-tight text-white hover:text-teal-400 transition-colors">
            {lang === 'en' ? 'A. Fathy Sherief' : 'أ. فتحي شريف'}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Export Data Button */}
          <button
            onClick={onExportData}
            title={lang === 'en' ? 'Backup & Export Portfolio (JSON)' : 'نسخ احتياطي وتصدير البيانات (JSON)'}
            className="flex items-center gap-1 text-[11px] font-mono px-2 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all"
          >
            <FileDown size={14} className="text-teal-500" />
            <span className="hidden lg:inline">{lang === 'en' ? 'Backup JSON' : 'تصدير JSON'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-teal-500/50 hover:bg-zinc-900/60 text-zinc-300 transition-all cursor-pointer font-sans"
          >
            <Globe size={14} className="text-teal-400" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Admin / Editor Switch */}
          <button
            onClick={toggleAdmin}
            title={isAdmin ? (lang === 'en' ? 'Lock Editor' : 'قفل التعديل') : (lang === 'en' ? 'Unlock Editor' : 'فتح وضع التعديل')}
            className={`flex items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
              isAdmin 
                ? 'bg-teal-500/10 border-teal-500 text-teal-400' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {isAdmin ? <Unlock size={14} /> : <Lock size={14} />}
          </button>

          {/* Manage Button (only visible when admin is active) */}
          {isAdmin && (
            <button
              onClick={onOpenEditor}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-semibold transition-all shadow-md shadow-teal-500/10 cursor-pointer animate-pulse"
            >
              <Settings size={14} />
              <span>{lang === 'en' ? 'Manage' : 'تعديل المحتوى'}</span>
            </button>
          )}

          {/* Email Shortcut */}
          <a
            href="mailto:abdelrahmansherief6@gmail.com"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
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
