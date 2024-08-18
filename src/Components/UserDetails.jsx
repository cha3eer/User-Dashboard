import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./UserDetails.module.css";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const cachedUser = sessionStorage.getItem(`user_${id}`);
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        } else {
          const response = await axios.get(`https://reqres.in/api/users/${id}`);
          setUser(response.data.data);
          sessionStorage.setItem(
            `user_${id}`,
            JSON.stringify(response.data.data)
          );
        }
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.userDetails}>
      {user && (
        <>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className={styles.avatar}
          />
          <h2 className={styles.name}>
            {user.first_name} {user.last_name}
          </h2>
          <p className={styles.email}>Email: {user.email}</p>
          <p className={styles.userId}>User ID: {user.id}</p>
          <Link to="/" className={styles.backLink}>
            Back to Users List
          </Link>
        </>
      )}
    </div>
  );
};

export default UserDetails;
