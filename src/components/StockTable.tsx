import { faArrowDown, faArrowUp, faCloud, faFileExport, faFilter, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Stock} from '../types/Stock'
import { usePagination } from '../hooks/usePagination';
import PaginationControls from './PaginationControls';
import StockRow from './StockRow';

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
              {currentData.map((stock, index) => (
                <StockRow key={stock.Ticker} stock={stock} index={index} currFirstIndex={currentItems.indexOfFirstItem}/>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          renderPageNumbers={renderPageNumbers}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default StockTable;