const configuredBase = String(import.meta.env.VITE_PLATFORM_API_URL || '').replace(/\/$/, '');
const localBase = ['127.0.0.1', 'localhost'].includes(window.location.hostname) ? 'http://127.0.0.1:8787' : '';
export const API_BASE = configuredBase || localBase;

export class PlatformApiError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = 'PlatformApiError';
    this.code = code;
    this.status = status;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: options.body ? { 'Content-Type': 'application/json', ...options.headers } : options.headers,
    ...options,
    body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body,
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw new PlatformApiError(
      payload?.error?.message || 'Server bilan aloqa vaqtida xatolik yuz berdi.',
      payload?.error?.code || 'request_failed',
      response.status,
    );
  }
  return payload;
}

export const platformApi = {
  health: () => request('/api/v1/health'),
  me: () => request('/api/v1/auth/me'),
  register: (form) => request('/api/v1/auth/register', { method: 'POST', body: form }),
  login: (form) => request('/api/v1/auth/login', { method: 'POST', body: form }),
  logout: () => request('/api/v1/auth/logout', { method: 'POST', body: {} }),
  progress: () => request('/api/v1/progress'),
  setLesson: (lessonId, completed) => request(`/api/v1/progress/${encodeURIComponent(lessonId)}`, { method: 'PUT', body: { completed } }),
  challenges: () => request('/api/v1/challenges'),
  submitCode: (payload) => request('/api/v1/submissions', { method: 'POST', body: payload }),
  submission: (id) => request(`/api/v1/submissions/${encodeURIComponent(id)}`),
  labTemplates: () => request('/api/v1/lab-templates'),
  startLab: (templateId = 'web-basics') => request('/api/v1/labs', { method: 'POST', body: { templateId } }),
  lab: (id) => request(`/api/v1/labs/${encodeURIComponent(id)}`),
  stopLab: (id) => request(`/api/v1/labs/${encodeURIComponent(id)}`, { method: 'DELETE', body: {} }),
  checkout: (plan) => request('/api/v1/payments/checkout', { method: 'POST', body: { plan } }),
  drafts: () => request('/api/v1/studio/drafts'),
  saveDraft: (draft) => request('/api/v1/studio/drafts', { method: 'POST', body: draft }),
};
