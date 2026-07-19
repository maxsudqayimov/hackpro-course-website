export const platformPaths = [
  {
    id: 'cyber-start',
    category: 'Kiberxavfsizlik',
    level: 'Boshlang‘ich',
    title: 'Cyber Start',
    description: 'Kiberxavfsizlik asoslari, himoya tamoyillari va xavfsiz internet odatlari.',
    duration: '8 soat',
    accent: 'cyan',
    tags: ['Kirish', 'Himoya', 'Amaliyot'],
    modules: [
      {
        id: 'cyber-landscape',
        title: 'Kiberxavfsizlik landshafti',
        lessons: [
          {
            id: 'cybersecurity-intro',
            title: 'Kiberxavfsizlik nima va nima uchun muhim?',
            summary: 'Raqamli hayotdagi xavflar va himoyaning asosiy maqsadlari.',
            difficulty: 'Oson',
            minutes: 25,
            xp: 50,
          },
          {
            id: 'cyber-terms',
            title: 'Asosiy atamalar va tushunchalar',
            summary: 'Tahdid, zaiflik, risk va himoya qatlamlari.',
            difficulty: 'Oson',
            minutes: 30,
            xp: 60,
          },
          {
            id: 'cia-triad',
            title: 'CIA Triad — uch asosiy tamoyil',
            summary: 'Maxfiylik, yaxlitlik va foydalanuvchanlik.',
            difficulty: 'Oson',
            minutes: 30,
            xp: 60,
          },
        ],
      },
      {
        id: 'threat-landscape',
        title: 'Tahdid landshafti',
        lessons: [
          {
            id: 'modern-threats',
            title: 'Zamonaviy tahdidlar: phishing va zararli dasturlar',
            summary: 'Eng ko‘p uchraydigan hujumlarni xavfsiz misollarda tanish.',
            difficulty: 'O‘rta',
            minutes: 40,
            xp: 80,
          },
          {
            id: 'social-engineering',
            title: 'Ijtimoiy muhandislikdan himoyalanish',
            summary: 'Shubhali xabar, havola va qo‘ng‘iroqlarni aniqlash.',
            difficulty: 'O‘rta',
            minutes: 35,
            xp: 80,
          },
          {
            id: 'incident-basics',
            title: 'Incidentga javob berish asoslari',
            summary: 'Hodisa yuz berganda bajariladigan xavfsiz qadamlar.',
            difficulty: 'Qiyin',
            minutes: 45,
            xp: 100,
          },
        ],
      },
      {
        id: 'defense-basics',
        title: 'Himoya konsepsiyalari',
        lessons: [
          {
            id: 'account-defense',
            title: 'Akkauntlarni himoyalash',
            summary: 'Kuchli parol, MFA va tiklash usullari.',
            difficulty: 'Oson',
            minutes: 30,
            xp: 60,
          },
          {
            id: 'device-defense',
            title: 'Qurilma va tarmoq gigiyenasi',
            summary: 'Yangilanishlar, zaxira nusxa va xavfsiz Wi-Fi.',
            difficulty: 'O‘rta',
            minutes: 35,
            xp: 80,
          },
        ],
      },
    ],
  },
  {
    id: 'frontend-foundations',
    category: 'Dasturlash',
    level: 'Boshlang‘ich',
    title: 'Frontend Foundations',
    description: 'HTML, CSS va JavaScript orqali zamonaviy web interfeyslar yaratish yo‘li.',
    duration: '10 soat',
    accent: 'blue',
    tags: ['HTML', 'CSS', 'JavaScript'],
    modules: [
      {
        id: 'web-foundations',
        title: 'Web asoslari',
        lessons: [
          { id: 'html-structure', title: 'HTML sahifa tuzilishi', summary: 'Semantik teglar va toza hujjat tuzilishi.', difficulty: 'Oson', minutes: 30, xp: 50 },
          { id: 'css-layout', title: 'CSS layout va responsive dizayn', summary: 'Flexbox, Grid va mobil ekranlar.', difficulty: 'O‘rta', minutes: 45, xp: 80 },
          { id: 'js-interaction', title: 'JavaScript bilan interaktivlik', summary: 'Hodisalar, holat va foydalanuvchi amallari.', difficulty: 'O‘rta', minutes: 50, xp: 90 },
        ],
      },
      {
        id: 'frontend-project',
        title: 'Amaliy loyiha',
        lessons: [
          { id: 'design-system', title: 'Mini dizayn tizimi', summary: 'Rang, tipografiya va komponentlar.', difficulty: 'O‘rta', minutes: 40, xp: 80 },
          { id: 'landing-project', title: 'Responsive landing page', summary: 'Portfolio uchun to‘liq sahifa.', difficulty: 'Qiyin', minutes: 70, xp: 120 },
        ],
      },
    ],
  },
  {
    id: 'ai-launchpad',
    category: 'Sun’iy intellekt',
    level: 'Boshlang‘ich',
    title: 'AI Launchpad',
    description: 'AI vositalari, ma’lumotlar bilan ishlash va foydali avtomatlashtirishlar.',
    duration: '9 soat',
    accent: 'violet',
    tags: ['AI tools', 'Data', 'Automation'],
    modules: [
      {
        id: 'ai-foundations',
        title: 'AI asoslari',
        lessons: [
          { id: 'ai-intro', title: 'Sun’iy intellekt qanday ishlaydi?', summary: 'Model, ma’lumot va natija tushunchalari.', difficulty: 'Oson', minutes: 30, xp: 50 },
          { id: 'prompt-basics', title: 'Aniq vazifa berish', summary: 'Sifatli natija uchun kontekst va mezonlar.', difficulty: 'Oson', minutes: 35, xp: 60 },
          { id: 'ai-safety', title: 'AI natijasini tekshirish', summary: 'Xato, tarafkashlik va maxfiylikni nazorat qilish.', difficulty: 'O‘rta', minutes: 40, xp: 80 },
        ],
      },
      {
        id: 'ai-project',
        title: 'AI avtomatlashtirish',
        lessons: [
          { id: 'workflow-map', title: 'Ish jarayonini xaritalash', summary: 'Avtomatlashtirish uchun mos vazifani topish.', difficulty: 'O‘rta', minutes: 40, xp: 80 },
          { id: 'assistant-prototype', title: 'AI yordamchi prototipi', summary: 'Oddiy yordamchini rejalash va sinash.', difficulty: 'Qiyin', minutes: 60, xp: 110 },
        ],
      },
    ],
  },
  {
    id: 'devops-essentials',
    category: 'DevOps',
    level: 'Boshlang‘ich',
    title: 'DevOps Essentials',
    description: 'Linux, konteynerlar, CI/CD va kuzatuv tizimlari bo‘yicha amaliy boshlang‘ich yo‘l.',
    duration: '9 soat',
    accent: 'cyan',
    tags: ['Linux', 'Docker', 'CI/CD'],
    modules: [
      {
        id: 'devops-core',
        title: 'Infratuzilma asoslari',
        lessons: [
          { id: 'linux-workflow', title: 'Linux ish jarayoni', summary: 'Fayllar, jarayonlar va xavfsiz terminal odatlari.', difficulty: 'Oson', minutes: 35, xp: 60 },
          { id: 'git-collaboration', title: 'Git bilan jamoaviy ishlash', summary: 'Branch, commit va kodni tekshirish jarayoni.', difficulty: 'Oson', minutes: 40, xp: 70 },
          { id: 'docker-basics', title: 'Docker va konteyner asoslari', summary: 'Izolyatsiya, image va container tushunchalari.', difficulty: 'O‘rta', minutes: 45, xp: 90 },
        ],
      },
      {
        id: 'delivery-core',
        title: 'Yetkazib berish va monitoring',
        lessons: [
          { id: 'cicd-pipeline', title: 'CI/CD pipeline tuzilishi', summary: 'Build, test va xavfsiz deploy bosqichlari.', difficulty: 'O‘rta', minutes: 50, xp: 100 },
          { id: 'monitoring-basics', title: 'Monitoring va sog‘lomlik tekshiruvi', summary: 'Log, metrika va ogohlantirishlarni tushunish.', difficulty: 'Qiyin', minutes: 55, xp: 110 },
        ],
      },
    ],
  },
];

