import React from 'react';
import backroundImage from '../../../../assets/img/background.png';
import './LoginPage.css';
//import OpenAuthWindow from './oauth';



const LoginPage = () => {
  return (
    <div className="BackgroundContainer">
      <img src={backroundImage} alt="" />
      <button
        onClick={() => {
          window.electron.ipcRenderer.OpenAuthWindow("I'm Speaking from frontend !!!");
        }}
        className="backgroundBtn"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
