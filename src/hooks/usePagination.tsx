import { useState } from 'react';

export const usePagination = (totalItems: number, initialItemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current items to be shown on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = { indexOfFirstItem, indexOfLastItem };

  // Function to render page numbers
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(2);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(2);
        pages.push('...');
        pages.push(currentPage - 3);
        pages.push(currentPage - 2);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(currentPage + 2);
        pages.push(currentPage + 3);
        pages.push('...');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Pagination button logic
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);  // Reset to page 1 when items per page changes
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    currentItems,
    renderPageNumbers,
    setCurrentPage: handlePageChange,
    setItemsPerPage: handleItemsPerPageChange,
  };
};
