import React from 'react';
import backroundImage from '../../../../assets/img/background.png';
//import backroundImage from '../../../../assets/img/bg.gif';

import './LoginPage.css';
//import OpenAuthWindow from './oauth';



const LoginPage = () => {
  return (
    <div className="BackgroundContainer">
      <img src={backroundImage} alt="" />
      <button
        onClick={ async () => {
          var test = await window.electron.ipcRenderer.OpenAuthWindow("I'm Speaking from frontend !!!");
          console.log("The state of Auth Window is " + test);
        }}
        className="backgroundBtn"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
