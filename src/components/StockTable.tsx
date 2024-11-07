import { faArrowDown, faArrowUp, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

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
}

export const StockTable = ({ stocks }: { stocks: Stock[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const totalPages = Math.ceil(stocks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(2);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(2);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-lg shadow w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Query Results</h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-sm font-medium">SAVE THIS QUERY</span>
          </button>
        </div>
        
        <div className="px-6 py-2 border-b flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {stocks.length} results found: Showing page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button className="border rounded px-4 py-1.5 text-sm text-gray-700 flex items-center gap-1">
              INDUSTRY
            </button>
            <button className="border rounded px-4 py-1.5 text-sm text-gray-700 flex items-center gap-1">
              EXPORT
            </button>
            <button className="border border-indigo-600 rounded px-4 py-1.5 text-sm text-indigo-600 flex items-center gap-1">
              EDIT COLUMNS
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticker</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">CMP Rs.</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">P/E</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Mar Cap Rs.Cr.</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Div Yld %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">NP Qtr Rs.Cr.</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qtr Profit Var %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ROE %</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((stock, index) => (
                <tr key={stock.Ticker} className={index % 2 === 1 ? 'bg-[#F8F8FC]' : ''}>
                  <td className="px-6 py-2 text-sm text-gray-500">
                    {indexOfFirstItem + index + 1}.
                  </td>
                  <td className="px-6 py-2">
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-900">
                      {stock.Ticker}
                    </a>
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900 text-right">
                    {stock["Market Capitalization (B)"].toFixed(2)}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900 text-right">
                    {stock.P["E Ratio"].toFixed(2)}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900 text-right">
                    {(stock["Market Capitalization (B)"] * 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900 text-right">
                    {stock["Dividend Yield (%)"].toFixed(2)}
                  </td>
                  <td className="px-6 py-2 text-right">
                    <div className="flex items-center justify-end">
                      {stock["Revenue Growth (%)"] > 0 ? (
                        <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                      )}
                      <span className={`text-sm ${stock["Revenue Growth (%)"] > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock["Revenue Growth (%)"].toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-right">
                    <div className="flex items-center justify-end">
                      {stock["EPS Growth (%)"] > 0 ? (
                        <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                      )}
                      <span className={`text-sm ${stock["EPS Growth (%)"] > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock["EPS Growth (%)"].toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-right">
                    <div className="flex items-center justify-end">
                      {stock["ROE (%)"] > 0 ? (
                        <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                      )}
                      <span className={`text-sm ${stock["ROE (%)"] > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock["ROE (%)"].toFixed(2)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-2 flex justify-between items-center border-t">
          <div className="flex items-center space-x-2">
            {renderPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => page !== '...' && setCurrentPage(Number(page))}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? 'bg-indigo-100 text-indigo-600'
                    : page === '...'
                    ? 'text-gray-500 cursor-default'
                    : 'text-gray-600 hover:bg-gray-100'
                } text-sm`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100 flex items-center"
            >
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Results per page</span>
            <div className="flex rounded-lg overflow-hidden border">
              {[10, 25, 50].map((value) => (
                <button
                  key={value}
                  onClick={() => setItemsPerPage(value)}
                  className={`px-4 py-1 text-sm ${
                    itemsPerPage === value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTable;