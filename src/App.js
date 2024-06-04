import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NotesState from './context/notes/NotesState';
import Aleart from './components/Aleart';
function App() {
  return (
    <>
        <Router>
      <NotesState>
          <Navbar />
          <Aleart message="svsvbdgfbfgnhgmjmhvmvv"/>
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          </div>
      </NotesState>
        </Router>
    </>
  );
}

export default App;
