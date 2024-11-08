const TableFields = () => (
  <tr className="border-b">
    <th className="px-6 py-1 text-left text-[12.5px] font-medium text-indigo-600">
      S.No.
    </th>
    <th className="sticky left-0 px-6 py-1 text-left text-[12.5px] font-medium text-indigo-600 bg-white z-20">
      Ticker
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">Mar Cap.</span> Rs. Cr.
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-indigo-600">
      P/E
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">Curr Ratio</span>
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">Db-to-Eq</span>
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">Div Yld</span> %
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">Gross Margin</span> %
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">Rev Grwth</span> %
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">EPS Grwth</span> %
    </th>
    <th className="px-6 py-1 text-right text-[12.5px] font-medium text-gray-500">
      <span className="text-indigo-600">ROE</span> %
    </th>
  </tr>
);

export default TableFields;
