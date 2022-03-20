import React from 'react';
import loading from '../resources/loader.gif';
import '../resources/style/Loader.css';

const Loader = () => {
  return <img id='loading' alt='Loading' src={loading} />;
};

export default Loader;
