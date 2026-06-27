import React from 'react';
import { Binary, LayoutDashboard, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { PortfolioData } from '../types';

interface ServicesProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
}

export default function Services({ data, lang }: ServicesProps) {
  
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary':
        return <Binary className="text-teal-600" size={24} />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="text-teal-600" size={24} />;
      case 'Zap':
        return <Zap className="text-teal-600" size={24} />;
      case 'ShieldAlert':
        return <ShieldAlert className="text-teal-600" size={24} />;
      default:
        return <CheckCircle2 className="text-teal-600" size={24} />;
    }
  };

  return (
    <section id="services" className="py-20 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-teal-600"></span>
              <span className="text-xs uppercase tracking-widest text-teal-600 font-mono font-semibold">
                {data.profile.servicesSubtitle ? data.profile.servicesSubtitle[lang] : (lang === 'en' ? 'Core Solutions' : 'مجالات التميز والخدمات')}
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
              {data.profile.servicesTitle ? data.profile.servicesTitle[lang] : (lang === 'en' ? 'Specialized Professional Services' : 'خدمات استشارية وتنفيذية متخصصة')}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-sans">
            {data.profile.servicesDescription ? data.profile.servicesDescription[lang] : (lang === 'en'
              ? 'Tailored end-to-end consulting and technical execution for industrial and commercial operations.'
              : 'خدمات برمجية وتحليلية مخصصة للشركات والقطاعات الصناعية لتحسين كفاءة التشغيل اليومي.')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="services_grid">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-zinc-200 p-6 sm:p-8 rounded-2xl hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              {/* Radial glow background on card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-all pointer-events-none"></div>

              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-teal-600 shadow-sm group-hover:border-teal-500/30 transition-all shrink-0">
                  {getServiceIcon(service.iconName)}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight font-sans">
                    {service.categoryTitle[lang]}
                  </h4>
                  <div className="h-1 w-8 bg-teal-500/30 rounded mt-2 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>

              {/* Service Points List */}
              <ul className="space-y-3 relative z-10 text-xs sm:text-sm">
                {service.items.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-600 group-hover:text-zinc-900 transition-colors font-sans">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500/60 shrink-0 mt-2"></span>
                    <span className="leading-tight">{point[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
