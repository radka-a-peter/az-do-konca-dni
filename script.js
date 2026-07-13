const WEDDING_DATE = "2026-10-24T00:00:00+02:00";
const WEDDING_DISPLAY_DATE = "24.10.2026";

function updateCountdown() {
  const target = new Date(WEDDING_DATE);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weddingDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const diffDays = Math.round((weddingDay - today) / (1000 * 60 * 60 * 24));
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

  // Google Photos link
  const albumText = document.getElementById("album-text");

  if (albumText) {
    const weddingDate = new Date("2026-10-24T00:00:00");
    const today = new Date();

    if (today < weddingDate) {
      albumText.textContent =
        "Budeme radi, ak sa s nami po svadbe podelíte o zábery, ktoré zachytíte počas nášho spoločného dňa.";
    } else {
      albumText.textContent =
        "Ďakujeme, že ste náš deň prežili spolu s nami. Budeme radi, ak sem pridáte fotografie, ktoré ste počas svadby zachytili.";
    }
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

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.querySelector(".image-modal-close");


document.querySelectorAll(".lightbox-img").forEach(image => {

  image.addEventListener("click", () => {

    modalImage.src = image.src;
    modalImage.alt = image.alt;

    modal.classList.add("open");
  });

});


if (modal) {

  modal.addEventListener("click", () => {
    modal.classList.remove("open");
  });

}


if (modalClose) {

  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
  });

}