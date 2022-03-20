import React, { useState } from "react";
import "../../resources/style/Signup.css";

import axios from "axios";

function Signup() {
  const [agreed, setAgreed] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [miscError, setMiscError] = useState("");

  const onAgree = () => {
    !agreed ? setAgreed(true) : setAgreed(false);
  };

  let validation = true;
  const validate = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.exec(email)) {
      setEmailError("Invalid email format");
      validation = false;
    }

    if (!firstName) {
      setFirstNameError("Field is required");
      validation = false;
    }

    if (!lastName) {
      setLastNameError("Field is required");
      validation = false;
    }

    if (!username) {
      setUsernameError("Field is required");
      validation = false;
    } else if (username.length < 4 && username.length > 16) {
      setUsernameError(
        "Username cannot be less than 4 or more than 16 characters long"
      );
      validation = false;
    }

    if (!password) {
      setPasswordError("Field is required");
      validation = false;
    } else if (password.length < 8) {
      setPasswordError("Password cannot be shorter than 8 characters");
      validation = false;
    }
  };

  const handleSubmit = async () => {
    setLastNameError("");
    setPasswordError("");
    setUsernameError("");
    setLastNameError("");
    setEmailError("");
    validate();
    if (validation) {
      try {
        const response = await axios({
          method: "post",
          url: "/api/users/signup",
          data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
          },
        });
        console.log(response);
        window.location.href = "/";
      } catch (err) {
        setMiscError("Oops, something went wrong");
        console.log(err);
      }
    }
  };

  return (
    <div id="signup-form-container" className="box container">
      <div class="field">
        <label class="label">First name</label>
        <div class="control">
          <input
            required
            class="input"
            type="text"
            placeholder="Insert your first name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <span className="has-text-danger">{firstNameError}</span>
      </div>

      <div class="field">
        <label class="label">Last name</label>
        <div class="control">
          <input
            required
            class="input"
            type="text"
            placeholder="Insert your last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <span className="has-text-danger">{lastNameError}</span>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control ">
          <input
            required
            class="input "
            type="text"
            placeholder="Choose your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <span className="has-text-danger">{usernameError}</span>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="Insert your e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <span className="has-text-danger">{emailError}</span>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input "
            type="password"
            placeholder="Choose your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <span className="has-text-danger">{passwordError}</span>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input id="checkbox" type="checkbox" onClick={onAgree} /> I agree to
            the terms and conditions
          </label>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            onClick={handleSubmit}
            disabled={!agreed}
            id="submit"
            class="button has-background-navy-blue has-text-white"
          >
            Sign up
          </button>
        </div>
        <span className="has-text-danger">{miscError}</span>
      </div>
    </div>
  );
}

export default Signup;
