import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { PaginationControlsProps } from "../types/Props";

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
  renderPageNumbers,
  setItemsPerPage,
  itemsPerPage,
}: PaginationControlsProps) => {
  return (
    <div className="px-6 py-2 flex-col md:flex-row flex space-y-5 justify-between items-center mt-7">
      <div className="flex items-center border border-slate-300 rounded-md h-full flex-wrap">
        {currentPage !== 1 && (
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-3 py-2 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-x-2 text-sm"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            Previous
          </button>
        )}

        {renderPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== "..." && setCurrentPage(Number(page))}
            className={`px-5 py-2 ${
              page === currentPage
                ? "bg-indigo-100 text-indigo-600"
                : page === "..."
                ? "text-gray-500 cursor-default"
                : "text-gray-600 hover:bg-gray-100"
            } text-[12.5px]`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          className="px-3 py-2 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-x-2 text-sm"
        >
          Next <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
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
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } text-[12.5px]`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
