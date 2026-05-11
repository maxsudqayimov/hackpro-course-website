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

export const telegramBotUrl = 'https://t.me/hackproMbot?start=website';
export const telegramRegisterUrl = 'https://t.me/hackproMbot?start=register';
export const telegramChannelUrl = 'https://t.me/hackpro_M';

export const navItems = [
  { label: 'Bosh sahifa', href: '#home', Icon: HomeIcon },
  { label: 'Kurslar', href: '#courses', Icon: BookIcon },
  { label: 'Tizimlar', href: '#systems', Icon: ChipIcon },
  { label: 'Bot', href: '#telegram-bot', Icon: BotIcon },
  { label: 'Haqida', href: '#about', Icon: InfoIcon },
  { label: 'Afzalliklar', href: '#advantages', Icon: SparkIcon },
  { label: 'Kontakt', href: '#contact', Icon: PhoneIcon },
];

export const courses = [
  {
    id: 'cybersecurity',
    title: 'Kiberxavfsizlik',
    tag: 'Ethical security',
    Icon: ShieldIcon,
    duration: '4 oy',
    format: 'Offline va online',
    description:
      "Ethical hacking, network security, system protection, vulnerability analysis va incident response bo'yicha qonuniy, amaliy ta'lim.",
    modules: ['Network security', 'Linux va terminal', 'Web security', 'Vulnerability analysis'],
    outcomes: [
      "Qonuniy va ethical xavfsizlik tekshiruvlarini tushunasiz",
      "Tarmoq va web zaifliklarini tahlil qila olasiz",
      "Portfolio uchun security audit loyiha tayyorlaysiz",
    ],
    projects: ['Classroom sandbox audit', 'Secure network checklist', 'Incident response plan'],
  },
  {
    id: 'iot',
    title: 'IoT - Internet of Things',
    tag: 'Connected systems',
    Icon: ChipIcon,
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
    Icon: AiIcon,
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
    Icon: BotIcon,
    duration: '4 oy',
    format: 'Offline va online',
    description:
      "Robot yig'ish, sensorlar, motorlar, controllerlar, algoritmlar va amaliy robot loyihalarini bosqichma-bosqich yaratish.",
    modules: ['Robot mexanikasi', 'Motor va driverlar', 'Sensor integration', 'Robot algoritmlari'],
    outcomes: [
      "Robotning asosiy qismlarini yig'ish va test qilishni bilasiz",
      'Sensorlar orqali muhitni aniqlash va qaror qabul qilishni qurishingiz mumkin',
      'Musobaqa yoki korgazma uchun robot prototip tayyorlaysiz',
    ],
    projects: ['Line follower robot', 'Obstacle avoiding robot', 'Mini robotic arm'],
  },
  {
    id: 'programming',
    title: 'Dasturlash',
    tag: 'Software engineering',
    Icon: CodeIcon,
    duration: '5 oy',
    format: 'Offline va online',
    description:
      "Web dasturlash, JavaScript, algoritmik fikrlash, backend asoslari va real loyihalar orqali zamonaviy developer ko'nikmalarini shakllantirish.",
    modules: ['HTML/CSS', 'JavaScript', 'React asoslari', 'Backend fundamentals'],
    outcomes: [
      'Responsive web sahifalar yaratishni bilasiz',
      'JavaScript bilan interaktiv funksiyalar qurasiz',
      'Portfolio uchun toliq web loyiha tayyorlaysiz',
    ],
    projects: ['Personal portfolio', 'Course landing page', 'Mini CRM app'],
  },
];

export const modernSystems = [
  {
    title: 'Smart CRM va ariza boshqaruvi',
    Icon: ProjectIcon,
    description:
      "Telegram bot orqali kelgan arizalar tartiblanadi, admin xabar oladi va o'quvchi bilan tez bog'lanish mumkin.",
    tags: ['Telegram bot', 'Lead tracking', 'Admin panel'],
  },
  {
    title: 'AI yordamchi va avtomatlashtirish',
    Icon: AiIcon,
    description:
      "O'quvchilar savollariga tez javob berish, kurs tanlashga yordam berish va konsultatsiya jarayonini soddalashtirish.",
    tags: ['AI assistant', 'Automation', 'FAQ'],
  },
  {
    title: 'IoT laboratoriya muhiti',
    Icon: ChipIcon,
    description:
      "Sensorlar, microcontrollerlar va smart qurilmalar bilan real laboratoriya mashg'ulotlari tashkil etiladi.",
    tags: ['Arduino', 'ESP32', 'Smart devices'],
  },
  {
    title: 'Cyber Lab va xavfsiz amaliyot',
    Icon: ShieldIcon,
    description:
      "Kiberxavfsizlik faqat qonuniy, sandbox va ethical muhitda o'rgatiladi: tarmoq, himoya va audit amaliyotlari.",
    tags: ['Ethical hacking', 'Sandbox', 'Security audit'],
  },
];

export const advantages = [
  { title: 'Amaliy loyihalar', Icon: ProjectIcon },
  { title: 'Tajribali mentorlar', Icon: MentorIcon },
  { title: 'Zamonaviy texnologiyalar', Icon: SparkIcon },
  { title: 'Sertifikat', Icon: CertificateIcon },
  { title: "Online va offline o'qish imkoniyati", Icon: GlobeIcon },
  { title: 'Portfolio uchun real loyihalar', Icon: CodeIcon },
];

export const stats = [
  { value: '5', label: "ta asosiy yo'nalish" },
  { value: '20+', label: 'amaliy loyiha' },
  { value: '1000+', label: "o'quvchi" },
  { value: '24/7', label: "qo'llab-quvvatlash" },
];
