import {
  ALPHA_VANTAGE_API_KEY,
  ALPHA_VANTAGE_BASE_URL,
  FINN_HUB_API_KEY,
  FINN_HUB_BASE_URL,
  FINN_HUB_URL,
  ALPHA_VANTAGE_SEARCH_URL,
  ALPHA_VANTAGE_OVERVIEW_URL,
  ALPHA_VANTAGE_QUOTE_URL,
} from './config';

const apiSettings = {
  fetchSearch: async (searchQuery) => {
    const endpoint = `${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  },
  fetchQuote: async (searchQuery) => {
    const endpoint = `${stockSymbol}&token=${FINN_HUB_API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  },
};
export default apiSettings;
