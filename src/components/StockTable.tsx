import { Stock } from "../types/Stock";
import { usePagination } from "../hooks/usePagination";
import PaginationControls from "./PaginationControls";
import StockRow from "./StockRow";
import TableHeaderInfo from "./TableHeaderInfo";
import TableFields from "./TableFields";
import { useState } from "react";

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

  const [sortField, setSortField] = useState<keyof Stock | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Stock) => {
    if (field === "P/E Ratio") {
      field = "P.E Ratio";
    }

    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = sortField
    ? [...stocks].sort((a, b) => {
        if (sortField === "P.E Ratio") {
          if (a.P["E Ratio"] < b.P["E Ratio"])
            return sortDirection === "asc" ? -1 : 1;
          if (a.P["E Ratio"] > b.P["E Ratio"])
            return sortDirection === "asc" ? 1 : -1;
        } else {
          if (a[sortField] < b[sortField])
            return sortDirection === "asc" ? -1 : 1;
          if (a[sortField] > b[sortField])
            return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : stocks;
  const currentData =
    sortedData.length === 1
      ? sortedData
      : sortedData.slice(
          currentItems.indexOfFirstItem,
          currentItems.indexOfLastItem
        );

  return (
    <div className="w-full mb-5">
      <div className="bg-white w-full rounded-xl flex flex-col">
        <TableHeaderInfo
          totalResults={sortedData.length}
          currentPage={currentPage}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <TableFields
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </thead>
            <tbody>
              {currentData.map((stock, index) => (
                <>
                  {index > 0 && index % 15 === 0 && (
                    <TableFields
                      key={`header-${index}`}
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                    />
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
