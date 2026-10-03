(() => {
  const initScrollReveals = () => {
    const sections = document.querySelectorAll(
      "body > section, main > section, main section",
    );
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveals, {
      once: true,
    });
  } else {
    initScrollReveals();
  }
})();
