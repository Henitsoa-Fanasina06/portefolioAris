const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const profileImage = document.getElementById("profileImage");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const siteHeader = document.querySelector(".site-header");
const sections = [...document.querySelectorAll("main section[id]")];
const storedTheme = localStorage.getItem("portfolio-theme");

if (year) {
  year.textContent = new Date().getFullYear();
}

const applyTheme = (theme) => {
  const isDarkSurface = theme === "light";
  document.body.classList.toggle("light-theme", isDarkSurface);

  if (themeToggle) {
    themeToggle.innerHTML = isDarkSurface
      ? '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>'
      : '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" fill="currentColor"/></svg></span>';
    themeToggle.setAttribute("aria-label", isDarkSurface ? "Activer le theme clair" : "Activer le theme sombre");
  }
};

applyTheme(storedTheme || "dark");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

menuBtn?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

if (profileImage && photoPlaceholder) {
  profileImage.addEventListener("error", () => {
    photoPlaceholder.classList.add("show");
    profileImage.style.display = "none";
  });

  profileImage.addEventListener("load", () => {
    photoPlaceholder.classList.remove("show");
    profileImage.style.display = "block";
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const updateScrollState = () => {
  const scrolled = window.scrollY > 20;
  siteHeader?.classList.toggle("scrolled", scrolled);
  scrollTopBtn?.classList.toggle("show", window.scrollY > 500);

  const currentSection = sections.find((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    return window.scrollY >= top && window.scrollY < bottom;
  });

  const activeId = currentSection?.id;
  navLinks?.querySelectorAll("a").forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("load", updateScrollState);

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
