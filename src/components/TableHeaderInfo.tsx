import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faFilter, faFileExport, faGear } from '@fortawesome/free-solid-svg-icons';
import { TableHeaderProps } from '../types/Props';

const TableHeaderInfo = ({ totalResults, currentPage }: TableHeaderProps) => {
  return (
    <div className="w-full mb-5">
      <div className="bg-white w-full rounded-xl flex flex-col">
        <div className="flex justify-between items-center p-6 pb-5">
          <h2 className="text-4xl font-medium text-gray-800">Query Results</h2>
          <button className="bg-[#645DF9] text-white px-4 py-2 rounded-lg flex items-center gap-1">
            <FontAwesomeIcon icon={faCloud} />
            <span className="text-[0.9rem] font-medium font-sans p-1 tracking-wider">SAVE THIS QUERY</span>
          </button>
        </div>

        <div className="px-6 py-2 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {totalResults} results found: Showing page {currentPage}
          </span>
          <div className="flex gap-3">
            <button className="border rounded px-4 py-1.5 text-xs text-gray-500 flex items-center gap-x-3 font-semibold">
              <FontAwesomeIcon icon={faFilter} className="text-sm" />
              INDUSTRY
            </button>
            <button className="border rounded px-4 py-1.5 text-xs text-gray-500 flex items-center gap-x-3 font-semibold">
              <FontAwesomeIcon icon={faFileExport} className="text-sm" />
              EXPORT
            </button>
            <button className="border border-indigo-600 rounded px-4 py-1.5 text-xs text-indigo-600 flex items-center gap-x-3 font-semibold">
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
