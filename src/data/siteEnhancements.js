const coursePaths = {
  cybersecurity: '/courses/cybersecurity',
  iot: '/courses/iot',
  ai: '/courses/ai',
  robotics: '/courses/robotics',
  programming: '/courses/programming',
};

const courseVisuals = {
  cybersecurity: { image: '/course-cybersecurity.svg', accent: '#ffe500' },
  iot: { image: '/course-iot.svg', accent: '#34f5ff' },
  ai: { image: '/course-ai.svg', accent: '#92ff34' },
  robotics: { image: '/course-robotics.svg', accent: '#d85cff' },
  programming: { image: '/course-programming.svg', accent: '#25b8ff' },
};

const seoByLanguage = {
  uz: {
    title: 'HackPro | Kelajak texnologiyalari kurslari',
    description:
      "HackPro - Zarafshondagi zamonaviy o'quv markazi. Kiberxavfsizlik, IoT, sun'iy intellekt, robototexnika va dasturlash kurslari.",
    courseTitle: (course) => `${course.title} kursi | HackPro`,
    courseDescription: (course) =>
      `${course.title} kursi HackPro o'quv markazida amaliy loyiha, mentor yordami va portfolio natijasi bilan o'qitiladi. ${course.description}`,
  },
  ru: {
    title: 'HackPro | Курсы технологий будущего',
    description:
      'HackPro - современный учебный центр в Зарафшане. Курсы кибербезопасности, IoT, искусственного интеллекта, робототехники и программирования.',
    courseTitle: (course) => `${course.title} | HackPro`,
    courseDescription: (course) =>
      `${course.title} в HackPro: практика, поддержка ментора, портфолио и понятный путь развития. ${course.description}`,
  },
  en: {
    title: 'HackPro | Future Technology Courses',
    description:
      'HackPro is a modern learning center in Zarafshan for cybersecurity, IoT, artificial intelligence, robotics and programming courses.',
    courseTitle: (course) => `${course.title} Course | HackPro`,
    courseDescription: (course) =>
      `${course.title} at HackPro is taught through practice, mentor support and a portfolio project. ${course.description}`,
  },
};

