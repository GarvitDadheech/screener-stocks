import { faBottleWater, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StockTable } from "./StockTable";
import stocks from '../stocks.json'
import { useState } from "react";
import { BottomBar } from "./BottomBar";
import { filterLogic } from "../utils/filterStock";
import {Stock} from '../types/Stock'

const StockScreener = () => {
  const [query, setQuery] = useState<string>('');
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string>('');

  const filterStocks = () => {
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
    <div className="min-h-screen p-4 mt-2">
      <div className={`mx-auto bg-white rounded-lg shadow-lg transition-all duration-300 ${
        filteredStocks.length > 0 
          ? 'w-full max-w-[1500px] h-full' 
          : 'w-full max-w-[750px] mt-1'
      }`}>
        {filteredStocks.length > 0 && <StockTable stocks={filteredStocks} />}
        
        <div className="p-4">
          {
            filteredStocks.length > 0 ? (<div><h2 className="text-lg font-medium text-gray-800">Search Query
          </h2><div className="text-sm mb-2 text-slate-700">You can customize this query below</div></div>) : (<h2 className="text-lg font-medium text-gray-800">
            Create a Search Query
          </h2>)
          }
          <div className="space-y-2 ">
            <label className="block text-sm font-medium text-gray-700">Query</label>
            <div className="flex flex-col md:flex-row gap-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-3 border-[1px] border-gray-300 rounded-md min-h-[120px] resize-none focus:ring-[0.1px] focus:ring-indigo-500 focus:border-indigo-500 w-full md:max-w-md focus:outline-none h-[180px]"
                placeholder="Enter your search query..."
              />
              <div className="w-full md:w-72 bg-[#F6FAFD] rounded-lg  border border-blue-400 flex flex-col pl-6 ">
                <h3 className="text-lg font-medium text-gray-800 mb-2 mt-5 font-serrif">Custom query example</h3>
                <div className="text-sm text-gray-600">
                  <p>Market capitalization &gt; 500 AND</p>
                  <p>Price to earning &gt; 15 AND</p>
                  <p>Return on capital employed &lt; 22%</p>
                </div>
                <a href="https://www.screener.in/guides/creating-screens/" className="text-indigo-600 text-sm mt-4">Detailed guide on creating screens</a>
              </div>
            </div>
            
            {error && (
              <div className="mt-2 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-x-3 items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Only companies with Sep 2024 results</span>
            </label>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none flex items-center justify-center space-x-3"
              onClick={filterStocks}
            >
              <FontAwesomeIcon icon={faPlay} className="text-xs" />
              <span>RUN THIS QUERY</span>
            </button>

            <button 
              className="w-full sm:w-auto px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-3 border border-slate-300 rounded-lg text-sm"
            >
              <FontAwesomeIcon icon={faBottleWater} className="text-sm" />
              <span>SHOW ALL RATIOS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
      {
        filteredStocks.length>0 && <BottomBar/>
      }
    </div>
  );
};

export default StockScreener;