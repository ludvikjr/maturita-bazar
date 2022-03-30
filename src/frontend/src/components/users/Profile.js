import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";

import avatar from "../../resources/user.png";
import "../../resources/style/Profile.css";

import axios from "axios";
import UserReview from "./UserReview";

export default function Profile() {
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [userType, setUserType] = useState("");

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [reviewType, setReviewType] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const { username } = useParams();

  const modal = useRef(null);

  const getUser = async () => {
    try {
      const result = await axios({
        method: "get",
        url: `/api/users/${username}`,
      });
      console.log(result);
      setUser(result.data.user[0]);
      setFirstName(result.data.user[0].firstName);
      setLastName(result.data.user[0].lastName);
      setEmail(result.data.user[0].email);
      setDescription(result.data.user[0].about);
      setUserType(result.data.user[0].userType);
      console.log("successful");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      const result = await axios({
        method: "delete",
        url: `/api/users/${user._id}`,
        withCredentials: true,
      });
      console.log(result);
      localStorage.removeItem("username");
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  let validation = true;
  const validateUser = () => {
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
  };

  const updateUser = async () => {
    setLastNameError("");
    setFirstNameError("");
    setEmailError("");
    validateUser();
    if (validation) {
      try {
        const result = await axios({
          method: "put",
          url: `/api/users/${user._id}`,
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            about: description,
            phoneNumber: number,
            userType: userType,
          },
          withCredentials: true,
        });
        console.log(result);
        console.log("submission successful");
        setEditing(false);
        window.location = `/profile/${user.username}`;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const postReview = async () => {
    try {
      await axios({
        method: "post",
        url: `/api/reviews/`,
        data: {
          positive: reviewType,
          to: user.username,
          description: reviewMessage,
        },
        withCredentials: true,
      });
      console.log("submission successful");
    } catch (err) {
      setSubmitError(err.response.data.msg);
      console.log(err);
    }
  };

  const getReviews = async () => {
    try {
      const result = await axios({
        method: "get",
        url: `/api/reviews/${username}`,
      });
      console.log(result.data.reviews);
      setReviews(result.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getReviews();
  }, []);

  const [isEditing, setEditing] = useState(false);

  const validateReview = () => {
    if (reviewType === null) {
      setSubmitError("You must select the review type (positive/negative)");
      return false;
    } else if (reviewMessage.length < 1) {
      setSubmitError("Please type a brief review");
      return false;
    }
    setSubmitError("");
    return true;
  };

  const handleReviewSubmit = () => {
    if (validateReview()) {
      postReview();
      window.location = `/profile/${username}`;
    }
  };

  const positiveButton = useRef(null);
  const negativeButton = useRef(null);

  if (reviewType != null && reviewType) {
    positiveButton.current.style.backgroundColor = "rgba(0, 97, 2)";
    negativeButton.current.style.backgroundColor = "rgba(153, 0, 0, 30%)";
  } else if (reviewType != null && !reviewType) {
    negativeButton.current.style.backgroundColor = "rgba(153, 0, 0)";
    positiveButton.current.style.backgroundColor = "rgba(0, 97, 2, 30%)";
  }

  if (user === null || reviews === null) return <Loader />;

  let positive = 0;
  let negative = 0;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i]) {
      positive++;
      continue;
    }
    negative++;
  }

  const reviewList = reviews.map((review) => {
    return (
      <UserReview
        key={review.__id}
        positive={review.positive}
        description={review.description}
        username={review.from}
      ></UserReview>
    );
  });

  const openModal = () => {
    modal.current.classList.add("is-active");
  };

  const closeModal = () => {
    modal.current.classList.remove("is-active");
  };

  return (
    <div id="container" className="container">
      <div className="content">
        <img id="avatar" alt="user avatar" src={avatar} />
        <div id="name">
          <h1>{username}</h1>
        </div>
        <div id="rating">
          <h2>
            Rating
            <br /> <span style={{ color: "rgb(0, 97, 2)" }}>
              {positive}{" "}
            </span> : <span style={{ color: "red" }}>{negative}</span>
          </h2>
        </div>
        <div ref={modal} className="modal">
          <div className="modal-background"></div>

          <div className="modal-content has-text-centered">
            <div className="box content">
              <h5>Delete user {user.username}?</h5>
              <div className="buttons">
                <button
                  className="button has-text-navy-blue"
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  className="button has-background-navy-blue has-text-white"
                  onClick={() => deleteUser()}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        {isEditing ? (
          <div>
            <div className="box info-box">
              <h3>About {username}</h3>
              <textarea
                className="textarea"
                defaultValue={user.about}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="box info-box">
              <h3>Contact</h3>
              <div className="contact-row">
                <b>First name:</b>{" "}
                <input
                  className="input"
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span className="has-text-danger">{firstNameError}</span>
              </div>
              <div className="contact-row">
                <b>Last name:</b>{" "}
                <input
                  className="input"
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span className="has-text-danger">{lastNameError}</span>
              </div>
              <div className="contact-row">
                <b>Email address:</b>
                <input
                  className="input"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="has-text-danger">{emailError}</span>
              </div>
              <div className="contact-row">
                <b>Phone number:</b>{" "}
                <input
                  className="input"
                  defaultValue={user.phoneNumber}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              {localStorage.getItem("userType") === "superadmin" ? (
                <div className="contact-row field">
                  <b>User privileges</b>
                  <select
                    className="select role-select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              ) : null}
            </div>
            <button
              onClick={() => {
                updateUser();
              }}
              id="edit"
              className="button has-text-white has-background-navy-blue"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <div className="box info-box">
              <h3>About {username}</h3>
              <p>
                {user.about == null
                  ? "This user hasn't written anything about himself yet.."
                  : user.about}
              </p>
            </div>
            <div className="box info-box">
              <h3>Contact</h3>
              <div className="contact-row">
                <b>First name and last name:</b>
                {" " + user.firstName + " " + user.lastName}
              </div>
              <div className="contact-row">
                <b>Email address:</b> {user.email}
              </div>
              {user.phoneNumber ? (
                <div className="contact-row">
                  <b>Phone number:</b> {user.phoneNumber}
                </div>
              ) : null}
            </div>
            {user.username === getUsername() ||
            !localStorage.getItem("username") ? null : (
              <div id="review-box" className="review-box box">
                <h6>Write a review</h6>
                <div className="columns">
                  <button
                    onClick={() => setReviewType(true)}
                    className="button positive-rating rating"
                    ref={positiveButton}
                  >
                    <i className="fas fa-thumbs-up"></i>
                  </button>
                  <button
                    onClick={() => setReviewType(false)}
                    className="button negative-rating rating"
                    ref={negativeButton}
                  >
                    <i className="fas fa-thumbs-down"></i>
                  </button>
                </div>
                <textarea
                  onChange={(e) => setReviewMessage(e.target.value)}
                  className="textarea"
                  placeholder="Tell us your opinion of this user!"
                ></textarea>
                <button
                  onClick={() => handleReviewSubmit()}
                  className="button has-text-navy-blue"
                >
                  Submit
                </button>
                <span className="has-text-danger submit-error">
                  {submitError}
                </span>
              </div>
            )}

            {reviews.length < 1 ? null : (
              <div className="review-list box">{reviewList}</div>
            )}
            {(user.username === getUsername() ||
              localStorage.getItem("userType") === "admin" ||
              localStorage.getItem("userType") === "superadmin") &&
            user.userType != "superadmin" ? (
              <div>
                <button
                  onClick={() => setEditing(true)}
                  id="edit"
                  className="button has-text-white has-background-navy-blue"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => openModal()}
                  id="delete"
                  className="button has-text-navy-blue"
                >
                  Delete User
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
