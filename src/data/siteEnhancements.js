const coursePaths = {
  cybersecurity: '/courses/cybersecurity',
  ai: '/courses/ai',
  robotics: '/courses/robotics',
  programming: '/courses/programming',
  mobilegraphy: '/courses/mobilegraphy',
};

const courseVisuals = {
  cybersecurity: { image: '/course-cybersecurity.svg', accent: '#ffe500' },
  ai: { image: '/course-ai.svg', accent: '#92ff34' },
  robotics: { image: '/course-robotics.svg', accent: '#d85cff' },
  programming: { image: '/course-programming.svg', accent: '#25b8ff' },
  mobilegraphy: { image: '/course-mobilegraphy.svg', accent: '#ff4fd8' },
};

const deepCourseContent = {
  uz: {
    cybersecurity: {
      audience: ["Tarmoq va xavfsizlikka qiziqqan o'quvchilar", 'IT administrator bo‘lishni xohlovchilar', 'Web va server himoyasini o‘rganmoqchi bo‘lganlar'],
      roadmap: ['Network basics va Linux terminal', 'Web security va zaifliklarni topish', 'Himoya checklistlari va incident response', 'Yakuniy security audit loyihasi'],
      skills: ['Nmap va tarmoq tahlili', 'Linux permissions', 'OWASP asoslari', 'Hisobot yozish'],
      keywords: ['kiberxavfsizlik kursi Zarafshon', 'ethical hacking kursi', 'network security kursi'],
    },
    ai: {
      audience: ['Python va data bilan ishlashni xohlovchilar', 'AI tools va automation qiziqtirganlar', 'Sun’iy intellekt loyihasi tayyorlamoqchilar'],
      roadmap: ['Python va data asoslari', 'Machine learning mantiqi', 'Prompt va AI automation', 'AI assistant yoki prediction loyiha'],
      skills: ['Python', 'Data analysis', 'Model evaluation', 'Prompt engineering'],
      keywords: ['suniy intellekt kursi', 'AI kursi Zarafshon', 'Python AI kursi'],
    },
    robotics: {
      audience: ['Bolalar va o‘smirlar uchun amaliy texnologiya qiziquvchilari', 'Robot yig‘ish va test qilishni xohlovchilar', 'Musobaqa formatiga tayyorlanmoqchilar'],
      roadmap: ['Robot mexanikasi', 'Motor va sensor ulash', 'Algoritm va test jarayoni', 'Robot prototip himoyasi'],
      skills: ['Motor driver', 'Sensor logic', 'Controller coding', 'Debugging'],
      keywords: ['robototexnika kursi Zarafshon', 'bolalar robototexnika kursi', 'robot kursi'],
    },
    programming: {
      audience: ['Dasturlashni noldan boshlovchilar', 'Sayt va web ilova yaratmoqchilar', 'Portfolio orqali ITga kirishni xohlovchilar'],
      roadmap: ['HTML/CSS va responsive sahifalar', 'JavaScript va interaktivlik', 'React asoslari', 'Mini CRM yoki landing loyiha'],
      skills: ['HTML/CSS', 'JavaScript', 'React', 'API va forma ishlashi'],
      keywords: ['dasturlash kursi Zarafshon', 'Python kursi Zarafshon', 'Frontend kursi'],
    },
    mobilegraphy: {
      audience: ['Kontent yaratishga qiziqqan oquvchilar', 'Instagram, TikTok va Reels uchun video qilmoqchilar', 'Telefon orqali foto/video sifatini oshirmoqchilar'],
      roadmap: ['Smartfon kamera sozlamalari', 'Kadr, yoruglik va kompozitsiya', 'Reels ssenariy va tasvirga olish', 'Mobil montaj va portfolio'],
      skills: ['Mobile video shooting', 'Photo composition', 'CapCut/InShot montaj', 'Reels storytelling'],
      keywords: ['mobilografiya kursi Zarafshon', 'telefon orqali video olish kursi', 'reels montaj kursi'],
    },
  },
  ru: {},
  en: {},
};

