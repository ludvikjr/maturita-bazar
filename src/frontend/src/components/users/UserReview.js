import React from "react";

import "../../resources/style/UserReview.css";

export default function UserReview(props) {
  const { username, positive, description } = props;

  return (
    <div className="container review">
      <h5>{username}</h5>
      <div className="content columns">
        {positive ? (
          <div className="column rating-container is-narrow">
            <i className="rating-positive column fas fa-thumbs-up"></i>
          </div>
        ) : (
          <div className="column rating-container is-narrow">
            <i className="rating-negative column fas fa-thumbs-down"></i>
          </div>
        )}
        <p className="column">{description}</p>
      </div>
    </div>
  );
}
