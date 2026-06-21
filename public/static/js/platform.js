const state = {
    user: null,
    courses: [],
    progress: new Map(),
    currentLessonId: null,
};

const loginPanel = document.getElementById('loginPanel');
const workspace = document.getElementById('workspace');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const logoutButton = document.getElementById('logoutButton');
const adminLink = document.getElementById('adminLink');
const studentName = document.getElementById('studentName');
const courseList = document.getElementById('courseList');
const emptyState = document.getElementById('emptyState');
const lessonView = document.getElementById('lessonView');
const lessonCourse = document.getElementById('lessonCourse');
const lessonTitle = document.getElementById('lessonTitle');
const lessonDescription = document.getElementById('lessonDescription');
const lessonVideo = document.getElementById('lessonVideo');
const lessonBody = document.getElementById('lessonBody');
const resourceLink = document.getElementById('resourceLink');
const completeButton = document.getElementById('completeButton');
const lessonMessage = document.getElementById('lessonMessage');

async function api(action, options = {}) {
    const response = await fetch(`/api/lms?action=${encodeURIComponent(action)}${options.query || ''}`, {
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
        throw new Error(payload.message || 'Platforma xatosi.');
    }
    return payload;
}

function setMessage(element, message, type = '') {
    element.textContent = message || '';
    element.className = `form-message ${type}`.trim();
}

function showLogin() {
    loginPanel.hidden = false;
    workspace.hidden = true;
    logoutButton.hidden = true;
    adminLink.hidden = true;
}

function showWorkspace() {
    loginPanel.hidden = true;
    workspace.hidden = false;
    logoutButton.hidden = false;
    adminLink.hidden = state.user?.role !== 'admin';
    studentName.textContent = state.user?.full_name || state.user?.login || "O'quvchi";
}

function syncProgress(progressRows) {
    state.progress = new Map((progressRows || []).map((row) => [row.lesson_id, row]));
}

function isCompleted(lessonId) {
    return state.progress.get(lessonId)?.status === 'completed';
}

function renderCourses() {
    courseList.innerHTML = '';

    if (!state.courses.length) {
        courseList.innerHTML = '<p class="form-message">Sizga hali kurs biriktirilmagan.</p>';
        return;
    }

    state.courses.forEach((course) => {
        const card = document.createElement('article');
        card.className = 'course-card';

        const title = document.createElement('h3');
        title.textContent = course.title;
        const description = document.createElement('p');
        description.textContent = course.description || course.level || '';

        card.append(title, description);

        (course.lessons || []).forEach((lesson) => {
            const button = document.createElement('button');
            button.className = `lesson-button ${isCompleted(lesson.id) ? 'completed' : ''}`;
            button.type = 'button';
            button.innerHTML = `<span>${lesson.title}</span><small>${isCompleted(lesson.id) ? 'Tugadi' : lesson.duration_minutes ? `${lesson.duration_minutes} daqiqa` : 'Ochish'}</small>`;
            button.addEventListener('click', () => openLesson(lesson.id));
            card.appendChild(button);
        });

        courseList.appendChild(card);
    });
}

function getEmbedUrl(url) {
    if (!url) return '';
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes('youtu.be')) {
            return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
        }
        if (parsed.hostname.includes('youtube.com')) {
            const id = parsed.searchParams.get('v') || parsed.pathname.split('/').pop();
            return id ? `https://www.youtube.com/embed/${id}` : url;
        }
        if (parsed.hostname.includes('vimeo.com')) {
            const id = parsed.pathname.split('/').filter(Boolean).pop();
            return id ? `https://player.vimeo.com/video/${id}` : url;
        }
    } catch {
        return url;
    }
    return url;
}

function renderVideo(url) {
    lessonVideo.className = 'lesson-video';
    lessonVideo.innerHTML = '';

    if (!url) {
        lessonVideo.classList.add('empty');
        lessonVideo.textContent = 'Bu dars uchun video hali qo\'shilmagan.';
        return;
    }

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
        const video = document.createElement('video');
        video.controls = true;
        video.src = url;
        lessonVideo.appendChild(video);
        return;
    }

    const iframe = document.createElement('iframe');
    iframe.src = getEmbedUrl(url);
    iframe.title = 'Dars videosi';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    lessonVideo.appendChild(iframe);
}

async function openLesson(lessonId) {
    setMessage(lessonMessage, '');
    const payload = await api('lesson', { query: `&id=${encodeURIComponent(lessonId)}` });
    syncProgress(payload.progress);
    state.currentLessonId = lessonId;

    const lesson = payload.lesson;
    emptyState.hidden = true;
    lessonView.hidden = false;
    lessonCourse.textContent = lesson.course?.title || 'Dars';
    lessonTitle.textContent = lesson.title;
    lessonDescription.textContent = lesson.description || '';
    lessonBody.textContent = lesson.body || 'Dars matni hali qo\'shilmagan.';
    renderVideo(lesson.video_url);

    if (lesson.resources_url) {
        resourceLink.hidden = false;
        resourceLink.href = lesson.resources_url;
    } else {
        resourceLink.hidden = true;
    }

    completeButton.textContent = isCompleted(lessonId) ? 'Dars tugatilgan' : 'Darsni tugatdim';
    renderCourses();
}

async function loadPlatform() {
    try {
        const me = await api('me');
        state.user = me.user;
        syncProgress(me.progress);
        const catalog = await api('catalog');
        state.courses = catalog.courses || [];
        syncProgress(catalog.progress);
        showWorkspace();
        renderCourses();
    } catch {
        showLogin();
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage(loginMessage, 'Tekshirilmoqda...');
    const form = new FormData(loginForm);
    try {
        const payload = await api('login', {
            method: 'POST',
            body: {
                login: form.get('login'),
                password: form.get('password'),
            },
        });
        state.user = payload.user;
        loginForm.reset();
        setMessage(loginMessage, '');
        await loadPlatform();
    } catch (error) {
        setMessage(loginMessage, error.message, 'error');
    }
});

logoutButton.addEventListener('click', async () => {
    await api('logout', { method: 'POST' }).catch(() => null);
    state.user = null;
    showLogin();
});

completeButton.addEventListener('click', async () => {
    if (!state.currentLessonId) return;
    setMessage(lessonMessage, 'Saqlanmoqda...');
    try {
        const payload = await api('complete', {
            method: 'POST',
            body: { lesson_id: state.currentLessonId },
        });
        syncProgress(payload.progress);
        completeButton.textContent = 'Dars tugatilgan';
        renderCourses();
        setMessage(lessonMessage, 'Progress saqlandi.', 'success');
    } catch (error) {
        setMessage(lessonMessage, error.message, 'error');
    }
});

loadPlatform();