deepCourseContent.ru = deepCourseContent.uz;
deepCourseContent.en = {
  cybersecurity: {
    audience: ['Students interested in networks and security', 'Future IT administrators', 'Learners who want to protect websites and servers'],
    roadmap: ['Network basics and Linux terminal', 'Web security and vulnerability analysis', 'Defense checklists and incident response', 'Final security audit project'],
    skills: ['Nmap and network analysis', 'Linux permissions', 'OWASP basics', 'Security reporting'],
    keywords: ['cybersecurity course Zarafshan', 'ethical hacking course', 'network security course'],
  },
  ai: {
    audience: ['Learners who want Python and data skills', 'Students interested in AI tools and automation', 'People who want a practical AI project'],
    roadmap: ['Python and data basics', 'Machine learning logic', 'Prompting and AI automation', 'AI assistant or prediction project'],
    skills: ['Python', 'Data analysis', 'Model evaluation', 'Prompt engineering'],
    keywords: ['artificial intelligence course', 'AI course Zarafshan', 'Python AI course'],
  },
  robotics: {
    audience: ['Children and teens interested in practical technology', 'Learners who want to build and test robots', 'Students preparing for competition-style projects'],
    roadmap: ['Robot mechanics', 'Motors and sensors', 'Algorithms and testing', 'Robot prototype defense'],
    skills: ['Motor driver', 'Sensor logic', 'Controller coding', 'Debugging'],
    keywords: ['robotics course Zarafshan', 'robotics for kids', 'robot course'],
  },
  programming: {
    audience: ['Beginners starting from zero', 'Learners who want websites and web apps', 'Students entering IT through portfolio projects'],
    roadmap: ['HTML/CSS and responsive pages', 'JavaScript and interactivity', 'React basics', 'Mini CRM or landing project'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'API and form handling'],
    keywords: ['programming course Zarafshan', 'Python course Zarafshan', 'frontend course'],
  },
  mobilegraphy: {
    audience: ['Students interested in content creation', 'Creators who want Instagram, TikTok and Reels videos', 'Learners improving smartphone photo and video quality'],
    roadmap: ['Smartphone camera settings', 'Frame, light and composition', 'Reels script and shooting', 'Mobile editing and portfolio'],
    skills: ['Mobile video shooting', 'Photo composition', 'CapCut/InShot editing', 'Reels storytelling'],
    keywords: ['mobilegraphy course Zarafshan', 'smartphone video course', 'reels editing course'],
  },
};

