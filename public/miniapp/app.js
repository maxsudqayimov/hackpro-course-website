const telegram = window.Telegram?.WebApp;
const isTelegram = Boolean(telegram?.initData);

const courses = [
  {
    id: 'cybersecurity',
    category: 'IT',
    icon: '🛡️',
    title: 'Kiberxavfsizlik',
    duration: '4 oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#31e7c5',
    description: 'Ethical hacking, tarmoq xavfsizligi va tizimlarni himoyalashni amaliy laboratoriyalarda o‘rganing.',
    topics: ['Tarmoq va Linux asoslari', 'Ethical hacking metodlari', 'Web xavfsizligi va OWASP', 'Incident response va himoya'],
  },
  {
    id: 'programming',
    category: 'IT',
    icon: '💻',
    title: 'Dasturlash',
    duration: '5 oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#35a7ff',
    description: 'Frontend, JavaScript, algoritmlar va real web loyihalar orqali developer ko‘nikmalarini shakllantiring.',
    topics: ['HTML, CSS va JavaScript', 'React va zamonaviy frontend', 'API va backend asoslari', 'Portfolio uchun real loyiha'],
  },
  {
    id: 'ai',
    category: 'AI',
    icon: '🤖',
    title: 'Sun’iy intellekt',
    duration: '5 oy',
    format: 'Online / Offline',
    level: 'Boshlang‘ich',
    color: '#9d74ff',
    description: 'AI vositalari, machine learning, data analysis va avtomatlashtirishni amaliy loyihalarda sinab ko‘ring.',
    topics: ['AI va prompt engineering', 'Python va data analysis', 'Machine learning asoslari', 'AI avtomatlashtirish loyihasi'],
  },
  {
    id: 'robotics',
    category: 'Engineering',
    icon: '🦾',
    title: 'Robototexnika',
    duration: '4 oy',
    format: 'Offline',
    level: 'Boshlang‘ich',
    color: '#ffb84a',
    description: 'Sensor, motor va controllerlar bilan ishlashni o‘rganib, o‘z robot loyihangizni yarating.',
    topics: ['Elektronika asoslari', 'Arduino va controllerlar', 'Sensor va motorlar', 'Mustaqil robot loyihasi'],
  },
  {
    id: 'iot',
    category: 'Engineering',
    icon: '🔌',
    title: 'IoT — Smart qurilmalar',
    duration: '4 oy',
    format: 'Online / Offline',
    level: 'O‘rta',
    color: '#ff6f91',
    description: 'ESP32, sensorlar, smart home va internetga ulangan qurilmalar bilan real tizimlar yarating.',
    topics: ['IoT arxitekturasi', 'ESP32 va sensorlar', 'MQTT va bulut xizmatlari', 'Smart home loyihasi'],
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
  telegram.setHeaderColor?.('#07111f');
  telegram.setBackgroundColor?.('#07111f');
  statusBadge.textContent = 'Telegram';
}

function courseCard(course, compact = false) {
  if (compact) {
    return `<article class="mini-course" data-course-id="${course.id}" style="--course-color:${course.color}" tabindex="0" role="button">
      <span class="course-glow"></span><span class="course-icon">${course.icon}</span>
      <h3>${course.title}</h3><p>${course.description}</p><footer><span>${course.duration}</span><span>${course.level}</span></footer>
    </article>`;
  }

  return `<article class="course-card" data-course-id="${course.id}" style="--course-color:${course.color}" tabindex="0" role="button">
    <span class="course-glow"></span><span class="course-icon">${course.icon}</span>
    <div><h2>${course.title}</h2><p>${course.description}</p><footer><span>${course.duration}</span><span>${course.format}</span></footer></div>
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
  detail.innerHTML = `<div class="detail-hero"><span class="course-glow"></span><span class="course-icon">${course.icon}</span><h1>${course.title}</h1><p>${course.description}</p></div>
    <div class="detail-grid"><div><strong>${course.duration}</strong><span>Davomiyligi</span></div><div><strong>${course.format}</strong><span>Format</span></div><div><strong>${course.level}</strong><span>Daraja</span></div></div>
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
