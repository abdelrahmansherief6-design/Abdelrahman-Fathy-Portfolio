import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Play, Pause, RefreshCw, Layers, ShieldAlert, Cpu, BarChart2, CheckCircle2 } from 'lucide-react';
import { BilingualText } from '../types';

interface InteractiveDashboardProps {
  lang: 'en' | 'ar';
}

export default function InteractiveDashboard({ lang }: InteractiveDashboardProps) {
  const [activeTab, setActiveTab] = useState<'lab' | 'reliability'>('lab');
  const [isPlaying, setIsPlaying] = useState(true);
  const [tempData, setTempData] = useState<any[]>([]);
  const [labFilter, setLabFilter] = useState<'all' | 'mechanical' | 'electrical' | 'thermal'>('all');

  // Translations
  const t = {
    title: {
      en: "Live Analytics & BI Showcase",
      ar: "معرض تفاعلي مباشر لذكاء الأعمال والتحليل"
    },
    subtitle: {
      en: "Interact with functional real-time dashboard prototypes demonstrating core manufacturing engineering models.",
      ar: "تفاعل مع نماذج حقيقية للوحات القيادة التي تمثل أنظمة الجودة والتحليل الصناعي."
    },
    labTab: {
      en: "Laboratory Utilization Analytics",
      ar: "تحليلات استغلال المختبرات"
    },
    reliabilityTab: {
      en: "Refrigerator Live Reliability Test",
      ar: "المراقبة الفورية لاختبارات الثلاجات"
    },
    filterAll: { en: "All Depts", ar: "جميع الأقسام" },
    filterMech: { en: "Mechanical", ar: "الميكانيكية" },
    filterElec: { en: "Electrical", ar: "الكهربائية" },
    filterTherm: { en: "Thermal", ar: "الحرارية" },
    utilizationRate: { en: "Avg Utilization Rate", ar: "متوسط معدل الاستغلال" },
    testsConducted: { en: "Tests Conducted", ar: "الاختبارات المنجزة" },
    bottleneckIndex: { en: "Bottleneck Index", ar: "مؤشر الاختناق" },
    downtimeCauses: { en: "Downtime Major Causes", ar: "الأسباب الرئيسية للتعطل" },
    sensorTemp: { en: "Live Chamber Temp (°C)", ar: "حرارة غرفة الاختبار الحالية" },
    sensorStatus: { en: "Testing Unit Status", ar: "حالة وحدة الاختبار" },
    realtimeAlerts: { en: "Real-time Anomalies Log", ar: "سجل الانحرافات الفوري" },
    liveStream: { en: "Live Data Feed", ar: "البث المباشر للبيانات" }
  };

  const getTranslation = (item: BilingualText) => item[lang];

  // Static lab utilization data
  const labData = {
    utilizationTrend: [
      { month: 'Jan', mechanical: 72, electrical: 68, thermal: 70 },
      { month: 'Feb', mechanical: 75, electrical: 70, thermal: 72 },
      { month: 'Mar', mechanical: 80, electrical: 78, thermal: 85 },
      { month: 'Apr', mechanical: 85, electrical: 82, thermal: 90 },
      { month: 'May', mechanical: 92, electrical: 88, thermal: 94 },
      { month: 'Jun', mechanical: 95, electrical: 92, thermal: 96 },
    ],
    downtimeCauses: [
      { name: lang === 'en' ? 'Calibration' : 'المعايرة والضبط', value: 35, color: '#14b8a6' },
      { name: lang === 'en' ? 'Maintenance' : 'الصيانة الدورية', value: 25, color: '#06b6d4' },
      { name: lang === 'en' ? 'No Operator' : 'غياب الفنيين', value: 20, color: '#3b82f6' },
      { name: lang === 'en' ? 'Setup Change' : 'تجهيز الاختبارات', value: 20, color: '#6366f1' }
    ],
    testVolume: [
      { category: lang === 'en' ? 'Tensile' : 'اختبار الشد', count: 145 },
      { category: lang === 'en' ? 'Vibration' : 'الاهتزازات', count: 98 },
      { category: lang === 'en' ? 'Thermal Cycle' : 'الدورة الحرارية', count: 210 },
      { category: lang === 'en' ? 'Electrical Load' : 'الأحمال الكهربائية', count: 180 },
      { category: lang === 'en' ? 'Humidity' : 'مقاومة الرطوبة', count: 125 }
    ]
  };

  // Generate simulated real-time data for refrigerator reliability
  useEffect(() => {
    // Initial data
    const initialData = Array.from({ length: 15 }, (_, i) => ({
      time: `${i * 2}h`,
      temp: 4 + Math.sin(i * 0.8) * 1.5 + (Math.random() - 0.5) * 0.4,
      target: 4.0,
      humidity: 60 + Math.cos(i * 0.5) * 5 + (Math.random() - 0.5) * 2,
    }));
    setTempData(initialData);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTempData(prev => {
        const nextTime = parseInt(prev[prev.length - 1].time) + 2;
        // Inject a random anomaly occasionally
        const isAnomaly = Math.random() > 0.85;
        const baseTemp = 4.0;
        const anomalyOffset = isAnomaly ? (Math.random() > 0.5 ? 2.8 : -2.5) : 0;
        
        const newPoint = {
          time: `${nextTime}h`,
          temp: parseFloat((baseTemp + Math.sin(nextTime * 0.1) * 1.2 + (Math.random() - 0.5) * 0.5 + anomalyOffset).toFixed(2)),
          target: 4.0,
          humidity: parseFloat((60 + Math.cos(nextTime * 0.08) * 4 + (Math.random() - 0.5) * 1.5).toFixed(2)),
          anomaly: isAnomaly
        };

        return [...prev.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Metrics calculation
  const currentTemp = tempData.length > 0 ? tempData[tempData.length - 1].temp : 4.0;
  const currentHumidity = tempData.length > 0 ? tempData[tempData.length - 1].humidity : 60;
  const hasAnomalyNow = tempData.length > 0 && tempData[tempData.length - 1].anomaly;

  // Render Lab Dashboard Content
  const renderLabDashboard = () => {
    const activeDataKey = labFilter === 'all' ? 'mechanical' : labFilter;
    const avgUtil = labFilter === 'all' 
      ? Math.round((95 + 92 + 96) / 3) 
      : labFilter === 'mechanical' ? 95 : labFilter === 'electrical' ? 92 : 96;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" id="lab_dashboard">
        {/* KPI Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-50/60 border border-zinc-200 p-5 rounded-2xl relative overflow-hidden" id="lab_kpi_1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>
            <p className="text-sm text-zinc-600">{t.utilizationRate[lang]}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-bold text-teal-600 font-mono">{avgUtil}%</span>
              <span className="text-xs text-emerald-600">↑ 25% {lang === 'en' ? 'from 70%' : 'من الأساسي 70%'}</span>
            </div>
            <div className="w-full bg-zinc-200 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full transition-all duration-1000" style={{ width: `${avgUtil}%` }}></div>
            </div>
          </div>

          <div className="bg-zinc-50/60 border border-zinc-200 p-5 rounded-2xl relative overflow-hidden" id="lab_kpi_2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
            <p className="text-sm text-zinc-600">{t.testsConducted[lang]}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-bold text-cyan-600 font-mono">758</span>
              <span className="text-xs text-zinc-500">{lang === 'en' ? 'Active This Month' : 'نشط هذا الشهر'}</span>
            </div>
            <div className="flex gap-2 mt-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>Mech: 284</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>Elec: 242</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Therm: 232</span>
            </div>
          </div>

          <div className="bg-zinc-50/60 border border-zinc-200 p-5 rounded-2xl relative overflow-hidden" id="lab_kpi_3">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <p className="text-sm text-zinc-600">{t.bottleneckIndex[lang]}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-bold text-indigo-600 font-mono">1.2x</span>
              <span className="text-xs text-emerald-600">↓ {lang === 'en' ? 'Optimized' : 'تم تحسينه'} (was 2.8x)</span>
            </div>
            <p className="text-xs text-zinc-500 mt-4">{lang === 'en' ? 'All scheduled requests processed within SLA window.' : 'معالجة جميع طلبات الاختبار ضمن المدة الزمنية المحددة.'}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between" id="lab_chart_main">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h4 className="text-base font-semibold text-zinc-900">{lang === 'en' ? 'Historical Utilization Trend' : 'منحنى الاستغلال التاريخي للمختبر'}</h4>
              <p className="text-xs text-zinc-500">{lang === 'en' ? 'Continuous tracking post-reengineering' : 'تتبع مستمر بعد إعادة هندسة الجدولة'}</p>
            </div>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs">
              <button 
                onClick={() => setLabFilter('all')} 
                className={`px-3 py-1.5 rounded-md transition-all ${labFilter === 'all' ? 'bg-teal-600 text-white font-semibold' : 'text-zinc-500 hover:text-zinc-800'}`}
              >
                {t.filterAll[lang]}
              </button>
              <button 
                onClick={() => setLabFilter('mechanical')} 
                className={`px-3 py-1.5 rounded-md transition-all ${labFilter === 'mechanical' ? 'bg-teal-600 text-white font-semibold' : 'text-zinc-500 hover:text-zinc-800'}`}
              >
                {t.filterMech[lang]}
              </button>
              <button 
                onClick={() => setLabFilter('electrical')} 
                className={`px-3 py-1.5 rounded-md transition-all ${labFilter === 'electrical' ? 'bg-teal-600 text-white font-semibold' : 'text-zinc-500 hover:text-zinc-800'}`}
              >
                {t.filterElec[lang]}
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={labData.utilizationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUtil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a' }} />
                {labFilter === 'all' || labFilter === 'mechanical' ? (
                  <Area type="monotone" name={lang === 'en' ? 'Mechanical Lab' : 'المختبر الميكانيكي'} dataKey="mechanical" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorUtil)" />
                ) : null}
                {labFilter === 'all' || labFilter === 'electrical' ? (
                  <Area type="monotone" name={lang === 'en' ? 'Electrical Lab' : 'المختبر الكهربائي'} dataKey="electrical" stroke="#0891b2" strokeWidth={2} fillOpacity={1} fill="url(#colorElec)" />
                ) : null}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side card - Downtime causes */}
        <div className="bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between" id="lab_chart_downtime">
          <div>
            <h4 className="text-base font-semibold text-zinc-900">{t.downtimeCauses[lang]}</h4>
            <p className="text-xs text-zinc-500 mb-4">{lang === 'en' ? 'Key contributors to machine non-running hours' : 'أبرز العوامل المساهمة في توقف المعدات عن العمل'}</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={labData.downtimeCauses}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {labData.downtimeCauses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs mt-2">
            {labData.downtimeCauses.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold text-zinc-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Reliability Testing content
  const renderReliabilityDashboard = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" id="reliability_dashboard">
        {/* Left Side: Real-time Sensors */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-zinc-50/60 border border-zinc-200 p-5 rounded-2xl relative overflow-hidden" id="rel_sensor_1">
            <p className="text-xs text-zinc-600">{t.sensorTemp[lang]}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-5xl font-mono font-bold tracking-tight transition-colors duration-300 ${hasAnomalyNow ? 'text-rose-600' : 'text-teal-600'}`}>
                {currentTemp}°C
              </span>
              <div className="flex flex-col items-end">
                <span className="text-xs px-2 py-1 bg-zinc-200 rounded text-zinc-700 font-mono">Target: 4.0°C</span>
                <span className="text-xs text-zinc-500 mt-1">{lang === 'en' ? 'Limit: 1.5° to 6.5°' : 'المسموح: 1.5° إلى 6.5°'}</span>
              </div>
            </div>
            {/* Status light */}
            <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3">
              <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                {t.liveStream[lang]}
              </span>
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                {isPlaying ? (lang === 'en' ? 'Pause Stream' : 'إيقاف مؤقت') : (lang === 'en' ? 'Resume Stream' : 'استئناف البث')}
              </button>
            </div>
          </div>

          <div className="bg-zinc-50/60 border border-zinc-200 p-4 rounded-2xl" id="rel_sensor_2">
            <p className="text-xs text-zinc-600">{t.sensorStatus[lang]}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${hasAnomalyNow ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-teal-50 text-teal-700 border border-teal-100'}`}>
                {hasAnomalyNow ? <ShieldAlert size={22} /> : <Cpu size={22} />}
              </div>
              <div>
                <h5 className="text-sm font-semibold text-zinc-900">
                  {hasAnomalyNow ? (lang === 'en' ? 'Anomaly Detected!' : 'تم رصد خلل!') : (lang === 'en' ? 'Chamber Running Normal' : 'حالة الغرفة طبيعية')}
                </h5>
                <p className="text-xs text-zinc-500">
                  {hasAnomalyNow 
                    ? (lang === 'en' ? 'Temp limit exceeded! Triggering notification.' : 'تجاوزت الحرارة الحدود! جاري إرسال إشعار.')
                    : (lang === 'en' ? 'Stability telemetry within safe parameters' : 'جميع معطيات الاستقرار في الحدود الآمنة')}
                </p>
              </div>
            </div>
          </div>

          {/* Anomaly Logs */}
          <div className="bg-zinc-50/40 border border-zinc-200 p-4 rounded-2xl h-44 flex flex-col" id="rel_anomalies_log">
            <h5 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">{t.realtimeAlerts[lang]}</h5>
            <div className="overflow-y-auto space-y-2 flex-1 text-[11px] font-mono scrollbar-thin">
              <div className="text-zinc-500 border-b border-zinc-100 pb-1 flex justify-between">
                <span>[17:42:01] System booted</span>
                <span className="text-emerald-600 font-bold">OK</span>
              </div>
              <div className="text-zinc-500 border-b border-zinc-100 pb-1 flex justify-between">
                <span>[17:42:15] Sensors calibrated</span>
                <span className="text-emerald-600 font-bold">OK</span>
              </div>
              {tempData.filter(d => d.anomaly).map((d, i) => (
                <div key={i} className="text-rose-600 border-b border-zinc-100 pb-1 flex justify-between animate-pulse">
                  <span>[{d.time} mark] Temperature Anomaly Detected: {d.temp}°C</span>
                  <span className="text-rose-600 font-bold">CRITICAL</span>
                </div>
              ))}
              {tempData.filter(d => d.anomaly).length === 0 ? (
                <div className="text-zinc-400 italic text-center pt-8">
                  {lang === 'en' ? 'No anomalies detected in last 15 cycles' : 'لم يتم رصد أي انحرافات في آخر 15 دورة'}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Side: Real-time Line Graph */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between" id="rel_line_chart_container">
          <div>
            <h4 className="text-base font-semibold text-zinc-900">{lang === 'en' ? 'Live Temperature & Humidity Telemetry' : 'بيانات المراقبة المباشرة للحرارة والرطوبة'}</h4>
            <p className="text-xs text-zinc-500 mb-4">{lang === 'en' ? 'Simulation of continuous sensor capture with automatic thresholds check' : 'محاكاة للقراءة المستمرة للمستشعرات مع رصد ذكي للمستويات المسموحة'}</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#0d9488" fontSize={11} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#2563eb" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" fontSize={12} />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  name={lang === 'en' ? 'Temperature (°C)' : 'الحرارة (°م)'} 
                  dataKey="temp" 
                  stroke="#0d9488" 
                  strokeWidth={2.5}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (payload.anomaly) {
                      return (
                        <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                      );
                    }
                    return <circle cx={cx} cy={cy} r={3} fill="#0d9488" stroke="none" />;
                  }}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  name={lang === 'en' ? 'Humidity (%)' : 'الرطوبة (%)'} 
                  dataKey="humidity" 
                  stroke="#2563eb" 
                  strokeWidth={1.5} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-16 bg-white border border-zinc-200 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-sm" id="live_analytics_showcase">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-teal-600 font-mono font-semibold">{lang === 'en' ? 'Interactive Demonstration' : 'عرض تفاعلي حي'}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">{t.title[lang]}</h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-2xl">{t.subtitle[lang]}</p>
        </div>

        {/* Tab triggers */}
        <div className="flex bg-zinc-100 border border-zinc-200 p-1 rounded-xl text-sm self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('lab')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${activeTab === 'lab' ? 'bg-white text-teal-600 font-medium shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <BarChart2 size={16} />
            <span className="whitespace-nowrap">{t.labTab[lang]}</span>
          </button>
          <button
            onClick={() => setActiveTab('reliability')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${activeTab === 'reliability' ? 'bg-white text-teal-600 font-medium shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Cpu size={16} />
            <span className="whitespace-nowrap">{t.reliabilityTab[lang]}</span>
          </button>
        </div>
      </div>

      {activeTab === 'lab' ? renderLabDashboard() : renderReliabilityDashboard()}
    </div>
  );
}
