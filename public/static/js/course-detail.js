const courseData = {
    'kiberxavfsizlik': {
        title: 'Kiberxavfsizlik',
        image: '/static/img/course-cybersecurity.png',
        description: "Tarmoq, qurilma va akkauntlarni himoya qilish asoslarini amaliy mashg'ulotlar orqali o'rganasiz. Kurs real hayotdagi xavfsizlik muammolarini tushunish va ularga to'g'ri yechim berishga yo'naltirilgan.",
        lessons: '156 dars',
        duration: '312 soat',
        price: "Oyiga 500 000 so'm",
        students: "120 o'quvchi",
        topics: [
            'Internet xavfsizligi, parol va akkaunt himoyasi',
            'Tarmoq xavfsizligi va oddiy himoya sozlamalari',
            'Zaifliklarni aniqlash va xavfsiz tekshiruv usullari',
            'Phishing, zararli havolalar va ijtimoiy muhandislikdan himoyalanish',
            'Amaliy laboratoriya va mini loyiha'
        ]
    },
    'suniy-intellekt': {
        title: "Sun'iy intellekt",
        image: '/static/img/course-ai.png',
        description: "AI vositalaridan to'g'ri foydalanish, prompt yozish va ish jarayonlarini avtomatlashtirishni o'rganasiz. Kurs ijodiy, biznes va texnik vazifalarda sun'iy intellektdan foydali foydalanishga qaratilgan.",
        lessons: '75 dars',
        duration: '150 soat',
        price: "Oyiga 200 000 so'm",
        students: "95 o'quvchi",
        topics: [
            "AI nima va undan kundalik ishda qanday foydalaniladi",
            "Prompt yozish, natijani tahlil qilish va yaxshilash",
            "Matn, rasm va kontent yaratish jarayonlari",
            "Oddiy avtomatlashtirish va yordamchi vositalar",
            "AI bilan yakuniy amaliy loyiha"
        ]
    },
    'robototexnika': {
        title: 'Robototexnika',
        image: '/static/img/course-robotics.png',
        description: "Robot qurilmalarini yig'ish, sensor va motorlar bilan ishlash hamda mikrokontroller orqali boshqarishni amalda o'rganasiz. Kurs texnik tafakkur va loyiha qilish ko'nikmasini rivojlantiradi.",
        lessons: '75 dars',
        duration: '150 soat',
        price: "Oyiga 150 000 so'm",
        students: "68 o'quvchi",
        topics: [
            'Robototexnika asoslari va qurilma qismlari',
            'Sensorlar, motorlar va boshqaruv modullari',
            'Mikrokontroller bilan oddiy dasturlash',
            'Robot harakati va avtomatik boshqaruv',
            "Yakuniy robot loyiha yig'ish"
        ]
    },
    'dasturlash': {
        title: 'Dasturlash',
        image: '/static/img/course-programming.png',
        description: "Web dasturlash asoslari, algoritmik fikrlash va real loyiha yaratish bosqichlarini o'rganasiz. Kurs boshlang'ichdan amaliy natijaga chiqish uchun tuzilgan.",
        lessons: '132 dars',
        duration: '264 soat',
        price: "Oyiga 200 000 so'm",
        students: "82 o'quvchi",
        topics: [
            'HTML, CSS va JavaScript asoslari',
            'Interaktiv sahifalar va responsiv dizayn',
            'Algoritmik fikrlash va kod tuzilmasi',
            'Backend bilan ishlashga kirish',
            'Portfolio uchun web loyiha'
        ]
    },
    'mobilografiya': {
        title: 'Mobilografiya',
        image: '/static/img/course-mobilography.png',
        description: "Smartfon orqali sifatli video olish, kadr tanlash, yoritish, montaj va kontent tayyorlashni o'rganasiz. Kurs ijtimoiy tarmoqlar uchun kuchli vizual kontent yaratishga yordam beradi.",
        lessons: '36 dars',
        duration: '72 soat',
        price: "Oyiga 150 000 so'm",
        students: "110 o'quvchi",
        topics: [
            'Telefon kamerasi sozlamalari va kompozitsiya',
            "Yoritish, rakurs va kadr bilan ishlash",
            "Video olish va ovoz sifatini yaxshilash",
            "Mobil montaj, rang va dinamika",
            "Reels, shorts va portfolio kontent tayyorlash"
        ]
    },
    'smm': {
        title: 'SMM',
        image: '/static/img/course-smm.png',
        description: "Brend sahifasini yuritish, kontent reja tuzish, auditoriyani tahlil qilish va reklama strategiyasini ishlab chiqishni o'rganasiz. Kurs real biznes sahifalari bilan ishlashga tayyorlaydi.",
        lessons: '36 dars',
        duration: '72 soat',
        price: "Oyiga 150 000 so'm",
        students: "55 o'quvchi",
        topics: [
            'SMM strategiya va auditoriya tahlili',
            "Kontent reja, rubrika va post g'oyalari",
            'Instagram va Telegram sahifalarini rivojlantirish',
            'Reklama matni, kreativ va natija tahlili',
            'Sahifa uchun amaliy SMM loyiha'
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('course') || 'kiberxavfsizlik';
    const course = courseData[key] || courseData.kiberxavfsizlik;

    document.title = `HackPro Academy - ${course.title}`;

    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseLessons').textContent = course.lessons;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('coursePrice').textContent = course.price;
    document.getElementById('courseStudents').textContent = course.students;

    const image = document.getElementById('courseImage');
    image.src = course.image;
    image.alt = `${course.title} kursi`;

    const topicList = document.getElementById('courseTopics');
    topicList.innerHTML = '';
    course.topics.forEach(topic => {
        const item = document.createElement('li');
        item.textContent = topic;
        topicList.appendChild(item);
    });
});
