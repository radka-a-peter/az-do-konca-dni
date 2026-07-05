const WEDDING_DATE = '2026-10-24T00:00:00+02:00';
const WEDDING_DISPLAY_DATE = '24.10.2026';

function updateCountdown() {
  const target = new Date(WEDDING_DATE);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weddingDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diffDays = Math.round((weddingDay - today) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('countdownText');

  if (!el) return;

  if (diffDays > 0) {
    el.textContent = `o ${diffDays} dní sa stanú v Ňom Jednom jedno`;
  } else if (diffDays === 0) {
    el.textContent = 'dnes sa stanú v Ňom Jednom jedno';
  } else {
    el.textContent = `${WEDDING_DISPLAY_DATE} sa stali v Ňom Jednom jedno`;
  }
}

function setupMobileMenu() {
  const button = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!button || !links) return;

  button.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

function setupRsvpForm() {
  const form = document.getElementById('rsvpForm');
  const message = document.getElementById('formMessage');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // TODO: Sem neskôr doplniť URL Google Apps Script endpointu.
    // const endpoint = 'https://script.google.com/macros/s/XXXXX/exec';
    // const formData = new FormData(form);
    // await fetch(endpoint, { method: 'POST', body: formData });

    if (message) {
      message.textContent = 'Ďakujeme, formulár je zatiaľ len ukážka. Po napojení sa údaje odošlú do tabuľky.';
    }
  });
}

function setupGiftMockup() {
  document.querySelectorAll('[data-gift]').forEach(button => {
    button.addEventListener('click', () => {
      const gift = button.getAttribute('data-gift');
      alert(`Ukážka rezervácie daru: ${gift}. Neskôr sa tu napojí Google Sheet + Apps Script.`);
    });
  });
}

updateCountdown();
setupMobileMenu();
setupRsvpForm();
setupGiftMockup();
