import {Stock} from '../types/Stock'
import { usePagination } from '../hooks/usePagination';
import PaginationControls from './PaginationControls';
import StockRow from './StockRow';
import TableHeaderInfo from './TableHeaderInfo';

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
        <TableHeaderInfo totalResults={stocks.length} currentPage={currentPage} />
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