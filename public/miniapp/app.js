const telegram = window.Telegram?.WebApp;
const isTelegram = Boolean(telegram?.initData);

const courses = [
  {
    id: 'cybersecurity',
    category: 'IT',
    icon: '🛡️',
    title: 'Kiberxavfsizlik',
    lessons: '156 dars',
    duration: '312 soat',
    students: "120 o‘quvchi",
    price: '500 000 so‘m / oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#31e7c5',
    image: '/static/img/course-cybersecurity.png',
    description: 'Tarmoq, qurilma va akkauntlarni himoya qilish asoslarini amaliy mashg‘ulotlar orqali o‘rganasiz.',
    topics: ['Internet xavfsizligi, parol va akkaunt himoyasi', 'Tarmoq xavfsizligi va oddiy himoya sozlamalari', 'Zaifliklarni aniqlash va xavfsiz tekshiruv usullari', 'Phishing va ijtimoiy muhandislikdan himoyalanish', 'Amaliy laboratoriya va mini loyiha'],
  },
  {
    id: 'ai',
    category: 'AI',
    icon: '🤖',
    title: 'Sun’iy intellekt',
    lessons: '75 dars',
    duration: '150 soat',
    students: '95 o‘quvchi',
    price: '200 000 so‘m / oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#9d74ff',
    image: '/static/img/course-ai.png',
    description: 'AI vositalaridan to‘g‘ri foydalanish, prompt yozish va ish jarayonlarini avtomatlashtirishni o‘rganasiz.',
    topics: ['AI nima va undan kundalik ishda qanday foydalaniladi', 'Prompt yozish, natijani tahlil qilish va yaxshilash', 'Matn, rasm va kontent yaratish jarayonlari', 'Oddiy avtomatlashtirish va yordamchi vositalar', 'AI bilan yakuniy amaliy loyiha'],
  },
  {
    id: 'robotics',
    category: 'Engineering',
    icon: '🦾',
    title: 'Robototexnika',
    lessons: '75 dars',
    duration: '150 soat',
    students: '68 o‘quvchi',
    price: '150 000 so‘m / oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#ffb84a',
    image: '/static/img/course-robotics.png',
    description: 'Robot qurilmalarini yig‘ish, sensor va motorlar bilan ishlash hamda mikrokontroller orqali boshqarishni o‘rganasiz.',
    topics: ['Robototexnika asoslari va qurilma qismlari', 'Sensorlar, motorlar va boshqaruv modullari', 'Mikrokontroller bilan oddiy dasturlash', 'Robot harakati va avtomatik boshqaruv', 'Yakuniy robot loyiha yig‘ish'],
  },
  {
    id: 'programming',
    category: 'IT',
    icon: '💻',
    title: 'Dasturlash',
    lessons: '132 dars',
    duration: '264 soat',
    students: '82 o‘quvchi',
    price: '200 000 so‘m / oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#35a7ff',
    image: '/static/img/course-programming.png',
    description: 'Web dasturlash asoslari, algoritmik fikrlash va real loyiha yaratish bosqichlarini o‘rganasiz.',
    topics: ['HTML, CSS va JavaScript asoslari', 'Interaktiv sahifalar va responsiv dizayn', 'Algoritmik fikrlash va kod tuzilmasi', 'Backend bilan ishlashga kirish', 'Portfolio uchun web loyiha'],
  },
  {
    id: 'mobilography',
    category: 'Media',
    icon: '📱',
    title: 'Mobilografiya',
    lessons: '36 dars',
    duration: '72 soat',
    students: '110 o‘quvchi',
    price: '150 000 so‘m / oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#ff6f91',
    image: '/static/img/course-mobilography.png',
    description: 'Smartfon orqali sifatli video olish, kadr tanlash, yoritish, montaj va kontent tayyorlashni o‘rganasiz.',
    topics: ['Telefon kamerasi sozlamalari va kompozitsiya', 'Yoritish, rakurs va kadr bilan ishlash', 'Video olish va ovoz sifatini yaxshilash', 'Mobil montaj, rang va dinamika', 'Reels, shorts va portfolio kontent tayyorlash'],
  },
  {
    id: 'smm',
    category: 'Media',
    icon: '📣',
    title: 'SMM',
    lessons: '36 dars',
    duration: '72 soat',
    students: '55 o‘quvchi',
    price: '150 000 so‘m / oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#ff8f3d',
    image: '/static/img/course-smm.png',
    description: 'Brend sahifasini yuritish, kontent reja tuzish, auditoriyani tahlil qilish va reklama strategiyasini ishlab chiqishni o‘rganasiz.',
    topics: ['SMM strategiya va auditoriya tahlili', 'Kontent reja, rubrika va post g‘oyalari', 'Instagram va Telegram sahifalarini rivojlantirish', 'Reklama matni, kreativ va natija tahlili', 'Sahifa uchun amaliy SMM loyiha'],
  },
];

