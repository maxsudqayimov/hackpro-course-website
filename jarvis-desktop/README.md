# Jarvis Desktop

Murod uchun shaxsiy ovozli yordamchi. Dastur mikrofon orqali buyruq eshitadi, ovoz bilan javob beradi, oddiy kompyuter amallarini bajaradi va OpenAI API kaliti qo'yilsa odamdek suhbat qiladi.

## Nimalar qila oladi

- "Jarvis" wake word bilan buyruq qabul qiladi
- `jarvis` va `jervis` talaffuzlarini tushunadi
- Temir odamdagi J.A.R.V.I.S. HUD uslubidagi vizual effektlar bilan ochiladi
- Videodagidek cockpit tuzilmasi: Murod paneli, J.A.R.V.I.S markazi va AI status paneli
- Robot yuzi, ko'z harakati, blink va gapirganda lab animatsiyasi bor
- Listening, processing va responding holatlari alohida rang/animatsiya bilan ko'rinadi
- `uz-UZ-SardorNeural` orqali ravonroq o'zbekcha ovozli javob beradi
- Notepad, Calculator, Browser kabi dasturlarni ochadi
- Google/YouTube/Wikipedia qidiruvlarini ochadi
- Vaqt, sana, tizim ma'lumotini aytadi
- Qisqa eslatmalarni saqlaydi va o'qib beradi
- OpenAI API kaliti bo'lsa, oddiy savollarga AI javob beradi
- Murodni egasi sifatida biladi va qisqa suhbat tarixini eslab turadi

## O'rnatish

PowerShell oynasida:

```powershell
cd "C:\Users\mura0\Documents\New project\jarvis-desktop"
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1
```

Yoki `install.bat` faylini ikki marta bosing.

Keyin `.env.example` faylini `.env` qilib nusxalang va kerak bo'lsa `OPENAI_API_KEY` ni yozing.

```powershell
Copy-Item .env.example .env
notepad .env
```

Men `.env` faylini yaratib qo'ydim. Odamdek suhbat uchun faqat shu qatorga API key yoziladi:

```env
OPENAI_API_KEY=sk-...
```

## Ishga tushirish

```powershell
cd "C:\Users\mura0\Documents\New project\jarvis-desktop"
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\run.ps1
```

Yoki `run.bat` faylini ikki marta bosing.

## Docker + Grafana monitoring

Jarvis desktop ilovasi Windows host'da ishlaydi, Grafana va Prometheus esa Docker'da ishlaydi.

1. Docker Desktop'ni oching.
2. Jarvis'ni ishga tushiring:

```powershell
cd "C:\Users\mura0\Documents\New project\jarvis-desktop"
.\run.bat
```

3. Monitoringni ishga tushiring:

```powershell
cd "C:\Users\mura0\Documents\New project\jarvis-desktop"
.\monitoring-up.bat
```

Grafana: `http://localhost:3001`

Login: `admin`

Parol: `jarvis`

Prometheus: `http://localhost:9090`

Jarvis metrics: `http://127.0.0.1:8765/metrics`

To'xtatish:

```powershell
.\monitoring-down.bat
```

## Namuna buyruqlar

- `Jarvis, buyruqlar`
- `Jarvis, sen kimsan`
- `Jarvis, salom`
- `Jarvis, qalesan`
- `Jarvis, nima qila olasan`
- `Jarvis, soat nechchi`
- `Soat nechchi`
- `Jarvis, bugun sana`
- `Jarvis, notepad och`
- `Jarvis, calculator och`
- `Jarvis, paint och`
- `Jarvis, terminal och`
- `Jarvis, explorer och`
- `Jarvis, youtube och`
- `Jarvis, google qidir Python darslari`
- `Jarvis, youtube qidir sun'iy intellekt`
- `Jarvis, eslatma bugun loyiha bilan ishlash`
- `Jarvis, eslatmalarni o'qib ber`
- `Jarvis, tizim ma'lumoti`
- `Jarvis, skrinshot ol`

## Eslatma

Mikrofon uchun `SpeechRecognition` va `PyAudio` kerak. `install.ps1` ularni o'rnatishga harakat qiladi. Agar PyAudio o'rnatishda xato bersa, Windows uchun wheel paket kerak bo'lishi mumkin; dastur baribir text input rejimida ochiladi.

O'zbekcha ovoz uchun `edge-tts` ishlatiladi. Internet bo'lmasa Jarvis Windows'ning standart ovoziga qaytadi, u o'zbekchani ravon o'qimasligi mumkin.
