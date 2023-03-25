//Configuration for Finnhub API
const FINN_HUB_API_KEY = `&token=${process.env.REACT_APP_FINNHUB}`;
const FINN_HUB_URL = 'https://finnhub.io/api/v1/';
const FINN_HUB_PROFILE_URL = 'stock/profile2?symbol=';
const FINN_HUB_SYMBOL_URL = 'quote?symbol=';
const FINN_HUB_SEARCH_URL = 'search?q=';

//Configuration for AlphaVantage
const ALPHA_VANTAGE_API_KEY = `&apikey=${process.env.REACT_APP_API_KEY}`;
const SEARCH_BASE_URL =
  'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=';

const COMPANY_OVERVIEW_BASE_URL = `${FINN_HUB_URL}${FINN_HUB_PROFILE_URL}`;
// const SEARCH_BASE_URL = `${FINN_HUB_URL}${FINN_HUB_SEARCH_URL}`;
const STOCK_LOOKUP_BASE_URL = `${FINN_HUB_URL}${FINN_HUB_SYMBOL_URL}`;

export {
  ALPHA_VANTAGE_API_KEY,
  FINN_HUB_API_KEY,
  COMPANY_OVERVIEW_BASE_URL,
  SEARCH_BASE_URL,
  STOCK_LOOKUP_BASE_URL,
};