const registrationContent = {
  uz: {
    registrationSection: {
      eyebrow: "Online ro'yxatdan o'tish",
      title: "Kursga yozilish endi saytdan ham ishlaydi",
      text: "Formani to'ldiring: ariza avtomatik Telegram CRM ga tushadi, admin kurs, jadval va narx bo'yicha siz bilan bog'lanadi.",
      pipelineLabel: 'CRM oqimi',
      pipelineTitle: 'Ariza qayerga boradi?',
      steps: [
        { title: "Forma to'ldiriladi", text: 'Ism, telefon, kurs, format va qulay vaqt qabul qilinadi.' },
        { title: 'Telegram CRM ga tushadi', text: 'Admin yangi arizani manbasi va sahifasi bilan ko‘radi.' },
        { title: "Tez aloqa qilinadi", text: "O'quvchiga kurs dasturi, narx va jadval bo'yicha maslahat beriladi." },
      ],
    },
    registrationForm: {
      name: 'Ism',
      namePlaceholder: 'Ismingiz',
      phone: 'Telefon',
      course: "Kurs yo'nalishi",
      chooseCourse: "Yo'nalishni tanlang",
      format: "O'qish formati",
      formats: ['Offline', 'Online', 'Aralash'],
      time: 'Qulay vaqt',
      times: ['Ertalab', 'Kunduzi', 'Kechki payt'],
      message: 'Izoh',
      messagePlaceholder: 'Qaysi kurs, jadval yoki narx haqida bilmoqchisiz?',
      submit: "Ariza yuborish",
    },
  },
  ru: {
    registrationSection: {
      eyebrow: 'Онлайн запись',
      title: 'Записаться на курс можно прямо на сайте',
      text: 'Заполните форму: заявка автоматически попадет в Telegram CRM, админ свяжется с вами по курсу, расписанию и цене.',
      pipelineLabel: 'CRM поток',
      pipelineTitle: 'Куда попадает заявка?',
      steps: [
        { title: 'Форма заполняется', text: 'Имя, телефон, курс, формат и удобное время сохраняются.' },
        { title: 'Попадает в Telegram CRM', text: 'Админ видит новую заявку с источником и страницей.' },
        { title: 'Быстрая связь', text: 'Студент получает консультацию по программе, цене и расписанию.' },
      ],
    },
    registrationForm: {
      name: 'Имя',
      namePlaceholder: 'Ваше имя',
      phone: 'Телефон',
      course: 'Курс',
      chooseCourse: 'Выберите курс',
      format: 'Формат',
      formats: ['Offline', 'Online', 'Смешанный'],
      time: 'Удобное время',
      times: ['Утром', 'Днем', 'Вечером'],
      message: 'Комментарий',
      messagePlaceholder: 'Какой курс, график или цена вас интересует?',
      submit: 'Отправить заявку',
    },
  },
  en: {
    registrationSection: {
      eyebrow: 'Online registration',
      title: 'Students can register directly from the website',
      text: 'Fill in the form: the request goes to Telegram CRM and an admin contacts you about the course, schedule and price.',
      pipelineLabel: 'CRM flow',
      pipelineTitle: 'Where does the request go?',
      steps: [
        { title: 'Form is submitted', text: 'Name, phone, course, format and preferred time are collected.' },
        { title: 'Sent to Telegram CRM', text: 'The admin sees the request with source and page context.' },
        { title: 'Fast follow-up', text: 'The student gets advice about program, price and schedule.' },
      ],
    },
    registrationForm: {
      name: 'Name',
      namePlaceholder: 'Your name',
      phone: 'Phone',
      course: 'Course',
      chooseCourse: 'Choose a course',
      format: 'Format',
      formats: ['Offline', 'Online', 'Hybrid'],
      time: 'Preferred time',
      times: ['Morning', 'Afternoon', 'Evening'],
      message: 'Comment',
      messagePlaceholder: 'Which course, schedule or price do you want to know about?',
      submit: 'Send request',
    },
  },
};

