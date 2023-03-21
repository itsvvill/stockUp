//Configuration for Finnhub API
const FINN_HUB_API_KEY = `&token=${process.env.REACT_APP_FINNHUB}`;
const FINN_HUB_URL = 'https://finnhub.io/api/v1/';
const FINN_HUB_PROFILE_URL = 'stock/profile2?symbol=';
const FINN_HUB_SYMBOL_URL = 'quote?symbol=';

const COMPANY_OVERVIEW_BASE_URL = `${FINN_HUB_URL}${FINN_HUB_PROFILE_URL}`;
const STOCK_LOOKUP_BASE_URL = `${FINN_HUB_URL}${FINN_HUB_SYMBOL_URL}`;

export { FINN_HUB_API_KEY, COMPANY_OVERVIEW_BASE_URL, STOCK_LOOKUP_BASE_URL };
