import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Watchlist from './Views/Watchlist/Watchlist';
import Positions from './Views/Positions/Positions';
import PAndL from './Views/P&L/PAndL';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const Home = () => {
  return (
    <div className="App">
      <div className="AppContainer" style={{ backgroundColor: 'white'}} >
        <div className="LeftView" style={{ backgroundColor: '#f5faff', boxShadow:'0px 0px 2px 2px grey'}}>
          <Watchlist />
        </div>
        <div className="RightView" >
          <div className="Positions" style={{ backgroundColor: '#f5faff', boxShadow:'0px 0px 2px 2px grey',marginLeft: '13px',marginRight: '13px'}}>
            <Positions />
          </div>
          <div className="PandL" style={{ backgroundColor: '#f5faff', boxShadow:'0px 0px 2px 2px grey'}}>
            <PAndL />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
