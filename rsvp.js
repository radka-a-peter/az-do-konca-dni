const RSVP_API_URL = GIFTS_API_URL;

const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

const attendanceSelect = document.querySelector('[name="attendance"]');
const fieldsRequiredWhenComing = [
  "contact",
  "transport",
  "accommodation"
];

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //
const attendance = rsvpForm.querySelector('[name="attendance"]').value;

const drinksField = rsvpForm.querySelector(".drinks-field");
const selectedDrinks = rsvpForm.querySelectorAll('input[name="drinks"]:checked');

if (
  attendance === "S radosťou prídem/prídeme" &&
  selectedDrinks.length === 0
) {
  drinksField.classList.add("invalid");

  drinksField.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  return;
}

drinksField.classList.remove("invalid");
    //

    const submitButton = rsvpForm.querySelector('button[type="submit"]');
    const formData = new FormData(rsvpForm);

    const payload = {
      action: "submit_rsvp",
      attendance: formData.get("attendance"),
      guest_names: formData.get("guest_names"),
      contact: formData.get("contact"),
      children: formData.get("children"),
      dietary: formData.get("dietary"),
      drinks: [...rsvpForm.querySelectorAll('input[name="drinks"]:checked')]
        .map(item => item.value)
        .join(", "),
      accommodation: formData.get("accommodation"),
      song: formData.get("song"),
      message: formData.get("message")
    };

    submitButton.disabled = true;
    submitButton.textContent = "Odosielam...";

    try {
      const response = await fetch(RSVP_API_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (rsvpMessage) {
        rsvpMessage.textContent = result.message;
      }

      if (result.success) {
        rsvpForm.reset();
      }
    } catch (error) {
      if (rsvpMessage) {
        rsvpMessage.textContent = "Formulár sa nepodarilo odoslať. Skúste to prosím znova.";
      }
    }

    submitButton.disabled = false;
    submitButton.textContent = "Odoslať";
  });

  function updateRsvpRequiredFields() {
    if (!attendanceSelect) return;
    const isNotComing = attendanceSelect.value === "Žiaľ, nebudem/nebudeme môcť prísť" || attendanceSelect.value === "Prídem/prídeme len na sobáš";

    fieldsRequiredWhenComing.forEach((fieldName) => {
      const field = document.querySelector(`[name="${fieldName}"]`);

      if (field) {
        field.required = !isNotComing;
      }
    });

    document.querySelector('[name="attendance"]').required = true;
    document.querySelector('[name="guest_names"]').required = true;
    document.querySelector(".drinks-field").classList.remove("invalid");
  }

  if (attendanceSelect) {
    attendanceSelect.addEventListener("change", updateRsvpRequiredFields);
    updateRsvpRequiredFields();
  }

  if (rsvpForm) {
  rsvpForm.querySelectorAll('input[name="drinks"]').forEach(input => {
    input.addEventListener("change", () => {
      const drinksField = rsvpForm.querySelector(".drinks-field");

      if (drinksField) {
        drinksField.classList.remove("invalid");
      }
    });
  });
}
}