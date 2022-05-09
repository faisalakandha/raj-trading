import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Watchlist from './Views/Watchlist/Watchlist';
import Positions from './Views/Positions/Positions';
import PAndL from './Views/P&L/PAndL';
import { extendTheme, ChakraProvider, Box, Spinner, Center } from '@chakra-ui/react';
import LoginPage from './Views/LoginPage/LoginPage';
import { useEffect, useState } from 'react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  red:
  {
    50: '#ffe2ec',
    100: '#ffb3c5',
    200: '#fc839f',
    300: '#f95278',
    400: '#f62252',
    500: '#dd0939',
    600: '#ad032c',
    700: '#7c001e',
    800: '#4d0012',
    900: '#200005',
  },
  orange:
  {
    50: '#ffe5e5',
    100: '#fbbaba',
    200: '#f28e8e',
    300: '#eb6161',
    400: '#e43535',
    500: '#ca1b1b',
    600: '#9e1314',
    700: '#710c0e',
    800: '#460506',
    900: '#1e0000',
  },
  yellow:
  {
    50: '#fff2de',
    100: '#fddcb2',
    200: '#fac585',
    300: '#f6ad55',
    400: '#f39627',
    500: '#da7c0f',
    600: '#aa6109',
    700: '#794504',
    800: '#4a2800',
    900: '#1d0d00',
  },
  green:
  {
    50: '#e2fbed',
    100: '#c2ebd4',
    200: '#9fddb9',
    300: '#7ccf9e',
    400: '#58c184',
    500: '#3ea76a',
    600: '#2e8251',
    700: '#1f5d3a',
    800: '#0f3921',
    900: '#001506',
  },
  cyan:
  {
    50: '#defdf9',
    100: '#bbf1ec',
    200: '#96e6de',
    300: '#6edad0',
    400: '#49cfc3',
    500: '#30b6aa',
    600: '#208e84',
    700: '#10665e',
    800: '#003e39',
    900: '#001715',
  },
  blue:
  {
    50: '#e0f4ff',
    100: '#b8dcfa',
    200: '#8ec4f1',
    300: '#63ace8',
    400: '#3994e0',
    500: '#1f7bc6',
    600: '#135f9b',
    700: '#084470',
    800: '#002946',
    900: '#000f1d',
  },
  skyBlue:
  {
    50: '#d9fdff',
    100: '#adf1ff',
    200: '#7fe7fb',
    300: '#50dcf8',
    400: '#24d2f5',
    500: '#0ab9db',
    600: '#0090ab',
    700: '#00677c',
    800: '#003f4c',
    900: '#00171c',
  },
  violate:
  {
    50: '#f0eaff',
    100: '#d1c1f4',
    200: '#b199e7',
    300: '#9171dc',
    400: '#7248d0',
    500: '#592fb7',
    600: '#45248f',
    700: '#311968',
    800: '#1e0f40',
    900: '#0c031b',
  },
  pink:
  {
    50: '#ffe6f5',
    100: '#f5beda',
    200: '#ea95c1',
    300: '#e06ca7',
    400: '#d6438e',
    500: '#bc2975',
    600: '#931e5b',
    700: '#6b1441',
    800: '#420a28',
    900: '#1c010f',
  },
  gray:
  {
    50: '#e8f3ff',
    100: '#cfd8e3',
    200: '#b5bdcc',
    300: '#97a3b4',
    400: '#7b899d',
    500: '#626f84',
    600: '#4b5768',
    700: '#343e4b',
    800: '#1e2530',
    900: '#070c18',
  }
}

const theme = extendTheme({ colors })

const Home = () => {

  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      {
        loading ?
          <Center h='100vh'>
            <Spinner size='xl' />
          </Center>
          :
          <Box>
            <div className="AppContainer">
              <Box bgColor={'white'} className="LeftView">
                <Watchlist />
              </Box>
              <div className="RightView">
                <Box bgColor={'white'} className="Positions">
                  <Positions />
                </Box>
                <Box bgColor={'white'} className="PandL">
                  <PAndL />
                </Box>
              </div>
            </div>
          </Box>
      }
    </div>
  );
};

export default function App() {

  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('Login')) {
      setLogin(sessionStorage.getItem('Login'))
    }
    else {
      sessionStorage.setItem('Login', login);
    }
  }, [setLogin]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>

          {
            login === false ?
              <Route path="/" element={<LoginPage login={login} setLogin={setLogin} />} />
              :
              <Route path="/" element={<Home />} />
          }
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
