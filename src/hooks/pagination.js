import { useState } from "react";

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const firstPage = () => setPage(1);

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = (totalPages) => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const lastPage = (totalPages) => {
    setPage(totalPages);
  };

  return {
    page,
    setPage,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
  };
};

export default usePagination;