const form = document.querySelector('form');
const input = document.querySelector('input');
const cardList = document.querySelector('#cardlist');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    return;
  }

  try {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${query}`);
    const data = await response.json();

    cardList.innerHTML = '';

    if (data.data.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'No results found';
      cardList.appendChild(noResults);
    } else {
      data.data.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.src = card.card_images[0].image_url;
        cardImage.alt = card.name;

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = card.name;

        const cardType = document.createElement('p');
        cardType.textContent = `Type: ${card.type}`;

        const cardDesc = document.createElement('p');
        cardDesc.textContent = card.desc;

        const cardPrice = document.createElement('a');
        cardPrice.textContent = `TCGPlayer \$${card.card_prices[0].tcgplayer_price}`
        cardPrice.href = `https://www.tcgplayer.com/search/yugioh/product?productLineName=yugioh&productName=${card.name}&view=grid`
        cardPrice.target = '_blank'

        cardElement.appendChild(cardImage);
        cardElement.appendChild(cardTitle);``
        cardElement.appendChild(cardType);
        cardElement.appendChild(cardDesc);
        cardElement.appendChild(cardPrice);

        cardList.appendChild(cardElement);
      });
    }
  } catch (err) {
    console.error(err);
    const errorElement = document.createElement('p');
    errorElement.textContent = 'An error occurred while fetching data.';
    cardList.appendChild(errorElement);
  }
});