const state = { route: 'home', courseId: null, selectedCourseId: null, filter: 'Barchasi' };
const app = document.querySelector('#app');
const bottomNav = document.querySelector('#bottomNav');
const backButton = document.querySelector('#backButton');
const statusBadge = document.querySelector('#telegramStatus');

function haptic(type = 'light') {
  if (isTelegram) telegram?.HapticFeedback?.impactOccurred(type);
}

function setTelegramUi() {
  if (!isTelegram) {
    statusBadge.textContent = 'Demo rejim';
    return;
  }

  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor?.('#020712');
  telegram.setBackgroundColor?.('#020712');
  statusBadge.textContent = 'Telegram';
}

function courseCard(course, compact = false) {
  if (compact) {
    return `<article class="mini-course" data-course-id="${course.id}" style="--course-color:${course.color}" tabindex="0" role="button">
      <span class="course-glow"></span><div class="course-cover"><img src="${course.image}" alt="" loading="lazy" /><span class="course-icon">${course.icon}</span></div>
      <h3>${course.title}</h3><p>${course.description}</p><footer><span>${course.lessons}</span><span>${course.duration}</span></footer><strong class="course-price">${course.price}</strong>
    </article>`;
  }

  return `<article class="course-card" data-course-id="${course.id}" style="--course-color:${course.color}" tabindex="0" role="button">
    <span class="course-glow"></span><div class="course-thumbnail"><img src="${course.image}" alt="" loading="lazy" /><span class="course-icon">${course.icon}</span></div>
    <div><h2>${course.title}</h2><p>${course.description}</p><footer><span>${course.lessons}</span><span>${course.duration}</span><span>${course.students}</span></footer><strong class="course-price">${course.price}</strong></div>
    <span class="course-arrow">›</span>
  </article>`;
}

function cloneTemplate(id) {
  return document.querySelector(id).content.cloneNode(true);
}

function updateChrome() {
  const detail = state.route === 'course';
  backButton.hidden = !detail;
  bottomNav.hidden = state.route === 'success';
  document.querySelectorAll('.nav-item').forEach((item) => {
    const itemRoute = item.dataset.route;
    item.classList.toggle('active', itemRoute === state.route || (detail && itemRoute === 'courses'));
  });

  if (isTelegram && telegram?.BackButton) {
    if (detail) telegram.BackButton.show();
    else telegram.BackButton.hide();
  }
}

function bindCommonActions() {
  app.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => navigate(button.dataset.action));
  });

  app.querySelectorAll('[data-course-id]').forEach((card) => {
    const open = () => {
      haptic();
      navigate('course', card.dataset.courseId);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') open();
    });
  });
}

function renderHome() {
  app.replaceChildren(cloneTemplate('#homeTemplate'));
  app.querySelector('#featuredCourses').innerHTML = courses.slice(0, 4).map((course) => courseCard(course, true)).join('');
  bindCommonActions();
}

function renderCourses() {
  app.replaceChildren(cloneTemplate('#coursesTemplate'));
  const categories = ['Barchasi', ...new Set(courses.map((course) => course.category))];
  const filters = app.querySelector('#courseFilters');
  filters.innerHTML = categories.map((category) => `<button class="filter-chip ${category === state.filter ? 'active' : ''}" type="button" data-filter="${category}">${category}</button>`).join('');

  const draw = () => {
    const visible = state.filter === 'Barchasi' ? courses : courses.filter((course) => course.category === state.filter);
    app.querySelector('#courseList').innerHTML = visible.map((course) => courseCard(course)).join('');
    bindCommonActions();
  };

  filters.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      haptic();
      state.filter = button.dataset.filter;
      filters.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
      draw();
    });
  });
  draw();
}

function renderCourse() {
  const course = courses.find((item) => item.id === state.courseId) || courses[0];
  state.courseId = course.id;
  app.replaceChildren(cloneTemplate('#courseTemplate'));
  const detail = app.querySelector('#courseDetail');
  detail.style.setProperty('--course-color', course.color);
  detail.innerHTML = `<div class="detail-hero"><span class="course-glow"></span><img class="detail-course-image" src="${course.image}" alt="${course.title} kursi" /><span class="course-icon">${course.icon}</span><h1>${course.title}</h1><p>${course.description}</p></div>
    <div class="detail-grid"><div><strong>${course.lessons}</strong><span>Darslar</span></div><div><strong>${course.duration}</strong><span>Davomiyligi</span></div><div><strong>${course.price}</strong><span>Narxi</span></div><div><strong>${course.format}</strong><span>Format</span></div><div><strong>${course.students}</strong><span>O‘quvchilar</span></div><div><strong>${course.level}</strong><span>Daraja</span></div></div>
    <section class="detail-section"><h2>Kursda nimalar o‘rganiladi?</h2><ul class="topic-list">${course.topics.map((topic) => `<li><i>✓</i><span>${topic}</span></li>`).join('')}</ul></section>
    <button class="primary-button full-width" type="button" data-action="register">Shu kursga yozilish</button>`;
  bindCommonActions();
}

