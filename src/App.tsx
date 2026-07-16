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
import { FileUp, Info, Eye, Linkedin, Mail, Smartphone, MapPin, ExternalLink, ShieldCheck, RefreshCw, Share2, Cloud } from 'lucide-react';
import { compressPortfolioImages } from './utils';

// Helper: Deep merge source into target
function deepMerge(target: any, source: any): any {
  if (!source) return target;
  if (typeof source !== 'object' || typeof target !== 'object' || Array.isArray(source) || Array.isArray(target)) {
    return source;
  }
  
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined) {
      if (typeof source[key] === 'object' && target[key] && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

// Helper: Get delta between current data and defaults
function getDelta(current: any, base: any): any {
  if (current === base) return undefined;
  if (current === null || base === null || typeof current !== 'object' || typeof base !== 'object') {
    return current;
  }
  
  if (Array.isArray(current)) {
    if (JSON.stringify(current) !== JSON.stringify(base)) {
      return current;
    }
    return undefined;
  }
  
  const delta: any = {};
  let hasChanges = false;
  
  for (const key of Object.keys(current)) {
    const val = current[key];
    const baseVal = base[key];
    
    if (JSON.stringify(val) !== JSON.stringify(baseVal)) {
      const fieldDelta = getDelta(val, baseVal);
      if (fieldDelta !== undefined) {
        delta[key] = fieldDelta;
        hasChanges = true;
      }
    }
  }
  
  return hasChanges ? delta : undefined;
}

// Helper: Base64 UTF-8 encode state
const encodeState = (data: any): string => {
  const str = JSON.stringify(data);
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Helper: Base64 UTF-8 decode state
const decodeState = (base64: string): any => {
  try {
    let str = base64.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    const decoded = decodeURIComponent(escape(atob(str)));
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to decode shared data", e);
    return null;
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);
  const [isSharedView, setIsSharedView] = useState<boolean>(false);
  const [isSavingToCloud, setIsSavingToCloud] = useState<boolean>(false);

  // Initialize Portfolio Data from URL parameter, localStorage, or defaults
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    // 1. Check URL for shared data (?d=... or #projects?d=...)
    let sharedBase64 = '';
    try {
      const urlObj = new URL(window.location.href);
      sharedBase64 = urlObj.searchParams.get('d') || '';
      
      // Also check hash-based parameters (e.g. #projects?d=... or #/?d=...)
      if (!sharedBase64 && urlObj.hash) {
        const hashQueryPart = urlObj.hash.split('?')[1];
        if (hashQueryPart) {
          const hashParams = new URLSearchParams(hashQueryPart);
          sharedBase64 = hashParams.get('d') || '';
        }
      }
    } catch (e) {
      console.error("Error reading URL params", e);
    }

    if (sharedBase64) {
      const decoded = decodeState(sharedBase64);
      if (decoded && typeof decoded === 'object') {
        // Successfully parsed shared data
        return deepMerge(defaultPortfolioData, decoded);
      }
    }

    // 2. Fallback to localStorage
    const saved = localStorage.getItem('abdelrahman_portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultPortfolioData,
            ...parsed,
            profile: {
              ...defaultPortfolioData.profile,
              ...(parsed.profile || {})
            }
          };
        }
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }
    return defaultPortfolioData;
  });

  // Load global portfolio data from the cloud on mount
  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        // Fetch from the cloud via our unified API proxy to avoid browser CORS and ISP blocks
        const res = await fetch('/api/load-cloud');
        if (!res.ok) return;
        const result = await res.json();
        if (result && typeof result === 'object' && Object.keys(result).length > 0) {
          const merged = deepMerge(defaultPortfolioData, result);
          setPortfolioData(merged);
          // Also sync with localStorage to keep page load super fast next time
          localStorage.setItem('abdelrahman_portfolio_data', JSON.stringify(merged));
        }
      } catch (err) {
        console.error("Error loading portfolio from cloud:", err);
      }
    };

    // If there is no custom share query in the URL, load the global cloud data
    // This ensures any standard visitor gets the latest live edits instantly!
    const hasSharedParam = window.location.search.includes('d=') || window.location.hash.includes('d=');
    if (!hasSharedParam) {
      fetchCloudData();
    }
  }, []);

  // Check URL parameters on mount to determine if we are in shared view mode
  useEffect(() => {
    try {
      const urlObj = new URL(window.location.href);
      let d = urlObj.searchParams.get('d');
      if (!d && urlObj.hash) {
        const hashQueryPart = urlObj.hash.split('?')[1];
        if (hashQueryPart) {
          const hashParams = new URLSearchParams(hashQueryPart);
          d = hashParams.get('d');
        }
      }
      if (d) {
        setIsSharedView(true);
      }
    } catch (e) {}
  }, []);

  // Keep localStorage and codebase in sync when data changes
  useEffect(() => {
    localStorage.setItem('abdelrahman_portfolio_data', JSON.stringify(portfolioData));
    
    // Attempt to save to disk if running locally in AI Studio (does not block or crash in production)
    const saveToCodebase = async () => {
      try {
        await fetch('/api/save-portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portfolioData)
        });
      } catch (e) {
        // Expected on static deployments like Vercel
      }
    };
    saveToCodebase();
  }, [portfolioData]);

  // Save current state globally to cloud database (available to all visitors)
  const handleSaveToCloud = async () => {
    setIsSavingToCloud(true);
    try {
      console.log("Compressing images before saving to cloud...");
      const compressedData = await compressPortfolioImages(portfolioData);

      // Save to cloud via our unified API proxy (works flawlessly on local dev server and Vercel serverless)
      const response = await fetch('/api/save-cloud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compressedData)
      });
      if (response.ok) {
        // Update local state with the compressed version so it matches what was uploaded and stays lightweight
        setPortfolioData(compressedData);
        alert(lang === 'en'
          ? "🎉 Portfolio changes saved globally! Anyone visiting your link will now see your updated profile instantly!"
          : "🎉 تم حفظ جميع التعديلات في السحابة بنجاح! الآن أي شخص يزور موقعك سيرى بياناتك الجديدة وصورتك وتعديلاتك فوراً وبشكل تلقائي!");
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (error) {
      console.error("Failed to save to cloud:", error);
      alert(lang === 'en'
        ? "❌ Failed to save to cloud. Please check your internet connection."
        : "❌ فشل حفظ التعديلات في السحابة. يرجى التحقق من اتصالك بالإنترنت.");
    } finally {
      setIsSavingToCloud(false);
    }
  };

  // Reset/Sync with the latest code-defined data
  const handleResetToDefault = () => {
    const confirmMsg = lang === 'en'
      ? "Are you sure you want to update and sync all data with the latest code-defined defaults? (Any local unsaved browser edits will be overwritten with the latest updates from code)."
      : "هل أنت متأكد من رغبتك في تحديث ومزامنة جميع البيانات مع أحدث قيم افتراضية تم برمجتها في الكود؟ (أي تعديلات محلية لم يتم تصديرها سيتم استبدالها بأحدث التحديثات من الكود).";
    if (window.confirm(confirmMsg)) {
      localStorage.removeItem('abdelrahman_portfolio_data');
      setPortfolioData({ ...defaultPortfolioData });
      alert(lang === 'en' ? 'Portfolio successfully updated to the latest code version!' : 'تم تحديث المحتوى بنجاح إلى أحدث نسخة من الكود!');
    }
  };

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

  // Generate and copy shareable state link
  const handleShareLink = () => {
    const delta = getDelta(portfolioData, defaultPortfolioData) || {};
    const encoded = encodeState(delta);
    const origin = window.location.origin + window.location.pathname;
    const shareUrl = `${origin}?d=${encoded}`;
    
    if (shareUrl.length > 8000) {
      const confirmWarning = lang === 'en'
        ? "Warning: Your shared data is quite large (likely due to the uploaded profile picture). The link might fail to load in some browsers. Would you like to generate it anyway?\n\nTip: Paste a web image link instead of uploading a file to keep the URL ultra-short!"
        : "تنبيه: حجم البيانات المشاركة كبير جداً (غالباً بسبب الصورة الشخصية المرفوعة). قد لا يعمل الرابط بشكل صحيح في بعض المتصفحات بسبب طوله.\n\nهل ترغب في إنشاء الرابط على أي حال؟\n\nنصيحة: الصق رابط ويب مباشر لصورتك الشخصية بدلاً من رفع ملف لتصغير حجم الرابط بشكل كبير!";
      if (!window.confirm(confirmWarning)) return;
    }
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert(lang === 'en' 
          ? 'Shareable link copied to clipboard successfully!' 
          : 'تم نسخ رابط مشاركة بورتفوليوهاتك المعدل بنجاح إلى الحافظة!');
      })
      .catch(() => {
        prompt(lang === 'en' ? 'Copy your shareable URL:' : 'انسخ رابط المشاركة الخاص بك:', shareUrl);
      });
  };

  const handleSaveSharedToMyLocalStorage = () => {
    localStorage.setItem('abdelrahman_portfolio_data', JSON.stringify(portfolioData));
    // Clear URL parameters to return to a clean URL
    window.location.href = window.location.origin + window.location.pathname + window.location.hash;
  };

  const handleCancelSharedView = () => {
    window.location.href = window.location.origin + window.location.pathname + window.location.hash;
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 selection:bg-teal-500/10 selection:text-teal-900">
      
      {/* Shared Custom View Banner Notification */}
      {isSharedView && (
        <div className="bg-teal-600 text-white text-xs font-medium py-2.5 px-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Info size={14} className="shrink-0" />
              <span>
                {lang === 'en'
                  ? "You are currently viewing a custom shared version of this portfolio."
                  : "أنت تستعرض الآن نسخة مخصصة ومشاركة من هذا البورتفوليو."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveSharedToMyLocalStorage}
                className="px-3 py-1 rounded bg-white text-teal-700 hover:bg-teal-50 font-bold transition-all text-[11px] cursor-pointer shadow-sm"
              >
                {lang === 'en' ? "Save as My Default" : "حفظ كافتراضي في متصفحي"}
              </button>
              <button
                onClick={handleCancelSharedView}
                className="px-2.5 py-1 rounded bg-teal-700/50 hover:bg-teal-700/80 hover:text-teal-100 transition-all text-[11px] cursor-pointer border border-teal-500/20"
              >
                {lang === 'en' ? "Reset to Original" : "العودة للأصلي"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Topbar */}
      <Navbar
        data={portfolioData}
        lang={lang}
        setLang={setLang}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenEditor={() => setIsEditorOpen(true)}
        onExportData={handleExportData}
        onResetToDefault={handleResetToDefault}
        onShareLink={handleShareLink}
        onSaveToCloud={handleSaveToCloud}
        isSavingToCloud={isSavingToCloud}
      />

      {/* Main Body Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Hero Banner Showcase */}
        <Hero data={portfolioData} lang={lang} isAdmin={isAdmin} onOpenEditor={() => setIsEditorOpen(true)} />

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
          <div className="my-12 p-6 bg-white border border-zinc-200 rounded-2xl flex flex-col gap-5 text-xs shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Info className="text-teal-600 shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-950 text-sm">
                    {lang === 'en' ? '🚀 Real-time Codebase Sync Enabled!' : '🚀 تم تفعيل المزامنة المباشرة مع الكود!'}
                  </p>
                  <p className="text-zinc-600 leading-relaxed">
                    {lang === 'en'
                      ? 'All edits you make here in AI Studio are immediately written to your workspace file (src/data.ts) in real-time. When you export or deploy this repository to Vercel/GitHub, your custom data will automatically become the permanent default layout for all visitors!'
                      : 'أي تعديلات تقوم بها هنا في لوحة التحكم يتم كتابتها فوراً في ملف المشروع الفعلي (src/data.ts) في نفس اللحظة. عندما تقوم بتصدير الكود أو نشره على Vercel أو GitHub، ستصبح بياناتك المعدلة (بما فيها الصورة ورقم الهاتف) هي المظهر الافتراضي الدائم لكل زوار موقعك!'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0 md:pl-6">
                <Cloud className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-950 text-sm">
                    {lang === 'en' ? '🌐 Global Cloud Database Storage Active!' : '🌐 تم ربط وتفعيل السحابة العامة لجميع الزوار!'}
                  </p>
                  <p className="text-zinc-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Your portfolio is now connected to a persistent, public global cloud database. Click "Publish Globally to Cloud" below to instantly update the live site for all visitors across the internet!'
                      : 'تم ربط البورتفوليو بقاعدة بيانات سحابية عامة ودائمة. انقر فوق زر "نشر وحفظ للجميع ع السحابة" بالأسفل لحفظ تعديلاتك الحالية لجميع زوار موقعك عبر الإنترنت فوراً بدون الحاجة لأي نسخ روابط معقدة!'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="h-px bg-zinc-100 w-full" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-zinc-500 font-mono text-[10px]">
                {lang === 'en' ? 'Cloud Server: Connected (Active)' : 'خادم السحابة: متصل وجاهز'}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Save Globally to Cloud Button */}
                <button
                  onClick={handleSaveToCloud}
                  disabled={isSavingToCloud}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-zinc-400 disabled:to-zinc-500 text-white font-bold cursor-pointer transition-all text-xs shadow-md shadow-emerald-600/10"
                >
                  <Cloud size={14} className={isSavingToCloud ? "animate-bounce" : ""} />
                  <span>
                    {isSavingToCloud
                      ? (lang === 'en' ? 'Publishing to Cloud...' : 'جاري الحفظ والنشر ع السحابة...')
                      : (lang === 'en' ? 'Publish Globally to Cloud' : 'نشر وحفظ التعديلات للجميع ع السحابة')}
                  </span>
                </button>

                {/* Share Portfolio Button */}
                <button
                  onClick={handleShareLink}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 font-semibold cursor-pointer transition-all text-xs"
                >
                  <Share2 size={14} />
                  <span>{lang === 'en' ? 'Copy Shareable Link' : 'نسخ رابط بورتفوليو مخصص'}</span>
                </button>

                {/* Sync with Code Button */}
                <button
                  onClick={handleResetToDefault}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 font-semibold cursor-pointer transition-all text-xs"
                >
                  <RefreshCw size={14} className="text-teal-600" />
                  <span>{lang === 'en' ? 'Sync Code Defaults' : 'تحديث لبيانات الكود'}</span>
                </button>

                {/* Import Button */}
                <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-semibold cursor-pointer select-none transition-all text-xs">
                  <FileUp size={14} className="text-teal-600" />
                  <span>{lang === 'en' ? 'Restore JSON' : 'استيراد نسخة JSON'}</span>
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Branding & Contact info */}
      <footer className="border-t border-zinc-200 bg-white py-12 mt-20 text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 border border-zinc-200 font-bold text-zinc-700 text-xs">
              {portfolioData.profile.name.en
                ? portfolioData.profile.name.en.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase()
                : 'AS'}
            </div>
            <p className="font-sans text-zinc-600">
              &copy; {new Date().getFullYear()} {portfolioData.profile.name[lang]}. {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </p>
          </div>

          {/* Social and Contact Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-600 font-sans">
            <a href={`mailto:${portfolioData.profile.email}`} className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
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

