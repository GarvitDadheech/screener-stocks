import { faBottleWater, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StockTable } from "./StockTable";
import stocks from '../stocks.json'
import { useState } from "react";
// types.ts
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
    [key: string]: any; // for any additional fields
  }
  
  interface Condition {
    field: string;
    operator: string;
    value: number;
  }

  
  // Valid fields matching your actual data structure
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
      // Handle special case for P/E Ratio which is nested
      if (field === 'P/E Ratio') {
        return stock.P?.["E Ratio"];
      }
      
      // Direct field access for other fields
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
        
        // Clean up the query
        const cleanQuery = query.trim().replace(/\s+/g, ' ');
        
        if (!cleanQuery) {
          setFilteredStocks([]);
          return;
        }
  
        // Split by AND/OR maintaining the operators
        const parts = cleanQuery.split(/\b(AND|OR)\b/).map(part => part.trim());
  
        if (parts.some(part => part === '')) {
          throw new Error('Invalid query format. Make sure AND/OR operators are properly used.');
        }
  
        // Validate basic structure
        if (parts.length > 1) {
          for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 1 && !['AND', 'OR'].includes(parts[i])) {
              throw new Error('Conditions must be connected with AND or OR operators.');
            }
          }
        }
  
        // Parse conditions
        const conditions = parts
          .filter((_, index) => index % 2 === 0)
          .map(validateAndParseCondition);
  
        // Filter stocks
        const filtered = allStocks.filter(stock => {
          let result = evaluateCondition(stock, conditions[0]);
          
          for (let i = 1; i < conditions.length; i++) {
            const operator = parts[i * 2];
            const nextCondition = conditions[i];
            
            if (operator === 'AND') {
              result = result && evaluateCondition(stock, nextCondition);
            } else if (operator === 'OR') {
              result = result || evaluateCondition(stock, nextCondition);
            }
          }
          
          return result;
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
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm mt-4 w-[800px]">
        {filteredStocks.length > 0 && <StockTable stocks={filteredStocks} />}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Create a Search Query</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Query</label>
            <div className="flex gap-4">
              <textarea
                value={query}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
                className="flex-1 p-3 border-2 border-gray-400 rounded-lg min-h-[120px] resize-none focus:ring-[0.01px] focus:ring-indigo-500 focus:border-indigo-500 max-w-md focus:outline-none"
                placeholder="Enter your search query..."
              />
              <div className="w-72 bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Query Examples</h3>
                
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setIncludeSepResults(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </label>
            <span className="text-sm text-gray-600">Only companies with Sep 2024 results</span>
          </div>
  
          <div className="mt-6 flex justify-between items-center">
            <button
              className="px-6 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center space-x-3"
              onClick={() => filterStocks(stocks)}
            >
              <FontAwesomeIcon icon={faPlay} className="text-xs" />
              <span>RUN THIS QUERY</span>
            </button>
  
            <button className="px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center space-x-3 border border-slate-300 rounded-lg text-sm">
              <FontAwesomeIcon icon={faBottleWater} className="text-sm" />
              <span>SHOW ALL RATIOS</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default StockScreener;