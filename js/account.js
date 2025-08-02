document.addEventListener("DOMContentLoaded", function () {
  // --- CONFIGURATION ---
  const API_BASE_URL = "https://typosbro-multilevel-api.milliytechnology.workers.dev";
  const GOOGLE_CLIENT_ID =
    "118718851522-o03snn4pl8tpm2m2pogi67c2t9s8vb84.apps.googleusercontent.com";

  // --- DOM ELEMENTS ---
  const header = document.querySelector("header.header");
  const footer = document.querySelector("footer.footer-new");
  const loginView = document.getElementById("login-view");
  const loggedinView = document.getElementById("loggedin-view");
  const deleteBtn = document.getElementById("delete-account-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const statusMessageEl = document.getElementById("status-message");

  let translations = {};

  // --- MAIN LOGIC ---

  async function initializePage() {
    const token = getToken();
    await setLanguage(localStorage.getItem("language") || "en");
    updateViewState(token);
    initializeGoogleSignIn();
  }

  function updateViewState(token) {
    if (token) {
      loginView.classList.add("hidden");
      loggedinView.classList.remove("hidden");
    } else {
      loginView.classList.remove("hidden");
      loggedinView.classList.add("hidden");
    }
    statusMessageEl.textContent = "";
  }

  function setStatusMessage(messageKey, isError = false, fallbackText = "") {
    statusMessageEl.textContent = translations[messageKey] || fallbackText;
    statusMessageEl.className = isError ? "error" : "success";
  }

  // --- AUTHENTICATION ---

  function getToken() {
    let token = localStorage.getItem("jwt_token");
    if (!token) {
      const hash = window.location.hash;
      if (hash.startsWith("#token=")) {
        token = hash.substring("#token=".length);
        localStorage.setItem("jwt_token", token);
        window.history.replaceState(null, null, " "); // Clean the URL
      }
    }
    return token;
  }

  function handleLogout() {
    localStorage.removeItem("jwt_token");
    updateViewState(null);
    setStatusMessage("logoutSuccess", false, "You have been logged out.");
  }

  function initializeGoogleSignIn() {
    if (typeof google === "undefined") return;
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleSignIn,
    });
    google.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
      theme: "outline",
      size: "large",
      width: "100%",
    });
  }

  async function handleGoogleSignIn(response) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/google-signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google Sign-In failed.");

      localStorage.setItem("jwt_token", data.token);
      updateViewState(data.token);
      setStatusMessage("loginSuccess", false, "Login successful!");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setStatusMessage("errorGeneral", true, error.message);
    }
  }

  // --- ACCOUNT DELETION ---

  async function handleDeleteAccount() {
    const confirmMessage =
      translations.deleteConfirm ||
      "Are you sure you want to permanently delete your account? This action is irreversible.";
    if (!confirm(confirmMessage)) return;

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      setStatusMessage("errorNotLoggedIn", true, "You are not logged in.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete account.");

      setStatusMessage("deleteSuccess", false, "Your account has been deleted.");
      handleLogout();
    } catch (error) {
      console.error("Delete Account Error:", error);
      setStatusMessage("errorGeneral", true, error.message);
    }
  }

  // --- i18n and PAGE BUILDING ---

  async function fetchJSON(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Cannot fetch ${path}`);
    return response.json();
  }

  async function setLanguage(lang) {
    try {
      const [common, pageData] = await Promise.all([
        fetchJSON(`/i18n/${lang}/common.json`),
        fetchJSON(`/i18n/${lang}/account.json`),
      ]);
      translations = { ...common, ...pageData };

      buildHeader(translations);
      buildFooter(translations);

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (translations[key]) el.innerHTML = translations[key];
      });

      document.documentElement.lang = lang;
      const langSelect = document.getElementById("language-select");
      if (langSelect) langSelect.value = lang;
    } catch (error) {
      console.error("Failed to set language:", error);
      if (lang !== "en") setLanguage("en"); // Fallback
    }
  }

  function buildHeader(t) {
    // Simplified version
    header.innerHTML = `<nav class="container"><a href="index.html" class="nav-logo">MilliyTechnology</a><div class="nav-menu"><div class="language-switcher"><i class="fa-solid fa-globe"></i><select id="language-select"><option value="en">English</option><option value="ru">Русский</option><option value="uz">O'zbekcha</option></select></div><a href="index.html#contact" class="nav-contact-button" data-i18n="contactUs">${
      t.contactUs || ""
    }</a></div></nav>`;
    document
      .getElementById("language-select")
      .addEventListener("change", (e) => setLanguage(e.target.value));
  }

  function buildFooter(t) {
    // Simplified version
    footer.innerHTML = `<div class="container"><div class="footer-bottom-section"><div class="footer-legal"><p class="footer-logo">MilliyTechnology</p><p data-i18n="footerAddress">${
      t.footerAddress || ""
    }</p></div><div class="footer-nav"><a href="index.html#features" data-i18n="footerLinkFeatures">${
      t.footerLinkFeatures || ""
    }</a><a href="faq.html" data-i18n="footerLinkFaq">${
      t.footerLinkFaq || ""
    }</a><a href="privacy.html" data-i18n="footerLinkPrivacy">${
      t.footerLinkPrivacy || ""
    }</a><a href="account.html" data-i18n="footerLinkAccount">${
      t.footerLinkAccount || ""
    }</a><a href="index.html#contact" data-i18n="footerLinkContact">${
      t.footerLinkContact || ""
    }</a></div><div class="footer-copyright"><p data-i18n="footerRights">${
      t.footerRights || ""
    }</p></div></div></div>`;
  }

  // --- EVENT LISTENERS ---
  deleteBtn.addEventListener("click", handleDeleteAccount);
  logoutBtn.addEventListener("click", handleLogout);

  // --- INITIALIZE ---
  initializePage();
});
