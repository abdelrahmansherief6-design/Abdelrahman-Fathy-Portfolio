import React, { useState } from 'react';
import { Search, SlidersHorizontal, CheckCircle2, ChevronRight } from 'lucide-react';
import { PortfolioData, Skill } from '../types';

interface SkillsProps {
  data: PortfolioData;
  lang: 'en' | 'ar';
}

export default function Skills({ data, lang }: SkillsProps) {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'Expert' | 'Advanced' | 'Intermediate'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'data' | 'bi' | 'automation' | 'quality' | 'languages'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const levels = [
    { value: 'all', label: { en: 'All Levels', ar: 'جميع المستويات' } },
    { value: 'Expert', label: { en: 'Expert', ar: 'خبير' } },
    { value: 'Advanced', label: { en: 'Advanced', ar: 'متقدم' } },
    { value: 'Intermediate', label: { en: 'Intermediate', ar: 'متوسط' } }
  ];

  const categories = [
    { value: 'all', label: { en: 'All Categories', ar: 'جميع الأقسام' } },
    { value: 'data', label: { en: 'Data Cleaning & ETL', ar: 'تنظيف ومعالجة البيانات' } },
    { value: 'bi', label: { en: 'BI & Modeling', ar: 'ذكاء الأعمال والنمذجة' } },
    { value: 'automation', label: { en: 'Process Automation', ar: 'أتمتة العمليات' } },
    { value: 'quality', label: { en: 'Quality & Statistics', ar: 'الجودة والإحصاء' } },
    { value: 'languages', label: { en: 'Query Languages', ar: 'لغات البرمجة والاستعلام' } }
  ];

  const filteredSkills = data.skills.filter((skill) => {
    const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-teal-700 bg-teal-50 border-teal-200';
      case 'Advanced':
        return 'text-cyan-700 bg-cyan-50 border-cyan-200';
      case 'Intermediate':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-zinc-500 bg-zinc-50 border-zinc-200';
    }
  };

  const getProgressWidth = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'w-full'; // 100%
      case 'Advanced':
        return 'w-4/5'; // 80%
      case 'Intermediate':
        return 'w-3/5'; // 60%
      default:
        return 'w-1/2';
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-teal-700">
            {data.profile.skillsSubtitle ? data.profile.skillsSubtitle[lang] : (lang === 'en' ? 'Core Capabilities' : 'مصفوفة القدرات والمهارات')}
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">
            {data.profile.skillsTitle ? data.profile.skillsTitle[lang] : (lang === 'en' ? 'Expertise & Technical Stack' : 'القدرات الفنية والبرمجية')}
          </h3>
          <p className="text-sm text-zinc-600">
            {data.profile.skillsDescription ? data.profile.skillsDescription[lang] : (lang === 'en'
              ? 'A breakdown of specialized software, algorithms, and engineering frameworks utilized.'
              : 'تفصيل للمهارات البرمجية والأدوات التقنية التي أتقنها لخدمة التحول الرقمي وحلول الجودة.')}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-4 mb-8 space-y-4" id="skills_filter_bar">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search technical skill...' : 'ابحث عن مهارة معينة...'}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-800 focus:outline-none focus:border-teal-500/50"
              />
            </div>

            {/* Level Selector buttons */}
            <div className="flex flex-wrap gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs shrink-0">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedLevel === level.value
                      ? 'bg-teal-600 text-white font-semibold shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {level.label[lang]}
                </button>
              ))}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-150 text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5 shrink-0 px-1 font-mono uppercase text-[10px] tracking-wider">
              <SlidersHorizontal size={12} />
              {lang === 'en' ? 'Categories:' : 'الأقسام:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as any)}
                className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="skills_grid">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border border-zinc-200 hover:border-teal-500/50 p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-200 group shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-zinc-800 group-hover:text-teal-600 transition-colors font-sans">
                  {skill.name}
                </span>
                
                {/* Level badge */}
                <span className={`text-[10px] px-2.5 py-0.5 rounded border uppercase font-mono font-bold leading-relaxed ${getLevelColor(skill.level)}`}>
                  {lang === 'en' ? skill.level : skill.levelAr}
                </span>
              </div>

              {/* Progress visualizer */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{lang === 'en' ? 'Expertise Level' : 'مستوى الإتقان'}</span>
                  <span>{skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : '60%'}</span>
                </div>
                <div className="w-full bg-zinc-100 border border-zinc-200 h-2 rounded-full overflow-hidden">
                  <div className={`bg-gradient-to-r from-teal-600 to-teal-400 h-full rounded-full transition-all duration-500 ${getProgressWidth(skill.level)}`}></div>
                </div>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 italic text-xs">
              {lang === 'en' ? 'No matching skills found in this selection.' : 'لم نجد أي مهارات تطابق خيارات البحث الحالية.'}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
