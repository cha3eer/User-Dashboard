import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserCard.module.css";

const UserCard = ({ user }) => (
  <div className={styles.userCard}>
    <img
      src={user.avatar}
      alt={`${user.first_name} ${user.last_name}`}
      className={styles.avatar}
    />
    <h3 className={styles.name}>
      {user.first_name} {user.last_name}
    </h3>
    <Link to={`/user/${user.id}`} className={styles.detailsLink}>
      View Details
    </Link>
  </div>
);

export default UserCard;
