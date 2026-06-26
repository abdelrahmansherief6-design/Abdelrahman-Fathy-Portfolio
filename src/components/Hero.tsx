import React from 'react';
import { ArrowUpRight, TrendingUp, Cpu, Database, Mail, Award, Linkedin, MapPin, Smartphone, Code } from 'lucide-react';
import { PortfolioData } from '../types';
import portraitImg from '../assets/images/abdelrahman_portrait_1782460558839.jpg';

interface HeroProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
}

export default function Hero({ data, lang }: HeroProps) {
  const profile = data.profile;

  // Highlights row
  const highlightStats = [
    {
      value: "6+",
      suffix: lang === 'en' ? "Years" : "سنوات خبرة",
      label: { en: "Industrial Expertise", ar: "خبرة في القطاع الصناعي" },
      icon: <Award className="text-teal-400" size={18} />
    },
    {
      value: "95%",
      suffix: "",
      label: { en: "Lab Utilization (from 70%)", ar: "استغلال المختبرات (من 70%)" },
      icon: <TrendingUp className="text-teal-400" size={18} />
    },
    {
      value: "0",
      suffix: "%",
      label: { en: "Ledger Discrepancies", ar: "نسبة الفروقات التشغيلية" },
      icon: <Cpu className="text-teal-400" size={18} />
    },
    {
      value: "100%",
      suffix: "",
      label: { en: "Digital Shop floor Adoption", ar: "الاعتماد الرقمي للعمال" },
      icon: <Database className="text-teal-400" size={18} />
    }
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center py-12 md:py-20 overflow-hidden">
      {/* Background visual grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a605_1px,transparent_1px),linear-gradient(to_bottom,#14b8a605_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none"></div>
      
      {/* Ambient neon radial glows */}
      <div className="absolute top-10 right-1/4 w-[25rem] h-[25rem] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[20rem] h-[20rem] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full px-1 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: BIO & ACTIONS */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8" id="hero_content">
            
            {/* Pulsating Available Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {lang === 'en' 
                ? 'Available for freelance & full-time' 
                : 'متاح للعمل الحر والفرص الوظيفية الكاملة'}
            </div>

            {/* Display Title / Dual Name Layout */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans leading-none">
                  {lang === 'en' ? 'Abdelrahman' : 'عبد الرحمن'}
                </h1>
                <span className="text-lg sm:text-xl font-bold text-zinc-400/80 font-sans tracking-wide">
                  {lang === 'en' ? 'عبد الرحمن فتحي شريف' : 'Abdelrahman Fathy'}
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-teal-400 font-sans leading-none">
                {lang === 'en' ? 'Sherief' : 'شريف'}
              </h1>
              
              <h2 className="text-md sm:text-lg md:text-xl font-semibold text-zinc-300 tracking-tight font-sans mt-2">
                {profile.headline[lang]}
              </h2>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-sans font-light">
              {profile.valueProposition[lang]}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs transition-all shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25"
              >
                <span>{lang === 'en' ? 'View my work' : 'استعراض أعمالي'}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs transition-all"
              >
                <Mail size={14} className="text-teal-400" />
                <span>{lang === 'en' ? 'Get in touch' : 'تواصل معي'}</span>
              </a>
            </div>

            {/* Contact Details & Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-zinc-900 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-teal-500" />
                <span>{lang === 'en' ? 'Giza, Egypt' : 'الجيزة، مصر'}</span>
              </div>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Linkedin size={14} className="text-teal-500" />
                <span>LinkedIn</span>
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Smartphone size={14} className="text-teal-500" />
                <span>{profile.phone}</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: CODE BACKDROP + PHOTO OVERLAY */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" id="hero_visual">
            <div className="w-full max-w-md relative">
              
              {/* Backing Code/IDE Window Frame */}
              <div className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                
                {/* Editor Bar */}
                <div className="flex justify-between items-center px-4 py-3 bg-zinc-950/80 border-b border-zinc-850">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/60"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/60"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60"></span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">quality_analytics.py</span>
                </div>

                {/* Technical Code Editor Snippet */}
                <div className="p-4 sm:p-6 font-mono text-[10px] leading-relaxed text-zinc-500 space-y-1.5 h-[340px] overflow-hidden select-none">
                  <div><span className="text-amber-500">import</span> pandas <span className="text-amber-500">as</span> pd</div>
                  <div><span className="text-amber-500">import</span> powerbi_client <span className="text-amber-500">as</span> pbi</div>
                  <div className="text-zinc-600"># ETL Pipeline and Quality Analytics Modeling</div>
                  <div><span className="text-amber-500">def</span> <span className="text-cyan-400">process_industrial_data</span>(raw_erp_path):</div>
                  <div className="pl-4">df = pd.read_csv(raw_erp_path)</div>
                  <div className="pl-4">df_clean = df.dropna(subset=[<span className="text-emerald-400">'batch_id'</span>])</div>
                  <div className="pl-4 text-zinc-600"># Calculate defect rate and filter NCRs</div>
                  <div className="pl-4">ncr_rate = (df_clean[<span className="text-emerald-400">'defects'</span>].sum() / df_clean[<span className="text-emerald-400">'runs'</span>].sum()) * <span className="text-violet-400">100</span></div>
                  <div className="pl-4"><span className="text-amber-500">print</span>(f<span className="text-emerald-400">"Current NCR Rate: {'{'}ncr_rate:.2%{'}'}"</span>)</div>
                  <div className="pl-4"><span className="text-amber-500">return</span> df_clean</div>
                  <div className="pt-2 text-zinc-600"># DAX Measure Definitions</div>
                  <div>NCR_Rate = <span className="text-blue-400">DIVIDE</span>(</div>
                  <div className="pl-4"><span className="text-blue-400">COUNTROWS</span>(NonConformities),</div>
                  <div className="pl-4"><span className="text-blue-400">COUNTROWS</span>(TotalProduction),</div>
                  <div className="pl-4"><span className="text-violet-400">0</span></div>
                  <div>)</div>
                  <div className="text-zinc-600 pt-2"># Active Power Automate trigger</div>
                  <div>on_ncr_logged.trigger(alert_executives)</div>
                </div>

              </div>

              {/* OVERLAPPING USER PORTRAIT IMAGE CARD */}
              <div className="absolute top-12 left-10 right-4 bottom-[-20px] bg-zinc-950 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden border border-zinc-800 flex items-center justify-center group">
                <img
                  src={profile.avatar || portraitImg}
                  alt={profile.name[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Glowing Overlay border effect */}
                <div className="absolute inset-0 border border-teal-500/20 rounded-2xl pointer-events-none group-hover:border-teal-500/40 transition-colors"></div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/90 border border-zinc-800/80 p-3 rounded-xl backdrop-blur-md flex items-center justify-between shadow-xl">
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight leading-none">
                      {lang === 'en' ? 'Senior Quality Engineer' : 'مهندس أول جودة منتجات'}
                    </h4>
                    <p className="text-[9px] text-zinc-400 font-mono mt-1">
                      Power BI • Automate • SQL • AppSheet
                    </p>
                  </div>
                  <div className="p-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-lg shrink-0">
                    <Code size={14} />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* METRICS ROW UNDER HERO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 md:mt-24" id="hero_stats_grid">
          {highlightStats.map((stat, idx) => (
            <div key={idx} className="bg-zinc-900/30 border border-zinc-800/50 p-5 rounded-2xl flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-zinc-500 font-bold">0{idx + 1}</span>
                <div className="p-1.5 bg-zinc-950 rounded-lg border border-zinc-850 group-hover:border-teal-500/30 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold font-mono tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  {stat.value}<span className="text-base font-light text-zinc-400 ml-0.5">{stat.suffix}</span>
                </p>
                <p className="text-[11px] font-sans text-zinc-400 mt-1">{stat.label[lang]}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
