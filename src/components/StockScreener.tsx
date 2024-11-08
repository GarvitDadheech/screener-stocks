import { useState } from "react";
import { StockTable } from "./StockTable";
import { BottomBar } from "./BottomBar";
import { filterLogic } from "../utils/filterStock";
import { Stock } from '../types/Stock';
import stocks from '../stocks.json'
import StockQueryForm from './StockQueryForm';

const StockScreener = () => {
  const [query, setQuery] = useState<string>('');
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string>('');

  const filterStocks = (query: string) => {
    try {
      const results = filterLogic(query, stocks);
      setFilteredStocks(results);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setFilteredStocks([]);
    }
  };

  return (
    <div className="">
      <div className="min-h-screen md:p-4 md:mt-2">
        <div className={`mx-auto bg-white rounded-lg shadow-lg transition-all duration-300 ${
          filteredStocks.length > 0 
            ? 'w-full max-w-[1500px] h-full' 
            : 'w-full max-w-[750px] mt-1'
        }`}>
          {filteredStocks.length > 0 && <StockTable stocks={filteredStocks} />}
          <StockQueryForm 
            onFilterStocks={filterStocks} 
            error={error} 
            setQuery={setQuery} 
            query={query} 
          />
        </div>
      </div>
      {filteredStocks.length > 0 && <BottomBar />}
    </div>
  );
};

export default StockScreener;
