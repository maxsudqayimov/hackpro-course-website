# HackPro LMS setup

Platforma sahifalari:

- `/platform` - o'quvchi kabineti
- `/admin` - admin panel
- `/api/lms` - login, kurslar, darslar va progress API

## 1. Supabase database

Supabase project yarating va SQL editor ichida `supabase/lms-schema.sql` faylini ishga tushiring.

## 2. Vercel environment variables

Vercel Project Settings -> Environment Variables ichiga qo'shing:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
LMS_SESSION_SECRET=long-random-secret
LMS_BOOTSTRAP_SECRET=one-time-admin-setup-secret
```

`SUPABASE_SERVICE_ROLE_KEY` faqat serverda ishlatiladi. Uni brauzerga yoki o'quvchilarga bermang.

## 3. Birinchi admin yaratish

Deploydan keyin birinchi adminni API orqali yarating:

```bash
curl -X POST "https://www.hackpro.uz/api/lms?action=bootstrap-admin" \
  -H "Content-Type: application/json" \
  -d "{\"secret\":\"LMS_BOOTSTRAP_SECRET qiymati\",\"login\":\"admin\",\"password\":\"kuchli-parol\",\"full_name\":\"HackPro Admin\"}"
```

Birinchi admin yaratilgandan keyin shu endpoint boshqa admin yaratmaydi. Keyingi o'quvchi va adminlarni `/admin` paneldan qo'shasiz.

## 4. Kontent qo'shish

1. `/admin` sahifasiga login qiling.
2. Kurs yarating.
3. Kurs ichiga dars qo'shing.
4. Dars uchun video URL, matn va qo'shimcha material URL kiriting.
5. O'quvchi login-parolini yarating.

Video uchun YouTube unlisted, Vimeo yoki Bunny Stream ishlatish tavsiya qilinadi. Videoni Vercel yoki GitHubga yuklamang.
