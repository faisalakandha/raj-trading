import { useToast } from '@chakra-ui/react';
import React from 'react';
import backroundImage from '../../../../assets/img/background.png';

import './LoginPage.css';

const LoginPage = ({ login, setLogin }) => {

    const toast = useToast();

    async function handleLoginClick() {
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
    }

    return (
        <div className="BackgroundContainer">
            <img src={backroundImage} alt="" />
            <button
                onClick={() => handleLoginClick()}
                className="backgroundBtn"
            >
                App Login
            </button>
        </div>
    );
};

export default LoginPage;
