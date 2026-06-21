create extension if not exists pgcrypto;

create table if not exists public.lms_users (
  id uuid primary key default gen_random_uuid(),
  login text not null unique,
  full_name text not null default '',
  role text not null default 'student' check (role in ('student', 'admin')),
  password_salt text not null,
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lms_courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  level text not null default '',
  cover_url text not null default '',
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lms_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.lms_courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  video_url text not null default '',
  body text not null default '',
  resources_url text not null default '',
  duration_minutes integer not null default 0,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lms_progress (
  user_id uuid not null references public.lms_users(id) on delete cascade,
  lesson_id uuid not null references public.lms_lessons(id) on delete cascade,
  status text not null default 'started' check (status in ('started', 'completed')),
  completed_at timestamptz,
  last_opened_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index if not exists lms_lessons_course_sort_idx on public.lms_lessons(course_id, sort_order);
create index if not exists lms_courses_sort_idx on public.lms_courses(sort_order);

alter table public.lms_users enable row level security;
alter table public.lms_courses enable row level security;
alter table public.lms_lessons enable row level security;
alter table public.lms_progress enable row level security;
