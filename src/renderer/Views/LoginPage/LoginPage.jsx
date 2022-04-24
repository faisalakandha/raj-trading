import React from 'react';
import backroundImage from '../../../../assets/img/bg.gif';
import './LoginPage.css';
//import OpenAuthWindow from './oauth';

function OpenAuthWindow() {
    window.open('https://api.fyers.in/api/v2/generate-authcode?client_id=FMR00CRGAK-100&redirect_uri=http://localhost:3000/&response_type=code&state=sample_state', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no');

}

const LoginPage = () => {
    return (
        <div className="BackgroundContainer">
            <img src={backroundImage} alt="" />
            <button
                onClick={() => {
                    OpenAuthWindow();
                }}
                className="backgroundBtn"
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;
