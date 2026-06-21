const adminState = {
    user: null,
    courses: [],
};

const loginPanel = document.getElementById('loginPanel');
const adminWorkspace = document.getElementById('adminWorkspace');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const logoutButton = document.getElementById('logoutButton');
const courseForm = document.getElementById('courseForm');
const lessonForm = document.getElementById('lessonForm');
const userForm = document.getElementById('userForm');
const adminCourseList = document.getElementById('adminCourseList');
const adminMessage = document.getElementById('adminMessage');

async function api(action, options = {}) {
    const response = await fetch(`/api/lms?action=${encodeURIComponent(action)}${options.query || ''}`, {
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
        throw new Error(payload.message || 'Admin panel xatosi.');
    }
    return payload;
}

function setMessage(message, type = '') {
    adminMessage.textContent = message || '';
    adminMessage.className = `form-message ${type}`.trim();
}

function formPayload(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        data[input.name] = input.checked;
    });
    return data;
}

function showLogin(message = '') {
    loginPanel.hidden = false;
    adminWorkspace.hidden = true;
    logoutButton.hidden = true;
    loginMessage.textContent = message;
}

function showAdmin() {
    loginPanel.hidden = true;
    adminWorkspace.hidden = false;
    logoutButton.hidden = false;
}

function fillCourseOptions() {
    const select = lessonForm.elements.course_id;
    select.innerHTML = '';
    adminState.courses.forEach((course) => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.title;
        select.appendChild(option);
    });
}

function renderAdminCourses() {
    adminCourseList.innerHTML = '';
    if (!adminState.courses.length) {
        adminCourseList.innerHTML = '<p class="form-message">Hali kurs yo\'q.</p>';
        return;
    }

    adminState.courses.forEach((course) => {
        const item = document.createElement('article');
        item.className = 'admin-course';

        const title = document.createElement('h3');
        title.textContent = `${course.title} ${course.is_published ? '' : '(yashirin)'}`;
        const meta = document.createElement('p');
        meta.className = 'form-message';
        meta.textContent = course.description || course.level || '';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Kursni tahrirlash';
        editButton.addEventListener('click', () => {
            Object.entries(course).forEach(([key, value]) => {
                if (!courseForm.elements[key]) return;
                if (courseForm.elements[key].type === 'checkbox') {
                    courseForm.elements[key].checked = Boolean(value);
                } else {
                    courseForm.elements[key].value = value ?? '';
                }
            });
            lessonForm.elements.course_id.value = course.id;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const lessons = document.createElement('ul');
        (course.lessons || []).forEach((lesson) => {
            const row = document.createElement('li');
            row.textContent = `${lesson.sort_order}. ${lesson.title}${lesson.is_published ? '' : ' (yashirin)'}`;
            lessons.appendChild(row);
        });

        item.append(title, meta, editButton, lessons);
        adminCourseList.appendChild(item);
    });
}

async function loadAdmin() {
    try {
        const me = await api('me');
        if (me.user.role !== 'admin') {
            showLogin('Admin huquqi kerak.');
            return;
        }
        adminState.user = me.user;
        const payload = await api('admin-courses');
        adminState.courses = payload.courses || [];
        showAdmin();
        fillCourseOptions();
        renderAdminCourses();
    } catch {
        showLogin();
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginMessage.textContent = 'Tekshirilmoqda...';
    const form = new FormData(loginForm);
    try {
        await api('login', {
            method: 'POST',
            body: {
                login: form.get('login'),
                password: form.get('password'),
            },
        });
        loginForm.reset();
        await loadAdmin();
    } catch (error) {
        loginMessage.textContent = error.message;
        loginMessage.className = 'form-message error';
    }
});

logoutButton.addEventListener('click', async () => {
    await api('logout', { method: 'POST' }).catch(() => null);
    showLogin();
});

courseForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('Kurs saqlanmoqda...');
    try {
        await api('admin-save-course', {
            method: 'POST',
            body: formPayload(courseForm),
        });
        courseForm.reset();
        courseForm.elements.sort_order.value = 0;
        courseForm.elements.is_published.checked = true;
        setMessage('Kurs saqlandi.', 'success');
        await loadAdmin();
    } catch (error) {
        setMessage(error.message, 'error');
    }
});

lessonForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('Dars saqlanmoqda...');
    try {
        await api('admin-save-lesson', {
            method: 'POST',
            body: formPayload(lessonForm),
        });
        lessonForm.reset();
        lessonForm.elements.duration_minutes.value = 0;
        lessonForm.elements.sort_order.value = 0;
        lessonForm.elements.is_published.checked = true;
        setMessage('Dars saqlandi.', 'success');
        await loadAdmin();
    } catch (error) {
        setMessage(error.message, 'error');
    }
});

userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('Foydalanuvchi yaratilmoqda...');
    try {
        await api('admin-create-user', {
            method: 'POST',
            body: formPayload(userForm),
        });
        userForm.reset();
        userForm.elements.is_active.checked = true;
        setMessage('Foydalanuvchi yaratildi.', 'success');
    } catch (error) {
        setMessage(error.message, 'error');
    }
});

loadAdmin();
