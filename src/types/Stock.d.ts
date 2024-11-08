export interface Stock {
    Ticker: string;
    "Market Capitalization (B)": number;
    P: {
      "E Ratio": number;
    };
    "ROE (%)": number;
    "Debt-to-Equity Ratio": number;
    "Dividend Yield (%)": number;
    "Revenue Growth (%)": number;
    "EPS Growth (%)": number;
    "Current Ratio": number;
    "Gross Margin (%)": number;
    [key: string]: any;
}