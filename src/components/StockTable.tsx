import { Stock } from "../types/Stock";
import { usePagination } from "../hooks/usePagination";
import PaginationControls from "./PaginationControls";
import StockRow from "./StockRow";
import TableHeaderInfo from "./TableHeaderInfo";
import TableFields from "./TableFields";

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

  const currentData = stocks.slice(
    currentItems.indexOfFirstItem,
    currentItems.indexOfLastItem
  );

  return (
    <div className="w-full mb-5">
      <div className="bg-white w-full rounded-xl flex flex-col">
        <TableHeaderInfo
          totalResults={stocks.length}
          currentPage={currentPage}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <TableFields />
            </thead>
            <tbody>
              {currentData.map((stock, index) => (
                <>
                  {index > 0 && index % 15 === 0 && (
                    <TableFields key={`header-${index}`} />
                  )}
                  <StockRow
                    key={stock.Ticker}
                    stock={stock}
                    index={index}
                    currFirstIndex={currentItems.indexOfFirstItem}
                  />
                </>
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
