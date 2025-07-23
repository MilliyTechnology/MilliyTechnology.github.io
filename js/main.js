document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("language-select");

  // Asynchronously fetch and apply translations
  async function setLanguage(lang) {
    try {
      // FIXED: Added a leading slash to the fetch paths
      const [commonRes, landingRes] = await Promise.all([
        fetch(`/i18n/${lang}/common.json`),
        fetch(`/i18n/${lang}/landing.json`),
      ]);

      if (!commonRes.ok || !landingRes.ok) {
        throw new Error(`Could not load language files for ${lang}`);
      }

      const common = await commonRes.json();
      const landing = await landingRes.json();
      const translations = { ...common, ...landing };

      // Apply translations
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (translations[key]) {
          el.innerHTML = translations[key];
        }
      });

      document.documentElement.lang = lang;
      localStorage.setItem("language", lang);
      languageSelect.value = lang;
    } catch (error) {
      console.error("Failed to set language:", error);
      if (lang !== "en") setLanguage("en"); // Fallback
    }
  }

  // Event listener
  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  // Scroll Animation Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  // Initial load
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
