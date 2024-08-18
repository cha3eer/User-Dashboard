import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import UsersList from "./Components/UsersList";
import UserDetails from "./Components/UserDetails";
import styles from "./App.module.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className={styles.appContainer}>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<UsersList searchQuery={searchQuery} />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
