import { useEffect, useMemo, useState } from 'react';
import {
  AiIcon,
  BookIcon,
  CertificateIcon,
  CodeIcon,
  GlobeIcon,
  HomeIcon,
  ProjectIcon,
  ShieldIcon,
  SparkIcon,
} from '../components/icons.jsx';
import {
  challengeCatalog,
  communityPosts,
  contestSchedule,
  flattenLessons,
  leaderboard,
  platformPaths,
  writeupLibrary,
} from './platformData.js';
import { platformApi } from './api.js';
import './platform.css';

const STORAGE_KEY = 'hackpro-platform-progress';
const DEFAULT_LAB_TEMPLATE = {
  id: 'web-basics',
  title: 'Web himoya sarlavhalari',
  category: 'Web Security',
  description: 'HTTP javobini tekshirib, yetishmayotgan himoya sarlavhasini aniqlang.',
};

function getStoredProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [view = 'dashboard', pathId, lessonId] = hash.split('/');
  return { view, pathId, lessonId };
}

function goTo(view, pathId, lessonId) {
  const parts = [view, pathId, lessonId].filter(Boolean);
  window.location.hash = `/${parts.join('/')}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function IconWrap({ children }) {
  return <span className="platform-icon">{children}</span>;
}

function Header({ route, xp, user, backendStatus, onAuth, onMenuToggle }) {
  return (
    <header className="platform-header">
      <button className="platform-menu-toggle" type="button" onClick={onMenuToggle} aria-label="Menyuni ochish">
        <span />
        <span />
        <span />
      </button>
      <a className="platform-brand" href="/" aria-label="HackPro bosh sahifasiga qaytish">
        <img src="/static/img/hackpro-logo-transparent.png" alt="HackPro Academy" />
        <span>
          <strong>HackPro</strong>
          <small>Academy</small>
        </span>
      </a>

      <nav className="platform-track-nav" aria-label="O‘quv yo‘nalishlari">
        <button className={route.view === 'dashboard' ? 'is-active' : ''} type="button" onClick={() => goTo('dashboard')}>
          <BookIcon />
          Ta’lim
        </button>
        <button className={route.pathId === 'cyber-start' ? 'is-active' : ''} type="button" onClick={() => goTo('path', 'cyber-start')}>
          <ShieldIcon />
          Kiberxavfsizlik
        </button>
        <button className={route.pathId === 'frontend-foundations' ? 'is-active' : ''} type="button" onClick={() => goTo('path', 'frontend-foundations')}>
          <CodeIcon />
          Dasturlash
        </button>
        <button className={route.pathId === 'ai-launchpad' ? 'is-active' : ''} type="button" onClick={() => goTo('path', 'ai-launchpad')}>
          <AiIcon />
          AI
        </button>
        <button className={route.pathId === 'devops-essentials' ? 'is-active' : ''} type="button" onClick={() => goTo('path', 'devops-essentials')}>
          <ProjectIcon />
          DevOps
        </button>
        <button className={route.view === 'community' ? 'is-active' : ''} type="button" onClick={() => goTo('community')}>
          <GlobeIcon />
          Hamjamiyat
        </button>
      </nav>

      <div className="platform-header-actions">
        <span className={`backend-dot is-${backendStatus}`} title={backendStatus === 'online' ? 'Server ulangan' : 'Server holati'} />
        <span className="xp-pill" title="Yig‘ilgan tajriba ballari">
          <SparkIcon /> {xp} XP
        </span>
        <button className="round-action" type="button" aria-label="Bildirishnomalar">
          <span aria-hidden="true">●</span>
        </button>
        <button className="profile-chip" type="button" onClick={() => user ? goTo('profile') : onAuth()}>
          <img
            className="profile-logo"
            src="/static/img/hackpro-logo-transparent.png"
            alt=""
            aria-hidden="true"
          />
          <strong>{user?.displayName || 'Kirish'}</strong>
        </button>
      </div>
    </header>
  );
}

function AuthDialog({ open, onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = mode === 'register'
        ? await platformApi.register(form)
        : await platformApi.login({ email: form.email, password: form.password });
      onAuthenticated(payload.user);
      setForm({ displayName: '', email: '', password: '' });
      onClose();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-overlay" role="presentation" onMouseDown={onClose}>
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-label="HackPro akkaunti" onMouseDown={(event) => event.stopPropagation()}>
        <button className="lab-close" type="button" onClick={onClose} aria-label="Yopish">×</button>
        <img src="/static/img/hackpro-logo-transparent.png" alt="HackPro Academy" />
        <span className="eyebrow">HackPro Account</span>
        <h2>{mode === 'login' ? 'Platformaga kirish' : 'Akkaunt yaratish'}</h2>
        <p>Progress, laboratoriyalar va sertifikatlaringiz barcha qurilmalarda saqlanadi.</p>
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'is-active' : ''} type="button" onClick={() => { setMode('login'); setError(''); }}>Kirish</button>
          <button className={mode === 'register' ? 'is-active' : ''} type="button" onClick={() => { setMode('register'); setError(''); }}>Ro‘yxatdan o‘tish</button>
        </div>
        <form onSubmit={submit}>
          {mode === 'register' && <label>Ismingiz<input autoComplete="name" value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} minLength="2" maxLength="60" required /></label>}
          <label>Elektron pochta<input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
          <label>Parol<input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength="10" maxLength="128" required /></label>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="primary-action" type="submit" disabled={busy}>{busy ? 'Tekshirilmoqda…' : mode === 'login' ? 'Kirish' : 'Akkaunt yaratish'}</button>
        </form>
        <small>Parol serverda scrypt bilan himoyalanadi. Sessiya kaliti JavaScript uchun yopiq cookie’da saqlanadi.</small>
      </section>
    </div>
  );
}

const sidebarItems = [
  { id: 'dashboard', label: 'Bosh sahifa', Icon: HomeIcon },
  { id: 'paths', label: 'O‘quv yo‘llari', Icon: BookIcon },
  { id: 'challenges', label: 'Challenge’lar', Icon: ProjectIcon },
  { id: 'labs', label: 'Laboratoriyalar', Icon: ShieldIcon },
  { id: 'contests', label: 'Musobaqalar', Icon: SparkIcon },
  { id: 'writeups', label: 'Writeup va maqolalar', Icon: BookIcon },
  { id: 'legion', label: 'Jamoalar', Icon: ShieldIcon },
  { id: 'seasons', label: 'Mavsumlar', Icon: GlobeIcon },
  { id: 'leaderboard', label: 'Reyting', Icon: SparkIcon },
  { id: 'community', label: 'Hamjamiyat', Icon: GlobeIcon },
  { id: 'studio', label: 'Kontent studiyasi', Icon: CodeIcon },
  { id: 'certificates', label: 'Sertifikatlar', Icon: CertificateIcon },
  { id: 'premium', label: 'Tariflar', Icon: AiIcon },
];

function Sidebar({ route, mobileOpen, onNavigate }) {
  return (
    <aside className={`platform-sidebar ${mobileOpen ? 'is-open' : ''}`}>
      <div className="sidebar-label">HackPro Platform</div>
      <nav aria-label="Platforma menyusi">
        {sidebarItems.map(({ id, label, Icon }) => {
          const active = route.view === id || (id === 'paths' && route.view === 'path');
          return (
            <button
              className={active ? 'is-active' : ''}
              type="button"
              key={id}
              onClick={() => {
                onNavigate();
                goTo(id === 'paths' ? 'dashboard' : id);
              }}
            >
              <IconWrap><Icon /></IconWrap>
              {label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="streak-card">
          <span className="streak-flame">✦</span>
          <span><strong>1 kun</strong><small>faol seriya</small></span>
        </div>
        <a href="/" className="back-to-site"><GlobeIcon /> Asosiy sayt</a>
      </div>
    </aside>
  );
}

function LessonOutline({ path, currentLesson, completed, mobileOpen, onNavigate }) {
  const lessons = flattenLessons(path);
  const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0);
  return (
    <aside className={`platform-sidebar lesson-outline ${mobileOpen ? 'is-open' : ''}`}>
      <button className="outline-back" type="button" onClick={() => { onNavigate(); goTo('path', path.id); }}>
        ← O‘quv yo‘liga qaytish
      </button>
      <div className="sidebar-label">Mundarija</div>
      <nav aria-label="Darslar mundarijasi">
        {lessons.map((lesson, index) => (
          <button
            className={`${currentLesson.id === lesson.id ? 'is-active' : ''} ${completed.includes(lesson.id) ? 'is-complete' : ''}`}
            type="button"
            key={lesson.id}
            onClick={() => {
              onNavigate();
              goTo('lesson', path.id, lesson.id);
            }}
          >
            <span className="lesson-index">{completed.includes(lesson.id) ? '✓' : index + 1}</span>
            <span><strong>{lesson.title}</strong><small>{lesson.minutes} daqiqa · {lesson.xp} XP</small></span>
          </button>
        ))}
      </nav>
      <div className="lesson-outline-stats">
        <span><small>Vaqt</small><strong>≈ {lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)} daq</strong></span>
        <span><small>Mukofot</small><strong>{totalXp} XP</strong></span>
      </div>
    </aside>
  );
}

function ProgressRing({ value }) {
  return (
    <div className="progress-ring" style={{ '--progress': `${value * 3.6}deg` }} aria-label={`${value}% bajarildi`}>
      <span>{value}%</span>
      <small>progress</small>
    </div>
  );
}

function Dashboard({ completed }) {
  const totalLessons = platformPaths.reduce((sum, path) => sum + flattenLessons(path).length, 0);
  const completedCount = completed.length;
  const overall = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <main className="platform-main dashboard-view">
      <section className="platform-welcome">
        <div>
          <span className="eyebrow">HackPro Academy</span>
          <h1>Bilimni bosqichma-bosqich egallang</h1>
          <p>Yo‘l xaritasini tanlang, darslarni yakunlang va har bir amaliy qadam uchun XP to‘plang.</p>
        </div>
        <div className="welcome-progress">
          <ProgressRing value={overall} />
          <span><strong>{completedCount}/{totalLessons}</strong><small>yakunlangan darslar</small></span>
        </div>
      </section>

      <section className="metric-grid" aria-label="O‘quv statistikasi">
        <article><span>Faol yo‘llar</span><strong>3</strong><small>Kiberxavfsizlik, Dasturlash, AI</small></article>
        <article><span>Yig‘ilgan XP</span><strong>{completedCount * 70}</strong><small>Har bir dars bilan o‘sadi</small></article>
        <article><span>Sertifikatlar</span><strong>0</strong><small>Yo‘l yakunlanganda ochiladi</small></article>
      </section>

      <section className="paths-section">
        <div className="section-title-row">
          <div><span className="eyebrow">O‘quv yo‘llari</span><h2>Yo‘nalishingizni tanlang</h2></div>
          <span className="path-legend"><i className="done" /> Tugatilgan <i className="active" /> Jarayonda <i /> Boshlanmagan</span>
        </div>
        <div className="learning-map">
          <div className="map-line" aria-hidden="true" />
          {platformPaths.map((path, index) => {
            const lessons = flattenLessons(path);
            const done = lessons.filter((lesson) => completed.includes(lesson.id)).length;
            const percentage = Math.round((done / lessons.length) * 100) || 0;
            return (
              <article className={`path-card accent-${path.accent}`} key={path.id}>
                <span className="map-step">0{index + 1}</span>
                <div className="path-card-top">
                  <span className="path-symbol">{index === 0 ? '◆' : index === 1 ? '⌘' : '✦'}</span>
                  <span className="level-badge">{path.level}</span>
                  <span className="path-progress-text">{percentage}%</span>
                </div>
                <span className="path-category">{path.category}</span>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="path-meta">
                  <span>▣ {lessons.length} dars</span>
                  <span>◷ {path.duration}</span>
                  <span>✓ {done}/{lessons.length}</span>
                </div>
                <button type="button" onClick={() => goTo('path', path.id)}>
                  {done ? 'Davom ettirish' : 'Yo‘lni boshlash'} <span>→</span>
                </button>
              </article>
            );
          })}
          <div className="certificate-node"><CertificateIcon /><strong>Sertifikat</strong></div>
        </div>
      </section>
    </main>
  );
}

function PathView({ path, completed }) {
  const lessons = flattenLessons(path);
  const completedCount = lessons.filter((lesson) => completed.includes(lesson.id)).length;
  const percentage = Math.round((completedCount / lessons.length) * 100) || 0;
  return (
    <main className="platform-main path-view">
      <button className="text-back" type="button" onClick={() => goTo('dashboard')}>← Barcha yo‘llar</button>
      <section className={`path-hero accent-${path.accent}`}>
        <div>
          <span className="level-badge">{path.level}</span>
          <span className="eyebrow">O‘quv yo‘li · {path.category}</span>
          <h1>{path.title}</h1>
          <p>{path.description}</p>
          <div className="path-meta large">
            <span>▣ {lessons.length} dars</span>
            <span>◷ {path.duration}</span>
            <span>✓ {completedCount}/{lessons.length} yakunlandi</span>
          </div>
          <div className="tag-row">{path.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <ProgressRing value={percentage} />
      </section>

      <section className="module-list">
        {path.modules.map((module, moduleIndex) => {
          const moduleDone = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
          return (
            <article className="module-card" key={module.id}>
              <header>
                <span>{moduleIndex + 1}</span>
                <div><h2>{module.title}</h2><p>{moduleDone}/{module.lessons.length} dars yakunlandi</p></div>
                <small>{Math.round((moduleDone / module.lessons.length) * 100) || 0}%</small>
              </header>
              <div className="module-lessons">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isComplete = completed.includes(lesson.id);
                  return (
                    <button type="button" key={lesson.id} onClick={() => goTo('lesson', path.id, lesson.id)}>
                      <span className={`lesson-number ${isComplete ? 'is-complete' : ''}`}>{isComplete ? '✓' : lessonIndex + 1}</span>
                      <span className="lesson-copy"><strong>{lesson.title}</strong><small>{lesson.summary}</small></span>
                      <span className={`difficulty difficulty-${lesson.difficulty.toLowerCase().replace('‘', '')}`}>{lesson.difficulty}</span>
                      <span className="lesson-format">▤ Matnli dars</span>
                      <span className="lesson-stat">◷ {lesson.minutes}m</span>
                      <span className="lesson-stat xp">✦ {lesson.xp}</span>
                      <span className="lesson-arrow">›</span>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function LessonArticle({ lesson, isComplete, onComplete, onLab }) {
  return (
    <main className="platform-main lesson-view">
      <div className="lesson-kicker"><span>{lesson.difficulty}</span><span>{lesson.minutes} daqiqa</span><span>{lesson.xp} XP</span></div>
      <h1>{lesson.title}</h1>
      <p className="lesson-lead">{lesson.summary} Ushbu dars nazariya, hayotiy misol va xavfsiz amaliy topshiriqdan iborat.</p>

      <section className="lesson-section">
        <h2><span>◉</span> Dars maqsadi</h2>
        <ul>
          <li>Asosiy tushunchalarni sodda va aniq misollar orqali anglash.</li>
          <li>Kundalik hayotda xavfsiz qaror qabul qilishni o‘rganish.</li>
          <li>Olingan bilimni qisqa amaliy vazifada tekshirish.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2><span>⌕</span> Avval hayotiy misol</h2>
        <p>Tasavvur qiling: uy eshigini qulflamasdan ketdingiz. Raqamli hayotda kuchsiz parol, shubhali havola yoki yangilanmagan qurilma ham ochiq eshikka o‘xshaydi. Himoya — bitta tugma emas, bir-birini to‘ldiradigan odatlar tizimi.</p>
      </section>

      <section className="lesson-section">
        <h2><span>▤</span> Muhim tushunchalar</h2>
        <div className="lesson-table" role="table" aria-label="Muhim tushunchalar">
          <div role="row"><strong role="columnheader">Tushuncha</strong><strong role="columnheader">Oddiy izoh</strong><strong role="columnheader">Amaliy misol</strong></div>
          <div role="row"><span>Xavf</span><span>Zarar yetkazishi mumkin bo‘lgan holat</span><span>Shubhali xabar</span></div>
          <div role="row"><span>Himoya</span><span>Xavfni kamaytiradigan qatlam</span><span>MFA va yangilanish</span></div>
          <div role="row"><span>Nazorat</span><span>Natijani muntazam tekshirish</span><span>Faol sessiyalar ro‘yxati</span></div>
        </div>
      </section>

      <aside className="lesson-note">
        <strong>Esda tuting</strong>
        <p>Haqiqiy tizimlarni ruxsatsiz tekshirish mumkin emas. HackPro amaliyotlari faqat qonuniy, xavfsiz va maxsus laboratoriya muhitida bajariladi.</p>
      </aside>

      <section className="lesson-section">
        <h2><span>✓</span> Kundalik amaliyot</h2>
        <ol className="practice-list">
          <li><span>1</span><div><strong>Akkauntlarni tekshiring</strong><p>Muhim akkauntlarda MFA yoqilganiga ishonch hosil qiling.</p></div></li>
          <li><span>2</span><div><strong>Yangilanishlarni o‘rnating</strong><p>Brauzer va operatsion tizimni dolzarb saqlang.</p></div></li>
          <li><span>3</span><div><strong>Shubhali havolani ochmang</strong><p>Manzil va yuboruvchini alohida tekshiring.</p></div></li>
        </ol>
      </section>

      <div className="lesson-actions">
        <button className="secondary-action" type="button" onClick={onLab}>Amaliy laboratoriya</button>
        <button className={`primary-action ${isComplete ? 'is-complete' : ''}`} type="button" onClick={onComplete}>
          {isComplete ? '✓ Dars yakunlangan' : 'Darsni yakunlash'}
        </button>
      </div>
    </main>
  );
}

function ChallengesView({ user, onAuth, onAccountRefresh }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Barchasi');
  const [active, setActive] = useState(null);
  const [judgeChallenges, setJudgeChallenges] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [source, setSource] = useState('');
  const [submission, setSubmission] = useState(null);
  const [judgeError, setJudgeError] = useState('');
  const [judgeBusy, setJudgeBusy] = useState(false);
  const [solved, setSolved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hackpro-solved-challenges') || '[]'); } catch { return []; }
  });
  const categories = ['Barchasi', ...new Set(challengeCatalog.map((item) => item.category))];
  const filtered = challengeCatalog.filter((item) => {
    const matchesCategory = category === 'Barchasi' || item.category === category;
    const matchesQuery = `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    platformApi.challenges().then((payload) => {
      setJudgeChallenges(payload.challenges);
      if (payload.solvedIds?.length) {
        setSolved((current) => [...new Set([...current, ...payload.solvedIds])]);
      }
    }).catch(() => setJudgeChallenges([]));
  }, []);

  const openChallenge = (item) => {
    const judge = judgeChallenges.find((challenge) => challenge.id === item.id);
    setActive(item);
    setSubmission(null);
    setJudgeError('');
    if (judge) {
      const nextLanguage = judge.languages[0];
      setLanguage(nextLanguage);
      setSource(judge.starter[nextLanguage] || '');
    }
  };

  const judgeChallenge = active && judgeChallenges.find((challenge) => challenge.id === active.id);

  const runCode = async () => {
    if (!user) {
      onAuth();
      return;
    }
    setJudgeBusy(true);
    setJudgeError('');
    try {
      let payload = await platformApi.submitCode({ challengeId: active.id, language, source });
      setSubmission(payload.submission);
      for (let attempt = 0; attempt < 45 && ['queued', 'running'].includes(payload.submission.status); attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        payload = await platformApi.submission(payload.submission.id);
        setSubmission(payload.submission);
      }
      if (payload.submission.status === 'passed') {
        const next = solved.includes(active.id) ? solved : [...solved, active.id];
        setSolved(next);
        localStorage.setItem('hackpro-solved-challenges', JSON.stringify(next));
        onAccountRefresh();
      }
    } catch (requestError) {
      setJudgeError(requestError.message);
    } finally {
      setJudgeBusy(false);
    }
  };

  const finishChallenge = () => {
    if (!active) return;
    const next = solved.includes(active.id) ? solved : [...solved, active.id];
    setSolved(next);
    localStorage.setItem('hackpro-solved-challenges', JSON.stringify(next));
    setActive(null);
  };

  return (
    <main className="platform-main simple-view">
      <span className="eyebrow">Amaliy sinovlar</span><h1>Challenge’lar</h1>
      <p>Bilimingizni qisqa va xavfsiz vazifalarda sinab ko‘ring.</p>
      <div className="catalog-toolbar">
        <label><span className="sr-only">Challenge qidirish</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Challenge qidirish…" /></label>
        <div>{categories.map((item) => <button className={category === item ? 'is-active' : ''} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      <div className="challenge-grid">
        {filtered.map((item, index) => (
          <article className={solved.includes(item.id) ? 'is-solved' : ''} key={item.id}>
            <span>{solved.includes(item.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><small>{item.category}</small><h2>{item.title}</h2><p>{item.description}</p><div><i>{item.difficulty} · {item.minutes} daqiqa</i><strong>✦ {item.xp} XP</strong></div><button type="button" onClick={() => openChallenge(item)}>{solved.includes(item.id) ? 'Qayta ko‘rish' : 'Boshlash'}</button>
          </article>
        ))}
      </div>
      {active && (
        <div className="lab-overlay" role="presentation" onMouseDown={() => setActive(null)}>
          <aside className="lab-drawer challenge-drawer" role="dialog" aria-modal="true" aria-label={active.title} onMouseDown={(event) => event.stopPropagation()}>
            <button className="lab-close" type="button" onClick={() => setActive(null)} aria-label="Yopish">×</button>
            <span className="eyebrow">{active.category}</span><h2>{active.title}</h2><p>{active.description}</p>
            {judgeChallenge ? (
              <div className="judge-panel">
                <div className="safe-task"><strong>Real kod tekshiruvchi</strong><p>Kod alohida, tarmoqsiz va resurslari cheklangan konteynerda yashirin testlar bilan bajariladi.</p></div>
                <label>Dasturlash tili<select value={language} onChange={(event) => { const next = event.target.value; setLanguage(next); setSource(judgeChallenge.starter[next] || ''); }}>{judgeChallenge.languages.map((item) => <option key={item} value={item}>{item === 'javascript' ? 'JavaScript' : 'Python'}</option>)}</select></label>
                {judgeChallenge.examples.map((example, index) => <div className="judge-example" key={index}><small>Namuna {index + 1}</small><code>Kirish: {example.input}</code><code>Natija: {example.expected}</code></div>)}
                <label>Kodingiz<textarea className="code-editor" value={source} onChange={(event) => setSource(event.target.value)} spellCheck="false" rows="12" /></label>
                {submission && <div className={`judge-result is-${submission.status}`}><strong>{submission.status === 'passed' ? '✓ Barcha testlar o‘tdi' : submission.status === 'failed' ? 'Testdan o‘tmadi' : submission.status === 'error' ? 'Tekshiruvchi xatosi' : 'Tekshirilmoqda…'}</strong>{submission.result?.tests?.map((test) => <span key={test.index}>Test {test.index}: {test.status}</span>)}</div>}
                {judgeError && <div className="form-error" role="alert">{judgeError}</div>}
                <button className="primary-action" type="button" onClick={runCode} disabled={judgeBusy}>{judgeBusy ? 'Tekshirilmoqda…' : user ? 'Kodni tekshirish' : 'Kirish va tekshirish'}</button>
              </div>
            ) : (
              <>
                <div className="safe-task"><strong>Vazifa</strong><p>Muammoni zararli amallarsiz tahlil qiling va eng xavfsiz yechimni tanlang.</p></div>
                <label><input type="radio" name="challenge-answer" /> Natijani tekshirmasdan darhol qo‘llash</label>
                <label><input type="radio" name="challenge-answer" /> Manba, ta’sir va qayta tiklash rejasini tekshirish</label>
                <label><input type="radio" name="challenge-answer" /> Maxfiy ma’lumotni ochiq kanal orqali yuborish</label>
                <button className="primary-action" type="button" onClick={finishChallenge}>Xavfsiz yechimni saqlash</button>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

function LabsView({ onOpenLab }) {
  const [templates, setTemplates] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [category, setCategory] = useState('Barchasi');
  const [error, setError] = useState('');
  const [workerReady, setWorkerReady] = useState(false);

  useEffect(() => {
    const loadTemplates = () => Promise.all([platformApi.labTemplates(), platformApi.health()])
      .then(([payload, health]) => {
        setTemplates(payload.templates);
        setCompletedIds(payload.completedIds || []);
        setWorkerReady(Boolean(health.worker));
      })
      .catch((requestError) => setError(requestError.message));
    loadTemplates();
    window.addEventListener('focus', loadTemplates);
    return () => window.removeEventListener('focus', loadTemplates);
  }, []);

  const categories = ['Barchasi', ...new Set(templates.map((template) => template.category))];
  const visible = category === 'Barchasi' ? templates : templates.filter((template) => template.category === category);

  return (
    <main className="platform-main simple-view labs-view">
      <span className="eyebrow">HackPro Safe Labs</span><h1>Amaliy laboratoriyalar</h1>
      <p>Har bir mashq alohida, vaqt bilan cheklangan konteynerda ishlaydi. Topshiriqlar HackPro uchun original va faqat qonuniy ta’lim muhiti uchun yaratilgan.</p>
      <section className="lab-system-banner"><div><strong>Bir bosishli izolyatsiya</strong><span>Ichki tarmoq · read-only fayl tizimi · non-root · avtomatik yopilish</span></div><b className={workerReady ? 'is-ready' : 'is-waiting'}>● {workerReady ? 'Lab worker tayyor' : 'Docker worker kutilmoqda'}</b></section>
      <div className="catalog-toolbar lab-filters"><div>{categories.map((item) => <button className={category === item ? 'is-active' : ''} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="lab-catalog-grid">
        {visible.map((template, index) => (
          <article className={completedIds.includes(template.id) ? 'is-complete' : ''} key={template.id}>
            <header><span>{String(index + 1).padStart(2, '0')}</span><small>{template.category}</small>{completedIds.includes(template.id) && <b>✓ Yakunlangan</b>}</header>
            <h2>{template.title}</h2><p>{template.description}</p>
            <div className="lab-card-meta"><span>{template.difficulty}</span><span>{template.minutes} daqiqa</span><span>+{template.xp} XP</span></div>
            <footer><small>{template.mode}</small><button type="button" onClick={() => onOpenLab(template)}>{completedIds.includes(template.id) ? 'Qayta ochish' : 'Labni boshlash'} →</button></footer>
          </article>
        ))}
      </div>
    </main>
  );
}

function ContestsView() {
  const [registered, setRegistered] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hackpro-contests') || '[]'); } catch { return []; }
  });
  const toggleRegistration = (id) => {
    const next = registered.includes(id) ? registered.filter((item) => item !== id) : [...registered, id];
    setRegistered(next);
    localStorage.setItem('hackpro-contests', JSON.stringify(next));
  };
  return (
    <main className="platform-main simple-view contests-view">
      <span className="eyebrow">Mavsumiy musobaqalar</span><h1>HackPro Arena</h1>
      <p>Yakka yoki jamoa bilan xavfsiz amaliy vazifalarda qatnashing.</p>
      <div className="contest-grid">
        {contestSchedule.map((contest) => (
          <article key={contest.id}>
            <header><span>{contest.date}</span><small>{contest.status}</small></header>
            <span className="contest-category">{contest.category}</span><h2>{contest.title}</h2>
            <div className="contest-meta"><span>{contest.participants} qatnashchi</span><span>{contest.prize}</span></div>
            <ol>{contest.stages.map((stage, index) => <li key={stage}><span>{index + 1}</span>{stage}</li>)}</ol>
            <button className={registered.includes(contest.id) ? 'is-registered' : ''} type="button" onClick={() => toggleRegistration(contest.id)}>{registered.includes(contest.id) ? '✓ Ro‘yxatdan o‘tildi' : 'Ro‘yxatdan o‘tish'}</button>
          </article>
        ))}
      </div>
    </main>
  );
}

function WriteupsView({ articleId }) {
  const [query, setQuery] = useState('');
  const article = writeupLibrary.find((item) => item.id === articleId);
  if (article) {
    return (
      <main className="platform-main writeup-article">
        <button className="text-back" type="button" onClick={() => goTo('writeups')}>← Barcha materiallar</button>
        <span className="eyebrow">{article.category}</span><h1>{article.title}</h1>
        <div className="article-byline"><span>{article.author}</span><span>{article.minutes} daqiqa o‘qish</span></div>
        <p className="lesson-lead">{article.summary}</p>
        <section><h2>Muammoni aniqlash</h2><p>Yaxshi tahlil vaziyatni aniq tariflashdan boshlanadi. Qaysi signal kuzatildi, u qachon paydo bo‘ldi va foydalanuvchiga qanday ta’sir qilishi mumkin — shu uch savol yozib olinadi.</p></section>
        <section><h2>Tekshiruv usuli</h2><p>Manbani, sanani va dalillarni alohida tekshiring. Xavfsizlikka oid har qanday amaliyot faqat o‘zingizga tegishli yoki yozma ruxsat berilgan muhitda bajarilishi kerak.</p><div className="article-checklist"><span>✓ Manba tasdiqlandi</span><span>✓ Ta’sir chegarasi aniqlandi</span><span>✓ Xavfsiz tiklash rejasi tayyor</span></div></section>
        <section><h2>Xulosa</h2><p>Natijani qisqa tavsiya, tekshiruv dalili va keyingi qadam bilan yakunlang. Shu tuzilma mentor tekshiruvi va jamoaviy o‘rganishni osonlashtiradi.</p></section>
      </main>
    );
  }
  const filtered = writeupLibrary.filter((item) => `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="platform-main simple-view">
      <span className="eyebrow">Bilim bazasi</span><h1>Writeup va maqolalar</h1><p>Challenge, loyiha va texnologiyalar bo‘yicha bosqichma-bosqich tahlillar.</p>
      <div className="catalog-toolbar writeup-search"><label><span className="sr-only">Maqola qidirish</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Maqola qidirish…" /></label></div>
      <div className="writeup-grid">{filtered.map((item) => <article key={item.id}><span>{item.category}</span><h2>{item.title}</h2><p>{item.summary}</p><div><small>{item.author}</small><small>{item.minutes} daqiqa</small></div><button type="button" onClick={() => goTo('writeups', item.id)}>O‘qish →</button></article>)}</div>
    </main>
  );
}

function LegionView() {
  const [joined, setJoined] = useState(() => localStorage.getItem('hackpro-legion') === 'joined');
  const toggleJoin = () => {
    const next = !joined;
    setJoined(next);
    localStorage.setItem('hackpro-legion', next ? 'joined' : '');
  };
  const members = ['Aziza Karimova', 'Sardor Ergashev', 'Dilshod Rahimov', 'Siz'];
  return (
    <main className="platform-main simple-view legion-view">
      <span className="eyebrow">Jamoaviy rivojlanish</span><h1>HackPro Legion</h1><p>Birga o‘rganing, haftalik vazifalarni bajaring va jamoa reytingini oshiring.</p>
      <section className="legion-hero"><div><span className="legion-mark">HP</span><div><small>Ochiq jamoa</small><h2>Blue Phoenix</h2><p>Kiberxavfsizlik, dasturlash va DevOps bo‘yicha o‘quvchilar jamoasi.</p></div></div><button className={joined ? 'is-joined' : ''} type="button" onClick={toggleJoin}>{joined ? '✓ Jamoaga qo‘shilgansiz' : 'Jamoaga qo‘shilish'}</button></section>
      <div className="legion-stats"><article><span>Jamoa XP</span><strong>8 460</strong></article><article><span>Haftalik o‘rin</span><strong>#3</strong></article><article><span>Faol a’zolar</span><strong>{joined ? 25 : 24}</strong></article></div>
      <section className="member-card"><header><h2>A’zolar</h2><span>Haftalik hissa</span></header>{members.map((name, index) => <div key={name}><span className="avatar">{name[0]}</span><strong>{name}</strong><small>{index === 0 ? 'Kapitan' : 'A’zo'}</small><b>{980 - index * 145} XP</b></div>)}</section>
    </main>
  );
}

function SeasonsView({ xp }) {
  const ranks = [
    { name: 'Boshlovchi', xp: 0 }, { name: 'Izlanuvchi', xp: 300 }, { name: 'Amaliyotchi', xp: 700 }, { name: 'Mutaxassis', xp: 1300 }, { name: 'Mentor', xp: 2200 },
  ];
  return (
    <main className="platform-main simple-view seasons-view">
      <span className="eyebrow">2026 · Yozgi mavsum</span><h1>Mahorat pog‘onalari</h1><p>Dars, challenge va musobaqalardan XP yig‘ib keyingi darajani oching.</p>
      <section className="season-progress"><div><span>Joriy natija</span><strong>{xp} XP</strong></div><div className="season-bar"><i style={{ width: `${Math.min((xp / 2200) * 100, 100)}%` }} /></div><small>Keyingi daraja uchun muntazam o‘rganishni davom ettiring.</small></section>
      <div className="rank-road">{ranks.map((rank, index) => <article className={xp >= rank.xp ? 'is-unlocked' : ''} key={rank.name}><span>{index + 1}</span><div><h2>{rank.name}</h2><p>{rank.xp} XP</p></div><b>{xp >= rank.xp ? '✓' : '◇'}</b></article>)}</div>
      <section className="season-quests"><h2>Mavsum vazifalari</h2><div><span>3 ta darsni yakunlash</span><strong>+150 XP</strong></div><div><span>1 ta challenge yechish</span><strong>+100 XP</strong></div><div><span>Hamjamiyatda foydali fikr ulashish</span><strong>+50 XP</strong></div></section>
    </main>
  );
}

function StudioView({ user, onAuth }) {
  const [drafts, setDrafts] = useState([]);
  const [form, setForm] = useState({ title: '', type: 'Maqola', summary: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setDrafts([]);
      return;
    }
    platformApi.drafts().then((payload) => setDrafts(payload.drafts)).catch((requestError) => setError(requestError.message));
  }, [user]);

  const saveDraft = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.summary.trim()) return;
    if (!user) {
      onAuth();
      return;
    }
    setBusy(true);
    setError('');
    try {
      const payload = await platformApi.saveDraft({ title: form.title, contentType: form.type, summary: form.summary });
      setDrafts([payload.draft, ...drafts]);
      setForm({ title: '', type: 'Maqola', summary: '' });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="platform-main simple-view studio-view">
      <span className="eyebrow">Community Studio</span><h1>Kontent yarating</h1><p>Maqola, loyiha tahlili yoki challenge g‘oyasini qoralama sifatida saqlang.</p>
      <div className="studio-layout"><form onSubmit={saveDraft}><label>Sarlavha<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Material nomi" required /></label><label>Turi<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option>Maqola</option><option>Writeup</option><option>Challenge g‘oyasi</option><option>Loyiha</option></select></label><label>Qisqa tavsif<textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} placeholder="Nimani o‘rgatadi?" rows="6" required /></label>{error && <div className="form-error" role="alert">{error}</div>}<button className="primary-action" type="submit" disabled={busy}>{busy ? 'Saqlanmoqda…' : user ? 'Qoralamani bazaga saqlash' : 'Kirish va saqlash'}</button></form><section><h2>Qoralamalar</h2>{drafts.length ? drafts.map((draft) => <article key={draft.id}><span>{draft.contentType || draft.type}</span><h3>{draft.title}</h3><p>{draft.summary}</p><small>{draft.status === 'draft' ? 'Qoralama' : draft.status}</small></article>) : <div className="empty-state">{user ? 'Hali qoralama yo‘q. Birinchi materialingizni yarating.' : 'Qoralamalarni bazada saqlash uchun tizimga kiring.'}</div>}</section></div>
    </main>
  );
}

function CommunityView() {
  const [likes, setLikes] = useState({});
  return (
    <main className="platform-main simple-view community-view">
      <span className="eyebrow">HackPro Hamjamiyati</span><h1>Birga o‘rganing</h1><p>Natija, savol va foydali tajribalarni xavfsiz muhitda ulashing.</p>
      <div className="community-layout"><section className="community-feed">{communityPosts.map((post) => <article key={post.id}><header><span className="avatar">{post.author[0]}</span><div><strong>{post.author}</strong><small>{post.role} · {post.time}</small></div></header><p>{post.text}</p><footer><button type="button" onClick={() => setLikes({ ...likes, [post.id]: !likes[post.id] })}>{likes[post.id] ? '♥' : '♡'} {post.likes + (likes[post.id] ? 1 : 0)}</button><span>◯ {post.comments} izoh</span></footer></article>)}</section><aside><h2>Haftaning faol a’zolari</h2>{leaderboard.slice(0, 3).map((row, index) => <div key={row.name}><span>{index + 1}</span><strong>{row.name}</strong><b>{row.xp} XP</b></div>)}<a href="https://t.me/HackPro_Academy" target="_blank" rel="noreferrer">Telegram hamjamiyati →</a></aside></div>
    </main>
  );
}

function PremiumView({ user, onAuth }) {
  const [error, setError] = useState('');
  const [busyPlan, setBusyPlan] = useState('');
  const startCheckout = async (plan) => {
    if (!user) {
      onAuth();
      return;
    }
    setBusyPlan(plan);
    setError('');
    try {
      const payload = await platformApi.checkout(plan);
      window.location.assign(payload.checkoutUrl);
    } catch (requestError) {
      setError(requestError.message);
      setBusyPlan('');
    }
  };
  return (
    <main className="platform-main simple-view premium-view">
      <span className="eyebrow">O‘qish rejasi</span><h1>HackPro imkoniyatlari</h1><p>Demo platformani bepul ko‘ring. To‘liq kurs va mentorlik uchun o‘zingizga mos yo‘nalishni tanlang.</p>
      {user && <div className="current-plan">Joriy tarif: <strong>{user.plan === 'free' ? 'Bepul' : user.plan === 'pro' ? 'Pro' : 'Mentor'}</strong></div>}
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="pricing-grid"><article><span>Demo</span><h2>Bepul</h2><ul><li>O‘quv yo‘llarini ko‘rish</li><li>Namuna darslar</li><li>1 ta Safe Lab</li></ul><button type="button" onClick={() => goTo('dashboard')}>Davom etish</button></article><article className="featured"><span>To‘liq ta’lim</span><h2>Pro</h2><ul><li>Barcha dars va amaliyotlar</li><li>Kod tekshiruvchi va laboratoriyalar</li><li>Progress va sertifikat</li><li>Challenge va musobaqalar</li></ul><button type="button" onClick={() => startCheckout('pro')} disabled={busyPlan === 'pro'}>{busyPlan === 'pro' ? 'To‘lov ochilmoqda…' : 'Stripe orqali ulanish'}</button></article><article><span>Shaxsiy yordam</span><h2>Mentor</h2><ul><li>Pro imkoniyatlarining barchasi</li><li>Mentor tekshiruvi</li><li>Shaxsiy rivojlanish rejasi</li></ul><button type="button" onClick={() => startCheckout('mentor')} disabled={busyPlan === 'mentor'}>{busyPlan === 'mentor' ? 'To‘lov ochilmoqda…' : 'Mentor tarifini tanlash'}</button></article></div>
    </main>
  );
}

function ProfileView({ user, xp, completed, onAuth, onLogout }) {
  if (!user) {
    return <main className="platform-main simple-view profile-view"><span className="eyebrow">HackPro Account</span><h1>Shaxsiy kabinet</h1><p>Progress va natijalaringizni bazada saqlash uchun tizimga kiring.</p><button className="primary-action inline-action" type="button" onClick={onAuth}>Kirish yoki akkaunt yaratish</button></main>;
  }
  const achievements = [
    { title: 'Birinchi qadam', unlocked: completed.length > 0 },
    { title: 'Bilim izlovchi', unlocked: completed.length >= 3 },
    { title: 'Challenge ustasi', unlocked: false },
    { title: 'Faol o‘quvchi', unlocked: xp >= 500 },
  ];
  return (
    <main className="platform-main simple-view profile-view">
      <section className="profile-hero"><span className="profile-avatar">{user.displayName[0].toUpperCase()}</span><div><span className="eyebrow">HackPro · {user.plan.toUpperCase()}</span><h1>{user.displayName}</h1><p>{user.email}</p></div><strong>{xp} XP</strong></section>
      <div className="profile-stats"><article><span>Yakunlangan darslar</span><strong>{completed.length}</strong></article><article><span>Faol seriya</span><strong>1 kun</strong></article><article><span>Reyting</span><strong>#4</strong></article></div>
      <section className="achievement-grid"><h2>Yutuqlar</h2><div>{achievements.map((item) => <article className={item.unlocked ? 'is-unlocked' : ''} key={item.title}><SparkIcon /><strong>{item.title}</strong><small>{item.unlocked ? 'Ochildi' : 'Qulflangan'}</small></article>)}</div></section>
      <button className="secondary-action inline-action" type="button" onClick={onLogout}>Akkauntdan chiqish</button>
    </main>
  );
}

function LeaderboardView({ xp }) {
  const rows = leaderboard.map((row) => row.current ? { ...row, xp } : row).sort((a, b) => b.xp - a.xp);
  return (
    <main className="platform-main simple-view">
      <span className="eyebrow">Hamjamiyat</span><h1>O‘quvchilar reytingi</h1>
      <p>XP to‘plang, faol seriyani saqlang va yuqoriga ko‘tariling.</p>
      <div className="leaderboard-card">
        {rows.map((row, index) => (
          <div className={row.current ? 'is-current' : ''} key={row.name}>
            <span className="rank">{index + 1}</span><span className="avatar">{row.name.slice(0, 1)}</span><strong>{row.name}</strong><small>{row.streak} kunlik seriya</small><b>{row.xp} XP</b>
          </div>
        ))}
      </div>
    </main>
  );
}

function CertificatesView({ completed }) {
  return (
    <main className="platform-main simple-view">
      <span className="eyebrow">Natijalar</span><h1>Sertifikatlar</h1>
      <p>Har bir o‘quv yo‘lini to‘liq yakunlaganingizdan keyin sertifikat ochiladi.</p>
      <div className="certificate-grid">
        {platformPaths.map((path) => {
          const lessons = flattenLessons(path);
          const done = lessons.filter((lesson) => completed.includes(lesson.id)).length;
          const unlocked = done === lessons.length;
          return <article className={unlocked ? 'is-unlocked' : ''} key={path.id}><CertificateIcon /><span>{path.category}</span><h2>{path.title}</h2><p>{done}/{lessons.length} dars</p><strong>{unlocked ? 'Sertifikat tayyor' : 'Hali qulflangan'}</strong></article>;
        })}
      </div>
    </main>
  );
}

function LabDrawer({ user, template, onAuth, onAccountRefresh, onClose }) {
  const [lab, setLab] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const startLab = async () => {
    if (!user) {
      onAuth();
      return;
    }
    setBusy(true);
    setError('');
    try {
      let payload = await platformApi.startLab(template.id);
      setLab(payload.lab);
      for (let attempt = 0; attempt < 40 && ['pending', 'starting'].includes(payload.lab.status); attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        payload = await platformApi.lab(payload.lab.id);
        setLab(payload.lab);
      }
      if (payload.lab.status === 'error') setError(payload.lab.error || 'Laboratoriya ishga tushmadi.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const stopLab = async () => {
    if (lab?.id) {
      try { await platformApi.stopLab(lab.id); } catch {}
    }
    onAccountRefresh();
    onClose();
  };

  return (
    <div className="lab-overlay" role="presentation" onMouseDown={onClose}>
      <aside className="lab-drawer" role="dialog" aria-modal="true" aria-label="Amaliy laboratoriya" onMouseDown={(event) => event.stopPropagation()}>
        <button className="lab-close" type="button" onClick={onClose} aria-label="Yopish">×</button>
        <span className="eyebrow">{template.category} · Isolated Safe Lab</span><h2>{template.title}</h2>
        <p>{template.description} Server har bir o‘quvchi uchun alohida konteyner yaratadi va 30 daqiqadan keyin avtomatik yopadi.</p>
        <div className="lab-security-list"><span>✓ Tarmoq: ichki va internetdan uzilgan</span><span>✓ Fayl tizimi: faqat o‘qish</span><span>✓ CPU, xotira va jarayon limiti</span><span>✓ Root huquqi va Linux capability’lari o‘chirilgan</span></div>
        {lab && <div className={`lab-runtime is-${lab.status}`}><strong>{lab.status === 'running' ? '● Laboratoriya tayyor' : lab.status === 'error' ? 'Laboratoriya xatosi' : 'Konteyner tayyorlanmoqda…'}</strong><small>{lab.expiresAt ? `Yopilish vaqti: ${new Date(lab.expiresAt).toLocaleTimeString('uz-UZ')}` : ''}</small></div>}
        {error && <div className="form-error" role="alert">{error}</div>}
        {lab?.status === 'running' ? <><a className="primary-action lab-open-link" href={lab.url} target="_blank" rel="noreferrer">Laboratoriyani ochish ↗</a><button className="secondary-action" type="button" onClick={stopLab}>Laboratoriyani yopish</button></> : <button className="primary-action" type="button" onClick={startLab} disabled={busy}>{busy ? 'Izolyatsiyalangan muhit tayyorlanmoqda…' : user ? 'Laboratoriyani ishga tushirish' : 'Kirish va laboratoriyani boshlash'}</button>}
      </aside>
    </div>
  );
}

export default function PlatformApp() {
  const [route, setRoute] = useState(readRoute);
  const [completed, setCompleted] = useState(getStoredProgress);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [labTemplate, setLabTemplate] = useState(DEFAULT_LAB_TEMPLATE);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [notice, setNotice] = useState('');

  const path = useMemo(
    () => platformPaths.find((item) => item.id === route.pathId) || platformPaths[0],
    [route.pathId],
  );
  const lesson = useMemo(() => {
    const lessons = flattenLessons(path);
    return lessons.find((item) => item.id === route.lessonId) || lessons[0];
  }, [path, route.lessonId]);
  const calculatedXp = useMemo(() => {
    return platformPaths
      .flatMap(flattenLessons)
      .filter((item) => completed.includes(item.id))
      .reduce((sum, item) => sum + item.xp, 0);
  }, [completed]);
  const xp = user?.xp ?? calculatedXp;

  const loadAccountData = async (account) => {
    const remote = await platformApi.progress();
    const local = getStoredProgress();
    const missing = local.filter((lessonId) => !remote.lessonIds.includes(lessonId));
    let latest = remote;
    for (const lessonId of missing) latest = await platformApi.setLesson(lessonId, true);
    setCompleted(latest.lessonIds);
    const me = await platformApi.me();
    setUser(me.user || account);
    if (missing.length) localStorage.removeItem(STORAGE_KEY);
  };

  const refreshAccount = async () => {
    try {
      const [me, progress] = await Promise.all([platformApi.me(), platformApi.progress()]);
      setUser(me.user);
      setCompleted(progress.lessonIds);
    } catch {}
  };

  useEffect(() => {
    const handleHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleHash);
    document.body.classList.add('platform-active');
    document.title = 'HackPro Platform — O‘quv kabineti';
    return () => {
      window.removeEventListener('hashchange', handleHash);
      document.body.classList.remove('platform-active');
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    platformApi.me()
      .then(async (payload) => {
        if (cancelled) return;
        setBackendStatus('online');
        setUser(payload.user);
        if (payload.user) await loadAccountData(payload.user);
      })
      .catch(() => {
        if (!cancelled) setBackendStatus('offline');
      });
    return () => { cancelled = true; };
  }, []);

  const handleAuthenticated = async (account) => {
    setUser(account);
    setBackendStatus('online');
    try {
      await loadAccountData(account);
      setNotice('Akkaunt ulandi. Progress bazada saqlanadi.');
    } catch (error) {
      setNotice(error.message);
    }
  };

  const handleLogout = async () => {
    try { await platformApi.logout(); } catch {}
    setUser(null);
    setCompleted([]);
    goTo('dashboard');
  };

  const toggleLesson = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    try {
      const payload = await platformApi.setLesson(lesson.id, !completed.includes(lesson.id));
      setCompleted(payload.lessonIds);
      setUser(payload.user);
      setNotice(payload.lessonIds.includes(lesson.id) ? 'Dars progressga saqlandi.' : 'Dars progressdan olib tashlandi.');
    } catch (error) {
      setNotice(error.message);
    }
  };

  const closeMobileNav = () => setMobileOpen(false);
  const isLesson = route.view === 'lesson';
  const openLab = (template = DEFAULT_LAB_TEMPLATE) => {
    setLabTemplate(template);
    setLabOpen(true);
  };

  return (
    <div className="platform-shell">
      <Header route={route} xp={xp} user={user} backendStatus={backendStatus} onAuth={() => setAuthOpen(true)} onMenuToggle={() => setMobileOpen((value) => !value)} />
      <div className="platform-body">
        {isLesson ? (
          <LessonOutline path={path} currentLesson={lesson} completed={completed} mobileOpen={mobileOpen} onNavigate={closeMobileNav} />
        ) : (
          <Sidebar route={route} mobileOpen={mobileOpen} onNavigate={closeMobileNav} />
        )}
        {mobileOpen && <button className="sidebar-scrim" type="button" aria-label="Menyuni yopish" onClick={closeMobileNav} />}

        {route.view === 'path' && <PathView path={path} completed={completed} />}
        {route.view === 'lesson' && <LessonArticle lesson={lesson} isComplete={completed.includes(lesson.id)} onComplete={toggleLesson} onLab={() => openLab()} />}
        {route.view === 'challenges' && <ChallengesView user={user} onAuth={() => setAuthOpen(true)} onAccountRefresh={refreshAccount} />}
        {route.view === 'labs' && <LabsView onOpenLab={openLab} />}
        {route.view === 'contests' && <ContestsView />}
        {route.view === 'writeups' && <WriteupsView articleId={route.pathId} />}
        {route.view === 'legion' && <LegionView />}
        {route.view === 'seasons' && <SeasonsView xp={xp} />}
        {route.view === 'leaderboard' && <LeaderboardView xp={xp} />}
        {route.view === 'community' && <CommunityView />}
        {route.view === 'studio' && <StudioView user={user} onAuth={() => setAuthOpen(true)} />}
        {route.view === 'certificates' && <CertificatesView completed={completed} />}
        {route.view === 'premium' && <PremiumView user={user} onAuth={() => setAuthOpen(true)} />}
        {route.view === 'profile' && <ProfileView user={user} xp={xp} completed={completed} onAuth={() => setAuthOpen(true)} onLogout={handleLogout} />}
        {!['path', 'lesson', 'challenges', 'labs', 'contests', 'writeups', 'legion', 'seasons', 'leaderboard', 'community', 'studio', 'certificates', 'premium', 'profile'].includes(route.view) && <Dashboard completed={completed} />}
      </div>
      {isLesson && <button className="floating-lab" type="button" onClick={() => openLab()}>▣ Lab</button>}
      {labOpen && <LabDrawer user={user} template={labTemplate} onAuth={() => setAuthOpen(true)} onAccountRefresh={refreshAccount} onClose={() => setLabOpen(false)} />}
      {authOpen && <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={handleAuthenticated} />}
      {notice && <button className="platform-toast" type="button" onClick={() => setNotice('')}>{notice}<span>×</span></button>}
    </div>
  );
}
