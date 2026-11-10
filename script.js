// =========================================================
// Cloudberry — landing page interactions
// =========================================================

// ---------- 1. Mobiel menu ----------
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#nav-menu');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('is-open', open);
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

// menu sluiten na klikken op een link
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// ---------- 2. Smaak kiezen → verpakking in de hero wisselt ----------
const heroCard = document.querySelector('.hero__card');
const heroPack = document.querySelector('#hero-pack');
const heroPackName = heroPack.querySelector('.pack__name');
const heroPackTeapot = heroPack.querySelector('.pack__teapot');
const flavours = document.querySelectorAll('.flavour');

// welke theepot-kleur hoort op welke verpakking
const teapotFor = {
  berry: 'assets/teapot_cream.png',
  orange: 'assets/teapot_cream.png',
  lime: 'assets/teapot_lime.png',
  sky: 'assets/teapot_forest.png',
};

flavours.forEach((btn) => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;

    // actieve kaart markeren
    flavours.forEach((f) => f.classList.remove('is-active'));
    btn.classList.add('is-active');

    // hero-verpakking aanpassen
    heroPack.className = `pack pack--${color} pack--front`;
    heroPackName.textContent = btn.dataset.name;
    heroPackTeapot.src = teapotFor[color];
    heroCard.dataset.theme = color;

    // terug naar boven zodat je het resultaat ziet
    document.querySelector('#top').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- 3. Elementen laten opkomen bij scrollen ----------
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('is-visible'));
}

// ---------- 4. Inschrijfformulier (alleen front-end check) ----------
const form = document.querySelector('.launch__form');
const emailInput = form.querySelector('#f-email');
const nameInput = form.querySelector('#f-name');
const message = form.querySelector('.launch__msg');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    emailInput.setAttribute('aria-invalid', 'true');
    message.textContent = 'Oops, that email doesn’t look right.';
    emailInput.focus();
    return;
  }

  emailInput.removeAttribute('aria-invalid');
  const name = nameInput.value.trim();
  message.textContent = name
    ? `Thanks ${name}! We'll save you a cup.`
    : 'Thanks! We’ll save you a cup.';
  form.reset();
});
