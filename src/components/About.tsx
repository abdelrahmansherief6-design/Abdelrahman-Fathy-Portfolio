import React from 'react';
import { Award, GraduationCap, ChevronRight, CheckCircle2, Factory, ShieldCheck, Zap, GitMerge } from 'lucide-react';
import { PortfolioData } from '../types';

interface AboutProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
}

export default function About({ data, lang }: AboutProps) {
  const profile = data.profile;

  // Why Work With Me mapped to icons
  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory':
        return <Factory className="text-teal-600" size={20} />;
      case 'Award':
        return <ShieldCheck className="text-teal-600" size={20} />;
      case 'GitMerge':
        return <GitMerge className="text-teal-600" size={20} />;
      case 'TrendingUp':
        return <Zap className="text-teal-600" size={20} />;
      default:
        return <CheckCircle2 className="text-teal-600" size={20} />;
    }
  };

  return (
    <section id="about" className="py-20 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* About Me Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about_main">
          
          {/* Left: Biography Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-teal-600"></span>
              <span className="text-xs uppercase tracking-widest text-teal-600 font-mono font-semibold">
                {lang === 'en' ? 'Professional Biography' : 'السيرة الذاتية المهنية'}
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
              {lang === 'en' ? 'Bridging Industrial Expertise with Data Analytics' : 'الربط بين الخبرة الصناعية العميقة وتحليل البيانات الذكية'}
            </h3>
            
            <div className="text-zinc-600 text-sm leading-relaxed space-y-4 font-sans font-light">
              <p>{profile.aboutMe[lang]}</p>
            </div>
          </div>

          {/* Right: Education & Certifications */}
          <div className="lg:col-span-5 space-y-6 bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm" id="about_credentials">
            
            {/* Education */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-bold flex items-center gap-2">
                <GraduationCap size={16} className="text-teal-600" />
                {lang === 'en' ? 'Education' : 'التعليم الأكاديمي'}
              </h4>
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-teal-500/30 pl-4 py-1 relative">
                  <span className="absolute -left-1.5 top-2.5 w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                  <h5 className="text-sm font-bold text-zinc-900 font-sans">{edu.degree[lang]}</h5>
                  <p className="text-xs text-zinc-600 font-sans mt-0.5">{edu.institution[lang]}</p>
                  <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{edu.location[lang]}</p>
                  <p className="text-xs font-mono text-teal-600 mt-1.5">{edu.year}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4 pt-6 border-t border-zinc-150">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-bold flex items-center gap-2">
                <Award size={16} className="text-teal-600" />
                {lang === 'en' ? 'Professional Certifications' : 'الشهادات والاعتمادات'}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {data.certificates.map((cert) => (
                  <div key={cert.id} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-start gap-2.5">
                    <div className="h-6 w-6 rounded bg-teal-500/10 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                      <Award size={14} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-800 font-sans">{cert.name[lang]}</h5>
                      <p className="text-[10px] text-zinc-500 mt-0.5 font-sans">
                        {cert.issuer[lang]}
                        {cert.track ? ` • ${cert.track[lang]}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Why Work With Me Section */}
        <div id="why-me" className="mt-20 pt-16 border-t border-zinc-200">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-teal-700">
              {lang === 'en' ? 'Core Value Proposition' : 'القيمة المضافة والشراكة'}
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
              {lang === 'en' ? 'Why Work With Me?' : 'لماذا تعمل معي؟'}
            </h3>
            <p className="text-sm text-zinc-600">
              {lang === 'en' 
                ? 'Delivering measurable improvements and professional results at every phase of operations.' 
                : 'تقديم تحسينات تشغيلية ملموسة ونتائج احترافية في كل مرحلة من مراحل التشغيل.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="why_cards_grid">
            {data.whyWorkWithMe.map((item) => (
              <div key={item.id} className="bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 group relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-all"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-inner group-hover:border-teal-500/30 transition-all">
                    {getWhyIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-800 group-hover:text-teal-600 transition-colors font-sans">{item.title[lang]}</h4>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed font-sans font-light">{item.description[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
