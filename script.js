const navbar = document.querySelector("#navbar");
const easeLogo = document.querySelector("#ease-logo");
const scrollIndicator = document.querySelector("#scroll-indicator");
const menuToggleIcon = document.querySelector("#menu-toggle");
const navElements = document.querySelector("#nav-elements");
const hasPermanentNavBackground = navbar?.classList.contains("scrolled") ?? false;

let previousScrollPosition = window.scrollY;

function isMobileLayout() {
  return window.matchMedia("(max-width: 860px)").matches;
}

function updateNavbarAppearance() {
  if (!navbar || !easeLogo) return;

  const useDarkBackground =
    hasPermanentNavBackground || isMobileLayout() || window.scrollY > 5;

  navbar.classList.toggle("scrolled", useDarkBackground);
  easeLogo.src = useDarkBackground
    ? "./img/ease-logo-white.svg"
    : "./img/ease-logo-green.svg";

  if (scrollIndicator) {
    scrollIndicator.style.opacity = window.scrollY > 5 ? "0" : "1";
  }

  setMenuIcon();
}

function updateNavbarPosition() {
  if (!navbar) return;

  const currentScrollPosition = window.scrollY;
  const menuIsOpen = menuToggleIcon?.classList.contains("open") ?? false;
  const isScrollingDown = currentScrollPosition > previousScrollPosition;

  navbar.style.top =
    isScrollingDown && currentScrollPosition > 5 && !menuIsOpen
      ? "-7rem"
      : "1rem";

  previousScrollPosition = currentScrollPosition;
}

function menuToggle() {
  if (!isMobileLayout() || !menuToggleIcon || !navElements) return;

  const isOpen = menuToggleIcon.classList.toggle("open");
  navElements.classList.toggle("toggled", isOpen);
  menuToggleIcon.setAttribute("aria-expanded", String(isOpen));

  if (navbar) {
    navbar.style.top = isOpen ? "0" : "1rem";
    navbar.classList.toggle("menu-open", isOpen);
  }
  document.body.classList.toggle("menu-is-open", isOpen);
  setMenuIcon();
}

function setMenuIcon() {
  if (!isMobileLayout() || !menuToggleIcon) return;

  const isOpen = menuToggleIcon.classList.contains("open");
  const hasDarkBackground = navbar?.classList.contains("scrolled") ?? false;
  const iconName = isOpen
    ? hasDarkBackground
      ? "xmark.svg"
      : "xmark_dark.svg"
    : hasDarkBackground
      ? "bars.svg"
      : "bars_dark.svg";

  menuToggleIcon.style.backgroundImage = `url('./img/${iconName}')`;
}

function handleResize() {
  if (!isMobileLayout() && menuToggleIcon && navElements) {
    menuToggleIcon.classList.remove("open");
    navElements.classList.remove("toggled");
    menuToggleIcon.setAttribute("aria-expanded", "false");
    navbar?.classList.remove("menu-open");
    document.body.classList.remove("menu-is-open");
  }

  updateNavbarAppearance();
}

window.addEventListener("load", updateNavbarAppearance);
window.addEventListener("resize", handleResize);
window.addEventListener("scroll", () => {
  updateNavbarAppearance();
  updateNavbarPosition();
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggleIcon?.classList.contains("open") &&
    isMobileLayout()
  ) {
    menuToggle();
    menuToggleIcon.focus();
  }
});

const hubspotLoadButton = document.querySelector("[data-hubspot-load]");
const hubspotConsentPanel = document.querySelector("[data-hubspot-consent]");
const hubspotFormFrame = document.querySelector(".hs-form-frame[data-form-id]");
const hubspotFormStatus = document.querySelector(".hubspot-form-status");

if (
  hubspotLoadButton &&
  hubspotConsentPanel &&
  hubspotFormFrame &&
  hubspotFormStatus
) {
  hubspotLoadButton.addEventListener("click", () => {
    const originalLabel = hubspotLoadButton.textContent;
    hubspotLoadButton.disabled = true;
    hubspotLoadButton.setAttribute("aria-busy", "true");
    hubspotLoadButton.textContent = "Selbsttest wird geladen …";
    hubspotFormStatus.classList.remove("is-error");
    hubspotFormStatus.textContent =
      "Verbindung zu HubSpot wird nach Ihrer Einwilligung aufgebaut.";
    hubspotFormFrame.hidden = false;

    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/48830137.js";
    script.async = true;
    script.dataset.hubspotFormsLoader = "true";

    script.addEventListener("load", () => {
      hubspotConsentPanel.hidden = true;
      hubspotFormStatus.textContent = "Der Selbsttest wurde geladen.";
      hubspotFormFrame.focus();
    });

    script.addEventListener("error", () => {
      hubspotFormFrame.hidden = true;
      hubspotLoadButton.disabled = false;
      hubspotLoadButton.removeAttribute("aria-busy");
      hubspotLoadButton.textContent = originalLabel;
      hubspotFormStatus.textContent =
        "Der Selbsttest konnte nicht geladen werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@ease-systems.de.";
      hubspotFormStatus.classList.add("is-error");
    });

    document.head.appendChild(script);
  });
}

