import { useState } from 'react';
// pages and components
import Stocks from './Stocks';
import StockWatchList from './StockWatchList';

export default function StocksHome() {
  const [showStockWatchList, setShowStockWatchList] = useState(false);

  const toggleStockWatchList = () => {
    setShowStockWatchList((prevState) => !prevState);
  };
  console.log(showStockWatchList);
  return (
    <div>
      <Stocks toggleStockWatchList={toggleStockWatchList} />
      {showStockWatchList && <StockWatchList />}
    </div>
  );
}
