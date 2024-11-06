import { useCallback, useState } from "react";

export const StockTable = ({stocks} : {stocks : any[]}) => {
    
  return <div>
    {stocks.map(stock => {
        return (
            stock.Ticker
        )
    })}
  </div>;
};
