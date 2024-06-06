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
import {useState } from 'react'

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
        <Router>
      <NotesState>
          <Navbar />
          <Aleart alert={alert} />
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about"  element={<About />} />
            <Route path="/login"  element={<Login showAlert={showAlert} />} />
            <Route path="/signup"  element={<Singup showAlert={showAlert} />} />
          </Routes>
          </div>
      </NotesState>
        </Router>
    </>
  );
}

export default App;
