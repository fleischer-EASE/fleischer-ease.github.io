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

  if (navbar) navbar.style.top = "1rem";
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
  }

  updateNavbarAppearance();
}

window.addEventListener("load", updateNavbarAppearance);
window.addEventListener("resize", handleResize);
window.addEventListener("scroll", () => {
  updateNavbarAppearance();
  updateNavbarPosition();
});

if (window.AOS) {
  window.AOS.init();
}
