import { faBottleWater, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StockTable } from "./StockTable";
import stocks from '../stocks.json'
import { useState } from "react";

interface Stock {
  Ticker: string;
  "Market Capitalization (B)": number;
  P: {
    "E Ratio": number;
  };
  "ROE (%)": number;
  "Debt-to-Equity Ratio": number;
  "Dividend Yield (%)": number;
  "Revenue Growth (%)": number;
  "EPS Growth (%)": number;
  "Current Ratio": number;
  "Gross Margin (%)": number;
  [key: string]: any;
}

interface Condition {
  field: string;
  operator: string;
  value: number;
}

const VALID_FIELDS = [
  'Market Capitalization (B)',
  'P/E Ratio',
  'ROE (%)',
  'Debt-to-Equity Ratio',
  'Dividend Yield (%)',
  'Revenue Growth (%)',
  'EPS Growth (%)',
  'Current Ratio',
  'Gross Margin (%)'
] as const;

type ValidField = typeof VALID_FIELDS[number];

const StockScreener: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [includeSepResults, setIncludeSepResults] = useState<boolean>(false);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string>('');

  const getStockValue = (stock: Stock, field: string): number | undefined => {
    if (field === 'P/E Ratio') {
      return stock.P?.["E Ratio"];
    }
    return stock[field] as number;
  };

  const validateAndParseCondition = (condition: string): Condition => {
    const match = condition.trim().match(/([^><!=]+)(>=|<=|>|<|=|!=)\s*(-?\d+\.?\d*)/);
    
    if (!match) {
      throw new Error(`Invalid condition format: "${condition}". Expected format: "FIELD OPERATOR VALUE"`);
    }

    const [, field, operator, value] = match;
    const normalizedField = field.trim();

    if (!VALID_FIELDS.includes(normalizedField as ValidField)) {
      throw new Error(`Invalid field: "${normalizedField}". Valid fields are: ${VALID_FIELDS.join(', ')}`);
    }

    return {
      field: normalizedField,
      operator,
      value: parseFloat(value)
    };
  };

  const evaluateCondition = (stock: Stock, condition: Condition): boolean => {
    const stockValue = getStockValue(stock, condition.field);
    
    if (stockValue === undefined || stockValue === null) {
      return false;
    }

    const numericValue = typeof stockValue === 'string' ? parseFloat(stockValue) : stockValue;

    if (isNaN(numericValue)) {
      return false;
    }

    switch (condition.operator) {
      case '>': return numericValue > condition.value;
      case '<': return numericValue < condition.value;
      case '>=': return numericValue >= condition.value;
      case '<=': return numericValue <= condition.value;
      case '=': return numericValue === condition.value;
      case '!=': return numericValue !== condition.value;
      default: return false;
    }
  };

  const filterStocks = (allStocks: Stock[]): void => {
    try {
      setError('');
      
      const cleanQuery = query.trim().replace(/\s+/g, ' ');
      
      if (!cleanQuery) {
        setFilteredStocks([]);
        return;
      }

      // Split the query into groups by OR
      const orGroups = cleanQuery.split(/\bOR\b/).map(group => group.trim());
      
      // Process each OR group
      const filtered = allStocks.filter(stock => {
        // For OR conditions, if any group evaluates to true, the stock should be included
        return orGroups.some(group => {
          // Split each OR group into AND conditions
          const andConditions = group.split(/\bAND\b/).map(condition => condition.trim());
          
          try {
            const parsedConditions = andConditions.map(validateAndParseCondition);
            
            // For AND conditions, all conditions must evaluate to true
            return parsedConditions.every(condition => evaluateCondition(stock, condition));
          } catch (err) {
            // If there's an error parsing any condition, skip this group
            return false;
          }
        });
      });

      setFilteredStocks(filtered);
      
      if (filtered.length === 0) {
        setError('No stocks match your criteria.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setFilteredStocks([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className={`mx-auto bg-white rounded-lg shadow-sm transition-all duration-300 ${
        filteredStocks.length > 0 
          ? 'w-full max-w-[1400px]' 
          : 'w-full max-w-[800px] mt-20'
      }`}>
        {filteredStocks.length > 0 && <StockTable stocks={filteredStocks} />}
        
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            {filteredStocks.length > 0 ? 'Create a Search Query' : 'Create a Stock Screen'}
          </h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Query</label>
            <div className="flex flex-col md:flex-row gap-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg min-h-[120px] resize-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full md:max-w-md focus:outline-none"
                placeholder="Enter your search query..."
              />
              <div className="w-full md:w-72 bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Query Examples</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Market capitalization &gt; 500 AND</p>
                  <p>Price to earning &gt; 15 AND</p>
                  <p>Return on capital employed &lt; 22%</p>
                </div>
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
                checked={includeSepResults}
                onChange={(e) => setIncludeSepResults(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Only companies with Sep 2024 results</span>
            </label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center space-x-3"
              onClick={() => filterStocks(stocks)}
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
  );
};

export default StockScreener;