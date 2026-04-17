import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/login';
import Signup from './components/Signup';
import CardPage from './components/card_page'
import MyCards from './components/my_cards';
import AppNavbar from './components/nav-bar';

function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route path= "/" element={<Login/>}/>
        <Route path ="/signup" element={<Signup />}/>
        <Route path ="/card_page" element={<><AppNavbar /><CardPage /></>}/>
        <Route path ="/my_cards" element={<><AppNavbar /><MyCards /></>}/>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