export const challengeCatalog = [
  { id: 'password-audit', title: 'Parol siyosatini tekshiring', category: 'Kiberxavfsizlik', difficulty: 'Oson', minutes: 10, xp: 80, description: 'Berilgan siyosatdan kuchsiz bandlarni topib, xavfsiz variantni belgilang.' },
  { id: 'header-checklist', title: 'HTTP himoya sarlavhalari', category: 'Kiberxavfsizlik', difficulty: 'O‘rta', minutes: 15, xp: 120, description: 'Namuna javobdan yetishmayotgan himoya sarlavhalarini aniqlang.' },
  { id: 'log-anomaly', title: 'Logdagi noodatiy faollik', category: 'Kiberxavfsizlik', difficulty: 'O‘rta', minutes: 18, xp: 140, description: 'Xavfsiz log namunasidan tekshirilishi kerak bo‘lgan hodisani toping.' },
  { id: 'array-transform', title: 'Massivni tartiblash', category: 'Dasturlash', difficulty: 'Oson', minutes: 12, xp: 90, description: 'JavaScript massivini berilgan qoidaga ko‘ra qayta tuzing.' },
  { id: 'responsive-card', title: 'Responsive kartochka', category: 'Dasturlash', difficulty: 'O‘rta', minutes: 20, xp: 150, description: 'Kartochkani telefon va kompyuter ekraniga mos rejalashtiring.' },
  { id: 'ai-fact-check', title: 'AI javobini tekshirish', category: 'Sun’iy intellekt', difficulty: 'O‘rta', minutes: 15, xp: 120, description: 'Manba, sana va mantiq bo‘yicha tekshirish ro‘yxatini tuzing.' },
  { id: 'docker-health', title: 'Container health check', category: 'DevOps', difficulty: 'O‘rta', minutes: 18, xp: 140, description: 'Xizmat sog‘lomligini tekshirish uchun kuzatiladigan signallarni tanlang.' },
  { id: 'pipeline-review', title: 'Pipeline bosqichlarini tartiblang', category: 'DevOps', difficulty: 'Qiyin', minutes: 22, xp: 180, description: 'Build, test, xavfsizlik tekshiruvi va deploy bosqichlarini to‘g‘ri joylashtiring.' },
];

