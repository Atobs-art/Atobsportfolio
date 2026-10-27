// Mobile navigation
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

// Close the mobile menu after a navigation link is selected.
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections smoothly as they enter the screen.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Highlight the navigation link for the section being viewed.
const sections = document.querySelectorAll("main section[id], main section.hero");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const sectionId = entry.target.id || "top";
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

// Filter project cards by category.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

// Contact form demo: prepare an email using the visitor's default email app.
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  // Change this sample address to your real email before publishing.
  window.location.href = `mailto:hello@atobs.dev?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email app should open with your message ready. Replace hello@atobs.dev with your real email first.";
});

// Keep the footer year current.
document.querySelector("#year").textContent = new Date().getFullYear();
