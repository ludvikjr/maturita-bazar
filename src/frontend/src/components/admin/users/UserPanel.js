import React, { useEffect, useState } from "react";

import axios from "axios";

import Loader from "../../Loader";

import "../../../resources/style/UserPanel.css";

/**
 * Users tab of admin panel
 * @returns Users tab
 */
export default function UserPanel() {
  const [users, setUsers] = useState(null);

  /**
   * GET request for users
   */
  const getUsers = async () => {
    try {
      const result = await axios({
        method: "get",
        url: "/api/users/",
      });
      setUsers(result.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  /**
   * If users are not loaded, return Loader
   */
  if (!users) return <Loader />;

  /**
   * Makes table row for each user
   */
  const userList = users.map((user) => {
    return (
      <tr onClick={() => (window.location = `/profile/${user.username}`)}>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.userType}</td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>User Type</th>
        </thead>
        <tbody>{userList}</tbody>
      </table>
    </div>
  );
}
