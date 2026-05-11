export const center = {
  name: 'HackPro',
  botUsername: 'hackproMbot',
  phone: '+998 93 434 01 09',
  telegram: '@hackpro_M',
  bot: '@hackproMbot',
  address: 'Zarafshon shahri, Kelajak markazi',
  workHours: 'Har kuni 09:00 - 20:00',
  intro:
    "HackPro - texnologiya sohasida amaliy kurslar beradigan o'quv markazi. Bot orqali kurs tanlash, maslahat olish va ro'yxatdan o'tish mumkin.",
  website: {
    title: 'HackPro rasmiy sayti',
    description:
      "Saytda HackPro kurslari, zamonaviy tizimlar, o'quv markaz afzalliklari, kontaktlar va Telegram bot orqali ro'yxatdan o'tish imkoniyati bor.",
    sections: [
      'Kiberxavfsizlik, IoT va AI kurslari',
      'Zamonaviy tizimlar va laboratoriyalar',
      "Telegram bot orqali tezkor ro'yxatdan o'tish",
      "Kontaktlar va o'quv markaz manzili",
    ],
  },
  courses: [
    {
      id: 'cybersecurity',
      icon: '🛡️',
      title: 'Kiberxavfsizlik',
      duration: '4 oy',
      format: 'Offline va online',
      description:
        "Ethical hacking, tarmoq xavfsizligi, tizimlarni himoyalash, zaifliklarni tahlil qilish va incident response bo'yicha amaliy ta'lim.",
    },
    {
      id: 'iot',
      icon: '🔌',
      title: 'IoT - Internet of Things',
      duration: '4 oy',
      format: 'Offline va online',
      description:
        'Sensorlar, microcontrollerlar, smart home, avtomatlashtirish va real IoT qurilmalar bilan loyiha qilish.',
    },
    {
      id: 'ai',
      icon: '🤖',
      title: "Sun'iy intellekt",
      duration: '5 oy',
      format: 'Offline va online',
      description:
        "Machine learning, data analysis, AI tools, automation va amaliy AI loyihalar orqali kasbiy ko'nikma shakllantirish.",
    },
    {
      id: 'robotics',
      icon: '🦾',
      title: 'Robototexnika',
      duration: '4 oy',
      format: 'Offline va online',
      description:
        "Robot yig'ish, sensorlar, motorlar, controllerlar, algoritmlar va amaliy robot loyihalarini yaratish.",
    },
    {
      id: 'programming',
      icon: '💻',
      title: 'Dasturlash',
      duration: '5 oy',
      format: 'Offline va online',
      description:
        "Web dasturlash, JavaScript, algoritmik fikrlash, backend asoslari va real loyihalar orqali developer ko'nikmalarini shakllantirish.",
    },
  ],
  lessons: [
    {
      id: 'start',
      icon: '🚀',
      title: 'Boshlangich darsliklar',
      description: "IT sohasiga yangi kirayotganlar uchun asosiy tushunchalar.",
      pages: [
        {
          id: 'roadmap',
          icon: '🧭',
          title: "IT yo'l xaritasi",
          body:
            "1. Kompyuter savodxonligini mustahkamlang.\n2. Tanlagan yo'nalishingizni aniqlang.\n3. Har hafta kichik amaliy loyiha qiling.\n4. Portfolio yuriting.",
        },
        {
          id: 'tools',
          icon: '🧰',
          title: 'Kerakli dasturlar',
          body:
            "Boshlash uchun VS Code, Telegram, browser, Git va kursga mos laboratoriya vositalari kerak bo'ladi. Mentorlar har bir darsda kerakli sozlamalarni ko'rsatadi.",
        },
      ],
    },
    {
      id: 'cybersecurity',
      icon: '🛡️',
      title: 'Kiberxavfsizlik darsliklari',
      description: 'Ethical va qonuniy xavfsizlik amaliyoti uchun qisqa sahifalar.',
      pages: [
        {
          id: 'ethics',
          icon: '⚖️',
          title: 'Ethical qoidalar',
          body:
            "Faqat ruxsat berilgan muhitda tekshiruv qiling. Begona tizimga zarar yetkazish mumkin emas. HackPro darslari sandbox va legal laboratoriyalarda o'tiladi.",
        },
        {
          id: 'network',
          icon: '🌐',
          title: 'Tarmoq asoslari',
          body:
            "IP, port, DNS, HTTP va firewall tushunchalarini bilish kiberxavfsizlikning poydevoridir. Keyingi amaliyotlar shu bilimlarga tayanadi.",
        },
      ],
    },
    {
      id: 'programming',
      icon: '💻',
      title: 'Dasturlash darsliklari',
      description: 'Web va software engineering uchun boshlangich sahifalar.',
      pages: [
        {
          id: 'html-css-js',
          icon: '🧱',
          title: 'HTML, CSS, JavaScript',
          body:
            "HTML sahifa tuzilmasini, CSS dizaynni, JavaScript esa interaktivlikni yaratadi. Dasturlash kursida bular real loyiha orqali o'rganiladi.",
        },
        {
          id: 'practice',
          icon: '📝',
          title: 'Amaliy mashq tartibi',
          body:
            "Har kuni 30-60 daqiqa kod yozing, xatoni o'zingiz izlab ko'ring, keyin mentor feedbackini oling. Eng yaxshi o'sish amaliyotdan keladi.",
        },
      ],
    },
    {
      id: 'robotics',
      icon: '🦾',
      title: 'Robototexnika darsliklari',
      description: "Robot, sensor va motorlar bilan ishlash bo'yicha sahifalar.",
      pages: [
        {
          id: 'parts',
          icon: '⚙️',
          title: 'Robot qismlari',
          body:
            "Robot odatda controller, sensor, motor, driver, quvvat manbai va mexanik korpusdan tashkil topadi. Har bir qism alohida test qilinadi.",
        },
        {
          id: 'sensors',
          icon: '📡',
          title: 'Sensorlar',
          body:
            "Sensor robotga atrof-muhitni sezishga yordam beradi. Masofa, yorug'lik, chiziq va harorat sensorlari amaliy loyihalarda ko'p ishlatiladi.",
        },
      ],
    },
  ],
  systems: [
    {
      title: 'Smart CRM va ariza boshqaruvi',
      description:
        "Sayt va Telegram botdan kelgan arizalar saqlanadi, admin xabar oladi va o'quvchi bilan tez bog'lanadi.",
    },
    {
      title: 'AI yordamchi va avtomatlashtirish',
      description:
        "Kurs tanlash, savollarga javob berish va konsultatsiya jarayonini tezlashtirish uchun botga aqlli yo'naltirish qo'shilgan.",
    },
    {
      title: 'IoT laboratoriya muhiti',
      description:
        "ESP32, Arduino, sensorlar va smart qurilmalar orqali real amaliy mashg'ulotlar o'tkazish tizimi.",
    },
    {
      title: 'Cyber Lab va xavfsiz amaliyot',
      description:
        "Kiberxavfsizlik darslari qonuniy, ethical va sandbox muhitda tashkil qilinadi.",
    },
  ],
  faqs: [
    {
      question: "Kurslar kimlar uchun?",
      answer:
        "Boshlovchilar, o'quvchilar, talabalar va IT yo'nalishini amaliy o'rganmoqchi bo'lganlar uchun.",
    },
    {
      question: "Darslar qanday o'tiladi?",
      answer:
        "Nazariya qisqa tushuntiriladi, asosiy urg'u amaliy mashg'ulotlar, mini-loyihalar va mentor feedbackiga beriladi.",
    },
    {
      question: 'Sertifikat beriladimi?',
      answer:
        "Ha, kursni muvaffaqiyatli yakunlagan va loyiha topshirgan o'quvchilarga sertifikat beriladi.",
    },
  ],
};