export const contestSchedule = [
  { id: 'blue-shield', title: 'Blue Shield Weekend', category: 'Kiberxavfsizlik', date: '26-iyul', status: 'Ro‘yxat ochiq', participants: 84, prize: 'Sertifikat + 500 XP', stages: ['Ro‘yxatdan o‘tish', 'Saralash', 'Final', 'Natijalar'] },
  { id: 'code-sprint', title: 'HackPro Code Sprint', category: 'Dasturlash', date: '2-avgust', status: 'Tez orada', participants: 61, prize: 'Sertifikat + 400 XP', stages: ['Ro‘yxatdan o‘tish', '3 ta masala', 'Tekshiruv', 'Reyting'] },
  { id: 'automation-day', title: 'Automation Day', category: 'AI va DevOps', date: '9-avgust', status: 'Tez orada', participants: 42, prize: 'Mentor sessiyasi', stages: ['G‘oya', 'Prototip', 'Demo', 'Taqdirlash'] },
];

export const writeupLibrary = [
  { id: 'phishing-defense', title: 'Phishing xabarini qanday tekshiramiz?', category: 'Kiberxavfsizlik', author: 'HackPro Mentor', minutes: 6, summary: 'Yuboruvchi, havola va shoshilinch talablarni xavfsiz tekshirish bo‘yicha amaliy tahlil.' },
  { id: 'responsive-layout', title: 'Responsive sahifa qurish: qarorlar xaritasi', category: 'Dasturlash', author: 'Frontend Lab', minutes: 8, summary: 'Breakpoint, kontent ustuvorligi va testlash jarayonini bosqichma-bosqich ko‘rib chiqamiz.' },
  { id: 'ai-verification', title: 'AI natijasini ishonchli tekshirish', category: 'Sun’iy intellekt', author: 'AI Studio', minutes: 7, summary: 'Fakt, manba, yangilanish sanasi va maxfiylik bo‘yicha tekshiruv usuli.' },
  { id: 'healthy-pipeline', title: 'Sog‘lom CI/CD pipeline belgilari', category: 'DevOps', author: 'Platform Team', minutes: 9, summary: 'Qayta tiklash, kuzatuvchanlik va kichik xavfsiz deploy tamoyillari.' },
];

export const communityPosts = [
  { id: 'community-1', author: 'Aziza', role: 'Cyber Start', time: '12 daqiqa oldin', text: 'Bugun MFA va tiklash kodlari bo‘yicha darsni tugatdim. Tekshiruv ro‘yxati juda foydali bo‘ldi.', likes: 18, comments: 4 },
  { id: 'community-2', author: 'Sardor', role: 'Frontend Foundations', time: '1 soat oldin', text: 'Responsive kartochka challenge’ini yechdim. Mobil ko‘rinishni avval rejalash ancha vaqt tejarkan.', likes: 13, comments: 3 },
  { id: 'community-3', author: 'Dilshod', role: 'DevOps Essentials', time: '3 soat oldin', text: 'Pipeline bosqichlari uchun yangi sxema tayyorladim. Mentor fikrini kutyapman.', likes: 21, comments: 6 },
];

export const leaderboard = [
  { name: 'Aziza Karimova', xp: 1840, streak: 12 },
  { name: 'Sardor Ergashev', xp: 1620, streak: 9 },
  { name: 'Dilshod Rahimov', xp: 1470, streak: 8 },
  { name: 'Siz', xp: 120, streak: 1, current: true },
];

export function flattenLessons(path) {
  return path.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title })),
  );
}
