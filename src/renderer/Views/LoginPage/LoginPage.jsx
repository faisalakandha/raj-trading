import { useToast } from '@chakra-ui/react';
import React from 'react';
import backroundImage from '../../../../assets/img/background.png';

import './LoginPage.css';

const fyers = require('fyers-api-v2');

fyers.setAppId('FMR00CRGAK-100');
fyers.setRedirectUrl('http://localhost:3000/');

const LoginPage = ({ login, setLogin }) => {

    const toast = useToast();

    return (
        <div className="BackgroundContainer">
            <img src={backroundImage} alt="" />
            <button
                onClick={ async () => {
                   const test = await window.electron.ipcRenderer.OpenAuthWindow("Renderer: Auth Request..");
                    if (test === true) {
                        toast({
                            title: 'Login Success!',
                            description: "Welcome.",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        setLogin(true);
                    }
                    else if (test === false) {
                        toast({
                            title: 'Login failed!',
                            description: "Try Again.",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                        setLogin(false);
                    }
                    else {
                        toast({
                            title: 'Login failed!',
                            description: "Try Again.",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                        setLogin(false);
                    }
                }}
                className="backgroundBtn"
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;
