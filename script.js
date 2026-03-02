const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const profileImage = document.getElementById("profileImage");
const photoPlaceholder = document.getElementById("photoPlaceholder");

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

year.textContent = new Date().getFullYear();

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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});
