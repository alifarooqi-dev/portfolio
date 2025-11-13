// Typing Animation (for dynamic typing effect)
new Typed(".typing", {
    strings: [" ", "Web Designer", "Web Developer", "App Developer"], // List of strings to type
    typeSpeed: 100, // Speed of typing each character
    backSpeed: 60, // Speed of erasing characters
    loop: true // Loop the animation infinitely
});

// Variables
const nav = document.querySelector(".nav"); // Select the navigation container
const navLinks = nav.querySelectorAll("li a"); // Select all anchor tags inside the nav
const allSections = document.querySelectorAll(".section"); // Select all section elements
const buttonContainer = document.getElementById("button-container"); // Button container (for hire me button)
const navTogglerBtn = document.querySelector(".nav-toggler"); // Select the navigation toggler button (for mobile)
const aside = document.querySelector(".aside"); // Select the aside menu (for mobile navigation)

// Helper Functions

// Toggle the active class for navigation links
const toggleActiveClass = (elements, activeIndex) => {
    elements.forEach((el, index) => {
        // Add 'active' class to the clicked element and remove from others
        el.classList.toggle("active", index === activeIndex);
    });
};

// Show the section based on the target ID
const showSection = (targetId) => {
    allSections.forEach((section) => {
        // Add 'active' class to the section with the corresponding target ID
        section.classList.toggle("active", section.id === targetId);
    });
};

// Add the 'back-section' class to the specified section index
const addBackSection = (index) => {
    allSections.forEach((section, i) => {
        // Add 'back-section' class to the specified section, and remove from others
        section.classList.toggle("back-section", i === index);
    });
};

// Update the navigation to highlight the active section link
const updateNav = (targetId) => {
    navLinks.forEach((link) => {
        // Compare the href attribute's target section and add 'active' class
        const isActive = link.getAttribute("href").split("#")[1] === targetId;
        link.classList.toggle("active", isActive);
    });
};

// Toggle the aside menu for mobile navigation
const toggleAside = () => {
    aside.classList.toggle("open"); // Open or close the aside menu
    navTogglerBtn.classList.toggle("open"); // Change the appearance of the nav toggler button
    allSections.forEach((section) => section.classList.toggle("open")); // Toggle sections visibility on mobile
};

// Event Listeners

// Handle click events on the navigation links
navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the default anchor behavior

        const targetId = link.getAttribute("href").split("#")[1]; // Extract target section ID from href
        toggleActiveClass(navLinks, index); // Update active class on the nav links
        showSection(targetId); // Display the target section
        addBackSection(index); // Update sections' visibility (for back-section class)

        // If on a smaller screen, close the aside menu after a link is clicked
        if (window.innerWidth < 1200) {
            toggleAside();
        }
    });
});

// Handle click events on the 'Hire Me' button
buttonContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("hire-me")) {
        // If the clicked element has the 'hire-me' class
        const targetId = e.target.getAttribute("href").split("#")[1]; // Extract section ID from href
        const sectionIndex = parseInt(e.target.getAttribute("data-section-index"), 10); // Get section index

        showSection(targetId); // Show the target section
        addBackSection(sectionIndex); // Add the back-section class to the appropriate section
        updateNav(targetId); // Update the navigation to highlight the active section
    }
});

// Toggle the aside menu when clicking the navigation toggler (for mobile)
navTogglerBtn.addEventListener("click", () => {
    toggleAside(); // Trigger toggleAside to open/close the aside menu
});

/* ===== Portfolio preview + reveal animations ===== */
(function () {
  const grid = document.querySelector('.portfolio-grid');
  if (!grid) return;

  const cards = Array.from(document.querySelectorAll('.portfolio-card'));
  const modal = document.getElementById('preview-modal');
  const previewImage = document.getElementById('preview-image');
  const previewTitle = document.getElementById('preview-title');
  const previewLive = document.getElementById('preview-live');

// Open preview modal with card info
function openPreview(card) {
  const live = card.dataset.live;
  const img = card.dataset.img;
  const title = card.querySelector('.card-overlay h3')?.innerText || 'Project Preview';

  previewImage.src = img;
  previewImage.alt = title + ' screenshot';
  previewTitle.textContent = title;
  previewLive.href = live;
  previewLive.textContent = 'Open Live';

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // 🔹 aside ko z-index:1
  const aside = document.querySelector(".aside");
  if (aside) aside.style.zIndex = "1";

  const closeBtn = modal.querySelector('.preview-close');
  if (closeBtn) closeBtn.focus();
}

// Close preview modal
function closePreview() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  previewImage.src = '';
  previewTitle.textContent = '';

  // 🔹 aside ka z-index reset karo
  const aside = document.querySelector(".aside");
  if (aside) aside.style.zIndex = "";
}


  // attach preview buttons
  grid.addEventListener('click', (e) => {
    const previewBtn = e.target.closest('.preview-btn');
    if (previewBtn) {
      const card = previewBtn.closest('.portfolio-card');
      openPreview(card);
      return;
    }
    // clicking card itself (not buttons) also opens preview
    const card = e.target.closest('.portfolio-card');
    if (card && !e.target.closest('a')) {
      openPreview(card);
    }
  });

  // open Live if user clicks direct Live link (native <a> handles it)

  // modal close handlers
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close') || e.target.classList.contains('preview-backdrop')) {
      closePreview();
    }
  });
  const closeBtn = modal.querySelector('.preview-close');
  if (closeBtn) closeBtn.addEventListener('click', closePreview);

  // ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closePreview();
    }
  });

  // IntersectionObserver for reveal animation
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((c) => io.observe(c));

  // keyboard: Enter opens preview on focused card
  cards.forEach((c) => {
    c.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openPreview(c);
    });
  });

})();
