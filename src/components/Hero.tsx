import React from 'react';
import { ArrowUpRight, TrendingUp, Cpu, Database, Mail, Award, Linkedin, MapPin, Smartphone, Code, Camera, User } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
  isAdmin?: boolean;
  onOpenEditor?: () => void;
}

export default function Hero({ data, lang, isAdmin, onOpenEditor }: HeroProps) {
  const profile = data.profile;

  // Highlights row
  const highlightStats = [
    {
      value: "6+",
      suffix: lang === 'en' ? "Years" : "سنوات خبرة",
      label: { en: "Industrial Expertise", ar: "خبرة في القطاع الصناعي" },
      icon: <Award className="text-teal-600" size={18} />
    },
    {
      value: "95%",
      suffix: "",
      label: { en: "Lab Utilization (from 70%)", ar: "استغلال المختبرات (من 70%)" },
      icon: <TrendingUp className="text-teal-600" size={18} />
    },
    {
      value: "0",
      suffix: "%",
      label: { en: "Ledger Discrepancies", ar: "نسبة الفروقات التشغيلية" },
      icon: <Cpu className="text-teal-600" size={18} />
    },
    {
      value: "100%",
      suffix: "",
      label: { en: "Digital Shop floor Adoption", ar: "الاعتماد الرقمي للعمال" },
      icon: <Database className="text-teal-600" size={18} />
    }
  ];

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center py-12 md:py-20 overflow-hidden">
      {/* Background visual grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none"></div>
      
      {/* Ambient neon radial glows */}
      <div className="absolute top-10 right-1/4 w-[25rem] h-[25rem] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[20rem] h-[20rem] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full px-1 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: BIO & ACTIONS */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8" id="hero_content">
            
            {/* Pulsating Available Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-[11px] font-mono text-zinc-600 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {lang === 'en' 
                ? 'Available for freelance & full-time' 
                : 'متاح للعمل الحر والفرص الوظيفية الكاملة'}
            </div>

            {/* Display Title / English Name Layout */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 font-sans leading-none">
                  Abdelrahman
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-teal-600 font-sans leading-none">
                  Sherief
                </h1>
              </div>
              
              <h2 className="text-md sm:text-lg md:text-xl font-semibold text-zinc-700 tracking-tight font-sans mt-2">
                {profile.headline[lang]}
              </h2>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl font-sans font-light">
              {profile.valueProposition[lang]}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-teal-600/10 hover:shadow-teal-600/25"
              >
                <span>{lang === 'en' ? 'View my work' : 'استعراض أعمالي'}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-bold text-xs transition-all shadow-sm"
              >
                <Mail size={14} className="text-teal-600" />
                <span>{lang === 'en' ? 'Get in touch' : 'تواصل معي'}</span>
              </a>
            </div>

            {/* Contact Details & Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-zinc-200 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-teal-600" />
                <span>{lang === 'en' ? 'Giza, Egypt' : 'الجيزة، مصر'}</span>
              </div>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-800 transition-colors">
                <Linkedin size={14} className="text-teal-600" />
                <span>LinkedIn</span>
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 hover:text-zinc-800 transition-colors">
                <Smartphone size={14} className="text-teal-600" />
                <span>{profile.phone}</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: CODE BACKDROP WITH PROFILE PHOTO OVERLAY */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" id="hero_visual">
            <div className="w-full max-w-sm sm:max-w-md relative pb-10 pr-4">
              
              {/* Backing Code/IDE Window Frame */}
              <div className="w-[85%] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl opacity-60 sm:opacity-75 transition-opacity">
                
                {/* Editor Bar */}
                <div className="flex justify-between items-center px-4 py-3 bg-slate-950 border-b border-slate-850">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">quality_analytics.py</span>
                </div>

                {/* Technical Code Editor Snippet */}
                <div className="p-4 sm:p-5 font-mono text-[9px] sm:text-[10px] leading-relaxed text-slate-300 space-y-1 h-[280px] sm:h-[320px] overflow-hidden select-none">
                  <div><span className="text-amber-500">import</span> pandas <span className="text-amber-500">as</span> pd</div>
                  <div><span className="text-amber-500">import</span> powerbi_client <span className="text-amber-500">as</span> pbi</div>
                  <div className="text-slate-500"># ETL Pipeline and Quality Analytics Modeling</div>
                  <div><span className="text-amber-400">def</span> <span className="text-cyan-400">process_industrial_data</span>(raw_erp_path):</div>
                  <div className="pl-4">df = pd.read_csv(raw_erp_path)</div>
                  <div className="pl-4">df_clean = df.dropna(subset=[<span className="text-emerald-400">'batch_id'</span>])</div>
                  <div className="pl-4 text-slate-500"># Calculate defect rate and filter NCRs</div>
                  <div className="pl-4">ncr_rate = (df_clean[<span className="text-emerald-400">'defects'</span>].sum() / df_clean[<span className="text-emerald-400">'runs'</span>].sum()) * <span className="text-violet-400">100</span></div>
                  <div className="pl-4"><span className="text-amber-500">print</span>(f<span className="text-emerald-400">"Current NCR Rate: {'{'}ncr_rate:.2%{'}'}"</span>)</div>
                  <div className="pl-4"><span className="text-amber-500">return</span> df_clean</div>
                  <div className="pt-2 text-slate-500"># DAX Measure Definitions</div>
                  <div>NCR_Rate = <span className="text-blue-400">DIVIDE</span>(</div>
                  <div className="pl-4"><span className="text-blue-400">COUNTROWS</span>(NonConformities),</div>
                  <div className="pl-4"><span className="text-blue-400">COUNTROWS</span>(TotalProduction),</div>
                  <div className="pl-4"><span className="text-violet-400">0</span></div>
                  <div>)</div>
                  <div className="text-slate-500 pt-2"># Active Power Automate trigger</div>
                  <div>on_ncr_logged.trigger(alert_executives)</div>
                </div>

              </div>

              {/* OVERLAPPING PORTRAIT PHOTO CARD */}
              <div className="absolute bottom-2 right-0 w-[60%] aspect-[3/4] bg-white border border-zinc-200 rounded-2xl shadow-2xl p-2.5 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-150 flex items-center justify-center">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-gradient-to-tr from-zinc-50 to-zinc-100 p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-2 shadow-inner">
                        <User size={20} />
                      </div>
                      <span className="text-xs font-bold text-zinc-700 font-sans leading-none">{lang === 'en' ? 'Quality Engineer' : 'مهندس جودة أول'}</span>
                      <span className="text-[10px] text-zinc-400 mt-1.5 font-mono">{lang === 'en' ? 'No Photo Set' : 'لم يتم تعيين صورة'}</span>
                    </div>
                  )}

                  {/* Edit action overlay if Admin is toggled */}
                  {isAdmin && onOpenEditor && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEditor();
                      }}
                      className="absolute top-2.5 right-2.5 px-2.5 py-1.5 bg-white/95 border border-zinc-200 hover:bg-teal-50 text-teal-700 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-1.5 z-20"
                      title={lang === 'en' ? 'Edit Photo' : 'تعديل الصورة'}
                    >
                      <Camera size={12} className="text-teal-600 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-tight">{lang === 'en' ? 'Change Photo' : 'تغيير الصورة'}</span>
                    </button>
                  )}

                  {/* Sleek bottom card overlay */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/95 border border-zinc-150 p-2.5 rounded-xl backdrop-blur-md flex items-center justify-between shadow-lg">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] font-bold text-zinc-900 tracking-tight leading-none truncate">
                        {lang === 'en' ? 'Abdelrahman Sherief' : 'عبدالرحمن شريف'}
                      </h4>
                      <p className="text-[8px] text-zinc-500 font-mono mt-1 truncate">
                        Power BI • SQL • Automate
                      </p>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-1.5"></span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* METRICS ROW UNDER HERO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 md:mt-24" id="hero_stats_grid">
          {highlightStats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-zinc-400 font-bold">0{idx + 1}</span>
                <div className="p-1.5 bg-zinc-50 rounded-lg border border-zinc-100 group-hover:border-teal-500/30 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold font-mono tracking-tight text-zinc-900 group-hover:text-teal-600 transition-colors">
                  {stat.value}<span className="text-base font-light text-zinc-500 ml-0.5">{stat.suffix}</span>
                </p>
                <p className="text-[11px] font-sans text-zinc-500 mt-1">{stat.label[lang]}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