const blogContent = {
  uz: {
    blogSection: {
      eyebrow: 'Foydali maqolalar',
      title: "IT o'rganishni boshlash uchun qisqa yo'l xaritalar",
      text: "Blog bo'limi Google va Yandex uchun SEO ni kuchaytiradi, o'quvchilarga esa kurs tanlashda yordam beradi.",
      more: "O'qish",
    },
    blogDetail: {
      back: 'Blogga qaytish',
      ctaEyebrow: 'Keyingi qadam',
      ctaTitle: "Qaysi kurs mosligini bilib oling",
      ctaText: "Telegram bot orqali yoki saytdagi forma bilan ariza qoldiring. Admin sizga yo'nalish tanlashda yordam beradi.",
      cta: "Ro'yxatdan o'tish",
    },
    blogPosts: [
      {
        id: 'python-noldan',
        path: '/blog/python-noldan-qanday-boshlash-kerak',
        category: 'Python',
        date: '2026-05-15',
        readTime: '4 daqiqa',
        title: "Pythonni noldan qanday boshlash kerak?",
        excerpt: "Pythonni o'rganishni boshlash uchun nimalar kerak, qaysi tartibda mashq qilish va birinchi loyiha qanday bo'lishi kerak?",
        seoTitle: "Pythonni noldan qanday boshlash kerak? | HackPro Academy",
        seoDescription: "Pythonni noldan o'rganish bo'yicha sodda yo'l xarita: sintaksis, amaliy mashqlar, mini loyiha va HackPro kurslari.",
        sections: [
          {
            title: "1. Avval asosiy mantiqni tushuning",
            text: ["Pythonni yodlash emas, muammo yechish tili sifatida o'rganish kerak. O'zgaruvchi, shart, sikl, funksiya va ro'yxatlar birinchi poydevor bo'ladi."],
            list: ['Har kuni 30-60 daqiqa kod yozing', 'Kichik masalalarni o‘zingiz yeching', 'Xatolarni o‘qishni odat qiling'],
          },
          {
            title: '2. Amaliy loyiha qiling',
            text: ["Faqat video ko'rish yetarli emas. Kalkulyator, xarajatlar ro'yxati, mini bot yoki fayl bilan ishlaydigan dastur qiling."],
            list: ['Kalkulyator', "To-do ro'yxat", 'Telegram bot prototipi'],
          },
          {
            title: '3. Mentor bilan tezroq o‘sasiz',
            text: ["Mentor koddagi xatoni, noto'g'ri odatlarni va keyingi qadamni tez ko'rsatadi. Shu sababli kursda amaliy topshiriq va kod ko'rigi muhim."],
          },
        ],
      },
      {
        id: 'bolalar-uchun-dasturlash',
        path: '/blog/bolalar-uchun-dasturlash-nima-beradi',
        category: 'Kids coding',
        date: '2026-05-15',
        readTime: '3 daqiqa',
        title: 'Bolalar uchun dasturlash nima beradi?',
        excerpt: 'Dasturlash bolaga faqat kod emas, mantiq, sabr, ijodkorlik va muammoni bo‘laklarga ajratib yechishni o‘rgatadi.',
        seoTitle: 'Bolalar uchun dasturlash nima beradi? | HackPro Academy',
        seoDescription: 'Bolalar uchun dasturlash, robototexnika va texnologiya kurslarining foydasi haqida qisqa tushuntirish.',
        sections: [
          {
            title: 'Mantiqiy fikrlash kuchayadi',
            text: ['Bola vazifani bosqichlarga ajratishni, sabab va natijani ko‘rishni o‘rganadi. Bu matematika, fizika va kundalik qarorlar uchun ham foydali.'],
          },
          {
            title: 'Ijodkorlik texnologiya bilan birlashadi',
            text: ['Dasturlash va robototexnika orqali bola o‘z g‘oyasini ko‘rinadigan loyiha, o‘yin yoki qurilmaga aylantira oladi.'],
            list: ['Mini o‘yin', 'Oddiy sayt', 'Robot yoki sensorli loyiha'],
          },
          {
            title: 'Kelajak kasblariga tayyorgarlik',
            text: ['IT kasblariga qiziqish erta shakllansa, bola keyin Python, AI, frontend yoki robototexnika yo‘nalishiga osonroq kiradi.'],
          },
        ],
      },
      {
        id: 'it-kasblari-2026',
        path: '/blog/it-kasblari-2026-yilda-qanchalik-kerak',
        category: 'Career',
        date: '2026-05-15',
        readTime: '5 daqiqa',
        title: 'IT kasblari 2026-yilda qanchalik kerak?',
        excerpt: 'AI, kiberxavfsizlik, web dasturlash va robototexnika yaqin yillarda ham eng kerakli amaliy ko‘nikmalar qatorida qoladi.',
        seoTitle: 'IT kasblari 2026-yilda qanchalik kerak? | HackPro Academy',
        seoDescription: '2026-yilda IT kasblari, AI, kiberxavfsizlik, dasturlash va robototexnika yo‘nalishlari haqida foydali maqola.',
        sections: [
          {
            title: 'Texnologiya hamma sohaga kiryapti',
            text: ['Savdo, ta’lim, ishlab chiqarish, tibbiyot va xizmat ko‘rsatishda raqamli tizimlar ko‘paymoqda. Shu sababli IT bilimlari faqat dasturchilar uchun emas.'],
          },
          {
            title: 'Eng kuchli yo‘nalishlar',
            text: ['HackPro kurslari bozorda amaliy ehtiyoj bor yo‘nalishlarga tayangan holda tuzilgan.'],
            list: ['Dasturlash va frontend', 'Sun’iy intellekt', 'Kiberxavfsizlik', 'Robototexnika'],
          },
          {
            title: 'Portfolio natija juda muhim',
            text: ['Ish beruvchi yoki mijoz nazariyadan ko‘ra amaliy loyiha ko‘rishni xohlaydi. Shuning uchun har kursda yakuniy loyiha va portfolio natijasi bo‘lishi kerak.'],
          },
        ],
      },
    ],
  },
};

