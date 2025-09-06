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
      } else if (pageId === "terms") {
        buildTerms(translations);
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
                        <a href="terms.html" data-i18n="footerLinkTerms">${
                          t.footerLinkTerms || ""
                        }</a>
                        <a href="account.html" data-i18n="footerLinkAccount">${
                          t.footerLinkAccount || ""
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

            <h3>${t.privacy_entity_title || ""}</h3>
            <p>${t.privacy_entity_p1 || ""}</p>

            <h3>${t.privacy_s1_title || ""}</h3>
            <p><strong>${t.privacy_s1_subtitle1 || ""}</strong> ${t.privacy_s1_p1 || ""}</p>
            <p><strong>${t.privacy_s1_subtitle2 || ""}</strong> ${t.privacy_s1_p2 || ""}</p>
            <p><strong>${t.privacy_s1_subtitle3 || ""}</strong> ${t.privacy_s1_p3 || ""}</p>
            <p><strong>${t.privacy_s1_subtitle4 || ""}</strong> ${t.privacy_s1_p4 || ""}</p>

            <h3>${t.privacy_s2_title || ""}</h3>
            <p>${t.privacy_s2_p1 || ""}</p>
            <p><strong>${t.privacy_s2_subtitle1 || ""}</strong> ${t.privacy_s2_p2 || ""}</p>
            <p><strong>${t.privacy_s2_subtitle2 || ""}</strong> ${t.privacy_s2_p3 || ""}</p>
            <p><strong>${t.privacy_s2_subtitle3 || ""}</strong> ${t.privacy_s2_p4 || ""}</p>

            <h3>${t.privacy_s3_title || ""}</h3>
            <p>${t.privacy_s3_p1 || ""}</p>

            <h3>${t.privacy_s4_title || ""}</h3>
            <p>${t.privacy_s4_p1 || ""}</p>
            <ul>
              ${[t.privacy_s4_li1, t.privacy_s4_li2, t.privacy_s4_li3]
                .filter(Boolean)
                .map((x) => `<li>${x}</li>`)
                .join("")}
            </ul>

            <h3>${t.privacy_s5_title || ""}</h3>
            <p>${t.privacy_s5_p1 || ""}</p>
            <ul>
              ${[t.privacy_s5_li1, t.privacy_s5_li2]
                .filter(Boolean)
                .map((x) => `<li>${x}</li>`)
                .join("")}
            </ul>

            <h3>${t.privacy_s6_title || ""}</h3>
            <p>${t.privacy_s6_p1 || ""}</p>

            <h3>${t.privacy_s7_title || ""}</h3>
            <p>${t.privacy_s7_p1 || ""}</p>
            <ul>
              ${[t.privacy_s7_li1, t.privacy_s7_li2, t.privacy_s7_li3]
                .filter(Boolean)
                .map((x) => `<li>${x}</li>`)
                .join("")}
            </ul>

            <h3>${t.privacy_s8_title || ""}</h3>
            <p>${t.privacy_s8_p1 || ""}</p>

            <h3>${t.privacy_s9_title || ""}</h3>
            <p>${t.privacy_s9_p1 || ""}</p>

            <h3>${t.privacy_s10_title || ""}</h3>
            <p>${t.privacy_s10_p1 || ""}</p>
        `;
  }

  function buildTerms(t) {
    const container = document.querySelector(".terms-content");
    if (!container) return;
    container.innerHTML = `
            <p class="last-updated">${t.terms_last_updated || ""}</p>
            <h3>${t.terms_intro_title || ""}</h3>
            <p>${t.terms_intro_p1 || ""}</p>
            <h3>${t.terms_license_title || ""}</h3>
            <p>${t.terms_license_p1 || ""}</p>
            <ul>
              ${[t.terms_license_li1, t.terms_license_li2, t.terms_license_li3]
                .filter(Boolean)
                .map((x) => `<li>${x}</li>`)
                .join("")}
            </ul>
            <h3>${t.terms_subs_title || ""}</h3>
            <p>${t.terms_subs_p1 || ""}</p>
            <h3>${t.terms_user_title || ""}</h3>
            <p>${t.terms_user_p1 || ""}</p>
            <h3>${t.terms_term_title || ""}</h3>
            <p>${t.terms_term_p1 || ""}</p>
            <h3>${t.terms_disclaimer_title || ""}</h3>
            <p>${t.terms_disclaimer_p1 || ""}</p>
            <h3>${t.terms_liab_title || ""}</h3>
            <p>${t.terms_liab_p1 || ""}</p>
            <h3>${t.terms_law_title || ""}</h3>
            <p>${t.terms_law_p1 || ""}</p>
            <h3>${t.terms_contact_title || ""}</h3>
            <p>${t.terms_contact_p1 || ""}</p>
        `;
  }

  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
