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
  }
  function validate(str: string): boolean {
    const pattern = /^([a-zA-Z\s\/\-]+)([<>=])(-?[a-zA-Z0-9]+(\.\d+)?%?)(and|or)?$/;

    const parts = str.split(/(and|or)/).map((part) => part.trim());

    if (parts.length % 2 === 0) {
        return false;
    }

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            const conditionMatch = /^([a-zA-Z\s\/\-]+)([<>=])(-?[a-zA-Z0-9]+(\.\d+)?)(%?)$/.exec(parts[i]);
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

export const filterLogic = (query: string, stocks: Stock[]): Stock[] => {
    let str: string = query.toLowerCase().trim().replace(/\s+/g, "");
    let a: string[] = [];
    let b: string[] = [];
    let c: (string | number)[] = [];
    let d: string[] = [];
    let numericFields = [
        "marketcapitalization",
        "p/eratio",
        "peratio",
        "debttoequityratio",
        "debt-to-equityratio",
        "roe",
        "dividendyield",
        "revenuegrowth",
        "epsgrowth",
        "currentratio",
        "grossmargin",
    ];

    if (validate(str)) {
        str = str.replace(/%/g, "");

        // Adjust regex to capture all matches at once
        const regex: RegExp = /([a-zA-Z\s\/\-]+)([<>=])([-]?[a-zA-Z0-9]+(\.\d+)?)/g;

        // Split into condition parts and operators
        const parts = str.split(/(and|or)/).map((part) => part.trim());

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) { // This is a condition part
                const part = parts[i];
                const matches = [...part.matchAll(regex)]; // Get all matches for conditions

                for (const match of matches) {
                    const field = match[1].replace(/\s+/g, "").toLowerCase();
                    const operator = match[2];
                    const value = numericFields.includes(field)
                        ? parseFloat(match[3])
                        : match[3]; // Parse as float if numeric field

                    a.push(field);
                    b.push(operator);
                    c.push(value);
                }
            } else if (parts[i]) { // This is an operator part
                d.push(parts[i]);
            }
        }
    } else {
        throw new Error("Invalid query format");
    }

    let results: Stock[] = []; // Final result

    for (let i = 0; i < a.length; i++) {
        const field = a[i];
        const operator = b[i];
        let value = c[i];
        if (field === 'ticker') {
            value = value.toString().toUpperCase();
        }
        // Define filtering function based on condition
        const filterCondition = (stock: Stock) => {
            let stockValue: any;
            switch (field) {
                case "marketcapitalization":
                    stockValue = stock["Market Capitalization (B)"];
                    break;
                case "p/eratio":
                case "peratio":
                    stockValue = stock["P"]["E Ratio"];
                    break;
                case "ticker":
                    stockValue = stock["Ticker"].toUpperCase();
                    break;
                case "roe":
                    stockValue = stock["ROE (%)"];
                    break;
                case "debttoequityratio":
                case "debt-to-equityratio":
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

            // Apply comparison operator
            if (typeof value === 'number') {
                if (operator === '>') return stockValue > value;
                if (operator === '<') return stockValue < value;
                return stockValue === value;
            } else {
                return operator === '=' && stockValue === value;
            }
        };
        // Apply logic based on the previous operator (AND or OR)
        if (i === 0 || d[i - 1] === 'or') {
            // OR Logic: Filter from full stocks array
            const newResults = stocks.filter(filterCondition);
            results = [...new Set([...results, ...newResults])];
        } else if (d[i-1] === 'and') {
            // AND Logic: Filter within current result set
            results = results.filter(filterCondition);
        }
    }
    console.log(a,b,c,d);
    if(results.length==0) {
        throw new Error("No such record found!");
    }
    return results;
};
