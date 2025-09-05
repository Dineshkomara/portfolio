// script.js — robust scrollspy + smooth scroll
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav-list a"));
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navbar = document.querySelector(".sidebar");
  const navHeight = navbar ? navbar.offsetHeight : 70;

  // ---- Smooth scroll for nav clicks (account for fixed navbar) ----
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").replace("#", "");
      const target = document.getElementById(id);
      if (!target) return;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollTo = Math.max(targetTop - navHeight + 4, 0);
      window.scrollTo({ top: scrollTo, behavior: "smooth" });

      // optimistic UI: mark clicked link active immediately
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ---- IntersectionObserver to update active link on scroll ----
  // rootMargin tuned to mark a section active when it enters roughly top-middle of viewport
  const observerOptions = {
    root: null,
    rootMargin: `-${Math.round(navHeight + 30)}px 0px -40% 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s));

  // ---- small helper: if user reloads mid-page, ensure correct active link ----
  function setActiveOnLoad() {
    const scrollPos = window.pageYOffset + navHeight + 5;
    let found = sections[0] && sections[0].id;
    for (const s of sections) {
      if (s.offsetTop <= scrollPos) found = s.id;
    }
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${found}`));
  }
  setActiveOnLoad();
  window.addEventListener("resize", () => {
    // no heavy work here; IntersectionObserver will handle layout changes in most cases
    // but recalc initial active (useful after resize)
    setTimeout(setActiveOnLoad, 150);
  });
});
// Animate skills progress bars when section is visible
const skillsGrid = document.querySelector(".skills-grid");
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillsGrid.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

if (skillsGrid) skillsObserver.observe(skillsGrid);

// Reveal project cards
const projectCards = document.querySelectorAll(".project-card");
const projObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => projObserver.observe(card));

// Reveal experience timeline items
const expItems = document.querySelectorAll(".timeline-item");
const expObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

expItems.forEach(item => expObserver.observe(item));
const trainStops = document.querySelectorAll(".train-stop");
const trainObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

trainStops.forEach(stop => trainObserver.observe(stop));

// Reveal certifications
const certCards = document.querySelectorAll(".cert-card");
const certObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

certCards.forEach(card => certObs.observe(card));

// Reveal resume preview on scroll
const resumePreview = document.querySelector(".resume-preview");
const resumeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      resumePreview.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

resumeObserver.observe(resumePreview);

// Reveal contact cards
const contactCards = document.querySelectorAll(".contact-card");
const contactObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

contactCards.forEach(card => contactObs.observe(card));

document.querySelector(".contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Show success message
  const msg = document.createElement("div");
  msg.textContent = "✅ Thank you! Your message has been sent.";
  msg.style.background = "#4CAF50";
  msg.style.color = "white";
  msg.style.padding = "10px";
  msg.style.marginTop = "10px";
  msg.style.borderRadius = "6px";
  
  this.appendChild(msg);
  this.reset();
});