import { FINN_HUB_API_KEY, FINN_HUB_BASE_URL, FINN_HUB_URL } from './config';

const apiSettings = {
  // fetchSearch: async (searchQuery) => {
  //   const endpoint =
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   return data;
  // },
  fetchQuote: async (stockSymbol) => {
    const endpoint = `${stockSymbol}&token=${FINN_HUB_API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  },
};
export default apiSettings;
