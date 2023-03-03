//Configuration for Alpha Vantage API and Finnhub API
const FINN_HUB_API_KEY = process.env.REACT_APP_FINNHUB;
const FINN_HUB_BASE_URL = 'https://finnhub.io/api/v1/quote?symbol=';

const FINN_HUB_URL = `${FINN_HUB_BASE_URL}`;

export { FINN_HUB_API_KEY, FINN_HUB_BASE_URL, FINN_HUB_URL };