blogContent.en = {
  blogSection: {
    eyebrow: 'Useful articles',
    title: 'Short roadmaps for starting in IT',
    text: 'The blog improves SEO for Google and Yandex and helps students choose the right course.',
    more: 'Read',
  },
  blogDetail: {
    back: 'Back to blog',
    ctaEyebrow: 'Next step',
    ctaTitle: 'Find the right course',
    ctaText: 'Register through the Telegram bot or website form. An admin will help you choose the best track.',
    cta: 'Register',
  },
  blogPosts: blogContent.uz.blogPosts.map((post) => ({
    ...post,
    title: post.id === 'python-noldan' ? 'How to start Python from zero?' : post.id === 'bolalar-uchun-dasturlash' ? 'What does coding give children?' : 'How important are IT careers in 2026?',
    excerpt: post.id === 'python-noldan'
      ? 'A simple roadmap for learning Python: syntax, practice, first projects and mentor support.'
      : post.id === 'bolalar-uchun-dasturlash'
        ? 'Coding builds logic, patience, creativity and problem-solving skills for children.'
        : 'AI, cybersecurity, web development and robotics remain practical and valuable skills.',
    seoTitle: post.id === 'python-noldan' ? 'How to start Python from zero? | HackPro Academy' : post.id === 'bolalar-uchun-dasturlash' ? 'What does coding give children? | HackPro Academy' : 'How important are IT careers in 2026? | HackPro Academy',
    seoDescription: post.excerpt,
    sections: post.id === 'python-noldan'
      ? [
          {
            title: '1. Understand the basics first',
            text: ['Python should be learned as a problem-solving tool, not just memorized syntax. Variables, conditions, loops, functions and lists are the first foundation.'],
            list: ['Write code for 30-60 minutes daily', 'Solve small tasks yourself', 'Learn to read error messages'],
          },
          {
            title: '2. Build a small project',
            text: ['Watching videos is not enough. Build a calculator, expense tracker, mini bot or a simple file-based program.'],
            list: ['Calculator', 'To-do list', 'Telegram bot prototype'],
          },
          {
            title: '3. Grow faster with a mentor',
            text: ['A mentor quickly shows mistakes, weak habits and the next step. That is why practice and code review are important in a course.'],
          },
        ]
      : post.id === 'bolalar-uchun-dasturlash'
        ? [
            { title: 'Logical thinking improves', text: ['Children learn to split a task into steps and see cause and effect. This helps in math, science and everyday decisions.'] },
            {
              title: 'Creativity meets technology',
              text: ['Through coding and robotics, a child can turn an idea into a visible project, game or device.'],
              list: ['Mini game', 'Simple website', 'Robot or sensor project'],
            },
            { title: 'Preparation for future careers', text: ['Early interest in IT makes it easier to move into Python, AI, frontend or robotics later.'] },
          ]
        : [
            { title: 'Technology is entering every field', text: ['Commerce, education, production, healthcare and services use more digital systems every year. IT skills are useful far beyond software jobs.'] },
            {
              title: 'Strong directions',
              text: ['HackPro courses are based on practical areas with real market demand.'],
              list: ['Programming and frontend', 'Artificial intelligence', 'Cybersecurity', 'Robotics'],
            },
            { title: 'Portfolio matters', text: ['Employers and clients want to see practical projects more than theory. Every course should finish with a project and portfolio result.'] },
          ],
  })),
};

