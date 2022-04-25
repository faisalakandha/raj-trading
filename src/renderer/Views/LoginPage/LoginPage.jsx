import { useToast } from '@chakra-ui/react';
import React from 'react';
import backroundImage from '../../../../assets/img/background.png';
//import backroundImage from '../../../../assets/img/bg.gif';

import './LoginPage.css';
//import OpenAuthWindow from './oauth';



const LoginPage = ({ login, setLogin }) => {

    const toast = useToast();

    return (
        <div className="BackgroundContainer">
            <img src={backroundImage} alt="" />
            <button
                onClick={async () => {
                    var test = await window.electron.ipcRenderer.OpenAuthWindow("I'm Speaking from frontend !!!");
                    console.log("The state of Auth Window is " + test);
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
