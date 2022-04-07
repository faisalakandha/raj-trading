import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Watchlist from './Views/Watchlist/Watchlist';
import Positions from './Views/Positions/Positions';
import PAndL from './Views/P&L/PAndL';

const Hello = () => {
  return (
    <div className="App">
      <div className="AppContainer">
        <div className="LeftView">
          <Watchlist />
        </div>
        <div className="RightView">
          <div className="PandL">
            <PAndL />
          </div>
          <div className="Positions">
            <Positions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