blogContent.ru = {
  blogSection: {
    eyebrow: 'Полезные статьи',
    title: 'Короткие карты развития для старта в IT',
    text: 'Блог усиливает SEO в Google и Yandex и помогает ученикам выбрать правильный курс.',
    more: 'Читать',
  },
  blogDetail: {
    back: 'Назад к блогу',
    ctaEyebrow: 'Следующий шаг',
    ctaTitle: 'Узнайте, какой курс вам подходит',
    ctaText: 'Оставьте заявку через Telegram бот или форму на сайте. Админ поможет выбрать направление.',
    cta: 'Записаться',
  },
  blogPosts: blogContent.uz.blogPosts.map((post) => ({
    ...post,
    title: post.id === 'python-noldan' ? 'Как начать Python с нуля?' : post.id === 'bolalar-uchun-dasturlash' ? 'Что дает программирование детям?' : 'Насколько нужны IT профессии в 2026 году?',
    excerpt: post.id === 'python-noldan'
      ? 'Простая карта изучения Python: синтаксис, практика, первый проект и поддержка ментора.'
      : post.id === 'bolalar-uchun-dasturlash'
        ? 'Программирование развивает логику, терпение, творчество и умение решать задачи.'
        : 'AI, кибербезопасность, web и робототехника остаются важными практическими навыками.',
    seoTitle: post.id === 'python-noldan' ? 'Как начать Python с нуля? | HackPro Academy' : post.id === 'bolalar-uchun-dasturlash' ? 'Что дает программирование детям? | HackPro Academy' : 'Насколько нужны IT профессии в 2026 году? | HackPro Academy',
    seoDescription: post.excerpt,
    sections: post.id === 'python-noldan'
      ? [
          {
            title: '1. Сначала поймите базовую логику',
            text: ['Python нужно изучать как инструмент решения задач. Переменные, условия, циклы, функции и списки станут первым фундаментом.'],
            list: ['Пишите код 30-60 минут каждый день', 'Решайте маленькие задачи самостоятельно', 'Учитесь читать ошибки'],
          },
          {
            title: '2. Сделайте небольшой проект',
            text: ['Одних видео недостаточно. Создайте калькулятор, список задач, мини-бота или простую программу для работы с файлами.'],
            list: ['Калькулятор', 'To-do список', 'Прототип Telegram бота'],
          },
          { title: '3. С ментором рост быстрее', text: ['Ментор быстро показывает ошибки, неправильные привычки и следующий шаг. Поэтому практика и проверка кода очень важны.'] },
        ]
      : post.id === 'bolalar-uchun-dasturlash'
        ? [
            { title: 'Развивается логическое мышление', text: ['Ребенок учится делить задачу на шаги и видеть причину и результат. Это помогает в математике, физике и обычных решениях.'] },
            {
              title: 'Творчество соединяется с технологией',
              text: ['Через программирование и робототехнику ребенок превращает идею в проект, игру или устройство.'],
              list: ['Мини-игра', 'Простой сайт', 'Робот или сенсорный проект'],
            },
            { title: 'Подготовка к профессиям будущего', text: ['Если интерес к IT появляется рано, ребенку легче перейти к Python, AI, frontend или робототехнике.'] },
          ]
        : [
            { title: 'Технологии входят во все сферы', text: ['Торговля, образование, производство, медицина и сервисы используют все больше цифровых систем. IT знания полезны не только программистам.'] },
            {
              title: 'Сильные направления',
              text: ['Курсы HackPro построены вокруг практических направлений, которые востребованы на рынке.'],
              list: ['Программирование и frontend', 'Искусственный интеллект', 'Кибербезопасность', 'Робототехника'],
            },
            { title: 'Портфолио очень важно', text: ['Работодатель или клиент хочет видеть практический проект. Поэтому каждый курс должен завершаться проектом и результатом для портфолио.'] },
          ],
  })),
};

