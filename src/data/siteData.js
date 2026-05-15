import {
  AiIcon,
  BookIcon,
  BotIcon,
  CertificateIcon,
  ChipIcon,
  CodeIcon,
  GlobeIcon,
  HomeIcon,
  InfoIcon,
  MentorIcon,
  PhoneIcon,
  ProjectIcon,
  ShieldIcon,
  SparkIcon,
} from '../components/icons.jsx';
import { enhanceSiteContent } from './siteEnhancements.js';

export const telegramBotUrl = 'https://t.me/Hackproacademy_bot?start=website';
export const telegramRegisterUrl = 'https://t.me/Hackproacademy_bot?start=register';
export const telegramChannelUrl = 'https://t.me/HackPro_Academy';
export const telegramAdminUrl = 'https://t.me/HackProAcademy';
export const instagramUrl = 'https://www.instagram.com/hackpro_academy/';

export const defaultLanguage = 'uz';

export const languages = [
  { code: 'uz', label: 'UZ', name: "O'zbek" },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'en', label: 'EN', name: 'English' },
];

const navIcons = {
  home: HomeIcon,
  courses: BookIcon,
  systems: ChipIcon,
  pricing: CertificateIcon,
  bot: BotIcon,
  about: InfoIcon,
  advantages: SparkIcon,
  contact: PhoneIcon,
};

const courseIcons = {
  cybersecurity: ShieldIcon,
  iot: ChipIcon,
  ai: AiIcon,
  robotics: BotIcon,
  programming: CodeIcon,
};

const systemIcons = [ProjectIcon, AiIcon, ChipIcon, ShieldIcon];
const advantageIcons = [ProjectIcon, MentorIcon, SparkIcon, CertificateIcon, GlobeIcon, CodeIcon];

const navHrefs = {
  home: '/#home',
  courses: '/#courses',
  systems: '/#systems',
  pricing: '/#pricing',
  bot: '/#telegram-bot',
  about: '/#about',
  advantages: '/#advantages',
  contact: '/#contact',
};

function withNav(labels) {
  return Object.entries(labels).map(([id, label]) => ({
    label,
    href: navHrefs[id],
    Icon: navIcons[id],
  }));
}

function withCourseIcons(courses) {
  return courses.map((course) => ({
    ...course,
    Icon: courseIcons[course.id],
  }));
}

function withSystemIcons(systems) {
  return systems.map((system, index) => ({
    ...system,
    Icon: systemIcons[index],
  }));
}

function withAdvantageIcons(advantages) {
  return advantages.map((advantage, index) => ({
    ...advantage,
    Icon: advantageIcons[index],
  }));
}

