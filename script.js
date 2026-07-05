const WEDDING_DATE = "2026-10-24T00:00:00+02:00";
const WEDDING_DISPLAY_DATE = "24.10.2026";

function updateCountdown() {
  const target = new Date(WEDDING_DATE);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weddingDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const diffDays = -1;//Math.round((weddingDay - today) / (1000 * 60 * 60 * 24));
  const el = document.getElementById("countdownText");

  if (!el) return;

  if (diffDays > 4) {
    el.innerHTML = `o <strong>${diffDays}</strong> dní sa stanú<br><span class="green">manželia Tivadaroví</span>`;
  } else if (diffDays > 1) {
    el.innerHTML = `o <strong>${diffDays}</strong> dni sa stanú<br><span class="green">manželia Tivadaroví</span>`;
  } else if (diffDays === 1) {
    el.innerHTML = `o <strong>${diffDays}</strong> deň sa stanú<br><span class="green">manželia Tivadaroví</span>`;
  } else if (diffDays === 0) {
    el.innerHTML = `dnes sa stanú<br><span class="green">manželia Tivadaroví</span>`;
  } else {
    el.innerHTML = `${WEDDING_DISPLAY_DATE} sa stali<br><span class="green">manželia Tivadaroví</span>`;
  }
}

function setupRsvpForm() {
  const form = document.getElementById("rsvpForm");
  const message = document.getElementById("formMessage");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (message) {
      message.textContent = "Ďakujeme, formulár je zatiaľ len ukážka. Po napojení sa údaje odošlú do tabuľky.";
    }
  });
}

function setupGiftMockup() {
  document.querySelectorAll("[data-gift]").forEach((button) => {
    button.addEventListener("click", () => {
      const gift = button.getAttribute("data-gift");
      alert(`Ukážka rezervácie daru: ${gift}. Neskôr sa tu napojí Google Sheet + Apps Script.`);
    });
  });
}

updateCountdown();
setupRsvpForm();
setupGiftMockup();