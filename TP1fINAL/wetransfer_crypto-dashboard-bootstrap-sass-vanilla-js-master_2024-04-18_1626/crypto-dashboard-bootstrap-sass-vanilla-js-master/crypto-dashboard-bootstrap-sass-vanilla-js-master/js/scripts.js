// TODAY'S DATE

let date = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

document.getElementById('date').innerHTML = date;

// CATEGORIES

const getCategories = async () => {
  await fetch('https://api.coingecko.com/api/v3/coins/categories/list', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Categories:', data.length);
      document.getElementById('categories').innerHTML = data.length;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

getCategories();

// EXCHANGES

const getExchanges = async () => {
  await fetch('https://api.coingecko.com/api/v3/exchanges', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Exchanges:', data.length);
      document.getElementById('exchanges').innerHTML = data.length;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

getExchanges();

// ASSET PLATFORMS

const getPlatforms = async () => {
  await fetch('https://api.coingecko.com/api/v3/asset_platforms', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Platforms:', data.length);
      document.getElementById('platforms').innerHTML = data.length;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

getPlatforms();

// INDEXES

const getIndexes = async () => {
  await fetch('https://api.coingecko.com/api/v3/indexes', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Indexes:', data.length);
      document.getElementById('indexes').innerHTML = data.length;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

getIndexes();

// CRYPTOCURRENCY TABLE

const cryptoDiv = document.getElementById('crypto');
let tableHeaders = [
  'ID',
  'Image',
  'Name',
  'Symbol',
  'Price',
  '24h',
  'Volume',
  'Market Cap',
];

const createCryptoTable = () => {
  while (cryptoDiv.firstChild) {
    cryptoDiv.removeChild(cryptoDiv.firstChild);
  }

  let cryptoTable = document.createElement('table');
  cryptoTable.classList.add(
    'table',
    'table-dark',
    'table-hover',
    'border-light',
    'cryptoTable'
  );

  let cryptoTableHead = document.createElement('thead');
  cryptoTableHead.className = 'cryptoTableHead';

  let cryptoTableHeaderRow = document.createElement('tr');
  cryptoTableHeaderRow.className = 'cryptoTableHeaderRow';

  tableHeaders.forEach((header) => {
    let cryptoHeader = document.createElement('th');
    cryptoHeader.innerHTML = header;
    cryptoTableHeaderRow.append(cryptoHeader);
  });

  cryptoTableHead.append(cryptoTableHeaderRow);
  cryptoTable.append(cryptoTableHead);

  let cryptoTableBody = document.createElement('tbody');
  cryptoTableBody.className = 'cryptoTableBody';
  cryptoTable.append(cryptoTableBody);
  cryptoDiv.append(cryptoTable);
};

const appendCrypto = (singleCoin, singleCoinID) => {
  const cryptoTable = document.querySelector('.cryptoTableBody');
  let cryptoTableBodyRow = document.createElement('tr');
  cryptoTableBodyRow.className = 'cryptoTableBodyRow';

  let coinID = document.createElement('td');
  coinID.innerHTML = singleCoinID;

  let coinImage = document.createElement('td');
  let image = document.createElement('img');
  image.src = singleCoin.image;
  image.setAttribute('height', '30px');
  image.setAttribute('width', '30px');
  coinImage.appendChild(image);

  let coinName = document.createElement('td');
  coinName.innerHTML = singleCoin.name;

  let coinSymbol = document.createElement('td');
  coinSymbol.innerHTML = singleCoin.symbol;

  let coinCurrentPrice = document.createElement('td');
  coinCurrentPrice.innerHTML = '$' + singleCoin.current_price.toFixed(2);

  let coin24h = document.createElement('td');
  coin24h.innerHTML = singleCoin.price_change_percentage_24h.toFixed(2) + '%';
  coin24h.style.color =
    singleCoin.price_change_percentage_24h > 0 ? '#2e7d32' : '#d50000';

  let coinVolume = document.createElement('td');
  coinVolume.innerHTML = '$' + singleCoin.total_volume.toLocaleString();

  let coinMarketCap = document.createElement('td');
  coinMarketCap.innerHTML = '$' + singleCoin.market_cap.toLocaleString();

  cryptoTableBodyRow.append(
    coinID,
    coinImage,
    coinName,
    coinSymbol,
    coinCurrentPrice,
    coin24h,
    coinVolume,
    coinMarketCap
  );

  cryptoTable.append(cryptoTableBodyRow);
};

const getCrypto = async () => {
  await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    {
      method: 'GET',  
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      },
    }
  )
    .then((response) => response.json())
    .then((coins) => {
      console.log('Crypto Data:', coins);
      createCryptoTable();
      for (const coin of coins) {
        let coinID = coins.indexOf(coin) + 1;
        appendCrypto(coin, coinID);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

getCrypto();

// NEWS
const getNews = async () => {
  const apiKey = '051b9ddd8564418bb67eea0fb02972e0'; // Replace with your actual API key
  const newsUrl = `https://newsapi.org/v2/top-headlines?country=pt&category=business&apiKey=${apiKey}`;

  await fetch(newsUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log('News:', data.articles.length);
    const newsList = document.getElementById('newsList');

    // Create a container element for the card list
    const cardListContainer = document.createElement('div');
    cardListContainer.classList.add('card-list-container');
    newsList.appendChild(cardListContainer);

    data.articles.forEach((article) => {
      // Create a card element for each article
      const newsCard = document.createElement('div');
      newsCard.classList.add('news-card');

      // Headline element
      const articleTitle = document.createElement('h3');
      articleTitle.textContent = article.title;
      newsCard.appendChild(articleTitle);

      // Description element
      const articleDescription = document.createElement('p');
      articleDescription.textContent = article.description;
      newsCard.appendChild(articleDescription);

      // Add image element if available
      if (article.urlToImage) {
        const articleImage = document.createElement('img');
        articleImage.src = article.urlToImage;
        articleImage.alt = article.title;
        newsCard.appendChild(articleImage);
      }

      // Add author information if available
      if (article.author) {
        const articleAuthor = document.createElement('span');
        articleAuthor.textContent = ` - ${article.author}`;
        articleAuthor.style.fontStyle = 'italic';
        newsCard.appendChild(articleAuthor);
      }

      // Append the card to the list container
      cardListContainer.appendChild(newsCard);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

// Call the function to fetch and display news
getNews();