function emitDemoConversionEvent(eventName, locale) {
  const detail = { event: eventName, locale };

  window.dispatchEvent(new CustomEvent("ease:conversion", { detail }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      form_locale: locale,
    });
  }
}

function createDemoEmail(form, formData) {
  const locale = form.dataset.locale;
  const isGerman = locale === "de";
  const employees =
    form.elements.employee_count.selectedOptions[0]?.textContent ?? "";
  const timing =
    form.elements.preferred_timing.selectedOptions[0]?.textContent ?? "";
  const subject = isGerman
    ? `LU\u00A020 Demo-Anfrage – ${formData.get("company")}`
    : `LU\u00A020 demo request – ${formData.get("company")}`;
  const labels = isGerman
    ? {
        intro: "Neue LU\u00A020 Demo-Anfrage",
        company: "Unternehmen",
        employees: "Mitarbeitende am Standort",
        workplace: "Logistikarbeitsplatz / Aufgabe",
        name: "Kontakt",
        email: "E-Mail",
        phone: "Telefon",
        timing: "Bevorzugter Zeitraum",
        privacy: "Datenschutzhinweis",
        accepted: "zur Kenntnis genommen",
      }
    : {
        intro: "New LU\u00A020 demo request",
        company: "Company",
        employees: "Employees at the site",
        workplace: "Logistics workplace / task",
        name: "Contact",
        email: "Email",
        phone: "Phone",
        timing: "Preferred timing",
        privacy: "Privacy notice",
        accepted: "acknowledged",
      };
  const body = [
    labels.intro,
    "",
    `${labels.company}: ${formData.get("company")}`,
    `${labels.employees}: ${employees}`,
    `${labels.workplace}: ${formData.get("workplace_task")}`,
    `${labels.name}: ${formData.get("first_name")} ${formData.get("last_name")}`,
    `${labels.email}: ${formData.get("email")}`,
    `${labels.phone}: ${formData.get("phone") || "–"}`,
    `${labels.timing}: ${timing}`,
    `${labels.privacy}: ${labels.accepted}`,
  ].join("\n");

  return `mailto:info@ease-systems.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll(".demo-form").forEach((form) => {
  const locale = form.dataset.locale || document.documentElement.lang || "de";
  const status = form.querySelector(".demo-form-status");
  const submitButton = form.querySelector(".demo-submit");
  const successPanel = form
    .closest(".demo-form-panel")
    ?.querySelector(".demo-success");
  let hasStarted = false;

  form.addEventListener("focusin", (event) => {
    if (
      !hasStarted &&
      event.target.matches("input:not([name='website']), select, textarea")
    ) {
      hasStarted = true;
      emitDemoConversionEvent("demo_form_started", locale);
    }
  });

  form.addEventListener(
    "invalid",
    (event) => {
      event.target.setAttribute("aria-invalid", "true");
    },
    true,
  );

  form.addEventListener("input", (event) => {
    if (event.target.matches("input, select, textarea")) {
      event.target.removeAttribute("aria-invalid");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "demo-form-status";

    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid").forEach((field) => {
        field.setAttribute("aria-invalid", "true");
      });
      form.reportValidity();
      emitDemoConversionEvent("demo_form_validation_error", locale);
      return;
    }

    const formData = new FormData(form);

    if (formData.get("website")) {
      form.reset();
      return;
    }

    const endpoint = form.dataset.endpoint?.trim();
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    submitButton.textContent = form.dataset.messageSubmitting;
    emitDemoConversionEvent("demo_form_submit", locale);

    if (!endpoint) {
      window.location.href = createDemoEmail(form, formData);
      status.textContent = form.dataset.messageEmail;
      status.classList.add("is-handoff");
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
      submitButton.textContent = originalButtonText;
      emitDemoConversionEvent("demo_form_email_handoff", locale);
      return;
    }

    const payload = Object.fromEntries(formData.entries());
    delete payload.website;
    delete payload.privacy_notice;
    payload.privacy_notice_acknowledged = true;
    payload.locale = locale;
    payload.page_path = window.location.pathname;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Demo request failed with status ${response.status}`);
      }

      form.hidden = true;
      successPanel.hidden = false;
      emitDemoConversionEvent("demo_form_success", locale);
    } catch (error) {
      status.textContent = form.dataset.messageError;
      status.classList.add("is-error");
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
      submitButton.textContent = originalButtonText;
      emitDemoConversionEvent("demo_form_error", locale);
      console.error(error);
    }
  });
});
