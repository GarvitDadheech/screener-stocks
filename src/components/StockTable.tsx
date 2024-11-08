import { faArrowDown, faArrowUp, faChevronLeft, faChevronRight, faCloud, faFileExport, faFilter, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Stock} from '../types/Stock'
import { usePagination } from '../hooks/usePagination';

export const StockTable = ({ stocks }: { stocks: Stock[] }) => {
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    currentItems,
    renderPageNumbers,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination(stocks.length); 

  const currentData = stocks.slice(currentItems.indexOfFirstItem, currentItems.indexOfLastItem);


  return (
    <div className="w-full mb-5">
      <div className="bg-white  w-full rounded-xl flex flex-col">
        <div className="flex justify-between items-center p-6 pb-5">
          <h2 className="text-4xl font-medium text-gray-800">Query Results</h2>
          <button className="bg-[#645DF9] text-white px-4 py-2 rounded-lg flex items-center gap-1">
            <FontAwesomeIcon icon={faCloud}/>
            <span className="text-[0.9rem] font-medium font-sans p-1 tracking-wider">SAVE THIS QUERY</span>
          </button>
        </div>
        
        <div className="px-6 py-2 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {stocks.length} results found: Showing page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button className="border rounded px-4 py-1.5 text-xs text-gray-500 flex items-center gap-x-3 font-semibold">
              <FontAwesomeIcon icon={faFilter} className='text-sm'/>
              INDUSTRY
            </button>
            <button className="border rounded px-4 py-1.5 text-xs text-gray-500 flex items-center gap-x-3 font-semibold">
            <FontAwesomeIcon icon={faFileExport} className='text-sm'/>
              EXPORT
            </button>
            <button className="border border-indigo-600 rounded px-4 py-1.5 text-xs text-indigo-600 flex items-center gap-x-3 font-semibold">
              <FontAwesomeIcon icon={faGear} className='text-sm'/>
              EDIT COLUMNS
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-1 text-left text-[12.5px] font-medium text-indigo-600">S.No.</th>
                <th className="px-6 py-1 text-left text-[12.5px] font-medium text-indigo-600 ">Ticker</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>Mar Cap.</span> Rs. Cr.</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-indigo-600 ">P/E</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>Curr Ratio</span></th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>Db-to-Eq</span></th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>Div Yld</span> %</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>Gross Margin</span> %</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>Rev Grwth</span> %</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>EPS Grwth</span> %</th>
                <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 "><span className='text-indigo-600'>ROE</span> %</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((stock: Stock, index: number) => (
                <tr key={stock.Ticker} className={index % 2 === 0 ? 'bg-[#F8F8FC]' : ''}>
                  <td className="px-6 py-1 text-[12.5px]">
                    {currentItems.indexOfFirstItem + index + 1}.
                  </td>
                  <td className="px-6 py-1">
                    <a href="#" className="text-[12.5px] text-indigo-600 hover:text-indigo-900 font-light">
                      {stock.Ticker}
                    </a>
                  </td>
                  <td className="px-6 text-[12.5px] text-gray-900 text-right">
                    {stock["Market Capitalization (B)"].toFixed(2)}
                  </td>
                  <td className="px-6 py-1 text-[12.5px] text-gray-900 text-right">
                    {stock.P["E Ratio"].toFixed(2)}
                  </td>
                  <td className="px-6 py-1 text-[12.5px] text-gray-900 text-right">
                    {(stock["Current Ratio"].toFixed(2))}
                  </td>
                  <td className="px-6 py-1 text-[12.5px] text-gray-900 text-right">
                    {stock["Debt-to-Equity Ratio"].toFixed(2)}
                  </td>
                  <td className="px-6 py-1 text-[12.5px] text-gray-900 text-right">
                    {stock["Dividend Yield (%)"].toFixed(2)}
                  </td>
                  <td className="px-6 py-1 text-[12.5px] text-gray-900 text-right">
                    {stock["Gross Margin (%)"].toFixed(2)}
                  </td>
                  <td className="px-6 py-1 text-right">
                    <div className="flex items-center justify-end">
                      {stock["Revenue Growth (%)"] > 0 ? (
                        <FontAwesomeIcon icon={faArrowUp} className="text-xs mr-1" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} className="text-xs mr-1" />
                      )}
                      <span className={`text-[12.5px] ${stock["Revenue Growth (%)"] > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock["Revenue Growth (%)"].toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-1 text-right">
                    <div className="flex items-center justify-end">
                      {stock["EPS Growth (%)"] > 0 ? (
                        <FontAwesomeIcon icon={faArrowUp} className="text-xs mr-1" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} className="text-xs mr-1" />
                      )}
                      <span className={`text-[12.5px] ${stock["EPS Growth (%)"] > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock["EPS Growth (%)"].toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-1 text-right">
                    <div className="flex items-center justify-end">
                      {stock["ROE (%)"] > 0 ? (
                        <FontAwesomeIcon icon={faArrowUp} className="text-xs mr-1" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDown} className="text-xs mr-1" />
                      )}
                      <span className={`text-[12.5px] ${stock["ROE (%)"] > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock["ROE (%)"].toFixed(2)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-2 flex justify-between items-center  mt-7 ">
          <div className="flex items-center  border border-slate-300  rounded-md h-full">
              {currentPage != 1 && <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-x-2 text-sm"
              >
                <FontAwesomeIcon icon={faChevronLeft} className='text-xs'/>
                Previous
              </button>}
            {renderPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => page !== '...' && setCurrentPage(Number(page))}
                className={`px-5 py-2  ${
                  page === currentPage
                    ? 'bg-indigo-100 text-indigo-600'
                    : page === '...'
                    ? 'text-gray-500 cursor-default'
                    : 'text-gray-600 hover:bg-gray-100'
                } text-[12.5px]`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-x-2 text-sm"
            >
              Next <FontAwesomeIcon icon={faChevronRight} className='text-xs'/>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Results per page</span>
            <div className="flex rounded-md overflow-hidden border border-slate-300">
              {[10, 25, 50].map((value) => (
                <button
                  key={value}
                  onClick={() => setItemsPerPage(value)}
                  className={`px-4 py-2 text-sm ${
                    itemsPerPage === value
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  } text-[12.5px]` }
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