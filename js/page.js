// js/page.js (With Improved Error Logging)
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header.header");
  const footer = document.querySelector("footer.footer-new");
  const pageId = document.querySelector("main > section").id;

  async function fetchJSON(path) {
    const response = await fetch(`/${path}`);
    if (!response.ok) throw new Error(`Cannot fetch ${path} - Status: ${response.status}`);

    // This structure helps pinpoint the exact file causing the JSON error
    try {
      return await response.json();
    } catch (error) {
      console.error(`Syntax error in JSON file: /${path}`);
      throw error; // Re-throw the original error to be caught by setLanguage
    }
  }

  async function setLanguage(lang) {
    try {
      const [common, pageData] = await Promise.all([
        fetchJSON(`i18n/${lang}/common.json`),
        fetchJSON(`i18n/${lang}/${pageId}.json`),
      ]);
      const translations = { ...common, ...pageData };

      buildHeader(translations);
      buildFooter(translations);

      if (pageId === "faq") {
        buildFaq(translations);
      } else if (pageId === "privacy") {
        buildPrivacy(translations);
      }

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (translations[key]) el.innerHTML = translations[key];
      });

      document.documentElement.lang = lang;
      localStorage.setItem("language", lang);
      document.getElementById("language-select").value = lang;
    } catch (error) {
      console.error("Failed to build page due to a file error:", error);
      if (lang !== "en") setLanguage("en");
    }
  }

  // --- buildHeader, buildFooter, buildFaq, buildPrivacy functions remain the same ---

  function buildHeader(t) {
    header.innerHTML = `
            <nav class="container">
                <a href="index.html" class="nav-logo">MilliyTechnology</a>
                <div class="nav-menu">
                    <div class="language-switcher">
                        <i class="fa-solid fa-globe"></i>
                        <select id="language-select">
                            <option value="en">English</option>
                            <option value="ru">Русский</option>
                            <option value="uz">O'zbekcha</option>
                        </select>
                    </div>
                    <a href="index.html#contact" class="nav-contact-button" data-i18n="contactUs">${
                      t.contactUs || ""
                    }</a>
                </div>
            </nav>`;
    document
      .getElementById("language-select")
      .addEventListener("change", (e) => setLanguage(e.target.value));
  }

  function buildFooter(t) {
    footer.innerHTML = `
            <div class="container">
                <div class="footer-bottom-section">
                    <div class="footer-legal">
                        <p class="footer-logo">MilliyTechnology</p>
                        <p data-i18n="footerAddress">${t.footerAddress || ""}</p>
                    </div>
                    <div class="footer-nav">
                        <a href="index.html#features" data-i18n="footerLinkFeatures">${
                          t.footerLinkFeatures || ""
                        }</a>
                        <a href="faq.html" data-i18n="footerLinkFaq">${t.footerLinkFaq || ""}</a>
                        <a href="privacy.html" data-i18n="footerLinkPrivacy">${
                          t.footerLinkPrivacy || ""
                        }</a>
                        <a href="index.html#contact" data-i18n="footerLinkContact">${
                          t.footerLinkContact || ""
                        }</a>
                    </div>
                    <div class="footer-copyright">
                        <p data-i18n="footerRights">${t.footerRights || ""}</p>
                    </div>
                </div>
            </div>`;
  }

  function buildFaq(t) {
    const container = document.querySelector(".faq-container");
    container.innerHTML = `
            <div class="faq-item">
                <div class="faq-question"><span>${
                  t.faq1q || ""
                }</span><i class="fa-solid fa-chevron-down"></i></div>
                <div class="faq-answer"><p>${t.faq1a || ""}</p></div>
            </div>
            <div class="faq-item">
                <div class="faq-question"><span>${
                  t.faq2q || ""
                }</span><i class="fa-solid fa-chevron-down"></i></div>
                <div class="faq-answer"><p>${t.faq2a || ""}</p></div>
            </div>
            <div class="faq-item">
                <div class="faq-question"><span>${
                  t.faq3q || ""
                }</span><i class="fa-solid fa-chevron-down"></i></div>
                <div class="faq-answer"><p>${t.faq3a || ""}</p></div>
            </div>
             <div class="faq-item">
                <div class="faq-question"><span>${
                  t.faq4q || ""
                }</span><i class="fa-solid fa-chevron-down"></i></div>
                <div class="faq-answer"><p>${t.faq4a || ""}</p></div>
            </div>
        `;
    container.querySelectorAll(".faq-question").forEach((q) => {
      q.addEventListener("click", () => {
        q.parentElement.classList.toggle("active");
      });
    });
  }

  function buildPrivacy(t) {
    const container = document.querySelector(".privacy-content");
    container.innerHTML = `
            <p class="last-updated">${t.privacy_last_updated || ""}</p>
            <h3>${t.privacy_s1_title || ""}</h3>
            <p><strong>${t.privacy_s1_subtitle1 || ""}</strong> ${t.privacy_s1_p1 || ""}</p>
            <p><strong>${t.privacy_s1_subtitle2 || ""}</strong> ${t.privacy_s1_p2 || ""}</p>
            <p><strong>${t.privacy_s1_subtitle3 || ""}</strong> ${t.privacy_s1_p3 || ""}</p>
            <h3>${t.privacy_s2_title || ""}</h3>
            <p>${t.privacy_s2_p1 || ""}</p>
            <p><strong>${t.privacy_s2_subtitle1 || ""}</strong> ${t.privacy_s2_p2 || ""}</p>
            <p><strong>${t.privacy_s2_subtitle2 || ""}</strong> ${t.privacy_s2_p3 || ""}</p>
            <h3>${t.privacy_s3_title || ""}</h3>
            <p>${t.privacy_s3_p1 || ""}</p>
        `;
  }

  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
