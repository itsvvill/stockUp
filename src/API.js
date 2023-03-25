import {
  FINN_HUB_API_KEY,
  COMPANY_OVERVIEW_BASE_URL,
  SEARCH_BASE_URL,
  STOCK_LOOKUP_BASE_URL,
  ALPHA_VANTAGE_API_KEY,
} from './config';

const apiSettings = {
  fetchSearch: async (searchQuery) => {
    // const endpoint = `${searchQuery}${FINN_HUB_API_KEY}`;
    const endpoint = `${searchQuery}${ALPHA_VANTAGE_API_KEY}`;
    let response = await fetch(`${SEARCH_BASE_URL}${endpoint}`);
    let data = await response.json();
    return data;
  },
  fetchQuote: async (stockSymbol) => {
    const endpoint = `${stockSymbol}${FINN_HUB_API_KEY}`;
    let response = await fetch(`${STOCK_LOOKUP_BASE_URL}${endpoint}`);
    let data = await response.json();
    return data;
  },
  fetchProfile: async (stockSymbol) => {
    const endpoint = `${stockSymbol}${FINN_HUB_API_KEY}`;
    let response = await fetch(`${COMPANY_OVERVIEW_BASE_URL}${endpoint}`);
    let data = await response.json();
    return data;
  },
};
export default apiSettings;
