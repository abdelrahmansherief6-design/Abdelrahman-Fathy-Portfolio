import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: {
      en: "Abdelrahman Fathy Sherief",
      ar: "Abdelrahman Fathy Sherief"
    },
    headline: {
      en: "Senior Product Quality Engineer | Data Analytics & Process Automation Specialist",
      ar: "مهندس أول جودة منتجات | أخصائي تحليل البيانات وأتمتة العمليات"
    },
    valueProposition: {
      en: "I help manufacturing companies transform operational and quality data into actionable insights, automated systems, and business intelligence solutions that improve decision-making, increase efficiency, and reduce operational costs.",
      ar: "أساعد الشركات الصناعية والإنتاجية في تحويل بيانات التشغيل والجودة إلى رؤى قابلة للتنفيذ، وأنظمة مؤتمتة، وحلول ذكاء أعمال تساهم في تحسين اتخاذ القرارات، وزيادة الكفاءة، وخفض التكاليف التشغيلية."
    },
    aboutMe: {
      en: "Abdelrahman Fathy Sherief is a Senior Product Quality Engineer and Data Analytics Specialist with more than 6 years of experience in manufacturing, quality management, business intelligence, and process automation. Throughout his career, he has successfully designed and implemented end-to-end data-driven systems that support quality control, operational monitoring, performance management, and executive decision-making. His expertise combines industrial experience with advanced analytics capabilities, enabling organizations to transform raw data into meaningful insights, automated workflows, and performance-driven solutions. He specializes in Power BI, Excel, Power Query, Power Pivot, DAX, Power Automate, AppSheet, ETL Processes, Dashboard Development, and Quality Analytics. His work focuses on improving operational efficiency, reducing costs, increasing visibility, and enabling data-driven decision-making across organizations.",
      ar: "Abdelrahman Fathy Sherief هو مهندس أول جودة منتجات وأخصائي تحليل البيانات مع خبرة تزيد عن 6 سنوات في التصنيع، وإدارة الجودة، وذكاء الأعمال، وأتمتة العمليات. نجح خلال مسيرته المهنية في تصميم وتنفيذ أنظمة متكاملة تعتمد على البيانات لدعم مراقبة الجودة، والمتابعة التشغيلية، وإدارة الأداء، واتخاذ القرارات التنفيذية. يجمع بين الخبرة الصناعية العميقة والقدرات المتقدمة في تحليل البيانات، مما يمكن المؤسسات من تحويل البيانات الخام إلى رؤى مفيدة، وسير عمل مؤتمت، وحلول قائمة على الأداء. يتخصص في Power BI، وExcel، وPower Query، وPower Pivot، وDAX، وPower Automate، وAppSheet، وعمليات ETL، وتطوير لوحات القيادة (Dashboards)، وتحليلات الجودة. يركز عمله على تحسين الكفاءة التشغيلية، وخفض التكاليف، وزيادة الشفافية، وتمكين اتخاذ القرارات القائمة على البيانات في المؤسسات."
    },
    avatar: "", // Will be represented by a clean styled initials avatar or a placeholder
    email: "abdelrahmansherief6@gmail.com",
    phone: "+201000000000", // Placeholder for actual phone, editable
    linkedin: "https://www.linkedin.com/in/abdelrahman-fathy-sherief" // Editable
  },
  achievements: [
    {
      id: "ach_1",
      title: {
        en: "6+ Years of Professional Experience",
        ar: "خبرة مهنية تزيد عن 6 سنوات"
      },
      iconName: "Briefcase"
    },
    {
      id: "ach_2",
      title: {
        en: "Built Complete End-to-End Quality Data Systems",
        ar: "بناء أنظمة متكاملة لبيانات الجودة من البداية للنهاية"
      },
      iconName: "Database"
    },
    {
      id: "ach_3",
      title: {
        en: "Increased Laboratory Utilization from 70% to 95%",
        ar: "زيادة نسبة استغلال المختبرات من 70% إلى 95%"
      },
      iconName: "TrendingUp"
    },
    {
      id: "ach_4",
      title: {
        en: "Automated Multiple Operational Processes",
        ar: "أتمتة العديد من العمليات التشغيلية واليومية"
      },
      iconName: "Cpu"
    },
    {
      id: "ach_5",
      title: {
        en: "Developed Quality Monitoring & Decision Support Systems",
        ar: "تطوير أنظمة مراقبة الجودة ودعم اتخاذ القرارات"
      },
      iconName: "LineChart"
    },
    {
      id: "ach_6",
      title: {
        en: "Built Inventory, Cashier, and Loan Management Applications",
        ar: "بناء تطبيقات متكاملة لإدارة المخازن والخزينة والسلف"
      },
      iconName: "Smartphone"
    },
    {
      id: "ach_7",
      title: {
        en: "Implemented Customer Complaint Analytics Solutions",
        ar: "تطبيق حلول تحليلية تفاعلية لشكاوى العملاء"
      },
      iconName: "Users"
    },
    {
      id: "ach_8",
      title: {
        en: "Delivered Sales Analytics Dashboards for Business Performance",
        ar: "تصميم لوحات قيادة المبيعات لمراقبة أداء الأعمال"
      },
      iconName: "BarChart"
    }
  ],
  skills: [
    { id: "sk_1", name: "Excel", level: "Expert", levelAr: "خبير", category: "data" },
    { id: "sk_2", name: "Power BI", level: "Expert", levelAr: "خبير", category: "bi" },
    { id: "sk_3", name: "DAX", level: "Expert", levelAr: "خبير", category: "bi" },
    { id: "sk_4", name: "Power Query", level: "Expert", levelAr: "خبير", category: "data" },
    { id: "sk_5", name: "Power Pivot", level: "Expert", levelAr: "خبير", category: "data" },
    { id: "sk_6", name: "Dashboard Design", level: "Expert", levelAr: "خبير", category: "bi" },
    { id: "sk_7", name: "Data Cleaning", level: "Expert", levelAr: "خبير", category: "data" },
    { id: "sk_8", name: "ETL Processes", level: "Expert", levelAr: "خبير", category: "data" },
    { id: "sk_9", name: "Power Automate", level: "Expert", levelAr: "خبير", category: "automation" },
    { id: "sk_10", name: "AppSheet", level: "Expert", levelAr: "خبير", category: "automation" },
    { id: "sk_11", name: "Statistics", level: "Advanced", levelAr: "متقدم", category: "quality" },
    { id: "sk_12", name: "SQL", level: "Intermediate", levelAr: "متوسط", category: "languages" },
    { id: "sk_13", name: "Python", level: "Intermediate", levelAr: "متوسط", category: "languages" }
  ],
  services: [
    {
      id: "srv_1",
      categoryTitle: {
        en: "DATA ANALYTICS",
        ar: "تحليل البيانات"
      },
      iconName: "Binary",
      items: [
        { en: "Data Cleaning and Transformation", ar: "تنظيف وتهيئة البيانات" },
        { en: "Data Modeling", ar: "نمذجة هيكل البيانات" },
        { en: "KPI Development", ar: "تطوير مؤشرات قياس الأداء" },
        { en: "Business Performance Analysis", ar: "تحليل أداء الأعمال والشركات" },
        { en: "Statistical Analysis", ar: "التحليل الإحصائي" },
        { en: "ETL Process Design", ar: "تصميم عمليات استخراج وتحويل البيانات (ETL)" }
      ]
    },
    {
      id: "srv_2",
      categoryTitle: {
        en: "BUSINESS INTELLIGENCE",
        ar: "ذكاء الأعمال (BI)"
      },
      iconName: "LayoutDashboard",
      items: [
        { en: "Power BI Dashboards", ar: "لوحات قيادة Power BI تفاعلية" },
        { en: "Executive Dashboards", ar: "لوحات قيادة للمدراء والتنفيذيين" },
        { en: "Operational Dashboards", ar: "لوحات قيادة لمراقبة التشغيل اليومي" },
        { en: "Quality Dashboards", ar: "لوحات قيادة مخصصة لإدارة الجودة" },
        { en: "Automated Reporting Solutions", ar: "حلول التقارير الدورية المؤتمتة" }
      ]
    },
    {
      id: "srv_3",
      categoryTitle: {
        en: "PROCESS AUTOMATION",
        ar: "أتمتة العمليات"
      },
      iconName: "Zap",
      items: [
        { en: "Power Automate Workflows", ar: "سير عمل مؤتمت عبر Power Automate" },
        { en: "AppSheet Business Applications", ar: "تطبيقات أعمال مخصصة باستخدام AppSheet" },
        { en: "Approval Systems", ar: "أنظمة الموافقات الإلكترونية المؤتمتة" },
        { en: "Notification Systems", ar: "أنظمة التنبيهات والإشعارات الفورية" },
        { en: "Data Collection Solutions", ar: "حلول تجميع البيانات الميدانية والتشغيلية" }
      ]
    },
    {
      id: "srv_4",
      categoryTitle: {
        en: "QUALITY & MANUFACTURING ANALYTICS",
        ar: "تحليلات الجودة والتصنيع"
      },
      iconName: "ShieldAlert",
      items: [
        { en: "Customer Complaints Analysis", ar: "تحليل شكاوى وبلاغات العملاء" },
        { en: "Root Cause Analysis", ar: "تحليل الأسباب الجذرية للمشكلات (RCA)" },
        { en: "Non-Conformity Reporting", ar: "تقارير ونماذج حالات عدم المطابقة" },
        { en: "Quality KPI Monitoring", ar: "متابعة مؤشرات أداء الجودة في خطوط الإنتاج" },
        { en: "Reliability Testing Analytics", ar: "تحليلات واختبارات الموثوقية للمنتجات" },
        { en: "Manufacturing Performance Analysis", ar: "تحليل كفاءة وأداء العمليات التصنيعية" }
      ]
    }
  ],
  whyWorkWithMe: [
    {
      id: "why_1",
      title: {
        en: "Industrial Experience",
        ar: "خبرة عملية في القطاع الصناعي"
      },
      description: {
        en: "Real, hands-on manufacturing and product quality management experience.",
        ar: "خبرة تطبيقية حقيقية في خطوط الإنتاج والتحكم في جودة المنتجات وتطويرها."
      },
      iconName: "Factory"
    },
    {
      id: "why_2",
      title: {
        en: "Business-Oriented Thinking",
        ar: "التفكير الموجه لخدمة الأعمال"
      },
      description: {
        en: "A strategic focus on direct business impact, ROI, and performance, rather than just reports.",
        ar: "التركيز على التأثير المباشر على العمل، والعائد الاستثماري والأداء الفعلي، وليس مجرد تقارير صامتة."
      },
      iconName: "Award"
    },
    {
      id: "why_3",
      title: {
        en: "End-to-End Solutions",
        ar: "حلول متكاملة من البداية للنهاية"
      },
      description: {
        en: "Seamless architecture from initial data collection and automation to stunning executive dashboards.",
        ar: "تصميم وبناء البنية الكاملة من تجميع البيانات والأتمتة إلى عرضها بلوحات قيادة تنفيذية راقية."
      },
      iconName: "GitMerge"
    },
    {
      id: "why_4",
      title: {
        en: "Results-Driven Approach",
        ar: "منهجية تركز على النتائج بالأرقام"
      },
      description: {
        en: "Deep commitment to measurable operational improvements, efficiency, and excellence.",
        ar: "التزام كامل بتحقيق تحسينات تشغيلية ملموسة، وزيادة كفاءة العمليات التشغيلية بدقة."
      },
      iconName: "TrendingUp"
    }
  ],
  education: [
    {
      id: "edu_1",
      institution: {
        en: "Menoufia University",
        ar: "جامعة المنوفية"
      },
      degree: {
        en: "Bachelor of Mechanical Engineering",
        ar: "بكالوريوس الهندسة الميكانيكية"
      },
      location: {
        en: "Faculty of Engineering, Shebin El-Kom",
        ar: "كلية الهندسة، شبين الكوم"
      },
      year: "2019"
    }
  ],
  certificates: [
    {
      id: "cert_1",
      name: {
        en: "Certified Quality Engineer (CQE)",
        ar: "مهندس جودة معتمد (CQE)"
      },
      issuer: {
        en: "Excellence Center",
        ar: "مركز التميز"
      }
    },
    {
      id: "cert_2",
      name: {
        en: "Data Analysis Track",
        ar: "مسار تحليل البيانات المتقدم"
      },
      issuer: {
        en: "Mazen Analytics",
        ar: "مازن أناليتكس"
      }
    }
  ],
  projects: [
    {
      id: "proj_1",
      title: {
        en: "Quality Management System (QMS)",
        ar: "نظام إدارة الجودة الرقمي المتكامل (QMS)"
      },
      category: {
        en: "Process Automation & BI",
        ar: "أتمتة العمليات وذكاء الأعمال"
      },
      problem: {
        en: "Heavy reliance on paper forms and manually compiled spreadsheets led to slow corrective action times, frequent data entry errors, and a total lack of real-time visibility into shop floor non-conformities.",
        ar: "الاعتماد الكبير على النماذج الورقية وجداول البيانات المجمعة يدويًا أدى إلى تباطؤ اتخاذ القرارات التصحيحية، وتكرار أخطاء إدخال البيانات، والغياب التام للرؤية الفورية لحالات عدم المطابقة في صالة الإنتاج."
      },
      solution: {
        en: "Developed a centralized, automated digital Quality Management System (QMS) combining AppSheet/Power Apps for instant field audits, Power Automate for real-time corrective action alerts, and Power BI for executive compliance dashboards.",
        ar: "تطوير نظام رقمي مركزي لإدارة الجودة (QMS) يجمع بين AppSheet لعمليات التدقيق الميداني السريعة، وPower Automate لإرسال تنبيهات الإجراءات التصحيحية الفورية، ولوحة قيادة Power BI لمراقبة نسب المطابقة مباشرة."
      },
      results: {
        en: "Reduced average non-conformity response times significantly, minimized critical defect occurrences on assembly lines, and ensured the company was audit-ready with 100% real-time data tracing.",
        ar: "تقليل زمن الاستجابة والتعامل مع حالات عدم المطابقة، وخفض معدلات ظهور العيوب الحرجة في خطوط التجميع، وتوفير جاهزية تامة ومستمرة لعمليات التدقيق الخارجي بتتبع فوري بنسبة 100%."
      },
      metrics: [
        {
          label: { en: "NCR Response Speed", ar: "سرعة الاستجابة للمشكلات" },
          value: "+60%"
        },
        {
          label: { en: "Defect Rate Reduction", ar: "تقليل معدل العيوب" },
          value: "-18%"
        },
        {
          label: { en: "Audit-Ready Tracking", ar: "تتبع فوري للتدقيق" },
          value: "100%"
        }
      ],
      image: "qms" // Will map to a stylized representation
    },
    {
      id: "proj_2",
      title: {
        en: "Laboratory Utilization Improvement Project",
        ar: "مشروع تحسين وتطوير معدل استغلال المختبرات"
      },
      category: {
        en: "Data Analytics & Optimization",
        ar: "تحليل البيانات وتحسين الكفاءة"
      },
      problem: {
        en: "Low utilization of high-cost product testing laboratory equipment (operating at ~70%) due to scheduling bottlenecks, manual paper request tracking, and lack of historical downtime analysis.",
        ar: "انخفاض استغلال معدات المختبرات عالية التكلفة للاختبارات (كانت تعمل بنسبة ~70%) بسبب اختناقات الجدولة، والمتابعة الورقية اليدوية للطلبات، وغياب التحليل التاريخي لأوقات تعطل المعدات."
      },
      solution: {
        en: "Re-engineered laboratory scheduling and booking processes. Created an automated demand forecasting and slot booking tool with Power BI-driven utilization analytics to identify bottleneck tests.",
        ar: "إعادة هندسة عمليات الجدولة وحجز الاختبارات بالمختبر، وإنشاء أداة حجز وإدخال رقمية ذكية مع ربطها بلوحة تحليلية بـ Power BI لتحديد اختبارات الاختناق والتعطيل وتحليل الأسباب."
      },
      results: {
        en: "Boosted laboratory utilization substantially, dramatically reduced average test turnaround times, and deferred massive capital expenditure on redundant testing equipment.",
        ar: "رفع كفاءة ومعدل استغلال الأجهزة المخبرية، وتقليص متوسط زمن إتمام وتقديم تقارير الاختبارات، مما وفر استثمارات رأسمالية كبيرة في شراء أجهزة إضافية غير ضرورية."
      },
      metrics: [
        {
          label: { en: "Lab Utilization", ar: "نسبة استغلال المختبر" },
          value: "95%"
        },
        {
          label: { en: "From Baseline", ar: "من القيمة السابقة" },
          value: "70%"
        },
        {
          label: { en: "Turnaround Time", ar: "زمن إنجاز الاختبارات" },
          value: "-35%"
        }
      ],
      image: "lab"
    },
    {
      id: "proj_3",
      title: {
        en: "Refrigerator Testing Monitoring System",
        ar: "نظام المراقبة والتحليل لاختبارات الثلاجات"
      },
      category: {
        en: "Process Automation & Quality Analytics",
        ar: "أتمتة العمليات وتحليلات الجودة"
      },
      problem: {
        en: "Manufacturing reliability and performance testing for refrigerators took several days. Temperature anomalies or failures were only detected manually after the complete cycle, leading to wasted energy, delayed feedback, and lost test-run days.",
        ar: "اختبارات الموثوقية والأداء للثلاجات تستغرق أيامًا متواصلة، وكان يتم رصد الانحرافات أو الفشل يدويًا بعد انتهاء الدورة كاملة، مما يتسبب في هدر الطاقة والوقت وتأخر تقديم الملاحظات لخطوط الإنتاج."
      },
      solution: {
        en: "Built a real-time testing monitoring dashboard connected directly to the testing chamber data outputs. Configured automated notification systems (Power Automate) that trigger the second temperature or electrical parameters deviate from standards.",
        ar: "بناء لوحة مراقبة فورية متصلة مباشرة بمخرجات غرف الاختبارات، وإعداد نظام إشعارات تلقائي فوري عبر Power Automate يرسل تنبيهات للبريد الإلكتروني بمجرد حدوث أي انحراف عن المواصفات."
      },
      results: {
        en: "Saved hours of manual inspection, eliminated missed failures entirely, and dramatically accelerated the engineering feedback loop back to the assembly line.",
        ar: "توفير ساعات عمل الفحص اليدوي شهريًا، وضمان رصد 100% من الأعطال فور حدوثها، مع تسريع إرسال التغذية الراجعة الهندسية لخط الإنتاج."
      },
      metrics: [
        {
          label: { en: "Manual Inspection Time", ar: "وقت الفحص اليدوي الموفر" },
          value: "-40hr/mo"
        },
        {
          label: { en: "Missed Test Failures", ar: "أعطال اختبارات لم تُرصد" },
          value: "0"
        },
        {
          label: { en: "Feedback Loop Speed", ar: "سرعة إرسال الملاحظات" },
          value: "+85%"
        }
      ],
      image: "refrigerator"
    },
    {
      id: "proj_4",
      title: {
        en: "Customer Complaints Analytics Dashboard",
        ar: "لوحة تحليلات وإدارة شكاوى العملاء تفاعليًا"
      },
      category: {
        en: "Business Intelligence & ETL",
        ar: "ذكاء الأعمال ومعالجة البيانات"
      },
      problem: {
        en: "Customer complaints and field quality feedback were scattered across multiple emails and isolated sheets. Lack of structured analysis made it difficult to identify product failure trends or trace them back to specific manufacturing batches.",
        ar: "كانت شكاوى العملاء وملاحظات الجودة الخارجية مبعثرة في رسائل البريد الإلكتروني والجداول المنفصلة. وصعب غياب التحليل المهيكل رصد اتجاهات العيوب أو تتبعها وربطها بدفعات الإنتاج المتضررة."
      },
      solution: {
        en: "Designed a secure ETL pipeline using Power Query to consolidate multiple complaint databases. Built a dynamic Power BI Dashboard implementing DAX modeling to classify complaints by product lines, defect types, and batch numbers.",
        ar: "تصميم خط معالجة وتجميع بيانات (ETL) بـ Power Query لتوحيد مصادر الشكاوى، وبناء لوحة قيادة Power BI تفاعلية باستخدام لغة DAX لتصنيف الشكاوى وربطها بخطوط الإنتاج وتاريخ الدفعات."
      },
      results: {
        en: "Improved complaint resolution speed, isolated a major recurring component defect saving thousands in warranty claims, and significantly boosted overall customer satisfaction metrics.",
        ar: "تسريع حل ومعالجة شكاوى العملاء، وتحديد عيب متكرر في أحد المكونات وتصحيحه مما وفر مبالغ هائلة من تكاليف الضمان، وزيادة رضا العملاء."
      },
      metrics: [
        {
          label: { en: "Resolution Speed", ar: "سرعة حل الشكاوى" },
          value: "+45%"
        },
        {
          label: { en: "Warranty Claims Saved", ar: "وفر تكاليف الضمان" },
          value: "$40,000+"
        },
        {
          label: { en: "Customer Satisfaction", ar: "مستوى رضا العملاء" },
          value: "+22%"
        }
      ],
      image: "complaints"
    },
    {
      id: "proj_5",
      title: {
        en: "Sales Analytics Dashboard",
        ar: "لوحة قيادة وتحليلات المبيعات الذكية"
      },
      category: {
        en: "Business Intelligence & Data Modeling",
        ar: "ذكاء الأعمال ونمذجة البيانات"
      },
      problem: {
        en: "Sales management lacked interactive daily performance reports and spent hours consolidating commercial invoices. Predictive demand forecasting was non-existent, causing stock shortages and over-stock issues.",
        ar: "كانت إدارة المبيعات تفتقر لتقارير أداء تفاعلية يومية وتستغرق ساعات طويلة لتجميع الفواتير. كما غاب التنبؤ بالطلب المستقبلي، مما سبب مشاكل نقص أو تضخم المخزون بشكل عشوائي."
      },
      solution: {
        en: "Delivered an interactive Sales Analytics & Forecasting dashboard with custom KPI models in Power BI. Integrated multi-source ERP outputs using secure automated data pipelines to provide immediate visual tracking.",
        ar: "تقديم لوحة تحليلات مبيعات وتنبؤ تفاعلية ومؤتمتة بالكامل في Power BI. دمج مخرجات نظام ERP متعدد المصادر عبر خطوط بيانات آمنة لتوفير تتبع فوري وتنبؤ ذكي للمبيعات والطلب."
      },
      results: {
        en: "Eliminated manual sales reporting entirely, saved substantial hours for commercial analysts, and achieved outstanding accuracy in quarterly inventory demand forecasting.",
        ar: "إلغاء التقارير اليدوية للمبيعات تمامًا، وتوفير ساعات عمل أسبوعية لمحللي المبيعات، وتحقيق دقة ممتازة في التنبؤ بالطلب ربع السنوي للمخزون لتجنب الخسائر."
      },
      metrics: [
        {
          label: { en: "Manual Reports", ar: "تقارير يدوية ملغاة" },
          value: "100%"
        },
        {
          label: { en: "Analyst Hours Saved", ar: "ساعات عمل المحللين الموفرة" },
          value: "20+ hr/wk"
        },
        {
          label: { en: "Demand Forecast Accuracy", ar: "دقة التنبؤ بالطلب" },
          value: "94%"
        }
      ],
      image: "sales"
    },
    {
      id: "proj_6",
      title: {
        en: "AppSheet Business Application",
        ar: "تطبيق أعمال متكامل عبر منصة AppSheet"
      },
      category: {
        en: "Business Process Automation",
        ar: "أتمتة وتبسيط عمليات الأعمال"
      },
      problem: {
        en: "Shop floor operators struggled with complex inventory logging, and paper-based loan & cashier logs caused discrepancies and long settlement delays at the end of every production shift.",
        ar: "واجه مشغلو خطوط الإنتاج صعوبة في تسجيل حركة المخزون يدويًا، وسببت السجلات الورقية للخزينة وحركات العهد والسلف فروقات وتأخيرات تسوية طويلة في نهاية كل وردية عمل."
      },
      solution: {
        en: "Built a custom AppSheet mobile and tablet application for inventory tracking, cashier balance checks, and loan management with built-in barcode scanning and instant PDF receipt generation.",
        ar: "تصميم وبناء تطبيق لوحي ومحمولي مخصص بـ AppSheet لتتبع المخزون والعهد ومراجعة الخزينة، يدعم مسح الباركود بالكاميرا وتوليد إيصالات PDF فورية للمستخدمين."
      },
      results: {
        en: "Achieved zero manual ledger discrepancies, dramatically accelerated inventory audits from days to hours, and established 100% digital adoption across the shop floor.",
        ar: "الوصول لنسبة صفر فروقات أو أخطاء في العهد، وتسريع عمليات جرد المخازن بشكل مذهل، مع اعتماد رقمي كامل بنسبة 100% من قبل جميع المشغلين."
      },
      metrics: [
        {
          label: { en: "Ledger Discrepancies", ar: "أخطاء وفروقات الخزينة" },
          value: "0%"
        },
        {
          label: { en: "Inventory Audit Duration", ar: "مدة جرد المخزون" },
          value: "2d → 3hr"
        },
        {
          label: { en: "Operator Adoption", ar: "نسبة تبني المشغلين للتطبيق" },
          value: "100%"
        }
      ],
      image: "appsheet"
    }
  ]
};
