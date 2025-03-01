import './App.css';
import GenericButton from './components/button';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ComposerPage from './pages/ComposerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/composer" element= {<ComposerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
