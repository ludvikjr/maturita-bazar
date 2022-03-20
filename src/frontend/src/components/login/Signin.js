import React, { useState } from "react";
import "../../resources/style/Signup.css";

import axios from "axios";

/**
 * Login page for existing users
 * @returns Signin page
 */
function Signin() {
  const setUserInfo = (username, userType) => {
    const now = new Date();

    localStorage.setItem("expiry", now.getTime() + 7200000);
    localStorage.setItem("username", username);
    localStorage.setItem("userType", userType);
  };

  /**
   * Submits form
   */
  const handleSubmit = async () => {
    setEmailError("");
    setPasswordError("");
    validate();
    if (validation) {
      try {
        const response = await axios({
          method: "post",
          url: "/api/users/signin",
          data: {
            email: email,
            password: password,
          },
        });

        // sets user information in localstorage
        setUserInfo(response.data.user.username, response.data.user.userType);

        console.log(response);
        window.location = "/";
      } catch (err) {
        err.response.status === 403
          ? setLoginError("Invalid credentials")
          : setLoginError("Oops, something went wrong");
        console.log(err);
      }
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  /**
   * Validates user input
   */
  let validation = true;
  const validate = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.exec(email)) {
      setEmailError("Invalid email format");
      validation = false;
    }

    if (!password) {
      setPasswordError("Field is required");
      validation = false;
    }
  };

  return (
    <div className="container">
      <div id="wrapper" className="box">
        <div className="has-text-centered">
          <i className="user-icon far fa-user-circle"></i>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Insert your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <span className="has-text-danger">{emailError}</span>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Insert your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <span className="has-text-danger">{passwordError}</span>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              onClick={handleSubmit}
              className="button has-background-navy-blue has-text-white"
            >
              Log in
            </button>
          </div>
        </div>
        <span className="has-text-danger">{loginError}</span>
      </div>
    </div>
  );
}

export default Signin;
