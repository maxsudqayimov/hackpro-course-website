# HackPro Telegram Bot

Bu bot HackPro o'quv markazi uchun:

- kurslar haqida ma'lumot beradi;
- sayt haqida qisqa ma'lumot beradi;
- darsliklar uchun bot ichida sahifalar ko'rsatadi;
- zamonaviy tizimlar bo'limini ko'rsatadi;
- o'quvchilarni ro'yxatdan o'tkazadi;
- admin uchun savollarni qabul qiladi;
- telefon raqamni Telegram contact orqali qabul qiladi;
- arizalarni `bot/data/leads.json` fayliga saqlaydi;
- savollarni `bot/data/inquiries.json` fayliga saqlaydi;
- oxirgi Telegram update offsetini `bot/data/state.json` fayliga saqlaydi;
- admin chatga yangi ariza yuboradi;
- admin uchun `/leads` va `/stats` buyruqlarini beradi.

## Ishga tushirish

1. BotFather orqali bot yarating va token oling.
2. Loyiha ildizida `.env` fayl yarating:

```env
TELEGRAM_BOT_TOKEN=123456789:replace-with-your-token
ADMIN_CHAT_ID=123456789
MINI_APP_URL=https://hackpro.uz/miniapp
```

3. Botni supervisor bilan ishga tushiring:

```bash
npm run bot
```

Supervisor bot crash bo'lsa uni avtomatik qayta ishga tushiradi.

Development rejimida avtomatik qayta ishga tushirish:

```bash
npm run bot:dev
```

## Foydali buyruqlar

- `/start` - asosiy menyu
- `/courses` - kurslar
- `/lessons` - darslik sahifalari
- `/site` - sayt haqida
- `/systems` - zamonaviy tizimlar
- `/register` - ro'yxatdan o'tish
- `/ask` - adminga savol yuborish
- `/contact` - kontaktlar
- `/id` - chat ID ni ko'rish
- `/leads` - oxirgi 10 ta ariza, faqat admin
- `/stats` - arizalar statistikasi, faqat admin
- `/app` - HackPro Mini App oynasini ochish

## Eslatma

`ADMIN_CHAT_ID` ni bilish uchun botni token bilan ishga tushiring, Telegramda botga `/id`
yuboring va chiqqan raqamni `.env` faylidagi `ADMIN_CHAT_ID` ga yozing. Bir nechta admin kerak
bo'lsa, IDlarni vergul bilan yozish mumkin:

```env
ADMIN_CHAT_ID=123456789,987654321
```