function validate(form) {
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const course = String(data.get('course') || '').trim();
  if (name.length < 2) return 'Ismingizni to‘liqroq kiriting.';
  if (!/^\+?[\d\s()\-]{7,}$/.test(phone)) return 'Telefon raqamni to‘g‘ri kiriting.';
  if (!course) return 'Kurs yo‘nalishini tanlang.';
  return null;
}

async function submitRegistration(form) {
  const notice = form.querySelector('#formNotice');
  const submit = form.querySelector('[type="submit"]');
  const error = validate(form);
  if (error) {
    notice.textContent = error;
    notice.hidden = false;
    haptic('medium');
    return;
  }

  notice.hidden = true;
  submit.disabled = true;
  submit.querySelector('span').textContent = 'Yuborilmoqda…';
  const data = new FormData(form);
  const user = telegram?.initDataUnsafe?.user;
  const payload = {
    action: 'register',
    name: String(data.get('name') || '').trim(),
    phone: String(data.get('phone') || '').trim(),
    course: String(data.get('course') || '').trim(),
    format: String(data.get('format') || '').trim(),
    message: String(data.get('message') || '').trim(),
    source: 'telegram-mini-app',
    telegramUser: user ? { id: user.id, username: user.username || '', firstName: user.first_name || '' } : null,
  };

  try {
    if (telegram?.sendData && telegram.initData) {
      telegram.sendData(JSON.stringify(payload));
    } else {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, page: window.location.href }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Arizani yuborib bo‘lmadi.');
    }
    if (isTelegram) telegram?.HapticFeedback?.notificationOccurred('success');
    state.successName = payload.name.split(' ')[0];
    navigate('success');
  } catch (requestError) {
    notice.textContent = requestError.message || 'Xatolik yuz berdi. Qayta urinib ko‘ring.';
    notice.hidden = false;
    if (isTelegram) telegram?.HapticFeedback?.notificationOccurred('error');
  } finally {
    submit.disabled = false;
    submit.querySelector('span').textContent = 'Arizani yuborish';
  }
}

function renderRegister() {
  app.replaceChildren(cloneTemplate('#registerTemplate'));
  const form = app.querySelector('#registerForm');
  const select = form.elements.course;
  courses.forEach((course) => select.add(new Option(course.title, course.title)));
  const selected = courses.find((course) => course.id === state.selectedCourseId || course.id === state.courseId);
  if (selected) select.value = selected.title;
  const firstName = telegram?.initDataUnsafe?.user?.first_name;
  if (firstName) form.elements.name.value = firstName;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitRegistration(form);
  });
}

function renderSuccess() {
  app.replaceChildren(cloneTemplate('#successTemplate'));
  app.querySelector('#successName').textContent = `${state.successName || 'do‘stimiz'}!`;
  app.querySelector('#closeAppButton').addEventListener('click', () => {
    if (isTelegram) telegram.close();
    else navigate('home');
  });
  bindCommonActions();
}

function navigate(route, courseId = null) {
  if (route === 'register' && courseId) state.selectedCourseId = courseId;
  if (route === 'register' && state.route === 'course') state.selectedCourseId = state.courseId;
  if (route === 'course') state.courseId = courseId;
  state.route = route;
  window.location.hash = route === 'course' ? `course/${state.courseId}` : route;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  if (state.route === 'courses') renderCourses();
  else if (state.route === 'course') renderCourse();
  else if (state.route === 'register') renderRegister();
  else if (state.route === 'success') renderSuccess();
  else renderHome();
  updateChrome();
}

function readHash() {
  const [route, id] = window.location.hash.replace('#', '').split('/');
  if (route === 'course' && id) return { route, id };
  if (['home', 'courses', 'register'].includes(route)) return { route };
  return { route: 'home' };
}

bottomNav.addEventListener('click', (event) => {
  const item = event.target.closest('[data-route]');
  if (!item) return;
  haptic();
  navigate(item.dataset.route);
});
backButton.addEventListener('click', () => navigate('courses'));
if (isTelegram) telegram?.BackButton?.onClick(() => navigate('courses'));
window.addEventListener('hashchange', () => {
  const target = readHash();
  state.route = target.route;
  if (target.id) state.courseId = target.id;
  render();
});

setTelegramUi();
const initial = readHash();
state.route = initial.route;
state.courseId = initial.id || null;
render();
