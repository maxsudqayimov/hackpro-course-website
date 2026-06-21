# Kompyuterni qayta o'rnatishdan keyin loyihani tiklash

## Qayta o'rnatishdan oldin

1. GitHub repository private ekanini tekshiring:
   `https://github.com/maxsudqayimov/hackpro-course-website/settings`
2. GitHub hisobining login va ikki bosqichli tasdiqlash recovery kodlarini xavfsiz joyda saqlang.
3. `.env` faylini GitHub'ga yuklamang. Uni parol menejeri yoki tashqi diskka saqlang.
4. Vercel va Supabase hisoblariga kirish ma'lumotlarini tekshiring.
5. Supabase Dashboard ichidan database backup oling.

Loyihada `.env` Git'dan chiqarib tashlangan. Uning ichida quyidagi maxfiy qiymatlar bo'lishi mumkin:

```text
TELEGRAM_BOT_TOKEN
ADMIN_CHAT_ID
SUPABASE_SERVICE_ROLE_KEY
LMS_SESSION_SECRET
LMS_BOOTSTRAP_SECRET
```

## Yangi Windows'da o'rnatish

Quyidagilarni o'rnating:

- Git: `https://git-scm.com/download/win`
- Node.js LTS: `https://nodejs.org/`
- Codex desktop ilovasi

## Loyihani qayta yuklash

PowerShell yoki Terminal'da:

```powershell
cd "$HOME\Documents"
git clone https://github.com/maxsudqayimov/hackpro-course-website.git "New project"
cd "New project"
npm.cmd ci
```

Saqlangan maxfiy `.env` faylini loyiha ildiziga qaytaring. Agar u yo'q bo'lsa:

```powershell
Copy-Item .env.example .env
```

So'ng `.env` ichidagi namunaviy qiymatlarni haqiqiy token va kalitlar bilan almashtiring.

## Tekshirish va ishga tushirish

```powershell
npm.cmd run build
npm.cmd run dev
```

Telegram bot uchun boshqa terminalda:

```powershell
npm.cmd run bot
```

Saytni Codex orqali o'zgartirish uchun Codex'da `New project` papkasini ochib, kerakli vazifani yozing. O'zgarishlardan keyin commit va GitHub'ga push qilishni ham Codex'dan so'rash mumkin.

## Xavfsizlik

- `.env`, bot tokeni va Supabase service role key'ni chatga yoki GitHub'ga joylamang.
- Token oshkor bo'lsa, Telegram BotFather orqali tokenni darhol yangilang.
- Eski kompyuterni tozalashdan oldin GitHub'dagi oxirgi commit va tashqi `.env` nusxasi mavjudligini tekshiring.
