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