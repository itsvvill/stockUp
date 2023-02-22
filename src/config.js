//Configuration for Alpha Vantage API and Finnhub API
const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query?function=';
const FINN_HUB_API_KEY = process.env.REACT_APP_FINNHUB;
const FINN_HUB_BASE_URL = 'https://finnhub.io/api/v1/quote?symbol=';

const FINN_HUB_URL = `${FINN_HUB_BASE_URL}${stockSymbol}&token=${FINN_HUB_API_KEY}`;
const ALPHA_VANTAGE_SEARCH_URL = `${ALPHA_VANTAGE_BASE_URL}SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
const ALPHA_VANTAGE_OVERVIEW_URL = `${ALPHA_VANTAGE_BASE_URL}OVERVIEW&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
const ALPHA_VANTAGE_QUOTE_URL = `${ALPHA_VANTAGE_BASE_URL}GLOBAL_QUOTE&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;

export {
  ALPHA_VANTAGE_API_KEY,
  ALPHA_VANTAGE_BASE_URL,
  FINN_HUB_API_KEY,
  FINN_HUB_BASE_URL,
  FINN_HUB_URL,
  ALPHA_VANTAGE_SEARCH_URL,
  ALPHA_VANTAGE_OVERVIEW_URL,
  ALPHA_VANTAGE_QUOTE_URL,
};
