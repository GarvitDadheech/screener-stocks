interface Stock {
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
export const filterLogic = (query: string, stocks: Stock[]): Stock[] => {
    let str: string = query.toLowerCase().trim().replace(/\s+/g, "");
    let a: string[] = [];
    let b: string[] = [];
    let c: number[] = [];
    let d: string[] = [];
    let temp: string[] = [
      "marketcapitalization",
      "p/eratio",
      "debttoequityratio",
      "peratio",
      "roe",
      "debt-to-equityratio",
      "dividendyield",
      "revenuegrowth",
      "epsgrowth",
      "currentratio",
      "grossmargin",
    ];
  
    if (validate(str)) {
    str = str.replace(/%/g, "");
      // Regular expression to match the pattern: word followed by a comparison operator, number, and logical operator (and/or)
      const regex: RegExp = /([a-zA-Z\s]+)([<>=])(\d+(\.\d+)?)%?(?=and|or|$)/g;
        console.log(a,b,c,d);
      // Split by 'and'/'or' while matching other parts
      const parts: string[] = str.split(/(and|or)/).map((part) => part.trim());
  
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          const part = parts[i];
          const conditionMatch = /([a-zA-Z\s]+)([<>=])(\d+(\.\d+)?)%?/.exec(part);
          if (conditionMatch && !temp.includes(conditionMatch[1].toLowerCase())) {
            throw new Error(`Invalid field: ${conditionMatch[1]} is not allowed`);
          }
          if (conditionMatch) {
            a.push(conditionMatch[1].toLowerCase()); // Word before the operator
            b.push(conditionMatch[2]); // Comparison operator
            c.push(parseFloat(conditionMatch[3])); // Numeric value (convert to float)
          }
        }
        if (i % 2 === 1 && parts[i]) {
          d.push(parts[i]); // 'and' or 'or'
        }
      }
    } else {
      throw new Error("Invalid query format");
    }
  
    const filteredStocks: Stock[] = stocks.filter((stock) => {
      let isValid = true;
  
      // Loop over each condition and apply it sequentially
      for (let i = 0; i < a.length; i++) {
        const field = a[i];
        const operator = b[i];
        const value = c[i];
  
        // Get stock value based on field name
        let stockValue: number | undefined;
        switch (field) {
          case "marketcapitalization":
            stockValue = stock["Market Capitalization (B)"];
            break;
          case "p/eratio":
            stockValue = stock["P"]["E Ratio"];
            break;
            case "peratio":
            stockValue = stock["P"]["E Ratio"];
            break;  
          case "roe":
            stockValue = stock["ROE (%)"];
            break;
          case "debt-to-equityratio":
            stockValue = stock["Debt-to-Equity Ratio"];
            break;
            case "debttoequityratio":
            stockValue = stock["Debt-to-Equity Ratio"];
            break;
          case "dividendyield":
            stockValue = stock["Dividend Yield (%)"];
            break;
          case "revenuegrowth":
            stockValue = stock["Revenue Growth (%)"];
            break;
          case "epsgrowth":
            stockValue = stock["EPS Growth (%)"];
            break;
          case "currentratio":
            stockValue = stock["Current Ratio"];
            break;
          case "grossmargin":
            stockValue = stock["Gross Margin (%)"];
            break;
          default:
            throw new Error(`Invalid field: ${field}`);
        }
  
        // Evaluate condition based on the operator
        let conditionMet = false;
        if (operator === '>') {
          conditionMet = typeof stockValue === 'number' && stockValue > value;
        } else if (operator === '<') {
          conditionMet = typeof stockValue === 'number' && stockValue < value;
        } else if (operator === '=') {
          conditionMet = stockValue === value;
        }
  
        // Combine conditions with AND and OR logic
        if (i === 0) {
          isValid = conditionMet; // Initialize with the first condition
        } else {
          const logicalOp = d[i - 1];
          if (logicalOp === 'and') {
            isValid = isValid && conditionMet;
          } else if (logicalOp === 'or') {
            isValid = isValid || conditionMet;
          }
        }
  
        // If at any point isValid is false with 'and', break out early
        if (!isValid && d[i - 1] === 'and') {
          break;
        }
      }
  
      return isValid;
    });
  
    return filteredStocks;
  };
  
  function validate(str: string): boolean {
    const pattern = /^([a-zA-Z]+)([<>=])(\d+(\.\d+)?%?)(and|or)?$/;

    const parts = str.split(/(and|or)/).map((part) => part.trim());

    if (parts.length % 2 === 0) {
        return false;
    }

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            const conditionMatch = /^([a-zA-Z]+)([<>=])(\d+(\.\d+)?)(%?)$/.exec(parts[i]);
            if (!conditionMatch) {
                return false;
            }
            const percentageSign = conditionMatch[5];
            if (percentageSign && !conditionMatch[3]) {
                return false;
            }
        } else if (parts[i] !== 'and' && parts[i] !== 'or') {
            return false;
        }
    }
    return true;
}