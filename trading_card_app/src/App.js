import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from './components/login';
import Signup from './components/Signup';

function App() {
  return (
   <Router>
    <div>
      <nav> 
        <ul>
          <li>
            <Link to = "/">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path= "/" element={<Login/>}/>
        <Route path ="/signup" element={<Signup />}/>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
