import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, setPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className={styles.pageNumber}>Page {page}</span>
      <button
        className={styles.pageButton}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
