import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { StockRowProps } from "../types/Props";

const StockRow = ({ stock, index, currFirstIndex }: StockRowProps) => {
  return (
    <tr key={stock.Ticker} className={index % 2 === 0 ? "bg-[#F8F8FC]" : ""}>
      <td className="px-6 py-1 text-[12.5px]">{currFirstIndex + index + 1}.</td>
      <td
        className="px-6 py-1 text-[12.5px] text-indigo-600 font-light"
        style={{
          position: "sticky",
          left: 0,
          backgroundColor: index % 2 === 0 ? "#F8F8FC" : "white",
          zIndex: 20,
        }}
      >
        <a href="#" className="hover:text-indigo-900">
          {stock.Ticker}
        </a>
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        {stock["Market Capitalization (B)"].toFixed(2)}
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        {stock.P["E Ratio"].toFixed(2)}
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        {stock["Current Ratio"].toFixed(2)}
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        {stock["Debt-to-Equity Ratio"].toFixed(2)}
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        {stock["Dividend Yield (%)"].toFixed(2)}
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        {stock["Gross Margin (%)"].toFixed(2)}
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        <div className="flex items-center justify-end">
          {stock["Revenue Growth (%)"] > 0 ? (
            <FontAwesomeIcon icon={faArrowUp} className="text-xs mr-1" />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} className="text-xs mr-1" />
          )}
          <span
            className={`text-[12.5px] ${
              stock["Revenue Growth (%)"] > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {stock["Revenue Growth (%)"].toFixed(2)}
          </span>
        </div>
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        <div className="flex items-center justify-end">
          {stock["EPS Growth (%)"] > 0 ? (
            <FontAwesomeIcon icon={faArrowUp} className="text-xs mr-1" />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} className="text-xs mr-1" />
          )}
          <span
            className={`text-[12.5px] ${
              stock["EPS Growth (%)"] > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock["EPS Growth (%)"].toFixed(2)}
          </span>
        </div>
      </td>
      <td className="px-6 py-[6px] text-right text-[12.5px] text-gray-900">
        <div className="flex items-center justify-end">
          {stock["ROE (%)"] > 0 ? (
            <FontAwesomeIcon icon={faArrowUp} className="text-xs mr-1" />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} className="text-xs mr-1" />
          )}
          <span
            className={`text-[12.5px] ${
              stock["ROE (%)"] > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock["ROE (%)"].toFixed(2)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default StockRow;
