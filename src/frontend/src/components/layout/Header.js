import React from "react";
import "../../resources/style/Header.css";
import { Link } from "react-router-dom";

/**
 * Header with navbar
 * @returns Header of the page
 */
export default function Header() {
  /**
   * Checks if user didn't expire
   * @returns username
   */
  const getUsername = () => {
    try {
      const username = localStorage.getItem("username");
      const expiry = localStorage.getItem("expiry");

      if (!username) {
        return null;
      }

      const now = new Date();
      if (now.getTime() > expiry) {
        localStorage.removeItem("username");
        return null;
      }
      return username;
    } catch (err) {
      console.log(err);
    }
  };

  const username = getUsername();
  const userType = localStorage.getItem("userType");

  /**
   * If user is not logged in
   */
  const defaultView = (
    <nav className=" navbar has-background-white-bis">
      <div className="navbar-brand">
        <img src="../../resources/logo.png" alt="" />
        <div
          onClick={() => {
            document.getElementById("nav-list").classList.toggle("is-active");
          }}
          className="navbar-burger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="nav-list" className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/about">
            About
          </Link>

          <div className="navbar-item">
            <div className="field is-grouped">
              <Link
                id="signup"
                className="button has-text-navy-blue"
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="has-background-navy-blue has-text-white button"
                to="/signin"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  /**
   * If user is logged in
   */
  const loggedView = (
    <nav className=" navbar has-background-white-bis">
      <div className="navbar-brand">
        <img src="../../resources/logo.png" alt="" />
        <div
          onClick={() => {
            document.getElementById("nav-list").classList.toggle("is-active");
          }}
          className="navbar-burger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="nav-list" className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link
            className="navbar-item"
            to={{
              pathname: `/profile/${username}`,
              username: username,
            }}
          >
            Profile
          </Link>
          <Link className="navbar-item" to="/sell">
            Sell
          </Link>
          {userType === "admin" || userType === "superadmin" ? (
            <Link className="navbar-item" to="/admin/cats">
              Administration
            </Link>
          ) : null}

          <div className="navbar-item">
            <div className="field is-grouped">
              <button
                className="button has-background-navy-blue has-text-white"
                onClick={() => {
                  localStorage.removeItem("username");
                  window.location = "/";
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return <div className="container">{username ? loggedView : defaultView}</div>;
}
