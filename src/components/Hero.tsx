import React from 'react';
import { ArrowUpRight, TrendingUp, Cpu, Database, Mail, Award } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
}

export default function Hero({ data, lang }: HeroProps) {
  const profile = data.profile;

  // Key stats highlighting his remarkable numerical achievements
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
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center py-12 md:py-20 overflow-hidden">
      {/* Dynamic Grid Background with ambient glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Large background neon blooms */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8" id="hero_content">
            {/* Status tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {lang === 'en' 
                ? 'Available for Projects & Strategic Consultation' 
                : 'متاح للمشاريع والخدمات الاستشارية الاستراتيجية'}
            </div>

            {/* Title / Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans leading-none">
                <span className="block text-zinc-400 text-lg sm:text-xl font-mono font-medium mb-2 tracking-wide">
                  {lang === 'en' ? "Hello, I'm" : "أهلاً بك، أنا المهندس"}
                </span>
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {profile.name[lang]}
                </span>
              </h1>
              
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-teal-400 tracking-tight font-sans mt-2">
                {profile.headline[lang]}
              </h2>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-sans font-light">
              {profile.valueProposition[lang]}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs transition-all shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25"
              >
                <span>{lang === 'en' ? 'Explore Projects System' : 'استعراض نظام المشاريع'}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>

              <a
                href="mailto:abdelrahmansherief6@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-xs transition-all"
              >
                <Mail size={14} />
                <span>{lang === 'en' ? 'Get In Touch' : 'تواصل معي مباشرة'}</span>
              </a>
            </div>
          </div>

          {/* Right visual card - Dashboard mockup preview */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" id="hero_visual">
            <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm shadow-2xl">
              {/* Card top bar */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/60 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">bi_architecture_v2.0</span>
              </div>

              {/* Schematic view of ETL and BI */}
              <div className="space-y-4">
                <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Database size={14} className="text-cyan-400" />
                    <span>Raw Operational Data (ERP/Sensors)</span>
                  </div>
                  <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/40 px-1.5 py-0.5 rounded font-mono">ETL</span>
                </div>

                {/* Animated Arrow flow */}
                <div className="flex flex-col items-center py-1 opacity-50">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-teal-400"></div>
                </div>

                <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Cpu size={14} className="text-teal-400" />
                    <span>Power Query & DAX Modeling</span>
                  </div>
                  <span className="text-[10px] bg-teal-950 text-teal-400 border border-teal-800/40 px-1.5 py-0.5 rounded font-mono">AUTOMATE</span>
                </div>

                {/* Animated Arrow flow */}
                <div className="flex flex-col items-center py-1 opacity-50">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-teal-400 to-emerald-400"></div>
                </div>

                <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span>Dynamic Executive Dashboards</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded font-mono">BI</span>
                </div>
              </div>

              {/* Floating success stats badge */}
              <div className="absolute -bottom-2 -left-2 bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div className="text-left">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono font-bold leading-none">{lang === 'en' ? 'Data Pipelines' : 'تدفقات البيانات'}</p>
                  <p className="text-xs font-bold text-white leading-tight mt-0.5">{lang === 'en' ? 'Active & Optimal' : 'مستمرة وفعالة'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Highlight Stats Grid */}
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
