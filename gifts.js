const GIFTS_API_URL = 'https://script.google.com/macros/s/AKfycbwUIPvkXpmu_qJ4cGvZfZsTHQvKCjq9VAzQ_H32TEYbmSuUWWC5pdy5zCwypKBbj-4Hzw/exec';

const giftGrid = document.querySelector('.gift-grid');

async function loadGifts() {
  if (!giftGrid) return;

  giftGrid.innerHTML = '<p>Načítavam zoznam darov...</p>';

  try {
    const response = await fetch(GIFTS_API_URL);
    const data = await response.json();

    renderGifts(data.gifts);
  } catch (error) {
    giftGrid.innerHTML = '<p>Zoznam darov sa nepodarilo načítať.</p>';
  }
}

function renderGifts(gifts) {
  giftGrid.innerHTML = '';

  if (gifts.length === 0) {
  giftGrid.innerHTML = '<p>Zoznam darov zatiaľ pripravujeme.</p>';
  return;
}

  gifts.forEach(gift => {
    const card = document.createElement('article');
    card.className = gift.reserved ? 'gift-card reserved' : 'gift-card';

    card.innerHTML = `
      <h3>${gift.title}</h3>
      <p>${gift.detail || ''}</p>
      ${
        gift.reserved
          ? '<p class="reserved-text">Už rezervované</p>'
          : `<button type="button" data-gift-id="${gift.id}">Rezervovať</button>`
      }
    `;

    giftGrid.appendChild(card);
  });

  setupGiftButtons();
}

function setupGiftButtons() {
  document.querySelectorAll('[data-gift-id]').forEach(button => {
    button.addEventListener('click', async () => {
      const giftId = button.getAttribute('data-gift-id');
      const name = prompt('Napíšte prosím svoje meno pre rezerváciu daru:');

      if (!name || !name.trim()) return;

      const confirmed = confirm('Naozaj chcete rezervovať tento dar?');
      if (!confirmed) return;

      button.disabled = true;
      button.textContent = 'Rezervujem...';

      try {
        const response = await fetch(GIFTS_API_URL, {
          method: 'POST',
          body: JSON.stringify({
            id: giftId,
            name: name.trim()
          })
        });

        const result = await response.json();

        alert(result.message);
        await loadGifts();

      } catch (error) {
        alert('Rezervácia sa nepodarila. Skúste to prosím znova.');
        button.disabled = false;
        button.textContent = 'Rezervovať';
      }
    });
  });
}

loadGifts();