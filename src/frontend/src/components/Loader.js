import React from "react";
import loading from "../resources/loader.gif";
import "../resources/style/Loader.css";

/**
 * Loader component for loadings (spinning circle)
 * @returns Loader component
 */
const Loader = () => {
  return <img id="loading" alt="Loading" src={loading} />;
};

export default Loader;
