# HackPro iOS va Android app

Sayt hozir PWA app sifatida tayyorlandi:

- Android Chrome: sayt ochiladi -> browser menyu -> Install app
- iPhone Safari: sayt ochiladi -> Share -> Add to Home Screen
- App start sahifasi: `/platform`
- Offline holat: `/offline.html`

## App Store / Play Market uchun

Native paket kerak bo'lsa Capacitor ishlatiladi. Bu repo ichida `capacitor.config.json` tayyor.
Native projectlar:

- `android/` - Android Studio project
- `ios/` - Xcode project

Kerakli buyruqlar:

```bash
npm run build
npx cap sync
```

Android:

```bash
npx cap open android
```

Keyin Android Studio orqali `.aab` build qilinadi va Play Console'ga yuklanadi.
CLI orqali debug APK build qilish uchun Android SDK kerak:

```bash
android/gradlew.bat -p android assembleDebug
```

Agar `SDK location not found` chiqsa, Android Studio o'rnating yoki `android/local.properties` ichiga `sdk.dir=C:\\Users\\...\\AppData\\Local\\Android\\Sdk` yozing.

iOS:

```bash
npx cap open ios
```

iOS build faqat macOS + Xcode orqali qilinadi. Windows'da iPhone uchun `.ipa` build qilib bo'lmaydi.

## Muhim

Platforma loginlari va darslar ishlashi uchun avval LMS sozlanishi kerak:

1. Supabase project
2. `supabase/lms-schema.sql` SQL jadvali
3. Vercel env:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LMS_SESSION_SECRET`
   - `LMS_BOOTSTRAP_SECRET`
4. Birinchi admin yaratish

Shundan keyin mobil app o'quvchilarga login-parol bilan dars ko'rsatadi.
