document.addEventListener("DOMContentLoaded", function () {
  const translations = {
    en: {
      pageTitle: "MilliyTechnology - Speak English Naturally with AI",
      contactUs: "Contact Us",
      heroTitle: "Speak English Naturally. <br>Powered by AI.",
      heroSubtitle:
        "Your personal AI tutor for real-time conversation practice, instant feedback, and smart vocabulary training—all on your device.",
      appStore: "Download on the App Store",
      playStore: "Get it on Google Play",
      featuresTitle: "The Future of Language Learning is Here",
      feature1Title: "Talk with AI, Not Just at It",
      feature1Desc:
        "Engage in fluid, real-time conversations. Our on-device AI understands you instantly, providing a natural practice partner 24/7.",
      feature2Title: "Instant, Personalized Feedback",
      feature2Desc:
        "Receive immediate, actionable feedback on your pronunciation and grammar, powered by advanced LLMs, to correct mistakes on the spot.",
      feature3Title: "Learn Anywhere, Anytime",
      feature3Desc:
        "With a 100% offline-first architecture, your AI tutor is always available, whether you're on a plane, subway, or in a remote area.",
      feature4Title: "Vocabulary That Sticks",
      feature4Desc:
        "Our smart, Anki-style spaced repetition system ensures that you remember the words you learn, building a strong and lasting vocabulary.",
      foundersTitle: "Meet the Minds Behind the Mission",
      founder1Title: "Founder & CTO",
      founder1Quote:
        "\"We're not just building an app; we're building a new way to learn. By putting a powerful AI tutor in everyone's pocket, we can break down the barriers to true language fluency.\"",
      founder2Name: "Ilhom Toshpolatov",
      founder2Title: "Founder & CEO",
      founder2Quote:
        "\"As an ESL teacher, I've seen countless students master grammar but freeze during their speaking exams. The real key to a high score isn't just knowing English; it's building the muscle memory for conversation under pressure. MilliyTechnology is the training ground for that. We provide unlimited, realistic test simulations to build the confidence and fluency needed to succeed when it matters most.\"",
      footerTitle: "Ready to Begin Your Fluent Future?",
      appStoreFooter: "Download on the App Store",
      playStoreFooter: "Get it on Google Play",
      stir: "Tax ID (STIR):",
      footerAddress: "Rishton district, Fergana region, 151304, Uzbekistan",
      footerRights: '© 2025 "MILLIY TECHNOLOGY" MCHJ. All rights reserved.',
    },
    ru: {
      pageTitle: "MilliyTechnology - Говорите по-английски естественно с ИИ",
      contactUs: "Связаться с нами",
      heroTitle: "Говорите по-английски естественно. <br>С помощью ИИ.",
      heroSubtitle:
        "Ваш личный ИИ-репетитор для разговорной практики в реальном времени, мгновенной обратной связи и умного изучения слов — всё на вашем устройстве.",
      appStore: "Загрузите в App Store",
      playStore: "Доступно в Google Play",
      featuresTitle: "Будущее изучения языков уже здесь",
      feature1Title: "Говорите с ИИ, а не просто ему",
      feature1Desc:
        "Вступайте в свободные диалоги в реальном времени. Наш ИИ на устройстве понимает вас мгновенно, становясь вашим естественным партнером для практики 24/7.",
      feature2Title: "Мгновенная, персональная обратная связь",
      feature2Desc:
        "Получайте немедленную, полезную обратную связь по произношению и грамматике от передовых LLM, чтобы исправлять ошибки на лету.",
      feature3Title: "Учитесь где угодно, когда угодно",
      feature3Desc:
        "Благодаря 100% офлайн-архитектуре ваш ИИ-репетитор всегда доступен, будь вы в самолете, метро или удаленной местности.",
      feature4Title: "Словарный запас, который останется с вами",
      feature4Desc:
        "Наша умная система интервального повторения в стиле Anki гарантирует, что вы запомните выученные слова, создавая прочный словарный запас.",
      foundersTitle: "Познакомьтесь с создателями миссии",
      founder1Title: "Основатель и CTO",
      founder1Quote:
        '"Мы не просто создаем приложение; мы создаем новый способ учиться. Поместив мощного ИИ-репетитора в карман каждого, мы можем разрушить барьеры на пути к настоящей языковой беглости."',
      founder2Name: "Илхом Тошпулатов",
      founder2Title: "Основатель и CEO",
      founder2Quote:
        "\"Как преподаватель ESL, я видел бесчисленное множество студентов, которые в совершенстве владеют грамматикой, но замирают на устных экзаменах. Настоящий ключ к высокому баллу — это не просто знание английского, а развитие 'мышечной памяти' для разговора в условиях стресса. MilliyTechnology — это тренировочная площадка для этого. Мы предоставляем неограниченные, реалистичные симуляции тестов, чтобы развить уверенность и беглость, необходимые для успеха, когда это важнее всего.\"",
      footerTitle: "Готовы начать свое свободное будущее?",
      appStoreFooter: "Загрузите в App Store",
      playStoreFooter: "Доступно в Google Play",
      stir: "ИНН (STIR):",
      footerAddress: "Риштанский район, Ферганская область, 151304, Узбекистан",
      footerRights: '© 2025 "MILLIY TECHNOLOGY" MCHJ. Все права защищены.',
    },
    uz: {
      pageTitle: "MilliyTechnology - AI yordamida ingliz tilida tabiiy so'zlashing",
      contactUs: "Bog'lanish",
      heroTitle: "Ingliz tilida tabiiy so'zlashing. <br>AI yordamida.",
      heroSubtitle:
        "Haqiqiy vaqtda suhbat amaliyoti, tezkor fikr-mulohazalar va aqlli lug'at o'rganish uchun shaxsiy AI repetitoringiz — barchasi qurilmangizda.",
      appStore: "App Store'da yuklab oling",
      playStore: "Google Play'da oling",
      featuresTitle: "Til o'rganish kelajagi shu yerda",
      feature1Title: "AI bilan suhbatlashing, nafaqat unga gapiring",
      feature1Desc:
        "Erkin, real vaqtda suhbatlashing. Qurilmamizdagi AI sizni darhol tushunadi va 24/7 tabiiy amaliyot sherigi bo'ladi.",
      feature2Title: "Tezkor, shaxsiy fikr-mulohaza",
      feature2Desc:
        "Xatolarni joyida tuzatish uchun ilg'or LLM'lar yordamida talaffuzingiz va grammatikangiz bo'yicha darhol, amaliy fikr-mulohazalarni oling.",
      feature3Title: "Istalgan joyda, istalgan vaqtda o'rganing",
      feature3Desc:
        "100% oflayn arxitektura tufayli sizning AI repetitoringiz samolyotda, metroda yoki chekka hududda bo'lsangiz ham doimo mavjud.",
      feature4Title: "Xotirada qoladigan lug'at",
      feature4Desc:
        "Bizning aqlli, Anki uslubidagi interval takrorlash tizimimiz o'rgangan so'zlaringizni eslab qolishingizni ta'minlaydi va mustahkam lug'at boyligini yaratadi.",
      foundersTitle: "Missiya ortidagi insonlar bilan tanishing",
      founder1Title: "Asoschi va CTO",
      founder1Quote:
        "\"Biz shunchaki ilova yaratmayapmiz; biz o'rganishning yangi usulini yaratmoqdamiz. Har bir insonning cho'ntagiga kuchli AI repetitorini joylashtirib, biz haqiqiy til ravonligiga to'siqlarni olib tashlay olamiz.\"",
      founder2Name: "Ilhom Toshpo'latov",
      founder2Title: "Asoschi va Bosh direktor (CEO)",
      founder2Quote:
        "\"ESL o'qituvchisi sifatida men son-sanoqsiz talabalarning grammatikani mukammal o'zlashtirganini, ammo og'zaki imtihonlarda 'muzlab' qolishini ko'rganman. Yuqori ball olishning asl kaliti shunchaki ingliz tilini bilish emas; bu bosim ostida suhbatlashish uchun 'mushak xotirasini' shakllantirishdir. MilliyTechnology aynan shuning uchun mashg'ulot maydonidir. Biz eng muhim paytda muvaffaqiyatga erishish uchun zarur bo'lgan ishonch va ravonlikni shakllantirish uchun cheksiz, haqiqatga yaqin test simulyatsiyalarini taqdim etamiz.\"",
      footerTitle: "Ravon kelajagingizni boshlashga tayyormisiz?",
      appStoreFooter: "App Store'da yuklab oling",
      playStoreFooter: "Google Play'da oling",
      stir: "STIR:",
      footerAddress: "Farg'ona viloyati, Rishton tumani, 151304, O'zbekiston",
      footerRights: '© 2025 "MILLIY TECHNOLOGY" MCHJ. Barcha huquqlar himoyalangan.',
    },
  };

  const languageSelect = document.getElementById("language-select");

  function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);
  }

  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  const savedLang = localStorage.getItem("language") || "en";
  languageSelect.value = savedLang;
  setLanguage(savedLang);
});
