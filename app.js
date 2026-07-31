const WHATSAPP_NUMBER = "5492657676136";

const WHATSAPP_MESSAGES = {
  general: [
    "Hola, Instituto Crecer.",
    "",
    "Quiero recibir información sobre sus capacitaciones.",
    "",
    "¿Podrían indicarme las próximas fechas, horarios, valores y requisitos?"
  ].join("\n"),

  "curso-inicial": [
    "Hola, Instituto Crecer.",
    "",
    "Quiero recibir información sobre el Curso de Operador de Autoelevador.",
    "",
    "Quisiera conocer la próxima fecha, modalidad, horarios, valor, ubicación y requisitos de inscripción."
  ].join("\n"),

  renovacion: [
    "Hola, Instituto Crecer.",
    "",
    "Quiero consultar por la Renovación del Carnet de Operador de Autoelevador.",
    "",
    "¿Podrían indicarme los requisitos, la próxima fecha, el valor y la documentación que debo presentar?"
  ].join("\n"),

  experiencia: [
    "Hola, Instituto Crecer.",
    "",
    "Tengo experiencia operando autoelevadores y quiero consultar por la obtención del carnet.",
    "",
    "¿Podrían indicarme cómo es la evaluación, cuáles son los requisitos, la próxima fecha y el valor?"
  ].join("\n")
};

function getWhatsAppUrl(messageType = "general") {
  const selectedMessage =
    WHATSAPP_MESSAGES[messageType] || WHATSAPP_MESSAGES.general;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    selectedMessage
  )}`;
}

function initializeWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll(
    "[data-whatsapp], [data-whatsapp-type]"
  );

  whatsappLinks.forEach((link) => {
    const messageType = link.dataset.whatsappType || "general";

    link.href = getWhatsAppUrl(messageType);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function initializeIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initializeHeader() {
  const header = document.getElementById("site-header");

  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}

function initializeMobileMenu() {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuButton || !mobileMenu) return;

  const setMenuState = (open) => {
    mobileMenu.classList.toggle("open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Cerrar menú" : "Abrir menú"
    );

    menuButton.innerHTML = `
      <i data-lucide="${open ? "x" : "menu"}"></i>
    `;

    document.body.classList.toggle("menu-open", open);

    initializeIcons();
  };

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      setMenuState(false);
    }
  });
}

function initializeFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-button");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const willOpen = !item.classList.contains("open");

      items.forEach((otherItem) => {
        const otherButton =
          otherItem.querySelector(".faq-button");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        otherItem.classList.remove("open");

        otherButton?.setAttribute(
          "aria-expanded",
          "false"
        );

        if (otherAnswer) {
          otherAnswer.style.maxHeight = "0px";
        }
      });

      if (willOpen) {
        item.classList.add("open");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

        answer.style.maxHeight =
          `${answer.scrollHeight}px`;
      }
    });
  });
}

function initializeRevealAnimations() {
  const elements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

function initializeCurrentYear() {
  const year = document.getElementById("current-year");

  if (year) {
    year.textContent =
      String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeWhatsAppLinks();
  initializeHeader();
  initializeMobileMenu();
  initializeFaq();
  initializeRevealAnimations();
  initializeCurrentYear();
  initializeIcons();
});