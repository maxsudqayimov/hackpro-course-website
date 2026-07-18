export const center = {
  name: 'HackPro',
  botUsername: 'Hackproacademy_bot',
  phone: '+998 93 434 01 09',
  telegram: '@HackPro_Academy',
  admin: '@HackProAcademy',
  bot: '@Hackproacademy_bot',
  address: 'Zarafshon shahri, HackPro Academy',
  workHours: 'Har kuni 09:00 - 20:00',
  logoUrl: 'https://www.hackpro.uz/static/img/hackpro-logo-transparent.png',
  intro:
    "HackPro - texnologiya sohasida amaliy kurslar beradigan o'quv markazi. Bot orqali kurs tanlash, maslahat olish va ro'yxatdan o'tish mumkin.",
  website: {
    title: 'HackPro rasmiy sayti',
    description:
      "Saytda HackPro kurslari, zamonaviy tizimlar, o'quv markaz afzalliklari, kontaktlar va Telegram bot orqali ro'yxatdan o'tish imkoniyati bor.",
    sections: [
      "Kiberxavfsizlik, sun'iy intellekt, robototexnika, dasturlash, mobilografiya va SMM kurslari",
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
      lessons: '156 dars',
      duration: '312 soat',
      students: "120 o'quvchi",
      price: "Oyiga 500 000 so'm",
      format: 'Offline va online',
      description:
        "Tarmoq, qurilma va akkauntlarni himoya qilish asoslarini amaliy mashg'ulotlar orqali o'rganasiz. Kurs real hayotdagi xavfsizlik muammolarini tushunish va ularga to'g'ri yechim berishga yo'naltirilgan.",
      topics: [
        'Internet xavfsizligi, parol va akkaunt himoyasi',
        'Tarmoq xavfsizligi va oddiy himoya sozlamalari',
        'Zaifliklarni aniqlash va xavfsiz tekshiruv usullari',
        'Phishing, zararli havolalar va ijtimoiy muhandislikdan himoyalanish',
        'Amaliy laboratoriya va mini loyiha',
      ],
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'Sun’iy intellekt',
      lessons: '75 dars',
      duration: '150 soat',
      students: "95 o'quvchi",
      price: "Oyiga 200 000 so'm",
      format: 'Offline va online',
      description:
        "AI vositalaridan to'g'ri foydalanish, prompt yozish va ish jarayonlarini avtomatlashtirishni o'rganasiz. Kurs ijodiy, biznes va texnik vazifalarda sun'iy intellektdan foydali foydalanishga qaratilgan.",
      topics: [
        'AI nima va undan kundalik ishda qanday foydalaniladi',
        'Prompt yozish, natijani tahlil qilish va yaxshilash',
        'Matn, rasm va kontent yaratish jarayonlari',
        'Oddiy avtomatlashtirish va yordamchi vositalar',
        'AI bilan yakuniy amaliy loyiha',
      ],
    },
    {
      id: 'robotics',
      icon: '🦾',
      title: 'Robototexnika',
      lessons: '75 dars',
      duration: '150 soat',
      students: "68 o'quvchi",
      price: "Oyiga 150 000 so'm",
      format: 'Offline va online',
      description:
        "Robot qurilmalarini yig'ish, sensor va motorlar bilan ishlash hamda mikrokontroller orqali boshqarishni amalda o'rganasiz. Kurs texnik tafakkur va loyiha qilish ko'nikmasini rivojlantiradi.",
      topics: [
        'Robototexnika asoslari va qurilma qismlari',
        'Sensorlar, motorlar va boshqaruv modullari',
        'Mikrokontroller bilan oddiy dasturlash',
        'Robot harakati va avtomatik boshqaruv',
        "Yakuniy robot loyiha yig'ish",
      ],
    },
    {
      id: 'programming',
      icon: '💻',
      title: 'Dasturlash',
      lessons: '132 dars',
      duration: '264 soat',
      students: "82 o'quvchi",
      price: "Oyiga 200 000 so'm",
      format: 'Offline va online',
      description:
        "Web dasturlash asoslari, algoritmik fikrlash va real loyiha yaratish bosqichlarini o'rganasiz. Kurs boshlang'ichdan amaliy natijaga chiqish uchun tuzilgan.",
      topics: [
        'HTML, CSS va JavaScript asoslari',
        'Interaktiv sahifalar va responsiv dizayn',
        'Algoritmik fikrlash va kod tuzilmasi',
        'Backend bilan ishlashga kirish',
        'Portfolio uchun web loyiha',
      ],
    },
    {
      id: 'mobilography',
      icon: '📱',
      title: 'Mobilografiya',
      lessons: '36 dars',
      duration: '72 soat',
      students: "110 o'quvchi",
      price: "Oyiga 150 000 so'm",
      format: 'Offline va online',
      description:
        "Smartfon orqali sifatli video olish, kadr tanlash, yoritish, montaj va kontent tayyorlashni o'rganasiz. Kurs ijtimoiy tarmoqlar uchun kuchli vizual kontent yaratishga yordam beradi.",
      topics: [
        'Telefon kamerasi sozlamalari va kompozitsiya',
        'Yoritish, rakurs va kadr bilan ishlash',
        'Video olish va ovoz sifatini yaxshilash',
        'Mobil montaj, rang va dinamika',
        'Reels, shorts va portfolio kontent tayyorlash',
      ],
    },
    {
      id: 'smm',
      icon: '📣',
      title: 'SMM',
      lessons: '36 dars',
      duration: '72 soat',
      students: "55 o'quvchi",
      price: "Oyiga 150 000 so'm",
      format: 'Offline va online',
      description:
        "Brend sahifasini yuritish, kontent reja tuzish, auditoriyani tahlil qilish va reklama strategiyasini ishlab chiqishni o'rganasiz. Kurs real biznes sahifalari bilan ishlashga tayyorlaydi.",
      topics: [
        'SMM strategiya va auditoriya tahlili',
        "Kontent reja, rubrika va post g'oyalari",
        'Instagram va Telegram sahifalarini rivojlantirish',
        'Reklama matni, kreativ va natija tahlili',
        'Sahifa uchun amaliy SMM loyiha',
      ],
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
