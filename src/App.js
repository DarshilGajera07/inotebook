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
import Login from './components/Login';
import Singup from './components/Singup';
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Singup />} />
          </Routes>
          </div>
      </NotesState>
        </Router>
    </>
  );
}

export default App;
