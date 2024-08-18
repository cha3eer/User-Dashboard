import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./UsersList.module.css";

const UsersList = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const cachedUsers = sessionStorage.getItem(`users_page_${page}`);
        if (cachedUsers) {
          setUsers(JSON.parse(cachedUsers));
        } else {
          const response = await axios.get(
            `https://reqres.in/api/users?page=${page}`
          );
          setUsers(response.data.data);
          sessionStorage.setItem(
            `users_page_${page}`,
            JSON.stringify(response.data.data)
          );
        }
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const filteredUsers = users.filter((user) =>
    user.id.toString().includes(searchQuery)
  );

  const handleSearch = () => {
    if (filteredUsers.length === 0) {
      setError("No users found on this page. Please try a different page.");
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, users]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.usersList}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.userCards}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default UsersList;
