export interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    renderPageNumbers: () => (string | number)[];
    setItemsPerPage: (value: number) => void;
    itemsPerPage: number;
}

export interface StockRowProps {
    stock: Stock;
    index: number;
    currFirstIndex : number;
}

export interface TableHeaderProps {
    totalResults: number;
    currentPage: number;
}

export interface StockQueryFormProps {
    onFilterStocks: (query: string) => void;
    error: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    query: string;
}