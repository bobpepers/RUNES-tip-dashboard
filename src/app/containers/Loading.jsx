import React from 'react';
import Runebase from '../assets/images/runebaseloop.gif';

const LoadingContainer = function () {
  return (
    <div className="container h-100 loader">
      <div className="row align-items-center h-100">
        <div className="col-6 mx-auto text-center">
          <img className="mx-auto" src={Runebase} alt="" />
          <p className="text-center">Loading</p>
          <div id="fountainG">
            <div id="fountainG_1" className="fountainG" />
            <div id="fountainG_2" className="fountainG" />
            <div id="fountainG_3" className="fountainG" />
            <div id="fountainG_4" className="fountainG" />
            <div id="fountainG_5" className="fountainG" />
            <div id="fountainG_6" className="fountainG" />
            <div id="fountainG_7" className="fountainG" />
            <div id="fountainG_8" className="fountainG" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingContainer;
