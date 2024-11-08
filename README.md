# Stock Screening Tool Documentation

## Overview

The **Stock Screening Tool** is a web-based application that allows users to filter and view stocks based on a variety of criteria. Inspired by the "Create New Screen" feature on Screener.in, the application replicates the functionality and user experience of creating custom stock screens, focusing on delivering a seamless, intuitive, and powerful stock screening tool.

This tool allows users to input a series of filters in a query format to view stocks that meet their selected conditions. The application supports **AND** and **OR** logical operators, enabling users to fine-tune their stock searches based on multiple parameters.

## Features

- **Filter Criteria Input**: Users can input filter conditions in a query-like format, supporting parameters like Market Capitalization, P/E Ratio, ROE, and more.
- **AND/OR Logic**: Allows for flexible screening based on both AND-only and OR-based conditions.
- **Sorting**: Stocks can be sorted based on each parameter, including Market Capitalization, P/E Ratio, ROE, etc.
- **Pagination**: Results are paginated to display up to 10, 25 or 50 stocks per page.
- **Responsive Design**: The user interface is fully responsive and adapts seamlessly to both desktop and mobile devices.

## Tech Stack

The following technologies were used to build the Stock Screening Tool:

- **Frontend**: React.js
- **CSS Framework**: TailwindCSS
- **Deployment**: Vercel

## Getting Started

To get started with the Stock Screening Tool, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/GarvitDadheech/screener-stocks.git
   cd screener-stocks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Functionality

### User Interface

- **Filter Inputs**: Users can input conditions in the following format:
  
  ```
  Market Capitalization > 10000 AND
  ROE > 15 AND
  P/E Ratio < 20
  ```

  Each filter condition can use the following operators:
  - `>` Greater than
  - `<` Less than
  - `=` Equal to

  The filters are entered sequentially, and each condition must be met for a stock to be included in the results.

- **Logical Operators**: 
  - **AND**: All conditions must be met.
  - **OR**: At least one condition must be met (optional in advanced scenarios).

### Screening Logic

- **Stock Evaluation**: Stocks are evaluated based on the specified criteria.
- **Filter Matching**: The filters are applied in real-time, showing only the stocks that meet all conditions specified by the user.

### Results Display

- **Tabular Format**: Stocks that meet the filter criteria are displayed in a table, with columns for each of the 9 parameters.
- **Sorting**: Users can sort the results by any of the 9 parameters.
- **Pagination**: User can apply pagination according to its need.
### Sorting

- **Sorting by Parameter**: The following columns are sortable:
  - Market Capitalization
  - P/E Ratio
  - ROE
  - Debt-to-Equity Ratio
  - Dividend Yield
  - Revenue Growth
  - EPS Growth
  - Current Ratio
  - Gross Margin

### Responsive Design

The application is designed to work seamlessly across both desktop and mobile devices. The layout adjusts based on the screen size to ensure optimal usability on all devices.

### Example Queries

Here are some examples of how users can create queries using the Stock Screening Tool:

#### Query 1: Large Cap Growth Stocks
```
Market Capitalization > 10000 AND
ROE > 15 AND
EPS Growth > 10
```
- **Expected Result**: Stocks with a market capitalization over 10,000 billion, ROE above 15%, and EPS growth greater than 10%.

#### Query 2: Dividend Value Stocks
```
Dividend Yield > 2 AND
P/E Ratio < 20 AND
Debt-to-Equity Ratio < 1
```
- **Expected Result**: Stocks with a dividend yield above 2%, a P/E ratio below 20, and a debt-to-equity ratio under 1.

#### Query 3: High Liquidity Stocks
```
Current Ratio > 2 AND
Gross Margin > 40
```
- **Expected Result**: Stocks with a current ratio above 2 and a gross margin greater than 40%.


## Testing

The application includes the following test cases to ensure the functionality of the stock screening tool:

### Test 1: Valid Query with AND Operator
- **Input**: 
  ```
  Market Capitalization > 10000 AND
  ROE > 15 AND
  P/E Ratio < 20
  ```
- **Expected Output**: Stocks that meet all three conditions are returned, with no errors.

### Test 2: Valid Query with OR Operator
- **Input**: 
  ```
  Market Capitalization > 10000 OR
  ROE > 15
  ```
- **Expected Output**: Stocks that meet either of the two conditions are returned, correctly handling the OR logic.

### Test 3: Invalid Query
- **Input**: 
  ```
  Market Capitalization > 10000 AND
  ROE > 15 AND
  ```
- **Expected Output**: An error message is displayed, indicating the invalid query.

### Test 4: Sorting Functionality
- **Input**: Apply filters and sort by Market Capitalization.
- **Expected Output**: The table should be sorted correctly based on the selected parameter.

### Test 5: Pagination Functionality
- **Input**: Apply pagination according to input.
- **Expected Output**: The results should be paginated into multiple pages, with desired results per page.

## Deployment

The Stock Screening Tool is deployed and can be accessed via the following link:

[Live Demo](https://screener-stocks.vercel.app/)

## Conclusion

This Stock Screening Tool provides a user-friendly, responsive platform for screening stocks based on a wide range of financial parameters. The tool implements powerful filtering functionality, a clean user interface, and various advanced features like sorting, pagination, and logical operators. The deployment of this tool makes it a fully functional stock screening solution suitable for investors to evaluate potential investments.