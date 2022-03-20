import React from "react";
import "../resources/style/About.css";

/**
 * Simple about page
 * @returns About page
 */
export default function About() {
  return (
    <div className="box container about-container">
      <div className="content">
        <h2>About us</h2>
        <p>
          AutoBazar is an online vehicle marketplace created by a student of
          SPSMB, Ludvik Roubicek (2021-2022){" "}
        </p>
        <h3>Contact</h3>
        <ul>
          <li>Phone number: 232323232</li>
          <li>Mailing adress: spsmb</li>
        </ul>
      </div>
    </div>
  );
}
