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

  if (!gifts || gifts.length === 0) {
    giftGrid.innerHTML = '<p>Zoznam darov zatiaľ pripravujeme.</p>';
    return;
  }

  gifts.forEach(gift => {
    const card = document.createElement('article');
    card.className = gift.reserved ? 'gift-card reserved' : 'gift-card';

    const title = document.createElement('h3');
    title.textContent = gift.title;
    card.appendChild(title);

    if (gift.detail) {
      const linkParagraph = document.createElement('p');
      const link = document.createElement('a');

      link.href = gift.detail;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = gift.link_text || 'Pozrieť dar';

      linkParagraph.appendChild(link);
      card.appendChild(linkParagraph);
    }

    if (gift.reserved) {
      const reserved = document.createElement('p');
      reserved.className = 'reserved-text';
      reserved.textContent = 'Už rezervované';
      card.appendChild(reserved);
    } else {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-gift-id', gift.id);
      button.textContent = 'Rezervovať';
      card.appendChild(button);
    }

    giftGrid.appendChild(card);
  });

  setupGiftButtons();
}

function setupGiftButtons() {
  document.querySelectorAll('[data-gift-id]').forEach(button => {
    button.addEventListener('click', async () => {
      const giftId = button.getAttribute('data-gift-id');

      const confirmed = confirm('Naozaj chcete rezervovať tento dar?');
      if (!confirmed) return;

      button.disabled = true;
      button.textContent = 'Rezervujem...';

      try {
        const response = await fetch(
          `${GIFTS_API_URL}?action=reserve_gift&id=${encodeURIComponent(giftId)}&_=${Date.now()}`
        );

        const result = await response.json();

        if (result.success) {
          alert(result.message || 'Ďakujeme, dar bol rezervovaný.');
        } else {
          alert(result.message || 'Rezervácia sa nepodarila.');
        }
      } catch (error) {
        console.error('Chyba pri rezervácii:', error);
        alert('Rezervácia sa nepodarila. Skúste to prosím znova.');
      }

      await loadGifts();
    });
  });
}

loadGifts();