export const siteContent = {
  uz: {
    language: 'uz',
    navAria: 'Asosiy menyu',
    homeAria: 'HackPro bosh sahifa',
    menuToggle: 'Menyuni ochish',
    navCta: 'Bot orqali yozilish',
    navItems: withNav({
      home: 'Bosh sahifa',
      courses: 'Kurslar',
      systems: 'Tizimlar',
      pricing: 'Narxlar',
      bot: 'Bot',
      about: 'Haqida',
      advantages: 'Afzalliklar',
      contact: 'Aloqa',
    }),
    hero: {
      eyebrow: 'Professional technology academy',
      title: "Kelajak texnologiyalarini HackPro bilan o'rganing",
      text:
        "Kiberxavfsizlik, IoT va sun'iy intellekt bo'yicha amaliy kurslar: real loyihalar, mentor yordami va IT karyera uchun aniq yo'l xaritasi.",
      primary: "Kurslarni ko'rish",
      secondary: 'Telegram bot',
      trustAria: 'Platforma afzalliklari',
      trust: ['Ethical cybersecurity', 'Real IoT labs', 'AI project studio'],
      visualAria: "HackPro texnologiya platformasi ko'rinishi",
      iotLabel: 'IoT Nodes',
      iotText: 'connected devices',
      aiLabel: 'AI Studio',
      aiText: 'model accuracy lab',
    },
    coursesSection: {
      eyebrow: 'Courses',
      title: "Beshta kuchli texnologiya yo'nalishi",
      text: 'HackPro kurslari xavfsiz, qonuniy va kasbiy amaliyotga tayangan holda tuzilgan.',
      more: "Batafsil ko'rish",
      ariaSuffix: 'kursi haqida batafsil',
    },
    courses: withCourseIcons([
      {
        id: 'cybersecurity',
        title: 'Kiberxavfsizlik',
        tag: 'Ethical security',
        duration: '4 oy',
        format: 'Offline va online',
        description:
          "Ethical hacking, network security, system protection, vulnerability analysis va incident response bo'yicha qonuniy, amaliy ta'lim.",
        modules: ['Network security', 'Linux va terminal', 'Web security', 'Vulnerability analysis'],
        outcomes: [
          "Qonuniy va ethical xavfsizlik tekshiruvlarini tushunasiz",
          "Tarmoq va web zaifliklarini tahlil qila olasiz",
          'Portfolio uchun security audit loyiha tayyorlaysiz',
        ],
        projects: ['Classroom sandbox audit', 'Secure network checklist', 'Incident response plan'],
      },
      {
        id: 'iot',
        title: 'IoT - Internet of Things',
        tag: 'Connected systems',
        duration: '4 oy',
        format: 'Offline va online',
        description:
          'Smart devices, sensorlar, microcontrollerlar, avtomatlashtirish, smart home va industrial IoT loyihalarini yaratish.',
        modules: ['Arduino/ESP32 asoslari', 'Sensorlar', 'Smart home automation', 'IoT dashboard'],
        outcomes: [
          "Sensorlardan ma'lumot o'qish va qurilmani boshqarishni o'rganasiz",
          'Smart qurilmalar orasida ulanish mantiqini tushunasiz',
          'Real IoT prototip yaratib portfolio qilasiz',
        ],
        projects: ['Smart room controller', 'Sensor monitoring system', 'IoT mini dashboard'],
      },
      {
        id: 'ai',
        title: "Sun'iy intellekt",
        tag: 'AI engineering',
        duration: '5 oy',
        format: 'Offline va online',
        description:
          'Machine learning, neural networks, data analysis, AI tools, automation va real hayotdagi AI loyihalar bilan ishlash.',
        modules: ['Python asoslari', 'Data analysis', 'Machine learning', 'AI automation'],
        outcomes: [
          "Data bilan ishlash va model natijasini baholashni o'rganasiz",
          'AI tools orqali avtomatlashtirish yechimlari qurasiz',
          'Amaliy AI loyiha va demo tayyorlaysiz',
        ],
        projects: ['Data analysis report', 'Prediction model', 'AI assistant prototype'],
      },
      {
        id: 'robotics',
        title: 'Robototexnika',
        tag: 'Robotics lab',
        duration: '4 oy',
        format: 'Offline va online',
        description:
          "Robot yig'ish, sensorlar, motorlar, controllerlar, algoritmlar va amaliy robot loyihalarini bosqichma-bosqich yaratish.",
        modules: ['Robot mexanikasi', 'Motor va driverlar', 'Sensor integration', 'Robot algoritmlari'],
        outcomes: [
          "Robotning asosiy qismlarini yig'ish va test qilishni bilasiz",
          'Sensorlar orqali muhitni aniqlash va qaror qabul qilishni qurishingiz mumkin',
          "Musobaqa yoki ko'rgazma uchun robot prototip tayyorlaysiz",
        ],
        projects: ['Line follower robot', 'Obstacle avoiding robot', 'Mini robotic arm'],
      },
      {
        id: 'programming',
        title: 'Dasturlash',
        tag: 'Software engineering',
        duration: '5 oy',
        format: 'Offline va online',
        description:
          "Web dasturlash, JavaScript, algoritmik fikrlash, backend asoslari va real loyihalar orqali zamonaviy developer ko'nikmalarini shakllantirish.",
        modules: ['HTML/CSS', 'JavaScript', 'React asoslari', 'Backend fundamentals'],
        outcomes: [
          'Responsive web sahifalar yaratishni bilasiz',
          'JavaScript bilan interaktiv funksiyalar qurasiz',
          "Portfolio uchun to'liq web loyiha tayyorlaysiz",
        ],
        projects: ['Personal portfolio', 'Course landing page', 'Mini CRM app'],
      },
    ]),
    courseDetail: {
      back: 'Kurslarga qaytish',
      register: 'Shu kursga yozilish',
      otherCourses: 'Boshqa kurslar',
      duration: 'Muddat',
      format: 'Format',
      result: 'Natija',
      resultText: 'Amaliy loyiha va portfolio',
      modulesTitle: "Nimalar o'rganiladi?",
      outcomesTitle: 'Kurs yakunida',
      projectsTitle: 'Amaliy loyihalar',
      projectText: 'Mentor nazorati ostida bosqichma-bosqich bajariladigan portfolio loyihasi.',
    },
    systemsSection: {
      eyebrow: 'Modern systems',
      title: 'HackPro ichidagi zamonaviy tizimlar',
      text:
        "O'quv jarayoni sayt, Telegram bot, amaliy laboratoriyalar va avtomatlashtirilgan ariza tizimi bilan birga ishlaydi.",
    },
    modernSystems: withSystemIcons([
      {
        title: 'Smart CRM va ariza boshqaruvi',
        description:
          "Telegram bot orqali kelgan arizalar tartiblanadi, admin xabar oladi va o'quvchi bilan tez bog'lanish mumkin.",
        tags: ['Telegram bot', 'Lead tracking', 'Admin panel'],
      },
      {
        title: 'AI yordamchi va avtomatlashtirish',
        description:
          "O'quvchilar savollariga tez javob berish, kurs tanlashga yordam berish va konsultatsiya jarayonini soddalashtirish.",
        tags: ['AI assistant', 'Automation', 'FAQ'],
      },
      {
        title: 'IoT laboratoriya muhiti',
        description:
          'Sensorlar, microcontrollerlar va smart qurilmalar bilan real laboratoriya mashgulotlari tashkil etiladi.',
        tags: ['Arduino', 'ESP32', 'Smart devices'],
      },
      {
        title: 'Cyber Lab va xavfsiz amaliyot',
        description:
          "Kiberxavfsizlik faqat qonuniy, sandbox va ethical muhitda o'rgatiladi: tarmoq, himoya va audit amaliyotlari.",
        tags: ['Ethical hacking', 'Sandbox', 'Security audit'],
      },
    ]),
    bot: {
      eyebrow: 'Telegram bot',
      title: "Saytdan botga bir bosishda o'ting",
      text:
        "HackPro botida kurslarni tanlash, zamonaviy tizimlar bilan tanishish, savol-javoblarni ko'rish va ro'yxatdan o'tish bir joyda jamlangan.",
      register: "Ro'yxatdan o'tish",
      open: 'Botni ochish',
      phoneAria: 'Telegram bot menyusi namunasi',
      welcome: 'Assalomu alaykum! HackPro botiga xush kelibsiz.',
      menu: ['Kurslar', 'Sayt haqida', 'Tizimlar', "Ro'yxatdan o'tish"],
    },
    about: {
      eyebrow: 'About HackPro',
      title: "Amaliy bilim, real loyiha va mentor bilan o'sish",
      paragraphs: [
        "HackPro o'quvchilarga zamonaviy texnologiyalarni nazariya bilan cheklanmasdan, amaliy laboratoriyalar va real hayotga yaqin topshiriqlar orqali o'rgatadi.",
        "Platformada mentor qo'llab-quvvatlashi, career-focused o'quv rejasi, portfolio uchun loyihalar va professional muhitda ishlatiladigan metodlar jamlangan.",
      ],
      imageAlt: "HackPro o'quv markazi mentori kompyuter sinfida",
    },
    advantagesSection: {
      eyebrow: 'Advantages',
      title: 'Nima uchun HackPro?',
      text: "Talabalar va IT mutaxassislari uchun ishonchli, premium va natijaga yo'naltirilgan o'quv tajribasi.",
    },
    advantages: withAdvantageIcons([
      { title: 'Amaliy loyihalar' },
      { title: 'Tajribali mentorlar' },
      { title: 'Zamonaviy texnologiyalar' },
      { title: 'Sertifikat' },
      { title: "Online va offline o'qish imkoniyati" },
      { title: 'Portfolio uchun real loyihalar' },
    ]),
    stats: [
      { value: '5', label: "ta asosiy yo'nalish" },
      { value: '20+', label: 'amaliy loyiha' },
      { value: '1000+', label: "o'quvchi" },
      { value: '24/7', label: "qo'llab-quvvatlash" },
    ],
    contact: {
      eyebrow: 'Aloqa',
      title: 'HackPro kurslari haqida maslahat oling',
      text:
        "Yo'nalishni tanlang, savolingizni yuboring va jamoamiz sizga o'qish formati, kurs dasturi va boshlash jarayoni bo'yicha yordam beradi.",
      registerLabel: "@Hackproacademy_bot - ro'yxatdan o'tish",
      channelLabel: '@HackPro_Academy - Telegram kanal',
      adminLabel: '@HackProAcademy - Telegram admin',
      instagramLabel: '@hackpro_academy - Instagram',
      address: 'Zarafshon shahri, HackPro Academy',
      fields: {
        name: 'Ism',
        namePlaceholder: 'Ismingiz',
        phone: 'Telefon',
        course: "Kurs yo'nalishi",
        chooseCourse: "Yo'nalishni tanlang",
        message: 'Xabar',
        messagePlaceholder: 'Qaysi kurs sizni qiziqtiryapti?',
        submit: 'Bot orqali yuborish',
      },
    },
    footer: {
      text: "Kiberxavfsizlik, IoT va sun'iy intellekt bo'yicha professional, amaliy va ethical technology ta'lim platformasi.",
      socialAria: 'Ijtimoiy tarmoqlar',
      bot: 'Telegram bot',
      channel: 'Telegram kanal',
      admin: 'Telegram admin',
      instagram: 'Instagram',
      address: 'Manzil',
      copyright: '(c) 2026 HackPro. Barcha huquqlar himoyalangan.',
    },
    aiChat: {
      aria: 'HackPro AI chat',
      title: 'HackPro AI',
      subtitle: 'Online yordamchi',
      close: 'Chatni yopish',
      input: 'Savolingizni yozing',
      inputAria: 'AI chat savoli',
      send: 'Yuborish',
      sending: 'Kuting',
      thinking: 'AI javob tayyorlayapti...',
      sendAria: 'AI chatga yuborish',
      link: "Telegram bot orqali ro'yxatdan o'tish",
      openAria: 'AI chatni ochish',
      toggleTop: 'AI',
      toggleBottom: 'Chat',
      prompts: [
        'Qaysi kursni tanlay?',
        'Kiberxavfsizlik haqida',
        "Sun'iy intellekt kursi",
        'Robototexnika kursi',
        'Dasturlash kursi',
        'Aloqa',
      ],
      welcome:
        "Salom! Men HackPro AI yordamchisiman. Kurs tanlash, ro'yxatdan o'tish yoki kontaktlar bo'yicha savol bering.",
      empty:
        "Savolingizni yozing. Masalan: qaysi kursni tanlay, AI kursi, kontakt yoki ro'yxatdan o'tish.",
      courseSuffix:
        "Bu yo'nalish amaliy topshiriqlar, mentor yordami va portfolio uchun loyiha bilan o'rganiladi.",
      systemsPrefix: 'HackPro zamonaviy tizimlari',
      systemsSuffix:
        "Bu tizimlar o'quv jarayonini sayt, Telegram bot va amaliy laboratoriyalar bilan bog'laydi.",
      price:
        "Narxlar kurs formati va guruhga qarab belgilanadi. Eng aniq ma'lumot uchun Telegram bot orqali ro'yxatdan o'ting, admin siz bilan bog'lanadi.",
      contact:
        'Aloqa: +998 93 434 01 09. Manzil: Zarafshon shahri, HackPro Academy. Telegram bot yoki Instagram orqali ham yozishingiz mumkin.',
      register:
        "Ro'yxatdan o'tish uchun pastdagi Telegram tugmasini bosing. Bot ismingiz, telefon raqamingiz, kurs va o'qish formatini so'raydi.",
      advice:
        "Agar xavfsizlik va tarmoq sizga qiziq bo'lsa Kiberxavfsizlikni, qurilmalar va sensorlar yoqsa IoT yoki Robototexnikani, data va avtomatlashtirish qiziqtirsa Sun'iy intellektni, sayt va ilova yaratish yoqsa Dasturlashni tanlang.",
      fallback:
        "Men HackPro kurslari, zamonaviy tizimlar, kontaktlar va ro'yxatdan o'tish bo'yicha yordam beraman. Savolingizni biroz aniqroq yozing yoki tezkor tugmalardan birini tanlang.",
    },
  },
  ru: {
    language: 'ru',
    navAria: 'Главное меню',
    homeAria: 'Главная страница HackPro',
    menuToggle: 'Открыть меню',
    navCta: 'Записаться через бота',
    navItems: withNav({
      home: 'Главная',
      courses: 'Курсы',
      systems: 'Системы',
      pricing: 'Цены',
      bot: 'Бот',
      about: 'О нас',
      advantages: 'Преимущества',
      contact: 'Контакты',
    }),
    hero: {
      eyebrow: 'Professional technology academy',
      title: 'Изучайте технологии будущего вместе с HackPro',
      text:
        'Практические курсы по кибербезопасности, IoT и искусственному интеллекту: реальные проекты, поддержка ментора и понятная карта развития в IT.',
      primary: 'Посмотреть курсы',
      secondary: 'Telegram бот',
      trustAria: 'Преимущества платформы',
      trust: ['Ethical cybersecurity', 'Real IoT labs', 'AI project studio'],
      visualAria: 'Визуальная панель технологической платформы HackPro',
      iotLabel: 'IoT Nodes',
      iotText: 'подключенных устройств',
      aiLabel: 'AI Studio',
      aiText: 'точность модели в лаборатории',
    },
    coursesSection: {
      eyebrow: 'Courses',
      title: 'Пять сильных технологических направлений',
      text: 'Курсы HackPro построены на безопасной, законной и профессиональной практике.',
      more: 'Подробнее',
      ariaSuffix: 'подробнее о курсе',
    },
    courses: withCourseIcons([
      {
        id: 'cybersecurity',
        title: 'Кибербезопасность',
        tag: 'Ethical security',
        duration: '4 месяца',
        format: 'Офлайн и онлайн',
        description:
          'Законное практическое обучение по ethical hacking, network security, защите систем, анализу уязвимостей и incident response.',
        modules: ['Network security', 'Linux и терминал', 'Web security', 'Vulnerability analysis'],
        outcomes: [
          'Поймете принципы законной и этичной проверки безопасности',
          'Научитесь анализировать сетевые и веб-уязвимости',
          'Подготовите проект security audit для портфолио',
        ],
        projects: ['Classroom sandbox audit', 'Secure network checklist', 'Incident response plan'],
      },
      {
        id: 'iot',
        title: 'IoT - Internet of Things',
        tag: 'Connected systems',
        duration: '4 месяца',
        format: 'Офлайн и онлайн',
        description:
          'Создание проектов со smart devices, сенсорами, микроконтроллерами, автоматизацией, smart home и industrial IoT.',
        modules: ['Основы Arduino/ESP32', 'Сенсоры', 'Smart home automation', 'IoT dashboard'],
        outcomes: [
          'Научитесь считывать данные с сенсоров и управлять устройствами',
          'Поймете логику связи между smart-устройствами',
          'Создадите реальный IoT-прототип для портфолио',
        ],
        projects: ['Smart room controller', 'Sensor monitoring system', 'IoT mini dashboard'],
      },
      {
        id: 'ai',
        title: 'Искусственный интеллект',
        tag: 'AI engineering',
        duration: '5 месяцев',
        format: 'Офлайн и онлайн',
        description:
          'Работа с machine learning, neural networks, data analysis, AI tools, automation и реальными AI-проектами.',
        modules: ['Основы Python', 'Data analysis', 'Machine learning', 'AI automation'],
        outcomes: [
          'Научитесь работать с данными и оценивать результат модели',
          'Будете создавать решения автоматизации с помощью AI tools',
          'Подготовите практический AI-проект и демо',
        ],
        projects: ['Data analysis report', 'Prediction model', 'AI assistant prototype'],
      },
      {
        id: 'robotics',
        title: 'Робототехника',
        tag: 'Robotics lab',
        duration: '4 месяца',
        format: 'Офлайн и онлайн',
        description:
          'Пошаговое создание роботов: сборка, сенсоры, моторы, контроллеры, алгоритмы и практические проекты.',
        modules: ['Механика робота', 'Моторы и драйверы', 'Sensor integration', 'Алгоритмы робота'],
        outcomes: [
          'Научитесь собирать и тестировать основные части робота',
          'Сможете строить решения через сенсоры и принятие решений',
          'Подготовите прототип робота для соревнования или выставки',
        ],
        projects: ['Line follower robot', 'Obstacle avoiding robot', 'Mini robotic arm'],
      },
      {
        id: 'programming',
        title: 'Программирование',
        tag: 'Software engineering',
        duration: '5 месяцев',
        format: 'Офлайн и онлайн',
        description:
          'Web-разработка, JavaScript, алгоритмическое мышление, основы backend и реальные проекты для навыков современного developer.',
        modules: ['HTML/CSS', 'JavaScript', 'Основы React', 'Backend fundamentals'],
        outcomes: [
          'Научитесь создавать responsive web-страницы',
          'Будете строить интерактивные функции на JavaScript',
          'Подготовите полноценный web-проект для портфолио',
        ],
        projects: ['Personal portfolio', 'Course landing page', 'Mini CRM app'],
      },
    ]),
    courseDetail: {
      back: 'Вернуться к курсам',
      register: 'Записаться на курс',
      otherCourses: 'Другие курсы',
      duration: 'Длительность',
      format: 'Формат',
      result: 'Результат',
      resultText: 'Практический проект и портфолио',
      modulesTitle: 'Что изучается?',
      outcomesTitle: 'После курса',
      projectsTitle: 'Практические проекты',
      projectText: 'Портфолио-проект, который выполняется поэтапно под контролем ментора.',
    },
    systemsSection: {
      eyebrow: 'Modern systems',
      title: 'Современные системы внутри HackPro',
      text:
        'Учебный процесс работает вместе с сайтом, Telegram-ботом, практическими лабораториями и автоматизированной системой заявок.',
    },
    modernSystems: withSystemIcons([
      {
        title: 'Smart CRM и управление заявками',
        description:
          'Заявки из Telegram-бота упорядочиваются, администратор получает уведомление и может быстро связаться с учеником.',
        tags: ['Telegram bot', 'Lead tracking', 'Admin panel'],
      },
      {
        title: 'AI помощник и автоматизация',
        description:
          'Быстрые ответы на вопросы учеников, помощь в выборе курса и упрощение консультации.',
        tags: ['AI assistant', 'Automation', 'FAQ'],
      },
      {
        title: 'IoT лабораторная среда',
        description:
          'Практические занятия с сенсорами, микроконтроллерами и smart-устройствами.',
        tags: ['Arduino', 'ESP32', 'Smart devices'],
      },
      {
        title: 'Cyber Lab и безопасная практика',
        description:
          'Кибербезопасность изучается только в законной, sandbox и ethical среде: сети, защита и аудит.',
        tags: ['Ethical hacking', 'Sandbox', 'Security audit'],
      },
    ]),
    bot: {
      eyebrow: 'Telegram bot',
      title: 'Переходите с сайта в бот одним нажатием',
      text:
        'В боте HackPro собраны выбор курсов, современные системы, вопросы и ответы, а также запись на обучение.',
      register: 'Записаться',
      open: 'Открыть бота',
      phoneAria: 'Пример меню Telegram-бота',
      welcome: 'Здравствуйте! Добро пожаловать в бот HackPro.',
      menu: ['Курсы', 'О сайте', 'Системы', 'Записаться'],
    },
    about: {
      eyebrow: 'About HackPro',
      title: 'Практические знания, реальные проекты и рост с ментором',
      paragraphs: [
        'HackPro обучает современным технологиям не только через теорию, но и через практические лаборатории и задания, близкие к реальной работе.',
        'Платформа объединяет поддержку ментора, career-focused учебный план, проекты для портфолио и методы, которые используются в профессиональной среде.',
      ],
      imageAlt: 'Ментор учебного центра HackPro в компьютерном классе',
    },
    advantagesSection: {
      eyebrow: 'Advantages',
      title: 'Почему HackPro?',
      text: 'Надежный, премиальный и ориентированный на результат учебный опыт для студентов и IT-специалистов.',
    },
    advantages: withAdvantageIcons([
      { title: 'Практические проекты' },
      { title: 'Опытные менторы' },
      { title: 'Современные технологии' },
      { title: 'Сертификат' },
      { title: 'Возможность учиться онлайн и офлайн' },
      { title: 'Реальные проекты для портфолио' },
    ]),
    stats: [
      { value: '5', label: 'основных направлений' },
      { value: '20+', label: 'практических проектов' },
      { value: '1000+', label: 'учеников' },
      { value: '24/7', label: 'поддержка' },
    ],
    contact: {
      eyebrow: 'Contact',
      title: 'Получите консультацию по курсам HackPro',
      text:
        'Выберите направление, отправьте вопрос, и наша команда поможет с форматом обучения, программой курса и началом занятий.',
      registerLabel: '@Hackproacademy_bot - запись на обучение',
      channelLabel: '@HackPro_Academy - Telegram канал',
      adminLabel: '@HackProAcademy - Telegram admin',
      instagramLabel: '@hackpro_academy - Instagram',
      address: 'город Зарафшан, HackPro Academy',
      fields: {
        name: 'Имя',
        namePlaceholder: 'Ваше имя',
        phone: 'Телефон',
        course: 'Направление курса',
        chooseCourse: 'Выберите направление',
        message: 'Сообщение',
        messagePlaceholder: 'Какой курс вас интересует?',
        submit: 'Отправить через бота',
      },
    },
    footer: {
      text: 'Профессиональная, практическая и ethical technology образовательная платформа по кибербезопасности, IoT и искусственному интеллекту.',
      socialAria: 'Социальные сети',
      bot: 'Telegram бот',
      channel: 'Telegram канал',
      admin: 'Telegram admin',
      instagram: 'Instagram',
      address: 'Адрес',
      copyright: '(c) 2026 HackPro. Все права защищены.',
    },
    aiChat: {
      aria: 'HackPro AI chat',
      title: 'HackPro AI',
      subtitle: 'Онлайн помощник',
      close: 'Закрыть чат',
      input: 'Напишите вопрос',
      inputAria: 'Вопрос для AI chat',
      send: 'Отправить',
      sending: 'Ждите',
      thinking: 'AI готовит ответ...',
      sendAria: 'Отправить в AI chat',
      link: 'Записаться через Telegram-бота',
      openAria: 'Открыть AI chat',
      toggleTop: 'AI',
      toggleBottom: 'Chat',
      prompts: [
        'Какой курс выбрать?',
        'О кибербезопасности',
        'Курс искусственного интеллекта',
        'Курс робототехники',
        'Курс программирования',
        'Контакты',
      ],
      welcome:
        'Здравствуйте! Я AI помощник HackPro. Задайте вопрос о выборе курса, записи или контактах.',
      empty:
        'Напишите вопрос. Например: какой курс выбрать, AI курс, контакты или запись.',
      courseSuffix:
        'Это направление изучается через практические задания, поддержку ментора и проект для портфолио.',
      systemsPrefix: 'Современные системы HackPro',
      systemsSuffix:
        'Эти системы связывают обучение с сайтом, Telegram-ботом и практическими лабораториями.',
      price:
        'Стоимость зависит от формата курса и группы. Для точной информации запишитесь через Telegram-бота, администратор свяжется с вами.',
      contact:
        'Контакт: +998 93 434 01 09. Адрес: город Зарафшан, HackPro Academy. Также можно написать через Telegram-бот или Instagram.',
      register:
        'Для записи нажмите кнопку Telegram ниже. Бот спросит имя, телефон, курс и формат обучения.',
      advice:
        'Если интересны безопасность и сети, выбирайте Кибербезопасность. Если нравятся устройства и сенсоры, выбирайте IoT или Робототехнику. Если интересны data и автоматизация, выбирайте AI. Если хотите создавать сайты и приложения, выбирайте Программирование.',
      fallback:
        'Я помогаю по курсам HackPro, современным системам, контактам и записи. Напишите вопрос точнее или выберите быструю кнопку.',
    },
  },
  en: {
    language: 'en',
    navAria: 'Main menu',
    homeAria: 'HackPro home page',
    menuToggle: 'Open menu',
    navCta: 'Register via bot',
    navItems: withNav({
      home: 'Home',
      courses: 'Courses',
      systems: 'Systems',
      pricing: 'Pricing',
      bot: 'Bot',
      about: 'About',
      advantages: 'Benefits',
      contact: 'Contact',
    }),
    hero: {
      eyebrow: 'Professional technology academy',
      title: 'Learn future technologies with HackPro',
      text:
        'Practical courses in cybersecurity, IoT and artificial intelligence: real projects, mentor support and a clear roadmap for an IT career.',
      primary: 'View courses',
      secondary: 'Telegram bot',
      trustAria: 'Platform benefits',
      trust: ['Ethical cybersecurity', 'Real IoT labs', 'AI project studio'],
      visualAria: 'HackPro technology platform preview',
      iotLabel: 'IoT Nodes',
      iotText: 'connected devices',
      aiLabel: 'AI Studio',
      aiText: 'model accuracy lab',
    },
    coursesSection: {
      eyebrow: 'Courses',
      title: 'Five strong technology tracks',
      text: 'HackPro courses are built on safe, legal and career-focused practice.',
      more: 'View details',
      ariaSuffix: 'course details',
    },
    courses: withCourseIcons([
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        tag: 'Ethical security',
        duration: '4 months',
        format: 'Offline and online',
        description:
          'Legal, practical training in ethical hacking, network security, system protection, vulnerability analysis and incident response.',
        modules: ['Network security', 'Linux and terminal', 'Web security', 'Vulnerability analysis'],
        outcomes: [
          'You will understand legal and ethical security testing',
          'You will analyze network and web vulnerabilities',
          'You will prepare a security audit project for your portfolio',
        ],
        projects: ['Classroom sandbox audit', 'Secure network checklist', 'Incident response plan'],
      },
      {
        id: 'iot',
        title: 'IoT - Internet of Things',
        tag: 'Connected systems',
        duration: '4 months',
        format: 'Offline and online',
        description:
          'Build projects with smart devices, sensors, microcontrollers, automation, smart home and industrial IoT.',
        modules: ['Arduino/ESP32 basics', 'Sensors', 'Smart home automation', 'IoT dashboard'],
        outcomes: [
          'You will read sensor data and control devices',
          'You will understand connection logic between smart devices',
          'You will build a real IoT prototype for your portfolio',
        ],
        projects: ['Smart room controller', 'Sensor monitoring system', 'IoT mini dashboard'],
      },
      {
        id: 'ai',
        title: 'Artificial Intelligence',
        tag: 'AI engineering',
        duration: '5 months',
        format: 'Offline and online',
        description:
          'Work with machine learning, neural networks, data analysis, AI tools, automation and real-world AI projects.',
        modules: ['Python basics', 'Data analysis', 'Machine learning', 'AI automation'],
        outcomes: [
          'You will work with data and evaluate model results',
          'You will build automation solutions with AI tools',
          'You will prepare a practical AI project and demo',
        ],
        projects: ['Data analysis report', 'Prediction model', 'AI assistant prototype'],
      },
      {
        id: 'robotics',
        title: 'Robotics',
        tag: 'Robotics lab',
        duration: '4 months',
        format: 'Offline and online',
        description:
          'Step-by-step robot building with sensors, motors, controllers, algorithms and hands-on robotics projects.',
        modules: ['Robot mechanics', 'Motors and drivers', 'Sensor integration', 'Robot algorithms'],
        outcomes: [
          'You will assemble and test the core parts of a robot',
          'You will build sensor-based environment detection and decisions',
          'You will prepare a robot prototype for a competition or showcase',
        ],
        projects: ['Line follower robot', 'Obstacle avoiding robot', 'Mini robotic arm'],
      },
      {
        id: 'programming',
        title: 'Programming',
        tag: 'Software engineering',
        duration: '5 months',
        format: 'Offline and online',
        description:
          'Web development, JavaScript, algorithmic thinking, backend basics and real projects for modern developer skills.',
        modules: ['HTML/CSS', 'JavaScript', 'React basics', 'Backend fundamentals'],
        outcomes: [
          'You will create responsive web pages',
          'You will build interactive features with JavaScript',
          'You will prepare a complete web project for your portfolio',
        ],
        projects: ['Personal portfolio', 'Course landing page', 'Mini CRM app'],
      },
    ]),
    courseDetail: {
      back: 'Back to courses',
      register: 'Register for this course',
      otherCourses: 'Other courses',
      duration: 'Duration',
      format: 'Format',
      result: 'Result',
      resultText: 'Practical project and portfolio',
      modulesTitle: 'What will you learn?',
      outcomesTitle: 'By the end of the course',
      projectsTitle: 'Practical projects',
      projectText: 'A portfolio project completed step by step under mentor supervision.',
    },
    systemsSection: {
      eyebrow: 'Modern systems',
      title: 'Modern systems inside HackPro',
      text:
        'The learning process works together with the website, Telegram bot, hands-on labs and automated registration system.',
    },
    modernSystems: withSystemIcons([
      {
        title: 'Smart CRM and lead management',
        description:
          'Applications from the Telegram bot are organized, admins receive notifications and can quickly contact students.',
        tags: ['Telegram bot', 'Lead tracking', 'Admin panel'],
      },
      {
        title: 'AI assistant and automation',
        description:
          'Fast answers to student questions, course selection help and a simpler consultation process.',
        tags: ['AI assistant', 'Automation', 'FAQ'],
      },
      {
        title: 'IoT laboratory environment',
        description:
          'Hands-on lab sessions with sensors, microcontrollers and smart devices.',
        tags: ['Arduino', 'ESP32', 'Smart devices'],
      },
      {
        title: 'Cyber Lab and safe practice',
        description:
          'Cybersecurity is taught only in legal, sandbox and ethical environments: networks, protection and audits.',
        tags: ['Ethical hacking', 'Sandbox', 'Security audit'],
      },
    ]),
    bot: {
      eyebrow: 'Telegram bot',
      title: 'Move from the site to the bot in one click',
      text:
        'The HackPro bot combines course selection, modern systems, Q&A and registration in one place.',
      register: 'Register',
      open: 'Open bot',
      phoneAria: 'Telegram bot menu preview',
      welcome: 'Hello! Welcome to the HackPro bot.',
      menu: ['Courses', 'About site', 'Systems', 'Registration'],
    },
    about: {
      eyebrow: 'About HackPro',
      title: 'Practical knowledge, real projects and mentor-led growth',
      paragraphs: [
        'HackPro teaches modern technologies through practical labs and real-world tasks, not theory alone.',
        'The platform brings together mentor support, a career-focused curriculum, portfolio projects and methods used in professional environments.',
      ],
      imageAlt: 'HackPro learning center mentor in a computer classroom',
    },
    advantagesSection: {
      eyebrow: 'Advantages',
      title: 'Why HackPro?',
      text: 'A reliable, premium and result-oriented learning experience for students and IT specialists.',
    },
    advantages: withAdvantageIcons([
      { title: 'Practical projects' },
      { title: 'Experienced mentors' },
      { title: 'Modern technologies' },
      { title: 'Certificate' },
      { title: 'Online and offline learning' },
      { title: 'Real projects for your portfolio' },
    ]),
    stats: [
      { value: '5', label: 'main tracks' },
      { value: '20+', label: 'practical projects' },
      { value: '1000+', label: 'students' },
      { value: '24/7', label: 'support' },
    ],
    contact: {
      eyebrow: 'Contact',
      title: 'Get advice about HackPro courses',
      text:
        'Choose a track, send your question and our team will help with the learning format, course program and getting started.',
      registerLabel: '@Hackproacademy_bot - registration',
      channelLabel: '@HackPro_Academy - Telegram channel',
      adminLabel: '@HackProAcademy - Telegram admin',
      instagramLabel: '@hackpro_academy - Instagram',
      address: 'Zarafshan city, HackPro Academy',
      fields: {
        name: 'Name',
        namePlaceholder: 'Your name',
        phone: 'Phone',
        course: 'Course track',
        chooseCourse: 'Choose a track',
        message: 'Message',
        messagePlaceholder: 'Which course are you interested in?',
        submit: 'Send via bot',
      },
    },
    footer: {
      text: 'A professional, practical and ethical technology education platform for cybersecurity, IoT and artificial intelligence.',
      socialAria: 'Social links',
      bot: 'Telegram bot',
      channel: 'Telegram channel',
      admin: 'Telegram admin',
      instagram: 'Instagram',
      address: 'Address',
      copyright: '(c) 2026 HackPro. All rights reserved.',
    },
    aiChat: {
      aria: 'HackPro AI chat',
      title: 'HackPro AI',
      subtitle: 'Online assistant',
      close: 'Close chat',
      input: 'Write your question',
      inputAria: 'AI chat question',
      send: 'Send',
      sending: 'Wait',
      thinking: 'AI is preparing an answer...',
      sendAria: 'Send to AI chat',
      link: 'Register via Telegram bot',
      openAria: 'Open AI chat',
      toggleTop: 'AI',
      toggleBottom: 'Chat',
      prompts: [
        'Which course should I choose?',
        'About cybersecurity',
        'Artificial intelligence course',
        'Robotics course',
        'Programming course',
        'Contacts',
      ],
      welcome:
        'Hi! I am the HackPro AI assistant. Ask about choosing a course, registration or contacts.',
      empty:
        'Write your question. For example: which course should I choose, AI course, contacts or registration.',
      courseSuffix:
        'This track is studied through practical tasks, mentor support and a portfolio project.',
      systemsPrefix: 'HackPro modern systems',
      systemsSuffix:
        'These systems connect the learning process with the website, Telegram bot and practical labs.',
      price:
        'Pricing depends on course format and group. For exact information, register through the Telegram bot and an admin will contact you.',
      contact:
        'Contact: +998 93 434 01 09. Address: Zarafshan city, HackPro Academy. You can also contact us via the Telegram bot or Instagram.',
      register:
        'To register, click the Telegram button below. The bot will ask for your name, phone number, course and learning format.',
      advice:
        'If you like security and networks, choose Cybersecurity. If you like devices and sensors, choose IoT or Robotics. If you are interested in data and automation, choose AI. If you want to build websites and apps, choose Programming.',
      fallback:
        'I can help with HackPro courses, modern systems, contacts and registration. Please ask more specifically or choose a quick prompt.',
    },
  },
};

export function getSiteContent(language) {
  const selectedLanguage = siteContent[language] ? language : defaultLanguage;
  return enhanceSiteContent(siteContent[selectedLanguage], selectedLanguage);
}