const enhancements = {
  uz: {
    mentorsSection: {
      eyebrow: 'Mentorlar',
      title: 'Kurslar tajribali mentorlar bilan olib boriladi',
      text:
        "Har bir yo'nalishda o'quvchi amaliy topshiriq, loyiha tekshiruvi va shaxsiy maslahat orqali rivojlanadi.",
    },
    mentors: [
      {
        name: 'Maqsud Qayimov',
        role: 'Dasturlash, AI va texnologiya mentori',
        experience: '5+ yil amaliy tajriba',
        courses: ['Dasturlash', "Sun'iy intellekt", 'IoT'],
        image: '/hackpro-mentor.webp',
        fallback: '/hackpro-mentor.png',
      },
      {
        name: 'HackPro Cyber Lab',
        role: 'Kiberxavfsizlik amaliyoti',
        experience: 'Ethical security va audit mashgulotlari',
        courses: ['Kiberxavfsizlik', 'Network security'],
        initials: 'CL',
      },
      {
        name: 'HackPro Robotics Lab',
        role: 'Robototexnika va qurilmalar',
        experience: 'Sensor, motor va controller loyihalari',
        courses: ['Robototexnika', 'IoT'],
        initials: 'RL',
      },
    ],
    testimonialsSection: {
      eyebrow: "O'quvchilar fikri",
      title: 'HackPro o‘quvchilari nimalarni qadrlaydi?',
      text: "Qisqa muddatda amaliy natija, mentor bilan aloqa va portfolio uchun loyiha o'quvchilarga eng ko'p yordam beradi.",
    },
    testimonials: [
      {
        name: 'Azizbek',
        course: 'Dasturlash',
        text: "HTML, CSS va JavaScriptni real loyiha orqali o'rgandim. Eng foydali tomoni - har hafta amaliy vazifa bor.",
      },
      {
        name: 'Madina',
        course: "Sun'iy intellekt",
        text: "AI kursida data bilan ishlash va model natijasini tushunish oson tilda tushuntirildi.",
      },
      {
        name: 'Sardor',
        course: 'Robototexnika',
        text: "Robot yig'ish, sensor ulash va xatolarni topish jarayoni juda qiziqarli bo'ldi.",
      },
      {
        name: 'Jasurbek',
        course: 'Kiberxavfsizlik',
        text: "Darslar faqat qonuniy va ethical muhitda o'tgani menga yoqdi. Audit mantiqini tushundim.",
      },
      {
        name: 'Malika',
        course: 'IoT',
        text: "ESP32 va sensorlar bilan ishlashni amalda ko'rdik. Uy avtomatlashtirish mini loyihasini qildim.",
      },
    ],
    gallerySection: {
      eyebrow: 'Galereya',
      title: "O'quv markaz va dars jarayoni",
      text: 'HackPro muhitida kompyuter sinfi, mentor yordami va texnologiya amaliyotlari bir joyda jamlangan.',
    },
    gallery: [
      {
        title: 'Kompyuter sinfi',
        text: 'Dasturlash, AI va web loyihalar uchun amaliy xona.',
        image: '/hackpro-mentor.webp',
        fallback: '/hackpro-mentor.png',
        position: 'center',
      },
      {
        title: 'Mentor bilan dars',
        text: "Savol-javob, kod ko'rigi va loyiha ustida ishlash.",
        image: '/hackpro-mentor.webp',
        fallback: '/hackpro-mentor.png',
        position: '45% center',
      },
      {
        title: 'Texnologiya laboratoriyasi',
        text: 'Robototexnika, IoT va kiberxavfsizlik uchun amaliy topshiriqlar.',
        image: '/hackpro-mentor.webp',
        fallback: '/hackpro-mentor.png',
        position: 'right center',
      },
    ],
    pricingSection: {
      eyebrow: 'Narx va jadval',
      title: "Kurs narxi va guruh vaqtini bot orqali bilib oling",
      text:
        "Narxlar kurs yo'nalishi, o'qish formati va guruh jadvaliga qarab aniqlanadi. Ariza qoldirsangiz admin siz bilan bog'lanadi.",
      cta: 'Narxni bot orqali bilish',
      scheduleTitle: 'Odatdagi jadval',
      schedule: ['Haftasiga 3 kun dars', 'Har dars 1.5-2 soat', 'Offline va online maslahat', 'Amaliy loyiha himoyasi'],
    },
    pricing: [
      { title: 'Standart guruh', text: 'Darslar guruh bilan, mentor nazorati va uy vazifalari bilan olib boriladi.' },
      { title: 'Individual maslahat', text: 'Kurs tanlash, darajani aniqlash va shaxsiy yo‘l xaritasini tuzish.' },
      { title: 'Portfolio natijasi', text: 'Har kurs oxirida ko‘rsatish mumkin bo‘lgan amaliy loyiha tayyorlanadi.' },
    ],
    outcomesSection: {
      title: "Kurs yakunida nimalarga ega bo'lasiz?",
      items: [
        {
          title: 'Diplom / Sertifikat',
          text: ["Ta'lim jarayonida olgan bilimlaringizni tasdiqlovchi sertifikat."],
          image: '/outcome-certificate.svg',
        },
        {
          title: "To'laqonli kasb",
          text: ["Kursni tugatgandan so'ng, kelajakdagi kasbingizni boshlash uchun zarur bilimlar bazasiga ega bo'lasiz."],
          image: '/outcome-career.svg',
        },
        {
          title: 'Karyera qurishga yordam',
          text: [
            "Kursni tugatgandan so'ng, bo'sh ish o'rinlari va foydali Telegram kanallarga yo'naltirilasiz.",
            "Karyera bo'yicha rezyume, portfolio va suhbatga tayyorgarlik tavsiyalari beriladi.",
          ],
          image: '/outcome-job.svg',
          size: 'wide',
        },
      ],
    },
    contactStatus: {
      sending: 'Yuborilmoqda...',
      success: "Arizangiz yuborildi. Admin tez orada siz bilan bog'lanadi.",
      error: "Arizani yuborishda xatolik bo'ldi. Telegram bot orqali yozib ko'ring.",
    },
    faqTitle: "Ko'p beriladigan savollar",
    courseFaqs: {
      cybersecurity: [
        ['Bu kurs qonuniymi?', 'Ha, barcha mashgulotlar faqat ethical, sandbox va ruxsat berilgan muhitlarda olib boriladi.'],
        ["Boshlovchilar o'qisa bo'ladimi?", "Ha, tarmoq va Linux asoslaridan boshlab bosqichma-bosqich o'tiladi."],
        ['Kompyuter kerakmi?', 'Shaxsiy noutbuk foydali, lekin dars jarayonida laboratoriya muhiti ham tushuntiriladi.'],
        ['Kurs oxirida nima qilaman?', 'Security audit checklist, incident response plan va portfolio loyihasini tayyorlaysiz.'],
        ['Sertifikat beriladimi?', 'Kursni yakunlab loyiha topshirgan o‘quvchilarga sertifikat beriladi.'],
      ],
      iot: [
        ['IoT kursida nimalar kerak bo‘ladi?', 'Sensor, controller va smart qurilmalar bilan ishlash asoslari o‘rgatiladi.'],
        ['Arduino yoki ESP32 oldindan bilish shartmi?', 'Yo‘q, kurs asosiy ulanish va kod yozishdan boshlanadi.'],
        ['Qanday loyiha qilinadi?', 'Smart room controller, sensor monitoring yoki mini dashboard tayyorlanadi.'],
        ['Darslar amaliymi?', 'Ha, har modulda qurilma ulash va test qilish mashgulotlari bor.'],
        ['Online o‘qish mumkinmi?', 'Nazariy qismlar online tushuntiriladi, qurilma amaliyoti uchun offline format tavsiya etiladi.'],
      ],
      ai: [
        ['AI kursi uchun Python shartmi?', 'Python asoslari kurs ichida takrorlanadi, boshlang‘ich bilim yetarli.'],
        ['Matematika qiyin bo‘ladimi?', 'Asosiy tushunchalar amaliy misollar orqali sodda qilib tushuntiriladi.'],
        ['Qanday loyihalar qilinadi?', 'Data analysis report, prediction model va AI assistant prototipi tayyorlanadi.'],
        ['AI toollardan foydalanamizmi?', 'Ha, model, prompt, automation va real ish jarayonidagi AI vositalari ko‘rsatiladi.'],
        ['Natijani qayerda ko‘rsataman?', 'Kurs loyihasi portfolio va suhbatlarda ko‘rsatish uchun tayyorlanadi.'],
      ],
      robotics: [
        ['Robototexnika kimlar uchun?', 'Texnologiya, elektronika va qurilma yasashga qiziqqan o‘quvchilar uchun.'],
        ['Kod yozish kerakmi?', 'Ha, lekin kodlar sensor va motorlarni boshqarish misollari bilan sodda boshlanadi.'],
        ['Qanday robotlar qilinadi?', 'Line follower, obstacle avoiding robot va mini robotic arm loyihalari bor.'],
        ['Qurilmalarni o‘zim sotib olamanmi?', 'Kerakli jihozlar dars jarayonida mentor tomonidan yo‘naltiriladi.'],
        ['Musobaqaga tayyorlaydimi?', 'Asosiy mexanika, algoritm va test jarayoni musobaqa formatiga mos keladi.'],
      ],
      programming: [
        ['Dasturlashni noldan boshlash mumkinmi?', 'Ha, HTML/CSSdan boshlab JavaScript va React asoslariga o‘tiladi.'],
        ['Kursda sayt tayyorlaymanmi?', 'Ha, responsive sahifa, landing page va mini CRM kabi loyihalar qilinadi.'],
        ['Backend ham o‘rgatiladimi?', 'Backend fundamentals bo‘limida API, server mantiqi va forma ishlashi tushuntiriladi.'],
        ['Portfolio bo‘ladimi?', 'Kurs yakunida ko‘rsatish mumkin bo‘lgan web loyiha tayyorlanadi.'],
        ['Online o‘qish mumkinmi?', 'Ha, format guruh va jadvalga qarab kelishiladi.'],
      ],
    },
  },
  ru: {
    mentorsSection: {
      eyebrow: 'Менторы',
      title: 'Курсы проходят с опытными наставниками',
      text: 'В каждом направлении ученик получает практику, проверку проекта и персональные рекомендации.',
    },
    mentors: [
      {
        name: 'Максуд Кайимов',
        role: 'Ментор по программированию, AI и технологиям',
        experience: '5+ лет практического опыта',
        courses: ['Программирование', 'AI', 'IoT'],
        image: '/hackpro-mentor.webp',
        fallback: '/hackpro-mentor.png',
      },
      {
        name: 'HackPro Cyber Lab',
        role: 'Практика кибербезопасности',
        experience: 'Ethical security и аудит',
        courses: ['Кибербезопасность', 'Network security'],
        initials: 'CL',
      },
      {
        name: 'HackPro Robotics Lab',
        role: 'Робототехника и устройства',
        experience: 'Проекты с сенсорами, моторами и контроллерами',
        courses: ['Робототехника', 'IoT'],
        initials: 'RL',
      },
    ],
    testimonialsSection: {
      eyebrow: 'Отзывы',
      title: 'Что ценят ученики HackPro',
      text: 'Практический результат, связь с ментором и проекты для портфолио помогают быстрее расти.',
    },
    testimonials: [
      { name: 'Азизбек', course: 'Программирование', text: 'Я изучал HTML, CSS и JavaScript через реальные проекты. Каждую неделю были полезные задания.' },
      { name: 'Мадина', course: 'AI', text: 'На AI курсе понятно объяснили работу с данными и оценку результата модели.' },
      { name: 'Сардор', course: 'Робототехника', text: 'Сборка робота, подключение сенсоров и поиск ошибок были очень интересными.' },
      { name: 'Жасурбек', course: 'Кибербезопасность', text: 'Понравилось, что занятия проходят только в законной и ethical среде.' },
      { name: 'Малика', course: 'IoT', text: 'Мы работали с ESP32 и сенсорами и сделали мини-проект автоматизации.' },
    ],
    gallerySection: {
      eyebrow: 'Галерея',
      title: 'Учебный центр и процесс занятий',
      text: 'В HackPro компьютерный класс, помощь ментора и технологическая практика собраны в одном месте.',
    },
    gallery: [
      { title: 'Компьютерный класс', text: 'Практическая среда для программирования, AI и web-проектов.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'center' },
      { title: 'Занятие с ментором', text: 'Вопросы, ревью кода и работа над проектом.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: '45% center' },
      { title: 'Технологическая лаборатория', text: 'Практика по робототехнике, IoT и кибербезопасности.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'right center' },
    ],
    pricingSection: {
      eyebrow: 'Цена и расписание',
      title: 'Узнайте стоимость и время группы через бота',
      text: 'Цена зависит от направления, формата обучения и расписания группы. Оставьте заявку, и администратор свяжется с вами.',
      cta: 'Узнать цену через бота',
      scheduleTitle: 'Обычный график',
      schedule: ['3 занятия в неделю', '1.5-2 часа каждое занятие', 'Offline и online консультации', 'Защита практического проекта'],
    },
    pricing: [
      { title: 'Стандартная группа', text: 'Занятия в группе с ментором, проверкой заданий и практикой.' },
      { title: 'Индивидуальная консультация', text: 'Выбор курса, определение уровня и персональная карта развития.' },
      { title: 'Портфолио результат', text: 'В конце курса ученик готовит практический проект для демонстрации.' },
    ],
    outcomesSection: {
      title: 'Что вы получите после курса?',
      items: [
        {
          title: 'Диплом / Сертификат',
          text: ['Сертификат, который подтверждает знания, полученные во время обучения.'],
          image: '/outcome-certificate.svg',
        },
        {
          title: 'Полноценная профессия',
          text: ['После завершения курса у вас будет база знаний, чтобы начать развиваться в выбранной профессии.'],
          image: '/outcome-career.svg',
        },
        {
          title: 'Помощь в карьере',
          text: [
            'После курса вы получите полезные направления по вакансиям и Telegram-каналам.',
            'Карьера-блок поможет с резюме, портфолио и подготовкой к собеседованию.',
          ],
          image: '/outcome-job.svg',
          size: 'wide',
        },
      ],
    },
    contactStatus: {
      sending: 'Отправка...',
      success: 'Заявка отправлена. Администратор скоро свяжется с вами.',
      error: 'Не удалось отправить заявку. Попробуйте написать через Telegram бот.',
    },
    faqTitle: 'Частые вопросы',
    courseFaqs: {},
  },
  en: {
    mentorsSection: {
      eyebrow: 'Mentors',
      title: 'Courses are led by experienced mentors',
      text: 'Each track includes practical tasks, project review and personal guidance from a mentor.',
    },
    mentors: [
      {
        name: 'Maqsud Qayimov',
        role: 'Programming, AI and technology mentor',
        experience: '5+ years of practical experience',
        courses: ['Programming', 'AI', 'IoT'],
        image: '/hackpro-mentor.webp',
        fallback: '/hackpro-mentor.png',
      },
      {
        name: 'HackPro Cyber Lab',
        role: 'Cybersecurity practice',
        experience: 'Ethical security and audit sessions',
        courses: ['Cybersecurity', 'Network security'],
        initials: 'CL',
      },
      {
        name: 'HackPro Robotics Lab',
        role: 'Robotics and devices',
        experience: 'Sensor, motor and controller projects',
        courses: ['Robotics', 'IoT'],
        initials: 'RL',
      },
    ],
    testimonialsSection: {
      eyebrow: 'Student feedback',
      title: 'What HackPro students value',
      text: 'Practical results, mentor feedback and portfolio projects help students grow faster.',
    },
    testimonials: [
      { name: 'Azizbek', course: 'Programming', text: 'I learned HTML, CSS and JavaScript through real projects. Weekly practice was the most useful part.' },
      { name: 'Madina', course: 'AI', text: 'The AI course explained data work and model evaluation in a clear way.' },
      { name: 'Sardor', course: 'Robotics', text: 'Building a robot, connecting sensors and debugging was very engaging.' },
      { name: 'Jasurbek', course: 'Cybersecurity', text: 'I liked that all lessons are taught in a legal and ethical environment.' },
      { name: 'Malika', course: 'IoT', text: 'We worked with ESP32 and sensors and built a small automation project.' },
    ],
    gallerySection: {
      eyebrow: 'Gallery',
      title: 'Learning center and class process',
      text: 'HackPro brings together a computer classroom, mentor support and technology practice.',
    },
    gallery: [
      { title: 'Computer classroom', text: 'A practical space for programming, AI and web projects.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'center' },
      { title: 'Mentor-led lesson', text: 'Questions, code review and project work.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: '45% center' },
      { title: 'Technology lab', text: 'Practice for robotics, IoT and cybersecurity.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'right center' },
    ],
    pricingSection: {
      eyebrow: 'Price and schedule',
      title: 'Get pricing and group schedule through the bot',
      text: 'Pricing depends on the course, learning format and group schedule. Leave a request and an admin will contact you.',
      cta: 'Get price via bot',
      scheduleTitle: 'Typical schedule',
      schedule: ['3 lessons per week', '1.5-2 hours per lesson', 'Offline and online consultation', 'Practical project defense'],
    },
    pricing: [
      { title: 'Standard group', text: 'Group lessons with mentor supervision, homework review and practice.' },
      { title: 'Personal consultation', text: 'Course selection, level check and a personal learning roadmap.' },
      { title: 'Portfolio result', text: 'At the end of the course, every student prepares a practical demo project.' },
    ],
    outcomesSection: {
      title: 'What will you get after the course?',
      items: [
        {
          title: 'Diploma / Certificate',
          text: ['A certificate that confirms the knowledge gained during the learning process.'],
          image: '/outcome-certificate.svg',
        },
        {
          title: 'A real profession',
          text: ['After completing the course, you will have the knowledge base needed to start your future career path.'],
          image: '/outcome-career.svg',
        },
        {
          title: 'Career support',
          text: [
            'After the course, you will be guided toward useful job channels and opportunities.',
            'Career support includes resume, portfolio and interview preparation tips.',
          ],
          image: '/outcome-job.svg',
          size: 'wide',
        },
      ],
    },
    contactStatus: {
      sending: 'Sending...',
      success: 'Your request was sent. An admin will contact you soon.',
      error: 'Could not send the request. Please try through the Telegram bot.',
    },
    faqTitle: 'Frequently asked questions',
    courseFaqs: {},
  },
};

enhancements.ru.courseFaqs = {
  cybersecurity: [
    ['Курс законный?', 'Да, все занятия проходят только в ethical, sandbox и разрешенной среде.'],
    ['Можно начать с нуля?', 'Да, курс начинается с основ сетей, Linux и безопасной практики.'],
    ['Нужен ли ноутбук?', 'Личный ноутбук полезен, но лабораторная среда также объясняется на занятиях.'],
    ['Что будет в конце курса?', 'Вы подготовите security audit checklist, incident response plan и проект для портфолио.'],
    ['Есть сертификат?', 'Сертификат получают ученики, которые завершили курс и защитили проект.'],
  ],
  iot: [
    ['Что нужно для IoT курса?', 'Вы изучите работу с сенсорами, контроллерами и smart-устройствами.'],
    ['Нужно заранее знать Arduino или ESP32?', 'Нет, курс начинается с базового подключения и простого кода.'],
    ['Какие проекты будут?', 'Smart room controller, sensor monitoring system или mini dashboard.'],
    ['Занятия практические?', 'Да, в каждом модуле есть подключение, тестирование и настройка устройств.'],
    ['Можно учиться online?', 'Теорию можно изучать online, для практики с устройствами лучше offline формат.'],
  ],
  ai: [
    ['Нужно ли знать Python?', 'Основы Python повторяются внутри курса, достаточно начальной подготовки.'],
    ['Будет ли сложная математика?', 'Ключевые идеи объясняются простыми практическими примерами.'],
    ['Какие проекты будут?', 'Data analysis report, prediction model и прототип AI assistant.'],
    ['Будут ли AI tools?', 'Да, изучаются модели, prompts, automation и рабочие AI-инструменты.'],
    ['Где можно показать результат?', 'Финальный проект готовится для портфолио и собеседований.'],
  ],
  robotics: [
    ['Для кого робототехника?', 'Для учеников, которым интересны технологии, электроника и создание устройств.'],
    ['Нужно писать код?', 'Да, но код начинается с простого управления сенсорами и моторами.'],
    ['Какие роботы будут?', 'Line follower, obstacle avoiding robot и mini robotic arm.'],
    ['Нужно покупать детали?', 'По нужным деталям и наборам ментор даст понятную рекомендацию.'],
    ['Курс готовит к соревнованиям?', 'Основы механики, алгоритмов и тестирования подходят для соревновательного формата.'],
  ],
  programming: [
    ['Можно начать программирование с нуля?', 'Да, курс начинается с HTML/CSS, затем JavaScript и основы React.'],
    ['Буду ли делать сайт?', 'Да, будут responsive pages, landing page и mini CRM проекты.'],
    ['Backend тоже будет?', 'В backend fundamentals объясняются API, серверная логика и работа формы.'],
    ['Будет портфолио?', 'В конце курса готовится web-проект, который можно показать.'],
    ['Можно учиться online?', 'Да, формат согласуется по группе и расписанию.'],
  ],
};

enhancements.en.courseFaqs = {
  cybersecurity: [
    ['Is this course legal?', 'Yes. Every lesson uses ethical, sandboxed and permission-based practice only.'],
    ['Can beginners join?', 'Yes. The course starts with networking, Linux and safe security fundamentals.'],
    ['Do I need a laptop?', 'A personal laptop is useful, and the lab workflow is also explained during lessons.'],
    ['What will I build?', 'You will prepare a security audit checklist, incident response plan and portfolio project.'],
    ['Will I get a certificate?', 'Students who complete the course and defend the project receive a certificate.'],
  ],
  iot: [
    ['What is needed for IoT?', 'You will learn sensors, controllers and smart device workflows.'],
    ['Do I need Arduino or ESP32 experience?', 'No. The course starts with basic wiring and simple code.'],
    ['What projects are included?', 'Smart room controller, sensor monitoring system and a mini dashboard.'],
    ['Are lessons practical?', 'Yes. Each module includes device connection, testing and configuration.'],
    ['Can I study online?', 'Theory can be studied online, while hardware practice is best offline.'],
  ],
  ai: [
    ['Do I need Python?', 'Python basics are reviewed inside the course, so beginner knowledge is enough.'],
    ['Is the math difficult?', 'Core ideas are explained through simple practical examples.'],
    ['What projects are included?', 'Data analysis report, prediction model and AI assistant prototype.'],
    ['Will we use AI tools?', 'Yes. You will work with models, prompts, automation and practical AI tools.'],
    ['Where can I show the result?', 'The final project is prepared for portfolio and interview use.'],
  ],
  robotics: [
    ['Who is robotics for?', 'For students interested in technology, electronics and building devices.'],
    ['Do I need to code?', 'Yes, but code starts with simple sensor and motor control examples.'],
    ['What robots are built?', 'Line follower, obstacle avoiding robot and mini robotic arm.'],
    ['Do I buy parts myself?', 'The mentor gives clear guidance on the needed kits and components.'],
    ['Does it help with competitions?', 'The mechanics, algorithms and testing workflow fit competition-style projects.'],
  ],
  programming: [
    ['Can I start from zero?', 'Yes. The course starts with HTML/CSS, then JavaScript and React basics.'],
    ['Will I build websites?', 'Yes. You will create responsive pages, a landing page and mini CRM projects.'],
    ['Is backend included?', 'Backend fundamentals covers APIs, server logic and form handling.'],
    ['Will I have a portfolio?', 'At the end, you prepare a web project that you can show.'],
    ['Can I study online?', 'Yes, the format is agreed based on group and schedule.'],
  ],
};

export function enhanceSiteContent(content, language) {
  const extra = enhancements[language] || enhancements.uz;
  const seo = seoByLanguage[language] || seoByLanguage.uz;
  const cardLabel = language === 'ru' ? 'курс' : language === 'en' ? 'course' : 'kurs';

  return {
    ...content,
    seo,
    mentorsSection: extra.mentorsSection,
    mentors: extra.mentors,
    testimonialsSection: extra.testimonialsSection,
    testimonials: extra.testimonials,
    gallerySection: extra.gallerySection,
    gallery: extra.gallery,
    pricingSection: extra.pricingSection,
    pricing: extra.pricing,
    outcomesSection: extra.outcomesSection,
    contactStatus: extra.contactStatus,
    faqTitle: extra.faqTitle,
    courses: content.courses.map((course) => ({
      ...course,
      path: coursePaths[course.id],
      cardLabel,
      cardImage: courseVisuals[course.id]?.image,
      cardAccent: courseVisuals[course.id]?.accent || '#34f5ff',
      cardImageAlt: `${course.title} ${cardLabel}`,
      seoTitle: seo.courseTitle(course),
      seoDescription: seo.courseDescription(course),
      faqs: extra.courseFaqs[course.id] || [],
    })),
  };
}

export function coursePath(courseId) {
  return coursePaths[courseId] || '/#courses';
}
