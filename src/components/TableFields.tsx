import { SortDirection } from "../types/Props";
import { Stock } from "../types/Stock";
const TableFields = ({
  onSort,
  sortField,
  sortDirection,
}: {
  onSort: (field: keyof Stock) => void;
  sortField: keyof Stock | null;
  sortDirection: SortDirection;
}) => (
  <tr className="border-b">
    <th className="px-6 py-1 text-left text-[12.5px] font-medium text-indigo-600">
      S.No.
    </th>
    <th className="sticky left-0 px-6 py-1 text-left text-[12.5px] font-medium text-indigo-600 bg-white z-20">
      Ticker
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("Market Capitalization (B)")}
    >
      <span className="text-indigo-600">Mar Cap.</span> Rs. Cr.
      {sortField === "Market Capitalization (B)" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("P/E Ratio")}
    >
      <span className="text-indigo-600">P/E</span>
      {sortField === "P.E Ratio" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("Current Ratio")}
    >
      <span className="text-indigo-600">Curr Ratio</span>
      {sortField === "Current Ratio" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("Debt-to-Equity Ratio")}
    >
      <span className="text-indigo-600">Db-to-Eq</span>
      {sortField === "Debt-to-Equity Ratio" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("Dividend Yield (%)")}
    >
      <span className="text-indigo-600">Div Yld</span> %
      {sortField === "Dividend Yield (%)" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("Gross Margin (%)")}
    >
      <span className="text-indigo-600">Gross Margin</span> %
      {sortField === "Gross Margin (%)" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("Revenue Growth (%)")}
    >
      <span className="text-indigo-600">Rev Grwth</span> %
      {sortField === "Revenue Growth (%)" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("EPS Growth (%)")}
    >
      <span className="text-indigo-600">EPS Grwth</span> %
      {sortField === "EPS Growth (%)" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
    <th
      className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500 cursor-pointer"
      onClick={() => onSort("ROE (%)")}
    >
      <span className="text-indigo-600">ROE</span> %
      {sortField === "ROE (%)" && (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
  </tr>
);

export default TableFields;
