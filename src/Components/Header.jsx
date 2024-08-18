import React from "react";
import styles from "./Header.module.css";

const Header = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>User Dashboard</h1>
      <input
        type="text"
        placeholder="Search by user ID..."
        className={styles.searchInput}
        onChange={handleInputChange}
      />
    </header>
  );
};

export default Header;
