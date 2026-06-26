/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { defaultPortfolioData } from './data';
import { PortfolioData, Project } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import InteractiveDashboard from './components/InteractiveDashboard';
import EditorModal from './components/EditorModal';
import { FileUp, Info, Eye, Linkedin, Mail, Smartphone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);

  // Initialize Portfolio Data from localStorage or default static data
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('abdelrahman_portfolio_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }
    return defaultPortfolioData;
  });

  // Keep localStorage in sync when data changes
  useEffect(() => {
    localStorage.setItem('abdelrahman_portfolio_data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Export current portfolio state as a JSON backup file
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "abdelrahman_portfolio_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import uploaded JSON backup to restore state
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.projects && parsed.skills) {
          setPortfolioData(parsed);
          alert(lang === 'en' ? 'Portfolio data restored successfully!' : 'تم استعادة بيانات البورتفوليو بنجاح!');
        } else {
          alert(lang === 'en' ? 'Invalid portfolio backup file schema.' : 'ملف النسخة الاحتياطية غير متوافق.');
        }
      } catch (error) {
        alert(lang === 'en' ? 'Error parsing JSON file.' : 'حدث خطأ أثناء قراءة الملف.');
      }
    };
    reader.readAsText(file);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 selection:bg-teal-500/10 selection:text-teal-900">
      
      {/* Navigation Topbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenEditor={() => setIsEditorOpen(true)}
        onExportData={handleExportData}
      />

      {/* Main Body Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Hero Banner Showcase */}
        <Hero data={portfolioData} lang={lang} isAdmin={isAdmin} onOpenEditor={() => setIsEditorOpen(true)} />

        {/* Live Interactive Analytics Dashboard (Highlighting his BI expertise!) */}
        <InteractiveDashboard lang={lang} />

        {/* About, Education & Credentials */}
        <About data={portfolioData} lang={lang} />

        {/* Services & Core Focus */}
        <Services data={portfolioData} lang={lang} />

        {/* Technical Stack Matrix */}
        <Skills data={portfolioData} lang={lang} />

        {/* Dynamic Project Showcase & Case Studies */}
        <Projects
          data={portfolioData}
          setData={setPortfolioData}
          lang={lang}
          isAdmin={isAdmin}
          onOpenAddProject={() => {
            setIsAddingProject(true);
            setIsEditorOpen(true);
          }}
          onOpenEditProject={(project) => {
            setEditingProject(project);
            setIsEditorOpen(true);
          }}
        />

        {/* Quick developer note (visible only to editors or admins as a helpful tip) */}
        {isAdmin && (
          <div className="my-12 p-4 bg-white border border-zinc-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Info className="text-teal-600 shrink-0" size={16} />
              <div>
                <p className="font-bold text-zinc-900">{lang === 'en' ? 'Quick Tip: Save Changes Permanently' : 'نصيحة: حفظ التغييرات بشكل دائم'}</p>
                <p className="text-zinc-600">
                  {lang === 'en'
                    ? 'Changes are saved locally. Click "Backup JSON" to export. To deploy permanently, replace /src/data.ts contents with the exported JSON file.'
                    : 'التعديلات تحفظ في متصفحك. انقر "تصدير JSON" لحفظ نسخة، أو استبدل محتويات الملف /src/data.ts لنشرها بشكل دائم.'}
                </p>
              </div>
            </div>
            {/* Import Button */}
            <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-semibold cursor-pointer select-none transition-all text-xs shrink-0">
              <FileUp size={14} className="text-teal-600" />
              <span>{lang === 'en' ? 'Restore JSON' : 'استيراد نسخة JSON'}</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>
        )}

      </main>

      {/* Footer Branding & Contact info */}
      <footer className="border-t border-zinc-200 bg-white py-12 mt-20 text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 border border-zinc-200 font-bold text-zinc-700 text-xs">
              AS
            </div>
            <p className="font-sans text-zinc-600">
              &copy; {new Date().getFullYear()} {portfolioData.profile.name[lang]}. {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </p>
          </div>

          {/* Social and Contact Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-600 font-sans">
            <a href="mailto:abdelrahmansherief6@gmail.com" className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
              <Mail size={14} className="text-teal-600" />
              <span>{portfolioData.profile.email}</span>
            </a>
            <a href={portfolioData.profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
              <Linkedin size={14} className="text-teal-600" />
              <span>LinkedIn</span>
              <ExternalLink size={10} />
            </a>
          </div>

        </div>
      </footer>

      {/* Fully Configured Management Editor Panel */}
      <EditorModal
        data={portfolioData}
        setData={setPortfolioData}
        lang={lang}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        isAddingProject={isAddingProject}
        setIsAddingProject={setIsAddingProject}
      />

    </div>
  );
}

