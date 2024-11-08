import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faFilter, faFileExport, faGear } from '@fortawesome/free-solid-svg-icons';
import { TableHeaderProps } from '../types/Props';

const TableHeaderInfo = ({ totalResults, currentPage }: TableHeaderProps) => {
  return (
    <div className="w-full mb-5">
      <div className="bg-white w-full rounded-xl flex-col md:flex">
        <div className="flex justify-between items-center p-6 pb-5">
          <h2 className="text-2xl md:text-4xl font-medium text-gray-800">Query Results</h2>
          <button className="bg-[#645DF9] text-white px-1 md:px-3 md:h-12 h-8 py-3 rounded-lg flex items-center gap-1">
            <FontAwesomeIcon icon={faCloud} />
            <span className="text-[0.7rem] md:text-[0.9rem] font-semibold font-sans p-1 md:p-4 tracking-wider">SAVE THIS QUERY</span>
          </button>
        </div>

        <div className="px-6 py-2 flex-col md:flex-row space-y-2 md:flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {totalResults} results found: Showing page {currentPage}
          </span>
          <div className="flex gap-2 justify-end md:justify-normal">
            <button className="border rounded px-4 py-1.5 text-xs text-gray-500 flex items-center gap-x-1 md:gap-x-3 font-semibold h-8 md:h-auto">
              <FontAwesomeIcon icon={faFilter} className="text-sm" />
              INDUSTRY
            </button>
            <button className="border rounded px-4 py-1.5 text-xs h-8 md:h-auto text-gray-500  items-center gap-x-1 md:gap-x-3 font-semibold hidden md:block">
              <FontAwesomeIcon icon={faFileExport} className="text-sm md:mr-3" />
              EXPORT
            </button>
            <button className="border border-indigo-600 rounded px-4 py-1.5 text-xs text-indigo-600 flex items-center gap-x-1 md:gap-x-3 font-semibold h-8 md:h-auto">
              <FontAwesomeIcon icon={faGear} className="text-sm" />
              EDIT COLUMNS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeaderInfo;