const seoByLanguage = {
  uz: {
    title: 'HackPro | Kelajak texnologiyalari kurslari',
    description:
      "HackPro - Zarafshondagi zamonaviy o'quv markazi. Kiberxavfsizlik, sun'iy intellekt, robototexnika va dasturlash kurslari.",
    courseTitle: (course) => `${course.title} kursi | HackPro`,
    courseDescription: (course) =>
      `${course.title} kursi HackPro o'quv markazida amaliy loyiha, mentor yordami va portfolio natijasi bilan o'qitiladi. ${course.description}`,
  },
  ru: {
    title: 'HackPro | Курсы технологий будущего',
    description:
      'HackPro - современный учебный центр в Зарафшане. Курсы кибербезопасности, искусственного интеллекта, робототехники и программирования.',
    courseTitle: (course) => `${course.title} | HackPro`,
    courseDescription: (course) =>
      `${course.title} в HackPro: практика, поддержка ментора, портфолио и понятный путь развития. ${course.description}`,
  },
  en: {
    title: 'HackPro | Future Technology Courses',
    description:
      'HackPro is a modern learning center in Zarafshan for cybersecurity, artificial intelligence, robotics and programming courses.',
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
        courses: ['Dasturlash', "Sun'iy intellekt"],
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
        courses: ['Robototexnika'],
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
        text: 'Robototexnika, kiberxavfsizlik va AI uchun amaliy topshiriqlar.',
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
        courses: ['Программирование', 'AI'],
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
        courses: ['Робототехника'],
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
    ],
    gallerySection: {
      eyebrow: 'Галерея',
      title: 'Учебный центр и процесс занятий',
      text: 'В HackPro компьютерный класс, помощь ментора и технологическая практика собраны в одном месте.',
    },
    gallery: [
      { title: 'Компьютерный класс', text: 'Практическая среда для программирования, AI и web-проектов.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'center' },
      { title: 'Занятие с ментором', text: 'Вопросы, ревью кода и работа над проектом.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: '45% center' },
      { title: 'Технологическая лаборатория', text: 'Практика по робототехнике, AI и кибербезопасности.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'right center' },
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
        courses: ['Programming', 'AI'],
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
        courses: ['Robotics'],
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
    ],
    gallerySection: {
      eyebrow: 'Gallery',
      title: 'Learning center and class process',
      text: 'HackPro brings together a computer classroom, mentor support and technology practice.',
    },
    gallery: [
      { title: 'Computer classroom', text: 'A practical space for programming, AI and web projects.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'center' },
      { title: 'Mentor-led lesson', text: 'Questions, code review and project work.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: '45% center' },
      { title: 'Technology lab', text: 'Practice for robotics, AI and cybersecurity.', image: '/hackpro-mentor.webp', fallback: '/hackpro-mentor.png', position: 'right center' },
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
  mobilegraphy: [
    ['Do I need a professional camera?', 'No. The course focuses on creating quality content with a smartphone camera.'],
    ['Which apps are used?', 'Mobile editors such as CapCut, InShot or similar tools are explained in practice.'],
    ['Will I create reels?', 'Yes. You will create reels, stories, product videos and short promotional content.'],
    ['Can beginners join?', 'Yes. The course starts with camera settings, light and framing basics.'],
    ['Will I have a portfolio?', 'At the end, you prepare a video and photo portfolio.'],
  ],
};

enhancements.uz.courseFaqs.mobilegraphy = [
  ['Mobilografiya uchun professional kamera kerakmi?', "Yo'q, asosiy amaliyot smartfon kamerasi orqali bajariladi."],
  ['Qanday ilovalardan foydalaniladi?', 'Montaj uchun CapCut, InShot yoki shunga oxshash mobil editorlar tushuntiriladi.'],
  ['Kursda reels tayyorlanadimi?', 'Ha, reels, stories, product video va qisqa reklama kontenti amaliy yaratiladi.'],
  ['Boshlovchilar qatnasha oladimi?', 'Ha, kamera sozlamalari, yoruglik va kadr asoslaridan boshlanadi.'],
  ['Portfolio boladimi?', 'Kurs yakunida tayyor video va foto portfolio shakllantiriladi.'],
];

enhancements.ru.courseFaqs.mobilegraphy = [
  ['Нужна профессиональная камера?', 'Нет, основная практика выполняется на камеру смартфона.'],
  ['Какие приложения используются?', 'На практике объясняются CapCut, InShot или похожие мобильные редакторы.'],
  ['Будут ли reels?', 'Да, ученики создают reels, stories, product video и короткий рекламный контент.'],
  ['Можно начать с нуля?', 'Да, курс начинается с настроек камеры, света и основы кадра.'],
  ['Будет портфолио?', 'В конце курса готовится видео и фото портфолио.'],
];

export function enhanceSiteContent(content, language) {
  const extra = enhancements[language] || enhancements.uz;
  const seo = seoByLanguage[language] || seoByLanguage.uz;
  const registration = registrationContent[language] || registrationContent.uz;
  const blog = blogContent[language] || blogContent.uz;
  const courseDetails = deepCourseContent[language] || deepCourseContent.uz;
  const cardLabel = language === 'ru' ? 'курс' : language === 'en' ? 'course' : 'kurs';

  return {
    ...content,
    seo,
    registrationSection: registration.registrationSection,
    registrationForm: registration.registrationForm,
    blogSection: blog.blogSection,
    blogDetail: blog.blogDetail,
    blogPosts: blog.blogPosts,
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
      ...(courseDetails[course.id] || {}),
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
