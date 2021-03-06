import React from "react";

/**
 * Bit of JSX for code simplification in Car.js
 * @param {*} props Passed down by Car component
 * @returns JSX
 */
export default function CarListItem(props) {
  const { item, rowName } = props;

  return (
    <div className="row columns">
      <div className="column is-two-thirds-desktop">
        <h6>{rowName}</h6>
      </div>
      <div className="column is-one-third-desktop btm-column has-text-right-desktop">
        <p>{item}</p>
      </div>
    </div>
  );
}
